---
layout: post
title: 'The Axiom of Choice: Equivalent Formulations and Surprising Consequences'
created: '2025-10-31'
categories:
- Mathematics
tags:
- mathematics
description: What is the mysterious axiom of choice? Why the hell do we need it even just to show that every infinite set has a countable subset? Why does every vector space have a basis? ...
math: true
---
> To choose one sock from each of infinitely many pairs of socks requires the Axiom of Choice, but for shoes the Axiom is not needed.[^Russell]
> 
> ---Bertrand Russell

> The Axiom of Choice is obviously true; the well-ordering principle is obviously false; and who can tell about Zorn's lemma?[^Bona]
>
> ---Jerry Bona

> Thought is subversive and revolutionary, destructive and terrible; thought is merciless to privilege, established institutions, and comfortable habit. Thought looks into the pit of hell and is not afraid. Thought is great and swift and free, the light of the world, and the chief glory of man.
>
> ---Bertrand Russell


## Introduction

Instead of throwing the definitions and theorems straight at your face, we first raise some seemingly trivial but somewhat interesting questions.

1. Is it true that every infinite set has a countable (countably infinite) subset?
2. Is it true that the Cartesian product of any nonempty collection of nonempty sets is nonempty?

For the first question, you may say that hey you are just too stupid. We can construct an infinite sequence $$\{x_n\}_{n\in\NN}\subseteq X$$ by the following. Take $x_0\in X$. Inductively, after $$\{x_n\}_{n\leq m}$$ is fixed, take $$x_{m+1}\in X\backslash\{x_n\}_{n\leq m}$$ because $X$ is infinite. But you only proved by induction (recall what induction means) that for any $n\in\NN$ there exists a (finite) sequence of length $n$ in $X$, rather than an infinite one. A correct proof (of course the proposition is true) is given below using the axiom of choice; you can scroll down if you are really curious.

For the second question, we first make precise the notion of the Cartesian product of an arbitrary collection of sets. Suppose $I$ is an index set and $\mathcal A=\\{A_i:i\in I\\}$ is a collection of nonempty sets. Define the Cartesian product

$$
\prod_{i\in I}A_i=\cbra{(f:I\to\bigcup\mathcal A):f(i)\in A_i,\forall i\in I}.
$$

When $I=\emptyset$ or $\emptyset\in\mathcal A$ then the Cartesian product is certainly empty. Otherwise, that $\prod_i A_i\neq\emptyset$ is equivalent to the existence of an $f:I\to\bigcup\mathcal A$ with $f(i)\in A_i$ for each $i$, called a *choice function*. This is precisely what the axiom of choice says!

{% capture def_content %}
Let $I$ be an index set and $\mathcal A=\\{A_i:i\in I\\}$ be a collection of sets indexed by $I$. A choice function on $\mathcal A$ is a function $f:I\to\bigcup\mathcal A$ such that $f(i)\in A_i$ for each $i\in I$. Note that a set $X$ can always be indexed by itself: $X=\\{x:x\in X\\}$, so a choice function on $X$ is a function $f:X\to\bigcup X$ such that $f(S)\in S$ for each $S\in X$.
{% endcapture %}
{% include thms/definition.html content=def_content %}

<div class="theorem-box">
  <div class="theorem-title">
    <strong>The Axiom of Choice (AC).</strong>
  </div>
  <div class="theorem-content">
    Any set of nonempty sets has a choice function. Equivalently, the Cartesian product of any nonempty collection of nonempty sets is nonempty.
  </div>
</div>

> The axiom of choice ("C"), together with Zermelo-Fraenkel ("ZF") set theory, constitutes the standard form[^ZFC] of axiomatic set theory (ZFC), the most common foundation of mathematics. AC is independent of ZF in the sense that if ZF is consistent (this is unknown[^consistency]), then so is ZFC; and if ZF is consistent, then so is ZF with the negation of AC.
{: .prompt-info}

Enough of those confusing words about axiomatic set theory. Next we give two equivalent formulations of AC (Zorn's lemma and the well-ordering theorem) and prove their equivalence. After that, we present some interesting and perhaps surprising consequences. For readers' convenience, we here list the results that will be covered, and state Zorn's lemma and the well-ordering theorem.

> If you are not at all interested in the proofs of the equivalence of the three formulations, you can totally skip them all without hindering the understanding of the interesting and perhaps surprising results about the axiom of choice.
{: .prompt-tip}

Results that will be covered (in the following order, without any interdependence):

- (Done) The Cartesian product of any nonempty collection of nonempty sets is nonempty.
- Every infinite set has a countable subset.
- Every vector space has a basis.
- There does not exist a perfect generalization of the length of an interval to all subsets of $\RR$. (We will make that notion precise.)
- Every finitely generated group possesses maximal subgroups.

> One can search the internet for the (quite simple) definitions of a partial order, a total order, and a well-order.
{: .prompt-tip}

<div class="theorem-box">
  <div class="theorem-title">
    <strong>Zorn's Lemma.</strong>
  </div>
  <div class="theorem-content">
    If $P$ is a nonempty partially ordered set (poset) in which every chain has an upper bound, then $P$ has a maximal element.
  </div>
</div>

<div class="theorem-box">
  <div class="theorem-title">
    <strong>The Well-Ordering Theorem. (Zermelo)</strong>
  </div>
  <div class="theorem-content">
    Every set can be well-ordered, i.e., totally ordered such that every nonempty subset has a least element.
  </div>
</div>


## Equivalence of the Three Formulations

> In the following text, we shall frequently treat functions and relations as their underlying sets.
{: .prompt-tip}

### AC implies Zorn's lemma

For the sake of contradiction, assume that $P$ is a nonempty poset s.t.

1. Every chain in $P$ has an upper bound;
2. $P$ has no maximal elements.

Let $\mathcal T$ be the set of all chains in $P$; it is a set because it is a subclass of the power set $\P(P)$. Define functions 

$$
F:\mathcal T\to\P(P)\backslash\{\emptyset\},\quad G:P\to\P(P)\backslash\{\emptyset\}
$$

by

$$
F(T)=\{x\in P:c\leq x,\forall c\in T\},\quad G(a)=\{x\in P:a\leq x, a\neq x\}.
$$

So $F(T)$ is the set of all upper bounds of the chain $T$, and $G(a)$ is the set of elements strictly greater than $a$. That $F(T)$ and $G(a)$ are nonempty follows from the two conditions above.

Now consider $\\{F(T):T\in\mathcal T\\}$, treated as a collection of nonempty subsets of $P$ indexed by $\mathcal T$, and $\\{G(a):a\in P\\}$, treated as a collection of nonempty subsets of $P$ indexed by $P$. By AC, let $f$ be a choice function on $\\{F(T):T\in\mathcal T\\}$ and $g$ a choice function on $\\{G(a):a\in P\\}$, i.e.,

- $f:\mathcal T\to P$ satisfies $(c\leq f(T),\forall c\in T)$ for each $T\in\mathcal T$;
- $g:P\to P$ satisfies $x\leq f(x), x\neq f(x)$ for each $x\in P$.

So $f(T)$ selects an upper bound of the chain $T$, and $g(x)$ selects an element strictly greater than $x$.

Define $h:\mathcal T\to P$ by $h=g\circ f$. This function assigns to each chain an upper bound outside the chain.

> The following steps require some knowledge of ordinals and transfinite recursion. One can refer to Chapter 2 of *Set Theory* by Thomas Jech.
{: .prompt-tip}

> I personally think the chapter on ordinals is very difficult, but Qinxiang Cao told me it is very easy!
{: .prompt-danger}

Define a sequence $\abra{a_\alpha:\alpha\in\ord}$ by transfinite recursion:

$$
a_\alpha=h(\im a\restriction_\alpha)=h(\im\abra{a_\xi:\xi<\alpha})=h(\cbra{a_\xi:\xi<\alpha})
$$

for each $\alpha\in\ord$. One should be convinced that the recursion rule can be formulated as a function on the class of all transfinite sequences. By the property of $h$ as noted above, for any ordinal $\alpha$, $a\restriction_\alpha$ is an injective transfinite sequence whose image is a chain in $P$, ensuring that the recursion is well-defined.

That immediately leads to a contradiction. Let $a^{-1}:\im a\to\ord$ be the surjective inverse function. By the axiom schema of replacement, $\im a^{-1}=\ord$ is a set, a contradiction. That completes the proof.

### Zorn's lemma implies AC

This proof is a typical application of Zorn's lemma. Suppose $\emptyset\not\in X\neq\emptyset$ is a nonempty collection of nonempty sets. Let $U=\bigcup X$.

Let

$$
P=\cbra{(f:X'\to U):X'\subseteq X, f(S)\in S,\forall S\in X'}
$$

be a poset under set inclusion, i.e., function extension.

Because we can easily construct an $f$ by taking $X'$ to be a singleton, $P$ is nonempty. Let

$$
T=\{(f_i:X_i\to U):i\in I\}
$$

be a chain in $P$. The following steps lead to that $\bigcup T$ is an upper bound of $T$ in $P$. The proof of each step is nothing more than verifying the definitions and hence is omitted.

1. $$\bigcup T=\bigcup_{i\in I}f_i:\bra{\bigcup_{i\in I}X_i}\to U.$$
2. $$\bigcup T\in P.$$
3. $\bigcup T$ is an upper bound of $T$.

By Zorn's lemma, $P$ has a maximal element $\tilde f:\tilde X\to U$. If $\tilde X=X$ then $\tilde f$ is a choice function we seek. Otherwise take $S\in X\backslash\tilde X$ and $x\in S$, and $\bra{\tilde f\cup\\{(S,x)\\}}\in P$ contradicts the maximality of $\tilde f$. The proof is completed.


### Zorn's lemma implies the well-ordering theorem

This proof is essentially the same as the proof that Zorn's lemma implies AC. Suppose $X$ is a nonempty set (if it is empty the desired result holds trivially).

Let

$$
P=\cbra{(X',\leq):X'\subseteq X\text{ is well-ordered by }\leq}
$$

be partially ordered by

$$
(X',\leq_{X'})\leq(X'',\leq_{X''})\iff X'\subseteq X'',(\leq_{X'})\subseteq(\leq_{X''}).
$$

For a chain $T$ in $P$, we can similarly show that $\bigcup T$ is an upper bound of $T$ in $P$. By Zorn's lemma, $P$ has a maximal element which is necessarily $X$ with a well-ordering, completing the proof.

### AC implies the well-ordering theorem

Suppose $X$ is a nonempty set (if it is empty the desired result holds trivially). By AC, let $f$ be a choice function on $\P(X)\backslash\\{\emptyset\\}$.

Define a sequence $a$ by transfinite recursion:

$$
a_\alpha=f(P\backslash\im\abra{a_\xi:\xi<\alpha})=f(P\backslash\{a_\xi:\xi<\alpha\}).
$$

If $\\{a_\alpha:\alpha<\theta\\}=P$ for some $\theta\in\ord$, then the process terminates here and we obtain a $\theta$-sequence $\abra{a_\alpha:\alpha<\theta}$. This is actually always the case because otherwise $\ord$ would be a set by the injectivity of $a$ (see the next paragraph).

Because $f$ is a choice function, $a$ is injective and hence a bijection between an ordinal $\theta$ and $P$. That gives the desired well-ordering: for $a_\alpha,a_\beta\in P$, $a_\alpha\leq a_\beta$ if and only if $\alpha\leq\beta$. That this is a well-ordering follows from that every ordinal, including $\theta$, is well-ordered.

### The well-ordering theorem implies AC

Suppose $\emptyset\not\in X\neq\emptyset$ is a nonempty collection of nonempty sets. By the well-ordering theorem, let $\bigcup X$ be well-ordered by $\leq$.

The idea is simple and straightforward. AC is needed only when no explicit rule of selection can be given (see the first quote at the beginning of the article and the first footnote). The well-order gives us a canonical way to make the selection, so we do not need AC.

We make the above notion precise by explicitly constructing a choice function. Let $\phi(x,y,p)$ be the first-order formula

$$
\phi(S,s,X)=(S\in X\land x\in S\land\forall x(x\in S\to s\leq x)).
$$

We wrote $\phi(x,y,p)$ above to emphasize that $\phi$ is meant to be a function. It can be verified that $\phi$ is the function that maps each set in $X$ to the least element of it, a choice function as desired.

If you prefer something more formal, we can make $\phi$ a function on the universe $V$ and restrict this class function to obtain a set function (a set) *in* the set $X\times\bigcup X$.

$$
\phi(S,x,X)=((S\in X\land x\in S\land\forall x(x\in S\to s\leq x))\lor(S\not\in X\land x=\emptyset)).
$$

> We cannot give a well-order to every set in $X$ because that requires many choices (one choice for each set in $X$), which per se requires the axiom of choice. Our approach requires only one choice, namely choosing a well-order on $\bigcup X$.
{: .prompt-warning}


## Consequences of the Axiom of Choice

After all those proofs (they actually can be skipped without hindering the understanding of the results below), we arrive at some interesting and perhaps surprising consequences of the axiom of choice.

### Every infinite set has a countable subset.

The problem with the naive proof in the introduction is that inductions (of natural numbers) can never truly reach the infinity. Transfinite recursion comes to the rescue.

Let $X$ be an infinite set. By AC, let $f$ be a choice function on $\P(X)\backslash\\{\emptyset\\}$. Define an $\omega$-sequence $\abra{a_n:n<\omega}$ by transfinite recursion:

$$
a_n=f(X\backslash\im a\restriction_n)=f(X\backslash\{a_0,\dots,a_{n-1}\}).
$$

Here $\omega$ is the least nonzero limit ordinal, i.e., the set $\NN$ of natural numbers in the usual sense, and $n<\omega$ simply means $n\in\NN$. We use this notation to emphasize that we are performing a transfinite recursion (with no limit steps).

That solves the problem of infinity and well-defines an injective (infinite) sequence in $X$, proving the desired result.

### Every vector space has a basis.

In linear algebra courses we usually deal only with finite-dimensional vector spaces. Let $V$ be a vector space (of arbitrary dimension) over a field $K$.

> One might search the internet for the definition of a vector space over a field. But in this article the field can be simply taken to be $\RR$.
{: .prompt-info}

- A linear combination of a (possibly infinite) subset $A\subseteq V$ is a *finite* sum of the form $c_1v_1+\cdots+c_nv_n$, where $a_i\in K,v_i\in A$ for each $i$.
- A subset $A\subseteq V$ is said to be linearly independent if there do not exist $v,v_1,\dots,v_n\in A$ such that $v$ is a linear combination of $v_1,\dots,v_n$.
- A subset $A\subseteq V$ is said to be spanning if every vector in $V$ is a linear combination of $A$.
- A linearly independent subset $A\subseteq V$ is said to be a basis of $V$ if it spans $V$.

In short, a linear combination has to be finite. This is fairly reasonable: we hope $\\{1,x,x^2,\dots\\}$ to be a basis of the vector space $\RR[x]$ of polynomials in $x$ with real coefficients, and we do not hope power series to mess everything up.

Notice that a basis is a linearly independent subset that is maximal under set inclusion. That motivates the usage of Zorn's lemma. Let $P$ be the set of all linearly independent subsets of $V$, partially ordered by set inclusion. If $V=\\{0\\}$ then the result is trivial; hence assume $V$ is nontrivial. Taking $A$ to be the singleton of any nonzero vector leads to $P\neq\emptyset$.

Let $T$ be a chain in $P$. Straightforward verifications of definitions lead to that $\bigcup T$ is an upper bound of $T$ in $P$. By Zorn's lemma, $P$ has a maximal element $B$. It has to span $V$, because otherwise let $v\in V$ be a vector not spanned by $B$, and $B\cup\\{v\\}\in P$ (as you can verify) contradicts the maximality of $B$. Now $B$ is a linearly independent subset that spans $V$, i.e., a basis of $V$.

### There does not exist a perfect generalization of the length of an interval to all subsets of $\RR$.

> The Riemann integral is not good enough:
> 
> - It does not handle functions with too many discontinuities;
> - It does not handle unbounded functions;
> - It interacts badly with limits (in terms of interchanging limits and integrals).

For a better theory of integration, a notion of size (a *measure*) is needed for more general subsets of $\RR$ than intervals.

> Do not ask any further questions regarding the sentence above, unless you would like to run into the hell of measure theory, real analysis and functional analysis.
{: .prompt-danger}

No worry, we do not talk about $\sigma$-algebras and measures here. We only prove the following disappointing fact that there does not exist a perfect notion of size that satisfies all desired properties.

{% capture thm_content %}
There does not exist a function $\mu:\P(\RR)\to[0,\infty]$ satisfying all the following properties.

- For every open interval $I=(a,b)$, $\mu(I)=\ell(I)$ where $\ell(I)=b-a$ is the length of the interval. Here $a<b$ and $a,b\in\RR\cup\\{-\infty,\infty\\}$.
- (Countable additivity) For any pairwise disjoint sequence $\\{A_k\\}_{k\in\ZZ^+}\subseteq\P(\RR)$,

$$
\mu\bra{\bigcup_{k=1}^\infty A_k}=\sum_{k=1}^\infty\mu(A_k).
$$

- (Translation invariance) For every $A\subseteq\RR$ and $t\in\RR$, $\mu(t+A)=\mu(A)$, where $t+A=\\{t+a:a\in A\\}$.
{% endcapture %}
{% include thms/theorem.html title="Vitali" content=thm_content %}

All conditions above seem natural: our notion of size should be a generalization of the length of intervals; countable additivity is needed in order to take limits (the core of calculus); a natural notion of size should be invariant under translation. However, we now show that such a perfect function does not exist, assuming the axiom of choice.

For the sake of contradiction, assume such a $\mu$ does exist. We first derive some handy properties of $\mu$.

> (1) $\mu(\emptyset)=0$.
> 
> (2) (Finite additivity) For any pairwise disjoint $A_1,\dots,A_n\subseteq\RR$,
> 
> $$
> \mu\bra{\bigcup_{k=1}^n A_k}=\sum_{k=1}^n\mu(A_k).
> $$
> 
> (3) If $A\subseteq B\subseteq\RR$, then $\mu(A)\leq\mu(B)$.
> 
> (4) $\mu([a,b])=b-a$ for $a,b\in\RR\cup\\{-\infty,\infty\\}$.
> 
> (5) (Subadditivity) For any $\\{A_k\\}_{k\in\ZZ^+}\subseteq\P(\RR)$,
> 
> $$
> \mu\bra{\bigcup_{k=1}^\infty A_k}\leq\sum_{k=1}^\infty\mu(A_k).
> $$
> 
> (6) $\mu(A)=0$ for any at most countable subset $A\subseteq\RR$.

(1) to (4) should be easy. To prove (1), take $A_1=(0,1)$, $A_2=A_3=\cdots=\emptyset$ and apply countable additivity. For (2), take $A_{n+1}=A_{n+2}=\cdots=\emptyset$ and apply countable additivity. For (3), take $A_1=A$, $A_2=B\backslash A$ and apply finite additivity. For (4), apply (3) to $(a,b)\subseteq[a,b]\subseteq(a-\epsilon,b+\epsilon)$.

For (5),

$$
\mu\bra{\bigcup_{k=1}^\infty A_k}=\mu\bra{\bigcup_{k=1}^\infty A_k\backslash A_{k-1}}=\sum_{k=1}^\infty\mu(A_k\backslash A_{k-1})\leq\sum_{k=1}^\infty\mu(A_k),
$$

where the second equality follows from countable additivity and the last inequality follows from (3). Finite subadditivity holds similarly.

For (6), the finite case $A=\\{a_1,\dots,a_n\\}$ follows from subadditivity and $A\subseteq\bigcup_{k=1}^n(a_k-\epsilon/n,a_k+\epsilon/n)$, and the countable case $A=\\{a_k\\}_{k\in\ZZ^+}$ follows from subadditivity and

$$
A\subseteq\bigcup_{k=1}^\infty\bra{a_k-\frac\epsilon{2^k},a_k+\frac\epsilon{2^k}}.
$$

With all preparations made, we prove the theorem. Define an equivalence relation $\sim$ on $A=[-1,1]\cap\QQ$ by $a\sim b$ if $a-b\in\QQ$. Let $P=\\{[a]:a\in A\\}$ be the set of equivalence classes under $\sim$. By AC, let $f$ be a choice function on $P$ and let $V=\im f$. So $f$ assigns to each equivalence class a representative of it, and $V$ contains a unique representative of every equivalence class.


### Every finitely generated group possesses maximal subgroups.




[^Russell]: The axiom of choice is needed only when we cannot give an explicit way to make the selection.
[^Bona]: This is a joke. Although the three are mathematically equivalent, many mathematicians find the axiom of choice intuitive, the well-ordering principle counterintuitive, and Zorn's lemma too complex for any intuition. I have the same feeling. :)
[^ZFC]: There are other models, some of which hair-raising. Set theorists are definitely no human.
[^consistency]: It follows from Gödel's second incompleteness theorem that ZF cannot prove its own consistency unless it is actually inconsistent.
