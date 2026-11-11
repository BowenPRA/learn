// content/y7-science/U04_3/art.js
// The pictures of 4.3 What is a species?, as SVG strings, in the style of the
// art.js files of 3.5–4.1 (whose colours and helpers this re-exports). Flat
// pale fills, dark ink outlines, NO text: labels are written out literally
// where a picture is used, so `npm run audit:svg` can measure them.
//
//   equid       a horse, a donkey or a mule seen from the side, facing right,
//               its hooves on (x, y). About 230 wide and 215 tall at s = 1
//               (a donkey's ears reach 240).
//   conicalHat  a nón lá, to sit on Mr Bowen's head (his own frame)
//   tag         a blank name tag on a string
//   leafSmooth, leafToothed
//               two leaves of two species, for the specimens
//   box         a rounded box for a word, for the drawing

import { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, f1, mark, magnifier, calendar, egg } from '../U04_1/art.js'

export { INK, KEY, MUTED, RED, GOLD, BLUE, GREEN, f1, mark, magnifier, calendar, egg }
export { plate, arrow, FONT } from '../U04_1/art.js'

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`

const COATS = {
  horse: { coat: '#c08a4e', shade: '#a06f3a', mane: '#3a2a20', muzzle: '#c08a4e', ears: 'short', tail: 'full' },
  donkey: { coat: '#b3aea6', shade: '#958f86', mane: '#5d5851', muzzle: '#f4efe6', ears: 'long', tail: 'tuft' },
  mule: { coat: '#7d5638', shade: '#63432b', mane: '#2e221b', muzzle: '#e2cdb4', ears: 'long', tail: 'full' },
}

/** A horse, a donkey or a mule from the side, facing right, hooves on (x, y). */
export const equid = (x, y, s = 1, kind = 'horse') => {
  const c = COATS[kind]
  const leg = (lx, fill) => `<rect x="${lx}" y="-78" width="15" height="70" rx="5" fill="${fill}" stroke="${INK}" stroke-width="3"/>
    <rect x="${lx - 1}" y="-12" width="17" height="12" rx="3" fill="${INK}"/>`
  const tail = c.tail === 'full'
    ? `<path d="M -74 -108 Q -112 -100 -108 -44 Q -106 -22 -96 -18 Q -92 -62 -68 -92 Z" fill="${c.mane}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`
    : `<path d="M -74 -106 Q -98 -92 -96 -54" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
       <path d="M -74 -106 Q -98 -92 -96 -54" fill="none" stroke="${c.coat}" stroke-width="4.5" stroke-linecap="round"/>
       <path d="M -103 -56 Q -106 -30 -96 -22 Q -86 -30 -89 -56 Z" fill="${c.mane}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`
  const ear = (dx, fill) => (c.ears === 'long'
    ? `<path d="M ${82 + dx} -184 Q ${72 + dx} -222 ${84 + dx} -244 Q ${100 + dx} -222 ${100 + dx} -188 Z" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`
    : `<path d="M ${84 + dx} -186 L ${88 + dx} -214 L ${100 + dx} -190 Z" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`)
  const mane = c.ears === 'long'
    ? `<path d="M 44 -128 Q 58 -162 78 -186" fill="none" stroke="${c.mane}" stroke-width="9" stroke-linecap="round" stroke-dasharray="3 7"/>`
    : `<path d="M 36 -126 Q 46 -164 72 -190 L 84 -186 Q 62 -160 54 -122 Z" fill="${c.mane}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`
  return at(x, y, s, `
    ${leg(-66, c.shade)}${leg(38, c.shade)}
    ${tail}
    <ellipse cx="0" cy="-100" rx="80" ry="38" fill="${c.coat}" stroke="${INK}" stroke-width="3.5"/>
    ${leg(-48, c.coat)}${leg(56, c.coat)}
    <path d="M 40 -126 L 76 -182 L 108 -168 L 78 -92 Z" fill="${c.coat}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 44 -122 L 74 -98" stroke="${c.coat}" stroke-width="9" stroke-linecap="round"/>
    ${mane}
    ${ear(-10, c.shade)}
    <path d="M 72 -184 Q 88 -202 106 -190 L 144 -152 Q 150 -138 138 -132 L 116 -136 Q 92 -146 78 -164 Z" fill="${c.coat}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 126 -164 L 144 -152 Q 150 -138 138 -132 L 120 -135 Q 116 -150 126 -164 Z" fill="${c.muzzle}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    ${ear(0, c.coat)}
    <circle cx="108" cy="-172" r="3.6" fill="${INK}"/>
    <circle cx="140" cy="-143" r="1.8" fill="${INK}"/>`)
}

/** A nón lá for Mr Bowen: place it at his own (x, y) with his scale. */
export const conicalHat = (x, y, s = 1) => at(x, y, s, `
  <path d="M -70 10 L 0 -58 L 70 10 Q 0 24 -70 10 Z" fill="#f1e2b4" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M -34 -24 Q 0 -16 34 -24 M -52 -6 Q 0 6 52 -6" fill="none" stroke="#c9b377" stroke-width="2.5"/>`)

/** A blank name tag on a string, about 150 × 90. */
export const tag = (x, y, s = 1) => at(x, y, s, `
  <path d="M -66 -40 Q -92 -70 -70 -92" fill="none" stroke="${INK}" stroke-width="3"/>
  <path d="M -44 -44 L 70 -44 Q 78 -44 78 -36 L 78 36 Q 78 44 70 44 L -44 44 L -78 0 Z" fill="#fff4e8" stroke="${KEY}" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="-52" cy="0" r="7" fill="#ffffff" stroke="${KEY}" stroke-width="4"/>
  <path d="M -22 -12 L 54 -12 M -22 12 L 34 12" stroke="${KEY}" stroke-width="6" stroke-linecap="round" opacity="0.45"/>`)

const LEAF = '#5f9e35'
const LEAF_PALE = '#bfe0a3'

/** A leaf with a smooth edge, its stalk at the bottom; about 150 × 260. */
export const leafSmooth = (x, y, s = 1) => at(x, y, s, `
  <path d="M 0 118 L 0 150" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <path d="M 0 -130 Q 84 -60 70 36 Q 54 112 0 120 Q -54 112 -70 36 Q -84 -60 0 -130 Z" fill="${LEAF_PALE}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M 0 118 L 0 -118 M 0 70 L 46 36 M 0 70 L -46 36 M 0 16 L 54 -24 M 0 16 L -54 -24 M 0 -40 L 40 -76 M 0 -40 L -40 -76" fill="none" stroke="${LEAF}" stroke-width="4" stroke-linecap="round"/>`)

/** A longer leaf with a toothed edge; about 130 × 280. */
export const leafToothed = (x, y, s = 1) => {
  const right = [[14, -128], [30, -104], [26, -100], [44, -74], [38, -70], [54, -42], [47, -38], [60, -8], [52, -5], [60, 26], [51, 28], [54, 58], [44, 59], [42, 88], [32, 87], [24, 110]]
  const pts = [[0, -140], ...right, [0, 122], ...right.map(([px, py]) => [-px, py]).reverse()]
  return at(x, y, s, `
    <path d="M 0 118 L 0 150" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <path d="M ${pts.map((p) => p.join(' ')).join(' L ')} Z" fill="#9fcf7c" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M 0 118 L 0 -128 M 0 80 L 36 60 M 0 80 L -36 60 M 0 36 L 46 12 M 0 36 L -46 12 M 0 -10 L 48 -36 M 0 -10 L -48 -36 M 0 -56 L 40 -82 M 0 -56 L -40 -82" fill="none" stroke="${LEAF}" stroke-width="4" stroke-linecap="round"/>`)
}

/** A rounded box for a word (the word is written out where the box is used). */
export const box = (x, y, w, h, stroke = INK, fill = '#ffffff') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="4"/>`
