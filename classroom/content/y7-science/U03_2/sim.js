// content/y7-science/U03_2/sim.js
// The tiny gravity model behind StillCloud and SpinningCloud (widgets.jsx).
//
// A flat cloud of identical dust grains. Every grain pulls on every other one
// (Newton's law, softened so two grains never fling each other off), and two
// grains that touch stick together: one clump, its mass the sum of theirs.
// That is all. The book's chain — more mass, stronger gravity, pulls in even
// more — is not programmed in anywhere; it happens.
//
// Two clouds:
//   still     no spin, grains spread evenly. Clumps grow, the biggest grows
//             faster and faster, and it sweeps up everything: one star.
//   spinning  the cloud turns slowly, like a wheel, and is a little denser in
//             the middle. The middle still makes a star, but the grains further
//             out keep going round it, all the same way, and stick into a few
//             planets. (The two clouds differ in more than spin — a uniform
//             spinning cloud makes planets as big as its star. The teacher
//             plan lists it as a limitation, for a student who asks.)
//
// THE SPINNING RUN STOPS AT MODEL SECOND 16 (stopAt). With only 240 grains and
// no gas, the planets do not stay put for ever: left running, one falls into
// the star at about 21 s, another at about 25 s, and the last is flung out of
// the picture. At 16 s the star is 183 grains and four planets (20, 10, 10 and
// 7 grains) are going round it anticlockwise, all inside the frame — the end
// the lesson needs. The still run ends when only one clump is left.
//
// Everything is deterministic: a seeded random generator and a fixed time step,
// so the class sees the same film every time, whatever the screen's frame rate,
// and it was tuned in Node before it reached the projector (seeds and settings
// below were chosen from a sweep). Units are SVG pixels and seconds of model time.

export const N_GRAINS = 240
export const CLOUD_R = 170 // px, the radius of the starting cloud
export const ESCAPE_R = 236 // px: a small grain thrown further than this has left the picture
export const G = 520
export const SOFT = 6 // px of softening, so a close pass never slingshots
export const DT = 1 / 120 // model seconds per step
export const STAR_MASS = 70 // a clump this heavy lights up as a star

// Radius of a clump on screen and for sticking: its area grows with its mass.
export const radiusOf = (m) => 2.2 * Math.sqrt(m) + 0.8

// mulberry32: a small seeded random number generator.
function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// conc: 0.5 spreads grains evenly over the disc; higher packs the middle.
// speed: model seconds per real second on the projector.
// stopAt: model second the run ends (null: when one clump is left).
export const CLOUDS = {
  still: { seed: 7, spin: 0, jiggle: 9, conc: 0.5, speed: 0.6, plotFor: 8, stopAt: null },
  spinning: { seed: 7, spin: 0.9, jiggle: 5, conc: 1.1, speed: 1.4, plotFor: 12, stopAt: 16 },
}

/** Has this cloud's run reached its end? */
export function isFinished(state, kind) {
  const { stopAt } = CLOUDS[kind]
  return stopAt === null ? state.grains.length === 1 : state.t >= stopAt
}

/** A fresh cloud of grains, nearly at rest (or turning slowly). */
export function makeCloud(kind) {
  const { seed, spin, jiggle, conc } = CLOUDS[kind]
  const rand = rng(seed)
  const grains = []
  while (grains.length < N_GRAINS) {
    const r = CLOUD_R * Math.pow(rand(), conc)
    const a = rand() * Math.PI * 2
    grains.push({ id: grains.length, x: r * Math.cos(a), y: r * Math.sin(a), vx: 0, vy: 0, m: 1 })
  }
  if (spin) {
    for (const g of grains) {
      const r = Math.hypot(g.x, g.y) || 1
      // The whole cloud turns together, like a wheel: the outside fastest.
      // Anticlockwise on the screen.
      const v = spin * Math.sqrt((G * N_GRAINS) / CLOUD_R) * (r / CLOUD_R)
      g.vx = (g.y / r) * v
      g.vy = (-g.x / r) * v
    }
  }
  for (const g of grains) {
    g.vx += (rand() * 2 - 1) * jiggle
    g.vy += (rand() * 2 - 1) * jiggle
  }
  // No drift: the cloud as a whole sits still in the middle of the picture.
  const mean = (k) => grains.reduce((s, g) => s + g[k], 0) / grains.length
  const [mx, my, mvx, mvy] = ['x', 'y', 'vx', 'vy'].map(mean)
  for (const g of grains) {
    g.x -= mx
    g.y -= my
    g.vx -= mvx
    g.vy -= mvy
  }
  return { t: 0, grains }
}

function accelerations(gs) {
  const n = gs.length
  const ax = new Float64Array(n)
  const ay = new Float64Array(n)
  const s2 = SOFT * SOFT
  for (let i = 0; i < n; i++) {
    const a = gs[i]
    for (let j = i + 1; j < n; j++) {
      const b = gs[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const d2 = dx * dx + dy * dy + s2
      const inv = G / (d2 * Math.sqrt(d2))
      ax[i] += dx * inv * b.m
      ay[i] += dy * inv * b.m
      ax[j] -= dx * inv * a.m
      ay[j] -= dy * inv * a.m
    }
  }
  return [ax, ay]
}

// Grains that touch become one clump, keeping their momentum. The clump keeps
// the id of the heavier part, so a growing planet keeps its trail.
function stick(gs) {
  let merged = true
  while (merged) {
    merged = false
    outer: for (let i = 0; i < gs.length; i++) {
      for (let j = i + 1; j < gs.length; j++) {
        const a = gs[i]
        const b = gs[j]
        const reach = radiusOf(a.m) + radiusOf(b.m)
        const dx = b.x - a.x
        const dy = b.y - a.y
        if (dx * dx + dy * dy < reach * reach) {
          const m = a.m + b.m
          gs[i] = {
            id: a.m >= b.m ? a.id : b.id,
            x: (a.x * a.m + b.x * b.m) / m,
            y: (a.y * a.m + b.y * b.m) / m,
            vx: (a.vx * a.m + b.vx * b.m) / m,
            vy: (a.vy * a.m + b.vy * b.m) / m,
            m,
          }
          gs.splice(j, 1)
          merged = true
          break outer
        }
      }
    }
  }
}

/** Advance the cloud by one fixed step, in place. */
export function step(state) {
  let gs = state.grains
  let [ax, ay] = accelerations(gs)
  for (let i = 0; i < gs.length; i++) {
    gs[i].vx += 0.5 * DT * ax[i]
    gs[i].vy += 0.5 * DT * ay[i]
    gs[i].x += DT * gs[i].vx
    gs[i].y += DT * gs[i].vy
  }
  ;[ax, ay] = accelerations(gs)
  for (let i = 0; i < gs.length; i++) {
    gs[i].vx += 0.5 * DT * ax[i]
    gs[i].vy += 0.5 * DT * ay[i]
  }
  stick(gs)
  state.grains = gs.filter((g) => Math.hypot(g.x, g.y) < ESCAPE_R || g.m >= 3)
  state.t += DT
}

/** Two steps: the Node tuning harness's frame. */
export const STEPS_PER_FRAME = 2
export function stepFrame(state) {
  for (let k = 0; k < STEPS_PER_FRAME; k++) step(state)
  return state
}

/** The heaviest clump. */
export function biggest(state) {
  let best = state.grains[0]
  for (const g of state.grains) if (g.m > best.m) best = g
  return best
}
