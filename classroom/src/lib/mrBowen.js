// src/lib/mrBowen.js
// Mr Bowen, the cartoon in the story strips, widgets and diagrams. Drawn from
// his staff photo and the class photos on pra.edu.vn (About page, Oct 2026):
// dark hair short at the sides and slicked back on top, a short dark beard, thin
// dark glasses, a big grin, the rust-and-cream striped short-sleeved shirt,
// dark trousers, a belt, a watch on his left wrist. No tie, no áo dài.
//
// One SVG string, so a JSX widget (MrBowen in U03_coffee/dating.jsx) and a
// template-string diagram draw the same man.
//
// His frame never changes: x = 0 is his middle, y = 0 is about the top of his
// forehead (the hair reaches y = -31) and his soles are at y = 268, so stand
// him on a floor with y = FLOOR - 268 * scale. He is tall, with broad
// shoulders and a slim waist: about 115 wide with his arms down.
//
//   mood       'happy' (a grin) · 'sad' · 'dizzy' (spiral eyes) · 'asleep'
//   frozen     icy blue, eyes shut
//   handLeft, handRight
//              where each hand goes, [x, y] in his frame, by SCREEN side
//              (handRight is his left hand, the one with the watch). Both hang
//              at his sides unless given. The elbow is worked out; pass
//              elbowLeft / elbowRight to place it yourself, e.g. a forearm
//              pointing at the class.
const INK = '#2b2b2b'
const WARM = {
  skin: '#f2c9a5', line: '#b9805c', hair: '#2f2420', beard: '#5a4334', brow: '#2f2420',
  shirt: '#fbf1e4', stripe: '#c9643a', trousers: '#39424f', belt: '#1f2328', shoe: '#2a2320', strap: '#e8892b', sheen: '#5a463a',
}
const ICE = {
  skin: '#cfe0ec', line: '#8fa9bf', hair: '#a9bfd1', beard: '#8fa9bf', brow: '#8fa9bf',
  shirt: '#e8f0f6', stripe: '#9db8cf', trousers: '#7b93a8', belt: '#6d8499', shoe: '#6d8499', strap: '#b7cadb', sheen: '#d3e0ea',
}

const SHOULDER = [43, 97] // the right one; the left is mirrored
const UPPER = 44 // shoulder to elbow
const FORE = 42 // elbow to hand
const n = (v) => Math.round(v * 10) / 10
const pt = (p) => `${n(p[0])} ${n(p[1])}`

// Two bones, so the elbow sits where the arm can bend: out and down. Out of
// reach, the arm points straight at the hand.
function elbowFor(s, h, side) {
  const dx = h[0] - s[0], dy = h[1] - s[1]
  const d = Math.hypot(dx, dy) || 1
  if (d >= UPPER + FORE) return [s[0] + (dx * UPPER) / (UPPER + FORE), s[1] + (dy * UPPER) / (UPPER + FORE)]
  const a = (UPPER ** 2 - FORE ** 2 + d ** 2) / (2 * d)
  const k = Math.sqrt(Math.max(0, UPPER ** 2 - a ** 2))
  const px = s[0] + (dx * a) / d, py = s[1] + (dy * a) / d
  const c1 = [px - (dy * k) / d, py + (dx * k) / d]
  const c2 = [px + (dy * k) / d, py - (dx * k) / d]
  const out = (e) => side * e[0] + 0.6 * e[1]
  return out(c1) >= out(c2) ? c1 : c2
}

function arm(side, hand, elbow, c) {
  const s = [side * SHOULDER[0], SHOULDER[1]]
  const h = hand || [side * 53, 182]
  const e = elbow || elbowFor(s, h, side)
  const ux = e[0] - s[0], uy = e[1] - s[1]
  const ul = Math.hypot(ux, uy) || 1
  // the short sleeve: 60% of the upper arm, two stripes down it
  const hem = [s[0] + ux * 0.6, s[1] + uy * 0.6]
  const hemOut = [hem[0] + (ux / ul) * 2, hem[1] + (uy / ul) * 2]
  const ox = (-uy / ul) * 5, oy = (ux / ul) * 5
  let svg = `
    <path d="M ${pt(s)} L ${pt(e)} L ${pt(h)}" fill="none" stroke="${INK}" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${pt(s)} L ${pt(e)} L ${pt(h)}" fill="none" stroke="${c.skin}" stroke-width="14.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${n(s[0])}" cy="${n(s[1])}" r="14" fill="${INK}"/>
    <path d="M ${pt(s)} L ${pt(hemOut)}" stroke="${INK}" stroke-width="28"/>
    <circle cx="${n(s[0])}" cy="${n(s[1])}" r="12" fill="${c.shirt}"/>
    <path d="M ${pt(s)} L ${pt(hem)}" stroke="${c.shirt}" stroke-width="24"/>
    <path d="M ${n(s[0] + ox)} ${n(s[1] + oy)} L ${n(hem[0] + ox)} ${n(hem[1] + oy)} M ${n(s[0] - ox)} ${n(s[1] - oy)} L ${n(hem[0] - ox)} ${n(hem[1] - oy)}" stroke="${c.stripe}" stroke-width="3"/>`
  if (side > 0) {
    // the watch, on his left wrist
    const fx = h[0] - e[0], fy = h[1] - e[1]
    const w0 = [e[0] + fx * 0.68, e[1] + fy * 0.68], w1 = [e[0] + fx * 0.84, e[1] + fy * 0.84]
    svg += `
    <path d="M ${pt(w0)} L ${pt(w1)}" stroke="${c.strap}" stroke-width="13"/>
    <circle cx="${n((w0[0] + w1[0]) / 2)}" cy="${n((w0[1] + w1[1]) / 2)}" r="3.6" fill="${INK}"/>`
  }
  return svg + `
    <circle cx="${n(h[0])}" cy="${n(h[1])}" r="8.5" fill="${c.skin}" stroke="${INK}" stroke-width="2.5"/>`
}

// a spiral inside each lens, for a dizzy Mr Bowen
const spiral = (cx, cy) => `M ${cx} ${cy - 7} a 7 7 0 1 1 -7 7 a 5 5 0 1 1 5 5 a 3 3 0 1 1 -3 -3`

function face(mood, frozen, c) {
  const shut = frozen || mood === 'asleep'
  const brows = {
    happy: 'M -25 14 Q -16 9 -7 13 M 7 13 Q 16 9 25 14',
    sad: 'M -25 15 Q -16 13 -7 8 M 7 8 Q 16 13 25 15',
    dizzy: 'M -25 12 Q -16 7 -7 11 M 7 16 Q 16 14 25 17',
    calm: 'M -25 15 Q -16 12 -7 15 M 7 15 Q 16 12 25 15',
  }[shut ? 'calm' : mood] || 'M -25 14 Q -16 9 -7 13 M 7 13 Q 16 9 25 14'
  let eyes
  if (shut) eyes = `<path d="M -21 30 q 6 4 12 0 M 9 30 q 6 4 12 0" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
  else if (mood === 'dizzy') eyes = `<path d="${spiral(-16, 30)} ${spiral(16, 30)}" stroke="${INK}" stroke-width="2" fill="none"/>`
  else eyes = `
    <ellipse cx="-16" cy="30" rx="3.6" ry="4.4" fill="${INK}"/><ellipse cx="16" cy="30" rx="3.6" ry="4.4" fill="${INK}"/>
    <circle cx="-14.8" cy="28.4" r="1.2" fill="#ffffff"/><circle cx="17.2" cy="28.4" r="1.2" fill="#ffffff"/>`
  let mouth
  if (frozen) mouth = `<path d="M -9 62 q 4.5 -3 9 0 q 4.5 3 9 0" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
  else if (mood === 'asleep') mouth = `<path d="M -7 61 q 7 4 14 0" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
  else if (mood === 'sad') mouth = `<path d="M -12 65 q 12 -10 24 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`
  else if (mood === 'dizzy') mouth = `<path d="M -14 61 q 4.5 -6 9 0 q 4.5 6 9 0 q 4.5 -6 9 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`
  else mouth = `<path d="M -15 54 Q 0 57 15 54 Q 12 69 0 69 Q -12 69 -15 54 Z" fill="#ffffff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`
  return `
    <ellipse cx="-34" cy="36" rx="6.5" ry="10" fill="${c.skin}" stroke="${INK}" stroke-width="2.5"/>
    <ellipse cx="34" cy="36" rx="6.5" ry="10" fill="${c.skin}" stroke="${INK}" stroke-width="2.5"/>
    <ellipse cx="0" cy="30" rx="34" ry="43" fill="${c.skin}" stroke="${INK}" stroke-width="2.5"/>
    <path d="M -33.5 36 A 34 43 0 0 0 33.5 36 L 28 42 Q 23 51 15 50 Q 8 44 0 46 Q -8 44 -15 50 Q -23 51 -28 42 Z" fill="${c.beard}" opacity="0.5"/>
    <path d="M -1 35 Q -5 44 -1 46 Q 2 47 5 45" fill="none" stroke="${c.line}" stroke-width="2.4" stroke-linecap="round"/>
    ${mouth}
    ${eyes}
    <g fill="none" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round">
      <rect x="-27" y="21" width="22" height="17" rx="5"/><rect x="5" y="21" width="22" height="17" rx="5"/>
      <path d="M -5 27 Q 0 24 5 27 M -27 26 L -32 24 M 27 26 L 32 24"/>
    </g>
    <path d="${brows}" stroke="${c.brow}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="${HAIR[0]}" fill="${c.hair}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="${HAIR[1]}" stroke="${c.sheen}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
}

// Slicked back: short at the sides, smooth on top, the hairline above the
// eyebrows. [outline, comb lines]
const HAIR = [
  'M -33 36 L -34 12 Q -37 -12 -20 -22 Q -2 -31 16 -27 Q 34 -22 35 -2 L 34 16 L 33 36 L 29 34 L 28 12 Q 27 -2 16 -4 Q 0 -6 -16 -4 Q -27 -2 -28 12 L -29 34 Z',
  'M -22 -9 Q -8 -21 10 -21 M -12 -4 Q 4 -15 22 -14 M 4 -6 Q 17 -11 29 -5',
]

export function mrBowenSvg({ x = 0, y = 0, scale = 1, mood = 'happy', frozen = false, handLeft, handRight, elbowLeft, elbowRight } = {}) {
  const c = frozen ? ICE : WARM
  const stripes = [-3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5]
    .map((k) => `M ${k * 11.5} 89 L ${k * 8} 169`).join(' ')
  return `<g transform="translate(${n(x)} ${n(y)}) scale(${scale})">
    <path d="M -33 174 L 33 174 L 34 254 L 4 254 L 1.5 196 L -1.5 196 L -4 254 L -34 254 Z" fill="${c.trousers}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M -40 268 Q -41 254 -29 253 L -5 253 Q -2.5 253 -2.5 258 L -2.5 268 Z M 40 268 Q 41 254 29 253 L 5 253 Q 2.5 253 2.5 258 L 2.5 268 Z" fill="${c.shoe}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="-12" y="60" width="24" height="26" fill="${c.skin}" stroke="${INK}" stroke-width="2.5"/>
    <path d="M -12 79 L -38 82 Q -52 85 -52 100 L -34 172 L 34 172 L 52 100 Q 52 85 38 82 L 12 79 Z" fill="${c.shirt}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="${stripes}" stroke="${c.stripe}" stroke-width="4"/>
    <rect x="-34.5" y="165" width="69" height="10" fill="${c.belt}"/>
    <rect x="-6" y="165.5" width="12" height="9" rx="1.5" fill="none" stroke="#c9ccd1" stroke-width="2"/>
    <path d="M -12 79 L 12 79 L 0 103 Z" fill="${c.skin}"/>
    <path d="M -12 78 L -25 83 L -17 96 L 0 104 Z M 12 78 L 25 83 L 17 96 L 0 104 Z" fill="${c.shirt}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M 0 104 L 0 165" stroke="${INK}" stroke-width="1.5" opacity="0.45"/>
    <circle cx="0" cy="120" r="2.3" fill="${c.shirt}" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="0" cy="138" r="2.3" fill="${c.shirt}" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="0" cy="156" r="2.3" fill="${c.shirt}" stroke="${INK}" stroke-width="1.5"/>
    ${arm(-1, handLeft, elbowLeft, c)}
    ${arm(1, handRight, elbowRight, c)}
    ${face(mood, frozen, c)}
  </g>`
}
