// content/y7-science/U04_3/elephants.jsx
// TWO ELEPHANTS — Activity 4.3.1 (page 135): the book's two species of
// elephant, as real photographs, side by side. Pairs list similarities and
// differences first; then one press shows what is the same, and each press
// after that rings ONE difference on both photographs and names it.
//
// Only what these two photographs show is ringed: the ears, the line of the
// back, the skin. The last press is the difference a photograph cannot show:
// an adult male Indian elephant is about 4 tonnes, an African one about 6.
// (Tusks are left out: this old African male has almost lost his.)
//
// The African photograph is mirrored so both elephants face the same way.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, FONT } from './art.js'
import indian from './images/elephant-indian.jpg'
import african from './images/elephant-african.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const TEAL = '#0087a8', RULE = '#d5dbe1', GREEN_DARK = '#3d731c'

// The two photographs: 500 × 357 each (the shape of both files).
const PW = 500, PH = 357, PY = 64
const LEFT = 20, RIGHT = 540

// What is the same (shown together, on the first press).
const SAME = [
  ['a trunk', 'une trompe'],
  ['small eyes', 'de petits yeux'],
  ['four thick legs', 'quatre grosses pattes'],
  ['a thin tail', 'une queue fine'],
  ['almost no hair', 'presque pas de poils'],
]

// One difference a press: [word, Indian, African], and where to ring it on
// each photograph (cx, cy as a fraction of the photograph; rx, ry in px).
const DIFFS = [
  { word: ['ears', 'oreilles'], a: ['small ears', 'petites oreilles'], b: ['very big ears', 'très grandes oreilles'],
    ringA: [0.352, 0.37, 44, 58], ringB: [0.40, 0.34, 78, 84] },
  { word: ['back', 'dos'], a: ['a round back', 'un dos rond'], b: ['a back low in the middle', 'un dos creux au milieu'],
    ringA: [0.62, 0.17, 150, 34], ringB: [0.56, 0.115, 150, 34] },
  { word: ['skin', 'peau'], a: ['smooth skin', 'une peau lisse'], b: ['skin with deep lines', 'une peau très ridée'],
    ringA: [0.69, 0.45, 62, 62], ringB: [0.72, 0.42, 62, 62] },
  { word: ['mass', 'masse'], a: ['about 4 tonnes', 'environ 4 tonnes'], b: ['about 6 tonnes', 'environ 6 tonnes'] },
]
const LAST = 1 + DIFFS.length

function Ring({ x0, ring }) {
  if (!ring) return null
  const [fx, fy, rx, ry] = ring
  const cx = x0 + fx * PW, cy = PY + fy * PH
  return (
    <g fill="none">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke="#ffffff" strokeWidth="12" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={KEY} strokeWidth="7" />
    </g>
  )
}

export function TwoElephants({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // 0 the photographs · 1 the same · 2.. one difference each
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const d = k >= 2 ? DIFFS[k - 2] : null

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          <defs>
            <clipPath id="two-el-a"><rect x={LEFT} y={PY} width={PW} height={PH} rx="14" /></clipPath>
            <clipPath id="two-el-b"><rect x={RIGHT} y={PY} width={PW} height={PH} rx="14" /></clipPath>
          </defs>

          <text x={LEFT + PW / 2} y="44" fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY} textAnchor="middle">{t(lang, 'Indian elephant', 'Éléphant d’Inde')}</text>
          <text x={RIGHT + PW / 2} y="44" fontFamily={FONT} fontSize="30" fontWeight="900" fill={KEY} textAnchor="middle">{t(lang, 'African elephant', 'Éléphant d’Afrique')}</text>
          <image href={indian} x={LEFT} y={PY} width={PW} height={PH} preserveAspectRatio="xMidYMid slice" clipPath="url(#two-el-a)" />
          <image href={african} x={RIGHT} y={PY} width={PW} height={PH} preserveAspectRatio="xMidYMid slice" clipPath="url(#two-el-b)" />
          <rect x={LEFT} y={PY} width={PW} height={PH} rx="14" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <rect x={RIGHT} y={PY} width={PW} height={PH} rx="14" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          {d && <Ring x0={LEFT} ring={d.ringA} />}
          {d && <Ring x0={RIGHT} ring={d.ringB} />}

          {/* under the photographs: the task, then the difference in words */}
          {d ? (
            <g>
              <rect x={LEFT} y="444" width={PW} height="64" rx="14" fill="#fff4e8" stroke={KEY} strokeWidth="3" />
              <rect x={RIGHT} y="444" width={PW} height="64" rx="14" fill="#fff4e8" stroke={KEY} strokeWidth="3" />
              <text x={LEFT + PW / 2} y="487" fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK} textAnchor="middle">{L(d.a)}</text>
              <text x={RIGHT + PW / 2} y="487" fontFamily={FONT} fontSize="32" fontWeight="900" fill={INK} textAnchor="middle">{L(d.b)}</text>
              {!d.ringA && (
                <text x="530" y="544" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED} textAnchor="middle">
                  {t(lang, 'An adult male. A photograph cannot show this.', 'Un mâle adulte. Une photo ne le montre pas.')}
                </text>
              )}
            </g>
          ) : (
            <text x="530" y="487" fontFamily={FONT} fontSize="30" fontWeight="900" fill={INK} textAnchor="middle">
              {k === 0
                ? t(lang, 'Pairs, on a whiteboard: 3 things the same, 3 different.', 'À deux, sur une ardoise : 3 ressemblances, 3 différences.')
                : t(lang, 'Now the differences. Say one first!', 'Et les différences ? Dis-en une d’abord !')}
            </text>
          )}

          {/* the list, growing on the right */}
          <rect x="1064" y="20" width="416" height="520" rx="16" fill="#f7fafc" stroke={RULE} strokeWidth="3" />
          <text x="1090" y="66" fontFamily={FONT} fontSize="28" fontWeight="900" fill={TEAL} letterSpacing="2">{t(lang, 'THE SAME', 'PAREIL')}</text>
          {k >= 1 ? SAME.map((s, i) => (
            <text key={i} x="1090" y={104 + i * 37} fontFamily={FONT} fontSize="28" fontWeight="700" fill={INK}>{L(s)}</text>
          )) : (
            <text x="1272" y="190" fontFamily={FONT} fontSize="110" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
          )}
          <line x1="1084" y1="282" x2="1460" y2="282" stroke={RULE} strokeWidth="3" />
          <text x="1090" y="328" fontFamily={FONT} fontSize="28" fontWeight="900" fill={KEY} letterSpacing="2">{t(lang, 'DIFFERENT', 'DIFFÉRENT')}</text>
          {DIFFS.map((x, i) => {
            const y = 370 + i * 42
            const found = k >= 2 + i
            const now = k === 2 + i
            return (
              <g key={i}>
                <circle cx="1104" cy={y - 10} r="14" fill={found ? GREEN_DARK : '#ffffff'} stroke={found ? GREEN_DARK : '#9aa5ae'} strokeWidth="3" />
                {found && <path d={`M 1097 ${y - 10} l 5 6 l 9 -11`} stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                {found
                  ? <text x="1132" y={y} fontFamily={FONT} fontSize="28" fontWeight={now ? 900 : 700} fill={now ? KEY : INK}>{L(x.word)}</text>
                  : <text x="1132" y={y} fontFamily={FONT} fontSize="28" fontWeight="900" fill="#9aa5ae">?</text>}
              </g>
            )
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>
          {k === 0 ? t(lang, 'What is the same?', 'Qu’est-ce qui est pareil ?') : k >= LAST - 1 ? t(lang, 'One you cannot see', 'Une qu’on ne voit pas') : t(lang, 'A difference', 'Une différence')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
