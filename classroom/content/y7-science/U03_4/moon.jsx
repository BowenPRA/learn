// content/y7-science/U03_4/moon.jsx
// THE SUN'S PART — the last model of 3.4 Tides.
//
//   LineThemUp   One month, from new moon to new moon. The Moon goes round the
//                Earth (seen from above the North Pole, the Sun far away on the
//                right). Its two bulges of water add to the Sun's two smaller
//                ones (half the size), so the tidal range at Mr Bowen's harbour
//                grows and shrinks: 6 m when the Sun, the Moon and the Earth
//                are in a line, 2 m when they are at right angles. Beside it,
//                what the Moon looks like from Earth, so the class can say WHEN
//                the biggest tides come: new moon and full moon, twice a month
//                (the book's Activity, Part 3, Questions 7–9). Slide the day,
//                or play the month; each day visited is plotted on the graph.
//
// The shared pieces (Btn, clamp) live with the Models deck; the Earth and the
// Moon are in bodies.jsx, the arithmetic in orbit.js.
import { useState, useRef, useEffect } from 'react'
import { RotateCcw, Play, Pause } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { clamp } from '../U03_models/space.js'
import { at, oceanPath, monthRange, phasePath, SYNODIC, SEA, SEA_EDGE } from './orbit.js'
import { Globe, MoonBall } from './bodies.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', BLUE = '#1a5fa8', GREEN_DARK = '#3d731c'

const E = { cx: 300, cy: 236, earth: 60, sea: 104, moonAmp: 24, sunAmp: 12, orbit: 180 }
const DAYS_PER_SEC = 2 // the month in about 15 seconds
const gx = (d) => 800 + (d / SYNODIC) * 640
const gy = (m) => 470 - 30 * m
const elongOf = (day) => (360 * day) / SYNODIC

function phaseName(e, lang) {
  const near = (a) => Math.abs(((e - a + 540) % 360) - 180) < 12
  if (near(0)) return t(lang, 'new moon', 'nouvelle lune')
  if (near(180)) return t(lang, 'full moon', 'pleine lune')
  if (near(90) || near(270)) return t(lang, 'half moon', 'demi-lune')
  return ''
}

export function LineThemUp({ lang = 'en', isDisplayMode = false }) {
  const [day, setDay] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [seen, setSeen] = useState(() => new Set([0]))
  const live = useRef({ day: 0, playing: false })
  useEffect(() => { Object.assign(live.current, { day, playing }) })

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const S = live.current
      if (!S.playing) return
      let d = S.day + DAYS_PER_SEC * dt
      if (d >= SYNODIC) {
        d = SYNODIC
        S.playing = false
        setPlaying(false)
      }
      S.day = d
      setDay(d)
      setSeen((prev) => {
        const bin = Math.round(d * 2) / 2
        if (prev.has(bin)) return prev
        const next = new Set(prev)
        next.add(bin)
        return next
      })
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const moveTo = (d) => {
    const v = clamp(d, 0, SYNODIC)
    setDay(v)
    setSeen((prev) => new Set(prev).add(Math.round(v * 2) / 2))
  }
  const play = () => {
    if (playing) { setPlaying(false); return }
    if (day >= SYNODIC - 0.01) moveTo(0)
    setPlaying(true)
  }
  const reset = () => { setPlaying(false); setDay(0); live.current.day = 0; setSeen(new Set([0])) }

  const big = isDisplayMode
  const e = elongOf(day)
  const range = monthRange(e)
  const [mx, my] = at(E.cx, E.cy, E.orbit, e)
  const name = phaseName(e, lang)
  const biggest = range > 5.85
  const smallest = range < 2.15
  const dots = [...seen].sort((a, b) => a - b)

  return (
    <div className="w-full h-full flex flex-col gap-2 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />
          <defs>
            <clipPath id="ltu-scene"><rect x="20" y="16" width="700" height="434" rx="18" /></clipPath>
          </defs>

          {/* the scene: the Sun far off to the right, the Moon going round */}
          <rect x="20" y="16" width="700" height="434" rx="18" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="2" />
          <g clipPath="url(#ltu-scene)">
            {[96, 180, 300, 384].map((y) => (
              <line key={y} x1="40" y1={y} x2="640" y2={y} stroke="#f2c14e" strokeWidth="3" strokeDasharray="4 14" opacity="0.7" />
            ))}
            <circle cx="790" cy={E.cy} r="140" fill="#ffd45c" stroke={INK} strokeWidth="3" />
            <circle cx={E.cx} cy={E.cy} r={E.orbit} fill="none" stroke="#b8c4cf" strokeWidth="2.5" strokeDasharray="8 8" />
            {/* the lines from the Earth to the Moon and to the Sun: one line, or a right angle */}
            <line x1={E.cx} y1={E.cy} x2={mx} y2={my} stroke="#5b6770" strokeWidth="3" strokeDasharray="7 6" />
            <line x1={E.cx} y1={E.cy} x2="720" y2={E.cy} stroke="#e8a317" strokeWidth="3" strokeDasharray="7 6" />
            <path d={oceanPath(E.cx, E.cy, E.sea, [{ deg: e, amp: E.moonAmp }, { deg: 0, amp: E.sunAmp }])} fill={SEA} stroke={SEA_EDGE} strokeWidth="3" />
            <Globe cx={E.cx} cy={E.cy} r={E.earth} />
            <MoonBall x={mx} y={my} r={24} sunDeg={0} />
          </g>
          <text x="636" y="54" fontFamily={FONT} fontSize="22" fontWeight="800" fill={INK} textAnchor="end">{t(lang, 'the Sun, far away →', 'le Soleil, très loin →')}</text>
          <text x="36" y="438" fontFamily={FONT} fontSize="18" fill={MUTED}>{t(lang, 'not to scale', 'pas à l’échelle')}</text>

          {/* the message under the scene */}
          {(biggest || smallest) && (
            <g>
              <rect x="20" y="464" width="700" height="62" rx="14" fill={biggest ? '#eef6e6' : '#e8f1fa'} stroke={biggest ? GREEN_DARK : BLUE} strokeWidth="3" />
              <text x="370" y="504" fontFamily={FONT} fontSize="25" fontWeight="900" fill={biggest ? GREEN_DARK : BLUE} textAnchor="middle">
                {biggest
                  ? t(lang, 'Sun, Moon and Earth in a line: the BIGGEST tides!', 'Tous alignés : les PLUS GRANDES marées !')
                  : t(lang, 'At right angles: the smallest tides.', 'À angle droit : les plus petites marées.')}
              </text>
            </g>
          )}

          {/* what the Moon looks like from Earth */}
          <text x="770" y="50" fontFamily={FONT} fontSize="22" fontWeight="700" fill={MUTED}>{t(lang, 'The Moon, seen from Earth', 'La Lune, vue de la Terre')}</text>
          <circle cx="840" cy="134" r="58" fill="#3d4652" />
          <path d={phasePath(840, 134, 58, e)} fill="#f4efdc" />
          <circle cx="840" cy="134" r="58" fill="none" stroke={INK} strokeWidth="3" />
          <text x="916" y="146" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK}>{name}</text>

          {/* the tidal range today */}
          <text x="1150" y="50" fontFamily={FONT} fontSize="22" fontWeight="700" fill={MUTED}>{t(lang, 'Tidal range at the harbour', 'Marnage au port')}</text>
          <text x="1150" y="114" fontFamily={FONT} fontSize="56" fontWeight="900" fill={KEY}>{range.toFixed(1)} m</text>
          <text x="1150" y="154" fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK}>{t(lang, `Day ${Math.floor(day)}`, `Jour ${Math.floor(day)}`)}</text>

          {/* the month, as a graph */}
          {[0, 2, 4, 6].map((m) => (
            <g key={m}>
              <line x1={gx(0)} y1={gy(m)} x2={gx(SYNODIC)} y2={gy(m)} stroke={m ? '#eef1f4' : INK} strokeWidth={m ? 1.5 : 2.5} />
              <text x={gx(0) - 12} y={gy(m) + 7} fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="end">{m}</text>
            </g>
          ))}
          <line x1={gx(0)} y1={gy(0)} x2={gx(0)} y2={gy(7)} stroke={INK} strokeWidth="2.5" />
          {[0, 5, 10, 15, 20, 25].map((d) => (
            <g key={d}>
              <line x1={gx(d)} y1={gy(0)} x2={gx(d)} y2={gy(0) + 7} stroke={INK} strokeWidth="2" />
              <text x={gx(d)} y={gy(0) + 30} fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="middle">{d}</text>
            </g>
          ))}
          <text x={gx(SYNODIC)} y={gy(0) + 58} fontFamily={FONT} fontSize="18" fontWeight="700" fill={MUTED} textAnchor="end">{t(lang, 'day of the month', 'jour du mois')}</text>
          <text x={gx(0) - 40} y={gy(7) - 14} fontFamily={FONT} fontSize="18" fontWeight="700" fill={MUTED}>{t(lang, 'tidal range (m)', 'marnage (m)')}</text>
          {dots.map((d) => (
            <circle key={d} cx={gx(d)} cy={gy(monthRange(elongOf(d)))} r="6" fill={KEY} opacity="0.75" />
          ))}
          <line x1={gx(day)} y1={gy(0)} x2={gx(day)} y2={gy(range)} stroke={KEY} strokeWidth="2" strokeDasharray="4 4" />
          <circle cx={gx(day)} cy={gy(range)} r="11" fill={KEY} stroke="#ffffff" strokeWidth="3" />
        </svg>
      </div>
      <div className="shrink-0 flex items-center gap-4 px-4 flex-wrap justify-center">
        <span className={`font-black text-slate-500 dark:text-slate-400 whitespace-nowrap ${big ? 'text-lg' : 'text-sm'}`}>{t(lang, 'Day 0', 'Jour 0')}</span>
        <input
          type="range" min="0" max={SYNODIC} step="0.1" value={day}
          onChange={(ev) => { setPlaying(false); moveTo(Number(ev.target.value)) }}
          aria-label={t(lang, 'Day of the month', 'Jour du mois')}
          className="flex-1 min-w-[12rem] h-3 accent-[#c25e12] cursor-pointer"
        />
        <span className={`font-black text-slate-500 dark:text-slate-400 whitespace-nowrap ${big ? 'text-lg' : 'text-sm'}`}>{t(lang, 'Day 29', 'Jour 29')}</span>
        <Btn big={big} tone="orange" icon={playing ? Pause : Play} onClick={play}>{playing ? t(lang, 'Pause', 'Pause') : t(lang, 'Play the month', 'Jouer le mois')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={day === 0 && !playing} onClick={reset}>{t(lang, 'Reset', 'Remettre')}</Btn>
      </div>
    </div>
  )
}
