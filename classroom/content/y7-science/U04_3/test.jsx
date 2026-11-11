// content/y7-science/U04_3/test.jsx
// THE SPECIES TEST — the book's definition (page 136) as two questions, asked
// of four pairs of organisms, one answer a press:
//
//   1  Can they have offspring together?        no → different species
//   2  Are the offspring fertile?               no → different species
//                                               yes → the same species
//
// Before each press the class answers with a thumb: up for yes, down for no.
// The pairs are the lesson's own: two Indian elephants; an Indian and an
// African elephant (page 135: they do not reproduce together); a lion and a
// tiger (page 136: the liger is infertile); two budgerigars of different
// colours (page 134).
//
// Two yes/no questions that end in a name: it is the shape of the keys in 4.4.
import { useState } from 'react'
import { ChevronRight, Undo2, RotateCcw } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'
import { Btn } from '../U03_models/ui.jsx'
import { mark, INK, KEY, MUTED, RED, FONT } from './art.js'
import indian from './images/elephant-indian.jpg'
import indianTwo from './images/elephant-indian-2.jpg'
import african from './images/elephant-african.jpg'
import lion from './images/lion.jpg'
import tiger from './images/tiger.jpg'
import budgieBlue from './images/budgie-blue.jpg'
import budgieGreen from './images/budgie-green.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)
const TEAL = '#0087a8', RULE = '#d5dbe1', PALE = '#f4f6f8', GREEN_DARK = '#3d731c'
const Pic = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />

// q1: can they have offspring together? q2: are the offspring fertile?
// why: the line shown with each answer, [English, French].
const PAIRS = [
  {
    a: [indian, 'Indian elephant', 'éléphant d’Inde'], b: [indianTwo, 'Indian elephant', 'éléphant d’Inde'],
    q1: true, q2: true,
    why: [['Their offspring: a calf.', 'Leur petit : un éléphanteau.'], ['The calf grows up and has calves too.', 'Il grandit et a des petits à son tour.']],
  },
  {
    a: [indian, 'Indian elephant', 'éléphant d’Inde'], b: [african, 'African elephant', 'éléphant d’Afrique'],
    q1: false,
    why: [['They do not have offspring together.', 'Ils n’ont pas de petits ensemble.']],
  },
  {
    a: [lion, 'lion', 'lion'], b: [tiger, 'tiger', 'tigre'],
    q1: true, q2: false,
    why: [['Their offspring: a liger.', 'Leur petit : un ligre.'], ['A liger cannot have offspring.', 'Un ligre ne peut pas avoir de petits.']],
  },
  {
    a: [budgieBlue, 'blue budgerigar', 'perruche bleue'], b: [budgieGreen, 'green budgerigar', 'perruche verte'],
    q1: true, q2: true,
    why: [['Their offspring: chicks.', 'Leurs petits : des oisillons.'], ['The chicks grow up and have chicks too.', 'Ils grandissent et ont des oisillons.']],
  },
]
// steps for a pair: 0 the pair · 1 answer 1 · (2 answer 2) · last the verdict
const lastStep = (p) => (PAIRS[p].q1 ? 3 : 2)

function Question({ y, n, lines, state, answer, why }) {
  // state: 'wait' (not asked yet) · 'ask' (the next to answer) · 'done' · 'skip'
  const done = state === 'done'
  return (
    <g opacity={state === 'skip' ? 0.35 : 1}>
      <rect x="590" y={y} width="582" height="156" rx="16" fill={done ? '#fbfdff' : PALE} stroke={state === 'ask' ? KEY : done ? '#c9d3dc' : RULE} strokeWidth={state === 'ask' ? 5 : 3} />
      <circle cx="632" cy={y + 46} r="24" fill={state === 'ask' ? KEY : done ? TEAL : '#9aa5ae'} />
      <text x="632" y={y + 57} fontFamily={FONT} fontSize="30" fontWeight="900" fill="#ffffff" textAnchor="middle">{n}</text>
      <text x="672" y={y + 44} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK}>{lines[0]}</text>
      <text x="672" y={y + 80} fontFamily={FONT} fontSize="28" fontWeight="900" fill={INK}>{lines[1]}</text>
      {done && (
        <g>
          <Pic svg={mark(1122, y + 52, answer ? 'yes' : 'no', 1.5)} />
          <text x="610" y={y + 132} fontFamily={FONT} fontSize="28" fontWeight="800" fill={answer ? GREEN_DARK : RED}>{why}</text>
        </g>
      )}
    </g>
  )
}

export function SpeciesTest({ lang = 'en', isDisplayMode = false }) {
  const [p, setP] = useState(0)
  const [s, setS] = useState(0)
  const big = isDisplayMode
  const fr = lang === 'fr'
  const pair = PAIRS[p]
  const last = lastStep(p)
  const verdict = s >= last
  const same = pair.q1 && pair.q2
  const end = p === PAIRS.length - 1 && verdict
  const next = () => {
    if (s < last) setS(s + 1)
    else if (p < PAIRS.length - 1) { setP(p + 1); setS(0) }
  }
  const back = () => {
    if (s > 0) setS(s - 1)
    else if (p > 0) { setP(p - 1); setS(lastStep(p - 1)) }
  }
  const name = (x) => (fr ? x[2] : x[1])
  const why = (i) => (pair.why[i] ? pair.why[i][fr ? 1 : 0] : '')
  const q1State = s >= 1 ? 'done' : 'ask'
  const q2State = !pair.q1 ? (s >= 1 ? 'skip' : 'wait') : s >= 2 ? 'done' : s === 1 ? 'ask' : 'wait'

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 560" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="560" rx="16" fill="#ffffff" />
          <defs>
            <clipPath id="sp-test-a"><rect x="20" y="84" width="250" height="250" rx="14" /></clipPath>
            <clipPath id="sp-test-b"><rect x="320" y="84" width="250" height="250" rx="14" /></clipPath>
          </defs>

          {/* the pair */}
          <text x="20" y="52" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>
            {t(lang, `Pair ${p + 1} of ${PAIRS.length}`, `Paire ${p + 1} sur ${PAIRS.length}`)}
          </text>
          <image href={pair.a[0]} x="20" y="84" width="250" height="250" preserveAspectRatio="xMidYMid slice" clipPath="url(#sp-test-a)" />
          <image href={pair.b[0]} x="320" y="84" width="250" height="250" preserveAspectRatio="xMidYMid slice" clipPath="url(#sp-test-b)" />
          <rect x="20" y="84" width="250" height="250" rx="14" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="320" y="84" width="250" height="250" rx="14" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 279 209 h 32 M 295 193 v 32" stroke={INK} strokeWidth="7" strokeLinecap="round" />
          <text x="145" y="376" fontFamily={FONT} fontSize="27" fontWeight="900" fill={KEY} textAnchor="middle">{name(pair.a)}</text>
          <text x="445" y="376" fontFamily={FONT} fontSize="27" fontWeight="900" fill={KEY} textAnchor="middle">{name(pair.b)}</text>
          <text x="295" y="472" fontFamily={FONT} fontSize="28" fontWeight="800" fill={MUTED} textAnchor="middle">
            {t(lang, 'Thumb up: yes. Thumb down: no.', 'Pouce en haut : oui. En bas : non.')}
          </text>

          {/* the two questions */}
          <Question y={84} n="1" state={q1State} answer={pair.q1} why={why(0)}
            lines={fr ? ['Peuvent-ils avoir des', 'descendants ensemble ?'] : ['Can they have offspring', 'together?']} />
          <Question y={260} n="2" state={q2State} answer={pair.q2} why={why(1)}
            lines={fr ? ['Leurs descendants', 'sont-ils fertiles ?'] : ['Are the offspring', 'fertile?']} />

          {/* the verdict */}
          <rect x="1190" y="84" width="290" height="332" rx="16" fill={verdict ? (same ? '#eef6e6' : '#fdeeee') : PALE}
            stroke={verdict ? (same ? GREEN_DARK : RED) : RULE} strokeWidth={verdict ? 6 : 3} strokeDasharray={verdict ? undefined : '10 8'} />
          {verdict ? (
            <g>
              <Pic svg={mark(1335, 170, same ? 'yes' : 'no', 2.2)} />
              <text x="1335" y="282" fontFamily={FONT} fontSize="38" fontWeight="900" fill={same ? GREEN_DARK : RED} textAnchor="middle">
                {same ? t(lang, 'THE SAME', 'LA MÊME') : t(lang, 'DIFFERENT', 'ESPÈCES')}
              </text>
              <text x="1335" y="332" fontFamily={FONT} fontSize="38" fontWeight="900" fill={same ? GREEN_DARK : RED} textAnchor="middle">
                {same ? t(lang, 'SPECIES', 'ESPÈCE') : t(lang, 'SPECIES', 'DIFFÉRENTES')}
              </text>
            </g>
          ) : (
            <text x="1335" y="300" fontFamily={FONT} fontSize="150" fontWeight="900" fill={RULE} textAnchor="middle">?</text>
          )}
          <text x="1040" y="472" fontFamily={FONT} fontSize="28" fontWeight="800" fill={MUTED} textAnchor="middle">
            {t(lang, 'One “no” is enough: different species.', 'Un seul « non » suffit : espèces différentes.')}
          </text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 flex-wrap">
        <Btn big={big} tone="slate" icon={Undo2} disabled={p === 0 && s === 0} onClick={back}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn big={big} tone="orange" icon={ChevronRight} disabled={end} onClick={next}>
          {verdict ? t(lang, 'Next pair', 'Paire suivante') : s === last - 1 ? t(lang, 'Same or different?', 'Même espèce ?') : t(lang, 'Show the answer', 'Voir la réponse')}
        </Btn>
        <Btn big={big} tone="teal" icon={RotateCcw} disabled={p === 0 && s === 0} onClick={() => { setP(0); setS(0) }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  )
}
