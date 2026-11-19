// content/games/G06_guess-the-teacher/look.jsx
// The look the TV and the phones share, taken from pra.edu.vn: the website's
// pale blue dotted band with a palm frond in each corner, white cards with a
// soft navy shadow, Poppins, and the website's blue, green, gold and coral.
// All CSS here, so the scene is the same in the deck's light and dark modes.
// Sizes on the TV are in container units (widgets.jsx), so one set of rules
// fits a laptop window and a TV.
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import '../../../../src/fonts.css'
import { FONT, PTS_MARKS, VN_FONT, markAt } from './protocol.js'
import { TONES } from './staff.js'

export const BASE_CSS = `
.gt { --blue: #116DFF; --blue-deep: #0B4FBF; --blue-ink: #0E2A5C; --blue-pale: #EEF5FF; --blue-tint: #D3E4FF; --blue-light: #7FB2FF;
  --green: #48971D; --green-deep: #2F7D14; --green-pale: #EDF7E3; --green-tint: #D3EDB9; --green-light: #9CC64A; --teal: #1F8F73;
  --sun: #FFC857; --sun-deep: #F5A623; --sun-ink: #7A5000; --sun-pale: #FFF6DE; --sun-tint: #FFE4A0;
  --coral: #FF6F59; --coral-deep: #D2452F; --coral-pale: #FFEEEA; --violet: #7C5CFF;
  --ink: #1B2A41; --ink-soft: #55657A; --line: #E3EAF2; --row: #F5F8FC;
  --shadow-sm: 0 4px 16px rgba(14,42,92,.07); --shadow: 0 14px 36px rgba(14,42,92,.12); --shadow-pop: 0 22px 50px rgba(14,42,92,.2);
  --bounce: cubic-bezier(.34,1.56,.64,1); --ease-out: cubic-bezier(.2,.8,.2,1);
  position: relative; overflow: hidden; color: var(--ink); font-family: ${FONT}; background: var(--blue-pale);
  -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent; }
.gt *, .gt *::before, .gt *::after { box-sizing: border-box }
.gt button, .gt input, .gt select { font-family: inherit }
.gt-vn, .gt-team-name { font-family: ${VN_FONT} }
.gt-vn { font-weight: 500; color: var(--ink-soft) }
.gt-sky { position: absolute; inset: 0; container-type: size; pointer-events: none; overflow: hidden;
  background-image: radial-gradient(var(--blue-tint) 1.5px, transparent 1.6px); background-size: max(22px, 2.9cqmin) max(22px, 2.9cqmin) }
.gt-frond { position: absolute; -webkit-mask: url('/frond.svg') center / contain no-repeat; mask: url('/frond.svg') center / contain no-repeat }
.gt-eyebrow { display: inline-flex; align-items: center; gap: .6em; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; line-height: 1.3;
  color: var(--blue-deep); background: var(--blue-tint); padding: .38em 1em; border-radius: 999px; white-space: nowrap }
.gt-eyebrow::before { content: ''; flex: none; width: .5em; height: .5em; border-radius: 50%; background: currentColor }
.gt-eyebrow.green { color: var(--green-deep); background: var(--green-tint) }
.gt-eyebrow.sun { color: var(--sun-ink); background: var(--sun-tint) }
.gt-eyebrow.coral { color: #B03523; background: #FFD2C9 }
.gt-avatar { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; flex: none; line-height: 1;
  box-shadow: inset 0 0 0 .06em rgba(14,42,92,.08) }
.gt-avatar > span { font-size: .6em; transform: translateY(.02em) }
.gt-card { background: #fff; border: 1px solid var(--line); box-shadow: var(--shadow) }
/* A teacher's card, as on the website's staff page: the cut-out on a two-colour background in a white frame. */
.gt-portrait { position: relative; aspect-ratio: 20 / 23; overflow: hidden; background: linear-gradient(165deg, var(--a), var(--b));
  border: var(--frame, 8px) solid #fff; border-radius: var(--radius, 24px); box-shadow: var(--shadow-pop) }
.gt-portrait::before { content: ''; position: absolute; inset: 0; background: radial-gradient(64% 52% at 50% 26%, rgba(255,255,255,.3), transparent 72%);
  transition: opacity .7s ease }
.gt-portrait img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 0; transition: filter .8s var(--ease-out), opacity .6s }
.gt-portrait-cover { position: absolute; inset: 0; background: linear-gradient(165deg, #D3E4FF, #8FBAFF); opacity: 0; transition: opacity .8s var(--ease-out) }
.gt-portrait.dark .gt-portrait-cover { opacity: 1 }
.gt-portrait.dark img { filter: brightness(0) opacity(.86) }
.gt-portrait.dark .gt-portrait-q { opacity: 1 }
.gt-portrait-q { position: absolute; left: 50%; top: 40%; translate: -50% -50%; font-weight: 800; font-size: var(--q, 64px); color: #fff; opacity: 0;
  transition: opacity .4s; text-shadow: 0 4px 20px rgba(0,0,0,.35) }
.gt-confetti { position: absolute; inset: 0; pointer-events: none; overflow: hidden; container-type: size; z-index: 40 }
.gt-confetti i { position: absolute; top: 0; display: block; animation-name: gt-fall; animation-timing-function: cubic-bezier(.3,.1,.6,1) }
@keyframes gt-fall { 0% { transform: translate3d(0, -8cqh, 0) rotate(0deg) } 100% { transform: translate3d(var(--sway), 112cqh, 0) rotate(var(--rot)) } }
@keyframes gt-pop { 0% { opacity: 0; transform: scale(.4) } 70% { opacity: 1; transform: scale(1.06) } 100% { opacity: 1; transform: scale(1) } }
@keyframes gt-rise { 0% { opacity: 0; transform: translateY(.8em) } 100% { opacity: 1; transform: none } }
@keyframes gt-fade { 0% { opacity: 0 } 100% { opacity: 1 } }
@keyframes gt-stamp { 0% { opacity: 0; transform: scale(1.6) } 60% { opacity: 1; transform: scale(.97) } 100% { opacity: 1; transform: scale(1) } }
@keyframes gt-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.06) } }
@keyframes gt-dot { 0%, 20% { opacity: .15 } 40%, 100% { opacity: 1 } }
.gt-pop { animation: gt-pop .45s var(--bounce) both }
.gt-rise { animation: gt-rise .55s var(--ease-out) both }
.gt-fade { animation: gt-fade .5s ease both }
.gt-stamp { animation: gt-stamp .6s var(--ease-out) both }
.gt-pulse { animation: gt-pulse .9s ease-in-out infinite }
.gt-ellipsis i { font-style: normal; animation: gt-dot 1.2s ease-in-out infinite both }
.gt-ellipsis i:nth-child(2) { animation-delay: .2s }
.gt-ellipsis i:nth-child(3) { animation-delay: .4s }
/* The points: digits that roll like a counter, a meter that drains, a colour by how much is left. */
.gt-odo { display: inline-flex; line-height: 1.2; font-variant-numeric: tabular-nums }
.gt-odo-d { display: inline-block; height: 1.2em; overflow: hidden }
.gt-odo-col { display: flex; flex-direction: column; transition: transform .38s cubic-bezier(.2,.9,.25,1.15) }
.gt-odo-col > span { display: block; height: 1.2em; line-height: 1.2; text-align: center }
.gt-tier { transition: color .5s }
.gt-tier.hi { color: var(--green-deep) }
.gt-tier.mid { color: var(--sun-deep) }
.gt-tier.lo { color: var(--coral-deep) }
/* The points ticker: a mechanical counter, one navy wheel per digit, ticking down. */
.gt-tick { --tk: #fff; display: inline-flex; gap: .07em; line-height: 1; letter-spacing: 0; font-variant-numeric: tabular-nums; transform-origin: 50% 60% }
.gt-tier.hi .gt-tick { --tk: #B6E874 }
.gt-tier.mid .gt-tick { --tk: #FFD166 }
.gt-tier.lo .gt-tick { --tk: #FF9A87 }
.gt-tick-d { position: relative; flex: none; width: .78em; height: 1.18em; overflow: hidden; border-radius: .16em; color: var(--tk);
  background: linear-gradient(180deg, #1A3E7C 0%, #0E2A5C 49%, #0A2251 51%, #13336D 100%);
  box-shadow: inset 0 .04em 0 rgba(255,255,255,.14), inset 0 -.05em .08em rgba(0,0,0,.3), 0 .07em .16em rgba(14,42,92,.28);
  transition: width .4s var(--ease-out), opacity .3s, margin .4s var(--ease-out), color .5s }
.gt-tick-d.off { width: 0; opacity: 0; margin-right: -.07em }
.gt-tick-d::before { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none; border-radius: inherit;
  background: linear-gradient(180deg, rgba(4,14,36,.62) 0%, rgba(4,14,36,0) 30%, rgba(4,14,36,0) 70%, rgba(4,14,36,.62) 100%) }
.gt-tick-d::after { content: ''; position: absolute; left: 0; right: 0; top: 50%; z-index: 2; height: max(1px, .028em); pointer-events: none;
  background: rgba(0,0,0,.42); box-shadow: 0 max(1px, .02em) 0 rgba(255,255,255,.07) }
.gt-tick-s { display: block; will-change: transform }
.gt-tick-s > span { display: block; font-size: .9em; height: calc(1.18em / .9); line-height: calc(1.18em / .9); text-align: center;
  text-shadow: 0 0 .28em color-mix(in srgb, var(--tk) 45%, transparent) }
.gt-meter { position: relative; height: .5em; border-radius: 999px; background: var(--blue-pale); overflow: hidden; box-shadow: inset 0 1px 2px rgba(14,42,92,.12) }
.gt-meter > i { position: absolute; inset: 0; border-radius: inherit; transform-origin: left center; will-change: transform;
  background-image: linear-gradient(180deg, rgba(255,255,255,.45), rgba(255,255,255,0) 60%) }
.gt-meter > b { position: absolute; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,.85) }
@media (prefers-reduced-motion: reduce) {
  .gt-pulse, .gt-ellipsis i { animation: none }
  .gt-odo-col { transition: none }
}
`

/**
 * A number whose digits roll to their new values, like a game-show counter.
 * Each column is keyed by its place (ones, tens…), so a digit rolls rather
 * than jumps; a drop below another hundred gives the whole number a bump.
 */
export function Odometer({ value, className = '' }) {
  const ref = useRef(null)
  const digits = String(Math.max(0, Math.round(value)))
  const hundreds = Math.floor(value / 100)
  const last = useRef(hundreds)
  useEffect(() => {
    if (hundreds < last.current) {
      ref.current?.animate?.(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.12) translateY(-.04em)' }, { transform: 'scale(1)' }],
        { duration: 320, easing: 'cubic-bezier(.2,.9,.3,1.3)' },
      )
    }
    last.current = hundreds
  }, [hundreds])
  return (
    <span ref={ref} className={`gt-odo ${className}`} aria-label={digits} role="text">
      {digits.split('').map((d, i) => (
        <span key={digits.length - i} className="gt-odo-d" aria-hidden="true">
          <span className="gt-odo-col" style={{ transform: `translateY(${-Number(d) * 1.2}em)` }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <span key={n}>{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  )
}

const WHEEL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0] // a 0 at each end, so 0 → 9 rolls on round
const CELL = 1.18 // a digit's height, em
const TICK_MS = 240
const BIG_MS = 650
/** Ease out with a small overshoot: the wheel clicks past and settles. */
const clunk = (t) => {
  const c = 1.7
  const x = t - 1
  return 1 + (c + 1) * x * x * x + c * x * x
}
const calm = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * A number on a mechanical counter: one wheel per digit, read through a
 * window. Each step down rolls the wheel down one digit with a small click,
 * and the wheel to its left turns with it as it passes 0, as on a real
 * counter. `step` (10 for points) is the smallest change: its zeros are fixed
 * wheels. `max` sets how many wheels there are; a wheel that would show a
 * leading 0 folds away. With `getValue` the counter reads the value every
 * screen frame, and `value` is what it shows until then.
 */
export function Ticker({ value, getValue, step = 10, max = value, className = '' }) {
  const unit = Math.max(1, step)
  const fixed = Math.max(0, Math.round(Math.log10(unit)))
  const moving = String(Math.max(1, Math.round(max / unit))).length
  const root = useRef(null)
  const wheels = useRef([])
  const read = useRef(getValue)
  const fallback = useRef(value)
  useEffect(() => { read.current = getValue }, [getValue])
  useEffect(() => { fallback.current = value }, [value])

  useLayoutEffect(() => {
    const target = () => Math.max(0, Math.round((read.current ? read.current() : fallback.current) / unit))
    const still = calm()
    const start = target()
    const s = { from: start, to: start, w: start, t0: 0, dur: TICK_MS, last: 0, hundreds: Math.floor((start * unit) / 100) }
    const paint = () => {
      for (let i = 0; i < moving; i++) {
        const tile = wheels.current[i]
        if (!tile) continue
        const p = 10 ** i
        const whole = Math.floor(s.w / p)
        // The wheel turns with the one to its right only while that one passes 0.
        const turn = whole + Math.max(0, s.w - whole * p - (p - 1))
        const at = ((turn % 10) + 10) % 10
        tile.firstChild.style.transform = `translateY(${(-at * CELL).toFixed(4)}em)`
        tile.classList.toggle('off', i > 0 && s.to < p)
      }
    }
    paint()
    let frame = 0
    const draw = (now) => {
      const v = target()
      if (v !== s.to) {
        // Quick ticks roll quicker, so the wheel is never behind.
        const gap = s.last ? now - s.last : Infinity
        s.dur = Math.abs(v - s.w) > 1.5 ? BIG_MS : Math.max(90, Math.min(TICK_MS, gap * 0.8))
        s.from = s.w
        s.to = v
        s.t0 = now
        s.last = now
        const hundreds = Math.floor((v * unit) / 100)
        if (hundreds < s.hundreds && !still) {
          root.current?.animate?.(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.08) translateY(-.03em)' }, { transform: 'scale(1)' }],
            { duration: 300, easing: 'cubic-bezier(.2,.9,.3,1.3)' },
          )
        }
        s.hundreds = hundreds
      }
      const k = still ? 1 : Math.min(1, (now - s.t0) / s.dur)
      const w = k >= 1 ? s.to : s.from + (s.to - s.from) * clunk(k)
      if (w !== s.w) {
        s.w = w
        paint()
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [unit, moving])

  const shown = Math.max(0, Math.round(value / unit) * unit)
  return (
    <span ref={root} className={`gt-tick ${className}`} role="img" aria-label={String(shown)}>
      {Array.from({ length: moving }, (_, j) => moving - 1 - j).map((i) => (
        <span key={i} ref={(el) => { wheels.current[i] = el }} className="gt-tick-d" aria-hidden="true">
          <span className="gt-tick-s">{WHEEL.map((n, k) => <span key={k}>{n}</span>)}</span>
        </span>
      ))}
      {Array.from({ length: fixed }, (_, k) => (
        <span key={`z${k}`} className="gt-tick-d" aria-hidden="true"><span className="gt-tick-s"><span>0</span></span></span>
      ))}
    </span>
  )
}

/** Green at full, through gold, to coral when nearly empty. */
const meterColor = (share) => `hsl(${Math.round(8 + 92 * Math.max(0, Math.min(1, share)))} 72% 50%)`

/**
 * The points meter: drains on every screen frame (`getShare()` gives 1 to 0),
 * with `share` as the value to show between frames or while frames are paused.
 * Marks at 800, 600 and 400 points (PTS_MARKS).
 */
export function Meter({ share, getShare, className = '', style }) {
  const fill = useRef(null)
  const read = useRef(getShare)
  useEffect(() => { read.current = getShare }, [getShare])
  useEffect(() => {
    let frame = 0
    const draw = () => {
      const k = Math.max(0, Math.min(1, read.current?.() ?? 0))
      if (fill.current) {
        fill.current.style.transform = `scaleX(${k})`
        fill.current.style.backgroundColor = meterColor(k)
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [])
  const k = Math.max(0, Math.min(1, share))
  return (
    <div className={`gt-meter ${className}`} style={style} aria-hidden="true">
      <i ref={fill} style={{ transform: `scaleX(${k})`, backgroundColor: meterColor(k) }} />
      {PTS_MARKS.map((p) => <b key={p} style={{ left: `${markAt(p) * 100}%` }} />)}
    </div>
  )
}

// A small seeded random, so the confetti falls the same way on every render.
function seeded(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** The stage behind everything: the website's dotted band and two palm fronds. */
export function Backdrop() {
  return (
    <div className="gt-sky" aria-hidden="true">
      <div className="gt-frond" style={{ width: '62cqmin', height: '62cqmin', right: '-15cqmin', bottom: '-17cqmin', background: 'var(--blue-tint)', transform: 'scaleX(-1)' }} />
      <div className="gt-frond" style={{ width: '44cqmin', height: '44cqmin', left: '-13cqmin', top: '12cqmin', background: 'var(--green-tint)', opacity: 0.75 }} />
    </div>
  )
}

const CONFETTI_COLORS = ['#116DFF', '#48971D', '#FFC857', '#FF6F59', '#7C5CFF', '#1F8F73', '#7FB2FF', '#9CC64A']

/** Confetti over the whole scene: one burst, or a steady fall (`rain`). Change `seed` to fire again. */
export function Confetti({ count = 110, rain = false, seed = 1 }) {
  const bits = useMemo(() => {
    const r = seeded(seed * 97 + count)
    return Array.from({ length: count }, () => {
      const w = 0.6 + r() * 0.9
      const round = r() < 0.25
      return {
        left: `${r() * 100}%`,
        width: `${w}cqmin`,
        height: `${round ? w : w * (1.5 + r())}cqmin`,
        radius: round ? '999px' : '2px',
        color: CONFETTI_COLORS[Math.floor(r() * CONFETTI_COLORS.length)],
        dur: `${(rain ? 5.5 : 2.8) + r() * 2.4}s`,
        delay: `${rain ? -r() * 7 : r() * 0.5}s`,
        sway: `${(r() - 0.5) * 30}cqw`,
        rot: `${(r() - 0.5) * 1440}deg`,
      }
    })
  }, [count, rain, seed])
  return (
    <div className="gt-confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <i
          key={i}
          style={{
            left: b.left, width: b.width, height: b.height, borderRadius: b.radius, background: b.color,
            animationDuration: b.dur, animationDelay: b.delay, animationIterationCount: rain ? 'infinite' : 1,
            animationFillMode: rain ? 'none' : 'both', '--sway': b.sway, '--rot': b.rot,
          }}
        />
      ))}
    </div>
  )
}

/** A team's animal in a circle of its colour. `size` is any CSS length. */
export function Avatar({ emoji, color, size, className = '', style }) {
  return (
    <span className={`gt-avatar ${className}`} style={{ width: size, height: size, fontSize: size, background: color, ...style }}>
      <span>{emoji}</span>
    </span>
  )
}

/**
 * A teacher's card from pra.edu.vn: the cut-out portrait on its two-colour
 * background. `dark` draws the silhouette only (the drumroll). If the picture
 * cannot be loaded the card hides itself (`onFail` says so).
 */
export function Portrait({ src, tone = 0, dark = false, className = '', style, onFail }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  const [a, b] = TONES[tone % TONES.length] || TONES[0]
  return (
    <div className={`gt-portrait ${dark ? 'dark' : ''} ${className}`} style={{ '--a': a, '--b': b, ...style }}>
      <span className="gt-portrait-cover" aria-hidden="true" />
      <img src={src} alt="" draggable={false} onError={() => { setFailed(true); onFail?.() }} />
      <span className="gt-portrait-q" aria-hidden="true">?</span>
    </div>
  )
}
