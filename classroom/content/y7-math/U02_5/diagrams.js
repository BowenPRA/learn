// content/y7-math/U02_5/diagrams.js
// Teaching diagrams for 2.5 Constructing and Solving Equations, drawn to match
// 2.3 and 2.4.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes and images only,
//    because `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · markers are `markerUnits="userSpaceOnUse"`;
//  · `split` diagrams are 840×560; `showcase` diagrams are 1120×440 strips.
//
// Colour carries meaning, the same as in widgets.jsx: the unknown letter is
// teal, the operations done to it are purple, the inverse operations that undo
// them — and the answer — are the book's orange.
//
//   KINDS         expression (2.1) · formula (2.2) · equation (today)
//   WORDS         reverse · inverse · think of — what they know against maths
//   CHECK         x − 4 = 6: put x = 2 and x = 10 back in
//   INVERSES      + 5 and − 5 · × 3 and ÷ 3 undo each other
//   FLOW          the book's flow chart for x + 5 = 12, forward and backwards
//   SENTENCE      "I think of a number and subtract 5. My answer is 21."
//   SOCKS_REAL    a real pair of socks and shoes: last on, first off
//   TWO_STEP      2a + 4 = 18 as a flow chart: undo the + 4 first
//   MISTAKES      Mr Bowen's homework, which he has marked 4/4
//   ANGLES        a right angle split into 4x and 5x (Challenge)
//   ANS_*         the two answers on each vote slide (5 and 18)

import socks from './images/socks.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const TEAL_T = '#e2f2f6'
const PURPLE_T = '#f2ecf7'
const SLATE_T = '#eef1f4'
const GREEN_T = '#eef6e6'
const RED_T = '#fdecee'
const ORANGE_T = '#fdf1e3'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// A lucide "hand" outline, scaled up. Mirrored on the A card so it reads as a
// LEFT hand seen from behind — what a student sees when they raise it.
const hand = (x, colour, mirror) =>
  `<g transform="translate(${x} 76) scale(${mirror ? '-7 7' : '7'})" fill="none" stroke="${colour}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>`

const cross = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="34" fill="${RED}"/>
    <path d="M ${cx - 13} ${cy - 13} l 26 26 M ${cx + 13} ${cy - 13} l -26 26" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>`

const tick = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="34" fill="${GREEN}"/>
    <path d="M ${cx - 15} ${cy + 1} l 10 11 l 20 -24" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`

// The book's flow-chart boxes: a forward box points right, a reverse box left.
const fwd = (x, y, w, h, stroke, fill) =>
  `<path d="M ${x} ${y} H ${x + w - 26} L ${x + w} ${y + h / 2} L ${x + w - 26} ${y + h} H ${x} Z" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>`
const back = (x, y, w, h, stroke, fill) =>
  `<path d="M ${x + 26} ${y} H ${x + w} V ${y + h} H ${x + 26} L ${x} ${y + h / 2} Z" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>`

export const DIAGRAMS = {
  KINDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="30" y="30" width="780" height="150" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="60" y="78" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="start">2.1 · expression</text>
    <text x="60" y="148" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="start">3x + 2</text>
    <text x="780" y="140" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="end">no = sign</text>

    <rect x="30" y="200" width="780" height="150" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="60" y="248" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="start">2.2 · formula</text>
    <text x="60" y="318" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="start">P = 4s</text>
    <text x="780" y="310" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="end">a rule for any s</text>

    <rect x="30" y="370" width="780" height="160" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="60" y="418" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="start">today · equation</text>
    <text x="60" y="494" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="start">x + 7 = 15</text>
    <text x="780" y="470" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="end">x is one</text>
    <text x="780" y="508" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="end">unknown number</text>
  </svg>`,

  WORDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${plate(1120, 470)}

    <text x="290" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">YOU KNOW THIS</text>
    <text x="660" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">TODAY IN MATHS</text>

    <!-- reverse -->
    <rect x="20" y="66" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="142" font-family="${FONT}" font-size="42" font-weight="bold" fill="${INK}" text-anchor="middle">reverse</text>
    <text x="290" y="118" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">The car reverses.</text>
    <text x="290" y="164" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">It goes backwards.</text>
    <text x="660" y="116" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">go backwards</text>
    <text x="660" y="164" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="start">Reverse the flow chart.</text>

    <!-- inverse -->
    <rect x="20" y="206" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="282" font-family="${FONT}" font-size="42" font-weight="bold" fill="${INK}" text-anchor="middle">inverse</text>
    <text x="290" y="258" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">Unit 1: the inverse</text>
    <text x="290" y="304" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">of 5 is −5.</text>
    <text x="660" y="256" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">the opposite operation</text>
    <text x="660" y="304" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="start">+ 5 is undone by − 5</text>

    <!-- think of -->
    <rect x="20" y="346" width="1080" height="112" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="416" font-family="${FONT}" font-size="42" font-weight="bold" fill="${INK}" text-anchor="middle">think of</text>
    <text x="290" y="394" font-family="${FONT}" font-size="28" fill="${INK}" text-anchor="start">I think of my family.</text>
    <text x="290" y="436" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="start">(I remember them.)</text>
    <text x="660" y="392" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="start">choose a secret number</text>
    <text x="660" y="438" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="start">I think of a number: n</text>
  </svg>`,

  CHECK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="62" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}" text-anchor="middle">Put each answer back in</text>

    <rect x="40" y="96" width="370" height="310" rx="16" fill="${RED_T}" stroke="${RED}" stroke-width="3"/>
    <text x="225" y="170" font-family="${FONT}" font-size="54" font-weight="bold" fill="${BLUE}" text-anchor="middle">x = 2</text>
    <text x="225" y="252" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">2 − 4 = −2</text>
    <text x="225" y="306" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">not 6</text>
    ${cross(225, 356)}

    <rect x="430" y="96" width="370" height="310" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="615" y="170" font-family="${FONT}" font-size="54" font-weight="bold" fill="${KEY}" text-anchor="middle">x = 10</text>
    <text x="615" y="252" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">10 − 4 = 6</text>
    <text x="615" y="306" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">that is 6</text>
    ${tick(615, 356)}

    <rect x="110" y="436" width="620" height="96" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="500" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}" text-anchor="middle">x − 4 = 6, so x = 10</text>
  </svg>`,

  INVERSES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u25-arr-p" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${PURPLE}"/></marker>
      <marker id="u25-arr-o" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <text x="420" y="56" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}" text-anchor="middle">Do it, then undo it</text>

    <rect x="150" y="90" width="200" height="100" rx="14" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="3"/>
    <text x="250" y="160" font-family="${FONT}" font-size="60" font-weight="bold" fill="${PURPLE}" text-anchor="middle">+ 5</text>
    <rect x="490" y="90" width="200" height="100" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="590" y="160" font-family="${FONT}" font-size="60" font-weight="bold" fill="${KEY}" text-anchor="middle">− 5</text>
    <path d="M 362 122 H 476" fill="none" stroke="${PURPLE}" stroke-width="5" marker-end="url(#u25-arr-p)"/>
    <path d="M 478 160 H 364" fill="none" stroke="${KEY}" stroke-width="5" marker-end="url(#u25-arr-o)"/>
    <text x="420" y="252" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">7 + 5 = 12, and 12 − 5 = 7</text>

    <rect x="150" y="300" width="200" height="100" rx="14" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="3"/>
    <text x="250" y="370" font-family="${FONT}" font-size="60" font-weight="bold" fill="${PURPLE}" text-anchor="middle">× 3</text>
    <rect x="490" y="300" width="200" height="100" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="590" y="370" font-family="${FONT}" font-size="60" font-weight="bold" fill="${KEY}" text-anchor="middle">÷ 3</text>
    <path d="M 362 332 H 476" fill="none" stroke="${PURPLE}" stroke-width="5" marker-end="url(#u25-arr-p)"/>
    <path d="M 478 370 H 364" fill="none" stroke="${KEY}" stroke-width="5" marker-end="url(#u25-arr-o)"/>
    <text x="420" y="462" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">4 × 3 = 12, and 12 ÷ 3 = 4</text>

    <text x="420" y="524" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">Back where you started.</text>
  </svg>`,

  FLOW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="68" font-family="${FONT}" font-size="42" font-weight="bold" fill="${INK}" text-anchor="middle">Solve x + 5 = 12</text>

    <text x="150" y="212" font-family="${FONT}" font-size="64" font-weight="bold" fill="${TEAL}" text-anchor="middle">x</text>
    ${fwd(240, 146, 230, 86, PURPLE, PURPLE_T)}
    <text x="344" y="206" font-family="${FONT}" font-size="48" font-weight="bold" fill="${PURPLE}" text-anchor="middle">+ 5</text>
    <text x="560" y="212" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">12</text>
    <text x="728" y="202" font-family="${FONT}" font-size="28" font-weight="bold" fill="${PURPLE}" text-anchor="middle">forward</text>

    <text x="150" y="342" font-family="${FONT}" font-size="64" font-weight="bold" fill="${KEY}" text-anchor="middle">7</text>
    ${back(240, 276, 230, 86, KEY, ORANGE_T)}
    <text x="366" y="336" font-family="${FONT}" font-size="48" font-weight="bold" fill="${KEY}" text-anchor="middle">− 5</text>
    <text x="560" y="342" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="middle">12</text>
    <text x="728" y="332" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">backwards</text>

    <rect x="130" y="420" width="580" height="100" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="488" font-family="${FONT}" font-size="50" font-weight="bold" fill="${KEY}" text-anchor="middle">x = 12 − 5 = 7</text>
  </svg>`,

  SENTENCE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u25-arr-m" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${MUTED}"/></marker>
    </defs>

    <rect x="30" y="30" width="780" height="76" rx="12" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2.5"/>
    <text x="60" y="80" font-family="${FONT}" font-size="34" font-weight="bold" fill="${TEAL}" text-anchor="start">I think of a number</text>
    <path d="M 520 68 H 628" fill="none" stroke="${MUTED}" stroke-width="3" marker-end="url(#u25-arr-m)"/>
    <text x="720" y="86" font-family="${FONT}" font-size="54" font-weight="bold" fill="${TEAL}" text-anchor="middle">n</text>

    <rect x="30" y="122" width="780" height="76" rx="12" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="2.5"/>
    <text x="60" y="172" font-family="${FONT}" font-size="34" font-weight="bold" fill="${PURPLE}" text-anchor="start">and subtract 5.</text>
    <path d="M 520 160 H 628" fill="none" stroke="${MUTED}" stroke-width="3" marker-end="url(#u25-arr-m)"/>
    <text x="720" y="178" font-family="${FONT}" font-size="54" font-weight="bold" fill="${PURPLE}" text-anchor="middle">− 5</text>

    <rect x="30" y="214" width="780" height="76" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="60" y="264" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="start">My answer is 21.</text>
    <path d="M 520 252 H 628" fill="none" stroke="${MUTED}" stroke-width="3" marker-end="url(#u25-arr-m)"/>
    <text x="720" y="270" font-family="${FONT}" font-size="54" font-weight="bold" fill="${KEY}" text-anchor="middle">= 21</text>

    <text x="420" y="400" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">n − 5 = 21</text>
    <text x="420" y="500" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">n = 21 + 5 = 26</text>
  </svg>`,

  SOCKS_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <image href="${socks}" x="20" y="20" width="520" height="400" preserveAspectRatio="xMidYMid meet"/>

    <text x="700" y="80" font-family="${FONT}" font-size="30" font-weight="bold" fill="${PURPLE}" text-anchor="middle">PUT ON</text>
    <rect x="590" y="104" width="220" height="70" rx="12" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="2.5"/>
    <text x="700" y="152" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">1 socks</text>
    <rect x="590" y="188" width="220" height="70" rx="12" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="2.5"/>
    <text x="700" y="236" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">2 shoes</text>

    <text x="960" y="80" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">TAKE OFF</text>
    <rect x="850" y="104" width="220" height="70" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="960" y="152" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">1 shoes</text>
    <rect x="850" y="188" width="220" height="70" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="960" y="236" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">2 socks</text>

    <rect x="570" y="300" width="520" height="104" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="830" y="368" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">Last on, first off.</text>
  </svg>`,

  TWO_STEP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="62" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">Solve 2a + 4 = 18</text>

    <text x="258" y="124" font-family="${FONT}" font-size="24" font-weight="bold" fill="${PURPLE}" text-anchor="middle">1st</text>
    <text x="548" y="124" font-family="${FONT}" font-size="24" font-weight="bold" fill="${PURPLE}" text-anchor="middle">2nd</text>
    <text x="110" y="200" font-family="${FONT}" font-size="58" font-weight="bold" fill="${TEAL}" text-anchor="middle">a</text>
    ${fwd(180, 140, 160, 80, PURPLE, PURPLE_T)}
    <text x="252" y="197" font-family="${FONT}" font-size="44" font-weight="bold" fill="${PURPLE}" text-anchor="middle">× 2</text>
    <text x="405" y="200" font-family="${FONT}" font-size="50" font-weight="bold" fill="${MUTED}" text-anchor="middle">2a</text>
    ${fwd(470, 140, 160, 80, PURPLE, PURPLE_T)}
    <text x="542" y="197" font-family="${FONT}" font-size="44" font-weight="bold" fill="${PURPLE}" text-anchor="middle">+ 4</text>
    <text x="712" y="200" font-family="${FONT}" font-size="58" font-weight="bold" fill="${INK}" text-anchor="middle">18</text>

    <text x="110" y="330" font-family="${FONT}" font-size="58" font-weight="bold" fill="${KEY}" text-anchor="middle">7</text>
    ${back(180, 270, 160, 80, KEY, ORANGE_T)}
    <text x="268" y="327" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">÷ 2</text>
    <text x="405" y="330" font-family="${FONT}" font-size="50" font-weight="bold" fill="${INK}" text-anchor="middle">14</text>
    ${back(470, 270, 160, 80, KEY, ORANGE_T)}
    <text x="558" y="327" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">− 4</text>
    <text x="712" y="330" font-family="${FONT}" font-size="58" font-weight="bold" fill="${INK}" text-anchor="middle">18</text>
    <text x="268" y="390" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">2nd</text>
    <text x="558" y="390" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">1st</text>

    <rect x="170" y="420" width="500" height="80" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="476" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}" text-anchor="middle">a = 7</text>
    <text x="420" y="536" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">Check: 2 × 7 + 4 = 18</text>
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
    <text x="140" y="128" font-family="${HAND}" font-size="26" fill="${MUTED}" text-anchor="start">Solve these equations.</text>

    <text x="140" y="208" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">a) x + 6 = 14, so x = 20</text>
    <text x="140" y="288" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">b) 5x = 45, so x = 40</text>
    <text x="140" y="368" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">c) 18 = x − 7, so x = 11</text>
    <text x="140" y="448" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">d) 2x + 6 = 20, so x = 4</text>

    <path d="M 728 190 l 12 14 l 24 -30 M 728 270 l 12 14 l 24 -30 M 728 350 l 12 14 l 24 -30 M 728 430 l 12 14 l 24 -30" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // A right angle at (180, 470), split by a ray at 50° from the floor: the
  // lower angle is 5x = 50°, the upper one 4x = 40°. Drawn to size, so a student
  // who measures it gets the answer the algebra gives.
  ANGLES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <path d="M 180 90 V 470 H 700" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 180 470 L 437 164" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>

    <path d="M 320 470 A 140 140 0 0 0 270 362.8" fill="none" stroke="${TEAL}" stroke-width="4"/>
    <path d="M 244.3 393.4 A 100 100 0 0 0 180 370" fill="none" stroke="${PURPLE}" stroke-width="4"/>

    <text x="370" y="410" font-family="${FONT}" font-size="46" font-weight="bold" fill="${TEAL}" text-anchor="middle">5x</text>
    <text x="236" y="318" font-family="${FONT}" font-size="46" font-weight="bold" fill="${PURPLE}" text-anchor="middle">4x</text>

    <rect x="490" y="96" width="310" height="120" rx="14" fill="${SLATE_T}" stroke="${RULE}" stroke-width="2"/>
    <text x="645" y="146" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">A right angle</text>
    <text x="645" y="192" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">is 90°</text>
  </svg>`,

  // The two answers on each vote slide, each beside the hand that votes for it:
  // A is a LEFT hand, B is a right hand. The answer is the biggest thing on the
  // card so the back row can read it.
  ANS_X2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, BLUE, true)}
    <text x="450" y="226" font-family="${FONT}" font-size="130" font-weight="bold" fill="${BLUE}" text-anchor="middle">x = 2</text>
  </svg>`,

  ANS_X10: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, KEY, false)}
    <text x="274" y="226" font-family="${FONT}" font-size="120" font-weight="bold" fill="${KEY}" text-anchor="middle">x = 10</text>
  </svg>`,

  ANS_A5: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, BLUE, true)}
    <text x="450" y="226" font-family="${FONT}" font-size="130" font-weight="bold" fill="${BLUE}" text-anchor="middle">a = 5</text>
  </svg>`,

  ANS_A7: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, KEY, false)}
    <text x="280" y="226" font-family="${FONT}" font-size="130" font-weight="bold" fill="${KEY}" text-anchor="middle">a = 7</text>
  </svg>`,
}
