// content/y7-math/U06_2/story.jsx
// WHAT HAPPENS NEXT? — Mr Bowen's phở, a four-panel strip, one panel per
// press, so the class predicts each step before it is shown. Deadpan, never
// flagged as a joke:
//
//   1  Mr Bowen cooks phở for the whole school. One huge pot.
//   2  He pours in the salt. He does not stir.          (the set-up)
//   3  He tastes one spoon from the top: far too salty!
//   4  He adds 10 litres of water. Now it tastes of nothing.
//   then the question the next slide answers — his spoon said "too salty",
//   so why was it wrong about the pot? — and the clue: where was the salt?
//
// One spoon is a sample of the pot; it only tells you about the pot if the
// pot is stirred first (a fair sample). Mr Bowen is the shared cartoon, as in
// 5.2, 5.3 and 6.1.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../../y7-science/U03_models/ui.jsx'
import { MrBowen } from '../../y7-science/U03_coffee/dating.jsx'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif"
const INK = '#2b2b2b', RULE = '#d5dbe1', TEAL = '#0087a8', BLUE = '#1a5fa8'
const WALL = '#f6f1e7'

const PANEL_W = 380
const PANEL_H = 400
const TOP = 20
const px = (i) => 30 + i * (PANEL_W + 20)
const FLOOR = TOP + PANEL_H - 25 // 395
const BOWEN = 0.5

// [English lines, French lines] under each panel
const CAPTIONS = [
  [['Mr Bowen cooks phở', 'for the whole school.'], ['M. Bowen cuisine du phở', 'pour toute l’école.']],
  [['He pours in the salt.', 'He does not stir.'], ['Il verse le sel.', 'Il ne remue pas.']],
  [['He tastes one spoon', 'from the top: too salty!'], ['Il goûte une cuillère', 'du dessus : trop salé !']],
  [['He adds 10 litres of water.', 'Now it tastes of nothing.'], ['Il ajoute 10 litres d’eau.', 'Ça n’a plus de goût.']],
]
const LAST = 4

// The stove and the pot; `salt` 'top' or none; `full` makes it overflow.
function Pot({ x, salt = false, full = false }) {
  const px0 = x + 40, w = 190, rim = FLOOR - 190
  return (
    <g>
      <rect x={x + 26} y={FLOOR - 78} width="218" height="78" fill="#59636e" stroke={INK} strokeWidth="2.5" />
      <rect x={x + 60} y={FLOOR - 92} width="150" height="14" rx="3" fill="#3d4652" />
      <path d={`M ${px0} ${rim} L ${px0 + 10} ${FLOOR - 92} L ${px0 + w - 10} ${FLOOR - 92} L ${px0 + w} ${rim} Z`} fill="#9aa5b1" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x={px0 - 18} y={rim + 14} width="20" height="10" rx="4" fill={INK} />
      <rect x={px0 + w - 2} y={rim + 14} width="20" height="10" rx="4" fill={INK} />
      <ellipse cx={px0 + w / 2} cy={rim} rx={w / 2} ry="16" fill={full ? '#cfe6f5' : '#e8c88a'} stroke={INK} strokeWidth="3" />
      {salt && <path d={`M ${px0 + 60} ${rim + 2} q 35 -26 70 0 z`} fill="#ffffff" stroke="#9aa5b1" strokeWidth="2" />}
      {full && (
        <g fill="#7fb2e5">
          <path d={`M ${px0 + 4} ${rim + 4} q -8 30 -2 60 q 10 -26 8 -60 z`} />
          <path d={`M ${px0 + w - 4} ${rim + 4} q 8 30 2 60 q -10 -26 -8 -60 z`} />
        </g>
      )}
      <path d={`M ${px0 + 70} ${rim - 22} q -10 -14 0 -28 M ${px0 + 110} ${rim - 22} q -10 -14 0 -28`} fill="none" stroke="#9aa5b1" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Bowen({ x, mood = 'happy', hand, dx = 0, children }) {
  const bx = x + 318 + dx
  const by = FLOOR - 268 * BOWEN
  return (
    <g>
      {children /* the prop first, so his hand closes over it */}
      <MrBowen x={bx} y={by} scale={BOWEN} mood={mood} handLeft={hand} />
    </g>
  )
}

/* ── the four panels ── */
function Cooks({ x }) {
  const bx = x + 318, by = FLOOR - 268 * BOWEN
  return (
    <g>
      <Pot x={x} />
      <Bowen x={x} hand={[-84, 70]}>
        <line x1={bx - 42} y1={by + 36} x2={bx - 96} y2={by - 6} stroke="#8a6a3c" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx={bx - 100} cy={by - 10} rx="12" ry="8" fill="#c9ced4" stroke={INK} strokeWidth="2" />
      </Bowen>
    </g>
  )
}

function Salts({ x }) {
  const bx = x + 318, by = FLOOR - 268 * BOWEN
  return (
    <g>
      <Pot x={x} salt />
      <Bowen x={x} hand={[-80, 40]}>
        <rect x={bx - 78} y={by - 4} width="34" height="44" rx="6" fill="#ffffff" stroke={INK} strokeWidth="2.5" transform={`rotate(-50 ${bx - 61} ${by + 18})`} />
        <line x1={bx - 92} y1={by + 22} x2={bx - 110} y2={by + 52} stroke="#ffffff" strokeWidth="6" strokeDasharray="3 5" />
      </Bowen>
    </g>
  )
}

function Tastes({ x }) {
  const bx = x + 318, by = FLOOR - 268 * BOWEN
  return (
    <g>
      <Pot x={x} salt />
      <Bowen x={x} mood="dizzy" hand={[-40, 40]}>
        <line x1={bx - 20} y1={by + 20} x2={bx - 6} y2={by + 2} stroke="#8a6a3c" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx={bx - 3} cy={by} rx="9" ry="6" fill="#c9ced4" stroke={INK} strokeWidth="2" />
      </Bowen>
    </g>
  )
}

function Waters({ x }) {
  const bx = x + 318, by = FLOOR - 268 * BOWEN
  return (
    <g>
      <Pot x={x} salt full />
      <Bowen x={x} mood="sad" hand={[-70, 90]}>
        <path d={`M ${bx - 66} ${by + 46} L ${bx - 60} ${by + 92} L ${bx - 26} ${by + 92} L ${bx - 20} ${by + 46} Z`} fill="#7fb2e5" stroke={INK} strokeWidth="2.5" />
        <path d={`M ${bx - 66} ${by + 46} Q ${bx - 43} ${by + 22} ${bx - 20} ${by + 46}`} fill="none" stroke={INK} strokeWidth="2.5" />
      </Bowen>
    </g>
  )
}

const PANELS = [Cooks, Salts, Tastes, Waters]

export function PhoStory({ lang = 'en', isDisplayMode = false }) {
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
              <clipPath key={i} id={`pho-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>
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
                  <g clipPath={`url(#pho-p${i})`}>
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
                {t(lang, 'His spoon said “too salty”. Why was it wrong about the pot?', 'Sa cuillère disait « trop salé ». Pourquoi se trompait-elle sur la marmite ?')}
              </text>
              {k >= LAST && (
                <text x="820" y="586" fontFamily={FONT} fontSize="25" fontWeight="900" fill={TEAL} textAnchor="middle">
                  {t(lang, 'A clue: where was the salt?', 'Un indice : où était le sel ?')}
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
