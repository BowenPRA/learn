// content/y7-science/U03_models/data.js
// The numbers behind the models, kept apart from the components so every
// widget reads the same values and a fact is corrected in one place.
//
// SOURCES
//   Orbits   E. M. Standish, "Keplerian Elements for Approximate Positions of
//            the Major Planets", JPL Solar System Dynamics, Table 1 (valid
//            1800–2050): https://ssd.jpl.nasa.gov/planets/approx_pos.html
//            Elements at J2000 plus a rate per Julian century. Good to well
//            under a degree in that window — far better than a projector needs.
//   Planets  NASA Planetary Fact Sheet (D. R. Williams, NSSDCA):
//            https://nssdc.gsfc.nasa.gov/planetary/factsheet/
//   Moon     Mean orbital elements after P. Schlyter, "How to compute planetary
//            positions" (stjarnhimlen.se) — a few degrees, which is plenty for
//            a Moon drawn going round the Earth.
//   Moons    Known moons as of September 2026 (NASA science.nasa.gov pages):
//            Jupiter 115, Saturn 293, Uranus 29, Neptune 16. They keep rising.
//            (The NSSDC fact sheet's moon row is out of date — do not use it.)
//   Pluto    Not on JPL's current page; its row is the legacy Standish table.
//   Volume   In Earths, from the MEAN radius (NASA): Jupiter and Saturn bulge
//            at the equator, so cubing the equatorial width overstates them.
//   Gravity  The SAME rounded N/kg values as the 3.1 deck (PlanetScales), so
//            the class meets the numbers it already used.

export const AU_KM = 149_597_870.7
export const LIGHT_KM_S = 299_792.458
export const GM_SUN = 1.32712440018e11 // km³/s²
export const J2000 = 2451545.0

// ── Seeded random numbers ───────────────────────────────────────────────────
// Every "random" field (stars, asteroids, dust) is drawn from a seeded stream,
// so the scene is identical every time the slide opens and React renders stay
// pure.
export function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ── The Sun, the planets, the Moon ──────────────────────────────────────────
// el    a (AU), e, I (deg), L (deg), long. of perihelion (deg), long. of node (deg)
// rate  the same six, per Julian century
// big   radius in px when sizes are ENLARGED (the readable mode); real sizes
//       are computed from `diameter`
export const SUN = {
  key: 'sun', en: 'The Sun', fr: 'Le Soleil',
  diameter: 1_391_400, massEarth: 333_000,
  kindEn: 'A star', kindFr: 'Une étoile',
}

export const PLANETS = [
  {
    key: 'mercury', en: 'Mercury', fr: 'Mercure', kind: 'rocky',
    el: [0.38709927, 0.20563593, 7.00497902, 252.25032350, 77.45779628, 48.33076593],
    rate: [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081],
    diameter: 4_879, periodDays: 88.0, dayHours: 4222.6, moons: 0, g: 3.7, tempC: 167, volEarth: 0.056, massEarth: 0.055,
    big: 3.4, color: '#a8a39d', light: '#d9d4cc', dark: '#5f5a55',
  },
  {
    key: 'venus', en: 'Venus', fr: 'Vénus', kind: 'rocky',
    el: [0.72333566, 0.00677672, 3.39467605, 181.97909950, 131.60246718, 76.67984255],
    rate: [0.00000390, -0.00004107, -0.00078890, 58517.81538729, 0.00268329, -0.27769418],
    diameter: 12_104, periodDays: 224.7, dayHours: 2802.0, moons: 0, g: 8.9, tempC: 464, volEarth: 0.857, massEarth: 0.815,
    big: 5.2, color: '#e3c58c', light: '#fbecc7', dark: '#9c7a45', atmo: 'rgba(255,226,160,0.55)',
  },
  {
    key: 'earth', en: 'Earth', fr: 'la Terre', short: 'Terre', kind: 'rocky',
    el: [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0],
    rate: [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0],
    diameter: 12_756, periodDays: 365.25, dayHours: 24.0, moons: 1, g: 10, tempC: 15, volEarth: 1, massEarth: 1,
    big: 5.4, color: '#3b7dd8', light: '#9fd0ff', dark: '#163a6b', atmo: 'rgba(120,190,255,0.6)', land: '#4f9a4a',
  },
  {
    key: 'mars', en: 'Mars', fr: 'Mars', kind: 'rocky',
    el: [1.52371034, 0.09339410, 1.84969142, -4.55343205, -23.94362959, 49.55953891],
    rate: [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343],
    diameter: 6_792, periodDays: 687.0, dayHours: 24.7, moons: 2, g: 3.7, tempC: -65, volEarth: 0.151, massEarth: 0.107,
    big: 4.2, color: '#c8623a', light: '#f0a07a', dark: '#6e2a14',
  },
  {
    key: 'jupiter', en: 'Jupiter', fr: 'Jupiter', kind: 'gas',
    el: [5.20288700, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909],
    rate: [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106],
    diameter: 142_984, periodDays: 4331, dayHours: 9.9, moons: 115, g: 25, tempC: -110, volEarth: 1321, massEarth: 317.8,
    big: 11, color: '#d9b28a', light: '#f6e2c6', dark: '#7a5233',
    bands: ['#efe0c9', '#c99a6c', '#f2e6d3', '#b9825a', '#ead7bb', '#c08d63', '#f1e3cc'],
  },
  {
    key: 'saturn', en: 'Saturn', fr: 'Saturne', kind: 'gas',
    el: [9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448],
    rate: [-0.00125060, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794],
    diameter: 120_536, periodDays: 10747, dayHours: 10.7, moons: 293, g: 10, tempC: -140, volEarth: 764, massEarth: 95.2,
    big: 9.5, color: '#e2cc94', light: '#f8ecc8', dark: '#8a7243', rings: true,
    bands: ['#f3e5bf', '#d8bd84', '#f0dfb2', '#cfb279', '#efe0b8'],
  },
  {
    key: 'uranus', en: 'Uranus', fr: 'Uranus', kind: 'ice',
    el: [19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.95427630, 74.01692503],
    rate: [-0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589],
    diameter: 51_118, periodDays: 30589, dayHours: 17.2, moons: 29, g: 8.7, tempC: -195, volEarth: 63, massEarth: 14.5,
    big: 7.2, color: '#9ad7df', light: '#d6f4f6', dark: '#3f8790',
  },
  {
    key: 'neptune', en: 'Neptune', fr: 'Neptune', kind: 'ice',
    el: [30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574],
    rate: [0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664],
    diameter: 49_528, periodDays: 59800, dayHours: 16.1, moons: 16, g: 11, tempC: -200, volEarth: 58, massEarth: 17.1,
    big: 7.0, color: '#4b6fe0', light: '#9db6ff', dark: '#1d2f7a',
  },
  {
    key: 'pluto', en: 'Pluto', fr: 'Pluton', kind: 'dwarf', dwarf: true,
    el: [39.48211675, 0.24882730, 17.14001206, 238.92903833, 224.06891629, 110.30393684],
    rate: [-0.00031596, 0.00005170, 0.00004818, 145.20780515, -0.04062942, -0.01183482],
    diameter: 2_376, periodDays: 90560, dayHours: 153.3, moons: 5, g: 0.6, tempC: -225, volEarth: 0.006, massEarth: 0.0022,
    big: 2.8, color: '#cdb59a', light: '#f1e2cf', dark: '#6f5a46',
  },
]

export const MOON = { key: 'moon', en: 'The Moon', fr: 'La Lune', diameter: 3_475, distanceKm: 384_400 }

export const KIND = {
  rocky: ['Rocky planet', 'Planète rocheuse'],
  gas: ['Gas giant', 'Géante gazeuse'],
  ice: ['Ice giant', 'Géante de glace'],
  dwarf: ['Dwarf planet', 'Planète naine'],
}

// ── Time ────────────────────────────────────────────────────────────────────
export const jdFromMs = (ms) => ms / 86_400_000 + 2440587.5
export const msFromJd = (jd) => (jd - 2440587.5) * 86_400_000
/** Days since J2000.0 for a JS timestamp. */
export const daysFromMs = (ms) => jdFromMs(ms) - J2000

const RAD = Math.PI / 180

/** Solve Kepler's equation M = E − e·sin E (radians). */
export function eccentricAnomaly(M, e) {
  let E = M + e * Math.sin(M)
  for (let k = 0; k < 6; k++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E))
    E -= dE
    if (Math.abs(dE) < 1e-10) break
  }
  return E
}

/** The six elements of a planet `d` days after J2000, angles in radians. */
export function elementsAt(p, d) {
  const T = d / 36525
  const v = p.el.map((x, i) => x + p.rate[i] * T)
  const [a, e, I, L, peri, node] = v
  return { a, e, I: I * RAD, L: L * RAD, w: (peri - node) * RAD, node: node * RAD, peri: peri * RAD }
}

/** Ecliptic x, y, z (AU) of a point in the orbit plane, rotated into place. */
function toEcliptic(xp, yp, { w, node, I }) {
  const cw = Math.cos(w), sw = Math.sin(w)
  const cO = Math.cos(node), sO = Math.sin(node)
  const cI = Math.cos(I), sI = Math.sin(I)
  return [
    (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
    (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
    (sw * sI) * xp + (cw * sI) * yp,
  ]
}

/** Heliocentric ecliptic position (AU) of planet `p`, `d` days after J2000. */
export function helioPos(p, d) {
  const o = elementsAt(p, d)
  let M = (o.L - o.peri) % (2 * Math.PI)
  if (M > Math.PI) M -= 2 * Math.PI
  if (M < -Math.PI) M += 2 * Math.PI
  const E = eccentricAnomaly(M, o.e)
  const xp = o.a * (Math.cos(E) - o.e)
  const yp = o.a * Math.sqrt(1 - o.e * o.e) * Math.sin(E)
  return toEcliptic(xp, yp, o)
}

/** `n` points round the whole orbit of `p` (its shape on day `d`). */
export function orbitPath(p, d, n = 240) {
  const o = elementsAt(p, d)
  const pts = []
  const b = o.a * Math.sqrt(1 - o.e * o.e)
  for (let k = 0; k <= n; k++) {
    const E = (k / n) * 2 * Math.PI
    pts.push(toEcliptic(o.a * (Math.cos(E) - o.e), b * Math.sin(E), o))
  }
  return pts
}

/** Points along the part of the orbit within `half` radians (of eccentric
 *  anomaly) of where the planet is now — for close-ups, where the whole-orbit
 *  polygon is too coarse and its straight chords miss the planet. */
export function orbitArc(p, d, half, n = 160) {
  const o = elementsAt(p, d)
  const M = (o.L - o.peri) % (2 * Math.PI)
  const E0 = eccentricAnomaly(M, o.e)
  const b = o.a * Math.sqrt(1 - o.e * o.e)
  const pts = []
  for (let k = 0; k <= n; k++) {
    const E = E0 - half + (2 * half * k) / n
    pts.push(toEcliptic(o.a * (Math.cos(E) - o.e), b * Math.sin(E), o))
  }
  return pts
}

/** Orbital speed (km/s) at distance r (AU) on an orbit with semi-major axis a (AU). */
export const orbitalSpeed = (rAU, aAU) => Math.sqrt(GM_SUN * (2 / (rAU * AU_KM) - 1 / (aAU * AU_KM)))

/** The Moon's position relative to the Earth (AU, ecliptic), `d` days after J2000. */
export function moonGeo(d) {
  const dd = d + 1.5 // Schlyter's day 0 is 2000 Jan 0.0 (JD 2451543.5)
  const node = (125.1228 - 0.0529538083 * dd) * RAD
  const I = 5.1454 * RAD
  const w = (318.0634 + 0.1643573223 * dd) * RAD
  const e = 0.0549
  const a = MOON.distanceKm / AU_KM
  const M = ((115.3654 + 13.0649929509 * dd) % 360) * RAD
  const E = eccentricAnomaly(M, e)
  return toEcliptic(a * (Math.cos(E) - e), a * Math.sqrt(1 - e * e) * Math.sin(E), { w, node, I })
}

// ── Saturn's ring plane ─────────────────────────────────────────────────────
// Saturn's north pole points to RA 40.589°, Dec 83.537° (IAU). Turned into
// ecliptic coordinates, it fixes the tilt of the rings — which is why the
// rings open and close as Saturn goes round the Sun (edge-on in 2025).
export const SATURN_POLE = (() => {
  const ra = 40.589 * RAD, dec = 83.537 * RAD, eps = 23.4393 * RAD
  const x = Math.cos(dec) * Math.cos(ra), y = Math.cos(dec) * Math.sin(ra), z = Math.sin(dec)
  return [x, y * Math.cos(eps) + z * Math.sin(eps), -y * Math.sin(eps) + z * Math.cos(eps)]
})()

// ── Formatting ──────────────────────────────────────────────────────────────
// House style: thousands separated by a space (70 000), a point for decimals
// in English AND French (the class works from the English book), and a real
// minus sign.
const NBSP = ' '
export function fmt(n, digits = 0) {
  const neg = n < 0
  const s = Math.abs(n).toFixed(digits)
  const [i, f] = s.split('.')
  const grouped = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP) : i
  return `${neg ? '−' : ''}${grouped}${f ? `.${f}` : ''}`
}

/** Round to `sig` significant figures, then format. */
export function fmtSig(n, sig = 3) {
  if (n === 0) return '0'
  const mag = Math.floor(Math.log10(Math.abs(n)))
  const digits = Math.max(0, sig - 1 - mag)
  const r = Number(n.toPrecision(sig))
  const str = fmt(r, digits)
  return str.includes('.') ? str.replace(/\.?0+$/, '') : str
}

const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
}
/** "20 October 2026" / "20 octobre 2026", from a JS timestamp (UTC). */
export function fmtDate(ms, lang) {
  const d = new Date(ms)
  const m = (lang === 'fr' ? MONTHS.fr : MONTHS.en)[d.getUTCMonth()]
  const y = d.getUTCFullYear()
  return `${d.getUTCDate()} ${m} ${y}`
}

/** A distance in km, worded for a class: "150 million km", "6 400 km". */
export function fmtKm(km, lang) {
  const fr = lang === 'fr'
  if (km >= 1e9) return `${fmtSig(km / 1e9, 3)} ${fr ? 'milliard(s) de km' : 'billion km'}`
  if (km >= 1e6) return `${fmtSig(km / 1e6, 3)} ${fr ? 'millions de km' : 'million km'}`
  return `${fmt(Math.round(km))} km`
}

/** Light travel time for a distance in km: "8 min 19 s", "4 h 10 min". */
export function fmtLight(km) {
  const s = km / LIGHT_KM_S
  if (s < 60) return `${s.toFixed(1)} s`
  if (s < 3600) return `${Math.floor(s / 60)} min ${Math.round(s % 60)} s`
  const h = Math.floor(s / 3600)
  return `${h} h ${Math.round((s % 3600) / 60)} min`
}
