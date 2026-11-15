// content/y7-science/U04_4/diagrams.js
// Inline SVG for 4.4 Using keys. House style: a white plate first, dark ink,
// pale flat fills, question boxes in the book's teal, names and labels in the
// book's orange. Diagrams stay in English: they are the book's keys.
//
//   The goals
//     PIC_ASK, PIC_FOLLOW, PIC_REWRITE   three pictures, no words
//   Ask
//     KEY_PATH      the gecko's three questions, the other answers greyed
//   Follow
//     ONE_QUESTION  one question, two answers: a crab and an earthworm
//     KEY_BOOK      the key on page 139, a real photograph at every name
//     SAOLA         a saola and its horns (Vũ Quang, Vietnam, 1992)
//     ANS_FOUR / ANS_TWO    vote: how many wings does a housefly have?
//     WINGS         a dragonfly (4 wings) beside a housefly (2)
//   Rewrite
//     STATEMENTS    "Is its body made up of rings?" as two sentences
//     FISH_KEY      the fish key (page 142), to rewrite
//     FISH_NUMBERED the fish key as a numbered key: the answer
//     ANS_TREE / ANS_LIST   vote: which style is easier?
//
// Split diagrams are drawn at 840×560, showcase panels at 1120×440, vote
// cards at 720×320 and goal pictures at 480×300 — the shapes those layouts
// give a picture. Label <text> is written out literally so `npm run
// audit:svg` can measure it; the helpers below draw shapes only.

import { INK, KEY, MUTED, TEAL, RULE, GREEN, RED, FONT, plate, mark, treeIcon, listIcon } from './art.js'
import gecko from './images/gecko.jpg'
import crab from './images/crab.jpg'
import earthworm from './images/earthworm.jpg'
import dragonfly from './images/dragonfly.jpg'
import housefly from './images/housefly.jpg'
import slug from './images/slug.jpg'
import saola from './images/saola.jpg'
import saolaHorns from './images/saola-horns.jpg'
import hornShark from './images/fish-horn-shark.jpg'
import lionfish from './images/fish-lionfish.jpg'
import zebrafish from './images/fish-zebrafish.jpg'
import clownfish from './images/fish-clownfish.jpg'

// The voting hands from 3.1 and 4.1–4.3.
const HAND_PATHS = '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
const leftHand = (color) => `<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const rightHand = (color) => `<g transform="translate(528 76) scale(7)" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${HAND_PATHS}</g>`
const BLUE_VOTE = '#1a5fa8'
const GREY = '#b8c0c7'

// A photograph cropped to its cell, with rounded corners.
const photo = (id, href, x, y, w, h, align = 'xMidYMid', r = 12) => `<clipPath id="k44-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${align} slice" clip-path="url(#k44-${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="none" stroke="#cbd5e1" stroke-width="2"/>`

// A question box (teal) and a name box (orange), shapes only.
const qbox = (x, y, w, h, stroke = TEAL, fill = '#e2f2f6') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`
const nbox = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#fff4e8" stroke="${KEY}" stroke-width="3"/>`
// A branch: down from (x, y1) to a bar at yb, across to x2, down to y2.
const fork = (x, y1, yb, xs, y2, color = '#7d8a94', w = 3) =>
  `<path d="M ${x} ${y1} V ${yb} ${xs.map((x2) => `M ${x} ${yb} H ${x2} V ${y2}`).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linejoin="round"/>`
const down = (x, y1, y2, color = KEY, w = 6) => `<path d="M ${x} ${y1} V ${y2 - 14} m -11 -2 l 11 16 l 11 -16" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`
const across = (x1, x2, y, color = GREY, w = 3) => `<path d="M ${x1} ${y} H ${x2 - 12} m -2 -9 l 14 9 l -14 9" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`

export const DIAGRAMS = {
  // ── The goals ─────────────────────────────────────────────────────────────
  // Ask: a question about an animal, and its two answers.
  PIC_ASK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${photo('goal-gecko', gecko, 14, 16, 292, 268)}
    <path d="M 330 40 H 448 Q 466 40 466 58 V 132 Q 466 150 448 150 H 362 L 336 176 L 344 150 H 330 Q 312 150 312 132 V 58 Q 312 40 330 40 Z" fill="#ffffff" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <text x="389" y="130" font-family="${FONT}" font-size="96" font-weight="bold" fill="${TEAL}" text-anchor="middle">?</text>
    ${mark(354, 226, 'yes', 1.35)}
    ${mark(426, 226, 'no', 1.35)}
  </svg>`,

  // Follow: a key with one way through it lit up.
  PIC_FOLLOW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${treeIcon(240, 160, 1.2)}
    <path d="M 240 80.8 V 104.8 H 120 V 128.8 M 120 176.8 V 198.4 H 74.4 V 222.4" fill="none" stroke="${KEY}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="74.4" cy="246.4" r="24" fill="${KEY}" stroke="${INK}" stroke-width="3"/>
  </svg>`,

  // Rewrite: the same key, drawn as a tree and written as a list.
  PIC_REWRITE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${plate(480, 300)}
    ${treeIcon(118, 160, 0.66)}
    <path d="M 222 150 H 262 m -12 -12 l 14 12 l -14 12" fill="none" stroke="${KEY}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    ${listIcon(372, 156, 0.66)}
  </svg>`,

  // ── Ask ───────────────────────────────────────────────────────────────────
  // The gecko: three questions, three answers, one name. The other answers
  // lead off to the right, to the animals they leave behind.
  KEY_PATH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${qbox(24, 24, 420, 62)}
    <text x="234" y="66" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Does it have legs?</text>
    ${down(234, 86, 148)}
    <text x="250" y="126" font-family="${FONT}" font-size="29" font-weight="bold" fill="${KEY}">Yes</text>
    ${across(444, 500, 55)}
    <text x="458" y="40" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}">No</text>
    <text x="520" y="50" font-family="${FONT}" font-size="27" font-weight="bold" fill="${GREY}">snake, fish,</text>
    <text x="520" y="80" font-family="${FONT}" font-size="27" font-weight="bold" fill="${GREY}">snail, earthworm</text>

    ${qbox(24, 150, 420, 62)}
    <text x="234" y="192" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Does it have wings?</text>
    ${down(234, 212, 274)}
    <text x="250" y="252" font-family="${FONT}" font-size="29" font-weight="bold" fill="${KEY}">No</text>
    ${across(444, 500, 181)}
    <text x="458" y="166" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}">Yes</text>
    <text x="520" y="190" font-family="${FONT}" font-size="27" font-weight="bold" fill="${GREY}">chicken, butterfly</text>

    ${qbox(24, 276, 420, 62)}
    <text x="234" y="318" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Does it have eight legs?</text>
    ${down(234, 338, 400)}
    <text x="250" y="378" font-family="${FONT}" font-size="29" font-weight="bold" fill="${KEY}">No</text>
    ${across(444, 500, 307)}
    <text x="458" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}">Yes</text>
    <text x="520" y="316" font-family="${FONT}" font-size="27" font-weight="bold" fill="${GREY}">spider</text>

    ${photo('path-gecko', gecko, 104, 402, 196, 140)}
    <rect x="104" y="402" width="196" height="140" rx="12" fill="none" stroke="${KEY}" stroke-width="6"/>
    <text x="320" y="484" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}">gecko</text>
  </svg>`,

  // ── Follow ────────────────────────────────────────────────────────────────
  // One question, two answers: the first fork of the book's key.
  ONE_QUESTION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${qbox(230, 26, 380, 70)}
    <text x="420" y="73" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">Does it have legs?</text>
    ${fork(420, 96, 150, [210, 630], 196, INK, 4)}
    <text x="196" y="182" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="end">Yes</text>
    <text x="644" y="182" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}">No</text>
    ${photo('one-crab', crab, 30, 198, 360, 260)}
    ${photo('one-worm', earthworm, 450, 198, 360, 260)}
    <text x="210" y="510" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">crab</text>
    <text x="630" y="510" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">earthworm</text>
  </svg>`,

  // The key on page 139, redrawn, with a real photograph at every name.
  KEY_BOOK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${fork(560, 70, 98, [300, 860], 120)}
    ${fork(300, 166, 190, [130, 400], 212)}
    ${fork(860, 166, 190, [760, 980], 212)}
    ${fork(400, 258, 282, [310, 500], 306)}
    ${qbox(420, 18, 280, 52)}
    <text x="560" y="53" font-family="${FONT}" font-size="25" font-weight="bold" fill="${INK}" text-anchor="middle">Does it have legs?</text>
    <text x="290" y="92" font-family="${FONT}" font-size="21" font-weight="bold" fill="${MUTED}" text-anchor="end">Yes</text>
    <text x="870" y="92" font-family="${FONT}" font-size="21" font-weight="bold" fill="${MUTED}">No</text>
    ${qbox(80, 120, 440, 46)}
    <text x="300" y="151" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Does it have more than six legs?</text>
    ${qbox(660, 120, 400, 46)}
    <text x="860" y="151" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Is its body made up of rings?</text>
    <text x="122" y="207" font-family="${FONT}" font-size="21" font-weight="bold" fill="${MUTED}" text-anchor="end">Yes</text>
    <text x="408" y="207" font-family="${FONT}" font-size="21" font-weight="bold" fill="${MUTED}">No</text>
    <text x="752" y="207" font-family="${FONT}" font-size="21" font-weight="bold" fill="${MUTED}" text-anchor="end">Yes</text>
    <text x="988" y="207" font-family="${FONT}" font-size="21" font-weight="bold" fill="${MUTED}">No</text>
    ${photo('book-crab', crab, 55, 212, 150, 100)}
    <text x="130" y="340" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">crab</text>
    ${qbox(236, 212, 328, 46)}
    <text x="400" y="243" font-family="${FONT}" font-size="24" font-weight="bold" fill="${INK}" text-anchor="middle">Does it have four wings?</text>
    <text x="302" y="300" font-family="${FONT}" font-size="21" font-weight="bold" fill="${MUTED}" text-anchor="end">Yes</text>
    <text x="508" y="300" font-family="${FONT}" font-size="21" font-weight="bold" fill="${MUTED}">No</text>
    ${photo('book-dragonfly', dragonfly, 245, 306, 130, 86)}
    <text x="310" y="424" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">dragonfly</text>
    ${photo('book-housefly', housefly, 435, 306, 130, 86)}
    <text x="500" y="424" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">housefly</text>
    ${photo('book-worm', earthworm, 685, 212, 150, 100)}
    <text x="760" y="340" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">earthworm</text>
    ${photo('book-slug', slug, 905, 212, 150, 100)}
    <text x="980" y="340" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}" text-anchor="middle">slug</text>
  </svg>`,

  // A saola: a museum specimen, and horns kept on a wall.
  SAOLA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${photo('saola', saola, 24, 20, 360, 470, 'xMidYMin')}
    ${photo('saola-horns', saolaHorns, 404, 20, 412, 274)}
    <text x="204" y="532" font-family="${FONT}" font-size="31" font-weight="bold" fill="${KEY}" text-anchor="middle">a saola</text>
    <text x="610" y="336" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">saola horns on a wall</text>
    <text x="420" y="420" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Found in Vũ Quang,</text>
    <text x="420" y="460" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">Hà Tĩnh, in 1992</text>
  </svg>`,

  // Vote: how many wings does a real housefly have?
  ANS_FOUR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE_VOTE)}
    <text x="330" y="232" font-family="${FONT}" font-size="190" font-weight="bold" fill="${BLUE_VOTE}" text-anchor="middle">4</text>
    <text x="420" y="196" font-family="${FONT}" font-size="54" font-weight="bold" fill="${BLUE_VOTE}">wings</text>
  </svg>`,

  ANS_TWO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    <text x="150" y="232" font-family="${FONT}" font-size="190" font-weight="bold" fill="${KEY}" text-anchor="middle">2</text>
    <text x="240" y="196" font-family="${FONT}" font-size="54" font-weight="bold" fill="${KEY}">wings</text>
  </svg>`,

  // A dragonfly has four wings; a housefly has two.
  WINGS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('wing-dragonfly', dragonfly, 20, 18, 530, 352)}
    ${photo('wing-housefly', housefly, 570, 18, 530, 352)}
    <text x="285" y="418" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">a dragonfly: 4 wings</text>
    <text x="835" y="418" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">a housefly: 2 wings</text>
  </svg>`,

  // ── Rewrite ───────────────────────────────────────────────────────────────
  // A question that starts with "Is": the "is" moves into the sentence.
  STATEMENTS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${qbox(110, 30, 620, 74)}
    <text x="420" y="80" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">Is its body made up of rings?</text>
    ${fork(420, 104, 160, [260, 580], 196, INK, 4)}
    <text x="246" y="190" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}" text-anchor="end">yes</text>
    <text x="594" y="190" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}">no</text>
    <circle cx="66" cy="252" r="28" fill="${GREEN}"/>
    <text x="66" y="263" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">a</text>
    ${nbox(110, 210, 700, 84)}
    <text x="134" y="264" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">Its body is made up of rings.</text>
    <circle cx="66" cy="378" r="28" fill="${RED}"/>
    <text x="66" y="389" font-family="${FONT}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">b</text>
    ${nbox(110, 336, 700, 84)}
    <text x="134" y="390" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}">Its body is not made up of rings.</text>
    <rect x="110" y="456" width="700" height="72" rx="14" fill="#ffffff" stroke="${KEY}" stroke-width="3" stroke-dasharray="8 6"/>
    <text x="460" y="503" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="middle">Is …? → … is … / … is not …</text>
  </svg>`,

  // The fish key (Think like a scientist, page 142), to rewrite.
  FISH_KEY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${fork(430, 80, 116, [270, 736], 146)}
    ${fork(270, 204, 240, [220, 600], 270)}
    ${fork(220, 328, 364, [120, 360], 394)}
    ${qbox(240, 22, 380, 58)}
    <text x="430" y="61" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Does it have stripes?</text>
    <text x="260" y="140" font-family="${FONT}" font-size="27" font-weight="bold" fill="${MUTED}" text-anchor="end">Yes</text>
    <text x="746" y="140" font-family="${FONT}" font-size="27" font-weight="bold" fill="${MUTED}">No</text>
    ${photo('fk-shark', hornShark, 666, 146, 140, 92)}
    <text x="736" y="268" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">horn shark</text>
    ${qbox(60, 146, 420, 58)}
    <text x="270" y="185" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Are the stripes vertical?</text>
    <text x="210" y="264" font-family="${FONT}" font-size="27" font-weight="bold" fill="${MUTED}" text-anchor="end">Yes</text>
    <text x="610" y="264" font-family="${FONT}" font-size="27" font-weight="bold" fill="${MUTED}">No</text>
    ${photo('fk-zebra', zebrafish, 530, 270, 140, 92)}
    <text x="600" y="392" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">zebra fish</text>
    ${qbox(20, 270, 400, 58)}
    <text x="220" y="309" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Do the fins have spines?</text>
    <text x="110" y="388" font-family="${FONT}" font-size="27" font-weight="bold" fill="${MUTED}" text-anchor="end">Yes</text>
    <text x="370" y="388" font-family="${FONT}" font-size="27" font-weight="bold" fill="${MUTED}">No</text>
    ${photo('fk-lion', lionfish, 50, 394, 140, 92)}
    <text x="120" y="518" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">dragon fish</text>
    ${photo('fk-clown', clownfish, 290, 394, 140, 92)}
    <text x="360" y="518" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">clown fish</text>
  </svg>`,

  // The answer: the fish key as a numbered key.
  FISH_NUMBERED: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <circle cx="44" cy="76" r="24" fill="${TEAL}"/>
    <text x="44" y="86" font-family="${FONT}" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <text x="86" y="62" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">a</text>
    <text x="118" y="62" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">The fish has stripes.</text>
    <text x="1090" y="62" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}" text-anchor="end">go to 2</text>
    <text x="86" y="112" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">b</text>
    <text x="118" y="112" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">The fish does not have stripes.</text>
    ${photo('fn-shark', hornShark, 846, 84, 72, 46, 'xMidYMid', 6)}
    <text x="1090" y="112" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="end">horn shark</text>
    <line x1="24" y1="140" x2="1096" y2="140" stroke="${RULE}" stroke-width="2"/>
    <circle cx="44" cy="214" r="24" fill="${TEAL}"/>
    <text x="44" y="224" font-family="${FONT}" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <text x="86" y="200" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">a</text>
    <text x="118" y="200" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">The stripes are vertical.</text>
    <text x="1090" y="200" font-family="${FONT}" font-size="28" font-weight="bold" fill="${MUTED}" text-anchor="end">go to 3</text>
    <text x="86" y="250" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">b</text>
    <text x="118" y="250" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">The stripes are not vertical.</text>
    ${photo('fn-zebra', zebrafish, 862, 222, 72, 46, 'xMidYMid', 6)}
    <text x="1090" y="250" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="end">zebra fish</text>
    <line x1="24" y1="278" x2="1096" y2="278" stroke="${RULE}" stroke-width="2"/>
    <circle cx="44" cy="352" r="24" fill="${TEAL}"/>
    <text x="44" y="362" font-family="${FONT}" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <text x="86" y="338" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">a</text>
    <text x="118" y="338" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">The fins have spines.</text>
    ${photo('fn-lion', lionfish, 846, 310, 72, 46, 'xMidYMid', 6)}
    <text x="1090" y="338" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="end">dragon fish</text>
    <text x="86" y="388" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">b</text>
    <text x="118" y="388" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}">The fins do not have spines.</text>
    ${photo('fn-clown', clownfish, 862, 360, 72, 46, 'xMidYMid', 6)}
    <text x="1090" y="388" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="end">clown fish</text>
  </svg>`,

  // Vote: which style is easier? (No right answer: say why.)
  ANS_TREE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${leftHand(BLUE_VOTE)}
    ${treeIcon(450, 136, 0.92, BLUE_VOTE)}
    <text x="450" y="278" font-family="${FONT}" font-size="42" font-weight="bold" fill="${BLUE_VOTE}" text-anchor="middle">branching</text>
  </svg>`,

  ANS_LIST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}
    ${rightHand(KEY)}
    ${listIcon(260, 132, 0.92, KEY)}
    <text x="260" y="278" font-family="${FONT}" font-size="42" font-weight="bold" fill="${KEY}" text-anchor="middle">numbered</text>
  </svg>`,
}
