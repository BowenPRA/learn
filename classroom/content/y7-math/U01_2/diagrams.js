// content/y7-math/U01_2/diagrams.js
// Teaching diagrams for 1.2 Multiplying & Dividing Integers, drawn to match
// 1.1 so the two lessons read as one unit: flat line art on paper-white, red
// negatives, blue positives, key words in the book's orange.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so the artwork is legible on a
//    light OR dark slide and never depends on the page's text colour;
//  · every <text> is written out literally — helpers draw shapes and leader
//    lines only, because `npm run audit:svg` cannot see text produced by a
//    `${helper(...)}` call and will silently check nothing;
//  · label text lives in the margins or under the line, never on the artwork.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const RULE = '#7c8a95'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const RED_T = '#fdecee'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const MARKERS = `<defs>
    <marker id="m2-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${RED}"/></marker>
    <marker id="m2-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
    <marker id="m2-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
  </defs>`

/** Ticks and dots only — every number label is typed out literally below. */
const ticks = (xs, y) => xs.map((x) => `
    <line x1="${x}" y1="${y - 8}" x2="${x}" y2="${y + 8}" stroke="${RULE}" stroke-width="2"/>
    <circle cx="${x}" cy="${y}" r="3.5" fill="${INK}"/>`).join('')

// −12 … 2, fifteen ticks at 42 px. n=0 is −12, n=12 is zero.
const XS = [44, 86, 128, 170, 212, 254, 296, 338, 380, 422, 464, 506, 548, 590, 632]

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // What multiplying by a negative MEANS: 3 × −4 is −4 taken three times, which
  // is three jumps of four to the left. Derives the first sign rule instead of
  // asserting it, which is the whole reason this diagram exists.
  // ───────────────────────────────────────────────────────────────────────────
  REPEATED_JUMPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 225" class="w-full h-full">
    ${plate(660, 225)}${MARKERS}

    <text x="330" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">3 × -4  =  -4 + -4 + -4  =  -12</text>

    <path d="M 548 132 Q 464 82 380 132" fill="none" stroke="${RED}" stroke-width="3" marker-end="url(#m2-red)"/>
    <path d="M 380 132 Q 296 82 212 132" fill="none" stroke="${RED}" stroke-width="3" marker-end="url(#m2-red)"/>
    <path d="M 212 132 Q 128 82 44 132" fill="none" stroke="${RED}" stroke-width="3" marker-end="url(#m2-red)"/>

    <text x="464" y="76" font-family="${FONT}" font-size="18" font-weight="bold" fill="${RED}" text-anchor="middle">-4</text>
    <text x="296" y="76" font-family="${FONT}" font-size="18" font-weight="bold" fill="${RED}" text-anchor="middle">-4</text>
    <text x="128" y="76" font-family="${FONT}" font-size="18" font-weight="bold" fill="${RED}" text-anchor="middle">-4</text>

    <line x1="18" y1="140" x2="642" y2="140" stroke="${INK}" stroke-width="3" stroke-linecap="round" marker-start="url(#m2-red)" marker-end="url(#m2-blue)"/>
    ${ticks(XS, 140)}

    <text x="44" y="172" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">-12</text>
    <text x="128" y="172" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">-10</text>
    <text x="212" y="172" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">-8</text>
    <text x="296" y="172" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">-6</text>
    <text x="380" y="172" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">-4</text>
    <text x="464" y="172" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">-2</text>
    <text x="548" y="172" font-family="${FONT}" font-size="17" font-weight="900" fill="${INK}" text-anchor="middle">0</text>
    <text x="632" y="172" font-family="${FONT}" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="middle">2</text>

    <text x="330" y="207" font-family="${FONT}" font-size="16" font-weight="bold" fill="${RULE}" text-anchor="middle">start at zero, then three jumps of four to the left</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The pattern ladder, with the last two rows open. Multiplying two negatives
  // cannot be shown as repeated addition — you cannot do something "negative
  // two times" — so the pattern is the honest way in. Ask what comes next
  // BEFORE showing the solved version.
  // ───────────────────────────────────────────────────────────────────────────
  PATTERN_LADDER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 330" class="w-full h-full">
    ${plate(560, 330)}${MARKERS}

    <text x="280" y="32" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">What comes next?</text>

    <rect x="40" y="58" width="330" height="34" rx="7" fill="#f8fafc"/>
    <rect x="40" y="100" width="330" height="34" rx="7" fill="#f8fafc"/>
    <rect x="40" y="142" width="330" height="34" rx="7" fill="#f8fafc"/>
    <rect x="40" y="184" width="330" height="34" rx="7" fill="#f8fafc"/>
    <rect x="40" y="226" width="330" height="34" rx="7" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>
    <rect x="40" y="268" width="330" height="34" rx="7" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>

    <text x="62" y="83" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="start">3 × -4  =  -12</text>
    <text x="62" y="125" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="start">2 × -4  =  -8</text>
    <text x="62" y="167" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="start">1 × -4  =  -4</text>
    <text x="62" y="209" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="start">0 × -4  =  0</text>
    <text x="62" y="251" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="start">-1 × -4  =  ?</text>
    <text x="62" y="293" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="start">-2 × -4  =  ?</text>

    <line x1="440" y1="76" x2="440" y2="286" stroke="${GREEN}" stroke-width="2.5" marker-end="url(#m2-ink)"/>
    <text x="470" y="104" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="start">+4</text>
    <text x="470" y="146" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="start">+4</text>
    <text x="470" y="188" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="start">+4</text>
    <text x="470" y="230" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="start">+4</text>
    <text x="470" y="272" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="start">+4</text>

    <text x="280" y="322" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RULE}" text-anchor="middle">the answer climbs by 4 every time. Keep it going.</text>
  </svg>`,

  PATTERN_LADDER_SOLVED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 330" class="w-full h-full">
    ${plate(560, 330)}${MARKERS}

    <text x="280" y="32" font-family="${FONT}" font-size="20" font-weight="bold" fill="${GREEN}" text-anchor="middle">The pattern does not break</text>

    <rect x="40" y="58" width="330" height="34" rx="7" fill="#f8fafc"/>
    <rect x="40" y="100" width="330" height="34" rx="7" fill="#f8fafc"/>
    <rect x="40" y="142" width="330" height="34" rx="7" fill="#f8fafc"/>
    <rect x="40" y="184" width="330" height="34" rx="7" fill="#f8fafc"/>
    <rect x="40" y="226" width="330" height="34" rx="7" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <rect x="40" y="268" width="330" height="34" rx="7" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>

    <text x="62" y="83" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="start">3 × -4  =  -12</text>
    <text x="62" y="125" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="start">2 × -4  =  -8</text>
    <text x="62" y="167" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="start">1 × -4  =  -4</text>
    <text x="62" y="209" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="start">0 × -4  =  0</text>
    <text x="62" y="251" font-family="${FONT}" font-size="21" font-weight="bold" fill="${GREEN}" text-anchor="start">-1 × -4  =  4</text>
    <text x="62" y="293" font-family="${FONT}" font-size="21" font-weight="bold" fill="${GREEN}" text-anchor="start">-2 × -4  =  8</text>

    <line x1="440" y1="76" x2="440" y2="286" stroke="${GREEN}" stroke-width="2.5" marker-end="url(#m2-ink)"/>
    <text x="470" y="104" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="start">+4</text>
    <text x="470" y="146" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="start">+4</text>
    <text x="470" y="188" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="start">+4</text>
    <text x="470" y="230" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="start">+4</text>
    <text x="470" y="272" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="start">+4</text>

    <text x="280" y="322" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RULE}" text-anchor="middle">so a negative times a negative has to be positive</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The four rules as one grid. Division shares them, because dividing undoes
  // multiplying — which is why this is one table and not two.
  // ───────────────────────────────────────────────────────────────────────────
  SIGN_GRID: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 350" class="w-full h-full">
    ${plate(560, 350)}

    <text x="280" y="44" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">The same four rules for × and ÷</text>

    <rect x="140" y="80" width="120" height="70" rx="8" fill="#f1f5f9" stroke="${RULE}" stroke-width="2"/>
    <rect x="260" y="80" width="120" height="70" rx="8" fill="#f1f5f9" stroke="${RULE}" stroke-width="2"/>
    <rect x="380" y="80" width="120" height="70" rx="8" fill="#f1f5f9" stroke="${RULE}" stroke-width="2"/>
    <rect x="140" y="150" width="120" height="70" rx="8" fill="#f1f5f9" stroke="${RULE}" stroke-width="2"/>
    <rect x="260" y="150" width="120" height="70" rx="8" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <rect x="380" y="150" width="120" height="70" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <rect x="140" y="220" width="120" height="70" rx="8" fill="#f1f5f9" stroke="${RULE}" stroke-width="2"/>
    <rect x="260" y="220" width="120" height="70" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <rect x="380" y="220" width="120" height="70" rx="8" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>

    <text x="200" y="127" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RULE}" text-anchor="middle">× ÷</text>
    <text x="320" y="127" font-family="${FONT}" font-size="34" font-weight="900" fill="${BLUE}" text-anchor="middle">+</text>
    <text x="440" y="127" font-family="${FONT}" font-size="34" font-weight="900" fill="${RED}" text-anchor="middle">-</text>
    <text x="200" y="197" font-family="${FONT}" font-size="34" font-weight="900" fill="${BLUE}" text-anchor="middle">+</text>
    <text x="200" y="267" font-family="${FONT}" font-size="34" font-weight="900" fill="${RED}" text-anchor="middle">-</text>

    <text x="320" y="197" font-family="${FONT}" font-size="34" font-weight="900" fill="${GREEN}" text-anchor="middle">+</text>
    <text x="440" y="197" font-family="${FONT}" font-size="34" font-weight="900" fill="${RED}" text-anchor="middle">-</text>
    <text x="320" y="267" font-family="${FONT}" font-size="34" font-weight="900" fill="${RED}" text-anchor="middle">-</text>
    <text x="440" y="267" font-family="${FONT}" font-size="34" font-weight="900" fill="${GREEN}" text-anchor="middle">+</text>

    <text x="280" y="322" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">same signs give +   ·   different signs give -</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Order of operations, and the trap that comes with it: the bracket holds an
  // ADDITION, so the shiny new "two negatives make a positive" rule does not
  // apply inside it. This is where the misconception does its real damage.
  // ───────────────────────────────────────────────────────────────────────────
  BRACKETS_FIRST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 270" class="w-full h-full">
    ${plate(640, 270)}

    <rect x="250" y="52" width="180" height="42" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>
    <text x="200" y="82" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">20 ÷</text>
    <text x="340" y="82" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">(-3 + -2)</text>

    <text x="340" y="122" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">do the bracket first</text>

    <text x="320" y="172" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">=  20 ÷ -5</text>
    <text x="320" y="216" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">=  -4</text>

    <text x="320" y="252" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="middle">careful: inside the bracket it is an addition, so -3 + -2 = -5</text>
  </svg>`,
}
