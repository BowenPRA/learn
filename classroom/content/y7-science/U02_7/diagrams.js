// content/y7-science/U02_7/diagrams.js
// Teaching diagrams for 2.7 Compounds and mixtures (Learner's Book pp. 64–69).
//
// House rules (docs/LESSON-PLAYBOOK.md §5): a white plate first; every <text>
// written out literally so `npm run audit:svg` can measure it (helpers draw
// shapes only); `split` diagrams 840×560, `showcase` strips 1120×440.
// Atom colours follow the book's own pictures on pp. 65 and 68: iron orange,
// sulfur yellow, nitrogen blue, oxygen red, carbon grey, hydrogen white.
//
//   ANS_*          vote cards: YES / NO, pure / mixture, each with a hand
//   MIX_COMPOUND   iron and sulfur atoms, mixed, then bonded — the Draw This (p. 65)
//   AIR            a sample of air, particle by particle (p. 68)
//   AIR_PIE        the composition of air (p. 67)
//   EMISSIONS      what changes the air: a volcano, and Hanoi traffic
//   MINERAL_LABEL  the mineral water label (p. 68)

import volcano from './images/volcano.jpg'
import traffic from './images/traffic.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const RED = '#c8102e'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// A photograph cropped to fill its cell, with a hairline frame.
const photo = (href, id, x, y, w, h) => `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath></defs>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="${RULE}" stroke-width="2"/>`

const ATOM = {
  Fe: ['#f3b27a', '#9a4f10'],
  S: ['#efe04a', '#8a7c00'],
  N: ['#9ec1ea', '#1a5fa8'],
  O: ['#f08b82', '#b3261e'],
  C: ['#aab4bc', '#3b444b'],
  H: ['#ffffff', '#6b7580'],
}
const atom = (cx, cy, r, k, sw = 3) => `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${ATOM[k][0]}" stroke="${ATOM[k][1]}" stroke-width="${sw}"/>`

// Two atoms touching, at an angle (degrees).
const pair = (cx, cy, r, a, k1, k2 = k1) => {
  const dx = Math.cos((a * Math.PI) / 180) * r * 0.95
  const dy = Math.sin((a * Math.PI) / 180) * r * 0.95
  return atom(cx - dx, cy - dy, r, k1, 2.5) + atom(cx + dx, cy + dy, r, k2, 2.5)
}
const co2 = (cx, cy, r) => atom(cx - 1.9 * r, cy, r, 'O', 2.5) + atom(cx + 1.9 * r, cy, r, 'O', 2.5) + atom(cx, cy, r, 'C', 2.5)
const h2o = (cx, cy, r) => atom(cx - r * 1.15, cy + r * 0.95, r * 0.8, 'H', 2.5) + atom(cx + r * 1.15, cy + r * 0.95, r * 0.8, 'H', 2.5) + atom(cx, cy, r, 'O', 2.5)

const dot = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="2.5"/><circle cx="${x2}" cy="${y2}" r="5" fill="${KEY}"/>`

// The lucide hand, thumb on the right: a LEFT hand seen from behind, as a
// student sees their own raised hand. The right hand is the same path unmirrored.
const HAND = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (col) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND}</g>`
const rightHand = (col) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND}</g>`

// ── The Draw This: 7 iron and 7 sulfur atoms, loose, then bonded in pairs ────
const MIX_FE = [[80, 110], [250, 105], [400, 125], [150, 215], [330, 200], [90, 295], [270, 290]]
const MIX_S = [[165, 130], [325, 125], [240, 200], [420, 210], [190, 295], [360, 290], [70, 200]]
const loose = () => MIX_FE.map(([x, y]) => atom(x, y, 24, 'Fe')).join('') + MIX_S.map(([x, y]) => atom(x, y, 24, 'S')).join('')

// [centre x, centre y, angle]: iron on one end, sulfur on the other.
const FES = [[730, 120, 0], [880, 115, 180], [1025, 140, 90], [760, 220, 90], [900, 215, 0], [730, 300, 180], [1030, 280, 270]]
const bonded = () => FES.map(([x, y, a]) => pair(x, y, 24, a, 'Fe', 'S')).join('')

// ── A sample of air: 36 particles on a jittered 9 × 4 grid ───────────────────
// 26 nitrogen, 7 oxygen, 2 water, 1 carbon dioxide. The book's own picture
// (p. 68) has 2 carbon dioxide and 4 water, so the answers agree either way.
const AIR_KIND = (i) => ([3, 8, 12, 17, 22, 27, 31].includes(i) ? 'O2' : [5, 25].includes(i) ? 'H2O' : i === 19 ? 'CO2' : 'N2')
function airSample() {
  let out = ''
  for (let i = 0; i < 36; i++) {
    const c = i % 9, r = Math.floor(i / 9)
    const kind = AIR_KIND(i)
    const jx = kind === 'CO2' ? 0 : Math.sin(i * 12.9898) * 14
    const jy = kind === 'CO2' ? 0 : Math.cos(i * 78.233) * 12
    const x = 24 + 44 + c * 88 + jx
    const y = 24 + 44.5 + r * 89 + jy
    const a = (i * 47) % 180
    if (kind === 'N2') out += pair(x, y, 13, a, 'N')
    else if (kind === 'O2') out += pair(x, y, 13, a, 'O')
    else if (kind === 'CO2') out += co2(x, y, 13)
    else out += h2o(x, y, 13)
  }
  return out
}

export const DIAGRAMS = {
  // Vote cards: the answer beside the hand that votes for it (A left, B right).
  ANS_YES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    <text x="440" y="214" font-family="${FONT}" font-size="150" font-weight="bold" fill="${BLUE}" text-anchor="middle">YES</text>
  </svg>`,

  ANS_NO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="280" y="214" font-family="${FONT}" font-size="150" font-weight="bold" fill="${KEY}" text-anchor="middle">NO</text>
  </svg>`,

  ANS_PURE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    <text x="440" y="205" font-family="${FONT}" font-size="120" font-weight="bold" fill="${BLUE}" text-anchor="middle">pure</text>
  </svg>`,

  ANS_MIXTURE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="262" y="192" font-family="${FONT}" font-size="90" font-weight="bold" fill="${KEY}" text-anchor="middle">mixture</text>
  </svg>`,

  MIX_COMPOUND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <defs>
      <marker id="u27-heat-head" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="24" markerHeight="24" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
    </defs>

    <rect x="30" y="70" width="430" height="262" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${loose()}
    <text x="120" y="40" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">iron atom</text>
    ${dot(112, 48, 86, 100)}
    <text x="340" y="40" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">sulfur atom</text>
    ${dot(334, 48, 326, 116)}

    <line x1="486" y1="200" x2="630" y2="200" stroke="${INK}" stroke-width="6" marker-end="url(#u27-heat-head)"/>
    <text x="556" y="176" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">heat</text>

    <rect x="660" y="70" width="430" height="262" rx="16" fill="#fdf1e3" stroke="${KEY}" stroke-width="2.5"/>
    ${bonded()}

    <text x="245" y="380" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">a mixture</text>
    <text x="245" y="418" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">iron and sulfur, not bonded</text>
    <text x="875" y="380" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">a compound</text>
    <text x="875" y="418" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">iron sulfide, bonded</text>
  </svg>`,

  AIR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="24" y="24" width="792" height="356" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${airSample()}

    ${pair(96, 440, 17, 0, 'N')}
    <text x="150" y="450" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">nitrogen</text>
    ${pair(486, 440, 17, 0, 'O')}
    <text x="540" y="450" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">oxygen</text>
    ${co2(96, 512, 15)}
    <text x="150" y="522" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">carbon dioxide</text>
    ${h2o(486, 504, 16)}
    <text x="540" y="522" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">water</text>
  </svg>`,

  // Start at the top, clockwise: nitrogen 78% (280.8°), oxygen 21% (75.6°),
  // everything else 1% (3.6°). Centre (290, 280), radius 230.
  AIR_PIE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M290 280 L290 50 A230 230 0 1 1 64.07 236.90 Z" fill="#9ec1ea" stroke="#ffffff" stroke-width="3"/>
    <path d="M290 280 L64.07 236.90 A230 230 0 0 1 275.56 50.45 Z" fill="#f08b82" stroke="#ffffff" stroke-width="3"/>
    <path d="M290 280 L275.56 50.45 A230 230 0 0 1 290 50 Z" fill="#4a8b23"/>
    <circle cx="290" cy="280" r="230" fill="none" stroke="${INK}" stroke-width="3"/>

    <rect x="580" y="92" width="36" height="36" rx="6" fill="#9ec1ea" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="634" y="128" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="start">78%</text>
    <text x="634" y="168" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="start">nitrogen</text>

    <rect x="580" y="232" width="36" height="36" rx="6" fill="#f08b82" stroke="#b3261e" stroke-width="2.5"/>
    <text x="634" y="268" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="start">21%</text>
    <text x="634" y="308" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="start">oxygen</text>

    <rect x="580" y="372" width="36" height="36" rx="6" fill="#4a8b23" stroke="#2f5f14" stroke-width="2.5"/>
    <text x="634" y="408" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="start">1%</text>
    <text x="634" y="448" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">carbon dioxide,</text>
    <text x="634" y="482" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">argon, water</text>
    <text x="634" y="516" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">and other gases</text>
  </svg>`,

  EMISSIONS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo(volcano, 'u27-em-volcano', 24, 24, 384, 420)}
    ${photo(traffic, 'u27-em-traffic', 432, 24, 384, 420)}
    <text x="216" y="494" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">from nature</text>
    <text x="216" y="532" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">volcano gas, Indonesia</text>
    <text x="624" y="494" font-family="${FONT}" font-size="34" font-weight="bold" fill="${RED}" text-anchor="middle">from people</text>
    <text x="624" y="532" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">motorbikes, Hanoi</text>
  </svg>`,

  MINERAL_LABEL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="110" y="16" width="620" height="528" rx="26" fill="#eef5fc" stroke="${BLUE}" stroke-width="6"/>
    <path d="M110 88 V42 A26 26 0 0 1 136 16 H704 A26 26 0 0 1 730 42 V88 Z" fill="${BLUE}"/>
    <text x="420" y="64" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">TYPICAL ANALYSIS mg/l</text>

    <text x="150" y="134" font-family="${FONT}" font-size="28" fill="${BLUE}" text-anchor="start">CALCIUM</text>
    <text x="690" y="134" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="end">55</text>
    <text x="150" y="178" font-family="${FONT}" font-size="28" fill="${BLUE}" text-anchor="start">MAGNESIUM</text>
    <text x="690" y="178" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="end">19</text>
    <text x="150" y="222" font-family="${FONT}" font-size="28" fill="${BLUE}" text-anchor="start">POTASSIUM</text>
    <text x="690" y="222" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="end">1</text>
    <text x="150" y="266" font-family="${FONT}" font-size="28" fill="${BLUE}" text-anchor="start">SODIUM</text>
    <text x="690" y="266" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="end">24</text>
    <text x="150" y="310" font-family="${FONT}" font-size="28" fill="${BLUE}" text-anchor="start">BICARBONATE</text>
    <text x="690" y="310" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="end">248</text>
    <text x="150" y="354" font-family="${FONT}" font-size="28" fill="${BLUE}" text-anchor="start">CHLORIDE</text>
    <text x="690" y="354" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="end">37</text>
    <text x="150" y="398" font-family="${FONT}" font-size="28" fill="${BLUE}" text-anchor="start">SULPHATE</text>
    <text x="690" y="398" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="end">13</text>
    <text x="150" y="442" font-family="${FONT}" font-size="28" fill="${BLUE}" text-anchor="start">NITRATE</text>
    <text x="690" y="442" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="end">less than 0.1</text>
    <text x="150" y="486" font-family="${FONT}" font-size="28" fill="${BLUE}" text-anchor="start">IRON</text>
    <text x="690" y="486" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="end">0</text>
    <text x="150" y="526" font-family="${FONT}" font-size="28" fill="${BLUE}" text-anchor="start">ALUMINIUM</text>
    <text x="690" y="526" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="end">0</text>
  </svg>`,
}
