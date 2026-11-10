// content/y7-math/U01_1/diagrams.js
// Teaching diagrams for 1.1 Adding & Subtracting Integers, drawn to match the
// Cambridge Lower Secondary Learner's Book: flat line art on paper-white, a
// thin ink outline on every shape, pale flat fills, and key words set in the
// book's orange.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so the artwork is legible on a
//    light OR dark slide and never depends on the page's text colour;
//  · every <text> is written out literally — helpers draw shapes and leader
//    lines only. `npm run audit:svg` cannot see text produced by a
//    `${helper(...)}` call, so a helper that emits <text> silently opts the
//    label out of checking. The old version of this file hid ~90 tick labels
//    from the audit that way;
//  · label text lives in the margins or under the line, never on the artwork.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const RULE = '#7c8a95'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const TEAL = '#0087a8'
const RED_T = '#fdecee'
const BLUE_T = '#e9f1fa'
const GREEN_T = '#eef6e6'
const TEAL_T = '#e2f2f6'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/** Arrowheads. Shapes only — no text, so nothing is hidden from the audit. */
const MARKERS = `<defs>
    <marker id="mi-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${RED}"/></marker>
    <marker id="mi-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${GREEN}"/></marker>
    <marker id="mi-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
  </defs>`

/**
 * Tick marks and integer dots for a horizontal line — no labels. Every number
 * label is typed out literally in the diagram that uses this.
 * Standard geometry: eleven ticks, x = 50 + 56n, axis at y = 118.
 */
const ticks = (xs, y = 118, dot = INK) => xs.map((x) => `
    <line x1="${x}" y1="${y - 8}" x2="${x}" y2="${y + 8}" stroke="${RULE}" stroke-width="2"/>
    <circle cx="${x}" cy="${y}" r="3.5" fill="${dot}"/>`).join('')

const X = [50, 106, 162, 218, 274, 330, 386, 442, 498, 554, 610]

/** The shared body of a "jump along the line" figure: plate, axis, ticks. */
const lineBase = (y = 118) => `${plate(660, 215)}${MARKERS}
    <line x1="20" y1="${y}" x2="640" y2="${y}" stroke="${INK}" stroke-width="3" stroke-linecap="round" marker-start="url(#mi-blue)" marker-end="url(#mi-blue)"/>
    ${ticks(X, y)}`

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // The main teaching number line (Draw This). Names the three regions, marks
  // every integer, and says which way is smaller and which way is larger.
  // ───────────────────────────────────────────────────────────────────────────
  NUMBER_LINE_BIG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 215" class="w-full h-full">
    ${plate(660, 215)}${MARKERS}
    <rect x="30" y="101" width="278" height="34" rx="8" fill="${RED_T}"/>
    <rect x="352" y="101" width="278" height="34" rx="8" fill="${BLUE_T}"/>

    <text x="180" y="46" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">NEGATIVE INTEGERS</text>
    <text x="180" y="68" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RULE}" text-anchor="middle">less than zero</text>
    <text x="330" y="46" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">ZERO</text>
    <text x="330" y="68" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RULE}" text-anchor="middle">neither</text>
    <text x="480" y="46" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">POSITIVE INTEGERS</text>
    <text x="480" y="68" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RULE}" text-anchor="middle">more than zero</text>

    <line x1="20" y1="118" x2="640" y2="118" stroke="${INK}" stroke-width="3" stroke-linecap="round" marker-start="url(#mi-red)" marker-end="url(#mi-blue)"/>
    ${ticks(X)}

    <text x="50" y="152" font-family="${FONT}" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">-5</text>
    <text x="106" y="152" font-family="${FONT}" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">-4</text>
    <text x="162" y="152" font-family="${FONT}" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">-3</text>
    <text x="218" y="152" font-family="${FONT}" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">-2</text>
    <text x="274" y="152" font-family="${FONT}" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">-1</text>
    <text x="330" y="152" font-family="${FONT}" font-size="20" font-weight="900" fill="${INK}" text-anchor="middle">0</text>
    <text x="386" y="152" font-family="${FONT}" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">1</text>
    <text x="442" y="152" font-family="${FONT}" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">2</text>
    <text x="498" y="152" font-family="${FONT}" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">3</text>
    <text x="554" y="152" font-family="${FONT}" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">4</text>
    <text x="610" y="152" font-family="${FONT}" font-size="20" font-weight="bold" fill="${BLUE}" text-anchor="middle">5</text>

    <text x="150" y="190" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">smaller this way</text>
    <text x="510" y="190" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">bigger this way</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // A thermometer: the same number line stood on its end. Carries the language
  // of position — above / below, higher / lower, warmer / colder.
  // ───────────────────────────────────────────────────────────────────────────
  THERMOMETER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 260" class="w-full h-full">
    ${plate(340, 260)}
    <rect x="126" y="24" width="26" height="186" rx="13" fill="#f6f8fa" stroke="${INK}" stroke-width="2.5"/>
    <rect x="130" y="152" width="18" height="58" fill="${RED}"/>
    <circle cx="139" cy="216" r="18" fill="${RED}" stroke="${INK}" stroke-width="2.5"/>

    <line x1="112" y1="44" x2="126" y2="44" stroke="${RULE}" stroke-width="2"/>
    <line x1="112" y1="80" x2="126" y2="80" stroke="${RULE}" stroke-width="2"/>
    <line x1="106" y1="116" x2="126" y2="116" stroke="${INK}" stroke-width="2.5"/>
    <line x1="112" y1="152" x2="126" y2="152" stroke="${RULE}" stroke-width="2"/>
    <line x1="112" y1="188" x2="126" y2="188" stroke="${RULE}" stroke-width="2"/>

    <text x="102" y="49" font-family="${FONT}" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="end">10</text>
    <text x="102" y="85" font-family="${FONT}" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="end">5</text>
    <text x="98" y="121" font-family="${FONT}" font-size="17" font-weight="900" fill="${INK}" text-anchor="end">0</text>
    <text x="102" y="157" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="end">-5</text>
    <text x="102" y="193" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="end">-10</text>
    <text x="102" y="22" font-family="${FONT}" font-size="14" font-weight="bold" fill="${RULE}" text-anchor="end">°C</text>

    <line x1="152" y1="116" x2="300" y2="116" stroke="${INK}" stroke-width="1.6" stroke-dasharray="5 4"/>
    <text x="298" y="110" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="end">zero</text>

    <text x="176" y="50" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">above zero</text>
    <text x="176" y="74" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">higher</text>
    <text x="176" y="98" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">warmer</text>
    <text x="176" y="152" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">below zero</text>
    <text x="176" y="176" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">lower</text>
    <text x="176" y="200" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="start">colder</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // One symbol, two jobs — and two different English words for it.
  // ───────────────────────────────────────────────────────────────────────────
  SIGN_OR_OPERATION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 230" class="w-full h-full">
    ${plate(620, 230)}
    <rect x="22" y="26" width="266" height="178" rx="16" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="155" y="62" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="middle">IT IS A SIGN</text>
    <text x="155" y="118" font-family="${FONT}" font-size="42" font-weight="900" fill="${INK}" text-anchor="middle">-5</text>
    <text x="155" y="150" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">it belongs to the 5</text>
    <text x="155" y="182" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">negative five</text>

    <rect x="332" y="26" width="266" height="178" rx="16" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2.5"/>
    <text x="465" y="62" font-family="${FONT}" font-size="14" font-weight="bold" fill="${TEAL}" text-anchor="middle">IT IS AN OPERATION</text>
    <text x="465" y="118" font-family="${FONT}" font-size="42" font-weight="900" fill="${INK}" text-anchor="middle">8 - 5</text>
    <text x="465" y="150" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">it tells you to take away</text>
    <text x="465" y="182" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">eight minus five</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Adding a negative: -3 + (-4) = -7. Start at -3, jump 4 to the LEFT.
  // Ticks run -8 … 2.
  // ───────────────────────────────────────────────────────────────────────────
  ADD_NEG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 215" class="w-full h-full">
    ${lineBase()}
    <path d="M 330 106 Q 218 44 106 106" fill="none" stroke="${RED}" stroke-width="3.5" marker-end="url(#mi-red)"/>
    <text x="218" y="40" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RED}" text-anchor="middle">4 to the left</text>
    <circle cx="330" cy="118" r="7" fill="${BLUE}"/>
    <circle cx="106" cy="118" r="7" fill="${RED}"/>

    <text x="50" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-8</text>
    <text x="106" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${RED}" text-anchor="middle">-7</text>
    <text x="162" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-6</text>
    <text x="218" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-5</text>
    <text x="274" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-4</text>
    <text x="330" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${BLUE}" text-anchor="middle">-3</text>
    <text x="386" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-2</text>
    <text x="442" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-1</text>
    <text x="498" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${INK}" text-anchor="middle">0</text>
    <text x="554" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">1</text>
    <text x="610" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">2</text>

    <text x="330" y="192" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">-3 + (-4) = -7</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Subtracting a positive: -6 - 3 = -9. Ticks run -10 … 0.
  // ───────────────────────────────────────────────────────────────────────────
  SUB_POS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 215" class="w-full h-full">
    ${lineBase()}
    <path d="M 274 106 Q 190 44 106 106" fill="none" stroke="${RED}" stroke-width="3.5" marker-end="url(#mi-red)"/>
    <text x="190" y="40" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RED}" text-anchor="middle">3 to the left</text>
    <circle cx="274" cy="118" r="7" fill="${BLUE}"/>
    <circle cx="106" cy="118" r="7" fill="${RED}"/>

    <text x="50" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-10</text>
    <text x="106" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${RED}" text-anchor="middle">-9</text>
    <text x="162" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-8</text>
    <text x="218" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-7</text>
    <text x="274" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${BLUE}" text-anchor="middle">-6</text>
    <text x="330" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-5</text>
    <text x="386" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-4</text>
    <text x="442" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-3</text>
    <text x="498" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-2</text>
    <text x="554" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-1</text>
    <text x="610" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${INK}" text-anchor="middle">0</text>

    <text x="330" y="192" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">-6 - 3 = -9</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Subtracting a negative (Draw This): 2 - (-5) = 2 + 5 = 7. Ticks run -1 … 9.
  // ───────────────────────────────────────────────────────────────────────────
  SUB_NEG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 215" class="w-full h-full">
    ${lineBase()}
    <path d="M 218 106 Q 358 40 498 106" fill="none" stroke="${GREEN}" stroke-width="3.5" marker-end="url(#mi-green)"/>
    <text x="358" y="36" font-family="${FONT}" font-size="19" font-weight="bold" fill="${GREEN}" text-anchor="middle">5 to the right</text>
    <circle cx="218" cy="118" r="7" fill="${BLUE}"/>
    <circle cx="498" cy="118" r="7" fill="${GREEN}"/>

    <text x="50" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-1</text>
    <text x="106" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${INK}" text-anchor="middle">0</text>
    <text x="162" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">1</text>
    <text x="218" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${BLUE}" text-anchor="middle">2</text>
    <text x="274" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">3</text>
    <text x="330" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">4</text>
    <text x="386" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">5</text>
    <text x="442" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">6</text>
    <text x="498" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${GREEN}" text-anchor="middle">7</text>
    <text x="554" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">8</text>
    <text x="610" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">9</text>

    <text x="330" y="192" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">2 - (-5) = 2 + 5 = 7</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Two signs standing next to each other combine into one.
  // ───────────────────────────────────────────────────────────────────────────
  TWO_SIGNS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 250" class="w-full h-full">
    ${plate(620, 250)}
    <rect x="22" y="24" width="266" height="200" rx="16" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="155" y="56" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="middle">SAME SIGNS</text>
    <text x="155" y="100" font-family="${FONT}" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">+ +</text>
    <text x="155" y="136" font-family="${FONT}" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">- -</text>
    <line x1="58" y1="150" x2="252" y2="150" stroke="${GREEN}" stroke-width="1.6"/>
    <text x="155" y="186" font-family="${FONT}" font-size="30" font-weight="900" fill="${GREEN}" text-anchor="middle">= +</text>
    <text x="155" y="210" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">move right</text>

    <rect x="332" y="24" width="266" height="200" rx="16" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>
    <text x="465" y="56" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">DIFFERENT SIGNS</text>
    <text x="465" y="100" font-family="${FONT}" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">+ -</text>
    <text x="465" y="136" font-family="${FONT}" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">- +</text>
    <line x1="368" y1="150" x2="562" y2="150" stroke="${RED}" stroke-width="1.6"/>
    <text x="465" y="186" font-family="${FONT}" font-size="30" font-weight="900" fill="${RED}" text-anchor="middle">= -</text>
    <text x="465" y="210" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">move left</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // "Subtract 5 from 8" — the English says the numbers in the opposite order
  // to the calculation. The crossing arrows are the whole point of the figure.
  // ───────────────────────────────────────────────────────────────────────────
  WORD_ORDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 240" class="w-full h-full">
    ${plate(620, 240)}${MARKERS}
    <rect x="30" y="30" width="560" height="56" rx="12" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2"/>
    <text x="150" y="68" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Subtract</text>
    <text x="262" y="68" font-family="${FONT}" font-size="26" font-weight="900" fill="${RED}" text-anchor="middle">5</text>
    <text x="345" y="68" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">from</text>
    <text x="440" y="68" font-family="${FONT}" font-size="26" font-weight="900" fill="${BLUE}" text-anchor="middle">8</text>

    <path d="M 262 96 C 262 130 372 130 372 156" fill="none" stroke="${RED}" stroke-width="3" marker-end="url(#mi-red)"/>
    <path d="M 440 96 C 440 130 262 130 262 156" fill="none" stroke="${BLUE}" stroke-width="3" marker-end="url(#mi-blue)"/>

    <text x="262" y="200" font-family="${FONT}" font-size="34" font-weight="900" fill="${BLUE}" text-anchor="middle">8</text>
    <text x="317" y="200" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">-</text>
    <text x="372" y="200" font-family="${FONT}" font-size="34" font-weight="900" fill="${RED}" text-anchor="middle">5</text>
    <text x="470" y="200" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="start">they swap</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // "The difference between -3 and 4" is the gap, and a gap is never negative.
  // The contrast line underneath is the question students confuse it with.
  // ───────────────────────────────────────────────────────────────────────────
  DIFFERENCE_GAP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 250" class="w-full h-full">
    ${plate(660, 250)}${MARKERS}
    <line x1="20" y1="118" x2="640" y2="118" stroke="${INK}" stroke-width="3" stroke-linecap="round" marker-start="url(#mi-blue)" marker-end="url(#mi-blue)"/>
    ${ticks(X)}
    <rect x="162" y="104" width="392" height="28" rx="8" fill="${GREEN_T}"/>
    <line x1="162" y1="72" x2="554" y2="72" stroke="${GREEN}" stroke-width="3" marker-start="url(#mi-green)" marker-end="url(#mi-green)"/>
    <line x1="162" y1="72" x2="162" y2="104" stroke="${GREEN}" stroke-width="1.6" stroke-dasharray="4 3"/>
    <line x1="554" y1="72" x2="554" y2="104" stroke="${GREEN}" stroke-width="1.6" stroke-dasharray="4 3"/>
    <text x="358" y="56" font-family="${FONT}" font-size="20" font-weight="900" fill="${GREEN}" text-anchor="middle">7 steps apart</text>

    <circle cx="162" cy="118" r="7" fill="${RED}"/>
    <circle cx="554" cy="118" r="7" fill="${BLUE}"/>

    <text x="50" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-5</text>
    <text x="106" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-4</text>
    <text x="162" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${RED}" text-anchor="middle">-3</text>
    <text x="218" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-2</text>
    <text x="274" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">-1</text>
    <text x="330" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${INK}" text-anchor="middle">0</text>
    <text x="386" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">1</text>
    <text x="442" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">2</text>
    <text x="498" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">3</text>
    <text x="554" y="152" font-family="${FONT}" font-size="19" font-weight="900" fill="${BLUE}" text-anchor="middle">4</text>
    <text x="610" y="152" font-family="${FONT}" font-size="19" font-weight="bold" fill="${RULE}" text-anchor="middle">5</text>

    <text x="330" y="196" font-family="${FONT}" font-size="21" font-weight="900" fill="${GREEN}" text-anchor="middle">the difference is 7</text>
    <text x="330" y="226" font-family="${FONT}" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">but -3 - 4 = -7</text>
  </svg>`,
}
