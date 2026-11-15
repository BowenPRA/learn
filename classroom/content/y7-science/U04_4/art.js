// content/y7-science/U04_4/art.js
// The pictures of 4.4 Using keys, as SVG strings, in the style of the art.js
// files of 3.5–4.3 (whose colours and helpers this re-exports). Flat pale
// fills, dark ink outlines, NO text: labels are written out literally where a
// picture is used, so `npm run audit:svg` can measure them.
//
//   cat         Mr Bowen's "housefly": a ginger cat standing side-on, facing
//               right, its feet on (x, y), all four legs apart so they can be
//               counted. About 230 wide and 175 tall at s = 1.
//   keyCard     the key in Mr Bowen's hand: a card with a branching tree
//   treeIcon    a small branching key (the goals and the vote)
//   listIcon    a small numbered key: four pairs of lines
//   bubble      a speech bubble, its tail at the bottom left
//   grass       a strip of lawn with a flower, for the garden
//   wing        one insect wing, its root at (0, 0), pointing right

import { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, f1, mark, magnifier, plate, arrow, FONT, box } from '../U04_3/art.js'

export { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, f1, mark, magnifier, plate, arrow, FONT, box }
export const TEAL = '#0087a8'
export const RULE = '#d5dbe1'
export const YES = '#3d731c'
export const NO = '#b3261e'

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`

const COAT = '#f0a24b'
const SHADE = '#cf8536'
const STRIPE = '#b8692a'

const leg = (lx, fill) => `<rect x="${lx}" y="-62" width="17" height="60" rx="8" fill="${fill}" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="${lx + 9}" cy="-2" rx="12" ry="5" fill="${fill}" stroke="${INK}" stroke-width="3"/>`

/** A ginger cat standing side-on, facing right, feet on (x, y). */
export const cat = (x, y, s = 1) => at(x, y, s, `
  ${leg(-30, SHADE)}${leg(76, SHADE)}
  <path d="M -74 -86 Q -116 -96 -112 -138 Q -110 -160 -94 -164" fill="none" stroke="${INK}" stroke-width="19" stroke-linecap="round"/>
  <path d="M -74 -86 Q -116 -96 -112 -138 Q -110 -160 -94 -164" fill="none" stroke="${COAT}" stroke-width="12.5" stroke-linecap="round"/>
  <ellipse cx="0" cy="-84" rx="82" ry="34" fill="${COAT}" stroke="${INK}" stroke-width="3.5"/>
  <path d="M -40 -114 q 6 18 0 34 M -14 -117 q 6 18 0 36 M 12 -117 q 6 18 0 36" fill="none" stroke="${STRIPE}" stroke-width="5" stroke-linecap="round"/>
  ${leg(-72, COAT)}${leg(34, COAT)}
  <path d="M 66 -132 L 70 -168 L 92 -146 Z" fill="${COAT}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M 100 -146 L 116 -170 L 124 -134 Z" fill="${COAT}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M 72 -156 L 74 -146 L 84 -146 Z M 112 -158 L 109 -146 L 118 -142 Z" fill="#f6c7b8"/>
  <circle cx="96" cy="-116" r="34" fill="${COAT}" stroke="${INK}" stroke-width="3.5"/>
  <path d="M 84 -142 q 4 8 0 14 M 98 -147 q 4 8 0 14" fill="none" stroke="${STRIPE}" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="108" cy="-120" rx="4.5" ry="7" fill="${INK}"/>
  <path d="M 124 -110 l 6 -4 l 2 7 z" fill="#d9776a" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
  <path d="M 120 -101 q 6 6 12 0" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 116 -106 l 34 -6 M 116 -102 l 34 2 M 114 -98 l 30 9" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`)

/** The key in Mr Bowen's hand: a white card, about 70 × 90, with a small tree. */
export const keyCard = (x, y, s = 1) => at(x, y, s, `
  <rect x="-35" y="-45" width="70" height="90" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
  <rect x="-13" y="-36" width="26" height="12" rx="3" fill="#e2f2f6" stroke="${TEAL}" stroke-width="2"/>
  <path d="M 0 -24 V -14 M -18 -14 H 18 M -18 -14 V -6 M 18 -14 V -6" fill="none" stroke="${TEAL}" stroke-width="2.5"/>
  <rect x="-30" y="-6" width="24" height="11" rx="3" fill="#e2f2f6" stroke="${TEAL}" stroke-width="2"/>
  <rect x="6" y="-6" width="24" height="11" rx="3" fill="#e2f2f6" stroke="${TEAL}" stroke-width="2"/>
  <path d="M -18 5 V 13 M -27 13 H -9 M -27 13 V 20 M -9 13 V 20 M 18 5 V 20" fill="none" stroke="${TEAL}" stroke-width="2.5"/>
  <path d="M -32 26 H -22 M -14 26 H -4 M 12 26 H 24" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`)

/** A small branching key: three boxes of questions and four names. About 300 × 220. */
export const treeIcon = (x, y, s = 1, color = TEAL) => at(x, y, s, `
  <rect x="-60" y="-110" width="120" height="44" rx="10" fill="#e2f2f6" stroke="${color}" stroke-width="5"/>
  <path d="M 0 -66 V -46 M -100 -46 H 100 M -100 -46 V -26 M 100 -46 V -26" fill="none" stroke="${color}" stroke-width="5"/>
  <rect x="-150" y="-26" width="100" height="40" rx="10" fill="#e2f2f6" stroke="${color}" stroke-width="5"/>
  <rect x="50" y="-26" width="100" height="40" rx="10" fill="#e2f2f6" stroke="${color}" stroke-width="5"/>
  <path d="M -100 14 V 32 M -138 32 H -62 M -138 32 V 52 M -62 32 V 52 M 100 14 V 32 M 62 32 H 138 M 62 32 V 52 M 138 32 V 52" fill="none" stroke="${color}" stroke-width="5"/>
  <circle cx="-138" cy="72" r="18" fill="#fff4e8" stroke="${KEY}" stroke-width="5"/>
  <circle cx="-62" cy="72" r="18" fill="#fff4e8" stroke="${KEY}" stroke-width="5"/>
  <circle cx="62" cy="72" r="18" fill="#fff4e8" stroke="${KEY}" stroke-width="5"/>
  <circle cx="138" cy="72" r="18" fill="#fff4e8" stroke="${KEY}" stroke-width="5"/>`)

/** A small numbered key: four pairs of lines, each with a number. About 300 × 230. */
export const listIcon = (x, y, s = 1, color = TEAL) => {
  const pair = (py, long) => `<circle cx="-128" cy="${py + 12}" r="16" fill="${color}"/>
    <path d="M -96 ${py} H ${long} M -96 ${py + 26} H ${long - 30}" stroke="#9aa5ae" stroke-width="9" stroke-linecap="round"/>
    <path d="M ${long + 26} ${py} H 140 M ${long - 4} ${py + 26} H 140" stroke="${KEY}" stroke-width="9" stroke-linecap="round"/>`
  return at(x, y, s, `${pair(-104, 50)}${pair(-46, 30)}${pair(12, 60)}${pair(70, 40)}`)
}

/** A speech bubble w × h, its top left at (x, y), the tail at the bottom left. */
export const bubble = (x, y, w, h, stroke = INK) => `<path d="M ${x + 16} ${y} H ${x + w - 16} Q ${x + w} ${y} ${x + w} ${y + 16} V ${y + h - 16} Q ${x + w} ${y + h} ${x + w - 16} ${y + h} H ${x + 46} L ${x + 18} ${y + h + 26} L ${x + 26} ${y + h} H ${x + 16} Q ${x} ${y + h} ${x} ${y + h - 16} V ${y + 16} Q ${x} ${y} ${x + 16} ${y} Z" fill="#ffffff" stroke="${stroke}" stroke-width="3.5" stroke-linejoin="round"/>`

/** A strip of lawn from x to x + w, its top at y, with a flower at fx. */
export const grass = (x, y, w, h, fx) => {
  const tufts = []
  for (let gx = x + 18; gx < x + w - 10; gx += 46) tufts.push(`M ${gx} ${y + 2} l 5 -12 l 5 12 M ${gx + 14} ${y + 2} l 4 -9 l 4 9`)
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#cfe8b4"/>
    <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="#7fb356" stroke-width="3"/>
    <path d="${tufts.join(' ')}" fill="none" stroke="#7fb356" stroke-width="3" stroke-linejoin="round"/>
    <path d="M ${fx} ${y} V ${y - 46}" stroke="#5f9e35" stroke-width="4"/>
    <path d="M ${fx} ${y - 22} q 14 -4 18 -16 q -14 0 -18 16 Z" fill="#7fb356" stroke="#5f9e35" stroke-width="2"/>
    ${[0, 72, 144, 216, 288].map((a) => `<circle cx="${f1(fx + 11 * Math.cos((a * Math.PI) / 180))}" cy="${f1(y - 56 + 11 * Math.sin((a * Math.PI) / 180))}" r="8" fill="#f28db2" stroke="${INK}" stroke-width="2"/>`).join('')}
    <circle cx="${fx}" cy="${y - 56}" r="6" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>`
}

/** One insect wing, its root at (x, y), pointing at angle a (degrees), length len. */
export const wing = (x, y, len, a = 0, fill = '#eaf4fb') => at(x, y, 1, `<g transform="rotate(${a})">
  <path d="M 0 0 Q ${f1(len * 0.3)} ${f1(-len * 0.2)} ${len} ${f1(-len * 0.08)} Q ${f1(len * 1.04)} ${f1(len * 0.06)} ${f1(len * 0.9)} ${f1(len * 0.12)} Q ${f1(len * 0.4)} ${f1(len * 0.16)} 0 0 Z" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M 4 0 Q ${f1(len * 0.5)} ${f1(-len * 0.06)} ${f1(len * 0.92)} ${f1(-len * 0.02)} M ${f1(len * 0.3)} ${f1(-len * 0.04)} L ${f1(len * 0.55)} ${f1(len * 0.12)}" fill="none" stroke="#8fb3c9" stroke-width="2"/></g>`)

export { at }
