// content/games/G06_guess-the-teacher/look.jsx
// The look the TV and the phones share: a deep blue-violet stage with faint
// emojis drifting up it, white cards, yellow titles, a team's avatar in its
// colour, and confetti. All CSS here, so the scene is the same in the deck's
// light and dark modes. Sizes inside the scene are in container units, so the
// same rules fit a laptop window, a TV and a phone.
import { useMemo } from 'react'
import { FONT } from './protocol.js'

export const BASE_CSS = `
.gt { position: relative; overflow: hidden; color: #fff; font-family: ${FONT};
  background: radial-gradient(130% 100% at 50% -10%, #6366f1 0%, #4338ca 28%, #2e1f8f 58%, #160d4d 85%, #0d0833 100%);
  -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent; }
.gt *, .gt *::before, .gt *::after { box-sizing: border-box }
.gt button { font-family: inherit }
.gt-sky { position: absolute; inset: 0; container-type: size; pointer-events: none; overflow: hidden }
.gt-beams { position: absolute; left: 50%; top: -60%; width: 200cqmax; height: 200cqmax; margin-left: -100cqmax;
  background: conic-gradient(from 0deg, transparent 0 8%, rgba(255,255,255,.05) 10% 13%, transparent 15% 33%, rgba(255,255,255,.04) 35% 38%, transparent 40% 58%, rgba(255,255,255,.05) 60% 63%, transparent 65% 83%, rgba(255,255,255,.04) 85% 88%, transparent 90%);
  animation: gt-spin 90s linear infinite }
.gt-drift { position: absolute; bottom: -12cqh; line-height: 1; animation: gt-drift linear infinite; will-change: transform }
.gt-title { color: #fde047; font-weight: 800; line-height: .95; letter-spacing: -.01em;
  text-shadow: 0 .07em 0 #7c3aed, 0 .14em .3em rgba(0,0,0,.35) }
.gt-avatar { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; flex: none; line-height: 1;
  box-shadow: inset 0 -.12em 0 rgba(0,0,0,.18), 0 .08em .25em rgba(0,0,0,.25) }
.gt-avatar > span { font-size: .62em; transform: translateY(.03em) }
.gt-confetti { position: absolute; inset: 0; pointer-events: none; overflow: hidden; container-type: size; z-index: 40 }
.gt-confetti i { position: absolute; top: 0; display: block; animation-name: gt-fall; animation-timing-function: cubic-bezier(.3,.1,.6,1) }
@keyframes gt-spin { to { transform: rotate(360deg) } }
@keyframes gt-drift { 0% { transform: translateY(0) rotate(0deg) } 100% { transform: translateY(-135cqh) rotate(var(--turn, 30deg)) } }
@keyframes gt-fall { 0% { transform: translate3d(0, -8cqh, 0) rotate(0deg) } 100% { transform: translate3d(var(--sway), 112cqh, 0) rotate(var(--rot)) } }
@keyframes gt-pop { 0% { opacity: 0; transform: scale(.3) } 60% { opacity: 1; transform: scale(1.12) } 100% { opacity: 1; transform: scale(1) } }
@keyframes gt-rise { 0% { opacity: 0; transform: translateY(1.2em) } 100% { opacity: 1; transform: none } }
@keyframes gt-bob { 0%, 100% { transform: translateY(0) rotate(-4deg) } 50% { transform: translateY(-.12em) rotate(4deg) } }
@keyframes gt-shake { 0%, 100% { transform: translateX(0) } 20%, 60% { transform: translateX(-.5em) } 40%, 80% { transform: translateX(.5em) } }
@keyframes gt-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.08) } }
@keyframes gt-stamp { 0% { opacity: 0; transform: scale(2.4) rotate(-8deg) } 55% { opacity: 1; transform: scale(.92) rotate(-2deg) } 78% { transform: scale(1.04) rotate(-2deg) } 100% { opacity: 1; transform: scale(1) rotate(-2deg) } }
@keyframes gt-blink { 0%, 100% { opacity: 1 } 50% { opacity: .35 } }
@keyframes gt-glow { 0%, 100% { box-shadow: 0 0 0 .12em rgba(253,224,71,.0), 0 .3em 0 #b45309 } 50% { box-shadow: 0 0 0 .3em rgba(253,224,71,.45), 0 .3em 0 #b45309 } }
.gt-pop { animation: gt-pop .45s cubic-bezier(.2,.9,.3,1.3) both }
.gt-rise { animation: gt-rise .5s ease-out both }
.gt-bob { display: inline-block; animation: gt-bob 2.4s ease-in-out infinite }
.gt-shake { animation: gt-shake .45s ease-in-out both }
.gt-pulse { animation: gt-pulse .9s ease-in-out infinite }
.gt-stamp { animation: gt-stamp .6s cubic-bezier(.2,.9,.3,1.2) both }
.gt-blink { animation: gt-blink 1.2s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .gt-beams, .gt-drift, .gt-bob, .gt-pulse, .gt-blink { animation: none }
}
`

// A small seeded random, so the drifting emojis and the confetti are laid out
// the same on every render.
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

const DRIFT = ['📚', '✏️', '🎨', '🔬', '🌍', '🎵', '⚽', '💡', '⭐', '🧠', '🎒', '📐', '🍎', '🎉', '❓', '😄']

/** The stage behind everything: slow beams and emojis drifting up. */
export function Backdrop({ count = 16 }) {
  const bits = useMemo(() => {
    const r = seeded(7)
    return Array.from({ length: count }, (_, i) => {
      const dur = 26 + r() * 30
      return {
        e: DRIFT[i % DRIFT.length],
        left: `${(i / count) * 100 + r() * (100 / count)}%`,
        size: `${4 + r() * 5}cqmin`,
        dur: `${dur}s`,
        delay: `${-r() * dur}s`,
        turn: `${(r() - 0.5) * 80}deg`,
        opacity: 0.07 + r() * 0.07,
      }
    })
  }, [count])
  return (
    <div className="gt-sky" aria-hidden="true">
      <div className="gt-beams" />
      {bits.map((b, i) => (
        <span
          key={i}
          className="gt-drift"
          style={{ left: b.left, fontSize: b.size, animationDuration: b.dur, animationDelay: b.delay, opacity: b.opacity, '--turn': b.turn }}
        >
          {b.e}
        </span>
      ))}
    </div>
  )
}

const CONFETTI_COLORS = ['#fde047', '#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#fb923c', '#ffffff']

/** Confetti over the whole scene: one burst, or a steady fall (`rain`). Change `seed` to fire again. */
export function Confetti({ count = 110, rain = false, seed = 1 }) {
  const bits = useMemo(() => {
    const r = seeded(seed * 97 + count)
    return Array.from({ length: count }, () => {
      const w = 0.7 + r() * 1.1
      const round = r() < 0.3
      return {
        left: `${r() * 100}%`,
        width: `${w}cqmin`,
        height: `${round ? w : w * (1.6 + r())}cqmin`,
        radius: round ? '999px' : '2px',
        color: CONFETTI_COLORS[Math.floor(r() * CONFETTI_COLORS.length)],
        dur: `${(rain ? 5 : 2.6) + r() * 2.4}s`,
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
