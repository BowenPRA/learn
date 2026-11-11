// content/y7-science/U04_2/zoom.jsx
// INSIDE MR BOWEN'S NOSE — the stepper to say first: how small is a virus?
// Three frames left to right, one press each, the class predicting before
// every press ("Zoom in 1000 times: what will we see?").
//
//   ×1        Mr Bowen's face, an orange box on his nose         your eyes
//   ×1000     the lining of his nose, seen from the side: a row
//             of cells with the air above them                   a microscope
//   ×100 000  the edge of one cell, flu viruses stuck on it      an electron microscope
//
// The last press says how small, in a picture the class can hold: if one cell
// were as big as the classroom, a flu virus would be a ping-pong ball.
// (A typical body cell is about 0.02 mm, a flu virus about 0.0001 mm: 200
// times smaller. A classroom of about 8 m ÷ 200 = 4 cm, a ping-pong ball.)
//
// The frames are drawn to honest proportions: about seven cells across the
// ×1000 frame (0.15 mm), and viruses about 1/15 of the ×100 000 frame.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw, ZoomIn } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { MrBowen } from '../U03_coffee/dating.jsx'
import { INK, KEY, MUTED, FONT, CYTO, NUCLEUS, virus, mark } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const RULE = '#d5dbe1', TEAL = '#0087a8'
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

const FX = [20, 530, 1040]
const FY = 20
const FW = 440
const FH = 330
const HEAD = 2.8 // Mr Bowen's scale in the first frame
// His nostril (his own frame ~ (2, 46)) in the first frame
const NOSE = { x: FX[0] + 220 + 2 * HEAD, y: FY + 170 - 24 * HEAD + 46 * HEAD }
// The box in the second frame, on the top of one cell, where the air is
const EDGE = { x: FX[1] + 282, y: FY + 120 }

// The lining of the nose, seen from the side: tall cells side by side, their
// tops facing the air. About seven across the frame (0.15 mm at ×1000).
const COLS = [0, 60, 124, 186, 252, 312, 378, 440]
const TOPS = [118, 124, 116, 122, 120, 126, 118]
const liningCell = (i) => {
  const x0 = COLS[i] + 2, x1 = COLS[i + 1] - 2, y = TOPS[i], r = 14
  return `M ${x0} 340 V ${y + r} Q ${x0} ${y} ${x0 + r} ${y} H ${x1 - r} Q ${x1} ${y} ${x1} ${y + r} V 340 Z`
}

function Frame({ i, shown, tag, children }) {
  const x = FX[i]
  return (
    <g>
      <defs><clipPath id={`zoom-f${i}`}><rect x={x} y={FY} width={FW} height={FH} rx="20" /></clipPath></defs>
      <rect x={x} y={FY} width={FW} height={FH} rx="20" fill={shown ? '#ffffff' : '#f4f6f8'} />
      {shown ? <g clipPath={`url(#zoom-f${i})`}>{children}</g> : (
        <text x={x + FW / 2} y={FY + 215} fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
      )}
      <rect x={x} y={FY} width={FW} height={FH} rx="20" fill="none" stroke={shown ? '#c9d3dc' : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
      {shown && tag && (
        <g>
          <rect x={x + 12} y={FY + 12} width={tag.length * 15 + 28} height="44" rx="12" fill="#ffffff" fillOpacity="0.92" stroke="#c9d3dc" strokeWidth="2" />
          <text x={x + 26} y={FY + 43} fontFamily={FONT} fontSize="26" fontWeight="900" fill={INK}>{tag}</text>
        </g>
      )}
    </g>
  )
}

export function NoseZoom({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // 0: his face · 1: cells · 2: viruses · 3: how small
  const big = isDisplayMode
  const LAST = 3

  const under = [
    ['× 1', t(lang, 'your eyes', 'tes yeux')],
    ['× 1000', t(lang, 'a microscope', 'un microscope')],
    ['× 100 000', t(lang, 'an electron microscope', 'un microscope électronique')],
  ]
  const prompt = [
    [t(lang, 'Zoom in 1000 times. What will we see?', 'Zoome 1000 fois. Que va-t-on voir ?'), MUTED],
    [t(lang, 'Zoom in 100 times more. What will we see?', 'Zoome encore 100 fois. Que va-t-on voir ?'), MUTED],
    [t(lang, 'A school microscope cannot see a virus.', 'Le microscope de l’école ne voit pas un virus.'), KEY],
    [t(lang, 'A cell as big as this classroom: a virus as big as a ping-pong ball.', 'Une cellule grande comme la classe : un virus gros comme une balle de ping-pong.'), KEY],
  ][k]

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />

          {/* ×1: Mr Bowen's face */}
          <Frame i={0} shown tag={t(lang, 'Mr Bowen', 'M. Bowen')}>
            <rect x={FX[0]} y={FY} width={FW} height={FH} fill="#f4f8fb" />
            <MrBowen x={FX[0] + 220} y={FY + 170 - 24 * HEAD} scale={HEAD} />
          </Frame>
          <rect x={NOSE.x - 14} y={NOSE.y - 14} width="28" height="28" fill="none" stroke={KEY} strokeWidth="4" />

          {/* ×1000: the cells lining his nose */}
          <Frame i={1} shown={k >= 1} tag={t(lang, 'cells', 'des cellules')}>
            <rect x={FX[1]} y={FY} width={FW} height={FH} fill="#f4f8fb" />
            <g transform={`translate(${FX[1]} ${FY})`}>
              {TOPS.map((top, j) => (
                <g key={j}>
                  <path d={liningCell(j)} fill={CYTO} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
                  <ellipse cx={(COLS[j] + COLS[j + 1]) / 2} cy={top + 120} rx="15" ry="22" fill={NUCLEUS} stroke={INK} strokeWidth="2" />
                </g>
              ))}
            </g>
          </Frame>
          {k >= 1 && (
            <g>
              <path d={`M ${NOSE.x + 14} ${NOSE.y - 14} L ${FX[1]} ${FY} M ${NOSE.x + 14} ${NOSE.y + 14} L ${FX[1]} ${FY + FH}`} stroke={KEY} strokeWidth="3" strokeDasharray="10 8" fill="none" />
              <rect x={EDGE.x - 14} y={EDGE.y - 14} width="28" height="28" fill="none" stroke={KEY} strokeWidth="4" />
            </g>
          )}

          {/* ×100 000: the edge of one cell, flu viruses on it */}
          <Frame i={2} shown={k >= 2} tag={t(lang, 'flu viruses', 'des virus de la grippe')}>
            <rect x={FX[2]} y={FY} width={FW} height={FH} fill="#f4f8fb" />
            <path d={`M ${FX[2]} ${FY + 250} C ${FX[2] + 140} ${FY + 232} ${FX[2] + 300} ${FY + 232} ${FX[2] + FW} ${FY + 244} L ${FX[2] + FW} ${FY + FH} L ${FX[2]} ${FY + FH} Z`} fill={CYTO} stroke={INK} strokeWidth="6" />
            <Pic svg={virus(FX[2] + 92, FY + 216, 0.42, 6)} />
            <Pic svg={virus(FX[2] + 222, FY + 211, 0.42, 14)} />
            <Pic svg={virus(FX[2] + 350, FY + 214, 0.42, 3)} />
            <Pic svg={virus(FX[2] + 150, FY + 110, 0.42, 20)} />
            <Pic svg={virus(FX[2] + 318, FY + 92, 0.42, 9)} />
          </Frame>
          {k >= 2 && (
            <path d={`M ${EDGE.x + 14} ${EDGE.y - 14} L ${FX[2]} ${FY} M ${EDGE.x + 14} ${EDGE.y + 14} L ${FX[2]} ${FY + FH}`} stroke={KEY} strokeWidth="3" strokeDasharray="10 8" fill="none" />
          )}

          {/* under each frame: how much bigger, and what can see it */}
          {under.map(([times, seen], i) => {
            const shown = i <= k
            const x = FX[i] + 12
            return (
              <g key={i}>
                <text x={x} y="398" fontFamily={FONT} fontSize="38" fontWeight="900" fill={shown ? TEAL : RULE}>{times}</text>
                {shown && (
                  <g>
                    <Pic svg={mark(x + 18, 438, 'yes', 0.75)} />
                    <text x={x + 44} y="447" fontFamily={FONT} fontSize="27" fontWeight="800" fill={INK}>{seen}</text>
                  </g>
                )}
              </g>
            )
          })}

          {/* the prompt, or what the press showed */}
          <rect x="20" y="474" width="1460" height="72" rx="16" fill={k >= 2 ? '#fff4e8' : '#f4f6f8'} stroke={k >= 2 ? KEY : RULE} strokeWidth="3" />
          <text x="750" y="521" fontFamily={FONT} fontSize={k === 3 ? 27 : 30} fontWeight="900" fill={prompt[1]} textAnchor="middle">{prompt[0]}</text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={k < 2 ? ZoomIn : ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k < 2 ? t(lang, 'Zoom in', 'Zoomer') : t(lang, 'How small?', 'Si petit ?')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
