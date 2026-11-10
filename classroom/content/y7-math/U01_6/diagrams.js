// content/y7-math/U01_6/diagrams.js
// Teaching diagrams for 1.6 Square Roots and Cube Roots, drawn to match 1.1–1.5
// so the whole unit reads as one: flat line art on paper-white, the book's
// orange for key words, blue for the forward operation and orange for the
// backward one.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so the artwork is legible on a
//    light OR dark slide and never depends on the page's text colour;
//  · every <text> is written out literally — the helpers below emit polygons
//    and lines only, because `npm run audit:svg` cannot see text produced by a
//    `${helper(...)}` call and will silently check nothing;
//  · a label keeps clear of any <rect> by more than its own font size, because
//    the audit treats a nearby baseline as living inside that box.
//
// Two numbers are deliberately absent until their own slide: 15 and 225. That
// is the patio hook posed on slide 2 and paid off on slide 9, and a diagram
// that leaks it early throws the hook away — PATIO_225 is the payoff itself.

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
const GREY_T = '#f1f5f9'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const MARKERS = `<defs>
    <marker id="m6-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${BLUE}"/></marker>
    <marker id="m6-key" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
  </defs>`

/**
 * An n × n square of unit tiles, bottom edge sitting on `yB`, centred on `cx`.
 * Shapes only — the labels underneath are written out literally in each
 * diagram so the audit can measure them.
 */
const tileSquare = (cx, yB, n, u, fill) => {
  const size = n * u
  const x0 = cx - size / 2
  const y0 = yB - size
  let out = `<rect x="${x0}" y="${y0}" width="${size}" height="${size}" fill="${fill}" stroke="${INK}" stroke-width="2.5"/>`
  for (let i = 1; i < n; i += 1) {
    out += `<line x1="${x0 + i * u}" y1="${y0}" x2="${x0 + i * u}" y2="${yB}" stroke="${INK}" stroke-width="1"/>`
    out += `<line x1="${x0}" y1="${y0 + i * u}" x2="${x0 + size}" y2="${y0 + i * u}" stroke="${INK}" stroke-width="1"/>`
  }
  return out
}

/**
 * An n × n × n cube drawn in isometric, `cx` centred, top vertex at `cy`,
 * with each visible face ruled into n strips. Polygons and lines only.
 */
const isoCube = (cx, cy, n, u) => {
  const s = n * u
  const top = `${cx},${cy} ${cx + s},${cy + s / 2} ${cx},${cy + s} ${cx - s},${cy + s / 2}`
  const left = `${cx - s},${cy + s / 2} ${cx},${cy + s} ${cx},${cy + s + s} ${cx - s},${cy + s / 2 + s}`
  const right = `${cx},${cy + s} ${cx + s},${cy + s / 2} ${cx + s},${cy + s / 2 + s} ${cx},${cy + s + s}`
  let out =
    `<polygon points="${top}" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>` +
    `<polygon points="${left}" fill="${GREY_T}" stroke="${INK}" stroke-width="2.5"/>` +
    `<polygon points="${right}" fill="${BLUE_T}" stroke="${INK}" stroke-width="2.5"/>`
  for (let i = 1; i < n; i += 1) {
    const d = i * u
    // ruling on the top face, both diagonal directions
    out += `<line x1="${cx - s + d}" y1="${cy + s / 2 - d / 2}" x2="${cx + d}" y2="${cy + s - d / 2}" stroke="${INK}" stroke-width="1"/>`
    out += `<line x1="${cx + s - d}" y1="${cy + s / 2 - d / 2}" x2="${cx - d}" y2="${cy + s - d / 2}" stroke="${INK}" stroke-width="1"/>`
    // ruling on the two side faces
    out += `<line x1="${cx - s + d}" y1="${cy + s / 2 + d / 2}" x2="${cx - s + d}" y2="${cy + s / 2 + d / 2 + s}" stroke="${INK}" stroke-width="1"/>`
    out += `<line x1="${cx + s - d}" y1="${cy + s / 2 + d / 2}" x2="${cx + s - d}" y2="${cy + s / 2 + d / 2 + s}" stroke="${INK}" stroke-width="1"/>`
    out += `<line x1="${cx - s}" y1="${cy + s / 2 + d}" x2="${cx}" y2="${cy + s + d}" stroke="${INK}" stroke-width="1"/>`
    out += `<line x1="${cx + s}" y1="${cy + s / 2 + d}" x2="${cx}" y2="${cy + s + d}" stroke="${INK}" stroke-width="1"/>`
  }
  return out
}

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // Why the word is "square". Four tile squares growing 1, 4, 9, 16 — the
  // picture the name came from, before any notation exists.
  // ───────────────────────────────────────────────────────────────────────────
  SQUARE_TILES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 252" class="w-full h-full">
    ${plate(660, 252)}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">A square number really is a square</text>

    ${tileSquare(90, 190, 1, 22, GREEN_T)}
    ${tileSquare(220, 190, 2, 22, GREEN_T)}
    ${tileSquare(380, 190, 3, 22, GREEN_T)}
    ${tileSquare(560, 190, 4, 22, GREEN_T)}

    <text x="90" y="224" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">1 × 1 = 1</text>
    <text x="220" y="224" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">2 × 2 = 4</text>
    <text x="380" y="224" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">3 × 3 = 9</text>
    <text x="560" y="224" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">4 × 4 = 16</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The twelve to know by heart. Two rows of six, the number on top in orange
  // and its square in the box below.
  // ───────────────────────────────────────────────────────────────────────────
  SQUARE_LIST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 262" class="w-full h-full">
    ${plate(660, 262)}

    <text x="330" y="30" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">The first twelve square numbers</text>

    <text x="84" y="60" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">1</text>
    <text x="180" y="60" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="276" y="60" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">3</text>
    <text x="372" y="60" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">4</text>
    <text x="468" y="60" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">5</text>
    <text x="564" y="60" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">6</text>

    <rect x="40" y="80" width="88" height="48" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="136" y="80" width="88" height="48" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="232" y="80" width="88" height="48" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="328" y="80" width="88" height="48" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="424" y="80" width="88" height="48" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="520" y="80" width="88" height="48" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="84" y="114" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">1</text>
    <text x="180" y="114" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="276" y="114" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">9</text>
    <text x="372" y="114" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">16</text>
    <text x="468" y="114" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">25</text>
    <text x="564" y="114" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">36</text>

    <text x="84" y="164" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">7</text>
    <text x="180" y="164" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">8</text>
    <text x="276" y="164" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">9</text>
    <text x="372" y="164" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">10</text>
    <text x="468" y="164" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">11</text>
    <text x="564" y="164" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">12</text>

    <rect x="40" y="184" width="88" height="48" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <rect x="136" y="184" width="88" height="48" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <rect x="232" y="184" width="88" height="48" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <rect x="328" y="184" width="88" height="48" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <rect x="424" y="184" width="88" height="48" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <rect x="520" y="184" width="88" height="48" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <text x="84" y="218" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">49</text>
    <text x="180" y="218" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">64</text>
    <text x="276" y="218" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">81</text>
    <text x="372" y="218" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">100</text>
    <text x="468" y="218" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">121</text>
    <text x="564" y="218" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">144</text>

    <text x="330" y="252" font-family="${FONT}" font-size="13" font-weight="bold" fill="${RULE}" text-anchor="middle">orange on top, its square in the box below</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The whole idea of a root in one picture: one arrow out, one arrow back.
  // Blue is the forward operation, orange is the way home.
  // ───────────────────────────────────────────────────────────────────────────
  ROOT_BOTH_WAYS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 250" class="w-full h-full">
    ${plate(660, 250)}${MARKERS}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">Squaring goes out. Square rooting comes back.</text>

    <rect x="50" y="86" width="160" height="76" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="130" y="140" font-family="${FONT}" font-size="42" font-weight="900" fill="${INK}" text-anchor="middle">15</text>

    <rect x="450" y="86" width="160" height="76" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="530" y="140" font-family="${FONT}" font-size="42" font-weight="900" fill="${INK}" text-anchor="middle">225</text>

    <path d="M 214 106 C 280 68, 380 68, 444 104" fill="none" stroke="${BLUE}" stroke-width="3" marker-end="url(#m6-blue)"/>
    <text x="330" y="70" font-family="${FONT}" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle">15 × 15</text>

    <path d="M 446 144 C 380 182, 280 182, 216 146" fill="none" stroke="${KEY}" stroke-width="3" marker-end="url(#m6-key)"/>
    <text x="330" y="202" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">√225</text>

    <text x="330" y="234" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">The square root is the number you started from.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The payoff for the patio hook. 15 along each side, 225 stones in the
  // square. Ruled with lines rather than 225 rects, so the markup stays small.
  // ───────────────────────────────────────────────────────────────────────────
  PATIO_225: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 340" class="w-full h-full">
    ${plate(660, 340)}

    <text x="330" y="30" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">Mr Bowen’s patio</text>
    <text x="330" y="58" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">15 stones along the top</text>

    <rect x="210" y="80" width="240" height="240" fill="${ORANGE_T}" stroke="${INK}" stroke-width="3"/>
    <line x1="226" y1="80" x2="226" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="242" y1="80" x2="242" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="258" y1="80" x2="258" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="274" y1="80" x2="274" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="290" y1="80" x2="290" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="306" y1="80" x2="306" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="322" y1="80" x2="322" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="338" y1="80" x2="338" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="354" y1="80" x2="354" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="370" y1="80" x2="370" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="386" y1="80" x2="386" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="402" y1="80" x2="402" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="418" y1="80" x2="418" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="434" y1="80" x2="434" y2="320" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="96" x2="450" y2="96" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="112" x2="450" y2="112" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="128" x2="450" y2="128" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="144" x2="450" y2="144" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="160" x2="450" y2="160" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="176" x2="450" y2="176" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="192" x2="450" y2="192" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="208" x2="450" y2="208" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="224" x2="450" y2="224" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="240" x2="450" y2="240" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="256" x2="450" y2="256" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="272" x2="450" y2="272" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="288" x2="450" y2="288" stroke="${INK}" stroke-width="1"/>
    <line x1="210" y1="304" x2="450" y2="304" stroke="${INK}" stroke-width="1"/>

    <rect x="264" y="172" width="132" height="56" rx="10" fill="#ffffff" stroke="${KEY}" stroke-width="3"/>
    <text x="330" y="212" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">225</text>

    <text x="196" y="206" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="end">15 down</text>
    <text x="464" y="206" font-family="${FONT}" font-size="16" font-weight="bold" fill="${GREEN}" text-anchor="start">√225 = 15</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Squared against doubled, side by side, because the class will meet both
  // this week and the little 2 looks like the 2 in "times two".
  // ───────────────────────────────────────────────────────────────────────────
  SQUARED_NOT_DOUBLED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 226" class="w-full h-full">
    ${plate(660, 226)}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">The little 2 counts the fives</text>

    <rect x="46" y="66" width="256" height="76" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="174" y="116" font-family="${FONT}" font-size="30" font-weight="900" fill="${INK}" text-anchor="middle">5 × 5 = 25</text>

    <rect x="358" y="66" width="256" height="76" rx="14" fill="${RED_T}" stroke="${RED}" stroke-width="3"/>
    <text x="486" y="116" font-family="${FONT}" font-size="30" font-weight="900" fill="${INK}" text-anchor="middle">5 × 2 = 10</text>

    <text x="174" y="176" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="middle">five squared</text>
    <text x="486" y="176" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RED}" text-anchor="middle">five doubled</text>

    <text x="330" y="210" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">Only the green one is 5².</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Why the word is "cube". Three solid cubes built from unit cubes, 1, 8, 27.
  // ───────────────────────────────────────────────────────────────────────────
  CUBE_STACKS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 252" class="w-full h-full">
    ${plate(660, 252)}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">A cube number really is a cube</text>

    ${isoCube(110, 150, 1, 20)}
    ${isoCube(290, 110, 2, 20)}
    ${isoCube(520, 70, 3, 20)}

    <text x="110" y="222" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">1 × 1 × 1 = 1</text>
    <text x="290" y="222" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">2 × 2 × 2 = 8</text>
    <text x="520" y="222" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">3 × 3 × 3 = 27</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The six to know by heart, plus 10 × 10 × 10 because it turns up constantly.
  // ───────────────────────────────────────────────────────────────────────────
  CUBE_LIST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 244" class="w-full h-full">
    ${plate(660, 244)}

    <text x="330" y="30" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">The first six cube numbers</text>

    <text x="80" y="62" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">1</text>
    <text x="180" y="62" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="280" y="62" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">3</text>
    <text x="380" y="62" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">4</text>
    <text x="480" y="62" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">5</text>
    <text x="580" y="62" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">6</text>

    <rect x="34" y="82" width="92" height="52" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="134" y="82" width="92" height="52" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="234" y="82" width="92" height="52" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="334" y="82" width="92" height="52" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="434" y="82" width="92" height="52" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="534" y="82" width="92" height="52" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="80" y="118" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">1</text>
    <text x="180" y="118" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">8</text>
    <text x="280" y="118" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">27</text>
    <text x="380" y="118" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">64</text>
    <text x="480" y="118" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">125</text>
    <text x="580" y="118" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">216</text>

    <text x="330" y="160" font-family="${FONT}" font-size="14" font-weight="bold" fill="${RULE}" text-anchor="middle">and one more that turns up everywhere</text>

    <rect x="150" y="180" width="360" height="50" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="330" y="214" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">10 × 10 × 10 = 1000</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The same out-and-back picture as ROOT_BOTH_WAYS, deliberately, so the cube
  // root reads as the same idea with a 3 on the sign rather than a new one.
  // ───────────────────────────────────────────────────────────────────────────
  CUBE_ROOT_BOTH_WAYS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 250" class="w-full h-full">
    ${plate(660, 250)}${MARKERS}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">Cubing goes out. Cube rooting comes back.</text>

    <rect x="50" y="86" width="160" height="76" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="130" y="140" font-family="${FONT}" font-size="42" font-weight="900" fill="${INK}" text-anchor="middle">5</text>

    <rect x="450" y="86" width="160" height="76" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="530" y="140" font-family="${FONT}" font-size="42" font-weight="900" fill="${INK}" text-anchor="middle">125</text>

    <path d="M 214 106 C 280 68, 380 68, 444 104" fill="none" stroke="${BLUE}" stroke-width="3" marker-end="url(#m6-blue)"/>
    <text x="330" y="70" font-family="${FONT}" font-size="16" font-weight="bold" fill="${BLUE}" text-anchor="middle">5 × 5 × 5</text>

    <path d="M 446 144 C 380 182, 280 182, 216 146" fill="none" stroke="${KEY}" stroke-width="3" marker-end="url(#m6-key)"/>
    <text x="330" y="202" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">³√125</text>

    <text x="330" y="234" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">Same sign as before, with a small 3 on it.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The book's key word "consecutive", shown twice: on plain counting numbers
  // where it is obvious, then on square numbers where it is the thing students
  // get wrong — consecutive squares are not one apart.
  // ───────────────────────────────────────────────────────────────────────────
  CONSECUTIVE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 244" class="w-full h-full">
    ${plate(660, 244)}

    <text x="330" y="30" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">Consecutive means next to each other, with nothing missed out</text>

    <text x="330" y="58" font-family="${FONT}" font-size="15" font-weight="bold" fill="${BLUE}" text-anchor="middle">consecutive numbers</text>

    <rect x="116" y="80" width="76" height="50" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="204" y="80" width="76" height="50" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="292" y="80" width="76" height="50" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="380" y="80" width="76" height="50" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <rect x="468" y="80" width="76" height="50" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="154" y="115" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">6</text>
    <text x="242" y="115" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">7</text>
    <text x="330" y="115" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">8</text>
    <text x="418" y="115" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">9</text>
    <text x="506" y="115" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">10</text>

    <text x="330" y="156" font-family="${FONT}" font-size="15" font-weight="bold" fill="${GREEN}" text-anchor="middle">consecutive square numbers</text>

    <rect x="128" y="178" width="90" height="50" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <rect x="232" y="178" width="90" height="50" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <rect x="336" y="178" width="90" height="50" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <rect x="440" y="178" width="90" height="50" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2"/>
    <text x="173" y="213" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">16</text>
    <text x="277" y="213" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">25</text>
    <text x="381" y="213" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">36</text>
    <text x="485" y="213" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">49</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Trapping a root between two whole numbers: the two squares either side of
  // 45, with the answer left open for the class.
  // ───────────────────────────────────────────────────────────────────────────
  BETWEEN_SQUARES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 232" class="w-full h-full">
    ${plate(660, 232)}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">45 is not a square number — so trap it between two that are</text>

    <rect x="52" y="66" width="164" height="66" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="134" y="112" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">36</text>

    <rect x="248" y="66" width="164" height="66" rx="14" fill="${GREY_T}" stroke="${RULE}" stroke-width="3" stroke-dasharray="8 6"/>
    <text x="330" y="112" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">45</text>

    <rect x="444" y="66" width="164" height="66" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="526" y="112" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">49</text>

    <text x="134" y="168" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="middle">√36 = 6</text>
    <text x="330" y="168" font-family="${FONT}" font-size="17" font-weight="bold" fill="${RULE}" text-anchor="middle">√45 = ?</text>
    <text x="526" y="168" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="middle">√49 = 7</text>

    <text x="330" y="208" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">36 &lt; 45 &lt; 49, so √45 is somewhere between 6 and 7.</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // 64 twice over: eight rows of eight, and a cube four along each edge. The
  // one number in the lesson that answers to both names.
  // ───────────────────────────────────────────────────────────────────────────
  SIXTY_FOUR_TWICE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 250" class="w-full h-full">
    ${plate(660, 250)}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">64 answers to both names</text>

    ${tileSquare(180, 190, 8, 16, GREEN_T)}
    ${isoCube(480, 70, 4, 16)}

    <text x="180" y="222" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="middle">8 × 8 = 64</text>
    <text x="480" y="222" font-family="${FONT}" font-size="17" font-weight="bold" fill="${BLUE}" text-anchor="middle">4 × 4 × 4 = 64</text>
  </svg>`,
}
