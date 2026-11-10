// content/y7-science/U03_5/diagrams.js
// Teaching diagrams for 3.5 Energy.
//
//   The goals
//     PIC_HOW_MUCH / PIC_WHAT_KIND / PIC_HOW_LONG   one picture per part of
//                   the lesson, no words (the column headings say what they are)
//   How much? — energy and the joule
//     RUNNERS       the book's runners (page 106), as a real photograph
//     JOULES        how big a joule is: 1 J to lift an apple 1 m, then two of
//                   the book's numbers (page 106), a floor of stairs and a
//                   litre of water boiled (slide 3 already has all three)
//   What kind? — stores and transfers
//     ANS_NO / ANS_YES   vote: a book on a high shelf — does it have energy?
//     SHELF         before and after: lifted from the floor onto the shelf,
//                   the energy is stored; knock it off and it falls and crashes
//     STORES        the book's table (page 107), part 1: the five stores
//     CIRCUIT       Question 1: the battery stores, the wires transfer; two
//                   arrows on the wire show the energy moving to the bulb
//                   (drawn: Commons has no clean photo of a battery lighting a
//                   bulb)
//     TRANSFERS     the book's table, part 2: the three transfers (+ thermal)
//     ACTIONS       one action for each of the eight, to remember them by
//   How long? — storing energy
//     ANS_COFFEE / ANS_BANANA   vote: which has more energy?
//     BANANA        the banana wins, and keeps its energy; the coffee goes cold
//     LASTING       seconds, an hour, years, millions of years
//
// Split diagrams are drawn at 840×560, showcase ones at 1120×440, vote cards
// at 720×320 — the shapes those layouts give a picture (as in 3.4).
// Label <text> is written out literally so `npm run audit:svg` can measure it.
// The pictures come from art.js and carry no text. Diagrams stay in English.

import {
  INK, KEY, MUTED, TEAL, BLUE, GREEN, RED, FONT, STORE, TRANSFER, SEA_EDGE,
  plate, arrow, leader, pose, battery, charged, kettle, bus, book, mug, banana,
  football, bow, bulb, guitar, charging, cliffRock, coal, dam,
} from './art.js'
import runnersPhoto from './images/runners.jpg'

// The voting hands from 3.1.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// A flight of stairs climbing to the right, and a runner on it.
const stairs = (x, y) => `<path d="M ${x} ${y + 120} H ${x + 40} V ${y + 90} H ${x + 80} V ${y + 60} H ${x + 120} V ${y + 30} H ${x + 160} V ${y} H ${x + 190} V ${y + 120} Z" fill="#e9edf1" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`

// A small red apple (about 100 g), centred on (x, y).
const apple = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="0" r="19" fill="${RED}" stroke="${INK}" stroke-width="3"/>
    <path d="M 0 -18 q 2 -9 8 -12" fill="none" stroke="#6b4a2a" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 4 -24 q 10 -8 16 -2 q -8 6 -16 2 z" fill="${GREEN}"/>
  </g>`

// A card on the table: tinted, with a coloured edge.
const card = (x, y, w, h, color, tint, dashed = false) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${tint}" stroke="${color}" stroke-width="3"${dashed ? ' stroke-dasharray="10 7"' : ''}/>`

const STORE_TINT = '#e2f2f6'
const TRANSFER_TINT = '#f2ecf7'

// A shelf on the wall, its brackets underneath.
const shelf = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="14" rx="3" fill="#b5835a" stroke="${INK}" stroke-width="3"/>
    <path d="M ${x + 20} ${y + 14} v 26 l 26 -26 M ${x + w - 20} ${y + 14} v 26 l -26 -26" fill="none" stroke="${MUTED}" stroke-width="5" stroke-linejoin="round"/>`

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  PIC_HOW_MUCH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${kettle(228, 166, 1.1)}
  </svg>`,

  PIC_WHAT_KIND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${bus(240, 140, 1.3)}
  </svg>`,

  PIC_HOW_LONG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${charged(250, 150, 1.4)}
  </svg>`,

  // ── How much? ─────────────────────────────────────────────────────────────
  // how big one joule is (an apple lifted 1 m), then the book's floor of
  // stairs and its kettle: 1, 2 000, 400 000
  JOULES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="30" y="52" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">You need about:</text>
    <rect x="20" y="72" width="800" height="146" rx="16" fill="#f7fafc"/>
    <circle cx="96" cy="190" r="19" fill="none" stroke="#9aa7b4" stroke-width="3" stroke-dasharray="6 5"/>
    ${apple(96, 102, 1)}
    ${arrow(96, 166, 96, 130, TEAL, 5, 14)}
    <path d="M 150 102 H 166 M 158 102 V 190 M 150 190 H 166" fill="none" stroke="${MUTED}" stroke-width="3"/>
    <text x="176" y="154" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">1 m</text>
    <text x="268" y="134" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">lift an apple</text>
    <text x="268" y="172" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">1 metre</text>
    <text x="800" y="160" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}" text-anchor="end">1 J</text>
    <rect x="20" y="230" width="800" height="146" rx="16" fill="#f7fafc"/>
    ${stairs(40, 246)}
    ${pose('kinetic', 150, 274, 0.42)}
    <text x="268" y="312" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">1 floor of stairs</text>
    <text x="800" y="318" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}" text-anchor="end">2 000 J</text>
    <rect x="20" y="388" width="800" height="146" rx="16" fill="#f7fafc"/>
    ${kettle(132, 470, 0.62)}
    <text x="268" y="456" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">1 litre of cold</text>
    <text x="268" y="494" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">water, boiled</text>
    <text x="800" y="476" font-family="${FONT}" font-size="46" font-weight="bold" fill="${KEY}" text-anchor="end">400 000 J</text>
  </svg>`,

  // the book's runners (page 106), as a real photograph, cropped to the panel
  RUNNERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <clipPath id="ru-photo"><rect x="14" y="14" width="812" height="532" rx="12"/></clipPath>
    <image href="${runnersPhoto}" x="14" y="14" width="812" height="532" preserveAspectRatio="xMidYMid slice" clip-path="url(#ru-photo)"/>
  </svg>`,

  // ── What kind? ────────────────────────────────────────────────────────────
  ANS_NO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    <text x="460" y="190" font-family="${FONT}" font-size="130" font-weight="bold" fill="${BLUE}" text-anchor="middle">NO</text>
    <text x="460" y="268" font-family="${FONT}" font-size="32" font-weight="bold" fill="${BLUE}" text-anchor="middle">it is not moving</text>
  </svg>`,

  ANS_YES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="260" y="190" font-family="${FONT}" font-size="130" font-weight="bold" fill="${KEY}" text-anchor="middle">YES</text>
    <text x="260" y="268" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">it has energy</text>
  </svg>`,

  SHELF: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="30" y1="500" x2="810" y2="500" stroke="${INK}" stroke-width="4"/>
    <line x1="430" y1="40" x2="430" y2="500" stroke="#e2e8f0" stroke-width="3"/>
    <text x="40" y="58" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}">1. Up on the shelf</text>
    <rect x="64" y="400" width="72" height="100" rx="5" fill="none" stroke="#9aa7b4" stroke-width="3" stroke-dasharray="8 6"/>
    <path d="M 100 390 V 192 Q 100 150 142 150 H 270" fill="none" stroke="${TEAL}" stroke-width="6" stroke-linecap="round"/>
    <path d="M 290 150 L 268 138 L 268 162 Z" fill="${TEAL}"/>
    <text x="118" y="300" font-family="${FONT}" font-size="24" font-weight="bold" fill="${TEAL}">lifted up</text>
    ${shelf(254, 210, 160)}
    ${book(334, 160, 1)}
    ${leader(330, 96, 352, 128, TEAL)}
    <text x="236" y="86" font-family="${FONT}" font-size="25" font-weight="bold" fill="${TEAL}">energy stored</text>
    <text x="458" y="58" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}">2. Knocked off</text>
    ${shelf(470, 210, 200)}
    <g transform="rotate(28 600 330)">${book(600, 330, 1)}</g>
    <path d="M 640 200 Q 660 240 632 282" fill="none" stroke="#9aa7b4" stroke-width="4" stroke-dasharray="8 8"/>
    ${arrow(720, 260, 720, 420, BLUE, 6, 20)}
    <text x="740" y="340" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}">falls</text>
    <path d="M 520 470 l -26 -18 M 520 452 l -12 -30 M 690 470 l 26 -18 M 690 452 l 12 -30" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>
    <text x="605" y="476" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">CRASH!</text>
  </svg>`,

  STORES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${card(14, 14, 206, 412, STORE, STORE_TINT)}
    ${card(232, 14, 206, 412, STORE, STORE_TINT)}
    ${card(450, 14, 206, 412, STORE, STORE_TINT)}
    ${card(668, 14, 206, 412, STORE, STORE_TINT)}
    ${card(886, 14, 220, 412, STORE, STORE_TINT)}
    ${football(117, 140, 0.56)}
    ${battery(335, 140, 0.8)}
    ${mug(553, 150, 0.95)}
    ${bow(771, 140, 0.7)}
    ${cliffRock(996, 150, 0.58)}
    <text x="117" y="296" font-family="${FONT}" font-size="28" font-weight="bold" fill="${STORE}" text-anchor="middle">kinetic</text>
    <text x="335" y="296" font-family="${FONT}" font-size="28" font-weight="bold" fill="${STORE}" text-anchor="middle">chemical</text>
    <text x="553" y="296" font-family="${FONT}" font-size="28" font-weight="bold" fill="${STORE}" text-anchor="middle">thermal</text>
    <text x="771" y="284" font-family="${FONT}" font-size="28" font-weight="bold" fill="${STORE}" text-anchor="middle">elastic</text>
    <text x="771" y="316" font-family="${FONT}" font-size="28" font-weight="bold" fill="${STORE}" text-anchor="middle">potential</text>
    <text x="996" y="284" font-family="${FONT}" font-size="26" font-weight="bold" fill="${STORE}" text-anchor="middle">gravitational</text>
    <text x="996" y="316" font-family="${FONT}" font-size="26" font-weight="bold" fill="${STORE}" text-anchor="middle">potential</text>
    <text x="117" y="372" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">moving</text>
    <text x="117" y="400" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">things</text>
    <text x="335" y="372" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">food, fuels,</text>
    <text x="335" y="400" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">batteries</text>
    <text x="553" y="372" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">hot</text>
    <text x="553" y="400" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">things</text>
    <text x="771" y="372" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">stretched or</text>
    <text x="771" y="400" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">squashed</text>
    <text x="996" y="372" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">lifted up</text>
    <text x="996" y="400" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">high</text>
  </svg>`,

  CIRCUIT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M 172 226 C 166 120 470 104 520 190 C 556 252 560 330 596 410" fill="none" stroke="${SEA_EDGE}" stroke-width="8" stroke-linecap="round"/>
    <path d="M 330 226 C 334 186 430 190 440 260 C 452 350 430 480 566 486 C 700 492 744 452 690 414" fill="none" stroke="${SEA_EDGE}" stroke-width="8" stroke-linecap="round"/>
    <rect x="160" y="216" width="24" height="40" rx="4" fill="#d9b44a" stroke="${INK}" stroke-width="3"/>
    <rect x="318" y="216" width="24" height="40" rx="4" fill="#d9b44a" stroke="${INK}" stroke-width="3"/>
    <rect x="110" y="250" width="290" height="190" rx="16" fill="#3d8a5a"/>
    <path d="M 110 290 V 266 Q 110 250 126 250 H 384 Q 400 250 400 266 V 290 Z" fill="#2e6b45"/>
    <rect x="110" y="250" width="290" height="190" rx="16" fill="none" stroke="${INK}" stroke-width="4"/>
    <path d="M 172 330 v 32 M 156 346 h 32 M 314 346 h 32" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
    ${bulb(640, 330, 0.9)}
    <rect x="592" y="392" width="96" height="40" rx="8" fill="${RED}" stroke="${INK}" stroke-width="3"/>
    <rect x="566" y="428" width="148" height="16" rx="5" fill="#a52a20" stroke="${INK}" stroke-width="3"/>
    <path d="M 392 135 L 368 123 L 368 147 Z M 562 307 L 567 281 L 544 287 Z" fill="${TRANSFER}" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
    ${leader(250, 96, 300, 150, TRANSFER)}
    <text x="40" y="60" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TRANSFER}">wires: electrical</text>
    <text x="40" y="88" font-family="${FONT}" font-size="22" fill="${TRANSFER}">a transfer</text>
    ${leader(700, 164, 668, 260, TRANSFER)}
    <text x="630" y="118" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TRANSFER}">bulb: light</text>
    <text x="630" y="146" font-family="${FONT}" font-size="22" fill="${TRANSFER}">a transfer</text>
    ${leader(150, 480, 196, 420, STORE)}
    <text x="30" y="510" font-family="${FONT}" font-size="26" font-weight="bold" fill="${STORE}">battery: chemical</text>
    <text x="30" y="538" font-family="${FONT}" font-size="22" fill="${STORE}">a store</text>
  </svg>`,

  TRANSFERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${card(14, 14, 262, 412, TRANSFER, TRANSFER_TINT)}
    ${card(290, 14, 262, 412, TRANSFER, TRANSFER_TINT)}
    ${card(566, 14, 262, 412, TRANSFER, TRANSFER_TINT)}
    ${card(842, 14, 264, 412, TRANSFER, TRANSFER_TINT, true)}
    ${charging(145, 150, 0.62)}
    ${guitar(418, 150, 0.68)}
    ${bulb(697, 160, 0.95)}
    ${mug(960, 160, 0.9)}
    ${arrow(1032, 120, 1084, 80, RED, 5, 16)}
    ${arrow(1032, 176, 1086, 176, RED, 5, 16)}
    <text x="145" y="300" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">electrical</text>
    <text x="421" y="300" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">sound</text>
    <text x="697" y="300" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">light</text>
    <text x="974" y="300" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">thermal</text>
    <text x="145" y="360" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">current in</text>
    <text x="145" y="388" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">a circuit</text>
    <text x="421" y="360" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">from vibrating</text>
    <text x="421" y="388" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">things</text>
    <text x="697" y="360" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">from luminous</text>
    <text x="697" y="388" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">things</text>
    <text x="974" y="352" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">from hot to</text>
    <text x="974" y="380" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">colder things</text>
    <text x="974" y="412" font-family="${FONT}" font-size="19" font-weight="bold" fill="${STORE}" text-anchor="middle">a store too</text>
  </svg>`,

  ACTIONS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${card(14, 12, 262, 202, STORE, STORE_TINT)}
    ${card(290, 12, 262, 202, STORE, STORE_TINT)}
    ${card(566, 12, 262, 202, STORE, STORE_TINT)}
    ${card(842, 12, 264, 202, STORE, STORE_TINT)}
    ${card(14, 226, 262, 202, STORE, STORE_TINT)}
    ${card(290, 226, 262, 202, TRANSFER, TRANSFER_TINT)}
    ${card(566, 226, 262, 202, TRANSFER, TRANSFER_TINT)}
    ${card(842, 226, 264, 202, TRANSFER, TRANSFER_TINT)}
    ${pose('kinetic', 145, 128, 0.64)}
    ${pose('chemical', 421, 128, 0.64)}
    ${pose('thermal', 697, 128, 0.64)}
    ${pose('elastic', 974, 128, 0.64)}
    ${pose('gravitational', 145, 350, 0.64)}
    ${pose('electrical', 421, 342, 0.64)}
    ${pose('sound', 697, 342, 0.64)}
    ${pose('light', 974, 342, 0.64)}
    <text x="145" y="196" font-family="${FONT}" font-size="26" font-weight="bold" fill="${STORE}" text-anchor="middle">kinetic</text>
    <text x="421" y="196" font-family="${FONT}" font-size="26" font-weight="bold" fill="${STORE}" text-anchor="middle">chemical</text>
    <text x="697" y="196" font-family="${FONT}" font-size="26" font-weight="bold" fill="${STORE}" text-anchor="middle">thermal</text>
    <text x="974" y="196" font-family="${FONT}" font-size="26" font-weight="bold" fill="${STORE}" text-anchor="middle">elastic potential</text>
    <text x="145" y="410" font-family="${FONT}" font-size="22" font-weight="bold" fill="${STORE}" text-anchor="middle">gravitational potential</text>
    <text x="421" y="410" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">electrical</text>
    <text x="697" y="410" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">sound</text>
    <text x="974" y="410" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TRANSFER}" text-anchor="middle">light</text>
  </svg>`,

  // ── How long? ─────────────────────────────────────────────────────────────
  ANS_COFFEE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    ${mug(470, 160, 1.15)}
    <text x="470" y="300" font-family="${FONT}" font-size="34" font-weight="bold" fill="${BLUE}" text-anchor="middle">the hot coffee</text>
  </svg>`,

  ANS_BANANA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${banana(260, 150, 1.3)}
    <text x="260" y="292" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">the banana</text>
  </svg>`,

  BANANA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="30" y="54" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}">Now</text>
    ${mug(64, 120, 0.42)}
    <rect x="120" y="96" width="66" height="48" rx="8" fill="${RED}"/>
    <text x="200" y="132" font-family="${FONT}" font-size="25" font-weight="bold" fill="${RED}">about 60 000 J</text>
    ${banana(64, 206, 0.38)}
    <rect x="120" y="182" width="440" height="48" rx="8" fill="#e8b923"/>
    <text x="574" y="218" font-family="${FONT}" font-size="25" font-weight="bold" fill="#9a7a10">about 400 000 J</text>
    <line x1="30" y1="272" x2="810" y2="272" stroke="#e2e8f0" stroke-width="3"/>
    <text x="30" y="318" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}">1 hour later</text>
    ${mug(64, 388, 0.42, false)}
    <rect x="120" y="364" width="6" height="48" rx="3" fill="${BLUE}"/>
    <text x="142" y="400" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BLUE}">cold: its heat has gone</text>
    ${banana(64, 476, 0.38)}
    <rect x="120" y="452" width="440" height="48" rx="8" fill="#e8b923"/>
    <text x="574" y="488" font-family="${FONT}" font-size="25" font-weight="bold" fill="#9a7a10">about 400 000 J</text>
    <text x="810" y="540" font-family="${FONT}" font-size="19" fill="${MUTED}" text-anchor="end">a mug of coffee at 80 °C, in a room at 25 °C</text>
  </svg>`,

  LASTING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="22" y="24" width="390" height="410" rx="16" fill="#fdecee"/>
    <rect x="428" y="24" width="390" height="410" rx="16" fill="#eef6e6"/>
    <text x="217" y="66" font-family="${FONT}" font-size="27" font-weight="bold" fill="${RED}" text-anchor="middle">does not last</text>
    <text x="623" y="66" font-family="${FONT}" font-size="27" font-weight="bold" fill="${GREEN}" text-anchor="middle">lasts a long time</text>
    ${football(120, 186, 0.5)}
    ${mug(314, 196, 0.88)}
    ${dam(526, 196, 0.5)}
    ${coal(720, 200, 0.68)}
    <text x="120" y="316" font-family="${FONT}" font-size="25" font-weight="bold" fill="${STORE}" text-anchor="middle">kinetic</text>
    <text x="314" y="316" font-family="${FONT}" font-size="25" font-weight="bold" fill="${STORE}" text-anchor="middle">thermal</text>
    <text x="526" y="304" font-family="${FONT}" font-size="22" font-weight="bold" fill="${STORE}" text-anchor="middle">gravitational</text>
    <text x="526" y="332" font-family="${FONT}" font-size="22" font-weight="bold" fill="${STORE}" text-anchor="middle">potential</text>
    <text x="720" y="316" font-family="${FONT}" font-size="25" font-weight="bold" fill="${STORE}" text-anchor="middle">chemical</text>
    <text x="120" y="396" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">a rolling ball</text>
    <text x="314" y="396" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">a hot drink</text>
    <text x="526" y="396" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">water in a dam</text>
    <text x="720" y="396" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">coal and oil</text>
    ${arrow(40, 478, 806, 478, MUTED, 4, 16)}
    <text x="120" y="530" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">seconds</text>
    <text x="314" y="530" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">an hour</text>
    <text x="526" y="530" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">years</text>
    <text x="720" y="530" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">millions of years</text>
  </svg>`,
}
