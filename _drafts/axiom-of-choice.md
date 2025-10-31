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

For the second question, we first make precise the notion of the Cartesian product of a nonempty collection of nonempty sets. Suppose $I\neq\emptyset$ is an index set and $\mathcal A=\\{A_i:i\in I\\}\not\ni\emptyset$ is a (nonempty) collection of nonempty sets. Define the Cartesian product

$$
\prod_{i\in I}A_i:=\cbra{(f:I\to\bigcup\mathcal A):f(i)\in A_i,\forall i\in I}.
$$

That $\prod_i A_i\neq\emptyset$ is equivalent to the existence of an $f:I\to\bigcup\mathcal A$ with $f(i)\in A_i$ for each $i$, called a *choice function*. This is precisely what the axiom of choice says!

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

Results that will be covered (in the following order, without any interdependence):

- (Done) The Cartesian product of any nonempty collection of nonempty sets is nonempty.
- Every infinite set has a countable subset.
- Every vector space has a basis.
- There does not exist a perfect generalization of the length of an interval to all subsets of $\RR$. (We will make that notion precise.)
- Every finitely generated group possesses maximal subgroups.

> One can search the internet for the (quite simple) definitions of a partial order, a total order, and a well order.
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

For the sake of contradiction, assume that $P\neq\emptyset$ is a poset s.t.

1. Every chain in $P$ has an upper bound.
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

Now consider $\\{F(T):T\in\mathcal T\\}$, treated as a collection of nonempty subsets of $P$ indexed by $\mathcal T$, and $\\{G(a):a\in P\\}$, treated as a collection of nonempty subsets of $P$ indexed by $P$. By AC, let $f$ be a choice function of $\\{F(T):T\in\mathcal T\\}$ and $g$ a choice function of $\\{G(a):a\in P\\}$, i.e.,

- $f:\mathcal T\to P$ satisfies $(c\leq f(T),\forall c\in T)$ for each $T\in\mathcal T$;
- $g:P\to P$ satisfies $x\leq f(x), x\neq f(x)$ for each $x\in P$.

So $f(T)$ selects an upper bound of the chain $T$, and $g(x)$ selects an element strictly greater than $x$.

Define $h:\mathcal T\to P$ by $h=g\circ f$. This function assigns to each chain an upper bound outside the chain.

> Knowledge of ordinals and transfinite recursion is required in the following step. One can refer to *Set Theory* by Thomas Jech. I personally think the chapter on ordinals is very difficult, but Qinxiang Cao told me it is very easy!
{: .prompt-tip}

Define a sequence $\abra{a_\alpha:\alpha\in\ord}$ by transfinite recursion:

$$
a_\alpha=h(\im a\restriction_\alpha)=h(\im\abra{a_\xi:\xi<\alpha})=h(\cbra{a_\xi:\xi<\alpha})
$$

for each $\alpha\in\ord$. One should be convinced that the recursion rule can be formulated as a function on the class of all transfinite sequences. By the property of $h$ as noted above, for any ordinal $\alpha$, $a\restriction_\alpha$ is an injective transfinite sequence whose image is a chain in $P$, ensuring that the recursion is well-defined.

That immediately leads to a contradiction. Let $a^{-1}:\im a\to\ord$ be the surjective inverse function. By the axiom schema of replacement, $\im a^{-1}=\ord$ is a set, a contradiction. That completes the proof.

### Zorn's lemma implies AC

This proof is a typical application of Zorn's lemma. Suppose $\emptyset\not\in X\neq\emptyset$. Let $U=\bigcup X$.

Let

$$
P=\cbra{(f:X'\to U):X'\subseteq X, f(S)\in S,\forall S\in X'}
$$

be a poset under inclusion, i.e., function extension.

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

This proof is essentially the same as the proof that Zorn's lemma implies AC. Suppose $X$ is a nonempty set.

Let

$$
P=\cbra{(X',\leq):X'\subseteq X\text{ is well ordered by }\leq}
$$

be partially ordered by

$$
(X',\leq_{X'})\leq(X'',\leq_{X''})\iff X'\subseteq X'',(\leq_{X'})\subseteq(\leq_{X''}).
$$

For a chain $T$ in $P$, we can similarly show that $\bigcup T$ is an upper bound of $T$ in $P$. By Zorn's lemma, $P$ has a maximal element which is necessarily $X$ with a well-ordering, completing the proof.

### AC implies the well-ordering theorem


### The well-ordering theorem implies AC




[^Russell]: The axiom of choice is needed only when we cannot give an explicit way to make the selection.
[^Bona]: This is a joke. Although the three are mathematically equivalent, many mathematicians find the axiom of choice intuitive, the well-ordering principle counterintuitive, and Zorn's lemma too complex for any intuition. I have the same feeling. :)
[^ZFC]: There are other models, some of which hair-raising. Set theorists are definitely no human.
[^consistency]: It follows from Gödel's second incompleteness theorem that ZF cannot prove its own consistency unless it is actually inconsistent.
