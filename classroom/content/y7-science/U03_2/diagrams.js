// content/y7-science/U03_2/diagrams.js
// Teaching diagrams for 3.2 Formation of the Solar System (Learner's Book pp. 85–90).
//
//   Starter
//     ANS_SIZE / ANS_MASS — Getting started Q1 as a vote: a large size or a large mass?
//     OPTIONS             — Getting started Q2: Earth, Jupiter, the Sun, Neptune (photos)
//   How can we know?
//     CAKE_CLUES          — Mr Bowen's cake: a hypothesis, three clues, and the vote key
//     CAKE_VERDICT        — the clues sorted: support or contradict
//   The facts (the evidence)
//     SOLAR_SYSTEM        — the book's p. 86 diagram, redrawn: eight orbits, one way round
//     ORBIT_SPIN          — Draw This: orbit, spin, axis
//     SIDE_VIEW           — the Clementine photo: Saturn, Mars and Mercury in a line (photo)
//   How it formed
//     LOOP                — more mass → stronger gravity → pulls in more
//     STAR_PLANET         — the Sun and Jupiter drawn to scale (photos)
//     SPIN_ODD            — Earth, Venus and Uranus: two that spin the wrong way (photos),
//                           with the vote key
//   Models
//     MODEL_REAL          — the real thing (the Orion Nebula, from the slide before)
//                           beside a computer model: only the time (millions of
//                           years / a few seconds), so the other reasons in Think
//                           like a scientist Q1 are the class's to find. Not HL
//                           Tauri: the class meets that photo five slides later.
//     FOUR_WORDS          — Think like a scientist Q2: error, mistake, limitation, strength
//
// Split diagrams are drawn at about 1.4:1 (840×560), showcase ones at about
// 2.5:1 (1120×440) — the shapes those layouts give a picture in project mode.
//
// A vote picture carries its own key (a left hand and a right hand with the two
// answers), as the ANS_* cards do, so the question is not only in the caption.
//
// Label <text> is written out literally so `npm run audit:svg` can measure it.
// Helpers below draw shapes only. Labels that sit on top of orbit lines get a
// white halo (paint-order stroke) so they stay readable.

import sun from './images/sun.jpg'
import jupiter from './images/jupiter.jpg'
import earth from './images/earth.jpg'
import neptune from './images/neptune.jpg'
import venus from './images/venus.jpg'
import uranus from './images/uranus.jpg'
import ecliptic from './images/ecliptic.jpg'
import orion from './images/orion.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const TEAL_T = '#e2f2f6'
const ORANGE_T = '#fdf1e3'
const GREEN_T = '#eaf4e2'
const RED_T = '#fbe6e9'
const SUNFILL = '#f6c445'
const SUNLINE = '#c98a0a'
const DUST = '#9c7a54'
const PLANETC = '#4f8fbf'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const HALO = 'stroke="#ffffff" stroke-width="6" stroke-linejoin="round" paint-order="stroke"'

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const f1 = (n) => Number(n.toFixed(1))

// A straight arrow with a drawn head (not a marker, so every head is the same size).
const arrow = (x1, y1, x2, y2, color, w = 6, head = 20) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const hx = x2 - head * Math.cos(a), hy = y2 - head * Math.sin(a)
  const px = head * 0.55 * Math.sin(a), py = -head * 0.55 * Math.cos(a)
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`
}

// An arrowhead at (x, y) pointing along angle a.
const head = (x, y, a, color, size = 16) => {
  const hx = x - size * Math.cos(a), hy = y - size * Math.sin(a)
  const px = size * 0.55 * Math.sin(a), py = -size * 0.55 * Math.cos(a)
  return `<path d="M ${f1(x)} ${f1(y)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`
}

// A thin leader line ending in a dot on the thing it names.
const leader = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="4.5" fill="${KEY}"/>`

// A photo clipped to a circle, with a thin outline. The planet photos have a
// black margin round the planet, so the photo is drawn a little larger than
// the circle (zoom) and the margin falls outside the clip.
const disc = (id, href, cx, cy, r, zoom = 1.12) => `<defs><clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>
    <image href="${href}" x="${f1(cx - r * zoom)}" y="${f1(cy - r * zoom)}" width="${f1(2 * r * zoom)}" height="${f1(2 * r * zoom)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="2"/>`

// An orbit seen at a slant: a flat ellipse round the Sun.
const orbit = (cx, cy, rx, ry, color = '#9aa6af', w = 2) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${color}" stroke-width="${w}"/>`

// A short arrow along an orbit, just ahead of the planet at angle `deg`.
// Every planet goes the same way round: anticlockwise seen from above, so on
// the near side of the ellipse (the bottom) they move to the RIGHT.
const orbitArrow = (cx, cy, rx, ry, deg, color = BLUE, gap = 18, len = 52, w = 4) => {
  const speed = (t) => Math.hypot(rx * Math.sin(t), ry * Math.cos(t)) || 1
  const t1 = (deg * Math.PI) / 180 - gap / speed((deg * Math.PI) / 180)
  const t2 = t1 - len / speed(t1)
  const pts = []
  for (let k = 0; k <= 10; k++) {
    const t = t1 + ((t2 - t1) * k) / 10
    pts.push(`${f1(cx + rx * Math.cos(t))},${f1(cy + ry * Math.sin(t))}`)
  }
  const ex = cx + rx * Math.cos(t2), ey = cy + ry * Math.sin(t2)
  const a = Math.atan2(-ry * Math.cos(t2), rx * Math.sin(t2))
  return `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>${head(ex, ey, a, color, 15)}`
}

// A planet's spin: the near half of a ring round its middle, with an arrowhead.
// `rot` tilts the ring with the axis; dir +1 = the near side moves right.
const spinArc = (cx, cy, rx, ry, rot, dir, color, w = 4.5) => {
  const r = (rot * Math.PI) / 180
  const P = (t) => {
    const x = rx * Math.cos(t), y = ry * Math.sin(t)
    return [cx + x * Math.cos(r) - y * Math.sin(r), cy + x * Math.sin(r) + y * Math.cos(r)]
  }
  const [ta, tb] = dir > 0 ? [Math.PI - 0.15, 0.32] : [0.15, Math.PI - 0.32]
  const pts = []
  for (let k = 0; k <= 16; k++) pts.push(P(ta + ((tb - ta) * k) / 16).map(f1).join(','))
  const [ex, ey] = P(tb)
  const [bx, by] = P(tb + (dir > 0 ? 0.08 : -0.08))
  return `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>${head(ex, ey, Math.atan2(ey - by, ex - bx), color, 15)}`
}

// The lucide Hand outline, as on Maths 2.3's vote cards. A left hand is the
// same drawing mirrored: seen from behind, thumb on the right.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// ── The cat, three ways ──────────────────────────────────────────────────────
const CAT = '#b7bec5'
const catHead = (cx, cy, r = 52) => `<g stroke="${INK}" stroke-width="3" stroke-linejoin="round">
      <path d="M ${cx - r * 0.85} ${cy - r * 0.35} L ${cx - r * 0.75} ${cy - r * 1.15} L ${cx - r * 0.25} ${cy - r * 0.8} Z" fill="${CAT}"/>
      <path d="M ${cx + r * 0.85} ${cy - r * 0.35} L ${cx + r * 0.75} ${cy - r * 1.15} L ${cx + r * 0.25} ${cy - r * 0.8} Z" fill="${CAT}"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${CAT}"/>
    </g>
    <path d="M ${cx - 7} ${cy + 8} L ${cx + 7} ${cy + 8} L ${cx} ${cy + 16} Z" fill="#e58a9a" stroke="${INK}" stroke-width="2"/>
    <path d="M ${cx - 14} ${cy + 14} L ${cx - r - 14} ${cy + 6} M ${cx - 14} ${cy + 20} L ${cx - r - 12} ${cy + 24} M ${cx + 14} ${cy + 14} L ${cx + r + 14} ${cy + 6} M ${cx + 14} ${cy + 20} L ${cx + r + 12} ${cy + 24}" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`
const catAwake = (cx, cy) => `${catHead(cx, cy)}
    <ellipse cx="${cx - 19}" cy="${cy - 10}" rx="7" ry="10" fill="${INK}"/><ellipse cx="${cx + 19}" cy="${cy - 10}" rx="7" ry="10" fill="${INK}"/>
    ${[[-24, 30], [-12, 36], [3, 33], [16, 38], [27, 29], [-30, 22], [34, 20]].map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${cy + dy}" r="4.5" fill="#a86a2c" stroke="${INK}" stroke-width="1.2"/>`).join('')}`
const catAsleep = (cx, cy) => `<ellipse cx="${cx + 18}" cy="${cy + 26}" rx="76" ry="48" fill="${CAT}" stroke="${INK}" stroke-width="3"/>
    ${catHead(cx - 40, cy + 6, 40)}
    <path d="M ${cx - 58} ${cy} q 8 7 16 0 M ${cx - 38} ${cy} q 8 7 16 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`
const lockedDoor = (cx, cy) => `<rect x="${cx - 52}" y="${cy - 82}" width="104" height="164" rx="6" fill="#c99a63" stroke="${INK}" stroke-width="3"/>
    <rect x="${cx - 36}" y="${cy - 66}" width="72" height="56" rx="4" fill="#ddb684" stroke="${INK}" stroke-width="2"/>
    <rect x="${cx - 36}" y="${cy + 6}" width="72" height="60" rx="4" fill="#ddb684" stroke="${INK}" stroke-width="2"/>
    <circle cx="${cx + 38}" cy="${cy}" r="6" fill="${INK}"/>
    <path d="M ${cx + 26} ${cy + 18} a 12 12 0 0 1 24 0" fill="none" stroke="${INK}" stroke-width="4"/>
    <rect x="${cx + 22}" y="${cy + 18}" width="32" height="26" rx="4" fill="#f1c232" stroke="${INK}" stroke-width="2.5"/>`

// Dust grains.
const dots = (pts, r = 4, fill = DUST) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join('')

// A small hand for a vote key, 62 px tall, top-left at (x, y). The left hand
// is the same drawing mirrored, as on the answer cards.
const smallHand = (x, y, color, left) => `<g transform="translate(${left ? x + 62 : x} ${y}) scale(${left ? -2.6 : 2.6} 2.6)" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// A laptop with a tiny model on its screen.
const laptop = (cx, cy) => `<rect x="${cx - 140}" y="${cy - 110}" width="280" height="180" rx="12" fill="#3a4148" stroke="${INK}" stroke-width="3"/>
    <rect x="${cx - 124}" y="${cy - 96}" width="248" height="152" rx="4" fill="#ffffff"/>
    <path d="M ${cx - 175} ${cy + 70} L ${cx + 175} ${cy + 70} L ${cx + 155} ${cy + 96} L ${cx - 155} ${cy + 96} Z" fill="#c9d1d8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    ${orbit(cx, cy - 20, 50, 50, '#c6d3dd', 1.5)}${orbit(cx, cy - 20, 86, 60, '#c6d3dd', 1.5)}
    <circle cx="${cx}" cy="${cy - 20}" r="17" fill="${SUNFILL}" stroke="${SUNLINE}" stroke-width="2.5"/>
    <circle cx="${cx + 35}" cy="${cy - 56}" r="6" fill="${PLANETC}"/><circle cx="${cx - 82}" cy="${cy - 2}" r="8" fill="${PLANETC}"/>
    ${dots([[cx + 70, cy + 30], [cx - 40, cy + 34], [cx + 100, cy - 70], [cx - 105, cy - 70], [cx + 20, cy + 40]], 2.5)}`

export const DIAGRAMS = {
  // ── Starter ─────────────────────────────────────────────────────────────
  ANS_SIZE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    <text x="452" y="142" font-family="${FONT}" font-size="56" font-weight="bold" fill="${BLUE}" text-anchor="middle">a large</text>
    <text x="452" y="236" font-family="${FONT}" font-size="84" font-weight="bold" fill="${BLUE}" text-anchor="middle">size</text>
  </svg>`,

  ANS_MASS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="268" y="142" font-family="${FONT}" font-size="56" font-weight="bold" fill="${KEY}" text-anchor="middle">a large</text>
    <text x="268" y="236" font-family="${FONT}" font-size="84" font-weight="bold" fill="${KEY}" text-anchor="middle">mass</text>
  </svg>`,

  OPTIONS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${disc('u32-opt-e', earth, 210, 122, 94)}
    ${disc('u32-opt-j', jupiter, 630, 122, 94)}
    ${disc('u32-opt-s', sun, 210, 400, 94, 1.2)}
    ${disc('u32-opt-n', neptune, 630, 400, 94)}
    <text x="210" y="258" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">Earth</text>
    <text x="630" y="258" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">Jupiter</text>
    <text x="210" y="536" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">the Sun</text>
    <text x="630" y="536" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">Neptune</text>
  </svg>`,

  // ── How can we know? ────────────────────────────────────────────────────
  CAKE_CLUES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 520" class="w-full h-full">
    ${plate(1120, 520)}

    <rect x="20" y="16" width="370" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="205" y="62" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen’s cake</text>
    <ellipse cx="205" cy="140" rx="122" ry="38" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="205" cy="136" rx="88" ry="24" fill="#f4f6f8" stroke="#9aa6af" stroke-width="2"/>
    ${dots([[170, 132], [196, 142], [228, 130], [246, 141], [184, 146]], 4.5, '#a86a2c')}
    <text x="205" y="222" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">has gone.</text>
    <text x="205" y="260" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">Nobody saw it.</text>
    <rect x="40" y="290" width="330" height="114" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="205" y="334" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">Hypothesis:</text>
    <text x="205" y="378" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">The cat ate it.</text>

    <rect x="410" y="16" width="220" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="426" y="30" width="96" height="36" rx="10" fill="${TEAL}"/>
    <text x="474" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">Clue 1</text>
    ${catAwake(520, 175)}
    <text x="520" y="310" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">Cake crumbs</text>
    <text x="520" y="342" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">on the cat’s</text>
    <text x="520" y="374" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">face</text>

    <rect x="645" y="16" width="220" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="661" y="30" width="96" height="36" rx="10" fill="${TEAL}"/>
    <text x="709" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">Clue 2</text>
    ${catAsleep(755, 160)}
    <text x="800" y="128" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">z z</text>
    <text x="755" y="310" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">The cat is</text>
    <text x="755" y="342" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">asleep, and</text>
    <text x="755" y="374" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">very round.</text>

    <rect x="880" y="16" width="220" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="896" y="30" width="96" height="36" rx="10" fill="${TEAL}"/>
    <text x="944" y="56" font-family="${FONT}" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">Clue 3</text>
    ${lockedDoor(990, 172)}
    <text x="990" y="310" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">The cat was</text>
    <text x="990" y="342" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">locked outside</text>
    <text x="990" y="374" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">all day.</text>
    <rect x="20" y="438" width="530" height="70" rx="14" fill="#e9f1fa" stroke="${BLUE}" stroke-width="2.5"/>
    ${smallHand(36, 442, BLUE, true)}
    <text x="114" y="484" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}">supports</text>
    <text x="262" y="484" font-family="${FONT}" font-size="24" fill="${MUTED}">= agrees with it</text>
    <rect x="570" y="438" width="530" height="70" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="590" y="484" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">contradicts</text>
    <text x="784" y="484" font-family="${FONT}" font-size="24" fill="${MUTED}">= goes against it</text>
    ${smallHand(1022, 442, KEY, false)}
  </svg>`,

  CAKE_VERDICT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 624" class="w-full h-full">
    ${plate(840, 624)}
    <text x="420" y="60" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">Hypothesis: the cat ate it.</text>

    <rect x="24" y="96" width="792" height="160" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="46" y="166" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}">1 · Crumbs on</text>
    <text x="46" y="206" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}">the cat’s face</text>
    <rect x="462" y="136" width="334" height="80" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="629" y="189" font-family="${FONT}" font-size="36" font-weight="bold" fill="${GREEN}" text-anchor="middle">supports ✓</text>

    <rect x="24" y="268" width="792" height="160" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="46" y="338" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}">2 · Asleep, and</text>
    <text x="46" y="378" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}">very round</text>
    <rect x="462" y="308" width="334" height="80" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="629" y="361" font-family="${FONT}" font-size="36" font-weight="bold" fill="${GREEN}" text-anchor="middle">supports ✓</text>

    <rect x="24" y="440" width="792" height="160" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="46" y="510" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}">3 · Locked</text>
    <text x="46" y="550" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}">outside all day</text>
    <rect x="462" y="480" width="334" height="80" rx="14" fill="${RED_T}" stroke="${RED}" stroke-width="3"/>
    <text x="629" y="533" font-family="${FONT}" font-size="36" font-weight="bold" fill="${RED}" text-anchor="middle">contradicts ✗</text>
  </svg>`,

  // ── The facts ───────────────────────────────────────────────────────────
  SOLAR_SYSTEM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${[78, 118, 160, 205, 290, 365, 445, 525].map((rx) => orbit(560, 222, rx, f1(rx * 0.3))).join('\n    ')}
    <circle cx="560" cy="222" r="28" fill="${SUNFILL}" stroke="${SUNLINE}" stroke-width="3"/>

    <circle cx="630.7" cy="231.9" r="5" fill="#b5b5b5" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="463.3" cy="201.7" r="8" fill="#e8c27a" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="492.4" cy="265.5" r="8" fill="${PLANETC}" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="752.6" cy="201" r="7" fill="#d0643b" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="287.5" cy="251.8" r="22" fill="#d9a066" stroke="${INK}" stroke-width="2"/>
    <ellipse cx="731.4" cy="318.7" rx="32" ry="8" fill="none" stroke="#b39b55" stroke-width="3.5"/>
    <circle cx="731.4" cy="318.7" r="17" fill="#e6cf8b" stroke="${INK}" stroke-width="2"/>
    <circle cx="963.3" cy="165.6" r="12" fill="#8fd3e0" stroke="${INK}" stroke-width="2"/>
    <circle cx="258.9" cy="93" r="12" fill="#4a6fd1" stroke="${INK}" stroke-width="2"/>

    ${orbitArrow(560, 222, 78, 23.4, 25, BLUE, 9, 32, 3.5)}
    ${orbitArrow(560, 222, 118, 35.4, 215, BLUE, 12, 38, 3.5)}
    ${orbitArrow(560, 222, 160, 48, 115, BLUE, 12, 44)}
    ${orbitArrow(560, 222, 205, 61.5, -20, BLUE, 12, 46)}
    ${orbitArrow(560, 222, 290, 87, 160, BLUE, 26, 56)}
    ${orbitArrow(560, 222, 365, 109.5, 62, BLUE, 34, 56)}
    ${orbitArrow(560, 222, 445, 133.5, -25, BLUE, 18, 56)}
    ${orbitArrow(560, 222, 525, 157.5, 235, BLUE, 18, 60)}

    <text x="642" y="258" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}" ${HALO}>Mercury</text>
    <text x="450" y="190" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}" text-anchor="end" ${HALO}>Venus</text>
    <text x="492" y="297" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}" text-anchor="middle" ${HALO}>Earth</text>
    <text x="767" y="196" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}" ${HALO}>Mars</text>
    <text x="287" y="301" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle" ${HALO}>Jupiter</text>
    <text x="731" y="362" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle" ${HALO}>Saturn</text>
    <text x="983" y="172" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" ${HALO}>Uranus</text>
    <text x="259" y="70" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}" text-anchor="middle" ${HALO}>Neptune</text>
    <text x="1096" y="424" font-family="${FONT}" font-size="17" fill="${MUTED}" text-anchor="end">not to scale</text>
  </svg>`,

  ORBIT_SPIN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${orbit(270, 290, 220, 84, INK, 3)}
    <circle cx="270" cy="290" r="48" fill="${SUNFILL}" stroke="${SUNLINE}" stroke-width="3.5"/>
    ${orbitArrow(270, 290, 220, 84, 60, BLUE, 74, 70, 5)}
    ${orbitArrow(270, 290, 220, 84, 240, BLUE, 30, 78, 5)}

    <line x1="360" y1="270" x2="400" y2="456" stroke="${INK}" stroke-width="3" stroke-dasharray="9 6"/>
    <circle cx="380" cy="362.7" r="34" fill="${PLANETC}" stroke="${INK}" stroke-width="3"/>
    ${spinArc(380, 362.7, 64, 17, -12, 1, RED, 5)}

    <text x="40" y="96" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">the Sun</text>
    ${leader(110, 104, 248, 252)}

    <text x="560" y="88" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">orbit: the path</text>
    <text x="560" y="120" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">around the Sun</text>
    ${leader(554, 112, 470, 255)}

    <text x="560" y="250" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">axis: the line it</text>
    <text x="560" y="282" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">spins around</text>
    ${leader(554, 274, 366, 300)}

    <text x="560" y="420" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">spin: turn round</text>
    <text x="560" y="452" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">on its axis</text>
    ${leader(554, 430, 431, 362)}

    <text x="40" y="520" font-family="${FONT}" font-size="22" fill="${MUTED}">a planet</text>
    ${leader(130, 512, 368, 393)}
  </svg>`,

  SIDE_VIEW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 589" class="w-full h-full">
    <rect x="0" y="0" width="840" height="589" rx="14" fill="#ffffff"/>
    <defs><clipPath id="u32-side"><rect x="0" y="0" width="840" height="589" rx="14"/></clipPath></defs>
    <image href="${ecliptic}" x="0" y="0" width="840" height="589" preserveAspectRatio="xMidYMid slice" clip-path="url(#u32-side)"/>
    <path d="M 0 524 Q 170 410 330 492" fill="none" stroke="${KEY}" stroke-width="2.5" stroke-dasharray="10 9" opacity="0.75"/>

    <rect x="14" y="398" width="132" height="44" rx="10" fill="#ffffff" fill-opacity="0.94"/>
    <text x="80" y="429" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">Mercury</text>
    ${leader(40, 442, 24, 495)}
    <rect x="76" y="320" width="100" height="44" rx="10" fill="#ffffff" fill-opacity="0.94"/>
    <text x="126" y="351" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">Mars</text>
    ${leader(126, 364, 126, 456)}
    <rect x="168" y="250" width="112" height="44" rx="10" fill="#ffffff" fill-opacity="0.94"/>
    <text x="224" y="281" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">Saturn</text>
    ${leader(224, 294, 223, 450)}
    <rect x="222" y="532" width="356" height="44" rx="10" fill="#ffffff" fill-opacity="0.94"/>
    <text x="400" y="563" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">the Sun, behind the Moon</text>
    ${leader(300, 532, 308, 486)}
    <rect x="640" y="60" width="150" height="44" rx="10" fill="#ffffff" fill-opacity="0.94"/>
    <text x="715" y="91" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">the Moon</text>
    ${leader(715, 104, 740, 250)}
  </svg>`,

  // ── How it formed ───────────────────────────────────────────────────────
  LOOP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${dots([[350, 230], [490, 236], [372, 345], [470, 352], [420, 200], [420, 382], [330, 290], [512, 292]], 5)}
    <circle cx="420" cy="292" r="44" fill="${DUST}" stroke="${INK}" stroke-width="3"/>
    ${arrow(352, 232, 384, 256, RED, 3.5, 12)}${arrow(488, 238, 456, 258, RED, 3.5, 12)}
    ${arrow(374, 343, 391, 325, RED, 3.5, 12)}${arrow(468, 350, 450, 326, RED, 3.5, 12)}

    <rect x="280" y="40" width="280" height="84" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="420" y="94" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">more mass</text>

    <rect x="540" y="400" width="280" height="110" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="680" y="446" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">stronger</text>
    <text x="680" y="488" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">gravity</text>

    <rect x="20" y="400" width="300" height="110" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="170" y="446" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">pulls in more</text>
    <text x="170" y="486" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">dust and gas</text>

    ${arrow(572, 96, 690, 386, KEY, 6, 22)}
    ${arrow(526, 455, 334, 455, KEY, 6, 22)}
    ${arrow(150, 386, 266, 96, KEY, 6, 22)}
  </svg>`,

  STAR_PLANET: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs><clipPath id="u32-sp-plate"><rect x="0" y="0" width="840" height="560" rx="14"/></clipPath></defs>
    <g clip-path="url(#u32-sp-plate)">${disc('u32-sp-sun', sun, 150, 300, 240, 1.2)}</g>
    ${disc('u32-sp-jup', jupiter, 560, 300, 25)}

    <text x="430" y="70" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">the Sun: a star</text>
    ${leader(424, 62, 352, 168)}
    <text x="610" y="218" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">Jupiter:</text>
    <text x="610" y="252" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">a planet</text>
    ${leader(604, 244, 576, 284)}
    <text x="814" y="532" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">drawn to scale</text>
  </svg>`,

  SPIN_ODD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 520" class="w-full h-full">
    ${plate(1120, 520)}

    <rect x="20" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <line x1="168" y1="62" x2="222" y2="290" stroke="${INK}" stroke-width="3" stroke-dasharray="9 6"/>
    ${disc('u32-odd-e', earth, 195, 176, 88)}
    ${spinArc(195, 176, 112, 30, -13, 1, BLUE, 5)}
    <text x="195" y="350" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Earth</text>
    <text x="195" y="390" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">and most planets</text>

    <rect x="385" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <line x1="560" y1="60" x2="560" y2="292" stroke="${INK}" stroke-width="3" stroke-dasharray="9 6"/>
    ${disc('u32-odd-v', venus, 560, 176, 88)}
    ${spinArc(560, 176, 112, 30, 0, -1, RED, 5)}
    <text x="560" y="350" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Venus</text>
    <text x="560" y="390" font-family="${FONT}" font-size="22" fill="${RED}" text-anchor="middle">spins the opposite way</text>

    <rect x="750" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <line x1="790" y1="182" x2="1060" y2="170" stroke="${INK}" stroke-width="3" stroke-dasharray="9 6"/>
    ${disc('u32-odd-u', uranus, 925, 176, 88)}
    ${spinArc(925, 176, 112, 30, 87, 1, RED, 5)}
    <text x="925" y="350" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Uranus</text>
    <text x="925" y="390" font-family="${FONT}" font-size="22" fill="${RED}" text-anchor="middle">spins on its side</text>
    <rect x="20" y="438" width="530" height="70" rx="14" fill="#e9f1fa" stroke="${BLUE}" stroke-width="2.5"/>
    ${smallHand(36, 442, BLUE, true)}
    <text x="114" y="484" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}">supports</text>
    <text x="262" y="484" font-family="${FONT}" font-size="24" fill="${MUTED}">= agrees with it</text>
    <rect x="570" y="438" width="530" height="70" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="590" y="484" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">contradicts</text>
    <text x="784" y="484" font-family="${FONT}" font-size="24" fill="${MUTED}">= goes against it</text>
    ${smallHand(1022, 442, KEY, false)}
  </svg>`,

  // ── Models ──────────────────────────────────────────────────────────────
  MODEL_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 600" class="w-full h-full">
    ${plate(840, 600)}
    <rect x="16" y="16" width="398" height="568" rx="14" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="215" y="66" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">The real thing</text>
    ${disc('u32-model-orion', orion, 215, 268, 160, 1)}
    <text x="215" y="510" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">millions of years</text>

    <rect x="426" y="16" width="398" height="568" rx="14" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2.5"/>
    <text x="625" y="66" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">A computer model</text>
    ${laptop(625, 270)}
    <text x="625" y="510" font-family="${FONT}" font-size="36" font-weight="bold" fill="${KEY}" text-anchor="middle">a few seconds</text>
  </svg>`,

  FOUR_WORDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <text x="560" y="62" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">Models are not real, so they may not be accurate.</text>
    <text x="560" y="112" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">Which word describes this?</text>

    <rect x="20" y="148" width="255" height="272" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <circle cx="147.5" cy="236" r="52" fill="${TEAL}"/>
    <text x="147.5" y="257" font-family="${FONT}" font-size="60" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <text x="147.5" y="364" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">an error</text>

    <rect x="295" y="148" width="255" height="272" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <circle cx="422.5" cy="236" r="52" fill="${TEAL}"/>
    <text x="422.5" y="257" font-family="${FONT}" font-size="60" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <text x="422.5" y="364" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">a mistake</text>

    <rect x="570" y="148" width="255" height="272" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <circle cx="697.5" cy="236" r="52" fill="${TEAL}"/>
    <text x="697.5" y="257" font-family="${FONT}" font-size="60" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <text x="697.5" y="364" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">a limitation</text>

    <rect x="845" y="148" width="255" height="272" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <circle cx="972.5" cy="236" r="52" fill="${TEAL}"/>
    <text x="972.5" y="257" font-family="${FONT}" font-size="60" font-weight="bold" fill="#ffffff" text-anchor="middle">4</text>
    <text x="972.5" y="364" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">a strength</text>
  </svg>`,
}
