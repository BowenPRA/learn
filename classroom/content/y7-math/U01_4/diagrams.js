// content/y7-math/U01_4/diagrams.js
// Teaching diagrams for 1.4 Highest Common Factors, drawn to match 1.1–1.3 so
// the whole unit reads as one: flat line art on paper-white, the book's orange
// for key words, blue for one number's list and red for the other, green for
// the answer.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so the artwork is legible on a
//    light OR dark slide and never depends on the page's text colour;
//  · every <text> is written out literally — helpers draw shapes and leader
//    lines only, because `npm run audit:svg` cannot see text produced by a
//    `${helper(...)}` call and will silently check nothing;
//  · label text lives above/below the artwork, never on top of it, and keeps
//    at least ~20px clear of any <rect> so the audit does not read it as
//    living inside that box.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const RULE = '#7c8a95'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'
const BLUE_T = '#eef4fb'
const RED_T = '#fdeef0'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const MARKERS = `<defs>
    <marker id="m4-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
    <marker id="m4-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${GREEN}"/></marker>
  </defs>`

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // What a FACTOR is, via the book's own method: hunt for the pairs that
  // multiply to 12, then read the factors off the pairs. Three pair boxes on
  // top, the six factors underneath — so the list is visibly finite.
  // ───────────────────────────────────────────────────────────────────────────
  FACTOR_PAIRS_12: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 278" class="w-full h-full">
    ${plate(660, 278)}

    <text x="330" y="32" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">The factors of 12 — what divides into 12 exactly</text>
    <text x="330" y="60" font-family="${FONT}" font-size="14" font-weight="bold" fill="${RULE}" text-anchor="middle">find every pair that multiplies to 12</text>

    <rect x="55" y="78" width="170" height="54" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="245" y="78" width="170" height="54" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="435" y="78" width="170" height="54" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="140" y="114" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">1 × 12</text>
    <text x="330" y="114" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">2 × 6</text>
    <text x="520" y="114" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">3 × 4</text>

    <text x="330" y="172" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">so the factors of 12 are:</text>

    <rect x="83" y="196" width="74" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="167" y="196" width="74" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="251" y="196" width="74" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="335" y="196" width="74" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="419" y="196" width="74" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="503" y="196" width="74" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="120" y="231" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">1</text>
    <text x="204" y="231" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="288" y="231" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    <text x="372" y="231" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="456" y="231" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">6</text>
    <text x="540" y="231" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">12</text>

    <text x="330" y="269" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">six factors — and the list stops at 12</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // FACTOR: it divides IN. Six numbers fan into a single 12. Paired with
  // LANDS_ON below on the compare slide — the two are only useful together.
  // ───────────────────────────────────────────────────────────────────────────
  DIVIDES_IN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 222" class="w-full h-full">
    ${plate(460, 222)}${MARKERS}

    <text x="230" y="30" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="middle">A factor divides IN</text>

    <rect x="42" y="52" width="56" height="40" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="106" y="52" width="56" height="40" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="170" y="52" width="56" height="40" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="234" y="52" width="56" height="40" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="298" y="52" width="56" height="40" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="362" y="52" width="56" height="40" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="70" y="80" font-family="${FONT}" font-size="19" font-weight="900" fill="${INK}" text-anchor="middle">1</text>
    <text x="134" y="80" font-family="${FONT}" font-size="19" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="198" y="80" font-family="${FONT}" font-size="19" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    <text x="262" y="80" font-family="${FONT}" font-size="19" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="326" y="80" font-family="${FONT}" font-size="19" font-weight="900" fill="${INK}" text-anchor="middle">6</text>
    <text x="390" y="80" font-family="${FONT}" font-size="19" font-weight="900" fill="${INK}" text-anchor="middle">12</text>

    <line x1="70" y1="96" x2="166" y2="126" stroke="${GREEN}" stroke-width="2" marker-end="url(#m4-green)"/>
    <line x1="134" y1="96" x2="192" y2="126" stroke="${GREEN}" stroke-width="2" marker-end="url(#m4-green)"/>
    <line x1="198" y1="96" x2="218" y2="126" stroke="${GREEN}" stroke-width="2" marker-end="url(#m4-green)"/>
    <line x1="262" y1="96" x2="242" y2="126" stroke="${GREEN}" stroke-width="2" marker-end="url(#m4-green)"/>
    <line x1="326" y1="96" x2="268" y2="126" stroke="${GREEN}" stroke-width="2" marker-end="url(#m4-green)"/>
    <line x1="390" y1="96" x2="294" y2="126" stroke="${GREEN}" stroke-width="2" marker-end="url(#m4-green)"/>

    <rect x="150" y="132" width="160" height="52" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="230" y="170" font-family="${FONT}" font-size="30" font-weight="900" fill="${GREEN}" text-anchor="middle">12</text>

    <text x="230" y="208" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">12 ÷ 4 = 3 with nothing left over</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // MULTIPLE: you land ON it. Same number, opposite direction — the jumps go
  // outwards and the arrow leaves the picture, which is the whole point.
  // ───────────────────────────────────────────────────────────────────────────
  LANDS_ON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 222" class="w-full h-full">
    ${plate(460, 222)}${MARKERS}

    <text x="230" y="30" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="middle">A multiple is what you land ON</text>

    <path d="M 50 118 Q 95 82 140 118" fill="none" stroke="${RED}" stroke-width="2.5"/>
    <path d="M 140 118 Q 185 82 230 118" fill="none" stroke="${RED}" stroke-width="2.5"/>
    <path d="M 230 118 Q 275 82 320 118" fill="none" stroke="${RED}" stroke-width="2.5"/>
    <path d="M 320 118 Q 365 82 410 118" fill="none" stroke="${RED}" stroke-width="2.5"/>

    <text x="95" y="80" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RED}" text-anchor="middle">+12</text>
    <text x="185" y="80" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RED}" text-anchor="middle">+12</text>
    <text x="275" y="80" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RED}" text-anchor="middle">+12</text>
    <text x="365" y="80" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RED}" text-anchor="middle">+12</text>

    <line x1="30" y1="126" x2="440" y2="126" stroke="${INK}" stroke-width="3" stroke-linecap="round" marker-end="url(#m4-ink)"/>
    <circle cx="50" cy="126" r="4" fill="${INK}"/>
    <circle cx="140" cy="126" r="5" fill="${RED}"/>
    <circle cx="230" cy="126" r="5" fill="${RED}"/>
    <circle cx="320" cy="126" r="5" fill="${RED}"/>
    <circle cx="410" cy="126" r="5" fill="${RED}"/>

    <text x="50" y="154" font-family="${FONT}" font-size="18" font-weight="900" fill="${INK}" text-anchor="middle">0</text>
    <text x="140" y="154" font-family="${FONT}" font-size="18" font-weight="900" fill="${RED}" text-anchor="middle">12</text>
    <text x="230" y="154" font-family="${FONT}" font-size="18" font-weight="900" fill="${RED}" text-anchor="middle">24</text>
    <text x="320" y="154" font-family="${FONT}" font-size="18" font-weight="900" fill="${RED}" text-anchor="middle">36</text>
    <text x="410" y="154" font-family="${FONT}" font-size="18" font-weight="900" fill="${RED}" text-anchor="middle">48</text>

    <text x="230" y="196" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">and it keeps going for ever</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Common factors: write out both lists and ring the numbers in BOTH. Same
  // shape as 1.3's COMMON_MULTIPLES on purpose — the class already knows how to
  // read this picture, so only the word changes.
  // ───────────────────────────────────────────────────────────────────────────
  COMMON_FACTORS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 300" class="w-full h-full">
    ${plate(660, 300)}

    <text x="330" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">Which numbers are in both lists?</text>

    <text x="113" y="52" font-family="${FONT}" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="start">Factors of 12</text>
    <rect x="113" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="187" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="261" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="335" y="70" width="64" height="52" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="409" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="483" y="70" width="64" height="52" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="145" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">1</text>
    <text x="219" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">2</text>
    <text x="293" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">3</text>
    <text x="367" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="441" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">6</text>
    <text x="515" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">12</text>

    <text x="113" y="170" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="start">Factors of 18</text>
    <rect x="113" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="187" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="261" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="335" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="409" y="190" width="64" height="52" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <rect x="483" y="190" width="64" height="52" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <text x="145" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">1</text>
    <text x="219" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">2</text>
    <text x="293" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">3</text>
    <text x="367" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">6</text>
    <text x="441" y="224" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
    <text x="515" y="224" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">18</text>

    <text x="330" y="282" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">1, 2, 3 and 6 are in both — the common factors</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Highest common factor: the BIGGEST of the common factors. Same two lists,
  // but now 6 is ringed green and banner-tagged as the HCF.
  // ───────────────────────────────────────────────────────────────────────────
  HCF_LISTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 300" class="w-full h-full">
    ${plate(660, 300)}

    <text x="330" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">The highest common factor is the biggest match</text>

    <text x="113" y="52" font-family="${FONT}" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="start">Factors of 12</text>
    <rect x="113" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="187" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="261" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="335" y="70" width="64" height="52" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="407" y="68" width="68" height="56" rx="9" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3.5"/>
    <rect x="483" y="70" width="64" height="52" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="145" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">1</text>
    <text x="219" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">2</text>
    <text x="293" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">3</text>
    <text x="367" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="441" y="105" font-family="${FONT}" font-size="24" font-weight="900" fill="${GREEN}" text-anchor="middle">6</text>
    <text x="515" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">12</text>

    <text x="113" y="170" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="start">Factors of 18</text>
    <rect x="113" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="187" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="261" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="333" y="188" width="68" height="56" rx="9" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3.5"/>
    <rect x="409" y="190" width="64" height="52" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <rect x="483" y="190" width="64" height="52" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <text x="145" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">1</text>
    <text x="219" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">2</text>
    <text x="293" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">3</text>
    <text x="367" y="225" font-family="${FONT}" font-size="24" font-weight="900" fill="${GREEN}" text-anchor="middle">6</text>
    <text x="441" y="224" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
    <text x="515" y="224" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">18</text>

    <rect x="212" y="262" width="236" height="30" rx="8" fill="${GREEN}"/>
    <text x="330" y="283" font-family="${FONT}" font-size="17" font-weight="900" fill="#ffffff" text-anchor="middle">HCF of 12 and 18 = 6</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The book's worked example (Workbook p.14), done as the list method students
  // copy: all the factors of 24, all the factors of 80, ring the biggest number
  // in both. The HCF of 24 and 80 is 8. This is the Draw This.
  // ───────────────────────────────────────────────────────────────────────────
  METHOD_24_80: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 306" class="w-full h-full">
    ${plate(660, 306)}

    <text x="330" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">Worked example: the HCF of 24 and 80</text>

    <text x="70" y="52" font-family="${FONT}" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="start">Factors of 24</text>
    <rect x="70" y="70" width="58" height="50" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="136" y="70" width="58" height="50" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="202" y="70" width="58" height="50" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="268" y="70" width="58" height="50" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="334" y="70" width="58" height="50" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="398" y="68" width="62" height="54" rx="9" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3.5"/>
    <rect x="466" y="70" width="58" height="50" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="532" y="70" width="58" height="50" rx="8" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="99" y="103" font-family="${FONT}" font-size="21" font-weight="900" fill="${KEY}" text-anchor="middle">1</text>
    <text x="165" y="103" font-family="${FONT}" font-size="21" font-weight="900" fill="${KEY}" text-anchor="middle">2</text>
    <text x="231" y="103" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="297" y="103" font-family="${FONT}" font-size="21" font-weight="900" fill="${KEY}" text-anchor="middle">4</text>
    <text x="363" y="103" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="429" y="104" font-family="${FONT}" font-size="23" font-weight="900" fill="${GREEN}" text-anchor="middle">8</text>
    <text x="495" y="103" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">12</text>
    <text x="561" y="103" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">24</text>

    <text x="330" y="150" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">1, 2, 4 and 8 are in both lists</text>

    <text x="33" y="176" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="start">Factors of 80</text>
    <rect x="33" y="194" width="54" height="50" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="93" y="194" width="54" height="50" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="153" y="194" width="54" height="50" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="213" y="194" width="54" height="50" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <rect x="271" y="192" width="58" height="54" rx="9" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3.5"/>
    <rect x="333" y="194" width="54" height="50" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <rect x="393" y="194" width="54" height="50" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <rect x="453" y="194" width="54" height="50" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <rect x="513" y="194" width="54" height="50" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <rect x="573" y="194" width="54" height="50" rx="8" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <text x="60" y="227" font-family="${FONT}" font-size="21" font-weight="900" fill="${KEY}" text-anchor="middle">1</text>
    <text x="120" y="227" font-family="${FONT}" font-size="21" font-weight="900" fill="${KEY}" text-anchor="middle">2</text>
    <text x="180" y="227" font-family="${FONT}" font-size="21" font-weight="900" fill="${KEY}" text-anchor="middle">4</text>
    <text x="240" y="227" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">5</text>
    <text x="300" y="228" font-family="${FONT}" font-size="23" font-weight="900" fill="${GREEN}" text-anchor="middle">8</text>
    <text x="360" y="227" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">10</text>
    <text x="420" y="227" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">16</text>
    <text x="480" y="227" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">20</text>
    <text x="540" y="227" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">40</text>
    <text x="600" y="227" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle">80</text>

    <rect x="212" y="266" width="236" height="30" rx="8" fill="${GREEN}"/>
    <text x="330" y="287" font-family="${FONT}" font-size="17" font-weight="900" fill="#ffffff" text-anchor="middle">HCF of 24 and 80 = 8</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The payoff for the opening question: 8 identical packs, 3 pencils and 5
  // stickers in every one. Eight boxes saying the same thing is the point —
  // "identical" is the word the problem turns on.
  // ───────────────────────────────────────────────────────────────────────────
  PACKS_24_40: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 292" class="w-full h-full">
    ${plate(680, 292)}

    <text x="340" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">8 packs — 3 pencils and 5 stickers in each</text>

    <rect x="30" y="56" width="140" height="76" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="190" y="56" width="140" height="76" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="350" y="56" width="140" height="76" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="510" y="56" width="140" height="76" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="100" y="88" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3 pencils</text>
    <text x="260" y="88" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3 pencils</text>
    <text x="420" y="88" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3 pencils</text>
    <text x="580" y="88" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3 pencils</text>
    <text x="100" y="114" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">5 stickers</text>
    <text x="260" y="114" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">5 stickers</text>
    <text x="420" y="114" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">5 stickers</text>
    <text x="580" y="114" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">5 stickers</text>

    <rect x="30" y="146" width="140" height="76" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="190" y="146" width="140" height="76" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="350" y="146" width="140" height="76" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="510" y="146" width="140" height="76" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="100" y="178" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3 pencils</text>
    <text x="260" y="178" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3 pencils</text>
    <text x="420" y="178" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3 pencils</text>
    <text x="580" y="178" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3 pencils</text>
    <text x="100" y="204" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">5 stickers</text>
    <text x="260" y="204" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">5 stickers</text>
    <text x="420" y="204" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">5 stickers</text>
    <text x="580" y="204" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">5 stickers</text>

    <text x="340" y="256" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">24 ÷ 8 = 3 pencils and 40 ÷ 8 = 5 stickers</text>
    <text x="340" y="280" font-family="${FONT}" font-size="16" font-weight="bold" fill="${GREEN}" text-anchor="middle">with nothing left over</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Word problem 1, drawn to scale so "cut into equal pieces" is visible rather
  // than only readable. Deliberately shows NO cuts — the question is how long
  // each piece is, and the picture must not answer it.
  // ───────────────────────────────────────────────────────────────────────────
  RIBBONS_36_48: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 236" class="w-full h-full">
    ${plate(660, 236)}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">Cut both into equal pieces — nothing left over</text>

    <text x="60" y="58" font-family="${FONT}" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="start">Ribbon A — 36 cm</text>
    <rect x="60" y="74" width="360" height="36" rx="7" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>

    <text x="60" y="140" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="start">Ribbon B — 48 cm</text>
    <rect x="60" y="156" width="480" height="36" rx="7" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>

    <text x="330" y="224" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">the pieces must be as long as possible — how long is one piece?</text>
  </svg>`,
}
