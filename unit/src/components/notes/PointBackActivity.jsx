import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, Target, Calculator } from 'lucide-react';
import { SafeInlineMath } from './SafeMath.jsx';
import PointTiles, { PointReminder } from '../math/PointTiles.jsx';
import { StepPanel } from '../math/StepKit.jsx';
import { activityModel, diagnosePlace, plain } from '../../utils/pointBack';
import { tr } from '../../utils/lang';

/**
 * `pointback` — put the point back, on a slide (Year 7 Maths 4.3). Rendered by
 * ActivityBlock, checked by utils/activity.js (utils/pointBack.js derives it):
 *
 *   { id, type: 'pointback', a: '3.6', b: '24', prompt, promptFr, explain, explainFr }
 *       the point is out and the whole-number product shown (36 × 24 = 864):
 *       tap the gap where the point goes
 *   { id, type: 'pointback', fact: '47 × 23 = 1081', q: '0.47 × 23', … }
 *       the fact's digits: estimate, then tap where the point goes
 *
 * Two tries; a wrong first tap is answered by the name of its slip. Contract
 * as for every activity: `result` is the stored `{ done, correct, … }`;
 * `onResult` is called once, with done: true. English and French.
 *
 * The step wears the Unit 4 frame (components/math/StepKit.jsx, plain and
 * compact, as Fill the Zeros' deck activity does): one line saying what to do,
 * the tiles, the feedback under them, Check.
 */

const INK = '#0d9488';
const T = {
  en: {
    answer: 'Answer', tapFirst: 'Tap a gap between the digits first.', correct: 'Correct', notQuite: 'Not quite',
    tapHow: 'Tap the gap where the point goes.', subCount: 'Count the decimal places in the question.', subEst: 'Estimate in your head first.',
    estimate: 'An estimate', tryAgain: 'One more try.', pointOut: 'Point out', useFact: 'Use this fact',
  },
  fr: {
    answer: 'Réponse', tapFirst: "Touche d'abord un espace entre les chiffres.", correct: 'Correct !', notQuite: 'Pas tout à fait',
    tapHow: "Touche l'espace où va le point.", subCount: 'Compte les décimales dans la question.', subEst: 'Estime d’abord de tête.',
    estimate: 'Une estimation', tryAgain: 'Encore un essai.', pointOut: 'Point enlevé', useFact: 'Utilise ce fait',
  },
};
const said = (lang, m) => (m ? tr(lang, m.en, null, m.fr) : '');

export function PointBackActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const m = useMemo(() => activityModel(activity), [activity]);
  const [k, setK] = useState(result?.k ?? null);
  const [tries, setTries] = useState(result?.tries || 0);
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;

  const pick = (kk) => { if (!checked) { setK(kk); setMsg((x) => (x?.tone === 'nudge' ? null : x)); } };
  const check = () => {
    if (checked) return;
    if (k == null) { setMsg({ tone: 'nudge', en: T.en.tapFirst, fr: T.fr.tapFirst }); return; }
    const d = diagnosePlace(m.spec, k);
    const n = tries + 1;
    if (d.ok) { onResult({ done: true, correct: true, k, tries: n }); return; }
    setTries(n);
    if (n >= 2) onResult({ done: true, correct: false, k, tries: n, why: { en: d.en, fr: d.fr } });
    else setMsg({ tone: 'bad', en: `${T.en.tryAgain} ${d.en}`, fr: `${T.fr.tryAgain} ${d.fr}` });
  };

  // The sum, and what its digits come from: the product with the point out, or the fact.
  const sumRow = (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-slate-800 dark:text-slate-100">
      <span className="text-2xl sm:text-3xl"><SafeInlineMath math={m.latex} /></span>
      <PointReminder kind={m.fact ? 'fact' : 'product'} icon={m.fact ? null : Calculator} label={m.fact ? t.useFact : t.pointOut}>
        <SafeInlineMath math={m.lead} />
      </PointReminder>
    </div>
  );

  if (!checked) {
    return (
      <div className="flex flex-col gap-3">
        {sumRow}
        <StepPanel ink={INK} lang={lang} plain compact title={t.tapHow} sub={m.fact ? t.subEst : t.subCount} msg={msg} onCheck={check}>
          <PointTiles row={m.spec.row} k={k} onPick={pick} lang={lang} compact />
        </StepPanel>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {sumRow}
      {/* the verdict writes the answer just below, so no number under the tiles */}
      <PointTiles row={m.spec.row} k={m.spec.want} tone={result.correct ? 'good' : 'shown'} lang={lang} compact readout={false} />
      <div className={`rounded-xl border-2 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
        <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
          {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
          {result.correct ? t.correct : t.notQuite}
        </div>
        <div className={`font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
          {!result.correct && result.why && <div className="mb-1">{said(lang, result.why)}</div>}
          <div className="mb-1 text-lg"><span className="text-[10px] uppercase tracking-widest mr-2">{t.answer}</span><SafeInlineMath math={`${m.latex} = ${m.simpleText}`} /></div>
          {m.fact && (
            <div className="mb-1 flex items-center gap-1.5 text-sm"><Target className="w-4 h-4" strokeWidth={3} />{t.estimate}: <SafeInlineMath math={`${plain(m.spec.sum.est.a)} ${m.spec.sum.op === '÷' ? '\\div' : '\\times'} ${plain(m.spec.sum.est.b)} = ${plain(m.spec.sum.est.value)}`} /></div>
          )}
          {parseText(tr(lang, activity.explain, null, activity.explainFr))}
        </div>
      </div>
    </div>
  );
}
