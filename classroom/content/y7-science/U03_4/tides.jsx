// content/y7-science/U03_4/tides.jsx
// The sea and the Moon: the models of 3.4 Tides.
//
//   HarbourClock  Mr Bowen's harbour, one press = 3 hours from 6 a.m. The
//                 water on the tide board and his boat go down and up, and the
//                 graph of the depth grows a point. The class says the next
//                 depth first: 6, 4, 2, 4, 6… High tide twice a day, low tide
//                 twice, six hours from high to low. The dashed curve joins
//                 the dots once they have seen high → low → high (6 p.m.).
//                 The graph's depth scale lines up with the tide board.
//   TideFilm      the real thing: the road to Holy Island going under the sea,
//                 a 23-second time-lapse (CC BY 3.0), muted and looping.
//   SpinEarth     the cause. The Earth from above the North Pole, the water
//                 stretched into two bulges (towards the Moon and away from
//                 it), Mr Bowen's harbour on the coast. One press = 6 hours, a
//                 quarter turn, or play a whole day. The harbour's depth is
//                 graphed as it goes round, and it is the SAME graph as the
//                 harbour clock: two high tides a day, because the Earth spins
//                 through two bulges.
//   HighOrLow     a game for the whole class, standing: the Moon and Mr Bowen's
//                 harbour somewhere on the Earth. Arms up for high tide, arms
//                 down for low tide, all at once; Show the sea checks it.
//                 Eight rounds in a fixed order (the far side comes early, and
//                 again with the Moon moved), then random ones.
//
// The shared pieces (mulberry32, Btn) live with the Models deck; the Earth and
// the Moon are in bodies.jsx, the arithmetic in orbit.js.
import { useState, useRef, useEffect } from 'react'
import { Undo2, RotateCcw, ChevronRight, Play, Pause, Eye } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { mulberry32 } from '../U03_models/data.js'
import { Btn } from '../U03_models/ui.jsx'
import { at, oceanPath, harbourDepth, SEA, SEA_EDGE } from './orbit.js'
import { Globe, MoonBall, ArmsFigure } from './bodies.jsx'
import holyIsland from './images/holyisland.webm'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', RULE = '#d5dbe1', BLUE = '#1a5fa8'
const GREEN_DARK = '#3d731c', PIN = '#d83a2e'

// The red rowing boat of the diagrams, its top edge at (x, y).
function Boat({ x, y, w = 110 }) {
  return (
    <g>
      <path d={`M ${x} ${y} h ${w} l ${-w * 0.14} ${w * 0.24} h ${-w * 0.72} Z`} fill={PIN} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <line x1={x + w * 0.1} y1={y + w * 0.06} x2={x + w * 0.9} y2={y + w * 0.06} stroke="#ffffff" strokeWidth="3" />
    </g>
  )
}

// Mr Bowen's harbour on the coast: a red pin.
function Harbour({ x, y, big = false }) {
  return (
    <g>
      {big && <circle cx={x} cy={y} r="24" fill="none" stroke={PIN} strokeWidth="4" opacity="0.5" />}
      <circle cx={x} cy={y} r="11" fill={PIN} stroke="#ffffff" strokeWidth="3.5" />
    </g>
  )
}

function Sun({ x, y, r = 22 }) {
  return (
    <g>
      {Array.from({ length: 8 }, (_, k) => {
        const a = (k * Math.PI) / 4
        return <line key={k} x1={x + (r + 5) * Math.cos(a)} y1={y + (r + 5) * Math.sin(a)} x2={x + (r + 14) * Math.cos(a)} y2={y + (r + 14) * Math.sin(a)} stroke="#e8a317" strokeWidth="4" strokeLinecap="round" />
      })}
      <circle cx={x} cy={y} r={r} fill="#ffd45c" stroke={INK} strokeWidth="2.5" />
    </g>
  )
}

/* ============================================================= *
 * 1 · MR BOWEN'S HARBOUR — a day of tides, three hours a press
 * ============================================================= */
const DEPTH = [6, 4, 2, 4, 6, 4, 2, 4, 6]
const H_TIMES = [
  ['6:00 a.m.', '6 h 00'], ['9:00 a.m.', '9 h 00'], ['12 noon', '12 h 00'], ['3:00 p.m.', '15 h 00'], ['6:00 p.m.', '18 h 00'],
  ['9:00 p.m.', '21 h 00'], ['12 midnight', '0 h 00'], ['3:00 a.m.', '3 h 00'], ['6:00 a.m.', '6 h 00'],
]
const H_NOTES = [
  ['Mr Bowen arrives', 'M. Bowen arrive'], ['Mid-morning', 'Le milieu de la matinée'], ['Lunch', 'Le déjeuner'],
  ['Home time', 'Fin des cours'], ['Dinner', 'Le dîner'], ['Bedtime', 'L’heure du coucher'], ['Midnight', 'Minuit'],
  ['The middle of the night', 'Au milieu de la nuit'], ['The next morning', 'Le lendemain matin'],
]
const H_STATE = ['high', 'out', 'low', 'in', 'high', 'out', 'low', 'in', 'high']
const STATE_TEXT = {
  high: ['HIGH TIDE', 'MARÉE HAUTE'],
  low: ['LOW TIDE', 'MARÉE BASSE'],
  out: ['The tide is going out', 'La marée descend'],
  in: ['The tide is coming in', 'La marée monte'],
}
const DAY_TICKS = [['6 a.m.', '6 h'], ['12 noon', '12 h'], ['6 p.m.', '18 h'], ['midnight', '0 h'], ['6 a.m.', '6 h']]
// The scene and the graph share one depth scale: 0 m at y 440, 40 px a metre.
const FLOOR = 440
const yOf = (m) => FLOOR - 40 * m
const hx = (h) => 860 + h * 24 // hours after 6 a.m. → graph x
const H_CURVE = (() => {
  const pts = []
  for (let h = 0; h <= 24.001; h += 0.25) pts.push(`${hx(h).toFixed(1)},${yOf(4 + 2 * Math.cos((Math.PI * h) / 6)).toFixed(1)}`)
  return pts.join(' ')
})()

export function HarbourClock({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0)
  const L = (p) => (lang === 'fr' ? p[1] : p[0])
  const big = isDisplayMode
  const d = DEPTH[k]
  const state = H_STATE[k]
  const night = k >= 5 && k <= 7
  const last = DEPTH.length - 1

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="500" rx="16" fill="#ffffff" />

          {/* time and depth */}
          <text x="40" y="66" fontFamily={FONT} fontSize="28" fontWeight="700" fill={MUTED}>{t(lang, 'Time', 'Heure')}</text>
          <text x="40" y="124" fontFamily={FONT} fontSize="54" fontWeight="900" fill={INK}>{L(H_TIMES[k])}</text>
          <text x="40" y="162" fontFamily={FONT} fontSize="24" fill={MUTED}>{L(H_NOTES[k])}</text>
          <text x="40" y="240" fontFamily={FONT} fontSize="28" fontWeight="700" fill={MUTED}>{t(lang, 'Water depth', 'Profondeur de l’eau')}</text>
          <text x="40" y="322" fontFamily={FONT} fontSize="84" fontWeight="900" fill={KEY}>{d} m</text>
          <text x="40" y="376" fontFamily={FONT} fontSize={state === 'high' || state === 'low' ? 32 : 25} fontWeight="900"
            fill={state === 'high' || state === 'low' ? BLUE : MUTED}>{L(STATE_TEXT[state])}</text>

          {/* the harbour: a wall with a tide board, the water, the boat */}
          <rect x="398" y="92" width="64" height="374" fill="#cfc8bd" stroke={INK} strokeWidth="3" />
          {[126, 160, 194, 228, 262, 296, 330, 364, 398, 432].map((y, i) => (
            <g key={y}>
              <line x1="398" y1={y} x2="462" y2={y} stroke="#a79f92" strokeWidth="2" />
              <line x1={i % 2 ? 420 : 440} y1={y - 34} x2={i % 2 ? 420 : 440} y2={y} stroke="#a79f92" strokeWidth="2" />
            </g>
          ))}
          <rect x="462" y={yOf(8)} width="330" height={40 * 8} fill={SEA}
            style={{ transform: `scaleY(${d / 8})`, transformOrigin: `0px ${FLOOR}px`, transition: 'transform 0.9s cubic-bezier(.4,0,.2,1)' }} />
          <g style={{ transform: `translateY(${40 * (8 - d)}px)`, transition: 'transform 0.9s cubic-bezier(.4,0,.2,1)' }}>
            <line x1="462" y1={yOf(8)} x2="792" y2={yOf(8)} stroke={SEA_EDGE} strokeWidth="4" />
            <Boat x={610} y={yOf(8) - 18} w={110} />
          </g>
          <rect x="462" y={FLOOR} width="330" height="26" fill="#d9c7a3" />
          <line x1="398" y1={FLOOR} x2="792" y2={FLOOR} stroke={INK} strokeWidth="3" />
          {/* the tide board on the wall */}
          <rect x="462" y={yOf(8)} width="22" height={40 * 8} fill="#ffffff" stroke={INK} strokeWidth="2.5" />
          {[1, 2, 3, 4, 5, 6, 7].map((m) => (
            <line key={m} x1="462" y1={yOf(m)} x2={m % 2 ? 476 : 484} y2={yOf(m)} stroke={INK} strokeWidth={m % 2 ? 2 : 3} />
          ))}
          {[2, 4, 6, 8].map((m) => (
            <text key={m} x="452" y={yOf(m) + 7} fontFamily={FONT} fontSize="20" fontWeight="800" fill={INK} textAnchor="end">{m}</text>
          ))}
          <text x="430" y="80" fontFamily={FONT} fontSize="18" fontWeight="700" fill={MUTED} textAnchor="middle">{t(lang, 'metres', 'mètres')}</text>
          {night
            ? <path d="M 742 50 a 22 22 0 1 0 22 30 a 17 17 0 1 1 -22 -30 z" fill="#f3e6a2" stroke={INK} strokeWidth="2.5" />
            : <Sun x={748} y={66} />}

          {/* the graph, on the same depth scale */}
          {[0, 2, 4, 6, 8].map((m) => (
            <g key={m}>
              <line x1={hx(0)} y1={yOf(m)} x2={hx(24)} y2={yOf(m)} stroke={m ? '#eef1f4' : INK} strokeWidth={m ? 1.5 : 2.5} />
              <text x={hx(0) - 12} y={yOf(m) + 7} fontFamily={FONT} fontSize="19" fill={MUTED} textAnchor="end">{m}</text>
            </g>
          ))}
          <line x1={hx(0)} y1={FLOOR} x2={hx(0)} y2={yOf(8.3)} stroke={INK} strokeWidth="2.5" />
          {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((h) => (
            <line key={h} x1={hx(h)} y1={FLOOR} x2={hx(h)} y2={FLOOR + 7} stroke={INK} strokeWidth="2" />
          ))}
          {DAY_TICKS.map((p, i) => (
            <text key={i} x={hx(i * 6)} y={FLOOR + 32} fontFamily={FONT} fontSize="19" fill={MUTED} textAnchor="middle">{L(p)}</text>
          ))}
          <text x={hx(0) - 46} y={yOf(8) - 22} fontFamily={FONT} fontSize="19" fontWeight="700" fill={MUTED}>{t(lang, 'depth (m)', 'profondeur (m)')}</text>
          {k >= 4 && <polyline points={H_CURVE} fill="none" stroke={KEY} strokeWidth="2.5" strokeDasharray="7 7" opacity="0.55" />}
          {Array.from({ length: k + 1 }, (_, i) => (
            <g key={i}>
              <circle cx={hx(i * 3)} cy={yOf(DEPTH[i])} r={i === k ? 11 : 8} fill={KEY} stroke="#ffffff" strokeWidth="3" />
              <text x={hx(i * 3) + 12} y={yOf(DEPTH[i]) - 12} fontFamily={FONT} fontSize="19" fontWeight="800" fill={KEY}>{DEPTH[i]}</text>
            </g>
          ))}
          {k >= 2 && (
            <g>
              <rect x="1010" y="22" width="420" height="52" rx="12" fill="#fdf1e3" stroke={KEY} strokeWidth="2" />
              <text x="1220" y="57" fontFamily={FONT} fontSize="25" fontWeight="900" fill={KEY} textAnchor="middle">
                {k < 4 ? t(lang, 'High → low: 6 hours', 'Haute → basse : 6 heures') : t(lang, 'High → high: 12 hours', 'Haute → haute : 12 heures')}
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === last} onClick={() => setK((v) => Math.min(last, v + 1))}>{t(lang, '3 hours later', '3 heures plus tard')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * 2 · THE ROAD TO HOLY ISLAND — the real thing, sped up
 * ============================================================= */
// No frame of its own: the layout already puts the media in a panel. The video
// fills the panel and keeps its shape, with the panel's own white either side.
export function TideFilm({ lang = 'en' }) {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="w-full h-full">
        <video
          className="w-full h-full object-contain rounded-xl"
          src={holyIsland}
          controls
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          aria-label={t(lang, 'Time-lapse: the tide comes in over the road to Holy Island, England', 'Accéléré : la marée monte sur la route de Holy Island, en Angleterre')}
        />
      </div>
    </div>
  )
}

/* ============================================================= *
 * 3 · SPIN THE EARTH — two bulges, one harbour, one day
 * ============================================================= */
const SE = { cx: 300, cy: 262, earth: 116, sea: 156, amp: 30 }
const MOON_AT = [640, 262]
const HOURS_PER_SEC = 1.5 // a whole day in 16 seconds
const sx = (h) => 770 + h * 28 // hours after 6 a.m. → graph x
const sy = (m) => 470 - 34 * m // depth → graph y
const clockText = (h, lang) => {
  const total = Math.round((6 + h) * 60) % (24 * 60)
  const hh = Math.floor(total / 60), mm = total % 60
  if (lang === 'fr') return `${hh} h ${String(mm).padStart(2, '0')}`
  if (hh === 12 && mm === 0) return '12 noon'
  if (hh === 0 && mm === 0) return '12 midnight'
  return `${hh % 12 === 0 ? 12 : hh % 12}:${String(mm).padStart(2, '0')} ${hh < 12 ? 'a.m.' : 'p.m.'}`
}
function tideState(h, lang) {
  const deg = 15 * h
  const depth = harbourDepth(deg)
  if (depth > 5.85) return [t(lang, 'HIGH TIDE', 'MARÉE HAUTE'), BLUE, true]
  if (depth < 2.15) return [t(lang, 'LOW TIDE', 'MARÉE BASSE'), BLUE, true]
  return Math.sin((2 * deg * Math.PI) / 180) > 0
    ? [t(lang, 'going out', 'elle descend'), MUTED, false]
    : [t(lang, 'coming in', 'elle monte'), MUTED, false]
}

export function SpinEarth({ lang = 'en', isDisplayMode = false }) {
  const [hours, setHours] = useState(0)
  const [mode, setMode] = useState('still') // 'still' | 'play' | 'step'
  const goal = useRef(0)
  const live = useRef({ hours: 0, mode: 'still' })
  useEffect(() => { Object.assign(live.current, { hours, mode }) })

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const S = live.current
      if (S.mode === 'still') return
      const stop = S.mode === 'step' ? goal.current : 24
      const speed = S.mode === 'step' ? HOURS_PER_SEC * 3.5 : HOURS_PER_SEC
      let h = S.hours + speed * dt
      if (h >= stop) {
        h = stop
        S.mode = 'still'
        setMode('still')
      }
      S.hours = h
      setHours(h)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const big = isDisplayMode
  const deg = 15 * hours
  const depth = harbourDepth(deg)
  const [hX, hY] = at(SE.cx, SE.cy, SE.earth, deg)
  const [stateText, stateColor, atTurn] = tideState(hours, lang)
  const done = hours >= 24 - 1e-6
  const trace = []
  for (let h = 0; h <= hours + 1e-6; h += 0.2) trace.push(`${sx(h).toFixed(1)},${sy(harbourDepth(15 * h)).toFixed(1)}`)
  trace.push(`${sx(hours).toFixed(1)},${sy(depth).toFixed(1)}`)

  const step = () => {
    goal.current = Math.min(24, (Math.floor(hours / 6 + 1e-6) + 1) * 6)
    setMode('step')
  }
  const reset = () => { setMode('still'); setHours(0); live.current.hours = 0 }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* the Earth, its two bulges of water, the Moon */}
          <path d={oceanPath(SE.cx, SE.cy, SE.sea, [{ deg: 0, amp: SE.amp }])} fill={SEA} stroke={SEA_EDGE} strokeWidth="3" />
          <Globe cx={SE.cx} cy={SE.cy} r={SE.earth} spin={deg} />
          {/* the bulges are high tide, the narrow parts low tide */}
          <line x1="82" y1="322" x2="120" y2="282" stroke={KEY} strokeWidth="2" />
          <circle cx="120" cy="282" r="4.5" fill={KEY} />
          <text x="24" y="344" fontFamily={FONT} fontSize="20" fontWeight="800" fill={KEY}>{t(lang, 'high tide', 'marée haute')}</text>
          <line x1="530" y1="208" x2="480" y2="252" stroke={KEY} strokeWidth="2" />
          <circle cx="480" cy="252" r="4.5" fill={KEY} />
          <text x="543" y="200" fontFamily={FONT} fontSize="20" fontWeight="800" fill={KEY} textAnchor="middle">{t(lang, 'high tide', 'marée haute')}</text>
          <text x={SE.cx} y="108" fontFamily={FONT} fontSize="20" fontWeight="800" fill={KEY} textAnchor="middle">{t(lang, 'low tide', 'marée basse')}</text>
          <text x={SE.cx} y="434" fontFamily={FONT} fontSize="20" fontWeight="800" fill={KEY} textAnchor="middle">{t(lang, 'low tide', 'marée basse')}</text>
          <Harbour x={hX} y={hY} big={atTurn} />
          <MoonBall x={MOON_AT[0]} y={MOON_AT[1]} r={40} />
          <text x={MOON_AT[0]} y={MOON_AT[1] + 74} fontFamily={FONT} fontSize="22" fontWeight="800" fill={INK} textAnchor="middle">{t(lang, 'Moon', 'Lune')}</text>
          {/* the way the Earth spins */}
          <path d="M 140 70 A 238 238 0 0 0 76 168" fill="none" stroke={BLUE} strokeWidth="5" strokeLinecap="round" />
          <path d="M 64 178 L 70 152 L 88 168 Z" fill={BLUE} />
          <text x="150" y="58" fontFamily={FONT} fontSize="22" fontWeight="800" fill={BLUE}>{t(lang, 'The Earth spins', 'La Terre tourne')}</text>
          <circle cx="44" cy="494" r="10" fill={PIN} stroke="#ffffff" strokeWidth="3" />
          <text x="64" y="501" fontFamily={FONT} fontSize="21" fontWeight="700" fill={INK}>{t(lang, 'Mr Bowen’s harbour', 'Le port de M. Bowen')}</text>
          <text x={MOON_AT[0] + 46} y="501" fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="end">{t(lang, 'not to scale', 'pas à l’échelle')}</text>

          {/* the read-out */}
          <text x="770" y="50" fontFamily={FONT} fontSize="22" fontWeight="700" fill={MUTED}>{t(lang, 'Time', 'Heure')}</text>
          <text x="770" y="104" fontFamily={FONT} fontSize="46" fontWeight="900" fill={INK}>{clockText(hours, lang)}</text>
          <text x="1110" y="50" fontFamily={FONT} fontSize="22" fontWeight="700" fill={MUTED}>{t(lang, 'Water at the harbour', 'L’eau au port')}</text>
          <text x="1110" y="104" fontFamily={FONT} fontSize="46" fontWeight="900" fill={KEY}>{depth.toFixed(1)} m</text>
          <text x="1110" y="142" fontFamily={FONT} fontSize={atTurn ? 28 : 23} fontWeight="900" fill={stateColor}>{stateText}</text>

          {/* the graph: the same one as Mr Bowen's harbour */}
          {[0, 2, 4, 6, 8].map((m) => (
            <g key={m}>
              <line x1={sx(0)} y1={sy(m)} x2={sx(24)} y2={sy(m)} stroke={m ? '#eef1f4' : INK} strokeWidth={m ? 1.5 : 2.5} />
              <text x={sx(0) - 12} y={sy(m) + 7} fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="end">{m}</text>
            </g>
          ))}
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(8.3)} stroke={INK} strokeWidth="2.5" />
          {DAY_TICKS.map((p, i) => (
            <g key={i}>
              <line x1={sx(i * 6)} y1={sy(0)} x2={sx(i * 6)} y2={sy(0) + 7} stroke={INK} strokeWidth="2" />
              <text x={sx(i * 6)} y={sy(0) + 30} fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="middle">{lang === 'fr' ? p[1] : p[0]}</text>
            </g>
          ))}
          <text x={sx(0) - 40} y={sy(8) - 20} fontFamily={FONT} fontSize="18" fontWeight="700" fill={MUTED}>{t(lang, 'depth (m)', 'profondeur (m)')}</text>
          <polyline points={trace.join(' ')} fill="none" stroke={KEY} strokeWidth="4" strokeLinejoin="round" />
          <circle cx={sx(hours)} cy={sy(depth)} r="10" fill={KEY} stroke="#ffffff" strokeWidth="3" />
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={done || mode !== 'still'} onClick={step}>{t(lang, '6 hours later', '6 heures plus tard')}</Btn>
        <Btn big={big} tone="blue" icon={mode === 'play' ? Pause : Play} disabled={done || mode === 'step'} onClick={() => setMode((m) => (m === 'play' ? 'still' : 'play'))}>
          {mode === 'play' ? t(lang, 'Pause', 'Pause') : t(lang, 'Play the day', 'Jouer la journée')}
        </Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={hours === 0} onClick={reset}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}

/* ============================================================= *
 * 4 · HIGH TIDE OR LOW TIDE? — arms up, arms down
 * ============================================================= */
// [the Moon's direction, the harbour's direction], degrees anticlockwise from
// the right. In order: facing the Moon, side, FAR side, far side with the Moon
// on top, side, facing it again, side, far side with the Moon on the left.
const ROUNDS = [[0, 0], [0, 90], [0, 180], [90, 270], [180, 90], [270, 270], [90, 0], [180, 0]]
const HL = { cx: 330, cy: 268, earth: 110, sea: 142, amp: 26, moon: 222 }
function roundAt(n) {
  if (n < ROUNDS.length) return ROUNDS[n]
  const rnd = mulberry32(1000 + n)
  return [90 * Math.floor(rnd() * 4), 90 * Math.floor(rnd() * 4)]
}

export function HighOrLow({ lang = 'en', isDisplayMode = false }) {
  const [n, setN] = useState(0)
  const [shown, setShown] = useState(false)
  const big = isDisplayMode
  const [moonDeg, townDeg] = roundAt(n)
  const high = ((townDeg - moonDeg) % 180 + 180) % 180 === 0
  const [mx, my] = at(HL.cx, HL.cy, HL.moon, moonDeg)
  const [tx, ty] = at(HL.cx, HL.cy, HL.earth, townDeg)
  const next = () => { setN((v) => v + 1); setShown(false) }
  const card = (x, up) => {
    const right = shown && up === high
    const fade = shown && up !== high
    return (
      <g opacity={fade ? 0.3 : 1}>
        <rect x={x} y="150" width="350" height="250" rx="20" fill={right ? '#eef6e6' : '#f7fafc'} stroke={right ? GREEN_DARK : RULE} strokeWidth={right ? 6 : 3} />
        <ArmsFigure x={x + 175} y={250} up={up} color={up ? BLUE : KEY} s={0.95} />
        <text x={x + 175} y="342" fontFamily={FONT} fontSize="30" fontWeight="900" fill={up ? BLUE : KEY} textAnchor="middle">{up ? t(lang, 'ARMS UP', 'BRAS EN HAUT') : t(lang, 'ARMS DOWN', 'BRAS EN BAS')}</text>
        <text x={x + 175} y="380" fontFamily={FONT} fontSize="26" fontWeight="700" fill={INK} textAnchor="middle">{up ? t(lang, 'high tide', 'marée haute') : t(lang, 'low tide', 'marée basse')}</text>
        {right && (
          <g>
            <circle cx={x + 318} cy="182" r="22" fill={GREEN_DARK} />
            <path d={`M ${x + 306} ${182} l 8 8 l 14 -16`} stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 540" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="540" rx="16" fill="#ffffff" />

          {/* the Earth: the water is a plain ring until the sea is shown */}
          {shown
            ? <path d={oceanPath(HL.cx, HL.cy, HL.sea, [{ deg: moonDeg, amp: HL.amp }])} fill={SEA} stroke={SEA_EDGE} strokeWidth="3" />
            : <circle cx={HL.cx} cy={HL.cy} r={HL.sea} fill="#f1f5f9" stroke="#b8c4cf" strokeWidth="3" strokeDasharray="10 8" />}
          <Globe cx={HL.cx} cy={HL.cy} r={HL.earth} spin={townDeg} />
          <Harbour x={tx} y={ty} big />
          <MoonBall x={mx} y={my} r={34} />
          {!shown && <text x={HL.cx} y={HL.cy + 14} fontFamily={FONT} fontSize="44" fontWeight="900" fill="#ffffff" stroke={INK} strokeWidth="1.5" textAnchor="middle">?</text>}

          {/* the question and the two answers */}
          <text x="700" y="62" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, `Round ${n + 1}`, `Manche ${n + 1}`)}</text>
          <text x="700" y="112" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK}>
            {t(lang, 'Mr Bowen’s harbour (red): high or low tide?', 'Le port (rouge) : marée haute ou basse ?')}
          </text>
          {card(700, true)}
          {card(1080, false)}
          <text x="700" y="456" fontFamily={FONT} fontSize="25" fontWeight="900" fill={shown ? GREEN_DARK : MUTED}>
            {shown
              ? (high ? t(lang, 'It is in a bulge of water: high tide.', 'Il est dans une bosse d’eau : marée haute.') : t(lang, 'It is between the bulges: low tide.', 'Il est entre les bosses : marée basse.'))
              : t(lang, 'Everyone answers at once. Wrong? Sit down.', 'Tout le monde répond en même temps. Faux ? Assieds-toi.')}
          </text>
          <circle cx="712" cy="500" r="10" fill={PIN} stroke="#ffffff" strokeWidth="3" />
          <text x="732" y="507" fontFamily={FONT} fontSize="20" fontWeight="700" fill={INK}>{t(lang, 'Mr Bowen’s harbour', 'Le port de M. Bowen')}</text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="teal" icon={Eye} disabled={shown} onClick={() => setShown(true)}>{t(lang, 'Show the sea', 'Montrer la mer')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} onClick={next}>{t(lang, 'Next round', 'Manche suivante')}</Btn>
        <Btn big={big} tone="slate" icon={RotateCcw} disabled={n === 0 && !shown} onClick={() => { setN(0); setShown(false) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
