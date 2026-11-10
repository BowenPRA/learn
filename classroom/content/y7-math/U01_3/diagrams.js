// content/y7-math/U01_3/diagrams.js
// Teaching diagrams for 1.3 Lowest Common Multiples, drawn to match 1.1 and 1.2
// so the whole unit reads as one: flat line art on paper-white, the book's
// orange for key words, blue for one number's multiples and red for the other.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so the artwork is legible on a
//    light OR dark slide and never depends on the page's text colour;
//  · every <text> is written out literally — helpers draw shapes and leader
//    lines only, because `npm run audit:svg` cannot see text produced by a
//    `${helper(...)}` call and will silently check nothing;
//  · label text lives above/below the artwork, never on top of it.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const RULE = '#7c8a95'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const MARKERS = `<defs>
    <marker id="m3-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
    <marker id="m3-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
  </defs>`

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // What a MULTIPLE is: count up in 4s. The multiples of 4 are 4 × 1, 4 × 2,
  // 4 × 3, … — the jumps make it clear a multiple is what you land on, not the
  // number you count by.
  // ───────────────────────────────────────────────────────────────────────────
  MULTIPLES_OF_4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 210" class="w-full h-full">
    ${plate(660, 210)}${MARKERS}

    <text x="330" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">The multiples of 4 — count up in 4s</text>

    <path d="M 52 96 Q 99 62 147 96" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
    <path d="M 147 96 Q 194 62 241 96" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
    <path d="M 241 96 Q 288 62 336 96" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
    <path d="M 336 96 Q 383 62 430 96" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
    <path d="M 430 96 Q 477 62 525 96" fill="none" stroke="${BLUE}" stroke-width="2.5"/>
    <path d="M 525 96 Q 572 62 620 96" fill="none" stroke="${BLUE}" stroke-width="2.5"/>

    <text x="99" y="66" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="middle">+4</text>
    <text x="194" y="66" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="middle">+4</text>
    <text x="288" y="66" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="middle">+4</text>
    <text x="383" y="66" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="middle">+4</text>
    <text x="477" y="66" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="middle">+4</text>
    <text x="572" y="66" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="middle">+4</text>

    <line x1="30" y1="104" x2="640" y2="104" stroke="${INK}" stroke-width="3" stroke-linecap="round" marker-end="url(#m3-ink)"/>
    <circle cx="52" cy="104" r="4" fill="${INK}"/>
    <circle cx="147" cy="104" r="4.5" fill="${BLUE}"/>
    <circle cx="241" cy="104" r="4.5" fill="${BLUE}"/>
    <circle cx="336" cy="104" r="4.5" fill="${BLUE}"/>
    <circle cx="430" cy="104" r="4.5" fill="${BLUE}"/>
    <circle cx="525" cy="104" r="4.5" fill="${BLUE}"/>
    <circle cx="620" cy="104" r="4.5" fill="${BLUE}"/>

    <text x="52" y="132" font-family="${FONT}" font-size="18" font-weight="900" fill="${INK}" text-anchor="middle">0</text>
    <text x="147" y="132" font-family="${FONT}" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle">4</text>
    <text x="241" y="132" font-family="${FONT}" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle">8</text>
    <text x="336" y="132" font-family="${FONT}" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle">12</text>
    <text x="430" y="132" font-family="${FONT}" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle">16</text>
    <text x="525" y="132" font-family="${FONT}" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle">20</text>
    <text x="620" y="132" font-family="${FONT}" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle">24</text>

    <text x="147" y="160" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RULE}" text-anchor="middle">4 × 1</text>
    <text x="241" y="160" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RULE}" text-anchor="middle">4 × 2</text>
    <text x="336" y="160" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RULE}" text-anchor="middle">4 × 3</text>
    <text x="430" y="160" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RULE}" text-anchor="middle">4 × 4</text>
    <text x="525" y="160" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RULE}" text-anchor="middle">4 × 5</text>
    <text x="620" y="160" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RULE}" text-anchor="middle">4 × 6</text>

    <text x="330" y="192" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">a multiple is a number you land on: 4, 8, 12, 16, 20, 24, …</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Common multiples: write out both lists and find the numbers that appear in
  // BOTH. The matched chips are orange, joined across the two lists so it is
  // obvious they are the same number.
  // ───────────────────────────────────────────────────────────────────────────
  COMMON_MULTIPLES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 300" class="w-full h-full">
    ${plate(660, 300)}

    <text x="330" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">Write both lists — which numbers are in both?</text>

    <path d="M 330 134 L 256 190" fill="none" stroke="${KEY}" stroke-width="2" stroke-dasharray="4 4"/>
    <path d="M 552 134 L 404 190" fill="none" stroke="${KEY}" stroke-width="2" stroke-dasharray="4 4"/>

    <text x="150" y="52" font-family="${FONT}" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="start">Multiples of 4</text>
    <rect x="150" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="224" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="298" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="372" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="446" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="520" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="182" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="256" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="330" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">12</text>
    <text x="404" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">16</text>
    <text x="478" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">20</text>
    <text x="552" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">24</text>

    <text x="150" y="170" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="start">Multiples of 6</text>
    <rect x="150" y="190" width="64" height="52" rx="8" fill="#fdeef0" stroke="${RED}" stroke-width="2"/>
    <rect x="224" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <rect x="298" y="190" width="64" height="52" rx="8" fill="#fdeef0" stroke="${RED}" stroke-width="2"/>
    <rect x="372" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="182" y="224" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="256" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">12</text>
    <text x="330" y="224" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">18</text>
    <text x="404" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">24</text>

    <text x="330" y="282" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">12 and 24 are in both lists — they are the common multiples</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Lowest common multiple: the SMALLEST of the common multiples. Same two
  // lists, but now 12 is ringed green and tagged as the LCM.
  // ───────────────────────────────────────────────────────────────────────────
  LCM_LISTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 300" class="w-full h-full">
    ${plate(660, 300)}

    <text x="330" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">The lowest common multiple is the smallest match</text>

    <text x="150" y="52" font-family="${FONT}" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="start">Multiples of 4</text>
    <rect x="150" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="224" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="296" y="68" width="68" height="56" rx="9" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3.5"/>
    <rect x="372" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="446" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="520" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="182" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="256" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">8</text>
    <text x="330" y="105" font-family="${FONT}" font-size="24" font-weight="900" fill="${GREEN}" text-anchor="middle">12</text>
    <text x="404" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">16</text>
    <text x="478" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">20</text>
    <text x="552" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">24</text>

    <text x="150" y="170" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="start">Multiples of 6</text>
    <rect x="150" y="190" width="64" height="52" rx="8" fill="#fdeef0" stroke="${RED}" stroke-width="2"/>
    <rect x="222" y="188" width="68" height="56" rx="9" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3.5"/>
    <rect x="298" y="190" width="64" height="52" rx="8" fill="#fdeef0" stroke="${RED}" stroke-width="2"/>
    <rect x="372" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="182" y="224" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="256" y="225" font-family="${FONT}" font-size="24" font-weight="900" fill="${GREEN}" text-anchor="middle">12</text>
    <text x="330" y="224" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">18</text>
    <text x="404" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">24</text>

    <rect x="212" y="262" width="236" height="30" rx="8" fill="${GREEN}"/>
    <text x="330" y="283" font-family="${FONT}" font-size="17" font-weight="900" fill="#ffffff" text-anchor="middle">LCM of 4 and 6 = 12</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Why the flashing-lights hook works: the red light every 4 s and the blue
  // light every 6 s only meet again where their counts line up — at 12 and 24.
  // The LCM is the first time both cycles coincide.
  // ───────────────────────────────────────────────────────────────────────────
  LIGHTS_ALIGN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 280" class="w-full h-full">
    ${plate(680, 280)}

    <text x="340" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">Both lights flash together every 12 seconds</text>

    <line x1="356" y1="56" x2="356" y2="232" stroke="${GREEN}" stroke-width="8" opacity="0.16"/>
    <line x1="632" y1="56" x2="632" y2="232" stroke="${GREEN}" stroke-width="8" opacity="0.16"/>

    <text x="40" y="98" font-family="${FONT}" font-size="14" font-weight="bold" fill="${RED}" text-anchor="start">Red: every 4 s</text>
    <line x1="52" y1="112" x2="656" y2="112" stroke="${RULE}" stroke-width="2"/>
    <circle cx="56" cy="112" r="8" fill="${RED}"/>
    <circle cx="152" cy="112" r="8" fill="${RED}"/>
    <circle cx="248" cy="112" r="8" fill="${RED}"/>
    <circle cx="356" cy="112" r="10" fill="${RED}" stroke="${GREEN}" stroke-width="3"/>
    <circle cx="440" cy="112" r="8" fill="${RED}"/>
    <circle cx="536" cy="112" r="8" fill="${RED}"/>
    <circle cx="632" cy="112" r="10" fill="${RED}" stroke="${GREEN}" stroke-width="3"/>

    <text x="40" y="170" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" text-anchor="start">Blue: every 6 s</text>
    <line x1="52" y1="184" x2="656" y2="184" stroke="${RULE}" stroke-width="2"/>
    <circle cx="56" cy="184" r="8" fill="${BLUE}"/>
    <circle cx="200" cy="184" r="8" fill="${BLUE}"/>
    <circle cx="356" cy="184" r="10" fill="${BLUE}" stroke="${GREEN}" stroke-width="3"/>
    <circle cx="488" cy="184" r="8" fill="${BLUE}"/>
    <circle cx="632" cy="184" r="10" fill="${BLUE}" stroke="${GREEN}" stroke-width="3"/>

    <text x="56" y="228" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle">0</text>
    <text x="356" y="228" font-family="${FONT}" font-size="15" font-weight="900" fill="${GREEN}" text-anchor="middle">12 s</text>
    <text x="632" y="228" font-family="${FONT}" font-size="15" font-weight="900" fill="${GREEN}" text-anchor="middle">24 s</text>

    <text x="340" y="262" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">12 is the lowest common multiple of 4 and 6 — the first time they meet</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The book's worked example, done as the list method students copy: write the
  // multiples of 6 and of 9, ring the first number in both. The LCM of 6 and 9
  // is 18. This is the Draw This.
  // ───────────────────────────────────────────────────────────────────────────
  METHOD_69: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 300" class="w-full h-full">
    ${plate(660, 300)}

    <text x="330" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">Worked example: the LCM of 6 and 9</text>

    <text x="150" y="52" font-family="${FONT}" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="start">Multiples of 6</text>
    <rect x="150" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="224" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="296" y="68" width="68" height="56" rx="9" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3.5"/>
    <rect x="372" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="446" y="70" width="64" height="52" rx="8" fill="#eef4fb" stroke="${BLUE}" stroke-width="2"/>
    <rect x="520" y="70" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="182" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">6</text>
    <text x="256" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">12</text>
    <text x="330" y="105" font-family="${FONT}" font-size="24" font-weight="900" fill="${GREEN}" text-anchor="middle">18</text>
    <text x="404" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">24</text>
    <text x="478" y="104" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">30</text>
    <text x="552" y="104" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">36</text>

    <text x="150" y="170" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="start">Multiples of 9</text>
    <rect x="150" y="190" width="64" height="52" rx="8" fill="#fdeef0" stroke="${RED}" stroke-width="2"/>
    <rect x="222" y="188" width="68" height="56" rx="9" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3.5"/>
    <rect x="298" y="190" width="64" height="52" rx="8" fill="#fdeef0" stroke="${RED}" stroke-width="2"/>
    <rect x="372" y="190" width="64" height="52" rx="8" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="182" y="224" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
    <text x="256" y="225" font-family="${FONT}" font-size="24" font-weight="900" fill="${GREEN}" text-anchor="middle">18</text>
    <text x="330" y="224" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">27</text>
    <text x="404" y="224" font-family="${FONT}" font-size="22" font-weight="900" fill="${KEY}" text-anchor="middle">36</text>

    <rect x="212" y="262" width="236" height="30" rx="8" fill="${GREEN}"/>
    <text x="330" y="283" font-family="${FONT}" font-size="17" font-weight="900" fill="#ffffff" text-anchor="middle">LCM of 6 and 9 = 18</text>
  </svg>`,
}
