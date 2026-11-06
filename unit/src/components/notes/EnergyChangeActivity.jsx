import { Fragment, useMemo } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { energyModel, ENERGIES } from '../../utils/energyChange';
import { tr } from '../../utils/lang';
import EnergyRound from '../science/energychange/EnergyRound.jsx';

/**
 * `energychange` — one From… To… diagram on a Notes slide (Year 7 Science
 * 3.6). Rendered by ActivityBlock, checked by utils/activity.js →
 * energyChangeCheck.checkEnergyChangeActivity.
 *
 *   { id, type: 'energychange', kind: 'one' | 'branch' | 'chain' | 'mixed', scene, prompt, promptFr, explain, explainFr }
 *   { …, walk: false }    opens QUICK (the whole diagram, one Check), like the task from level 3
 *
 * Walked by default, without the event-or-process stage; the slide carries the
 * picture. Each stage allows one wrong answer, named; a second (or Show me)
 * fills it in and the activity scores wrong.
 */

const T = {
  en: { correct: 'Correct', notQuite: 'Not quite' },
  fr: { correct: 'Correct !', notQuite: 'Pas tout à fait' },
};

// The finished diagram on one wrapping line (a column of boxes would make the
// side panel scroll): the line's energies with arrows, then the outputs together.
function Chip({ e, lang }) {
  return (
    <span className="inline-flex flex-col items-center rounded-lg border-2 border-[#58a700] bg-white px-1.5 py-0.5 leading-tight">
      <span className="text-xs font-black text-slate-800">{ENERGIES[e].en}</span>
      {lang === 'fr' && <span className="text-[9px] font-bold text-slate-500">{ENERGIES[e].fr}</span>}
    </span>
  );
}
function DiagramLine({ model, lang }) {
  const arrow = <ArrowRight className="w-4 h-4 shrink-0 text-slate-600" strokeWidth={3} />;
  return (
    <div className="flex flex-wrap items-center gap-1">
      {model.line.map((e, i) => <Fragment key={e}>{i > 0 && arrow}<Chip e={e} lang={lang} /></Fragment>)}
      {model.outputs.length > 0 && (
        <>
          {arrow}
          <span className="inline-flex flex-wrap gap-1 rounded-xl border-2 border-dashed border-slate-400 p-1">
            {model.outputs.map((e) => <Chip key={e} e={e} lang={lang} />)}
          </span>
        </>
      )}
    </div>
  );
}

export function EnergyChangeActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const model = useMemo(() => energyModel({
    id: activity.id, level: 1, kind: activity.kind, scene: activity.scene, walk: activity.walk ?? true, happens: false,
  }), [activity]);
  const checked = !!result?.done;
  if (!checked) {
    return <EnergyRound key={activity.id} model={model} lang={lang} compact onComplete={(helped) => onResult({ done: true, correct: !helped })} />;
  }
  return (
    <div className={`rounded-xl border-2 mt-1 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
      <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-2 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
        {result.correct ? t.correct : t.notQuite}
      </div>
      <DiagramLine model={model} lang={lang} />
      <div className={`mt-2 font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {parseText(tr(lang, activity.explain, null, activity.explainFr))}
      </div>
    </div>
  );
}
