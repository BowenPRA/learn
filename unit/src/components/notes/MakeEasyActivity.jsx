import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { SafeInlineMath } from './SafeMath.jsx';
import { StepPanel } from '../math/StepKit.jsx';
import { stepsOf } from '../math/stepKitParts';
import { easyModel, chainLatex, diagnoseMeaning, diagnoseRoute, diagnoseStep, txt } from '../../utils/makeEasy';
import { tr } from '../../utils/lang';

/**
 * `makeeasy` — Make It Easy on a Notes slide (Year 7 Maths 4.5). Rendered by
 * ActivityBlock, checked by utils/activity.js → makeEasy.checkEasyActivity.
 *
 *   { id, type: 'makeeasy', a: '800', b: '0.07', prompt, promptFr, explain, explainFr }
 *   { …, kind: 'of', a: '36', b: '0.25' }                         "a quarter of 36"
 *   { …, a: '2.15', b: '9', context, contextFr, cue: 'each' }      a story
 *
 * The task's stages, compact: (the words → the calculation), the easy way
 * from 2–3, then each step's box in turn — the last box is the answer. Each
 * stage allows one wrong answer, named; a second fills it in, and the activity
 * is then scored wrong. Enter in a box checks it and goes no further (the
 * deck's Enter-for-next must not skip the verdict). No "bigger or smaller?"
 * stage — the deck asks that with its own `predict` and `order`.
 *
 * It wears the task's frame (StepKit's StepPanel: numbered steps, a note about
 * the step just finished above the new one, feedback under the work), and the
 * two pieces of work below — the ways to choose from and the step boxes — are
 * the task's own too: tasks/MakeEasy.jsx draws them from here.
 */

const INK = '#c25e12';

const T = {
  en: {
    stages: { meaning: 'Calculation', route: 'Easy way', steps: 'Work it out' },
    meaning: 'Which calculation is it?', route: 'Which is the easy way?', steps: 'Work it out, one step at a time.',
    tryAgain: 'One more try.', answer: 'Answer', correct: 'Correct', notQuite: 'Not quite', filled: 'It is filled in for you.',
  },
  fr: {
    stages: { meaning: 'Calcul', route: 'Moyen facile', steps: 'Calcule' },
    meaning: 'Quel calcul est-ce ?', route: 'Quel est le moyen facile ?', steps: 'Calcule, une étape à la fois.',
    tryAgain: 'Encore un essai.', answer: 'Réponse', correct: 'Correct !', notQuite: 'Pas tout à fait', filled: 'C’est rempli pour toi.',
  },
};

/* ------------------------------------------------------------------ the work, shared with the task */

const CHOICE_IDLE = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-orange-400 hover:bg-orange-50/60 dark:hover:border-orange-500 dark:hover:bg-slate-700';
const CHOICE_BAD = 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-400 opacity-80';

/**
 * The ways to choose from, one tap each. options: [{ id, latex } | { id, words, icon }];
 * picks: { [id]: 'bad' } — a way already tried and wrong stays crossed out.
 * Two worded ways ("Bigger than 340", "Smaller than 340") sit side by side;
 * calculations sit one under another, so they read like a list to compare.
 */
export function EasyChoices({ options, picks = {}, onPick, compact = false }) {
  const pair = options.length === 2 && options.every((o) => o.words);
  return (
    <div className={`grid ${compact ? 'gap-1.5' : 'gap-2'} ${pair ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
      {options.map((o) => {
        const bad = picks[o.id] === 'bad';
        const Icon = o.icon;
        return (
          <button key={o.id} type="button" disabled={bad} onClick={() => onPick(o.id)}
            className={`relative w-full flex items-center justify-center gap-2.5 rounded-2xl border-2 border-b-[4px] font-black transition-all active:translate-y-[2px] active:border-b-2 disabled:cursor-default overflow-x-auto overflow-y-hidden
              ${compact ? 'min-h-[2.75rem] px-3 py-1 text-lg' : `min-h-[3.75rem] px-4 py-2 ${o.words ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'}`}
              ${bad ? CHOICE_BAD : CHOICE_IDLE}`}>
            {Icon && <Icon className={`${compact ? 'w-5 h-5' : 'w-6 h-6'} shrink-0 ${bad ? '' : 'text-[#c25e12] dark:text-orange-400'}`} strokeWidth={3} />}
            {o.latex ? <SafeInlineMath math={o.latex} /> : <span className={bad ? 'line-through decoration-2' : ''}>{o.words}</span>}
            {bad && <XCircle className="absolute top-1.5 right-1.5 w-4 h-4 text-rose-400" strokeWidth={2.5} />}
          </button>
        );
      })}
    </div>
  );
}

const BOX = 'shrink-0 rounded-xl border-2 border-b-[4px] font-mono font-black text-center';
const BOX_GOOD = 'border-[#58a700] bg-[#d7ffb8] text-[#3e7500] dark:bg-lime-900/30 dark:border-lime-700 dark:text-lime-200';
const BOX_SHOWN = 'border-amber-400 bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-200';
const BOX_OPEN = 'border-[#c25e12]/60 bg-[#fff8f2] text-[#a04a0e] placeholder:text-orange-300 focus:border-[#c25e12] focus:bg-white dark:bg-slate-950 dark:text-orange-300 dark:placeholder:text-orange-900 dark:focus:bg-slate-900';
const BOX_BAD = 'border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300';
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/**
 * The steps of the easy way, one row each: what the step does ("One tenth"),
 * the step (340 ÷ 10 =) and its box. vals: { text, mark: 'good' | 'shown' } per
 * finished step; the first row without one is the box being typed (`typed`,
 * `bad` while the last try is wrong). `upTo`: how many rows to show.
 */
export function EasySteps({ steps, vals, upTo, typed, onType, onEnter, bad = false, lang, inputLabel, compact = false }) {
  const size = compact ? 'w-24 h-11 text-xl' : 'w-28 sm:w-36 h-12 sm:h-14 text-2xl sm:text-4xl';
  return (
    <div className={`flex flex-col ${compact ? 'gap-1.5' : 'gap-2'}`}>
      {steps.slice(0, upTo).map((s, i) => {
        const done = vals[i];
        // The box being typed sits in a tinted row; compact (the deck) drops the rows' borders for height.
        const row = compact
          ? `px-2 py-0.5 ${done ? '' : 'bg-orange-50 dark:bg-orange-950/30'}`
          : `px-3 py-1.5 border-2 ${done ? 'border-slate-100 dark:border-slate-800' : 'border-orange-200 bg-orange-50/50 dark:border-orange-900/70 dark:bg-orange-950/20'}`;
        return (
          <div key={i} className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl ${row}`}>
            <span className={`px-2 py-0.5 rounded-lg font-bold leading-snug bg-orange-100 text-[#a04a0e] dark:bg-orange-900/40 dark:text-orange-200 ${compact ? 'text-xs' : 'text-sm'}`}>
              {cap(tr(lang, s.note.en, null, s.note.fr))}
            </span>
            <span className={`ml-auto flex items-center gap-2 text-slate-900 dark:text-slate-100 ${compact ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
              <SafeInlineMath math={`${s.latex} =`} />
              {done
                ? <span className={`${BOX} ${size} inline-grid place-items-center ${done.mark === 'good' ? BOX_GOOD : BOX_SHOWN}`}>{done.text}</span>
                : (
                  <input autoFocus value={typed} onChange={(e) => onType(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); onEnter(); } }}
                    inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={inputLabel} placeholder="?"
                    className={`${BOX} ${size} px-2 focus:outline-none ${bad ? BOX_BAD : BOX_OPEN}`} />
                )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ the deck activity */

export function MakeEasyActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const say = (m) => (m ? tr(lang, m.en, null, m.fr) : '');
  const model = useMemo(() => easyModel({
    id: activity.id, a: activity.a, b: activity.b, kind: activity.kind, context: activity.context, cue: activity.cue,
  }), [activity]);
  const stages = model.stages.filter((s) => s !== 'size');
  const [stage, setStage] = useState(stages[0]);
  const [picks, setPicks] = useState({});
  const [route, setRoute] = useState(null);
  const [vals, setVals] = useState([]);       // { text, mark } per finished step
  const [typed, setTyped] = useState('');
  const [wrongs, setWrongs] = useState(0);
  const [filled, setFilled] = useState(false);
  const [shownStages, setShownStages] = useState([]); // the stages filled in (amber in the steps)
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;

  const used = route || model.valid.find((r) => r.id === result?.route) || model.valid[0];
  const steps = used.steps;

  const advance = (next, message) => { setStage(next); setPicks({}); setWrongs(0); setMsg(message); };
  const finish = (allVals, wasFilled) => onResult({ done: true, correct: !wasFilled, route: used.id, vals: allVals.map((v) => v.text) });

  const options = stage === 'meaning' ? model.meaning : model.choices;
  const choose = (id) => {
    if (checked || picks[id]) return;
    const d = stage === 'meaning' ? diagnoseMeaning(model, id) : diagnoseRoute(model, id);
    const next = stage === 'meaning' ? 'route' : 'steps';
    if (d.ok) {
      if (stage === 'route') setRoute(model.choices.find((c) => c.id === id));
      advance(next, { tone: 'ok', en: d.en, fr: d.fr });
      return;
    }
    const left = options.filter((o) => !picks[o.id] && o.id !== id);
    if (wrongs + 1 >= 2 || left.length <= 1) {
      const right = stage === 'meaning' ? 'times' : model.choices.find((c) => c.valid).id;
      if (stage === 'route') setRoute(model.choices.find((c) => c.id === right));
      setFilled(true);
      setShownStages((s) => [...s, stage]);
      // Why that one is wrong already names the right one: say it once, then that it is filled in.
      advance(next, { tone: 'shown', en: `${d.en} ${T.en.filled}`, fr: `${d.fr} ${T.fr.filled}` });
      return;
    }
    setPicks({ ...picks, [id]: 'bad' });
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: `${T.en.tryAgain} ${d.en}`, fr: `${T.fr.tryAgain} ${d.fr}` });
  };

  const current = steps[vals.length];
  const checkStep = () => {
    if (checked || !current) return;
    const d = diagnoseStep(current, typed);
    if (d.soft) { setMsg({ tone: 'nudge', en: d.en, fr: d.fr }); return; }
    let mark = 'good';
    let wasFilled = filled;
    if (!d.ok) {
      if (wrongs + 1 < 2) { setWrongs(wrongs + 1); setMsg({ tone: 'bad', en: `${T.en.tryAgain} ${d.en}`, fr: `${T.fr.tryAgain} ${d.fr}` }); return; }
      mark = 'shown';
      wasFilled = true;
      setFilled(true);
    }
    const all = [...vals, { text: txt(current.value), mark }];
    setVals(all); setTyped(''); setWrongs(0);
    setMsg(mark === 'shown' ? { tone: 'shown', en: `${d.en} ${T.en.filled}`, fr: `${d.fr} ${T.fr.filled}` } : null);
    if (all.length >= steps.length) finish(all, wasFilled);
  };

  const shownVals = checked ? steps.map((s, i) => ({ text: txt(s.value), mark: result.correct ? 'good' : (vals[i]?.mark || 'shown') })) : vals;
  const at = stages.indexOf(stage);
  const pills = stepsOf(stages, at, t.stages).map((p) => (p.state === 'done' && shownStages.includes(p.key) ? { ...p, state: 'shown' } : p));
  // No sub line here: the deck's own prompt says what to do, and the side panel is short.
  const title = stage === 'meaning' ? t.meaning : stage === 'route' ? t.route : t.steps;
  // The last box filled in after two tries: the slip, kept for the verdict.
  const slip = checked && !result.correct && msg?.tone === 'shown' ? say(msg) : '';
  // The sum the easy way is for — once the words have given it — and then the easy way itself, on one line.
  const calc = model.kind === 'of' ? `\\text{${model.words.en} } ${model.A} = ${model.calc.latex}` : model.calc.latex;
  const sumLine = (math) => (
    <div className="text-center text-xl text-slate-800 dark:text-slate-100 overflow-x-auto overflow-y-hidden"><SafeInlineMath math={math} /></div>
  );
  const workLine = sumLine(`${calc} = ${used.latex}`);

  return (
    <div className="flex flex-col gap-2">
      {activity.context && <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-snug">{parseText(tr(lang, activity.context, null, activity.contextFr))}</p>}

      {!checked && (
        <StepPanel ink={INK} lang={lang} plain compact steps={pills} n={at + 1} title={title} msg={msg}
          onCheck={stage === 'steps' ? checkStep : null} checkDisabled={!typed.trim()}>
          {stage === 'meaning' && <EasyChoices compact options={options} picks={picks} onPick={choose} />}
          {stage === 'route' && (
            <div className="flex flex-col gap-1.5">
              {sumLine(calc)}
              <EasyChoices compact options={options} picks={picks} onPick={choose} />
            </div>
          )}
          {stage === 'steps' && (
            <div className="flex flex-col gap-1.5">
              {workLine}
              <EasySteps compact steps={steps} vals={vals} upTo={vals.length + 1} lang={lang} inputLabel={t.answer}
                typed={typed} bad={msg?.tone === 'bad'} onEnter={checkStep}
                onType={(v) => { setTyped(v); if (msg?.tone === 'bad') setMsg(null); }} />
            </div>
          )}
        </StepPanel>
      )}

      {checked && (
        <>
          {workLine}
          <EasySteps compact steps={steps} vals={shownVals} upTo={steps.length} lang={lang} inputLabel={t.answer} />
          <div className={`rounded-xl border-2 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
            <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
              {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
              {result.correct ? t.correct : t.notQuite}
            </div>
            {slip && <p className="font-bold leading-relaxed text-sm lg:text-base text-[#a32d23] mb-1.5">{slip}</p>}
            <div className={`font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
              <div className="mb-1 text-base overflow-x-auto overflow-y-hidden"><span className="text-[10px] uppercase tracking-widest mr-2">{t.answer}</span><SafeInlineMath math={chainLatex(model, used)} /></div>
              {parseText(tr(lang, activity.explain, null, activity.explainFr))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
