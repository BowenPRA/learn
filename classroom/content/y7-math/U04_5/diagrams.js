// content/y7-math/U04_5/diagrams.js
// Teaching diagrams for 4.5 Making decimal calculations easier, drawn to match
// 4.1–4.4 (U04_1_4).
//
// House rules (docs/LESSON-PLAYBOOK.md §5): a white plate first; every <text>
// written literally (helpers draw shapes only — audit:svg cannot see text from
// a helper); no <tspan>; `split` diagrams 840×560, `showcase` diagrams wide.
//
// Colour carries one meaning: ORANGE is the part being worked on, GREEN is the
// answer, RED is wrong.
//
//   PV_FRACTIONS       0.3, 0.07, 0.25: the last digit's column names the fraction
//   ANS_50 / ANS_500   vote (250 × 0.2) — A 50, B 500
//   BAR_TENTHS         250 in ten tenths; two of them are 50
//   POINT2_RULE        × 0.2 is ÷ 10 then × 2; × 0.03 is ÷ 100 then × 3
//   FRIENDLY           × 0.5, × 0.25, × 0.1 are half of, a quarter of, a tenth of
//   TEN_LOTS           3.8 × 10, then one lot fewer (× 9) or one more (× 11)
//   PARTITION          4.3 × 6 as an area: 4 × 6 and 0.3 × 6
//   MISTAKES           Mr Bowen's homework, which he has marked 4/4

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const ORANGE_T = '#fdf1e3'
const GREEN_T = '#eef6e6'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// A raised hand, from lucide. A is a LEFT hand seen from behind (mirrored), B a
// right hand — what a student sees when they raise it palm-forward.
const hand = (x, mirror, colour) =>
  `<g transform="translate(${x} 76) scale(${mirror ? '-7 7' : '7'})" fill="none" stroke="${colour}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>`

// Ten equal cells of a bar, the first `shaded` of them orange.
const barCells = (x0, y, w, h, shaded) =>
  Array.from({ length: 10 }, (_, k) =>
    `<rect x="${x0 + k * w}" y="${y}" width="${w}" height="${h}" fill="${k < shaded ? '#f4c08c' : '#ffffff'}" stroke="${INK}" stroke-width="2"/>`,
  ).join('')

// One "lot" of 3.8 in a row of lots: a small bar.
const lot = (x, y, fill, stroke) =>
  `<rect x="${x}" y="${y}" width="62" height="46" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
const lots = (y, n, fill) => Array.from({ length: n }, (_, k) => lot(40 + k * 68, y, fill, INK)).join('')

export const DIAGRAMS = {
  // ── Decimal → equivalent fraction ────────────────────────────────────────
  PV_FRACTIONS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="52" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">The last digit’s column is the bottom number</text>

    <text x="150" y="104" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">DECIMAL</text>
    <text x="400" y="104" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">SAY IT</text>
    <text x="690" y="104" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">FRACTION</text>

    <rect x="30" y="124" width="780" height="118" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="201" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">0.3</text>
    <text x="400" y="194" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">3 tenths</text>
    <text x="690" y="172" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <line x1="650" y1="184" x2="730" y2="184" stroke="${INK}" stroke-width="4"/>
    <text x="690" y="226" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">10</text>

    <rect x="30" y="254" width="780" height="118" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="331" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">0.07</text>
    <text x="400" y="324" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">7 hundredths</text>
    <text x="690" y="302" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <line x1="650" y1="314" x2="730" y2="314" stroke="${INK}" stroke-width="4"/>
    <text x="690" y="356" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">100</text>

    <rect x="30" y="384" width="780" height="118" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="461" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="middle">0.25</text>
    <text x="400" y="454" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">25 hundredths</text>
    <text x="660" y="432" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">25</text>
    <line x1="620" y1="444" x2="700" y2="444" stroke="${INK}" stroke-width="4"/>
    <text x="660" y="486" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">100</text>
    <text x="728" y="458" font-family="${FONT}" font-size="34" font-weight="bold" fill="${MUTED}" text-anchor="middle">=</text>
    <text x="772" y="432" font-family="${FONT}" font-size="40" font-weight="bold" fill="${GREEN}" text-anchor="middle">1</text>
    <line x1="752" y1="444" x2="792" y2="444" stroke="${GREEN}" stroke-width="4"/>
    <text x="772" y="486" font-family="${FONT}" font-size="40" font-weight="bold" fill="${GREEN}" text-anchor="middle">4</text>

    <text x="420" y="538" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">Equivalent: a different way to write the same value.</text>
  </svg>`,

  // ── Vote · 250 × 0.2 ─────────────────────────────────────────────────────
  ANS_50: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, true, BLUE)}
    <text x="440" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${BLUE}" text-anchor="middle">50</text>
  </svg>`,

  ANS_500: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, false, KEY)}
    <text x="280" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${KEY}" text-anchor="middle">500</text>
  </svg>`,

  // ── Two tenths of 250 ────────────────────────────────────────────────────
  BAR_TENTHS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <text x="560" y="54" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">250 × 0.2 means two tenths of 250</text>

    <path d="M 80 124 v -12 H 1040 v 12" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="560" y="100" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">250</text>

    ${barCells(80, 136, 96, 80, 2)}
    <text x="128" y="187" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">25</text>
    <text x="224" y="187" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">25</text>
    <text x="320" y="187" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">25</text>
    <text x="416" y="187" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">25</text>
    <text x="512" y="187" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">25</text>
    <text x="608" y="187" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">25</text>
    <text x="704" y="187" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">25</text>
    <text x="800" y="187" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">25</text>
    <text x="896" y="187" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">25</text>
    <text x="992" y="187" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">25</text>

    <path d="M 80 230 v 12 H 272 v -12" fill="none" stroke="${KEY}" stroke-width="3" stroke-linejoin="round"/>
    <text x="176" y="282" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">two tenths</text>
    <text x="176" y="330" font-family="${FONT}" font-size="44" font-weight="bold" fill="${GREEN}" text-anchor="middle">= 50</text>

    <rect x="420" y="266" width="620" height="140" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="730" y="322" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">one tenth: 250 ÷ 10 = 25</text>
    <text x="730" y="374" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">two tenths: 25 × 2 = 50</text>
  </svg>`,

  // ── The rule, twice ──────────────────────────────────────────────────────
  POINT2_RULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="30" y="24" width="780" height="244" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="420" y="90" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">250 × 0.2</text>
    <text x="420" y="148" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">0.2 = 2 ÷ 10, so ÷ 10 then × 2</text>
    <text x="420" y="226" font-family="${FONT}" font-size="40" font-weight="bold" fill="${GREEN}" text-anchor="middle">250 ÷ 10 × 2 = 25 × 2 = 50</text>

    <rect x="30" y="292" width="780" height="244" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="420" y="358" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">400 × 0.03</text>
    <text x="420" y="416" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">0.03 = 3 ÷ 100, so ÷ 100 then × 3</text>
    <text x="420" y="494" font-family="${FONT}" font-size="40" font-weight="bold" fill="${GREEN}" text-anchor="middle">400 ÷ 100 × 3 = 4 × 3 = 12</text>
  </svg>`,

  // ── Half of, a quarter of, a tenth of ────────────────────────────────────
  FRIENDLY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="30" y="24" width="780" height="160" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="140" y="104" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">× 0.5</text>
    <text x="420" y="98" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">half of</text>
    <text x="680" y="104" font-family="${FONT}" font-size="50" font-weight="bold" fill="${GREEN}" text-anchor="middle">÷ 2</text>
    <text x="420" y="160" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">46 × 0.5 = 46 ÷ 2 = 23</text>

    <rect x="30" y="200" width="780" height="160" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="140" y="280" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">× 0.25</text>
    <text x="420" y="274" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">a quarter of</text>
    <text x="680" y="280" font-family="${FONT}" font-size="50" font-weight="bold" fill="${GREEN}" text-anchor="middle">÷ 4</text>
    <text x="420" y="336" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">60 × 0.25 = 60 ÷ 4 = 15</text>

    <rect x="30" y="376" width="780" height="160" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="140" y="456" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">× 0.1</text>
    <text x="420" y="450" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">a tenth of</text>
    <text x="680" y="456" font-family="${FONT}" font-size="50" font-weight="bold" fill="${GREEN}" text-anchor="middle">÷ 10</text>
    <text x="420" y="512" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">73 × 0.1 = 73 ÷ 10 = 7.3</text>
  </svg>`,

  // ── Ten lots, then one fewer or one more ─────────────────────────────────
  TEN_LOTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="40" y="58" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">3.8 × 10 = 38</text>
    ${lots(96, 10, '#ffffff')}

    <text x="40" y="232" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="start">3.8 × 9 = 38 − 3.8 = 34.2</text>
    ${lots(270, 9, ORANGE_T)}
    ${lot(652, 270, '#ffffff', RED)}
    <path d="M 656 274 l 54 38 M 710 274 l -54 38" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>

    <text x="40" y="406" font-family="${FONT}" font-size="32" font-weight="bold" fill="${GREEN}" text-anchor="start">3.8 × 11 = 38 + 3.8 = 41.8</text>
    ${lots(444, 10, GREEN_T)}
    ${lot(720, 444, '#ffffff', GREEN)}
    <text x="751" y="475" font-family="${FONT}" font-size="22" font-weight="bold" fill="${GREEN}" text-anchor="middle">+1</text>

    <text x="420" y="538" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">Each box is one lot of 3.8.</text>
  </svg>`,

  // ── Partitioning, as an area ─────────────────────────────────────────────
  // Not to scale: the 0.3 strip is drawn wide enough to write in.
  PARTITION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="58" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">4.3 × 6</text>

    <text x="320" y="128" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">4</text>
    <text x="630" y="128" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">0.3</text>
    <text x="92" y="284" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">6</text>

    <rect x="120" y="146" width="400" height="230" fill="${ORANGE_T}" stroke="${INK}" stroke-width="3"/>
    <rect x="520" y="146" width="220" height="230" fill="#fbe1c4" stroke="${INK}" stroke-width="3"/>
    <text x="320" y="276" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">4 × 6 = 24</text>
    <text x="630" y="256" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">0.3 × 6</text>
    <text x="630" y="304" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">= 1.8</text>

    <text x="420" y="452" font-family="${FONT}" font-size="46" font-weight="bold" fill="${GREEN}" text-anchor="middle">24 + 1.8 = 25.8</text>
    <text x="420" y="516" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">4.3 = 4 + 0.3. Multiply each part, then add.</text>
  </svg>`,

  // ── Mr Bowen's homework: one mistake per method ──────────────────────────
  MISTAKES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="40" y="20" width="760" height="520" rx="6" fill="#fffdf5" stroke="#d8cfa8" stroke-width="2"/>
    <line x1="60" y1="140" x2="780" y2="140" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="220" x2="780" y2="220" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="300" x2="780" y2="300" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="380" x2="780" y2="380" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="460" x2="780" y2="460" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="120" y1="30" x2="120" y2="530" stroke="#e8a0a0" stroke-width="2"/>

    <text x="140" y="86" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">Mr Bowen’s homework</text>
    <circle cx="704" cy="78" r="44" fill="none" stroke="${RED}" stroke-width="4"/>
    <text x="704" y="91" font-family="${HAND}" font-size="34" font-weight="bold" fill="${RED}" text-anchor="middle">4/4</text>

    <text x="140" y="208" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">a)  80 × 0.3 = 240</text>
    <text x="140" y="288" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">b)  46 × 0.5 = 92</text>
    <text x="140" y="368" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">c)  3.4 × 9 = 34 − 3 = 31</text>
    <text x="140" y="448" font-family="${HAND}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">d)  5.2 × 6 = 30 + 0.12 = 30.12</text>

    <path d="M 728 190 l 12 14 l 24 -30 M 728 270 l 12 14 l 24 -30 M 728 350 l 12 14 l 24 -30 M 728 430 l 12 14 l 24 -30" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
}
