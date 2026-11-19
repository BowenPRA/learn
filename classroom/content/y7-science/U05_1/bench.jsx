// content/y7-science/U05_1/bench.jsx
// MR BOWEN'S TEST BENCH — the stepper the class says first. Three samples:
// copper, iron (both metals) and sulfur (a non-metal). Each press does ONE
// test on all three, and the class predicts the three results out loud first.
//
//   1  Polish it            shiny · shiny · dull
//   2  Hit it with a hammer goes flat · goes flat · breaks
//   3  Tap it               rings · rings · thud
//   4  Heat one end         other end hot · hot · cool
//   5  Put it in a circuit  bulb lights · lights · stays off
//   then: copper and iron did the same every time; sulfur did not.
// The results use everyday words: the key words (malleable, sonorous,
// conductor, brittle) come on later slides. The samples change on the stage
// after tests 1 and 2 (a shine; flat bars and broken sulfur).
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { INK, KEY, MUTED, TEAL, RULE, FONT, copper, iron, sulfur } from './art.js'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

const CX = [680, 980, 1280] // the middle of each sample's column
const CELL_W = 270
const ROW_Y = (i) => 196 + i * 64 // the middle of each test's row
const SAMPLES = [['copper', 'cuivre'], ['iron', 'fer'], ['sulfur', 'soufre']]
const TESTS = [
  { label: ['Polish it', 'Polis-le'], res: [['shiny', 'brillant'], ['shiny', 'brillant'], ['dull', 'terne']] },
  { label: ['Hit it with a hammer', 'Frappe au marteau'], res: [['goes flat', 's’aplatit'], ['goes flat', 's’aplatit'], ['breaks', 'se casse']] },
  { label: ['Tap it', 'Tapote-le'], res: [['rings: ding!', 'sonne : ding !'], ['rings: ding!', 'sonne : ding !'], ['thud', 'bruit sourd']] },
  { label: ['Heat one end', 'Chauffe un bout'], res: [['other end hot', 'autre bout chaud'], ['other end hot', 'autre bout chaud'], ['other end cool', 'autre bout froid']] },
  { label: ['Put it in a circuit', 'Dans un circuit'], res: [['bulb lights', 'ampoule allumée'], ['bulb lights', 'ampoule allumée'], ['bulb stays off', 'ampoule éteinte']] },
]
const LAST = TESTS.length

export function TestBench({ lang = 'en', isDisplayMode = false }) {
  const [k, setK] = useState(0) // tests 0..k-1 are done
  const big = isDisplayMode
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0])
  const shiny = k >= 1
  const hit = k >= 2

  const top = k === 0
    ? [t(lang, 'Predict for each one,', 'Prédis pour chacun,'), t(lang, 'then press Test it.', 'puis appuie sur Teste.')]
    : k === LAST
      ? [t(lang, 'Copper and iron:', 'Cuivre et fer :'), t(lang, 'the same every time.', 'pareils à chaque fois.')]
      : [t(lang, `Test ${k + 1}: predict first.`, `Test ${k + 1}\u00a0: prédis d’abord.`), t(lang, 'Then press Test it.', 'Puis appuie sur Teste.')]

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />

          {/* what to do now */}
          <text x="30" y="64" fontFamily={FONT} fontSize="30" fontWeight="900" fill={k === LAST ? KEY : MUTED}>{top[0]}</text>
          <text x="30" y="104" fontFamily={FONT} fontSize="30" fontWeight="900" fill={k === LAST ? KEY : MUTED}>{top[1]}</text>

          {/* the three samples, changed by tests 1 and 2 */}
          <Pic svg={copper(CX[0], 66, 0.95, { shiny, flat: hit })} />
          <Pic svg={iron(CX[1], 66, 0.95, { shiny, flat: hit })} />
          <Pic svg={sulfur(CX[2], 66, 1, { broken: hit })} />
          {SAMPLES.map((s, i) => (
            <text key={i} x={CX[i]} y="144" fontFamily={FONT} fontSize="32" fontWeight="900" fill={KEY} textAnchor="middle">{L(s)}</text>
          ))}
          <line x1="20" y1="160" x2="1480" y2="160" stroke={RULE} strokeWidth="3" />

          {/* one row per test */}
          {TESTS.map((test, i) => {
            const y = ROW_Y(i)
            const done = i < k
            const now = i === k
            return (
              <g key={i}>
                <circle cx="52" cy={y} r="22" fill={done ? TEAL : now ? KEY : RULE} />
                <text x="52" y={y + 10} fontFamily={FONT} fontSize="27" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                <text x="90" y={y + 11} fontFamily={FONT} fontSize="30" fontWeight="900" fill={done ? INK : now ? KEY : '#9aa5ae'}>{L(test.label)}</text>
                {CX.map((cx, j) => {
                  const metal = j < 2
                  return (
                    <g key={j}>
                      <rect x={cx - CELL_W / 2} y={y - 26} width={CELL_W} height="52" rx="12"
                        fill={done ? (metal ? '#e2f2f6' : '#fdf6dc') : '#ffffff'}
                        stroke={done ? (metal ? TEAL : '#b08a12') : now ? KEY : RULE}
                        strokeWidth={now ? 3.5 : 2.5} strokeDasharray={done ? undefined : '9 7'} />
                      <text x={cx} y={y + 10} fontFamily={FONT} fontSize={done ? 28 : 30} fontWeight="900"
                        fill={done ? INK : now ? KEY : RULE} textAnchor="middle">{done ? L(test.res[j]) : '?'}</text>
                    </g>
                  )
                })}
              </g>
            )
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={k === LAST} onClick={() => setK((v) => Math.min(LAST, v + 1))}>{t(lang, 'Test it', 'Teste')}</Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
