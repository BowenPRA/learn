// content/y7-science/U04_5/diagrams.js
// Inline SVG for 4.5 Constructing keys. House style: a white plate first, dark
// ink, pale flat fills, question boxes in the book's teal, names and labels in
// the book's orange. Diagrams stay in English: the class writes its keys in
// English.
//
//   The goals
//     PIC_CHOOSE, PIC_BUILD, PIC_TEST   three pictures, no words
//   Choose good questions
//     ANS_YES / ANS_NO   vote: is Mr Bowen tall?
//     STARTER     the starter's four questions, two good and two bad
//     TALLER      a word + -er than + a number
//   Build a key
//     FRUIT_STEPS the fruit key from slide 7, with its three steps marked
//   Test it and fix it
//     CATS        the four cats (Think like a scientist), with a word bank
//     SWAP        two keys changing hands
//     CAT_KEY     one cat key that works
//
// Split diagrams are drawn at 840×560, showcase panels at 1120×440, vote cards
// at 720×320 and goal pictures at 480×300. Label <text> is written out
// literally so `npm run audit:svg` can measure it; the helpers draw shapes only.

import { INK, KEY, MUTED, TEAL, RULE, GREEN, RED, FONT, plate, mark, treeIcon, keyCard } from '../U04_4/art.js'
import rambutan from './images/rambutan.jpg'
import dragonFruit from './images/dragon-fruit.jpg'
import banana from './images/banana.jpg'
import lime from './images/lime.jpg'
import pallas from './images/pallas-cat.jpg'
import leopard from './images/leopard.jpg'
import lynx from './images/lynx.jpg'
import tiger from './images/tiger.jpg'

// The voting hands from 3.1 and 4.1–4.4.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const BLUE_VOTE = '#1a5fa8'

// A photograph cropped to its cell, with rounded corners.
const photo = (id, href, x, y, w, h, align = 'xMidYMid', r = 12) => `<clipPath id="k45-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${align} slice" clip-path="url(#k45-${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// A question box (teal), shapes only.
const qbox = (x, y, w, h, stroke = TEAL, fill = '#e2f2f6') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`
// A branch: down from (x, y1) to a bar at yb, across to each x2, down to y2.
const fork = (x, y1, yb, xs, y2, color = '#7d8a94', w = 3) =>
  `<path d="M ${x} ${y1} V ${yb} ${xs.map((x2) => `M ${x} ${yb} H ${x2} V ${y2}`).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linejoin="round"/>`
const across = (x1, x2, y, color = KEY, w = 5) => `<path d="M ${x1} ${y} H ${x2 - 12} m -4 -11 l 16 11 l -16 11" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`
// A numbered step badge.
const badge = (x, y, color = KEY) => `<circle cx="${x}" cy="${y}" r="22" fill="${color}"/>`
// A pencil, pointing down to the left, its tip at (x, y).
const pencil = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s}) rotate(-135)">
    <path d="M 0 0 L 16 -9 L 16 9 Z" fill="#f2d3a8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 0 0 L 6 -3.4 L 6 3.4 Z" fill="${INK}"/>
    <rect x="16" y="-9" width="90" height="18" fill="#f2b632" stroke="${INK}" stroke-width="3"/>
    <rect x="106" y="-9" width="20" height="18" rx="3" fill="#e88b9a" stroke="${INK}" stroke-width="3"/>
  </g>`
// A curved arrow from (x1, y1) to (x2, y2), bending up by bend.
const curve = (x1, y1, x2, y2, bend, color = KEY) => {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2 - bend
  const ang = Math.atan2(y2 - my, x2 - mx)
  const a1 = ang + Math.PI * 0.82
  const a2 = ang - Math.PI * 0.82
  const h = 18
  return `<path d="M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
    <path d="M ${(x2 + h * Math.cos(a1)).toFixed(1)} ${(y2 + h * Math.sin(a1)).toFixed(1)} L ${x2} ${y2} L ${(x2 + h * Math.cos(a2)).toFixed(1)} ${(y2 + h * Math.sin(a2)).toFixed(1)}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`
}

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  // Choose good questions: two questions, one ticked and one crossed.
  PIC_CHOOSE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    <path d="M 40 40 H 200 Q 218 40 218 58 V 150 Q 218 168 200 168 H 96 L 70 196 L 76 168 H 40 Q 22 168 22 150 V 58 Q 22 40 40 40 Z" fill="#ffffff" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <text x="120" y="142" font-family="${FONT}" font-size="104" font-weight="bold" fill="${TEAL}" text-anchor="middle">?</text>
    <path d="M 280 40 H 440 Q 458 40 458 58 V 150 Q 458 168 440 168 H 336 L 310 196 L 316 168 H 280 Q 262 168 262 150 V 58 Q 262 40 280 40 Z" fill="#ffffff" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <text x="360" y="142" font-family="${FONT}" font-size="104" font-weight="bold" fill="${TEAL}" text-anchor="middle">?</text>
    ${mark(120, 248, 'yes', 1.6)}
    ${mark(360, 248, 'no', 1.6)}
  </svg>`,

  // Build a key: a key being drawn with a pencil.
  PIC_BUILD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${treeIcon(214, 162, 1.1)}
    ${pencil(392, 236, 1.05)}
  </svg>`,

  // Test it and fix it: two keys change hands.
  PIC_TEST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${keyCard(110, 170, 1.7)}
    ${keyCard(370, 170, 1.7)}
    ${curve(160, 72, 320, 72, 44)}
    ${curve(320, 268, 160, 268, -44)}
  </svg>`,

  // ── Choose good questions ────────────────────────────────────────────────
  // Vote: is Mr Bowen tall?
  ANS_YES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE_VOTE)}
    <text x="470" y="210" font-family="${FONT}" font-size="150" font-weight="bold" fill="${BLUE_VOTE}" text-anchor="middle">yes</text>
  </svg>`,

  ANS_NO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="240" y="210" font-family="${FONT}" font-size="150" font-weight="bold" fill="${KEY}" text-anchor="middle">no</text>
  </svg>`,

  // Back to the starter: the four questions, two good and two bad.
  STARTER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${qbox(20, 22, 720, 112, RED, '#fdeceb')}
    <text x="46" y="70" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}">A</text>
    <text x="86" y="70" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Is the plant tall?</text>
    <text x="86" y="112" font-family="${FONT}" font-size="27" font-weight="bold" fill="${MUTED}">Tall next to what?</text>
    ${mark(790, 78, 'no', 1.5)}
    ${qbox(20, 156, 720, 112, GREEN, '#eef6e6')}
    <text x="46" y="204" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}">B</text>
    <text x="86" y="204" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Do the flowers have 5 or more petals?</text>
    <text x="86" y="246" font-family="${FONT}" font-size="27" font-weight="bold" fill="${MUTED}">Count them.</text>
    ${mark(790, 212, 'yes', 1.5)}
    ${qbox(20, 290, 720, 112, RED, '#fdeceb')}
    <text x="46" y="338" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}">C</text>
    <text x="86" y="338" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Are the leaves dark green?</text>
    <text x="86" y="380" font-family="${FONT}" font-size="27" font-weight="bold" fill="${MUTED}">How dark is dark?</text>
    ${mark(790, 346, 'no', 1.5)}
    ${qbox(20, 424, 720, 112, GREEN, '#eef6e6')}
    <text x="46" y="472" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}">D</text>
    <text x="86" y="472" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">Are the leaves darker on top than underneath?</text>
    <text x="86" y="514" font-family="${FONT}" font-size="27" font-weight="bold" fill="${MUTED}">Turn a leaf over and look.</text>
    ${mark(790, 480, 'yes', 1.5)}
  </svg>`,

  // English: a word + -er than + a number.
  TALLER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="40" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}">Is it tall?</text>
    ${mark(250, 48, 'no', 1.1)}
    ${across(290, 360, 48)}
    <text x="380" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Is it taller than 1 metre?</text>
    ${mark(800, 48, 'yes', 1.1)}
    <line x1="24" y1="96" x2="816" y2="96" stroke="${RULE}" stroke-width="2"/>
    <text x="40" y="150" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}">Is it long?</text>
    ${mark(250, 140, 'no', 1.1)}
    ${across(290, 360, 140)}
    <text x="380" y="150" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Is it longer than 10 cm?</text>
    ${mark(800, 140, 'yes', 1.1)}
    <line x1="24" y1="188" x2="816" y2="188" stroke="${RULE}" stroke-width="2"/>
    <text x="40" y="242" font-family="${FONT}" font-size="30" font-weight="bold" fill="${MUTED}">Many legs?</text>
    ${mark(250, 232, 'no', 1.1)}
    ${across(290, 360, 232)}
    <text x="380" y="242" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">More than 6 legs?</text>
    ${mark(800, 232, 'yes', 1.1)}

    <rect x="60" y="300" width="230" height="96" rx="16" fill="#f1f5f8" stroke="#9aa5ae" stroke-width="3"/>
    <text x="175" y="362" font-family="${FONT}" font-size="44" font-weight="bold" fill="${MUTED}" text-anchor="middle">tall</text>
    <text x="320" y="364" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <rect x="350" y="300" width="230" height="96" rx="16" fill="#e2f2f6" stroke="${TEAL}" stroke-width="3"/>
    <text x="465" y="362" font-family="${FONT}" font-size="44" font-weight="bold" fill="${TEAL}" text-anchor="middle">-er than</text>
    <text x="610" y="364" font-family="${FONT}" font-size="48" font-weight="bold" fill="${INK}" text-anchor="middle">+</text>
    <rect x="640" y="300" width="160" height="96" rx="16" fill="#fff4e8" stroke="${KEY}" stroke-width="3"/>
    <text x="720" y="362" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="middle">1 m</text>
    <path d="M 420 410 V 444" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 406 432 L 420 450 L 434 432" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="130" y="460" width="580" height="80" rx="16" fill="#ffffff" stroke="${KEY}" stroke-width="3" stroke-dasharray="8 6"/>
    <text x="420" y="514" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">taller than 1 metre</text>
  </svg>`,

  // ── Build a key ──────────────────────────────────────────────────────────
  // The fruit key from slide 7, with its three steps marked.
  FRUIT_STEPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${fork(420, 74, 104, [212, 628], 136)}
    ${fork(212, 196, 226, [110, 310], 262)}
    ${fork(628, 196, 226, [530, 730], 262)}
    ${qbox(205, 14, 430, 60)}
    <text x="420" y="55" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">Is the skin red or pink?</text>
    ${badge(176, 44)}
    <text x="176" y="54" font-family="${FONT}" font-size="27" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <text x="200" y="128" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}" text-anchor="end">Yes</text>
    <text x="640" y="128" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}">No</text>
    ${qbox(8, 136, 408, 60)}
    <text x="212" y="176" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Does the skin have hairs?</text>
    ${qbox(424, 136, 408, 60)}
    <text x="628" y="176" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Is it longer than 10 cm?</text>
    ${badge(420, 240)}
    <text x="420" y="250" font-family="${FONT}" font-size="27" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <text x="100" y="254" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="end">Yes</text>
    <text x="320" y="254" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">No</text>
    <text x="520" y="254" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="end">Yes</text>
    <text x="740" y="254" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">No</text>
    ${photo('fs-ramb', rambutan, 30, 264, 160, 106)}
    ${photo('fs-dragon', dragonFruit, 230, 264, 160, 106)}
    ${photo('fs-banana', banana, 450, 264, 160, 106)}
    ${photo('fs-lime', lime, 650, 264, 160, 106)}
    <text x="110" y="408" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">rambutan</text>
    <text x="310" y="408" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">dragon fruit</text>
    <text x="530" y="408" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">banana</text>
    <text x="730" y="408" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">lime</text>
    <rect x="24" y="440" width="792" height="96" rx="16" fill="#fff4e8" stroke="${KEY}" stroke-width="3"/>
    ${badge(80, 488)}
    <text x="80" y="498" font-family="${FONT}" font-size="27" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <text x="124" y="500" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">One name each: stop.</text>
  </svg>`,

  // ── Test it and fix it ───────────────────────────────────────────────────
  // The four cats (Think like a scientist, page 146), with words to use.
  CATS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('cat-pallas', pallas, 16, 14, 260, 250, 'xMidYMid')}
    ${photo('cat-leopard', leopard, 293, 14, 260, 250, 'xMidYMid')}
    ${photo('cat-lynx', lynx, 570, 14, 260, 250, 'xMidYMid')}
    ${photo('cat-tiger', tiger, 847, 14, 260, 250, 'xMidYMid')}
    <text x="146" y="300" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">Pallas’s cat</text>
    <text x="423" y="300" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">leopard</text>
    <text x="700" y="300" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">lynx</text>
    <text x="977" y="300" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">tiger</text>
    <rect x="16" y="330" width="1091" height="96" rx="16" fill="#e2f2f6" stroke="${TEAL}" stroke-width="3"/>
    <text x="40" y="388" font-family="${FONT}" font-size="28" font-weight="bold" fill="${TEAL}">Words:</text>
    <text x="160" y="388" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">stripes</text>
    <text x="300" y="388" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">spots</text>
    <text x="420" y="388" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">ear tufts</text>
    <text x="580" y="388" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">tail</text>
    <text x="680" y="388" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">thick fur</text>
    <text x="850" y="388" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">longer than</text>
  </svg>`,

  // Swap: your key goes to your partner, theirs comes to you.
  SWAP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${keyCard(200, 290, 2.6)}
    ${keyCard(640, 290, 2.6)}
    <text x="200" y="460" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">your key</text>
    <text x="640" y="460" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">your partner’s key</text>
    ${curve(300, 130, 540, 130, 70)}
    ${curve(540, 500, 300, 500, -40)}
  </svg>`,

  // One cat key that works.
  CAT_KEY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${qbox(20, 20, 430, 56)}
    <text x="235" y="58" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Does it have stripes?</text>
    ${across(450, 520, 48, '#7d8a94', 3)}
    <text x="462" y="34" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}">Yes</text>
    ${photo('ck-tiger', tiger, 530, 16, 110, 66)}
    <text x="656" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">tiger</text>
    <path d="M 235 76 V 136" stroke="#7d8a94" stroke-width="3"/>
    <text x="246" y="116" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}">No</text>

    ${qbox(20, 138, 430, 56)}
    <text x="235" y="176" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Does it have ear tufts?</text>
    ${across(450, 520, 166, '#7d8a94', 3)}
    <text x="462" y="152" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}">Yes</text>
    ${photo('ck-lynx', lynx, 530, 134, 110, 66, 'xMidYMid')}
    <text x="656" y="176" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">lynx</text>
    <path d="M 235 194 V 254" stroke="#7d8a94" stroke-width="3"/>
    <text x="246" y="234" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}">No</text>

    ${qbox(20, 256, 430, 56)}
    <text x="235" y="294" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Is it covered in spots?</text>
    ${across(450, 520, 284, '#7d8a94', 3)}
    <text x="462" y="270" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}">Yes</text>
    ${photo('ck-leopard', leopard, 530, 252, 110, 66)}
    <text x="656" y="294" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">leopard</text>
    <path d="M 235 312 V 352" stroke="#7d8a94" stroke-width="3"/>
    <text x="246" y="342" font-family="${FONT}" font-size="22" font-weight="bold" fill="${MUTED}">No</text>
    ${photo('ck-pallas', pallas, 180, 354, 110, 72)}
    <text x="306" y="400" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">Pallas’s cat</text>

    <rect x="800" y="40" width="300" height="360" rx="18" fill="#eef6e6" stroke="${GREEN}" stroke-width="3"/>
    <text x="950" y="96" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">Check it</text>
    ${mark(838, 150, 'yes', 1)}
    <text x="870" y="160" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">4 cats</text>
    ${mark(838, 214, 'yes', 1)}
    <text x="870" y="224" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">3 questions</text>
    ${mark(838, 278, 'yes', 1)}
    <text x="870" y="288" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">one name each</text>
    ${mark(838, 342, 'yes', 1)}
    <text x="870" y="352" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">same answers</text>
  </svg>`,
}
