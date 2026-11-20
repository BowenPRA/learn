import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Eye, Lightbulb, SearchCheck, X, XCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import { sfx } from '../arcade/sfx.js';
import { EmptyState } from '../components/EmptyState.jsx';
import { checkFix, errorAt, missAllowance, placeErrors, proofreadScore, tokenize } from '../utils/proofread';

/**
 * Find & Fix — read a passage, click the mistakes, type the corrections.
 *
 * The GED tests editing "in context", and the essay's conventions trait is
 * lost to slips the student never sees in his own paragraph. Drop-down items
 * (GrammarEdit) show him WHERE the choice is; this task makes him find it. A
 * click on a correct word costs a miss, because on the page there are no
 * highlights telling you where to look — the whole skill is knowing what a
 * wrong sentence feels like.
 *
 * Per passage: every error is TODO until the student clicks inside it and
 * types a fix that matches (FIXED), or gives up after two attempts and asks
 * to see it (REVEALED — filled in, not counted). Too many wrong clicks reveals
 * what is left so the passage always ends with the corrected text in view.
 *
 * Resumable: a finished passage is remembered as { status:'done', fixed, total }
 * and skipped on re-entry; the score is the fixed count over every error, and
 * one error missed across the whole task still scores full marks (proofreadScore).
 */

const STATUS = { TODO: 'todo', FIXED: 'fixed', REVEALED: 'revealed' };

export default function Proofread({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true }) {
  const items = useMemo(() => (Array.isArray(pool) ? pool : []), [pool]);
  // Every item already done means this is a RETRY: start clean. Restoring the
  // finished state left Finish as the only button, which re-submitted the old
  // result — so a student who scored 4/10 could never do better.
  const [saved, setSaved] = useState(() => {
    const s = savedData || {};
    return items.length && items.every((it) => s[it.id]?.status === 'done') ? {} : s;
  });
  const firstOpen = useMemo(() => {
    const i = items.findIndex((it) => saved[it.id]?.status !== 'done');
    return i === -1 ? Math.max(0, items.length - 1) : i;
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps
  const [index, setIndex] = useState(firstOpen);

  const item = items[index];
  const placed = useMemo(() => (item ? placeErrors(item) : []), [item]);
  const tokens = useMemo(() => (item ? tokenize(item.passage) : []), [item]);

  const [status, setStatus] = useState({});
  const [typed, setTyped] = useState({});
  const [attempts, setAttempts] = useState({});
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [misses, setMisses] = useState(0);
  const [flash, setFlash] = useState('');
  const [done, setDone] = useState(false);
  const boxRef = useRef(null);
  const flashTimer = useRef(null);

  const totalErrors = items.reduce((s, it) => s + placeErrors(it).length, 0);
  const fixedSoFar = (extra = {}) =>
    items.reduce((s, it) => {
      if (it.id === item?.id && extra[it.id] !== undefined) return s + extra[it.id];
      return s + (saved[it.id]?.status === 'done' ? saved[it.id].fixed || 0 : 0);
    }, 0);
  const scoreOf = (fixed) => proofreadScore(fixed, totalErrors);

  // A fresh passage resets the working state; a finished one comes back solved.
  useEffect(() => {
    if (!item) return;
    const wasDone = saved[item.id]?.status === 'done';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(Object.fromEntries(placed.map((e) => [e.id, wasDone ? STATUS.REVEALED : STATUS.TODO])));
    setTyped(Object.fromEntries(placed.map((e) => [e.id, e.wrong])));
    setAttempts({});
    setSelected(null);
    setResult(null);
    setMisses(0);
    setDone(wasDone);
  }, [item?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { if (flashTimer.current) clearTimeout(flashTimer.current); }, []);

  if (!item) {
    return (
      <EmptyState
        icon={<SearchCheck className="w-16 h-16" />}
        iconClassName="text-amber-300 dark:text-amber-700"
        title="Nothing to proofread yet"
        message="No passages have been added to this unit."
        onAction={onQuit}
      />
    );
  }

  const allowance = missAllowance(placed.length);
  const resolved = placed.filter((e) => status[e.id] && status[e.id] !== STATUS.TODO).length;
  const fixedHere = placed.filter((e) => status[e.id] === STATUS.FIXED).length;
  const selectedError = selected ? placed.find((e) => e.id === selected) : null;

  const say = (msg) => {
    setFlash(msg);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(''), 1800);
  };

  const finishPassage = (nextStatus) => {
    const fixed = placed.filter((e) => nextStatus[e.id] === STATUS.FIXED).length;
    const updated = { ...saved, [item.id]: { status: 'done', fixed, total: placed.length } };
    setSaved(updated);
    setDone(true);
    onProgress?.(scoreOf(fixedSoFar({ [item.id]: fixed })), updated);
  };

  const revealRest = (nextStatus) => {
    const out = { ...nextStatus };
    for (const e of placed) if (out[e.id] === STATUS.TODO) out[e.id] = STATUS.REVEALED;
    setStatus(out);
    setSelected(null);
    setResult(null);
    finishPassage(out);
  };

  const handleTokenClick = (token) => {
    if (done || token.space) return;
    const hit = errorAt(placed, token);
    if (!hit) {
      const next = misses + 1;
      setMisses(next);
      sfx('wrong');
      if (next >= allowance) {
        say('Too many wrong clicks — here is what was left.');
        revealRest(status);
      } else {
        say(`"${token.text.replace(/[.,;:!?]+$/, '')}" is correct. ${allowance - next} wrong click${allowance - next === 1 ? '' : 's'} left.`);
      }
      return;
    }
    if (status[hit.id] !== STATUS.TODO) { say('You already fixed that one.'); return; }
    setSelected(hit.id);
    setResult(null);
    setTimeout(() => boxRef.current?.focus(), 0);
  };

  const handleCheck = () => {
    if (!selectedError) return;
    const outcome = checkFix(typed[selectedError.id], selectedError);
    setResult(outcome);
    if (outcome.ok) {
      const next = { ...status, [selectedError.id]: STATUS.FIXED };
      setStatus(next);
      sfx('correct');
      if (placed.every((e) => next[e.id] !== STATUS.TODO)) finishPassage(next);
      return;
    }
    setAttempts((a) => ({ ...a, [selectedError.id]: (a[selectedError.id] || 0) + 1 }));
    sfx('wrong');
  };

  const handleReveal = () => {
    if (!selectedError) return;
    const next = { ...status, [selectedError.id]: STATUS.REVEALED };
    setStatus(next);
    setTyped((t) => ({ ...t, [selectedError.id]: selectedError.right }));
    setResult(null);
    if (placed.every((e) => next[e.id] !== STATUS.TODO)) finishPassage(next);
  };

  const handleNext = () => {
    if (index + 1 < items.length) { setIndex(index + 1); return; }
    onComplete(scoreOf(fixedSoFar()), saved);
  };

  // Nothing answered this sitting is just leaving — not a 0-score attempt.
  const handleQuit = () => (Object.keys(saved).length ? onComplete(scoreOf(fixedSoFar()), saved) : onQuit?.());

  /* ---- render ----------------------------------------------------------- */

  const renderPassage = () => tokens.map((tok, i) => {
    if (tok.space) return <span key={i}>{tok.text}</span>;
    const err = errorAt(placed, tok);
    const s = err ? status[err.id] : null;
    const isSel = err && err.id === selected;
    let cls = 'cursor-pointer rounded px-0.5 transition-colors hover:bg-amber-100 dark:hover:bg-amber-900/40';
    if (err && s === STATUS.FIXED) cls = 'rounded px-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 line-through decoration-emerald-400';
    else if (err && s === STATUS.REVEALED) cls = 'rounded px-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 line-through decoration-amber-400';
    else if (isSel) cls = 'cursor-pointer rounded px-0.5 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 underline decoration-wavy decoration-rose-400 underline-offset-4';
    else if (done) cls = 'rounded px-0.5';
    // The correction sits BESIDE the struck-through words, not inside them — a
    // parent's line-through cannot be switched off on a child.
    return (
      <React.Fragment key={i}>
        <span onClick={() => handleTokenClick(tok)} className={cls}>{tok.text}</span>
        {err && s && s !== STATUS.TODO && tok.end === err.end && (
          <span className={`ml-1 rounded px-1 font-black ${s === STATUS.FIXED ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>
            {err.right}
          </span>
        )}
      </React.Fragment>
    );
  });

  const attemptCount = selectedError ? attempts[selectedError.id] || 0 : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pb-24">
      <TopBar current={index + 1} total={items.length} onQuit={handleQuit} modeTitle="Find & Fix" />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 mt-2 sm:mt-6">
        <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
          <SearchCheck className="w-5 h-5" strokeWidth={2.5} />
          <span className="font-bold uppercase tracking-widest text-sm">
            Find the {placed.length} mistake{placed.length === 1 ? '' : 's'} — click a wrong word, then type the fix
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{item.title}</h2>
        {bilingual && item.titleVn && (
          <p className="text-slate-500 dark:text-slate-400 italic mb-4">{item.titleVn}</p>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] font-black uppercase tracking-widest">
          <span className="text-emerald-600 dark:text-emerald-400">{fixedHere} fixed</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500 dark:text-slate-400">{placed.length - resolved} to find</span>
          <span className="text-slate-400">·</span>
          <span className={misses >= allowance - 1 ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}>
            {Math.max(0, allowance - misses)} wrong click{allowance - misses === 1 ? '' : 's'} left
          </span>
          {flash && (
            <span className="ml-auto normal-case tracking-normal text-rose-500 dark:text-rose-400 animate-in fade-in">{flash}</span>
          )}
        </div>

        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 sm:p-7 leading-[2.2] text-lg text-slate-800 dark:text-slate-100 select-none">
          {renderPassage()}
        </div>

        {selectedError && !done && status[selectedError.id] === STATUS.TODO && (
          <div className="mt-5 rounded-2xl border-2 border-rose-200 dark:border-rose-900 bg-white dark:bg-slate-900 p-5 sm:p-6 animate-in fade-in slide-in-from-bottom-2">
            <span className="block text-[10px] font-black uppercase tracking-widest text-rose-500 mb-1">You found a mistake</span>
            <p className="text-slate-700 dark:text-slate-200 font-bold mb-3">
              <span className="text-rose-600 dark:text-rose-400">“{selectedError.wrong}”</span>
              <span className="ml-3 text-[11px] font-black uppercase tracking-widest text-slate-400">{selectedError.kind}</span>
            </p>
            <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
              Type these words correctly
            </label>
            <input
              ref={boxRef}
              value={typed[selectedError.id] ?? ''}
              onChange={(e) => { setTyped((t) => ({ ...t, [selectedError.id]: e.target.value })); if (result && !result.ok) setResult(null); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCheck(); }}
              onPaste={(e) => e.preventDefault()}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              data-gramm="false"
              className={`w-full px-4 py-3 rounded-xl border-2 text-lg font-medium focus:outline-none focus:ring-2 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 ${
                result && !result.ok ? 'border-rose-300 focus:ring-rose-400' : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-400'
              }`}
            />
            {result && !result.ok && (
              <p className="mt-2 flex items-start text-sm font-bold text-rose-600 dark:text-rose-400">
                <X className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" strokeWidth={3} /> {result.hint}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleCheck}
                className="px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black tracking-widest uppercase border-b-[4px] border-indigo-800 active:border-b-0 active:translate-y-[4px] transition-all"
              >
                Check
              </button>
              {attemptCount >= 2 && (
                <button
                  onClick={handleReveal}
                  className="flex items-center px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <Eye className="w-4 h-4 mr-2" strokeWidth={3} /> Show me (no credit)
                </button>
              )}
              <button
                onClick={() => { setSelected(null); setResult(null); }}
                className="px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600"
              >
                Not this one
              </button>
            </div>
          </div>
        )}

        {/* The passage's report: every error with the rule, once it is resolved. */}
        {done && (
          <div className="mt-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 sm:p-6 animate-in fade-in">
            <div className="flex items-center gap-2 font-extrabold text-lg mb-4">
              {fixedHere === placed.length ? (
                <><CheckCircle2 className="w-6 h-6 text-emerald-600" /><span className="text-emerald-700 dark:text-emerald-300">All {placed.length} found and fixed</span></>
              ) : (
                <><XCircle className="w-6 h-6 text-amber-500" /><span className="text-amber-700 dark:text-amber-300">{fixedHere} of {placed.length} fixed yourself — read the rest</span></>
              )}
            </div>
            {/* The whole task, under the last passage: one miss is still full marks. */}
            {index + 1 === items.length && items.every((it) => saved[it.id]?.status === 'done') && (() => {
              const all = fixedSoFar();
              const full = scoreOf(all) === 10;
              return (
                <p className={`mb-4 rounded-xl px-4 py-3 font-extrabold ${full ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200' : 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                  {all} of {totalErrors} fixed across the passages{full ? (all < totalErrors ? ': full marks. One miss is allowed.' : ': full marks.') : '.'}
                </p>
              );
            })()}
            <ul className="space-y-3">
              {placed.map((e, n) => (
                <li key={e.id} className="rounded-xl bg-slate-50 dark:bg-slate-800/70 p-3">
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full grid place-items-center text-[11px] font-black ${status[e.id] === STATUS.FIXED ? 'bg-emerald-500 text-white' : 'bg-amber-200 text-amber-800'}`}>
                      {status[e.id] === STATUS.FIXED ? <Check className="w-3.5 h-3.5" strokeWidth={3.5} /> : n + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 dark:text-slate-100">
                        <span className="line-through text-rose-500 decoration-2">{e.wrong}</span>
                        <ArrowRight className="inline w-4 h-4 mx-2 text-slate-400" />
                        <span className="text-emerald-700 dark:text-emerald-300">{e.right}</span>
                        <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-slate-400">{e.kind}</span>
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 text-sm mt-1">{e.expEn}</div>
                      {bilingual && e.expVn && <div className="text-slate-500 dark:text-slate-400 text-sm italic mt-0.5">{e.expVn}</div>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-slate-500 dark:text-slate-400">
              <Lightbulb className="w-4 h-4 mr-2 text-amber-500" strokeWidth={2.5} />
              Before your next essay, read your last paragraph looking for exactly these.
            </div>
            <button
              onClick={handleNext}
              className="mt-5 w-full rounded-2xl border-b-4 border-[#1899d6] bg-[#1cb0f6] py-4 font-extrabold text-white transition hover:brightness-105"
            >
              {index + 1 < items.length ? 'Next passage' : 'Finish'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
