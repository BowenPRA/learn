import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { STEPS } from '../../../utils/solarStory';
import useTapDrag from './useTapDrag.js';

/* ------------------------------------------------------------------ *
 * Storyboard parts (SOLAR_STORY, Y7 Science 3.2): one frame of the story,
 * and the board where the frames are put in order (the tap-or-drag helper
 * is useTapDrag.js). Built for a finger on a tablet first:
 *   · TAP one frame, then TAP another, and they swap (tap the first again to
 *     let go). Works with a keyboard too: Enter on two frames.
 *   · or DRAG one onto another (mouse, pen, or a finger moving sideways — a
 *     finger moving up or down scrolls the page instead, so tapping is the
 *     sure way on a phone).
 * At 375 px the frames wrap two to a row.
 * ------------------------------------------------------------------ */

/** One frame: the drawing, its name and (optionally) what it shows. */
export function FrameCard({ step, svg, lang, showSays = true, compact = false, tone = 'idle', badge = null }) {
  const S = STEPS[step];
  const ring = {
    idle: 'border-slate-200 dark:border-slate-700',
    picked: 'border-amber-400 ring-4 ring-amber-300/60',
    hover: 'border-sky-400 ring-4 ring-sky-300/60',
    right: 'border-[#58a700] ring-2 ring-[#58cc02]/40',
    wrong: 'border-rose-400 ring-2 ring-rose-300/50',
  }[tone];
  return (
    <div className={`relative h-full flex flex-col rounded-xl border-2 overflow-hidden bg-white dark:bg-slate-800 transition-shadow ${ring}`}>
      {badge}
      <div className="w-full aspect-[3/2] bg-[#020309] [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: svg || '' }} />
      <div className={compact ? 'px-2 py-1' : 'px-2 py-1.5'}>
        <div className={`font-black text-slate-800 dark:text-slate-100 ${compact ? 'text-xs' : 'text-sm'}`}>{tr(lang, S.en, null, S.fr)}</div>
        {showSays && <div className="text-[11px] sm:text-xs font-semibold leading-snug text-slate-500 dark:text-slate-400">{tr(lang, S.says, null, S.saysFr)}</div>}
      </div>
    </div>
  );
}

const T = {
  en: { pos: (i) => `Frame ${i}`, picked: 'Picked — now tap the frame to swap with' },
  fr: { pos: (i) => `Image ${i}`, picked: 'Choisie — touche maintenant l’image à échanger' },
};

/**
 * The frames in the student's order. `marks` (after a Check) is one boolean
 * per position; they clear as soon as the order changes.
 */
export function OrderBoard({ arrangement, onChange, frames, lang, marks = null, locked = false }) {
  const [picked, setPicked] = useState(null);
  const t = T[lang] || T.en;
  const swap = (i, j) => {
    if (i === j) return;
    const next = [...arrangement];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const { handlers, hover, tookDrag } = useTapDrag((from, to) => { setPicked(null); swap(Number(from), Number(to)); });
  const tap = (i) => {
    if (locked || tookDrag()) return;
    if (picked === null) setPicked(i);
    else if (picked === i) setPicked(null);
    else { swap(picked, i); setPicked(null); }
  };
  const n = arrangement.length;
  const cols = n <= 3 ? 'grid-cols-2 sm:grid-cols-3' : n === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
  return (
    <div className={`grid gap-2 sm:gap-3 ${cols}`}>
      {arrangement.map((step, i) => {
        const mark = marks ? marks[i] : null;
        const tone = picked === i ? 'picked' : hover === String(i) ? 'hover' : mark === true ? 'right' : mark === false ? 'wrong' : 'idle';
        return (
          <button
            key={step}
            type="button"
            data-drop={i}
            disabled={locked}
            onClick={() => tap(i)}
            {...(locked ? {} : handlers(i))}
            aria-pressed={picked === i}
            aria-label={`${t.pos(i + 1)}: ${tr(lang, STEPS[step].en, null, STEPS[step].fr)}${picked === i ? ` — ${t.picked}` : ''}`}
            className="text-left select-none touch-pan-y disabled:cursor-default cursor-grab active:cursor-grabbing"
          >
            <FrameCard step={step} svg={frames?.[step]} lang={lang} tone={tone}
              badge={(
                <span className={`absolute top-1.5 left-1.5 z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow
                  ${mark === true ? 'bg-[#58cc02] text-white' : mark === false ? 'bg-rose-500 text-white' : 'bg-amber-400 text-slate-950'}`}>
                  {mark === true ? <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> : mark === false ? <XCircle className="w-4 h-4" strokeWidth={3} /> : i + 1}
                </span>
              )} />
          </button>
        );
      })}
    </div>
  );
}
