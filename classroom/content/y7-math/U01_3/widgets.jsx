// content/y7-math/U01_3/widgets.jsx
// Two widgets for 1.3 Lowest Common Multiples, and no more than two.
//
// The sign tables and definitions of this unit are things students copy into a
// notebook, not things to click. What a static slide CANNOT do is (a) run six
// examples on demand at the teacher's pace, and (b) play a film clip. So:
//
//  · LcmFinderWidget  — reveal the multiples of the first number, then the
//    second, then ring the matches, then box the lowest. Nothing else.
//  · HotDogClipWidget — a frame around one YouTube Short. No controls of our
//    own; YouTube's player already has them.
//
// Both reuse the 1.1/1.2 Stage/Controls shell so no class time is spent
// learning an interface, and take the deck's `lang` so their text is bilingual.
import { useState } from 'react'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const RED = '#c8102e'
const BLUE = '#1a5fa8'

import { tr as pick } from '../../../src/lib/lang.js'

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
 * WIDGET — THE HOT DOG CLIP
 *
 * George Banks in the supermarket, Father of the Bride (1991): hot dogs come
 * 8 to a pack, buns come 12 to a pack, and he will not accept it. That is
 * LCM(8, 12) played as farce, and it sets up Problem 2.
 *
 * Deliberately dumb: an iframe, a caption, no play/pause of our own. It uses
 * youtube-nocookie.com so nothing is written to a student-facing machine, and
 * `loading="lazy"` so the other slides do not pay for it.
 *
 * NEEDS THE INTERNET. If the room's network blocks YouTube this frame goes
 * blank — the problem slide that follows keeps its photograph, so the lesson
 * still runs; just tell the story instead.
 * ============================================================= */
const CLIP_ID = '8yAVlsmpw1I'

// No Stage, no header strip, no controls — deliberately. `showcase` already
// wraps the media in a padded white panel, and every nested border and padding
// here is height stolen from a 9:16 video on a landscape slide. Nesting a Stage
// inside cost ~90px of frame at 1366x768. The film title lives in the slide's
// eyebrow instead.
export const HotDogClipWidget = ({ lang = 'en' }) => (
  <div className="w-full h-full flex items-center justify-center select-none">
    {/* Sized from the HEIGHT it is given, centred in the width that is left. */}
    <div
      className="h-full rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-black"
      style={{ aspectRatio: '9 / 16' }}>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${CLIP_ID}?rel=0&modestbranding=1`}
        title={pick(lang, 'Steve Martin’s hot dog bun meltdown', 'Cảnh Steve Martin nổi giận vì bánh mì xúc xích', 'Steve Martin furieux à cause des pains à hot-dog')}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
)

/* ============================================================= *
 * WIDGET — THE LCM FINDER
 *
 * Five preset pairs, chosen to cover the whole shape of the topic:
 *  · 4 and 6   — two common multiples on screen, pick the lowest
 *  · 3 and 5   — no shared factor, so the LCM is the product
 *  · 4 and 8   — one divides the other, so the LCM is the bigger one
 *                (the "do not just multiply" trap, seen for real)
 *  · 6 and 9   — the book's worked example, LCM 18
 *  · 8 and 12  — a plain two-list search, LCM 24
 * ============================================================= */
const PAIRS = [
  { a: 4, b: 6, ma: [4, 8, 12, 16, 20, 24], mb: [6, 12, 18, 24], lcm: 12,
    note: '12 and 24 are both in both lists. The LCM is the lowest of them: 12.',
    noteVn: '12 và 24 đều có trong cả hai danh sách. BCNN là số nhỏ nhất: 12.',
    noteFr: '12 et 24 sont dans les deux listes. Le PPCM est le plus petit, donc 12.' },
  { a: 3, b: 5, ma: [3, 6, 9, 12, 15, 18], mb: [5, 10, 15, 20, 25], lcm: 15,
    note: 'Only 1 divides both, so the LCM is simply 3 × 5 = 15.',
    noteVn: 'Chỉ có 1 là ước số chung, nên BCNN đơn giản là 3 × 5 = 15.',
    noteFr: 'Seul 1 divise les deux, donc le PPCM est simplement 3 × 5 = 15.' },
  { a: 4, b: 8, ma: [4, 8, 12, 16, 20, 24], mb: [8, 16, 24, 32], lcm: 8,
    note: '4 divides into 8, so the LCM is just the bigger number, 8 — not 4 × 8 = 32.',
    noteVn: '4 chia hết 8, nên BCNN chính là số lớn hơn, 8 — không phải 4 × 8 = 32.',
    noteFr: '4 divise 8, donc le PPCM est juste le plus grand nombre, 8 — pas 4 × 8 = 32.' },
  { a: 6, b: 9, ma: [6, 12, 18, 24, 30, 36], mb: [9, 18, 27, 36], lcm: 18,
    note: 'The book’s example. The first number in both lists is 18.',
    noteVn: 'Ví dụ trong sách. Số đầu tiên có trong cả hai danh sách là 18.',
    noteFr: 'L’exemple du livre. Le premier nombre dans les deux listes est 18.' },
  { a: 8, b: 12, ma: [8, 16, 24, 32], mb: [12, 24, 36], lcm: 24,
    note: 'The first number that appears in both lists is 24.',
    noteVn: 'Số đầu tiên xuất hiện trong cả hai danh sách là 24.',
    noteFr: 'Le premier nombre qui apparaît dans les deux listes est 24.' },
]

// A chip: grey until its row is shown, then coloured; orange if it is a common
// multiple, green ringed if it is the LCM (both only once step ≥ 3 / 4).
const Chip = ({ n, base, common, isLcm, showMatches, showLcm }) => {
  let border = base
  let bg = 'transparent'
  let color = 'inherit'
  if (showLcm && isLcm) { border = GREEN; bg = `${GREEN}1a`; color = GREEN }
  else if (showMatches && common) { border = ORANGE; bg = `${ORANGE}1a`; color = ORANGE }
  return (
    <div
      className="rounded-lg border-2 px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono font-black text-lg sm:text-xl tabular-nums shadow-sm"
      style={{ borderColor: border, backgroundColor: bg, color }}>
      {n}
    </div>
  )
}

// One list of multiples. Hoisted to module scope (not defined during render) so
// React can keep it stable; the step and the common/LCM tests come in as props.
const MultRow = ({ label, nums, base, show, lcm, isCommon, step }) => (
  <div className={`transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
    <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1" style={{ color: base }}>{label}</div>
    <div className="flex flex-wrap gap-1.5">
      {nums.map((n) => (
        <Chip key={n} n={n} base={base} common={isCommon(n)} isLcm={n === lcm}
          showMatches={step >= 3} showLcm={step >= 4} />
      ))}
    </div>
  </div>
)

export const LcmFinderWidget = ({ lang = 'en' }) => {
  const [i, setI] = useState(0)
  const [step, setStep] = useState(0) // 0 prompt · 1 row A · 2 row B · 3 matches · 4 LCM
  const p = PAIRS[i]
  const last = i === PAIRS.length - 1
  const go = (n) => { setI(n); setStep(0) }

  const isCommon = (n) => p.ma.includes(n) && p.mb.includes(n)

  const nextLabel =
    step === 0 ? pick(lang, `Multiples of ${p.a}`, `Bội số của ${p.a}`, `Multiples de ${p.a}`)
      : step === 1 ? pick(lang, `Multiples of ${p.b}`, `Bội số của ${p.b}`, `Multiples de ${p.b}`)
        : step === 2 ? pick(lang, 'Find the matches', 'Tìm các số chung', 'Nombres communs')
          : step === 3 ? pick(lang, 'Show the LCM', 'Hiện BCNN', 'Voir le PPCM')
            : pick(lang, 'Next pair', 'Cặp tiếp theo', 'Paire suivante')

  return (
    <div className="w-full h-full flex flex-col select-none">
      <Stage>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {pick(lang, 'LCM finder', 'Máy tìm BCNN', 'Trouve le PPCM')}
          </span>
          <span className="font-mono font-black text-xs text-slate-400 tabular-nums">{i + 1}/{PAIRS.length}</span>
        </div>

        <div className="rounded-xl border-2 px-3 py-2.5 mb-2 shrink-0 text-center" style={{ borderColor: TEAL, backgroundColor: `${TEAL}0f` }}>
          <p className="font-black text-slate-800 dark:text-slate-100 leading-snug text-base sm:text-lg lg:text-xl">
            {pick(lang, `Find the lowest common multiple of ${p.a} and ${p.b}`, `Tìm bội số chung nhỏ nhất của ${p.a} và ${p.b}`, `Trouve le plus petit multiple commun de ${p.a} et ${p.b}`)}
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-2.5 text-slate-800 dark:text-slate-100">
          <MultRow label={pick(lang, `Multiples of ${p.a}`, `Bội số của ${p.a}`, `Multiples de ${p.a}`)} nums={p.ma} base={BLUE} show={step >= 1} lcm={p.lcm} isCommon={isCommon} step={step} />
          <MultRow label={pick(lang, `Multiples of ${p.b}`, `Bội số của ${p.b}`, `Multiples de ${p.b}`)} nums={p.mb} base={RED} show={step >= 2} lcm={p.lcm} isCommon={isCommon} step={step} />

          {step >= 4 && (
            <div className="rounded-xl px-3 py-2 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 border-2" style={{ borderColor: GREEN, backgroundColor: `${GREEN}12` }}>
              <span className="text-[10px] font-black uppercase tracking-widest shrink-0" style={{ color: GREEN }}>{pick(lang, 'LCM', 'BCNN', 'PPCM')}</span>
              <span className="font-mono font-black text-2xl" style={{ color: GREEN }}>{p.lcm}</span>
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
            {step === 4 && last ? pick(lang, 'That is the last one', 'Hết rồi', 'C’est la dernière') : nextLabel}
          </button>
        </div>
      </Controls>
    </div>
  )
}
