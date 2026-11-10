// content/y7-science/U03_coffee/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's sad day as a four-panel strip, one panel per
// press, so the class predicts each step before it is shown. Deadpan, never
// flagged as a joke:
//
//   1  The next morning: no coffee.            (an empty mug, 0 mg, 7 o'clock)
//   2  Delirious, he stumbles into a block of ice…   (spiral eyes, zig-zag steps)
//   3  …and does not survive. (He is now very cold.)       (inside the ice)
//   4  Thousands of years later, scientists find him.   (goggles, a magnifier)
//   then the question the rest of the carbon half answers — how long has he
//   been in the ice? — and the clue: his body is a clock, made of carbon.
//
// The number of years is never given here: slide 13 lets the class find it.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from './dating.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8'
const ICE = '#dff1fb', ICE_EDGE = '#8fc1df', GOLD = '#e8a317'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 25

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['The next morning:', 'no coffee.'], ['Le lendemain matin :', 'pas de café.']],
  [['Delirious, he stumbles', 'into a block of ice…'], ['Délirant, il trébuche', 'dans un bloc de glace…']],
  [['…and does not survive.', '(He is now very cold.)'], ['…et ne survit pas.', '(Il a maintenant très froid.)']],
  [['Thousands of years later,', 'scientists find him.'], ['Des milliers d’années après,', 'des savants le trouvent.']],
]
const LAST = 4 // panels 0-3, then the clue

// the house mug (PIC_COFFEE), centred on (x, y)
const MUG = 'M 0 0 L 10 152 Q 12 168 28 168 L 106 168 Q 122 168 124 152 L 134 0 Z'
const HANDLE = 'M 130 34 q 44 0 40 44 q -4 40 -46 40'
function Mug({ x, y, scale, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale}) translate(-67 -84)`}>
      <path d={HANDLE} fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
      <path d={MUG} fill="#f4efe9" stroke={INK} strokeWidth="7" />
    </g>
  )
}

const sparkle = (cx, cy, r) =>
  `M ${cx} ${cy - r} Q ${cx} ${cy} ${cx + r} ${cy} Q ${cx} ${cy} ${cx} ${cy + r} Q ${cx} ${cy} ${cx - r} ${cy} Q ${cx} ${cy} ${cx} ${cy - r} Z`
function Snowflake({ x, y, r = 12 }) {
  return (
    <g stroke={ICE_EDGE} strokeWidth="3" strokeLinecap="round">
      {[0, 60, 120].map((a) => (
        <line key={a} x1={x - r * Math.cos((a * Math.PI) / 180)} y1={y - r * Math.sin((a * Math.PI) / 180)}
          x2={x + r * Math.cos((a * Math.PI) / 180)} y2={y + r * Math.sin((a * Math.PI) / 180)} />
      ))}
    </g>
  )
}

// A block of ice; its children are drawn inside, under a frosty layer.
function IceBlock({ x, y, w, h, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="18" fill={ICE} stroke={ICE_EDGE} strokeWidth="5" />
      {children}
      <rect x={x} y={y} width={w} height={h} rx="18" fill="#cbe8f8" opacity="0.4" />
      <path d={`M ${x + 18} ${y + 30} l 34 -12 M ${x + w - 40} ${y + h - 22} l 26 -14 M ${x + 16} ${y + h - 50} l 18 24`}
        stroke="#ffffff" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
    </g>
  )
}

function Scientist({ x, y, scale = 1, tool }) {
  // head centre at (x, y); a lab coat, goggles and one tool
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-30" y="145" width="26" height="66" rx="10" fill="#2b3a4a" />
      <rect x="4" y="145" width="26" height="66" rx="10" fill="#2b3a4a" />
      <rect x="-36" y="30" width="72" height="124" rx="22" fill="#ffffff" stroke={INK} strokeWidth="3" />
      <path d="M 0 34 v 110" stroke={RULE} strokeWidth="3" />
      <circle cx="0" cy="0" r="30" fill="#e8b98f" stroke={INK} strokeWidth="3" />
      <path d="M -30 -4 q 2 -30 30 -30 q 28 0 30 30 q -12 -14 -30 -14 q -18 0 -30 14 z" fill="#8a8f99" />
      <circle cx="-12" cy="0" r="10" fill="#e0f4f8" stroke={TEAL} strokeWidth="3.5" />
      <circle cx="12" cy="0" r="10" fill="#e0f4f8" stroke={TEAL} strokeWidth="3.5" />
      <circle cx="-12" cy="1" r="3" fill={INK} />
      <circle cx="12" cy="1" r="3" fill={INK} />
      <path d="M -7 18 h 14" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {tool === 'glass' && (
        <g>
          <path d="M -30 70 L -66 44" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
          <path d="M -30 70 L -66 44" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />
          <line x1="-66" y1="44" x2="-78" y2="34" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <circle cx="-92" cy="22" r="20" fill="#eaf6fb" stroke={INK} strokeWidth="5" opacity="0.95" />
        </g>
      )}
      {tool === 'clipboard' && (
        <g>
          <rect x="14" y="62" width="40" height="52" rx="5" fill="#d9b98f" stroke={INK} strokeWidth="3" />
          <rect x="20" y="70" width="28" height="38" fill="#ffffff" />
          <path d="M 24 78 h 20 M 24 86 h 20 M 24 94 h 14" stroke={MUTED} strokeWidth="2.5" />
        </g>
      )}
    </g>
  )
}

/* ── the four panels ── */
function NoCoffee({ x }) {
  return (
    <g>
      {/* the clock says 7 */}
      <circle cx={x + 300} cy="88" r="36" fill="#ffffff" stroke={INK} strokeWidth="4" />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1={x + 300 + 28 * Math.sin((a * Math.PI) / 180)} y1={88 - 28 * Math.cos((a * Math.PI) / 180)}
          x2={x + 300 + 33 * Math.sin((a * Math.PI) / 180)} y2={88 - 33 * Math.cos((a * Math.PI) / 180)} stroke={INK} strokeWidth="3" />
      ))}
      <line x1={x + 300} y1="88" x2={x + 300} y2="62" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <line x1={x + 300} y1="88" x2={x + 291} y2="104" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      {/* holding the empty mug out, upside down */}
      <MrBowen x={x + 140} y={FLOOR - 236} scale={0.88} mood="sad" handRight={[104, 75]} />
      {/* a drop of worry */}
      <path d={`M ${x + 92} ${FLOOR - 250} q -9 13 0 18 q 9 -5 0 -18 z`} fill="#9fd3f0" stroke={BLUE} strokeWidth="2" />
      <Mug x={x + 262} y={FLOOR - 175} scale={0.36} rotate={168} />
      <text x={x + 262} y={FLOOR - 105} fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY} textAnchor="middle">0 mg</text>
    </g>
  )
}

function Stumble({ x }) {
  return (
    <g>
      <path d={`M ${x + 18} ${FLOOR - 4} L ${x + 46} ${FLOOR - 22} L ${x + 72} ${FLOOR - 2} L ${x + 98} ${FLOOR - 24} L ${x + 120} ${FLOOR - 6}`}
        fill="none" stroke={MUTED} strokeWidth="4" strokeDasharray="4 9" strokeLinecap="round" />
      <IceBlock x={x + 286} y={FLOOR - 190} w={130} h={190} />
      <g transform={`rotate(-14 ${x + 170} ${FLOOR})`}>
        <MrBowen x={x + 170} y={FLOOR - 220} scale={0.82} mood="dizzy" />
      </g>
      <path d={`${sparkle(x + 104, FLOOR - 262, 13)} ${sparkle(x + 160, FLOOR - 296, 10)} ${sparkle(x + 218, FLOOR - 270, 13)}`} fill={GOLD} />
      <text x={x + 252} y={FLOOR - 296} fontFamily={FONT} fontSize="32" fontWeight="900" fill={MUTED}>???</text>
    </g>
  )
}

function Frozen({ x }) {
  return (
    <g>
      <Snowflake x={x + 38} y={110} />
      <Snowflake x={x + 344} y={150} r={10} />
      <Snowflake x={x + 34} y={290} r={9} />
      <IceBlock x={x + 70} y={TOP + 42} w={240} h={FLOOR - TOP - 42}>
        <MrBowen x={x + 190} y={TOP + 86} scale={0.88} frozen />
      </IceBlock>
      <Mug x={x + 344} y={FLOOR - 16} scale={0.2} rotate={90} />
    </g>
  )
}

function Found({ x }) {
  return (
    <g>
      <IceBlock x={x + 20} y={FLOOR - 220} w={150} h={220}>
        <MrBowen x={x + 95} y={FLOOR - 196} scale={0.62} frozen />
      </IceBlock>
      <path d={`M ${x + 40} ${FLOOR - 160} l 18 22 l -10 18 l 20 26 M ${x + 150} ${FLOOR - 60} l -14 14 l 8 16`}
        stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Scientist x={x + 258} y={FLOOR - 180} scale={0.85} tool="glass" />
      <Scientist x={x + 330} y={FLOOR - 160} scale={0.72} tool="clipboard" />
      {/* Hmm… */}
      <path d={`M ${x + 268} ${TOP + 96} l -14 26 l 30 -16`} fill="#ffffff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx={x + 290} cy={TOP + 66} rx="62" ry="38" fill="#ffffff" stroke={INK} strokeWidth="3" />
      <text x={x + 290} y={TOP + 76} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK} textAnchor="middle">Hmm…</text>
    </g>
  )
}

const PANELS = [NoCoffee, Stumble, Frozen, Found]

export function StoryStrip({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`story-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
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
                  <g clipPath={`url(#story-p${i})`}>
                    <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke={RULE} strokeWidth="3" />
                    <Panel x={x} />
                  </g>
                ) : (
                  <text x={x + PANEL_W / 2} y={TOP + 250} fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
                )}
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
                {t(lang, 'How can they tell how long he has been in the ice?', 'Comment savoir depuis combien de temps il est dans la glace ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: his body is a clock. The clock is made of carbon.', 'Un indice : son corps est une horloge. L’horloge est faite de carbone.')}
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
