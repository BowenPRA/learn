// content/y7-math/U04_review/diagrams.js
// Teaching diagrams for the Unit 4 consolidation day, drawn to match U04_1_4
// and U04_5.
//
// House rules (docs/LESSON-PLAYBOOK.md §5): a white plate first; every <text>
// written literally (helpers draw shapes only); no <tspan>; `split` diagrams
// 840×560, `showcase` diagrams wide.
//
//   ANS_1504 / ANS_1504B   vote (4.7 × 32) — A 15.04, B 150.4
//   GRID_47x32             47 × 32 by the grid method, then the estimate places the point
//   TABLE_DIVIDE           43.2 ÷ 16: write the 16 times table, then short division
//   ROUTES                 Mr Bowen's two routes to school, times in minutes

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const ORANGE_T = '#fdf1e3'
const TEAL_T = '#e2f2f6'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// A raised hand, from lucide. A is a LEFT hand seen from behind (mirrored), B a
// right hand — what a student sees when they raise it palm-forward.
const hand = (x, mirror, colour) =>
  `<g transform="translate(${x} 76) scale(${mirror ? '-7 7' : '7'})" fill="none" stroke="${colour}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>`

export const DIAGRAMS = {
  // ── Vote · 4.7 × 32 ──────────────────────────────────────────────────────
  ANS_1504: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, true, BLUE)}
    <text x="450" y="210" font-family="${FONT}" font-size="118" font-weight="bold" fill="${BLUE}" text-anchor="middle">15.04</text>
  </svg>`,

  ANS_1504B: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, false, KEY)}
    <text x="270" y="210" font-family="${FONT}" font-size="118" font-weight="bold" fill="${KEY}" text-anchor="middle">150.4</text>
  </svg>`,

  // ── The grid method, then the estimate ───────────────────────────────────
  GRID_47x32: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="52" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">1. Take the point out: 47 × 32</text>

    <rect x="170" y="76" width="120" height="60" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="290" y="76" width="200" height="60" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="490" y="76" width="200" height="60" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="230" y="117" font-family="${FONT}" font-size="32" font-weight="bold" fill="${MUTED}" text-anchor="middle">×</text>
    <text x="390" y="117" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">40</text>
    <text x="590" y="117" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">7</text>

    <rect x="170" y="136" width="120" height="70" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="290" y="136" width="200" height="70" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="490" y="136" width="200" height="70" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="230" y="182" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">30</text>
    <text x="390" y="182" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">1200</text>
    <text x="590" y="182" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">210</text>

    <rect x="170" y="206" width="120" height="70" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="290" y="206" width="200" height="70" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="490" y="206" width="200" height="70" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="230" y="252" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="390" y="252" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">80</text>
    <text x="590" y="252" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">14</text>

    <text x="420" y="326" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">1200 + 210 + 80 + 14 = 1504</text>

    <rect x="40" y="356" width="760" height="180" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="404" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">2. Estimate: 4.7 × 32 is about 5 × 30 = 150</text>
    <text x="420" y="462" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">3. Put the point in: 1504 → 150.4</text>
    <text x="420" y="514" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">150.4 is close to 150. 15.04 and 1504 are not.</text>
  </svg>`,

  // ── Dividing by 16: the times table first ────────────────────────────────
  TABLE_DIVIDE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="20" width="420" height="400" rx="16" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2"/>
    <text x="230" y="62" font-family="${FONT}" font-size="25" font-weight="bold" fill="${TEAL}" text-anchor="middle">1. Write the 16 times table</text>
    <text x="60" y="116" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">1 × 16 = 16</text>
    <text x="60" y="160" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">2 × 16 = 32</text>
    <text x="60" y="204" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">3 × 16 = 48</text>
    <text x="60" y="248" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">4 × 16 = 64</text>
    <text x="60" y="292" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">5 × 16 = 80</text>
    <text x="238" y="116" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">6 × 16 = 96</text>
    <text x="238" y="160" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">7 × 16 = 112</text>
    <text x="238" y="204" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">8 × 16 = 128</text>
    <text x="238" y="248" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">9 × 16 = 144</text>
    <text x="230" y="380" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">Keep adding 16.</text>

    <rect x="460" y="20" width="640" height="400" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="785" y="62" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">2. Short division: 43.2 ÷ 16</text>

    <text x="720" y="152" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="776" y="152" font-family="${FONT}" font-size="60" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="856" y="152" font-family="${FONT}" font-size="60" font-weight="bold" fill="${KEY}" text-anchor="middle">7</text>

    <path d="M 606 256 V 172 H 900" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <text x="548" y="240" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">16</text>
    <text x="650" y="240" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="720" y="240" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="776" y="240" font-family="${FONT}" font-size="60" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="816" y="206" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">11</text>
    <text x="856" y="240" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>

    <text x="490" y="310" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="start">43 ÷ 16 = 2, remainder 11</text>
    <text x="490" y="350" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="start">112 ÷ 16 = 7 (from the table)</text>
    <text x="490" y="392" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}" text-anchor="start">Check: 2.7 × 16 = 43.2</text>
  </svg>`,

  // ── Two routes to school ─────────────────────────────────────────────────
  ROUTES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="50" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen’s time to school, in minutes</text>

    <rect x="40" y="70" width="760" height="70" fill="${TEAL}" stroke="${TEAL}" stroke-width="2"/>
    <text x="420" y="106" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">Route A (four days)</text>
    <rect x="40" y="140" width="190" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="230" y="140" width="190" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="420" y="140" width="190" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="610" y="140" width="190" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="135" y="194" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">12.4</text>
    <text x="325" y="194" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">11.8</text>
    <text x="515" y="194" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">13.1</text>
    <text x="705" y="194" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">12.7</text>

    <rect x="40" y="262" width="760" height="70" fill="${KEY}" stroke="${KEY}" stroke-width="2"/>
    <text x="420" y="298" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">Route B (five days)</text>
    <rect x="40" y="332" width="152" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="192" y="332" width="152" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="344" y="332" width="152" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="496" y="332" width="152" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="648" y="332" width="152" height="80" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="116" y="386" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">12.9</text>
    <text x="268" y="386" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">11.2</text>
    <text x="420" y="386" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">12.6</text>
    <text x="572" y="386" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">13.4</text>
    <text x="724" y="386" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">11.4</text>

    <text x="420" y="480" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">Which route is quicker on average?</text>
    <text x="420" y="526" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">Route B has the slowest day of all: 13.4 minutes.</text>
  </svg>`,
}
