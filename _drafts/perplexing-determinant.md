---
layout: post
title: "The Perplexing Determinant: the Power of Abstraction"
created: 2025-07-27
categories: [Mathematics]
tags: [math, linear algebra, abstraction]
description: "The awkward introduction and definition of determinants often puzzle beginners, including me. However, as the level of abstraction increases, its motivation becomes clearer and the underlying elegance emerges."
math: true
---

> I find that in my own elementary lectures, I have, for pedagogical reasons, pushed determinants more and more into the background. Too often I have had the experience that, while the students acquired facility with the formulas, which are so useful in abbreviating long expressions, they often failed to gain familiarity with their meaning, and skill in manipulation prevented the student from going into all the details of the subject and so gaining a mastery.
> 
> _--- Elementary Mathematics from an Advanced Standpoint: Geometry_, Felix Klein


## A Question

Everybody saw such a definition of the determinant of a matrix $A\in\F^{n,n}$[^fn-field] before in class, often at the beginning of his linear algebra journey.

$$
\det A=\sum_{\sigma\in\text{perm(n)}} \sgn(\sigma) a_{1,\sigma(1)}a_{2,\sigma(2)}\cdots a_{n,\sigma(n)}.
$$

Here a permutation $\sigma$ is defined as a bijection from $\\{1,\dots,n\\}$ onto itself, and $\sgn(\sigma)$ is defined by the parity of its inversion number $\abs{\cbra{(i,j):\sigma(i)>\sigma(j),1\leq i<j\leq n}}$.

<!-- $$
\sgn(\sigma)=(-1)^{\#\cbra{(i,j):\sigma(i)>\sigma(j),1\leq i<j\leq n}}.
$$ -->

We all remember those useful theorems about determinants.
1. Determinant is multiplicative: $\det(AB)=\det(A)\det(B)$.
2. A matrix is invertible if and only if its determinant is nonzero.
3. The eigenvalues of a matrix are precisely the roots of its characteristic polynomial $p(z)=\det(zI-A)$.

**But, what actually happens within this mysterious formula?**

This is a question for which I have long been seeking a satisfying answer. Besides the course textbook, I read *Introduction to Linear Algebra* by Gilbert Strang, and *Linear Algebra Done Right* by Sheldon Axler. And of course, from them I gain some insights, which is what I want to share with you.


## Standard Textbook Definition

### Derivation of Theorems about Determinants

The explicit formula for determinants has been given above. Let's recall the derivation of the theorems listed above. It can be shown by definition that
- multiplying a row by a scalar multiplies the determinant by that scalar;
- permuting two rows negates the determinant; (To prove it, analyze the inversion number with brute force.)
- $\det\begin{bmatrix}x_1&\dots&(x_i+x_i')&\dots&x_n\end{bmatrix}=\det\begin{bmatrix}x_1&\dots&x_i&\dots&x_n\end{bmatrix}+\det\begin{bmatrix}x_1&\dots&x_i'&\dots&x_n\end{bmatrix}.$

From the properties above, we obtain by Gaussian elimination that the determinant is the product of pivots. Hence the second theorem mentioned above holds, and the third follows from the second. As for the first theorem, the proof is more complicated than insightful, at least to me.[^fn-multiplicative-det] We will see a nicer proof later.

### Determinant and Volume

Another property of (real) determinants is that they measure the volume (rigorously defined as the Jordan content, whose value equals the Riemann integral of $1$ over that region) of the (hyper-)parallelepiped spanned by the column vectors of the matrix.

An intuitive explanation is that, if you believe that a *volume* satisfies the three properties above, and that the volume of a unit hyper-cube is $1$, then the determinant does serve this purpose. This explanation has some taste of category theory. Another perspective of this kind will be given later.

> You might think that I've mixed up necessary and sufficient conditions. You are right, at least for now. That the determinant satisfies these properties does not indicate that *any* mathematical object satisfying these properties is the determinant. Just leave the question for now. It will be rigorously resolved later.
{: .prompt-warning }

As for a rigorous proof of this proposition, one can directly use the change of variables formula in multiple integrals, taking $\phi$ to be a linear transformation.

$$
\int_{\phi(E)}f(x)\dx=\int_E f(\phi(t))\abs{\det J(\phi(t))}\d t,
$$

where $E\subseteq\R^n$ is a closed Jordan-measurable region, $t,x=\phi(t)\in\R^n$, and all other necessary conditions (e.g., smoothness) are satisfied.

### A Key Observation

One should notice the following fact. When proving each of the *beautiful* and useful propositions above, we make use of the same properties of the explicit formula, instead of the formula itself, which seems *ugly* and scary.[^fn-change-of-variables] In other words, **we do not care about what the formula looks like, but instead only focus on what properties it has.** This motivates the rest of this article.

> **When such things happen, it is usually the case that more abstract theories lurk nearby.** More definitions are given, more theorems are proposed, and greater effort is needed to understand what is going on. But in return, insights are gained in a way that is more natural, requires fewer slick techniques, and is hence closer to the essence.
{: .prompt-tip }


## Multilinear Algebra

### What Properties?

Let's abstract some central properties of determinants, in the hope that the explicit formula can be recovered from these properties. In other words, we are trying to select several key properties, such that the only mathematical object that satisfies these properties is the determinant.

The determinant is a function $\det:(\F^n)^n\to\F$ with the following *three* properties.
1. $\det$ is linear in each slot: $\det(x_1,\dots,x_{i-1},\cdot,x_{i+1},\dots,x_n)$ is a linear functional on $\F^n$ (i.e., a linear map from $\F^n$ to $\F$) for any fixed $x_1,\dots,x_{i-1},x_{i+1},\dots,x_n$.
2. $\det(x_1,\dots,x_n)=0$ whenever $x_i=x_j$ for some $i\neq j$, or, equivalently, swapping two entries negates the determinant.
3. $\det(e_1,\dots,e_n)=1$.

As we shall see, these are enough.

### Multilinear Forms
Let's make some preparation for a clean, basis-free definition of the determinant. For the rest of the article, suppose $V$ is a finite-dimensional vector space over $\F$. **One should frequently compare the conditions in the definitions and theorems below with the properties of determinants.** We will skip the proofs of some trivial results, which will be stated in the definitions.

{% capture def_content %}
An $m$-linear form on $V$ is a function $\beta:V^m\to\F$ that is linear in each slot (when other slots are held fixed). In other words,

$$
\beta(v_1,\dots,v_{i-1},\cdot,v_{i+1},\dots,v_m)\in\L(V,\F).
$$

for each $1\leq i\leq n$.

The vector space of $m$-linear forms on $V$ is denoted by $V^{(m)}$. A function is called a multilinear form on $V$ if it is an $m$-linear form on $V$ for some $m\in\Z^+$.
{% endcapture %}
{% include thms/definition.html content=def_content %}

> A simple example of an $m$-linear form on $\F$ is
> 
> $$
> \alpha(x_1,\dots,x_m)=x_1x_2\cdots x_m.
> $$
>
> Hence one might, for convenience, think of an $m$-linear form as a "multiplication" of $m$ vectors, obeying the distributive law. For example, for a bilinear form $\beta$ on $V$,
>
> $$
> \begin{align*}
> \beta(v_1+v_2,w_1+w_2)&=\beta(v_1,w_1+w_2)+\beta(v_2,w_1+w_2)\\
> &=\beta(v_1,w_1)+\beta(v_1,w_2)+\beta(v_2,w_1)+\beta(v_2,w_2).
> \end{align*}
> $$
>
> In fact, this "distributive property" is simply a restatement of multilinearity in a more intuitive form.
{: .prompt-tip}

{% capture def_content %}
An $m$-linear form $\alpha$ is called alternating if $\alpha(v_1,\dots,v_m)=0$ whenever $v_i=v_j$ for some $1\leq i<j\leq n$. The vector space of alternating $m$-linear forms on $V$ is denoted by $V_{\text{alt}}^{(m)}$.
{% endcapture %}
{% include thms/definition.html content=def_content %}

{% capture thm_content %}
Suppose $\alpha\in V_{\text{alt}}^{(m)}$. If $v_1,\dots,v_m$ is linearly dependent, then $\alpha(v_1,\dots,v_m)=0$.
{% endcapture %}
{% include thms/theorem.html title="linear dependence and alternating multilinear forms" content=thm_content %}

{% capture pf_content %}
Suppose $a_1v_1+\cdots+a_mv_m=0$ for some $a_1,\dots,a_m\in\F$, not all zero. Let $k$ be the greatest integer with $a_k\neq0$. Then

$$
v_k=\frac{a_1}{a_k}v_1+\cdots+\frac{a_k-1}{a_k}v_{k-1}.
$$

Hence

$$
\begin{align*}
    \alpha(v_1,\dots,v_n)&=\frac{a_1}{a_k}\alpha(v_1,\dots,v_{k-1},v_1,v_{k+1},\dots,v_n)+\cdots+\frac{a_{k-1}}{a_k}\alpha(v_1,\dots,v_{k-1},v_{k-1},v_{k+1},\dots,v_n)\\
    &=0.
\end{align*}
$$

{% endcapture %}
{% include thms/proof.html content=pf_content %}

{% capture thm_content %}
Suppose $\alpha\in V_{\text{alt}}^{(m)}$, and $v_1,\dots,v_m\in V$. Then

$$
\alpha(v_1,\dots,v_i,\dots,v_j,\dots,v_n)=-\alpha(v_1,\dots,v_j,\dots,v_i,\dots,v_n).
$$
{% endcapture %}
{% include thms/theorem.html title="" content=thm_content %}

{% capture pf_content %}
Follow the tip above.

$$
\begin{align*}
    0&=\alpha(v_1,\dots,v_i+v_j,\dots,v_i+v_j,\dots,v_n)\\
    &=\alpha(v_1,\dots,v_i,\dots,v_i,\dots,v_n)+\alpha(v_1,\dots,v_i,\dots,v_j,\dots,v_n)\\
    &+\alpha(v_1,\dots,v_j,\dots,v_i,\dots,v_n)+\alpha(v_1,\dots,v_j,\dots,v_j,\dots,v_n)\\
    &=\alpha(v_1,\dots,v_i,\dots,v_j,\dots,v_n)+\alpha(v_1,\dots,v_j,\dots,v_i,\dots,v_n).
\end{align*}
$$

{% endcapture %}
{% include thms/proof.html content=pf_content %}

If you fully exploit the multilinearity, the following idea should come to your mind. One can write each input vector as a linear combination of basis vectors, and then expand the multilinear form accordingly using the distributive property. That gives rise to the key observation below.

{% capture thm_content %}
Suppose $e_1,\dots,e_n$ is a basis of $V$ and $v_1,\dots,v_n\in V$. Let

$$
v_k=\sum_{j=1}^nb_{k,j}e_j
$$

for each $1\leq k\leq n$. You can think of it as a *formal* matrix multiplication. Then

$$
\alpha(v_1,\dots,v_n)=\alpha(e_1,\dots,e_n)\sum_{\sigma\in\text{perm}(n)}\sgn(\sigma)b_{1,\sigma(1)}b_{2,\sigma(2)}\cdots b_{n,\sigma(n)}.
$$
{% endcapture %}
{% include thms/theorem.html title="formula for alternating $(\dim V)$-linear forms on $V$" content=thm_content %}

The proof is trivial. Follow the steps below.
- Write each input vector as a linear combination of $e_1,\dots,e_n$.
- Expand the alternating form using multilinearity (distributive property) and extract the scalars.
- Consider each term. Permute the entries, transforming $\alpha(e_{\sigma(1)},\dots,e_{\sigma(n)})$ to $\sgn(\sigma)\alpha(e_1,\dots,e_n)$. Recall that swapping two entries negates the sign of the permutation as well as the value of the alternating multilinear form.

One should notice that we have already reached a very similar form to determinants in the theorem above. After the next theorem, we shall define determinants in a clean, basis-free way.

{% capture thm_content %}
$$
\dim V_{\text{alt}}^{(\dim V)}=1.
$$
{% endcapture %}
{% include thms/theorem.html title="$\dim V_{\text{alt}}^{(\dim V)}=1$" content=thm_content %}

That is to say, there exists an alternating $(\dim V)$-linear form, and any alternating $(\dim V)$-linear form is a scalar multiple of another arbitrary alternating $(\dim V)$-linear form. It can be proved easily by using the last theorem properly.

### Definition by Multilinear Algebra

Be patient. Nice results with clean proofs are on the way.

{% capture def_content %}
Suppose $n=\dim V$, $T\in\L(V)$, and $\alpha\in V_{\text{alt}}^{(n)}$. Define $\alpha_T$ by

$$
\alpha_T(v_1,\dots,v_n)=\alpha(Tv_1,\dots,Tv_n).
$$

It can be shown that the map $\alpha\mapsto\alpha_T$ is a linear map from $V_{\text{alt}}^{(\dim V)}$ to itself. Because the domain and codomain both have dimension $1$, the linear map is simply multiplication by a scalar. We define $\det T$ to be that scalar. In other words,

$$
\alpha_T=(\det T)\alpha
$$

for all $\alpha\in V_{\text{alt}}^{(\dim V)}$.

We define the determinant of a matrix $A\in\F^{n,n}$ to be $\det T$, where $T\in\L(\F^n)$ and $\M(T,(e_1,\dots,e_n))=A$. Here $\M(T,(e_1,\dots,e_n))$ means the matrix of linear operator $T$ with respect to the standard basis of $\F^n$.
{% endcapture %}
{% include thms/definition.html content=def_content %}

You might think that this definition is just as perplexing as the textbook definition, and is hardly practically useful. You will change your mind after the next theorem.

{% capture thm_content %}
Suppose $x_1,\dots,x_n\in\F^n$. The map $(x_1,\dots,x_n)\mapsto\det\begin{bmatrix}x_1&\dots&x_n\end{bmatrix}$ is an alternating $n$-linear form on $\F^n$.
{% endcapture %}
{% include thms/theorem.html title="determinant is an alternating multilinear form" content=thm_content %}

Note that in the proof below, we conjecture that $\alpha$ is precisely the $\det$. This is based on the result we are proving and the theorem that $\dim V_{\text{alt}}^{(\dim V)}=1$.

{% capture pf_content %}
Define $T\in\L(\F^n)$ by $Te_k=x_k$ for each $1\leq k\leq n$. Then $\M(T,(e_1,\dots,e_n))=\begin{bmatrix}x_1&\dots&x_n\end{bmatrix}$. Let $\alpha$ be the alternating $n$-linear form on $\F^n$ with $\alpha(e_1,\dots,e_n)=1$. We prove that

$$
\alpha(x_1,\dots,x_n)=\det\begin{bmatrix}x_1&\dots&x_n\end{bmatrix}.
$$

By definition,

$$
\begin{align*}
    \det\begin{bmatrix}x_1&\dots&x_n\end{bmatrix}&=\det T\\
    &=(\det T)\cdot\alpha(e_1,\dots,e_n)\\
    &=\alpha(Te_1,\dots,Te_n)\\
    &=\alpha(x_1,\dots,x_n).
\end{align*}
$$
{% endcapture %}
{% include thms/proof.html content=pf_content %}

Now that $\det$ is an alternating $n$-linear form on $\F^n$ with $\det\begin{bmatrix}e_1&\dots&e_n\end{bmatrix}=1$, we recover the explicit formula of determinants by the theorem of the formula for alternating $(\dim V)$-linear forms on $V$.

What makes this multilinear algebra-based definition so fascinating is the clean proofs of some important theorems about determinants.

### Clean Proofs of Theorems about Determinants

> Determinant is multiplicative. Suppose $S,T\in\L(V)$. Then $\det(ST)=(\det S)(\det T)$.

$$
\begin{align*}
    (\det ST)\alpha(v_1,\dots,v_n)&=\alpha_{ST}(v_1,\dots,v_n)\\
    &=\alpha(STv_1,\dots,STv_n)\\
    &=\alpha_S(Tv_1,\dots,Tv_n)\\
    &=(\det S)\alpha(Tv_1,\dots,Tv_n)\\
    &=(\det S)(\det T)\alpha(v_1,\dots,v_n).
\end{align*}
$$

Here $\alpha$ is a nonzero alternating $(\dim V)$-linear form, and $\alpha(v_1,\dots,v_n)\neq0$.

> An operator $T\in\L(V)$ is invertible if and only if $\det T\neq0$.

Suppose $T$ is invertible. $(\det T)(\det(T^{-1}))=\det(TT^{-1})=1$ implies that $\det T\neq0$. Suppose $T$ is not invertible and $n=\dim V$. Let $\alpha$ be a nonzero alternating $n$-linear form with $\alpha(v_1,\dots,v_n)\neq0$. By the theorem of linear dependence and alternating multilinear forms (we use its contrapositive), $v_1,\dots,v_n$ is linearly independent, and therefore is a basis of $V$. Because $\dim\im T<n$, $Tv_1,\dots,Tv_n$ is linearly dependent. Hence $\alpha_T(v_1,\dots,v_n)=0$, using the theorem again. Then $\det T=0$ follows from $\alpha_T(v_1,\dots,v_n)=(\det T)\alpha(v_1,\dots,v_n)$.

> $\det A^\T=\det A$, without excessive use of the explicit formula.

Define $\alpha:(\F^n)^n\to\F$ by $\alpha(x_1,\dots,x_n)=\det\begin{bmatrix}x_1&\dots&x_n\end{bmatrix}^\T$. By the explicit formula, we obtain that $\alpha$ is an $n$-linear form on $\F^n$. Let $A=\begin{bmatrix}x_1&\dots&x_n\end{bmatrix}^\T$. When $x_i=x_j$ for some $i\neq j$, the matrix cannot have a right inverse because for any $B\in\F^{n,n}$, row $i$ and row $j$ of $AB$ are identical. Hence $\det A=0$, proving that $\alpha$ is an alternating $n$-linear form on $\F^n$ with $\alpha(e_1,\dots,e_n)=1$. Hence $\alpha(x_1,\dots,x_n)=\det\begin{bmatrix}x_1&\dots&x_n\end{bmatrix}$, as desired.


## Other Perspectives

### A Natural Homomorphism

$\det$ is a natural homomorphism from $GL_n(F)$ to the multiplicative group of $F^\times$.

I do not plan to talk too much about this, because I do not know that much about group theory and category theory.

### An Axiomatic Definition

{% capture thm_content %}
Suppose $\delta:\F^{n,n}\to\F$ is a function such that
- $\delta(AB)=\delta(A)\delta(B)$ for all $A,B\in\F^{n,n}$;
- $\delta(\text{diag}(\lambda_1,\dots,\lambda_n))=\lambda_1\cdots\lambda_n$ for all $\lambda_1,\dots,\lambda_n\in\F$.

Then $\delta(A)=\det A$ for all $A\in\F^{n,n}$.
{% endcapture %}
{% include thms/theorem.html title="axiomatic definition of determinant" content=thm_content %}

Here is an elementary proof.

> Better proofs likely exist. If you have one (even for a weaker result), please share it with me. I'd appreciate it very much.
{: .prompt-info}

{% capture pf_content %}
We first show that the desired result holds for every diagonalizable matrix $A$. Suppose $A=X\Lambda X^{-1}$, where $\Lambda=\text{diag}(\lambda_1,\dots,\lambda_n)$.

$$
\delta(A)=\delta(X)\delta(\Lambda)\delta(X^{-1})=\delta(XX^{-1})\delta(\Lambda)=\lambda_1\cdots\lambda_n=\det A.
$$

Now we prove the general case. Apply Gauss-Jordan elimination to a matrix $A$. We have $E_1\cdots E_iAE_{i+1}\cdots E_j=D$, where $D$ is diagonal and $E_k$'s are elementary matrices. It suffices to show that $\delta(M)=\det M$ for every elementary matrix $M$.

Consider a permutation matrix $P$. $P^2=I$ implies that the minimal polynomial of $P$ is a divisor of $z^2-1$. That implies that the minimal polynomial of $P$ has no repeated roots. Hence $P$ is diagonalizable, proving the desired result.

Consider a row-multiplying matrix or a row-addition matrix $E$, which is an invertible triangular matrix. By selecting proper $r_1,\dots,r_n$, $\text{diag}(r_1,\dots,r_n)E$ is a triangular matrix with pairwise distinct entries, and is hence diagonalizable. That proves the desired result.

Now the proof is completed.
{% endcapture %}
{% include thms/proof.html content=pf_content %}

The theorem above gives an axiomatic definition of determinants. Besides that, let's return to the topic of determinant and volume. Let $\F=\R$ and think of a matrix as a transformation. The theorem above tells us that, if you believe that
- transformation by a diagonal matrix changes the volume by the product of the matrix's diagonal entries;
- the volume scaling effect of a composite transformation is the product of the individual volume scalign effects,

then determinants do measure the volume scaling factor.

This theorem should have *many* other implications in fields such as representation theory. To be honest, I know absolutely nothing about them. Ask AI if you are interested, maybe?


## After All, What Have We Achieved?

In this article, we achieve two main goals.

The first is to give a clean, basis-free definition of determinants, and a satisfying explanation for the explicit formula of determinants. Along with it, we prove several important theorems in more intuitive ways.

The second goal is to select several properties such that the only mathematical object $\delta$ satisfying the properties is the determinant. We arrive at two sets of properties.
1. Multilinear algebra-based, $\delta:(\F^n)^n\to\F$.
   - $\delta(x_1,\dots,x_i+x_i',\dots,x_n)=\delta(x_1,\dots,x_i,\dots,x_n)+\delta(x_1,\dots,x_i',\dots,x_n)$;
   - $\delta(x_1,\dots,cx_i,\dots,x_n)=c\delta(x_1,\dots,x_i,\dots,x_n)$;
   - $\delta(x_1,\dots,x_n)=0$ whenever $x_i=x_j$ for some $i\neq j$.
   - $\delta(e_1,\dots,e_n)=1$.
2. Axiomatic, $\delta:\F^{n,n}\to\F$.
   - $\delta(AB)=\delta(A)\delta(B)$;
   - $\delta(\text{diag}(\lambda_1,\dots,\lambda_n))=\lambda_1\cdots\lambda_n$.


## Footnotes

[^fn-field]: $\F$ denotes an arbitrary field. If you are not familiar with this concept, just treat it as $\R$ or $\C$.
[^fn-multiplicative-det]: See the course textbook for the complicated proof.
[^fn-change-of-variables]: This is *not* true with the change of variables formula, if you have read a proof before.