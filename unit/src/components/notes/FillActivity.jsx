import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Lightbulb } from 'lucide-react';
import { fillModel, markFill, fillHint, signChoices } from '../../utils/fracFill';
import { keepWhere } from '../../utils/activity';
import { tr } from '../../utils/lang';

/**
 * `fill` — fraction sentences with boxes to type into (Maths 7.1). Rendered by
 * ActivityBlock; read, marked and proved by utils/fracFill.js, where the schema is.
 *
 * Every box is live at once; one Check marks them all. Right boxes turn green and
 * lock; on the first mistake the wrong ones turn red and the first wrong line gets a
 * hint, and the student has one more try. Then the answers show. Contract as for every
 * activity: `result` is the stored `{ done, correct, … }`; `onResult` is called once,
 * with done: true; `retry` (Fix my mistakes) keeps the boxes that were right.
 * English and French.
 */

const T = {
  en: {
    check: 'Check', fillAll: 'Fill in every box first.', tryAgain: 'One more try',
    correct: 'Correct', notQuite: 'Not quite', box: 'Answer box',
  },
  fr: {
    check: 'Vérifier', fillAll: 'Remplis d’abord toutes les cases.', tryAgain: 'Encore un essai',
    correct: 'Correct !', notQuite: 'Pas tout à fait', box: 'Case réponse',
  },
};
const said = (lang, m) => (m ? tr(lang, m.en, null, m.fr) : '');
const letter = (i) => String.fromCharCode(97 + i);

const primary = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]';
// what the student is finding is orange, as in the step sets (stepPractice/inputs.jsx)
const TONE = {
  live: 'border-[#e8590c]/60 bg-[#fff8f2] dark:bg-slate-950 text-[#b4460a] dark:text-orange-300 focus:border-[#e8590c] focus:bg-white dark:focus:bg-slate-900',
  good: 'border-[#58a700] bg-[#d7ffb8] text-[#3e7500]',
  bad: 'border-[#ea2b2b] bg-[#ffdfe0] text-[#c9362a]',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200',
};
const INK = 'text-slate-800 dark:text-slate-100';

// `free`: an equation's answer, which may be negative or a fraction (-3, 5/2).
function NumBox({ id, uid, value, tone, locked, onEdit, onEnter, label, free }) {
  return (
    <input id={`${uid}-${id}`} value={value ?? ''} disabled={locked}
      onChange={(e) => onEdit(id, free ? e.target.value.replace(/[^\d\-−/.]/g, '').slice(0, 7) : e.target.value.replace(/[^\d]/g, '').slice(0, 4))}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); onEnter(id); } }}
      inputMode={free ? 'text' : 'numeric'} autoComplete="off" spellCheck={false} placeholder="?" aria-label={label}
      className={`${free ? 'w-20' : 'w-12 sm:w-[3.25rem]'} h-10 px-1 rounded-xl border-2 border-b-[4px] text-center font-black text-xl placeholder:text-orange-300 dark:placeholder:text-orange-400/60 focus:outline-none disabled:opacity-100 ${TONE[tone]}`} />
  );
}

function SignBox({ choices, value, tone, locked, onPick, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-xl border-2 border-b-[4px] overflow-hidden border-[#e8590c]/60 mx-1">
      {choices.map((s) => {
        const on = value === s;
        const cls = on ? (tone === 'live' ? 'bg-[#e8590c] text-white' : TONE[tone]) : 'bg-[#fff8f2] dark:bg-slate-950 text-[#b4460a]/60 dark:text-orange-300/60';
        return (
          <button key={s} type="button" role="radio" aria-checked={on} disabled={locked} onClick={() => onPick(s)}
            className={`w-10 h-10 font-black text-2xl leading-none ${cls} ${locked ? 'cursor-default' : 'hover:bg-orange-100 dark:hover:bg-slate-800'}`}>{s}</button>
        );
      })}
    </div>
  );
}

/** A number in a line: given, or a box. */
function Part({ part, big, box }) {
  if (part.box) return box(part);
  return <span className={`font-black leading-none ${INK} ${big ? 'text-4xl' : 'text-2xl'}`}>{part.value}</span>;
}

function Line({ line, label, box, sign, parseText }) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      {label && <span className="shrink-0 w-6 h-6 rounded-full bg-[#4a8b23] text-white text-xs font-black flex items-center justify-center">{label}</span>}
      {line.solve && (
        // An equation to solve: the equation, then "x = [ ]".
        <div className={`flex items-center gap-2 flex-wrap font-black text-xl sm:text-2xl ${INK}`}>
          <span>{parseText(`$${line.tex}$`)}</span>
          <span className="px-1 text-slate-400">→</span>
          <span>{parseText(`$${line.v} =$`)}</span>
          {box(line.boxes[0])}
        </div>
      )}
      <div className="flex items-center gap-1.5 flex-wrap">
        {line.terms.map((t, k) => {
          if (t.kind === 'sign') return t.box ? <span key={k}>{sign(t)}</span> : <span key={k} className={`px-1 font-black text-2xl ${INK}`}>{t.sign}</span>;
          return (
            <span key={k} className="inline-flex items-center gap-1">
              {t.whole && <Part part={t.whole} big box={box} />}
              {t.top && (
                <span className="inline-flex flex-col items-center gap-0.5">
                  <Part part={t.top} box={box} />
                  <span className="block w-full min-w-[1.75rem] h-[3px] rounded-full bg-slate-800 dark:bg-slate-100" />
                  <Part part={t.bottom} box={box} />
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function FillActivity({ activity, lang, result, onResult, parseText, retry }) {
  const t = T[lang] || T.en;
  const model = useMemo(() => fillModel(activity), [activity]);
  const uid = `fill-${activity.id}`;
  const keepGood = (map) => keepWhere(map, (id) => retry?.marks?.[id] === 'good');
  const [entries, setEntries] = useState(() => result?.entries || keepGood(retry?.entries));
  const [marks, setMarks] = useState(() => result?.marks || keepWhere(retry?.marks, (_, v) => v === 'good'));
  const [tries, setTries] = useState(result?.tries || 0);
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;
  const order = model.boxes.filter((b) => b.kind !== 'sign').map((b) => b.id);

  const edit = (id, text) => {
    setEntries((e) => ({ ...e, [id]: text }));
    if (marks[id] === 'bad') setMarks((m) => ({ ...m, [id]: undefined }));
    if (msg?.tone === 'nudge') setMsg(null);
  };
  const check = () => {
    if (checked) return;
    const { marks: mk, blank, firstBad } = markFill(model, entries);
    if (blank) { setMsg({ tone: 'nudge', en: T.en.fillAll, fr: T.fr.fillAll }); return; }
    const n = tries + 1;
    if (firstBad == null) { onResult({ done: true, correct: true, entries, marks: mk, tries: n }); return; }
    const hint = fillHint(model.lines[firstBad]);
    const why = model.lines.length > 1 ? { en: `${letter(firstBad)}: ${hint.en}`, fr: `${letter(firstBad)} : ${hint.fr}` } : hint;
    setTries(n);
    setMarks(mk);
    if (n >= 2) { onResult({ done: true, correct: false, entries, marks: mk, tries: n, why }); return; }
    setMsg({ tone: 'bad', ...why });
    const firstWrong = model.lines[firstBad].boxes.find((b) => mk[b.id] === 'bad');
    if (firstWrong && firstWrong.kind !== 'sign') document.getElementById(`${uid}-${firstWrong.id}`)?.focus();
  };
  // Enter moves to the next open number box; on the last one it checks.
  const onEnter = (id) => {
    const next = order.slice(order.indexOf(id) + 1).find((k) => marks[k] !== 'good');
    if (next) document.getElementById(`${uid}-${next}`)?.focus();
    else check();
  };

  const boxAnswer = (id) => model.boxes.find((b) => b.id === id)?.answer;
  const toneOf = (id) => {
    if (checked) return result.correct || result.marks?.[id] === 'good' ? 'good' : 'shown';
    return marks[id] === 'good' ? 'good' : marks[id] === 'bad' ? 'bad' : 'live';
  };
  const valueOf = (id) => (checked ? boxAnswer(id) : entries[id]);
  const box = (p) => (
    <NumBox key={p.id} id={p.id} uid={uid} value={valueOf(p.id)} tone={toneOf(p.id)} locked={checked || marks[p.id] === 'good'}
      onEdit={edit} onEnter={onEnter} label={t.box} free={p.kind === 'sol'} />
  );
  const sign = (s) => (
    <SignBox choices={signChoices(s.sign)} value={valueOf(s.id)} tone={toneOf(s.id)} locked={checked || marks[s.id] === 'good'}
      onPick={(v) => edit(s.id, v)} label={t.box} />
  );

  const many = model.lines.length > 1;
  const cols = many && model.split < model.lines.length
    ? [model.lines.slice(0, model.split), model.lines.slice(model.split)]
    : [model.lines];
  const at = (line) => model.lines.indexOf(line);

  return (
    <div>
      <div className={`grid gap-x-6 ${cols.length > 1 ? 'sm:grid-cols-2' : ''}`}>
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col">
            {col.map((line) => <Line key={at(line)} line={line} label={many ? letter(at(line)) : null} box={box} sign={sign} parseText={parseText} />)}
          </div>
        ))}
      </div>

      {!checked && msg && (
        <div className={`mt-2 flex items-start gap-2 p-2.5 rounded-xl border-2 font-bold text-sm leading-relaxed ${msg.tone === 'nudge'
          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
          : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300'}`}>
          {msg.tone === 'nudge' ? <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} /> : <XCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} />}
          <span>{msg.tone === 'bad' && <span className="mr-1 uppercase text-[10px] tracking-widest">{t.tryAgain} ·</span>}{said(lang, msg)}</span>
        </div>
      )}
      {!checked && <div className="mt-3 flex justify-end"><button type="button" onClick={check} className={primary}>{t.check}</button></div>}

      {checked && (
        <div className={`rounded-xl border-2 mt-3 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
          <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
            {result.correct ? t.correct : t.notQuite}
          </div>
          {/* The boxes now show the answers (amber where they were wrong), so the
              explanation is enough: the hint already had its turn. */}
          <div className={`font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {parseText(tr(lang, activity.explain, null, activity.explainFr))}
          </div>
        </div>
      )}
    </div>
  );
}
