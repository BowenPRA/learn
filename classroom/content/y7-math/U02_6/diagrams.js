// content/y7-math/U02_6/diagrams.js
// Teaching diagrams for 2.6 Inequalities, drawn to match 2.3–2.5.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes and images only,
//    because `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · markers are `markerUnits="userSpaceOnUse"`;
//  · `split` diagrams are 840×560; `showcase` diagrams are 1120×440 strips.
//
// Colour carries meaning, the same as in widgets.jsx: the open circle and the
// arrow are the book's orange, the integers that work are green dots, and a
// number that does not work is red.
//
//   SYMBOLS       3 < 8 and 8 > 3, read aloud
//   WORDS         the other words for less than / greater than in word problems
//   EQ_VS_INEQ    an equation has one answer; c > 3 has many
//   INTEGERS      the whole numbers on a number line; 2.5 and −1.5 are not
//   NUMBER_LINE   x > 2 and x < 4: open circle, then the arrow
//   SMALLEST      x > 3: 3 is not included, so the smallest integer is 4
//   LEFT_RIGHT    t < −2: less than is further LEFT, so −3, −4, −5, …
//   THERMO_REAL   a real thermometer, upright and then on its side
//   READ_LINES    four number lines to write as inequalities
//   MISTAKES      Mr Bowen's homework, which he has marked 4/4
//   ANS_*         the two answers on each vote slide

import thermometer from './images/thermometer.jpg'

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const TEAL = '#0087a8'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const TEAL_T = '#e2f2f6'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

// A lucide "hand" outline, scaled up. Mirrored on the A card so it reads as a
// LEFT hand seen from behind — what a student sees when they raise it.
const hand = (x, colour, mirror) =>
  `<g transform="translate(${x} 76) scale(${mirror ? '-7 7' : '7'})" fill="none" stroke="${colour}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>`

export const DIAGRAMS = {
  SYMBOLS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="30" y="30" width="780" height="220" rx="16" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="420" y="150" font-family="${FONT}" font-size="110" font-weight="bold" fill="${INK}" text-anchor="middle">3 &lt; 8</text>
    <text x="300" y="214" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="end">3</text>
    <text x="420" y="214" font-family="${FONT}" font-size="38" font-weight="bold" fill="${TEAL}" text-anchor="middle">is less than</text>
    <text x="540" y="214" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="start">8</text>
    <rect x="30" y="270" width="780" height="220" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="420" y="390" font-family="${FONT}" font-size="110" font-weight="bold" fill="${INK}" text-anchor="middle">8 &gt; 3</text>
    <text x="274" y="454" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="end">8</text>
    <text x="420" y="454" font-family="${FONT}" font-size="38" font-weight="bold" fill="${KEY}" text-anchor="middle">is greater than</text>
    <text x="566" y="454" font-family="${FONT}" font-size="38" font-weight="bold" fill="${INK}" text-anchor="start">3</text>
    <text x="420" y="536" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">The small end points at the smaller number.</text>
  </svg>`,

  WORDS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${plate(1120, 470)}

    <rect x="20" y="20" width="530" height="430" rx="16" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="3"/>
    <text x="285" y="84" font-family="${FONT}" font-size="40" font-weight="bold" fill="${TEAL}" text-anchor="middle">LESS THAN  &lt;</text>
    <rect x="570" y="20" width="530" height="430" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="835" y="84" font-family="${FONT}" font-size="40" font-weight="bold" fill="${KEY}" text-anchor="middle">GREATER THAN  &gt;</text>
    <text x="50" y="150" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">smaller than</text>
    <text x="520" y="150" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">a smaller number</text>
    <text x="600" y="150" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">more than</text>
    <text x="1070" y="150" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">more than 3 cats</text>
    <text x="50" y="230" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">fewer than</text>
    <text x="520" y="230" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">fewer than 5 cats</text>
    <text x="600" y="230" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">bigger than</text>
    <text x="1070" y="230" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">a bigger number</text>
    <text x="50" y="310" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">below</text>
    <text x="520" y="310" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">below 0 °C</text>
    <text x="600" y="310" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">above</text>
    <text x="1070" y="310" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">above 30 °C</text>
    <text x="50" y="390" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">under</text>
    <text x="520" y="390" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">under 18 years old</text>
    <text x="600" y="390" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">over</text>
    <text x="1070" y="390" font-family="${FONT}" font-size="26" fill="${MUTED}" text-anchor="end">over 100 people</text>
  </svg>`,

  EQ_VS_INEQ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="30" y="30" width="780" height="220" rx="16" fill="#f7f9fa" stroke="${RULE}" stroke-width="1.5"/>
    <text x="60" y="80" font-family="${FONT}" font-size="26" font-weight="bold" fill="${MUTED}" text-anchor="start">2.5 · equation</text>
    <text x="60" y="170" font-family="${FONT}" font-size="64" font-weight="bold" fill="${INK}" text-anchor="start">x + 7 = 15</text>
    <text x="780" y="138" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="end">one answer</text>
    <text x="780" y="196" font-family="${FONT}" font-size="50" font-weight="bold" fill="${TEAL}" text-anchor="end">x = 8</text>
    <rect x="30" y="280" width="780" height="250" rx="16" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="60" y="330" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="start">today · inequality</text>
    <text x="60" y="420" font-family="${FONT}" font-size="72" font-weight="bold" fill="${INK}" text-anchor="start">c &gt; 3</text>
    <text x="780" y="388" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="end">many answers</text>
    <text x="780" y="446" font-family="${FONT}" font-size="44" font-weight="bold" fill="${KEY}" text-anchor="end">4, 5, 6, 7, …</text>
    <text x="420" y="504" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">c is the number of cats</text>
  </svg>`,

  INTEGERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u26-arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${RED}"/></marker>
    </defs>

    <text x="420" y="76" font-family="${FONT}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">Integers are whole numbers</text>
    <text x="420" y="126" font-family="${FONT}" font-size="28" fill="${MUTED}" text-anchor="middle">negative, zero or positive</text>
    <path d="M 70 300 H 770" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 90 288 V 312 M 172.5 288 V 312 M 255 288 V 312 M 337.5 288 V 312 M 420 288 V 312 M 502.5 288 V 312 M 585 288 V 312 M 667.5 288 V 312 M 750 288 V 312" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="90" y="350" font-family="${FONT}" font-size="34" fill="${INK}" text-anchor="middle">−4</text>
    <text x="172.5" y="350" font-family="${FONT}" font-size="34" fill="${INK}" text-anchor="middle">−3</text>
    <text x="255" y="350" font-family="${FONT}" font-size="34" fill="${INK}" text-anchor="middle">−2</text>
    <text x="337.5" y="350" font-family="${FONT}" font-size="34" fill="${INK}" text-anchor="middle">−1</text>
    <text x="420" y="350" font-family="${FONT}" font-size="34" fill="${INK}" text-anchor="middle">0</text>
    <text x="502.5" y="350" font-family="${FONT}" font-size="34" fill="${INK}" text-anchor="middle">1</text>
    <text x="585" y="350" font-family="${FONT}" font-size="34" fill="${INK}" text-anchor="middle">2</text>
    <text x="667.5" y="350" font-family="${FONT}" font-size="34" fill="${INK}" text-anchor="middle">3</text>
    <text x="750" y="350" font-family="${FONT}" font-size="34" fill="${INK}" text-anchor="middle">4</text>
    <circle cx="90" cy="300" r="9" fill="${GREEN}"/>
    <circle cx="172.5" cy="300" r="9" fill="${GREEN}"/>
    <circle cx="255" cy="300" r="9" fill="${GREEN}"/>
    <circle cx="337.5" cy="300" r="9" fill="${GREEN}"/>
    <circle cx="420" cy="300" r="9" fill="${GREEN}"/>
    <circle cx="502.5" cy="300" r="9" fill="${GREEN}"/>
    <circle cx="585" cy="300" r="9" fill="${GREEN}"/>
    <circle cx="667.5" cy="300" r="9" fill="${GREEN}"/>
    <circle cx="750" cy="300" r="9" fill="${GREEN}"/>
    <text x="420" y="420" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">every green dot is an integer</text>
    <path d="M 626.25 214 V 286" fill="none" stroke="${RED}" stroke-width="3" marker-end="url(#u26-arr-r)"/>
    <text x="626.25" y="200" font-family="${FONT}" font-size="32" font-weight="bold" fill="${RED}" text-anchor="middle">2.5</text>
    <path d="M 296.25 214 V 286" fill="none" stroke="${RED}" stroke-width="3" marker-end="url(#u26-arr-r)"/>
    <text x="296.25" y="200" font-family="${FONT}" font-size="32" font-weight="bold" fill="${RED}" text-anchor="middle">−1.5</text>
    <text x="420" y="500" font-family="${FONT}" font-size="30" font-weight="bold" fill="${RED}" text-anchor="middle">2.5 and −1.5 are not integers</text>
  </svg>`,

  NUMBER_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u26-arr" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="22" markerHeight="22" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <text x="60" y="76" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="start">x &gt; 2</text>
    <path d="M 100 214 H 760" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 120 202 V 226 M 208.571 202 V 226 M 297.143 202 V 226 M 385.714 202 V 226 M 474.286 202 V 226 M 562.857 202 V 226 M 651.429 202 V 226 M 740 202 V 226" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="120" y="260" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">−1</text>
    <text x="208.571" y="260" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">0</text>
    <text x="297.143" y="260" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">1</text>
    <text x="385.714" y="260" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">2</text>
    <text x="474.286" y="260" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">3</text>
    <text x="562.857" y="260" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">4</text>
    <text x="651.429" y="260" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">5</text>
    <text x="740" y="260" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">6</text>
    <path d="M 399.714 180 H 758" fill="none" stroke="${KEY}" stroke-width="4" marker-end="url(#u26-arr)"/>
    <circle cx="385.714" cy="180" r="13" fill="#ffffff" stroke="${KEY}" stroke-width="4"/>
    <path d="M 385.714 193 V 208" fill="none" stroke="${KEY}" stroke-width="2" stroke-dasharray="4 4"/>
    <path d="M 373.714 170 L 345.714 146" fill="none" stroke="${KEY}" stroke-width="2"/>
    <circle cx="345.714" cy="146" r="4" fill="${KEY}"/>
    <text x="335.714" y="118" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="end">open circle:</text>
    <text x="335.714" y="150" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="end">2 is NOT included</text>
    <text x="590" y="150" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">arrow: greater than 2</text>
    <line x1="40" y1="300" x2="800" y2="300" stroke="${RULE}" stroke-width="2"/>
    <text x="60" y="372" font-family="${FONT}" font-size="56" font-weight="bold" fill="${INK}" text-anchor="start">x &lt; 4</text>
    <path d="M 100 490 H 760" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 120 478 V 502 M 208.571 478 V 502 M 297.143 478 V 502 M 385.714 478 V 502 M 474.286 478 V 502 M 562.857 478 V 502 M 651.429 478 V 502 M 740 478 V 502" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="120" y="536" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">−1</text>
    <text x="208.571" y="536" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">0</text>
    <text x="297.143" y="536" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">1</text>
    <text x="385.714" y="536" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">2</text>
    <text x="474.286" y="536" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">3</text>
    <text x="562.857" y="536" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">4</text>
    <text x="651.429" y="536" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">5</text>
    <text x="740" y="536" font-family="${FONT}" font-size="30" fill="${INK}" text-anchor="middle">6</text>
    <path d="M 548.857 456 H 102" fill="none" stroke="${KEY}" stroke-width="4" marker-end="url(#u26-arr)"/>
    <circle cx="562.857" cy="456" r="13" fill="#ffffff" stroke="${KEY}" stroke-width="4"/>
    <path d="M 562.857 469 V 484" fill="none" stroke="${KEY}" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="300" y="428" font-family="${FONT}" font-size="26" font-weight="bold" fill="${KEY}" text-anchor="middle">arrow: less than 4</text>
  </svg>`,

  SMALLEST: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u26-arr" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="22" markerHeight="22" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <text x="420" y="80" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">x &gt; 3</text>
    <path d="M 90 270 H 750" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 110 258 V 282 M 187.5 258 V 282 M 265 258 V 282 M 342.5 258 V 282 M 420 258 V 282 M 497.5 258 V 282 M 575 258 V 282 M 652.5 258 V 282 M 730 258 V 282" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="110" y="318" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">0</text>
    <text x="187.5" y="318" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">1</text>
    <text x="265" y="318" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">2</text>
    <text x="342.5" y="318" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">3</text>
    <text x="420" y="318" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">4</text>
    <text x="497.5" y="318" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">5</text>
    <text x="575" y="318" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">6</text>
    <text x="652.5" y="318" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">7</text>
    <text x="730" y="318" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">8</text>
    <circle cx="420" cy="270" r="9" fill="${GREEN}"/>
    <circle cx="497.5" cy="270" r="9" fill="${GREEN}"/>
    <circle cx="575" cy="270" r="9" fill="${GREEN}"/>
    <circle cx="652.5" cy="270" r="9" fill="${GREEN}"/>
    <circle cx="730" cy="270" r="9" fill="${GREEN}"/>
    <path d="M 356.5 236 H 748" fill="none" stroke="${KEY}" stroke-width="4" marker-end="url(#u26-arr)"/>
    <circle cx="342.5" cy="236" r="13" fill="#ffffff" stroke="${KEY}" stroke-width="4"/>
    <path d="M 342.5 249 V 264" fill="none" stroke="${KEY}" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="342.5" y="186" font-family="${FONT}" font-size="28" font-weight="bold" fill="${RED}" text-anchor="middle">not 3</text>
    <path d="M 420 336 V 372" fill="none" stroke="${GREEN}" stroke-width="3"/>
    <rect x="130" y="380" width="580" height="80" rx="14" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="420" y="434" font-family="${FONT}" font-size="38" font-weight="bold" fill="${GREEN}" text-anchor="middle">smallest integer: 4</text>
    <text x="420" y="520" font-family="${FONT}" font-size="30" fill="${MUTED}" text-anchor="middle">Is 3 greater than 3? No.</text>
  </svg>`,

  LEFT_RIGHT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u26-arr" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="22" markerHeight="22" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <text x="420" y="76" font-family="${FONT}" font-size="60" font-weight="bold" fill="${INK}" text-anchor="middle">t &lt; −2</text>
    <path d="M 80 290 H 760" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 100 278 V 302 M 180 278 V 302 M 260 278 V 302 M 340 278 V 302 M 420 278 V 302 M 500 278 V 302 M 580 278 V 302 M 660 278 V 302 M 740 278 V 302" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="100" y="338" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">−6</text>
    <text x="180" y="338" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">−5</text>
    <text x="260" y="338" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">−4</text>
    <text x="340" y="338" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">−3</text>
    <text x="420" y="338" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">−2</text>
    <text x="500" y="338" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">−1</text>
    <text x="580" y="338" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">0</text>
    <text x="660" y="338" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">1</text>
    <text x="740" y="338" font-family="${FONT}" font-size="32" fill="${INK}" text-anchor="middle">2</text>
    <circle cx="340" cy="290" r="9" fill="${GREEN}"/>
    <circle cx="260" cy="290" r="9" fill="${GREEN}"/>
    <circle cx="180" cy="290" r="9" fill="${GREEN}"/>
    <circle cx="100" cy="290" r="9" fill="${GREEN}"/>
    <path d="M 406 256 H 82" fill="none" stroke="${KEY}" stroke-width="4" marker-end="url(#u26-arr)"/>
    <circle cx="420" cy="256" r="13" fill="#ffffff" stroke="${KEY}" stroke-width="4"/>
    <path d="M 420 269 V 284" fill="none" stroke="${KEY}" stroke-width="2" stroke-dasharray="4 4"/>
    <rect x="60" y="390" width="330" height="120" rx="14" fill="${TEAL_T}" stroke="${TEAL}" stroke-width="2.5"/>
    <text x="225" y="440" font-family="${FONT}" font-size="32" font-weight="bold" fill="${TEAL}" text-anchor="middle">← left</text>
    <text x="225" y="486" font-family="${FONT}" font-size="28" fill="${TEAL}" text-anchor="middle">less than</text>
    <rect x="450" y="390" width="330" height="120" rx="14" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2.5"/>
    <text x="615" y="440" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">right →</text>
    <text x="615" y="486" font-family="${FONT}" font-size="28" fill="${KEY}" text-anchor="middle">greater than</text>
    <text x="220" y="196" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}" text-anchor="middle">−3, −4, −5, …</text>
  </svg>`,

  READ_LINES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}
    <defs>
      <marker id="u26-arr" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
    </defs>

    <text x="50" y="118" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">a</text>
    <path d="M 140 110 H 780" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 160 100 V 120 M 260 100 V 120 M 360 100 V 120 M 460 100 V 120 M 560 100 V 120 M 660 100 V 120 M 760 100 V 120" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="160" y="150" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−1</text>
    <text x="260" y="150" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">0</text>
    <text x="360" y="150" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">1</text>
    <text x="460" y="150" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">2</text>
    <text x="560" y="150" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">3</text>
    <text x="660" y="150" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">4</text>
    <text x="760" y="150" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">5</text>
    <path d="M 374 76 H 778" fill="none" stroke="${KEY}" stroke-width="4" marker-end="url(#u26-arr)"/>
    <circle cx="360" cy="76" r="13" fill="#ffffff" stroke="${KEY}" stroke-width="4"/>
    <path d="M 360 89 V 104" fill="none" stroke="${KEY}" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="50" y="244" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">b</text>
    <path d="M 140 236 H 780" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 160 226 V 246 M 260 226 V 246 M 360 226 V 246 M 460 226 V 246 M 560 226 V 246 M 660 226 V 246 M 760 226 V 246" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="160" y="276" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">0</text>
    <text x="260" y="276" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">1</text>
    <text x="360" y="276" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">2</text>
    <text x="460" y="276" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">3</text>
    <text x="560" y="276" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">4</text>
    <text x="660" y="276" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">5</text>
    <text x="760" y="276" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">6</text>
    <path d="M 546 202 H 142" fill="none" stroke="${KEY}" stroke-width="4" marker-end="url(#u26-arr)"/>
    <circle cx="560" cy="202" r="13" fill="#ffffff" stroke="${KEY}" stroke-width="4"/>
    <path d="M 560 215 V 230" fill="none" stroke="${KEY}" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="50" y="370" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">c</text>
    <path d="M 140 362 H 780" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 160 352 V 372 M 260 352 V 372 M 360 352 V 372 M 460 352 V 372 M 560 352 V 372 M 660 352 V 372 M 760 352 V 372" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="160" y="402" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−6</text>
    <text x="260" y="402" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−5</text>
    <text x="360" y="402" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−4</text>
    <text x="460" y="402" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−3</text>
    <text x="560" y="402" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−2</text>
    <text x="660" y="402" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−1</text>
    <text x="760" y="402" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">0</text>
    <path d="M 474 328 H 778" fill="none" stroke="${KEY}" stroke-width="4" marker-end="url(#u26-arr)"/>
    <circle cx="460" cy="328" r="13" fill="#ffffff" stroke="${KEY}" stroke-width="4"/>
    <path d="M 460 341 V 356" fill="none" stroke="${KEY}" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="50" y="496" font-family="${FONT}" font-size="36" font-weight="bold" fill="${INK}" text-anchor="start">d</text>
    <path d="M 140 488 H 780" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M 160 478 V 498 M 260 478 V 498 M 360 478 V 498 M 460 478 V 498 M 560 478 V 498 M 660 478 V 498 M 760 478 V 498" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="160" y="528" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−5</text>
    <text x="260" y="528" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−4</text>
    <text x="360" y="528" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−3</text>
    <text x="460" y="528" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−2</text>
    <text x="560" y="528" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">−1</text>
    <text x="660" y="528" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">0</text>
    <text x="760" y="528" font-family="${FONT}" font-size="26" fill="${INK}" text-anchor="middle">1</text>
    <path d="M 546 454 H 142" fill="none" stroke="${KEY}" stroke-width="4" marker-end="url(#u26-arr)"/>
    <circle cx="560" cy="454" r="13" fill="#ffffff" stroke="${KEY}" stroke-width="4"/>
    <path d="M 560 467 V 482" fill="none" stroke="${KEY}" stroke-width="2" stroke-dasharray="4 4"/>
  </svg>`,

  MISTAKES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${plate(840, 560)}

    <rect x="40" y="20" width="760" height="520" rx="6" fill="#fffdf5" stroke="#d8cfa8" stroke-width="2"/>
    <line x1="60" y1="140" x2="780" y2="140" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="220" x2="780" y2="220" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="300" x2="780" y2="300" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="380" x2="780" y2="380" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="460" x2="780" y2="460" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="120" y1="30" x2="120" y2="530" stroke="#e8a0a0" stroke-width="2"/>
    <text x="140" y="86" font-family="${HAND}" font-size="32" font-weight="bold" fill="${INK}" text-anchor="start">Mr Bowen’s homework</text>
    <circle cx="704" cy="78" r="44" fill="none" stroke="${RED}" stroke-width="4"/>
    <text x="704" y="91" font-family="${HAND}" font-size="34" font-weight="bold" fill="${RED}" text-anchor="middle">4/4</text>
    <text x="140" y="128" font-family="${HAND}" font-size="26" fill="${MUTED}" text-anchor="start">Inequalities</text>
    <text x="140" y="208" font-family="${HAND}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">a) x &gt; 7. Smallest integer: 7</text>
    <text x="140" y="288" font-family="${HAND}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">b) y &lt; −3. y could be −2, −1, 0</text>
    <text x="140" y="368" font-family="${HAND}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">c) k is less than 9: k &gt; 9</text>
    <text x="140" y="448" font-family="${HAND}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="start">d) m &gt; −6. Smallest integer: −7</text>
    <path d="M 740 190 l 10 12 l 20 -26 M 740 270 l 10 12 l 20 -26 M 740 350 l 10 12 l 20 -26 M 740 430 l 10 12 l 20 -26" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  THERMO_REAL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${plate(1120, 440)}
    <defs>
      <marker id="u26-arr" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="22" markerHeight="22" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${KEY}"/></marker>
      <marker id="u26-arr-t" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="22" markerHeight="22" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${TEAL}"/></marker>
      <marker id="u26-arr-m" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${MUTED}"/></marker>
    </defs>

    <image href="${thermometer}" x="24" y="22" width="135" height="396" preserveAspectRatio="xMidYMid meet"/>
    <path d="M 180 220 H 214" fill="none" stroke="${MUTED}" stroke-width="4" marker-end="url(#u26-arr-m)"/>
    <g transform="translate(1098 30) rotate(90) scale(0.72)"><image href="${thermometer}" x="0" y="0" width="408" height="1200" preserveAspectRatio="none"/></g>
    <path d="M 560 350 H 280" fill="none" stroke="${TEAL}" stroke-width="5" marker-end="url(#u26-arr-t)"/>
    <text x="420" y="400" font-family="${FONT}" font-size="32" font-weight="bold" fill="${TEAL}" text-anchor="middle">colder · less than</text>
    <path d="M 700 350 H 1060" fill="none" stroke="${KEY}" stroke-width="5" marker-end="url(#u26-arr)"/>
    <text x="880" y="400" font-family="${FONT}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">hotter · greater than</text>
  </svg>`,

  ANS_3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}

    ${hand(192, BLUE, true)}
    <text x="450" y="233" font-family="${FONT}" font-size="150" font-weight="bold" fill="${BLUE}" text-anchor="middle">3</text>
  </svg>`,

  ANS_4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}

    ${hand(528, KEY, false)}
    <text x="270" y="233" font-family="${FONT}" font-size="150" font-weight="bold" fill="${KEY}" text-anchor="middle">4</text>
  </svg>`,

  ANS_UP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}

    ${hand(192, BLUE, true)}
    <text x="450" y="202" font-family="${FONT}" font-size="58" font-weight="bold" fill="${BLUE}" text-anchor="middle">−1, 0, 1, …</text>
  </svg>`,

  ANS_DOWN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${plate(720, 320)}

    ${hand(528, KEY, false)}
    <text x="270" y="202" font-family="${FONT}" font-size="58" font-weight="bold" fill="${KEY}" text-anchor="middle">−3, −4, …</text>
  </svg>`,
}
