import { useMemo } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { roundModel } from '../../utils/orbitLab';
import { orbitItemOf } from '../../utils/orbitLabCheck';
import { useOrbitItem } from '../science/orbitlab/useOrbitItem';
import { OrbitPicture, StagePanel } from '../science/orbitlab/OrbitStage.jsx';
import { tr } from '../../utils/lang';

/**
 * `orbitlab` — one Orbit Lab item on a Notes slide (Year 7 Science 3.3).
 * Rendered by ActivityBlock, checked by utils/activity.js →
 * orbitLabCheck.checkOrbitLabActivity.
 *
 *   { id, type: 'orbitlab', kind: 'pull', scene: 'sun', orbiter: 'mars', at: 135, dir: 'acw', ask: ['pull', 'path'], prompt, promptFr, explain, explainFr }
 *   { id, type: 'orbitlab', kind: 'graph', set: 'planets', given: ['mercury'], ask: ['draw', 'pattern'], … }
 *
 * The same stages as the task (useOrbitItem), walked (a deck item walks
 * unless walk: false), with no Show me: a wrong answer is named and tried
 * once more; a second fills it in, and the activity scores wrong.
 */

function Verdict({ correct, lang, children }) {
  return (
    <div className={`rounded-xl border-2 mt-2 p-3 ${correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
      <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
        {correct ? tr(lang, 'Correct', null, 'Correct !') : tr(lang, 'Not quite', null, 'Pas tout à fait')}
      </div>
      <div className={`font-bold leading-relaxed text-sm lg:text-base ${correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>{children}</div>
    </div>
  );
}

function Live({ activity, model, lang, onResult, parseText }) {
  const o = useOrbitItem(model, { onDone: ({ helped }) => onResult({ done: true, correct: !helped }) });
  return (
    <div>
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white p-1 mb-2">
        <OrbitPicture o={o} lang={lang} compact />
      </div>
      {!o.done && <StagePanel o={o} lang={lang} showMe={false} compact />}
      {o.done && (
        <Verdict correct={!o.helped} lang={lang}>{parseText(tr(lang, activity.explain, null, activity.explainFr))}</Verdict>
      )}
    </div>
  );
}

/** The picture with the answer drawn in, for a slide already answered. */
function answered(model) {
  return {
    m: model, stage: null, done: true, queue: [], arrows: {}, released: true, tapArrow: () => {},
    heights: {}, sel: null, setSel: () => {}, setBar: () => {}, marks: null,
  };
}

export function OrbitLabActivity({ activity, lang, result, onResult, parseText }) {
  const model = useMemo(() => {
    try { return roundModel(orbitItemOf(activity)); } catch { return null; }
  }, [activity]);
  if (!model) return <div className="text-rose-500 font-bold text-sm">orbitlab: this item cannot be built.</div>;
  if (result?.done) {
    return (
      <div>
        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white p-1 mb-2">
          <OrbitPicture o={answered(model)} lang={lang} compact />
        </div>
        <Verdict correct={result.correct} lang={lang}>{parseText(tr(lang, activity.explain, null, activity.explainFr))}</Verdict>
      </div>
    );
  }
  return <Live activity={activity} model={model} lang={lang} onResult={onResult} parseText={parseText} />;
}
