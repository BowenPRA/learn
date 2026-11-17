// content/y7-science/U04_5/fruit.jsx
// BUILD A KEY — the stepper the class says first. Four fruits from a market in
// Vietnam, in real photographs. Each press makes one split, the way page 144
// says to build a key: split them into two groups, then split each group
// again, until every fruit has its own name.
//
//   0  the four fruits, mixed; three empty question boxes
//   1  Is the skin red or pink?  rambutan, dragon fruit | banana, lime
//   2  Does the skin have hairs? rambutan | dragon fruit
//   3  Is it longer than 10 cm?  banana | lime
//   then: 4 fruits, 3 questions.
// Before each press the class suggests a question that splits the group in
// front of it; the press shows Mr Bowen's. The question stays hidden until
// the press. The finished key is slide 8's picture.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, FONT, TEAL, RULE } from '../U04_4/art.js'
import rambutan from './images/rambutan.jpg'
import dragonFruit from './images/dragon-fruit.jpg'
import banana from './images/banana.jpg'
import lime from './images/lime.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)

// Four leaf slots, left to right, and the fruit that ends up in each.
const SLOT_X = [40, 400, 780, 1140] // left edge of each photo
const PW = 320, PH = 140, PY = 278
const FRUITS = [
  { id: 'rambutan', pic: rambutan, name: ['rambutan', 'ramboutan'], start: 1, end: 0 },
  { id: 'dragon', pic: dragonFruit, name: ['dragon fruit', 'fruit du dragon'], start: 3, end: 1 },
  { id: 'banana', pic: banana, name: ['banana', 'banane'], start: 0, end: 2 },
  { id: 'lime', pic: lime, name: ['lime', 'citron vert'], start: 2, end: 3 },
]
// The three questions: where their box sits, and the step that shows them.
const QS = [
  { x: 520, y: 22, w: 460, step: 1, q: ['Is the skin red or pink?', 'La peau est-elle rouge ou rose ?'] },
  { x: 60, y: 150, w: 600, step: 2, q: ['Does the skin have hairs?', 'La peau a-t-elle des poils ?'] },
  { x: 840, y: 150, w: 600, step: 3, q: ['Is it longer than 10 cm?', 'Mesure-t-il plus de 10 cm ?'] },
]
const LAST = 3

export function BuildAKey({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0)
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const yes = t(lang, 'Yes', 'Oui')
  const no = t(lang, 'No', 'Non')
  const line = (d, on) => <path d={d} fill="none" stroke={on ? '#7d8a94' : RULE} strokeWidth="4" strokeDasharray={on ? undefined : '10 8'} strokeLinejoin="round" />

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
          <defs>
            {SLOT_X.map((x, i) => (
              <clipPath key={i} id={`bak-slot${i}`}><rect x="0" y="0" width={PW} height={PH} rx="14" /></clipPath>
            ))}
          </defs>

          {/* the branches */}
          {line('M 750 80 V 116 M 360 116 H 1140 M 360 116 V 150 M 1140 116 V 150', k >= 1)}
          {line('M 360 208 V 244 M 200 244 H 560 M 200 244 V 278 M 560 244 V 278', k >= 2)}
          {line('M 1140 208 V 244 M 940 244 H 1300 M 940 244 V 278 M 1300 244 V 278', k >= 3)}
          {k >= 1 && (
            <g>
              <text x="350" y="106" fontFamily={FONT} fontSize="26" fontWeight="900" fill={MUTED} textAnchor="end">{yes}</text>
              <text x="1150" y="106" fontFamily={FONT} fontSize="26" fontWeight="900" fill={MUTED}>{no}</text>
            </g>
          )}
          {k >= 2 && (
            <g>
              <text x="190" y="268" fontFamily={FONT} fontSize="26" fontWeight="900" fill={MUTED} textAnchor="end">{yes}</text>
              <text x="570" y="268" fontFamily={FONT} fontSize="26" fontWeight="900" fill={MUTED}>{no}</text>
            </g>
          )}
          {k >= 3 && (
            <g>
              <text x="930" y="268" fontFamily={FONT} fontSize="26" fontWeight="900" fill={MUTED} textAnchor="end">{yes}</text>
              <text x="1310" y="268" fontFamily={FONT} fontSize="26" fontWeight="900" fill={MUTED}>{no}</text>
            </g>
          )}

          {/* the question boxes: a dashed "?" until their press */}
          {QS.map((b, i) => {
            const on = k >= b.step
            const now = k + 1 === b.step
            return (
              <g key={i}>
                <rect x={b.x} y={b.y} width={b.w} height="58" rx="12" fill={on ? '#e2f2f6' : '#ffffff'}
                  stroke={on ? TEAL : now ? KEY : RULE} strokeWidth={now ? 4 : 3} strokeDasharray={on ? undefined : '10 8'} />
                <text x={b.x + b.w / 2} y={b.y + 40} fontFamily={FONT} fontSize={on ? 30 : 34} fontWeight="900"
                  fill={on ? INK : now ? KEY : RULE} textAnchor="middle">{on ? L(b.q) : '?'}</text>
              </g>
            )
          })}

          {/* the fruits: mixed at first, in their places after the first split */}
          {FRUITS.map((f) => {
            const slot = k >= 1 ? f.end : f.start
            const named = (f.end < 2 && k >= 2) || (f.end >= 2 && k >= 3)
            return (
              <g key={f.id} style={{ transform: `translate(${SLOT_X[slot]}px, ${PY}px)`, transition: 'transform 600ms ease' }}>
                <image href={f.pic} x="0" y="0" width={PW} height={PH} preserveAspectRatio="xMidYMid slice" clipPath={`url(#bak-slot${slot})`} />
                <rect x="0" y="0" width={PW} height={PH} rx="14" fill="none" stroke={named ? KEY : '#cbd5e1'} strokeWidth={named ? 6 : 2} />
                <text x={PW / 2} y={PH + 38} fontFamily={FONT} fontSize="32" fontWeight="900" fill={named ? KEY : INK} textAnchor="middle">{L(f.name)}</text>
              </g>
            )
          })}

          {/* what to do now */}
          <text x="750" y="508" fontFamily={FONT} fontSize="30" fontWeight="900" fill={k === LAST ? KEY : MUTED} textAnchor="middle">
            {k === 0 && t(lang, 'Which question splits all four into two groups?', 'Quelle question coupe les quatre en deux groupes ?')}
            {k === 1 && t(lang, 'Now split the red and pink ones.', 'Maintenant, coupe les rouges et roses.')}
            {k === 2 && t(lang, 'Now split the others.', 'Maintenant, coupe les autres en deux.')}
            {k === 3 && t(lang, '4 fruits, 3 questions: one name each.', '4 fruits, 3 questions : un nom chacun.')}
          </text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>{t(lang, 'Split them', 'Couper en deux')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
