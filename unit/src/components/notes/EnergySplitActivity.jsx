import { useMemo } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { splitModel } from '../../utils/energySplit';
import { tr } from '../../utils/lang';
import useTapDrag from '../science/storyboard/useTapDrag.js';
import useSplitRun from '../science/energysplit/useSplitRun.js';
import SplitBoard from '../science/energysplit/SplitBoard.jsx';
import SplitStage from '../science/energysplit/SplitStage.jsx';

/**
 * `energysplit` — one Where Did It Go? round on a Notes slide (Year 7 Science
 * 3.7). Rendered by ActivityBlock, checked by utils/activity.js →
 * energySplitCheck.checkEnergySplitActivity.
 *
 *   { id, type: 'energysplit', device: 'lampA', total: 200, ask: 'both', sort: false,
 *     prompt, promptFr, explain, explainFr }                 walked, like levels 1–2
 *   { …, device: 'fan', walk: false, picture?: svg }        QUICK, like level 3+
 *
 * Each stage allows one wrong answer, named; a second (or Show me) fills it in
 * and the activity scores wrong.
 */
const T = {
  en: { correct: 'Correct', notQuite: 'Not quite' },
  fr: { correct: 'Correct !', notQuite: 'Pas tout à fait' },
};

function Runner({ model, lang, onResult, picture }) {
  const run = useSplitRun(model, { onFinish: ({ helped }) => onResult({ done: true, correct: !helped }) });
  const drag = useTapDrag((chip, to) => run.act.place(chip, to));
  const r = { ...run, drag };
  return (
    <div className="flex flex-col gap-2">
      {picture && <div className="mx-auto w-full max-w-[11rem] aspect-[400/260]" dangerouslySetInnerHTML={{ __html: picture }} />}
      <SplitBoard m={model} run={r} lang={lang} compact />
      <SplitStage run={r} lang={lang} compact />
    </div>
  );
}

export function EnergySplitActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const model = useMemo(() => splitModel({ ...activity, level: 1 }), [activity]);
  const checked = !!result?.done;
  return (
    <div>
      {!checked && <Runner key={activity.id} model={model} lang={lang} onResult={onResult} picture={activity.picture} />}
      {checked && (
        <div className={`rounded-xl border-2 mt-1 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
          <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
            {result.correct ? t.correct : t.notQuite}
          </div>
          <div className={`font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {parseText(tr(lang, activity.explain, null, activity.explainFr))}
          </div>
        </div>
      )}
    </div>
  );
}
