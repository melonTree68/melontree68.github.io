set -euo pipefail

# Usage:
#   ./pull_posts.sh axiom-of-choice kl-divergence
# Copies the single .tex and .pdf from each "<post>-blog/" directory in the repo
# into: ./assets/img/posts/<post>/

REPO_URL="https://github.com/melonTree68/blog-posts-latex.git"
DEST_ROOT="./assets/img/posts"

# Cache the repo locally (fast on repeated runs)
CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/blog-posts-latex"
if [ ! -d "$CACHE_DIR/.git" ]; then
  echo "Cloning repository..."
  rm -rf "$CACHE_DIR"
  git clone --depth 1 "$REPO_URL" "$CACHE_DIR" >/dev/null 2>&1
else
  echo "Fetching latest changes..."
  git -C "$CACHE_DIR" fetch --depth 1 origin main >/dev/null 2>&1
  git -C "$CACHE_DIR" reset --hard origin/main >/dev/null 2>&1
fi

if [ "$#" -lt 1 ]; then
  echo "Error: provide at least one post name." >&2
  exit 2
fi

# Copy only if content differs (or destination missing)
copy_if_changed() {
  local src="$1"
  local dst_dir="$2"
  local dst="$dst_dir/$(basename "$src")"

  if [ -f "$dst" ] && cmp -s "$src" "$dst"; then
    echo "Up to date: $dst"
  else
    cp -f "$src" "$dst_dir/"
    echo "Updated:    $dst"
  fi
}

for post in "$@"; do
  src_dir="$CACHE_DIR/${post}-blog"
  dest_dir="$DEST_ROOT/$post"
  mkdir -p "$dest_dir"

  if [ ! -d "$src_dir" ]; then
    echo "Error: missing directory: $src_dir" >&2
    exit 1
  fi

  tex=( "$src_dir"/*.tex )
  pdf=( "$src_dir"/*.pdf )

  if [ "${#tex[@]}" -ne 1 ] || [ "${#pdf[@]}" -ne 1 ]; then
    echo "Error: expected exactly 1 .tex and 1 .pdf in $src_dir (found ${#tex[@]} tex, ${#pdf[@]} pdf)" >&2
    exit 1
  fi

  copy_if_changed "${tex[0]}" "$dest_dir"
  copy_if_changed "${pdf[0]}" "$dest_dir"
done
