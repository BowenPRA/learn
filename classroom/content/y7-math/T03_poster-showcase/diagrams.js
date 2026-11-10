// content/y7-math/T03_poster-showcase/diagrams.js
// The example poster and the two strips of topic tiles for the poster task.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — the helpers below draw shapes
//    only, because `npm run audit:svg` cannot see text made by `${helper()}`;
//  · no <g transform>: the audit measures text against rects by their absolute
//    coordinates, so every label here carries its real position;
//  · markers are `markerUnits="userSpaceOnUse"`, so arrowheads do not scale
//    with the stroke.
//
//   POSTER        the whole example poster, A3 portrait (1188 × 1680 = 4 units
//                 per mm). Square roots and cube roots (1.6): no student is
//                 given that topic. The same SVG is printed at A3 — see the
//                 plan's materials list.
//   POSTER_TOP    parts 1–2, cut from POSTER by viewBox (0–560)
//   POSTER_MID    parts 3–4 (560–1120)
//   POSTER_BOTTOM parts 5–7 (1120–1680)
//   TOPICS_A      topics 1–5, one tile each with a picture idea
//   TOPICS_B      topics 6–10
//
// The poster is drawn in three bands of 560 so that each crop is a whole
// number of panels and sits at about 2.1:1 on a `showcase` slide. Move a panel
// across a band edge and a crop cuts it in half.

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const TEAL_T = '#e2f2f6'
const PURPLE_T = '#f2ecf7'
const GREEN_T = '#eef6e6'
const RED_T = '#fdecee'
const BLUE_T = '#e6eef8'
const ORANGE_T = '#fdf1e3'
const PAPER = '#fffdf8'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
// Letters in a formula, italic serif as the book prints them: in a sans font a
// lone l is indistinguishable from a capital I.
const SERIF = "Georgia, 'Times New Roman', serif"
const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive"

// A Learner's Book panel: tinted body, solid header strip with rounded top.
const panel = (x, y, w, h, col, tint) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${tint}" stroke="${col}" stroke-width="4"/>
    <path d="M ${x + 18} ${y} H ${x + w - 18} A 18 18 0 0 1 ${x + w} ${y + 18} V ${y + 48} H ${x} V ${y + 18} A 18 18 0 0 1 ${x + 18} ${y} Z" fill="${col}"/>`

// A hand-drawn wavy underline.
const wave = (x0, x1, y, col) => {
  let d = `M ${x0} ${y}`
  for (let x = x0; x < x1; x += 40) d += ` q 10 -9 20 0 t 20 0`
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="5" stroke-linecap="round"/>`
}

const arrowDef = (id, col) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${col}"/></marker>`

// 5 × 5 square of tiles.
const tiles = (x0, y0, s) => {
  let out = ''
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) out += `<rect x="${x0 + c * s}" y="${y0 + r * s}" width="${s}" height="${s}" fill="#bfe3ec" stroke="${TEAL}" stroke-width="2.5"/>`
  return out
}

// 2 × 2 × 2 cube in oblique projection: front face at (x, y), side s, depth (dx, −dy).
const cube = (x, y, s, dx, dy) => {
  const h = s / 2
  return `<polygon points="${x},${y} ${x + dx},${y - dy} ${x + s + dx},${y - dy} ${x + s},${y}" fill="#f2ecf7" stroke="${PURPLE}" stroke-width="3" stroke-linejoin="round"/>
    <polygon points="${x + s},${y} ${x + s + dx},${y - dy} ${x + s + dx},${y + s - dy} ${x + s},${y + s}" fill="#cdb8e2" stroke="${PURPLE}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#e4d7f0" stroke="${PURPLE}" stroke-width="3"/>
    <path d="M ${x + h} ${y} V ${y + s} M ${x} ${y + h} H ${x + s}
             M ${x + h} ${y} L ${x + h + dx} ${y - dy} M ${x + dx / 2} ${y - dy / 2} H ${x + s + dx / 2}
             M ${x + s + dx / 2} ${y - dy / 2} V ${y + s - dy / 2} M ${x + s} ${y + h} L ${x + s + dx} ${y + h - dy}"
          fill="none" stroke="${PURPLE}" stroke-width="2"/>`
}

const tick = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${GREEN}"/>
    <path d="M ${cx - r * 0.45} ${cy} l ${r * 0.3} ${r * 0.32} l ${r * 0.6} ${r * -0.62}" fill="none" stroke="#ffffff" stroke-width="${r * 0.22}" stroke-linecap="round" stroke-linejoin="round"/>`
const cross = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${RED}"/>
    <path d="M ${cx - r * 0.38} ${cy - r * 0.38} l ${r * 0.76} ${r * 0.76} M ${cx + r * 0.38} ${cy - r * 0.38} l ${r * -0.76} ${r * 0.76}" fill="none" stroke="#ffffff" stroke-width="${r * 0.22}" stroke-linecap="round"/>`

// One topic tile: tinted card, unit pill, white drawing well.
const tile = (x0, col, tint) => `<rect x="${x0}" y="12" width="208" height="416" rx="18" fill="${tint}" stroke="${col}" stroke-width="3"/>
    <rect x="${x0 + 12}" y="26" width="116" height="36" rx="18" fill="${col}"/>
    <rect x="${x0 + 10}" y="168" width="188" height="168" rx="12" fill="#ffffff" stroke="${col}" stroke-opacity="0.35" stroke-width="2"/>`

const topicsPlate = `<rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff"/>`

export const DIAGRAMS = {
  POSTER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1188 1680" class="w-full h-full">
    <defs>${arrowDef('pst-arr', PURPLE)}</defs>
    <rect x="0" y="0" width="1188" height="1680" rx="14" fill="${PAPER}"/>
    <rect x="1.5" y="1.5" width="1185" height="1677" rx="13" fill="none" stroke="#d9dee3" stroke-width="3"/>

    <!-- 1 · Title -->
    <text x="594" y="112" text-anchor="middle" font-family="${HAND}" font-size="64" font-weight="bold" fill="${INK}">Square Roots &amp; Cube Roots</text>
    ${wave(214, 974, 142, KEY)}
    <text x="594" y="186" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">Year 7 Maths · Unit 1.6 · by Mr Bowen</text>

    <!-- 2 · Key words -->
    ${panel(40, 208, 1108, 334, KEY, ORANGE_T)}
    <text x="68" y="243" font-family="${HAND}" font-size="28" font-weight="bold" fill="#ffffff" letter-spacing="2">KEY WORDS</text>
    <line x1="598" y1="272" x2="598" y2="528" stroke="${KEY}" stroke-opacity="0.4" stroke-width="2" stroke-dasharray="6 8"/>
    <line x1="64" y1="399" x2="1124" y2="399" stroke="${KEY}" stroke-opacity="0.4" stroke-width="2" stroke-dasharray="6 8"/>

    <text x="66" y="300" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">Square number</text>
    <text x="578" y="298" text-anchor="end" font-family="${FONT}" font-size="20" fill="${MUTED}">số chính phương</text>
    <text x="66" y="338" font-family="${FONT}" font-size="22" fill="${INK}">a number multiplied by itself</text>
    <text x="66" y="378" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}">5² = 5 × 5 = 25</text>

    <text x="618" y="300" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">Square root √</text>
    <text x="1122" y="298" text-anchor="end" font-family="${FONT}" font-size="20" fill="${MUTED}">căn bậc hai</text>
    <text x="618" y="338" font-family="${FONT}" font-size="22" fill="${INK}">the number that was multiplied by itself</text>
    <text x="618" y="378" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}">√25 = 5, because 5 × 5 = 25</text>

    <text x="66" y="443" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">Cube number</text>
    <text x="578" y="441" text-anchor="end" font-family="${FONT}" font-size="20" fill="${MUTED}">số lập phương</text>
    <text x="66" y="481" font-family="${FONT}" font-size="22" fill="${INK}">a number multiplied by itself twice</text>
    <text x="66" y="521" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}">2³ = 2 × 2 × 2 = 8</text>

    <text x="618" y="443" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">Cube root ∛</text>
    <text x="1122" y="441" text-anchor="end" font-family="${FONT}" font-size="20" fill="${MUTED}">căn bậc ba</text>
    <text x="618" y="481" font-family="${FONT}" font-size="22" fill="${INK}">the number that was multiplied by itself twice</text>
    <text x="618" y="521" font-family="${FONT}" font-size="27" font-weight="bold" fill="${INK}">∛8 = 2, because 2 × 2 × 2 = 8</text>

    <!-- 3 · Picture -->
    ${panel(40, 578, 528, 520, TEAL, TEAL_T)}
    <text x="68" y="613" font-family="${HAND}" font-size="28" font-weight="bold" fill="#ffffff" letter-spacing="2">SEE IT</text>
    ${tiles(84, 676, 40)}
    <text x="184" y="918" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">5</text>
    <text x="64" y="786" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">5</text>
    <text x="184" y="970" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">5 × 5 = 25</text>
    <text x="184" y="1012" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">√25 = 5</text>

    ${cube(346, 730, 140, 56, 48)}
    <text x="416" y="918" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">2</text>
    <text x="432" y="970" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">2 × 2 × 2 = 8</text>
    <text x="432" y="1012" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">∛8 = 2</text>
    <text x="304" y="1068" text-anchor="middle" font-family="${FONT}" font-size="22" fill="${MUTED}">The names come from the pictures.</text>

    <!-- 4 · How it works -->
    ${panel(588, 578, 560, 520, PURPLE, PURPLE_T)}
    <text x="616" y="613" font-family="${HAND}" font-size="28" font-weight="bold" fill="#ffffff" letter-spacing="2">HOW IT WORKS</text>
    <text x="868" y="678" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">Squaring and square rooting</text>
    <text x="868" y="714" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">undo each other.</text>
    <path d="M 760 818 Q 868 752 976 818" fill="none" stroke="${PURPLE}" stroke-width="4" marker-end="url(#pst-arr)"/>
    <path d="M 976 878 Q 868 944 760 878" fill="none" stroke="${PURPLE}" stroke-width="4" marker-end="url(#pst-arr)"/>
    <circle cx="716" cy="848" r="48" fill="#ffffff" stroke="${PURPLE}" stroke-width="4"/>
    <circle cx="1020" cy="848" r="48" fill="#ffffff" stroke="${PURPLE}" stroke-width="4"/>
    <text x="716" y="864" text-anchor="middle" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}">4</text>
    <text x="1020" y="864" text-anchor="middle" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}">16</text>
    <text x="868" y="770" text-anchor="middle" font-family="${FONT}" font-size="23" font-weight="bold" fill="${PURPLE}">square it: 4 × 4</text>
    <text x="868" y="948" text-anchor="middle" font-family="${FONT}" font-size="23" font-weight="bold" fill="${PURPLE}">square root: √16</text>
    <rect x="616" y="978" width="504" height="96" rx="20" fill="#ffffff" stroke="${KEY}" stroke-width="3"/>
    <text x="868" y="1014" text-anchor="middle" font-family="${HAND}" font-size="24" font-weight="bold" fill="${KEY}">Ask yourself:</text>
    <text x="868" y="1054" text-anchor="middle" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}">What number × itself makes this?</text>

    <!-- 5 · Examples -->
    ${panel(40, 1138, 600, 428, GREEN, GREEN_T)}
    <text x="68" y="1173" font-family="${HAND}" font-size="28" font-weight="bold" fill="#ffffff" letter-spacing="2">EXAMPLES</text>
    <text x="68" y="1232" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">1. Find √49</text>
    <text x="68" y="1272" font-family="${FONT}" font-size="23" fill="${MUTED}">Which number × itself = 49?</text>
    <text x="68" y="1312" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">7 × 7 = 49, so √49 = 7</text>
    <line x1="64" y1="1340" x2="616" y2="1340" stroke="${GREEN}" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="6 8"/>
    <text x="68" y="1384" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">2. Mr Bowen’s patio</text>
    <text x="68" y="1422" font-family="${FONT}" font-size="23" fill="${MUTED}">225 square stones make one big square.</text>
    <text x="68" y="1456" font-family="${FONT}" font-size="23" fill="${MUTED}">How many stones along one side?</text>
    <text x="68" y="1500" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}">√225 = 15, because 15 × 15 = 225</text>
    <text x="68" y="1540" font-family="${FONT}" font-size="25" font-weight="bold" fill="${GREEN}">15 stones along each side</text>

    <!-- 6 · Common mistake -->
    ${panel(660, 1138, 488, 226, RED, RED_T)}
    <text x="688" y="1173" font-family="${HAND}" font-size="28" font-weight="bold" fill="#ffffff" letter-spacing="2">CAREFUL!</text>
    <text x="700" y="1246" font-family="${FONT}" font-size="44" font-weight="bold" fill="${INK}">√16 = 8</text>
    <line x1="692" y1="1231" x2="880" y2="1231" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>
    ${cross(930, 1231, 24)}
    <text x="688" y="1298" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}">√16 = 4, because 4 × 4 = 16</text>
    ${tick(1100, 1290, 18)}
    <text x="688" y="1342" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RED}">Square root is not ÷ 2.</text>

    <!-- 7 · Try it -->
    ${panel(660, 1382, 488, 184, BLUE, BLUE_T)}
    <text x="688" y="1417" font-family="${HAND}" font-size="28" font-weight="bold" fill="#ffffff" letter-spacing="2">TRY IT!</text>
    <text x="688" y="1480" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">What is √100?</text>
    <text x="688" y="1530" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">What is ∛27?</text>
    <rect x="938" y="1444" width="194" height="106" rx="8" fill="#fff3b0" stroke="#c99a06" stroke-width="3"/>
    <path d="M 940 1460 H 1130" stroke="#c99a06" stroke-width="2" stroke-dasharray="5 5"/>
    <text x="1035" y="1504" text-anchor="middle" font-family="${HAND}" font-size="26" font-weight="bold" fill="${INK}">Lift me!</text>
    <text x="1035" y="1534" text-anchor="middle" font-family="${FONT}" font-size="18" fill="${MUTED}">answers under here</text>

    <!-- Extra · learn these -->
    <rect x="40" y="1590" width="1108" height="64" rx="16" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="594" y="1632" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${TEAL}">Learn these: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144</text>
  </svg>`,

  TOPICS_A: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    <defs>${arrowDef('tpa-arr', KEY)}${arrowDef('tpa-grn', GREEN)}</defs>
    ${topicsPlate}

    <!-- 1.1 Adding and subtracting integers -->
    ${tile(16, TEAL, TEAL_T)}
    <text x="86" y="51" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="#ffffff">1.1</text>
    <text x="30" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Adding and</text>
    <text x="30" y="124" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Subtracting</text>
    <text x="30" y="152" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Integers</text>
    <path d="M 40 268 H 200 M 48 260 V 276 M 72 262 V 274 M 96 262 V 274 M 120 260 V 276 M 144 262 V 274 M 168 262 V 274 M 192 260 V 276" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 48 256 Q 108 192 166 254" fill="none" stroke="${KEY}" stroke-width="3" marker-end="url(#tpa-arr)"/>
    <circle cx="48" cy="268" r="5" fill="${INK}"/>
    <circle cx="168" cy="268" r="6" fill="${KEY}"/>
    <text x="108" y="214" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}">+5</text>
    <text x="48" y="298" text-anchor="middle" font-family="${FONT}" font-size="17" fill="${INK}">−3</text>
    <text x="120" y="298" text-anchor="middle" font-family="${FONT}" font-size="17" fill="${INK}">0</text>
    <text x="192" y="298" text-anchor="middle" font-family="${FONT}" font-size="17" fill="${INK}">3</text>
    <text x="120" y="327" text-anchor="middle" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}">−3 + 5 = 2</text>
    <text x="30" y="362" font-family="${FONT}" font-size="14" font-weight="bold" fill="${TEAL}" letter-spacing="1.5">PICTURE IDEA</text>
    <text x="30" y="388" font-family="${FONT}" font-size="17" fill="${INK}">a number line</text>
    <text x="30" y="410" font-family="${FONT}" font-size="17" fill="${INK}">with jumps</text>

    <!-- 1.2 Multiplying and dividing integers -->
    ${tile(236, PURPLE, PURPLE_T)}
    <text x="306" y="51" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="#ffffff">1.2</text>
    <text x="250" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Multiplying</text>
    <text x="250" y="124" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">and Dividing</text>
    <text x="250" y="152" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Integers</text>
    <rect x="262" y="184" width="156" height="44" fill="${PURPLE_T}"/>
    <rect x="262" y="228" width="52" height="88" fill="${PURPLE_T}"/>
    <rect x="262" y="184" width="156" height="132" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 314 184 V 316 M 366 184 V 316 M 262 228 H 418 M 262 272 H 418" stroke="${INK}" stroke-width="2"/>
    <text x="288" y="215" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">×</text>
    <text x="340" y="215" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">+</text>
    <text x="392" y="215" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">−</text>
    <text x="288" y="259" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">+</text>
    <text x="288" y="303" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">−</text>
    <text x="340" y="259" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}">+</text>
    <text x="392" y="259" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}">−</text>
    <text x="340" y="303" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${RED}">−</text>
    <text x="392" y="303" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${GREEN}">+</text>
    <text x="250" y="362" font-family="${FONT}" font-size="14" font-weight="bold" fill="${PURPLE}" letter-spacing="1.5">PICTURE IDEA</text>
    <text x="250" y="388" font-family="${FONT}" font-size="17" fill="${INK}">a table of signs</text>
    <text x="250" y="410" font-family="${FONT}" font-size="17" fill="${INK}">for × and ÷</text>

    <!-- 1.3 + 1.4 LCM and HCF -->
    ${tile(456, GREEN, GREEN_T)}
    <text x="526" y="51" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="#ffffff">1.3 + 1.4</text>
    <text x="470" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">LCM and HCF</text>
    <text x="470" y="124" font-family="${FONT}" font-size="16" fill="${MUTED}">lowest common multiple</text>
    <text x="470" y="146" font-family="${FONT}" font-size="16" fill="${MUTED}">highest common factor</text>
    <text x="478" y="214" font-family="${FONT}" font-size="20" font-weight="bold" fill="${GREEN}">4:</text>
    <text x="520" y="214" text-anchor="middle" font-family="${FONT}" font-size="20" fill="${INK}">4</text>
    <text x="552" y="214" text-anchor="middle" font-family="${FONT}" font-size="20" fill="${INK}">8</text>
    <text x="590" y="214" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}">12</text>
    <text x="628" y="214" text-anchor="middle" font-family="${FONT}" font-size="20" fill="${INK}">16</text>
    <text x="478" y="262" font-family="${FONT}" font-size="20" font-weight="bold" fill="${GREEN}">6:</text>
    <text x="520" y="262" text-anchor="middle" font-family="${FONT}" font-size="20" fill="${INK}">6</text>
    <text x="558" y="262" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}">12</text>
    <text x="596" y="262" text-anchor="middle" font-family="${FONT}" font-size="20" fill="${INK}">18</text>
    <ellipse cx="590" cy="207" rx="20" ry="17" fill="none" stroke="${KEY}" stroke-width="3"/>
    <ellipse cx="558" cy="255" rx="20" ry="17" fill="none" stroke="${KEY}" stroke-width="3"/>
    <text x="560" y="314" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">LCM = 12</text>
    <text x="470" y="362" font-family="${FONT}" font-size="14" font-weight="bold" fill="${GREEN}" letter-spacing="1.5">PICTURE IDEA</text>
    <text x="470" y="388" font-family="${FONT}" font-size="17" fill="${INK}">two lists —</text>
    <text x="470" y="410" font-family="${FONT}" font-size="17" fill="${INK}">circle the match</text>

    <!-- 1.5 Tests for divisibility -->
    ${tile(676, BLUE, BLUE_T)}
    <text x="746" y="51" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="#ffffff">1.5</text>
    <text x="690" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Tests for</text>
    <text x="690" y="124" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Divisibility</text>
    <rect x="694" y="184" width="50" height="132" fill="${BLUE_T}"/>
    <rect x="694" y="184" width="172" height="132" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 744 184 V 316 M 694 228 H 866 M 694 272 H 866" stroke="${INK}" stroke-width="2"/>
    <text x="719" y="213" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${BLUE}">÷ 2</text>
    <text x="719" y="257" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${BLUE}">÷ 3</text>
    <text x="719" y="301" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${BLUE}">÷ 5</text>
    <text x="752" y="212" font-family="${FONT}" font-size="15" fill="${INK}">even number</text>
    <text x="752" y="256" font-family="${FONT}" font-size="15" fill="${INK}">digit sum ÷ 3</text>
    <text x="752" y="300" font-family="${FONT}" font-size="15" fill="${INK}">ends 0 or 5</text>
    <text x="690" y="362" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" letter-spacing="1.5">PICTURE IDEA</text>
    <text x="690" y="388" font-family="${FONT}" font-size="17" fill="${INK}">a table</text>
    <text x="690" y="410" font-family="${FONT}" font-size="17" fill="${INK}">of tests</text>

    <!-- 2.2 Formulae -->
    ${tile(896, RED, RED_T)}
    <text x="966" y="51" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="#ffffff">2.2</text>
    <text x="910" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Formulae</text>
    <rect x="936" y="196" width="128" height="84" fill="${RED_T}" stroke="${INK}" stroke-width="3"/>
    <text x="1000" y="247" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="22" font-weight="bold" fill="${INK}">A = l × w</text>
    <text x="1000" y="308" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="26" font-weight="bold" fill="${KEY}">l</text>
    <text x="1080" y="246" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="26" font-weight="bold" fill="${KEY}">w</text>
    <text x="1000" y="330" text-anchor="middle" font-family="${FONT}" font-size="18" fill="${INK}">6 × 4 = 24 cm²</text>
    <text x="910" y="362" font-family="${FONT}" font-size="14" font-weight="bold" fill="${RED}" letter-spacing="1.5">PICTURE IDEA</text>
    <text x="910" y="388" font-family="${FONT}" font-size="17" fill="${INK}">a shape and</text>
    <text x="910" y="410" font-family="${FONT}" font-size="17" fill="${INK}">its formula</text>
  </svg>`,

  TOPICS_B: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    <defs>${arrowDef('tpb-ink', INK)}${arrowDef('tpb-grn', GREEN)}${arrowDef('tpb-blu', BLUE)}</defs>
    ${topicsPlate}

    <!-- 2.4 Expanding brackets -->
    ${tile(16, TEAL, TEAL_T)}
    <text x="86" y="51" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="#ffffff">2.4</text>
    <text x="30" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Expanding</text>
    <text x="30" y="124" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Brackets</text>
    <text x="120" y="204" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">5(a + 3)</text>
    <rect x="58" y="248" width="128" height="54" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 122 248 V 302" stroke="${INK}" stroke-width="2"/>
    <text x="90" y="238" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="bold" fill="${TEAL}">a</text>
    <text x="154" y="238" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="bold" fill="${TEAL}">+3</text>
    <text x="42" y="283" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="bold" fill="${TEAL}">5</text>
    <text x="90" y="283" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">5a</text>
    <text x="154" y="283" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">+15</text>
    <text x="120" y="328" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}">= 5a + 15</text>
    <text x="30" y="362" font-family="${FONT}" font-size="14" font-weight="bold" fill="${TEAL}" letter-spacing="1.5">PICTURE IDEA</text>
    <text x="30" y="388" font-family="${FONT}" font-size="17" fill="${INK}">the box method</text>
    <text x="30" y="410" font-family="${FONT}" font-size="17" fill="${INK}">for brackets</text>

    <!-- 2.5 Solving equations -->
    ${tile(236, PURPLE, PURPLE_T)}
    <text x="306" y="51" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="#ffffff">2.5</text>
    <text x="250" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Solving</text>
    <text x="250" y="124" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Equations</text>
    <text x="340" y="194" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">x + 5 = 12</text>
    <rect x="256" y="220" width="40" height="34" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <rect x="320" y="220" width="48" height="34" rx="6" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="2.5"/>
    <rect x="392" y="220" width="36" height="34" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 298 237 H 316 M 370 237 H 388" stroke="${INK}" stroke-width="2.5" marker-end="url(#tpb-ink)"/>
    <text x="276" y="244" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}">x</text>
    <text x="344" y="244" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${PURPLE}">+ 5</text>
    <text x="410" y="244" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}">12</text>
    <rect x="256" y="272" width="40" height="34" rx="6" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <rect x="320" y="272" width="48" height="34" rx="6" fill="${PURPLE_T}" stroke="${PURPLE}" stroke-width="2.5"/>
    <rect x="392" y="272" width="36" height="34" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 318 289 H 300 M 390 289 H 372" stroke="${INK}" stroke-width="2.5" marker-end="url(#tpb-ink)"/>
    <text x="276" y="296" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}">7</text>
    <text x="344" y="296" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${PURPLE}">− 5</text>
    <text x="410" y="296" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}">12</text>
    <text x="340" y="330" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}">x = 7</text>
    <text x="250" y="362" font-family="${FONT}" font-size="14" font-weight="bold" fill="${PURPLE}" letter-spacing="1.5">PICTURE IDEA</text>
    <text x="250" y="388" font-family="${FONT}" font-size="17" fill="${INK}">a flow chart,</text>
    <text x="250" y="410" font-family="${FONT}" font-size="17" fill="${INK}">forwards and back</text>

    <!-- 2.6 Inequalities -->
    ${tile(456, GREEN, GREEN_T)}
    <text x="526" y="51" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="#ffffff">2.6</text>
    <text x="470" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Inequalities</text>
    <text x="560" y="214" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">x &gt; 3</text>
    <path d="M 478 272 H 646 M 482 264 V 280 M 508 266 V 278 M 534 266 V 278 M 560 264 V 280 M 586 266 V 278 M 612 266 V 278 M 638 264 V 280" stroke="${INK}" stroke-width="2.5"/>
    <path d="M 570 272 H 634" stroke="${GREEN}" stroke-width="6" marker-end="url(#tpb-grn)"/>
    <circle cx="560" cy="272" r="9" fill="#ffffff" stroke="${GREEN}" stroke-width="4"/>
    <text x="482" y="300" text-anchor="middle" font-family="${FONT}" font-size="17" fill="${INK}">0</text>
    <text x="560" y="300" text-anchor="middle" font-family="${FONT}" font-size="17" fill="${INK}">3</text>
    <text x="638" y="300" text-anchor="middle" font-family="${FONT}" font-size="17" fill="${INK}">6</text>
    <text x="560" y="328" text-anchor="middle" font-family="${FONT}" font-size="16" fill="${MUTED}">3 is not included</text>
    <text x="470" y="362" font-family="${FONT}" font-size="14" font-weight="bold" fill="${GREEN}" letter-spacing="1.5">PICTURE IDEA</text>
    <text x="470" y="388" font-family="${FONT}" font-size="17" fill="${INK}">a number line,</text>
    <text x="470" y="410" font-family="${FONT}" font-size="17" fill="${INK}">circle and arrow</text>

    <!-- 3.1 Converting metric units -->
    ${tile(676, BLUE, BLUE_T)}
    <text x="746" y="51" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="#ffffff">3.1</text>
    <text x="690" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Converting</text>
    <text x="690" y="124" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Metric Units</text>
    <rect x="708" y="178" width="54" height="30" rx="6" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="708" y="218" width="54" height="30" rx="6" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="708" y="258" width="54" height="30" rx="6" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="708" y="298" width="54" height="30" rx="6" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="735" y="200" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}">t</text>
    <text x="735" y="240" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}">kg</text>
    <text x="735" y="280" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}">g</text>
    <text x="735" y="320" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="${INK}">mg</text>
    <path d="M 766 196 C 786 200, 786 226, 770 231 M 766 236 C 786 240, 786 266, 770 271 M 766 276 C 786 280, 786 306, 770 311" fill="none" stroke="${BLUE}" stroke-width="2.5" marker-end="url(#tpb-blu)"/>
    <text x="794" y="219" font-family="${FONT}" font-size="16" font-weight="bold" fill="${BLUE}">× 1000</text>
    <text x="794" y="259" font-family="${FONT}" font-size="16" font-weight="bold" fill="${BLUE}">× 1000</text>
    <text x="794" y="299" font-family="${FONT}" font-size="16" font-weight="bold" fill="${BLUE}">× 1000</text>
    <text x="690" y="362" font-family="${FONT}" font-size="14" font-weight="bold" fill="${BLUE}" letter-spacing="1.5">PICTURE IDEA</text>
    <text x="690" y="388" font-family="${FONT}" font-size="17" fill="${INK}">a staircase</text>
    <text x="690" y="410" font-family="${FONT}" font-size="17" fill="${INK}">of units</text>

    <!-- 3.2 Rounding to decimal places, with long division -->
    ${tile(896, RED, RED_T)}
    <text x="966" y="51" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="bold" fill="#ffffff">3.2</text>
    <text x="910" y="96" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Rounding to</text>
    <text x="910" y="124" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">Decimal Places</text>
    <text x="910" y="150" font-family="${FONT}" font-size="16" fill="${MUTED}">+ long division</text>
    <text x="1016" y="204" text-anchor="middle" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}">8.2857</text>
    <path d="M 962 212 H 1072 M 962 212 Q 974 230 962 250" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="946" y="242" text-anchor="middle" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}">7</text>
    <text x="1020" y="242" text-anchor="middle" font-family="${FONT}" font-size="21" font-weight="bold" fill="${INK}">58.0000</text>
    <text x="1000" y="292" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">≈ 8.286</text>
    <text x="1000" y="322" text-anchor="middle" font-family="${FONT}" font-size="17" fill="${MUTED}">to 3 d.p.</text>
    <text x="910" y="362" font-family="${FONT}" font-size="14" font-weight="bold" fill="${RED}" letter-spacing="1.5">PICTURE IDEA</text>
    <text x="910" y="388" font-family="${FONT}" font-size="17" fill="${INK}">a long division,</text>
    <text x="910" y="410" font-family="${FONT}" font-size="17" fill="${INK}">then round</text>
  </svg>`,
}

// The crops share every element with POSTER; only the window differs. They are
// derived here, after the literal, so that audit:svg measures the poster's text
// once, in the block it can read.
const crop = (y) => DIAGRAMS.POSTER.replace('viewBox="0 0 1188 1680"', `viewBox="0 ${y} 1188 560"`)
DIAGRAMS.POSTER_TOP = crop(0)
DIAGRAMS.POSTER_MID = crop(560)
DIAGRAMS.POSTER_BOTTOM = crop(1120)
