// content/y7-science/U02_8/diagrams.js
// Teaching diagrams for 2.8 Acids and bases.
//
// House rules (docs/LESSON-PLAYBOOK.md §5): a white plate first; every <text>
// written out literally so `npm run audit:svg` can measure it. Helpers draw
// shapes only, and never a <rect> — a stray rect becomes a "box" the audit
// measures unrelated text against.
//
//   ACIDS_ROUND    six acids a student meets outside the lab
//   BASES_ROUND    six bases a student meets outside the lab
//   LITMUS_RULE    the whole of litmus in two rows: blue→red, red→blue
//   PH_SCALE       the numbered 1–14 scale — the Draw This
//   ANS_A / ANS_B  vote cards for "pH 1 or pH 13?"
//   BOTH_ENDS      the answer: both ends of the scale burn
//   NEUTRALISE     acid + alkali → neutral, with the two arrows meeting at 7
//   NEUTRAL_LIFE   four places neutralisation is already used

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const BLUE = '#1a5fa8'

const ACID_F = '#fde3e3', ACID_S = '#c0392b'
const BASE_F = '#e3ecfb', BASE_S = '#2c6fbb'
const NEUT_F = '#e4f5e4', NEUT_S = '#2f8f3f'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

// Universal indicator, pH 1 at the left to pH 14 at the right.
const PH = [
  '#d7191c', '#e8462c', '#f06e28', '#f79b2c', '#fac432', '#ecdf2a', '#4caf50',
  '#24a58c', '#1f8ac0', '#1f6bb5', '#2f4fa3', '#4a2f96', '#63258c', '#7a1f7a',
]
const phColour = (n) => PH[Math.min(14, Math.max(1, n)) - 1]

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// ── Objects, all paths and circles: never a <rect>. ────────────────────────
const lemon = (cx, cy, s = 1) => `<g>
    <ellipse cx="${cx}" cy="${cy}" rx="${52 * s}" ry="${38 * s}" fill="#f7d842" stroke="#a8890a" stroke-width="2.5"/>
    <path d="M ${cx - 52 * s} ${cy} q -12 0 -14 -5 q 6 -5 14 -3" fill="#f7d842" stroke="#a8890a" stroke-width="2.5"/>
    <path d="M ${cx + 52 * s} ${cy} q 12 0 14 -5 q -6 -5 -14 -3" fill="#f7d842" stroke="#a8890a" stroke-width="2.5"/>
    <path d="M ${cx + 6 * s} ${cy - 36 * s} q 26 -20 44 -6 q -20 20 -44 6 Z" fill="#8fc46b" stroke="#40701f" stroke-width="2.5"/>
  </g>`

const bottle = (cx, cy, fill, stroke, s = 1) => `<g>
    <path d="M ${cx - 12 * s} ${cy - 62 * s} h ${24 * s} v ${18 * s} q 0 ${8 * s} ${9 * s} ${14 * s} q ${12 * s} ${9 * s} ${12 * s} ${24 * s} v ${52 * s} q 0 ${10 * s} ${-10 * s} ${10 * s} h ${-70 * s} q ${-10 * s} 0 ${-10 * s} ${-10 * s} v ${-52 * s} q 0 ${-15 * s} ${12 * s} ${-24 * s} q ${9 * s} ${-6 * s} ${9 * s} ${-14 * s} Z"
      fill="${fill}" stroke="${stroke}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 14 * s} ${cy - 72 * s} h ${28 * s} v ${12 * s} h ${-28 * s} Z" fill="${stroke}" stroke="${stroke}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 32 * s} ${cy + 6 * s} h ${64 * s} v ${34 * s} h ${-64 * s} Z" fill="#ffffff" fill-opacity="0.85" stroke="none"/>
  </g>`

const can = (cx, cy, fill, stroke, s = 1) => `<g>
    <path d="M ${cx - 34 * s} ${cy - 56 * s} h ${68 * s} v ${112 * s} h ${-68 * s} Z" fill="${fill}" stroke="${stroke}" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="${cx}" cy="${cy - 56 * s}" rx="${34 * s}" ry="${10 * s}" fill="#dfe5ea" stroke="${stroke}" stroke-width="2.5"/>
    <ellipse cx="${cx}" cy="${cy + 56 * s}" rx="${34 * s}" ry="${10 * s}" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>
    <circle cx="${cx + 8 * s}" cy="${cy - 56 * s}" r="${7 * s}" fill="none" stroke="${stroke}" stroke-width="2.5"/>
    <path d="M ${cx - 30 * s} ${cy - 10 * s} h ${60 * s}" stroke="#ffffff" stroke-width="${9 * s}" stroke-linecap="round"/>
  </g>`

// A tamarind pod: a fat brown curve with three seeds showing.
const pod = (cx, cy, s = 1) => `<g>
    <path d="M ${cx - 70 * s} ${cy - 34 * s} q ${38 * s} ${42 * s} ${140 * s} ${16 * s} q ${12 * s} ${28 * s} ${-8 * s} ${40 * s} q ${-104 * s} ${20 * s} ${-140 * s} ${-26 * s} Z"
      fill="#b07a45" stroke="#6b4420" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="${cx - 34 * s}" cy="${cy + 8 * s}" r="${11 * s}" fill="#5d3a1a"/>
    <circle cx="${cx + 4 * s}" cy="${cy + 18 * s}" r="${11 * s}" fill="#5d3a1a"/>
    <circle cx="${cx + 42 * s}" cy="${cy + 16 * s}" r="${11 * s}" fill="#5d3a1a"/>
  </g>`

// A stomach: the oesophagus down into the bag, the bag, then the gut out.
const stomach = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})">
    <path d="M -26 -74 h 26 v 34 h -26 Z" fill="#f3d9d9" stroke="${ACID_S}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M -44 -46 C -70 4 -52 66 0 68 C 48 70 66 28 52 -8 C 40 -38 8 -58 -20 -50 Z"
      fill="#f6bcbc" stroke="${ACID_S}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 56 6 q 30 6 28 34 q -2 22 -24 26" fill="none" stroke="${ACID_S}" stroke-width="16" stroke-linecap="round"/>
    <path d="M 56 6 q 30 6 28 34 q -2 22 -24 26" fill="none" stroke="#f3d9d9" stroke-width="10" stroke-linecap="round"/>
    <circle cx="-12" cy="6" r="7" fill="${ACID_S}" fill-opacity="0.55"/>
    <circle cx="14" cy="26" r="6" fill="${ACID_S}" fill-opacity="0.55"/>
    <circle cx="22" cy="-8" r="5" fill="${ACID_S}" fill-opacity="0.55"/>
  </g>`

const battery = (cx, cy, s = 1) => `<g>
    <path d="M ${cx - 68 * s} ${cy - 36 * s} h ${136 * s} v ${76 * s} h ${-136 * s} Z" fill="#3c4a54" stroke="#1d262c" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 46 * s} ${cy - 36 * s} v ${-16 * s} h ${22 * s} v ${16 * s} Z" fill="#c0392b" stroke="#1d262c" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx + 24 * s} ${cy - 36 * s} v ${-16 * s} h ${22 * s} v ${16 * s} Z" fill="#2c6fbb" stroke="#1d262c" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 40 * s} ${cy - 6 * s} h ${24 * s} M ${cx - 28 * s} ${cy - 18 * s} v ${24 * s}" stroke="#ffffff" stroke-width="${5 * s}" stroke-linecap="round"/>
    <path d="M ${cx + 16 * s} ${cy - 6 * s} h ${24 * s}" stroke="#ffffff" stroke-width="${5 * s}" stroke-linecap="round"/>
  </g>`

const soapBar = (cx, cy, s = 1) => `<g>
    <path d="M ${cx - 60 * s} ${cy + 8 * s} q ${0} ${-34 * s} ${60 * s} ${-34 * s} q ${60 * s} 0 ${60 * s} ${34 * s} q 0 ${30 * s} ${-60 * s} ${30 * s} q ${-60 * s} 0 ${-60 * s} ${-30 * s} Z"
      fill="#f6e7c8" stroke="#a98b4e" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="${cx - 24 * s}" cy="${cy - 40 * s}" r="${15 * s}" fill="#ffffff" stroke="#8fb6d4" stroke-width="2.5"/>
    <circle cx="${cx + 10 * s}" cy="${cy - 54 * s}" r="${11 * s}" fill="#ffffff" stroke="#8fb6d4" stroke-width="2.5"/>
    <circle cx="${cx + 36 * s}" cy="${cy - 36 * s}" r="${8 * s}" fill="#ffffff" stroke="#8fb6d4" stroke-width="2.5"/>
  </g>`

const tube = (cx, cy, s = 1) => `<g>
    <path d="M ${cx - 76 * s} ${cy - 26 * s} q ${30 * s} ${-14 * s} ${124 * s} ${-6 * s} v ${64 * s} q ${-94 * s} ${8 * s} ${-124 * s} ${-6 * s} Z"
      fill="#eef3f7" stroke="#6b7a86" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx + 48 * s} ${cy - 22 * s} h ${20 * s} v ${56 * s} h ${-20 * s} Z" fill="#2c6fbb" stroke="#1d4d84" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 76 * s} ${cy - 26 * s} v ${64 * s}" stroke="#6b7a86" stroke-width="${7 * s}" stroke-linecap="round"/>
    <path d="M ${cx - 40 * s} ${cy + 4 * s} h ${58 * s}" stroke="#57c4de" stroke-width="${9 * s}" stroke-linecap="round"/>
  </g>`

const box = (cx, cy, s = 1) => `<g>
    <path d="M ${cx - 46 * s} ${cy - 48 * s} h ${92 * s} v ${100 * s} h ${-92 * s} Z" fill="#fdf3dc" stroke="#b08c3a" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 46 * s} ${cy - 48 * s} l ${16 * s} ${-16 * s} h ${92 * s} l ${-16 * s} ${16 * s} Z" fill="#f0e2be" stroke="#b08c3a" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx + 46 * s} ${cy - 48 * s} l ${16 * s} ${-16 * s} v ${100 * s} l ${-16 * s} ${16 * s} Z" fill="#e6d6ad" stroke="#b08c3a" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 30 * s} ${cy - 16 * s} h ${60 * s} M ${cx - 30 * s} ${cy + 6 * s} h ${60 * s}" stroke="#b08c3a" stroke-width="${5 * s}" stroke-linecap="round"/>
  </g>`

const spray = (cx, cy, s = 1) => `<g>
    <path d="M ${cx - 34 * s} ${cy - 18 * s} h ${68 * s} v ${74 * s} q 0 ${10 * s} ${-10 * s} ${10 * s} h ${-48 * s} q ${-10 * s} 0 ${-10 * s} ${-10 * s} Z"
      fill="#dff0e6" stroke="#2f7d55" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 14 * s} ${cy - 18 * s} v ${-26 * s} h ${22 * s} v ${26 * s} Z" fill="#dff0e6" stroke="#2f7d55" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 14 * s} ${cy - 44 * s} h ${-30 * s} v ${14 * s} h ${18 * s}" fill="#9fc9b2" stroke="#2f7d55" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 46 * s} ${cy - 30 * s} l ${-14 * s} ${10 * s}" stroke="#2f7d55" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="${cx - 62 * s}" cy="${cy - 48 * s}" r="${5 * s}" fill="#57c4de"/>
    <circle cx="${cx - 74 * s}" cy="${cy - 34 * s}" r="${4 * s}" fill="#57c4de"/>
    <circle cx="${cx - 56 * s}" cy="${cy - 62 * s}" r="${4 * s}" fill="#57c4de"/>
  </g>`

const tablets = (cx, cy, s = 1) => `<g>
    <circle cx="${cx - 26 * s}" cy="${cy + 10 * s}" r="${34 * s}" fill="#ffffff" stroke="#8a97a2" stroke-width="2.5"/>
    <path d="M ${cx - 52 * s} ${cy + 10 * s} h ${52 * s}" stroke="#8a97a2" stroke-width="2.5"/>
    <circle cx="${cx + 30 * s}" cy="${cy - 16 * s}" r="${34 * s}" fill="#ffffff" stroke="#8a97a2" stroke-width="2.5"/>
    <path d="M ${cx + 4 * s} ${cy - 16 * s} h ${52 * s}" stroke="#8a97a2" stroke-width="2.5"/>
  </g>`

// An ant, seen from the side, walking right.
const ant = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})" stroke="#3b2a18" stroke-width="3.5" stroke-linecap="round">
    <path d="M -44 10 l -22 26 M -30 12 l -16 30 M -16 12 l -2 32" fill="none"/>
    <path d="M -44 -6 l -24 -18 M -30 -8 l -18 -24" fill="none"/>
    <path d="M 12 12 l 14 30 M 26 8 l 30 24" fill="none"/>
    <ellipse cx="34" cy="-2" rx="30" ry="22" fill="#5d3a1a" stroke="#3b2a18" stroke-width="3.5"/>
    <ellipse cx="-4" cy="0" rx="17" ry="14" fill="#5d3a1a" stroke="#3b2a18" stroke-width="3.5"/>
    <circle cx="-40" cy="-2" r="16" fill="#5d3a1a" stroke="#3b2a18" stroke-width="3.5"/>
    <path d="M -50 -14 q -14 -16 -30 -18 M -38 -17 q -6 -20 -20 -28" fill="none"/>
  </g>`

// A strip of field: soil, three shoots, and white lime falling onto it.
const field = (cx, cy, s = 1) => `<g transform="translate(${cx} ${cy}) scale(${s})">
    <path d="M -84 14 q 28 -12 56 0 q 28 12 56 0 q 16 -7 28 -3 v 46 h -140 Z"
      fill="#9c7248" stroke="#5f4526" stroke-width="3" stroke-linejoin="round"/>
    <path d="M -50 14 v -34 M -50 -6 q -18 -6 -20 -22 M -50 -8 q 16 -8 18 -24" fill="none" stroke="#3f7a2a" stroke-width="4" stroke-linecap="round"/>
    <path d="M 0 14 v -40 M 0 -10 q -18 -6 -20 -22 M 0 -12 q 16 -8 18 -24" fill="none" stroke="#3f7a2a" stroke-width="4" stroke-linecap="round"/>
    <path d="M 50 14 v -32 M 50 -4 q -18 -6 -20 -22 M 50 -6 q 16 -8 18 -24" fill="none" stroke="#3f7a2a" stroke-width="4" stroke-linecap="round"/>
    <circle cx="-62" cy="-48" r="7" fill="#ffffff" stroke="#8a97a2" stroke-width="2.5"/>
    <circle cx="-16" cy="-62" r="7" fill="#ffffff" stroke="#8a97a2" stroke-width="2.5"/>
    <circle cx="30" cy="-50" r="7" fill="#ffffff" stroke="#8a97a2" stroke-width="2.5"/>
    <circle cx="66" cy="-64" r="7" fill="#ffffff" stroke="#8a97a2" stroke-width="2.5"/>
  </g>`

// A beaker with liquid of a given colour. Lip at the top left, no <rect>.
const beaker = (cx, cy, fill, s = 1) => `<g>
    <path d="M ${cx - 44 * s} ${cy - 50 * s} v ${94 * s} q 0 ${10 * s} ${10 * s} ${10 * s} h ${68 * s} q ${10 * s} 0 ${10 * s} ${-10 * s} v ${-94 * s}"
      fill="#ffffff" stroke="#6b7a86" stroke-width="3" stroke-linejoin="round"/>
    <path d="M ${cx - 44 * s} ${cy - 16 * s} v ${60 * s} q 0 ${10 * s} ${10 * s} ${10 * s} h ${68 * s} q ${10 * s} 0 ${10 * s} ${-10 * s} v ${-60 * s} Z" fill="${fill}"/>
    <path d="M ${cx - 44 * s} ${cy - 50 * s} v ${94 * s} q 0 ${10 * s} ${10 * s} ${10 * s} h ${68 * s} q ${10 * s} 0 ${10 * s} ${-10 * s} v ${-94 * s}"
      fill="none" stroke="#6b7a86" stroke-width="3" stroke-linejoin="round"/>
    <path d="M ${cx - 52 * s} ${cy - 52 * s} q ${8 * s} ${6 * s} ${16 * s} ${2 * s}" fill="none" stroke="#6b7a86" stroke-width="3" stroke-linecap="round"/>
  </g>`

// A strip of indicator paper, tilted, top half one colour and bottom the other.
const strip = (x, y, top, bottom, h = 54) => `<g transform="translate(${x} ${y}) rotate(-18)">
    <path d="M -21 ${-h} h 42 v ${h} h -42 Z" fill="${top}" stroke="#6b7a86" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M -21 0 h 42 v ${h} h -42 Z" fill="${bottom}" stroke="#6b7a86" stroke-width="2.5" stroke-linejoin="round"/>
  </g>`

const arrowR = (x1, y, x2, colour = MUTED, w = 6) =>
  `<path d="M ${x1} ${y} H ${x2 - 20}" stroke="${colour}" stroke-width="${w}" stroke-linecap="round"/>
   <path d="M ${x2} ${y} l -24 -14 v 28 Z" fill="${colour}"/>`

// A drip burning a surface — the corrosive idea, drawn small.
const burn = (cx, cy, s = 1) => `<g>
    <path d="M ${cx} ${cy - 40 * s} q ${14 * s} ${22 * s} ${14 * s} ${32 * s} q 0 ${14 * s} ${-14 * s} ${14 * s} q ${-14 * s} 0 ${-14 * s} ${-14 * s} q 0 ${-10 * s} ${14 * s} ${-32 * s} Z"
      fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 54 * s} ${cy + 36 * s} q ${22 * s} ${-4 * s} ${28 * s} ${10 * s} q ${12 * s} ${-16 * s} ${26 * s} ${-2 * s} q ${14 * s} ${-12 * s} ${26 * s} ${4 * s} q ${8 * s} ${-8 * s} ${28 * s} ${-12 * s} v ${18 * s} h ${-108 * s} Z"
      fill="#3c4a54" stroke="#1d262c" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M ${cx - 14 * s} ${cy + 20 * s} l ${-8 * s} ${-14 * s} M ${cx + 16 * s} ${cy + 20 * s} l ${10 * s} ${-14 * s}" stroke="${ACID_S}" stroke-width="3" stroke-linecap="round"/>
  </g>`

// One cell of the pH bar. Shapes only; the number is written literally.
const phCell = (x, y, w, h, n) =>
  `<path d="M ${x} ${y} h ${w} v ${h} h ${-w} Z" fill="${phColour(n)}" stroke="#ffffff" stroke-width="2"/>`

export const DIAGRAMS = {
  // ── Six acids you already meet ────────────────────────────────────────────
  ACIDS_ROUND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 520" class="w-full h-full">
    ${plate(1120, 520)}

    <rect x="24" y="18" width="340" height="230" rx="16" fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2"/>
    ${lemon(194, 110, 1.05)}
    <text x="194" y="214" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">lemons and limes</text>

    <rect x="390" y="18" width="340" height="230" rx="16" fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2"/>
    ${bottle(560, 118, '#f2e6c8', '#8a6a2a', 0.95)}
    <text x="560" y="214" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">vinegar</text>

    <rect x="756" y="18" width="340" height="230" rx="16" fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2"/>
    ${can(926, 116, '#c0392b', '#7d2218', 0.92)}
    <text x="926" y="214" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">fizzy drinks</text>

    <rect x="24" y="268" width="340" height="230" rx="16" fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2"/>
    ${pod(190, 360, 1.05)}
    <text x="194" y="464" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">tamarind</text>

    <rect x="390" y="268" width="340" height="230" rx="16" fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2"/>
    ${stomach(560, 362, 0.86)}
    <text x="560" y="464" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">inside your stomach</text>

    <rect x="756" y="268" width="340" height="230" rx="16" fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2"/>
    ${battery(926, 366, 1)}
    <text x="926" y="464" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">a car battery</text>
  </svg>`,

  // ── Six bases you already meet ────────────────────────────────────────────
  BASES_ROUND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 520" class="w-full h-full">
    ${plate(1120, 520)}

    <rect x="24" y="18" width="340" height="230" rx="16" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    ${soapBar(194, 128, 0.95)}
    <text x="194" y="214" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">soap</text>

    <rect x="390" y="18" width="340" height="230" rx="16" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    ${tube(556, 120, 0.95)}
    <text x="560" y="214" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">toothpaste</text>

    <rect x="756" y="18" width="340" height="230" rx="16" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    ${box(922, 118, 0.92)}
    <text x="926" y="214" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">baking soda</text>

    <rect x="24" y="268" width="340" height="230" rx="16" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    ${spray(213, 366, 0.96)}
    <text x="194" y="464" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">oven cleaner</text>

    <rect x="390" y="268" width="340" height="230" rx="16" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    ${tablets(556, 368, 0.95)}
    <text x="560" y="464" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">indigestion tablets</text>

    <rect x="756" y="268" width="340" height="230" rx="16" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    ${beaker(926, 364, '#cfdde6', 0.92)}
    <text x="926" y="464" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">limewater</text>
  </svg>`,

  // ── Litmus, both ways round ───────────────────────────────────────────────
  LITMUS_RULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 620" class="w-full h-full">
    ${plate(840, 620)}

    <rect x="26" y="24" width="788" height="264" rx="16" fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2"/>
    <text x="420" y="78" font-family="${FONT}" font-size="40" font-weight="bold" fill="${ACID_S}" text-anchor="middle">Dip it in an ACID</text>
    ${strip(160, 172, '#2c6fbb', '#2c6fbb')}
    ${arrowR(280, 172, 540, ACID_S, 7)}
    ${strip(664, 172, '#2c6fbb', '#c0392b')}
    <text x="160" y="266" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">blue litmus</text>
    <text x="664" y="266" font-family="${FONT}" font-size="28" font-weight="bold" fill="${ACID_S}" text-anchor="middle">turns RED</text>

    <rect x="26" y="312" width="788" height="264" rx="16" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    <text x="420" y="366" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BASE_S}" text-anchor="middle">Dip it in an ALKALI</text>
    ${strip(160, 460, '#c0392b', '#c0392b')}
    ${arrowR(280, 460, 540, BASE_S, 7)}
    ${strip(664, 460, '#c0392b', '#2c6fbb')}
    <text x="160" y="554" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="middle">red litmus</text>
    <text x="664" y="554" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BASE_S}" text-anchor="middle">turns BLUE</text>

    <text x="420" y="606" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">Only the wet end changes colour.</text>
  </svg>`,

  // ── The pH scale: the Draw This ───────────────────────────────────────────
  PH_SCALE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 520" class="w-full h-full">
    ${plate(1120, 520)}

    <text x="560" y="58" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="middle">The pH scale</text>

    ${Array.from({ length: 14 }, (_, i) => phCell(42 + i * 74, 86, 74, 96, i + 1)).join('\n    ')}

    <text x="79" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <text x="153" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <text x="227" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <text x="301" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">4</text>
    <text x="375" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">5</text>
    <text x="449" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="523" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">7</text>
    <text x="597" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">8</text>
    <text x="671" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">9</text>
    <text x="745" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">10</text>
    <text x="819" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">11</text>
    <text x="893" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">12</text>
    <text x="967" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">13</text>
    <text x="1041" y="152" font-family="${FONT}" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">14</text>

    <path d="M 42 194 v 18 h 444 v -18" fill="none" stroke="${ACID_S}" stroke-width="4"/>
    <path d="M 490 194 v 18 h 66 v -18" fill="none" stroke="${NEUT_S}" stroke-width="4"/>
    <path d="M 560 194 v 18 h 518 v -18" fill="none" stroke="${BASE_S}" stroke-width="4"/>

    <rect x="42" y="228" width="444" height="88" rx="14" fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2"/>
    <text x="264" y="272" font-family="${FONT}" font-size="42" font-weight="bold" fill="${ACID_S}" text-anchor="middle">ACID</text>
    <text x="264" y="304" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">below 7</text>

    <rect x="490" y="228" width="66" height="88" rx="14" fill="${NEUT_F}" stroke="${NEUT_S}" stroke-width="2"/>
    <text x="523" y="284" font-family="${FONT}" font-size="42" font-weight="bold" fill="${NEUT_S}" text-anchor="middle">7</text>

    <rect x="560" y="228" width="518" height="88" rx="14" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    <text x="819" y="272" font-family="${FONT}" font-size="42" font-weight="bold" fill="${BASE_S}" text-anchor="middle">ALKALI</text>
    <text x="819" y="304" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">above 7</text>

    <text x="264" y="366" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">a smaller number is a stronger acid</text>
    <text x="523" y="366" font-family="${FONT}" font-size="26" font-weight="bold" fill="${NEUT_S}" text-anchor="middle">neutral</text>
    <text x="819" y="366" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">a bigger number is a stronger alkali</text>

    <rect x="42" y="396" width="1036" height="102" rx="16" fill="#fdf1e3" stroke="${KEY}" stroke-width="2"/>
    ${beaker(120, 448, phColour(2), 0.6)}
    <text x="200" y="440" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">lemon juice</text>
    <text x="200" y="474" font-family="${FONT}" font-size="26" fill="${MUTED}">pH 2</text>
    ${beaker(470, 448, phColour(7), 0.6)}
    <text x="548" y="440" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">pure water</text>
    <text x="548" y="474" font-family="${FONT}" font-size="26" fill="${MUTED}">pH 7</text>
    ${beaker(790, 448, phColour(10), 0.6)}
    <text x="866" y="440" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">soap</text>
    <text x="866" y="474" font-family="${FONT}" font-size="26" fill="${MUTED}">pH 10</text>
  </svg>`,

  // ── Vote cards: pH 1 or pH 13? ────────────────────────────────────────────
  // The lucide hand, thumb on the right: a LEFT hand seen from behind, as a
  // student sees their own raised hand. The right hand is the same path unmirrored.
  ANS_A: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <g transform="translate(180 76) scale(-7 7)" fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="450" y="216" font-family="${FONT}" font-size="130" font-weight="bold" fill="${BLUE}" text-anchor="middle">pH 1</text>
  </svg>`,

  ANS_B: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <g transform="translate(540 76) scale(7)" fill="none" stroke="${KEY}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="268" y="216" font-family="${FONT}" font-size="130" font-weight="bold" fill="${KEY}" text-anchor="middle">pH 13</text>
  </svg>`,

  // ── The answer to the vote: both ends burn ────────────────────────────────
  BOTH_ENDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${plate(1120, 470)}

    <rect x="24" y="22" width="420" height="330" rx="16" fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2"/>
    <text x="234" y="80" font-family="${FONT}" font-size="64" font-weight="bold" fill="${ACID_S}" text-anchor="middle">pH 1</text>
    ${beaker(140, 208, phColour(1), 0.95)}
    ${burn(320, 202, 1.05)}
    <text x="234" y="320" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">a strong acid</text>

    <rect x="676" y="22" width="420" height="330" rx="16" fill="#efe6f5" stroke="#63258c" stroke-width="2"/>
    <text x="886" y="80" font-family="${FONT}" font-size="64" font-weight="bold" fill="#63258c" text-anchor="middle">pH 13</text>
    ${beaker(792, 208, phColour(13), 0.95)}
    ${burn(972, 202, 1.05)}
    <text x="886" y="320" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">a strong alkali</text>

    <text x="560" y="212" font-family="${FONT}" font-size="72" font-weight="bold" fill="${KEY}" text-anchor="middle">BOTH</text>

    <rect x="24" y="374" width="1072" height="76" rx="14" fill="#fdf1e3" stroke="${KEY}" stroke-width="2"/>
    <text x="560" y="424" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">Danger lives at both ends of the scale.</text>
  </svg>`,

  // ── Neutralisation ────────────────────────────────────────────────────────
  NEUTRALISE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 500" class="w-full h-full">
    ${plate(1120, 500)}

    ${beaker(120, 132, phColour(2), 1.05)}
    <text x="120" y="248" font-family="${FONT}" font-size="34" font-weight="bold" fill="${ACID_S}" text-anchor="middle">acid</text>
    <text x="120" y="284" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">pH 2</text>

    <text x="300" y="150" font-family="${FONT}" font-size="76" font-weight="bold" fill="${MUTED}" text-anchor="middle">+</text>

    ${beaker(480, 132, phColour(12), 1.05)}
    <text x="480" y="248" font-family="${FONT}" font-size="34" font-weight="bold" fill="${BASE_S}" text-anchor="middle">alkali</text>
    <text x="480" y="284" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">pH 12</text>

    ${arrowR(614, 132, 790, KEY, 8)}

    ${beaker(920, 132, phColour(7), 1.05)}
    <text x="920" y="248" font-family="${FONT}" font-size="34" font-weight="bold" fill="${NEUT_S}" text-anchor="middle">neutral</text>
    <text x="920" y="284" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">pH 7</text>

    ${Array.from({ length: 14 }, (_, i) => phCell(42 + i * 74, 332, 74, 52, i + 1)).join('\n    ')}

    <path d="M 116 424 q 180 -30 388 -30" fill="none" stroke="${ACID_S}" stroke-width="5"/>
    <path d="M 522 394 l -26 -12 v 26 Z" fill="${ACID_S}"/>
    <path d="M 932 424 q -180 -30 -388 -30" fill="none" stroke="${BASE_S}" stroke-width="5"/>
    <path d="M 526 394 l 26 -12 v 26 Z" fill="${BASE_S}"/>

    <text x="560" y="482" font-family="${FONT}" font-size="30" font-weight="bold" fill="${NEUT_S}" text-anchor="middle">Both move towards 7.</text>
  </svg>`,

  // ── Where neutralisation is already used ──────────────────────────────────
  NEUTRAL_LIFE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${plate(1120, 470)}

    <rect x="20" y="20" width="262" height="430" rx="16" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    ${tube(146, 130, 0.8)}
    <text x="151" y="248" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Toothpaste</text>
    <text x="151" y="308" font-family="${FONT}" font-size="25" fill="${MUTED}" text-anchor="middle">Food makes acid</text>
    <text x="151" y="344" font-family="${FONT}" font-size="25" fill="${MUTED}" text-anchor="middle">on your teeth.</text>
    <text x="151" y="404" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BASE_S}" text-anchor="middle">Brush it away.</text>

    <rect x="298" y="20" width="262" height="430" rx="16" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    ${tablets(424, 130, 0.78)}
    <text x="429" y="248" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Tablets</text>
    <text x="429" y="308" font-family="${FONT}" font-size="25" fill="${MUTED}" text-anchor="middle">Too much acid</text>
    <text x="429" y="344" font-family="${FONT}" font-size="25" fill="${MUTED}" text-anchor="middle">in your stomach.</text>
    <text x="429" y="404" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BASE_S}" text-anchor="middle">Swallow a base.</text>

    <rect x="576" y="20" width="262" height="430" rx="16" fill="${BASE_F}" stroke="${BASE_S}" stroke-width="2"/>
    ${field(707, 136, 0.86)}
    <text x="707" y="248" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Lime on a farm</text>
    <text x="707" y="308" font-family="${FONT}" font-size="25" fill="${MUTED}" text-anchor="middle">Soil too acid</text>
    <text x="707" y="344" font-family="${FONT}" font-size="25" fill="${MUTED}" text-anchor="middle">for rice to grow.</text>
    <text x="707" y="404" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BASE_S}" text-anchor="middle">Spread lime.</text>

    <rect x="854" y="20" width="246" height="430" rx="16" fill="${ACID_F}" stroke="${ACID_S}" stroke-width="2"/>
    ${ant(972, 126, 0.95)}
    <text x="977" y="248" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">An ant bite</text>
    <text x="977" y="308" font-family="${FONT}" font-size="25" fill="${MUTED}" text-anchor="middle">Ants inject</text>
    <text x="977" y="344" font-family="${FONT}" font-size="25" fill="${MUTED}" text-anchor="middle">an acid.</text>
    <text x="977" y="404" font-family="${FONT}" font-size="25" font-weight="bold" fill="${ACID_S}" text-anchor="middle">Soap helps.</text>
  </svg>`,
}
