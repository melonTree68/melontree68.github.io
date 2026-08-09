---
layout: post
title: A Natural Proof of the Dominated Convergence Theorem
created: '2026-08-08'
categories:
- Mathematics
tags:
- mathematics
- analysis
description: Egorov's Theorem provides a more natural proof of the celebrated Dominated
  Convergence Theorem than the traditional clean proof via Fatou's Lemma.
math: true
date: 2026-08-09 16:30 +0800
---
> The LaTeX version of this blog post is available [here](https://github.com/melonTree68/blog-posts-latex). Or you can simply download the [.tex](/assets/img/posts/dct-egorov-proof/dct-egorov-proof-blog.tex) and [.pdf](/assets/img/posts/dct-egorov-proof/dct-egorov-proof-blog.pdf) files from here. The content is the same, but the LaTeX version has a more formal typesetting, which I personally prefer (quite much).
{: .prompt-info}

The Dominated Convergence Theorem is a grand result in the area of Lebesgue integration. It deals with the problem of interchanging limits and integrals, i.e., whether

$$
\lim_{n\to\infty}\int f_n=\int f
$$

for $f_n\to f$. The theorem demonstrates that Lebesgue integration indeed fixes a serious deficiency of Riemann integration, at least to a reasonably satisfactory extent.

{% capture thm_content %}
Suppose $(X,\S,\mu)$ is a measure space, $f:X\to[-\infty,\infty]$ is measurable, and $\\{f_n\\}_{n\in\N}$ is a sequence of measurable functions such that $f_n\to f$ a.e. If there exists a nonnegative measurable function $g\in\L^1(X,\S,\mu)$ s.t.

$$
\abs{f_n(x)}\le g(x)
$$

for every $n\in\N$ and almost every $x\in X$, then

$$
\lim_{n\to\infty}\int f_n\,\d\mu=\int f\,\d\mu.
$$
{% endcapture %}
{% include thms/theorem.html title="Dominated Convergence Theorem, DCT" content=thm_content %}

The traditional proof of DCT uses Fatou's Lemma and is sketched [here](#traditional-proof-of-dct-by-fatous-lemma). However, the proof is clean but not natural, at least to me. This article presents an alternative proof using Egorov's Theorem, which is slightly more complicated but quite intuitive.

## Background
For the rest of the article, suppose $(X,\S,\mu)$ is a measure space.

### A deficiency of Riemann integration
One problem with Riemann integration is that it does not work well with limits. Integrals of (pointwise) limits do not necessarily equal limits of integrals; limits of Riemann integrable functions are not necessarily Riemann integrable. Below are two interesting examples.

> In contrast, the pointwise limit of measurable functions is guaranteed to be measurable.
{: .prompt-info}

{% capture def_content %}
Define $f_n:[0,1]\to\R$ for each $n\in\N$ by

$$
f_n(x)=\lim_{m\to\infty}\abs{\cos(2n!\pi x)}^m.
$$

Then $\int f_n=0$ for each $n$ but

$$
f(x)=\lim_{n\to\infty}f_n(x)=\chi_\Q
$$

is the Dirichlet function and is not Riemann integrable.
{% endcapture %}
{% include thms/definition.html type="Example" content=def_content %}

{% capture exmp_content %}
Suppose $\\{r_n\\}_{n\in\N}$ is an enumeration of $(0,1)\cap\Q$. Define $f_n:[0,1]\to\R$ for each $n\in\N$ by

$$
f_n(x)=\begin{cases}
    \frac1{\sqrt{x-r_n}}\quad&\text{if }x>r_n,\\
    0&\text{otherwise}.
\end{cases}
$$

Define $f:[0,1]\to[0,\infty]$ by

$$
f(x)=\sum_{n=0}^{\infty}\frac{f_n(x)}{2^n}.
$$

Because $\Q$ is dense in $\R$, $f$ is unbounded on every nontrivial interval. Thus $f$ is not Riemann integrable on every nontrivial subinterval of $[0,1]$. However, we should expect the area under the graph of $f$ to be less than 4 rather than undefined, since the area under the graph of each $f_n$ is less than 2.
{% endcapture %}
{% include thms/definition.html type="Example" title="Example 1.16 of <em>Measure, Integration, and Real Analysis</em> by Sheldon Axler" content=exmp_content %}

Although we have the following positive result, the theorem has two problems: it requires the hypothesis that the limit function is Riemann integrable, and mathematicians have not yet found a clean, elementary, Riemann-integration-based proof of it. In fact, this suggests that Riemann integration is not the ideal theory of integration. See Theorem 1.18 of *Measure, Integration, and Real Analysis* by Sheldon Axler and section 14.2.3 of 《数学分析习题课讲义（第 2 版）（下册）》 by 谢惠民 et al.

{% capture thm_content %}
Suppose $\\{f_n\\}_{n\in\N}$ is a sequence of Riemann integrable functions on $[a,b]$, $\\{f_n\\}$ is uniformly bounded, and $f_n\to f$. If $f$ is Riemann integrable, then

$$
\lim_{n\to\infty}\int_a^bf_n=\int_a^bf.
$$
{% endcapture %}
{% include thms/theorem.html title="Arzelà's Bounded Convergence Theorem" content=thm_content %}

### Traditional proof of DCT by Fatou's Lemma
We state Fatou's Lemma and sketch the proof of DCT using Fatou's Lemma below.

{% capture thm_content %}
Suppose $\\{f_n\\}_{n\in\N}$ is a sequence of nonnegative measurable functions. Then

$$
\int\bra{\liminf_{n\to\infty}f_n}\d\mu\le\liminf_{n\to\infty}\int f_n\,\d\mu.
$$
{% endcapture %}
{% include thms/theorem.html title="Fatou's Lemma" content=thm_content %}

{% capture pf_content %}
Notice that $g-f_n\ge0$ a.e. and $g+f_n\ge0$ a.e. By Fatou's Lemma,

$$
\int\bra{\liminf_{n\to\infty}(g-f_n)}\d\mu\le\liminf_{n\to\infty}\int (g-f_n)\,\d\mu \implies \int f\,\d\mu\ge\limsup_{n\to\infty}\int f_n\,\d\mu,
$$


$$
\int\bra{\liminf_{n\to\infty}(g+f_n)}\d\mu\le\liminf_{n\to\infty}\int (g+f_n)\,\d\mu \implies \int f\,\d\mu\le\liminf_{n\to\infty}\int f_n\,\d\mu.
$$

The proof is completed.
{% endcapture %}
{% include thms/proof.html title="Proof sketch of DCT using Fatou's Lemma" content=pf_content %}

## Some Preparation
We first state Egorov's Theorem.

{% capture thm_content %}
Suppose $\mu(X)<\infty$, $\\{f_n\\}_{n\in\N}$ is a sequence of measurable functions, and $f_n\to f$. Then $\forall\varepsilon>0$, $\exists E\in\S$ s.t. $\mu(E^c)<\varepsilon$ and $f_n$ converges uniformly to $f$ on $E$.
{% endcapture %}
{% include thms/theorem.html title="Egorov's Theorem" content=thm_content %}

To use Egorov's Theorem to prove DCT, we still need to address two problems.

1. $\mu(X)$ might not be finite.
2. We need to control the integral over the set on which $f_n$ does not converge uniformly.

The [second lemma](#mass-of-integrable-functions-concentrates-on-sets-of-finite-measure) below will solve the first problem, and the [first lemma](#integrals-over-small-sets-are-small) will solve the second.

### Integrals over small sets are small
{% capture thm_content %}
Suppose $f\in\L^1(X,\S,\mu)$ is nonnegative. Then $\forall\varepsilon>0$, $\exists\delta>0$ s.t. for every $B\in\S$ with $\mu(B)<\delta$,

$$
\int_Bf\,\d\mu<\varepsilon.
$$
{% endcapture %}
{% include thms/theorem.html type="Lemma" content=thm_content %}

{% capture pf_content %}
Suppose $\varepsilon>0$. The desired result is trivial for simple functions. For the general case, take a simple measurable function $h$ s.t. $0\le h\le f$ and $\int(f-h)\,\d\mu<\varepsilon/2$. Then $\exists\delta>0$ s.t. for every $B\in\S$ with $\mu(B)<\delta$,

$$
\int_Bh\,\d\mu<\frac\varepsilon2.
$$

Then

$$
\int_Bf\,\d\mu\le\int(f-h)\,\d\mu+\int_Bh\,\d\mu<\varepsilon
$$

for every $B\in\S$ with $\mu(B)<\delta$, as desired.
{% endcapture %}
{% include thms/proof.html content=pf_content %}

### Mass of integrable functions concentrates on sets of finite measure
{% capture thm_content %}
Suppose $f\in\L^1(X,\S,\mu)$ is nonnegative. Then $\forall\varepsilon>0$, $\exists E\in\S$ s.t. $\mu(E)<\infty$ and

$$
\int_{E^c}f\,\d\mu<\varepsilon.
$$
{% endcapture %}
{% include thms/theorem.html type="Lemma" content=thm_content %}

{% capture pf_content %}
Suppose $\varepsilon>0$. The desired result is trivial for simple functions. For the general case, take a simple measurable function $h$ s.t. $0\le h\le f$ and $\int(f-h)\,\d\mu<\varepsilon/2$. Then $\exists E\in\S$ s.t. $\mu(E)<\infty$ and

$$
\int_{E^c}h\,\d\mu<\frac\varepsilon2.
$$

Then

$$
\int_{E^c}f\,\d\mu\le\int(f-h)\,\d\mu+\int_{E^c}h\,\d\mu<\varepsilon,
$$

as desired.
{% endcapture %}
{% include thms/proof.html content=pf_content %}

## A Natural Proof of DCT by Egorov's Theorem
Fix $\varepsilon>0$. By the [second lemma](#mass-of-integrable-functions-concentrates-on-sets-of-finite-measure), let $X_0\in\S$ be s.t. $\mu(X_0)<\infty$ and

$$
\int_{X_0^c}g\,\d\mu<\frac\varepsilon5.
$$

By the [first lemma](#integrals-over-small-sets-are-small), let $\delta>0$ be s.t for every $B\in\S$ with $\mu(B)<\delta$,

$$
\int_Bg\,\d\mu<\frac\varepsilon5.
$$

By Egorov's Theorem, $\exists E\subseteq X_0$ s.t. $E\in\S$, $\mu(X_0\setminus E)<\delta$, and $f_n$ converges uniformly to $f$ on $E$. Then

$$
\begin{align*}
    \abs{\int(f_n-f)\,\d\mu}&\le\int\abs{f_n-f}\,\d\mu \\
    &\le\int_E\abs{f_n-f}\,\d\mu + \int_{X_0\setminus E}(\abs{f_n}+\abs f)\,\d\mu + \int_{X_0^c}(\abs{f_n}+\abs f)\,\d\mu \\
    &\le\int_E\abs{f_n-f}\,\d\mu + 2\int_{X_0\setminus E}g\,\d\mu + 2\int_{X_0^c}g\,\d\mu \\
    (n\ge N)\quad&\le\varepsilon,
\end{align*}
$$

where $N\in\N$ is s.t.

$$
\abs{f_n(x)-f(x)}<\frac\varepsilon{5\mu(E)}
$$

for every $n\ge N$ and every $x\in E$. The proof is completed. $\quad\square$
