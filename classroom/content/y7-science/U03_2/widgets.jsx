// content/y7-science/U03_2/widgets.jsx
// Widgets for 3.2 Formation of the Solar System. English and French only (the
// deck sets meta.vietnamese: false), so every string goes through t(lang, en, fr).
// Each one does a thing a still slide cannot:
//
//   StarBirth      NASA's Webb animation "Exploring Star and Planet Formation"
//                  (2022, public domain), trimmed into the unit so it plays on
//                  school wifi or none. Three buttons play exactly three parts,
//                  cut at the film's own scene changes, so the class predicts
//                  between them: 1 the cloud (0–29.2 s), 2 a new star and its
//                  disc (29.2–52.9 s), 3 planets (52.9–84.0 s). Times checked
//                  against NASA's caption file and frame grabs of the trimmed file.
//                  NASA's own English captions play with it (a <track>, moved
//                  3.5 s earlier to match the trim): the narration is hard
//                  English over music.
//
//   StillCloud     The book's chain — more mass, stronger gravity, pulls in even
//                  more — as a model that MOVES. 240 dust grains pull on each
//                  other and stick when they touch (sim.js). A graph beside it
//                  draws the mass of the biggest clump: the line bends upwards,
//                  faster and faster, and everything ends as one star.
//   SpinningCloud  The same model with the cloud turning: no graph, the whole
//                  stage for the dust, so the planets' trails read from the
//                  back. It stops at model second 16 (sim.js says why) on a star
//                  with four planets going round it the same way.
//                  The model is also the class's own example of a MODEL for the
//                  Think like a scientist questions: a strength (millions of
//                  years in seconds) and limitations (flat, 240 grains, no gas,
//                  no heat; and, in the plan, the two clouds started differently).
//
// The model stages are one wide SVG with a white plate, so their text scales
// with the panel and reads on a light or dark slide; only the buttons are HTML.
// Sizes were checked against the French strings, the longer of the two.
import { useState, useEffect, useRef } from 'react'
import { Cloud, Sun, Orbit, Play, Pause, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { CLOUDS, DT, N_GRAINS, STAR_MASS, makeCloud, step, biggest, radiusOf, isFinished } from './sim.js'
import starbirth from './images/starbirth.webm'
import starbirthPoster from './images/starbirth-poster.jpg'
import starbirthCaptions from './images/starbirth-captions.vtt?url'

const t = (lang, en, fr) => tr(lang, en, null, fr)

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const DUST = '#9c7a54'
const CLUMP = '#4f7fae'
const SUNFILL = '#f6c445'
const SUNLINE = '#c98a0a'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    slate: 'bg-slate-500 border-slate-700',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${tones[tone]}`}
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={3} />}
      {children}
    </button>
  )
}

/* ============================================================= *
 * THE FILM — three parts, a prediction between each
 * ============================================================= */
// No Stage and no extra frame: `showcase` already wraps the media in a padded
// panel. The frame is sized from the HEIGHT it is given and centred.
const PARTS = [
  { start: 0, end: 29.2, en: '1 · The cloud', fr: '1 · Le nuage', icon: Cloud },
  { start: 29.2, end: 52.9, en: '2 · A new star', fr: '2 · Une étoile', icon: Sun },
  { start: 52.9, end: 84, en: '3 · Planets', fr: '3 · Les planètes', icon: Orbit },
]

export function StarBirth({ lang = 'en' }) {
  const video = useRef(null)
  const stopAt = useRef(null)
  const raf = useRef(0)
  const [part, setPart] = useState(null)

  // While a part plays, watch the clock every frame and stop at its end.
  const watch = () => {
    const el = video.current
    if (!el) return
    if (stopAt.current !== null && el.currentTime >= stopAt.current) {
      el.pause()
      stopAt.current = null
      return
    }
    if (!el.paused) raf.current = requestAnimationFrame(watch)
  }
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const play = (i) => {
    const el = video.current
    if (!el) return
    cancelAnimationFrame(raf.current)
    el.currentTime = PARTS[i].start
    stopAt.current = PARTS[i].end - 0.05
    setPart(i)
    el.play().then(() => { raf.current = requestAnimationFrame(watch) }).catch(() => {})
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="h-full max-w-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: '16 / 9' }}>
          <video
            ref={video}
            className="w-full h-full object-contain"
            src={starbirth}
            poster={starbirthPoster}
            controls
            playsInline
            preload="auto"
            onPlay={() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(watch) }}
            aria-label={t(lang, 'Animation: how stars and planets form (NASA, ESA, CSA, STScI)', 'Animation : comment se forment les étoiles et les planètes (NASA, ESA, CSA, STScI)')}
          >
            <track kind="captions" src={starbirthCaptions} srcLang="en" label="English" default />
          </video>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        {PARTS.map((p, i) => (
          <Btn key={p.en} tone={part === i ? 'orange' : 'slate'} icon={p.icon} onClick={() => play(i)}>{t(lang, p.en, p.fr)}</Btn>
        ))}
      </div>
    </div>
  )
}

/* ============================================================= *
 * THE CLUMP MODEL — dust grains, gravity, and sticking
 * ============================================================= */
// Still: the dust on the left, the graph on the right. Spinning: the whole
// stage for the dust, drawn a little larger, so the trails read from the back.
const LAYOUT = {
  still: { arena: { x: 16, y: 16, w: 520, h: 408 }, scale: 1, graph: true },
  spinning: { arena: { x: 16, y: 16, w: 1088, h: 408 }, scale: 1.15, graph: false },
}
const G_LEFT = 628 // graph plot area
const G_RIGHT = 1072
const G_TOP = 232
const G_BOTTOM = 380
const TRAIL_EVERY = 4 // steps between trail points
const TRAIL_LEN = 80

// The running model lives in a ref (it is mutated every step); what the SVG
// draws is a copied snapshot in state, taken once per animation frame.
function newEngine(kind) {
  return { kind, sim: makeCloud(kind), hist: [[0, 1]], trails: new Map(), steps: 0, acc: 0, last: 0 }
}
const done = (e) => isFinished(e.sim, e.kind)
function snapshot(e) {
  const s = e.sim
  const big = biggest(s)
  const alive = new Set(s.grains.map((g) => g.id))
  return {
    grains: s.grains.map((g) => ({ id: g.id, x: g.x, y: g.y, m: g.m })),
    big: { id: big.id, x: big.x, y: big.y, m: big.m },
    hist: e.hist.slice(),
    trails: [...e.trails.entries()].filter(([id]) => alive.has(id) && id !== big.id).map(([id, pts]) => [id, pts.slice()]),
    steps: e.steps,
    done: done(e),
  }
}

function ClumpModel({ lang, kind }) {
  const cfg = CLOUDS[kind]
  const { arena, scale, graph } = LAYOUT[kind]
  const cx = arena.x + arena.w / 2
  const cy = arena.y + arena.h / 2
  const X = (x) => (cx + x * scale).toFixed(1)
  const Y = (y) => (cy + y * scale).toFixed(1)
  const engine = useRef(null)
  const raf = useRef(0)
  const [view, setView] = useState(() => snapshot(newEngine(kind)))
  const [running, setRunning] = useState(false)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  // Fixed steps, as many as the clock asks for, and never past the end: the
  // run finishes on exactly the same frame on every screen.
  const advance = (e, now) => {
    const real = Math.min(0.05, (now - e.last) / 1000)
    e.last = now
    e.acc += real * cfg.speed
    const s = e.sim
    let n = 0
    while (e.acc >= DT && n < 14 && !done(e)) {
      step(s)
      e.acc -= DT
      n++
      e.steps++
      if (e.steps % TRAIL_EVERY === 0) {
        const b = biggest(s)
        if (s.t <= cfg.plotFor + 0.2) e.hist.push([s.t, b.m])
        for (const g of s.grains) {
          if (g.m < 4 || g === b) continue
          const pts = e.trails.get(g.id) || []
          pts.push([g.x, g.y])
          if (pts.length > TRAIL_LEN) pts.shift()
          e.trails.set(g.id, pts)
        }
      }
    }
  }

  const start = () => {
    if (!engine.current) engine.current = newEngine(kind)
    const e = engine.current
    if (done(e)) return
    cancelAnimationFrame(raf.current)
    const loop = (now) => {
      advance(e, now)
      setView(snapshot(e))
      if (done(e)) { setRunning(false); return }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame((now) => { e.last = now; raf.current = requestAnimationFrame(loop) })
    setRunning(true)
  }
  const pause = () => { cancelAnimationFrame(raf.current); setRunning(false) }
  const reset = () => {
    cancelAnimationFrame(raf.current)
    engine.current = newEngine(kind)
    setRunning(false)
    setView(snapshot(engine.current))
  }

  const big = view.big
  const isStar = big.m >= STAR_MASS
  const gx = (tt) => G_LEFT + (Math.min(tt, cfg.plotFor) / cfg.plotFor) * (G_RIGHT - G_LEFT)
  const gy = (m) => G_BOTTOM - (m / N_GRAINS) * (G_BOTTOM - G_TOP)
  const line = view.hist.map(([tt, m]) => `${gx(tt).toFixed(1)},${gy(m).toFixed(1)}`).join(' ')

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet" role="img"
          aria-label={t(lang, 'A model: dust grains pull on each other and stick together', 'Un modèle : des grains de poussière s’attirent et se collent')}>
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />
          <defs>
            <clipPath id={`u32-arena-${kind}`}><rect x={arena.x} y={arena.y} width={arena.w} height={arena.h} rx="14" /></clipPath>
          </defs>
          <rect x={arena.x} y={arena.y} width={arena.w} height={arena.h} rx="14" fill="#fbfaf7" stroke={RULE} strokeWidth="2" />

          <g clipPath={`url(#u32-arena-${kind})`}>
            {view.trails.map(([id, pts]) => (
              <polyline key={`t${id}`} points={pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')}
                fill="none" stroke={CLUMP} strokeOpacity="0.5" strokeWidth={graph ? 4 : 6} strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {isStar && <circle cx={X(big.x)} cy={Y(big.y)} r={(radiusOf(big.m) + 12) * scale} fill={SUNFILL} fillOpacity="0.3" />}
            {view.grains.map((g) => {
              const star = g.id === big.id && isStar
              const clump = g.m >= 4
              return (
                <circle key={g.id} cx={X(g.x)} cy={Y(g.y)} r={Math.max(3.6, radiusOf(g.m) * scale * (clump && !star && !graph ? 1.3 : 1))}
                  fill={star ? SUNFILL : clump ? CLUMP : DUST}
                  stroke={star ? SUNLINE : clump ? INK : 'none'} strokeWidth={star ? 3 : 1.5} />
              )
            })}
          </g>

          {graph && (
            <>
              <text x="572" y="58" fontFamily={FONT} fontSize="24" fontWeight="bold" fill={MUTED}>{t(lang, 'Biggest clump', 'Le plus gros amas')}</text>
              <text x="572" y="128" fontFamily={FONT} fontWeight="bold" fill={isStar ? KEY : INK}>
                <tspan fontSize="62">{big.m}</tspan>
                <tspan fontSize="26" dx="12">{big.m === 1 ? t(lang, 'grain', 'grain') : t(lang, 'grains', 'grains')}</tspan>
              </text>
              {isStar && (
                <text x="1088" y="122" fontFamily={FONT} fontSize="30" fontWeight="bold" fill={KEY} textAnchor="end">{t(lang, 'A star!', 'Une étoile !')}</text>
              )}

              <text x="572" y="206" fontFamily={FONT} fontSize="20" fontWeight="bold" fill={MUTED}>{t(lang, 'Mass of the biggest clump', 'Masse du plus gros amas')}</text>
              {[0, 120, 240].map((m) => (
                <g key={m}>
                  <line x1={G_LEFT} y1={gy(m)} x2={G_RIGHT} y2={gy(m)} stroke={m === 0 ? INK : RULE} strokeWidth={m === 0 ? 2.5 : 1.5} />
                  <text x={G_LEFT - 10} y={gy(m) + 6} fontFamily={FONT} fontSize="17" fill={MUTED} textAnchor="end">{m}</text>
                </g>
              ))}
              <line x1={G_LEFT} y1={G_TOP - 8} x2={G_LEFT} y2={G_BOTTOM} stroke={INK} strokeWidth="2.5" />
              <polyline points={line} fill="none" stroke={KEY} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
              <text x={G_RIGHT} y="414" fontFamily={FONT} fontSize="19" fill={MUTED} textAnchor="end">{t(lang, 'time →', 'temps →')}</text>
            </>
          )}
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        {running
          ? <Btn tone="teal" icon={Pause} onClick={pause}>{t(lang, 'Pause', 'Pause')}</Btn>
          : <Btn tone="orange" icon={Play} disabled={view.done} onClick={start}>{t(lang, 'Start', 'Démarrer')}</Btn>}
        <Btn tone="slate" icon={RotateCcw} disabled={view.steps === 0} onClick={reset}>{t(lang, 'Reset', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

export function StillCloud({ lang = 'en' }) {
  return <ClumpModel lang={lang} kind="still" />
}

export function SpinningCloud({ lang = 'en' }) {
  return <ClumpModel lang={lang} kind="spinning" />
}
