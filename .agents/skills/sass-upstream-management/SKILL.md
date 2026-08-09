---
name: sass-upstream-management
description: Manage the boundary between this site's local `_sass` files and the upstream Sass supplied by `jekyll-theme-chirpy`. Use when auditing copied theme files, upgrading Chirpy, deciding which `_sass` files can be removed, extracting local changes from upstream copies, diagnosing stale Sass overrides, or verifying that Jekyll falls back to the theme gem correctly.
---

# Sass Upstream Management

## Understand the source hierarchy

Treat local `_sass` files as overrides. A local file shadows the same logical Sass module from `jekyll-theme-chirpy`; when the local file is absent, Jekyll/Sass resolves it from the installed theme gem.

Use the gem locked by `Gemfile.lock` as the actual build-time upstream. Use the separate `jekyll-theme-chirpy` repository only as a comparison checkout; the site does not load Sass directly from that checkout or GitHub.

## Keep the boundary minimal

Keep site-owned Sass under `_sass/custom/`. Do not retain copies of upstream directories such as `_sass/abstracts`, `_sass/base`, `_sass/components`, `_sass/layout`, `_sass/pages`, or `_sass/themes`, nor upstream `main.scss` or `main.bundle.scss`.

Configure overridable upstream variables from `assets/css/jekyll-theme-chirpy.scss` with `@use 'abstracts/variables' with (...)`. Express selector-level differences in a custom module loaded after `main`. Do not copy an entire upstream file to change a few declarations.

The intended local `_sass` inventory is currently:

- `_sass/custom/fonts.scss`
- `_sass/custom/thms.scss`
- `_sass/custom/sidebar.scss`

## Audit a shadowed tree

1. Resolve the installed theme path with `bundle info jekyll-theme-chirpy` under Ruby 3.4.1.
2. Compare file inventories and contents between local `_sass` and the installed gem.
3. Inspect `git log --follow`, `git blame`, and the working-tree diff for every divergent local file.
4. Delete byte-identical and unchanged upstream copies.
5. For divergent copies, distinguish intentional local declarations from changes caused only by an old upstream version.
6. Move intentional variables or selectors into the minimal configuration/custom layer, preserving uncommitted user work.
7. Delete the complete shadowing file after extracting its intentional differences.
8. Remove empty directories left by the deletion.

## Upgrade upstream

Upgrade the theme gem and lockfile normally. Do not refresh `_sass` by copying files from the theme repository. After an upgrade, audit only the small local custom layer and the Sass entrypoint.

## Validate fallback behavior

1. Run `bundle exec jekyll build --trace` under Ruby 3.4.1.
2. Run a production build to exercise `main.bundle`.
3. Check the generated source map or CSS sources and confirm upstream modules resolve from the installed gem.
4. Check generated CSS for configured variables and custom selectors; a successful compile alone does not prove the intended overrides survived.
5. Run `git diff --check` and confirm `_sass` contains no empty or accidental upstream directories.
6. Request visual confirmation when the surviving custom layer affects typography or layout.

## Common issue

When an upstream fix or feature appears missing despite upgrading the gem, search local `_sass` first. A stale same-path local file silently prevents the corresponding gem module from being used.
