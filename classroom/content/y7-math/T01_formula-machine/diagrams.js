// content/y7-math/T01_formula-machine/diagrams.js
// Teaching diagrams for the Formula Machine task, drawn to match Unit 2 so the
// task reads as a continuation of 2.2 rather than a different subject: flat
// line art on paper-white, dark ink outlines, the book's orange for every key
// word students copy down.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so the artwork is legible on a
//    light OR dark slide and never depends on the page's text colour;
//  · every <text> is written out literally — the helpers below emit shapes and
//    leader lines only, because `npm run audit:svg` cannot see text produced by
//    a `${helper(...)}` call and will silently check nothing;
//  · a label keeps clear of any literal <rect> by more than its own font size,
//    because the audit treats a nearby baseline as living inside that box;
//  · markers are `markerUnits="userSpaceOnUse"` so an arrowhead does not scale
//    with its line's stroke-width.
//
// EVERY DIAGRAM IS DRAWN AT ROUGHLY 1.5:1, not the 2:1 strip that looks natural
// on a wide monitor. A `split` slide's media panel is roughly SQUARE in project
// mode, so a wider drawing is width-limited and renders at half the height it
// could.
//
// The ten diagrams, in deck order:
//   ANT_WALK           adding four sides works — and it is slow
//   THREE_MOVES        write it · put the numbers in · work it out
//   TRIANGLE_IN_RECT   the question slide for the triangle. No numbers on it.
//   TRIANGLE_HEIGHT    h goes straight up; the slanted side is not the height
//   TWO_THERMOMETERS   35 °C against 95 °F — the question slide. No answer.
//   TEMP_SCALES        the two scales tied together, and 35 °C IS 95 °F
//   STORM_DISTANCE     count the seconds, divide by three
//   POUR_QUESTION      the pour, with no numbers anywhere on it
//   WATER_LAYERS       water is centimetre cubes, stacked in layers
//   POUR_TWO_STEPS     cubes altogether ÷ cubes in one layer = layers deep
//
// TRIANGLE_IN_RECT, TWO_THERMOMETERS and POUR_QUESTION are the three
// ask-before-you-tell slides, and none of them carries the answer. TWO_THERMO-
// METERS is the one worth protecting: 35 °C and 95 °F are the same temperature,
// so the class argues about which city is hotter and the argument is the lesson.

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
const WATER = '#7ec8e3'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// markerUnits="userSpaceOnUse" — otherwise the head scales with stroke-width
// and a 3px line grows a 21px arrowhead that swallows the label beside it.
const MARKERS = `<defs>
    <marker id="t1-key" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    <marker id="t1-blue" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
    <marker id="t1-green" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${GREEN}"/></marker>
    <marker id="t1-ink" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
  </defs>`

/**
 * An open-topped tank drawn in oblique projection — shapes only, no text.
 * (x, y) is the top-left of the FRONT face, w × h its size, d the oblique
 * offset. `fill` is the water level in front-face pixels measured up from the
 * base; 0 leaves the tank empty.
 *
 * Deliberately emitted from a helper rather than written out: these are the
 * only rectangles in the deck a label ever sits on top of, and a helper keeps
 * them out of the audit's list of boxes a nearby baseline could belong to.
 */
const tank = (x, y, w, h, d, fill = 0) => {
  const dx = d
  const dy = -d * 0.62
  const base = y + h
  const wy = base - fill
  const water = fill > 0
    ? `<polygon points="${x},${wy} ${x + dx},${wy + dy} ${x + w + dx},${wy + dy} ${x + w},${wy}" fill="${WATER}" stroke="#3d8fb0" stroke-width="2"/>
       <polygon points="${x + w},${wy} ${x + w + dx},${wy + dy} ${x + w + dx},${base + dy} ${x + w},${base}" fill="#9fd8ec" stroke="#3d8fb0" stroke-width="2"/>
       <rect x="${x}" y="${wy}" width="${w}" height="${fill}" fill="#bfe6f4" stroke="#3d8fb0" stroke-width="2"/>`
    : ''
  return `<polygon points="${x},${y} ${x + dx},${y + dy} ${x + w + dx},${y + dy} ${x + w},${y}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="${x + w},${y} ${x + w + dx},${y + dy} ${x + w + dx},${base + dy} ${x + w},${base}" fill="#eef4f8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    ${water}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="3"/>`
}

/** A stick figure, shapes only. */
const person = (x, footY, s) => `<circle cx="${x}" cy="${footY - 62 * s}" r="${15 * s}" fill="${ORANGE_T}" stroke="${INK}" stroke-width="2.5"/>
    <path d="M ${x} ${footY - 47 * s} L ${x} ${footY - 20 * s} M ${x - 16 * s} ${footY - 38 * s} L ${x + 16 * s} ${footY - 38 * s} M ${x} ${footY - 20 * s} L ${x - 13 * s} ${footY} M ${x} ${footY - 20 * s} L ${x + 13 * s} ${footY}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // The opener. The class can already walk a rectangle by adding four numbers,
  // and this diagram agrees with them — the arithmetic on it is correct and
  // finished. The case for a formula is made by the last line, not by pretending
  // adding four sides is wrong.
  // ───────────────────────────────────────────────────────────────────────────
  ANT_WALK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${plate(840, 500)}
    ${MARKERS}

    <text x="420" y="46" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">One rectangle, four sides</text>

    <rect x="210" y="110" width="420" height="158" fill="${BLUE_T}" stroke="${INK}" stroke-width="3"/>

    <path d="M 240 100 L 600 100" fill="none" stroke="${GREEN}" stroke-width="3" marker-end="url(#t1-green)"/>
    <path d="M 642 130 L 642 248" fill="none" stroke="${GREEN}" stroke-width="3" marker-end="url(#t1-green)"/>
    <path d="M 600 278 L 240 278" fill="none" stroke="${GREEN}" stroke-width="3" marker-end="url(#t1-green)"/>
    <path d="M 198 248 L 198 130" fill="none" stroke="${GREEN}" stroke-width="3" marker-end="url(#t1-green)"/>

    <circle cx="210" cy="110" r="7" fill="${KEY}"/>
    <text x="200" y="100" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="end">Start</text>

    <text x="420" y="308" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="middle">8 cm</text>
    <text x="186" y="198" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}" text-anchor="end">3 cm</text>

    <text x="420" y="360" font-family="${FONT}" font-size="32" font-weight="bold" fill="${GREEN}" text-anchor="middle">8 + 3 + 8 + 3 = 22 cm</text>

    <text x="420" y="416" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">That is correct, and it is finished.</text>
    <text x="420" y="452" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="middle">Now do it for forty rectangles.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The routine, and the only thing on it that is genuinely new is the middle
  // band. A student who writes the answer straight under the formula has no
  // line to be marked and no line to be corrected, so the middle band is drawn
  // the same size as the other two on purpose.
  // ───────────────────────────────────────────────────────────────────────────
  THREE_MOVES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="46" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">Three moves, every time</text>

    <rect x="60" y="76" width="720" height="104" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <circle cx="112" cy="128" r="26" fill="${KEY}"/>
    <text x="112" y="138" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <text x="158" y="116" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">Write the formula</text>
    <text x="158" y="156" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">P = 2l + 2w</text>

    <rect x="60" y="196" width="720" height="104" rx="14" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <circle cx="112" cy="248" r="26" fill="${BLUE}"/>
    <text x="112" y="258" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <text x="158" y="236" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}">Put the numbers in</text>
    <text x="158" y="276" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">P = 2 × 8 + 2 × 3</text>

    <rect x="60" y="316" width="720" height="104" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <circle cx="112" cy="368" r="26" fill="${GREEN}"/>
    <text x="112" y="378" font-family="${FONT}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <text x="158" y="356" font-family="${FONT}" font-size="22" font-weight="bold" fill="${GREEN}">Work it out</text>
    <text x="158" y="396" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">P = 16 + 6 = 22 cm</text>

    <rect x="60" y="440" width="720" height="86" rx="14" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>
    <text x="100" y="478" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}">2l means 2 × l.</text>
    <text x="100" y="508" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}">It is a multiplication, not two things stuck together.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Ask before you tell. There is not a single number on this diagram, and
  // there must not be: the class has to say "half" out loud before the formula
  // hands them the ÷ 2, or the ÷ 2 is just another rule to forget.
  // ───────────────────────────────────────────────────────────────────────────
  TRIANGLE_IN_RECT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${plate(840, 500)}

    <text x="420" y="46" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">Look before you calculate</text>

    <rect x="200" y="90" width="440" height="240" fill="${GREY_T}" stroke="${INK}" stroke-width="3"/>
    <polygon points="200,330 640,330 490,90" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 490 90 L 490 330" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="7 6"/>

    <text x="420" y="392" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">How much of the rectangle does the triangle cover?</text>
    <text x="420" y="440" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">No numbers. Just look, and say why.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The height is dashed, vertical, and inside the triangle; the slanted side
  // is long and tempting and is not it. Drawn on a leaning triangle on purpose
  // — on an isosceles one the two look almost the same and the error never
  // shows up until the exam.
  // ───────────────────────────────────────────────────────────────────────────
  TRIANGLE_HEIGHT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 540" class="w-full h-full">
    ${plate(840, 540)}
    ${MARKERS}

    <text x="420" y="44" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">Area of a triangle</text>
    <text x="420" y="94" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">A = b × h ÷ 2</text>

    <polygon points="200,400 620,400 530,150" fill="${GREEN_T}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 530 150 L 530 400" fill="none" stroke="${KEY}" stroke-width="3" stroke-dasharray="9 7"/>
    <path d="M 530 382 L 512 382 L 512 400" fill="none" stroke="${KEY}" stroke-width="2.5"/>

    <path d="M 676 268 L 536 268" fill="none" stroke="${KEY}" stroke-width="2" marker-end="url(#t1-key)"/>
    <circle cx="678" cy="268" r="4" fill="${KEY}"/>
    <text x="688" y="275" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">height (h)</text>

    <text x="410" y="446" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">base (b)</text>
    <path d="M 200 414 L 620 414" fill="none" stroke="${KEY}" stroke-width="2"/>

    <text x="420" y="504" font-family="${FONT}" font-size="21" font-weight="bold" fill="${RED}" text-anchor="middle">The height goes straight up. The slanted side is not the height.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The best question in the task, and it works because both numbers are true
  // and they are the same temperature. Do not put 95 °F = 35 °C anywhere on
  // this slide. Take the show of hands first.
  // ───────────────────────────────────────────────────────────────────────────
  TWO_THERMOMETERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520" class="w-full h-full">
    ${plate(840, 520)}

    <text x="420" y="44" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">Two cities, two numbers</text>

    <text x="230" y="104" font-family="${FONT}" font-size="34" font-weight="bold" fill="${RED}" text-anchor="middle">35 °C</text>
    <rect x="215" y="140" width="30" height="230" rx="15" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="222" y="240" width="16" height="130" fill="${RED}"/>
    <circle cx="230" cy="392" r="30" fill="${RED}" stroke="${INK}" stroke-width="2.5"/>
    <text x="230" y="466" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Ha Noi today</text>

    <text x="610" y="104" font-family="${FONT}" font-size="34" font-weight="bold" fill="${RED}" text-anchor="middle">95 °F</text>
    <rect x="595" y="140" width="30" height="230" rx="15" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="602" y="240" width="16" height="130" fill="${RED}"/>
    <circle cx="610" cy="392" r="30" fill="${RED}" stroke="${INK}" stroke-width="2.5"/>
    <text x="610" y="466" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Texas today</text>

    <text x="420" y="230" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">Which city is</text>
    <text x="420" y="266" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}" text-anchor="middle">hotter today?</text>
    <text x="420" y="312" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="middle">Hands up for each.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The payoff. Three tie lines, and the middle one is the one the class just
  // argued about — 35 °C and 95 °F are the same mark on the wall.
  // ───────────────────────────────────────────────────────────────────────────
  TEMP_SCALES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="420" y="40" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">One temperature, two scales</text>

    <text x="322" y="76" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">°C</text>
    <text x="522" y="76" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">°F</text>

    <rect x="300" y="104" width="44" height="366" rx="10" fill="${BLUE_T}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="500" y="104" width="44" height="366" rx="10" fill="${RED_T}" stroke="${INK}" stroke-width="2.5"/>

    <path d="M 344 120 L 500 120" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>
    <path d="M 344 341 L 500 341" fill="none" stroke="${KEY}" stroke-width="3"/>
    <path d="M 344 460 L 500 460" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>

    <text x="288" y="128" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="end">100</text>
    <text x="288" y="349" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="end">35</text>
    <text x="288" y="468" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="end">0</text>

    <text x="558" y="128" font-family="${FONT}" font-size="22" font-weight="bold" fill="${RED}">212</text>
    <text x="558" y="349" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">95</text>
    <text x="558" y="468" font-family="${FONT}" font-size="22" font-weight="bold" fill="${RED}">32</text>

    <text x="628" y="128" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}">water boils</text>
    <text x="628" y="349" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}">Ha Noi and Texas</text>
    <text x="628" y="468" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}">water freezes</text>

    <rect x="150" y="496" width="540" height="52" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="532" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">F = 1.8 × c + 32</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The science link that costs nothing to teach and that they will use on the
  // way home. Light arrives at once; sound needs about three seconds a
  // kilometre. Count, divide by three, and you know.
  // ───────────────────────────────────────────────────────────────────────────
  STORM_DISTANCE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 540" class="w-full h-full">
    ${plate(840, 540)}
    ${MARKERS}

    <text x="420" y="42" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">How far away is the storm?</text>

    <path d="M 96 168 Q 72 130 108 116 Q 116 80 162 84 Q 190 58 226 82 Q 272 74 280 116 Q 314 126 300 168 Z" fill="#dbe4ec" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="196,168 168,244 200,244 172,324 236,232 202,232 226,168" fill="#ffd23f" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>

    ${person(700, 390, 1.15)}
    <path d="M 60 390 L 790 390" fill="none" stroke="${INK}" stroke-width="3"/>

    <text x="360" y="122" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}">You SEE the flash at once.</text>
    <text x="360" y="154" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}">You HEAR the bang later.</text>
    <text x="360" y="186" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}">About 3 seconds for every kilometre.</text>

    <rect x="250" y="240" width="380" height="118" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="440" y="298" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">d = t ÷ 3</text>
    <text x="440" y="336" font-family="${FONT}" font-size="19" font-weight="bold" fill="${GREEN}" text-anchor="middle">t = seconds · d = kilometres</text>

    <path d="M 200 424 L 690 424" fill="none" stroke="${KEY}" stroke-width="3" marker-start="url(#t1-key)" marker-end="url(#t1-key)"/>
    <text x="440" y="466" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">d kilometres</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Part 2's question slide. No numbers, no scale that gives it away — the two
  // tanks are drawn different shapes and the answer is a word, not a number.
  // ───────────────────────────────────────────────────────────────────────────
  POUR_QUESTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${plate(840, 500)}
    ${MARKERS}

    <text x="420" y="44" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">The same water, a different tank</text>

    ${tank(110, 120, 190, 210, 52, 130)}
    ${tank(500, 150, 260, 180, 52, 0)}

    <path d="M 350 250 Q 420 196 468 244" fill="none" stroke="${BLUE}" stroke-width="4" marker-end="url(#t1-blue)"/>

    <text x="620" y="284" font-family="${FONT}" font-size="66" font-weight="bold" fill="${KEY}" text-anchor="middle">?</text>

    <text x="420" y="404" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">Will the water be deeper, shallower, or the same?</text>
    <text x="420" y="450" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="middle">No numbers yet. Say which, and say why.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The intuition the whole of Part 2 rests on: water is a pile of centimetre
  // cubes, and a pile of cubes does not change when you move it. The grid is
  // drawn on the top surface AND up the front so both readings are available —
  // "12 in a layer, 4 layers" and "4 × 3 × 4".
  // ───────────────────────────────────────────────────────────────────────────
  WATER_LAYERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520" class="w-full h-full">
    ${plate(840, 520)}

    <text x="420" y="42" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">Water is made of centimetre cubes</text>

    ${tank(250, 96, 200, 200, 58, 150)}

    <path d="M 300 146 L 358 110 M 350 146 L 408 110 M 400 146 L 458 110" fill="none" stroke="#3d8fb0" stroke-width="1.5"/>
    <path d="M 269 134 L 469 134 M 289 122 L 489 122" fill="none" stroke="#3d8fb0" stroke-width="1.5"/>
    <path d="M 300 146 L 300 296 M 350 146 L 350 296 M 400 146 L 400 296" fill="none" stroke="#3d8fb0" stroke-width="1.5"/>
    <path d="M 250 196 L 450 196 M 250 246 L 450 246" fill="none" stroke="#3d8fb0" stroke-width="1.5"/>

    <text x="350" y="332" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="middle">4 cm</text>
    <text x="228" y="228" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}" text-anchor="end">3 cm</text>
    <path d="M 520 96 L 470 118" fill="none" stroke="${BLUE}" stroke-width="1.5"/>
    <text x="526" y="96" font-family="${FONT}" font-size="24" font-weight="bold" fill="${BLUE}">3 cm</text>

    <text x="420" y="386" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">One layer = 4 × 3 = 12 cubes</text>
    <text x="420" y="424" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Three layers = 12 × 3 = 36 cubes</text>
    <text x="420" y="476" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">V = l × w × h = 36 cm³</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Two questions and a division. Written this way because a student who can
  // answer both boxes has already done the problem — the hard part was never
  // the arithmetic, it was knowing that "how deep" is a division.
  // ───────────────────────────────────────────────────────────────────────────
  POUR_TWO_STEPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 540" class="w-full h-full">
    ${plate(840, 540)}
    ${MARKERS}

    <text x="420" y="42" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">Two questions, then you are done</text>

    <rect x="60" y="80" width="340" height="150" rx="14" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="230" y="126" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">1. How much water?</text>
    <text x="230" y="184" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">4 × 3 × 3 = 36 cm³</text>

    <rect x="440" y="80" width="340" height="150" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="610" y="126" font-family="${FONT}" font-size="22" font-weight="bold" fill="${GREEN}" text-anchor="middle">2. One layer holds?</text>
    <text x="610" y="184" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">6 × 3 = 18 cm³</text>

    <path d="M 230 246 L 380 288" fill="none" stroke="${INK}" stroke-width="3" marker-end="url(#t1-ink)"/>
    <path d="M 610 246 L 460 288" fill="none" stroke="${INK}" stroke-width="3" marker-end="url(#t1-ink)"/>

    <rect x="200" y="300" width="440" height="118" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="420" y="358" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">36 ÷ 18 = 2</text>
    <text x="420" y="396" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">so the water is 2 cm deep</text>

    <text x="420" y="466" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">Cubes altogether ÷ cubes in one layer = layers deep</text>
    <text x="420" y="500" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">The number of layers is the depth in centimetres.</text>
  </svg>`,
}
