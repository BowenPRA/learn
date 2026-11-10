// content/y7-math/U04_1_4/diagrams.js
// Teaching diagrams for 4.1–4.4 Decimals, drawn to match 2.3 and 3.1–3.2.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · no <tspan>: two colours in one line are two <text> elements;
//  · markers are `markerUnits="userSpaceOnUse"`;
//  · `split` diagrams are 840×560; `showcase` diagrams are wide strips.
//
// Colour carries one meaning throughout: ORANGE is a zero or a point that the
// student writes in, GREEN is right, RED is wrong, TEAL is the point moving.
//
//   ANS_325 / ANS_33    vote 1 (which is bigger?) — A 3.25, B 3.3
//   SAY_IT              "three point two five", and a point, not a comma
//   ORDER_COLS          3.30 over 3.25: the tenths decide
//   ANS_028 / ANS_038   vote 2 (1 − 0.72) — A 0.28, B 0.38
//   ANS_012 / ANS_12    vote 3 (0.3 × 4) — A 0.12, B 1.2
//   RIBBON              four 0.3 m ribbons on a metre rule reach 1.2 m
//   POINT_OUT           3.2 × 7: take the point out, multiply, put it back
//   ANS_206 / ANS_26    vote 4 (8.24 ÷ 4) — A 2.06, B 2.6
//   BUS_STOP            short division of 8.24 by 4, and the check
//   MISTAKES            Mr Bowen's homework, which he has marked 4/4
//   WORDS_OPS           the English that tells you which operation

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const ORANGE_T = '#fdf1e3'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const tick = (cx, cy, r = 30) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${GREEN}"/>
    <path d="M ${cx - r * 0.5} ${cy + 0.03 * r} l ${r * 0.35} ${r * 0.35} l ${r * 0.65} -${r * 0.76}" fill="none" stroke="#ffffff" stroke-width="${r * 0.2}" stroke-linecap="round" stroke-linejoin="round"/>`

const cross = (cx, cy, r = 30) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${RED}"/>
    <path d="M ${cx - r * 0.38} ${cy - r * 0.38} l ${r * 0.76} ${r * 0.76} M ${cx + r * 0.38} ${cy - r * 0.38} l -${r * 0.76} ${r * 0.76}" fill="none" stroke="#ffffff" stroke-width="${r * 0.2}" stroke-linecap="round"/>`

// A raised hand, from lucide. A is a LEFT hand seen from behind (mirrored), B a
// right hand — what a student sees when they raise it palm-forward.
const hand = (x, mirror, colour) =>
  `<g transform="translate(${x} 76) scale(${mirror ? '-7 7' : '7'})" fill="none" stroke="${colour}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>`

// The ruler's tick marks: every 0.1 m, taller at each half metre.
const rulerTicks = () =>
  Array.from({ length: 16 }, (_, k) => {
    const x = 80 + 64 * k
    const tall = k % 5 === 0
    return `<line x1="${x}" y1="262" x2="${x}" y2="${tall ? 304 : 284}" stroke="${INK}" stroke-width="${tall ? 3 : 2}"/>`
  }).join('')

export const DIAGRAMS = {
  // ── Vote 1 · which is bigger? ────────────────────────────────────────────
  ANS_325: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, true, BLUE)}
    <text x="440" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${BLUE}" text-anchor="middle">3.25</text>
  </svg>`,

  ANS_33: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, false, KEY)}
    <text x="280" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${KEY}" text-anchor="middle">3.3</text>
  </svg>`,

  // ── Say it, write it ─────────────────────────────────────────────────────
  SAY_IT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <text x="60" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">SAY IT</text>
    <rect x="20" y="62" width="1080" height="160" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="180" y="172" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">3.25</text>
    ${tick(400, 110, 24)}
    <text x="440" y="123" font-family="${FONT}" font-size="38" font-weight="bold" fill="${GREEN}" text-anchor="start">three point two five</text>
    ${cross(400, 180, 24)}
    <text x="440" y="193" font-family="${FONT}" font-size="38" font-weight="bold" fill="${RED}" text-anchor="start">three point twenty-five</text>

    <text x="60" y="264" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">WRITE IT</text>
    <rect x="20" y="280" width="1080" height="142" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    ${tick(90, 351, 26)}
    <text x="130" y="374" font-family="${FONT}" font-size="66" font-weight="bold" fill="${GREEN}" text-anchor="start">3.25</text>
    ${cross(370, 351, 26)}
    <text x="410" y="374" font-family="${FONT}" font-size="66" font-weight="bold" fill="${RED}" text-anchor="start">3,25</text>
    <text x="600" y="336" font-family="${FONT}" font-size="25" fill="${MUTED}" text-anchor="start">In English, a comma is for thousands:</text>
    <text x="600" y="392" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="start">3,250 = 3250</text>
  </svg>`,

  // ── Compare: the tenths decide ───────────────────────────────────────────
  ORDER_COLS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="56" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Line up the points</text>

    <text x="295" y="108" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="middle">whole-number part</text>
    <text x="540" y="108" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="middle">decimal part</text>
    <path d="M 236 120 v 10 H 354 v -10 M 416 120 v 10 H 664 v -10" fill="none" stroke="${KEY}" stroke-width="2.5" stroke-linejoin="round"/>

    <rect x="230" y="146" width="130" height="44" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="360" y="146" width="50" height="44" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="410" y="146" width="130" height="44" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="540" y="146" width="130" height="44" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <text x="295" y="175" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">ones</text>
    <text x="475" y="175" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">tenths</text>
    <text x="605" y="175" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">hundredths</text>

    <rect x="230" y="190" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="360" y="190" width="50" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="410" y="190" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="540" y="190" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="295" y="258" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="385" y="258" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="475" y="258" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="605" y="258" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>

    <rect x="230" y="280" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="360" y="280" width="50" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="410" y="280" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="540" y="280" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <text x="295" y="348" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="385" y="348" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="475" y="348" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="605" y="348" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>

    <rect x="412" y="192" width="126" height="176" fill="none" stroke="${GREEN}" stroke-width="6" rx="4"/>

    <text x="420" y="428" font-family="${FONT}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">3 tenths beat 2 tenths</text>
    <text x="420" y="484" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">3.3 &gt; 3.25</text>
    <text x="420" y="534" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">The orange zero changes nothing: 3.3 = 3.30</text>
  </svg>`,

  // ── Vote 2 · 1 − 0.72 ────────────────────────────────────────────────────
  ANS_028: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, true, BLUE)}
    <text x="440" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${BLUE}" text-anchor="middle">0.28</text>
  </svg>`,

  ANS_038: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, false, KEY)}
    <text x="280" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${KEY}" text-anchor="middle">0.38</text>
  </svg>`,

  // ── Vote 3 · 0.3 × 4 ─────────────────────────────────────────────────────
  ANS_012: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, true, BLUE)}
    <text x="440" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${BLUE}" text-anchor="middle">0.12</text>
  </svg>`,

  ANS_12: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, false, KEY)}
    <text x="280" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${KEY}" text-anchor="middle">1.2</text>
  </svg>`,

  // ── Four lots of 0.3 m ───────────────────────────────────────────────────
  // Scale: x = 80 + 640 × metres, so 0.3 m is 192 px and 1 m is at x = 720.
  RIBBON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <text x="560" y="58" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">0.3 × 4 = 0.3 + 0.3 + 0.3 + 0.3</text>

    <rect x="80" y="172" width="192" height="56" fill="#fbe1c4" stroke="${KEY}" stroke-width="3"/>
    <rect x="272" y="172" width="192" height="56" fill="#f4c08c" stroke="${KEY}" stroke-width="3"/>
    <rect x="464" y="172" width="192" height="56" fill="#fbe1c4" stroke="${KEY}" stroke-width="3"/>
    <rect x="656" y="172" width="192" height="56" fill="#f4c08c" stroke="${KEY}" stroke-width="3"/>
    <text x="176" y="156" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">0.3 m</text>
    <text x="368" y="156" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">0.3 m</text>
    <text x="560" y="156" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">0.3 m</text>
    <text x="752" y="156" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">0.3 m</text>

    <rect x="60" y="262" width="1000" height="58" rx="4" fill="#fbf3dd" stroke="${INK}" stroke-width="2"/>
    ${rulerTicks()}
    <text x="80" y="356" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">0 m</text>
    <text x="400" y="356" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">0.5 m</text>
    <text x="720" y="356" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">1 m</text>
    <text x="1040" y="356" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">1.5 m</text>

    <line x1="848" y1="172" x2="848" y2="382" stroke="${GREEN}" stroke-width="4" stroke-dasharray="10 8"/>
    <text x="848" y="420" font-family="${FONT}" font-size="40" font-weight="bold" fill="${GREEN}" text-anchor="middle">1.2 m</text>
  </svg>`,

  // ── Point out, point back ────────────────────────────────────────────────
  POINT_OUT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u414-dn" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <text x="420" y="88" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">3.2 × 7</text>
    <line x1="420" y1="108" x2="420" y2="160" stroke="${KEY}" stroke-width="4" marker-end="url(#u414-dn)"/>
    <text x="440" y="144" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="start">take the point out</text>

    <text x="420" y="218" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">32 × 7 = 224</text>
    <line x1="420" y1="238" x2="420" y2="290" stroke="${KEY}" stroke-width="4" marker-end="url(#u414-dn)"/>
    <text x="440" y="274" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="start">put it back: 1 decimal place</text>

    <text x="420" y="348" font-family="${FONT}" font-size="60" font-weight="bold" fill="${GREEN}" text-anchor="middle">3.2 × 7 = 22.4</text>

    <rect x="60" y="392" width="720" height="140" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="448" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">Estimate: 3 × 7 = 21</text>
    <text x="420" y="500" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">22.4 is close. 224 and 2.24 are not.</text>
  </svg>`,

  // ── Vote 4 · 8.24 ÷ 4 ────────────────────────────────────────────────────
  ANS_206: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, true, BLUE)}
    <text x="440" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${BLUE}" text-anchor="middle">2.06</text>
  </svg>`,

  ANS_26: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, false, KEY)}
    <text x="280" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${KEY}" text-anchor="middle">2.6</text>
  </svg>`,

  // ── Short division, with the point straight up ───────────────────────────
  BUS_STOP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <defs>
      <marker id="u414-up" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${TEAL}"/></marker>
    </defs>

    <rect x="20" y="20" width="600" height="400" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="60" y="68" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">8.24 ÷ 4</text>

    <text x="280" y="146" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="335" y="146" font-family="${FONT}" font-size="64" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="390" y="146" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}" text-anchor="middle">0</text>
    <text x="480" y="146" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>

    <path d="M 225 250 V 166 H 540" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <text x="172" y="236" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="280" y="236" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="335" y="236" font-family="${FONT}" font-size="64" font-weight="bold" fill="${TEAL}" text-anchor="middle">.</text>
    <text x="390" y="236" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="446" y="204" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="480" y="236" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>

    <line x1="335" y1="216" x2="335" y2="154" stroke="${TEAL}" stroke-width="3.5" stroke-dasharray="7 6" marker-end="url(#u414-up)"/>

    <text x="60" y="310" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}" text-anchor="start">The point goes straight up.</text>
    <text x="60" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="start">2 ÷ 4 = 0, remainder 2. Write 0.</text>
    <text x="60" y="394" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">Carry the 2: 24 ÷ 4 = 6.</text>

    <rect x="650" y="20" width="450" height="400" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="875" y="78" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Check: multiply back</text>
    ${tick(702, 168, 26)}
    <text x="744" y="181" font-family="${FONT}" font-size="38" font-weight="bold" fill="${GREEN}" text-anchor="start">2.06 × 4 = 8.24</text>
    ${cross(702, 268, 26)}
    <text x="744" y="281" font-family="${FONT}" font-size="38" font-weight="bold" fill="${RED}" text-anchor="start">2.6 × 4 = 10.4</text>
    <text x="875" y="372" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">× is the inverse of ÷</text>
  </svg>`,

  // ── Mr Bowen's homework: one mistake from each part of the lesson ────────
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

    <text x="140" y="208" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">a)  4.09 &gt; 4.1</text>
    <text x="140" y="288" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">b)  12 − 4.5 = 8.5</text>
    <text x="140" y="368" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">c)  0.6 × 3 = 0.18</text>
    <text x="140" y="448" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">d)  9.18 ÷ 3 = 3.6</text>

    <path d="M 728 190 l 12 14 l 24 -30 M 728 270 l 12 14 l 24 -30 M 728 350 l 12 14 l 24 -30 M 728 430 l 12 14 l 24 -30" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ── The English that picks the operation ─────────────────────────────────
  WORDS_OPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="20" y="18" width="800" height="122" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <circle cx="90" cy="79" r="40" fill="${TEAL}"/>
    <text x="90" y="97" font-family="${FONT}" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">+</text>
    <text x="160" y="70" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="start">altogether · in total</text>
    <text x="160" y="114" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">How much is that altogether?</text>

    <rect x="20" y="152" width="800" height="122" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <circle cx="90" cy="213" r="40" fill="${TEAL}"/>
    <text x="90" y="231" font-family="${FONT}" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">−</text>
    <text x="160" y="204" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="start">change · how much more</text>
    <text x="160" y="248" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">How much change does he get?</text>

    <rect x="20" y="286" width="800" height="122" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <circle cx="90" cy="347" r="40" fill="${TEAL}"/>
    <text x="90" y="365" font-family="${FONT}" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">×</text>
    <text x="160" y="338" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="start">each · lots of</text>
    <text x="160" y="382" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">6 pens at 1.25 dollars each</text>

    <rect x="20" y="420" width="800" height="122" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <circle cx="90" cy="481" r="40" fill="${TEAL}"/>
    <text x="90" y="499" font-family="${FONT}" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">÷</text>
    <text x="160" y="472" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="start">share equally</text>
    <text x="160" y="516" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">Share 7.45 dollars equally between 5.</text>
  </svg>`,
}
