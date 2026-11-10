// content/y7-science/U03_earth/diagrams.js
// Teaching diagrams for "How Old Is the Earth?".
//
//   Longer clocks
//     CLOCKS        three clocks, three jobs: carbon-14, potassium-40, uranium-238
//     DINO_LAYERS   a fossil between two dated layers of volcanic ash
//   The age of the Earth
//     ZIRCON        a crystal clock: uranium in, no lead; lead builds up
//     METEORITE     a cut meteorite and its white specks, the oldest solids
//
// Split diagrams are drawn at 840×560, showcase ones at 1120×440, vote cards
// at 720×320 — the shapes those layouts give a picture (as in 3.1).
// Label <text> is written out literally so `npm run audit:svg` can measure it.
// Helpers below draw shapes only. Diagrams stay in English (house rule).

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const C14 = '#e07a1f'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const f1 = (n) => Number(n.toFixed(1))

const arrow = (x1, y1, x2, y2, color, w = 5, head = 18) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const hx = x2 - head * Math.cos(a), hy = y2 - head * Math.sin(a)
  const px = head * 0.55 * Math.sin(a), py = -head * 0.55 * Math.cos(a)
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`
}

const leader = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="4.5" fill="${KEY}"/>`

// Rows of dots for atoms in a crystal.
const dots = (x0, y0, cols, rows, gap, r, fillFor) => {
  let out = ''
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const k = j * cols + i
    out += `<circle cx="${x0 + i * gap}" cy="${y0 + j * gap}" r="${r}" fill="${fillFor(k)}" stroke="${INK}" stroke-width="1.2"/>`
  }
  return out
}

export const DIAGRAMS = {
  // ── Longer clocks ─────────────────────────────────────────────────────────
  CLOCKS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <rect x="24" y="24" width="344" height="392" rx="16" fill="#fdf1e3" stroke="${RULE}" stroke-width="2"/>
    <rect x="388" y="24" width="344" height="392" rx="16" fill="#f2ecf7" stroke="${RULE}" stroke-width="2"/>
    <rect x="752" y="24" width="344" height="392" rx="16" fill="#e2f2f6" stroke="${RULE}" stroke-width="2"/>
    <path d="M 166 70 h 60 l -30 40 l 30 40 h -60 l 30 -40 z" fill="#fff6e8" stroke="${INK}" stroke-width="3"/>
    <path d="M 176 140 h 40 l -20 -18 z" fill="${C14}"/>
    <text x="196" y="190" font-family="${FONT}" font-size="26" font-weight="bold" fill="${C14}" text-anchor="middle">carbon-14</text>
    <text x="196" y="226" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">half-life: 5 700 years</text>
    <text x="196" y="290" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">bones, wood, charcoal</text>
    <text x="196" y="320" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">things that were alive</text>
    <text x="196" y="384" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="middle">up to 50 000 years</text>
    <path d="M 520 60 h 80 l -40 50 l 40 50 h -80 l 40 -50 z" fill="#f7f1fb" stroke="${INK}" stroke-width="3"/>
    <path d="M 534 150 h 52 l -26 -24 z" fill="${PURPLE}"/>
    <text x="560" y="190" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}" text-anchor="middle">potassium-40</text>
    <text x="560" y="226" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">half-life: 1.25 billion years</text>
    <text x="560" y="290" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">volcanic rock and ash</text>
    <text x="560" y="320" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">around fossils</text>
    <text x="560" y="384" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="middle">millions of years</text>
    <path d="M 874 50 h 100 l -50 60 l 50 60 h -100 l 50 -60 z" fill="#eef8fb" stroke="${INK}" stroke-width="3"/>
    <path d="M 890 160 h 68 l -34 -30 z" fill="${TEAL}"/>
    <text x="924" y="196" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}" text-anchor="middle">uranium-238</text>
    <text x="924" y="230" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">half-life: 4.5 billion years</text>
    <text x="924" y="290" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">crystals, the oldest rocks,</text>
    <text x="924" y="320" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">meteorites</text>
    <text x="924" y="384" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}" text-anchor="middle">billions of years</text>
  </svg>`,

  DINO_LAYERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="40" y="40" width="520" height="80" fill="#e7d8bf" stroke="${INK}" stroke-width="2"/>
    <rect x="40" y="120" width="520" height="40" fill="#9a9a9a" stroke="${INK}" stroke-width="2"/>
    <rect x="40" y="160" width="520" height="190" fill="#d9b98f" stroke="${INK}" stroke-width="2"/>
    <rect x="40" y="350" width="520" height="40" fill="#9a9a9a" stroke="${INK}" stroke-width="2"/>
    <rect x="40" y="390" width="520" height="120" fill="#c9a57a" stroke="${INK}" stroke-width="2"/>
    <path d="M 140 260 q 30 -30 70 -10 q 30 -10 60 0 q 60 -20 100 10 q 20 10 50 0 q -20 30 -60 24 q -40 10 -90 0 q -60 10 -110 -6 q -20 -4 -20 -18 z" fill="#f4ecdc" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="140" cy="262" r="16" fill="#f4ecdc" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="418" cy="262" r="14" fill="#f4ecdc" stroke="${INK}" stroke-width="2.5"/>
    ${leader(600, 140, 520, 140)}
    <text x="612" y="134" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">volcanic ash</text>
    <text x="612" y="162" font-family="${FONT}" font-size="20" fill="${INK}">66 million years</text>
    ${leader(600, 270, 420, 270)}
    <text x="612" y="276" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">dinosaur fossil</text>
    ${leader(600, 370, 520, 370)}
    <text x="612" y="364" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">volcanic ash</text>
    <text x="612" y="392" font-family="${FONT}" font-size="20" fill="${INK}">68 million years</text>
  </svg>`,

  // ── The age of the Earth ──────────────────────────────────────────────────
  ZIRCON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M 200 70 l 90 70 v 220 l -90 70 l -90 -70 v -220 z" fill="#fbe7d0" stroke="${INK}" stroke-width="3"/>
    ${dots(150, 170, 4, 6, 33, 9, () => '#3aa76d')}
    <text x="200" y="476" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">when it forms</text>
    <text x="200" y="508" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">uranium, no lead</text>
    ${arrow(330, 250, 480, 250, MUTED, 4, 18)}
    <text x="405" y="236" font-family="${FONT}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">time</text>
    <path d="M 620 70 l 90 70 v 220 l -90 70 l -90 -70 v -220 z" fill="#fbe7d0" stroke="${INK}" stroke-width="3"/>
    ${dots(570, 170, 4, 6, 33, 9, (k) => ([1, 4, 6, 9, 10, 13, 15, 16, 19, 20, 22].includes(k) ? '#6b7280' : '#3aa76d'))}
    <text x="620" y="476" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">billions of years later</text>
    <text x="620" y="508" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">some uranium is now lead</text>
    <circle cx="716" cy="80" r="10" fill="#3aa76d" stroke="${INK}" stroke-width="1.2"/>
    <text x="732" y="87" font-family="${FONT}" font-size="19" fill="${INK}">uranium</text>
    <circle cx="716" cy="112" r="10" fill="#6b7280" stroke="${INK}" stroke-width="1.2"/>
    <text x="732" y="119" font-family="${FONT}" font-size="19" fill="${INK}">lead</text>
  </svg>`,

  METEORITE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <path d="M 160 120 q 120 -70 280 -40 q 170 30 200 160 q 30 140 -110 200 q -150 60 -300 0 q -150 -60 -140 -180 q 10 -90 70 -140 z" fill="#5d6168" stroke="${INK}" stroke-width="4"/>
    <circle cx="250" cy="200" r="9" fill="#9aa0a8"/><circle cx="330" cy="330" r="12" fill="#9aa0a8"/><circle cx="520" cy="190" r="10" fill="#9aa0a8"/><circle cx="560" cy="350" r="8" fill="#9aa0a8"/><circle cx="420" cy="420" r="9" fill="#9aa0a8"/>
    <circle cx="300" cy="260" r="6" fill="#9aa0a8"/><circle cx="460" cy="290" r="7" fill="#9aa0a8"/><circle cx="600" cy="250" r="6" fill="#9aa0a8"/>
    <path d="M 380 170 q 30 -20 54 4 q 10 30 -20 40 q -40 0 -34 -44 z" fill="#f4f1ea" stroke="${INK}" stroke-width="2"/>
    <path d="M 230 320 q 20 -24 50 -6 q 6 26 -24 32 q -30 -2 -26 -26 z" fill="#f4f1ea" stroke="${INK}" stroke-width="2"/>
    <path d="M 500 380 q 24 -18 44 0 q 4 22 -22 26 q -26 -4 -22 -26 z" fill="#f4f1ea" stroke="${INK}" stroke-width="2"/>
    ${leader(560, 90, 430, 180)}
    <text x="572" y="84" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">white specks (CAIs)</text>
    <text x="572" y="112" font-family="${FONT}" font-size="20" fill="${INK}">4 567 million years old</text>
    <text x="420" y="520" font-family="${FONT}" font-size="21" fill="${MUTED}" text-anchor="middle">a cut meteorite, like the one that fell in Mexico in 1969</text>
  </svg>`,
}
