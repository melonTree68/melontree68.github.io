---
layout: post
title: "The Perplexing Determinant: the Power of Abstraction"
created: 2025-07-27
categories: [Mathematics]
tags: [math, linear algebra, abstraction]
description: "The awkward introduction and definition of determinants often puzzle beginners, including me. However, as the level of abstraction increases, its motivation becomes clearer and the underlying elegance emerges."
math: true
---

Everybody saw such a definition of the determinant of a matrix $A\in\F^{n,n}$[^fn-field] before in class, often at the beginning of his linear algebra journey.

$$
\det A=\sum_{\sigma\in\text{perm(n)}} \sgn(\sigma) a_{1\sigma(1)}a_{2\sigma(2)}\dots a_{n\sigma(n)}.
$$

Here a permutation $\sigma$ is defined as a bijection from $\\{1,\dots,n\\}$ onto itself, and $\sgn(\sigma)$ is defined by the parity of its inversion number.

<!-- $$
\sgn(\sigma)=(-1)^{\#\cbra{(i,j):\sigma(i)>\sigma(j),1\leq i<j\leq n}}.
$$ -->

We all remember those crucial theorems about determinants.
1. Determinant is multiplicative: $\det(AB)=\det(A)\det(B)$.
2. A matrix is invertible if and only if its determinant is nonzero.
3. The eigenvalues of a matrix are precisely the roots of its characteristic polynomial $\det(\lambda I-A)$.

**But, what actually happens within this mysterious formula?**

This is a question for which I have long been seeking a satisfying answer. Besides the (sucking) course textbook, I read *Introduction to Linear Algebra* by Gilbert Strang, and *Linear Algebra Done Right* by Sheldon Axler. And of course, from them I gain some insights, which is what I want to share with you.


## Standard Textbook Definition

### Derivation of Theorems about Determinants

The explicit formula for determinants has been given above. Let's recall the derivation of the theorems listed above. It can be shown by definition that
- multiplying a row by a scalar multiplies the determinant by that scalar;
- permuting two rows negates the determinant; (To prove it, analyze the inversion number with brute force.)
- $\det\begin{bmatrix}x_1&\dots&(x_i+x_i')&\dots&x_n\end{bmatrix}=\det\begin{bmatrix}x_1&\dots&x_i&\dots&x_n\end{bmatrix}+\det\begin{bmatrix}x_1&\dots&x_i'&\dots&x_n\end{bmatrix}.$

From the properties above, we obtain by Gaussian elimination that the determinant is the product of pivots. Hence the second theorem mentioned above holds, and the third follows from the second. As for the first theorem, the proof is more complicated than insightful, at least to me.[^fn-multiplicative-det] A nicer proof will soon be given below.

### Determinant and Volume

Another property of (real) determinants is that they measure the volume (rigorously defined as the Jordan content, whose value equals the Riemann integral of $1$ over that region) of the (hyper-)parallelepiped spanned by the column vectors of the matrix.

An intuitive explanation is that, if you believe that a *volume* satisfies the three properties above, and that the volume of a unit hyper-cube is $1$, then the determinant does serve this purpose. This explanation has some taste of category theory. Another perspective of this kind will soon be given below.

> You might think that I've mixed up necessary and sufficient conditions. You are right, at least for now. That the determinant satisfies these properties does not indicate that *any* mathematical object satisfying these properties is the determinant. Just leave the question for now. It will be rigorously resolved soon.
{: .prompt-info }

As for a rigorous proof of this proposition, one can directly use the change of variables formula in multiple integrals, taking $\phi$ as a linear transformation.

$$
\int_{\phi(E)}f(x)\dx=\int_E f(\phi(t))\abs{\det J(\phi(t))}\d t,
$$

where $E\subseteq\R^n$ is a closed Jordan-measurable region, $x,t\in\R^n$, and all other necessary conditions (e.g., smoothness) are satisfied.

One should notice the following fact. When proving each of the *beautiful* and useful propositions above, we make use of the same properties of the explicit formula, instead of the formula itself, which seems *ugly* and scary. In other words, **we do not care about what the formula looks like, but instead only focus on what properties it has.**

> **When such things happen, it is usually the case that more abstract theories lurk nearby.** More definitions are given, more theorems are proposed, and greater effort is needed to understand what is going on. But in return, insights are gained in a way that is more natural, requires fewer slick techniques, and is hence closer to the essence.
{: .prompt-tip }


## Definition by Multilinear Algebra

### What Properties?

Let's abstract the central properties of determinants, in the hope that the explicit formula can be recovered from these properties. In other words, we are trying to select several key properties, such that the only mathematical object that satisfies these properties is the determinant.

> The determinant is a function $\det:(\F^n)^n\to\F$ with the following *two* properties.
> 1. $\det$ is linear in each slot: $\det(x_1,\dots,x_{i-1},\cdot,x_{i+1},\dots,x_n)$ is a linear functional on $\F^n$ (i.e., a linear map from $\F^n$ to $\F$) for any fixed $x_1,\dots,x_{i-1},x_{i+1},\dots,x_n$.
> 2. $\det(e_1,\dots,e_n)=1$.




## Footnotes

[^fn-field]: $\F$ denotes an arbitrary field. If you are not familiar with this concept, just treat it as $\R$ or $\C$.
[^fn-multiplicative-det]: See the course textbook for the complicated proof.