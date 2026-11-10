// content/y7-science/U03_7/art.js
// The new pictures of 3.7 Where does energy go?, as SVG strings, in the style
// of 3.5's and 3.6's art.js (which this re-exports, so the three decks share
// one set of colours, helpers, objects and the eight energy actions). Flat
// pale fills, dark ink outlines, NO text: labels are written out literally
// where a picture is used, so `npm run audit:svg` can measure them.
//
// Each object is drawn about its own centre (0, 0) in a box roughly 300 × 200
// and placed with (x, y, s).
//
// Useful is GREEN and wasted is RED, on every picture, diagram and model in
// the deck. Heat is drawn as red wavy lines, as it was in 3.6.

import { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, SEA, f1 } from '../U03_6/art.js'

export * from '../U03_6/art.js'

export const USEFUL = GREEN
export const WASTED = RED

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`

/** Heat rising: `n` red wavy lines side by side, their feet on y. */
export const squiggles = (x, y, n = 3, gap = 24, len = 2, color = RED, w = 5) => {
  const d = Array.from({ length: n }, (_, i) => {
    const cx = f1(x + (i - (n - 1) / 2) * gap)
    return `M ${cx} ${y}${' q -8 -11 0 -22 q 8 -11 0 -22'.repeat(len)}`
  }).join(' ')
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`
}

/** Sound: three arcs opening upward, stacked, centred on x. */
export const noise = (x, y, color = KEY, w = 5) =>
  `<path d="M ${x - 18} ${y} q 18 -14 36 0 M ${x - 30} ${y - 16} q 30 -24 60 0 M ${x - 42} ${y - 32} q 42 -34 84 0" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`

/**
 * A step-through motorbike (the kind most of Vietnam rides), facing right.
 * The engine sits low between the wheels (about 0, 34) and the exhaust runs
 * back under the seat to its tip (about −178, 59): the two places the wasted
 * heat comes from. The wheels stand on y = 92.
 */
export const motorbike = (x, y, s = 1, body = BLUE) => at(x, y, s, `
  <circle cx="-95" cy="50" r="42" fill="#3d4650" stroke="${INK}" stroke-width="3.5"/>
  <circle cx="-95" cy="50" r="17" fill="#c3c9d1" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="105" cy="50" r="42" fill="#3d4650" stroke="${INK}" stroke-width="3.5"/>
  <circle cx="105" cy="50" r="17" fill="#c3c9d1" stroke="${INK}" stroke-width="2.5"/>
  <line x1="80" y1="-50" x2="105" y2="50" stroke="#8f9aa6" stroke-width="9" stroke-linecap="round"/>
  <path d="M 68 20 Q 105 -8 142 20" fill="none" stroke="${body}" stroke-width="9" stroke-linecap="round"/>
  <rect x="-38" y="12" width="76" height="44" rx="9" fill="#c3c9d1" stroke="${INK}" stroke-width="3"/>
  <path d="M -28 24 H 28 M -28 34 H 28 M -28 44 H 28" stroke="${MUTED}" stroke-width="2.5"/>
  <path d="M -14 -24 Q 6 14 28 10 Q 48 6 74 -52" fill="none" stroke="${INK}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M -14 -24 Q 6 14 28 10 Q 48 6 74 -52" fill="none" stroke="${body}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M -160 -2 Q -162 -34 -122 -36 L -26 -36 Q -6 -36 -4 -16 L -4 -2 Z" fill="${body}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M -146 -36 Q -142 -56 -112 -56 L -34 -54 Q -16 -52 -18 -36 Z" fill="#2b2b2b" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="-166" y="-26" width="12" height="12" rx="3" fill="${RED}" stroke="${INK}" stroke-width="2"/>
  <path d="M 30 50 Q 24 70 -10 70 L -72 62" fill="none" stroke="#8f9aa6" stroke-width="9" stroke-linecap="round"/>
  <rect x="-176" y="48" width="104" height="22" rx="11" fill="#c3c9d1" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="-175" cy="59" rx="4" ry="7" fill="${INK}"/>
  <path d="M 60 -66 Q 96 -76 102 -56 Q 100 -40 78 -38 Z" fill="${body}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="96" cy="-55" r="9" fill="#fff3b0" stroke="${INK}" stroke-width="2.5"/>
  <line x1="74" y1="-64" x2="68" y2="-86" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <line x1="50" y1="-88" x2="88" y2="-84" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`)

/** A cooking pot of water on a wood fire, steaming (Getting started, page 117). */
export const potFire = (x, y, s = 1) => {
  const logs = `<path d="M -110 92 L 80 54 M -80 54 L 110 92" stroke="#8a5a2b" stroke-width="24" stroke-linecap="round"/>`
  const flames = [[-62, 64, 92], [58, 64, 100], [-20, 66, 70], [24, 66, 74]].map(([cx, cy, h]) =>
    `<path d="M ${cx} ${cy - h} C ${f1(cx + h * 0.42)} ${f1(cy - h * 0.45)} ${f1(cx + h * 0.36)} ${cy} ${cx} ${cy} C ${f1(cx - h * 0.36)} ${cy} ${f1(cx - h * 0.42)} ${f1(cy - h * 0.45)} ${cx} ${cy - h} Z" fill="#f29a2e" stroke="${INK}" stroke-width="2.5"/>`).join('')
  return at(x, y, s, `${logs}${flames}
  <path d="M -58 -60 L -50 6 Q -48 18 -34 18 L 34 18 Q 48 18 50 6 L 58 -60 Z" fill="#5b6770" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="0" cy="-60" rx="60" ry="11" fill="${SEA}" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -58 -50 h -14 M 58 -50 h 14" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <path d="M -24 -78 q -10 -14 0 -28 q 10 -14 0 -28 M 6 -80 q -10 -14 0 -28 q 10 -14 0 -28 M 34 -78 q -10 -14 0 -28 q 10 -14 0 -28" fill="none" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>`)
}

const limb = (pts, color = INK, w = 7) =>
  `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`

/** Someone walking up stairs, one foot on the next step (page 117). */
export const stairs = (x, y, s = 1) => at(x, y, s, `
  <path d="M -150 92 V 52 H -90 V 12 H -30 V -28 H 30 V -68 H 90 V -108 H 150 V 92 Z" fill="#e9edf1" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  ${limb([[-24, -64], [-34, -34], [-50, 12]])}
  ${limb([[-24, -64], [6, -60], [8, -28]])}
  ${limb([[-24, -64], [-16, -134]])}
  ${limb([[-17, -124], [2, -104], [14, -86]])}
  ${limb([[-17, -124], [-36, -104], [-48, -90]])}
  <circle cx="-13" cy="-152" r="17" fill="${INK}"/>
  <path d="M -118 20 L -118 -100" stroke="${BLUE}" stroke-width="6" stroke-linecap="round"/>
  <path d="M -118 -122 L -130 -98 L -106 -98 Z" fill="${BLUE}"/>`)

/** Someone cycling along a flat road (page 117). */
export const cyclist = (x, y, s = 1) => at(x, y, s, `
  <line x1="-160" y1="92" x2="160" y2="92" stroke="${MUTED}" stroke-width="4"/>
  <circle cx="-82" cy="44" r="46" fill="none" stroke="${INK}" stroke-width="6"/>
  <circle cx="86" cy="44" r="46" fill="none" stroke="${INK}" stroke-width="6"/>
  <polyline points="-82,44 2,44 -22,-30 64,-26 86,44" fill="none" stroke="${RED}" stroke-width="7" stroke-linejoin="round"/>
  <line x1="-82" y1="44" x2="-22" y2="-30" stroke="${RED}" stroke-width="7"/>
  <line x1="2" y1="44" x2="64" y2="-26" stroke="${RED}" stroke-width="7"/>
  <line x1="64" y1="-26" x2="58" y2="-50" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
  <line x1="50" y1="-52" x2="70" y2="-50" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <line x1="-36" y1="-38" x2="-8" y2="-38" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
  <line x1="-22" y1="-30" x2="-22" y2="-38" stroke="${INK}" stroke-width="5"/>
  <line x1="18" y1="62" x2="-14" y2="26" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <circle cx="2" cy="44" r="7" fill="${INK}"/>
  ${limb([[-20, -44], [16, -2], [16, 60]])}
  ${limb([[-20, -44], [8, -14], [-10, 30]])}
  ${limb([[-20, -44], [18, -112]])}
  ${limb([[14, -104], [40, -80], [56, -54]])}
  <circle cx="30" cy="-128" r="17" fill="${INK}"/>
  <path d="M -176 -20 H -140 M -186 6 H -142 M -176 32 H -140" stroke="#9aa7b4" stroke-width="6" stroke-linecap="round"/>`)

/** An energy-saving lamp (a compact fluorescent): a twisted tube on a white base. */
export const twisty = (x, y, s = 1) => {
  const loops = [0, 1, 2, 3].map((k) =>
    `<rect x="-36" y="${-34 - k * 28}" width="72" height="26" rx="13" fill="#fbfdff" stroke="${INK}" stroke-width="3.5" transform="rotate(${k % 2 ? 7 : -7} 0 ${-21 - k * 28})"/>`).join('')
  return at(x, y, s, `
  ${loops}
  <path d="M -30 -8 L 30 -8 L 24 34 L -24 34 Z" fill="#ffffff" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <rect x="-22" y="34" width="44" height="34" rx="5" fill="#c3c9d1" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -22 46 H 22 M -22 56 H 22" stroke="${INK}" stroke-width="2.5"/>`)
}

/** A clear filament lamp, switched on: its thin wire glows. */
export const filament = (x, y, s = 1) => at(x, y, s, `
  ${[-150, -120, -90, -60, -30, 0, 180].map((deg) => {
    const a = (deg * Math.PI) / 180
    return `<line x1="${f1(70 * Math.cos(a))}" y1="${f1(-28 + 70 * Math.sin(a))}" x2="${f1(96 * Math.cos(a))}" y2="${f1(-28 + 96 * Math.sin(a))}" stroke="${GOLD}" stroke-width="6" stroke-linecap="round"/>`
  }).join('')}
  <path d="M 0 -84 C -48 -84 -60 -34 -36 -4 C -26 10 -22 20 -22 34 L 22 34 C 22 20 26 10 36 -4 C 60 -34 48 -84 0 -84 Z" fill="#fffbe6" stroke="${INK}" stroke-width="4"/>
  <path d="M -10 30 L -10 -24 M 10 30 L 10 -24" stroke="${MUTED}" stroke-width="2.5"/>
  <path d="M -10 -24 Q -6 -38 0 -24 Q 6 -38 10 -24" fill="none" stroke="${KEY}" stroke-width="4"/>
  <rect x="-24" y="34" width="48" height="34" rx="5" fill="#c3c9d1" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -24 46 H 24 M -24 56 H 24" stroke="${INK}" stroke-width="2.5"/>`)

/** A plastic shopping bag: puffed up (full of hot air) or flat and empty. */
export const bag = (x, y, s = 1, full = true) => at(x, y, s, full ? `
  <path d="M -26 -54 q 0 -30 26 -30 q 26 0 26 30" fill="none" stroke="${INK}" stroke-width="5"/>
  <path d="M -40 -56 L 40 -56 Q 74 -20 62 30 Q 52 62 0 64 Q -52 62 -62 30 Q -74 -20 -40 -56 Z" fill="#f7f9fb" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -30 -40 Q -48 0 -36 34 M 30 -40 Q 46 4 34 34" fill="none" stroke="#c9d3dc" stroke-width="3"/>` : `
  <path d="M -22 -50 q 0 -26 22 -26 q 22 0 22 26" fill="none" stroke="${INK}" stroke-width="5"/>
  <path d="M -34 -52 L 34 -52 L 44 54 Q 0 64 -44 54 Z" fill="#f7f9fb" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M -20 -34 L -14 40 M 6 -40 L 2 44 M 24 -30 L 26 40" fill="none" stroke="#c9d3dc" stroke-width="3"/>`)
