// content/y7-science/U03_models/solar.jsx
// THE SOLAR SYSTEM — a working scale model.
//
// What makes it a model worth the screen time (each one is a teaching move in
// plan.js):
//   · REAL POSITIONS. The planets are where they really are on the date shown
//     (JPL's orbital elements, data.js), and they move by Kepler's laws: the
//     ellipses, the speeding-up near the Sun, the slow outer planets.
//   · TRUE DISTANCES, ALWAYS, unless "Squashed" is chosen — and then a warning
//     says so. The class sees how far out Jupiter is before it sees anything else.
//   · TWO SIZE MODES. "Enlarged" draws the planets big enough to see; "Real"
//     draws them at their true size on the same scale as the distances, and
//     they vanish — a dashed ring shows where each one is. That is the point.
//   · THE FLAT PLANE. Drag to turn the system, or press Side: the eight orbits
//     collapse into one line. Pluto (a layer) is the one that is tilted.
//   · FLY TO EARTH. A long zoom from the whole system to the Earth and the Moon
//     at their real sizes and real distance apart.
//   · CLICK A PLANET for its card: size, distance today, speed today, year,
//     day, moons, gravity (the 3.1 values) and Mr Bowen's weight there.
//
// HOW IT IS BUILT. One canvas, one requestAnimationFrame loop. Everything the
// loop needs lives in refs; React state is only the controls, mirrored into a
// ref each render, and an 8-per-second read-out for the date and the card. The
// camera is orthographic (space.js) so a flat orbit really looks flat edge-on.
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play, Pause, Rewind, Layers as LayersIcon, Plus, Minus, X, Rocket, CalendarDays, Sun as SunIcon,
} from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import {
  PLANETS, SUN, MOON, KIND, AU_KM, helioPos, orbitPath, orbitArc, moonGeo, orbitalSpeed, elementsAt,
  daysFromMs, msFromJd, J2000, fmt, fmtSig, fmtDate, fmtKm, fmtLight, mulberry32, SATURN_POLE,
} from './data.js'
import {
  DEG, clamp, cameraBasis, project, approach, approachAngle, makeSky, drawSky, useCanvasFit, placeLabels,
} from './space.js'
import { GlassPanel, Segmented, GlassIconButton, GlassButton, LayerChip } from './ui.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const TAU = Math.PI * 2

const SPEEDS = [
  { days: 1, en: '1 day', fr: '1 jour' },
  { days: 7, en: '1 week', fr: '1 semaine' },
  { days: 30.44, en: '1 month', fr: '1 mois' },
  { days: 365.25, en: '1 year', fr: '1 an' },
  { days: 3652.5, en: '10 years', fr: '10 ans' },
]

const D_MIN = daysFromMs(Date.UTC(1800, 0, 1))
const D_MAX = daysFromMs(Date.UTC(2200, 0, 1))
const MR_BOWEN_KG = 80 // the same Mr Bowen as 3.1

// ── Belts ───────────────────────────────────────────────────────────────────
// Each small body is a real Kepler orbit with seeded elements: the asteroids
// between Mars and Jupiter (most orbits tilted under 15°), and the Kuiper belt
// beyond Neptune (thicker). Stored flat for speed: a, e, n, M0, P(3), Q(3), b.
function makeBelt(seed, n, aMin, aMax, eMax, iSigma) {
  const rnd = mulberry32(seed)
  const out = new Float32Array(n * 11)
  for (let k = 0; k < n; k++) {
    const a = aMin + (aMax - aMin) * Math.pow(rnd(), 0.9)
    const e = eMax * Math.pow(rnd(), 1.5)
    const inc = Math.abs((rnd() + rnd() + rnd() - 1.5) * 2) * iSigma * DEG
    const node = rnd() * TAU, w = rnd() * TAU
    const cw = Math.cos(w), sw = Math.sin(w), cO = Math.cos(node), sO = Math.sin(node), cI = Math.cos(inc), sI = Math.sin(inc)
    const o = k * 11
    out[o] = a
    out[o + 1] = e
    out[o + 2] = 0.01720209895 / Math.pow(a, 1.5) // mean motion, rad/day
    out[o + 3] = rnd() * TAU
    out[o + 4] = cw * cO - sw * sO * cI
    out[o + 5] = cw * sO + sw * cO * cI
    out[o + 6] = sw * sI
    out[o + 7] = -sw * cO - cw * sO * cI
    out[o + 8] = -sw * sO + cw * cO * cI
    out[o + 9] = cw * sI
    out[o + 10] = a * Math.sqrt(1 - e * e)
  }
  return out
}
const ASTEROIDS = makeBelt(11, 1500, 2.15, 3.3, 0.2, 7)
const KUIPER = makeBelt(23, 1000, 39, 48, 0.12, 9)
const SKY = makeSky(7)

// Earth's land and cloud blobs, so a close-up Earth is not a blue marble.
const EARTH_SPOTS = (() => {
  const rnd = mulberry32(5)
  const land = Array.from({ length: 7 }, () => ({ x: rnd() * 1.6 - 0.8, y: rnd() * 1.2 - 0.6, rx: 0.18 + rnd() * 0.32, ry: 0.12 + rnd() * 0.22, a: rnd() * 3 }))
  const cloud = Array.from({ length: 9 }, () => ({ x: rnd() * 1.8 - 0.9, y: rnd() * 1.6 - 0.8, rx: 0.25 + rnd() * 0.4, ry: 0.05 + rnd() * 0.06, a: rnd() * 0.6 - 0.3 }))
  return { land, cloud }
})()

// Squashed distances: r → √r (AU). Earth stays at 1; Neptune comes in from 30
// to 5.5. Only used when the class chooses "Squashed", and labelled loudly.
const squash = (p) => {
  const r = Math.hypot(p[0], p[1], p[2])
  if (r < 1e-12) return p
  const k = Math.sqrt(r) / r
  return [p[0] * k, p[1] * k, p[2] * k]
}

const RING_BANDS = [
  { r0: 1.24, r1: 1.53, color: 'rgba(170,150,120,0.28)' }, // C ring
  { r0: 1.53, r1: 1.95, color: 'rgba(235,215,170,0.85)' }, // B ring
  { r0: 2.03, r1: 2.27, color: 'rgba(215,195,155,0.65)' }, // A ring
]
const RING_U = (() => {
  const n = SATURN_POLE
  const u = [n[1], -n[0], 0] // n × z
  const m = Math.hypot(u[0], u[1])
  const uu = [u[0] / m, u[1] / m, 0]
  const v = [n[1] * uu[2] - n[2] * uu[1], n[2] * uu[0] - n[0] * uu[2], n[0] * uu[1] - n[1] * uu[0]]
  return { u: uu, v }
})()

const PLANE_RINGS = [
  { au: 1, en: '150 million km', fr: '150 millions de km' },
  { au: 5, en: '750 million km', fr: '750 millions de km' },
  { au: 10, en: '1.5 billion km', fr: '1.5 milliard de km' },
  { au: 30, en: '4.5 billion km', fr: '4.5 milliards de km' },
  { au: 50, en: '7.5 billion km', fr: '7.5 milliards de km' },
]

// ── Drawing helpers ─────────────────────────────────────────────────────────
function shade(ctx, x, y, r, lx, ly, lz) {
  // A lit sphere: bright toward the Sun, falling to night on the far side.
  const ox = x + lx * r * 0.85, oy = y + ly * r * 0.85
  const g = ctx.createRadialGradient(ox, oy, r * 0.05, ox, oy, r * 2.05)
  g.addColorStop(0, 'rgba(255,255,255,0.18)')
  g.addColorStop(0.32, 'rgba(0,0,0,0)')
  g.addColorStop(0.62, 'rgba(0,0,0,0.55)')
  g.addColorStop(0.85, 'rgba(0,0,0,0.9)')
  g.addColorStop(1, 'rgba(0,0,0,0.96)')
  ctx.fillStyle = g
  ctx.fillRect(x - r, y - r, 2 * r, 2 * r)
  if (lz < 0) {
    ctx.fillStyle = `rgba(0,0,0,${Math.min(0.55, -lz * 0.55)})`
    ctx.fillRect(x - r, y - r, 2 * r, 2 * r)
  }
}

function drawPlanetDisc(ctx, p, x, y, r, light) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, TAU)
  ctx.clip()
  ctx.fillStyle = p.color
  ctx.fillRect(x - r, y - r, 2 * r, 2 * r)
  if (p.bands && r > 3) {
    const n = p.bands.length
    for (let i = 0; i < n; i++) {
      ctx.fillStyle = p.bands[i]
      const y0 = y - r + (i / n) * 2 * r
      ctx.fillRect(x - r, y0, 2 * r, (2 * r) / n + 0.6)
    }
    if (p.key === 'jupiter' && r > 7) {
      ctx.fillStyle = 'rgba(190,95,60,0.85)'
      ctx.beginPath()
      ctx.ellipse(x + r * 0.32, y + r * 0.34, r * 0.2, r * 0.11, 0, 0, TAU)
      ctx.fill()
    }
  }
  if (p.key === 'earth' && r > 3) {
    ctx.fillStyle = p.land
    for (const s of EARTH_SPOTS.land) {
      ctx.beginPath()
      ctx.ellipse(x + s.x * r, y + s.y * r, s.rx * r, s.ry * r, s.a, 0, TAU)
      ctx.fill()
    }
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    for (const s of EARTH_SPOTS.cloud) {
      ctx.beginPath()
      ctx.ellipse(x + s.x * r, y + s.y * r, s.rx * r, s.ry * r, s.a, 0, TAU)
      ctx.fill()
    }
  }
  if (p.key === 'mars' && r > 5) {
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    ctx.beginPath()
    ctx.ellipse(x, y - r * 0.9, r * 0.35, r * 0.15, 0, 0, TAU)
    ctx.fill()
  }
  shade(ctx, x, y, r, light[0], light[1], light[2])
  ctx.restore()
  if (p.atmo && r > 2.5) {
    ctx.strokeStyle = p.atmo
    ctx.lineWidth = Math.max(1, r * 0.09)
    ctx.beginPath()
    ctx.arc(x, y, r + ctx.lineWidth * 0.4, 0, TAU)
    ctx.stroke()
  }
}

/** Saturn's rings as screen-space quads, split into the half behind the
 *  planet and the half in front. Returns [drawBack, drawFront]. */
function ringDrawers(ctx, x, y, rPx, basis) {
  const { u, v } = RING_U
  const { right, up, toCam } = basis
  const ux = u[0] * right[0] + u[1] * right[1] + u[2] * right[2]
  const uy = -(u[0] * up[0] + u[1] * up[1] + u[2] * up[2])
  const uz = u[0] * toCam[0] + u[1] * toCam[1] + u[2] * toCam[2]
  const vx = v[0] * right[0] + v[1] * right[1] + v[2] * right[2]
  const vy = -(v[0] * up[0] + v[1] * up[1] + v[2] * up[2])
  const vz = v[0] * toCam[0] + v[1] * toCam[1] + v[2] * toCam[2]
  const N = 72
  const segs = []
  for (let k = 0; k < N; k++) {
    const a0 = (k / N) * TAU, a1 = ((k + 1) / N) * TAU
    const am = (a0 + a1) / 2
    segs.push({ a0, a1, front: Math.cos(am) * uz + Math.sin(am) * vz > 0 })
  }
  const pt = (a, R) => [x + R * rPx * (Math.cos(a) * ux + Math.sin(a) * vx), y + R * rPx * (Math.cos(a) * uy + Math.sin(a) * vy)]
  const draw = (front) => {
    for (const band of RING_BANDS) {
      ctx.fillStyle = band.color
      ctx.beginPath()
      for (const s of segs) {
        if (s.front !== front) continue
        const p0 = pt(s.a0, band.r1), p1 = pt(s.a1, band.r1), p2 = pt(s.a1, band.r0), p3 = pt(s.a0, band.r0)
        ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.lineTo(p3[0], p3[1]); ctx.closePath()
      }
      ctx.fill()
    }
  }
  return [() => draw(false), () => draw(true)]
}

function drawSun(ctx, x, y, r, glowR) {
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, r * 0.4, x, y, glowR)
  g.addColorStop(0, 'rgba(255,214,120,0.55)')
  g.addColorStop(0.25, 'rgba(255,170,60,0.18)')
  g.addColorStop(1, 'rgba(255,140,40,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, glowR, 0, TAU)
  ctx.fill()
  ctx.restore()
  if (r < 0.6) {
    ctx.fillStyle = '#fff6d8'
    ctx.beginPath()
    ctx.arc(x, y, 0.8, 0, TAU)
    ctx.fill()
    return
  }
  const c = ctx.createRadialGradient(x - r * 0.15, y - r * 0.15, 0, x, y, r)
  c.addColorStop(0, '#fffdf0')
  c.addColorStop(0.55, '#ffe28a')
  c.addColorStop(0.88, '#ffb238')
  c.addColorStop(1, '#ff8a1c')
  ctx.fillStyle = c
  ctx.beginPath()
  ctx.arc(x, y, r, 0, TAU)
  ctx.fill()
}

function niceKm(km) {
  const p = Math.pow(10, Math.floor(Math.log10(km)))
  const m = km / p
  return (m >= 5 ? 5 : m >= 2 ? 2 : 1) * p
}

// ═════════════════════════════════════════════════════════════════════════
export function SolarSystem({ lang = 'en', isDisplayMode = false }) {
  const big = isDisplayMode
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const dockRef = useRef(null)

  const [playing, setPlaying] = useState(true)
  const [speedIdx, setSpeedIdx] = useState(1)
  const [reverse, setReverse] = useState(false)
  const [sizeMode, setSizeMode] = useState('big')
  const [distMode, setDistMode] = useState('true')
  const [view, setView] = useState('tilt')
  const [zoomPreset, setZoomPreset] = useState('inner')
  const [layers, setLayers] = useState({ orbits: true, names: true, plane: false, asteroids: true, kuiper: false, pluto: false, moon: true })
  const [layersOpen, setLayersOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [readout, setReadout] = useState(null)
  const [banner, setBanner] = useState(null)

  // What the loop reads. Written after every render; never read during one.
  const ui = useRef({})
  useEffect(() => {
    ui.current = { playing, speedIdx, reverse, sizeMode, distMode, layers, selected, lang, big }
  })

  const sim = useRef({
    d: null, w: 800, h: 500, dpr: 1, ready: false,
    cam: { yaw: -100 * DEG, pitch: 28 * DEG, scale: 160, tx: 0, ty: 0, tz: 0 },
    goal: { yaw: -100 * DEG, pitch: 28 * DEG, scale: 160, tx: 0, ty: 0, tz: 0 },
    zoomRate: 4, follow: null, offset: [0, 0, 0], fit: 'inner',
    hits: [], paths: null, pathsD: -1e9, lastReadout: 0, pointers: new Map(), drag: null,
  })

  // ── Banner: a sentence that appears, then fades ───────────────────────────
  const bannerTimer = useRef(0)
  const say = useCallback((en, fr) => {
    clearTimeout(bannerTimer.current)
    setBanner({ en, fr })
    bannerTimer.current = setTimeout(() => setBanner(null), 7000)
  }, [])
  useEffect(() => () => clearTimeout(bannerTimer.current), [])

  // ── Camera presets ────────────────────────────────────────────────────────
  // Fit an orbit of `radiusAU` on screen, allowing for how flat the tilted
  // view makes it and for the control dock along the bottom.
  const fitScale = useCallback((radiusAU, squashed, pitch) => {
    const s = sim.current
    const R = squashed ? Math.sqrt(radiusAU) : radiusAU
    const flat = Math.max(Math.sin(pitch ?? s.goal.pitch), 0.22)
    return Math.min(0.44 * s.w, (0.36 * s.h) / flat) / R
  }, [])
  const refit = useCallback((pitch) => {
    const s = sim.current
    const u = ui.current
    if (!s.fit) return
    const outer = u.layers?.pluto || u.layers?.kuiper ? 50 : 31.5
    s.goal.scale = fitScale(s.fit === 'inner' ? 1.75 : outer, u.distMode === 'squash', pitch)
  }, [fitScale])

  const zoomTo = useCallback((which) => {
    const s = sim.current
    const u = ui.current
    s.follow = null
    s.fit = which
    s.zoomRate = 3
    const outer = u.layers?.pluto || u.layers?.kuiper ? 50 : 31.5
    s.goal.scale = fitScale(which === 'inner' ? 1.75 : outer, u.distMode === 'squash')
    s.goal.tx = 0; s.goal.ty = 0; s.goal.tz = 0
    setZoomPreset(which)
    setSelected(null)
  }, [fitScale])

  const setPitch = useCallback((which) => {
    const s = sim.current
    s.goal.pitch = which === 'top' ? 89.9 * DEG : which === 'side' ? 0.4 * DEG : 28 * DEG
    s.zoomRate = 3
    refit(s.goal.pitch)
    setView(which)
    if (which === 'side') {
      setLayers((l) => ({ ...l, plane: true }))
      say('Side view: all eight planets move in almost the same flat plane.',
        'Vue de côté : les huit planètes se déplacent presque dans le même plan plat.')
    }
  }, [say, refit])

  const flyToEarth = useCallback(() => {
    const s = sim.current
    s.follow = 'earth'
    s.offset = [s.cam.tx - (s.earthPos?.[0] ?? 0), s.cam.ty - (s.earthPos?.[1] ?? 0), s.cam.tz - (s.earthPos?.[2] ?? 0)]
    s.zoomRate = 0.9
    s.goal.scale = (0.4 * Math.min(s.w, s.h)) / (MOON.distanceKm / AU_KM)
    s.fit = null
    setZoomPreset(null)
    setSelected('earth')
    setSpeedIdx(0)
    say('The Earth and the Moon at their real sizes, and their real distance apart.',
      'La Terre et la Lune à leur vraie taille, et à leur vraie distance l’une de l’autre.')
  }, [say])

  const select = useCallback((key) => {
    const s = sim.current
    setSelected(key)
    if (!key) { s.follow = null; return }
    s.follow = key
    const p = s.bodyPos?.[key] || [0, 0, 0]
    s.offset = [s.cam.tx - p[0], s.cam.ty - p[1], s.cam.tz - p[2]]
    s.fit = null
    setZoomPreset(null)
  }, [])

  const zoomBy = useCallback((f) => {
    const s = sim.current
    s.zoomRate = 6
    s.goal.scale = clamp(s.goal.scale * f, 2, 4e7)
    s.fit = null
    setZoomPreset(null)
  }, [])

  const showSun = useCallback(() => {
    zoomTo('inner')
    select('sun')
  }, [zoomTo, select])

  const goToday = useCallback(() => { sim.current.d = daysFromMs(Date.now()) }, [])

  // Size and distance modes, with the sentence that goes with each.
  const chooseSize = (m) => {
    setSizeMode(m)
    if (m === 'true') {
      say('Real sizes: now the planets are too small to see! Each dashed ring shows where one is.',
        'Vraies tailles : les planètes sont maintenant trop petites pour être vues ! Chaque cercle en pointillés montre où elles sont.')
    }
  }
  const chooseDist = (m) => {
    setDistMode(m)
    const s = sim.current
    if (s.fit) {
      const outer = layers.pluto || layers.kuiper ? 50 : 31.5
      s.goal.scale = fitScale(s.fit === 'inner' ? 1.75 : outer, m === 'squash')
    }
    if (m === 'squash') say('Distances squashed so everything fits. This view is NOT to scale.', 'Distances écrasées pour que tout rentre. Cette vue n’est PAS à l’échelle.')
  }
  const toggleLayer = (k) => {
    setLayers((l) => ({ ...l, [k]: !l[k] }))
    if (k === 'pluto' && !layers.pluto) {
      say('Pluto is a dwarf planet. Its orbit is tilted 17° — look from the side.', 'Pluton est une planète naine. Son orbite est inclinée de 17° — regarde de côté.')
    }
  }

  // ── Size the canvas ───────────────────────────────────────────────────────
  const onSize = useCallback((w, h, dpr) => {
    const s = sim.current
    s.w = w; s.h = h; s.dpr = dpr
    if (!s.ready) {
      s.ready = true
      s.cam.scale = s.goal.scale = fitScale(1.75, false)
    } else if (s.fit) {
      const outer = ui.current.layers?.pluto || ui.current.layers?.kuiper ? 50 : 31.5
      s.goal.scale = fitScale(s.fit === 'inner' ? 1.75 : outer, ui.current.distMode === 'squash')
    }
  }, [fitScale])
  useCanvasFit(wrapRef, canvasRef, onSize)

  // ── The loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const s = sim.current
    if (s.d == null) s.d = daysFromMs(Date.now())
    let raf = 0
    let last = performance.now()
    const t0 = last

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const u = ui.current
      const uiK = u.big ? 1.35 : 1
      const sq = u.distMode === 'squash'
      const L = (en, fr) => (u.lang === 'fr' ? fr : en)

      // time
      if (u.playing) {
        s.d += (u.reverse ? -1 : 1) * SPEEDS[u.speedIdx].days * dt
        if (s.d < D_MIN) s.d = D_MIN
        if (s.d > D_MAX) s.d = D_MAX
      }
      const d = s.d

      // positions (true, AU)
      const pos = {}
      const shownPlanets = PLANETS.filter((p) => !p.dwarf || u.layers.pluto)
      for (const p of shownPlanets) pos[p.key] = helioPos(p, d)
      const mGeo = moonGeo(d)
      const bary = pos.earth
      pos.earth = [bary[0] - mGeo[0] * 0.01215, bary[1] - mGeo[1] * 0.01215, bary[2] - mGeo[2] * 0.01215]
      // drawn positions (squashed or not)
      const drawPos = {}
      for (const k of Object.keys(pos)) drawPos[k] = sq ? squash(pos[k]) : pos[k]
      drawPos.sun = [0, 0, 0]
      drawPos.moon = [drawPos.earth[0] + mGeo[0], drawPos.earth[1] + mGeo[1], drawPos.earth[2] + mGeo[2]]
      s.bodyPos = drawPos
      s.earthPos = drawPos.earth

      // orbit shapes, refreshed every few years of model time
      if (!s.paths || Math.abs(d - s.pathsD) > 1800) {
        s.paths = {}
        for (const p of PLANETS) s.paths[p.key] = orbitPath(p, d, 256)
        s.pathsD = d
      }

      // camera
      const cam = s.cam, goal = s.goal
      if (s.follow && drawPos[s.follow]) {
        const f = drawPos[s.follow]
        const k = Math.exp(-3.2 * dt)
        s.offset = [s.offset[0] * k, s.offset[1] * k, s.offset[2] * k]
        goal.tx = f[0] + s.offset[0]; goal.ty = f[1] + s.offset[1]; goal.tz = f[2] + s.offset[2]
        cam.tx = goal.tx; cam.ty = goal.ty; cam.tz = goal.tz
      } else {
        cam.tx = approach(cam.tx, goal.tx, 4, dt)
        cam.ty = approach(cam.ty, goal.ty, 4, dt)
        cam.tz = approach(cam.tz, goal.tz, 4, dt)
      }
      cam.yaw = approachAngle(cam.yaw, goal.yaw, 5, dt)
      cam.pitch = approach(cam.pitch, goal.pitch, 3.2, dt)
      cam.scale = Math.exp(approach(Math.log(cam.scale), Math.log(goal.scale), s.zoomRate, dt))

      const w = s.w, h = s.h
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0)
      const basis = cameraBasis(cam.yaw, cam.pitch)
      const cx = w / 2, cy = h * 0.47
      const P = (p) => project(p, cam, basis, cx, cy)

      drawSky(ctx, SKY, basis, w, h, (now - t0) / 1000)

      // ── the plane of the planets ──
      if (u.layers.plane) {
        let outer = 0
        for (const ring of PLANE_RINGS) {
          const R = sq ? Math.sqrt(ring.au) : ring.au
          const rpx = R * cam.scale
          if (rpx < 18 || rpx > 3 * Math.max(w, h)) continue
          outer = Math.max(outer, R)
          ctx.strokeStyle = 'rgba(125,211,252,0.28)'
          ctx.lineWidth = 1
          ctx.setLineDash([4, 6])
          ctx.beginPath()
          for (let k = 0; k <= 96; k++) {
            const a = (k / 96) * TAU
            const q = P([R * Math.cos(a), R * Math.sin(a), 0])
            if (k === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1])
          }
          ctx.stroke()
          ctx.setLineDash([])
          if (cam.pitch > 12 * DEG && !sq) {
            const q = P([R * Math.cos(-cam.yaw - Math.PI / 2 + 0.3), R * Math.sin(-cam.yaw - Math.PI / 2 + 0.3), 0])
            ctx.font = `600 ${11 * uiK}px ${FONT}`
            ctx.fillStyle = 'rgba(165,225,255,0.7)'
            ctx.textAlign = 'center'
            ctx.fillText(L(ring.en, ring.fr), q[0], q[1] - 4)
          }
        }
        if (outer > 0) {
          const R = outer * 1.15
          ctx.fillStyle = 'rgba(56,189,248,0.07)'
          ctx.beginPath()
          for (let k = 0; k <= 96; k++) {
            const a = (k / 96) * TAU
            const q = P([R * Math.cos(a), R * Math.sin(a), 0])
            if (k === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1])
          }
          ctx.fill()
          if (cam.pitch < 6 * DEG) {
            // edge-on, the whole plane is one bright line
            const a = P([-R * basis.right[0], -R * basis.right[1], 0])
            const b = P([R * basis.right[0], R * basis.right[1], 0])
            ctx.strokeStyle = 'rgba(125,211,252,0.35)'
            ctx.lineWidth = 2
            ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
          }
        }
      }

      // ── belts ──
      const belt = (arr, color, size) => {
        ctx.fillStyle = color
        const n = arr.length / 11
        for (let k = 0; k < n; k++) {
          const o = k * 11
          const e = arr[o + 1]
          const M = arr[o + 3] + arr[o + 2] * d
          const E = M + e * Math.sin(M) + 0.5 * e * e * Math.sin(2 * M)
          const xp = arr[o] * (Math.cos(E) - e), yp = arr[o + 10] * Math.sin(E)
          let p = [xp * arr[o + 4] + yp * arr[o + 7], xp * arr[o + 5] + yp * arr[o + 8], xp * arr[o + 6] + yp * arr[o + 9]]
          if (sq) p = squash(p)
          const q = P(p)
          if (q[0] < 0 || q[0] > w || q[1] < 0 || q[1] > h) continue
          ctx.fillRect(q[0], q[1], size, size)
        }
      }
      if (u.layers.asteroids) belt(ASTEROIDS, 'rgba(206,192,168,0.55)', 1.2 * uiK)
      if (u.layers.kuiper) belt(KUIPER, 'rgba(160,196,236,0.5)', 1.2 * uiK)

      // ── orbits ──
      if (u.layers.orbits) {
        for (const p of shownPlanets) {
          // Close up, the 256-sided orbit is too coarse: draw a fine arc
          // through where the planet is now instead.
          const aPx = p.el[0] * cam.scale * (sq ? 1 / Math.sqrt(p.el[0]) : 1)
          const path = aPx > 3 * Math.max(w, h)
            ? orbitArc(p, d, clamp((2.5 * Math.max(w, h)) / aPx, 1e-4, Math.PI))
            : s.paths[p.key]
          const sel = u.selected === p.key
          ctx.strokeStyle = sel ? p.light : p.color
          ctx.globalAlpha = sel ? 0.95 : p.dwarf ? 0.55 : 0.42
          ctx.lineWidth = (sel ? 2.2 : 1.2) * (u.big ? 1.25 : 1)
          if (p.dwarf) ctx.setLineDash([5, 5])
          ctx.beginPath()
          for (let k = 0; k < path.length; k++) {
            const q = P(sq ? squash(path[k]) : path[k])
            if (k === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1])
          }
          ctx.stroke()
          ctx.setLineDash([])
        }
        ctx.globalAlpha = 1
      }

      // ── bodies, far to near ──
      const zoomK = clamp(Math.pow(cam.scale / 250, 0.32), 0.5, 1.6)
      const trueR = (diam) => (diam / 2 / AU_KM) * cam.scale
      const radius = (diam, bigPx) => (u.sizeMode === 'true' ? trueR(diam) : Math.max(trueR(diam), 1.45 * bigPx * zoomK * uiK))
      const sunScreen = P(drawPos.sun)
      const bodies = []
      const sunR = u.sizeMode === 'true' ? trueR(SUN.diameter) : Math.max(trueR(SUN.diameter), clamp(0.1 * cam.scale, 6, 27) * uiK)
      bodies.push({ key: 'sun', q: sunScreen, r: sunR, label: L('Sun', 'Soleil') })
      for (const p of shownPlanets) {
        bodies.push({ key: p.key, p, q: P(drawPos[p.key]), r: radius(p.diameter, p.big), label: L(p.en, p.short ? p.short : p.fr) })
      }
      // the Moon, only when it can be told apart from the Earth
      const earthB = bodies.find((b) => b.key === 'earth')
      const moonQ = P(drawPos.moon)
      const moonSep = Math.hypot(moonQ[0] - earthB.q[0], moonQ[1] - earthB.q[1])
      const showMoon = u.layers.moon && (MOON.distanceKm / AU_KM) * cam.scale > earthB.r * 2.6 + 10
      if (showMoon) {
        // its orbit
        ctx.strokeStyle = 'rgba(220,220,230,0.35)'
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let k = 0; k <= 90; k++) {
          const g = moonGeo(d + (k / 90) * 27.32)
          const q = P([drawPos.earth[0] + g[0], drawPos.earth[1] + g[1], drawPos.earth[2] + g[2]])
          if (k === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1])
        }
        ctx.stroke()
        bodies.push({
          key: 'moon', p: { key: 'moon', color: '#bdbdc4', light: '#efeff4', dark: '#55555c' }, q: moonQ,
          r: u.sizeMode === 'true' ? trueR(MOON.diameter) : Math.max(trueR(MOON.diameter), 2.2 * zoomK * uiK),
          label: L('Moon', 'Lune'), small: moonSep < 30,
        })
      }
      bodies.sort((a, b) => a.q[2] - b.q[2])

      const hits = []
      for (const b of bodies) {
        const [x, y] = b.q
        if (x < -b.r - 40 || x > w + b.r + 40 || y < -b.r - 40 || y > h + b.r + 40) {
          hits.push({ key: b.key, x, y, r: 0 })
          continue
        }
        if (b.key === 'sun') {
          const glow = u.sizeMode === 'true' ? Math.max(b.r * 4, 7 * uiK) : Math.max(b.r * 3.2, 14)
          drawSun(ctx, x, y, b.r, glow)
        } else {
          // light direction, from the planet toward the Sun, in screen terms
          const wp = drawPos[b.key]
          let lx = -wp[0], ly = -wp[1], lz = -wp[2]
          const m = Math.hypot(lx, ly, lz) || 1
          lx /= m; ly /= m; lz /= m
          const L3 = [
            lx * basis.right[0] + ly * basis.right[1] + lz * basis.right[2],
            -(lx * basis.up[0] + ly * basis.up[1] + lz * basis.up[2]),
            lx * basis.toCam[0] + ly * basis.toCam[1] + lz * basis.toCam[2],
          ]
          let ringFront = null
          if (b.key === 'saturn' && b.r > 2) {
            const [back, front] = ringDrawers(ctx, x, y, b.r, basis)
            back()
            ringFront = front
          }
          if (b.r < 0.9) {
            ctx.globalAlpha = clamp(b.r / 0.9, 0.2, 1)
            ctx.fillStyle = b.p.light
            ctx.beginPath(); ctx.arc(x, y, 0.9, 0, TAU); ctx.fill()
            ctx.globalAlpha = 1
          } else if (b.r < 2.4) {
            // too small for shading to read: a plain lit dot
            ctx.fillStyle = b.p.light
            ctx.beginPath(); ctx.arc(x, y, b.r, 0, TAU); ctx.fill()
          } else {
            drawPlanetDisc(ctx, b.p, x, y, b.r, L3)
          }
          if (ringFront) ringFront()
          // where is it? a dashed ring when it is too small to see
          if (u.sizeMode === 'true' && b.r < 3) {
            ctx.strokeStyle = b.p.light
            ctx.globalAlpha = 0.75
            ctx.lineWidth = 1.4
            ctx.setLineDash([3, 3])
            ctx.beginPath(); ctx.arc(x, y, 10 * uiK, 0, TAU); ctx.stroke()
            ctx.setLineDash([])
            ctx.globalAlpha = 1
          }
        }
        if (u.selected === b.key) {
          ctx.strokeStyle = '#fbbf24'
          ctx.lineWidth = 2.2
          ctx.beginPath(); ctx.arc(x, y, Math.max(b.r, 6) + 7 * uiK, 0, TAU); ctx.stroke()
        }
        hits.push({ key: b.key, x, y, r: Math.max(b.r, 10 * uiK) })
      }
      s.hits = hits

      // ── names ──
      if (u.layers.names) {
        const size = 13 * uiK
        ctx.font = `700 ${size}px ${FONT}`
        const items = bodies
          .filter((b) => b.key !== 'moon' || !b.small)
          .map((b) => ({
            key: b.key, text: b.label, x: b.q[0], y: b.q[1],
            r: Math.max(b.r, u.sizeMode === 'true' && b.key !== 'sun' ? 10 * uiK : 0), size,
            pri: b.key === u.selected ? 0 : b.key === 'sun' ? 1 : b.key === 'earth' ? 2 : 3 + (b.p?.diameter ? 1 / b.p.diameter : 0),
            color: b.key === 'sun' ? '#ffd27a' : b.p?.light || '#fff',
          }))
          .sort((a, b) => a.pri - b.pri)
        const obstacles = bodies.filter((b) => b.r > 3).map((b) => ({ x: b.q[0] - b.r, y: b.q[1] - b.r, w: 2 * b.r, h: 2 * b.r }))
        const placed = placeLabels(items, (txt) => ctx.measureText(txt).width, { x0: 4, x1: w - 4, y0: 4, y1: h - 4 }, obstacles)
        ctx.textBaseline = 'middle'
        for (const it of placed) {
          const bx = it.box
          ctx.fillStyle = 'rgba(2,6,23,0.55)'
          ctx.beginPath()
          ctx.roundRect(bx.x, bx.y, bx.w, bx.h, 5)
          ctx.fill()
          ctx.fillStyle = it.key === u.selected ? '#fde68a' : it.color
          ctx.textAlign = 'left'
          ctx.fillText(it.text, bx.x + 4, bx.y + bx.h / 2 + 0.5)
        }
        ctx.textBaseline = 'alphabetic'
      }

      // ── scale bar, or the warning that there is no scale ──
      const dockH = dockRef.current ? dockRef.current.offsetHeight : 90
      const barY = h - dockH - 26
      ctx.textAlign = 'left'
      if (sq) {
        ctx.font = `800 ${12.5 * uiK}px ${FONT}`
        ctx.fillStyle = 'rgba(251,191,36,0.95)'
        ctx.fillText(L('⚠ Distances squashed: NOT to scale', '⚠ Distances écrasées : PAS à l’échelle'), 18, barY)
      } else {
        const km = niceKm((150 * uiK / cam.scale) * AU_KM)
        const px = (km / AU_KM) * cam.scale
        ctx.strokeStyle = 'rgba(255,255,255,0.85)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(18, barY - 6); ctx.lineTo(18, barY); ctx.lineTo(18 + px, barY); ctx.lineTo(18 + px, barY - 6)
        ctx.stroke()
        ctx.font = `700 ${12.5 * uiK}px ${FONT}`
        ctx.fillStyle = 'rgba(255,255,255,0.9)'
        ctx.fillText(fmtKm(km, u.lang), 18, barY - 11)
      }

      // ── read-out for React, 8 times a second ──
      if (now - s.lastReadout > 125) {
        s.lastReadout = now
        let info = null
        const key = u.selected
        if (key && key !== 'sun' && key !== 'moon') {
          const p = PLANETS.find((x) => x.key === key)
          const tp = pos[key] || helioPos(p, d)
          const r = Math.hypot(tp[0], tp[1], tp[2])
          const el = elementsAt(p, d)
          info = { r, v: orbitalSpeed(r, el.a), tilt: Math.abs(el.I / DEG) }
        } else if (key === 'moon') {
          const e = pos.earth
          info = { r: Math.hypot(e[0], e[1], e[2]) }
        }
        const today = daysFromMs(Date.now())
        setReadout({ ms: msFromJd(d + J2000), info, isToday: Math.abs(d - today) < 1 })
      }
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ── Pointer: drag to turn, wheel or pinch to zoom, click to choose ────────
  useEffect(() => {
    const canvas = canvasRef.current
    const onWheel = (e) => {
      e.preventDefault()
      const s = sim.current
      const f = Math.exp(-e.deltaY * 0.0016)
      s.zoomRate = 9
      s.goal.scale = clamp(s.goal.scale * f, 2, 4e7)
      s.fit = null
      setZoomPreset(null)
    }
    canvas.addEventListener('wheel', onWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', onWheel)
  }, [])

  const onPointerDown = (e) => {
    const s = sim.current
    canvasRef.current.setPointerCapture(e.pointerId)
    s.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    s.drag = { x: e.clientX, y: e.clientY, moved: 0, pan: e.button === 2 || e.shiftKey, pinch: s.pointers.size === 2 ? null : undefined }
    setLayersOpen(false)
    setDateOpen(false)
  }
  const onPointerMove = (e) => {
    const s = sim.current
    if (!s.drag || !s.pointers.has(e.pointerId)) return
    const prev = s.pointers.get(e.pointerId)
    const dx = e.clientX - prev.x, dy = e.clientY - prev.y
    s.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    s.drag.moved += Math.abs(dx) + Math.abs(dy)
    if (s.pointers.size === 2) {
      const [a, b] = [...s.pointers.values()]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      if (s.drag.pinch) {
        const f = dist / s.drag.pinch
        s.goal.scale = s.cam.scale = clamp(s.cam.scale * f, 2, 4e7)
        s.fit = null
      }
      s.drag.pinch = dist
      return
    }
    if (s.drag.pan && !s.follow) {
      const basis = cameraBasis(s.cam.yaw, s.cam.pitch)
      const k = 1 / s.cam.scale
      for (const c of ['tx', 'ty', 'tz']) {
        const i = c === 'tx' ? 0 : c === 'ty' ? 1 : 2
        s.goal[c] = s.cam[c] = s.cam[c] - dx * k * basis.right[i] + dy * k * basis.up[i]
      }
      s.fit = null
      return
    }
    s.goal.yaw = s.cam.yaw = s.cam.yaw - dx * 0.006
    s.goal.pitch = s.cam.pitch = clamp(s.cam.pitch + dy * 0.006, -20 * DEG, 89.9 * DEG)
    if (s.drag.moved > 6) setView(null)
  }
  const onPointerUp = (e) => {
    const s = sim.current
    s.pointers.delete(e.pointerId)
    if (s.drag && s.drag.moved < 6 && s.pointers.size === 0) {
      const r = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      let best = null, bestD = Infinity
      for (const hgt of s.hits) {
        const dd = Math.hypot(hgt.x - x, hgt.y - y)
        if (dd < hgt.r + 8 && dd < bestD) { best = hgt.key; bestD = dd }
      }
      if (best) select(best)
    }
    if (s.pointers.size === 0) s.drag = null
  }

  // Space plays and pauses (the deck leaves the keyboard to a game slide).
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT') return
      if (e.key === ' ') { e.preventDefault(); setPlaying((p) => !p) }
      else if (e.key === '+' || e.key === '=') zoomBy(1.5)
      else if (e.key === '-' || e.key === '_') zoomBy(1 / 1.5)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomBy])

  // ── The card for the chosen body ──────────────────────────────────────────
  const card = (() => {
    if (!selected || !readout) return null
    const L = (en, fr) => t(lang, en, fr)
    if (selected === 'sun') {
      return {
        title: L('The Sun', 'Le Soleil'), kind: L('A star', 'Une étoile'), color: '#ffcf5a',
        rows: [
          [L('Diameter', 'Diamètre'), `${fmt(SUN.diameter)} km`, L('109 Earths across', '109 Terres côte à côte')],
          [L('Mass', 'Masse'), L('333 000 Earths', '333 000 Terres'), L('99.86% of everything in the Solar System', '99.86 % de toute la masse du système solaire')],
          [L('Surface', 'Surface'), '5 500 °C', L('Centre: 15 million °C', 'Centre : 15 millions de °C')],
          [L('Age', 'Âge'), L('4.6 billion years', '4.6 milliards d’années'), L('About halfway through its life', 'À peu près à la moitié de sa vie')],
          [L('Light to Earth', 'Lumière vers la Terre'), '8 min 19 s', ''],
        ],
      }
    }
    if (selected === 'moon') {
      return {
        title: L('The Moon', 'La Lune'), kind: L('Earth’s moon', 'Le satellite de la Terre'), color: '#d4d4dc',
        rows: [
          [L('Diameter', 'Diamètre'), `${fmt(MOON.diameter)} km`, L('About ¼ of the Earth', 'Environ ¼ de la Terre')],
          [L('From the Earth', 'Distance à la Terre'), '384 400 km', L('30 Earths away', '30 Terres plus loin')],
          [L('Goes round the Earth', 'Tour de la Terre'), L('27.3 days', '27.3 jours'), ''],
          [L('Gravity', 'Gravité'), '1.6 N/kg', L(`Mr Bowen weighs ${fmt(MR_BOWEN_KG * 1.6)} N`, `M. Bowen pèse ${fmt(MR_BOWEN_KG * 1.6)} N`)],
          [L('Light takes', 'La lumière met'), '1.3 s', L('from the Moon to us', 'de la Lune jusqu’à nous')],
        ],
      }
    }
    const p = PLANETS.find((x) => x.key === selected)
    if (!p) return null
    const info = readout.info || {}
    const km = (info.r || 0) * AU_KM
    const xEarth = p.diameter / 12_756
    const yearTxt = p.periodDays < 1000
      ? L(`${fmt(Math.round(p.periodDays))} days`, `${fmt(Math.round(p.periodDays))} jours`)
      : L(`${(p.periodDays / 365.25).toFixed(1)} Earth years`, `${(p.periodDays / 365.25).toFixed(1)} années terrestres`)
    const dayTxt = p.dayHours < 48
      ? L(`${p.dayHours.toFixed(1).replace('.0', '')} hours`, `${p.dayHours.toFixed(1).replace('.0', '')} heures`)
      : L(`${fmtSig(p.dayHours / 24, 3)} Earth days`, `${fmtSig(p.dayHours / 24, 3)} jours terrestres`)
    return {
      title: L(p.en, p.fr.replace(/^la /, '')), kind: L(KIND[p.kind][0], KIND[p.kind][1]), color: p.light,
      rows: [
        [L('Diameter', 'Diamètre'), `${fmt(p.diameter)} km`, p.key === 'earth' ? '' : L(`${fmtSig(xEarth, 2)} × the Earth`, `${fmtSig(xEarth, 2)} × la Terre`)],
        [L('From the Sun today', 'Distance au Soleil'), fmtKm(km, lang), L(`Sunlight takes ${fmtLight(km)}`, `La lumière du Soleil met ${fmtLight(km)}`)],
        [L('Speed today', 'Vitesse'), `${(info.v || 0).toFixed(1)} km/s`, `${fmt(Math.round(((info.v || 0) * 3600) / 1000) * 1000)} km/h`],
        [L('One year', 'Une année'), yearTxt, L('once round the Sun', 'un tour du Soleil')],
        [L('One day', 'Un jour'), dayTxt, L('sunrise to sunrise', 'd’un lever de soleil au suivant')],
        [L('Moons', 'Lunes'), String(p.moons), p.moons > 2 ? L('known in 2026 — still rising', 'connues en 2026 — et ça augmente') : ''],
        [L('Gravity', 'Gravité'), `${p.g} N/kg`, L(`Mr Bowen weighs ${fmt(MR_BOWEN_KG * p.g)} N`, `M. Bowen pèse ${fmt(MR_BOWEN_KG * p.g)} N`)],
        [L('Temperature', 'Température'), `${fmt(p.tempC)} °C`, L('average', 'en moyenne')],
        [L('Orbit tilt', 'Inclinaison de l’orbite'), `${(info.tilt ?? 0).toFixed(1)}°`, p.key === 'earth' ? L('the Earth sets the plane', 'la Terre définit le plan') : ''],
      ],
    }
  })()

  const speedLabel = `${t(lang, SPEEDS[speedIdx].en, SPEEDS[speedIdx].fr)} ${t(lang, 'every second', 'par seconde')}`
  const isToday = readout?.isToday
  const dateValue = readout ? new Date(readout.ms).toISOString().slice(0, 10) : ''
  const txt = big ? 'text-[1.05rem]' : 'text-[0.85rem]'

  return (
    <div className="flex-1 min-h-0 w-full h-full flex flex-col bg-[#020309] select-none">
      <div ref={wrapRef} className="relative flex-1 min-h-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block touch-none cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onContextMenu={(e) => e.preventDefault()}
          onDoubleClick={() => zoomTo('inner')}
        />

        {/* Title and date */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 pointer-events-none max-w-[60%]">
          <div className={`font-black uppercase tracking-[0.22em] text-sky-300/90 ${big ? 'text-sm' : 'text-[0.7rem]'}`}>
            {t(lang, 'A model of the Solar System', 'Un modèle du système solaire')}
          </div>
          <div className={`font-black text-white tracking-tight leading-tight drop-shadow ${big ? 'text-[2.6rem]' : 'text-[1.9rem]'}`}>
            {readout ? fmtDate(readout.ms, lang) : ' '}
          </div>
          <div className={`font-semibold text-slate-300 flex items-center gap-2 flex-wrap ${txt}`}>
            {isToday && <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black uppercase tracking-wider text-[0.7em]">{t(lang, 'Today', 'Aujourd’hui')}</span>}
            <span>{playing ? `${reverse ? '◀◀' : '▶'} ${speedLabel}` : t(lang, '❚❚ Paused', '❚❚ En pause')}</span>
          </div>
        </div>

        {/* Is it to scale? The two switches the lesson is about. */}
        <GlassPanel className={`absolute left-3 sm:left-4 ${big ? 'top-[8.6rem]' : 'top-[7.4rem]'} px-3 py-2.5 flex flex-col gap-2`}>
          <Segmented
            big={big}
            label={t(lang, 'Planet sizes', 'Taille des planètes')}
            value={sizeMode}
            onChange={chooseSize}
            options={[
              { value: 'big', label: t(lang, 'Enlarged', 'Agrandies'), title: t(lang, 'Drawn bigger so you can see them', 'Dessinées plus grandes pour qu’on les voie') },
              { value: 'true', label: t(lang, 'To scale', 'À l’échelle') },
            ]}
          />
          <Segmented
            big={big}
            label={t(lang, 'Distances', 'Distances')}
            value={distMode}
            onChange={chooseDist}
            options={[
              { value: 'true', label: t(lang, 'To scale', 'À l’échelle') },
              { value: 'squash', label: t(lang, 'Squashed', 'Écrasées') },
            ]}
          />
          <div className="pt-1">
            <GlassButton big={big} tone="amber" icon={Rocket} onClick={flyToEarth}>{t(lang, 'Fly to Earth', 'Vers la Terre')}</GlassButton>
          </div>
        </GlassPanel>

        {/* The card */}
        {card && (
          <GlassPanel className={`absolute right-3 sm:right-4 ${big ? 'top-20 w-[24rem] max-h-[calc(100%-12rem)]' : 'top-3 sm:top-4 w-[19.5rem] max-h-[calc(100%-8.5rem)]'} overflow-y-auto custom-scrollbar`}>
            <div className="flex items-start justify-between gap-2 px-4 pt-3 pb-2 border-b border-white/10">
              <div>
                <div className={`font-black uppercase tracking-[0.18em] text-slate-400 ${big ? 'text-[0.8rem]' : 'text-[0.62rem]'}`}>{card.kind}</div>
                <div className={`font-black leading-tight ${big ? 'text-[1.9rem]' : 'text-[1.45rem]'}`} style={{ color: card.color }}>{card.title}</div>
              </div>
              <button type="button" onClick={() => select(null)} className="mt-1 p-1.5 rounded-lg text-slate-300 hover:bg-white/10" aria-label={t(lang, 'Close', 'Fermer')}>
                <X className={big ? 'w-6 h-6' : 'w-5 h-5'} strokeWidth={2.5} />
              </button>
            </div>
            <dl className="px-4 py-2">
              {card.rows.map(([k, v, sub]) => (
                <div key={k} className={`${big ? 'py-1' : 'py-1.5'} border-b border-white/5 last:border-0`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className={`text-slate-400 font-semibold ${big ? 'text-[0.92rem]' : 'text-[0.78rem]'}`}>{k}</dt>
                    <dd className={`font-black text-white text-right ${big ? 'text-[1.12rem]' : 'text-[0.95rem]'}`}>{v}</dd>
                  </div>
                  {sub && <div className={`text-right text-sky-200/80 font-medium ${big ? 'text-[0.84rem]' : 'text-[0.72rem]'}`}>{sub}</div>}
                </div>
              ))}
            </dl>
          </GlassPanel>
        )}
        {!card && (
          <div className={`absolute ${big ? 'top-20' : 'top-4'} right-4 pointer-events-none text-right text-slate-400 font-semibold ${txt}`}>
            {t(lang, 'Click a planet · drag to turn · scroll to zoom', 'Clique sur une planète · fais glisser pour tourner · molette pour zoomer')}
          </div>
        )}

        {/* The sentence for what just changed */}
        {banner && (
          <div className={`absolute top-[18%] pointer-events-none animate-in fade-in slide-in-from-top-2 duration-500 ${card ? (big ? 'left-[18rem] right-[27rem]' : 'left-[15rem] right-[22rem]') : 'left-1/2 -translate-x-1/2 w-[min(44rem,86%)]'}`}>
            <div className={`rounded-2xl bg-slate-950/80 border border-amber-300/50 text-amber-100 font-bold text-center px-5 py-3 shadow-2xl backdrop-blur ${big ? 'text-[1.45rem]' : 'text-[1.1rem]'}`}>
              {t(lang, banner.en, banner.fr)}
            </div>
          </div>
        )}

        {/* Layers */}
        {layersOpen && (
          <GlassPanel className={`absolute right-3 ${big ? 'bottom-[8.6rem]' : 'bottom-[7rem]'} p-3 flex flex-wrap gap-2 max-w-[30rem]`}>
            <LayerChip big={big} on={layers.orbits} color="#94a3b8" onClick={() => toggleLayer('orbits')}>{t(lang, 'Orbits', 'Orbites')}</LayerChip>
            <LayerChip big={big} on={layers.names} color="#e2e8f0" onClick={() => toggleLayer('names')}>{t(lang, 'Names', 'Noms')}</LayerChip>
            <LayerChip big={big} on={layers.plane} color="#38bdf8" onClick={() => toggleLayer('plane')}>{t(lang, 'The flat plane', 'Le plan')}</LayerChip>
            <LayerChip big={big} on={layers.asteroids} color="#cec0a8" onClick={() => toggleLayer('asteroids')}>{t(lang, 'Asteroid belt', 'Ceinture d’astéroïdes')}</LayerChip>
            <LayerChip big={big} on={layers.kuiper} color="#a0c4ec" onClick={() => toggleLayer('kuiper')}>{t(lang, 'Kuiper belt', 'Ceinture de Kuiper')}</LayerChip>
            <LayerChip big={big} on={layers.pluto} color="#cdb59a" onClick={() => toggleLayer('pluto')}>{t(lang, 'Pluto (dwarf planet)', 'Pluton (planète naine)')}</LayerChip>
            <LayerChip big={big} on={layers.moon} color="#d4d4dc" onClick={() => toggleLayer('moon')}>{t(lang, 'The Moon', 'La Lune')}</LayerChip>
          </GlassPanel>
        )}

        {/* Date picker */}
        {dateOpen && (
          <GlassPanel className="absolute left-3 bottom-[7.2rem] p-3 flex items-center gap-2">
            <input
              type="date"
              value={dateValue}
              min="1800-01-01"
              max="2199-12-31"
              onChange={(e) => {
                const v = e.target.value
                if (!v) return
                const [y, m, dd] = v.split('-').map(Number)
                sim.current.d = daysFromMs(Date.UTC(y, m - 1, dd))
              }}
              className={`rounded-lg bg-slate-900 border border-white/20 text-white font-bold px-2 py-1 [color-scheme:dark] ${big ? 'text-lg' : 'text-sm'}`}
            />
            <GlassButton big={big} icon={CalendarDays} onClick={() => { goToday(); setDateOpen(false) }}>{t(lang, 'Today', 'Aujourd’hui')}</GlassButton>
          </GlassPanel>
        )}

        {/* The control dock */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 pointer-events-none">
          <div ref={dockRef} className="mx-auto w-fit max-w-full">
          <GlassPanel className="pointer-events-auto w-fit max-w-full px-3 py-2.5 flex flex-wrap items-end justify-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5 self-center">
              <GlassIconButton big={big} icon={Rewind} active={reverse} title={t(lang, 'Run backwards', 'À rebours')} onClick={() => setReverse((r) => !r)} />
              <GlassIconButton big={big} accent icon={playing ? Pause : Play} title={playing ? t(lang, 'Pause', 'Pause') : t(lang, 'Play', 'Lecture')} onClick={() => setPlaying((p) => !p)} />
              <GlassIconButton big={big} icon={CalendarDays} active={dateOpen} title={t(lang, 'Choose a date', 'Choisir une date')} onClick={() => { setDateOpen((o) => !o); setLayersOpen(false) }} />
            </div>
            <Segmented
              big={big}
              label={t(lang, 'Each second is…', 'Chaque seconde =')}
              value={speedIdx}
              onChange={(v) => { setSpeedIdx(v); setPlaying(true) }}
              options={SPEEDS.map((sp, i) => ({ value: i, label: t(lang, sp.en, sp.fr) }))}
            />
            <Segmented
              big={big}
              label={t(lang, 'Look from', 'Vue')}
              value={view}
              onChange={setPitch}
              options={[
                { value: 'top', label: t(lang, 'Above', 'Dessus') },
                { value: 'tilt', label: t(lang, 'Tilted', 'Inclinée') },
                { value: 'side', label: t(lang, 'Side', 'Côté') },
              ]}
            />
            <Segmented
              big={big}
              label={t(lang, 'Zoom', 'Zoom')}
              value={zoomPreset}
              onChange={zoomTo}
              options={[
                { value: 'inner', label: t(lang, 'Inner planets', 'Proches') },
                { value: 'all', label: t(lang, 'All planets', 'Toutes') },
              ]}
            />
            <div className="flex items-center gap-1.5 self-end">
              <GlassIconButton big={big} icon={Minus} title={t(lang, 'Zoom out', 'Dézoomer')} onClick={() => zoomBy(1 / 1.6)} />
              <GlassIconButton big={big} icon={Plus} title={t(lang, 'Zoom in', 'Zoomer')} onClick={() => zoomBy(1.6)} />
            </div>
            <div className="flex items-center gap-1.5 self-end">
              <GlassIconButton big={big} icon={SunIcon} title={t(lang, 'The Sun', 'Le Soleil')} onClick={showSun} />
              <GlassIconButton big={big} icon={LayersIcon} active={layersOpen} title={t(lang, 'Layers', 'Calques')} onClick={() => { setLayersOpen((o) => !o); setDateOpen(false) }} />
            </div>
          </GlassPanel>
          </div>
        </div>
      </div>
    </div>
  )
}
