import { useMemo } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import DecColumnWork from '../math/DecColumnWork.jsx';
import { calcModel, calcText } from '../../utils/decColumn';
import { tr } from '../../utils/lang';

/**
 * `deccol` — one written column sum on a Notes slide (Year 7 Maths 4.2):
 * line up the points, fill the gaps with zeros, work the columns from the
 * right. The same stages as the Line Up the Points task
 * (components/math/DecColumnWork.jsx), on one calculation:
 *
 *   { id, type: 'deccol', a: '20', op: '−', b: '8.35', prompt, promptFr, explain, explainFr }
 *
 * Correct = finished without a step being filled in (a slip that the student
 * fixes on the second try still counts). Checked by utils/activity.js
 * (decColumn.checkDecColumnActivity). A retry starts the sum again.
 * The steps are StepKit's StepPanel (compact beside the slide); the checked
 * sum sits in the same light box as Fill the Zeros' `decorder`.
 */
export function DecColumnActivity({ activity, lang, result, onResult, parseText, side }) {
  const m = useMemo(() => calcModel(activity), [activity]);
  const checked = !!result?.done;
  const answer = `${calcText(m)} = ${m.answerText}${m.answerText !== m.answerCanon ? ` = ${m.answerCanon}` : ''}`;
  const work = (
    <DecColumnWork key={checked ? 'done' : 'live'} m={m} lang={lang} uid={`dca-${activity.id}`} compact={side}
      finished={checked} onFinish={({ helped, slipped }) => onResult({ done: true, correct: !helped, slipped })} />
  );

  return (
    <div>
      {checked
        ? <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2 sm:p-3">{work}</div>
        : work}
      {checked && (
        <div className={`rounded-xl border-2 mt-3 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
          <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
            {result.correct ? tr(lang, 'Correct', null, 'Correct !') : tr(lang, 'Done, with help', null, 'Fini, avec de l’aide')}
          </div>
          <div className={`font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            <div className="mb-1 font-mono font-black text-base lg:text-lg">{answer}</div>
            {parseText(tr(lang, activity.explain, activity.explainVn, activity.explainFr))}
          </div>
        </div>
      )}
    </div>
  );
}
