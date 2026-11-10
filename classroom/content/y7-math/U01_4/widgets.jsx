// content/y7-math/U01_4/widgets.jsx
// One widget for 1.4 Highest Common Factors, and only one.
//
// Everything else in this lesson is a definition to copy or a question to
// answer on a whiteboard, and a static slide does both better. What a static
// slide CANNOT do is run five worked pairs at the teacher's pace, revealing one
// list at a time so the class has to commit to an answer before the reveal.
// So: HcfFinderWidget, and nothing else.
//
// It reuses the 1.3 Stage/Controls shell deliberately — the class met this
// interface last lesson, so no time is spent learning it, and the only visible
// change is that the winning chip is the HIGHEST match rather than the lowest.
import { useState } from 'react'
import { tr as pick } from '../../../src/lib/lang.js'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'

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
 * WIDGET — THE HCF FINDER
 *
 * Five preset pairs, chosen to cover the whole shape of the topic:
 *  · 12 and 18 — four common factors on screen, pick the highest
 *  · 24 and 80 — the book's worked example, HCF 8
 *  ·  8 and 9  — consecutive, so the only common factor is 1. The answer is
 *                ONE, not "none" — the mistake this lesson has to kill
 *  ·  6 and 18 — one divides the other, so the HCF is the smaller number
 *  · 20 and 30 — a plain two-list search, HCF 10
 * ============================================================= */
const PAIRS = [
  { a: 12, b: 18, fa: [1, 2, 3, 4, 6, 12], fb: [1, 2, 3, 6, 9, 18], hcf: 6,
    note: '1, 2, 3 and 6 are in both lists. The HCF is the highest of them: 6.',
    noteVn: '1, 2, 3 và 6 đều có trong cả hai danh sách. ƯCLN là số lớn nhất trong đó: 6.',
    noteFr: '1, 2, 3 et 6 sont dans les deux listes. Le PGCD est le plus grand : 6.' },
  { a: 24, b: 80, fa: [1, 2, 3, 4, 6, 8, 12, 24], fb: [1, 2, 4, 5, 8, 10, 16, 20, 40, 80], hcf: 8,
    note: 'The book’s example. The biggest number in both lists is 8.',
    noteVn: 'Ví dụ trong sách. Số lớn nhất có trong cả hai danh sách là 8.',
    noteFr: 'L’exemple du livre. Le plus grand nombre dans les deux listes est 8.' },
  { a: 8, b: 9, fa: [1, 2, 4, 8], fb: [1, 3, 9], hcf: 1,
    note: 'The only common factor is 1. The HCF is 1 — never “none”.',
    noteVn: 'Ước số chung duy nhất là 1. ƯCLN bằng 1 — không bao giờ là “không có”.',
    noteFr: 'Le seul diviseur commun est 1. Le PGCD est 1 — jamais « aucun ».' },
  { a: 6, b: 18, fa: [1, 2, 3, 6], fb: [1, 2, 3, 6, 9, 18], hcf: 6,
    note: '6 divides into 18, so the HCF is just the smaller number, 6.',
    noteVn: '6 chia hết 18, nên ƯCLN chính là số nhỏ hơn, 6.',
    noteFr: '6 divise 18, donc le PGCD est le plus petit nombre, 6.' },
  { a: 20, b: 30, fa: [1, 2, 4, 5, 10, 20], fb: [1, 2, 3, 5, 6, 10, 15, 30], hcf: 10,
    note: 'The biggest number that appears in both lists is 10.',
    noteVn: 'Số lớn nhất xuất hiện trong cả hai danh sách là 10.',
    noteFr: 'Le plus grand nombre présent dans les deux listes est 10.' },
]

// A chip: grey until its row is shown, then coloured; orange if it is a common
// factor, green ringed if it is the HCF (both only once step >= 3 / 4).
const Chip = ({ n, base, common, isHcf, showMatches, showHcf }) => {
  let border = base
  let bg = 'transparent'
  let color = 'inherit'
  if (showHcf && isHcf) { border = GREEN; bg = `${GREEN}1a`; color = GREEN }
  else if (showMatches && common) { border = ORANGE; bg = `${ORANGE}1a`; color = ORANGE }
  return (
    <div
      className="rounded-lg border-2 px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono font-black text-lg sm:text-xl tabular-nums shadow-sm"
      style={{ borderColor: border, backgroundColor: bg, color }}>
      {n}
    </div>
  )
}

// One list of factors. Hoisted to module scope (not defined during render) so
// React can keep it stable; the step and the common/HCF tests come in as props.
const FactorRow = ({ label, nums, base, show, hcf, isCommon, step }) => (
  <div className={`transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
    <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1" style={{ color: base }}>{label}</div>
    <div className="flex flex-wrap gap-1.5">
      {nums.map((n) => (
        <Chip key={n} n={n} base={base} common={isCommon(n)} isHcf={n === hcf}
          showMatches={step >= 3} showHcf={step >= 4} />
      ))}
    </div>
  </div>
)

export const HcfFinderWidget = ({ lang = 'en' }) => {
  const [i, setI] = useState(0)
  const [step, setStep] = useState(0) // 0 prompt · 1 row A · 2 row B · 3 matches · 4 HCF
  const p = PAIRS[i]
  const last = i === PAIRS.length - 1
  const go = (n) => { setI(n); setStep(0) }

  const isCommon = (n) => p.fa.includes(n) && p.fb.includes(n)

  const nextLabel =
    step === 0 ? pick(lang, `Factors of ${p.a}`, `Ước số của ${p.a}`, `Diviseurs de ${p.a}`)
      : step === 1 ? pick(lang, `Factors of ${p.b}`, `Ước số của ${p.b}`, `Diviseurs de ${p.b}`)
        : step === 2 ? pick(lang, 'Find the matches', 'Tìm các số chung', 'Nombres communs')
          : step === 3 ? pick(lang, 'Show the HCF', 'Hiện ƯCLN', 'Voir le PGCD')
            : pick(lang, 'Next pair', 'Cặp tiếp theo', 'Paire suivante')

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {pick(lang, 'HCF finder', 'Máy tìm ƯCLN', 'Machine à PGCD')}
          </span>
          <span className="font-mono font-black text-xs text-slate-400 tabular-nums">{i + 1}/{PAIRS.length}</span>
        </div>

        <div className="rounded-xl border-2 px-3 py-2.5 mb-2 shrink-0 text-center" style={{ borderColor: TEAL, backgroundColor: `${TEAL}0f` }}>
          <p className="font-black text-slate-800 dark:text-slate-100 leading-snug text-base sm:text-lg lg:text-xl">
            {pick(lang, `Find the highest common factor of ${p.a} and ${p.b}`, `Tìm ước số chung lớn nhất của ${p.a} và ${p.b}`, `Trouve le plus grand diviseur commun de ${p.a} et ${p.b}`)}
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-2.5 text-slate-800 dark:text-slate-100">
          <FactorRow label={pick(lang, `Factors of ${p.a}`, `Ước số của ${p.a}`, `Diviseurs de ${p.a}`)} nums={p.fa} base={BLUE} show={step >= 1} hcf={p.hcf} isCommon={isCommon} step={step} />
          <FactorRow label={pick(lang, `Factors of ${p.b}`, `Ước số của ${p.b}`, `Diviseurs de ${p.b}`)} nums={p.fb} base={RED} show={step >= 2} hcf={p.hcf} isCommon={isCommon} step={step} />

          {step >= 4 && (
            <div className="rounded-xl px-3 py-2 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 border-2" style={{ borderColor: GREEN, backgroundColor: `${GREEN}12` }}>
              <span className="text-[10px] font-black uppercase tracking-widest shrink-0" style={{ color: GREEN }}>{pick(lang, 'HCF', 'ƯCLN', 'PGCD')}</span>
              <span className="font-mono font-black text-2xl" style={{ color: GREEN }}>{p.hcf}</span>
              <span className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 leading-snug">{pick(lang, p.note, p.noteVn, p.noteFr)}</span>
            </div>
          )}
        </div>
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
            onClick={() => (step < 4 ? setStep(step + 1) : !last && go(i + 1))}
            disabled={step === 4 && last}
            className="flex-1 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 disabled:opacity-40 active:scale-95 transition-all"
            style={{ backgroundColor: step === 4 ? PURPLE : TEAL, borderColor: step === 4 ? PURPLE : TEAL }}>
            {step === 4 && last ? pick(lang, 'That is the last one', 'Hết rồi', 'C’est fini') : nextLabel}
          </button>
        </div>
      </Controls>
    </div>
  )
}
