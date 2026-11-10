// content/y7-math/U05_3/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's frame, a four-panel strip, one panel per
// press, so the class predicts each step before it is shown. Deadpan, never
// flagged as a joke:
//
//   1  He makes a square frame. Four sticks, all 40 cm.
//   2  He nails the corners. One nail each.            (the set-up)
//   3  He puts in the class photo. It fits. Perfect.
//   4  He picks it up. (It is not a square now.)       (the corners turned)
//   then the question the next slide answers — all four sides are still
//   40 cm, so why is it not a square? — and the clue: look at the corners.
//
// Mr Bowen is the cartoon from Coffee, Carbon and Stars, as in 5.2.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { MrBowen } from '../../y7-science/U03_coffee/dating.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8'
const WOOD = '#c8955c', WOOD_EDGE = '#8a5d2e', WALL = '#f6f1e7'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 25 // 395
const BOWEN = 0.5
const SIDE = 150 // 40 cm, drawn

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['Mr Bowen makes a square frame.', 'Four sticks. All 40 cm.'], ['M. Bowen fait un cadre carré.', 'Quatre baguettes de 40 cm.']],
  [['He nails the corners.', 'One nail each.'], ['Il cloue les coins.', 'Un clou par coin.']],
  [['He puts in the class photo.', 'It fits. Perfect.'], ['Il met la photo de classe.', 'Elle rentre. Parfait.']],
  [['He picks it up.', '(It is not a square now.)'], ['Il le soulève.', '(Ce n’est plus un carré.)']],
]
const LAST = 4

/* ── the pieces ── */
function Stick({ a, b }) {
  return (
    <g>
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={WOOD_EDGE} strokeWidth="17" strokeLinecap="round" />
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={WOOD} strokeWidth="11" strokeLinecap="round" />
    </g>
  )
}

// The frame from its four corners, bottom-left round to top-left.
function Frame({ c, nails = false }) {
  return (
    <g>
      <Stick a={c[0]} b={c[1]} />
      <Stick a={c[1]} b={c[2]} />
      <Stick a={c[2]} b={c[3]} />
      <Stick a={c[3]} b={c[0]} />
      {nails && c.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="4.5" fill="#3d4652" />)}
    </g>
  )
}

// The class photo: a sky, a row of heads, a row of shoulders.
function Photo({ x, y, w, h, rotate = 0 }) {
  return (
    <g transform={rotate ? `rotate(${rotate} ${x + w / 2} ${y + h / 2})` : undefined}>
      <rect x={x} y={y} width={w} height={h} fill="#dceefb" stroke={INK} strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={x + 10 + i * ((w - 20) / 4)} y={y + h * 0.62} width={(w - 20) / 4 - 6} height={h * 0.38} rx="6" fill={['#1a5fa8', '#c25e12', '#4a8b23', '#5c2483'][i]} />
          <circle cx={x + 10 + i * ((w - 20) / 4) + ((w - 20) / 4 - 6) / 2} cy={y + h * 0.5} r={h * 0.13} fill="#e8b98f" stroke={INK} strokeWidth="1.5" />
        </g>
      ))}
    </g>
  )
}

function Bowen({ x, mood = 'happy', hammer = false, dx = 0, hand }) {
  const bx = x + 326 + dx
  const by = FLOOR - 268 * BOWEN
  // the hammer first, so his hand closes over the handle
  return (
    <g>
      {hammer && (
        <g>
          <line x1={bx - 46} y1={by + 34} x2={bx - 52} y2={by - 8} stroke="#8a6a3c" strokeWidth="7" strokeLinecap="round" />
          <rect x={bx - 68} y={by - 20} width="32" height="15" rx="3" fill="#59636e" stroke={INK} strokeWidth="2" />
        </g>
      )}
      <MrBowen x={bx} y={by} scale={BOWEN} mood={mood} handLeft={hammer ? [-92, 64] : hand} />
    </g>
  )
}

const square = (x) => [[x + 60, FLOOR - 30], [x + 60 + SIDE, FLOOR - 30], [x + 60 + SIDE, FLOOR - 30 - SIDE], [x + 60, FLOOR - 30 - SIDE]]

/* ── the four panels ── */
function Sticks({ x }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`rotate(${-10 + i * 3} ${x + 80 + i * 34} ${FLOOR})`}>
          <Stick a={[x + 80 + i * 34, FLOOR - 4]} b={[x + 80 + i * 34, FLOOR - 4 - SIDE]} />
        </g>
      ))}
      <Bowen x={x} hammer />
    </g>
  )
}

function Nailed({ x }) {
  return (
    <g>
      <Frame c={square(x)} nails />
      <Bowen x={x} hammer />
    </g>
  )
}

function WithPhoto({ x }) {
  const c = square(x)
  return (
    <g>
      <Photo x={c[3][0] + 12} y={c[3][1] + 12} w={SIDE - 24} h={SIDE - 24} />
      <Frame c={c} nails />
      <Bowen x={x} />
    </g>
  )
}

function Squashed({ x }) {
  // the same four 40 cm sides; the corners have turned (60° and 120°). It
  // leans away from him, so no stick passes behind his head.
  const p0 = [x + 100, FLOOR - 70]
  const p1 = [p0[0] + SIDE, p0[1]]
  const p3 = [p0[0] - SIDE * 0.5, p0[1] - SIDE * 0.866]
  const p2 = [p3[0] + SIDE, p3[1]]
  return (
    <g>
      <Photo x={x + 70} y={FLOOR - 34} w={110} h={30} rotate={-4} />
      <Frame c={[p0, p1, p2, p3]} nails />
      {/* beside the frame, his hand on its right side near the bottom */}
      <Bowen x={x} mood="sad" dx={-26} hand={[-122, 90]} />
    </g>
  )
}

const PANELS = [Sticks, Nailed, WithPhoto, Squashed]

export function FrameStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`frame-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
            ))}
          </defs>
          {PANELS.map((Panel, i) => {
            const x = px(i)
            const shown = i <= k
            return (
              <g key={i}>
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill={shown ? WALL : '#f4f6f8'}
                  stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                {shown ? (
                  <g clipPath={`url(#frame-p${i})`}>
                    <rect x={x} y={FLOOR} width={PANEL_W} height={TOP + PANEL_H - FLOOR} fill="#e4d6c1" />
                    <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke="#b9a68a" strokeWidth="3" />
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
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 38} fontFamily={FONT} fontSize="22" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 68} fontFamily={FONT} fontSize="22" fontWeight="700" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            )
          })}
          {asked && (
            <g>
              <rect x="30" y="514" width="1580" height="88" rx="16" fill="#e2f2f6" stroke={TEAL} strokeWidth="3" />
              <text x="820" y={k >= LAST ? 550 : 568} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK} textAnchor="middle">
                {t(lang, 'All four sides are still 40 cm. Why is it not a square?', 'Les quatre côtés font encore 40 cm. Pourquoi ce n’est pas un carré ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: look at the corners.', 'Un indice : regarde les coins.')}
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
