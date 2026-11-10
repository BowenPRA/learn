// content/y7-science/U02_5/diagrams.js
// Teaching diagrams for 2.5 Atoms, elements and the Periodic Table.
//   1. SILVER_ZOOM   — the silver-ring photo, zoomed in to identical atoms (p.52)
//   2. JOINING       — neon, gold, oxygen, sulfur: how atoms join (p.53, Draw This)
//   3. TWO_MEANINGS  — table / period / group: everyday English vs science
//   4. SYMBOL_WAYS   — the three ways a symbol is made: O, He, Na (p.54)
//   5. METAL_QUIZ    — the book's six element photos, names only (p.54)
//   6. ONE_KIND      — carbon, gold, silver: photographs of three elements (p.52)
//   7. JOINING_REAL  — neon, oxygen, sulfur: the joining drawing, photographed
//
// The photo panels are SVG rather than a `gallery` because the gallery's
// picture box is a thumbnail on the projector; here each photo gets a third of
// the slide.
//
// Label <text> is written out literally so `npm run audit:svg` can measure it.
// Helpers below draw shapes only.

import rings from './images/rings.jpg'
import aluminium from './images/aluminium.jpg'
import zinc from './images/zinc.jpg'
import lead from './images/lead.jpg'
import copper from './images/copper.jpg'
import iron from './images/iron.jpg'
import bromine from './images/bromine.jpg'
import carbon from './images/carbon.jpg'
import gold from './images/gold.jpg'
import silver from './images/silver.jpg'
import neon from './images/neon.jpg'
import oxygen from './images/oxygen.jpg'
import sulfur from './images/sulfur.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'

const METAL_F = '#fbe7a1', METAL_S = '#b8912a'
const NON_F = '#cfe5f5', NON_S = '#4f8fbf'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const atom = (cx, cy, r, fill, stroke) =>
  `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

// Identical silver atoms filling a circle.
function atomDisc(cx, cy, R, r) {
  let out = ''
  const step = r * 2
  const n = Math.ceil(R / step)
  for (let j = -n; j <= n; j++) {
    for (let i = -n; i <= n; i++) {
      const x = cx + i * step, y = cy + j * step
      if (Math.hypot(x - cx, y - cy) + r <= R - 4) out += atom(x, y, r, '#cfd4d9', '#6b7580')
    }
  }
  return out
}

// A packed square block of atoms.
function atomBlock(x0, y0, cols, rows, r, fill, stroke) {
  let out = ''
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) out += atom(x0 + r + i * 2 * r, y0 + r + j * 2 * r, r, fill, stroke)
  return out
}

// Eight atoms in a ring.
function atomRing(cx, cy, R, r, fill, stroke) {
  let out = ''
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2 - Math.PI / 2
    out += atom(cx + R * Math.cos(a), cy + R * Math.sin(a), r, fill, stroke)
  }
  return out
}

// A small arrow showing which way a free atom is moving.
const moveArrow = (x1, y1, x2, y2) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const hx = x2 - 11 * Math.cos(a), hy = y2 - 11 * Math.sin(a)
  const px = 6 * Math.sin(a), py = -6 * Math.cos(a)
  return `<line x1="${x1}" y1="${y1}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="${MUTED}" stroke-width="3" stroke-linecap="round"/>
    <path d="M ${x2} ${y2} L ${(hx + px).toFixed(1)} ${(hy + py).toFixed(1)} L ${(hx - px).toFixed(1)} ${(hy - py).toFixed(1)} Z" fill="${MUTED}"/>`
}

// A mini grid of cells, with one row or column filled in.
function miniGrid(x0, y0, mark) {
  let out = ''
  const s = 22
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 6; i++) {
      const on = (mark === 'row' && j === 1) || (mark === 'col' && i === 2)
      out += `<rect x="${x0 + i * s}" y="${y0 + j * s}" width="${s}" height="${s}" fill="${on ? KEY : '#ffffff'}" stroke="${on ? '#8a4209' : '#8a979e'}" stroke-width="1.5"/>`
    }
  }
  return out
}

export const DIAGRAMS = {
  SILVER_ZOOM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <clipPath id="u25-ring-clip"><rect x="30" y="120" width="360" height="240" rx="14"/></clipPath>
    </defs>

    <image href="${rings}" x="30" y="120" width="360" height="240" preserveAspectRatio="xMidYMid slice" clip-path="url(#u25-ring-clip)"/>
    <rect x="30" y="120" width="360" height="240" rx="14" fill="none" stroke="${RULE}" stroke-width="2"/>

    <!-- zoom lines from the magnifier to the atom disc -->
    <line x1="266" y1="236" x2="560" y2="92" stroke="${KEY}" stroke-width="2.5" stroke-dasharray="7 6"/>
    <line x1="266" y1="296" x2="560" y2="428" stroke="${KEY}" stroke-width="2.5" stroke-dasharray="7 6"/>
    <circle cx="250" cy="266" r="34" fill="none" stroke="${KEY}" stroke-width="5"/>

    <circle cx="610" cy="260" r="180" fill="#ffffff" stroke="${KEY}" stroke-width="5"/>
    ${atomDisc(610, 260, 180, 25)}

    <text x="420" y="62" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Pure silver: one kind of atom</text>
    <text x="210" y="400" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Silver rings</text>
    <text x="610" y="485" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}" text-anchor="middle">Zoom in: only silver atoms</text>
    <text x="420" y="532" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">Every atom is the same.</text>
  </svg>`,

  JOINING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <!-- Panel 1: neon, atoms alone -->
    <rect x="30" y="24" width="245" height="300" rx="14" fill="#f4faf4" stroke="#9cc79c" stroke-width="2"/>
    ${atom(90, 90, 21, '#8fd18f', '#2e7d32')}
    ${atom(205, 120, 21, '#8fd18f', '#2e7d32')}
    ${atom(115, 215, 21, '#8fd18f', '#2e7d32')}
    ${atom(220, 262, 21, '#8fd18f', '#2e7d32')}
    ${moveArrow(114, 72, 150, 52)}
    ${moveArrow(230, 138, 256, 168)}
    ${moveArrow(92, 234, 60, 262)}
    ${moveArrow(196, 244, 170, 214)}
    <text x="152" y="366" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">Atoms of neon</text>
    <text x="152" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">move around alone</text>

    <!-- Panel 2: gold, packed closely -->
    <rect x="305" y="24" width="245" height="300" rx="14" fill="#fffbef" stroke="#e0c46a" stroke-width="2"/>
    ${atomBlock(327.5, 74, 5, 5, 20, '#f4cf45', '#9a7400')}
    <text x="427" y="366" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">Atoms of gold</text>
    <text x="427" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">packed closely</text>

    <!-- Panel 3: oxygen, pairs -->
    <rect x="580" y="24" width="245" height="300" rx="14" fill="#fff5f4" stroke="#e5a39d" stroke-width="2"/>
    ${atom(635, 92, 21, '#f08b82', '#b3261e')}${atom(673, 92, 21, '#f08b82', '#b3261e')}
    ${atom(735, 168, 21, '#f08b82', '#b3261e')}${atom(762, 195, 21, '#f08b82', '#b3261e')}
    ${atom(640, 258, 21, '#f08b82', '#b3261e')}${atom(668, 284, 21, '#f08b82', '#b3261e')}
    <text x="702" y="366" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">Particles of oxygen</text>
    <text x="702" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">2 atoms joined</text>

    <!-- Panel 4: sulfur, a ring of eight -->
    <rect x="855" y="24" width="245" height="300" rx="14" fill="#fdfbe8" stroke="#d6c95a" stroke-width="2"/>
    ${atomRing(977, 174, 54, 21, '#efe04a', '#8a7c00')}
    <text x="977" y="366" font-family="${FONT}" font-size="23" font-weight="bold" fill="${INK}" text-anchor="middle">A particle of sulfur</text>
    <text x="977" y="398" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">8 atoms in a ring</text>
  </svg>`,

  TWO_MEANINGS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${plate(1120, 470)}

    <text x="500" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">EVERYDAY ENGLISH</text>
    <text x="870" y="46" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">IN THE PERIODIC TABLE</text>

    <!-- Row 1: table -->
    <rect x="20" y="66" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="142" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">table</text>
    <rect x="330" y="104" width="96" height="12" rx="3" fill="#b98a5a" stroke="#6d4c2e" stroke-width="2"/>
    <rect x="340" y="116" width="10" height="44" fill="#6d4c2e"/>
    <rect x="406" y="116" width="10" height="44" fill="#6d4c2e"/>
    <text x="450" y="140" font-family="${FONT}" font-size="26" fill="${INK}">a desk</text>
    ${miniGrid(720, 84, 'none')}
    <text x="866" y="140" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">a chart</text>

    <!-- Row 2: period -->
    <rect x="20" y="206" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="282" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">period</text>
    <circle cx="378" cy="268" r="36" fill="#ffffff" stroke="${INK}" stroke-width="4"/>
    <line x1="378" y1="268" x2="378" y2="244" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <line x1="378" y1="268" x2="396" y2="276" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <text x="450" y="280" font-family="${FONT}" font-size="26" fill="${INK}">one lesson</text>
    ${miniGrid(720, 224, 'row')}
    <text x="866" y="280" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">a row →</text>

    <!-- Row 3: group -->
    <rect x="20" y="346" width="1080" height="112" rx="14" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="150" y="416" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">group</text>
    <circle cx="344" cy="378" r="12" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <path d="M 326 434 Q 344 396 362 434 Z" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <circle cx="378" cy="372" r="12" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <path d="M 360 434 Q 378 390 396 434 Z" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <circle cx="412" cy="378" r="12" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <path d="M 394 434 Q 412 396 430 434 Z" fill="#ffffff" stroke="${INK}" stroke-width="3"/>
    <text x="450" y="414" font-family="${FONT}" font-size="26" fill="${INK}">people together</text>
    ${miniGrid(720, 358, 'col')}
    <text x="866" y="414" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}">a column ↓</text>
  </svg>`,

  SYMBOL_WAYS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 560" class="w-full h-full">
    ${plate(660, 560)}

    <!-- Way 1: first letter -->
    <rect x="36" y="34" width="130" height="130" rx="12" fill="${NON_F}" stroke="${NON_S}" stroke-width="3"/>
    <text x="101" y="122" font-family="${FONT}" font-size="68" font-weight="bold" fill="${INK}" text-anchor="middle">O</text>
    <path d="M 186 99 l 24 -14 l 0 28 z" fill="${KEY}"/>
    <line x1="208" y1="99" x2="236" y2="99" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>
    <rect x="256" y="62" width="48" height="56" rx="6" fill="${KEY}" stroke="#8a4209" stroke-width="2"/>
    <text x="280" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">O</text>
    <rect x="308" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="332" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">x</text>
    <rect x="360" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="384" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">y</text>
    <rect x="412" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="436" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">g</text>
    <rect x="464" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="488" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">e</text>
    <rect x="516" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="540" y="102" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">n</text>
    <text x="256" y="152" font-family="${FONT}" font-size="22" fill="${MUTED}">the first letter</text>

    <!-- Way 2: first letter + another letter -->
    <rect x="36" y="214" width="130" height="130" rx="12" fill="${NON_F}" stroke="${NON_S}" stroke-width="3"/>
    <text x="101" y="302" font-family="${FONT}" font-size="68" font-weight="bold" fill="${INK}" text-anchor="middle">He</text>
    <path d="M 186 279 l 24 -14 l 0 28 z" fill="${KEY}"/>
    <line x1="208" y1="279" x2="236" y2="279" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>
    <rect x="256" y="242" width="48" height="56" rx="6" fill="${KEY}" stroke="#8a4209" stroke-width="2"/>
    <text x="280" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">H</text>
    <rect x="308" y="242" width="48" height="56" rx="6" fill="${KEY}" stroke="#8a4209" stroke-width="2"/>
    <text x="332" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">e</text>
    <rect x="360" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="384" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">l</text>
    <rect x="412" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="436" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">i</text>
    <rect x="464" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="488" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">u</text>
    <rect x="516" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="540" y="282" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">m</text>
    <text x="256" y="332" font-family="${FONT}" font-size="22" fill="${MUTED}">the first letter + another letter</text>

    <!-- Way 3: another language -->
    <rect x="36" y="394" width="130" height="130" rx="12" fill="${METAL_F}" stroke="${METAL_S}" stroke-width="3"/>
    <text x="101" y="482" font-family="${FONT}" font-size="68" font-weight="bold" fill="${INK}" text-anchor="middle">Na</text>
    <path d="M 186 459 l 24 -14 l 0 28 z" fill="${KEY}"/>
    <line x1="208" y1="459" x2="236" y2="459" stroke="${KEY}" stroke-width="5" stroke-linecap="round"/>
    <rect x="256" y="422" width="48" height="56" rx="6" fill="${KEY}" stroke="#8a4209" stroke-width="2"/>
    <text x="280" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <rect x="308" y="422" width="48" height="56" rx="6" fill="${KEY}" stroke="#8a4209" stroke-width="2"/>
    <text x="332" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">a</text>
    <rect x="360" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="384" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">t</text>
    <rect x="412" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="436" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">r</text>
    <rect x="464" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="488" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">i</text>
    <rect x="516" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="540" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">u</text>
    <rect x="568" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="592" y="462" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">m</text>
    <text x="256" y="512" font-family="${FONT}" font-size="22" fill="${MUTED}">its old Latin name: natrium</text>
  </svg>`,

  METAL_QUIZ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${aluminium}" x="30" y="24" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="204" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Aluminium</text>

    <rect x="385" y="16" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${zinc}" x="395" y="24" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="204" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Zinc</text>

    <rect x="750" y="16" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${lead}" x="760" y="24" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="204" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Lead</text>

    <rect x="20" y="226" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${copper}" x="30" y="234" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="414" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Copper</text>

    <rect x="385" y="226" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${iron}" x="395" y="234" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="414" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Iron</text>

    <rect x="750" y="226" width="350" height="200" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${bromine}" x="760" y="234" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="414" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Bromine</text>
  </svg>`,

  ONE_KIND: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${carbon}" x="30" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Carbon</text>
    <text x="195" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">graphite and diamond</text>

    <rect x="385" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${gold}" x="395" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Gold</text>
    <text x="560" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">only gold atoms</text>

    <rect x="750" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${silver}" x="760" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Silver</text>
    <text x="925" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">only silver atoms</text>
  </svg>`,

  JOINING_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}

    <rect x="20" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${neon}" x="30" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Neon</text>
    <text x="195" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">a gas that glows</text>

    <rect x="385" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${oxygen}" x="395" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Oxygen</text>
    <text x="560" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">so cold it is a liquid</text>

    <rect x="750" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${RULE}" stroke-width="2"/>
    <image href="${sulfur}" x="760" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="366" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Sulfur</text>
    <text x="925" y="402" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">a yellow solid</text>
  </svg>`,
}
