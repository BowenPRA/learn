import { useMemo } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import DecOrderItem from '../math/DecOrderItem.jsx';
import { DecOrderFinal } from '../math/DecOrderBoard.jsx';
import { decOrderModel } from '../../utils/decOrder';
import { tr } from '../../utils/lang';

/**
 * `decorder` — Fill the Zeros on a Notes slide (Year 7 Maths 4.1). The item's
 * fields sit on the activity, exactly as in the task (docs/y7-math/decimal-engines.md):
 *
 *   { id, type: 'decorder', kind: 'compare', a: '4.09', b: '4.1', prompt, promptFr, explain, explainFr }
 *   { id, type: 'decorder', kind: 'order', nums: […], dir: 'asc' | word: 'fastest', labels?, unit?, position?, … }
 *   { id, type: 'decorder', kind: 'digit', a: '4.□5', sign: '>', b: '4.38', … }
 *
 * Fill with zeros first (not marked), then order / compare / the digits (and
 * the position). One try: the first wrong answer ends it, named by its slip,
 * and the right answer is drawn — the contract every deck activity keeps
 * (`result` = `{ done, correct, msg }`, `onResult` called once).
 */
export function DecOrderActivity({ activity, lang, result, onResult, parseText, side }) {
  const model = useMemo(() => {
    try { return decOrderModel(activity); } catch { return null; }
  }, [activity]);
  if (!model) return <div className="text-rose-500 font-bold text-sm">decorder: this activity cannot be built.</div>;

  if (!result?.done) {
    return (
      <DecOrderItem key={activity.id} model={model} lang={lang} oneShot compact={side}
        onDone={(r) => onResult({ done: true, correct: r.correct, msg: r.msg ? { en: r.msg.en, fr: r.msg.fr } : null })} />
    );
  }
  const ok = !!result.correct;
  const slip = result.msg && !ok ? tr(lang, result.msg.en, result.msg.en, result.msg.fr) : '';
  const explain = tr(lang, activity.explain, activity.explain, activity.explainFr);
  return (
    <div>
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2 sm:p-3">
        <DecOrderFinal model={model} compact={side} />
      </div>
      <div className={`rounded-xl border-2 mt-3 p-3 ${ok ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
        <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
          {ok ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
          {ok ? tr(lang, 'Correct', 'Correct', 'Correct !') : tr(lang, 'Not quite', 'Not quite', 'Pas tout à fait')}
        </div>
        {slip && <p className="font-bold leading-relaxed text-sm lg:text-base text-[#a32d23] mb-1.5">{slip}</p>}
        <div className={`font-bold leading-relaxed text-sm lg:text-base ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>{parseText(explain)}</div>
      </div>
    </div>
  );
}
