// src/data/Y7_MATH/U05_3/diagrams.js
// Teaching diagrams for 5.3 Drawing lines and quadrilaterals. Eight are ported
// from the classroom deck (content/y7-math/U05_3/diagrams.js) in its own
// palette; five are new for self-study.
//
// House rules (as in the deck):
//  · every diagram opens with a white plate, so it reads on a light or dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · `split` diagrams are 840×560, `showcase` ones 1120×440.
//  · the photos are referenced with assetUrl() (pairing rule 7), not imported.
//
//   Ported   TOOLS · ANGLE_HOW · SQUARE_RHOMBUS · PERP_POINT · DRAW_PERP ·
//            PARALLEL_HOW · CHECK_360 · TABLE
//   New      TWO_NUMBERS     the vote's protractor (40 and 140), without the hands
//                            or the big answer the vote cards printed
//            STARTER_SQUARE  Mr Bowen's 5 cm square, the diagonal a "?"
//            CLASS_DIAGONALS a class's 24 diagonals as a dot plot; one at 7.6
//            PERP_ASK        C above AB, nothing drawn (the hotspot)
//            PHRASES_Q       the Workbook's instructions, without their meanings
//
// Like the book's, the diagrams are not drawn to scale unless they say so, and
// they stay in English.
import { assetUrl } from '../../../utils/assetPaths';

const protractorPhoto = assetUrl('images/Y7_MATH/U05_3/protractor.jpg');
const setSquarePhoto = assetUrl('images/Y7_MATH/U05_3/setsquare.jpg');
const trySquarePhoto = assetUrl('images/Y7_MATH/U05_3/trysquare.jpg');

const INK = '#2b2b2b';
const KEY = '#c25e12';
const MUTED = '#5b6770';
const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';
const TEAL_T = '#e2f2f6';
const PURPLE_T = '#f2ecf7';
const GREEN_T = '#eef6e6';
const ORANGE_T = '#fdf1e3';
const PROT = '#e6f1fa';
const PROT_EDGE = '#5f87ab';

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`;

const rad = (d) => (d * Math.PI) / 180;
const at = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))];
const f = (n) => n.toFixed(1);

const wedge = (cx, cy, r, a1, a2, fill, stroke = INK, sw = 2.5) => {
  const [x1, y1] = at(cx, cy, r, a1);
  const [x2, y2] = at(cx, cy, r, a2);
  return `<path d="M ${f(cx)} ${f(cy)} L ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${f(x2)} ${f(y2)} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
};
const seg = (x1, y1, x2, y2, w = 5, color = INK) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
const dot = (x, y, color = INK, r = 6) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${color}"/>`;
const box = (x, y, d, s = 24, color = INK) => {
  const [ax, ay] = at(x, y, s, d);
  const [bx, by] = at(x, y, s * Math.SQRT2, d + 45);
  const [cx, cy] = at(x, y, s, d + 90);
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(bx)} ${f(by)} L ${f(cx)} ${f(cy)}" fill="none" stroke="${color}" stroke-width="3"/>`;
};
const chevron = (x, y, d, color = INK, s = 16) => {
  const [ax, ay] = at(x, y, s, d + 148);
  const [bx, by] = at(x, y, s, d - 148);
  return `<path d="M ${f(ax)} ${f(ay)} L ${f(x)} ${f(y)} L ${f(bx)} ${f(by)}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
};
const leader = (x1, y1, x2, y2, color = KEY) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="2.5"/><circle cx="${f(x2)}" cy="${f(y2)}" r="5" fill="${color}"/>`;
const badge = (x, y, color) => `<circle cx="${f(x)}" cy="${f(y)}" r="16" fill="${color}"/>`;
const photo = (id, href, x, y, w, h, fit = 'slice') => `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath>
    <image href="${href}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid ${fit}" clip-path="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`;

// A protractor, straight edge level, centre (cx, cy): ticks only — the few
// numbers a diagram needs are written beside it as literal text.
const protractor = (cx, cy, r) => {
  let ticks = '';
  for (let d = 0; d <= 180; d += 5) {
    const len = d % 10 === 0 ? r * 0.1 : r * 0.06;
    const [x1, y1] = at(cx, cy, r, d);
    const [x2, y2] = at(cx, cy, r - len, d);
    ticks += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${PROT_EDGE}" stroke-width="${d % 10 === 0 ? 2 : 1.3}"/>`;
  }
  return `<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="${PROT}" fill-opacity="0.9" stroke="${PROT_EDGE}" stroke-width="3"/>
    <path d="M ${f(cx - r * 0.55)} ${cy} A ${f(r * 0.55)} ${f(r * 0.55)} 0 0 1 ${f(cx + r * 0.55)} ${cy}" fill="none" stroke="${PROT_EDGE}" stroke-width="1.5" opacity="0.6"/>
    ${ticks}
    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${f(cy - r * 0.16)}" stroke="${PROT_EDGE}" stroke-width="2"/>`;
};

export const DIAGRAMS = {
  // ── Ported from the classroom deck ─────────────────────────────────────────
  TOOLS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    ${photo('u53-tl-pro', protractorPhoto, 20, 16, 420, 290)}
    ${photo('u53-tl-set', setSquarePhoto, 460, 16, 200, 290, 'meet')}
    ${photo('u53-tl-try', trySquarePhoto, 680, 16, 420, 290)}
    <text x="230" y="352" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">protractor</text>
    <text x="230" y="390" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">measures angles</text>
    <text x="560" y="352" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">set square</text>
    <text x="560" y="390" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">right angles</text>
    <text x="890" y="352" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">a builder's square</text>
    <text x="890" y="390" font-family="${FONT}" font-size="23" fill="${INK}" text-anchor="middle">a big right angle, for wood</text>
  </svg>`,

  ANGLE_HOW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${protractor(420, 450, 300)}
    <path d="M 769.1 425.6 A 350 350 0 0 0 605.5 153.2" fill="none" stroke="${KEY}" stroke-width="5" stroke-dasharray="12 9" stroke-linecap="round"/>
    <path d="M 590.2 143.7 L 599.7 162.5 L 611.3 143.9 Z" fill="${KEY}"/>
    ${seg(60, 450, 790, 450, 6)}
    ${seg(420, 450, 575.5, 116.5, 6, BLUE)}
    ${dot(554.4, 161.8, KEY, 10)}
    ${dot(420, 450, INK, 8)}
    <text x="682" y="442" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">0</text>
    <text x="647" y="327" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">30</text>
    <text x="551" y="231" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">60</text>
    <text x="420" y="196" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">90</text>
    <text x="289" y="231" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">120</text>
    <text x="193" y="327" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">150</text>
    <text x="158" y="442" font-family="${FONT}" font-size="26" font-weight="bold" fill="#24486b" text-anchor="middle">180</text>
    <text x="490" y="132" font-family="${FONT}" font-size="34" font-weight="bold" fill="${KEY}" text-anchor="end">65°</text>
    <text x="630" y="118" font-family="${FONT}" font-size="23" font-weight="bold" fill="${KEY}">count up from 0</text>
    ${leader(250, 505, 414, 456, INK)}
    <text x="40" y="530" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}">centre on the point</text>
    ${leader(690, 505, 690, 458, INK)}
    <text x="800" y="530" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="end">0 on the line</text>
    <text x="604" y="64" font-family="${FONT}" font-size="26" font-weight="bold" fill="${BLUE}">mark, then join</text>
    ${leader(612, 76, 560, 152, BLUE)}
  </svg>`,

  SQUARE_RHOMBUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="58" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">The same four sides: 40 cm</text>
    <rect x="60" y="180" width="230" height="230" fill="${TEAL_T}" stroke="${INK}" stroke-width="5"/>
    ${box(60, 410, 0, 26)}
    ${box(290, 410, 90, 26)}
    ${box(290, 180, 180, 26)}
    ${box(60, 180, 270, 26)}
    ${wedge(450, 410, 50, 0, 60, ORANGE_T, KEY, 2.5)}
    ${wedge(680, 410, 44, 60, 180, PURPLE_T, PURPLE, 2.5)}
    <polygon points="450,410 680,410 795,210.8 565,210.8" fill="${PURPLE_T}" fill-opacity="0.5" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <text x="175" y="302" font-family="${FONT}" font-size="30" font-weight="bold" fill="${TEAL}" text-anchor="middle">90°</text>
    <text x="512" y="398" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">60°</text>
    <text x="640" y="380" font-family="${FONT}" font-size="26" font-weight="bold" fill="${PURPLE}" text-anchor="middle">120°</text>
    <text x="175" y="462" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">a square</text>
    <text x="175" y="500" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">four right angles</text>
    <text x="622" y="462" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">not a square</text>
    <text x="622" y="500" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">no right angles</text>
  </svg>`,

  PERP_POINT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${seg(430, 180, 250, 420, 4, '#9aa5b1')}
    ${seg(430, 180, 650, 420, 4, '#9aa5b1')}
    ${seg(430, 180, 430, 420, 7, BLUE)}
    ${seg(70, 420, 780, 420, 6)}
    ${box(430, 420, 90, 26, BLUE)}
    ${dot(430, 180, INK, 8)}
    <text x="430" y="154" font-family="${FONT}" font-size="34" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="440" y="470" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">D</text>
    <text x="70" y="470" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">A</text>
    <text x="780" y="470" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="end">B</text>
    <text x="446" y="318" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}">3.0 cm</text>
    <text x="300" y="300" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">3.8 cm</text>
    <text x="560" y="276" font-family="${FONT}" font-size="26" fill="${MUTED}">4.1 cm</text>
    <text x="800" y="60" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">drawn to scale</text>
  </svg>`,

  DRAW_PERP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(690, 440, 56, 120, 180, ORANGE_T, KEY, 2.5)}
    ${seg(130, 440, 690, 440, 6)}
    ${seg(690, 440, 530, 162.9, 6)}
    ${dot(130, 440)}
    ${dot(690, 440)}
    ${dot(530, 162.9)}
    <text x="410" y="490" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">7 cm</text>
    <text x="634" y="280" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}">4 cm</text>
    <text x="616" y="414" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">60°</text>
    <text x="110" y="490" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text x="712" y="490" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="530" y="136" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="60" y="60" font-family="${FONT}" font-size="22" fill="${MUTED}">a sketch: draw it accurately</text>
  </svg>`,

  PARALLEL_HOW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(480, 430, 60, 120, 180, ORANGE_T, KEY, 3)}
    ${wedge(330, 170, 60, 120, 180, ORANGE_T, KEY, 3)}
    ${seg(70, 430, 780, 430, 6)}
    ${seg(70, 170, 780, 170, 6, BLUE)}
    ${seg(480, 430, 280, 83.4, 4, MUTED)}
    ${chevron(700, 430, 0)}
    ${chevron(700, 170, 0, BLUE)}
    ${dot(330, 170, BLUE, 8)}
    ${dot(480, 430)}
    <text x="420" y="404" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">60°</text>
    <text x="270" y="144" font-family="${FONT}" font-size="30" font-weight="bold" fill="${KEY}" text-anchor="middle">60°</text>
    <text x="352" y="214" font-family="${FONT}" font-size="32" font-weight="bold" fill="${BLUE}">P</text>
    <text x="70" y="480" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}">A</text>
    <text x="780" y="480" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="end">B</text>
    ${badge(380.1, 257, '#7d8a97')}
    <text x="380.1" y="265" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    ${badge(372, 398, KEY)}
    <text x="372" y="406" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    ${badge(222, 140, KEY)}
    <text x="222" y="148" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    ${badge(620, 170, BLUE)}
    <text x="620" y="178" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">4</text>
    <text x="540" y="268" font-family="${FONT}" font-size="25" font-weight="bold" fill="${MUTED}">1. a line through P</text>
    <text x="540" y="304" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">2. measure its angle</text>
    <text x="540" y="340" font-family="${FONT}" font-size="25" font-weight="bold" fill="${KEY}">3. copy it at P</text>
    <text x="540" y="376" font-family="${FONT}" font-size="25" font-weight="bold" fill="${BLUE}">4. draw the line</text>
  </svg>`,

  CHECK_360: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${wedge(160, 470, 46, 0, 80, ORANGE_T, KEY, 2.5)}
    ${wedge(520, 470, 46, 70, 180, ORANGE_T, KEY, 2.5)}
    ${wedge(622.6, 188.1, 42, 186.2, 250, GREEN_T, GREEN, 2.5)}
    ${wedge(201.7, 233.6, 42, 260, 366.2, GREEN_T, GREEN, 2.5)}
    <polygon points="160,470 520,470 622.6,188.1 201.7,233.6" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <text x="215" y="433" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">80°</text>
    <text x="479" y="421" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">110°</text>
    <text x="571" y="239" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">64°</text>
    <text x="247" y="292" font-family="${FONT}" font-size="28" font-weight="bold" fill="${GREEN}" text-anchor="middle">106°</text>
    <text x="140" y="500" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text x="540" y="500" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="646" y="180" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="180" y="222" font-family="${FONT}" font-size="26" font-weight="bold" fill="${INK}" text-anchor="middle">D</text>
    <rect x="80" y="20" width="680" height="64" rx="14" fill="${GREEN_T}"/>
    <text x="420" y="63" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">80° + 110° + 64° + 106° = 360°</text>
    <text x="720" y="530" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="end">orange: given · green: measured</text>
  </svg>`,

  TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="160" y="170" width="330" height="330" rx="6" fill="#d9b98f" stroke="${INK}" stroke-width="5"/>
    ${wedge(490, 170, 70, 270, 540, ORANGE_T, KEY, 3)}
    <rect x="160" y="170" width="330" height="330" rx="6" fill="none" stroke="${INK}" stroke-width="5"/>
    <text x="640" y="110" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}">270°</text>
    ${leader(630, 98, 556, 146)}
    <text x="325" y="380" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">Mr Bowen’s table,</text>
    <text x="325" y="414" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">seen from above</text>
  </svg>`,

  // ── New for self-study ─────────────────────────────────────────────────────
  // The vote's protractor: the arm crosses 40 and 140. No hands, no big answer.
  TWO_NUMBERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${protractor(420, 470, 330)}
    ${seg(420, 470, 800, 470, 6)}
    ${seg(420, 470, 764.7, 180.7, 6)}
    ${dot(420, 470, INK, 8)}
    <text x="624" y="266" font-family="${FONT}" font-size="30" font-weight="bold" fill="#24486b" text-anchor="middle">40</text>
    <text x="591" y="300" font-family="${FONT}" font-size="24" fill="${PROT_EDGE}" text-anchor="middle">140</text>
    <text x="703" y="460" font-family="${FONT}" font-size="28" font-weight="bold" fill="#24486b" text-anchor="middle">0</text>
    <text x="183" y="462" font-family="${FONT}" font-size="24" fill="${PROT_EDGE}" text-anchor="middle">0</text>
    <text x="40" y="60" font-family="${FONT}" font-size="24" font-weight="bold" fill="${MUTED}">Two scales: two numbers at every mark</text>
  </svg>`,

  // Mr Bowen's 5 cm square, the starter: the diagonal is the question.
  STARTER_SQUARE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <rect x="270" y="150" width="300" height="300" fill="${TEAL_T}" stroke="${INK}" stroke-width="5"/>
    ${box(270, 450, 0, 24)}
    ${box(570, 450, 90, 24)}
    ${box(570, 150, 180, 24)}
    ${box(270, 150, 270, 24)}
    <line x1="270" y1="450" x2="570" y2="150" stroke="${KEY}" stroke-width="5" stroke-dasharray="14 10"/>
    <rect x="432" y="258" width="96" height="46" rx="10" fill="#ffffff" stroke="${KEY}" stroke-width="2"/>
    <text x="480" y="291" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}" text-anchor="middle">? cm</text>
    <text x="420" y="494" font-family="${FONT}" font-size="30" font-weight="bold" fill="${BLUE}" text-anchor="middle">5 cm</text>
    <text x="246" y="484" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text x="594" y="484" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="594" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="246" y="140" font-family="${FONT}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">D</text>
    <text x="420" y="64" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen’s square</text>
  </svg>`,

  // A class's 24 diagonals (the classroom graphed its own; this one is drawn).
  CLASS_DIAGONALS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="420" y="60" font-family="${FONT}" font-size="28" font-weight="bold" fill="${INK}" text-anchor="middle">Mr Bowen’s class: the diagonal AC</text>
    <text x="420" y="98" font-family="${FONT}" font-size="22" fill="${MUTED}" text-anchor="middle">of a 5 cm square, one dot each</text>
    ${seg(100, 440, 780, 440, 3)}
    ${Array.from({ length: 21 }, (_, k) => `<line x1="${120 + 32 * k}" y1="440" x2="${120 + 32 * k}" y2="${k % 5 === 0 ? 456 : 449}" stroke="${INK}" stroke-width="${k % 5 === 0 ? 2.5 : 1.5}"/>`).join('')}
    ${[[408, 2], [440, 6], [472, 9], [504, 5], [536, 1]].map(([x, n]) => Array.from({ length: n }, (_, j) => dot(x, 420 - 21 * j, BLUE, 9)).join('')).join('')}
    ${dot(632, 420, KEY, 9)}
    <text x="120" y="484" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">6.0</text>
    <text x="280" y="484" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">6.5</text>
    <text x="440" y="484" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">7.0</text>
    <text x="600" y="484" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">7.5</text>
    <text x="760" y="484" font-family="${FONT}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">8.0</text>
    <text x="640" y="384" font-family="${FONT}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">Bao’s square</text>
    <text x="780" y="526" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="end">the diagonal AC (cm)</text>
  </svg>`,

  // The hotspot's picture: C above AB, nothing else. The letters are class="keep",
  // so they survive the hotspot's label stripping.
  PERP_ASK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    ${seg(90, 420, 770, 420, 6)}
    ${dot(90, 420)}
    ${dot(770, 420)}
    ${dot(590, 170, INK, 8)}
    <text class="keep" x="90" y="470" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text class="keep" x="770" y="470" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text class="keep" x="590" y="144" font-family="${FONT}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
  </svg>`,

  // ── The quiz's two readings (both scales' numbers at the crossing) ────────
  // 50° with the first arm on the LEFT 0 (the inside scale): 130 is the trap.
  QUIZ_READ_50: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" class="w-full h-full">
    ${plate(600, 320)}
    ${protractor(300, 280, 220)}
    ${wedge(300, 280, 40, 130, 180, ORANGE_T, KEY, 2.5)}
    ${seg(300, 280, 30, 280, 5)}
    ${seg(300, 280, 120, 65.5, 5)}
    ${dot(300, 280, INK, 6)}
    <text x="189" y="135" font-family="${FONT}" font-size="20" font-weight="bold" fill="#24486b" text-anchor="middle">130</text>
    <text x="207" y="160" font-family="${FONT}" font-size="17" fill="${PROT_EDGE}" text-anchor="middle">50</text>
    <text x="489" y="275" font-family="${FONT}" font-size="20" font-weight="bold" fill="#24486b" text-anchor="middle">0</text>
    <text x="458" y="277" font-family="${FONT}" font-size="17" fill="${PROT_EDGE}" text-anchor="middle">180</text>
    <text x="111" y="275" font-family="${FONT}" font-size="20" font-weight="bold" fill="#24486b" text-anchor="middle">180</text>
    <text x="142" y="277" font-family="${FONT}" font-size="17" fill="${PROT_EDGE}" text-anchor="middle">0</text>
  </svg>`,

  // 120° with the first arm on the RIGHT 0 (the outside scale): 60 is the trap.
  QUIZ_READ_120: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" class="w-full h-full">
    ${plate(600, 320)}
    ${protractor(300, 280, 220)}
    ${wedge(300, 280, 40, 0, 120, ORANGE_T, KEY, 2.5)}
    ${seg(300, 280, 570, 280, 5)}
    ${seg(300, 280, 160, 37.5, 5)}
    ${dot(300, 280, INK, 6)}
    <text x="194" y="131" font-family="${FONT}" font-size="20" font-weight="bold" fill="#24486b" text-anchor="middle">120</text>
    <text x="211" y="156" font-family="${FONT}" font-size="17" fill="${PROT_EDGE}" text-anchor="middle">60</text>
    <text x="489" y="275" font-family="${FONT}" font-size="20" font-weight="bold" fill="#24486b" text-anchor="middle">0</text>
    <text x="458" y="277" font-family="${FONT}" font-size="17" fill="${PROT_EDGE}" text-anchor="middle">180</text>
    <text x="111" y="275" font-family="${FONT}" font-size="20" font-weight="bold" fill="#24486b" text-anchor="middle">180</text>
    <text x="142" y="277" font-family="${FONT}" font-size="17" fill="${PROT_EDGE}" text-anchor="middle">0</text>
  </svg>`,

  // The Workbook's instructions, as it prints them; what each one means is the activity.
  PHRASES_Q: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <text x="40" y="64" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}">The Workbook says…</text>
    <line x1="30" y1="84" x2="810" y2="84" stroke="#cfd8dc" stroke-width="2"/>
    ${badge(62, 146, PURPLE)}
    <text x="62" y="154" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <text x="96" y="155" font-family="${FONT}" font-size="28" fill="${INK}">Draw the line</text>
    <text x="300" y="155" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">through B</text>
    <text x="96" y="193" font-family="${FONT}" font-size="28" fill="${INK}">perpendicular to AB.</text>
    ${badge(62, 266, PURPLE)}
    <text x="62" y="274" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <text x="96" y="275" font-family="${FONT}" font-size="28" fill="${INK}">Draw a perpendicular line</text>
    <text x="96" y="313" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">from C to AB.</text>
    ${badge(62, 386, PURPLE)}
    <text x="62" y="394" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <text x="96" y="395" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">Mark</text>
    <text x="178" y="395" font-family="${FONT}" font-size="28" fill="${INK}">the point D.</text>
    ${badge(62, 466, PURPLE)}
    <text x="62" y="474" font-family="${FONT}" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle">4</text>
    <text x="96" y="475" font-family="${FONT}" font-size="28" fill="${INK}">Measure</text>
    <text x="226" y="475" font-family="${FONT}" font-size="28" font-weight="bold" fill="${KEY}">the length of AD.</text>
  </svg>`,
};
