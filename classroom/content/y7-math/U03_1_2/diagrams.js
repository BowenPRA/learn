// content/y7-math/U03_1_2/diagrams.js
// Teaching diagrams for 3.1 Powers of 10 + 3.2 Rounding, drawn to match 2.3
// and 2.6.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · no <tspan> anywhere: the audit measures a <text>'s raw inner markup, so a
//    tspan inflates the measured width and reports a phantom overflow. Where two
//    colours are needed in one number, that is two <text> elements at computed x;
//  · powers are written with Unicode superscripts (10³), not markup;
//  · markers are `markerUnits="userSpaceOnUse"`;
//  · `split` diagrams are 840×560; `showcase` diagrams are wide strips.
//
// Colour carries one meaning throughout: ORANGE is the power / the place being
// rounded to, GREEN is right, RED is wrong.
//
//   POWER_PARTS   the anatomy of 10³ — which part is the base, which the power
//   POWER_WORDS   "power" in everyday English vs in maths, and how to say it
//   ZERO_LADDER   10¹…10⁶: the power counts the zeros
//   ANS_7P2000    vote 1, answer A — 7.2000 (the "just add zeros" answer)
//   ANS_7200      vote 1, answer B — 7200
//   PLACE_TABLE   the hinge: one table, × moves left and ÷ moves right
//   MASS_LADDER   mg → g → kg → t, each step ×10³
//   ROUND_WORDS   round to / correct to / to N d.p. — and "as far as", which differs
//   DP_COUNT      3.14159: count only the digits after the point
//   ROUND_LINE    4.53 is nearer 4.5; 4.55 is exactly halfway, so round up
//   KEEP_ZERO     35.0 not 35; 7.50 not 7.5 — the trailing zero is the accuracy
//   ANS_8285      vote 2, answer A — 8.285 (stopped too early)
//   ANS_8286      vote 2, answer B — 8.286
//   DIVIDE_STEPS  58 ÷ 7: stopping at 3 places vs going to 4 and rounding
//   MISTAKES      Mr Bowen's homework, which he has marked 4/4

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const TEAL_T = '#e2f2f6'
const GREEN_T = '#eef6e6'
const RED_T = '#fdecee'
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

export const DIAGRAMS = {
  POWER_PARTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="72" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Two parts, and only one is small</text>

    <text x="360" y="290" font-family="${FONT}" font-size="150" font-weight="bold" fill="${INK}" text-anchor="middle">10</text>
    <text x="450" y="205" font-family="${FONT}" font-size="95" font-weight="bold" fill="${KEY}" text-anchor="start">3</text>

    <path d="M 175 355 L 300 310" fill="none" stroke="${KEY}" stroke-width="2.5"/>
    <circle cx="302" cy="309" r="7" fill="${KEY}"/>
    <text x="140" y="378" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">base</text>

    <path d="M 620 158 L 530 176" fill="none" stroke="${KEY}" stroke-width="2.5"/>
    <circle cx="528" cy="176" r="7" fill="${KEY}"/>
    <text x="660" y="158" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">power</text>

    <text x="420" y="430" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">10 × 10 × 10 = 1000</text>
    <text x="420" y="496" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">Three tens, multiplied together.</text>
  </svg>`,

  POWER_WORDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 500" class="w-full h-full">
    ${plate(1120, 500)}

    <text x="70" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">EVERYDAY ENGLISH</text>
    <text x="720" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">IN MATHS</text>

    <rect x="20" y="66" width="1080" height="150" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="158" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">power</text>
    <path d="M 300 96 L 262 156 L 292 156 L 276 200 L 322 136 L 290 136 Z" fill="#fbe7a1" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <text x="360" y="152" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">The power is off.</text>
    <text x="720" y="126" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="start">how many to multiply</text>
    <text x="720" y="182" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">10³ = 10 × 10 × 10</text>

    <rect x="20" y="236" width="1080" height="244" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="60" y="284" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">How to say it</text>

    <text x="120" y="344" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="start">10²</text>
    <text x="240" y="344" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">ten squared</text>
    <text x="520" y="344" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">or ten to the power of two</text>

    <text x="120" y="406" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="start">10³</text>
    <text x="240" y="406" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">ten cubed</text>
    <text x="520" y="406" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">or ten to the power of three</text>

    <text x="120" y="464" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="start">10⁶</text>
    <text x="240" y="464" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">ten to the power of six</text>
  </svg>`,

  ZERO_LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="66" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">The power counts the zeros</text>

    <rect x="40" y="94" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="140" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="140" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">¹</text>
    <text x="190" y="140" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="140" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="140" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">0</text>
    <text x="580" y="138" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">1 zero</text>

    <rect x="40" y="162" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="208" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="208" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">²</text>
    <text x="190" y="208" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="208" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="208" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">00</text>
    <text x="580" y="206" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">2 zeros</text>

    <rect x="40" y="230" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="276" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="276" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">³</text>
    <text x="190" y="276" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="276" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="276" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">000</text>
    <text x="580" y="274" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">3 zeros</text>

    <rect x="40" y="298" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="344" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="344" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">⁴</text>
    <text x="190" y="344" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="344" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="344" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">0000</text>
    <text x="580" y="342" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">4 zeros</text>

    <rect x="40" y="366" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="412" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="412" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">⁵</text>
    <text x="190" y="412" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="412" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="412" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">00000</text>
    <text x="580" y="410" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">5 zeros</text>

    <rect x="40" y="434" width="760" height="56" rx="10" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="90" y="480" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">10</text>
    <text x="138" y="480" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">⁶</text>
    <text x="190" y="480" font-family="${FONT}" font-size="34" fill="${MUTED}" text-anchor="start">=</text>
    <text x="250" y="480" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">1</text>
    <text x="276" y="480" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">000000</text>
    <text x="580" y="478" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">6 zeros</text>

    <text x="420" y="534" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">This works for 1 followed by zeros. Nothing else.</text>
  </svg>`,

  ANS_7P2000: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, true, BLUE)}
    <text x="440" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${BLUE}" text-anchor="middle">7.2000</text>
  </svg>`,

  ANS_7200: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, false, KEY)}
    <text x="280" y="215" font-family="${FONT}" font-size="140" font-weight="bold" fill="${KEY}" text-anchor="middle">7200</text>
  </svg>`,

  PLACE_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 430" class="w-full h-full">
    ${plate(1120, 430)}
    <defs>
      <marker id="u312-left" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
      <marker id="u312-right" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${TEAL}"/></marker>
    </defs>

    <text x="560" y="48" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Every column is 10 times the one on its right</text>

    <rect x="40" y="80" width="140" height="50" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="180" y="80" width="140" height="50" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="320" y="80" width="140" height="50" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="460" y="80" width="140" height="50" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="640" y="80" width="140" height="50" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="780" y="80" width="140" height="50" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="920" y="80" width="140" height="50" fill="${ORANGE_T}" stroke="${RULE}" stroke-width="2"/>
    <text x="110" y="113" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">thousands</text>
    <text x="250" y="113" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">hundreds</text>
    <text x="390" y="113" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">tens</text>
    <text x="530" y="113" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">ones</text>
    <text x="710" y="113" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">tenths</text>
    <text x="850" y="113" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">hundredths</text>
    <text x="990" y="113" font-family="${FONT}" font-size="20" fill="${KEY}" text-anchor="middle">thousandths</text>

    <rect x="40" y="130" width="140" height="66" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="180" y="130" width="140" height="66" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="320" y="130" width="140" height="66" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="460" y="130" width="140" height="66" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="640" y="130" width="140" height="66" fill="#ffffff" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="780" y="130" width="140" height="66" fill="#ffffff" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="920" y="130" width="140" height="66" fill="#ffffff" stroke="${KEY}" stroke-width="2.5"/>
    <text x="110" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">1000</text>
    <text x="250" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">100</text>
    <text x="390" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">10</text>
    <text x="530" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="710" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">0.1</text>
    <text x="850" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">0.01</text>
    <text x="990" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">0.001</text>
    <circle cx="620" cy="188" r="11" fill="${INK}"/>

    <line x1="600" y1="262" x2="90" y2="262" stroke="${KEY}" stroke-width="5" marker-end="url(#u312-left)"/>
    <text x="345" y="308" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">× 10 moves a digit left</text>

    <line x1="630" y1="356" x2="1050" y2="356" stroke="${TEAL}" stroke-width="5" marker-end="url(#u312-right)"/>
    <text x="830" y="402" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">÷ 10 moves a digit right</text>
  </svg>`,

  MASS_LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u312-dn" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
      <marker id="u312-up" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${TEAL}"/></marker>
    </defs>

    <rect x="110" y="30" width="280" height="80" rx="12" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="250" y="82" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">tonne (t)</text>

    <rect x="110" y="170" width="280" height="80" rx="12" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="250" y="222" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">kilogram (kg)</text>

    <rect x="110" y="310" width="280" height="80" rx="12" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="250" y="362" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">gram (g)</text>

    <rect x="110" y="450" width="280" height="80" rx="12" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="250" y="502" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">milligram (mg)</text>

    <line x1="450" y1="114" x2="450" y2="164" stroke="${KEY}" stroke-width="4" marker-end="url(#u312-dn)"/>
    <line x1="450" y1="254" x2="450" y2="304" stroke="${KEY}" stroke-width="4" marker-end="url(#u312-dn)"/>
    <line x1="450" y1="394" x2="450" y2="444" stroke="${KEY}" stroke-width="4" marker-end="url(#u312-dn)"/>
    <text x="480" y="152" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">× 10³</text>
    <text x="480" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">× 10³</text>
    <text x="480" y="432" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">× 10³</text>

    <line x1="670" y1="164" x2="670" y2="114" stroke="${TEAL}" stroke-width="4" marker-end="url(#u312-up)"/>
    <line x1="670" y1="304" x2="670" y2="254" stroke="${TEAL}" stroke-width="4" marker-end="url(#u312-up)"/>
    <line x1="670" y1="444" x2="670" y2="394" stroke="${TEAL}" stroke-width="4" marker-end="url(#u312-up)"/>
    <text x="700" y="152" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="start">÷ 10³</text>
    <text x="700" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="start">÷ 10³</text>
    <text x="700" y="432" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="start">÷ 10³</text>
  </svg>`,

  ROUND_WORDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 500" class="w-full h-full">
    ${plate(1120, 500)}

    <text x="70" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">THE EXAM SAYS</text>
    <text x="600" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">IT MEANS</text>

    <rect x="20" y="64" width="1080" height="96" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="60" y="124" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">round to 2 d.p.</text>
    ${tick(520, 112, 26)}
    <text x="600" y="112" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="start">round it</text>
    <text x="600" y="146" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">8.472 → 8.47</text>

    <rect x="20" y="172" width="1080" height="96" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="60" y="232" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">correct to 2 d.p.</text>
    ${tick(520, 220, 26)}
    <text x="600" y="220" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="start">the same job</text>
    <text x="600" y="254" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">you will see this one most often</text>

    <rect x="20" y="280" width="1080" height="96" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="60" y="340" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">to 2 decimal places</text>
    ${tick(520, 328, 26)}
    <text x="600" y="328" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="start">the same job</text>
    <text x="600" y="362" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">d.p. is short for decimal places</text>

    <rect x="20" y="388" width="1080" height="96" rx="12" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>
    <text x="60" y="448" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">as far as 2 d.p.</text>
    ${cross(520, 436, 26)}
    <text x="600" y="436" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="start">NOT the same job</text>
    <text x="600" y="470" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">keep dividing — do not round yet</text>
  </svg>`,

  DP_COUNT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="70" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Count only after the point</text>

    <text x="160" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${MUTED}" text-anchor="middle">3</text>
    <text x="215" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">.</text>
    <text x="265" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="335" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="405" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="475" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="545" y="240" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>

    <path d="M 240 268 v 16 H 570 v -16" fill="none" stroke="${KEY}" stroke-width="3" stroke-linejoin="round"/>

    <text x="265" y="338" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">1</text>
    <text x="335" y="338" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="405" y="338" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">3</text>
    <text x="475" y="338" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">4</text>
    <text x="545" y="338" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">5</text>

    <text x="660" y="338" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">places</text>

    <text x="420" y="428" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">3.14159 has 5 decimal places</text>
    <text x="420" y="492" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">The 3 in front is never counted.</text>
  </svg>`,

  ROUND_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="24" y="24" width="792" height="240" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="300" y="70" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.53 to 1 decimal place</text>
    <line x1="80" y1="180" x2="560" y2="180" stroke="${INK}" stroke-width="3"/>
    <line x1="80" y1="164" x2="80" y2="196" stroke="${INK}" stroke-width="3"/>
    <line x1="320" y1="168" x2="320" y2="192" stroke="${RULE}" stroke-width="3"/>
    <line x1="560" y1="164" x2="560" y2="196" stroke="${INK}" stroke-width="3"/>
    <circle cx="224" cy="180" r="11" fill="${KEY}"/>
    <text x="224" y="146" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">4.53</text>
    <text x="80" y="232" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.5</text>
    <text x="560" y="232" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.6</text>
    <text x="700" y="122" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">nearer 4.5</text>
    <text x="700" y="206" font-family="${FONT}" font-size="60" font-weight="bold" fill="${GREEN}" text-anchor="middle">4.5</text>

    <rect x="24" y="288" width="792" height="240" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="300" y="334" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.55 to 1 decimal place</text>
    <line x1="80" y1="444" x2="560" y2="444" stroke="${INK}" stroke-width="3"/>
    <line x1="80" y1="428" x2="80" y2="460" stroke="${INK}" stroke-width="3"/>
    <line x1="320" y1="432" x2="320" y2="456" stroke="${RULE}" stroke-width="3"/>
    <line x1="560" y1="428" x2="560" y2="460" stroke="${INK}" stroke-width="3"/>
    <circle cx="320" cy="444" r="11" fill="${KEY}"/>
    <text x="320" y="410" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">4.55</text>
    <text x="80" y="496" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.5</text>
    <text x="560" y="496" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4.6</text>
    <text x="700" y="376" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">exactly halfway</text>
    <text x="700" y="408" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">round up</text>
    <text x="700" y="482" font-family="${FONT}" font-size="60" font-weight="bold" fill="${KEY}" text-anchor="middle">4.6</text>
  </svg>`,

  KEEP_ZERO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="24" y="24" width="792" height="250" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="420" y="78" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">34.9892 to 1 d.p.</text>
    ${cross(250, 172)}
    <text x="340" y="196" font-family="${FONT}" font-size="70" font-weight="bold" fill="${RED}" text-anchor="start">35</text>
    ${tick(540, 172)}
    <text x="610" y="196" font-family="${FONT}" font-size="70" font-weight="bold" fill="${GREEN}" text-anchor="start">35.0</text>
    <text x="420" y="250" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">The .0 is what shows 1 decimal place.</text>

    <rect x="24" y="294" width="792" height="250" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="420" y="348" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">7.4955 to 2 d.p.</text>
    ${cross(250, 442)}
    <text x="340" y="466" font-family="${FONT}" font-size="70" font-weight="bold" fill="${RED}" text-anchor="start">7.5</text>
    ${tick(540, 442)}
    <text x="610" y="466" font-family="${FONT}" font-size="70" font-weight="bold" fill="${GREEN}" text-anchor="start">7.50</text>
    <text x="420" y="520" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">Never delete a zero at the end.</text>
  </svg>`,

  ANS_8285: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, true, BLUE)}
    <text x="440" y="215" font-family="${FONT}" font-size="130" font-weight="bold" fill="${BLUE}" text-anchor="middle">8.285</text>
  </svg>`,

  ANS_8286: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, false, KEY)}
    <text x="280" y="215" font-family="${FONT}" font-size="130" font-weight="bold" fill="${KEY}" text-anchor="middle">8.286</text>
  </svg>`,

  DIVIDE_STEPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <text x="560" y="76" font-family="${FONT}" font-size="52" font-weight="bold" fill="${INK}" text-anchor="middle">58 ÷ 7 = 8.285714…</text>

    <rect x="40" y="120" width="480" height="284" rx="16" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>
    <text x="280" y="172" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Stop at 3 places</text>
    <text x="280" y="268" font-family="${FONT}" font-size="76" font-weight="bold" fill="${RED}" text-anchor="middle">8.285</text>
    ${cross(200, 348)}
    <text x="252" y="362" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="start">too early</text>

    <rect x="600" y="120" width="480" height="284" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="840" y="172" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Go to 4, then round</text>
    <text x="840" y="268" font-family="${FONT}" font-size="50" font-weight="bold" fill="${GREEN}" text-anchor="middle">8.2857 → 8.286</text>
    ${tick(760, 348)}
    <text x="812" y="362" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="start">correct</text>
  </svg>`,

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

    <text x="140" y="208" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">a)  4.6 × 10³ = 4.6000</text>
    <text x="140" y="288" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">b)  48000 ÷ 10⁴ = 48</text>
    <text x="140" y="368" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">c)  9.96 to 1 d.p. = 9.10</text>
    <text x="140" y="448" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">d)  2.7449 to 2 d.p. = 2.75</text>

    <path d="M 728 190 l 12 14 l 24 -30 M 728 270 l 12 14 l 24 -30 M 728 350 l 12 14 l 24 -30 M 728 430 l 12 14 l 24 -30" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
}
