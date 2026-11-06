// content/y7-science/U03_4/diagrams.js
// Teaching diagrams for 3.4 Tides.
//
//   The goals
//     PIC_SEA / PIC_MOON / PIC_SUN   one picture per part of the lesson, no
//                   words: the goals slide (the column headings say what they are)
//   The sea
//     TIDE_PHOTOS   the same harbour at high tide and six hours later (Bay of
//                   Fundy): the book's photo pair on page 98, as real photographs
//     RANGE         Mr Bowen's harbour: high tide 6 m, low tide 2 m, range 4 m
//   The Moon
//     MOON_PULL     the Moon's gravity pulls the Earth, and the water most easily
//                   (no bulges yet: the vote that follows asks how many)
//     ANS_ONE / ANS_TWO   vote: one high tide at a time, or two?
//     STRETCH       three students, before and after the Moon pulls (1, 2, 3
//                   steps): further apart, so the water bulges on both sides
//     TWO_TIDES     Draw This (page 99): the Earth from above the North Pole,
//                   two high tides, two low tides, the Moon's pull
//     MOON_MOVES    the Moon today and tomorrow: after one turn (24 hours) the
//                   harbour must turn a little more to face it again
//   The Sun
//     ANS_SUN / ANS_MOON   vote: which makes bigger tides?
//     SUN_FAR       pull and stretch: the Sun pulls the Earth 180 times harder,
//                   but the Moon stretches it twice as much — and tides come
//                   from the stretch
//     EFFECTS       harbours, coastal floods, food, electricity (photographs)
//     EARTH_TIDE    the ground rises and falls about 30 cm
//     SUMMARY       the sea, the Moon, the Sun: put it together
//
// Split diagrams are drawn at 840×560, showcase ones at 1120×440, vote cards
// at 720×320 — the shapes those layouts give a picture (as in 3.1). SUMMARY is
// 840×800, like THREE_CLOCKS in Coffee, Carbon and Stars.
// Label <text> is written out literally so `npm run audit:svg` can measure it.
// Helpers below draw shapes only. Diagrams stay in English (house rule).

import fundyHigh from './images/fundy-high.jpg'
import fundyLow from './images/fundy-low.jpg'
import harbourPhoto from './images/harbour.jpg'
import venicePhoto from './images/venice.jpg'
import birdPhoto from './images/oystercatcher.jpg'
import rancePhoto from './images/rance.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const TEAL = '#0087a8'
const BLUE = '#1a5fa8'
const SEA = '#cfe6f5'
const SEA_EDGE = '#5b9bd5'
const LAND = '#a8d08d'
const MOON = '#d9dde3'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const f1 = (n) => Number(n.toFixed(1))

const arrow = (x1, y1, x2, y2, color, w = 5, head = 18) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const hx = x2 - head * Math.cos(a), hy = y2 - head * Math.sin(a)
  const px = head * 0.55 * Math.sin(a), py = -head * 0.55 * Math.cos(a)
  return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(hx)}" y2="${f1(hy)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + px)} ${f1(hy + py)} L ${f1(hx - px)} ${f1(hy - py)} Z" fill="${color}"/>`
}

// A double-headed arrow, for a range or a distance.
const span = (x1, y1, x2, y2, color, w = 4, head = 16) => `${arrow((x1 + x2) / 2, (y1 + y2) / 2, x1, y1, color, w, head)}${arrow((x1 + x2) / 2, (y1 + y2) / 2, x2, y2, color, w, head)}`

const leader = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${KEY}" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="4.5" fill="${KEY}"/>`

// A drawn Sun: flat pale disc and short rays (as in Coffee, Carbon and Stars).
const sun = (cx, cy, r) => {
  let rays = ''
  for (let k = 0; k < 12; k++) {
    const a = (k * 30 * Math.PI) / 180
    rays += `<line x1="${f1(cx + (r + 6) * Math.cos(a))}" y1="${f1(cy + (r + 6) * Math.sin(a))}" x2="${f1(cx + (r + 18) * Math.cos(a))}" y2="${f1(cy + (r + 18) * Math.sin(a))}" stroke="#e8a317" stroke-width="4" stroke-linecap="round"/>`
  }
  return `${rays}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffd45c" stroke="${INK}" stroke-width="3"/>`
}

// The Moon: a grey disc with a few craters.
const moon = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${MOON}" stroke="${INK}" stroke-width="${r > 40 ? 3 : 2.5}"/>
    <circle cx="${f1(cx - r * 0.35)}" cy="${f1(cy - r * 0.3)}" r="${f1(r * 0.2)}" fill="#c3c9d1"/>
    <circle cx="${f1(cx + r * 0.3)}" cy="${f1(cy + r * 0.25)}" r="${f1(r * 0.26)}" fill="#c3c9d1"/>
    <circle cx="${f1(cx + r * 0.38)}" cy="${f1(cy - r * 0.4)}" r="${f1(r * 0.12)}" fill="#c3c9d1"/>`

// The Earth from above the North Pole: pale land, and the ocean around it as an
// oval stretched along the line to the Moon (rx > ry), or a circle (rx = ry).
const earth = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${LAND}" stroke="${INK}" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="${r > 60 ? 6 : 4}" fill="${INK}"/>`
const ocean = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${SEA}" stroke="${SEA_EDGE}" stroke-width="3"/>`

// A small red rowing boat, its hull's top edge at y (the waterline).
const boat = (x, y, w = 120) => `<path d="M ${x} ${y} h ${w} l ${f1(-w * 0.14)} ${f1(w * 0.24)} h ${f1(-w * 0.72)} Z" fill="#d83a2e" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <line x1="${f1(x + w * 0.1)}" y1="${f1(y + w * 0.06)}" x2="${f1(x + w * 0.9)}" y2="${f1(y + w * 0.06)}" stroke="#ffffff" stroke-width="3"/>`

// Stone blocks on a harbour wall.
const stones = (x, y, w, h) => {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#cfc8bd" stroke="${INK}" stroke-width="3"/>`
  for (let yy = y + 34, row = 0; yy < y + h; yy += 34, row++) {
    s += `<line x1="${x}" y1="${yy}" x2="${x + w}" y2="${yy}" stroke="#a79f92" stroke-width="2"/>`
    for (let xx = x + (row % 2 ? 30 : 60); xx < x + w; xx += 60) {
      s += `<line x1="${xx}" y1="${yy - 34}" x2="${xx}" y2="${yy}" stroke="#a79f92" stroke-width="2"/>`
    }
  }
  return s
}

// The voting hands from 3.1.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`

// A photograph cropped to its cell, with rounded corners.
const photo = (id, href, x, y, w, h) => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// A row of three dots (far side, middle, near side) and a bar for the pull on
// each, for STRETCH and SUN_FAR.
const pullBar = (x, y, len, color) => `<rect x="${x}" y="${y - 13}" width="${len}" height="26" rx="6" fill="${color}"/>`

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  PIC_SEA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <rect x="40" y="150" width="320" height="120" rx="14" fill="${SEA}"/>
    <path d="M 40 150 q 20 -14 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="${SEA_EDGE}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 60 200 q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="${SEA_EDGE}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
    ${boat(150, 124, 110)}
    ${span(420, 70, 420, 250, KEY, 6, 24)}
  </svg>`,

  PIC_MOON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${moon(240, 150, 104)}
  </svg>`,

  PIC_SUN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${sun(240, 150, 92)}
  </svg>`,

  // ── The sea ───────────────────────────────────────────────────────────────
  TIDE_PHOTOS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('tp-high', fundyHigh, 24, 14, 524, 372)}
    ${photo('tp-low', fundyLow, 572, 14, 524, 372)}
    <text x="286" y="424" font-family="${FONT}" font-size="28" font-weight="bold" fill="${BLUE}" text-anchor="middle">high tide</text>
    <text x="834" y="424" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">low tide, 6 hours later</text>
  </svg>`,

  RANGE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${stones(40, 120, 150, 360)}
    <rect x="190" y="370" width="610" height="110" fill="${SEA}"/>
    <line x1="190" y1="370" x2="800" y2="370" stroke="${SEA_EDGE}" stroke-width="4"/>
    <rect x="190" y="480" width="610" height="40" fill="#d9c7a3"/>
    <line x1="40" y1="480" x2="800" y2="480" stroke="${INK}" stroke-width="3"/>
    <line x1="190" y1="150" x2="800" y2="150" stroke="${BLUE}" stroke-width="4" stroke-dasharray="14 10"/>
    <rect x="236" y="96" width="22" height="384" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <line x1="236" y1="480" x2="258" y2="480" stroke="${INK}" stroke-width="3"/>
    <line x1="236" y1="425" x2="250" y2="425" stroke="${INK}" stroke-width="2.5"/>
    <line x1="236" y1="370" x2="250" y2="370" stroke="${INK}" stroke-width="2.5"/>
    <line x1="236" y1="315" x2="250" y2="315" stroke="${INK}" stroke-width="2.5"/>
    <line x1="236" y1="260" x2="250" y2="260" stroke="${INK}" stroke-width="2.5"/>
    <line x1="236" y1="205" x2="250" y2="205" stroke="${INK}" stroke-width="2.5"/>
    <line x1="236" y1="150" x2="250" y2="150" stroke="${INK}" stroke-width="2.5"/>
    <rect x="264" y="467" width="46" height="26" rx="5" fill="#ffffff"/>
    <rect x="264" y="357" width="46" height="26" rx="5" fill="#ffffff"/>
    <rect x="264" y="137" width="46" height="26" rx="5" fill="#ffffff"/>
    <text x="270" y="487" font-family="${FONT}" font-size="20" fill="${MUTED}">0 m</text>
    <text x="270" y="377" font-family="${FONT}" font-size="20" fill="${MUTED}">2 m</text>
    <text x="270" y="267" font-family="${FONT}" font-size="20" fill="${MUTED}">4 m</text>
    <text x="270" y="157" font-family="${FONT}" font-size="20" fill="${MUTED}">6 m</text>
    ${boat(310, 348, 90)}
    <text x="790" y="132" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BLUE}" text-anchor="end">high tide: 6 m deep</text>
    <text x="790" y="356" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BLUE}" text-anchor="end">low tide: 2 m deep</text>
    ${span(430, 156, 430, 364, KEY, 5, 20)}
    <text x="452" y="248" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">tidal range</text>
    <text x="452" y="286" font-family="${FONT}" font-size="26" fill="${KEY}">6 − 2 = 4 m</text>
    <text x="115" y="104" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">harbour wall</text>
  </svg>`,

  // ── The Moon ──────────────────────────────────────────────────────────────
  MOON_PULL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${ocean(250, 290, 180, 180)}
    ${earth(250, 290, 145)}
    ${moon(745, 290, 52)}
    ${arrow(452, 290, 668, 290, '#d83a2e', 7, 26)}
    <text x="556" y="248" font-family="${FONT}" font-size="24" font-weight="bold" fill="#d83a2e" text-anchor="middle">the Moon's gravity</text>
    <text x="556" y="336" font-family="${FONT}" font-size="24" font-weight="bold" fill="#d83a2e" text-anchor="middle">pulls</text>
    <text x="745" y="378" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Moon</text>
    ${leader(130, 66, 173, 145)}
    <text x="30" y="56" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">water: moves easily</text>
    ${leader(140, 500, 185, 400)}
    <text x="30" y="530" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">land: hardly moves</text>
    <text x="560" y="530" font-family="${FONT}" font-size="20" fill="${MUTED}">not to scale</text>
  </svg>`,

  ANS_ONE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    <ellipse cx="326" cy="140" rx="92" ry="66" fill="${SEA}" stroke="${SEA_EDGE}" stroke-width="3"/>
    <circle cx="300" cy="140" r="56" fill="${LAND}" stroke="${INK}" stroke-width="3"/>
    ${moon(484, 140, 24)}
    <text x="620" y="190" font-family="${FONT}" font-size="150" font-weight="bold" fill="${BLUE}" text-anchor="middle">1</text>
    <text x="340" y="282" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">only the Moon's side</text>
  </svg>`,

  ANS_TWO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="96" y="190" font-family="${FONT}" font-size="150" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <ellipse cx="300" cy="140" rx="104" ry="58" fill="${SEA}" stroke="${SEA_EDGE}" stroke-width="3"/>
    <circle cx="300" cy="140" r="52" fill="${LAND}" stroke="${INK}" stroke-width="3"/>
    ${moon(460, 140, 24)}
    <text x="290" y="282" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">both sides</text>
  </svg>`,

  STRETCH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="30" y="46" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">1. Before</text>
    <circle cx="120" cy="96" r="20" fill="${SEA}" stroke="${SEA_EDGE}" stroke-width="3"/>
    <circle cx="270" cy="96" r="20" fill="${LAND}" stroke="${INK}" stroke-width="3"/>
    <circle cx="420" cy="96" r="20" fill="${SEA}" stroke="${SEA_EDGE}" stroke-width="3"/>
    <text x="120" y="142" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">far side</text>
    <text x="270" y="142" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">middle</text>
    <text x="420" y="142" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">near side</text>
    ${moon(745, 160, 44)}
    <line x1="30" y1="168" x2="660" y2="168" stroke="#e2e8f0" stroke-width="2"/>
    <text x="30" y="206" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">2. The Moon pulls</text>
    <g fill="none" stroke="#b8c4cf" stroke-width="2.5" stroke-dasharray="5 5">
      <circle cx="120" cy="264" r="20"/><circle cx="270" cy="264" r="20"/><circle cx="420" cy="264" r="20"/>
    </g>
    <circle cx="170" cy="264" r="20" fill="${SEA}" stroke="${SEA_EDGE}" stroke-width="3"/>
    <circle cx="370" cy="264" r="20" fill="${LAND}" stroke="${INK}" stroke-width="3"/>
    <circle cx="570" cy="264" r="20" fill="${SEA}" stroke="${SEA_EDGE}" stroke-width="3"/>
    ${arrow(120, 230, 172, 230, '#d83a2e', 4, 14)}
    ${arrow(270, 230, 372, 230, '#d83a2e', 4, 14)}
    ${arrow(420, 230, 572, 230, '#d83a2e', 4, 14)}
    <text x="145" y="310" font-family="${FONT}" font-size="21" font-weight="bold" fill="#d83a2e" text-anchor="middle">1 step</text>
    <text x="320" y="310" font-family="${FONT}" font-size="21" font-weight="bold" fill="#d83a2e" text-anchor="middle">2 steps</text>
    <text x="495" y="310" font-family="${FONT}" font-size="21" font-weight="bold" fill="#d83a2e" text-anchor="middle">3 steps</text>
    <text x="630" y="256" font-family="${FONT}" font-size="23" font-weight="bold" fill="${KEY}">further apart:</text>
    <text x="630" y="284" font-family="${FONT}" font-size="23" font-weight="bold" fill="${KEY}">stretched!</text>
    <line x1="30" y1="332" x2="810" y2="332" stroke="#e2e8f0" stroke-width="2"/>
    <text x="30" y="368" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}">3. So the water makes 2 bulges</text>
    ${ocean(350, 462, 165, 78)}
    ${earth(350, 462, 66)}
    ${arrow(187, 462, 142, 462, BLUE, 5, 16)}
    ${arrow(513, 462, 558, 462, BLUE, 5, 16)}
    ${moon(750, 476, 30)}
    <text x="138" y="444" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="end">high tide</text>
    <text x="564" y="444" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">high tide</text>
  </svg>`,

  TWO_TIDES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${ocean(320, 280, 205, 150)}
    ${earth(320, 280, 128)}
    <path d="M 233.4 230 A 100 100 0 0 0 233.4 330" fill="none" stroke="${BLUE}" stroke-width="5" stroke-linecap="round"/>
    ${arrow(228, 320, 238, 337, BLUE, 5, 16)}
    ${moon(760, 280, 42)}
    ${arrow(548, 280, 700, 280, '#d83a2e', 6, 22)}
    <text x="624" y="326" font-family="${FONT}" font-size="22" font-weight="bold" fill="#d83a2e" text-anchor="middle">pull of the</text>
    <text x="624" y="354" font-family="${FONT}" font-size="22" font-weight="bold" fill="#d83a2e" text-anchor="middle">Moon's gravity</text>
    <text x="760" y="222" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">Moon</text>
    ${leader(80, 168, 118, 262)}
    <text x="24" y="156" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">high tide</text>
    ${leader(560, 206, 520, 262)}
    <text x="520" y="194" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">high tide</text>
    ${leader(470, 76, 330, 132)}
    <text x="480" y="72" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">low tide</text>
    ${leader(470, 490, 330, 428)}
    <text x="480" y="500" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">low tide</text>
    ${leader(110, 470, 222, 300)}
    <text x="24" y="500" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">the Earth spins</text>
  </svg>`,

  // ── The Sun ───────────────────────────────────────────────────────────────
  ANS_SUN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE)}
    ${sun(440, 136, 78)}
    <text x="440" y="296" font-family="${FONT}" font-size="40" font-weight="bold" fill="${BLUE}" text-anchor="middle">the Sun</text>
  </svg>`,

  ANS_MOON: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${moon(280, 136, 92)}
    <text x="280" y="296" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">the Moon</text>
  </svg>`,

  SUN_FAR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="30" y="52" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}">1. The PULL on the whole Earth</text>
    <text x="150" y="111" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">the Moon</text>
    ${pullBar(166, 104, 6, TEAL)}
    <text x="150" y="161" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">the Sun</text>
    ${pullBar(166, 154, 520, '#e8a317')}
    <text x="700" y="162" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">× 180</text>
    <text x="166" y="214" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}">The Sun pulls much harder.</text>
    <line x1="30" y1="246" x2="810" y2="246" stroke="#e2e8f0" stroke-width="2"/>
    <text x="30" y="294" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}">2. The STRETCH (tidal force)</text>
    <text x="150" y="351" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">the Moon</text>
    ${pullBar(166, 344, 400, TEAL)}
    <text x="150" y="401" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">the Sun</text>
    ${pullBar(166, 394, 184, '#e8a317')}
    <text x="366" y="402" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}">about half</text>
    <text x="166" y="454" font-family="${FONT}" font-size="24" font-weight="bold" fill="${KEY}">The Moon stretches more.</text>
    <rect x="166" y="484" width="508" height="54" rx="12" fill="${TEAL}"/>
    <text x="420" y="520" font-family="${FONT}" font-size="25" font-weight="bold" fill="#ffffff" text-anchor="middle">Tides come from the stretch.</text>
  </svg>`,

  MOON_MOVES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <line x1="300" y1="290" x2="636" y2="290" stroke="${MUTED}" stroke-width="2.5" stroke-dasharray="8 8"/>
    <line x1="300" y1="290" x2="616" y2="175" stroke="${KEY}" stroke-width="2.5" stroke-dasharray="8 8"/>
    ${earth(300, 290, 90)}
    <path d="M 420.7 257.6 A 125 125 0 1 0 420.7 322.4" fill="none" stroke="${BLUE}" stroke-width="4" stroke-linecap="round"/>
    ${arrow(418, 332, 423, 315, BLUE, 4, 16)}
    <path d="M 449.9 284.8 A 150 150 0 0 0 441 238.7" fill="none" stroke="${KEY}" stroke-width="4" stroke-linecap="round"/>
    ${arrow(444.5, 248.1, 439, 233.1, KEY, 4, 14)}
    <circle cx="390" cy="290" r="10" fill="#d83a2e" stroke="#ffffff" stroke-width="3"/>
    ${moon(670, 290, 34)}
    ${moon(648, 164, 34)}
    <path d="M 667.2 244.9 A 370 370 0 0 0 660.5 206.8" fill="none" stroke="${KEY}" stroke-width="4" stroke-linecap="round"/>
    ${arrow(662.4, 214.6, 659, 201, KEY, 4, 14)}
    <text x="670" y="352" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">today</text>
    <text x="648" y="118" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">tomorrow</text>
    <text x="702" y="224" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">the Moon</text>
    <text x="702" y="250" font-family="${FONT}" font-size="21" font-weight="bold" fill="${KEY}">moves on</text>
    ${leader(150, 128, 212, 202)}
    <text x="30" y="116" font-family="${FONT}" font-size="23" font-weight="bold" fill="${BLUE}">1 turn: 24 hours</text>
    <text x="466" y="272" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">a little more</text>
    ${leader(445, 410, 394, 302)}
    <text x="450" y="432" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}">the harbour</text>
    <text x="30" y="528" font-family="${FONT}" font-size="21" fill="${MUTED}">The Moon goes round the Earth once in 29 days.</text>
    <text x="810" y="528" font-family="${FONT}" font-size="19" fill="${MUTED}" text-anchor="end">not to scale</text>
  </svg>`,

  EFFECTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('fx-1', harbourPhoto, 20, 16, 256, 256)}
    ${photo('fx-2', venicePhoto, 296, 16, 256, 256)}
    ${photo('fx-3', birdPhoto, 572, 16, 256, 256)}
    ${photo('fx-4', rancePhoto, 848, 16, 256, 256)}
    <text x="148" y="314" font-family="${FONT}" font-size="27" font-weight="bold" fill="${BLUE}" text-anchor="middle">Harbours</text>
    <text x="148" y="350" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">boats get stuck</text>
    <text x="148" y="378" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">at low tide</text>
    <text x="424" y="314" font-family="${FONT}" font-size="27" font-weight="bold" fill="${BLUE}" text-anchor="middle">Coastal floods</text>
    <text x="424" y="350" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">high tide + strong</text>
    <text x="424" y="378" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">wind (Venice, Italy)</text>
    <text x="700" y="314" font-family="${FONT}" font-size="27" font-weight="bold" fill="${BLUE}" text-anchor="middle">Food</text>
    <text x="700" y="350" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">birds eat shellfish</text>
    <text x="700" y="378" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">at low tide</text>
    <text x="976" y="314" font-family="${FONT}" font-size="27" font-weight="bold" fill="${BLUE}" text-anchor="middle">Electricity</text>
    <text x="976" y="350" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">moving water turns</text>
    <text x="976" y="378" font-family="${FONT}" font-size="21" fill="${INK}" text-anchor="middle">turbines (France)</text>
  </svg>`,

  EARTH_TIDE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <g fill="none" stroke="${BLUE}" stroke-width="3" stroke-dasharray="12 9">
      <path d="M 60 300 H 620"/>
      <rect x="100" y="150" width="90" height="150"/>
      <rect x="210" y="90" width="110" height="210"/>
      <rect x="340" y="190" width="80" height="110"/>
      <path d="M 440 300 v -80 l 60 -50 l 60 50 v 80"/>
    </g>
    <rect x="60" y="360" width="560" height="140" fill="#d9c7a3" stroke="${INK}" stroke-width="3"/>
    <rect x="100" y="210" width="90" height="150" fill="#eef1f4" stroke="${INK}" stroke-width="3"/>
    <rect x="210" y="150" width="110" height="210" fill="#e3e8ee" stroke="${INK}" stroke-width="3"/>
    <rect x="340" y="250" width="80" height="110" fill="#eef1f4" stroke="${INK}" stroke-width="3"/>
    <path d="M 440 360 v -80 l 60 -50 l 60 50 v 80 z" fill="#f4e3d3" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="120" y="236" width="20" height="24" fill="#9ec5e8"/><rect x="150" y="236" width="20" height="24" fill="#9ec5e8"/>
    <rect x="232" y="176" width="22" height="26" fill="#9ec5e8"/><rect x="276" y="176" width="22" height="26" fill="#9ec5e8"/>
    <rect x="232" y="228" width="22" height="26" fill="#9ec5e8"/><rect x="276" y="228" width="22" height="26" fill="#9ec5e8"/>
    ${span(690, 300, 690, 360, KEY, 4, 14)}
    <text x="714" y="324" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">about</text>
    <text x="714" y="354" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">30 cm</text>
    ${leader(700, 470, 600, 430)}
    <text x="640" y="500" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">the ground</text>
    <text x="440" y="60" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BLUE}">dashed: the same city,</text>
    <text x="440" y="92" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BLUE}">6 hours later</text>
    <text x="60" y="540" font-family="${FONT}" font-size="20" fill="${MUTED}">not to scale: the real rise is too small to draw</text>
  </svg>`,

  SUMMARY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 800" class="w-full h-full">
    ${plate(840, 800)}
    <rect x="24" y="20" width="792" height="220" rx="18" fill="#e8f1fa"/>
    <rect x="44" y="120" width="140" height="80" rx="10" fill="${SEA}"/>
    <path d="M 44 120 q 17.5 -12 35 0 t 35 0 t 35 0 t 35 0" fill="none" stroke="${SEA_EDGE}" stroke-width="5" stroke-linecap="round"/>
    ${span(114, 40, 114, 104, KEY, 4, 14)}
    <text x="220" y="95" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}">The sea</text>
    <text x="220" y="140" font-family="${FONT}" font-size="29" fill="${INK}">goes up and down twice a day</text>
    <text x="220" y="182" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}">tides</text>

    <rect x="24" y="256" width="792" height="220" rx="18" fill="#e2f2f6"/>
    ${moon(110, 366, 58)}
    <text x="220" y="331" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}">The Moon</text>
    <text x="220" y="376" font-family="${FONT}" font-size="29" fill="${INK}">pulls the oceans into 2 bulges</text>
    <text x="220" y="418" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}">tidal force</text>

    <rect x="24" y="492" width="792" height="220" rx="18" fill="#fdf1e3"/>
    ${sun(110, 602, 46)}
    <text x="220" y="567" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}">The Sun</text>
    <text x="220" y="612" font-family="${FONT}" font-size="29" fill="${INK}">in line with the Moon: bigger tides</text>
    <text x="220" y="654" font-family="${FONT}" font-size="27" font-weight="bold" fill="${KEY}">full moon and new moon</text>

    <rect x="24" y="728" width="792" height="56" rx="14" fill="${TEAL}"/>
    <text x="420" y="767" font-family="${FONT}" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">The Moon pulls. The Earth spins. The Sun helps.</text>
  </svg>`,
}
