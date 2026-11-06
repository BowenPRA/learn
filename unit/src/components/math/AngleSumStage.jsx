import { useState } from 'react';
import { tr } from '../../utils/lang';
import { DECIDE_FACTS, reasonLine } from '../../utils/angleSum';
import { ST } from './angleSumText';
import { bookParts, bookWords, liveLines, knownPart, lettersParts } from './angleSumLines';
import { FactGrid, StepHeader, Stepper, StepTitle, Eq, AnswerBox, CheckButton, Feedback, Notebook } from './AngleKit.jsx';

/**
 * The stage panel of Find It, Say Why, shared by the task (figure taps for
 * "Add") and the deck activity (`chips`: the angles as buttons in the panel,
 * so it is answerable without the slide's picture). `run` is useAngleSteps().
 * Built from the AngleKit pieces, so it reads like Find Every Angle: fact
 * cards, numbered steps, working in the picture's colours.
 */

const say = (lang, m) => (m ? tr(lang, m.en, null, m.fr || m.en) : '');
const ok = 'border-slate-200 bg-white text-slate-800 hover:border-orange-400 hover:bg-orange-50/60 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:hover:border-orange-500';
const struckCls = 'border-rose-200 bg-rose-50 text-rose-400 line-through decoration-2 dark:bg-rose-950/30 dark:border-rose-900';
const pickedCls = 'border-orange-400 bg-orange-50 text-[#8a3a07] dark:bg-orange-950/40 dark:border-orange-500 dark:text-orange-200';

/** A wrong answer, a hint, a step filled in. ("Yes" messages are not repeated: the working shows them.) */
export function AngleMessage({ msg, lang }) {
  if (!msg || msg.tone === 'ok' || !say(lang, msg)) return null;
  return <Feedback tone={msg.tone === 'shown' ? 'shown' : msg.tone === 'info' ? 'info' : 'bad'}>{say(lang, msg)}</Feedback>;
}

const stateOf = (run, s) => {
  const d = run.done[s];
  if (d) return d.mark === 'shown' ? 'shown' : 'done';
  return s === run.stage && !run.finished ? 'now' : 'todo';
};
/** The steps of the angle in hand, as numbered pills. */
export function StageChips({ run, lang }) {
  const t = ST[lang] || ST.en;
  return <Stepper steps={run.stages.map((s) => ({ key: s, label: t.stages[s], state: stateOf(run, s) }))} />;
}

/** "Find b", with the steps of that angle. */
export function SumHeader({ run, lang }) {
  const t = ST[lang] || ST.en;
  if (run.finished) return null;
  const straight = run.step.fact === 'straight';
  // Choosing which letter comes first: the header must not name it.
  const choosing = run.stage === 'first';
  const steps = run.stages.map((s) => ({ key: s, label: t.stages[s], state: stateOf(run, s) }));
  return <StepHeader letter={straight || choosing ? null : run.step.letters.join(' = ')} title={straight ? t.straight : choosing ? t.findAll(run.step.first) : null} lang={lang} steps={steps} />;
}

/** The working so far: the finished steps as the book wants them, then the lines of the step in hand. */
export function Working({ run, lang, big = false, bare = false, title }) {
  const t = ST[lang] || ST.en;
  const lines = run.finishedSteps.map(({ step }, i) => ({
    key: `f${i}`, kind: step.fact === 'straight' ? null : step.fact === 'opp' ? 'para' : step.fact, parts: bookParts(step), ...bookWords(step, reasonLine),
    fresh: !big && i === run.finishedSteps.length - 1 && !Object.keys(run.done).length,
  }));
  if (!run.finished) {
    const live = liveLines(run.step, run.done);
    live.forEach((l, i) => lines.push({ ...l, key: `l${run.si}${l.key}`, fresh: i === live.length - 1 }));
  }
  return <Notebook lines={lines} lang={lang} bare={bare} big={big} title={title || t.working} />;
}

/** One reason as a button: English (the book's language), the French under it in French. */
function ReasonButton({ r, lang, state, onClick, prefix }) {
  const cls = state === 'struck' ? struckCls : state === 'picked' ? pickedCls : ok;
  return (
    <button type="button" disabled={state === 'struck'} onClick={onClick}
      className={`w-full min-h-[2.75rem] px-3 py-2 rounded-xl border-2 border-b-[4px] text-left font-bold text-sm sm:text-[15px] leading-snug transition-all active:translate-y-[2px] active:border-b-2 disabled:cursor-default ${cls}`}>
      {prefix && <span className="text-slate-400 font-black mr-1">{prefix}</span>}{r.en}
      {lang === 'fr' && <span className="block text-xs font-semibold opacity-70 mt-0.5">({r.fr})</span>}
    </button>
  );
}

/** The body of one stage. Keyed by the caller per step + stage, so its typing resets. */
function StageBody({ run, model, lang, chips, compact }) {
  const t = ST[lang] || ST.en;
  const { step, stage, act, struck } = run;
  const [typed, setTyped] = useState('');
  const [reason, setReason] = useState(null);
  const L = step.letters.join(' = ');
  const n = run.stages.length > 1 ? run.stages.indexOf(stage) + 1 : null;
  const cur = lettersParts(step, 'cur');
  const op = (v) => ({ t: 'op', v });
  const box = (onEnter, label) => ({ node: <AnswerBox value={typed} onChange={setTyped} onEnter={onEnter} label={label} autoFocus /> });
  const row = (parts, onCheck, disabled) => (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <Eq parts={parts} className="text-xl sm:text-2xl" />
      <CheckButton onClick={onCheck} disabled={disabled} lang={lang} />
    </div>
  );

  if (stage === 'first') {
    return (
      <>
        <StepTitle lang={lang} n={n}>{t.first}</StepTitle>
        <p className="-mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{t.firstSub}</p>
        <div className="flex flex-wrap gap-2">
          {step.first.map((l) => (
            <button key={l} type="button" disabled={!!struck[l]} onClick={() => act.chooseFirst(l)}
              className={`min-w-[4rem] px-4 py-2.5 rounded-2xl border-2 border-b-[4px] text-2xl font-black italic transition-all active:translate-y-[2px] active:border-b-2 ${struck[l] ? struckCls : 'border-orange-300 bg-orange-50 text-[#b4460a] hover:bg-orange-100 dark:bg-orange-950/30 dark:border-orange-800 dark:text-orange-300'}`}>{l}</button>
          ))}
        </div>
      </>
    );
  }
  if (stage === 'decide') {
    return (
      <>
        <StepTitle lang={lang} n={n}>{t.decide(L)}</StepTitle>
        <FactGrid kinds={DECIDE_FACTS} lang={lang} struck={Object.keys(struck)} onPick={act.chooseFact} compact={compact} />
      </>
    );
  }
  if (stage === 'why') {
    if (step.fact === 'straight') {
      return (
        <>
          <StepTitle lang={lang} n={n}>{t.straightWhy}</StepTitle>
          <div className="grid gap-2">{step.reasons.map((r) => <ReasonButton key={r.id} r={r} lang={lang} state={struck[r.id] ? 'struck' : 'idle'} onClick={() => act.chooseWhy(r.id)} />)}</div>
        </>
      );
    }
    return (
      <>
        <StepTitle lang={lang} n={n}>{t.why}</StepTitle>
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Eq parts={[...lettersParts(step, 'L'), op('='), { t: 'f', v: step.answer }]} className="text-xl sm:text-2xl" />
          <span className="text-lg font-black text-slate-500 dark:text-slate-400">{ST.en.because} …</span>
        </div>
        <div className="grid gap-2">{step.reasons.map((r) => <ReasonButton key={r.id} r={r} lang={lang} state={struck[r.id] ? 'struck' : 'idle'} onClick={() => act.chooseWhy(r.id)} prefix="…" />)}</div>
      </>
    );
  }
  if (stage === 'add') {
    const known = (k) => step.knowns.find((x) => x.key === k) || step.decoys.find((x) => x.key === k) || null;
    const picked = run.picked.map((k) => (known(k) ? knownPart(known(k)) : { t: 'L', v: model.els[k]?.letter }));
    const pickable = chips ? [...step.group.map((k) => model.els[k]), ...step.decoys].filter((e, i, a) => a.findIndex((x) => x.key === e.key) === i) : [];
    const sum = picked.length ? picked.flatMap((p, i) => (i ? [op('+'), p] : [p]))
      : [{ node: <span className="px-2 py-0.5 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-sm font-bold italic text-slate-400">{t.tapFirst}</span> }];
    return (
      <>
        <StepTitle lang={lang} n={n}>{t.add}</StepTitle>
        <p className="-mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{chips ? t.addChips : t.addFig}</p>
        {chips && (
          <div className="flex flex-wrap gap-2">
            {pickable.map((e) => {
              const k = known(e.key);
              const on = run.picked.includes(e.key);
              return (
                <button key={e.key} type="button" onClick={() => act.togglePick(e.key)}
                  className={`min-w-[3.25rem] min-h-[2.75rem] px-3 rounded-xl border-2 border-b-[4px] font-black text-lg ${on ? pickedCls : ok} ${k ? '' : 'italic'}`}>
                  {k ? (e.right ? `90° (${t.small})` : `${k.value}°`) : e.letter}
                </button>
              );
            })}
          </div>
        )}
        {row([...sum, op('='), box(() => act.checkAdd(typed), t.add)], () => act.checkAdd(typed), !typed.trim() || !run.picked.length)}
      </>
    );
  }
  if (stage === 'subtract') {
    const sub = step.knowns.length === 1 ? knownPart(step.knowns[0]) : { t: 'n', v: step.sum };
    const lhs = step.share > 1 ? [] : [...cur, op('=')];
    return (
      <>
        <StepTitle lang={lang} n={n}>{t.subtract(step.sum, step.total)}</StepTitle>
        {row([...lhs, { t: 'n', v: step.total }, op('−'), sub, op('='), box(() => act.checkTyped(typed), 'subtract')], () => act.checkTyped(typed), !typed.trim())}
      </>
    );
  }
  if (stage === 'share') {
    return (
      <>
        <StepTitle lang={lang} n={n}>{t.share(step.rest, step.share)}</StepTitle>
        {row([...cur, op('='), { t: 'n', v: step.rest }, op('÷'), { t: 'txt', v: String(step.share) }, op('='), box(() => act.checkTyped(typed), 'share')], () => act.checkTyped(typed), !typed.trim())}
      </>
    );
  }
  if (stage === 'calc') {
    return (
      <>
        <StepTitle lang={lang} n={n}>{t.calc(L, step.answer)}</StepTitle>
        {row([...cur, op('='), box(() => act.checkTyped(typed), L)], () => act.checkTyped(typed), !typed.trim())}
      </>
    );
  }
  if (stage === 'total') {
    const ks = step.knowns.map(knownPart).flatMap((p, i) => (i ? [op('+'), p] : [p]));
    return (
      <>
        <StepTitle lang={lang} n={n}>{t.total}</StepTitle>
        {row([...ks, op('='), box(() => act.checkTyped(typed), 'total')], () => act.checkTyped(typed), !typed.trim())}
      </>
    );
  }
  // quick: the angle and its reason together
  return (
    <>
      <StepTitle lang={lang} n={n}>{t.quick(L)}</StepTitle>
      {!chips && <p className="-mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{t.quickSub}</p>}
      <Eq parts={[...cur, op('='), box(() => act.checkQuick(typed, reason), L)]} className="text-xl sm:text-2xl" />
      <p className="text-lg font-black text-slate-500 dark:text-slate-400 -mb-1">{ST.en.because} …</p>
      <div className="grid gap-2">{step.reasons.map((r) => <ReasonButton key={r.id} r={r} lang={lang} state={reason === r.id ? 'picked' : 'idle'} onClick={() => setReason(r.id)} prefix="…" />)}</div>
      <div className="flex justify-end"><CheckButton onClick={() => act.checkQuick(typed, reason)} disabled={!typed.trim() || !reason} lang={lang} /></div>
    </>
  );
}

/** The stage in hand and its message. `compact`: one column of fact cards (a narrow panel). */
export default function AngleSumStage({ run, model, lang, chips = false, compact = false }) {
  if (run.finished) return null;
  return (
    <div className="flex flex-col gap-3">
      <StageBody key={`${run.si}:${run.stage}:${run.mode}`} run={run} model={model} lang={lang} chips={chips} compact={compact} />
      <AngleMessage msg={run.msg} lang={lang} />
    </div>
  );
}
