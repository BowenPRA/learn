// content/y7-science/U02_3/diagrams.js
// Teaching diagrams for 2.3 Explaining changes of state.
// THREE DIAGRAMS matching pages 42-43:
//   1. HEATING_TO_MELTING — three-panel chain (Draw This)
//   2. BOILING — particles escaping from a liquid surface
//   3. CONDENSING — gas particles hitting a cold surface

const INK = '#2b2b2b'
const KEY = '#c25e12'
const WARM = '#c8102e'
const COOL = '#1a5fa8'

const SOLID_F = '#ded7c6', SOLID_S = '#8a7f68'
const LIQ_F = '#bfe0f2', LIQ_S = '#2f7fb0'
const PART_F = '#6e8fa8', PART_S = '#3d6580'

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`

const arrowR = (x1, x2, y, c) => `<line x1="${x1}" y1="${y}" x2="${x2 - 11}" y2="${y}" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M ${x2} ${y} l -13 -8 l 0 16 z" fill="${c}"/>`

function particleGrid(ox, oy, cols, rows, s, jitter = 0) {
  const r = s * 0.38
  let out = ''
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = ox + col * s + s / 2 + (jitter ? (Math.sin(col * 7 + row * 13) * jitter) : 0)
      const cy = oy + row * s + s / 2 + (jitter ? (Math.cos(col * 11 + row * 5) * jitter) : 0)
      out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5"/>`
    }
  }
  return out
}

function liquidParticles(ox, oy, w, h, n) {
  const r = 9
  const positions = []
  for (let i = 0; i < n; i++) {
    const angle = i * 2.39996
    const rr = 0.3 + (i * 0.618) % 0.6
    positions.push({
      cx: ox + w * 0.15 + (w * 0.7) * ((Math.sin(angle) * rr + 1) / 2),
      cy: oy + h * 0.15 + (h * 0.7) * ((Math.cos(angle * 1.3) * rr + 1) / 2),
    })
  }
  return positions.map(({ cx, cy }) =>
    `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5"/>`
  ).join('')
}

export const DIAGRAMS = {
  HEATING_TO_MELTING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 420" class="w-full h-full">
    ${plate(940, 420)}

    <text x="470" y="44" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">What happens to the particles when a solid is heated</text>

    <!-- Panel 1: cold solid -->
    <rect x="30" y="70" width="240" height="230" rx="12" fill="${SOLID_F}" stroke="${SOLID_S}" stroke-width="2"/>
    ${particleGrid(50, 90, 5, 4, 42, 0)}
    <text x="150" y="328" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Solid</text>
    <text x="150" y="350" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">fixed pattern, particles</text>
    <text x="150" y="368" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">vibrate on the spot</text>

    <!-- Arrow 1 -->
    ${arrowR(278, 348, 185, WARM)}
    <text x="313" y="168" font-family="${FONT}" font-size="13" font-weight="bold" fill="${KEY}" text-anchor="middle">heat energy</text>
    <text x="313" y="184" font-family="${FONT}" font-size="13" font-weight="bold" fill="${KEY}" text-anchor="middle">transferred</text>

    <!-- Panel 2: heated solid (expanding) -->
    <rect x="355" y="70" width="240" height="230" rx="12" fill="${SOLID_F}" stroke="${SOLID_S}" stroke-width="2" stroke-dasharray="6 4"/>
    ${particleGrid(370, 82, 5, 4, 46, 4)}
    <text x="475" y="328" font-family="${FONT}" font-size="18" font-weight="bold" fill="${WARM}" text-anchor="middle">Expanding</text>
    <text x="475" y="350" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">particles vibrate more,</text>
    <text x="475" y="368" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">take up more space</text>

    <!-- Arrow 2 -->
    ${arrowR(603, 663, 185, WARM)}
    <text x="633" y="168" font-family="${FONT}" font-size="13" font-weight="bold" fill="${KEY}" text-anchor="middle">forces</text>
    <text x="633" y="184" font-family="${FONT}" font-size="13" font-weight="bold" fill="${KEY}" text-anchor="middle">can't hold</text>

    <!-- Panel 3: liquid (melted) -->
    <rect x="670" y="70" width="240" height="230" rx="12" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="2"/>
    ${liquidParticles(680, 80, 220, 210, 20)}
    <text x="790" y="328" font-family="${FONT}" font-size="18" font-weight="bold" fill="${LIQ_S}" text-anchor="middle">Liquid</text>
    <text x="790" y="350" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">particles slide past</text>
    <text x="790" y="368" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">each other — it melts</text>

    <!-- Key at the bottom -->
    <rect x="220" y="390" width="16" height="12" rx="3" fill="${KEY}"/>
    <text x="244" y="401" font-family="${FONT}" font-size="14" font-weight="bold" fill="${INK}">Key words: heat energy, transferred, attractive force, expand</text>
  </svg>`,

  BOILING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 380" class="w-full h-full">
    ${plate(480, 380)}

    <text x="240" y="36" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Boiling: particles escape as a gas</text>

    <!-- Liquid region at bottom -->
    <rect x="60" y="180" width="360" height="150" rx="10" fill="${LIQ_F}" stroke="${LIQ_S}" stroke-width="1.5"/>
    ${liquidParticles(70, 190, 340, 130, 18)}

    <!-- Escaping gas particles above the surface -->
    <circle cx="140" cy="140" r="8" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5" opacity="0.65"/>
    <circle cx="220" cy="100" r="8" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5" opacity="0.55"/>
    <circle cx="300" cy="120" r="8" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5" opacity="0.6"/>
    <circle cx="180" cy="70" r="8" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5" opacity="0.45"/>
    <circle cx="340" cy="80" r="8" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5" opacity="0.5"/>

    <!-- Upward escape arrows from surface -->
    <line x1="140" y1="172" x2="140" y2="159" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 140 148 l -7 12 l 14 0 z" fill="${KEY}"/>
    <line x1="220" y1="172" x2="220" y2="119" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 220 108 l -7 12 l 14 0 z" fill="${KEY}"/>
    <line x1="300" y1="172" x2="300" y2="139" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 300 128 l -7 12 l 14 0 z" fill="${KEY}"/>

    <!-- Labels -->
    <text x="240" y="355" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">Particles in the liquid move faster and faster.</text>
    <text x="240" y="372" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">Some break the attractive forces and escape as a gas.</text>

    <!-- Surface label -->
    <line x1="55" y1="178" x2="425" y2="178" stroke="${LIQ_S}" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="423" y="183" font-family="${FONT}" font-size="12" font-weight="bold" fill="${LIQ_S}" text-anchor="end">surface</text>
  </svg>`,

  CONDENSING: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 380" class="w-full h-full">
    ${plate(480, 380)}

    <text x="240" y="36" font-family="${FONT}" font-size="18" font-weight="bold" fill="${INK}" text-anchor="middle">Condensing: gas particles slow down</text>

    <!-- Cold surface on the right -->
    <rect x="380" y="50" width="50" height="280" rx="6" fill="#c8d6df" stroke="#8da3b0" stroke-width="2"/>
    <text x="405" y="350" font-family="${FONT}" font-size="13" font-weight="bold" fill="${COOL}" text-anchor="middle">cold</text>
    <text x="405" y="366" font-family="${FONT}" font-size="13" font-weight="bold" fill="${COOL}" text-anchor="middle">surface</text>

    <!-- Scattered gas particles (left side, fast) -->
    <circle cx="70" cy="100" r="8" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5" opacity="0.55"/>
    <circle cx="130" cy="180" r="8" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5" opacity="0.55"/>
    <circle cx="90" cy="260" r="8" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5" opacity="0.55"/>
    <circle cx="170" cy="120" r="8" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5" opacity="0.55"/>
    <circle cx="150" cy="300" r="8" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5" opacity="0.55"/>

    <!-- Arrows pointing right (toward surface) -->
    ${arrowR(80, 140, 100, '#8da3b0')}
    ${arrowR(140, 200, 180, '#8da3b0')}

    <!-- Clustered particles near the cold surface (slowing down) -->
    <circle cx="330" cy="140" r="9" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5"/>
    <circle cx="350" cy="165" r="9" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5"/>
    <circle cx="325" cy="190" r="9" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5"/>
    <circle cx="355" cy="210" r="9" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5"/>
    <circle cx="330" cy="235" r="9" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5"/>
    <circle cx="350" cy="260" r="9" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5"/>
    <circle cx="335" cy="285" r="9" fill="${PART_F}" stroke="${PART_S}" stroke-width="1.5"/>

    <!-- Label -->
    <text x="190" y="355" font-family="${FONT}" font-size="14" fill="${INK}" text-anchor="middle">Particles hit the cold surface and lose energy.</text>
    <text x="190" y="372" font-family="${FONT}" font-size="14" font-weight="bold" fill="${KEY}" text-anchor="middle">They slow down. The forces pull them together.</text>
  </svg>`,
}
