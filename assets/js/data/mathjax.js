---
layout: compress
---

MathJax = {
    loader: {load: ['[tex]/physics']},
    tex: {
        packages: {'[+]': ['physics']},

        inlineMath: [
            ['$', '$'],
            ['\\(', '\\)'],
        ],
        displayMath: [
            ['$$', '$$'],
            ['\\[', '\\]'],
        ],

        tags: 'ams',

        macros: {
            bra: ["\\left(#1\\right)", 1],
            sbra: ["\\left[#1\\right]", 1],
            cbra: ["\\left\\{#1\\right\\}", 1],
            abra: ["\\left\\langle#1\\right\\rangle", 1],
            norm: ["\\left\\lVert#1\\right\\rVert", 1],
            inp: ["\\left\\langle#1,#2\\right\\rangle", 2],
            abs: ["\\left|#1\\right|", 1],
            rest: ["\\left.#1\\right|_{#2}", 2],

            R: "\\mathbf{R}",
            N: "\\mathbf{N}",
            Z: "\\mathbf{Z}",
            Q: "\\mathbf{Q}",
            C: "\\mathbf{C}",
            F: "\\mathbf{F}",
            e: "\\mathrm{e}",

            RR: "\\mathbb{R}",
            NN: "\\mathbb{N}",
            ZZ: "\\mathbb{Z}",
            QQ: "\\mathbb{Q}",
            CC: "\\mathbb{C}",
            FF: "\\mathbb{F}",

            epsilon: "\\varepsilon",
            phi: "\\varphi",
            dnei: "\\overset{\\circ}{U}",
            d: "\\mathrm{d}",
            dx: "\\mathrm{d}x",
            nti: "n\\to\\infty",

            L: "\\mathcal{L}",
            M: "\\mathcal{M}",
            P: "\\mathcal{P}",
            B: "\\mathcal{B}",
            E: "\\mathcal{E}",
            T: "\\mathrm{T}",

            spn: "\\operatorname{span}",
            im: "\\operatorname{im}",
            tr: "\\operatorname{tr}",
            rank: "\\operatorname{rank}",
            sgn: "\\operatorname{sgn}",
            dist: "\\operatorname{dist}",

            ord: "\\mathrm{Ord}",
        },
    }
};