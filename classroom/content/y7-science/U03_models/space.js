// content/y7-science/U03_models/space.js
// Canvas plumbing shared by the three space models (solar system, formation,
// the Sun): an orbit camera, a sky of stars that turns with it, and sprites.
// No components here — only functions and one hook — so the widget files stay
// component-only for fast refresh.
import { useEffect } from 'react'
import { mulberry32 } from './data.js'

export const DEG = Math.PI / 180
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const smooth = (t) => { const s = clamp(t, 0, 1); return s * s * (3 - 2 * s) }
export const smoother = (t) => { const s = clamp(t, 0, 1); return s * s * s * (s * (s * 6 - 15) + 10) }

// ── The camera ──────────────────────────────────────────────────────────────
// An orthographic orbit camera. `yaw` turns about the vertical (the ecliptic
// pole); `pitch` is how far above the plane we look from — 90° straight down,
// 0° exactly edge-on. Orthographic on purpose: in the side view a flat orbit
// must look like a straight line, with no perspective to fake a tilt.
export function cameraBasis(yaw, pitch) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw)
  const cp = Math.cos(pitch), sp = Math.sin(pitch)
  const right = [cy, sy, 0]
  const u0 = [-sy, cy, 0]
  // toward the viewer, and screen-up
  const toCam = [-cp * u0[0], -cp * u0[1], sp]
  const up = [sp * u0[0], sp * u0[1], cp]
  return { right, up, toCam }
}

/** Screen x, y and depth (toward the viewer) of world point p. */
export function project(p, cam, basis, cx, cy) {
  const dx = p[0] - cam.tx, dy = p[1] - cam.ty, dz = p[2] - cam.tz
  const { right, up, toCam } = basis
  return [
    cx + cam.scale * (dx * right[0] + dy * right[1] + dz * right[2]),
    cy - cam.scale * (dx * up[0] + dy * up[1] + dz * up[2]),
    dx * toCam[0] + dy * toCam[1] + dz * toCam[2],
  ]
}

/** Ease a value toward a goal, frame-rate independent. */
export const approach = (v, goal, rate, dt) => v + (goal - v) * (1 - Math.exp(-rate * dt))

/** Shortest-way ease for an angle. */
export function approachAngle(v, goal, rate, dt) {
  let d = (goal - v) % (2 * Math.PI)
  if (d > Math.PI) d -= 2 * Math.PI
  if (d < -Math.PI) d += 2 * Math.PI
  return v + d * (1 - Math.exp(-rate * dt))
}

// ── The sky ─────────────────────────────────────────────────────────────────
// Stars are DIRECTIONS on a sphere, so when the class drags the view round the
// sky turns with it, the way it would through a real window. A band of faint
// stars along a great circle tilted 60° to the planets stands in for the Milky
// Way (the real galactic plane is tilted about 60° to the ecliptic).
export function makeSky(seed = 7, count = 1400, band = 2600) {
  const rnd = mulberry32(seed)
  const stars = []
  const unit = () => {
    const z = rnd() * 2 - 1, a = rnd() * 2 * Math.PI, r = Math.sqrt(1 - z * z)
    return [r * Math.cos(a), r * Math.sin(a), z]
  }
  const tint = () => {
    const k = rnd()
    return k < 0.12 ? [255, 214, 170] : k < 0.3 ? [190, 215, 255] : k < 0.36 ? [255, 190, 150] : [240, 244, 255]
  }
  for (let i = 0; i < count; i++) {
    const m = Math.pow(rnd(), 3.2) // most stars faint, a few bright
    stars.push({ d: unit(), size: 0.5 + m * 1.9, a: 0.25 + m * 0.75, c: tint(), tw: rnd() * 6.28 })
  }
  // The Milky Way band: a great circle tilted 60° about the x axis.
  const tilt = 60 * DEG
  const glow = []
  for (let i = 0; i < band; i++) {
    const a = rnd() * 2 * Math.PI
    const spread = (rnd() + rnd() + rnd() - 1.5) * 0.22
    const x = Math.cos(a), y = Math.sin(a) * Math.cos(spread), z = Math.sin(spread)
    const d = [x, y * Math.cos(tilt) - z * Math.sin(tilt), y * Math.sin(tilt) + z * Math.cos(tilt)]
    glow.push({ d, size: 0.5 + rnd() * 0.6, a: 0.08 + rnd() * 0.22 })
  }
  const clouds = []
  for (let i = 0; i < 46; i++) {
    const a = rnd() * 2 * Math.PI
    const spread = (rnd() - 0.5) * 0.2
    const x = Math.cos(a), y = Math.sin(a) * Math.cos(spread), z = Math.sin(spread)
    clouds.push({ d: [x, y * Math.cos(tilt) - z * Math.sin(tilt), y * Math.sin(tilt) + z * Math.cos(tilt)], r: 0.08 + rnd() * 0.12, a: 0.035 + rnd() * 0.04 })
  }
  return { stars, glow, clouds }
}

/** Paint the sky for the current view. `f` is the focal length in px. */
export function drawSky(ctx, sky, basis, w, h, t = 0) {
  const g = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75)
  g.addColorStop(0, '#0b1228')
  g.addColorStop(0.6, '#060a18')
  g.addColorStop(1, '#020309')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  const { right, up, toCam } = basis
  const f = Math.max(w, h) * 0.85
  const cx = w / 2, cy = h / 2
  const view = (d) => {
    const fwd = -(d[0] * toCam[0] + d[1] * toCam[1] + d[2] * toCam[2])
    if (fwd <= 0.05) return null
    return [
      cx + (f * (d[0] * right[0] + d[1] * right[1] + d[2] * right[2])) / fwd,
      cy - (f * (d[0] * up[0] + d[1] * up[1] + d[2] * up[2])) / fwd,
    ]
  }

  // soft clouds of the band
  for (const c of sky.clouds) {
    const p = view(c.d)
    if (!p) continue
    const r = c.r * f
    if (p[0] < -r || p[0] > w + r || p[1] < -r || p[1] > h + r) continue
    const gg = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], r)
    gg.addColorStop(0, `rgba(170,180,230,${c.a})`)
    gg.addColorStop(1, 'rgba(170,180,230,0)')
    ctx.fillStyle = gg
    ctx.fillRect(p[0] - r, p[1] - r, 2 * r, 2 * r)
  }
  ctx.fillStyle = '#c9d3ff'
  for (const s of sky.glow) {
    const p = view(s.d)
    if (!p || p[0] < 0 || p[0] > w || p[1] < 0 || p[1] > h) continue
    ctx.globalAlpha = s.a
    ctx.fillRect(p[0], p[1], s.size, s.size)
  }
  for (const s of sky.stars) {
    const p = view(s.d)
    if (!p || p[0] < -2 || p[0] > w + 2 || p[1] < -2 || p[1] > h + 2) continue
    const tw = 0.85 + 0.15 * Math.sin(t * 1.3 + s.tw)
    ctx.globalAlpha = s.a * tw
    ctx.fillStyle = `rgb(${s.c[0]},${s.c[1]},${s.c[2]})`
    if (s.size > 1.6) {
      ctx.beginPath()
      ctx.arc(p[0], p[1], s.size * 0.75, 0, Math.PI * 2)
      ctx.fill()
    } else {
      ctx.fillRect(p[0], p[1], s.size, s.size)
    }
  }
  ctx.globalAlpha = 1
}

// ── Sprites ─────────────────────────────────────────────────────────────────
/** A soft round glow, pre-rendered once so thousands can be drawn cheaply. */
export function glowSprite(rgb, size = 64, hard = 0.0) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gr.addColorStop(0, `rgba(${rgb},1)`)
  gr.addColorStop(Math.max(0.01, hard), `rgba(${rgb},0.75)`)
  gr.addColorStop(0.45, `rgba(${rgb},0.22)`)
  gr.addColorStop(1, `rgba(${rgb},0)`)
  g.fillStyle = gr
  g.fillRect(0, 0, size, size)
  return c
}

// ── Sizing ──────────────────────────────────────────────────────────────────
/**
 * Keep a canvas the size of its wrapper, at the screen's pixel density.
 * `onSize(w, h, dpr)` is called with the CSS size whenever it changes.
 */
export function useCanvasFit(wrapRef, canvasRef, onSize) {
  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return undefined
    const fit = () => {
      const r = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(10, Math.round(r.width)), h = Math.max(10, Math.round(r.height))
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      onSize(w, h, dpr)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [wrapRef, canvasRef, onSize])
}

/** Place labels without overlaps: try right, left, above, below; else skip. */
export function placeLabels(items, measure, bounds, obstacles = []) {
  const placed = [...obstacles]
  const hit = (a) => placed.some((b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y)
  const out = []
  for (const it of items) {
    const w = measure(it.text) + 8
    const h = it.size + 6
    const gap = it.r + 6
    const tries = [
      { x: it.x + gap, y: it.y - h / 2, align: 'left' },
      { x: it.x - gap - w, y: it.y - h / 2, align: 'right' },
      { x: it.x - w / 2, y: it.y - gap - h, align: 'center' },
      { x: it.x - w / 2, y: it.y + gap, align: 'center' },
    ]
    for (const c of tries) {
      const box = { x: c.x, y: c.y, w, h }
      if (box.x < bounds.x0 || box.x + w > bounds.x1 || box.y < bounds.y0 || box.y + h > bounds.y1) continue
      if (it.force || !hit(box)) {
        placed.push(box)
        out.push({ ...it, box })
        break
      }
    }
  }
  return out
}
