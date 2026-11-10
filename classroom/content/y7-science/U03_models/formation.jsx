// content/y7-science/U03_models/formation.jsx
// HOW THE SOLAR SYSTEM FORMED — the nebula model, in seven steps.
//
//   0 Cloud     a cold, lumpy cloud of gas and dust, turning very slowly;
//               a shock wave from an exploding star may have pushed it
//   1 Collapse  gravity pulls it in; the middle gets hot and dense
//   2 Disc      it spins faster as it shrinks (the skater) and flattens
//   3 Sun       the middle lights up; the frost line splits rock from ice
//   4 Clumps    dust sticks: pebbles → rocks → planetesimals
//   5 Planets   clumps crash and join; far out, icy cores grab gas → giants
//   6 Today     the Sun's wind clears the gas; leftovers are the asteroid
//               and Kuiper belts; everything still turns the SAME way
//
// This is the ANSWER to the solar-system model's question — why are the
// planets in one flat plane, all going round the same way? Because they were
// made from one flat, spinning disc. Step 2 is where to stop and say so.
//
// HOW IT IS BUILT. 3 800 dust grains and 1 500 puffs of gas, each with a
// place in the cloud and a place in the disc, seeded so it is the same every
// time. Every grain belongs to an orbit zone that turns at its own Kepler
// speed (inner fast, outer slow), so the disc shears like the real thing.
// Within a zone, grains gather into clumps, and clumps into the planet, by
// easing between those places as the story moves — not a gravity simulation,
// and plan.js says so: it is a model, and this is where to ask what it gets
// wrong. Distances are squashed (√r) so the inner planets have room.
import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { PLANETS, mulberry32 } from './data.js'
import { DEG, clamp, lerp, smoother, cameraBasis, project, approach, approachAngle, makeSky, drawSky, glowSprite, useCanvasFit } from './space.js'
import { GlassPanel, Segmented, GlassIconButton, GlassButton } from './ui.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const TAU = Math.PI * 2

const STAGES = [
  {
    short: ['Cloud', 'Nuage'],
    time: ['4.6 billion years ago', 'Il y a 4.6 milliards d’années'],
    title: ['A cloud of gas and dust', 'Un nuage de gaz et de poussière'],
    text: ['A huge, cold cloud called a **nebula**. It turns very slowly. An exploding star nearby may have given it a push.',
      'Un énorme nuage froid appelé **nébuleuse**. Il tourne très lentement. Une étoile qui explose tout près l’a peut-être poussé.'],
  },
  {
    short: ['Collapse', 'Effondrement'],
    time: ['The first 100 000 years', 'Les premiers 100 000 ans'],
    title: ['Gravity pulls it together', 'La gravité le rassemble'],
    text: ['**Gravity** pulls the cloud in on itself. The middle gets hotter and denser.',
      'La **gravité** fait s’effondrer le nuage. Le centre devient plus chaud et plus dense.'],
  },
  {
    short: ['Disc', 'Disque'],
    time: ['The first 100 000 years', 'Les premiers 100 000 ans'],
    title: ['It spins faster and goes flat', 'Il tourne plus vite et s’aplatit'],
    text: ['As it shrinks, it **spins faster** — like a skater pulling in their arms. It flattens into a spinning **disc**.',
      'En rétrécissant, il **tourne plus vite** — comme une patineuse qui ramène ses bras. Il s’aplatit en un **disque** qui tourne.'],
  },
  {
    short: ['Sun', 'Soleil'],
    time: ['The first million years', 'Le premier million d’années'],
    title: ['A young Sun lights up', 'Un jeune Soleil s’allume'],
    text: ['The middle becomes a young star: the **Sun**. Near it, it is too hot for ice. Only **rock and metal** are left. Far away, **ice** survives too.',
      'Le centre devient une jeune étoile : le **Soleil**. Près de lui, il fait trop chaud pour la glace. Il ne reste que **roche et métal**. Plus loin, la **glace** survit aussi.'],
  },
  {
    short: ['Clumps', 'Amas'],
    time: ['The first few million years', 'Les premiers millions d’années'],
    title: ['Dust sticks together', 'La poussière s’agglomère'],
    text: ['Dust grains stick together: **pebbles**, then **rocks**, then lumps as big as mountains.',
      'Les grains de poussière se collent : des **cailloux**, puis des **rochers**, puis des blocs gros comme des montagnes.'],
  },
  {
    short: ['Planets', 'Planètes'],
    time: ['1 to 100 million years', 'De 1 à 100 millions d’années'],
    title: ['Crash! Planets grow', 'Boum ! Les planètes grandissent'],
    text: ['Lumps **crash** and join to make **planets**. Far out, big icy planets pull in gas and become **giants**.',
      'Les blocs se **percutent** et s’assemblent en **planètes**. Plus loin, de grosses planètes glacées attirent du gaz et deviennent des **géantes**.'],
  },
  {
    short: ['Today', 'Aujourd’hui'],
    time: ['After 100 million years', 'Après 100 millions d’années'],
    title: ['The leftovers', 'Les restes'],
    text: ['The Sun blows the last gas away. Leftover rocks are **asteroids**; leftover ice is **comets**. Everything still goes round the **same way**, in the **same flat plane**.',
      'Le Soleil chasse le reste du gaz. Les rochers en trop sont des **astéroïdes** ; la glace en trop, des **comètes**. Tout tourne encore **dans le même sens**, dans le **même plan**.'],
  },
]
const LAST = STAGES.length // s runs from 0 to 7

// ── Orbit zones (squashed radii) ────────────────────────────────────────────
const W_KEP = 0.131 // rad/s at r = 1: the Earth zone (r .25) goes round in ~6 s
const OMEGA_CLOUD = 0.06
const FROST = 0.43
const P = Object.fromEntries(PLANETS.map((p) => [p.key, p]))
const ZONES = [
  { key: 'sun', r: 0.05, lo: 0, hi: 0.075 },
  { key: 'mercury', r: 0.13, lo: 0.075, hi: 0.16, size: 0.008 },
  { key: 'venus', r: 0.19, lo: 0.16, hi: 0.22, size: 0.0115 },
  { key: 'earth', r: 0.25, lo: 0.22, hi: 0.285, size: 0.012 },
  { key: 'mars', r: 0.32, lo: 0.285, hi: 0.345, size: 0.009 },
  { key: 'belt', r: 0.405, lo: 0.345, hi: 0.47, belt: true, clumps: 46 },
  { key: 'jupiter', r: 0.53, lo: 0.47, hi: 0.59, size: 0.036, giant: true },
  { key: 'saturn', r: 0.65, lo: 0.59, hi: 0.71, size: 0.03, giant: true },
  { key: 'uranus', r: 0.77, lo: 0.71, hi: 0.82, size: 0.02, giant: true },
  { key: 'neptune', r: 0.87, lo: 0.82, hi: 0.915, size: 0.02, giant: true },
  { key: 'kuiper', r: 0.96, lo: 0.915, hi: 1.05, belt: true, clumps: 54 },
]
const zoneOf = (r) => { for (let i = 0; i < ZONES.length; i++) if (r < ZONES[i].hi) return i; return ZONES.length - 1 }
const omegaKep = (r) => W_KEP * Math.pow(Math.max(r, 0.09), -1.5)

// ── The particles, made once ────────────────────────────────────────────────
const N_DUST = 3800
const N_GAS = 1500
const gauss = (rnd) => (rnd() + rnd() + rnd() + rnd() - 2) * 0.866

function buildParticles() {
  const rnd = mulberry32(2026)
  const blobs = Array.from({ length: 10 }, () => {
    const r = 0.65 * Math.cbrt(rnd()), a = rnd() * TAU, z = (rnd() * 2 - 1) * 0.55
    return [r * Math.cos(a), r * Math.sin(a), z]
  })
  // clumps per zone: a centre offset angle, a radius, a merge delay
  const clumps = ZONES.map((zn) => {
    const K = zn.belt ? zn.clumps : zn.key === 'sun' ? 1 : zn.giant ? 9 : 7
    return Array.from({ length: K }, (_, k) => ({
      off: ((k + 0.5) / K) * TAU + (rnd() - 0.5) * (TAU / K) * 0.5,
      r: zn.belt ? zn.lo + 0.01 + rnd() * (zn.hi - zn.lo - 0.02) : zn.r + (rnd() - 0.5) * (zn.hi - zn.lo) * 0.55,
      delay: rnd(),
      z: (rnd() - 0.5) * (zn.belt ? 0.05 : 0.012),
      count: 0,
    }))
  })

  const make = (n, gas) => {
    const A = {
      rho0: new Float32Array(n), off: new Float32Array(n), z0: new Float32Array(n),
      rd: new Float32Array(n), zd: new Float32Array(n), g: new Uint8Array(n), k: new Uint16Array(n),
      jA: new Float32Array(n), jR: new Float32Array(n), bright: new Float32Array(n),
      fall: new Uint8Array(n), keep: new Uint8Array(n), hue: new Uint8Array(n),
    }
    for (let i = 0; i < n; i++) {
      const b = blobs[Math.floor(rnd() * blobs.length)]
      const spread = gas ? 0.42 : 0.3
      let x = b[0] + gauss(rnd) * spread, y = b[1] + gauss(rnd) * spread, z = b[2] + gauss(rnd) * spread * 0.9
      const m = Math.hypot(x, y, z)
      if (m > 1.3) { x *= 1.3 / m; y *= 1.3 / m; z *= 1.3 / m }
      A.rho0[i] = Math.hypot(x, y)
      A.off[i] = Math.atan2(y, x)
      A.z0[i] = z
      const rd = gas ? 0.07 + 1.05 * Math.pow(rnd(), 0.8) : 0.06 + 0.98 * Math.pow(rnd(), 0.85)
      A.rd[i] = rd
      A.zd[i] = gauss(rnd) * (0.01 + 0.035 * rd) * (gas ? 1.6 : 1)
      const g = zoneOf(rd)
      A.g[i] = g
      const K = clumps[g].length
      const sector = ((((A.off[i] % TAU) + TAU) % TAU) / TAU) * K
      A.k[i] = Math.min(K - 1, Math.floor(sector))
      clumps[g][A.k[i]].count += gas ? 0 : 1
      A.jA[i] = gauss(rnd) * 0.03
      A.jR[i] = gauss(rnd) * 0.006
      A.bright[i] = 0.35 + 0.65 * rnd()
      A.fall[i] = g === 0 || rnd() < (gas ? 0.3 : 0.12) ? 1 : 0
      A.keep[i] = gas && ZONES[g].giant && rnd() < 0.35 ? 1 : 0 // gas a giant pulls in
      A.hue[i] = rnd() < 0.5 ? 0 : 1
    }
    return A
  }
  const dust = make(N_DUST, false)
  const gas = make(N_GAS, true)
  const maxCount = Math.max(...clumps.flat().map((c) => c.count))
  return { dust, gas, clumps, maxCount }
}
const WORLD = buildParticles()
const SKY = makeSky(31, 1100, 1800)

// Each zone keeps its own angle; it turns slowly as a cloud and at its Kepler
// speed once the disc has formed.
const spinBlend = (s) => smoother((s - 1.1) / 1.7)
// Step k plays while s runs from k to k+1, and its words stay up while the
// model holds at k+1.
const stageAt = (s) => (s <= 1e-6 ? 0 : Math.min(LAST - 1, Math.ceil(s - 1e-6) - 1))

/** Shortest signed angle from a to b. */
const dAng = (a, b) => { let d = (b - a) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; return d }

export function Formation({ lang = 'en', isDisplayMode = false }) {
  const big = isDisplayMode
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const [stage, setStage] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [playAll, setPlayAll] = useState(false)
  const [view, setView] = useState('tilt')
  const [scrub, setScrub] = useState(0)

  const sim = useRef({
    s: 0, target: 1, w: 800, h: 500, dpr: 1,
    zoneAng: new Float64Array(ZONES.length),
    cam: { yaw: 0.3, pitch: 26 * DEG, scale: 200, tx: 0, ty: 0, tz: 0 },
    goal: { yaw: 0.3, pitch: 26 * DEG },
    zoom: 1, drag: null, lastUi: 0,
  })
  const ui = useRef({})
  useEffect(() => { ui.current = { playing, playAll, lang, big } })

  const onSize = useCallback((w, h, dpr) => { const s = sim.current; s.w = w; s.h = h; s.dpr = dpr }, [])
  useCanvasFit(wrapRef, canvasRef, onSize)

  const goTo = useCallback((i) => {
    const s = sim.current
    const k = clamp(i, 0, LAST - 1)
    s.s = k
    s.target = k + 1
    setStage(k)
    setPlaying(true)
  }, [])
  const next = () => {
    const S = sim.current
    if (S.s >= LAST - 1e-6) return
    if (S.s < S.target - 1e-6) S.s = S.target // finish this step at once
    S.target = Math.min(LAST, Math.round(S.s) + 1)
    setStage(stageAt(S.s + 0.5))
    setPlaying(true)
  }
  const back = () => {
    const S = sim.current
    const d = stageAt(S.s)
    goTo(S.s - d > 0.08 ? d : d - 1)
  }
  const restart = () => { setPlayAll(false); goTo(0) }
  const choosePitch = (v) => {
    sim.current.goal.pitch = v === 'top' ? 89 * DEG : v === 'side' ? 1.5 * DEG : 26 * DEG
    setView(v)
  }

  // ── The loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const S = sim.current
    const gasSprites = [glowSprite('235,110,175'), glowSprite('105,140,255'), glowSprite('175,205,255')]
    const sunSprite = glowSprite('255,190,90', 128, 0.08)
    const flashSprite = glowSprite('255,240,210', 64, 0.1)
    const { dust, gas, clumps, maxCount } = WORLD
    let raf = 0, last = performance.now()
    const t0 = last

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const u = ui.current
      const uiK = u.big ? 1.3 : 1
      const L = (pair) => (u.lang === 'fr' ? pair[1] : pair[0])

      // story time
      if (u.playing) {
        const rate = 1 / (S.s < 1 ? 6.5 : S.s < 3 ? 6 : S.s < 4 ? 5.5 : S.s < 6 ? 7 : 7.5)
        const target = u.playAll ? LAST : S.target
        if (S.s < target) S.s = Math.min(target, S.s + rate * dt)
      }
      const s = S.s
      // zones turn (unless paused)
      const spin = spinBlend(s)
      if (u.playing) {
        for (let g = 0; g < ZONES.length; g++) S.zoneAng[g] += lerp(OMEGA_CLOUD, omegaKep(ZONES[g].r), spin) * dt
      }

      // camera
      const cam = S.cam
      cam.yaw = approachAngle(cam.yaw, S.goal.yaw, 4, dt)
      cam.pitch = approach(cam.pitch, S.goal.pitch, 3, dt)
      if (!S.drag && u.playing) S.goal.yaw += 0.02 * dt
      const w = S.w, h = S.h
      const flatten = smoother((s - 1.8) / 1.4)
      const R = lerp(1.35, 1.08, flatten)
      const fit = Math.min(0.46 * w, (0.4 * h) / Math.max(Math.sin(cam.pitch), 0.3 + 0.4 * (1 - flatten)))
      cam.scale = approach(cam.scale, (fit / R) * S.zoom, 3, dt)
      const basis = cameraBasis(cam.yaw, cam.pitch)
      const cx = w / 2, cy = h * 0.5
      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0)
      drawSky(ctx, SKY, basis, w, h, (now - t0) / 1000)
      const Pj = (x, y, z) => project([x, y, z], cam, basis, cx, cy)

      // phases
      const collapse = smoother((s - 1) / 1)
      const shrink = lerp(1, 0.5, collapse)
      const fallK = smoother((s - 1.2) / 1.8)
      const frost = smoother((s - 3.1) / 0.6) // rock/ice colours split
      const clumpK = (k0) => smoother((s - 4 - k0 * 0.15) / 0.8)
      const mergeK = (delay) => smoother((s - 5 - delay * 0.45) / 0.5)
      const wind = smoother((s - 6) / 0.9)
      const shock = s < 1.05 ? smoother((s - 0.3) / 0.7) : -1

      // ── gas (additive glow) ──
      ctx.globalCompositeOperation = 'lighter'
      for (let i = 0; i < N_GAS; i++) {
        const g = gas.g[i]
        const zn = ZONES[g]
        let rho = lerp(gas.rho0[i] * shrink, gas.rd[i], flatten)
        let z = lerp(gas.z0[i] * shrink, gas.zd[i], flatten)
        let ang = S.zoneAng[g] + gas.off[i]
        let alpha = 0.085 * gas.bright[i]
        if (gas.fall[i]) { rho *= 1 - fallK; z *= 1 - fallK; alpha *= 1 - fallK * 0.9 }
        if (gas.keep[i]) {
          // pulled into a giant planet
          const mk = mergeK(0.2)
          rho = lerp(rho, zn.r, mk)
          ang += mk * dAng(gas.off[i], 0)
          z = lerp(z, 0, mk)
          alpha *= 1 - mk * 0.8
        } else if (wind > 0) {
          rho *= 1 + 1.6 * wind
          alpha *= 1 - wind
        }
        if (shock > 0) { // the shock front nudges the cloud
          const px = rho * (Math.cos(ang) * basis.right[0] + Math.sin(ang) * basis.right[1])
          const front = lerp(-2.0, 1.4, shock)
          if (px < front) rho *= 1 - 0.04 * smoother((front - px) / 0.5)
        }
        if (alpha < 0.004) continue
        const q = Pj(rho * Math.cos(ang), rho * Math.sin(ang), z)
        const size = (0.16 + 0.12 * gas.bright[i]) * cam.scale * lerp(1, 0.6, flatten)
        const spr = frost > 0.5 && rho > FROST ? gasSprites[2] : gasSprites[gas.hue[i]]
        ctx.globalAlpha = alpha
        ctx.drawImage(spr, q[0] - size / 2, q[1] - size / 2, size, size)
      }

      // ── dust ──
      // Colour: brown in the cloud; once the Sun lights up, warm rock inside
      // the frost line and pale ice outside it.
      const binsRock = [new Path2D(), new Path2D(), new Path2D()]
      const binsIce = [new Path2D(), new Path2D(), new Path2D()]
      const ds = Math.max(1.1, 1.5 * uiK * Math.min(1.4, cam.scale / 300))
      for (let i = 0; i < N_DUST; i++) {
        const g = dust.g[i]
        const zn = ZONES[g]
        const cl = clumps[g][dust.k[i]]
        let rho = lerp(dust.rho0[i] * shrink, dust.rd[i], flatten)
        let z = lerp(dust.z0[i] * shrink, dust.zd[i], flatten)
        let a = dust.off[i]
        let vis = 1
        if (dust.fall[i]) {
          rho *= 1 - fallK; z *= 1 - fallK; vis = 1 - fallK
        } else if (g > 0) {
          const c = clumpK(cl.delay)
          if (c > 0) {
            rho = lerp(rho, cl.r + dust.jR[i] * (1.2 - c), c)
            a = a + c * (dAng(a, cl.off + dust.jA[i] * (1.1 - c)))
            z = lerp(z, cl.z, c)
            vis *= 1 - 0.75 * c // the clump itself is drawn below
          }
          if (!zn.belt) {
            const m = mergeK(cl.delay)
            if (m > 0) {
              rho = lerp(rho, zn.r, m)
              a = a + m * dAng(a, 0)
              z = lerp(z, 0, m)
              vis *= 1 - m
            }
          } else if (wind > 0) {
            vis *= 1 - 0.5 * wind
          }
        }
        if (shock > 0) {
          const front = lerp(-2.0, 1.4, shock)
          const px = rho * (Math.cos(S.zoneAng[g] + a) * basis.right[0] + Math.sin(S.zoneAng[g] + a) * basis.right[1])
          if (px < front) rho *= 1 - 0.04 * smoother((front - px) / 0.5)
        }
        if (vis < 0.02) continue
        const ang = S.zoneAng[g] + a
        const q = Pj(rho * Math.cos(ang), rho * Math.sin(ang), z)
        if (q[0] < -4 || q[0] > w + 4 || q[1] < -4 || q[1] > h + 4) continue
        const level = dust.bright[i] * vis
        const bin = level > 0.7 ? 2 : level > 0.4 ? 1 : 0
        const ice = frost > 0 && rho > FROST
        ;(ice ? binsIce : binsRock)[bin].rect(q[0], q[1], ds, ds)
      }
      const mix = (c1, c2, f) => c1.map((v, j) => Math.round(v + (c2[j] - v) * f))
      const rockC = mix([200, 150, 120], [255, 168, 96], frost)
      const iceC = mix([200, 150, 120], [175, 215, 255], frost)
      const alphas = [0.32, 0.55, 0.85]
      for (let b = 0; b < 3; b++) {
        ctx.globalAlpha = alphas[b]
        ctx.fillStyle = `rgb(${rockC})`
        ctx.fill(binsRock[b])
        ctx.fillStyle = `rgb(${iceC})`
        ctx.fill(binsIce[b])
      }
      ctx.globalAlpha = 1

      // ── the shock wave ──
      if (shock > 0 && shock < 1) {
        const front = lerp(-2.0, 1.4, shock)
        const fade = Math.sin(Math.PI * shock)
        ctx.strokeStyle = `rgba(150,220,255,${0.55 * fade})`
        ctx.lineWidth = 3 * uiK
        ctx.beginPath()
        for (let k = 0; k <= 40; k++) {
          const yy = -1.6 + (3.2 * k) / 40
          const xx = front - 0.25 * yy * yy
          const q = [cx + xx * cam.scale, cy - yy * cam.scale]
          if (k === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1])
        }
        ctx.stroke()
      }

      // ── the young Sun ──
      const glow = smoother((s - 0.9) / 1.6) * 0.6 + smoother((s - 2.8) / 0.8) * 0.4
      const ignite = Math.exp(-Math.pow((s - 3.45) / 0.12, 2)) // a flash as it lights
      if (glow > 0.01) {
        const sq = Pj(0, 0, 0)
        const size = (0.28 + 0.5 * glow + 0.9 * ignite) * cam.scale
        ctx.globalAlpha = Math.min(1, 0.35 + 0.65 * glow)
        ctx.drawImage(sunSprite, sq[0] - size / 2, sq[1] - size / 2, size, size)
        ctx.globalAlpha = 1
      }
      // jets from the poles while it forms
      const jet = smoother((s - 2.1) / 0.5) * (1 - smoother((s - 3.3) / 0.5))
      if (jet > 0.01) {
        for (const sign of [1, -1]) {
          const a0 = Pj(0, 0, 0), a1 = Pj(0, 0, sign * 0.38)
          const gr = ctx.createLinearGradient(a0[0], a0[1], a1[0], a1[1])
          gr.addColorStop(0, `rgba(190,220,255,${0.5 * jet})`)
          gr.addColorStop(0.5, `rgba(190,220,255,${0.18 * jet})`)
          gr.addColorStop(1, 'rgba(190,220,255,0)')
          ctx.strokeStyle = gr
          // a soft cone: a few strokes fanning out from the star
          for (const spread of [-0.035, 0, 0.035]) {
            const b1 = Pj(spread, spread * 0.5, sign * 0.38)
            ctx.lineWidth = (spread === 0 ? 5 : 2.5) * uiK
            ctx.beginPath(); ctx.moveTo(a0[0], a0[1]); ctx.lineTo(b1[0], b1[1]); ctx.stroke()
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over'
      if (glow > 0.3) {
        const sq = Pj(0, 0, 0)
        const r = (0.012 + 0.03 * smoother((s - 2.6) / 1.2)) * cam.scale
        const c = ctx.createRadialGradient(sq[0], sq[1], 0, sq[0], sq[1], r)
        const hot = smoother((s - 2.8) / 0.9)
        c.addColorStop(0, '#fffdf2')
        c.addColorStop(0.6, hot > 0.5 ? '#ffe08a' : '#ff9a5a')
        c.addColorStop(1, hot > 0.5 ? '#ffa53a' : '#d84d2a')
        ctx.fillStyle = c
        ctx.beginPath(); ctx.arc(sq[0], sq[1], r, 0, TAU); ctx.fill()
      }

      // ── the frost line ──
      const frostShow = smoother((s - 3.2) / 0.5) * (1 - smoother((s - 6.2) / 0.5))
      if (frostShow > 0.01) {
        ctx.strokeStyle = `rgba(165,220,255,${0.7 * frostShow})`
        ctx.lineWidth = 1.6 * uiK
        ctx.setLineDash([6, 6])
        ctx.beginPath()
        for (let k = 0; k <= 120; k++) {
          const a = (k / 120) * TAU
          const q = Pj(FROST * Math.cos(a), FROST * Math.sin(a), 0)
          if (k === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1])
        }
        ctx.stroke()
        ctx.setLineDash([])
        const lab = Pj(FROST * Math.cos(-cam.yaw - 1.1), FROST * Math.sin(-cam.yaw - 1.1), 0)
        ctx.globalAlpha = frostShow * 0.7
        ctx.fillStyle = 'rgba(2,6,23,0.75)'
        ctx.beginPath()
        ctx.roundRect(lab[0] - 95 * uiK, lab[1] - 28 * uiK, 190 * uiK, 60 * uiK, 8)
        ctx.fill()
        ctx.globalAlpha = frostShow
        ctx.font = `800 ${14 * uiK}px ${FONT}`
        ctx.textAlign = 'center'
        ctx.fillStyle = '#bfe3ff'
        ctx.fillText(L(['FROST LINE', 'LIGNE DES GLACES']), lab[0], lab[1] - 10 * uiK)
        ctx.font = `600 ${12.5 * uiK}px ${FONT}`
        ctx.fillStyle = '#ffc89a'
        ctx.fillText(L(['inside: rock and metal', 'dedans : roche et métal']), lab[0], lab[1] + 8 * uiK)
        ctx.fillStyle = '#cfe8ff'
        ctx.fillText(L(['outside: ice too', 'dehors : glace aussi']), lab[0], lab[1] + 24 * uiK)
        ctx.globalAlpha = 1
      }

      // ── clumps (planetesimals) ──
      const bodies = []
      for (let g = 1; g < ZONES.length; g++) {
        const zn = ZONES[g]
        for (const cl of clumps[g]) {
          const c = clumpK(cl.delay)
          if (c < 0.05) continue
          let rr = cl.r, a = cl.off, z = cl.z
          let vis = c
          if (!zn.belt) {
            const m = mergeK(cl.delay)
            rr = lerp(rr, zn.r, m); a = a + m * dAng(a, 0); z = lerp(z, 0, m)
            vis *= 1 - smoother((m - 0.85) / 0.15)
            // a flash as each clump arrives
            if (m > 0.86 && m < 0.995) bodies.push({ flash: Math.sin(Math.PI * (m - 0.86) / 0.135), x: rr, a, z, g })
          } else if (wind > 0) {
            vis *= 1 - 0.25 * wind
          }
          if (vis < 0.03) continue
          const ang = S.zoneAng[g] + a
          const q = Pj(rr * Math.cos(ang), rr * Math.sin(ang), z)
          const size = Math.max(1.2, (0.0035 + 0.006 * (cl.count / maxCount)) * cam.scale * c)
          ctx.globalAlpha = vis
          ctx.fillStyle = rr > FROST ? '#d8ecff' : '#d9a27a'
          ctx.beginPath(); ctx.arc(q[0], q[1], size, 0, TAU); ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      // ── the planets ──
      const labels = []
      for (let g = 1; g < ZONES.length; g++) {
        const zn = ZONES[g]
        if (zn.belt || zn.key === 'sun') continue
        const grow = smoother((s - 5.1) / 0.9)
        if (grow <= 0) continue
        const pl = P[zn.key]
        const ang = S.zoneAng[g]
        const q = Pj(zn.r * Math.cos(ang), zn.r * Math.sin(ang), 0)
        const r = Math.max(1.5, zn.size * cam.scale * grow * (u.big ? 1.1 : 1))
        if (zn.key === 'saturn' && r > 3) {
          ctx.strokeStyle = 'rgba(230,210,165,0.85)'
          ctx.lineWidth = Math.max(1, r * 0.35)
          ctx.beginPath()
          ctx.ellipse(q[0], q[1], r * 2, r * 2 * Math.max(0.12, Math.sin(cam.pitch)), 0, 0, TAU)
          ctx.stroke()
        }
        const gr = ctx.createRadialGradient(q[0] - r * 0.35, q[1] - r * 0.35, r * 0.1, q[0], q[1], r)
        gr.addColorStop(0, pl.light)
        gr.addColorStop(0.7, pl.color)
        gr.addColorStop(1, pl.dark)
        ctx.fillStyle = gr
        ctx.beginPath(); ctx.arc(q[0], q[1], r, 0, TAU); ctx.fill()
        if (wind > 0.05) labels.push({ text: L([pl.en, pl.short || pl.fr]), x: q[0], y: q[1] - r - 7 * uiK, alpha: wind })
      }
      // collision flashes
      ctx.globalCompositeOperation = 'lighter'
      for (const b of bodies) {
        const ang = S.zoneAng[b.g] + b.a
        const q = Pj(b.x * Math.cos(ang), b.x * Math.sin(ang), b.z)
        const size = (0.05 + 0.07 * b.flash) * cam.scale
        ctx.globalAlpha = 0.85 * b.flash
        ctx.drawImage(flashSprite, q[0] - size / 2, q[1] - size / 2, size, size)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'

      // names, once the planets are made
      ctx.font = `800 ${13 * uiK}px ${FONT}`
      ctx.textAlign = 'center'
      const boxes = []
      for (const l of labels) {
        const wl = ctx.measureText(l.text).width + 10
        // step up until clear of the names already placed
        for (let tries = 0; tries < 6; tries++) {
          const hit = boxes.some((b) => Math.abs(b.x - l.x) < (b.w + wl) / 2 && Math.abs(b.y - l.y) < 19 * uiK)
          if (!hit) break
          l.y -= 19 * uiK
        }
        l.x = clamp(l.x, wl / 2 + 4, w - wl / 2 - 4)
        boxes.push({ x: l.x, y: l.y, w: wl })
      }
      for (const l of labels) {
        ctx.globalAlpha = l.alpha
        ctx.fillStyle = 'rgba(2,6,23,0.6)'
        const wtxt = ctx.measureText(l.text).width + 10
        ctx.fillRect(l.x - wtxt / 2, l.y - 14 * uiK, wtxt, 18 * uiK)
        ctx.fillStyle = '#f8fafc'
        ctx.fillText(l.text, l.x, l.y)
      }
      if (wind > 0.3) {
        const ab = Pj(0.405 * Math.cos(-cam.yaw + 2.2), 0.405 * Math.sin(-cam.yaw + 2.2), 0)
        const kb = Pj(0.99 * Math.cos(-cam.yaw + 2.6), 0.99 * Math.sin(-cam.yaw + 2.6), 0)
        ctx.globalAlpha = smoother((wind - 0.3) / 0.5)
        ctx.font = `700 ${12.5 * uiK}px ${FONT}`
        ctx.fillStyle = '#e7d3bd'
        ctx.fillText(L(['asteroid belt', 'ceinture d’astéroïdes']), ab[0], ab[1])
        ctx.fillStyle = '#cfe2f7'
        const kt = L(['Kuiper belt: ice and comets', 'ceinture de Kuiper : glace et comètes'])
        const kw = ctx.measureText(kt).width / 2 + 6
        ctx.fillText(kt, clamp(kb[0], kw, w - kw), clamp(kb[1], 20, h - 140))
      }
      ctx.globalAlpha = 1
      if (shock > 0.05 && shock < 0.95) {
        const q = [cx + (lerp(-2.0, 1.4, shock) - 0.55) * cam.scale, cy + 1.25 * cam.scale]
        ctx.globalAlpha = Math.sin(Math.PI * shock)
        ctx.font = `700 ${13 * uiK}px ${FONT}`
        ctx.fillStyle = '#bfe8ff'
        ctx.textAlign = 'center'
        ctx.fillText(L(['shock wave from an exploding star?', 'onde de choc d’une étoile qui explose ?']), q[0], q[1])
        ctx.globalAlpha = 1
      }
      ctx.fillStyle = 'rgba(203,213,225,0.55)'
      ctx.font = `600 ${11 * uiK}px ${FONT}`
      ctx.textAlign = 'right'
      ctx.fillText(L(['Model: not to scale. Distances squashed.', 'Modèle : pas à l’échelle. Distances écrasées.']), w - 14, h - (u.big ? 128 : 112))

      // tell React which step we are in, and where the scrubber is
      const st = stageAt(s)
      if (now - S.lastUi > 120) {
        S.lastUi = now
        setScrub(s)
        setStage((old) => (old === st ? old : st))
      }
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  // drag to turn, wheel to zoom
  useEffect(() => {
    const canvas = canvasRef.current
    const onWheel = (e) => { e.preventDefault(); const S = sim.current; S.zoom = clamp(S.zoom * Math.exp(-e.deltaY * 0.0015), 0.5, 4) }
    canvas.addEventListener('wheel', onWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', onWheel)
  }, [])
  const onDown = (e) => { canvasRef.current.setPointerCapture(e.pointerId); sim.current.drag = { x: e.clientX, y: e.clientY } }
  const onMove = (e) => {
    const S = sim.current
    if (!S.drag) return
    const dx = e.clientX - S.drag.x, dy = e.clientY - S.drag.y
    S.drag = { x: e.clientX, y: e.clientY }
    S.goal.yaw = S.cam.yaw = S.cam.yaw - dx * 0.006
    S.goal.pitch = S.cam.pitch = clamp(S.cam.pitch + dy * 0.006, -10 * DEG, 89 * DEG)
    setView(null)
  }
  const onUp = () => { sim.current.drag = null }

  const st = STAGES[stage]
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const rich = (txt) => txt.split(/(\*\*.*?\*\*)/g).map((part, i) => (part.startsWith('**')
    ? <strong key={i} className="text-amber-300 font-black">{part.slice(2, -2)}</strong>
    : <span key={i}>{part}</span>))
  const atEnd = scrub >= LAST - 1e-3

  return (
    <div className="flex-1 min-h-0 w-full h-full flex flex-col bg-[#020309] select-none">
      <div ref={wrapRef} className="relative flex-1 min-h-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block touch-none cursor-grab active:cursor-grabbing"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />

        {/* The step, in words */}
        <GlassPanel className={`absolute top-3 left-3 sm:top-4 sm:left-4 ${big ? 'max-w-[34rem] px-6 py-5' : 'max-w-[27rem] px-5 py-4'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center ${big ? 'w-9 h-9 text-lg' : 'w-7 h-7 text-sm'}`}>{stage + 1}</span>
            <span className={`font-black uppercase tracking-[0.18em] text-sky-300 ${big ? 'text-[0.95rem]' : 'text-[0.72rem]'}`}>{L(st.time)}</span>
          </div>
          <div className={`font-black text-white leading-tight ${big ? 'text-[2.1rem]' : 'text-[1.55rem]'}`}>{L(st.title)}</div>
          <p className={`mt-2 text-slate-200 font-semibold leading-snug ${big ? 'text-[1.35rem]' : 'text-[1.02rem]'}`}>{rich(L(st.text))}</p>
        </GlassPanel>

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 pointer-events-none">
          <GlassPanel className="pointer-events-auto mx-auto w-fit max-w-full px-4 py-3 flex flex-col gap-2.5">
            <div className="flex items-center gap-1">
              {STAGES.map((sg, i) => {
                const done = scrub >= i + 1 - 1e-3
                const here = stage === i
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setPlayAll(false); goTo(i) }}
                    className={`flex flex-col items-center gap-1 rounded-xl transition-colors ${big ? 'px-3 py-1.5 min-w-[6.4rem]' : 'px-2 py-1 min-w-[5.2rem]'} ${here ? 'bg-white/10' : 'hover:bg-white/5'}`}
                  >
                    <span className="relative w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <span className="absolute inset-y-0 left-0 bg-amber-400" style={{ width: `${clamp(scrub - i, 0, 1) * 100}%` }} />
                    </span>
                    <span className={`font-bold whitespace-nowrap ${big ? 'text-[0.98rem]' : 'text-[0.78rem]'} ${here ? 'text-amber-300' : done ? 'text-slate-200' : 'text-slate-400'}`}>
                      {i + 1}. {L(sg.short)}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <GlassIconButton big={big} icon={RotateCcw} title={t(lang, 'Start again', 'Recommencer')} onClick={restart} />
              <GlassIconButton big={big} icon={SkipBack} title={t(lang, 'Back a step', 'Étape précédente')} onClick={back} disabled={scrub < 0.01} />
              <GlassIconButton big={big} accent icon={playing ? Pause : Play} title={playing ? t(lang, 'Pause', 'Pause') : t(lang, 'Play', 'Lecture')} onClick={() => setPlaying((p) => !p)} />
              <GlassButton big={big} tone="amber" icon={SkipForward} onClick={next} disabled={atEnd}>{t(lang, 'Next step', 'Étape suivante')}</GlassButton>
              <GlassButton big={big} icon={FastForward} active={playAll} onClick={() => { setPlayAll((v) => !v); setPlaying(true) }}>{t(lang, 'Play it all', 'Tout jouer')}</GlassButton>
              <div className="w-px h-8 bg-white/10 mx-1" />
              <Segmented
                big={big}
                value={view}
                onChange={choosePitch}
                options={[
                  { value: 'top', label: t(lang, 'Above', 'Dessus') },
                  { value: 'tilt', label: t(lang, 'Tilted', 'Inclinée') },
                  { value: 'side', label: t(lang, 'Side', 'Côté') },
                ]}
              />
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  )
}
