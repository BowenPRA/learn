// content/y7-math/U02_2/diagrams.js
// Teaching diagrams for 2.2 Using Expressions and Formulae, drawn to match 2.1
// so Unit 2 reads as one continuous argument: flat line art on paper-white,
// dark ink outlines, the book's orange for every key word students copy down.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so the artwork is legible on a
//    light OR dark slide and never depends on the page's text colour;
//  · every <text> is written out literally — the helpers below emit shapes and
//    leader lines only, because `npm run audit:svg` cannot see text produced by
//    a `${helper(...)}` call and will silently check nothing;
//  · a label keeps clear of any <rect> by more than its own font size, because
//    the audit treats a nearby baseline as living inside that box;
//  · markers are `markerUnits="userSpaceOnUse"` so an arrowhead does not scale
//    with its line's stroke-width.
//
// EVERY DIAGRAM IS DRAWN AT ROUGHLY 1.5:1, not the 2:1+ strip that looks
// natural on a wide monitor. A `split` slide's media panel is roughly SQUARE in
// project mode (~600×580 at 1366×768), so a wider drawing is width-limited and
// renders at half the height it could.
//
// The eight diagrams are the eight hinges of the lesson, in order:
//   CUP_FINISHES        c − 50 finishes at last, because now we know c = 320
//   SUBSTITUTE_SWAP     substitute: the same place, a different thing in it
//   INVISIBLE_TIMES     3n with n = 4 is 12 — it is never 34
//   ORDER_AFTER_SUB     3x + 2 with x = 4 is 14, not 18
//   EXPRESSION_FORMULA  no = sign against an = sign, 2.1's key word against 2.2's
//   RECTANGLE_FORMULA   A = lw — two letters, so substitute twice
//   NEGATIVE_SUB        5 − 2n with n = −3 is 11, and the brackets are why
//   BOILING_LIMIT       T = 24 + 3m stops being true at 100 °C
//
// INVISIBLE_TIMES is the one that matters. Every year a class that can multiply
// perfectly well writes 34 for 3n when n = 4, because the missing × looks like
// permission to push the digits together. Nothing else in the deck competes
// with it for the whiteboard.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'
const BLUE_T = '#eef4fb'
const GREY_T = '#f1f5f9'
const RED_T = '#fdecef'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// markerUnits="userSpaceOnUse" — otherwise the head scales with stroke-width
// and a 3px line grows a 21px arrowhead that swallows the label beside it.
const MARKERS = `<defs>
    <marker id="m22-key" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    <marker id="m22-blue" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
    <marker id="m22-green" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${GREEN}"/></marker>
    <marker id="m22-red" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${RED}"/></marker>
  </defs>`

/**
 * A football shirt outline — shapes only, no text. Used once, for the word
 * "substitute" itself: a class that has watched a substitution already knows
 * what the word does, and the shirt makes the place-versus-thing distinction
 * visible before any algebra is asked of it.
 */
const shirt = (x, y, s, fill, stroke) => {
  const p = (px, py) => `${(x + px * s).toFixed(1)},${(y + py * s).toFixed(1)}`
  return `<path d="M ${p(0, 30)} L ${p(35, 0)} L ${p(55, 14)} L ${p(75, 0)} L ${p(110, 30)} L ${p(92, 58)} L ${p(82, 48)} L ${p(82, 150)} L ${p(28, 150)} L ${p(28, 48)} L ${p(18, 58)} Z" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>`
}

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // The payoff to 2.1's wall, and the opener. Last lesson the class was told,
  // repeatedly, that c − 50 was finished and they were allowed to stop. Today
  // somebody finally tells them c, and the row that would not finish finishes.
  // The whole of 2.2 is that one move, so it goes first and it uses the same
  // cups, the same numbers and the same layout as the 2.1 diagram.
  // ───────────────────────────────────────────────────────────────────────────
  CUP_FINISHES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${plate(840, 500)}
    ${MARKERS}

    <text x="420" y="44" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">The row that would not finish</text>

    <text x="420" y="88" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}" text-anchor="middle">Last lesson — nobody had told us what c was</text>

    <rect x="60" y="112" width="200" height="86" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <text x="160" y="167" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">c − 50</text>
    <line x1="278" y1="155" x2="326" y2="155" stroke="${INK}" stroke-width="3" marker-end="url(#m22-blue)"/>
    <rect x="344" y="112" width="440" height="86" rx="12" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <text x="564" y="167" font-family="${FONT}" font-size="24" fill="${INK}" text-anchor="middle">We stop here. That is the answer.</text>

    <text x="420" y="246" font-family="${FONT}" font-size="21" font-weight="bold" fill="${GREEN}" text-anchor="middle">Today — I tell you that c = 320</text>

    <rect x="60" y="272" width="200" height="86" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="160" y="327" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">320 − 50</text>
    <line x1="278" y1="315" x2="326" y2="315" stroke="${KEY}" stroke-width="3" marker-end="url(#m22-key)"/>
    <rect x="344" y="272" width="440" height="86" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="564" y="327" font-family="${FONT}" font-size="26" font-weight="900" fill="${INK}" text-anchor="middle">270 ml is left in the cup</text>

    <text x="420" y="414" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Nothing has changed except one thing: now we know c.</text>
    <text x="420" y="454" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">Putting a number in place of a letter is called substituting.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The key word, taught as English before it is taught as maths. A football
  // substitution is a swap that keeps the position and changes the player, and
  // that is exactly what happens to a letter: the place in the expression is
  // untouched, only what is standing in it changes.
  // ───────────────────────────────────────────────────────────────────────────
  SUBSTITUTE_SWAP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 580" class="w-full h-full">
    ${plate(840, 580)}
    ${MARKERS}

    <text x="420" y="44" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">Substitute means swap it for a number</text>

    ${shirt(90, 110, 1.7, BLUE_T, BLUE)}
    <text x="183" y="290" font-family="${FONT}" font-size="72" font-weight="900" fill="${BLUE}" text-anchor="middle">n</text>
    <text x="183" y="400" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">the letter comes off</text>

    <line x1="310" y1="240" x2="452" y2="240" stroke="${KEY}" stroke-width="5" marker-end="url(#m22-key)"/>
    <text x="380" y="212" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">n = 4</text>

    ${shirt(490, 110, 1.7, ORANGE_T, KEY)}
    <text x="583" y="290" font-family="${FONT}" font-size="72" font-weight="900" fill="${KEY}" text-anchor="middle">4</text>
    <text x="583" y="400" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">the number goes on</text>

    <rect x="70" y="430" width="280" height="76" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <text x="210" y="482" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">3n + 2</text>
    <line x1="372" y1="468" x2="438" y2="468" stroke="${KEY}" stroke-width="3" marker-end="url(#m22-key)"/>
    <rect x="460" y="430" width="310" height="76" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="615" y="482" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">3 × 4 + 2</text>

    <text x="420" y="552" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">The place stays the same. Only what is in it changes.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE WALL of this section, and the reason it gets its own slide, its own
  // check and its own line in the recap. 2.1 taught the class to write 3n
  // instead of 3 × n; the cost of that shorthand arrives here, because a
  // student who reads 3n as two digits side by side writes 34 and is certain
  // they are right. The missing × is drawn back in before any number lands.
  // ───────────────────────────────────────────────────────────────────────────
  INVISIBLE_TIMES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 550" class="w-full h-full">
    ${plate(840, 550)}
    ${MARKERS}

    <text x="420" y="44" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">3n still means 3 × n</text>

    <rect x="60" y="110" width="180" height="86" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <text x="150" y="168" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">3n</text>
    <text x="273" y="162" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">means</text>
    <rect x="306" y="110" width="210" height="86" rx="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <text x="411" y="168" font-family="${FONT}" font-size="40" font-weight="900" fill="${BLUE}" text-anchor="middle">3 × n</text>
    <text x="660" y="162" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">put the × back in</text>

    <text x="420" y="240" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">when n = 4</text>

    <rect x="180" y="270" width="210" height="86" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <text x="285" y="328" font-family="${FONT}" font-size="40" font-weight="900" fill="${INK}" text-anchor="middle">3 × 4</text>
    <line x1="406" y1="313" x2="458" y2="313" stroke="${GREEN}" stroke-width="3" marker-end="url(#m22-green)"/>
    <rect x="480" y="270" width="180" height="86" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="570" y="328" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">12</text>

    <rect x="320" y="386" width="200" height="80" rx="12" fill="${RED_T}" stroke="${RED}" stroke-width="3"/>
    <text x="420" y="444" font-family="${FONT}" font-size="44" font-weight="900" fill="${RED}" text-anchor="middle">34</text>
    <line x1="378" y1="428" x2="462" y2="428" stroke="${RED}" stroke-width="6"/>

    <text x="420" y="514" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Never push the digits together. 3n means multiply.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The second half of the substituting skill: once the number is in, the order
  // of operations decides everything. Both routes are drawn, side by side and
  // the same size, because the wrong one is what a left-to-right reader
  // naturally does and pretending otherwise does not stop them doing it.
  // ───────────────────────────────────────────────────────────────────────────
  ORDER_AFTER_SUB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 570" class="w-full h-full">
    ${plate(840, 570)}

    <text x="420" y="44" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">Work out 3x + 2 when x = 4</text>

    <rect x="30" y="86" width="380" height="400" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="220" y="128" font-family="${FONT}" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="middle">Do this</text>
    <text x="220" y="204" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">3 × 4 + 2</text>
    <text x="220" y="282" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">12 + 2</text>
    <text x="220" y="374" font-family="${FONT}" font-size="48" font-weight="900" fill="${GREEN}" text-anchor="middle">= 14</text>
    <text x="220" y="444" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">multiply first</text>

    <rect x="430" y="86" width="380" height="400" rx="14" fill="${RED_T}" stroke="${RED}" stroke-width="3"/>
    <text x="620" y="128" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">Not this</text>
    <text x="620" y="204" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">4 + 2 = 6</text>
    <text x="620" y="282" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">6 × 3</text>
    <text x="620" y="374" font-family="${FONT}" font-size="48" font-weight="900" fill="${RED}" text-anchor="middle">= 18</text>
    <text x="620" y="444" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">added first</text>

    <text x="420" y="534" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">× and ÷ always happen before + and −.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // 2.1's key word against 2.2's, in the only terms that separate them. The
  // book defines an expression as having no = sign and then, two pages later,
  // hands out formulae that all have one — so the contrast is drawn once,
  // explicitly, rather than left for a student to notice.
  // ───────────────────────────────────────────────────────────────────────────
  EXPRESSION_FORMULA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${plate(840, 500)}

    <text x="420" y="44" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">One has an = sign. One does not.</text>

    <rect x="30" y="84" width="380" height="290" rx="14" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <text x="220" y="128" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">Expression</text>
    <text x="220" y="210" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">3n + 2</text>
    <text x="220" y="272" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">No = sign.</text>
    <text x="220" y="322" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">It is a thing you have built.</text>

    <rect x="430" y="84" width="380" height="290" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="620" y="128" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">Formula</text>
    <text x="620" y="210" font-family="${FONT}" font-size="40" font-weight="900" fill="${KEY}" text-anchor="middle">C = 3n + 2</text>
    <text x="620" y="272" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">It has an = sign.</text>
    <text x="620" y="322" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">It is a rule you can use.</text>

    <text x="420" y="428" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">A formula is a rule that connects two quantities.</text>
    <text x="420" y="466" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">Tell me n, and the formula tells you C.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Two letters, so substitute twice. The rectangle is deliberately a shape the
  // class met in primary: the formula is new, the area is not, and a student
  // who can already see 7 × 4 on the picture has one thing to learn here
  // instead of two.
  // ───────────────────────────────────────────────────────────────────────────
  RECTANGLE_FORMULA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 480" class="w-full h-full">
    ${plate(840, 480)}
    ${MARKERS}

    <text x="420" y="44" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">One formula, two letters to substitute</text>

    <rect x="70" y="140" width="280" height="180" rx="6" fill="${BLUE_T}" stroke="${INK}" stroke-width="3"/>
    <line x1="352" y1="230" x2="368" y2="230" stroke="${KEY}" stroke-width="2.5"/>
    <text x="372" y="240" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">w = 4 cm</text>
    <text x="210" y="358" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">l = 7 cm</text>

    <rect x="520" y="120" width="290" height="250" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="665" y="182" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">A = lw</text>
    <text x="665" y="248" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">A = 7 × 4</text>
    <text x="665" y="316" font-family="${FONT}" font-size="30" font-weight="900" fill="${GREEN}" text-anchor="middle">A = 28 cm²</text>

    <text x="420" y="430" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Substitute both letters, then work it out.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The Unit 1 skill returning inside the Unit 2 skill. The mistake is not the
  // arithmetic — this class can do 5 + 6 — it is dropping the minus sign on the
  // way into the expression. Brackets are drawn in at the substitution step and
  // never removed, because that is the habit that fixes it.
  // ───────────────────────────────────────────────────────────────────────────
  NEGATIVE_SUB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 580" class="w-full h-full">
    ${plate(840, 580)}
    ${MARKERS}

    <text x="420" y="44" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">Work out 5 − 2n when n = −3</text>

    <rect x="140" y="90" width="560" height="80" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <text x="420" y="142" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">2n = 2 × (−3)</text>
    <line x1="420" y1="176" x2="420" y2="198" stroke="${BLUE}" stroke-width="3" marker-end="url(#m22-blue)"/>

    <rect x="140" y="204" width="560" height="80" rx="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <text x="420" y="256" font-family="${FONT}" font-size="34" font-weight="bold" fill="${BLUE}" text-anchor="middle">so 2n = −6</text>
    <line x1="420" y1="290" x2="420" y2="312" stroke="${BLUE}" stroke-width="3" marker-end="url(#m22-blue)"/>

    <rect x="140" y="318" width="560" height="80" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <text x="420" y="370" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">5 − (−6) = 5 + 6</text>
    <line x1="420" y1="404" x2="420" y2="426" stroke="${GREEN}" stroke-width="3" marker-end="url(#m22-green)"/>

    <rect x="140" y="432" width="560" height="80" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="420" y="487" font-family="${FONT}" font-size="40" font-weight="900" fill="${INK}" text-anchor="middle">= 11</text>

    <text x="420" y="552" font-family="${FONT}" font-size="22" font-weight="bold" fill="${RED}" text-anchor="middle">Not −1. The minus sign belongs to the 3, so it goes in too.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The honest slide, and the bridge back to Science 2.2. A formula is a rule
  // about a situation, and when the situation ends the formula ends with it:
  // the water reaches 100 °C and stops, whatever the arithmetic says. Rare
  // enough in a maths lesson to be worth the four minutes.
  // ───────────────────────────────────────────────────────────────────────────
  BOILING_LIMIT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${MARKERS}

    <text x="420" y="42" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">The water starts at 24 °C and rises 3 °C each minute</text>

    <rect x="300" y="70" width="240" height="64" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="420" y="114" font-family="${FONT}" font-size="32" font-weight="900" fill="${KEY}" text-anchor="middle">T = 24 + 3m</text>

    <rect x="50" y="180" width="440" height="72" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="270" y="226" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">after 12 minutes, T = 60 °C</text>

    <rect x="50" y="266" width="440" height="72" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="270" y="312" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">after 25 minutes, T = 99 °C</text>

    <rect x="50" y="352" width="440" height="72" rx="12" fill="${RED_T}" stroke="${RED}" stroke-width="3"/>
    <text x="270" y="398" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}" text-anchor="middle">after 40 minutes, T = 144 °C</text>

    <text x="667" y="112" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">144 °C?</text>
    <line x1="667" y1="126" x2="667" y2="150" stroke="${RED}" stroke-width="3" stroke-dasharray="7 6" marker-end="url(#m22-red)"/>

    <rect x="640" y="170" width="54" height="280" rx="27" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <rect x="650" y="222" width="34" height="232" fill="${RED}"/>
    <circle cx="667" cy="470" r="42" fill="${RED}" stroke="${INK}" stroke-width="3"/>
    <line x1="634" y1="222" x2="706" y2="222" stroke="${INK}" stroke-width="2.5"/>
    <text x="626" y="230" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="end">100 °C</text>

    <text x="420" y="500" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">Water cannot get hotter than 100 °C.</text>
    <text x="420" y="538" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">A formula is only true while the situation it describes is true.</text>
  </svg>`,

  // The two answers on each vote slide, each beside the hand that votes for it:
  // A is a LEFT hand seen from behind, thumb on the right — what a student sees when
  // they raise it palm-forward — and B is a right hand, thumb on the left. The answer is the
  // biggest thing on the card so the back row can read it.
  ANS_14: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="440" y="228" font-family="${FONT}" font-size="190" font-weight="bold" fill="${BLUE}" text-anchor="middle">14</text>
  </svg>`,

  ANS_18: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <g transform="translate(528 76) scale(7)" fill="none" stroke="${KEY}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="280" y="228" font-family="${FONT}" font-size="190" font-weight="bold" fill="${KEY}" text-anchor="middle">18</text>
  </svg>`,

  ANS_NEG1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="440" y="228" font-family="${FONT}" font-size="190" font-weight="bold" fill="${BLUE}" text-anchor="middle">−1</text>
  </svg>`,

  ANS_11: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    <g transform="translate(528 76) scale(7)" fill="none" stroke="${KEY}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="280" y="228" font-family="${FONT}" font-size="190" font-weight="bold" fill="${KEY}" text-anchor="middle">11</text>
  </svg>`,
}
