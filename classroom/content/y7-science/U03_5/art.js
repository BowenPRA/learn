// content/y7-science/U03_5/art.js
// The drawn pictures of 3.5 Energy, as SVG strings, shared by the static
// diagrams (diagrams.js) and the models (the .jsx files place them with
// dangerouslySetInnerHTML on a <g>). Flat pale fills, dark ink outlines, and
// NO text: every label is written out literally where the picture is used, so
// `npm run audit:svg` can measure it.
//
// Each object is drawn about its own centre (0, 0) in a box roughly 300 × 200
// and placed with (x, y, s). The eight actions (`pose`) are stick figures
// standing on y = 50, head at y = −110, a lifted box at about y = −180.

export const INK = '#2b2b2b'
export const KEY = '#c25e12'
export const MUTED = '#5b6770'
export const TEAL = '#0087a8'
export const PURPLE = '#5c2483'
export const BLUE = '#1a5fa8'
export const GREEN = '#4a8b23'
export const RED = '#d83a2e'
export const GOLD = '#e8a317'
export const SEA = '#cfe6f5'
export const SEA_EDGE = '#5b9bd5'
export const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

// The two families on the book's table (page 107): STORES keep energy,
// TRANSFERS move it. Thermal is both.
export const STORE = TEAL
export const TRANSFER = PURPLE

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`

export const f1 = (n) => Number(n.toFixed(1))

/** A straight arrow with a solid head. */
export const arrow = (x1, y1, x2, y2, color, w = 5, head = 18) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const hx = x2 - head * Math.cos(a), hy = y2 - head * Math.sin(a)
  const px = head * 0.55 * Math.sin(a), py = -head * 0.55 * Math.cos(a)
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`
}

/** A label's leader line, ending in a dot on the thing it names. */
export const leader = (x1, y1, x2, y2, color = KEY) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="4.5" fill="${color}"/>`

/** The white plate every diagram opens with, so it reads on a dark slide. */
export const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

/* ── the eight actions ─────────────────────────────────────────────────── */

const limb = (pts, color, w = 7) =>
  `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`

const ARM_DOWN_L = [[0, -80], [-18, -52], [-22, -24]]
const ARM_DOWN_R = [[0, -80], [18, -52], [22, -24]]
const LEGS = [[[0, -20], [-18, 48]], [[0, -20], [18, 48]]]

// Each pose: the arms and legs as polylines, and the prop that makes it plain.
const POSES = {
  // run on the spot: one knee up, arms pumping, lines behind
  kinetic: () => ({
    limbs: [[[0, -80], [24, -60], [38, -84]], [[0, -80], [-20, -58], [-34, -42]], [[0, -20], [26, -4], [16, 32]], [[0, -20], [-8, 48]]],
    prop: `<path d="M -76 -92 H -50 M -84 -62 H -52 M -76 -32 H -50" stroke="${MUTED}" stroke-width="5" stroke-linecap="round"/>`,
  }),
  // eat: an apple at the mouth
  chemical: () => ({
    limbs: [[[0, -80], [26, -64], [16, -100]], ARM_DOWN_L, ...LEGS],
    prop: `<circle cx="27" cy="-106" r="11" fill="${RED}" stroke="${INK}" stroke-width="2.5"/>
      <path d="M 27 -117 q 2 -7 8 -9" stroke="${GREEN}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  }),
  // too hot: fan your face, heat rising off your head
  thermal: () => ({
    limbs: [[[0, -80], [30, -84], [38, -116]], [[0, -80], [-24, -60], [-8, -34]], ...LEGS],
    prop: `<path d="M -26 -96 q -7 10 0 14 q 7 -4 0 -14 z M 26 -128 q -6 9 0 12 q 6 -3 0 -12 z" fill="#9fd3f0" stroke="${BLUE}" stroke-width="2"/>
      <path d="M -20 -140 q -7 -9 0 -18 q 7 -9 0 -18 M 0 -144 q -7 -9 0 -18 q 7 -9 0 -18 M 20 -140 q -7 -9 0 -18 q 7 -9 0 -18" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>`,
  }),
  // stretch a rubber band between your hands
  elastic: () => ({
    limbs: [[[0, -80], [-32, -62], [-60, -50]], [[0, -80], [32, -62], [60, -50]], [[0, -20], [-22, 48]], [[0, -20], [22, 48]]],
    prop: `<path d="M -60 -54 H 60 M -60 -46 H 60" stroke="${RED}" stroke-width="3.5"/>
      ${arrow(-68, -50, -96, -50, PURPLE, 4, 12)}${arrow(68, -50, 96, -50, PURPLE, 4, 12)}`,
  }),
  // lift a box up high, over your head
  gravitational: () => ({
    limbs: [[[0, -80], [-30, -112], [-24, -150]], [[0, -80], [30, -112], [24, -150]], ...LEGS],
    prop: `<rect x="-30" y="-182" width="60" height="34" rx="4" fill="#d9b98f" stroke="${INK}" stroke-width="3"/>
      ${arrow(56, -40, 56, -150, TEAL, 5, 16)}`,
  }),
  // draw a zig-zag of lightning in the air
  electrical: () => ({
    limbs: [[[0, -80], [32, -94], [24, -114], [50, -136]], ARM_DOWN_L, ...LEGS],
    prop: `<path d="M 66 -184 L 50 -154 L 64 -154 L 52 -124 L 80 -162 L 66 -162 L 76 -184 Z" fill="#ffd45c" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`,
  }),
  // a hand cupped to your ear, the sound coming in
  sound: () => ({
    limbs: [[[0, -80], [-28, -86], [-22, -112]], ARM_DOWN_R, ...LEGS],
    prop: `<path d="M -42 -122 q -8 10 0 20 M -54 -130 q -14 18 0 36 M -66 -138 q -20 26 0 52" fill="none" stroke="${KEY}" stroke-width="4" stroke-linecap="round"/>`,
  }),
  // open your hands like a flash of light beside your face
  light: () => ({
    limbs: [[[0, -80], [-30, -92], [-40, -120]], [[0, -80], [30, -92], [40, -120]], ...LEGS],
    prop: [-1, 1].map((side) => [-60, -25, 10, 45, 80].map((deg) => {
      const a = ((deg - 90) * Math.PI) / 180
      const cx = 44 * side, cy = -128
      return `<line x1="${f1(cx + side * 12 * Math.cos(a))}" y1="${f1(cy + 12 * Math.sin(a))}" x2="${f1(cx + side * 24 * Math.cos(a))}" y2="${f1(cy + 24 * Math.sin(a))}" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>`
    }).join('')).join(''),
  }),
}

/** A stick figure doing one energy's action (kinetic, chemical, …). */
export function pose(key, x, y, s = 1, color = INK) {
  const p = POSES[key]()
  const body = `${p.limbs.map((l) => limb(l, color)).join('')}
    ${limb([[0, -92], [0, -20]], color)}
    <circle cx="0" cy="-110" r="17" fill="${color}"/>
    ${p.prop}`
  return at(x, y, s, body)
}

/* ── objects ───────────────────────────────────────────────────────────── */

/** An AA battery, standing up. */
export const battery = (x, y, s = 1) => at(x, y, s, `
  <rect x="-13" y="-84" width="26" height="14" rx="3" fill="#c3c9d1" stroke="${INK}" stroke-width="3"/>
  <rect x="-36" y="-72" width="72" height="150" rx="10" fill="#3d4650"/>
  <path d="M -36 -30 V -62 Q -36 -72 -26 -72 H 26 Q 36 -72 36 -62 V -30 Z" fill="#d9822b"/>
  <rect x="-36" y="-72" width="72" height="150" rx="10" fill="none" stroke="${INK}" stroke-width="3.5"/>
  <path d="M 0 -64 V -40 M -12 -52 H 12 M -11 58 H 11" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`)

/** A battery lying down, three bars of charge: "energy kept". */
export const charged = (x, y, s = 1) => at(x, y, s, `
  <rect x="-110" y="-56" width="200" height="112" rx="18" fill="#ffffff" stroke="${INK}" stroke-width="6"/>
  <rect x="90" y="-24" width="20" height="48" rx="5" fill="${INK}"/>
  <rect x="-92" y="-38" width="52" height="76" rx="6" fill="${GREEN}"/>
  <rect x="-32" y="-38" width="52" height="76" rx="6" fill="${GREEN}"/>
  <rect x="28" y="-38" width="44" height="76" rx="6" fill="${GREEN}"/>`)

/** A kettle, steaming. */
export const kettle = (x, y, s = 1) => at(x, y, s, `
  <path d="M -64 -30 Q -122 -22 -112 26 Q -106 48 -68 44" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M 58 -6 L 108 -50 L 118 -38 L 66 24 Z" fill="#dfe6ee" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -72 62 L -62 -40 Q -60 -62 -40 -62 L 40 -62 Q 60 -62 62 -40 L 72 62 Z" fill="#dfe6ee" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -38 -62 Q 0 -84 38 -62" fill="#c3c9d1" stroke="${INK}" stroke-width="4"/>
  <circle cx="0" cy="-80" r="9" fill="${INK}"/>
  <rect x="-80" y="60" width="160" height="18" rx="7" fill="#3d4650"/>
  <circle cx="0" cy="40" r="7" fill="${RED}"/>
  <path d="M 116 -64 q -12 -16 0 -32 q 12 -16 0 -32 M 140 -58 q -12 -16 0 -32 q 12 -16 0 -32" fill="none" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>`)

/** A yellow bus, side view, facing right. */
export const bus = (x, y, s = 1) => at(x, y, s, `
  <rect x="-150" y="-64" width="300" height="112" rx="18" fill="#f6c445" stroke="${INK}" stroke-width="4"/>
  <rect x="-150" y="10" width="300" height="10" fill="${INK}" opacity="0.75"/>
  <rect x="-132" y="-48" width="44" height="40" rx="5" fill="${SEA}" stroke="${INK}" stroke-width="2.5"/>
  <rect x="-78" y="-48" width="44" height="40" rx="5" fill="${SEA}" stroke="${INK}" stroke-width="2.5"/>
  <rect x="-24" y="-48" width="44" height="40" rx="5" fill="${SEA}" stroke="${INK}" stroke-width="2.5"/>
  <rect x="30" y="-48" width="44" height="40" rx="5" fill="${SEA}" stroke="${INK}" stroke-width="2.5"/>
  <path d="M 88 -48 H 128 Q 138 -48 140 -38 L 144 -4 H 88 Z" fill="${SEA}" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="141" cy="30" r="8" fill="#fff3b0" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="-90" cy="50" r="27" fill="#3d4650" stroke="${INK}" stroke-width="3"/>
  <circle cx="-90" cy="50" r="10" fill="#c3c9d1"/>
  <circle cx="92" cy="50" r="27" fill="#3d4650" stroke="${INK}" stroke-width="3"/>
  <circle cx="92" cy="50" r="10" fill="#c3c9d1"/>`)

/** A book standing on its end, cover towards us. */
export const book = (x, y, s = 1) => at(x, y, s, `
  <rect x="-36" y="-50" width="72" height="100" rx="5" fill="${RED}" stroke="${INK}" stroke-width="4"/>
  <rect x="-36" y="-50" width="14" height="100" rx="3" fill="#a52a20"/>
  <rect x="-12" y="-30" width="38" height="16" rx="3" fill="#ffffff"/>
  <rect x="-36" y="-50" width="72" height="100" rx="5" fill="none" stroke="${INK}" stroke-width="4"/>`)

/** A mug of coffee. Hot: steam rising. */
export const mug = (x, y, s = 1, hot = true) => at(x, y, s, `
  <path d="M 46 -26 q 36 0 34 30 q -2 30 -38 30" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
  <path d="M -54 -50 L -46 52 Q -44 64 -32 64 L 32 64 Q 44 64 46 52 L 54 -50 Z" fill="#f4efe9" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="0" cy="-50" rx="54" ry="9" fill="#6b3d1f" stroke="${INK}" stroke-width="3.5"/>
  ${hot ? `<path d="M -26 -70 q -12 -16 0 -32 q 12 -16 0 -32 M 0 -74 q -12 -16 0 -32 q 12 -16 0 -32 M 26 -70 q -12 -16 0 -32 q 12 -16 0 -32" fill="none" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>` : ''}`)

/** A banana. */
export const banana = (x, y, s = 1) => at(x, y, s, `
  <path d="M -96 -40 Q -70 44 6 48 Q 74 50 100 -10 Q 64 22 6 18 Q -50 14 -76 -50 Z" fill="#f3d34a" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -66 -18 Q -26 30 42 30" fill="none" stroke="#c9a524" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M -96 -40 L -104 -52 L -86 -58 L -76 -50 Z" fill="#6b4a2a" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="100" cy="-10" r="5" fill="#6b4a2a"/>`)

/** A guitar, lying flat, its strings shaking. */
export const guitar = (x, y, s = 1) => at(x, y, s, `
  <rect x="30" y="-10" width="120" height="20" fill="#8a5a2b" stroke="${INK}" stroke-width="3"/>
  <rect x="146" y="-18" width="34" height="36" rx="6" fill="#5b3a1c" stroke="${INK}" stroke-width="3"/>
  <circle cx="-74" cy="0" r="56" fill="#d9822b" stroke="${INK}" stroke-width="4"/>
  <circle cx="-4" cy="0" r="44" fill="#d9822b" stroke="${INK}" stroke-width="4"/>
  <circle cx="-74" cy="0" r="53" fill="#d9822b"/>
  <circle cx="-4" cy="0" r="41" fill="#d9822b"/>
  <circle cx="-22" cy="0" r="17" fill="#3d2a17"/>
  <rect x="-96" y="-14" width="10" height="28" rx="2" fill="#5b3a1c"/>
  <path d="M -92 -6 H 160 M -92 0 H 160 M -92 6 H 160" stroke="#f4efe9" stroke-width="2"/>
  <path d="M -54 -40 q 10 -8 20 0 M -60 -56 q 16 -12 32 0 M -54 40 q 10 8 20 0 M -60 56 q 16 12 32 0" fill="none" stroke="${KEY}" stroke-width="4" stroke-linecap="round"/>`)

/** A torch (flashlight), shining to the right. */
export const torch = (x, y, s = 1) => at(x, y, s, `
  <path d="M 30 -22 L 150 -76 L 150 76 L 30 22 Z" fill="#fff3b0"/>
  <path d="M 160 -40 h 24 M 160 0 h 30 M 160 40 h 24" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>
  <rect x="-134" y="-20" width="124" height="40" rx="9" fill="#3d4650" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -10 -20 L 30 -32 L 30 32 L -10 20 Z" fill="${MUTED}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <rect x="28" y="-32" width="7" height="64" fill="#fff3b0" stroke="${INK}" stroke-width="2.5"/>
  <rect x="-84" y="-27" width="22" height="9" rx="3" fill="${RED}"/>`)

/** A bow pulled back, ready to shoot. */
export const bow = (x, y, s = 1) => at(x, y, s, `
  <path d="M 40 -90 L -54 0 L 40 90" fill="none" stroke="${INK}" stroke-width="3"/>
  <path d="M 40 -90 Q 110 0 40 90" fill="none" stroke="#8a5a2b" stroke-width="11" stroke-linecap="round"/>
  <line x1="-66" y1="0" x2="128" y2="0" stroke="${MUTED}" stroke-width="6"/>
  <path d="M 150 0 L 124 -13 L 124 13 Z" fill="${MUTED}"/>
  <path d="M -66 0 l -16 -13 M -66 0 l -16 13 M -54 0 l -16 -13 M -54 0 l -16 13" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>`)

/** A football rolling to the right. */
export const football = (x, y, s = 1) => at(x, y, s, `
  <path d="M -150 -30 H -84 M -162 0 H -80 M -150 30 H -84" stroke="#9aa7b4" stroke-width="7" stroke-linecap="round"/>
  <line x1="-170" y1="62" x2="110" y2="62" stroke="#9aa7b4" stroke-width="4" stroke-dasharray="10 9"/>
  <circle cx="0" cy="0" r="60" fill="#ffffff" stroke="${INK}" stroke-width="4"/>
  <path d="M 0 -20 L 19 -6 L 12 16 L -12 16 L -19 -6 Z" fill="${INK}"/>
  <path d="M 0 -20 V -40 M 19 -6 L 38 -12 M 12 16 L 24 33 M -12 16 L -24 33 M -19 -6 L -38 -12" stroke="${INK}" stroke-width="3"/>
  <path d="M -10 -58 L 10 -58 L 6 -44 L -6 -44 Z M 44 -30 L 56 -14 L 46 -4 L 38 -18 Z M -44 -30 L -56 -14 L -46 -4 L -38 -18 Z M 22 48 L 36 40 L 40 52 L 28 58 Z M -22 48 L -36 40 L -40 52 L -28 58 Z" fill="${INK}"/>`)

/** A rock on the edge of a cliff, the sea far below. */
export const cliffRock = (x, y, s = 1) => at(x, y, s, `
  <rect x="40" y="70" width="130" height="34" fill="${SEA}"/>
  <path d="M 40 70 q 16 -8 32 0 t 32 0 t 32 0 t 32 0" fill="none" stroke="${SEA_EDGE}" stroke-width="3"/>
  <path d="M -170 -28 L 30 -28 L 44 4 L 34 36 L 60 76 L 52 104 L -170 104 Z" fill="#c9b79c" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -170 -28 H 28" stroke="${GREEN}" stroke-width="8"/>
  <path d="M -6 -28 Q -10 -70 20 -74 Q 54 -72 52 -40 Q 50 -28 36 -28 Z" fill="#8f9aa6" stroke="${INK}" stroke-width="4"/>
  <path d="M 120 -28 V 66" stroke="${TEAL}" stroke-width="4" stroke-dasharray="9 8"/>
  <path d="M 106 -28 H 134 M 106 66 H 134" stroke="${TEAL}" stroke-width="4"/>`)

/** A plug in the wall, a cable, and a phone charging. */
export const charging = (x, y, s = 1) => at(x, y, s, `
  <rect x="-176" y="-56" width="84" height="112" rx="12" fill="#ffffff" stroke="${INK}" stroke-width="4"/>
  <rect x="-114" y="-28" width="64" height="56" rx="9" fill="#e9edf1" stroke="${INK}" stroke-width="4"/>
  <path d="M -50 0 C 10 0 4 64 70 56 C 104 52 112 24 118 6" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <rect x="112" y="-74" width="66" height="116" rx="11" fill="#3d4650" stroke="${INK}" stroke-width="3.5"/>
  <rect x="119" y="-63" width="52" height="86" rx="5" fill="${SEA}"/>
  <path d="M 150 -54 L 134 -20 L 146 -20 L 136 10 L 160 -28 L 148 -28 L 158 -54 Z" fill="#ffd45c" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`)

/** A bowl of rice with chopsticks. */
export const rice = (x, y, s = 1) => at(x, y, s, `
  <path d="M 26 -46 L 136 -112 M 42 -38 L 148 -96" stroke="#8a5a2b" stroke-width="8" stroke-linecap="round"/>
  <path d="M -72 0 Q -62 -62 0 -64 Q 62 -62 72 0 Z" fill="#ffffff" stroke="${INK}" stroke-width="4"/>
  <path d="M -40 -26 l 8 -3 M -16 -44 l 8 -3 M 10 -30 l 8 -3 M 34 -46 l 8 -3 M -24 -14 l 8 -3 M 30 -14 l 8 -3 M 4 -54 l 8 -3" stroke="#c9c1ae" stroke-width="5" stroke-linecap="round"/>
  <path d="M -94 0 H 94 Q 88 72 0 76 Q -88 72 -94 0 Z" fill="${SEA}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -86 24 H 86" stroke="${BLUE}" stroke-width="5"/>
  <rect x="-32" y="74" width="64" height="12" rx="4" fill="${SEA}" stroke="${INK}" stroke-width="3"/>`)

/** A drum, hit with two sticks. */
export const drum = (x, y, s = 1) => at(x, y, s, `
  <path d="M -42 -46 L -116 -104 M 34 -50 L 104 -112" stroke="#8a5a2b" stroke-width="9" stroke-linecap="round"/>
  <path d="M -72 -30 V 50 Q 0 76 72 50 V -30 Z" fill="${RED}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -72 -12 L -42 46 L -12 -8 L 18 52 L 48 -6 L 72 36" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="0" cy="-30" rx="72" ry="18" fill="#f4efe9" stroke="${INK}" stroke-width="4"/>
  <path d="M -22 -64 q 22 -12 44 0 M -38 -82 q 38 -18 76 0" fill="none" stroke="${KEY}" stroke-width="4.5" stroke-linecap="round"/>`)

/** A spring, squashed flat under a heavy block. */
export const spring = (x, y, s = 1) => at(x, y, s, `
  <rect x="-90" y="62" width="180" height="16" rx="3" fill="${MUTED}"/>
  <path d="M -44 62 L 44 52 L -44 42 L 44 32 L -44 22 L 44 12 L -44 2" fill="none" stroke="#5b6770" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
  <rect x="-64" y="-58" width="128" height="60" rx="6" fill="#3d4650" stroke="${INK}" stroke-width="4"/>
  ${arrow(-36, -118, -36, -66, PURPLE, 6, 18)}${arrow(36, -118, 36, -66, PURPLE, 6, 18)}`)

/** A light bulb, switched on. */
export const bulb = (x, y, s = 1) => at(x, y, s, `
  ${[-150, -120, -90, -60, -30, 0, 180].map((deg) => {
    const a = (deg * Math.PI) / 180
    return `<line x1="${f1(70 * Math.cos(a))}" y1="${f1(-28 + 70 * Math.sin(a))}" x2="${f1(96 * Math.cos(a))}" y2="${f1(-28 + 96 * Math.sin(a))}" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/>`
  }).join('')}
  <path d="M 0 -84 C -48 -84 -60 -34 -36 -4 C -26 10 -22 20 -22 34 L 22 34 C 22 20 26 10 36 -4 C 60 -34 48 -84 0 -84 Z" fill="#fff3b0" stroke="${INK}" stroke-width="4"/>
  <path d="M -12 30 L -12 -12 L -4 -26 L 4 -12 L 12 -26 L 12 30" fill="none" stroke="${KEY}" stroke-width="3.5" stroke-linejoin="round"/>
  <rect x="-24" y="34" width="48" height="34" rx="5" fill="#c3c9d1" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -24 46 H 24 M -24 56 H 24" stroke="${INK}" stroke-width="2.5"/>`)

/** A water tower: a tank of water held up high. */
export const waterTower = (x, y, s = 1) => at(x, y, s, `
  <line x1="-120" y1="104" x2="120" y2="104" stroke="${MUTED}" stroke-width="4"/>
  <path d="M -54 104 L -32 -6 M 54 104 L 32 -6 M -46 50 L 46 50 M -50 78 L 50 78" stroke="#5b6770" stroke-width="7" stroke-linecap="round"/>
  <rect x="-72" y="-88" width="144" height="84" rx="12" fill="#e9edf1"/>
  <rect x="-66" y="-60" width="132" height="50" rx="6" fill="${SEA}"/>
  <path d="M -66 -60 H 66" stroke="${SEA_EDGE}" stroke-width="3"/>
  <rect x="-72" y="-88" width="144" height="84" rx="12" fill="none" stroke="${INK}" stroke-width="4"/>
  <path d="M -80 -88 L 0 -124 L 80 -88 Z" fill="#c3c9d1" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`)

/** A car, moving to the right. */
export const car = (x, y, s = 1) => at(x, y, s, `
  <path d="M -176 -18 H -128 M -186 10 H -126 M -176 38 H -128" stroke="#9aa7b4" stroke-width="7" stroke-linecap="round"/>
  <path d="M -110 40 V 0 Q -110 -12 -96 -14 L -60 -18 L -30 -58 Q -24 -64 -14 -64 L 50 -64 Q 60 -64 66 -56 L 96 -18 L 120 -14 Q 134 -10 134 4 V 40 Z" fill="${BLUE}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -48 -20 L -24 -52 H 10 V -20 Z M 22 -20 V -52 H 50 L 76 -20 Z" fill="${SEA}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="-62" cy="42" r="24" fill="#3d4650" stroke="${INK}" stroke-width="3"/>
  <circle cx="-62" cy="42" r="9" fill="#c3c9d1"/>
  <circle cx="86" cy="42" r="24" fill="#3d4650" stroke="${INK}" stroke-width="3"/>
  <circle cx="86" cy="42" r="9" fill="#c3c9d1"/>`)

/** A pile of coal. */
export const coal = (x, y, s = 1) => at(x, y, s, `
  <path d="M -120 60 L -96 18 L -60 6 L -40 30 L -50 60 Z" fill="#2f3438" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M -60 60 L -44 22 L -6 -10 L 30 8 L 40 60 Z" fill="#3d4650" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M 30 60 L 40 14 L 78 0 L 112 30 L 120 60 Z" fill="#2f3438" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M -30 -10 L -8 -50 L 30 -40 L 40 -6 L 6 6 Z" fill="#454e57" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M -16 -38 l 12 -4 M 52 24 l 14 -4 M -84 30 l 12 -4" stroke="#8f9aa6" stroke-width="3" stroke-linecap="round"/>`)

/** A dam holding a lake up high, a river far below. */
export const dam = (x, y, s = 1) => at(x, y, s, `
  <path d="M -170 -50 H -20 V 90 H -170 Z" fill="${SEA}"/>
  <path d="M -170 -50 H -22" stroke="${SEA_EDGE}" stroke-width="4"/>
  <path d="M 40 70 H 170 V 90 H 40 Z" fill="${SEA}"/>
  <path d="M 40 70 H 170" stroke="${SEA_EDGE}" stroke-width="4"/>
  <path d="M -26 -70 H 6 L 46 90 H -26 Z" fill="#c3c9d1" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -170 90 H 170" stroke="${INK}" stroke-width="4"/>`)

/** A clock face showing `hour` o'clock (for the story strips). */
export const clock = (x, y, hour, r = 30) => {
  const a = ((hour % 12) * 30 * Math.PI) / 180
  const ticks = [0, 90, 180, 270].map((d) => {
    const t = (d * Math.PI) / 180
    return `<line x1="${f1(x + (r - 7) * Math.sin(t))}" y1="${f1(y - (r - 7) * Math.cos(t))}" x2="${f1(x + (r - 2) * Math.sin(t))}" y2="${f1(y - (r - 2) * Math.cos(t))}" stroke="${INK}" stroke-width="3"/>`
  }).join('')
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${INK}" stroke-width="4"/>${ticks}
    <line x1="${x}" y1="${y}" x2="${x}" y2="${f1(y - r * 0.72)}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <line x1="${x}" y1="${y}" x2="${f1(x + r * 0.5 * Math.sin(a))}" y2="${f1(y - r * 0.5 * Math.cos(a))}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
}

/** A thermometer reading `level` (0 = cold, 1 = hot). */
export const thermometer = (x, y, level, s = 1) => at(x, y, s, `
  <rect x="-12" y="-90" width="24" height="120" rx="12" fill="#ffffff" stroke="${INK}" stroke-width="3.5"/>
  <rect x="-5" y="${f1(20 - 100 * level)}" width="10" height="${f1(20 + 100 * level)}" rx="5" fill="${level > 0.5 ? RED : BLUE}"/>
  <circle cx="0" cy="44" r="20" fill="${level > 0.5 ? RED : BLUE}" stroke="${INK}" stroke-width="3.5"/>
  <path d="M 12 -70 h 8 M 12 -40 h 8 M 12 -10 h 8" stroke="${INK}" stroke-width="2.5"/>`)
