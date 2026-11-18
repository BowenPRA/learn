// content/y7-science/U04_classkey/diagrams.js
// Inline SVG for Our Class Key. House style: a white plate first, dark ink,
// question boxes in the book's teal. Diagrams stay in English: the class
// writes its keys in English.
//
//   FOUR_QS   four questions about the class, A–D, with no answers on them
//             (the reveal on slide 2 settles them)
//
// A split diagram, drawn at 840×560. Label <text> is written out literally so
// `npm run audit:svg` can measure it; the helpers draw shapes only.

import { INK, TEAL, FONT, plate } from '../U04_4/art.js'

const qbox = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#e2f2f6" stroke="${TEAL}" stroke-width="3"/>`

export const DIAGRAMS = {
  FOUR_QS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${qbox(20, 22, 800, 112)}
    <text x="50" y="90" font-family="${FONT}" font-size="36" font-weight="bold" fill="${TEAL}">A</text>
    <text x="96" y="90" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">Are you nice?</text>
    ${qbox(20, 156, 800, 112)}
    <text x="50" y="224" font-family="${FONT}" font-size="36" font-weight="bold" fill="${TEAL}">B</text>
    <text x="96" y="224" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">Do you wear glasses?</text>
    ${qbox(20, 290, 800, 112)}
    <text x="50" y="358" font-family="${FONT}" font-size="36" font-weight="bold" fill="${TEAL}">C</text>
    <text x="96" y="358" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">Is your hair long?</text>
    ${qbox(20, 424, 800, 112)}
    <text x="50" y="492" font-family="${FONT}" font-size="36" font-weight="bold" fill="${TEAL}">D</text>
    <text x="96" y="492" font-family="${FONT}" font-size="31" font-weight="bold" fill="${INK}">Does your hair touch your shoulders?</text>
  </svg>`,
}
