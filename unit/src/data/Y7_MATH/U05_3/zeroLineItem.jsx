// src/data/Y7_MATH/U05_3/zeroLineItem.jsx
// One Zero on the Line item, played: the stage logic (useZeroLineItem) and its
// controls (StagePanel). The task screen (src/tasks/ZeroLine.jsx) and the deck
// activity (components/notes/ZeroLineActivity.jsx) both use them, so the two
// can never disagree about a stage or a slip.
//
// The rule (docs/y7-math/plans/U05_3.md): two or three actions an item. An
// extra stage opens only after a wrong answer, where the slip happened — a
// read on the other scale opens "tap the 0 on the arm", the inside of a reflex
// angle opens "360 − ?". A wrong answer is named and tried once more; a second
// one (or Show me) fills the stage in, and the item counts as helped.
import { CheckCircle2, XCircle, Lightbulb, Minus, Plus } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { ZT } from './zeroLineState.js';

const GOOD = 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]';
const BADC = 'bg-rose-50 border-rose-400 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300';
const IDLE = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-orange-400';
const primary = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none bg-[#58cc02] border-[#3e7500] text-white';
const nudge = 'w-11 h-11 rounded-xl border-2 border-b-[4px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 flex items-center justify-center active:translate-y-[2px] disabled:opacity-40';

export function ZMessage({ msg, lang }) {
  if (!msg) return null;
  const text = tr(lang, msg.en, null, msg.fr || msg.en);
  const tone = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : msg.tone === 'bad' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300'
      : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300';
  const Icon = msg.tone === 'ok' ? CheckCircle2 : msg.tone === 'bad' ? XCircle : Lightbulb;
  return (
    <div className={`mt-2 flex items-start gap-2 p-2.5 rounded-xl border-2 font-bold text-sm leading-relaxed ${tone}`}>
      <Icon className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} />
      <span>{text}</span>
    </div>
  );
}

/** The controls for the current stage (nothing once the item is done). `showMe` adds the Show me button. */
export function StagePanel({ zl, model, lang, showMe = true }) {
  const t = ZT[lang] || ZT.en;
  if (!zl.stage) return null;
  const s = zl.stage;
  const ask = s === 'estimate' ? t.estimate
    : s === 'zero' ? (model.draw ? t.zeroLine : t.zeroArm)
      : s === 'read' ? (model.kind === 'reflex' ? t.reflexRead : model.read?.offset ? t.readOff : t.read)
        : s === 'subtract' ? t.subtract(model.inside)
          : t[s];
  const typing = s === 'read' || s === 'subtract' || s === 'measure';
  return (
    <div>
      <p className="mb-2 text-sm font-black text-slate-700 dark:text-slate-200">{ask}</p>
      {s === 'estimate' && (
        <div className="grid grid-cols-3 gap-2">
          {['acute', 'obtuse', 'reflex'].map((e) => (
            <button key={e} type="button" disabled={!!zl.bad[e]} onClick={() => zl.pickEstimate(e)}
              className={`rounded-xl border-2 border-b-[4px] px-2 py-2 font-black text-sm transition-all ${zl.bad[e] ? BADC : IDLE}`}>
              {t.est[e][0]}<span className="block text-[11px] font-bold opacity-70">{t.est[e][1]}</span>
            </button>
          ))}
        </div>
      )}
      {typing && (
        <div className="flex items-center gap-2">
          <input autoFocus value={zl.typed} onChange={(e) => zl.setTyped(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); zl.checkTyped(); } }}
            inputMode="decimal" autoComplete="off" spellCheck={false} placeholder="?" aria-label={s === 'measure' ? t.cm : t.degrees}
            className={`w-28 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-xl text-center focus:outline-none focus:border-orange-500 ${zl.msg?.tone === 'bad' ? BADC : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100'}`} />
          <span className="font-black text-slate-500 dark:text-slate-400">{s === 'measure' ? 'cm' : '°'}</span>
          <button type="button" onClick={zl.checkTyped} disabled={!zl.typed.trim()} className={`ml-auto ${primary}`}>{t.check}</button>
        </div>
      )}
      {s === 'mark' && (
        <div className="flex items-center gap-2">
          <button type="button" className={nudge} disabled={zl.mark == null} onClick={() => zl.setMark(zl.mark - 1)} aria-label="−1°"><Minus className="w-5 h-5" strokeWidth={3} /></button>
          <button type="button" className={nudge} disabled={zl.mark == null} onClick={() => zl.setMark(zl.mark + 1)} aria-label="+1°"><Plus className="w-5 h-5" strokeWidth={3} /></button>
          <button type="button" onClick={zl.checkMark} disabled={zl.mark == null} className={`ml-auto ${primary}`}>{t.check}</button>
        </div>
      )}
      {s === 'place' && (
        <div className="flex items-center gap-2">
          <button type="button" className={nudge} onClick={() => zl.movePlace(zl.place - 0.1)} aria-label="−1 mm"><Minus className="w-5 h-5" strokeWidth={3} /></button>
          <button type="button" className={nudge} onClick={() => zl.movePlace(zl.place + 0.1)} aria-label="+1 mm"><Plus className="w-5 h-5" strokeWidth={3} /></button>
          <button type="button" onClick={zl.checkPlace} className={`ml-auto ${primary}`}>{t.check}</button>
        </div>
      )}
      <ZMessage msg={zl.msg} lang={lang} />
      {showMe && (
        <div className="mt-2 flex justify-end">
          <button type="button" onClick={zl.showMe} className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-[11px] uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
            <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.show}
          </button>
        </div>
      )}
    </div>
  );
}

/** The stage chips, in the order the item will run them. */
export function StageChips({ zl, lang }) {
  const t = ZT[lang] || ZT.en;
  const all = [...zl.passed.map((s) => [s, 'done']), ...zl.queue.map((s, i) => [s, i === 0 ? 'now' : 'next'])];
  return (
    <div className="flex flex-wrap gap-1.5">
      {all.map(([s, state], i) => (
        <span key={i} className={`px-2.5 py-1 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest
          ${state === 'done' ? GOOD : state === 'now' ? 'bg-[#c25e12] border-[#a04a0e] text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
          {t.stages[s]}
        </span>
      ))}
    </div>
  );
}
