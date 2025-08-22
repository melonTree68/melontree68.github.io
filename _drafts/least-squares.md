---
layout: post
title: 'Least Squares and Its Applications Beyond Linear Equations'
created: '2025-08-03'
categories:
- Mathematics
tags:
- math
- linear algebra
description: The best approximate solution to a system of linear equations, and applications beyond linear equations.
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

The textbook tells us to perform Gaussian elimination on the augmented matrix $\begin{bmatrix}A&b\end{bmatrix}$. The resulted row echelon form tells us whether the system has a solution and what the solutions are. However, when no exact solutions exist, sometimes we still want a "best approximate" solution, and this time Gaussian elimination cannot help.

To proceed, we must make precise the notion of a "best approximate solution". The solution $x^\*$ we seek is optimal in two senses.
1. $x^\*$ should minimize the mean squared error (MSE) $\frac1m\norm{Ax-b}^2$ (this loss function is self-explanatory and intuitive). Equivalently, $x^\*$ minimizes $\norm{Ax-b}$. We call an $\hat x$ that minimizes the MSE a least-squares solution.
2. However, the least-squares solution may not be unique. Let $\hat x$ be one least-squares solution. If the kernel of $A$ is nontrivial, then for any $x_0\in\ker A$, $\hat x+x_0$ also minimizes the MSE. Our desired solution $x^\*$ should be a least-squares solution with minimal norm. Note that $x^\*$ still may not be unique (e.g., when $A$ has two identical columns).

In short, we are searching for $x^\*\in\R^n$ such that

<center>among the $\hat x$'s that minimize $\norm{Ax-b}$, $x^*$ has minimal norm.</center>


## Preliminaries

For our problem, some abstraction makes the picture clearer, and allows for further and more intriguing applications beyond solving linear equations.

### Inner Product Spaces

> For most of the time (almost always), you can think of a finite-dimensional inner product space as $\F^n$ with the Euclidean inner product. Doing so removes unnecessary complication and simplifies your thoughts.
{: .prompt-tip}

Let $\F$ denote $\R$ or $\C$. An inner product space is a vector space $V$ over $\F$ along with a function (called inner product) $\inp\cdot\cdot:V\times V\to\F$ that satisfies the following axioms.
1. Positivity: $\forall v\in V,\inp vv\geq0$.
2. Definiteness: $\inp vv=0\iff v=0$.
3. Linearity in first slot: $\inp\cdot v\in\L(V,\F)$ for each $v\in V$.
4. Conjugate symmetry: $\inp vw=\overline{\inp wv}$ for every $v,w\in V$.

When we talk about $\F^n$, we tacitly treat it as an inner product space with the Euclidean inner product. For the rest of the article, suppose $V,W$ are finite-dimensional inner product spaces. We slightly abuse notation by using the same notation $\inp\cdot\cdot$ for inner products in different spaces.

> Some examples of inner products are listed below to make the abstract definition more concrete.
> - Suppose $c_1,\dots,c_n\in\R^+$. $\F^n$ is an inner product space with respect to
>
> $$
> \inp{(w_1,\dots,w_n)}{(z_1,\dots,z_n)}=c_1w_1\overline{z_1}+\cdots+c_nw_n\overline{z_n}.
> $$
>
> - The vector space of continuous real-valued functions on $[-1,1]$ is an inner product space with respect to
>
> $$
> \inp fg=\int_{-1}^1fg.
> $$
>
> - The vector space of polynomials with real coeffcients is an inner product space with respect to
>
> $$
> \inp pq=\int_0^{+\infty}p(x)q(x)\e^{-x}\dx.
> $$
{: .prompt-info}

{% capture thm_content %}
Suppose $e_1,\dots,e_n$ is an orthonormal basis of $V$. Then for any $v\in V$,

$$
v=\inp v{e_1}e_1+\cdots+\inp v{e_n}e_n.
$$

{% endcapture %}
{% include thms/theorem.html title="" content=thm_content %}

$v$ is a linear combination of $e_1,\dots,e_n$. Applying $\inp\cdot{e_k}$ to both sides of $v=a_1e_1+\cdots+a_ne_n$ proves the theorem.

### Orthogonal Projections

Recall that the Gram-Schmidt process (it holds *mutatis mutandis* for any (finite-dimensional) inner product space) transforms an independent list $v_1,\dots,v_m$ in $V$ to an orthonormal list $e_1,\dots,e_m$ with $\inp{v_k}{e_k}>0$ and $\spn(v_1,\dots,v_k)=\spn(e_1,\dots,e_k)$ for each $1\leq k\leq m$.[^fn-gram-schmidt] The Gram-Schmidt process allows us to choose an orthonormal basis for a vector space, and to extend an orthonormal list to an orthonormal basis. We skip the proofs of some trivial results, which will be stated in the definitions.

{% capture def_content %}
For $U$ a subspace of $V$, the orthogonal complement of $U$, denoted by $U^\perp$, is defined as

$$
U^\perp=\cbra{v\in V:\inp uv=0\text{ for all }u\in U}.
$$

- $U^\perp$ is a subspace of $V$.
- $\bra{U^\perp}^\perp=U$.
- $V=U\oplus U^\perp$.
{% endcapture %}
{% include thms/definition.html content=def_content %}

We provide the proof sketch of the results above. Choose an orthonormal basis $v_1,\dots,v_m$ of $U$. Extend it to an orthonormal basis $v_1,\dots,v_n$ of $V$. It can be shown that $U^\perp=\spn(v_{m+1},\dots,v_n)$.

Now that $V=U\oplus U^\perp$, we can define the orthogonal projection operator.

{% capture def_content %}
Suppose $U$ is a subspace of $V$. The orthogonal projection operator onto $U$, often denoted by $P_U$, is defined as

$$
P_U(u+w)=u
$$

for any $u\in U,w\in U^\perp$. The definition makes sense because every vector in $V$ can be written uniquely as the sum of a vector in $U$ and a vector in $U^\perp$.
{% endcapture %}
{% include thms/definition.html content=def_content %}

{% capture thm_content %}
Suppose $e_1,\dots,e_m$ is an orthonormal basis of $U$. Then

$$
P_U(v)=\inp v{e_1}e_1+\cdots+\inp v{e_m}e_m.
$$

for any $v\in V$.
{% endcapture %}
{% include thms/theorem.html title="explicit expression of orthogonal projection operators" content=thm_content %}

{% capture pf_content %}
Extend $e_1,\dots,e_m$ to an orthonormal basis $e_1,\dots,e_n$ of $V$. Then

$$
v=\inp v{e_1}e_1+\cdots+\inp v{e_m}e_m+\inp v{e_{m+1}}e_{m+1}+\cdots+\inp v{e_n}e_n
$$

for any $v\in V$. It can be verified that

$$
\inp v{e_1}e_1+\cdots+\inp v{e_m}e_m\in U,\quad\inp v{e_{m+1}}e_{m+1}+\cdots+\inp v{e_n}e_n\in U^\perp.
$$
{% endcapture %}
{% include thms/proof.html content=pf_content %}


## A Toy Answer

Let's start from simple cases --- real Euclidean spaces and matrices. We make the additional assumption that $A$ has independent columns, i.e., $\ker A=\\{0\\}$.

To minimize $\norm{Ax-b}$ is to find a vector in the column space of $A$ that is closest to $b$. Think of $\im A$ as a plane and $b$ as a point in $\R^3$. Geometry tells us that the error $b-A\hat x$ should be orthogonal to the plane (orthogonal to a basis of $\im A$). In other words, $A^\T(b-A\hat x)=0$. Hence

$$
\hat x=(A^\T A)^{-1}A^\T b,\quad A\hat x=A(A^\T A)^{-1}A^\T b.
$$

> Draw a picture yourself and you will understand everything in this section.
{: .prompt-tip}

Following the intuition above, we give the rigorous proof.

{% capture pf_content %}
Let $\hat x$ be the same as above.

$$
\norm{b-Ax}=\norm{b-A\hat x-A(x-\hat x)}.
$$

$A^\T(b-A\hat x)=0$ leads to

$$
\inp{A(x-\hat x)}{b-A\hat x}=(x-\hat x)^\T A^\T(b-A\hat x)=0.
$$

Hence the two terms are orthogonal. By the Pythagorean Theorem,

$$
\norm{b-Ax}^2=\norm{b-A\hat x}^2+\norm{A(x-\hat x)}^2\geq\norm{b-A\hat x}^2.
$$

Note that $\ker A=\\{0\\}$. Hence the inequality is an equality if and only if $x=\hat x$. That implies that $\hat x$ is the unique least-squares solution.
{% endcapture %}
{% include thms/proof.html content=pf_content %}

When the columns of $A$ is linearly dependent ($\dim\ker A>0$), the method above obviously fails. That is why I call it *a toy answer*.


## The Moore-Penrose Inverse: the Ultimate Weapon

### Definition

The ultimate weapon is easier to understand in the context of linear maps instead of matrices (at least to me). We first give the definition.[^fn-dagger]

{% capture def_content %}
Suppose $T\in\L(V,W)$. The Moore-Penrose inverse, or pseudoinverse, of $T$ is a linear map from $W$ to $V$ defined as

$$
T^\dagger=(\rest T{(\ker T)^\perp})^{-1}P_{\im T}.
$$

Note that $V=\ker T\oplus(\ker T)^\perp$. It can be shown that $TT^\dagger=P_{\im T}$ and $T^\dagger T=P_{(\ker T)^\perp}$.
{% endcapture %}
{% include thms/definition.html content=def_content %}

A moment's thought shows that $A^\dagger b$ is precisely what we are looking for.
- $A(A^\dagger b)=P_{\im A}b$. Hence $A^\dagger b$ minimizes the MSE.
- For any least-squares solution $\hat x$, $A\hat x=P_{\im A}b=A(A^\dagger b)$. Thus $\hat x=(\hat x-A^\dagger b)+A^\dagger b$, where the first term is in $\ker A$ and the second term is in $(\ker A)^\perp$ by definition. Hence $\norm{A^\dagger b}\leq\norm{\hat x}$ by the Pythagorean Theorem.

### Calculation via Singular Value Decomposition

The definition of the pseudoinverse is obviously too computationally complicated to be practical. We show that the pseudoinverse can be calculated efficiently from the singular value decomposition (SVD).

> I do not plan to prove the SVD in this article because it requires familiarity with too many prerequisites. I will state the theorem without proving it.
{: .prompt-warning }


## Footnotes

[^fn-gram-schmidt]: In this sense, the Gram-Schmidt process is unique, as you can prove.
[^fn-dagger]: Type `T^\dagger` to produce $T^\dagger$ in $\LaTeX$. Some people use $T^+$, especially for matrices. Some people use the dagger symbol for conjugate transpose.