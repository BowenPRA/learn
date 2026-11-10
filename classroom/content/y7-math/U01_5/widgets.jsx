// content/y7-math/U01_5/widgets.jsx
// One widget for 1.5 Tests for Divisibility, and only one.
//
// Everything else in this lesson is a rule to copy or a question to answer on
// a whiteboard, and a static slide does both better. What a static slide
// CANNOT do is hold a big number on screen with ten open questions attached to
// it and let the class choose which one to settle next — thirty verdicts
// across three numbers, each with its reason, revealed in whatever order the
// room shouts them out. That is the whole reason this widget exists.
//
// It reuses the 1.3/1.4 Stage/Controls shell deliberately: the class met this
// interface in the last two lessons, so no time is spent learning it.
import { useState } from 'react'
import { tr as pick } from '../../../src/lib/lang.js'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'
const RED = '#c8102e'

const Stage = ({ children, className = '' }) => (
  <div className={`flex-1 min-h-[210px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col p-3 sm:p-4 overflow-hidden ${className}`}>
    {children}
  </div>
)

const Controls = ({ children }) => (
  <div className="w-full bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0">
    {children}
  </div>
)

/* ============================================================= *
 * WIDGET — THE FACTOR HUNT
 *
 * Three numbers, none of them 3960 (that one is the hook, answered on the
 * slide before this). Each was picked so the ten tests do not all agree:
 *  · 1908 — passes 2, 3, 4, 6, 9 and fails 5, 7, 8, 10, 11. The 4-yes /
 *           8-no pair is the one students get wrong, so it is first.
 *  · 2530 — passes 2, 5, 10, 11 and fails 3, 6, 9. Even but not divisible
 *           by 6, which kills "even means it divides by 6".
 *  · 7128 — passes everything except 5, 7 and 10. The tidy one to finish on.
 * ============================================================= */
const NUMBERS = [1908, 2530, 7128]
const TESTS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const digitSum = (n) => String(n).split('').reduce((t, d) => t + Number(d), 0)
const lastTwo = (n) => n % 100
const lastThree = (n) => n % 1000

// The two alternating digit groups used by the test for 11, written the way
// the deck teaches it: add each group, subtract the smaller from the bigger.
const elevenGroups = (n) => {
  const ds = String(n).split('').map(Number)
  let a = 0
  let b = 0
  ds.forEach((d, i) => { if (i % 2 === 0) a += d; else b += d })
  return { a, b, diff: Math.abs(a - b) }
}

// Why a number passes or fails a given test, in one line. Built from the rule
// plus the number's own digits rather than stored as 30 hand-written strings —
// but every word of English here still has its Vietnamese twin below it.
const reason = (n, d, lang) => {
  const last = n % 10
  const s = digitSum(n)
  switch (d) {
    case 2:
      return pick(lang, `It ends in ${last}.`, `Số này tận cùng bằng ${last}.`, `Il se termine par ${last}.`)
    case 5:
      return pick(lang, `It ends in ${last}.`, `Số này tận cùng bằng ${last}.`, `Il se termine par ${last}.`)
    case 10:
      return pick(lang, `It ends in ${last}.`, `Số này tận cùng bằng ${last}.`, `Il se termine par ${last}.`)
    case 3:
      return pick(lang, `The digits add up to ${s}.`, `Tổng các chữ số bằng ${s}.`, `La somme des chiffres fait ${s}.`)
    case 9:
      return pick(lang, `The digits add up to ${s}.`, `Tổng các chữ số bằng ${s}.`, `La somme des chiffres fait ${s}.`)
    case 4:
      return pick(lang, `The last two digits are ${lastTwo(n)}.`, `Hai chữ số cuối là ${lastTwo(n)}.`, `Les deux derniers chiffres sont ${lastTwo(n)}.`)
    case 8:
      return pick(lang, `The last three digits are ${lastThree(n)}.`, `Ba chữ số cuối là ${lastThree(n)}.`, `Les trois derniers chiffres sont ${lastThree(n)}.`)
    case 6:
      return n % 2 === 0
        ? pick(lang, `It is even, and the digits add up to ${s}.`, `Số này chẵn, và tổng các chữ số bằng ${s}.`, `Il est pair, et la somme des chiffres fait ${s}.`)
        : pick(lang, 'It is not even, so it cannot divide by 6.', 'Số này không chẵn, nên không chia hết cho 6.', 'Il n’est pas pair, donc pas divisible par 6.')
    case 11: {
      const { a, b, diff } = elevenGroups(n)
      return pick(lang, `The two groups give ${a} and ${b} — a difference of ${diff}.`, `Hai nhóm cho ${a} và ${b} — hiệu là ${diff}.`, `Les deux groupes donnent ${a} et ${b} — une différence de ${diff}.`)
    }
    default:
      return pick(lang, 'There is no easy test for 7 — you have to divide.', 'Không có mẹo dễ nào cho 7 — em phải chia thật.', 'Pas de critère facile pour 7 — il faut diviser.')
  }
}

const Chip = ({ d, state, onClick }) => {
  const yes = state === 'yes'
  const tone = state === 'hidden' ? '#94a3b8' : yes ? GREEN : RED
  return (
    // Number and verdict sit side by side, not stacked. Stacked chips were
    // 82px tall, so two rows plus the reason panel did not fit the media
    // column of a split slide and the second row was cut in half.
    <button
      onClick={onClick}
      className="rounded-xl border-[3px] px-1.5 py-1.5 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
      style={{ borderColor: tone, backgroundColor: state === 'hidden' ? 'transparent' : `${tone}1a` }}>
      <span className="font-mono font-black text-xl sm:text-2xl tabular-nums leading-none" style={{ color: tone }}>{d}</span>
      <span className="font-black text-base sm:text-lg leading-none" style={{ color: tone }}>
        {state === 'hidden' ? '?' : yes ? '✓' : '✗'}
      </span>
    </button>
  )
}

export const FactorHuntWidget = ({ lang = 'en' }) => {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState([])
  const [last, setLast] = useState(null)
  const n = NUMBERS[i]
  const isLast = i === NUMBERS.length - 1

  const go = (k) => { setI(k); setShown([]); setLast(null) }
  const test = (d) => { setShown((prev) => (prev.includes(d) ? prev : [...prev, d])); setLast(d) }
  const showAll = () => { setShown(TESTS); setLast(null) }

  const stateOf = (d) => (shown.includes(d) ? (n % d === 0 ? 'yes' : 'no') : 'hidden')
  const done = shown.length === TESTS.length

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {pick(lang, 'Factor hunt', 'Săn ước số', 'Chasse aux diviseurs')}
          </span>
          <span className="font-mono font-black text-xs text-slate-400 tabular-nums">{i + 1}/{NUMBERS.length}</span>
        </div>

        <div className="rounded-xl border-2 px-3 py-1.5 mb-2 shrink-0 text-center" style={{ borderColor: TEAL, backgroundColor: `${TEAL}0f` }}>
          <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {pick(lang, 'Which of these are factors of', 'Số nào dưới đây là ước số của', 'Lesquels sont diviseurs de')}
          </p>
          <p className="font-mono font-black tabular-nums leading-none mt-0.5 text-3xl sm:text-4xl" style={{ color: TEAL }}>{n}</p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          {/* A fixed 5 × 2 grid rather than flex-wrap: wrapping put eight chips
              on one row and two on the next, which reads as an accident on a
              projector. Two even rows of five read as a chart. */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 justify-items-stretch">
            {TESTS.map((d) => <Chip key={d} d={d} state={stateOf(d)} onClick={() => test(d)} />)}
          </div>
        </div>

        {/* The reason lives OUTSIDE the scrolling chip area on purpose. Inside
            it, the panel appeared below the fold of a split-slide media column
            and the class never saw the sentence that justifies the tick — the
            one thing the widget is for. */}
        {last !== null && (
          <div
            className="mt-2 shrink-0 rounded-xl px-3 py-2 border-2 animate-in fade-in duration-300"
            style={{ borderColor: n % last === 0 ? GREEN : RED, backgroundColor: `${n % last === 0 ? GREEN : RED}12` }}>
            <span className="text-[10px] font-black uppercase tracking-widest mr-2" style={{ color: n % last === 0 ? GREEN : RED }}>
              {n % last === 0
                ? pick(lang, `${last} is a factor`, `${last} là ước số`, `${last} est un diviseur`)
                : pick(lang, `${last} is not a factor`, `${last} không phải ước số`, `${last} n’est pas un diviseur`)}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 leading-snug">{reason(n, last, lang)}</span>
          </div>
        )}
      </Stage>

      <Controls>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(Math.max(0, i - 1))}
            disabled={i === 0}
            className="px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 dark:border-slate-600 text-slate-500 disabled:opacity-30 active:scale-95">
            {pick(lang, 'Back', 'Lùi', 'Retour')}
          </button>
          <button
            onClick={showAll}
            disabled={done}
            className="px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 text-white disabled:opacity-30 active:scale-95"
            style={{ backgroundColor: PURPLE, borderColor: PURPLE }}>
            {pick(lang, 'Show the rest', 'Hiện phần còn lại', 'Voir le reste')}
          </button>
          <button
            onClick={() => !isLast && go(i + 1)}
            disabled={isLast}
            className="flex-1 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 disabled:opacity-40 active:scale-95 transition-all"
            style={{ backgroundColor: TEAL, borderColor: TEAL }}>
            {isLast ? pick(lang, 'That is the last one', 'Hết rồi', 'C’est fini') : pick(lang, 'Next number', 'Số tiếp theo', 'Nombre suivant')}
          </button>
        </div>
      </Controls>
    </div>
  )
}
