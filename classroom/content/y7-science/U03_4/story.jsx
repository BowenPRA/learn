// content/y7-science/U03_4/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's boat, a four-panel strip, one panel per
// press, so the class predicts each step before it is shown. Deadpan, never
// flagged as a joke. It is the harbour clock's day, lived:
//
//   1  6 a.m., high tide: he ties up his boat. Very tight.   (a short rope)
//   2  12 noon, low tide: his boat is hanging from the wall.  (Questions 3–4:
//      six hours from high to low; a harbour you cannot use at low tide)
//   3  He climbs down to look, and falls asleep on the mud.  (a crab)
//   4  6 p.m., high tide again: the sea comes back. He is now very wet.
//   then the question the Moon half of the lesson answers — where does the sea
//   go, and why does it come back? — and the clue: something big in the sky.
//
// Mr Bowen himself is the cartoon from Coffee, Carbon and Stars.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { SEA, SEA_EDGE } from './orbit.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', MUTED = '#5b6770', RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8'
const MUD = '#a88d66'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const QUAY = 240 // top of the harbour wall
const WALL = 96 // its width
const FLOOR = 388 // the mud
const HIGH = 266 // the sea at high tide
const LOW = 368 // and at low tide
const RING = 256 // the iron ring the rope is tied to

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['6 a.m. Mr Bowen ties up', 'his boat. Very tight.'], ['6 h. M. Bowen attache', 'son bateau. Très serré.']],
  [['12 noon. He comes back.', 'His boat is hanging.'], ['Midi. Il revient.', 'Son bateau pend au mur.']],
  [['He climbs down to look…', '…and falls asleep.'], ['Il descend regarder…', '…et il s’endort.']],
  [['6 p.m. The sea comes back.', '(He is now very wet.)'], ['18 h. La mer revient.', '(Il est maintenant trempé.)']],
]
const LAST = 4 // panels 0-3, then the clue

/* ── the pieces ── */
function Boat({ x, y, w = 120 }) {
  return (
    <g>
      <path d={`M ${x} ${y} h ${w} l ${-w * 0.14} ${w * 0.24} h ${-w * 0.72} Z`} fill="#d83a2e" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <line x1={x + w * 0.1} y1={y + w * 0.06} x2={x + w * 0.9} y2={y + w * 0.06} stroke="#ffffff" strokeWidth="3" />
    </g>
  )
}

// The boat hanging by its bow from the ring: the hull turned on end, keel out.
function HangingBoat({ x }) {
  const bx = x + WALL + 12, by = RING + 4
  return (
    <g>
      <line x1={x + WALL} y1={RING} x2={bx} y2={by} stroke="#8a6a3c" strokeWidth="4" />
      <g transform={`rotate(-12 ${bx} ${by}) matrix(0 1 1 0 ${bx} ${by})`}>
        <Boat x={0} y={0} w={120} />
      </g>
    </g>
  )
}

function FloatingBoat({ x }) {
  return (
    <g>
      <line x1={x + WALL} y1={RING} x2={x + WALL + 12} y2={HIGH - 12} stroke="#8a6a3c" strokeWidth="4" />
      <Boat x={x + WALL + 8} y={HIGH - 16} w={124} />
    </g>
  )
}

function Harbour({ x, water }) {
  // the wall, the sea at `water`, the mud
  return (
    <g>
      <rect x={x + WALL} y={water} width={PANEL_W - WALL} height={FLOOR - water} fill={SEA} />
      <line x1={x + WALL} y1={water} x2={x + PANEL_W} y2={water} stroke={SEA_EDGE} strokeWidth="4" />
      <rect x={x + WALL} y={FLOOR} width={PANEL_W - WALL} height={TOP + PANEL_H - FLOOR} fill={MUD} />
      <path d={`M ${x + 150} ${FLOOR + 12} h 26 M ${x + 230} ${FLOOR + 20} h 34 M ${x + 310} ${FLOOR + 10} h 22`} stroke="#8c7350" strokeWidth="4" strokeLinecap="round" />
      <rect x={x} y={QUAY} width={WALL} height={TOP + PANEL_H - QUAY} fill="#cfc8bd" stroke={INK} strokeWidth="3" />
      {[QUAY + 36, QUAY + 72, QUAY + 108, QUAY + 144, QUAY + 180].map((y, i) => (
        <g key={y}>
          <line x1={x} y1={y} x2={x + WALL} y2={y} stroke="#a79f92" strokeWidth="2" />
          <line x1={x + (i % 2 ? 32 : 64)} y1={y - 36} x2={x + (i % 2 ? 32 : 64)} y2={y} stroke="#a79f92" strokeWidth="2" />
        </g>
      ))}
      <circle cx={x + WALL} cy={RING} r="7" fill="none" stroke="#555f69" strokeWidth="4" />
    </g>
  )
}

function Clock({ x, y, hour }) {
  const a = ((hour % 12) * 30 * Math.PI) / 180
  return (
    <g>
      <circle cx={x} cy={y} r="30" fill="#ffffff" stroke={INK} strokeWidth="4" />
      {[0, 90, 180, 270].map((d) => (
        <line key={d} x1={x + 23 * Math.sin((d * Math.PI) / 180)} y1={y - 23 * Math.cos((d * Math.PI) / 180)}
          x2={x + 28 * Math.sin((d * Math.PI) / 180)} y2={y - 28 * Math.cos((d * Math.PI) / 180)} stroke={INK} strokeWidth="3" />
      ))}
      <line x1={x} y1={y} x2={x} y2={y - 22} stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <line x1={x} y1={y} x2={x + 15 * Math.sin(a)} y2={y - 15 * Math.cos(a)} stroke={INK} strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}

function Mug({ x, y }) {
  return (
    <g>
      <path d={`M ${x + 18} ${y + 5} q 10 0 9 9 q -1 8 -10 8`} fill="none" stroke={INK} strokeWidth="3" />
      <path d={`M ${x} ${y} h 20 l -2 24 q 0 3 -3 3 h -10 q -3 0 -3 -3 z`} fill="#ffffff" stroke={INK} strokeWidth="2.5" />
      <rect x={x + 2} y={y + 3} width="16" height="5" fill="#6b3d1f" />
    </g>
  )
}

function Crab({ x, y }) {
  return (
    <g stroke="#9c2a14" strokeWidth="3" strokeLinecap="round">
      <path d={`M ${x - 16} ${y} l -8 8 M ${x - 10} ${y + 4} l -5 9 M ${x + 16} ${y} l 8 8 M ${x + 10} ${y + 4} l 5 9`} fill="none" />
      <path d={`M ${x - 14} ${y - 6} l -10 -12 M ${x + 14} ${y - 6} l 10 -12`} fill="none" />
      <circle cx={x - 26} cy={y - 21} r="6" fill="#e2552f" />
      <circle cx={x + 26} cy={y - 21} r="6" fill="#e2552f" />
      <ellipse cx={x} cy={y - 2} rx="18" ry="11" fill="#e2552f" />
      <circle cx={x - 6} cy={y - 14} r="2.5" fill={INK} stroke="none" />
      <circle cx={x + 6} cy={y - 14} r="2.5" fill={INK} stroke="none" />
    </g>
  )
}

function Fish({ x, y }) {
  return (
    <g>
      <path d={`M ${x} ${y} q 20 -16 40 0 q -20 16 -40 0 z M ${x + 40} ${y} l 14 -10 v 20 z`} fill="#f0b23c" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx={x + 10} cy={y - 3} r="2.5" fill={INK} />
    </g>
  )
}

// Mr Bowen asleep, lying on his back with his head to the left.
function Sleeper({ cx, cy, s }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(-90) scale(${s}) translate(0 -122)`}>
      <MrBowen x={0} y={0} mood="asleep" />
    </g>
  )
}

/* ── the four panels ── */
function TieUp({ x }) {
  return (
    <g>
      <Harbour x={x} water={HIGH} />
      <FloatingBoat x={x} />
      <MrBowen x={x + 48} y={QUAY - 268 * 0.55} scale={0.55} />
      <Clock x={x + 326} y={TOP + 62} hour={6} />
    </g>
  )
}

function Hanging({ x }) {
  return (
    <g>
      <Harbour x={x} water={LOW} />
      <HangingBoat x={x} />
      <MrBowen x={x + 48} y={QUAY - 268 * 0.55} scale={0.55} mood="sad" handRight={[48, 118]} elbowRight={[56, 142]} />
      <Mug x={x + 50} y={QUAY - 96} />
      <text x={x + 116} y={TOP + 96} fontFamily={FONT} fontSize="34" fontWeight="900" fill={MUTED}>???</text>
      <Clock x={x + 326} y={TOP + 62} hour={12} />
    </g>
  )
}

function Asleep({ x }) {
  return (
    <g>
      <Harbour x={x} water={FLOOR - 8} />
      <HangingBoat x={x} />
      <Sleeper cx={x + 232} cy={FLOOR - 24} s={0.5} />
      <text x={x + 236} y={FLOOR - 92} fontFamily={FONT} fontSize="24" fontWeight="900" fill={BLUE}>Z</text>
      <text x={x + 260} y={FLOOR - 122} fontFamily={FONT} fontSize="30" fontWeight="900" fill={BLUE}>z</text>
      <text x={x + 288} y={FLOOR - 158} fontFamily={FONT} fontSize="38" fontWeight="900" fill={BLUE}>z</text>
      <Crab x={x + 340} y={FLOOR - 6} />
      <Clock x={x + 326} y={TOP + 62} hour={3} />
    </g>
  )
}

function Wet({ x }) {
  return (
    <g>
      <rect x={x} y={TOP} width={PANEL_W} height={QUAY - TOP} fill="#fdeedd" />
      <Harbour x={x} water={HIGH} />
      <FloatingBoat x={x} />
      <MrBowen x={x + 296} y={HIGH - 72 * 0.55} scale={0.55} mood="sad" />
      <rect x={x + WALL} y={HIGH} width={PANEL_W - WALL} height={FLOOR - HIGH} fill={SEA} opacity="0.7" />
      <line x1={x + WALL} y1={HIGH} x2={x + PANEL_W} y2={HIGH} stroke={SEA_EDGE} strokeWidth="4" />
      <path d={`M ${x + 256} ${HIGH - 2} q 10 -8 20 0 M ${x + 316} ${HIGH - 2} q 10 -8 20 0`} stroke={SEA_EDGE} strokeWidth="3" fill="none" />
      <Fish x={x + 160} y={FLOOR - 50} />
      <Clock x={x + 326} y={TOP + 62} hour={6} />
    </g>
  )
}

const PANELS = [TieUp, Hanging, Asleep, Wet]

export function BoatStory({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // panels 0..k are shown; k = 4 adds the clue
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const asked = k >= 3

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1640 610" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1640" height="610" rx="16" fill="#ffffff" />
          <defs>
            {PANELS.map((_, i) => (
              <clipPath key={i} id={`boat-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
            ))}
          </defs>
          {PANELS.map((Panel, i) => {
            const x = px(i)
            const shown = i <= k
            return (
              <g key={i}>
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill={shown ? '#fbfdff' : '#f4f6f8'}
                  stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                {shown ? (
                  <g clipPath={`url(#boat-p${i})`}>
                    <Panel x={x} />
                  </g>
                ) : (
                  <text x={x + PANEL_W / 2} y={TOP + 250} fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
                )}
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill="none" stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                <circle cx={x + 30} cy={TOP + 30} r="19" fill={shown ? BLUE : RULE} />
                <text x={x + 30} y={TOP + 38} fontFamily={FONT} fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                {shown && (
                  <g>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 38} fontFamily={FONT} fontSize="23" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 68} fontFamily={FONT} fontSize="23" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="514" width="1580" height="88" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 550 : 568} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'Where does the sea go? And why does it come back?', 'Où va la mer ? Et pourquoi revient-elle ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: something big in the sky is pulling it.', 'Un indice : quelque chose de grand, dans le ciel, la tire.')}
                </text>
              )}
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k === LAST - 1 ? t(lang, 'A clue', 'Un indice') : t(lang, 'What happens next?', 'Et ensuite ?')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
