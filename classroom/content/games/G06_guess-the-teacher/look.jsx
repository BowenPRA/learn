// content/games/G06_guess-the-teacher/look.jsx
// The look the TV and the phones share, taken from pra.edu.vn: the website's
// pale blue dotted band with a palm frond in each corner, white cards with a
// soft navy shadow, Poppins, and the website's blue, green, gold and coral.
// All CSS here, so the scene is the same in the deck's light and dark modes.
// Sizes on the TV are in container units (widgets.jsx), so one set of rules
// fits a laptop window and a TV.
import { useMemo, useState } from 'react'
import '../../../../src/fonts.css'
import { FONT, VN_FONT } from './protocol.js'
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
@media (prefers-reduced-motion: reduce) {
  .gt-pulse, .gt-ellipsis i { animation: none }
}
`

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
