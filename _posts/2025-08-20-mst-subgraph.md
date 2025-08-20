---
layout: post
title: Minimum Spanning Trees of Subgraphs
created: '2025-08-20'
categories:
- Theoretical Computer Science
tags:
- theoretical computer science
- algorithms
description: This post is part of a series of algorithm notes originally intended
  only for myself.
math: true
date: 2025-08-20 22:26 +0800
---
> This post is part of a series of algorithm notes originally intended only for myself. If you find yourself lacking some background knowledge while reading, that's completely normal --- these notes were never meant to be a comprehensive introduction. I won't go into all the prerequisites here. Nevertheless, I hope these notes can still provide some inspiration, even if the details are sometimes a bit sketchy.
{: .prompt-warning }

We prove that for an MST $T$ of a graph $G$, and a connected subgraph $H$ of $G$, $T\cap H$ is contained in some MST of $H$.

Let $w(\cdot)$ denote the weight of an edge. Let $S$ be an arbitrary MST of $H$. We repeatedly refine $S$ until it contains $T\cap H$. While there exists $e\in T\cap H$, $e\not\in S$, we find an edge $e'$ satisfying $e'\in S$, $e'\not\in T\cap H$, $w(e')=w(e)$. Substitute $e$ for $e'$ in $S$. We find such $e'$ following the procedure below.

### Step 1.
Add $e$ to $S$ and we obtain a cycle $C=\\{e,e_1,\dots,e_m\\}$ in $S$. By the minimality of $S$, $w(e)\geq w(e_k)$ for each $k$.

### Step 2. Generating a cut
$e$ is a cut edge of $T$. Removing $e$ results in a cut $(A,B)$ of $T$. Because the number of edges in a cycle across the cut is even, there exists an $e_j\in C\subseteq S$ across the cut. We show that $e_j$ is what we desire.

### Step 3. $e_j\not\in T$.
Because $(A,B)$ is a cut, $E(T)\cap(A\times B)=\emptyset$. $e_j\not\in T$ follows from that it crosses the cut.

### Step 4. $w(e_j)\geq w(e)$.
Because $e_j\not\in T$, adding $e_j$ to $T$ produces a unique cycle $C'$. The number of edges in $C'$ across the cut is even, but in $T$ there is only one edge $e$ across the cut. Hence $e,e_j\in C'$. By the minimality of $T$, $w(e_j)\geq w(e)$. Q.E.D.