import { useEffect, useRef, useState } from 'react';
import StepText from './StepText.jsx';
import StepInput from './inputs.jsx';
import { Stepper, PrevNote, Feedback, HelpRow, CheckButton, Notebook, DoneCard } from './parts.jsx';
import { initRun, submit, showMe, openHint, pillsOf, resultOf } from './run';
import { txt, lineOf } from './model';
import { msgText, subOf } from './say';
import { words, LEVEL_INK } from './words';

const INSTANT = (input) => input.type === 'choice' || (input.type === 'tap' && (input.answer || []).length === 1);

/**
 * One item, from its first step to the done card. Keyed by the item id.
 * onDone(result) fires once, when the last step is finished; onNext moves on.
 * `left` is the question card, laid out beside the steps from lg up.
 */
export default function ItemRunner({ item, lang, left, big = false, roomy = false, signed = false, isLast, onDone, onNext }) {
  const t = words(lang);
  const ink = LEVEL_INK[item.level];
  const [s, setS] = useState(() => initRun(item));
  const [draft, setDraft] = useState(null);
  const [struck, setStruck] = useState([]);
  const panel = useRef(null);
  const moved = useRef(false);
  // On a phone the step sits under the question: after an answer, bring it back into view.
  useEffect(() => {
    if (!moved.current) { moved.current = true; return; }
    if (typeof window !== 'undefined' && window.innerWidth < 1024) panel.current?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
  }, [s.at, s.msg]);

  const apply = (next) => {
    if (next.at !== s.at) { setDraft(null); setStruck([]); }
    setS(next);
    if (next.at == null && s.at != null) onDone?.(resultOf(next));
  };
  const answer = (resp) => {
    const next = submit(s, item, resp);
    if (item.steps[s.at].input.type === 'choice' && next.at === s.at && next.msg?.tone === 'bad') setStruck((x) => [...x, resp]);
    apply(next);
  };

  const finished = s.at == null;
  const lines = [...s.lines].sort((a, b) => a.step - b.step)
    .map((l) => ({ key: `${l.step}`, text: lineOf(item.steps[l.step], lang), tag: l.tag, fresh: l.step === s.fresh && !finished }));
  const said = msgText(s.msg, item, lang);
  const prev = s.msg && (s.msg.tone === 'ok' || s.msg.tone === 'shown') ? { tone: s.msg.tone, text: said?.text } : null;
  const now = s.msg && (s.msg.tone === 'bad' || s.msg.tone === 'info') ? { tone: s.msg.tone, ...said } : null;

  const step = finished ? null : item.steps[s.at];
  const n = finished ? null : s.visible.indexOf(s.at) + 1;
  const hint = step ? txt(step, 'hint', lang) : null;
  const hintShown = now?.extra === hint;

  return (
    <div className={`flex-1 w-full mx-auto p-3 sm:p-5 pb-10 lg:grid lg:gap-5 lg:items-start ${roomy ? 'max-w-7xl lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]' : 'max-w-6xl lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]'}`}>
      <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">{left(finished)}</div>
      <div ref={panel} className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0 scroll-mt-3">
        {!finished && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4 min-w-0 flex flex-col gap-3">
            {s.visible.length > 1 && <Stepper steps={pillsOf(s, item, t.answer, lang)} ink={ink} big={big} />}
            <PrevNote note={prev} big={big} />
            <div>
              <p className={`font-black text-slate-700 dark:text-slate-200 flex items-baseline gap-2 ${big ? 'text-xl' : 'text-[15px]'}`}>
                {s.visible.length > 1 && <span className="shrink-0 text-[11px] uppercase tracking-widest dark:brightness-[1.9]" style={{ color: ink }}>{t.step} {n}</span>}
                <StepText text={txt(step, 'title', lang)} />
              </p>
              {!big && <p className="mt-0.5 text-sm font-semibold text-slate-500 dark:text-slate-400 leading-snug"><StepText text={subOf(step, lang)} /></p>}
            </div>
            <StepInput key={`${item.id}:${s.at}`} input={step.input} lang={lang} seed={`${item.id}:${s.at}`} value={draft} onChange={setDraft}
              onEnter={() => answer(draft)} onPick={answer} struck={struck} big={big} signed={signed} />
            {now && <Feedback tone={now.tone} text={now.text} extra={now.extra} big={big} />}
            {s.hintOpen && !hintShown && <Feedback tone="hint" text={hint} big={big} />}
            <div className="flex flex-wrap items-center justify-end gap-2">
              <HelpRow lang={lang} onHint={s.hintOpen || hintShown ? null : () => setS(openHint(s))} onShowMe={() => apply(showMe(s, item))} />
              {!INSTANT(step.input) && <CheckButton onClick={() => answer(draft)} disabled={draft == null || draft === '' || (Array.isArray(draft) && !draft.length)} lang={lang} big={big} />}
            </div>
          </div>
        )}
        {!finished && <Notebook lines={lines} lang={lang} big={big} />}
        {finished && (
          <DoneCard lang={lang} item={item} result={resultOf(s)} lines={lines} big={big} isLast={isLast} onNext={onNext}
            shown={s.msg?.tone === 'shown' ? said?.text : null} />
        )}
      </div>
    </div>
  );
}
