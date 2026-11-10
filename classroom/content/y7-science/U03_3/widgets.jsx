// content/y7-science/U03_3/widgets.jsx
// One widget for 3.3 Movement in space. English and French only (the deck sets
// meta.vietnamese: false), so every string goes through t(lang, en, fr).
//
//   LetGo   The four planets closest to the Sun, going round it at their real
//           speeds: the orbits are drawn to scale and each planet takes its
//           real time (Mercury 88 days, Venus 225, Earth 365, Mars 687), so the
//           speed of each dot on the screen is in proportion to the real one.
//           Mercury laps the Earth four times a year. Then GRAVITY OFF: each
//           planet leaves along a straight line, the way it was going — the
//           ball on Mr Bowen's string, for planets. A still slide can show
//           neither the different speeds nor the straight lines leaving.
//
// The stage is one wide SVG with a white plate, so its text scales with the
// panel and reads on a light or dark slide; only the buttons are HTML.
import { useState, useEffect, useRef } from 'react'
import { Play, Pause, PowerOff, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

function Btn({ onClick, disabled, tone = 'teal', icon: Icon, children }) {
  const tones = {
    teal: 'bg-[#0087a8] border-[#00697f]',
    orange: 'bg-[#c25e12] border-[#a04a0e]',
    red: 'bg-[#c8102e] border-[#990c23]',
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
 * LET GO — four planets at their real speeds, then no gravity
 * ============================================================= */
const W = 1120
const H = 440
const CX = 520 // the Sun
const CY = 220
const PX_PER_AU = 128 // Mars's orbit (1.52 AU) is 195 px
const DAYS_PER_SECOND = 30 // one Earth year takes about 12 seconds
const PLANETS = [
  // Sizes are not to scale (they could not be): big enough to see from the back.
  // Start angles were chosen so the four never line up in the first 14 seconds:
  // whenever the teacher presses Gravity off, they leave in different directions.
  { en: 'Mercury', fr: 'Mercure', au: 0.387, days: 88, r: 12, fill: '#b5b5b5', trail: '#6f7780', start: 100 },
  { en: 'Venus', fr: 'Vénus', au: 0.723, days: 225, r: 13, fill: '#e8c27a', trail: '#b8892f', start: 30 },
  { en: 'Earth', fr: 'Terre', au: 1.0, days: 365, r: 13, fill: '#4f8fbf', trail: '#2f6d9c', start: 0 },
  { en: 'Mars', fr: 'Mars', au: 1.524, days: 687, r: 12, fill: '#d0643b', trail: '#b14a24', start: 285 },
]
const rad = (d) => (d * Math.PI) / 180

// Where a planet is on its orbit after `day` days (anticlockwise on screen),
// and its velocity in px per day at that moment.
function onOrbit(p, day) {
  const R = p.au * PX_PER_AU
  const a = rad(p.start) + (2 * Math.PI * day) / p.days
  const v = (2 * Math.PI * R) / p.days
  return { x: CX + R * Math.cos(a), y: CY - R * Math.sin(a), vx: -v * Math.sin(a), vy: -v * Math.cos(a) }
}

const offStage = (x, y) => x < -40 || x > W + 40 || y < -40 || y > H + 40

// Where each planet is on `day`: on its orbit, or — once gravity was switched
// off on `freedAt` — on the straight line it left along.
function positions(day, freedAt) {
  return PLANETS.map((p) => {
    if (freedAt === null) return { ...onOrbit(p, day), from: null }
    const o = onOrbit(p, freedAt)
    const s = day - freedAt
    return { x: o.x + o.vx * s, y: o.y + o.vy * s, from: o }
  })
}
const goneAll = (day, freedAt) => freedAt !== null && positions(day, freedAt).every((q) => offStage(q.x, q.y))

export function LetGo({ lang = 'en' }) {
  const [day, setDay] = useState(0)
  const [running, setRunning] = useState(false)
  const [freedAt, setFreedAt] = useState(null) // the day gravity was switched off
  const raf = useRef(0)
  const last = useRef(0)
  const dayRef = useRef(0)
  const freedRef = useRef(null)

  useEffect(() => {
    if (!running) return undefined
    last.current = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.1, (now - last.current) / 1000)
      last.current = now
      dayRef.current += dt * DAYS_PER_SECOND
      setDay(dayRef.current)
      // Stop once every planet has left the picture.
      if (goneAll(dayRef.current, freedRef.current)) { setRunning(false); return }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [running])

  const now = positions(day, freedAt)
  const allGone = goneAll(day, freedAt)
  const laps = (p) => Math.floor((freedAt ?? day) / p.days)
  const shownDay = Math.floor(day)
  const letGo = () => { freedRef.current = dayRef.current; setFreedAt(dayRef.current); setRunning(true) }
  const reset = () => { setRunning(false); freedRef.current = null; setFreedAt(null); dayRef.current = 0; setDay(0) }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <clipPath id="u33-letgo-clip"><rect x="0" y="0" width={W} height={H} rx="14" /></clipPath>
          </defs>
          <rect x="0" y="0" width={W} height={H} rx="14" fill="#ffffff" />
          <g clipPath="url(#u33-letgo-clip)">
            {PLANETS.map((p) => (
              <circle key={`o-${p.en}`} cx={CX} cy={CY} r={p.au * PX_PER_AU} fill="none" stroke={RULE} strokeWidth="2.5" />
            ))}
            <circle cx={CX} cy={CY} r="20" fill="#fde58a" stroke="#c99a06" strokeWidth="3" />

            {/* the straight line each planet leaves along, from a dot where it let go:
                the orbit stays drawn, so the class sees the line leave the circle */}
            {now.map((q, i) => q.from && (
              <g key={`l-${PLANETS[i].en}`}>
                <line x1={q.from.x} y1={q.from.y} x2={q.x} y2={q.y} stroke={PLANETS[i].trail} strokeWidth="4" strokeDasharray="12 8" strokeLinecap="round" />
                <circle cx={q.from.x} cy={q.from.y} r="6" fill={PLANETS[i].trail} />
              </g>
            ))}
          </g>

          {/* the clock, on a plate so a line can pass behind it */}
          <rect x="24" y="28" width="250" height="112" rx="12" fill="#ffffff" fillOpacity="0.92" />
          <text x="36" y="62" fontFamily={FONT} fontSize="24" fill={MUTED}>{t(lang, 'Earth days', 'Jours terrestres')}</text>
          <text x="36" y="120" fontFamily={FONT} fontSize="54" fontWeight="bold" fill={INK}>{shownDay}</text>

          {/* the key: name and number of laps, on a plate so a line can pass behind it */}
          <rect x="818" y="30" width="284" height="242" rx="12" fill="#ffffff" fillOpacity="0.92" />
          <text x="830" y="62" fontFamily={FONT} fontSize="24" fill={MUTED}>{t(lang, 'Times round the Sun', 'Tours autour du Soleil')}</text>
          {PLANETS.map((p, i) => (
            <g key={`k-${p.en}`}>
              <circle cx="846" cy={104 + i * 52} r="11" fill={p.fill} stroke={INK} strokeWidth="2" />
              <text x="870" y={113 + i * 52} fontFamily={FONT} fontSize="26" fontWeight="bold" fill={INK}>{t(lang, p.en, p.fr)}</text>
              <text x="1080" y={113 + i * 52} fontFamily={FONT} fontSize="28" fontWeight="bold" fill={KEY} textAnchor="end">{laps(p)}</text>
            </g>
          ))}

          {freedAt !== null && (
            <>
              <rect x="24" y="342" width="262" height="82" rx="12" fill="#ffffff" fillOpacity="0.92" />
              <text x="36" y="376" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={KEY}>{t(lang, 'No gravity:', 'Sans gravité :')}</text>
              <text x="36" y="410" fontFamily={FONT} fontSize="26" fontWeight="bold" fill={KEY}>{t(lang, 'straight lines!', 'tout droit !')}</text>
            </>
          )}
          <text x="1084" y="420" fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="end">{t(lang, 'Orbits to scale', 'Orbites à l’échelle')}</text>

          {/* the planets go on top of everything */}
          <g clipPath="url(#u33-letgo-clip)">
            {now.map((q, i) => (
              <circle key={`p-${PLANETS[i].en}`} cx={q.x} cy={q.y} r={PLANETS[i].r} fill={PLANETS[i].fill} stroke={INK} strokeWidth="2" />
            ))}
          </g>
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="teal" icon={running ? Pause : Play} disabled={allGone} onClick={() => setRunning((r) => !r)}>
          {running ? t(lang, 'Pause', 'Pause') : t(lang, 'Play', 'Lancer')}
        </Btn>
        <Btn tone="red" icon={PowerOff} disabled={freedAt !== null} onClick={letGo}>{t(lang, 'Gravity off', 'Sans gravité')}</Btn>
        <Btn tone="slate" icon={RotateCcw} disabled={day === 0 && freedAt === null} onClick={reset}>{t(lang, 'Reset', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
