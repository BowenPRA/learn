import { useMemo, useRef, useState } from 'react';
import {
  ArrowRight, ArrowLeft, Check, CheckCircle2, ClipboardCopy, Eye, Lightbulb,
  PenLine, SkipForward, Sparkles, X,
} from 'lucide-react';
import { sfx } from '../../src/arcade/sfx.js';
import {
  assembleEssay, buildRevisionPlan, checkSentence, countWords, essayDiff,
  summariseKinds, wordDiff,
} from './revision.js';
import { NO_ADDONS } from './noAddOns.js';

/**
 * Part 2 of the timed writing task: the student makes every correction themselves.
 *
 * Part 1 hands back a score and a list of errors, which is what the real test
 * does and is where most practice stops. It is also where the learning stops:
 * reading "watch your subject-verb agreement" changes nothing, and a corrected
 * essay written FOR the student changes less than nothing, because the sentence
 * that finally comes out right was never theirs.
 *
 * So this screen never shows a rewritten essay. It shows one sentence at a time,
 * with the exact words that are wrong, the exact words to use instead, and a box
 * the student retypes the sentence into. The corrected essay at the end is
 * assembled out of sentences they typed, and that is the thing they copy away.
 *
 * Three deliberate choices:
 *   - The rewrite box starts pre-filled with their own sentence. Retyping 30
 *     words to change two is busywork, and busywork is what gets skipped.
 *   - Paste is blocked in that box but the corrections are in plain sight. The
 *     friction is there to make them type the words, not to hide them.
 *   - A correction can be skipped after a few honest attempts, and a skipped one
 *     is filled in so the finished essay is still correct — it just does not
 *     count towards the marks. The artefact should be right; the credit should
 *     be earned.
 */

const STATUS = { TODO: 'todo', FIXED: 'fixed', SKIPPED: 'skipped' };

/* -------------------------------------------------------------------------- *
 * Small presentational pieces
 * -------------------------------------------------------------------------- */

/** A word-diff rendered inline: removals struck through, additions underlined. */
function DiffText({ parts, tone = 'both' }) {
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((p, i) => {
        if (p.type === 'same') return <span key={i}>{p.text}</span>;
        if (p.type === 'del') {
          if (tone === 'after') return null;
          return (
            <span key={i} className="line-through decoration-2 decoration-rose-400 text-rose-600 dark:text-rose-400">
              {p.text}
            </span>
          );
        }
        if (tone === 'before') return null;
        // A replacement sits directly against the word it replaces, which reads
        // as one run-on word ("vehiclevehicles"). A hair of space separates them.
        const afterDeletion = parts[i - 1]?.type === 'del';
        return (
          <span
            key={i}
            className={`font-black text-emerald-700 dark:text-emerald-300 underline decoration-2 decoration-emerald-400 underline-offset-2 ${
              afterDeletion ? 'ml-1' : ''
            }`}
          >
            {p.text}
          </span>
        );
      })}
    </span>
  );
}

/** Text with the flagged spans marked, using offsets relative to `text`. */
function Marked({ text, spans, className = '' }) {
  const pieces = [];
  let at = 0;

  [...spans].sort((a, b) => a.start - b.start).forEach((s, i) => {
    if (s.start > at) pieces.push(<span key={`t${i}`}>{text.slice(at, s.start)}</span>);
    pieces.push(
      <mark
        key={`m${i}`}
        className={`rounded px-0.5 ${
          s.done
            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
            : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 underline decoration-wavy decoration-rose-400 underline-offset-4'
        }`}
      >
        {text.slice(s.start, s.end)}
      </mark>
    );
    at = s.end;
  });
  if (at < text.length) pieces.push(<span key="tail">{text.slice(at)}</span>);

  return <span className={`whitespace-pre-wrap ${className}`}>{pieces}</span>;
}

/** One correction: what is wrong, what to write instead, why, and the rule. */
function IssueRow({ issue, n, done }) {
  const parts = useMemo(() => wordDiff(issue.quote, issue.correction), [issue.quote, issue.correction]);

  return (
    <li className="flex items-start gap-3">
      <span
        className={`flex-shrink-0 w-7 h-7 rounded-full grid place-items-center text-xs font-black tabular-nums mt-0.5 ${
          done
            ? 'bg-emerald-500 text-white'
            : 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 border-2 border-rose-300 dark:border-rose-800'
        }`}
      >
        {done ? <Check className="w-4 h-4" strokeWidth={3} /> : n}
      </span>

      <div className="flex-1 min-w-0">
        <span className="inline-block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
          {issue.kind}
        </span>

        <div className="flex flex-col sm:flex-row sm:items-stretch gap-2 mb-2">
          <div className="flex-1 rounded-xl border-2 border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 px-3 py-2">
            <span className="block text-[9px] font-black uppercase tracking-widest text-rose-400 dark:text-rose-500 mb-1">
              You wrote
            </span>
            <span className="text-[15px] font-bold text-slate-700 dark:text-slate-200 leading-snug">
              <DiffText parts={parts} tone="before" />
            </span>
          </div>

          <div className="hidden sm:grid place-items-center px-1 text-slate-300 dark:text-slate-600">
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </div>

          <div className="flex-1 rounded-xl border-2 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2">
            <span className="block text-[9px] font-black uppercase tracking-widest text-emerald-500 dark:text-emerald-500 mb-1">
              Write this
            </span>
            <span className="text-[15px] font-bold text-slate-700 dark:text-slate-200 leading-snug">
              <DiffText parts={parts} tone="after" />
            </span>
          </div>
        </div>

        {issue.why && (
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{issue.why}</p>
        )}
        {issue.rule && (
          <p className="mt-1.5 inline-flex items-center text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-lg">
            <Lightbulb className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} /> {issue.rule}
          </p>
        )}
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------------- *
 * The workshop
 * -------------------------------------------------------------------------- */

export default function RevisionWorkshop({
  originalText,
  revisions = [],
  onFinish,
  onBackToScore,
}) {
  const { cards } = useMemo(
    () => buildRevisionPlan(originalText, revisions),
    [originalText, revisions]
  );

  const [typed, setTyped] = useState(() =>
    Object.fromEntries(cards.map((c) => [c.id, c.original]))
  );
  const [status, setStatus] = useState(() =>
    Object.fromEntries(cards.map((c) => [c.id, STATUS.TODO]))
  );
  const [attempts, setAttempts] = useState({});
  const [revealed, setRevealed] = useState({});
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(null);

  // Once every card is resolved the screen turns into the deliverable: the
  // corrected essay, editable, and copyable for the first time in the task.
  const [step, setStep] = useState(cards.length ? 'fix' : 'final');
  const [view, setView] = useState('final');
  const [finalEdit, setFinalEdit] = useState(null);
  const [copied, setCopied] = useState(false);

  const boxRef = useRef(null);

  const card = cards[index];
  const fixedCount = cards.filter((c) => status[c.id] === STATUS.FIXED).length;
  const resolvedCount = cards.filter((c) => status[c.id] !== STATUS.TODO).length;
  const allResolved = resolvedCount === cards.length;

  const assembled = useMemo(
    () => assembleEssay(originalText, cards, typed),
    [originalText, cards, typed]
  );
  const finalText = finalEdit ?? assembled;

  const diffParts = useMemo(
    () => essayDiff(originalText, cards, typed),
    [originalText, cards, typed]
  );
  const kinds = useMemo(() => summariseKinds(cards), [cards]);

  /* ---- actions ---------------------------------------------------------- */

  const goTo = (i) => {
    setIndex(i);
    setResult(null);
  };

  const handleCheck = () => {
    const outcome = checkSentence(typed[card.id], card);
    setResult(outcome);

    if (outcome.ok) {
      setStatus((s) => ({ ...s, [card.id]: STATUS.FIXED }));
      sfx('correct');
      return;
    }
    setAttempts((a) => ({ ...a, [card.id]: (a[card.id] || 0) + 1 }));
    sfx('wrong');
  };

  const handleSkip = () => {
    // Fill the correction in so the finished essay is right, but do not count it.
    setTyped((t) => ({ ...t, [card.id]: card.target }));
    setStatus((s) => ({ ...s, [card.id]: STATUS.SKIPPED }));
    setResult(null);
    if (index + 1 < cards.length) goTo(index + 1); else setStep('final');
  };

  const handleNext = () => {
    if (index + 1 < cards.length) goTo(index + 1);
    else setStep('final');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalText);
    } catch {
      // Clipboard permission can be refused; the textarea is still selectable.
      const el = document.createElement('textarea');
      el.value = finalText;
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch { /* nothing more to try */ }
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const finish = () => onFinish({ revisedText: finalText, fixed: fixedCount, total: cards.length });

  const attemptCount = card ? attempts[card.id] || 0 : 0;
  const isFixed = card ? status[card.id] === STATUS.FIXED : false;

  /* ---- header ----------------------------------------------------------- */

  const header = (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Part 2 of 2 · Revision
        </span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        {onBackToScore && (
          <button
            onClick={onBackToScore}
            className="flex items-center text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} /> Score
          </button>
        )}
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white leading-tight">
        {cards.length === 0
          ? 'Nothing to correct'
          : step === 'final'
            ? 'Your corrected essay'
            : 'Fix every mistake, one sentence at a time'}
      </h2>
      <p className="mt-2 text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
        {cards.length === 0
          ? 'The marker found no mistakes in your English. Well done: keep the habit.'
          : step === 'final'
            ? 'Every sentence below is one you typed. Read it once more before you close this. It is saved in My Writing.'
            : 'You are shown exactly what is wrong and exactly what to write instead. Type the sentence out correctly — typing it is what makes it stick.'}
      </p>
    </div>
  );

  /* ---- progress rail ---------------------------------------------------- */

  const rail = cards.length > 0 && (
    <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-1">
      <div className="flex items-center gap-1.5">
        {cards.map((c, i) => {
          const s = status[c.id];
          const active = step === 'fix' && i === index;
          return (
            <button
              key={c.id}
              onClick={() => { setStep('fix'); goTo(i); }}
              title={`Sentence ${i + 1}`}
              className={`w-9 h-9 rounded-xl grid place-items-center text-xs font-black tabular-nums border-2 transition-all ${
                s === STATUS.FIXED
                  ? 'bg-emerald-500 border-emerald-600 text-white'
                  : s === STATUS.SKIPPED
                    ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'
              } ${active ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950' : ''}`}
            >
              {s === STATUS.FIXED ? <Check className="w-4 h-4" strokeWidth={3.5} /> : i + 1}
            </button>
          );
        })}
      </div>

      <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
        {fixedCount} of {cards.length} fixed
      </span>
    </div>
  );

  /* ---- step 1: the fix cards -------------------------------------------- */

  const fixStep = card && (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`bg-white dark:bg-slate-900 rounded-[1.5rem] border-2 shadow-sm overflow-hidden mb-6 transition-colors ${
        isFixed ? 'border-emerald-300 dark:border-emerald-800' : 'border-slate-200 dark:border-slate-800'
      }`}>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Sentence {index + 1} of {cards.length}
            <span className="ml-2 normal-case tracking-normal text-slate-400 dark:text-slate-500">
              · {card.issues.length} correction{card.issues.length === 1 ? '' : 's'}
            </span>
          </span>
          {isFixed && (
            <span className="flex items-center text-[11px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 mr-1.5" strokeWidth={3} /> Fixed
            </span>
          )}
        </div>

        <div className="px-6 sm:px-8 py-6">
          <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            In your essay
          </span>
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300 leading-[1.9] mb-7">
            <Marked
              text={card.original}
              spans={card.issues.map((i, n) => ({
                start: i.relStart,
                end: i.relEnd,
                done: isFixed || Boolean(result?.resolved?.[n]),
              }))}
            />
          </p>

          <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
            What to change
          </span>
          <ol className="space-y-5 mb-7">
            {card.issues.map((issue, n) => (
              <IssueRow
                key={n}
                issue={issue}
                n={n + 1}
                done={isFixed || Boolean(result?.resolved?.[n])}
              />
            ))}
          </ol>

          <div className="pt-6 border-t-2 border-dashed border-slate-200 dark:border-slate-800">
            <label
              htmlFor={`rewrite-${card.id}`}
              className="block text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3"
            >
              <PenLine className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" strokeWidth={3} />
              Now write the sentence correctly
            </label>

            <textarea
              id={`rewrite-${card.id}`}
              ref={boxRef}
              value={typed[card.id] ?? ''}
              onChange={(e) => {
                setTyped((t) => ({ ...t, [card.id]: e.target.value }));
                if (result && !result.ok) setResult(null);
              }}
              onPaste={(e) => e.preventDefault()}
              disabled={isFixed}
              {...NO_ADDONS}
              rows={3}
              className={`w-full px-4 py-3 rounded-2xl border-2 text-lg font-medium leading-relaxed resize-y focus:outline-none focus:ring-2 transition-colors ${
                isFixed
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : result && !result.ok
                    ? 'bg-white dark:bg-slate-950 border-rose-300 dark:border-rose-800 text-slate-800 dark:text-slate-100 focus:ring-rose-400'
                    : 'bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:ring-indigo-400'
              }`}
            />

            {result && !result.ok && (
              <p className="mt-3 flex items-start text-[15px] font-bold text-rose-600 dark:text-rose-400">
                <X className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                {result.hint}
              </p>
            )}
            {isFixed && (
              <p className="mt-3 flex items-center text-[15px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5 mr-2" strokeWidth={3} />
                That sentence is right now.
              </p>
            )}

            {revealed[card.id] && !isFixed && (
              <div className="mt-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-3">
                <span className="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1.5">
                  Type this
                </span>
                <p className="text-[15px] font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
                  {card.target}
                </p>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {!isFixed ? (
                <button
                  onClick={handleCheck}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                >
                  Check
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black tracking-widest uppercase border-b-[5px] border-emerald-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
                >
                  {index + 1 < cards.length ? 'Next sentence' : 'See my corrected essay'}
                  <ArrowRight className="w-5 h-5 ml-2" strokeWidth={3} />
                </button>
              )}

              {!isFixed && attemptCount >= 2 && !revealed[card.id] && (
                <button
                  onClick={() => setRevealed((r) => ({ ...r, [card.id]: true }))}
                  className="flex items-center px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" strokeWidth={3} /> Show me the answer
                </button>
              )}

              {!isFixed && attemptCount >= 4 && (
                <button
                  onClick={handleSkip}
                  className="flex items-center px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <SkipForward className="w-4 h-4 mr-2" strokeWidth={3} /> Skip this one
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {allResolved && (
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setStep('final')}
            className="flex items-center px-8 py-3 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-2xl font-black tracking-widest uppercase text-sm transition-all shadow-sm hover:opacity-90"
          >
            Go to my corrected essay <ArrowRight className="w-5 h-5 ml-2" strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );

  /* ---- step 2: the essay they take away ---------------------------------- */

  const finalStep = (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-1">
            {['final', 'changes'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors ${
                  view === v
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
              >
                {v === 'final' ? 'Final essay' : 'What changed'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black uppercase tracking-widest tabular-nums text-slate-400">
              {countWords(finalText)} words
            </span>
            <button
              onClick={handleCopy}
              className={`flex items-center px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest border-2 transition-colors ${
                copied
                  ? 'bg-emerald-500 border-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {copied
                ? <><Check className="w-4 h-4 mr-2" strokeWidth={3} /> Copied</>
                : <><ClipboardCopy className="w-4 h-4 mr-2" strokeWidth={3} /> Copy essay</>}
            </button>
          </div>
        </div>

        {view === 'final' ? (
          <textarea
            value={finalText}
            onChange={(e) => setFinalEdit(e.target.value)}
            {...NO_ADDONS}
            className="w-full h-[26rem] px-6 sm:px-8 py-6 bg-transparent text-lg font-medium text-slate-800 dark:text-slate-100 leading-[1.9] focus:outline-none resize-none"
          />
        ) : (
          <div className="px-6 sm:px-8 py-6 h-[26rem] overflow-y-auto text-lg font-medium text-slate-700 dark:text-slate-300 leading-[1.9]">
            <DiffText parts={diffParts} />
          </div>
        )}
      </div>

      {kinds.length > 0 && (
        <div className="bg-[#eff6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-800 p-6 rounded-[1.5rem] mb-6">
          <div className="flex items-center text-[#2563eb] dark:text-blue-400 mb-3">
            <Sparkles className="w-5 h-5 mr-2" />
            <h4 className="font-black text-sm uppercase tracking-widest">Watch for these next time</h4>
          </div>
          <ul className="space-y-2">
            {kinds.map((k) => (
              <li key={k.kind} className="flex items-start">
                <span className="flex-shrink-0 mr-3 mt-0.5 text-[11px] font-black tabular-nums text-blue-500 bg-white dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-md px-2 py-0.5">
                  ×{k.count}
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  <span className="font-black">{k.kind}.</span>
                  {k.rule ? <span className="text-slate-500 dark:text-slate-400"> {k.rule}.</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 mb-8">
        <span className="text-sm font-bold text-slate-400">
          {cards.length === 0
            ? 'No corrections were needed.'
            : `${fixedCount} of ${cards.length} corrections made yourself.`}
        </span>
        <div className="flex items-center gap-3">
          {cards.length > 0 && (
            <button
              onClick={() => setStep('fix')}
              className="px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Back to the corrections
            </button>
          )}
          <button
            onClick={finish}
            className="flex items-center px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg tracking-widest uppercase border-b-[5px] border-indigo-800 active:border-b-0 active:translate-y-[5px] transition-all shadow-sm"
          >
            Done: save my writing <ArrowRight className="w-6 h-6 ml-3" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 mt-2 sm:mt-6">
      {header}
      {rail}
      {step === 'fix' ? fixStep : finalStep}
    </div>
  );
}
