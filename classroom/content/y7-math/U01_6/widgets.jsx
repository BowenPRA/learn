// content/y7-math/U01_6/widgets.jsx
// One widget for 1.6, and only one.
//
// Everything else in this lesson is a definition to copy or a question to
// answer on a whiteboard, and a static slide does both better. What a static
// slide cannot do is hold back the next line of a calculation. Worked example
// 1.6 in the book — cube root of 125, minus the square root of 49 — is printed
// with all four lines visible at once, so a student who reads ahead never has
// to do any of it. Here the class does each line on paper first and the button
// settles it.
//
// It reuses the 1.3–1.5 Stage/Controls shell deliberately: the class met this
// interface in the last three lessons, so no time is spent learning it.
import { useState } from 'react'
import { tr as pick } from '../../../src/lib/lang.js'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'

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
 * WIDGET — ONE LINE AT A TIME
 *
 * The book's Worked example 1.6, revealed a line at a time. The roots are
 * written in plain Unicode rather than KaTeX so the widget stays a self
 * contained content file, and because ³√125 at 40px projects perfectly well.
 *
 * The last line is the one worth waiting for: 5 − 7 = −2. The class met
 * negative answers in 1.1 and will assume a root question cannot produce one.
 * ============================================================= */
const STEPS = [
  {
    line: '³√125 − √49',
    note: 'Two roots, then a subtraction. Do the roots first.',
    noteVn: 'Hai căn, rồi một phép trừ. Làm căn trước.',
    noteFr: 'Deux racines, puis une soustraction. Les racines d’abord.',
  },
  {
    line: '5 × 5 × 5 = 125',
    note: 'so ³√125 = 5',
    noteVn: 'nên ³√125 = 5',
    noteFr: 'donc ³√125 = 5',
  },
  {
    line: '7 × 7 = 49',
    note: 'so √49 = 7',
    noteVn: 'nên √49 = 7',
    noteFr: 'donc √49 = 7',
  },
  {
    line: '³√125 − √49 = 5 − 7',
    note: 'Now it is just a subtraction from 1.1.',
    noteVn: 'Bây giờ chỉ còn một phép trừ như bài 1.1.',
    noteFr: 'Il reste juste une soustraction, comme en 1.1.',
  },
  {
    line: '5 − 7 = −2',
    note: 'The answer to a root question can be negative.',
    noteVn: 'Đáp án của một bài về căn vẫn có thể là số âm.',
    noteFr: 'La réponse à une question de racines peut être négative.',
  },
]

export const WorkedExampleWidget = ({ lang = 'en' }) => {
  const [n, setN] = useState(1)
  const done = n === STEPS.length

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {pick(lang, 'Worked example', 'Ví dụ mẫu', 'Exemple')}
          </span>
          <span className="font-mono font-black text-xs text-slate-400 tabular-nums">{n}/{STEPS.length}</span>
        </div>

        {/* Only the line the class has just done is drawn full size. The lines
            already settled shrink to one row each, because five full cards do
            not fit the media column of a split slide — and the line that got
            cut off was the last one, which is the whole point of the widget. */}
        <div className="flex-1 min-h-0 flex flex-col gap-1.5 justify-center">
          {STEPS.slice(0, n - 1).map((s) => (
            <div key={s.line} className="flex items-baseline gap-2 px-2 opacity-50">
              <span className="text-slate-400 font-black text-xs">✓</span>
              <span className="font-black tabular-nums text-sm sm:text-base text-slate-500 dark:text-slate-400">{s.line}</span>
            </div>
          ))}
          {(() => {
            const s = STEPS[n - 1]
            const tone = n === STEPS.length ? GREEN : n === 1 ? TEAL : PURPLE
            return (
              <div
                className="rounded-xl border-2 px-3 py-2 animate-in fade-in duration-300"
                style={{ borderColor: tone, backgroundColor: `${tone}12` }}>
                <p className="font-black tabular-nums leading-none text-2xl sm:text-3xl" style={{ color: tone }}>{s.line}</p>
                <p className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 leading-snug mt-1">
                  {pick(lang, s.note, s.noteVn, s.noteFr)}
                </p>
              </div>
            )
          })()}
        </div>
      </Stage>

      <Controls>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setN(Math.max(1, n - 1))}
            disabled={n === 1}
            className="px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 dark:border-slate-600 text-slate-500 disabled:opacity-30 active:scale-95">
            {pick(lang, 'Back', 'Lùi', 'Retour')}
          </button>
          <button
            onClick={() => setN(done ? 1 : n + 1)}
            className="flex-1 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 active:scale-95 transition-all"
            style={{ backgroundColor: done ? PURPLE : TEAL, borderColor: done ? PURPLE : TEAL }}>
            {done ? pick(lang, 'Start again', 'Làm lại', 'Recommencer') : pick(lang, 'Next line', 'Dòng tiếp theo', 'Ligne suivante')}
          </button>
        </div>
      </Controls>
    </div>
  )
}
