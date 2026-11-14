import { useState, useMemo, useEffect } from 'react';
import { CheckCircle2, XCircle, PenLine, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import { sfx } from '../arcade/sfx.js';
import { EmptyState } from '../components/EmptyState.jsx';

/**
 * Inline passage editing — the GED RLA "drop-down inside the text" item type.
 *
 * A short passage renders as continuous prose with select boxes sitting in the
 * line of text, so the student chooses the correct form *in context* rather than
 * answering a decontextualised sentence. That context is the whole point: the
 * GED never asks "which pronoun is possessive", it asks you to fix a sentence
 * inside a paragraph that is already about something else.
 *
 * Retry behaviour matches Reading.jsx: an exercise answered perfectly comes back
 * pre-filled, and after a failed attempt the blanks the student got wrong are
 * pre-set to the correct option so the second pass teaches the right form rather
 * than re-testing a guess.
 */
export default function GrammarEdit({
  pool,
  savedData = {},
  onComplete,
  onQuit,
}) {
  const exercises = useMemo(() => pool?.exercises || [], [pool]);
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState({});
  const [checked, setChecked] = useState(false);
  const [cumulative, setCumulative] = useState(0);
  const [localAnswers, setLocalAnswers] = useState(savedData);

  const current = exercises[index];
  const blanks = current?.blanks || [];

  const totalBlanks = useMemo(
    () => exercises.reduce((sum, ex) => sum + (ex.blanks?.length || 0), 0),
    [exercises]
  );

  // Pre-fill on re-entry: a previously perfect exercise comes back complete.
  useEffect(() => {
    if (!current) return;
    const previous = localAnswers[current.id];
    const seed = {};
    if (previous?.status === 'perfect') {
      blanks.forEach((b) => { seed[b.id] = b.correct; });
    }
    // Restores the persisted attempt when the item changes, and (per task) also
    // scrolls, focuses, or advances the running score — side effects that have to
    // stay in an effect. Queued for the render-phase-adjustment rewrite; not worth
    // re-testing scoring mid study-block. See docs/daily-plan.md.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoices(seed);
    setChecked(false);
  }, [index, current?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // The registry only launches this task when grammarEdit has content, but guard
  // anyway so an empty pool shows a message instead of a blank white screen.
  if (!current) {
    return (
      <EmptyState
        icon={<PenLine className="w-16 h-16" />}
        iconClassName="text-sky-300 dark:text-sky-700"
        title="Nothing to edit yet"
        message="No editing passages have been added to this unit."
        onAction={onQuit}
      />
    );
  }

  const allFilled = blanks.every((b) => choices[b.id]);
  const correctCount = blanks.filter((b) => choices[b.id] === b.correct).length;
  const isPerfect = checked && correctCount === blanks.length;

  const scoreFor = (correct) =>
    totalBlanks === 0 ? 0 : Math.round((correct / totalBlanks) * 20);

  const handleCheck = () => {
    if (!allFilled || checked) return;
    setChecked(true);
    const gotAll = correctCount === blanks.length;
    sfx(gotAll ? 'correct' : 'wrong');

    const updated = {
      ...localAnswers,
      [current.id]: { status: gotAll ? 'perfect' : 'partial', correctCount },
    };
    setLocalAnswers(updated);
    setCumulative((c) => c + correctCount);
  };

  const handleNext = () => {
    if (index + 1 < exercises.length) {
      setIndex(index + 1);
      return;
    }
    onComplete(scoreFor(cumulative), localAnswers);
  };

  /**
   * Splits the passage on [[blankId]] markers and rebuilds it with a select in
   * each slot, so the choice sits inside the sentence instead of beneath it.
   */
  const renderPassage = () => {
    const parts = current.passage.split(/(\[\[[^\]]+\]\])/g);
    return parts.map((part, i) => {
      const match = part.match(/^\[\[([^\]]+)\]\]$/);
      if (!match) return <span key={i}>{part}</span>;

      const blank = blanks.find((b) => b.id === match[1]);
      if (!blank) return <span key={i}>{part}</span>;

      const picked = choices[blank.id];
      const right = checked && picked === blank.correct;
      const wrong = checked && picked !== blank.correct;

      return (
        <span key={i} className="inline-flex items-center align-middle mx-1">
          <select
            value={picked || ''}
            disabled={checked}
            onChange={(e) =>
              setChoices({ ...choices, [blank.id]: e.target.value })
            }
            className={[
              'rounded-lg border-2 px-2 py-1 font-bold outline-none transition',
              'text-base sm:text-lg',
              right
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                : wrong
                ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                : 'border-sky-500 bg-white text-sky-700 dark:bg-slate-800 dark:text-sky-300',
            ].join(' ')}
          >
            <option value="" disabled>
              Choose…
            </option>
            {blank.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {wrong && (
            <span className="ml-1 font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowRight className="inline w-4 h-4" /> {blank.correct}
            </span>
          )}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <TopBar
        current={index + 1}
        total={exercises.length}
        onQuit={() => onComplete(scoreFor(cumulative), localAnswers)}
        modeTitle="Edit the Passage"
      />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 mt-2 sm:mt-6">
        <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
          <PenLine className="w-5 h-5" />
          <span className="font-bold uppercase tracking-widest text-sm">
            Choose the correct word in each gap
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
          {current.title}
        </h2>
        {current.titleVn && (
          <p className="text-slate-500 dark:text-slate-400 italic mb-4">
            {current.titleVn}
          </p>
        )}

        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 sm:p-7 leading-[2.6] text-lg text-slate-800 dark:text-slate-100">
          {renderPassage()}
        </div>

        {!checked && (
          <button
            onClick={handleCheck}
            disabled={!allFilled}
            className="mt-6 w-full rounded-2xl border-b-4 py-4 font-extrabold text-white transition enabled:bg-[#58cc02] enabled:border-[#58a700] enabled:hover:brightness-105 disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:border-slate-600"
          >
            {allFilled
              ? 'Check Answers'
              : `Fill every gap to continue (${
                  blanks.filter((b) => choices[b.id]).length
                }/${blanks.length})`}
          </button>
        )}

        {checked && (
          <>
            <div
              className={[
                'mt-6 rounded-2xl border-2 p-5',
                isPerfect
                  ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/30'
                  : 'border-rose-300 bg-rose-50 dark:border-rose-700 dark:bg-rose-900/30',
              ].join(' ')}
            >
              <div className="flex items-center gap-2 font-extrabold text-lg mb-3">
                {isPerfect ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-300">
                      Perfect — {correctCount}/{blanks.length}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                    <span className="text-rose-700 dark:text-rose-300">
                      {correctCount}/{blanks.length} correct — read the notes below
                    </span>
                  </>
                )}
              </div>

              <ul className="space-y-3">
                {blanks.map((b) => {
                  const ok = choices[b.id] === b.correct;
                  return (
                    <li
                      key={b.id}
                      className="rounded-xl bg-white/70 dark:bg-slate-800/70 p-3"
                    >
                      <div className="font-bold text-slate-800 dark:text-slate-100">
                        {ok ? '✓' : '✗'} {b.correct}
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 text-sm mt-1">
                        {b.expEn}
                      </div>
                      {b.expVn && (
                        <div className="text-slate-500 dark:text-slate-400 text-sm italic mt-1">
                          {b.expVn}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              onClick={handleNext}
              className="mt-6 w-full rounded-2xl border-b-4 border-[#1899d6] bg-[#1cb0f6] py-4 font-extrabold text-white transition hover:brightness-105"
            >
              {index + 1 < exercises.length ? 'Next Passage' : 'Finish'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
