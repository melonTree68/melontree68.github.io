---
layout: post
title: 'Least Squares: Finding Best Approximate Solutions, and Applications Beyond'
created: '2025-08-03'
categories:
- Mathematics
tags:
- math
- linear algebra
description: The best approximate solution to a (possibly inconsistent) system of linear equations, and applications beyond linear equations.
math: true
---

## The Question

Suppose we are solving a system of $m$ linear equations in $n$ unknowns. We write the equations as $Ax=b$, where $A\in\R^{m,n},b\in\R^m$.

$$
\left\{\begin{align*}
    A_{1,1}x_1&+A_{1,2}x_2&+\cdots&+A_{1,n}x_n&=b_1,\\
    A_{2,1}x_1&+A_{2,2}x_2&+\cdots&+A_{2,n}x_n&=b_2,\\
    &&&\vdots\\
    A_{m,1}x_1&+A_{m,2}x_2&+\cdots&+A_{m,n}x_n&=b_m.
\end{align*}\right.
$$

The textbook tells us to perform Gaussian elimination on the augmented matrix $\begin{bmatrix}A&b\end{bmatrix}$. The resulted row echelon form tells us whether the system has solutions and what the solutions are. However, when no exact solutions exist, sometimes we still want a "best approximate" solution, and this time Gaussian elimination cannot help.

Before proceeding, we must make precise the notion of a "best approximate solution". The solution we seek is optimal in two senses.
- First, as the system may be inconsistent (i.e., have no exact solutions), the desired $x^\*$ should minimize the mean squared error (MSE) $\frac1m\norm{Ax-b}^2$ (this loss function is self-explanatory and intuitive). Equivalently, $x^\*$ minimizes $\norm{Ax-b}$. We call an $\hat x$ that minimizes MSE a least-squares solution.
- Second, the least-squares solution may not be unique. Let $\hat x$ be one least-squares solution. If the nullspace of $A$ is nontrivial ($b\not\in\im A$ does not imply that $\ker A=\\{0\\}$.), then for any $x_0\in\ker A$, $\hat x+x_0$ also minimizes the MSE. Our desired solution $x^\*$ is a least-squares solution with minimal norm. Note that $x^\*$ still may not be unique, when, for example, $A$ has two identical columns.

In short, we are searching for $x^\*\in\R^n$ such that

<center>among the $\hat x$'s that minimizes $\norm{Ax-b}$, $x^*$ has minimal norm.</center>

## Preliminaries

For this problem, some abstraction makes the picture clearer, and allows for further and more intriguing applications beyond solving linear equations.

Let $\F$ denote $\R$ or $\C$. An inner product space is a vector space $V$ over $\F$ along with a function (called inner product) $\inp\cdot\cdot:V\times V\to\F$ that satisfies the following axioms.
1. Positivity: $\forall v\in V,\inp vv\geq0$.
2. Definiteness: $\inp vv=0\iff v=0$.
3. Linearity in first slot: $\inp\cdot v\in\L(V,\F)$ for each $v\in V$.
4. Conjugate symmetry: $\inp vw=\overline{\inp wv}$ for every $v,w\in V$.

When we talk about $\F^n$, we tacitly treat it as an inner product space with the Euclidean inner product.