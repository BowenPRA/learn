// content/y7-math/U02_1/diagrams.js
// Teaching diagrams for 2.1 Constructing Expressions, drawn to match 1.1–1.6 so
// Unit 2 reads as a continuation rather than a new book: flat line art on
// paper-white, dark ink outlines, the book's orange for every key word.
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
// EVERY DIAGRAM HERE IS DRAWN AT ROUGHLY 1.5:1, not the 2:1+ strip that looks
// natural on a wide monitor. A `split` slide's media panel is roughly SQUARE in
// project mode (~600×580 at 1366×768), so a 2.3:1 drawing is width-limited and
// renders at half the height it could, with white bands above and below and
// label text at ~13px effective. 840×540ish, with 21–52px type, fills it.
//
// The eight diagrams are the eight hinges of the lesson, in order:
//   PARTICLE_DROP     a real quantity nobody can count — the science bridge
//   COFFEE_WALL       c − 50 will not finish, and that IS the answer
//   NOTATION          3s means 3 × s, ab means a × b, s over 2 means s ÷ 2
//   FOUR_PHRASES      more / less / times / half, and the operation each picks
//   TOTAL_DIFFERENCE  the workbook's two words for combining two letters
//   ORDER_FLIP        "h less than t" is written t − h, backwards from the words
//   SUBTRACT_VS_FROM  "subtract 4" against "subtract from 4"
//   ORDER_OF_OPS      "subtract the result from 25" is 25 − 3n
//
// The last three are the lesson. They are pure English, they cost marks every
// year in Exercise 2.1 Q7f, Q9 and Q11, and the arithmetic in them never goes
// past 5 × 2 on purpose — nothing should compete with the wording.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'
const BLUE_T = '#eef4fb'
const GREY_T = '#f1f5f9'
const WATER = '#dbeafe'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// markerUnits="userSpaceOnUse" — otherwise the head scales with stroke-width
// and a 3px line grows a 21px arrowhead that swallows the label beside it.
const MARKERS = `<defs>
    <marker id="m21-key" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    <marker id="m21-blue" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
    <marker id="m21-green" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${GREEN}"/></marker>
  </defs>`

/**
 * A hexagonal packing of particle circles filling a disc — shapes only.
 * Used once, for the drop of water, and deliberately too many to count.
 */
const particles = (cx, cy, rDrop, rP, pitch) => {
  let out = ''
  const rows = Math.ceil((rDrop * 2) / (pitch * 0.87))
  for (let r = -rows; r <= rows; r += 1) {
    const y = cy + r * pitch * 0.87
    const offset = r % 2 === 0 ? 0 : pitch / 2
    for (let c = -rows; c <= rows; c += 1) {
      const x = cx + c * pitch + offset
      if ((x - cx) ** 2 + (y - cy) ** 2 > (rDrop - rP - 6) ** 2) continue
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rP}" fill="#ffffff" stroke="${BLUE}" stroke-width="1.6"/>`
    }
  }
  return out
}

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // The science bridge, and the hook. Science 2.1 told them matter is made of
  // particles; this asks them to count the particles in one drop, which is
  // impossible and is the point. The letter arrives on the next slide as the
  // way out, not as a new rule. No number appears anywhere on this drawing.
  // ───────────────────────────────────────────────────────────────────────────
  PARTICLE_DROP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 580" class="w-full h-full">
    ${plate(840, 580)}

    <text x="420" y="48" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">One drop of water</text>

    <circle cx="420" cy="310" r="196" fill="${WATER}" stroke="${INK}" stroke-width="3"/>
    ${particles(420, 310, 196, 5.5, 18)}
    <circle cx="420" cy="310" r="196" fill="none" stroke="${INK}" stroke-width="3"/>

    <text x="420" y="552" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">There IS a number of particles in this drop. Nobody can count it.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE WALL, and the whole point of the section. The first two rows finish;
  // the third does not, and the orange line underneath says so out loud,
  // because the sticking point is never "what does c mean" — it is that c − 50
  // does not equal anything, so students assume they have failed.
  // ───────────────────────────────────────────────────────────────────────────
  COFFEE_WALL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520" class="w-full h-full">
    ${plate(840, 520)}
    ${MARKERS}

    <text x="420" y="46" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">Mr Bowen drinks 50 ml from every cup</text>

    <text x="145" y="92" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}" text-anchor="middle">In the cup</text>
    <text x="400" y="92" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}" text-anchor="middle">Drink 50 ml</text>
    <text x="700" y="92" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}" text-anchor="middle">Left in the cup</text>

    <rect x="40" y="124" width="210" height="80" rx="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="40" y="220" width="210" height="80" rx="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="40" y="316" width="210" height="80" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="145" y="177" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">200 ml</text>
    <text x="145" y="273" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">300 ml</text>
    <text x="145" y="369" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">c ml</text>

    <rect x="275" y="124" width="250" height="80" rx="12" fill="#ffffff" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="275" y="220" width="250" height="80" rx="12" fill="#ffffff" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="275" y="316" width="250" height="80" rx="12" fill="#ffffff" stroke="${KEY}" stroke-width="3"/>
    <text x="400" y="177" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">200 − 50</text>
    <text x="400" y="273" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">300 − 50</text>
    <text x="400" y="369" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">c − 50</text>

    <line x1="540" y1="164" x2="586" y2="164" stroke="${BLUE}" stroke-width="3" marker-end="url(#m21-blue)"/>
    <line x1="540" y1="260" x2="586" y2="260" stroke="${BLUE}" stroke-width="3" marker-end="url(#m21-blue)"/>
    <line x1="540" y1="356" x2="586" y2="356" stroke="${KEY}" stroke-width="3" marker-end="url(#m21-key)"/>

    <rect x="600" y="124" width="200" height="80" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <rect x="600" y="220" width="200" height="80" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <rect x="600" y="316" width="200" height="80" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="700" y="177" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">150 ml</text>
    <text x="700" y="273" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">250 ml</text>
    <text x="700" y="369" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">c − 50</text>

    <text x="420" y="445" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">The last row will not finish — and that is the answer.</text>
    <text x="420" y="484" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">You cannot work out c − 50 until somebody tells you c.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The writing conventions, which the workbook states only in a Tip and then
  // assumes for the rest of the unit: "2m means 2 × m" and "w over 2 means
  // w ÷ 2". Exercise 2.1 Q11d (three times a multiplied by b) and Q12d (7pq)
  // are unanswerable without this, so it gets a slide rather than a footnote.
  // ───────────────────────────────────────────────────────────────────────────
  NOTATION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 550" class="w-full h-full">
    ${plate(840, 550)}
    ${MARKERS}

    <text x="420" y="46" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">Algebra has a shorter way of writing it</text>

    <text x="250" y="92" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}" text-anchor="middle">What it means</text>
    <text x="660" y="92" font-family="${FONT}" font-size="21" font-weight="bold" fill="${BLUE}" text-anchor="middle">How we write it</text>

    <rect x="60" y="124" width="380" height="90" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="60" y="234" width="380" height="90" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="60" y="344" width="380" height="90" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <text x="250" y="182" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">3 × s</text>
    <text x="250" y="292" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">a × b</text>
    <text x="250" y="402" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">s ÷ 2</text>

    <line x1="462" y1="169" x2="516" y2="169" stroke="${KEY}" stroke-width="3" marker-end="url(#m21-key)"/>
    <line x1="462" y1="279" x2="516" y2="279" stroke="${KEY}" stroke-width="3" marker-end="url(#m21-key)"/>
    <line x1="462" y1="389" x2="516" y2="389" stroke="${KEY}" stroke-width="3" marker-end="url(#m21-key)"/>

    <rect x="540" y="124" width="240" height="90" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="540" y="234" width="240" height="90" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="540" y="344" width="240" height="90" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="660" y="184" font-family="${FONT}" font-size="40" font-weight="900" fill="${KEY}" text-anchor="middle">3s</text>
    <text x="660" y="294" font-family="${FONT}" font-size="40" font-weight="900" fill="${KEY}" text-anchor="middle">ab</text>
    <text x="660" y="382" font-family="${FONT}" font-size="32" font-weight="900" fill="${KEY}" text-anchor="middle">s</text>
    <line x1="634" y1="393" x2="686" y2="393" stroke="${KEY}" stroke-width="3"/>
    <text x="660" y="424" font-family="${FONT}" font-size="32" font-weight="900" fill="${KEY}" text-anchor="middle">2</text>

    <text x="420" y="484" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">We stop writing ×. We never stop writing + or −.</text>
    <text x="420" y="520" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">The number goes in front: we write 3s, never s3.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The four phrases of change, all built on one starting letter so the class
  // compares the ENGLISH rather than the numbers. Salt in a beaker, because
  // dissolving is the science they had last week and because s grams of salt
  // is still s grams after it has disappeared into the water.
  // ───────────────────────────────────────────────────────────────────────────
  FOUR_PHRASES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520" class="w-full h-full">
    ${plate(840, 520)}
    ${MARKERS}

    <text x="420" y="46" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">Mr Bowen stirs s grams of salt into his beaker</text>

    <rect x="30" y="78" width="430" height="72" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="30" y="166" width="430" height="72" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="30" y="254" width="430" height="72" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="30" y="342" width="430" height="72" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>

    <text x="245" y="122" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">two grams more than Mr Bowen</text>
    <text x="245" y="210" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">three times as much as Mr Bowen</text>
    <text x="245" y="298" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">six grams less than Mr Bowen</text>
    <text x="245" y="386" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">half as much as Mr Bowen</text>

    <line x1="482" y1="114" x2="536" y2="114" stroke="${KEY}" stroke-width="3" marker-end="url(#m21-key)"/>
    <line x1="482" y1="202" x2="536" y2="202" stroke="${KEY}" stroke-width="3" marker-end="url(#m21-key)"/>
    <line x1="482" y1="290" x2="536" y2="290" stroke="${KEY}" stroke-width="3" marker-end="url(#m21-key)"/>
    <line x1="482" y1="378" x2="536" y2="378" stroke="${KEY}" stroke-width="3" marker-end="url(#m21-key)"/>

    <rect x="560" y="78" width="250" height="72" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="560" y="166" width="250" height="72" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="560" y="254" width="250" height="72" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="560" y="342" width="250" height="72" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>

    <text x="685" y="126" font-family="${FONT}" font-size="36" font-weight="900" fill="${KEY}" text-anchor="middle">s + 2</text>
    <text x="685" y="214" font-family="${FONT}" font-size="36" font-weight="900" fill="${KEY}" text-anchor="middle">3s</text>
    <text x="685" y="302" font-family="${FONT}" font-size="36" font-weight="900" fill="${KEY}" text-anchor="middle">s − 6</text>
    <text x="685" y="390" font-family="${FONT}" font-size="36" font-weight="900" fill="${KEY}" text-anchor="middle">s ÷ 2</text>

    <text x="420" y="464" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">The English words choose the operation for you.</text>
    <text x="420" y="499" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">Every answer still starts from s, because every sentence did.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Total and difference — the workbook's own two words in Q13, used there
  // without ever being defined. Two beakers rather than the book's two pieces
  // of wood, so the picture belongs to the science unit as well.
  // ───────────────────────────────────────────────────────────────────────────
  TOTAL_DIFFERENCE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 480" class="w-full h-full">
    ${plate(840, 480)}

    <text x="420" y="46" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">Two beakers, two letters</text>

    <rect x="60" y="84" width="440" height="66" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <text x="280" y="128" font-family="${FONT}" font-size="32" font-weight="900" fill="${INK}" text-anchor="middle">a ml</text>

    <rect x="60" y="178" width="270" height="66" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="195" y="222" font-family="${FONT}" font-size="32" font-weight="900" fill="${INK}" text-anchor="middle">b ml</text>

    <rect x="60" y="290" width="340" height="92" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="230" y="324" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">The total</text>
    <text x="230" y="364" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">a + b</text>

    <rect x="440" y="290" width="340" height="92" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="610" y="324" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">The difference</text>
    <text x="610" y="364" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">a − b</text>

    <text x="420" y="434" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">Total means add them. Difference means subtract them.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The word-order flip. The NUMBER version sits on top, because the class
  // already knows "5 less than 12" is 7 and will not accept −7. The letter
  // version underneath is then the same sentence, not a second rule.
  // ───────────────────────────────────────────────────────────────────────────
  ORDER_FLIP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 490" class="w-full h-full">
    ${plate(840, 490)}
    ${MARKERS}

    <text x="420" y="48" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">The words arrive in the opposite order</text>

    <rect x="45" y="100" width="330" height="100" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <text x="210" y="165" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">5 less than 12</text>
    <line x1="396" y1="150" x2="450" y2="150" stroke="${GREEN}" stroke-width="3" marker-end="url(#m21-green)"/>
    <rect x="470" y="100" width="330" height="100" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="635" y="167" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">12 − 5 = 7</text>

    <rect x="45" y="240" width="330" height="100" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <text x="210" y="305" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">h less than t</text>
    <line x1="396" y1="290" x2="450" y2="290" stroke="${KEY}" stroke-width="3" marker-end="url(#m21-key)"/>
    <rect x="470" y="240" width="330" height="100" rx="12" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="635" y="307" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">t − h</text>

    <text x="420" y="400" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}" text-anchor="middle">Not 5 − 12.   Not h − t.</text>
    <text x="420" y="445" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">You write the starting number first, even though you say it last.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Exercise 2.1 Q9 in one picture. Two sentences differing by a single word,
  // and a value of x that lands the two answers on opposite sides of zero, so
  // the difference between them cannot be waved away. Each sentence is set on
  // two lines with the changed half coloured, so the eye can find the word.
  // ───────────────────────────────────────────────────────────────────────────
  SUBTRACT_VS_FROM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 600" class="w-full h-full">
    ${plate(840, 600)}

    <text x="420" y="46" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}" text-anchor="middle">One extra word. A completely different answer.</text>

    <rect x="25" y="76" width="390" height="440" rx="14" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <text x="220" y="120" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">Multiply x by 5</text>
    <text x="220" y="152" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">and subtract 4.</text>
    <text x="220" y="250" font-family="${FONT}" font-size="52" font-weight="900" fill="${BLUE}" text-anchor="middle">5x − 4</text>
    <text x="220" y="320" font-family="${FONT}" font-size="20" fill="${INK}" text-anchor="middle">Try it with x = 2</text>
    <text x="220" y="374" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">10 − 4 = 6</text>
    <text x="220" y="434" font-family="${FONT}" font-size="20" fill="${INK}" text-anchor="middle">start at 10, take 4 away</text>

    <rect x="425" y="76" width="390" height="440" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="620" y="120" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">Multiply x by 5</text>
    <text x="620" y="152" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">and subtract from 4.</text>
    <text x="620" y="250" font-family="${FONT}" font-size="52" font-weight="900" fill="${KEY}" text-anchor="middle">4 − 5x</text>
    <text x="620" y="320" font-family="${FONT}" font-size="20" fill="${INK}" text-anchor="middle">Try it with x = 2</text>
    <text x="620" y="374" font-family="${FONT}" font-size="32" font-weight="bold" fill="${RED}" text-anchor="middle">4 − 10 = −6</text>
    <text x="620" y="434" font-family="${FONT}" font-size="20" fill="${INK}" text-anchor="middle">start at 4, take 10 away</text>

    <text x="420" y="564" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">The word from tells you where to start counting down.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Exercise 2.1 Q7f, which combines both traps at once: the multiplication
  // must happen first (the workbook's Tip says so twice and explains it never),
  // and then "subtract the result FROM 25" flips the order. Building 3n as a
  // single named block is what makes 25 − 3n obvious rather than memorised.
  // ───────────────────────────────────────────────────────────────────────────
  ORDER_OF_OPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 540" class="w-full h-full">
    ${plate(840, 540)}
    ${MARKERS}

    <text x="420" y="46" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">Multiply n by 3, then subtract the result from 25</text>

    <rect x="60" y="100" width="150" height="86" rx="12" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>
    <text x="135" y="160" font-family="${FONT}" font-size="40" font-weight="900" fill="${INK}" text-anchor="middle">n</text>

    <line x1="228" y1="143" x2="278" y2="143" stroke="${BLUE}" stroke-width="3" marker-end="url(#m21-blue)"/>
    <text x="253" y="126" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">× 3</text>

    <rect x="300" y="100" width="190" height="86" rx="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <text x="395" y="162" font-family="${FONT}" font-size="40" font-weight="900" fill="${BLUE}" text-anchor="middle">3n</text>

    <text x="650" y="154" font-family="${FONT}" font-size="22" font-weight="bold" fill="${BLUE}" text-anchor="middle">this is "the result"</text>

    <text x="420" y="288" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Now subtract the result from 25</text>

    <rect x="230" y="318" width="380" height="104" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="420" y="388" font-family="${FONT}" font-size="52" font-weight="900" fill="${KEY}" text-anchor="middle">25 − 3n</text>

    <text x="420" y="474" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}" text-anchor="middle">Not 3n − 25. "From 25" means you start at 25.</text>
    <text x="420" y="512" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">The multiplication always happens before the subtraction.</text>
  </svg>`,
}
