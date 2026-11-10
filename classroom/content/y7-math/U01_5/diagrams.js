// content/y7-math/U01_5/diagrams.js
// Teaching diagrams for 1.5 Tests for Divisibility, drawn to match 1.1–1.4 so
// the whole unit reads as one: flat line art on paper-white, the book's orange
// for key words, blue and red for the two halves of a split, green for a yes
// and red for a no.
//
// House rules (docs/LESSON-PLAYBOOK.md §5):
//  · every diagram opens with a white plate, so the artwork is legible on a
//    light OR dark slide and never depends on the page's text colour;
//  · every <text> is written out literally — helpers draw shapes and leader
//    lines only, because `npm run audit:svg` cannot see text produced by a
//    `${helper(...)}` call and will silently check nothing;
//  · label text lives above/below the artwork, never on top of it, and keeps
//    at least ~20px clear of any <rect> so the audit does not read it as
//    living inside that box.
//
// One number is deliberately absent from every diagram: 3960. That is the
// hook posed on slide 2 and paid off on slide 11, and a diagram that leaks it
// early throws the whole lesson away.

const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const RULE = '#7c8a95'
const RED = '#c8102e'
const BLUE = '#1a5fa8'
const GREEN = '#4a8b23'
const GREEN_T = '#eef6e6'
const ORANGE_T = '#fdf1e3'
const BLUE_T = '#eef4fb'
const RED_T = '#fdeef0'
const GREY_T = '#f1f5f9'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

/** White paper plate + a hairline frame. Every diagram starts with this. */
const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const MARKERS = `<defs>
    <marker id="m5-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${INK}"/></marker>
    <marker id="m5-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${GREEN}"/></marker>
  </defs>`

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // What DIVISIBLE means, before any test exists: the same number divided two
  // ways, once landing exactly and once leaving a remainder. Deliberately
  // small numbers — the point is the word, not the arithmetic.
  // ───────────────────────────────────────────────────────────────────────────
  EXACTLY_OR_NOT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 282" class="w-full h-full">
    ${plate(660, 282)}

    <text x="330" y="34" font-family="${FONT}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">Divisible means it divides exactly</text>

    <rect x="60" y="62" width="540" height="64" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="2.5"/>
    <text x="330" y="106" font-family="${FONT}" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">42 ÷ 6 = 7</text>
    <text x="330" y="150" font-family="${FONT}" font-size="15" font-weight="bold" fill="${GREEN}" text-anchor="middle">nothing left over — 42 is divisible by 6</text>

    <rect x="60" y="176" width="540" height="64" rx="12" fill="${RED_T}" stroke="${RED}" stroke-width="2.5"/>
    <text x="330" y="220" font-family="${FONT}" font-size="28" font-weight="900" fill="${INK}" text-anchor="middle">42 ÷ 5 = 8 remainder 2</text>
    <text x="330" y="264" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RED}" text-anchor="middle">2 is left over — 42 is not divisible by 5</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The language beat. One division fact, three English sentences that all say
  // the same thing. This is the slide that stops "divisible by" from being a
  // fourth unrelated thing to memorise.
  // ───────────────────────────────────────────────────────────────────────────
  THREE_SENTENCES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 300" class="w-full h-full">
    ${plate(660, 300)}${MARKERS}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">One fact, three English sentences</text>

    <rect x="225" y="56" width="210" height="56" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="330" y="94" font-family="${FONT}" font-size="26" font-weight="900" fill="${INK}" text-anchor="middle">24 ÷ 6 = 4</text>

    <line x1="330" y1="112" x2="330" y2="146" stroke="${INK}" stroke-width="2.5" marker-end="url(#m5-ink)"/>

    <rect x="40" y="154" width="580" height="40" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="330" y="180" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">6 is a factor of 24</text>

    <rect x="40" y="202" width="580" height="40" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>
    <text x="330" y="228" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">24 is divisible by 6</text>

    <rect x="40" y="250" width="580" height="40" rx="10" fill="${RED_T}" stroke="${RED}" stroke-width="2"/>
    <text x="330" y="276" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">24 is a multiple of 6</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Tests for 2, 5 and 10: the whole number is irrelevant except the last
  // digit. Four digits go grey, one goes orange — that contrast is the rule.
  // ───────────────────────────────────────────────────────────────────────────
  LAST_DIGIT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 312" class="w-full h-full">
    ${plate(660, 312)}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">Only the last digit matters</text>

    <rect x="140" y="52" width="76" height="66" rx="10" fill="${GREY_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="225" y="52" width="76" height="66" rx="10" fill="${GREY_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="310" y="52" width="76" height="66" rx="10" fill="${GREY_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="395" y="52" width="76" height="66" rx="10" fill="${GREY_T}" stroke="${RULE}" stroke-width="2"/>
    <rect x="480" y="52" width="76" height="66" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3.5"/>
    <text x="178" y="100" font-family="${FONT}" font-size="34" font-weight="900" fill="${RULE}" text-anchor="middle">8</text>
    <text x="263" y="100" font-family="${FONT}" font-size="34" font-weight="900" fill="${RULE}" text-anchor="middle">4</text>
    <text x="348" y="100" font-family="${FONT}" font-size="34" font-weight="900" fill="${RULE}" text-anchor="middle">7</text>
    <text x="433" y="100" font-family="${FONT}" font-size="34" font-weight="900" fill="${RULE}" text-anchor="middle">2</text>
    <text x="518" y="100" font-family="${FONT}" font-size="34" font-weight="900" fill="${KEY}" text-anchor="middle">0</text>

    <text x="518" y="142" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">the last digit</text>

    <rect x="60" y="168" width="540" height="36" rx="9" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="330" y="192" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">ends in 0, 2, 4, 6 or 8   →   divisible by 2</text>

    <rect x="60" y="214" width="540" height="36" rx="9" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="330" y="238" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">ends in 0 or 5   →   divisible by 5</text>

    <rect x="60" y="260" width="540" height="36" rx="9" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2"/>
    <text x="330" y="284" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">ends in 0   →   divisible by 10</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Tests for 3 and 9: throw the number away and keep only the digit sum. 4725
  // is chosen because its digits add to 18, which passes both tests at once.
  // ───────────────────────────────────────────────────────────────────────────
  DIGIT_SUM: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 306" class="w-full h-full">
    ${plate(660, 306)}${MARKERS}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">Add up the digits</text>

    <rect x="157" y="50" width="76" height="62" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="247" y="50" width="76" height="62" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="337" y="50" width="76" height="62" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="427" y="50" width="76" height="62" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="195" y="94" font-family="${FONT}" font-size="32" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="285" y="94" font-family="${FONT}" font-size="32" font-weight="900" fill="${INK}" text-anchor="middle">7</text>
    <text x="375" y="94" font-family="${FONT}" font-size="32" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="465" y="94" font-family="${FONT}" font-size="32" font-weight="900" fill="${INK}" text-anchor="middle">5</text>
    <text x="240" y="94" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RULE}" text-anchor="middle">+</text>
    <text x="330" y="94" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RULE}" text-anchor="middle">+</text>
    <text x="420" y="94" font-family="${FONT}" font-size="24" font-weight="bold" fill="${RULE}" text-anchor="middle">+</text>

    <line x1="330" y1="114" x2="330" y2="140" stroke="${GREEN}" stroke-width="2.5" marker-end="url(#m5-green)"/>

    <rect x="250" y="146" width="160" height="56" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="330" y="185" font-family="${FONT}" font-size="28" font-weight="900" fill="${GREEN}" text-anchor="middle">= 18</text>

    <rect x="60" y="220" width="540" height="36" rx="9" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>
    <text x="330" y="244" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">18 divides by 3, so 4725 divides by 3</text>

    <rect x="60" y="264" width="540" height="36" rx="9" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="2"/>
    <text x="330" y="288" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">18 divides by 9, so 4725 divides by 9</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Tests for 4 and 8: cover the front of the number with a finger. The grey
  // digits are the covered ones; the orange block is all you actually test.
  // ───────────────────────────────────────────────────────────────────────────
  END_OF_NUMBER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 292" class="w-full h-full">
    ${plate(660, 292)}

    <text x="330" y="32" font-family="${FONT}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">For 4 and 8, look at the end</text>

    <text x="150" y="66" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">the last TWO digits</text>
    <text x="150" y="120" font-family="${FONT}" font-size="34" font-weight="900" fill="${RULE}" text-anchor="middle">1 3</text>
    <rect x="186" y="86" width="92" height="50" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="232" y="120" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">1 6</text>
    <text x="470" y="112" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">16 ÷ 4 = 4 exactly</text>
    <text x="470" y="134" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="middle">so 1316 is divisible by 4</text>

    <text x="150" y="170" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">the last THREE digits</text>
    <text x="150" y="224" font-family="${FONT}" font-size="34" font-weight="900" fill="${RULE}" text-anchor="middle">1</text>
    <rect x="170" y="190" width="124" height="50" rx="10" fill="${ORANGE_T}" stroke="${KEY}" stroke-width="3"/>
    <text x="232" y="224" font-family="${FONT}" font-size="34" font-weight="900" fill="${INK}" text-anchor="middle">5 2 0</text>
    <text x="470" y="216" font-family="${FONT}" font-size="17" font-weight="bold" fill="${INK}" text-anchor="middle">520 ÷ 8 = 65 exactly</text>
    <text x="470" y="238" font-family="${FONT}" font-size="17" font-weight="bold" fill="${GREEN}" text-anchor="middle">so 1520 is divisible by 8</text>

    <text x="330" y="274" font-family="${FONT}" font-size="15" font-weight="bold" fill="${RULE}" text-anchor="middle">cover the front of the number with your finger</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The test for 6 is not a new test at all — it is two old ones, and BOTH
  // have to pass. Drawn as two gates feeding one result so "and" is visible
  // rather than merely stated.
  // ───────────────────────────────────────────────────────────────────────────
  SIX_IS_TWO_AND_THREE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 268" class="w-full h-full">
    ${plate(520, 268)}${MARKERS}

    <text x="260" y="32" font-family="${FONT}" font-size="17" font-weight="bold" fill="${KEY}" text-anchor="middle">To divide by 6, pass BOTH tests</text>

    <rect x="40" y="54" width="180" height="62" rx="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="130" y="92" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">divisible by 2</text>

    <rect x="300" y="54" width="180" height="62" rx="12" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="2.5"/>
    <text x="390" y="92" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">divisible by 3</text>

    <text x="260" y="92" font-family="${FONT}" font-size="20" font-weight="900" fill="${KEY}" text-anchor="middle">AND</text>

    <line x1="130" y1="118" x2="215" y2="156" stroke="${GREEN}" stroke-width="2.5" marker-end="url(#m5-green)"/>
    <line x1="390" y1="118" x2="305" y2="156" stroke="${GREEN}" stroke-width="2.5" marker-end="url(#m5-green)"/>

    <rect x="150" y="162" width="220" height="62" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="260" y="202" font-family="${FONT}" font-size="22" font-weight="900" fill="${GREEN}" text-anchor="middle">divisible by 6</text>

    <text x="260" y="252" font-family="${FONT}" font-size="14" font-weight="bold" fill="${RULE}" text-anchor="middle">you need both ticks, not just one</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The test for 11, written the way the book's exercises need it and with no
  // negative numbers in sight: split the digits into two alternating groups,
  // add each group, subtract. 2915 gives 14 − 3 = 11, which is the tidiest
  // possible first example.
  // ───────────────────────────────────────────────────────────────────────────
  ELEVEN_GROUPS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 278" class="w-full h-full">
    ${plate(660, 278)}

    <text x="330" y="32" font-family="${FONT}" font-size="18" font-weight="bold" fill="${KEY}" text-anchor="middle">For 11, split the digits into two groups</text>

    <rect x="157" y="52" width="76" height="58" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <rect x="247" y="52" width="76" height="58" rx="10" fill="${RED_T}" stroke="${RED}" stroke-width="3"/>
    <rect x="337" y="52" width="76" height="58" rx="10" fill="${BLUE_T}" stroke="${BLUE}" stroke-width="3"/>
    <rect x="427" y="52" width="76" height="58" rx="10" fill="${RED_T}" stroke="${RED}" stroke-width="3"/>
    <text x="195" y="94" font-family="${FONT}" font-size="30" font-weight="900" fill="${BLUE}" text-anchor="middle">2</text>
    <text x="285" y="94" font-family="${FONT}" font-size="30" font-weight="900" fill="${RED}" text-anchor="middle">9</text>
    <text x="375" y="94" font-family="${FONT}" font-size="30" font-weight="900" fill="${BLUE}" text-anchor="middle">1</text>
    <text x="465" y="94" font-family="${FONT}" font-size="30" font-weight="900" fill="${RED}" text-anchor="middle">5</text>

    <text x="200" y="148" font-family="${FONT}" font-size="18" font-weight="bold" fill="${BLUE}" text-anchor="middle">2 + 1 = 3</text>
    <text x="460" y="148" font-family="${FONT}" font-size="18" font-weight="bold" fill="${RED}" text-anchor="middle">9 + 5 = 14</text>

    <rect x="180" y="172" width="300" height="56" rx="12" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <text x="330" y="210" font-family="${FONT}" font-size="24" font-weight="900" fill="${GREEN}" text-anchor="middle">14 − 3 = 11</text>

    <text x="330" y="258" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">11 is a multiple of 11, so 2915 is too</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE PAYOFF. Slide 2 asked which of 2 to 11 divide into 3960; this is the
  // answer sheet. Nine green ticks and one red cross, and the cross is on the
  // only number with no easy test — which is why the deck never taught one.
  // ───────────────────────────────────────────────────────────────────────────
  TICK_CHART_3960: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 300" class="w-full h-full">
    ${plate(820, 300)}

    <text x="410" y="56" font-family="${FONT}" font-size="46" font-weight="900" fill="${KEY}" text-anchor="middle">3960</text>
    <text x="410" y="86" font-family="${FONT}" font-size="16" font-weight="bold" fill="${RULE}" text-anchor="middle">which of these divide into it exactly?</text>

    <rect x="25" y="110" width="68" height="64" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <rect x="103" y="110" width="68" height="64" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <rect x="181" y="110" width="68" height="64" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <rect x="259" y="110" width="68" height="64" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <rect x="337" y="110" width="68" height="64" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <rect x="415" y="110" width="68" height="64" rx="10" fill="${RED_T}" stroke="${RED}" stroke-width="3"/>
    <rect x="493" y="110" width="68" height="64" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <rect x="571" y="110" width="68" height="64" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <rect x="649" y="110" width="68" height="64" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>
    <rect x="727" y="110" width="68" height="64" rx="10" fill="${GREEN_T}" stroke="${GREEN}" stroke-width="3"/>

    <text x="59" y="138" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">2</text>
    <text x="137" y="138" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">3</text>
    <text x="215" y="138" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">4</text>
    <text x="293" y="138" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">5</text>
    <text x="371" y="138" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">6</text>
    <text x="449" y="138" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">7</text>
    <text x="527" y="138" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">8</text>
    <text x="605" y="138" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">9</text>
    <text x="683" y="138" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">10</text>
    <text x="761" y="138" font-family="${FONT}" font-size="24" font-weight="900" fill="${INK}" text-anchor="middle">11</text>

    <text x="59" y="166" font-family="${FONT}" font-size="21" font-weight="900" fill="${GREEN}" text-anchor="middle">✓</text>
    <text x="137" y="166" font-family="${FONT}" font-size="21" font-weight="900" fill="${GREEN}" text-anchor="middle">✓</text>
    <text x="215" y="166" font-family="${FONT}" font-size="21" font-weight="900" fill="${GREEN}" text-anchor="middle">✓</text>
    <text x="293" y="166" font-family="${FONT}" font-size="21" font-weight="900" fill="${GREEN}" text-anchor="middle">✓</text>
    <text x="371" y="166" font-family="${FONT}" font-size="21" font-weight="900" fill="${GREEN}" text-anchor="middle">✓</text>
    <text x="449" y="166" font-family="${FONT}" font-size="21" font-weight="900" fill="${RED}" text-anchor="middle">✗</text>
    <text x="527" y="166" font-family="${FONT}" font-size="21" font-weight="900" fill="${GREEN}" text-anchor="middle">✓</text>
    <text x="605" y="166" font-family="${FONT}" font-size="21" font-weight="900" fill="${GREEN}" text-anchor="middle">✓</text>
    <text x="683" y="166" font-family="${FONT}" font-size="21" font-weight="900" fill="${GREEN}" text-anchor="middle">✓</text>
    <text x="761" y="166" font-family="${FONT}" font-size="21" font-weight="900" fill="${GREEN}" text-anchor="middle">✓</text>

    <text x="410" y="216" font-family="${FONT}" font-size="20" font-weight="bold" fill="${GREEN}" text-anchor="middle">3960 divides by every number from 2 to 11</text>
    <text x="410" y="248" font-family="${FONT}" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">except 7 — the one with no easy test</text>
    <text x="410" y="280" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">3960 ÷ 7 = 565 remainder 5</text>
  </svg>`,
}
