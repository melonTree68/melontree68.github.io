MathJax = {
    tex: {
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
            // General
            bra: ["\\left(#1\\right)", 1],
            sbra: ["\\left[#1\\right]", 1],
            cbra: ["\\left\\{#1\\right\\}", 1],
            norm: ["\\left\\lVert#1\\right\\rVert", 1],
            inp: ["\\left\\langle#1,#2\\right\\rangle", 2],
            abs: ["\\left|#1\\right|", 1],
            rest: ["\\left.#1\\right|_{#2}", 2],

            R: "\\mathbb{R}",
            N: "\\mathbb{N}",
            Z: "\\mathbb{Z}",
            Q: "\\mathbb{Q}",
            C: "\\mathbb{C}",
            F: "\\mathbb{F}",
            e: "\\mathrm{e}",

            // Analysis
            epsilon: "\\varepsilon",
            phi: "\\varphi",
            dnei: "\\overset{\\circ}{U}",
            d: "\\mathrm{d}",
            dx: "\\mathrm{d}x",
            nti: "n\\to\\infty",

            // Algebra
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
        },
    }
};

