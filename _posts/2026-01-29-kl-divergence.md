---
layout: post
title: Information Theory Behind the Kullback-Leibler Divergence
created: '2025-11-11'
categories:
- Machine Learning
tags:
- machine learning
description: Why do we use the Kullback-Leibler (KL) divergence as a measure of distance
  between probability distributions? Why do we use the cross-entropy loss function
  in supervised machine learning?
math: true
date: 2026-01-29 21:35 +0800
---
The LaTeX version of this blog post is available [here](https://github.com/melonTree68/blog-posts-latex). Or you can simply download the [.tex](/assets/img/posts/kl-divergence/kl-divergence-blog.tex) and [.pdf](/assets/img/posts/kl-divergence/kl-divergence-blog.pdf) files from here. The content is the same, but the LaTeX version has a more formal typesetting, which I personally prefer (quite much).


## Introduction
In supervised learning, we typically assume that the training set $\mathcal{D}=\\{(x^{(i)},y^{(i)})\\}\_{i=1}^N$ is sampled from an underlying true distribution $p$, and our goal is to construct a model $q_\theta$, parameterized by $\theta$, that approximates this distribution. To evaluate our model, we need a measure of distance, or dissimilarity, between two probability distributions. A standard choice is the Kullback-Leibler (KL) divergence

$$
\KL pq=\E_{x\sim p}\sbra{\log\frac{p(x)}{q(x)}}=\sum_{x\in\X}p(x)\log\frac{p(x)}{q(x)}
$$

(or $\int p(x)\log\frac{p(x)}{q(x)}\dx$ for continuous random variables). In practice, we often use the cross-entropy loss[^ce-mle]

$$
J(\theta)=-\frac1N\sum_{i=1}^{N}\log q_\theta(x^{(i)},y^{(i)}).
$$


But why do they work? The definitions above are not quite self-explanatory --- it is not immediately clear from their forms why the KL divergence measures the distance between two distributions, or why minimizing the cross-entropy loss leads to better model performance. To answer this, we begin with the notion of surprisal.


## Surprisal
Consider a random variable $X$ with a discrete probability distribution $p(x)$. If we observe an outcome $x$, how surprised are we? Intuitively, the higher the probability of an event, the less surprised we are, and correspondingly the less information we gain from its occurrence. Conversely, events with low probability are more surprising and provide more information. This motivates the definition of information content, or self-information, or surprisal, of an event.

{% capture def_content %}
The information content, self-information, or surprisal of an event $x$ is defined as

$$
\mathrm{I}(x)=-\log p(x).
$$

Here the choice of base $b$ is somewhat arbitrary. Different choices of $b$ correspond to different units of information: bit for $b=2$, nat (for natural) for $b=e$, and Hart (for hartley) for $b=10$.
{% endcapture %}
{% include thms/definition.html content=def_content %}

In this article, we shall primarily be treating the concept above as surprisal, instead of the less intuitive notion of information content. The latter notion is also important and will be treated [here](#an-information-theoretic-perspective).

The surprisal has some intuitive and desirable properties.
- $\mathrm{I}(x)=0$ for $x$ with $p(x)=1$. We are completely unsurprised at events with probability $1$. Such events carry no information.
- $\mathrm{I}(x)$ is a monotonically decreasing function of $p(x)$.
- For independent events $x$ and $y$, $\mathrm{I}(x,y)=\mathrm{I}(x)\mathrm{I}(y)$. The information content of two independent events is the sum of their individual self-information; the surprisal of two independent events is the sum of their individual surprisals.


## Entropy and Cross-Entropy
### Entropy
{% capture def_content %}
The (Shannon) entropy of a random variable $X$, denoted $\mathrm{H}(p)$, is defined as the average surprisal we experience when drawing samples from it.

$$
\mathrm{H}(p)=\E_{x\sim p}[\mathrm{I}(x)]=-\sum_{x\in\X}p(x)\log p(x)
$$

(or $-\int p\log p$ for continuous distributions, called the differential entropy). In what follows, the definitions for continuous random variables apply mutatis mutandis.
{% endcapture %}
{% include thms/definition.html content=def_content %}
    
Entropy measures the uncertainty inherent in a distribution. Indeed, the greater the entropy, the more surprisal we will experience (in terms of expectation) when sampling from it. Next we discuss what distributions extremize the entropy.

#### Discrete case, minimum
Observe that the entropy is always nonnegative. Hence when the probability mass is concentrated at a single point, the entropy attains its minimum, $0$.

#### Discrete case, maximum
We use Lagrange multipliers. Without loss of generality, suppose that $\X=\\{1,2,\dots,n\\}$. Let $y=(y_1,\dots,y_n)=(p(1),\dots,p(n))$. The Lagrangian

$$
\L(y,\lambda)=-\sum_{i=1}^{n}y_i\log y_i+\lambda\bra{\sum_{i=1}^{n}y_i-1}.
$$

The only stationary point is $y_1=\dots=y_n$, and the Hessian of the Lagrangian here is negative definite. Hence a uniform distribution maximizes the entropy (maximum $\log n$).

#### Continuous case, minimum
When $X\sim U(a,b)$, $\mathrm{H}(p)=\log(b-a)$. Hence $\mathrm{H}(p)\to-\infty$ when $b-a\to0$. There is no minimum.

#### Continuous case, maximum
Suppose that the PDF $f(x)=0$ when $x\not\in[a,b]$. Similar to the proof of the discrete case, variational calculus (the Euler-Lagrange equation) leads to that a uniform distribution maximizes the (differential) entropy. Here we give a cleaner proof using the nonnegativity of the KL divergence (see [this subsection](#properties)).

Let $u$ be the PDF of $U(a,b)$.

$$
0\le\KL{f}{u}=\int_a^b f\log f-\int_a^b f\log u=-\mathrm{H}(f)+\log(b-a).
$$

Hence $\mathrm{H}(f)\le\log(b-a)$. Equality holds if and only if $f=u$ a.e.[^ae]

### Cross-Entropy
In the context of machine learning, we often approximate an unknown, underlying true distribution $p$ with a model $q$. Suppose we again want to measure the expected surprisal when sampling from the distribution. Samples are still drawn from the black box $p$, but this time we can only measure surprisal with our known, approximating distribution $q$.

{% capture def_content %}
The cross-entropy, denoted $\mathrm{H}(p,q)$, is the average surprisal experienced when samples are drawn from $p$, but surprisal is measured via $q$.
    
$$
\mathrm{H}(p,q)=\E_{x\sim p}[-\log q(x)]=-\sum_{x\in\X}p(x)\log q(x).
$$
{% endcapture %}
{% include thms/definition.html content=def_content %}
    

## Kullback-Leibler Divergence
### Motivation and Definition
How much extra surprisal do we get by using our incorrect model $q$ instead of the truth $p$?

{% capture def_content %}
The Kullback-Leibler (KL) divergence from $q$ to $p$, denoted $\KL pq$, is the difference between the cross-entropy and the entropy.
    
$$
\KL pq=\mathrm{H}(p,q)-\mathrm{H}(p)=\sum_{x\in\X}p(x)\log\frac{p(x)}{q(x)}.
$$
{% endcapture %}
{% include thms/definition.html content=def_content %}


### Properties
{% capture thm_content %}
$\KL pq\ge0$. Equality holds if and only if $p=q$ a.e.
{% endcapture %}
{% include thms/theorem.html title="" content=thm_content %}

{% capture pf_content %}
We prove the discrete case using Jensen's inequality; the continuous case holds mutatis mutandis. Notice that $p(x)\ge0$ and $\sum_{x\in\X}p(x)=1$. Because $\log$ is concave, by Jensen's inequality
    
$$
\KL pq=-\sum_{x\in\X}p(x)\log\frac{q(x)}{p(x)}\ge-\log\sum_{x\in\X}p(x)\frac{q(x)}{p(x)}=0.
$$

The condition for equality follows from that of Jensen's inequality.
{% endcapture %}
{% include thms/proof.html content=pf_content %}

{% capture thm_content %}
$\mathrm{H}(p,q)\ge\mathrm{H}(p)=\mathrm{H}(p,p)$.
{% endcapture %}
{% include thms/corollary.html title="" content=thm_content %}

Measuring surprisal using the true distribution yields least average surprisal. Any incorrect surprisal-measuring scheme incurs extra surprisal.

The KL divergence is asymmetric: $\KL pq\ne\KL qp$ generally.


## An Information-Theoretic Perspective
The KL divergence quantifies the "inefficiency" in using distribution $q$ to represent the truth $p$. Suppose we want to design a (binary) code (like Morse code or Huffman code) to transmit outcomes of a discrete random variable $X\sim p(x)$. To be efficient, we should assign shorter codewords to more probable outcomes and longer codewords to less probable ones.

Shannon's source coding theorem implies that the theoretically optimal length of a codeword representing an outcome $x$ is $-\log p(x)$. In this subsection we use $2$ as the base of the logarithm because we are constructing a binary code.

#### The optimal scenario
Suppose we know the true distribution $p$ and hence use it to construct the code. The expected length of a codeword is then

$$
\E_{x\sim p}[-\log p(x)]=\mathrm{H}(p).
$$


#### The suboptimal scenario
Now suppose we only have an approximating distribution $q$, and construct our code based on this false belief. The length of the codeword assigned to an outcome $x$ would then be $-\log q(x)$. The expected length of a codeword is therefore

$$
\E_{x\sim p}[-\log q(x)]=\mathrm{H}(p,q).
$$


We see that the entropy is the average number of bits required per message when using the most efficient code, and the cross-entropy is the average number of bits required per message when using an inefficient, suboptimal code based on the wrong distribution $q$. Therefore, the KL divergence $\KL pq=\mathrm{H}(p,q)-\mathrm{H}(p)\ge0$ is the average number of *extra* bits required per message due to using the wrong distribution to optimize the code. This justifies the statement that the KL divergence quantifies the inefficiency in using distribution $q$ to represent $p$.


## The Machine Learning Perspective
Now the answers to the questions raised in the [introduction](#introduction) are clear.
- Why do we use the KL divergence as a measure of distance between distributions?
  
  The answer is clear from [this section](#kullback-leibler-divergence) and [this section](#an-information-theoretic-perspective).

- Why do we use the cross-entropy as the loss function in machine learning (classification problems in particular)?

  To measure the dissimilarity between the data's underlying distribution $p$ and our model $q_\theta$, we use the KL divergence. Minimizing $\KL p{q_\theta}=\mathrm{H}(p,q_\theta)-\mathrm{H}(p)$ is equivalent to minimizing $\mathrm{H}(p,q_\theta)$ because $p$ does not depend on $\theta$.

  One might further ask that the cross-entropy $\mathrm{H}(p,q_\theta)=-\sum_{x\in\X}p(x)\log q_\theta(x)$ looks different from the actual loss function we see in ML textbooks, and that how can we possibly calculate it without knowing the true distribution $p(x)$? The answer is we use the empirical distribution $\hat{\mathcal{D}}$, i.e., the uniform distribution over the training set $\\{(x^{(i)},y^{(i)})\\}_{i=1}^N$, to approximate $p$. The cross-entropy (loss)
    
  $$
  J(\theta)=\mathrm{H}(\hat{\mathcal{D}},q_\theta)=-\sum_{i=1}^{N}\frac1N\log q_\theta(x^{(i)},y^{(i)}).
  $$

  This is the form familiar to us for long.

## Footnotes

[^ce-mle]: The cross-entropy loss has the same form as the maximum likelihood estimation objective.
[^ae]: a.e. stands for almost everywhere.
