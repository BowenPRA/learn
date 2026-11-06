import { CheckCircle2, XCircle } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { SORT_BINS } from '../../../utils/solarStory';
import { FrameCard } from './OrderBoard.jsx';

/* ------------------------------------------------------------------ *
 * Storyboard: the evidence and model stages. A choice is answered the moment
 * it is tapped (a wrong one turns red and stays out); the frame choice shows
 * the four frames themselves; the model sort is two buttons per statement and
 * a Check.
 * ------------------------------------------------------------------ */

/** Big tap-once buttons. `wrong`: values already tried; `right`: the answer, once found. */
export function ChoiceButtons({ options, wrong = [], right = null, onPick, cols = 1 }) {
  return (
    <div className={`grid gap-2 ${cols === 2 ? 'sm:grid-cols-2' : ''}`}>
      {options.map((o) => {
        const bad = wrong.includes(o.val);
        const good = right === o.val;
        return (
          <button key={o.val} type="button" disabled={bad || right != null} onClick={() => onPick(o.val)}
            className={`rounded-xl border-2 border-b-[4px] px-4 py-3 text-left font-black text-sm sm:text-base leading-snug transition-all flex items-start gap-2
              ${good ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
                : bad ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-amber-400'}`}>
            {good && <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} />}
            {bad && <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Tap the frame of the story that a fact shows. */
export function FrameChoice({ steps, frames, lang, wrong = [], right = null, onPick }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
      {steps.map((s) => {
        const bad = wrong.includes(s);
        const good = right === s;
        return (
          <button key={s} type="button" disabled={bad || right != null} onClick={() => onPick(s)}
            className={`text-left transition-opacity ${bad ? 'opacity-60' : ''}`}>
            <FrameCard step={s} svg={frames?.[s]} lang={lang} tone={good ? 'right' : bad ? 'wrong' : 'idle'} />
          </button>
        );
      })}
    </div>
  );
}

/**
 * Four statements about a model, each a strength or a limitation. `marks`
 * (after a Check) is the engine's per-statement result.
 */
export function SortBoard({ statements, picks, onPick, lang, marks = null, locked = false }) {
  return (
    <div className="flex flex-col gap-2">
      {statements.map((st) => {
        const res = marks?.find((p) => p.id === st.id);
        const fixed = locked || res?.ok;
        return (
          <div key={st.id} className={`rounded-xl border-2 p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center gap-2
            ${res?.ok ? 'border-[#58a700] bg-[#d7ffb8]/50 dark:bg-lime-900/20' : res && res.code === 'mixed' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-snug">{tr(lang, st.en, null, st.fr)}</p>
              {res && res.code === 'mixed' && <p className="mt-1 text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-300 leading-snug">{tr(lang, res.en, null, res.fr)}</p>}
            </div>
            <div className="flex gap-1.5 shrink-0" role="group">
              {Object.keys(SORT_BINS).map((bin) => {
                const on = picks[st.id] === bin;
                return (
                  <button key={bin} type="button" disabled={fixed} onClick={() => onPick(st.id, bin)} aria-pressed={on}
                    className={`px-3 py-2 rounded-xl border-2 border-b-[4px] text-xs font-black uppercase tracking-wider transition-all
                      ${on ? (bin === 'strength' ? 'border-teal-600 bg-teal-600 text-white' : 'border-purple-700 bg-purple-700 text-white')
                        : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-200 hover:border-slate-400'}
                      disabled:cursor-default`}>
                    {tr(lang, SORT_BINS[bin].en, null, SORT_BINS[bin].fr)}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
