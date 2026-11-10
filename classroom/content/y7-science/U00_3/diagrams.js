// content/y7-science/U00_3/diagrams.js
// One teaching diagram for the hanging-planter project, in the same house
// style as the rest of the course: flat line art on a white plate, dark ink
// outlines, pale flat fills, and labels set in the book's orange out in the
// margin on a hairline leader line (docs/LESSON-PLAYBOOK.md §5).
const INK = '#2b2b2b'
const KEY = '#c25e12' // the book's key-word orange
const LEAD = '#7c8a95'
const BAR = '#1a5fa8'
const CUP_F = '#eef1f4'
const SOIL_F = '#7c5330'
const LEAF_F = '#7cbf5a'
const LEAF_S = '#4a8b23'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

export const DIAGRAMS = {
  // ─────────────────────────────────────────────────────────────────────────
  // The finished planter: a cup on a string, hung from the window rail —
  // drainage holes in the bottom, hanging holes at the rim, soil to the top,
  // one seed just under the surface. This is the target students are
  // building toward while they punch and fill their own cup.
  // ─────────────────────────────────────────────────────────────────────────
  PLANTER: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" class="w-full h-full">
    <rect x="0" y="0" width="640" height="400" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="638.5" height="398.5" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>

    <rect x="190" y="28" width="260" height="16" rx="8" fill="${BAR}"/>

    <line x1="250" y1="44" x2="262" y2="150" stroke="${LEAD}" stroke-width="2.2"/>
    <line x1="390" y1="44" x2="378" y2="150" stroke="${LEAD}" stroke-width="2.2"/>

    <path d="M 225 150 L 415 150 L 388 340 L 252 340 Z" fill="${CUP_F}" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="320" cy="150" rx="95" ry="13" fill="${SOIL_F}" stroke="${INK}" stroke-width="2.5"/>

    <circle cx="262" cy="150" r="6" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="378" cy="150" r="6" fill="#ffffff" stroke="${INK}" stroke-width="2.5"/>

    <circle cx="290" cy="336" r="5" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <circle cx="320" cy="339" r="5" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <circle cx="350" cy="336" r="5" fill="#ffffff" stroke="${INK}" stroke-width="2"/>

    <path d="M 320 150 Q 313 118 300 100" fill="none" stroke="${LEAF_S}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="295" cy="96" rx="15" ry="8" fill="${LEAF_F}" stroke="${LEAF_S}" stroke-width="2" transform="rotate(-25 295 96)"/>
    <ellipse cx="312" cy="86" rx="15" ry="8" fill="${LEAF_F}" stroke="${LEAF_S}" stroke-width="2" transform="rotate(20 312 86)"/>

    <line x1="256" y1="97" x2="130" y2="60" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="256" cy="97" r="3.2" fill="${LEAD}"/>
    <text x="16" y="54" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">the string</text>
    <text x="16" y="72" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">holds it up</text>

    <line x1="305" y1="90" x2="470" y2="55" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="305" cy="90" r="3.2" fill="${LEAD}"/>
    <text x="624" y="50" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="end">the seed,</text>
    <text x="624" y="68" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="end">under the soil</text>

    <line x1="232" y1="146" x2="110" y2="200" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="232" cy="146" r="3.2" fill="${LEAD}"/>
    <text x="16" y="206" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">soil, almost</text>
    <text x="16" y="224" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="start">to the top</text>

    <line x1="378" y1="150" x2="500" y2="205" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="378" cy="150" r="3.2" fill="${LEAD}"/>
    <text x="624" y="200" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="end">two holes,</text>
    <text x="624" y="218" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="end">near the rim</text>

    <line x1="320" y1="339" x2="320" y2="368" stroke="${LEAD}" stroke-width="1.6"/>
    <circle cx="320" cy="339" r="3.2" fill="${LEAD}"/>
    <text x="320" y="388" font-family="${FONT}" font-size="15" font-weight="bold" fill="${KEY}" text-anchor="middle">drainage holes</text>
  </svg>`,
}
