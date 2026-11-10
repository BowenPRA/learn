// content/y7-science/U03_lab/widgets.jsx
// Widgets for Designing a Lab. English and French only, so every string goes
// through t(lang, en, fr).
//
//   RulerCatch   The ruler-drop test, drawn like 3.1's DropRace. The partner
//                lets go, the ruler falls past the catcher's open fingers, and
//                they close when the reaction time is up. A dot lands on the
//                ruler every 0.05 s, so the class SEES the ruler become a clock:
//                the gaps grow, and the cm you catch at is a time. Each Drop
//                picks a new catch between 10 and 24 cm. At real speed it is a
//                blink (the point of the next slide); Slow motion is 10 × slower.
//
// One wide SVG with a white plate, like DropRace; only the buttons are HTML.
import { useState, useEffect, useRef } from 'react'
import { ArrowDown, Turtle, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)

const INK = '#2b2b2b'
const KEY = '#c25e12'
const MUTED = '#5b6770'
const RULE = '#cfd8dc'
const SKIN = '#f1c9a5'
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
 * RULER CATCH — how a falling ruler measures your reaction time
 * ============================================================= */
const CM = 7 // px per cm: 30 cm above the fingers and 24 cm below must both fit
const CATCH_Y = 252 // the catcher's fingers: the 0 mark at the start
const RX = 246 // ruler left edge
const RW = 72 // ruler width
const MARK_EVERY = 0.05
const CLOSE = 0.02 // seconds for the fingers to snap shut
const cmAt = (s) => 500 * s * s // cm fallen after s seconds (g = 10 N/kg)
const timeFor = (cm) => Math.sqrt(cm / 500)

function Finger({ x, y }) {
  return <rect x={x} y={y} width="24" height="40" rx="10" fill={SKIN} stroke={INK} strokeWidth="2" />
}

export function RulerCatch({ lang = 'en' }) {
  const [s, setS] = useState(0) // simulated seconds since the partner let go
  const [catchCm, setCatchCm] = useState(15)
  const [running, setRunning] = useState(false)
  const raf = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const drop = (rate) => {
    cancelAnimationFrame(raf.current)
    const cm = 10 + Math.floor(Math.random() * 15)
    const end = timeFor(cm) + CLOSE
    const t0 = performance.now()
    const tick = (now) => {
      const sim = ((now - t0) / 1000) * rate
      if (sim >= end) { setS(end); setRunning(false); return }
      setS(sim)
      raf.current = requestAnimationFrame(tick)
    }
    setCatchCm(cm)
    setS(0)
    setRunning(true)
    raf.current = requestAnimationFrame(tick)
  }
  const reset = () => { cancelAnimationFrame(raf.current); setRunning(false); setS(0) }

  const rt = timeFor(catchCm)
  const started = s > 0
  const caught = s >= rt
  const fallen = Math.min(cmAt(s), catchCm)
  const off = fallen * CM
  const shut = Math.min(1, Math.max(0, (s - rt) / CLOSE))
  const gap = 18 * (1 - shut)
  const marks = []
  for (let k = 1; k * MARK_EVERY <= Math.min(s, rt) + 1e-9; k++) marks.push(k * MARK_EVERY)

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1120 440" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <clipPath id="ruler-catch-plate"><rect x="0" y="0" width="1120" height="440" rx="14" /></clipPath>
          </defs>
          <rect x="0" y="0" width="1120" height="440" rx="14" fill="#ffffff" />
          <rect x="16" y="16" width="560" height="408" rx="14" fill="#f7fafc" stroke={RULE} strokeWidth="2" />

          <g clipPath="url(#ruler-catch-plate)">
            {/* the ruler: 0 at the bottom, 30 at the top */}
            <rect x={RX} y={CATCH_Y - 31 * CM + off} width={RW} height={32 * CM} rx="6" fill="#fff3c4" stroke={INK} strokeWidth="3" />
            {Array.from({ length: 31 }, (_, c) => {
              const y = CATCH_Y - c * CM + off
              const big = c % 5 === 0
              return (
                <g key={c}>
                  <line x1={RX} y1={y} x2={RX + (big ? 22 : 11)} y2={y} stroke={INK} strokeWidth={big ? 2.5 : 1.5} />
                  {big && <text x={RX + RW - 8} y={y + 7} fontFamily={FONT} fontSize="20" fontWeight="bold" fill={INK} textAnchor="end">{c}</text>}
                </g>
              )
            })}

            {/* a dot every 0.05 s, where the fingers were at that moment */}
            {marks.map((m) => {
              const y = CATCH_Y - cmAt(m) * CM + off
              return (
                <g key={m}>
                  <circle cx={RX + 36} cy={y} r="6" fill={KEY} />
                  <text x={RX + RW + 62} y={y + 7} fontFamily={FONT} fontSize="20" fontWeight="bold" fill={KEY}>{m.toFixed(2)} s</text>
                </g>
              )
            })}
          </g>

          {/* partner's fingers at the top: they open to let go */}
          <Finger x={RX - 24 - (started ? 22 : 0)} y="36" />
          <Finger x={RX + RW + (started ? 22 : 0)} y="36" />
          <text x={RX - 64} y="64" fontFamily={FONT} fontSize="22" fill={MUTED} textAnchor="end">{t(lang, 'partner lets go', 'ton voisin lâche')}</text>

          {/* catcher's fingers: open at 0, shut when the reaction time is up */}
          <Finger x={RX - 24 - gap} y={CATCH_Y - 20} />
          <Finger x={RX + RW + gap} y={CATCH_Y - 20} />
          <text x={RX - 64} y={CATCH_Y + 8} fontFamily={FONT} fontSize="22" fill={MUTED} textAnchor="end">{t(lang, 'you catch', 'tu attrapes')}</text>

          {/* read-out */}
          <rect x="600" y="16" width="504" height="408" rx="14" fill="#f7fafc" stroke={RULE} strokeWidth="2" />
          <text x="852" y="80" fontFamily={FONT} fontSize="24" fill={MUTED} textAnchor="middle">{t(lang, 'time', 'temps')}</text>
          <text x="852" y="150" fontFamily={FONT} fontSize="64" fontWeight="bold" fill={caught ? KEY : INK} textAnchor="middle">{Math.min(s, rt).toFixed(2)} s</text>
          {!started && (
            <text x="852" y="250" fontFamily={FONT} fontSize="26" fill={MUTED} textAnchor="middle">{t(lang, 'fingers open at 0', 'doigts ouverts au 0')}</text>
          )}
          {started && !caught && (
            <text x="852" y="250" fontFamily={FONT} fontSize="26" fill={MUTED} textAnchor="middle">{t(lang, 'falling…', 'elle tombe…')}</text>
          )}
          {caught && (
            <>
              <text x="852" y="236" fontFamily={FONT} fontSize="30" fontWeight="bold" fill={KEY} textAnchor="middle">{t(lang, 'caught!', 'attrapée !')}</text>
              <text x="852" y="296" fontFamily={FONT} fontSize="24" fill={MUTED} textAnchor="middle">{t(lang, 'read the ruler:', 'lis la règle :')}</text>
              <text x="852" y="346" fontFamily={FONT} fontSize="40" fontWeight="bold" fill={INK} textAnchor="middle">{catchCm} cm</text>
            </>
          )}
          <text x="852" y="404" fontFamily={FONT} fontSize="18" fill={MUTED} textAnchor="middle">{t(lang, 'one dot every 0.05 s', 'un point toutes les 0.05 s')}</text>
        </svg>
      </div>

      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn tone="orange" icon={ArrowDown} disabled={running} onClick={() => drop(1)}>{t(lang, 'Drop', 'Lâcher')}</Btn>
        <Btn tone="teal" icon={Turtle} disabled={running} onClick={() => drop(1 / 10)}>{t(lang, 'Slow motion', 'Ralenti')}</Btn>
        <Btn tone="slate" icon={RotateCcw} disabled={s === 0 && !running} onClick={reset}>{t(lang, 'Reset', 'Remettre')}</Btn>
      </div>
    </div>
  )
}
