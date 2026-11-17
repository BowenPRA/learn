// content/y7-math/U07_1a/diagrams.js
// Teaching diagrams for 7.1 Part 1, Fractions and Mixed Numbers.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · no <tspan>: two colours in one line are two <text> elements;
//  · `split` diagrams are 840×560; `showcase` diagrams are 1120×440.
//
// One picture language for the whole deck, so the class never has to translate:
//   a BAR is one whole cut into equal parts; TEAL parts are the shaded ones;
//   a PIZZA is one whole too: its filled slices are pizza, its empty ones dashed;
//   a stacked fraction (numerator over denominator) is written as big as the
//   slide allows. Orange is a label; green is right, red is wrong.
//
//   PIC_SAY / PIC_SAME / PIC_WHOLES   the three goals on "Today you will…"
//   NUM_DEN          the pizza photo, 3 of 8 slices: numerator and denominator;
//                    4 equal parts are quarters, 4 unequal parts are not
//   SAY_IT           a half, a third, a quarter, three quarters, two fifths, seven tenths
//   WHAT_FRACTION    1/3, 5/6, 3/8, 2/6 (a bar, a pizza, a bánh chưng, a bar): a = d
//   ANS_34 / ANS_46  vote 1 (which fraction is equal to 2/3?) — A 3/4, B 4/6
//   ADD_OR_TIMES     2/3 and 4/6 end at the same place; 3/4 goes past
//   IMPROPER_MIXED   11/4 = 2¾ as pizzas: the whole-number part and the fractional part
//   BOTH_WAYS        divide (11 ÷ 4 = 2 remainder 3), then multiply and add (2 × 4 + 3)
//   ANS_134 / ANS_312  vote 2 (which is bigger?) — A 13/4, B 3½
//   NUMBER_LINE      13 quarters reach 3¼; 3½ is further along
//   FILL_BOX / CHANGE_THESE  the two whiteboard slides' questions, big, no words
//   DRAW_THIS        11/4 = 2¾: the pizzas, the division, the number line
import pizzaImg from './images/pizza.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const PURPLE = '#5c2483'
const SHADE = '#6cbfd4' // a shaded part
const CRUST = '#d9963f'
const CHEESE = '#ffd66e'
const SAUCE = '#c8442f'
const LEAF = '#4f8f35'
const RICE = '#eef2d9'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const f = (n) => Math.round(n * 10) / 10

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// The line of a stacked fraction, centred on cx.
const fl = (cx, y, w, colour = INK, sw = 5) =>
  `<line x1="${f(cx - w / 2)}" y1="${y}" x2="${f(cx + w / 2)}" y2="${y}" stroke="${colour}" stroke-width="${sw}" stroke-linecap="round"/>`

// A bar: one whole cut into n equal parts, the first k shaded.
const bar = (x, y, w, h, n, k, fill = SHADE, sw = 4) => {
  const pw = w / n
  let s = ''
  for (let i = 0; i < n; i += 1) s += `<rect x="${f(x + i * pw)}" y="${y}" width="${f(pw)}" height="${h}" fill="${i < k ? fill : '#ffffff'}"/>`
  for (let i = 1; i < n; i += 1) s += `<line x1="${f(x + i * pw)}" y1="${y}" x2="${f(x + i * pw)}" y2="${y + h}" stroke="${INK}" stroke-width="${sw * 0.75}"/>`
  return s + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="${sw}"/>`
}

// A bar cut into parts that are NOT equal: `parts` are shares of w; the first k shaded.
const unevenBar = (x, y, w, h, parts, k) => {
  let s = ''
  let at = x
  parts.forEach((p, i) => {
    s += `<rect x="${f(at)}" y="${y}" width="${f(p * w)}" height="${h}" fill="${i < k ? SHADE : '#ffffff'}" stroke="${INK}" stroke-width="3"/>`
    at += p * w
  })
  return s + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="4"/>`
}

const rad = (d) => (d * Math.PI) / 180
const pt = (cx, cy, r, d) => `${f(cx + r * Math.cos(rad(d)))} ${f(cy + r * Math.sin(rad(d)))}`
const wedgePath = (cx, cy, r, a0, a1) =>
  `M ${cx} ${cy} L ${pt(cx, cy, r, a0)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${pt(cx, cy, r, a1)} Z`

// A circle cut into n equal slices from 12 o'clock, clockwise; the first k filled.
// style 'shade': a teal-shaded diagram. style 'pizza': filled slices are pizza
// (crust, cheese, one slice of sausage), empty slices are a dashed outline.
const pie = (cx, cy, r, n, k, style = 'shade') => {
  let s = ''
  const step = 360 / n
  for (let i = 0; i < n; i += 1) {
    const a0 = -90 + i * step
    const a1 = a0 + step
    const mid = (a0 + a1) / 2
    if (style === 'pizza') {
      if (i < k) {
        s += `<path d="${wedgePath(cx, cy, r, a0, a1)}" fill="${CRUST}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`
        s += `<path d="${wedgePath(cx, cy, r * 0.84, a0 + 1, a1 - 1)}" fill="${CHEESE}"/>`
        s += `<circle cx="${f(cx + r * 0.52 * Math.cos(rad(mid)))}" cy="${f(cy + r * 0.52 * Math.sin(rad(mid)))}" r="${f(r * 0.11)}" fill="${SAUCE}"/>`
      } else {
        s += `<path d="${wedgePath(cx, cy, r, a0, a1)}" fill="#f6f7f8" stroke="#9aa5b1" stroke-width="2.5" stroke-dasharray="7 6" stroke-linejoin="round"/>`
      }
    } else {
      s += `<path d="${wedgePath(cx, cy, r, a0, a1)}" fill="${i < k ? SHADE : '#ffffff'}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`
    }
  }
  if (style === 'shade') s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="4"/>`
  return s
}

// A bánh chưng from above, cut the usual way into 8 equal triangles (two
// diagonals and two lines through the middle). `shaded` lists the pieces.
const banh = (cx, cy, side, shaded = []) => {
  const h = side / 2
  const P = [
    [cx - h, cy - h], [cx, cy - h], [cx + h, cy - h], [cx + h, cy],
    [cx + h, cy + h], [cx, cy + h], [cx - h, cy + h], [cx - h, cy],
  ]
  let s = `<rect x="${cx - h - 9}" y="${cy - h - 9}" width="${side + 18}" height="${side + 18}" rx="8" fill="${LEAF}"/>`
  P.forEach((p, i) => {
    const q = P[(i + 1) % 8]
    s += `<path d="M ${cx} ${cy} L ${p[0]} ${p[1]} L ${q[0]} ${q[1]} Z" fill="${shaded.includes(i) ? SHADE : RICE}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`
  })
  return s + `<rect x="${cx - h}" y="${cy - h}" width="${side}" height="${side}" fill="none" stroke="${INK}" stroke-width="3.5"/>`
}

const tick = (cx, cy, r = 26) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${GREEN}"/>
    <path d="M ${f(cx - r * 0.5)} ${f(cy + 0.03 * r)} l ${f(r * 0.35)} ${f(r * 0.35)} l ${f(r * 0.65)} -${f(r * 0.76)}" fill="none" stroke="#ffffff" stroke-width="${f(r * 0.2)}" stroke-linecap="round" stroke-linejoin="round"/>`

const cross = (cx, cy, r = 26) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${RED}"/>
    <path d="M ${f(cx - r * 0.38)} ${f(cy - r * 0.38)} l ${f(r * 0.76)} ${f(r * 0.76)} M ${f(cx + r * 0.38)} ${f(cy - r * 0.38)} l -${f(r * 0.76)} ${f(r * 0.76)}" fill="none" stroke="#ffffff" stroke-width="${f(r * 0.2)}" stroke-linecap="round"/>`

// A raised hand, from lucide. A is a LEFT hand seen from behind (mirrored), B a
// right hand: what a student sees when they raise it palm-forward. As in 4.1–4.4.
const hand = (x, mirror, colour) =>
  `<g transform="translate(${x} 76) scale(${mirror ? '-7 7' : '7'})" fill="none" stroke="${colour}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>`

// A number line: whole numbers at x0 + unit·k, a small tick every quarter.
const numberLine = (x0, y, unit, wholes) => {
  let s = `<line x1="${x0 - 14}" y1="${y}" x2="${x0 + unit * wholes + 14}" y2="${y}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
  for (let q = 0; q <= wholes * 4; q += 1) {
    const x = f(x0 + (unit * q) / 4)
    const whole = q % 4 === 0
    s += `<line x1="${x}" y1="${y - (whole ? 24 : 12)}" x2="${x}" y2="${y + (whole ? 24 : 12)}" stroke="${INK}" stroke-width="${whole ? 5 : 3}"/>`
  }
  return s
}

// A brace under a span, opening upwards: the ends turn up to the span.
const brace = (x1, x2, y) =>
  `<path d="M ${x1} ${y - 14} L ${x1} ${y} L ${x2} ${y} L ${x2} ${y - 14}" fill="none" stroke="${MUTED}" stroke-width="3" stroke-linejoin="round"/>`

const arrow = (x1, y, x2, colour = TEAL) =>
  `<line x1="${x1}" y1="${y}" x2="${x2 - 18}" y2="${y}" stroke="${colour}" stroke-width="7" stroke-linecap="round"/>
    <path d="M ${x2 - 26} ${y - 16} L ${x2} ${y} L ${x2 - 26} ${y + 16} Z" fill="${colour}"/>`

const badge = (cx, cy, colour = PURPLE) => `<circle cx="${cx}" cy="${cy}" r="24" fill="${colour}"/>`

// An empty box where the student writes a number.
const box = (x, y) => `<rect x="${x}" y="${y}" width="52" height="48" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="4"/>`

export const DIAGRAMS = {
  // ── Today you will… (pictures, no words) ─────────────────────────────────
  PIC_SAY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <text x="88" y="126" font-family="${FONT}" font-size="58" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(88, 142, 52)}
    <text x="88" y="198" font-family="${FONT}" font-size="58" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    ${bar(150, 112, 296, 70, 4, 3)}
  </svg>`,

  PIC_SAME: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <text x="70" y="82" font-family="${FONT}" font-size="40" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(70, 94, 36, INK, 4)}
    <text x="70" y="132" font-family="${FONT}" font-size="40" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    ${bar(126, 70, 320, 52, 4, 3)}
    <text x="70" y="202" font-family="${FONT}" font-size="40" font-weight="900" fill="${INK}" text-anchor="middle">6</text>
    ${fl(70, 214, 36, INK, 4)}
    <text x="70" y="252" font-family="${FONT}" font-size="40" font-weight="900" fill="${INK}" text-anchor="middle">8</text>
    ${bar(126, 190, 320, 52, 8, 6)}
    <line x1="366" y1="48" x2="366" y2="266" stroke="${KEY}" stroke-width="4" stroke-dasharray="10 8"/>
  </svg>`,

  PIC_WHOLES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${pie(92, 150, 66, 4, 4, 'pizza')}
    ${pie(240, 150, 66, 4, 4, 'pizza')}
    ${pie(388, 150, 66, 4, 3, 'pizza')}
  </svg>`,

  // ── Numerator and denominator, on a real pizza ───────────────────────────
  // The photo is the pizza in pizza.jpg (600 × 600); the badges sit on the top,
  // top-right and right slices (photo pixels × 370/600, plus the 30/24 offset).
  NUM_DEN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <image href="${pizzaImg}" x="30" y="24" width="370" height="370" preserveAspectRatio="xMidYMid slice"/>
    <rect x="30" y="24" width="370" height="370" rx="10" fill="none" stroke="#e2e8f0" stroke-width="2"/>
    <circle cx="160" cy="86" r="22" fill="${KEY}" stroke="#ffffff" stroke-width="3"/>
    <text x="160" y="95" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">1</text>
    <circle cx="277" cy="129" r="22" fill="${KEY}" stroke="#ffffff" stroke-width="3"/>
    <text x="277" y="138" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">2</text>
    <circle cx="320" cy="175" r="22" fill="${KEY}" stroke="#ffffff" stroke-width="3"/>
    <text x="320" y="184" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">3</text>

    <text x="510" y="172" font-family="${FONT}" font-size="120" font-weight="900" fill="${KEY}" text-anchor="middle">3</text>
    ${fl(510, 198, 104, INK, 8)}
    <text x="510" y="318" font-family="${FONT}" font-size="120" font-weight="900" fill="${INK}" text-anchor="middle">8</text>
    <text x="590" y="112" font-family="${FONT}" font-size="32" font-weight="900" fill="${KEY}">numerator</text>
    <text x="590" y="146" font-family="${FONT}" font-size="28" font-weight="700" fill="${MUTED}">slices eaten</text>
    <text x="590" y="262" font-family="${FONT}" font-size="32" font-weight="900" fill="${KEY}">denominator</text>
    <text x="590" y="296" font-family="${FONT}" font-size="28" font-weight="700" fill="${MUTED}">equal slices</text>

    <text x="40" y="430" font-family="${FONT}" font-size="26" font-weight="700" fill="${MUTED}">4 equal parts</text>
    ${bar(40, 444, 340, 56, 4, 1)}
    ${tick(64, 528, 18)}
    <text x="92" y="537" font-family="${FONT}" font-size="28" font-weight="900" fill="${GREEN}">quarters</text>
    <text x="460" y="430" font-family="${FONT}" font-size="26" font-weight="700" fill="${MUTED}">4 parts</text>
    ${unevenBar(460, 444, 340, 56, [0.4, 0.14, 0.3, 0.16], 1)}
    ${cross(484, 528, 18)}
    <text x="512" y="537" font-family="${FONT}" font-size="28" font-weight="900" fill="${RED}">not quarters</text>
  </svg>`,

  // ── Say it in English ────────────────────────────────────────────────────
  SAY_IT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <line x1="24" y1="216" x2="1096" y2="216" stroke="${RULE}" stroke-width="2"/>
    <line x1="380" y1="30" x2="380" y2="410" stroke="${RULE}" stroke-width="2"/>
    <line x1="746" y1="30" x2="746" y2="410" stroke="${RULE}" stroke-width="2"/>

    <text x="76" y="92" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">1</text>
    ${fl(76, 108, 52)}
    <text x="76" y="160" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    ${bar(134, 74, 226, 52, 2, 1)}
    <text x="247" y="184" font-family="${FONT}" font-size="30" font-weight="900" fill="${KEY}" text-anchor="middle">one half</text>

    <text x="442" y="92" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">1</text>
    ${fl(442, 108, 52)}
    <text x="442" y="160" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${bar(500, 74, 226, 52, 3, 1)}
    <text x="613" y="184" font-family="${FONT}" font-size="30" font-weight="900" fill="${KEY}" text-anchor="middle">one third</text>

    <text x="808" y="92" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">1</text>
    ${fl(808, 108, 52)}
    <text x="808" y="160" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    ${bar(866, 74, 226, 52, 4, 1)}
    <text x="979" y="184" font-family="${FONT}" font-size="30" font-weight="900" fill="${KEY}" text-anchor="middle">one quarter</text>

    <text x="76" y="292" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(76, 308, 52)}
    <text x="76" y="360" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    ${bar(134, 274, 226, 52, 4, 3)}
    <text x="247" y="384" font-family="${FONT}" font-size="30" font-weight="900" fill="${KEY}" text-anchor="middle">three quarters</text>

    <text x="442" y="292" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    ${fl(442, 308, 52)}
    <text x="442" y="360" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">5</text>
    ${bar(500, 274, 226, 52, 5, 2)}
    <text x="613" y="384" font-family="${FONT}" font-size="30" font-weight="900" fill="${KEY}" text-anchor="middle">two fifths</text>

    <text x="808" y="292" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">7</text>
    ${fl(808, 308, 64)}
    <text x="808" y="360" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">10</text>
    ${bar(866, 274, 226, 52, 10, 7)}
    <text x="979" y="384" font-family="${FONT}" font-size="30" font-weight="900" fill="${KEY}" text-anchor="middle">seven tenths</text>
  </svg>`,

  // ── What fraction is shaded? (two of them are the same amount) ───────────
  WHAT_FRACTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="420" y1="24" x2="420" y2="536" stroke="${RULE}" stroke-width="2"/>
    <line x1="24" y1="280" x2="816" y2="280" stroke="${RULE}" stroke-width="2"/>

    ${badge(44, 44)}
    <text x="44" y="53" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">a</text>
    ${bar(70, 108, 320, 80, 3, 1)}

    ${badge(464, 44)}
    <text x="464" y="53" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">b</text>
    ${pie(634, 150, 104, 6, 5)}

    ${badge(44, 324)}
    <text x="44" y="333" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">c</text>
    ${banh(232, 424, 196, [0, 1, 2])}

    ${badge(464, 324)}
    <text x="464" y="333" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">d</text>
    ${bar(490, 388, 320, 80, 6, 2)}
  </svg>`,

  // ── Vote 1 · which fraction is equal to 2/3? ─────────────────────────────
  ANS_34: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, true, BLUE)}
    <text x="440" y="140" font-family="${FONT}" font-size="120" font-weight="900" fill="${BLUE}" text-anchor="middle">3</text>
    ${fl(440, 166, 120, BLUE, 9)}
    <text x="440" y="288" font-family="${FONT}" font-size="120" font-weight="900" fill="${BLUE}" text-anchor="middle">4</text>
  </svg>`,

  ANS_46: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, false, KEY)}
    <text x="280" y="140" font-family="${FONT}" font-size="120" font-weight="900" fill="${KEY}" text-anchor="middle">4</text>
    ${fl(280, 166, 120, KEY, 9)}
    <text x="280" y="288" font-family="${FONT}" font-size="120" font-weight="900" fill="${KEY}" text-anchor="middle">6</text>
  </svg>`,

  // ── Multiply, never add ──────────────────────────────────────────────────
  ADD_OR_TIMES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="72" y="76" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    ${fl(72, 90, 40)}
    <text x="72" y="134" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${bar(140, 52, 620, 70, 3, 2)}

    <text x="72" y="226" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    ${fl(72, 240, 40)}
    <text x="72" y="284" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">6</text>
    ${bar(140, 202, 620, 70, 6, 4)}
    ${tick(802, 237)}
    <text x="140" y="312" font-family="${FONT}" font-size="30" font-weight="900" fill="${GREEN}">× 2 top and bottom</text>

    <text x="72" y="376" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(72, 390, 40)}
    <text x="72" y="434" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    ${bar(140, 352, 620, 70, 4, 3)}
    ${cross(802, 387)}
    <text x="140" y="462" font-family="${FONT}" font-size="30" font-weight="900" fill="${RED}">+ 1 top and bottom</text>

    <line x1="553" y1="36" x2="553" y2="440" stroke="${KEY}" stroke-width="4" stroke-dasharray="10 8"/>
    <text x="553" y="512" font-family="${FONT}" font-size="28" font-weight="900" fill="${KEY}" text-anchor="middle">the same amount ends here</text>
  </svg>`,

  // ── Improper fraction and mixed number ───────────────────────────────────
  IMPROPER_MIXED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="250" y="108" font-family="${FONT}" font-size="96" font-weight="900" fill="${INK}" text-anchor="middle">11</text>
    ${fl(250, 132, 124, INK, 8)}
    <text x="250" y="228" font-family="${FONT}" font-size="96" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="410" y="168" font-family="${FONT}" font-size="90" font-weight="900" fill="${INK}" text-anchor="middle">=</text>
    <text x="528" y="202" font-family="${FONT}" font-size="150" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="616" y="126" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(616, 144, 50, INK, 6)}
    <text x="616" y="202" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="250" y="276" font-family="${FONT}" font-size="28" font-weight="900" fill="${KEY}" text-anchor="middle">improper fraction</text>
    <text x="566" y="276" font-family="${FONT}" font-size="28" font-weight="900" fill="${KEY}" text-anchor="middle">mixed number</text>

    ${pie(142, 400, 84, 4, 4, 'pizza')}
    ${pie(340, 400, 84, 4, 4, 'pizza')}
    ${pie(616, 400, 84, 4, 3, 'pizza')}
    ${brace(52, 430, 504)}
    ${brace(526, 706, 504)}
    <text x="241" y="538" font-family="${FONT}" font-size="28" font-weight="900" fill="${KEY}" text-anchor="middle">whole-number part: 2</text>
    <text x="616" y="538" font-family="${FONT}" font-size="28" font-weight="900" fill="${KEY}" text-anchor="middle">fractional part: 3/4</text>
  </svg>`,

  // ── Both ways: divide; multiply, then add ────────────────────────────────
  BOTH_WAYS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="30" y="46" font-family="${FONT}" font-size="24" font-weight="900" fill="${MUTED}" letter-spacing="2">IMPROPER → MIXED: DIVIDE</text>
    <text x="30" y="104" font-family="${FONT}" font-size="40" font-weight="900" fill="${INK}">11 ÷ 4 = 2 remainder 3</text>
    ${pie(84, 186, 50, 4, 4, 'pizza')}
    ${pie(200, 186, 50, 4, 4, 'pizza')}
    ${pie(360, 186, 50, 4, 3, 'pizza')}
    <text x="142" y="266" font-family="${FONT}" font-size="26" font-weight="700" fill="${MUTED}" text-anchor="middle">2 wholes</text>
    <text x="360" y="266" font-family="${FONT}" font-size="26" font-weight="700" fill="${MUTED}" text-anchor="middle">3 quarters left over</text>
    ${arrow(462, 168, 584)}
    <text x="654" y="216" font-family="${FONT}" font-size="130" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="738" y="150" font-family="${FONT}" font-size="56" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(738, 166, 44, INK, 6)}
    <text x="738" y="216" font-family="${FONT}" font-size="56" font-weight="900" fill="${INK}" text-anchor="middle">4</text>

    <line x1="30" y1="296" x2="810" y2="296" stroke="${RULE}" stroke-width="2"/>

    <text x="30" y="338" font-family="${FONT}" font-size="24" font-weight="900" fill="${MUTED}" letter-spacing="2">MIXED → IMPROPER: MULTIPLY, THEN ADD</text>
    <text x="88" y="486" font-family="${FONT}" font-size="130" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="172" y="420" font-family="${FONT}" font-size="56" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(172, 436, 44, INK, 6)}
    <text x="172" y="486" font-family="${FONT}" font-size="56" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="250" y="418" font-family="${FONT}" font-size="32" font-weight="900" fill="${INK}">2 × 4 = 8 quarters</text>
    <text x="250" y="472" font-family="${FONT}" font-size="32" font-weight="900" fill="${INK}">8 + 3 = 11 quarters</text>
    ${arrow(596, 440, 680)}
    <text x="756" y="424" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">11</text>
    ${fl(756, 444, 82, INK, 6)}
    <text x="756" y="508" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
  </svg>`,

  // ── Vote 2 · which is bigger? ────────────────────────────────────────────
  ANS_134: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(192, true, BLUE)}
    <text x="440" y="140" font-family="${FONT}" font-size="120" font-weight="900" fill="${BLUE}" text-anchor="middle">13</text>
    ${fl(440, 166, 150, BLUE, 9)}
    <text x="440" y="288" font-family="${FONT}" font-size="120" font-weight="900" fill="${BLUE}" text-anchor="middle">4</text>
  </svg>`,

  ANS_312: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${hand(528, false, KEY)}
    <text x="228" y="232" font-family="${FONT}" font-size="180" font-weight="900" fill="${KEY}" text-anchor="middle">3</text>
    <text x="338" y="140" font-family="${FONT}" font-size="80" font-weight="900" fill="${KEY}" text-anchor="middle">1</text>
    ${fl(338, 162, 62, KEY, 7)}
    <text x="338" y="236" font-family="${FONT}" font-size="80" font-weight="900" fill="${KEY}" text-anchor="middle">2</text>
  </svg>`,

  // ── 13 quarters on a number line ─────────────────────────────────────────
  NUMBER_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <rect x="60" y="221" width="812.5" height="18" fill="${BLUE}" opacity="0.22"/>
    ${numberLine(60, 230, 250, 4)}
    <text x="60" y="304" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">0</text>
    <text x="310" y="304" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">1</text>
    <text x="560" y="304" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="810" y="304" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    <text x="1060" y="304" font-family="${FONT}" font-size="44" font-weight="900" fill="${INK}" text-anchor="middle">4</text>

    <text x="620" y="96" font-family="${FONT}" font-size="52" font-weight="900" fill="${BLUE}" text-anchor="middle">13</text>
    ${fl(620, 112, 66, BLUE, 6)}
    <text x="620" y="162" font-family="${FONT}" font-size="52" font-weight="900" fill="${BLUE}" text-anchor="middle">4</text>
    <text x="668" y="146" font-family="${FONT}" font-size="46" font-weight="900" fill="${BLUE}">= 3¼</text>
    <line x1="790" y1="164" x2="868" y2="216" stroke="${BLUE}" stroke-width="4"/>
    <circle cx="872.5" cy="230" r="13" fill="${BLUE}" stroke="#ffffff" stroke-width="3"/>

    <text x="990" y="162" font-family="${FONT}" font-size="80" font-weight="900" fill="${KEY}" text-anchor="middle">3</text>
    <text x="1046" y="114" font-family="${FONT}" font-size="40" font-weight="900" fill="${KEY}" text-anchor="middle">1</text>
    ${fl(1046, 126, 30, KEY, 5)}
    <text x="1046" y="164" font-family="${FONT}" font-size="40" font-weight="900" fill="${KEY}" text-anchor="middle">2</text>
    <line x1="988" y1="176" x2="940" y2="216" stroke="${KEY}" stroke-width="4"/>
    <circle cx="935" cy="230" r="13" fill="${KEY}" stroke="#ffffff" stroke-width="3"/>

    ${brace(60, 872, 352)}
    <text x="466" y="396" font-family="${FONT}" font-size="30" font-weight="900" fill="${MUTED}" text-anchor="middle">13 quarters</text>
  </svg>`,

  // ── Whiteboards: fill the box (a–d), = or ≠ (e, f). No words: the slide says them.
  FILL_BOX: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${badge(46, 112, GREEN)}
    <text x="46" y="121" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">a</text>
    <text x="130" y="98" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(130, 112, 52, INK, 6)}
    <text x="130" y="166" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">5</text>
    <text x="205" y="132" font-family="${FONT}" font-size="56" font-weight="900" fill="${INK}" text-anchor="middle">=</text>
    ${box(259, 52)}
    ${fl(285, 112, 82, INK, 6)}
    <text x="285" y="166" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">10</text>

    ${badge(456, 112, GREEN)}
    <text x="456" y="121" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">b</text>
    <text x="540" y="98" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    ${fl(540, 112, 52, INK, 6)}
    <text x="540" y="166" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">7</text>
    <text x="615" y="132" font-family="${FONT}" font-size="56" font-weight="900" fill="${INK}" text-anchor="middle">=</text>
    ${box(669, 52)}
    ${fl(695, 112, 82, INK, 6)}
    <text x="695" y="166" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">21</text>

    ${badge(46, 276, GREEN)}
    <text x="46" y="285" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">c</text>
    <text x="130" y="262" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">5</text>
    ${fl(130, 276, 52, INK, 6)}
    <text x="130" y="330" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">6</text>
    <text x="205" y="296" font-family="${FONT}" font-size="56" font-weight="900" fill="${INK}" text-anchor="middle">=</text>
    <text x="285" y="262" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">20</text>
    ${fl(285, 276, 82, INK, 6)}
    ${box(259, 284)}

    ${badge(456, 276, GREEN)}
    <text x="456" y="285" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">d</text>
    <text x="548" y="262" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">12</text>
    ${fl(548, 276, 82, INK, 6)}
    <text x="548" y="330" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">16</text>
    <text x="628" y="296" font-family="${FONT}" font-size="56" font-weight="900" fill="${INK}" text-anchor="middle">=</text>
    ${box(678, 216)}
    ${fl(704, 276, 64, INK, 6)}
    <text x="704" y="330" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">4</text>

    <line x1="24" y1="372" x2="816" y2="372" stroke="${RULE}" stroke-width="2"/>

    ${badge(46, 462, GREEN)}
    <text x="46" y="471" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">e</text>
    <text x="130" y="448" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(130, 462, 52, INK, 6)}
    <text x="130" y="516" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    ${box(190, 438)}
    <text x="300" y="448" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">9</text>
    ${fl(300, 462, 82, INK, 6)}
    <text x="300" y="516" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">12</text>

    ${badge(456, 462, GREEN)}
    <text x="456" y="471" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">f</text>
    <text x="540" y="448" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    ${fl(540, 462, 52, INK, 6)}
    <text x="540" y="516" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">5</text>
    ${box(600, 438)}
    <text x="710" y="448" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(710, 462, 52, INK, 6)}
    <text x="710" y="516" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">6</text>
  </svg>`,

  // ── Whiteboards: improper → mixed (a–d), mixed → improper (e–g). No words.
  CHANGE_THESE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${badge(52, 150, GREEN)}
    <text x="52" y="159" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">a</text>
    <text x="126" y="136" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">9</text>
    ${fl(126, 150, 54, INK, 6)}
    <text x="126" y="208" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">4</text>

    ${badge(252, 150, GREEN)}
    <text x="252" y="159" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">b</text>
    <text x="334" y="136" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">13</text>
    ${fl(334, 150, 86, INK, 6)}
    <text x="334" y="208" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">5</text>

    ${badge(452, 150, GREEN)}
    <text x="452" y="159" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">c</text>
    <text x="534" y="136" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">17</text>
    ${fl(534, 150, 86, INK, 6)}
    <text x="534" y="208" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">3</text>

    ${badge(652, 150, GREEN)}
    <text x="652" y="159" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">d</text>
    <text x="734" y="136" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">23</text>
    ${fl(734, 150, 86, INK, 6)}
    <text x="734" y="208" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">10</text>

    <line x1="24" y1="290" x2="816" y2="290" stroke="${RULE}" stroke-width="2"/>

    ${badge(52, 420, GREEN)}
    <text x="52" y="429" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">e</text>
    <text x="126" y="456" font-family="${FONT}" font-size="100" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    <text x="194" y="406" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">1</text>
    ${fl(194, 420, 44, INK, 5)}
    <text x="194" y="466" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">2</text>

    ${badge(322, 420, GREEN)}
    <text x="322" y="429" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">f</text>
    <text x="396" y="456" font-family="${FONT}" font-size="100" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="464" y="406" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(464, 420, 44, INK, 5)}
    <text x="464" y="466" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">5</text>

    ${badge(592, 420, GREEN)}
    <text x="592" y="429" font-family="${FONT}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">g</text>
    <text x="666" y="456" font-family="${FONT}" font-size="100" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="734" y="406" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    ${fl(734, 420, 44, INK, 5)}
    <text x="734" y="466" font-family="${FONT}" font-size="52" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
  </svg>`,

  // ── Draw this: 11/4 = 2¾ ─────────────────────────────────────────────────
  DRAW_THIS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="90" y="92" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">11</text>
    ${fl(90, 110, 84, INK, 6)}
    <text x="90" y="172" font-family="${FONT}" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="182" y="146" font-family="${FONT}" font-size="60" font-weight="900" fill="${INK}" text-anchor="middle">=</text>
    <text x="268" y="168" font-family="${FONT}" font-size="110" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="338" y="110" font-family="${FONT}" font-size="48" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    ${fl(338, 124, 40, INK, 5)}
    <text x="338" y="168" font-family="${FONT}" font-size="48" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="430" y="130" font-family="${FONT}" font-size="30" font-weight="900" fill="${TEAL}">11 ÷ 4 = 2 remainder 3</text>

    ${pie(110, 292, 72, 4, 4, 'pizza')}
    ${pie(274, 292, 72, 4, 4, 'pizza')}
    ${pie(470, 292, 72, 4, 3, 'pizza')}

    ${numberLine(60, 462, 240, 3)}
    <text x="60" y="524" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">0</text>
    <text x="300" y="524" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">1</text>
    <text x="540" y="524" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="780" y="524" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    <circle cx="720" cy="462" r="13" fill="${KEY}" stroke="#ffffff" stroke-width="3"/>
    <text x="720" y="418" font-family="${FONT}" font-size="40" font-weight="900" fill="${KEY}" text-anchor="middle">2¾</text>
  </svg>`,
}
