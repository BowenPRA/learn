// content/y7-science/U03_tidelab/story.jsx
// WHAT WENT WRONG? — Mr Bowen measures the river, a four-panel strip, one
// panel per press. Deadpan, never flagged as a joke. Each panel is one of the
// four rules of reading the pole, broken:
//
//   1  8:30   he reads the pole from his classroom window     (get close)
//   2  10:30  a boat goes past; he reads the top of the splash (read the middle)
//   3  12:30  lunch first; he reads it at 1:15                 (on time)
//   4  2:30   he writes "75" in his notebook. 75 what?         (the unit)
//   then the question — how many of his readings can we use? (none) — and a
//   clue that is the method the next slide writes down.
//
// Mr Bowen is the shared cartoon (src/lib/mrBowen.js, via Coffee's MrBowen).
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', MUTED = '#5b6770', RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8'
const SEA = '#cfe6f5', SEA_EDGE = '#5b9bd5', SPLASH = '#eaf5fd', GRASS = '#a8d08d', BAMBOO = '#dcb862', NODE = '#a07d2e'
const WALL = '#efe3cf', ROOM = '#e7ebf0', WOOD = '#b5835a'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['8:30. He reads the pole', 'from his window.'], ['8 h 30. Il lit la perche', 'depuis sa fenêtre.']],
  [['10:30. A boat goes past.', 'He reads the splash.'], ['10 h 30. Un bateau passe.', 'Il lit la grosse vague.']],
  [['12:30. Lunch first.', 'He reads it at 1:15.'], ['12 h 30. Il mange d’abord.', 'Il lit la perche à 13 h 15.']],
  [['2:30. He writes it', 'in his notebook.'], ['14 h 30. Il l’écrit', 'dans son cahier.']],
]
const LAST = 4 // panels 0-3, then the clue

/* ── the pieces ── */
function Clock({ x, y, h, m, r = 30 }) {
  const ha = (((h % 12) + m / 60) * 30 * Math.PI) / 180
  const ma = (m * 6 * Math.PI) / 180
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#ffffff" stroke={INK} strokeWidth="4" />
      {[0, 90, 180, 270].map((d) => (
        <line key={d} x1={x + r * 0.76 * Math.sin((d * Math.PI) / 180)} y1={y - r * 0.76 * Math.cos((d * Math.PI) / 180)}
          x2={x + r * 0.93 * Math.sin((d * Math.PI) / 180)} y2={y - r * 0.93 * Math.cos((d * Math.PI) / 180)} stroke={INK} strokeWidth="3" />
      ))}
      <line x1={x} y1={y} x2={x + r * 0.5 * Math.sin(ha)} y2={y - r * 0.5 * Math.cos(ha)} stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <line x1={x} y1={y} x2={x + r * 0.74 * Math.sin(ma)} y2={y - r * 0.74 * Math.cos(ma)} stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
    </g>
  )
}

// A speech bubble from (x, y), w × h, its tail ending at (tx, ty).
function Bubble({ x, y, w, h, tx, ty, size = 28, children }) {
  const bx = Math.min(Math.max(tx, x + 24), x + w - 24)
  return (
    <g>
      <path d={`M ${bx - 14} ${y + h - 2} L ${tx} ${ty} L ${bx + 14} ${y + h - 2} Z`} fill="#ffffff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x={x} y={y} width={w} height={h} rx="18" fill="#ffffff" stroke={INK} strokeWidth="3" />
      <rect x={bx - 12} y={y + h - 5} width="24" height="6" fill="#ffffff" />
      <text x={x + w / 2} y={y + h / 2 + size * 0.36} fontFamily={FONT} fontSize={size} fontWeight="900" fill={INK} textAnchor="middle">{children}</text>
    </g>
  )
}

// The bamboo pole, its marks every `gap` px.
function Pole({ x, top, bottom, w = 18, gap = 22 }) {
  const marks = []
  for (let y = bottom - gap; y > top + 8; y -= gap) marks.push(y)
  return (
    <g>
      <rect x={x - w / 2} y={top} width={w} height={bottom - top} rx={w / 3} fill={BAMBOO} stroke={INK} strokeWidth="2.5" />
      {[0.3, 0.62].map((f) => <line key={f} x1={x - w / 2} y1={top + f * (bottom - top)} x2={x + w / 2} y2={top + f * (bottom - top)} stroke={NODE} strokeWidth="3" />)}
      {marks.map((y, i) => <line key={y} x1={x - w / 2} y1={y} x2={i % 2 ? x : x + w / 2} y2={y} stroke={INK} strokeWidth="2" />)}
    </g>
  )
}

function Boat({ x, y, w = 92 }) {
  return (
    <g>
      <path d={`M ${x} ${y} h ${w} l ${-w * 0.14} ${w * 0.24} h ${-w * 0.72} Z`} fill="#d83a2e" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <line x1={x + w * 0.1} y1={y + w * 0.06} x2={x + w * 0.9} y2={y + w * 0.06} stroke="#ffffff" strokeWidth="3" />
    </g>
  )
}

/* ── the four panels ── */
// 1. From the window: the river far away, the pole a speck.
function Window({ x, lang }) {
  return (
    <g>
      <rect x={x + 176} y={300} width={PANEL_W - 176} height={TOP + PANEL_H - 300} fill={GRASS} />
      <rect x={x + 176} y={326} width={PANEL_W - 176} height={24} fill={SEA} />
      <line x1={x + 176} y1={326} x2={x + PANEL_W} y2={326} stroke={SEA_EDGE} strokeWidth="3" />
      <rect x={x + 315} y={302} width="5" height="46" fill={BAMBOO} stroke={INK} strokeWidth="1.5" />
      <rect x={x + 26} y={120} width={124} height={142} fill={ROOM} />
      <MrBowen x={x + 88} y={150} scale={0.62} />
      <path d={`M ${x} ${TOP} h 176 v ${PANEL_H} h -176 Z M ${x + 26} 120 v 142 h 124 v -142 Z`} fill={WALL} fillRule="evenodd" />
      <line x1={x + 176} y1={TOP} x2={x + 176} y2={TOP + PANEL_H} stroke="#c9b89a" strokeWidth="3" />
      <rect x={x + 26} y={120} width={124} height={142} fill="none" stroke={INK} strokeWidth="4" />
      <rect x={x + 16} y={262} width={144} height={12} fill="#d9cbb0" stroke={INK} strokeWidth="2.5" />
      <line x1={x + 112} y1={164} x2={x + 314} y2={304} stroke={MUTED} strokeWidth="2.5" strokeDasharray="8 7" />
      <Clock x={x + 88} y={72} h={8} m={30} />
      <Bubble x={x + 196} y={54} w={164} h={60} tx={x + 128} ty={142}>{t(lang, 'Um… 100?', 'Euh… 100 ?')}</Bubble>
    </g>
  )
}

// 2. A boat goes past: he reads the top of the splash.
function Splash({ x, lang }) {
  return (
    <g>
      <rect x={x + 150} y={312} width={PANEL_W - 150} height={TOP + PANEL_H - 312} fill={SEA} />
      <line x1={x + 150} y1={312} x2={x + PANEL_W} y2={312} stroke={SEA_EDGE} strokeWidth="4" />
      <path d={`M ${x} 268 L ${x + 112} 268 Q ${x + 142} 272 ${x + 162} 312 L ${x + 162} ${TOP + PANEL_H} L ${x} ${TOP + PANEL_H} Z`} fill={GRASS} />
      <path d={`M ${x} 268 L ${x + 112} 268 Q ${x + 142} 272 ${x + 162} 312`} fill="none" stroke="#7fae62" strokeWidth="3" />
      <Pole x={x + 236} top={120} bottom={TOP + PANEL_H} />
      <path d={`M ${x + 206} 314 C ${x + 196} 260 ${x + 214} 200 ${x + 228} 168 C ${x + 232} 158 ${x + 242} 158 ${x + 246} 168 C ${x + 258} 200 ${x + 276} 260 ${x + 266} 314 Z`}
        fill={SPLASH} stroke={SEA_EDGE} strokeWidth="3" opacity="0.88" />
      {[[204, 186, 6], [270, 176, 5], [216, 148, 5], [258, 138, 4], [236, 128, 4]].map(([dx, y, r]) => (
        <circle key={dx} cx={x + dx} cy={y} r={r} fill={SPLASH} stroke={SEA_EDGE} strokeWidth="2.5" />
      ))}
      <Boat x={x + 282} y={298} />
      <path d={`M ${x + 262} 322 q 10 -8 20 0 M ${x + 284} 334 q 10 -8 20 0`} fill="none" stroke={SEA_EDGE} strokeWidth="3" />
      <MrBowen x={x + 60} y={268 - 268 * 0.5} scale={0.5} handRight={[74, 30]} />
      <Clock x={x + 330} y={70} h={10} m={30} />
      <Bubble x={x + 20} y={34} w={112} h={58} tx={x + 62} ty={112} size={32}>{t(lang, '150!', '150 !')}</Bubble>
    </g>
  )
}

// 3. Lunch first: the clock says 1:15.
function Lunch({ x }) {
  return (
    <g>
      <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} fill="#fdf6ec" />
      <Clock x={x + 296} y={100} h={1} m={15} r={46} />
      <MrBowen x={x + 130} y={160} scale={0.62} handRight={[70, 150]} />
      <path d={`M ${x + 172} 250 L ${x + 216} 280 M ${x + 178} 244 L ${x + 224} 274`} stroke="#8a6a3c" strokeWidth="4" strokeLinecap="round" />
      <rect x={x + 30} y={300} width={320} height={TOP + PANEL_H - 300} fill="#c99a6b" stroke={INK} strokeWidth="3" />
      <rect x={x + 20} y={292} width={340} height={14} rx="4" fill={WOOD} stroke={INK} strokeWidth="3" />
      <path d={`M ${x + 170} 262 h 92 q -6 30 -46 30 q -40 0 -46 -30 z`} fill="#ffffff" stroke={INK} strokeWidth="3" />
      <path d={`M ${x + 174} 270 h 84`} stroke={BLUE} strokeWidth="3" />
      <path d={`M ${x + 182} 264 q 34 8 68 0`} fill="none" stroke="#e9c46a" strokeWidth="4" />
      {[196, 216, 236].map((dx) => (
        <path key={dx} d={`M ${x + dx} 252 q -8 -10 0 -20 q 8 -10 0 -20`} fill="none" stroke="#b8c4cf" strokeWidth="3" strokeLinecap="round" />
      ))}
    </g>
  )
}

// 4. He writes it down: 75. (75 what?)
function Notebook({ x, lang }) {
  return (
    <g>
      <rect x={x} y={330} width={PANEL_W} height={TOP + PANEL_H - 330} fill={GRASS} />
      <rect x={x + 250} y={344} width={PANEL_W - 250} height={TOP + PANEL_H - 344} fill={SEA} />
      <line x1={x + 250} y1={344} x2={x + PANEL_W} y2={344} stroke={SEA_EDGE} strokeWidth="3" />
      <Pole x={x + 330} top={226} bottom={TOP + PANEL_H} w={16} />
      <rect x={x + 150} y={236} width={114} height={112} rx="6" fill="#ffffff" stroke={INK} strokeWidth="3" />
      {[166, 186, 206, 226, 246].map((dx) => <circle key={dx} cx={x + dx} cy={244} r="4" fill="none" stroke={MUTED} strokeWidth="2.5" />)}
      <path d={`M ${x + 160} 270 H ${x + 254} M ${x + 160} 330 H ${x + 254}`} stroke="#c9d6e2" strokeWidth="2" />
      <text x={x + 207} y={322} fontFamily={FONT} fontSize="54" fontWeight="900" fill={BLUE} textAnchor="middle">75</text>
      <MrBowen x={x + 110} y={222} scale={0.7} handRight={[60, 111]} />
      <Clock x={x + 326} y={70} h={2} m={30} />
      <Bubble x={x + 18} y={104} w={140} h={58} tx={x + 96} ty={196} size={30}>{t(lang, 'Done!', 'Fini !')}</Bubble>
    </g>
  )
}

const PANELS = [Window, Splash, Lunch, Notebook]

export function RiverStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`river-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
            ))}
          </defs>
          {PANELS.map((Panel, i) => {
            const x = px(i)
            const shown = i <= k
            return (
              <g key={i}>
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill={shown ? '#fbfdff' : '#f4f6f8'} />
                {shown ? (
                  <g clipPath={`url(#river-p${i})`}>
                    <Panel x={x} lang={lang} />
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
                {t(lang, 'How many of his four readings can we use?', 'Combien de ses quatre mesures peut-on utiliser ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: a good reading is close, calm, on time, and has a unit.', 'Un indice : une bonne mesure se fait de près, sans vagues, à l’heure, avec une unité.')}
                </text>
              )}
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k === LAST - 1 ? t(lang, 'A clue', 'Un indice') : t(lang, 'What next?', 'Et ensuite ?')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
