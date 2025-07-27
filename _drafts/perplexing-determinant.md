---
layout: post
title: "The Perplexing Determinant: the Power of Abstraction"
created: 2025-07-27
categories: [Mathematics]
tags: [math, linear algebra, abstraction]
description: "The awkward introduction and definition of determinants (行列式) often puzzle beginners, including me. However, as the level of abstraction rises, the motivation behind the definition becomes clearer."
math: true
---

Everybody saw such a definition of the determinant of a matrix $A\in\F^{n,n}$ before in class, often at the beginning of his linear algebra journey.

$$
\det A=\sum_{\sigma\in\text{perm(n)}} (-1)^{\sgn(\sigma)} a_{1\sigma(1)}a_{2\sigma(2)}\dots a_{n\sigma(n)}.
$$

Here a permutation $\sigma$ is defined as a bijection from $\\{1,\dots,n\\}$ onto itself. $\sgn(\sigma)$ is defined as the parity of its inversion number, i.e.,

$$
\sgn(\sigma)=\#\cbra{(i,j)\in\{1,\dots,n\}^2:\sigma(i)>\sigma(j)}\mod 2.
$$

We all remember those important properties of determinants: it is multiplicative, i.e., $\det(AB)=\det(A)\det(B)$; a matrix is invertible if and only if its determinant is nonzero

Let's recall the derivation of some properties of determinants. It can be shown by definition that
- Multiplying a row by a scalar multiplies the determinant by that scalar.
- 