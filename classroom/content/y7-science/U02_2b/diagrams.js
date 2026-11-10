// content/y7-science/U02_2b/diagrams.js
// Teaching diagrams for 2.2b Measuring — same house style as the rest of the
// unit: flat line art on paper-white, thin ink outlines, pale flat fills, key
// words in the Learner's Book orange, and every label <text> written out
// literally so `npm run audit:svg` can measure it (helpers draw shapes only).
//
// These redraw the p.37–39 figures rather than cropping them, for two reasons:
// the book scans are ~115 dpi and too soft to project, and redrawing lets the
// scale readings be chosen so the answers are unambiguous — the whole skill in
// Questions 1 and 2 is reading a level, and a blurry level teaches nothing.
//
// Water-blue matches the liquid colour used across Unit 2.

const INK = '#2b2b2b'
const KEY = '#c25e12'
const LEAD = '#7c8a95'
const RULE = '#b6c1c9'
const TINT = '#f3f6f8'
const GLASS_S = '#9aa8b4'
const LIQ_F = '#bfe0f2', LIQ_S = '#2f7fb0'
const MERCURY = '#c8102e' // the thermometer liquid
const FLAME = '#e8721c'
const METAL = '#8a949c'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const lead = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="${x2}" cy="${y2}" r="3.2" fill="${LEAD}"/>`
const rule = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${RULE}" stroke-width="1.6"/>`
const vrule = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${RULE}" stroke-width="1.6"/>`

/** A measuring-cylinder outline: straight sides, rounded base, small foot. */
const cyl = (x, y, w, h) => {
  const r = 12
  return `<path d="M ${x} ${y} v ${h - r} q 0 ${r} ${r} ${r} h ${w - 2 * r} q ${r} 0 ${r} -${r} v -${h - r}" fill="none" stroke="${GLASS_S}" stroke-width="3"/>
    <line x1="${x - 8}" y1="${y}" x2="${x + w + 8}" y2="${y}" stroke="${GLASS_S}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="${x + w / 2}" cy="${y + h + 8}" rx="${w / 2 + 6}" ry="6" fill="none" stroke="${GLASS_S}" stroke-width="3"/>`
}

/** Water inside a cylinder, filled from the base up to `levelY`, with a concave
 *  meniscus drawn as a shallow dip. Shapes only. */
const water = (x, y, w, h, levelY, dip = 5) => {
  const r = 12
  return `<path d="M ${x + 2} ${levelY} q ${w / 2 - 2} ${dip} ${w - 4} 0 v ${y + h - levelY - r} q 0 ${r} -${r} ${r} h -${w - 4 - 2 * r} q -${r} 0 -${r} -${r} Z" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="2"/>`
}

/** Scale tick marks up the left inside edge of a cylinder (shapes only). */
const ticks = (x, y0, step, n, len = 10) => {
  let s = ''
  for (let i = 0; i <= n; i++) s += `<line x1="${x}" y1="${y0 - i * step}" x2="${x + (i % 5 === 0 ? len + 6 : len)}" y2="${y0 - i * step}" stroke="${GLASS_S}" stroke-width="1.8"/>`
  return s
}

/** A thermometer body: rounded tube + bulb, with the liquid column to `levelY`. */
const thermo = (cx, topY, bulbY, levelY) => {
  const wTube = 16, wCol = 7, rBulb = 15
  return `<rect x="${cx - wTube / 2}" y="${topY}" width="${wTube}" height="${bulbY - topY}" rx="8" fill="#ffffff" stroke="${INK}" stroke-width="2.2"/>
    <circle cx="${cx}" cy="${bulbY}" r="${rBulb}" fill="${MERCURY}" stroke="${INK}" stroke-width="2.2"/>
    <rect x="${cx - wCol / 2}" y="${levelY}" width="${wCol}" height="${bulbY - levelY}" fill="${MERCURY}"/>`
}

export const DIAGRAMS = {
  // ───────────────────────────────────────────────────────────────────────────
  // Measuring volume: the meniscus, read from the bottom of the curve with the
  // eye level with it. Redrawn from p.37. One clear reading (40 cm³) so the class
  // sees the technique before Question 1 asks them to do it three times.
  // ───────────────────────────────────────────────────────────────────────────
  MENISCUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" class="w-full h-full">
    ${plate(760, 430)}

    <text x="380" y="44" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Read from the bottom of the meniscus, with your eye level</text>

    ${cyl(150, 80, 110, 250)}
    ${ticks(150, 322, 24.8, 10)}
    ${water(150, 80, 110, 250, 216, 7)}

    <text x="120" y="227" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="end">40</text>
    <text x="120" y="277" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="end">20</text>
    <text x="120" y="178" font-family="${FONT}" font-size="15" fill="${INK}" text-anchor="end">60</text>
    <text x="240" y="72" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">cm³</text>

    ${lead(300, 132, 232, 214)}
    <text x="308" y="128" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}">the meniscus</text>
    <text x="308" y="149" font-family="${FONT}" font-size="13" fill="${INK}">the curved surface</text>

    <line x1="205" y1="223" x2="560" y2="223" stroke="${INK}" stroke-width="1.6" stroke-dasharray="7 6"/>
    <text x="308" y="246" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}">read here — the bottom of the curve</text>

    <ellipse cx="620" cy="223" rx="46" ry="26" fill="#ffffff" stroke="${INK}" stroke-width="2.4"/>
    <circle cx="606" cy="223" r="12" fill="#ffffff" stroke="${INK}" stroke-width="2.4"/>
    <circle cx="606" cy="223" r="5.5" fill="${INK}"/>
    <text x="620" y="282" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">your eye, level</text>
    <text x="620" y="301" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}" text-anchor="middle">with the surface</text>

    <text x="205" y="404" font-family="${FONT}" font-size="17" font-weight="bold" fill="${LIQ_S}" text-anchor="middle">this reads 40 cm³</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Question 1 (p.37): read three cylinders. Levels sit ON numbered lines so the
  // reading is unambiguous — A 20, B 60, C 90 cm³.
  // ───────────────────────────────────────────────────────────────────────────
  CYLINDERS_Q1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 420" class="w-full h-full">
    ${plate(760, 420)}

    ${cyl(70, 70, 96, 250)}
    ${ticks(70, 312, 24.6, 10)}
    ${water(70, 70, 96, 250, 263, 6)}
    <text x="118" y="46" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <text x="44" y="267" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">20</text>
    <text x="44" y="144" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">70</text>

    ${cyl(330, 70, 96, 250)}
    ${ticks(330, 312, 24.6, 10)}
    ${water(330, 70, 96, 250, 165, 6)}
    <text x="378" y="46" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <text x="304" y="169" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">60</text>
    <text x="304" y="292" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">10</text>

    ${cyl(590, 70, 96, 250)}
    ${ticks(590, 312, 24.6, 10)}
    ${water(590, 70, 96, 250, 92, 6)}
    <text x="638" y="46" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <text x="564" y="96" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">90</text>
    <text x="564" y="219" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">40</text>

    <text x="380" y="404" font-family="${FONT}" font-size="16" fill="${KEY}" text-anchor="middle">Each small line is 10 cm³. What volume is in each cylinder?</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Measuring temperature: one thermometer, labelled. The liquid rises as it
  // gets hotter; read at eye level from the top of the liquid. Reads 22 °C.
  // ───────────────────────────────────────────────────────────────────────────
  THERMOMETER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 440" class="w-full h-full">
    ${plate(620, 440)}

    <text x="310" y="42" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">The liquid rises as it gets hotter</text>

    ${thermo(250, 70, 372, 204)}

    <line x1="266" y1="110" x2="280" y2="110" stroke="${INK}" stroke-width="1.8"/>
    <line x1="266" y1="162" x2="280" y2="162" stroke="${INK}" stroke-width="1.8"/>
    <line x1="266" y1="214" x2="280" y2="214" stroke="${INK}" stroke-width="1.8"/>
    <line x1="266" y1="266" x2="280" y2="266" stroke="${INK}" stroke-width="1.8"/>
    <line x1="266" y1="318" x2="280" y2="318" stroke="${INK}" stroke-width="1.8"/>
    <text x="292" y="115" font-family="${FONT}" font-size="15" fill="${INK}">40</text>
    <text x="292" y="167" font-family="${FONT}" font-size="15" fill="${INK}">30</text>
    <text x="292" y="219" font-family="${FONT}" font-size="15" fill="${INK}">20</text>
    <text x="292" y="271" font-family="${FONT}" font-size="15" fill="${INK}">10</text>
    <text x="292" y="323" font-family="${FONT}" font-size="15" fill="${INK}">0</text>
    <text x="258" y="66" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">°C</text>

    ${lead(410, 372, 262, 372)}
    <text x="418" y="377" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}">the bulb</text>
    ${lead(410, 300, 250, 300)}
    <text x="418" y="305" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}">the liquid</text>

    <line x1="150" y1="204" x2="360" y2="204" stroke="${INK}" stroke-width="1.6" stroke-dasharray="7 6"/>
    <text x="150" y="196" font-family="${FONT}" font-size="15" font-weight="bold" fill="${INK}">read the top of the liquid, at eye level</text>
    <text x="470" y="210" font-family="${FONT}" font-size="18" font-weight="bold" fill="${MERCURY}">22 °C</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // Question 2 (p.38): read three thermometers. A 25, B 15, C 40 °C.
  // ───────────────────────────────────────────────────────────────────────────
  THERMOMETERS_Q2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 420" class="w-full h-full">
    ${plate(760, 420)}

    ${thermo(150, 70, 350, 206)}
    <text x="150" y="392" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">A</text>
    <line x1="164" y1="120" x2="176" y2="120" stroke="${INK}" stroke-width="1.6"/>
    <line x1="164" y1="177" x2="176" y2="177" stroke="${INK}" stroke-width="1.6"/>
    <line x1="164" y1="235" x2="176" y2="235" stroke="${INK}" stroke-width="1.6"/>
    <line x1="164" y1="292" x2="176" y2="292" stroke="${INK}" stroke-width="1.6"/>
    <line x1="164" y1="350" x2="176" y2="350" stroke="${INK}" stroke-width="1.6"/>
    <text x="184" y="125" font-family="${FONT}" font-size="13" fill="${INK}">40</text>
    <text x="184" y="182" font-family="${FONT}" font-size="13" fill="${INK}">30</text>
    <text x="184" y="240" font-family="${FONT}" font-size="13" fill="${INK}">20</text>
    <text x="184" y="297" font-family="${FONT}" font-size="13" fill="${INK}">10</text>
    <text x="184" y="355" font-family="${FONT}" font-size="13" fill="${INK}">0</text>

    ${thermo(380, 70, 350, 264)}
    <text x="380" y="392" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">B</text>
    <line x1="394" y1="120" x2="406" y2="120" stroke="${INK}" stroke-width="1.6"/>
    <line x1="394" y1="177" x2="406" y2="177" stroke="${INK}" stroke-width="1.6"/>
    <line x1="394" y1="235" x2="406" y2="235" stroke="${INK}" stroke-width="1.6"/>
    <line x1="394" y1="292" x2="406" y2="292" stroke="${INK}" stroke-width="1.6"/>
    <line x1="394" y1="350" x2="406" y2="350" stroke="${INK}" stroke-width="1.6"/>
    <text x="414" y="125" font-family="${FONT}" font-size="13" fill="${INK}">40</text>
    <text x="414" y="182" font-family="${FONT}" font-size="13" fill="${INK}">30</text>
    <text x="414" y="240" font-family="${FONT}" font-size="13" fill="${INK}">20</text>
    <text x="414" y="297" font-family="${FONT}" font-size="13" fill="${INK}">10</text>
    <text x="414" y="355" font-family="${FONT}" font-size="13" fill="${INK}">0</text>

    ${thermo(610, 70, 350, 120)}
    <text x="610" y="392" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">C</text>
    <line x1="624" y1="120" x2="636" y2="120" stroke="${INK}" stroke-width="1.6"/>
    <line x1="624" y1="177" x2="636" y2="177" stroke="${INK}" stroke-width="1.6"/>
    <line x1="624" y1="235" x2="636" y2="235" stroke="${INK}" stroke-width="1.6"/>
    <line x1="624" y1="292" x2="636" y2="292" stroke="${INK}" stroke-width="1.6"/>
    <line x1="624" y1="350" x2="636" y2="350" stroke="${INK}" stroke-width="1.6"/>
    <text x="644" y="125" font-family="${FONT}" font-size="13" fill="${INK}">40</text>
    <text x="644" y="182" font-family="${FONT}" font-size="13" fill="${INK}">30</text>
    <text x="644" y="240" font-family="${FONT}" font-size="13" fill="${INK}">20</text>
    <text x="644" y="297" font-family="${FONT}" font-size="13" fill="${INK}">10</text>
    <text x="644" y="355" font-family="${FONT}" font-size="13" fill="${INK}">0</text>

    <text x="380" y="36" font-family="${FONT}" font-size="16" fill="${KEY}" text-anchor="middle">The numbers are °C. What temperature does each thermometer show?</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // THE DRAW THIS. The heating apparatus from p.39, drawn so the class can set it
  // up and label it: heat-proof mat, tripod, gauze, beaker of water, thermometer
  // held in a clamp with its bulb IN the water (not touching the bottom), and a
  // Bunsen burner beneath.
  // ───────────────────────────────────────────────────────────────────────────
  APPARATUS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 560" class="w-full h-full">
    ${plate(820, 560)}

    <text x="410" y="42" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">Heating water — set it up like this</text>

    <!-- clamp stand -->
    <rect x="150" y="470" width="150" height="16" rx="3" fill="${METAL}"/>
    <rect x="205" y="120" width="12" height="352" fill="${METAL}"/>
    <rect x="217" y="150" width="150" height="12" fill="${METAL}"/>
    <rect x="360" y="140" width="18" height="34" rx="4" fill="none" stroke="${INK}" stroke-width="2.4"/>

    <!-- thermometer, bulb in the water, not touching the bottom -->
    ${thermo(430, 130, 360, 210)}

    <!-- beaker of water on the gauze -->
    <path d="M 372 300 v 78 q 0 8 8 8 h 100 q 8 0 8 -8 v -78" fill="none" stroke="${GLASS_S}" stroke-width="3"/>
    <path d="M 376 336 v 42 q 0 8 8 8 h 92 q 8 0 8 -8 v -42 Z" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="2"/>

    <!-- gauze on the tripod -->
    <rect x="352" y="392" width="156" height="8" fill="${METAL}"/>
    <!-- tripod legs -->
    <line x1="372" y1="400" x2="352" y2="470" stroke="${INK}" stroke-width="3"/>
    <line x1="488" y1="400" x2="508" y2="470" stroke="${INK}" stroke-width="3"/>
    <line x1="430" y1="400" x2="430" y2="470" stroke="${INK}" stroke-width="3"/>

    <!-- Bunsen burner + flame -->
    <path d="M 414 468 q 16 -34 16 -60" fill="none" stroke="${FLAME}" stroke-width="3"/>
    <path d="M 446 468 q -16 -34 -16 -60" fill="none" stroke="${FLAME}" stroke-width="3"/>
    <path d="M 430 470 q -14 -30 0 -64 q 14 34 0 64 Z" fill="${FLAME}" opacity="0.55"/>
    <rect x="424" y="470" width="12" height="40" fill="${METAL}"/>
    <ellipse cx="430" cy="512" rx="28" ry="7" fill="${METAL}"/>

    <!-- heat-proof mat -->
    <rect x="150" y="486" width="360" height="14" rx="3" fill="#d8c7a8" stroke="${INK}" stroke-width="1.6"/>

    ${lead(560, 150, 442, 170)}
    <text x="568" y="155" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}">thermometer</text>
    <text x="568" y="176" font-family="${FONT}" font-size="12" fill="${INK}">bulb in the water,</text>
    <text x="568" y="192" font-family="${FONT}" font-size="12" fill="${INK}">not touching the bottom</text>
    ${lead(560, 350, 486, 358)}
    <text x="568" y="355" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}">beaker of water</text>
    ${lead(560, 396, 500, 396)}
    <text x="568" y="401" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}">gauze on a tripod</text>
    ${lead(560, 470, 452, 452)}
    <text x="568" y="475" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}">Bunsen burner</text>
    ${lead(250, 524, 300, 500)}
    <text x="250" y="540" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="middle">heat-proof mat</text>
    ${lead(150, 156, 210, 200)}
    <text x="142" y="150" font-family="${FONT}" font-size="16" font-weight="bold" fill="${KEY}" text-anchor="end">clamp stand</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The results table to copy (p.39), with the example minutes filled and the
  // temperature column empty — the empty column IS the task.
  // ───────────────────────────────────────────────────────────────────────────
  RESULTS_TABLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 380" class="w-full h-full">
    ${plate(560, 380)}

    <rect x="60" y="40" width="220" height="48" fill="${TINT}" stroke="${RULE}" stroke-width="1.6"/>
    <rect x="280" y="40" width="220" height="48" fill="${TINT}" stroke="${RULE}" stroke-width="1.6"/>
    <text x="170" y="70" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Time in minutes</text>
    <text x="390" y="70" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Temperature in °C</text>

    ${rule(60, 500, 88)}
    ${rule(60, 500, 136)}
    ${rule(60, 500, 184)}
    ${rule(60, 500, 232)}
    ${rule(60, 500, 280)}
    ${rule(60, 500, 328)}
    ${vrule(60, 40, 328)}
    ${vrule(280, 40, 328)}
    ${vrule(500, 40, 328)}

    <text x="170" y="120" font-family="${FONT}" font-size="16" fill="${INK}" text-anchor="middle">0</text>
    <text x="170" y="168" font-family="${FONT}" font-size="16" fill="${INK}" text-anchor="middle">1</text>
    <text x="170" y="216" font-family="${FONT}" font-size="16" fill="${INK}" text-anchor="middle">2</text>
    <text x="170" y="264" font-family="${FONT}" font-size="16" fill="${INK}" text-anchor="middle">3</text>
    <text x="170" y="312" font-family="${FONT}" font-size="16" fill="${INK}" text-anchor="middle">4</text>

    <text x="280" y="360" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">keep going until the water is boiling</text>
  </svg>`,

  // ───────────────────────────────────────────────────────────────────────────
  // The heating curve: temperature against time, rising then flattening at the
  // boiling point. This is the payoff of the prediction — the temperature stops
  // going up while the water boils.
  // ───────────────────────────────────────────────────────────────────────────
  HEATING_CURVE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 460" class="w-full h-full">
    ${plate(820, 460)}

    <text x="420" y="40" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">What the temperature does as you heat water</text>

    <!-- axes -->
    <line x1="110" y1="80" x2="110" y2="380" stroke="${INK}" stroke-width="2.4"/>
    <line x1="110" y1="380" x2="760" y2="380" stroke="${INK}" stroke-width="2.4"/>

    <!-- y gridlines + labels (0..100 by 20) -->
    <line x1="110" y1="320" x2="760" y2="320" stroke="${RULE}" stroke-width="1.2"/>
    <line x1="110" y1="260" x2="760" y2="260" stroke="${RULE}" stroke-width="1.2"/>
    <line x1="110" y1="200" x2="760" y2="200" stroke="${RULE}" stroke-width="1.2"/>
    <line x1="110" y1="140" x2="760" y2="140" stroke="${RULE}" stroke-width="1.2"/>
    <text x="98" y="385" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">0</text>
    <text x="98" y="325" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">20</text>
    <text x="98" y="265" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">40</text>
    <text x="98" y="205" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">60</text>
    <text x="98" y="145" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">80</text>
    <text x="98" y="125" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="end">100</text>

    <!-- x labels -->
    <text x="110" y="402" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">0</text>
    <text x="240" y="402" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">2</text>
    <text x="370" y="402" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">4</text>
    <text x="500" y="402" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">6</text>
    <text x="630" y="402" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">8</text>
    <text x="760" y="402" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">10</text>

    <!-- boiling-point line -->
    <line x1="110" y1="120" x2="760" y2="120" stroke="${MERCURY}" stroke-width="1.8" stroke-dasharray="7 6"/>

    <!-- the curve: rises from 20°C, reaches 100 at 8 min, then flat -->
    <polyline points="110,320 175,286 240,250 305,214 370,180 435,158 500,138 565,120 630,120 695,120 760,120" fill="none" stroke="${LIQ_S}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>

    <text x="752" y="112" font-family="${FONT}" font-size="15" font-weight="bold" fill="${MERCURY}" text-anchor="end">boiling point — it stops rising</text>
    <text x="420" y="440" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle">Time in minutes</text>
    <text x="40" y="230" font-family="${FONT}" font-size="16" font-weight="bold" fill="${INK}" text-anchor="middle" transform="rotate(-90 40 230)">Temperature in °C</text>
  </svg>`,
}
