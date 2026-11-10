// content/y7-science/U03_6/art.js
// The new pictures of 3.6 Changes in energy, as SVG strings, in the style of
// 3.5's art.js (which this re-exports, so the decks share one set of colours,
// helpers, objects and the eight energy actions). Flat pale fills, dark ink
// outlines, NO text: labels are written out literally where a picture is
// used, so `npm run audit:svg` can measure them.
//
// Each object is drawn about its own centre (0, 0) in a box roughly 300 × 200
// and placed with (x, y, s).

import { INK, KEY, MUTED, RED, GOLD, SEA, SEA_EDGE, GREEN, BLUE, f1, arrow } from '../U03_5/art.js'

export * from '../U03_5/art.js'

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`

// A flame: an outer teardrop, an inner yellow one. Blue for a gas flame.
export const flame = (cx, cy, h, outer = '#f29a2e') => `<path d="M ${cx} ${cy - h} C ${f1(cx + h * 0.42)} ${f1(cy - h * 0.45)} ${f1(cx + h * 0.36)} ${cy} ${cx} ${cy} C ${f1(cx - h * 0.36)} ${cy} ${f1(cx - h * 0.42)} ${f1(cy - h * 0.45)} ${cx} ${cy - h} Z" fill="${outer}" stroke="${INK}" stroke-width="2.5"/>
  <path d="M ${cx} ${f1(cy - h * 0.62)} C ${f1(cx + h * 0.22)} ${f1(cy - h * 0.3)} ${f1(cx + h * 0.18)} ${f1(cy - h * 0.04)} ${cx} ${f1(cy - h * 0.04)} C ${f1(cx - h * 0.18)} ${f1(cy - h * 0.04)} ${f1(cx - h * 0.22)} ${f1(cy - h * 0.3)} ${cx} ${f1(cy - h * 0.62)} Z" fill="#ffd45c"/>`

/** A lit candle on a saucer. */
export const candle = (x, y, s = 1) => at(x, y, s, `
  <ellipse cx="0" cy="84" rx="70" ry="14" fill="#c3c9d1" stroke="${INK}" stroke-width="3"/>
  <rect x="-26" y="-30" width="52" height="112" rx="6" fill="#f4efe9" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -26 -22 q 10 10 0 22" fill="none" stroke="#e2d9cc" stroke-width="5"/>
  <line x1="0" y1="-30" x2="0" y2="-44" stroke="${INK}" stroke-width="3"/>
  ${flame(0, -40, 58)}`)

/** A gas burner: a row of small blue flames. */
export const burner = (x, y, s = 1) => at(x, y, s, `
  <rect x="-80" y="20" width="160" height="22" rx="8" fill="${MUTED}" stroke="${INK}" stroke-width="3"/>
  ${[-56, -28, 0, 28, 56].map((dx) => flame(dx, 20, 56, '#5b9bd5')).join('')}`)

/** A wood fire: logs, flames. */
export const fire = (x, y, s = 1) => at(x, y, s, `
  <path d="M -96 64 L 70 30 M -70 30 L 96 64" stroke="#8a5a2b" stroke-width="22" stroke-linecap="round"/>
  <path d="M -96 64 L 70 30 M -70 30 L 96 64" stroke="#5b3a1c" stroke-width="22" stroke-linecap="round" stroke-dasharray="0 150 0 400" opacity="0.4"/>
  ${flame(-34, 40, 104)}${flame(30, 40, 124)}${flame(0, 44, 72)}`)

/** A radio, playing. */
export const radio = (x, y, s = 1) => at(x, y, s, `
  <line x1="40" y1="-52" x2="96" y2="-118" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <rect x="-110" y="-56" width="220" height="130" rx="18" fill="#d9822b" stroke="${INK}" stroke-width="4"/>
  <circle cx="-48" cy="8" r="40" fill="#5b3a1c" stroke="${INK}" stroke-width="3"/>
  <circle cx="-48" cy="8" r="16" fill="#3d2a17"/>
  <rect x="14" y="-30" width="76" height="34" rx="5" fill="#fff3b0" stroke="${INK}" stroke-width="3"/>
  <line x1="34" y1="-30" x2="34" y2="4" stroke="${RED}" stroke-width="3"/>
  <circle cx="30" cy="38" r="12" fill="${INK}"/><circle cx="72" cy="38" r="12" fill="${INK}"/>
  <path d="M 128 -30 q 12 22 0 44 M 146 -44 q 22 36 0 72" fill="none" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>`)

/** A television, switched on. */
export const tv = (x, y, s = 1) => at(x, y, s, `
  <rect x="-130" y="-86" width="260" height="160" rx="12" fill="#3d4650" stroke="${INK}" stroke-width="4"/>
  <rect x="-116" y="-72" width="232" height="132" rx="6" fill="${SEA}"/>
  <path d="M -116 30 L -60 -14 L -20 16 L 30 -30 L 116 40 V 60 H -116 Z" fill="#a8d08d"/>
  <circle cx="64" cy="-40" r="16" fill="#ffd45c"/>
  <path d="M -30 74 L -48 98 H 48 L 30 74 Z" fill="${MUTED}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`)

/** An apple falling from a tree. */
export const appleFall = (x, y, s = 1) => at(x, y, s, `
  <rect x="-128" y="-10" width="26" height="110" fill="#8a5a2b" stroke="${INK}" stroke-width="3"/>
  <circle cx="-150" cy="-50" r="52" fill="#86ba69" stroke="${INK}" stroke-width="3"/>
  <circle cx="-86" cy="-72" r="48" fill="#86ba69" stroke="${INK}" stroke-width="3"/>
  <circle cx="-150" cy="-50" r="49" fill="#86ba69"/><circle cx="-86" cy="-72" r="45" fill="#86ba69"/>
  <path d="M -60 -40 L -20 -40" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/>
  <path d="M 30 -30 v -14 M 44 -20 v -14 M 16 -20 v -14" stroke="#9aa7b4" stroke-width="5" stroke-linecap="round"/>
  <circle cx="30" cy="10" r="24" fill="${RED}" stroke="${INK}" stroke-width="3"/>
  <path d="M 30 -14 q 4 -10 12 -12" fill="none" stroke="${GREEN}" stroke-width="4" stroke-linecap="round"/>
  ${arrow(30, 46, 30, 96, BLUE, 6, 18)}
  <line x1="-170" y1="102" x2="120" y2="102" stroke="${MUTED}" stroke-width="4"/>`)

/** A solar panel in the sunshine. */
export const solar = (x, y, s = 1) => at(x, y, s, `
  <circle cx="-110" cy="-80" r="30" fill="#ffd45c" stroke="${INK}" stroke-width="3"/>
  ${[0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
    const a = (d * Math.PI) / 180
    return `<line x1="${f1(-110 + 38 * Math.cos(a))}" y1="${f1(-80 + 38 * Math.sin(a))}" x2="${f1(-110 + 52 * Math.cos(a))}" y2="${f1(-80 + 52 * Math.sin(a))}" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>`
  }).join('')}
  <path d="M -60 -60 L -24 -30 M -74 -40 L -40 -12" stroke="${GOLD}" stroke-width="4" stroke-dasharray="8 7" stroke-linecap="round"/>
  <path d="M -50 60 L 0 -40 L 150 -40 L 100 60 Z" fill="#1a3f73" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -25 10 L 125 10 M -38 35 L 112 35 M -12 -15 L 138 -15 M 0 -40 L -50 60 M 50 -40 L 0 60 M 100 -40 L 50 60" stroke="#7fa7cf" stroke-width="2.5"/>
  <path d="M 30 60 V 100 M 60 60 V 100" stroke="${MUTED}" stroke-width="7"/>
  <line x1="-80" y1="102" x2="160" y2="102" stroke="${MUTED}" stroke-width="4"/>`)

/** A wind turbine, its blades turning. */
export const turbine = (x, y, s = 1) => {
  const blades = [0, 120, 240].map((d) => `<path d="M 0 0 L -13 -10 Q -10 -80 0 -100 Q 10 -80 13 -10 Z" transform="rotate(${d + 20})" fill="#ffffff" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`).join('')
  const arc = (a1, a2) => {
    const p = (d) => [f1(118 * Math.cos((d * Math.PI) / 180)), f1(-40 + 118 * Math.sin((d * Math.PI) / 180))]
    const [x1, y1] = p(a1), [x2, y2] = p(a2)
    return `<path d="M ${x1} ${y1} A 118 118 0 0 1 ${x2} ${y2}" fill="none" stroke="${SEA_EDGE}" stroke-width="5" stroke-linecap="round"/>`
  }
  return at(x, y, s, `
  <path d="M -9 -34 L -18 116 H 18 L 9 -34 Z" fill="#ffffff" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  ${arc(200, 245)}${arc(320, 365)}${arc(80, 125)}
  <g transform="translate(0 -40)">${blades}<circle cx="0" cy="0" r="14" fill="#e9edf1" stroke="${INK}" stroke-width="3"/></g>
  <line x1="-90" y1="118" x2="90" y2="118" stroke="${MUTED}" stroke-width="4"/>`)
}

/** A firework bursting. */
export const firework = (x, y, s = 1) => at(x, y, s, `
  ${Array.from({ length: 12 }, (_, k) => {
    const a = (k * 30 * Math.PI) / 180
    const c = ['#d83a2e', '#e8a317', '#1a5fa8', '#4a8b23'][k % 4]
    return `<line x1="${f1(24 * Math.cos(a))}" y1="${f1(-40 + 24 * Math.sin(a))}" x2="${f1(84 * Math.cos(a))}" y2="${f1(-40 + 84 * Math.sin(a))}" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="${f1(96 * Math.cos(a))}" cy="${f1(-40 + 96 * Math.sin(a))}" r="6" fill="${c}"/>`
  }).join('')}
  <circle cx="0" cy="-40" r="14" fill="#ffd45c" stroke="${INK}" stroke-width="2.5"/>
  <path d="M 0 -26 Q 6 40 -4 100" fill="none" stroke="#9aa7b4" stroke-width="4" stroke-dasharray="6 7" stroke-linecap="round"/>`)

/** A bird flying up. */
export const bird = (x, y, s = 1) => at(x, y, s, `
  <path d="M -70 30 Q -20 -10 10 0 Q 40 -8 70 -40 Q 50 10 20 20 Q -10 40 -70 30 Z" fill="#7fa7cf" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M -10 6 Q -40 -70 -10 -96 Q 10 -50 18 0 Z" fill="#5b8dbf" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <circle cx="58" cy="-30" r="4" fill="${INK}"/>
  <path d="M 70 -40 l 18 -2 l -14 10" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>
  ${arrow(-110, 80, -60, 30, BLUE, 5, 16)}`)

/** A ball rolling down a hill. */
export const hillBall = (x, y, s = 1) => at(x, y, s, `
  <path d="M -160 -60 Q -40 -40 40 50 Q 80 90 160 96 V 110 H -160 Z" fill="#a8d08d" stroke="${INK}" stroke-width="3.5"/>
  <circle cx="-30" cy="-42" r="26" fill="${RED}" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -48 -50 q 18 -10 36 0" fill="none" stroke="#ffffff" stroke-width="3"/>
  <path d="M -90 -84 q 14 -6 28 -2 M -96 -64 q 14 -4 26 0" fill="none" stroke="#9aa7b4" stroke-width="4" stroke-linecap="round"/>
  ${arrow(10, -16, 70, 50, BLUE, 5, 16)}`)

/** A toaster, the bread in it glowing. */
export const toaster = (x, y, s = 1) => at(x, y, s, `
  <rect x="-60" y="-86" width="44" height="40" rx="6" fill="#e3b778" stroke="${INK}" stroke-width="3"/>
  <rect x="16" y="-86" width="44" height="40" rx="6" fill="#e3b778" stroke="${INK}" stroke-width="3"/>
  <rect x="-110" y="-56" width="220" height="130" rx="30" fill="#c3c9d1" stroke="${INK}" stroke-width="4"/>
  <rect x="-70" y="-56" width="52" height="10" fill="${RED}"/><rect x="18" y="-56" width="52" height="10" fill="${RED}"/>
  <rect x="98" y="-10" width="22" height="40" rx="5" fill="${INK}"/>
  <path d="M -40 -110 q -7 -9 0 -18 q 7 -9 0 -18 M 40 -110 q -7 -9 0 -18 q 7 -9 0 -18" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>`)

/** A power station's generator: a wheel of blades in its case, spinning. */
export const generator = (x, y, s = 1) => {
  const blades = Array.from({ length: 8 }, (_, k) => `<path d="M 0 -12 Q 18 -30 8 -52 L -6 -50 Q 4 -30 -8 -14 Z" transform="rotate(${k * 45})" fill="#c3c9d1" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`).join('')
  const spin = (a1, a2) => {
    const p = (d) => [f1(78 * Math.cos((d * Math.PI) / 180)), f1(78 * Math.sin((d * Math.PI) / 180))]
    const [x1, y1] = p(a1), [x2, y2] = p(a2)
    const a = (a2 * Math.PI) / 180
    const tx = -Math.sin(a), ty = Math.cos(a) // the way round, at the end
    const hx = x2 + 14 * tx, hy = y2 + 14 * ty
    return `<path d="M ${x1} ${y1} A 78 78 0 0 1 ${x2} ${y2}" fill="none" stroke="${BLUE}" stroke-width="5" stroke-linecap="round"/>
      <path d="M ${f1(hx)} ${f1(hy)} L ${f1(x2 + 9 * Math.cos(a))} ${f1(y2 + 9 * Math.sin(a))} L ${f1(x2 - 9 * Math.cos(a))} ${f1(y2 - 9 * Math.sin(a))} Z" fill="${BLUE}"/>`
  }
  return at(x, y, s, `
  <circle cx="0" cy="0" r="62" fill="#e9edf1" stroke="${INK}" stroke-width="4"/>
  ${blades}
  <circle cx="0" cy="0" r="13" fill="${MUTED}" stroke="${INK}" stroke-width="3"/>
  ${spin(-150, -60)}${spin(30, 120)}`)
}

/** A kettle that does not work: no steam, a crack down its side. */
export const brokenKettle = (x, y, s = 1) => at(x, y, s, `
  <path d="M -64 -30 Q -122 -22 -112 26 Q -106 48 -68 44" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M 58 -6 L 108 -50 L 118 -38 L 66 24 Z" fill="#dfe6ee" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -72 62 L -62 -40 Q -60 -62 -40 -62 L 40 -62 Q 60 -62 62 -40 L 72 62 Z" fill="#dfe6ee" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -38 -62 Q 0 -84 38 -62" fill="#c3c9d1" stroke="${INK}" stroke-width="4"/>
  <circle cx="0" cy="-80" r="9" fill="${INK}"/>
  <rect x="-80" y="60" width="160" height="18" rx="7" fill="#3d4650"/>
  <path d="M -8 -58 L 10 -30 L -6 -8 L 14 18 L 0 40" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`)

/** A tennis ball (for the goals picture and the bouncing ball). */
export const tennisBall = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#d7e84a" stroke="${INK}" stroke-width="${r > 30 ? 3.5 : 2.5}"/>
  <path d="M ${f1(cx - r * 0.95)} ${f1(cy - r * 0.3)} Q ${cx} ${f1(cy + r * 0.25)} ${f1(cx + r * 0.2)} ${f1(cy + r * 0.98)} M ${f1(cx - r * 0.2)} ${f1(cy - r * 0.98)} Q ${cx} ${f1(cy - r * 0.25)} ${f1(cx + r * 0.95)} ${f1(cy + r * 0.3)}" fill="none" stroke="#ffffff" stroke-width="${r > 30 ? 4 : 3}"/>`
