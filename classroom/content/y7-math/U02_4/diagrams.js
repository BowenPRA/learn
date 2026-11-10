// content/y7-math/U02_4/diagrams.js
// Teaching diagrams for 2.4 Expanding Brackets, drawn to match 2.3.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes and images only,
//    because `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · markers are `markerUnits="userSpaceOnUse"`;
//  · `split` diagrams are 840×560 (the split panel is roughly square in project
//    mode); `showcase` diagrams are 1120×440 strips.
//
// Colour carries meaning, the same as in 2.3 and in widgets.jsx: the number
// OUTSIDE the brackets is teal, the terms INSIDE are purple, answers are the
// book's orange.
//
//   BOX_NUMBER    the book's grid for 4 × 16 = 4 × (10 + 6)
//   CHOC_REAL     a real bar: 2 × 7 squares, snapped into 2 × 5 and 2 × 2
//   WORDS         expand · multiply out · each — everyday English against maths
//   BRACKETS      the anatomy of 4(10 + 6): outside, brackets, terms inside
//   ARROWS        5(a + 3): one arrow to the a, one arrow to the 3
//   MINUS_BOX     3(x − 2) in the grid: the −2 goes in as −2
//   STOP          12 − 4c is finished — 12 and 4c are not like terms (2.3)
//   TWO_NUMBERS   5(2p + 1): multiply the numbers, the letter stays
//   MISTAKES      Mr Bowen's homework, which he has marked 4/4
//   ODD           four expansions, three of them equal
//   TWO_STEPS     expand, then collect like terms
//   RECT_AREA     a rectangle 4 by x + 3: area and perimeter
//   ANS_*         the two answers on each vote slide (7 and 13)

import chocolate from './images/chocolate.jpg'
import balloon from './images/balloon.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const SLATE = '#5b6770'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const TEAL_T = '#e2f2f6'
const PURPLE_T = '#f2ecf7'
const SLATE_T = '#eef1f4'
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

// One square of the drawn chocolate grid.
const square = (x, y, s) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="4" fill="#6b4331" stroke="#3d2519" stroke-width="2"/>`

export const DIAGRAMS = {
  BOX_NUMBER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <text x="560" y="72" font-family="${FONT}" font-size="42" font-weight="bold" fill="${INK}" text-anchor="middle">4 × 16 = 4 × (10 + 6)</text>

    <rect x="120" y="120" width="130" height="90" fill="${SLATE_T}" stroke="${INK}" stroke-width="3"/>
    <rect x="250" y="120" width="180" height="90" fill="${SLATE_T}" stroke="${INK}" stroke-width="3"/>
    <rect x="430" y="120" width="180" height="90" fill="${SLATE_T}" stroke="${INK}" stroke-width="3"/>
    <rect x="120" y="210" width="130" height="90" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <rect x="250" y="210" width="180" height="90" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <rect x="430" y="210" width="180" height="90" fill="#ffffff" stroke="${INK}" stroke-width="3"/>

    <text x="185" y="182" font-family="${FONT}" font-size="46" font-weight="bold" fill="${MUTED}" text-anchor="middle">×</text>
    <text x="340" y="182" font-family="${FONT}" font-size="46" font-weight="bold" fill="${PURPLE}" text-anchor="middle">10</text>
    <text x="520" y="182" font-family="${FONT}" font-size="46" font-weight="bold" fill="${PURPLE}" text-anchor="middle">6</text>
    <text x="185" y="272" font-family="${FONT}" font-size="46" font-weight="bold" fill="${TEAL}" text-anchor="middle">4</text>
    <text x="340" y="272" font-family="${FONT}" font-size="46" font-weight="bold" fill="${INK}" text-anchor="middle">40</text>
    <text x="520" y="272" font-family="${FONT}" font-size="46" font-weight="bold" fill="${INK}" text-anchor="middle">24</text>

    <text x="860" y="172" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">4 × 10 = 40</text>
    <text x="860" y="248" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">4 × 6 = 24</text>

    <rect x="40" y="336" width="1040" height="84" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="560" y="392" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}" text-anchor="middle">4 × 16 = 40 + 24 = 64</text>
  </svg>`,

  CHOC_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <image href="${chocolate}" x="20" y="20" width="280" height="329" preserveAspectRatio="xMidYMid meet"/>
    <text x="160" y="396" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">A real bar</text>

    ${square(360, 42, 40)}${square(400, 42, 40)}
    ${square(360, 82, 40)}${square(400, 82, 40)}
    ${square(360, 122, 40)}${square(400, 122, 40)}
    ${square(360, 162, 40)}${square(400, 162, 40)}
    ${square(360, 202, 40)}${square(400, 202, 40)}
    ${square(360, 250, 40)}${square(400, 250, 40)}
    ${square(360, 290, 40)}${square(400, 290, 40)}

    <path d="M 344 240 H 456" fill="none" stroke="${KEY}" stroke-width="4" stroke-dasharray="12 8"/>
    <text x="470" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="start">5 rows</text>
    <text x="470" y="300" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="start">2 rows</text>

    <text x="810" y="128" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">2 × 7 = 2 × (5 + 2)</text>
    <text x="810" y="204" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">= 10 + 4</text>
    <text x="810" y="284" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">2 × 7 = 14</text>
    <text x="810" y="372" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">Snap it. The chocolate does not change.</text>
  </svg>`,

  WORDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${plate(1120, 470)}

    <text x="410" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="start">EVERYDAY ENGLISH</text>
    <text x="760" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="start">IN MATHS</text>

    <!-- expand -->
    <rect x="20" y="66" width="1080" height="130" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="145" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">expand</text>
    <image href="${balloon}" x="240" y="76" width="150" height="90" preserveAspectRatio="xMidYMid meet"/>
    <text x="410" y="120" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">The balloon expands.</text>
    <text x="410" y="168" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">It gets bigger.</text>
    <text x="760" y="112" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="start">the writing gets longer</text>
    <text x="760" y="164" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="start">4(10 + 6) = 40 + 24</text>

    <!-- multiply out -->
    <rect x="20" y="206" width="1080" height="116" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="272" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">multiply out</text>
    <text x="410" y="266" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">Put the rubbish out.</text>
    <text x="760" y="250" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="start">the same job as expand</text>
    <text x="760" y="296" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="start">Multiply out = Expand</text>

    <!-- each -->
    <rect x="20" y="332" width="1080" height="116" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="398" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">each</text>
    <text x="410" y="392" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="start">Each student has a book.</text>
    <text x="760" y="376" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="start">every single one</text>
    <text x="760" y="422" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="start">5(a + 3): a and 3</text>
  </svg>`,

  BRACKETS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="80" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">4(10 + 6) means 4 × (10 + 6)</text>

    <path d="M 330 176 v -14 H 660 v 14" fill="none" stroke="${KEY}" stroke-width="3" stroke-linejoin="round"/>
    <text x="495" y="150" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">brackets</text>

    <text x="250" y="250" font-family="${FONT}" font-size="92" font-weight="bold" fill="${TEAL}" text-anchor="middle">4</text>
    <text x="330" y="250" font-family="${FONT}" font-size="92" font-weight="bold" fill="${INK}" text-anchor="middle">(</text>
    <text x="420" y="250" font-family="${FONT}" font-size="92" font-weight="bold" fill="${PURPLE}" text-anchor="middle">10</text>
    <text x="505" y="250" font-family="${FONT}" font-size="92" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="580" y="250" font-family="${FONT}" font-size="92" font-weight="bold" fill="${PURPLE}" text-anchor="middle">6</text>
    <text x="660" y="250" font-family="${FONT}" font-size="92" font-weight="bold" fill="${INK}" text-anchor="middle">)</text>

    <path d="M 224 286 v 14 H 276 v -14" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round"/>
    <text x="250" y="346" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}" text-anchor="middle">outside</text>
    <path d="M 368 286 v 14 H 606 v -14" fill="none" stroke="${PURPLE}" stroke-width="3" stroke-linejoin="round"/>
    <text x="487" y="346" font-family="${FONT}" font-size="28" font-weight="bold" fill="${PURPLE}" text-anchor="middle">the terms inside</text>

    <rect x="60" y="420" width="720" height="100" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="462" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">The times sign is hidden,</text>
    <text x="420" y="502" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">just like 3x means 3 × x.</text>
  </svg>`,

  ARROWS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u24-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <text x="420" y="56" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}" text-anchor="middle">Multiply every term inside</text>

    <path d="M 206 142 C 236 86 298 86 326 136" fill="none" stroke="${KEY}" stroke-width="5" marker-end="url(#u24-arrow)"/>
    <path d="M 214 146 C 290 66 424 66 466 136" fill="none" stroke="${KEY}" stroke-width="5" marker-end="url(#u24-arrow)"/>

    <text x="200" y="230" font-family="${FONT}" font-size="84" font-weight="bold" fill="${TEAL}" text-anchor="middle">5</text>
    <text x="262" y="230" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">(</text>
    <text x="330" y="230" font-family="${FONT}" font-size="84" font-weight="bold" fill="${PURPLE}" text-anchor="middle">a</text>
    <text x="400" y="230" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <text x="470" y="230" font-family="${FONT}" font-size="84" font-weight="bold" fill="${PURPLE}" text-anchor="middle">3</text>
    <text x="532" y="230" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">)</text>

    <text x="420" y="336" font-family="${FONT}" font-size="46" font-weight="bold" fill="${INK}" text-anchor="middle">5 × a = 5a and 5 × 3 = 15</text>

    <rect x="100" y="390" width="640" height="110" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="462" font-family="${FONT}" font-size="54" font-weight="bold" fill="${KEY}" text-anchor="middle">5(a + 3) = 5a + 15</text>
  </svg>`,

  MINUS_BOX: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="66" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}" text-anchor="middle">The minus goes into the box</text>

    <rect x="160" y="120" width="150" height="90" fill="${SLATE_T}" stroke="${INK}" stroke-width="3"/>
    <rect x="310" y="120" width="200" height="90" fill="${SLATE_T}" stroke="${INK}" stroke-width="3"/>
    <rect x="510" y="120" width="200" height="90" fill="${SLATE_T}" stroke="${INK}" stroke-width="3"/>
    <rect x="160" y="210" width="150" height="90" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <rect x="310" y="210" width="200" height="90" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <rect x="510" y="210" width="200" height="90" fill="#ffffff" stroke="${INK}" stroke-width="3"/>

    <text x="235" y="182" font-family="${FONT}" font-size="46" font-weight="bold" fill="${MUTED}" text-anchor="middle">×</text>
    <text x="410" y="182" font-family="${FONT}" font-size="46" font-weight="bold" fill="${PURPLE}" text-anchor="middle">x</text>
    <text x="610" y="182" font-family="${FONT}" font-size="46" font-weight="bold" fill="${RED}" text-anchor="middle">−2</text>
    <text x="235" y="272" font-family="${FONT}" font-size="46" font-weight="bold" fill="${TEAL}" text-anchor="middle">3</text>
    <text x="410" y="272" font-family="${FONT}" font-size="46" font-weight="bold" fill="${INK}" text-anchor="middle">3x</text>
    <text x="610" y="272" font-family="${FONT}" font-size="46" font-weight="bold" fill="${RED}" text-anchor="middle">−6</text>

    <rect x="110" y="350" width="620" height="100" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="418" font-family="${FONT}" font-size="56" font-weight="bold" fill="${KEY}" text-anchor="middle">3(x − 2) = 3x − 6</text>

    <text x="420" y="506" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">The sign belongs to the 2.</text>
  </svg>`,

  STOP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="70" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}" text-anchor="middle">Can you collect these?</text>

    <text x="420" y="190" font-family="${FONT}" font-size="84" font-weight="bold" fill="${INK}" text-anchor="middle">12 − 4c</text>

    <path d="M 268 220 v 14 H 348 v -14" fill="none" stroke="${SLATE}" stroke-width="3" stroke-linejoin="round"/>
    <text x="308" y="276" font-family="${FONT}" font-size="26" font-weight="bold" fill="${SLATE}" text-anchor="middle">a number</text>
    <path d="M 452 220 v 14 H 572 v -14" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round"/>
    <text x="512" y="276" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}" text-anchor="middle">a c term</text>

    <text x="400" y="372" font-family="${FONT}" font-size="56" font-weight="bold" fill="${RED}" text-anchor="middle">12 − 4c = 8c</text>
    <path d="M 204 353 H 616" fill="none" stroke="${RED}" stroke-width="6" stroke-linecap="round"/>
    ${cross(676, 352)}

    <rect x="80" y="430" width="680" height="96" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="492" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">12 and 4c are not like terms</text>
  </svg>`,

  TWO_NUMBERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="66" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}" text-anchor="middle">Multiply the numbers</text>

    <rect x="160" y="110" width="150" height="90" fill="${SLATE_T}" stroke="${INK}" stroke-width="3"/>
    <rect x="310" y="110" width="200" height="90" fill="${SLATE_T}" stroke="${INK}" stroke-width="3"/>
    <rect x="510" y="110" width="200" height="90" fill="${SLATE_T}" stroke="${INK}" stroke-width="3"/>
    <rect x="160" y="200" width="150" height="90" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <rect x="310" y="200" width="200" height="90" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <rect x="510" y="200" width="200" height="90" fill="#ffffff" stroke="${INK}" stroke-width="3"/>

    <text x="235" y="172" font-family="${FONT}" font-size="46" font-weight="bold" fill="${MUTED}" text-anchor="middle">×</text>
    <text x="410" y="172" font-family="${FONT}" font-size="46" font-weight="bold" fill="${PURPLE}" text-anchor="middle">2p</text>
    <text x="610" y="172" font-family="${FONT}" font-size="46" font-weight="bold" fill="${PURPLE}" text-anchor="middle">1</text>
    <text x="235" y="262" font-family="${FONT}" font-size="46" font-weight="bold" fill="${TEAL}" text-anchor="middle">5</text>
    <text x="410" y="262" font-family="${FONT}" font-size="46" font-weight="bold" fill="${INK}" text-anchor="middle">10p</text>
    <text x="610" y="262" font-family="${FONT}" font-size="46" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>

    <text x="420" y="342" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="middle">5 × 2p = 10p</text>
    <text x="420" y="390" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">5 × 2 = 10, and the p stays.</text>

    <rect x="110" y="424" width="620" height="96" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="486" font-family="${FONT}" font-size="52" font-weight="bold" fill="${KEY}" text-anchor="middle">5(2p + 1) = 10p + 5</text>
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
    <text x="140" y="128" font-family="${HAND}" font-size="26" fill="${MUTED}" text-anchor="start">Expand the brackets.</text>

    <text x="140" y="208" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">a) 6(a + 2) = 6a + 2</text>
    <text x="140" y="288" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">b) 4(3b − 5) = 12b − 9</text>
    <text x="140" y="368" font-family="${HAND}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="start">c) 5(2 − d) = 10 − 5d = 5d</text>
    <text x="140" y="448" font-family="${HAND}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">d) 3(2m + 4) = 5m + 12</text>

    <path d="M 728 190 l 12 14 l 24 -30 M 728 270 l 12 14 l 24 -30 M 728 350 l 12 14 l 24 -30 M 728 430 l 12 14 l 24 -30" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  ODD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="66" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}" text-anchor="middle">Three are the same. One is not.</text>

    <ellipse cx="250" cy="200" rx="150" ry="58" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <ellipse cx="590" cy="200" rx="150" ry="58" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <ellipse cx="250" cy="360" rx="150" ry="58" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <ellipse cx="590" cy="360" rx="150" ry="58" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>

    <text x="250" y="216" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">2(6x + 10)</text>
    <text x="590" y="216" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">4(3x + 5)</text>
    <text x="250" y="376" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">3(4x + 6)</text>
    <text x="590" y="376" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}" text-anchor="middle">1(12x + 20)</text>

    <text x="250" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">A</text>
    <text x="590" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">B</text>
    <text x="250" y="452" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">C</text>
    <text x="590" y="452" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">D</text>

    <text x="420" y="512" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">Expand all four. Which one is different?</text>
  </svg>`,

  TWO_STEPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="66" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}" text-anchor="middle">Two jobs, in this order</text>

    <rect x="60" y="110" width="720" height="130" rx="14" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="100" y="158" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}" text-anchor="start">1 Expand the brackets</text>
    <text x="420" y="214" font-family="${FONT}" font-size="42" font-weight="bold" fill="${INK}" text-anchor="middle">3(x + 2) + 4x = 3x + 6 + 4x</text>

    <rect x="60" y="270" width="720" height="130" rx="14" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="3"/>
    <text x="100" y="318" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}" text-anchor="start">2 Collect the like terms</text>
    <text x="420" y="374" font-family="${FONT}" font-size="42" font-weight="bold" fill="${INK}" text-anchor="middle">3x + 6 + 4x = 7x + 6</text>

    <rect x="110" y="430" width="620" height="96" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="492" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}" text-anchor="middle">3(x + 2) + 4x = 7x + 6</text>
  </svg>`,

  RECT_AREA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="200" y="170" width="440" height="220" fill="${TEAL_T}" stroke="${INK}" stroke-width="4"/>
    <text x="420" y="146" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">x + 3</text>
    <text x="160" y="294" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">4</text>
    <text x="420" y="296" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">area = length × width</text>

    <text x="420" y="456" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">All lengths are in cm.</text>
  </svg>`,

  // The two answers on each vote slide, each beside the hand that votes for it:
  // A is a LEFT hand, thumb on the right — what a student sees when they raise
  // it palm-forward — and B is a right hand. The answer is the biggest thing on
  // the card so the back row can read it.
  ANS_5A3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, BLUE, true)}
    <text x="440" y="222" font-family="${FONT}" font-size="120" font-weight="bold" fill="${BLUE}" text-anchor="middle">5a + 3</text>
  </svg>`,

  ANS_5A15: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, KEY, false)}
    <text x="280" y="222" font-family="${FONT}" font-size="118" font-weight="bold" fill="${KEY}" text-anchor="middle">5a + 15</text>
  </svg>`,

  ANS_8C: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, BLUE, true)}
    <text x="440" y="230" font-family="${FONT}" font-size="170" font-weight="bold" fill="${BLUE}" text-anchor="middle">8c</text>
  </svg>`,

  ANS_12M4C: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, KEY, false)}
    <text x="280" y="222" font-family="${FONT}" font-size="118" font-weight="bold" fill="${KEY}" text-anchor="middle">12 − 4c</text>
  </svg>`,
}
