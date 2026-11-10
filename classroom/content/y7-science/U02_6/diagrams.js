// content/y7-science/U02_6/diagrams.js
// Teaching diagrams for 2.6 Compounds and formulae (Learner's Book pp. 57–63).
//
// House rules (docs/LESSON-PLAYBOOK.md §5): a white plate first; every <text>
// written out literally so `npm run audit:svg` can measure it (helpers draw
// shapes and photos only); `split` diagrams 840×560, `showcase` strips 1120×440.
// Atom colours match Science 2.5: carbon grey, oxygen red, hydrogen white,
// metals yellow, sodium purple, chlorine green.
//
//   TWO_DANGERS       sodium (bursts into flame in water) and chlorine (poison)
//   SALT_MADE         sodium + chlorine → sodium chloride, photographed (p. 58)
//   ANS_*             vote cards: YES / NO, element / compound, each with a hand
//   ELEMENT_COMPOUND  gold atoms against sodium and chlorine atoms bonded
//   BONDING_REAL      a model kit: loose atoms, then atoms bonded
//   NEW_PROPERTIES    sodium, chlorine and salt compared
//   NAME_RULE         metal first; the non-metal ends in -ide
//   PREFIXES          carbon monoxide and carbon dioxide (p. 60)
//   PARTICLES         CO₂, H₂O, O₂, CH₄ — the Draw This (p. 60)
//   PARTICLES_REAL    the same four substances, photographed
//   FORMULA_READ      H₂O, read symbol by symbol (p. 61)

import sodium from './images/sodium.jpg'
import chlorine from './images/chlorine.jpg'
import saltshaker from './images/saltshaker.jpg'
import atomsLoose from './images/atoms_loose.jpg'
import modelBonded from './images/model_bonded.jpg'
import dryice from './images/dryice.jpg'
import water from './images/water.jpg'
import oxygen from './images/oxygen.jpg'
import gasflame from './images/gasflame.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const RED = '#c8102e'

const METAL_F = '#fbe7a1', METAL_S = '#b8912a'
const NON_F = '#cfe5f5', NON_S = '#4f8fbf'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// A photograph cropped to fill its cell, with a hairline frame.
const photo = (href, id, x, y, w, h) => `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath></defs>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="${RULE}" stroke-width="2"/>`

const ATOM = {
  C: ['#aab4bc', '#3b444b'],
  O: ['#f08b82', '#b3261e'],
  H: ['#ffffff', '#6b7580'],
  Na: ['#d9c7ef', '#5c2483'],
  Cl: ['#bfe3b5', '#2e7d32'],
  Au: ['#f4cf45', '#9a7400'],
}
const atom = (cx, cy, r, k) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${ATOM[k][0]}" stroke="${ATOM[k][1]}" stroke-width="3"/>`

const tick = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="26" fill="${GREEN}"/>
    <path d="M ${cx - 13} ${cy + 1} l 9 9 l 17 -20" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
const cross = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="26" fill="${RED}"/>
    <path d="M ${cx - 10} ${cy - 10} l 20 20 M ${cx + 10} ${cy - 10} l -20 20" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>`

const hazard = (x, y) => `<path d="M ${x} ${y - 34} L ${x + 38} ${y + 30} L ${x - 38} ${y + 30} Z" fill="#ffc800" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="${x - 4}" y="${y - 14}" width="8" height="26" rx="3" fill="${INK}"/><circle cx="${x}" cy="${y + 20}" r="5" fill="${INK}"/>`

// The lucide hand, thumb on the right: a LEFT hand seen from behind, as a
// student sees their own raised hand. `mirror` gives the right hand.
const HAND = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (col) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND}</g>`
const rightHand = (col) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND}</g>`

// Sodium chloride: a 4 × 4 grid, sodium and chlorine alternating, bonded.
function saltGrid(x0, y0, step) {
  let bonds = ''
  let atoms = ''
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      const x = x0 + i * step, y = y0 + j * step
      if (i < 3) bonds += `<line x1="${x}" y1="${y}" x2="${x + step}" y2="${y}" stroke="#8a979e" stroke-width="5"/>`
      if (j < 3) bonds += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + step}" stroke="#8a979e" stroke-width="5"/>`
      atoms += (i + j) % 2 === 0 ? atom(x, y, 22, 'Na') : atom(x, y, 27, 'Cl')
    }
  }
  return bonds + atoms
}

function goldGrid(x0, y0, r) {
  let out = ''
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) out += atom(x0 + i * 2 * r, y0 + j * 2 * r, r, 'Au')
  return out
}

export const DIAGRAMS = {
  TWO_DANGERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    ${photo(sodium, 'u26-danger-na', 30, 20, 510, 300)}
    ${hazard(486, 72)}
    <text x="285" y="370" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">Sodium</text>
    <text x="285" y="410" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">a metal that bursts into flame in water</text>

    ${photo(chlorine, 'u26-danger-cl', 580, 20, 510, 300)}
    ${hazard(1036, 72)}
    <text x="835" y="370" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="middle">Chlorine</text>
    <text x="835" y="410" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">a poisonous yellow-green gas</text>
  </svg>`,

  SALT_MADE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <defs>
      <marker id="u26-salt-head" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="22" markerHeight="22" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
    </defs>

    ${photo(sodium, 'u26-salt-na', 30, 20, 300, 300)}
    <text x="365" y="190" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    ${photo(chlorine, 'u26-salt-cl', 400, 20, 300, 300)}
    <line x1="716" y1="170" x2="786" y2="170" stroke="${INK}" stroke-width="6" marker-end="url(#u26-salt-head)"/>
    <rect x="800" y="20" width="300" height="300" rx="12" fill="#ffffff"/>
    <image href="${saltshaker}" x="800" y="20" width="300" height="300" preserveAspectRatio="xMidYMid meet"/>
    <rect x="800" y="20" width="300" height="300" rx="12" fill="none" stroke="${KEY}" stroke-width="4"/>

    <text x="180" y="368" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">sodium</text>
    <text x="180" y="406" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">an element</text>
    <text x="550" y="368" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine</text>
    <text x="550" y="406" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">an element</text>
    <text x="950" y="368" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">sodium chloride</text>
    <text x="950" y="406" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">a compound</text>
  </svg>`,

  // Vote cards: the answer beside the hand that votes for it (A left, B right).
  ANS_YES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    <text x="440" y="214" font-family="${FONT}" font-size="150" font-weight="bold" fill="${BLUE}" text-anchor="middle">YES</text>
  </svg>`,

  ANS_NO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="280" y="214" font-family="${FONT}" font-size="150" font-weight="bold" fill="${KEY}" text-anchor="middle">NO</text>
  </svg>`,

  ANS_ELEMENT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    <text x="440" y="195" font-family="${FONT}" font-size="96" font-weight="bold" fill="${BLUE}" text-anchor="middle">element</text>
  </svg>`,

  ANS_COMPOUND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="262" y="190" font-family="${FONT}" font-size="82" font-weight="bold" fill="${KEY}" text-anchor="middle">compound</text>
  </svg>`,

  ELEMENT_COMPOUND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="24" y="24" width="384" height="512" rx="16" fill="#fffbef" stroke="#e0c46a" stroke-width="2.5"/>
    <text x="216" y="82" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="middle">Element</text>
    ${goldGrid(126, 150, 30)}
    <text x="216" y="448" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">one kind of atom</text>
    <text x="216" y="490" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">gold</text>

    <rect x="432" y="24" width="384" height="512" rx="16" fill="#f4faf4" stroke="#9cc79c" stroke-width="2.5"/>
    <text x="624" y="82" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">Compound</text>
    ${saltGrid(534, 150, 60)}
    <text x="534" y="157" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="594" y="157" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="654" y="157" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="714" y="157" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="534" y="217" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="594" y="217" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="654" y="217" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="714" y="217" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="534" y="277" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="594" y="277" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="654" y="277" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="714" y="277" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="534" y="337" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="594" y="337" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="654" y="337" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Cl</text>
    <text x="714" y="337" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <text x="624" y="448" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">different kinds of atom,</text>
    <text x="624" y="482" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">bonded together</text>
    <text x="624" y="518" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">sodium chloride</text>
  </svg>`,

  BONDING_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    ${photo(atomsLoose, 'u26-bond-loose', 24, 24, 420, 250)}
    <text x="476" y="128" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">Not bonded</text>
    <text x="476" y="172" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">atoms are loose</text>

    ${photo(modelBonded, 'u26-bond-joined', 24, 290, 420, 246)}
    <text x="476" y="394" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="start">Bonded</text>
    <text x="476" y="438" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="start">atoms joined tightly</text>
  </svg>`,

  NEW_PROPERTIES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <!-- header -->
    <rect x="214" y="24" width="200" height="100" fill="${METAL_F}" stroke="${METAL_S}" stroke-width="2"/>
    <rect x="414" y="24" width="200" height="100" fill="${NON_F}" stroke="${NON_S}" stroke-width="2"/>
    <rect x="614" y="24" width="202" height="100" fill="#fdf1e3" stroke="${KEY}" stroke-width="3"/>
    <text x="314" y="86" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">sodium</text>
    <text x="514" y="86" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine</text>
    <text x="715" y="68" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">sodium</text>
    <text x="715" y="102" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">chloride</text>

    <!-- row: looks like -->
    <rect x="24" y="124" width="190" height="130" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="214" y="124" width="200" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="414" y="124" width="200" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="614" y="124" width="202" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="119" y="198" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">looks like</text>
    <text x="314" y="198" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">shiny metal</text>
    <text x="514" y="198" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">yellow-green gas</text>
    <text x="715" y="198" font-family="${FONT}" font-size="22" fill="${INK}" text-anchor="middle">white crystals</text>

    <!-- row: safe to eat -->
    <rect x="24" y="254" width="190" height="130" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="214" y="254" width="200" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="414" y="254" width="200" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="614" y="254" width="202" height="130" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="119" y="328" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">safe to eat?</text>
    ${cross(314, 319)}
    ${cross(514, 319)}
    ${tick(715, 319)}

    <!-- row: element or compound -->
    <rect x="24" y="384" width="190" height="152" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <rect x="214" y="384" width="200" height="152" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="414" y="384" width="200" height="152" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <rect x="614" y="384" width="202" height="152" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <text x="119" y="452" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">element or</text>
    <text x="119" y="482" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">compound?</text>
    <text x="314" y="469" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">element</text>
    <text x="514" y="469" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">element</text>
    <text x="715" y="469" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">compound</text>
  </svg>`,

  NAME_RULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u26-name-head" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
    </defs>

    <rect x="120" y="30" width="250" height="84" rx="14" fill="${METAL_F}" stroke="${METAL_S}" stroke-width="3"/>
    <text x="245" y="85" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">sodium</text>
    <text x="420" y="88" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <rect x="470" y="30" width="250" height="84" rx="14" fill="${NON_F}" stroke="${NON_S}" stroke-width="3"/>
    <text x="595" y="85" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">chlorine</text>
    <text x="245" y="150" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">metal</text>
    <text x="595" y="150" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">non-metal</text>

    <line x1="420" y1="168" x2="420" y2="206" stroke="${INK}" stroke-width="5" marker-end="url(#u26-name-head)"/>

    <text x="512" y="272" font-family="${FONT}" font-size="62" font-weight="bold" fill="${INK}" text-anchor="end">sodium chlor</text>
    <text x="512" y="272" font-family="${FONT}" font-size="62" font-weight="bold" fill="${KEY}" text-anchor="start">ide</text>
    <text x="250" y="316" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">metal first</text>
    <text x="560" y="316" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">new ending</text>

    <rect x="24" y="346" width="792" height="190" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    <text x="360" y="400" font-family="${FONT}" font-size="38" fill="${INK}" text-anchor="end">oxygen</text>
    <text x="420" y="400" font-family="${FONT}" font-size="38" fill="${MUTED}" text-anchor="middle">→</text>
    <text x="560" y="400" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="end">ox</text>
    <text x="560" y="400" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="start">ide</text>
    <text x="360" y="456" font-family="${FONT}" font-size="38" fill="${INK}" text-anchor="end">sulfur</text>
    <text x="420" y="456" font-family="${FONT}" font-size="38" fill="${MUTED}" text-anchor="middle">→</text>
    <text x="560" y="456" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="end">sulf</text>
    <text x="560" y="456" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="start">ide</text>
    <text x="360" y="512" font-family="${FONT}" font-size="38" fill="${INK}" text-anchor="end">chlorine</text>
    <text x="420" y="512" font-family="${FONT}" font-size="38" fill="${MUTED}" text-anchor="middle">→</text>
    <text x="560" y="512" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="end">chlor</text>
    <text x="560" y="512" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="start">ide</text>
  </svg>`,

  PREFIXES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="24" y="24" width="792" height="246" rx="16" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    ${atom(128, 147, 46, 'C')}${atom(214, 147, 46, 'O')}
    <text x="128" y="158" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="214" y="158" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="320" y="118" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">carbon monoxide</text>
    <text x="320" y="180" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="start">mono = one oxygen</text>
    <text x="320" y="232" font-family="${FONT}" font-size="32" fill="${MUTED}" text-anchor="start">CO</text>

    <rect x="24" y="290" width="792" height="246" rx="16" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    ${atom(84, 413, 40, 'O')}${atom(160, 413, 40, 'C')}${atom(236, 413, 40, 'O')}
    <text x="84" y="423" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="160" y="423" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="236" y="423" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="320" y="384" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="start">carbon dioxide</text>
    <text x="320" y="446" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="start">di = two oxygens</text>
    <text x="320" y="498" font-family="${FONT}" font-size="32" fill="${MUTED}" text-anchor="start">CO₂</text>
  </svg>`,

  PARTICLES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="260" height="300" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${atom(68, 166, 42, 'O')}${atom(232, 166, 42, 'O')}${atom(150, 166, 42, 'C')}
    <text x="68" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="150" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="232" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="150" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">carbon dioxide</text>
    <text x="150" y="402" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">CO₂</text>

    <rect x="300" y="16" width="260" height="300" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${atom(364, 196, 34, 'H')}${atom(496, 196, 34, 'H')}${atom(430, 150, 46, 'O')}
    <text x="364" y="206" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="430" y="161" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="496" y="206" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="430" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">water</text>
    <text x="430" y="402" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">H₂O</text>

    <rect x="580" y="16" width="260" height="300" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${atom(666, 166, 46, 'O')}${atom(754, 166, 46, 'O')}
    <text x="666" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="754" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <text x="710" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">oxygen</text>
    <text x="710" y="402" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">O₂</text>

    <rect x="860" y="16" width="240" height="300" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="2"/>
    ${atom(924, 110, 32, 'H')}${atom(1036, 110, 32, 'H')}${atom(924, 222, 32, 'H')}${atom(1036, 222, 32, 'H')}${atom(980, 166, 44, 'C')}
    <text x="924" y="120" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="1036" y="120" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="924" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="1036" y="232" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="980" y="177" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="980" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">methane</text>
    <text x="980" y="402" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">CH₄</text>
  </svg>`,

  PARTICLES_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    ${photo(dryice, 'u26-real-co2', 20, 16, 260, 300)}
    <text x="150" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Dry ice</text>
    <text x="150" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">frozen carbon dioxide</text>

    ${photo(water, 'u26-real-h2o', 300, 16, 260, 300)}
    <text x="430" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Water</text>
    <text x="430" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">a glass of H₂O</text>

    ${photo(oxygen, 'u26-real-o2', 580, 16, 260, 300)}
    <text x="710" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Liquid oxygen</text>
    <text x="710" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">O₂, very, very cold</text>

    ${photo(gasflame, 'u26-real-ch4', 860, 16, 240, 300)}
    <text x="980" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Cooking gas</text>
    <text x="980" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">mostly methane, CH₄</text>
  </svg>`,

  FORMULA_READ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <text x="300" y="262" font-family="${FONT}" font-size="170" font-weight="bold" fill="${INK}" text-anchor="middle">H</text>
    <text x="392" y="306" font-family="${FONT}" font-size="100" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="500" y="262" font-family="${FONT}" font-size="170" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>

    <line x1="196" y1="108" x2="258" y2="140" stroke="${KEY}" stroke-width="3"/><circle cx="258" cy="140" r="6" fill="${KEY}"/>
    <text x="150" y="92" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">H = hydrogen</text>
    <line x1="626" y1="108" x2="540" y2="140" stroke="${KEY}" stroke-width="3"/><circle cx="540" cy="140" r="6" fill="${KEY}"/>
    <text x="668" y="92" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">O = oxygen</text>

    <line x1="392" y1="322" x2="330" y2="364" stroke="${KEY}" stroke-width="3"/><circle cx="392" cy="322" r="6" fill="${KEY}"/>
    <text x="300" y="398" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">small 2 = two hydrogen atoms</text>
    <line x1="560" y1="282" x2="600" y2="424" stroke="${KEY}" stroke-width="3"/><circle cx="560" cy="282" r="6" fill="${KEY}"/>
    <text x="580" y="458" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">no number = one oxygen atom</text>

    <text x="420" y="526" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="middle">Careful: C is carbon. Ca is calcium.</text>
  </svg>`,
}
