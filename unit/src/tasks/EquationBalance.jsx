import { useState, useMemo } from 'react';
import {
  Scale, RotateCcw, Undo2, Lightbulb, ArrowRight, ArrowDown, Construction, PartyPopper, Pencil, Check,
  FlipHorizontal2,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import {
  fr, frText, parseEquation, coefText, applyMove, isSolved,
  suggestMove, parSteps, groupedOf, lcdOf, isZero, isNeg, neg, toNumber,
  relOf, relGlyph, isInequality, flipRel, willFlip,
} from '../utils/linearEquation';
import { Frac, SideMath, MoveMath } from '../components/math/LinearMath';

/* ------------------------------------------------------------------ *
 * Balance — solve an equation by doing the same thing to both sides.
 *
 * Brought over from the Dashboard (src/tasks/EquationBalance.jsx, the Acellus and
 * GED algebra units) on 21 November 2026 for Upper Secondary Maths Unit 1. What
 * changed here: English only; each equation is saved as it is solved and the task
 * opens at the first one not yet solved (as the Bus Stop task does); an equation
 * solved after "Show me" counts half, not nothing; and an item with `tidy` shows the
 * equation as written (brackets, like terms) above its tidied first line.
 *
 * Two representations of the same act, side by side:
 *   the BEAM, which never tilts, because you always act on both sides;
 *   the WORKING, which builds up the way it is written in a notebook —
 *     3x + 7  =  22
 *       − 7      − 7
 *     ─────────────────
 *       3x    =  15
 *
 * The student picks an operation and a number, then presses one button that
 * says what the whole idea is: "Do it to both sides". Nothing is ever applied
 * to one side alone, so the equation cannot be broken — a wrong move is only
 * an unhelpful one, and Undo is always there.
 *
 * Reads a unit's `balance`: [{ id, equation: '3(x + 2) = 21', prompt?, tidy? }].
 * The engine (utils/linearEquation.js) works out the moves, the target and the
 * hint from the equation itself; there is no answer key.
 * ------------------------------------------------------------------ */

const OPS = [
  { kind: 'add', sym: '+', label: 'Add' },
  { kind: 'sub', sym: '−', label: 'Subtract' },
  { kind: 'mul', sym: '×', label: 'Multiply by' },
  { kind: 'div', sym: '÷', label: 'Divide by' },
];

const T = {
  title: 'Balance',
  doBoth: 'Do it to both sides',
  undo: 'Undo',
  reset: 'Reset',
  hint: 'Show me',
  solved: 'Solved!',
  steps: 'steps',
  par: 'target',
  pick: 'Pick an operation, then a number',
  stays: 'The scale stays level, because you always do the same to both sides.',
  tilts: 'The heavier side stays down. Do the same to both sides and the heavier side is still the heavier side.',
  flipped: 'SIGN FLIPS',
  flipWhy: 'You multiplied or divided both sides by a negative, so the inequality turns round.',
  hintUsed: 'Show me used: half marks',
  copyTitle: 'Copy this into your notebook',
  copyBody: 'Write every line of the working, with the moves under both sides. Not just the answer.',
  copied: 'I have written it down',
  tidyFirst: 'Tidy each side first',
  none: 'No equations yet',
  back: 'Back',
  pickFirst: 'Pick a number first.',
  notNumber: 'That is not a number.',
  noZero: 'You cannot multiply or divide by zero.',
};

/** The equation as the author wrote it, with real minus and times signs. */
const written = (src) => String(src).replace(/\s*\*\s*/g, ' × ').replace(/-/g, '−').replace(/<=/g, '≤').replace(/>=/g, '≥');

/**
 * A side written as one quotient — (x − 3)/2 — drawn as an actual fraction
 * rather than as two chips over separate denominators. It is one weight on the
 * pan, and it has to look like one.
 */
function FractionChip({ side, v }) {
  return (
    <span className="inline-flex items-center px-3 sm:px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-b-[4px] border-[#7c3aed] shadow-sm font-black text-lg sm:text-2xl text-slate-700 dark:text-slate-200">
      <SideMath
        side={side}
        v={v}
        xClass="text-[#1899d6] dark:text-[#5cc4f7]"
        cClass="text-amber-600 dark:text-amber-400"
      />
    </span>
  );
}

/** One pan of the balance: x-chips you can count, and the constant as a chip. */
function Pan({ side, v = 'x' }) {
  const chips = [];
  const co = side.x;
  const grouped = groupedOf(side);

  if (grouped) {
    chips.push(<FractionChip key="frac" side={side} v={v} />);
  } else if (!isZero(co)) {
    const whole = co.d === 1 ? Math.abs(co.n) : null;
    if (whole !== null && whole <= 6) {
      // Few enough to count — this is what makes "divide by 3" visible.
      for (let i = 0; i < whole; i++) {
        chips.push(
          <span key={`x${i}`}
            className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-black text-base sm:text-xl border-b-[4px] shadow-sm
              ${isNeg(co) ? 'bg-rose-100 dark:bg-rose-900/40 border-rose-400 text-rose-700 dark:text-rose-300'
                          : 'bg-[#1cb0f6] border-[#1899d6] text-white'}`}>
            {isNeg(co) ? `−${v}` : v}
          </span>
        );
      }
    } else {
      const mag = isNeg(co) ? neg(co) : co;
      chips.push(
        <span key="xn"
          className="inline-flex items-center justify-center px-3 sm:px-4 min-h-10 sm:min-h-12 py-1.5 rounded-xl font-black text-base sm:text-xl bg-[#1cb0f6] border-b-[4px] border-[#1899d6] text-white shadow-sm">
          {isNeg(co) && <span className="mr-[0.06em]">−</span>}
          {mag.d === 1
            ? coefText(mag, v)
            : <Frac top={coefText(fr(mag.n), v)} bottom={mag.d} />}
        </span>
      );
    }
  }

  if (!grouped && (!isZero(side.c) || isZero(co))) {
    const c = side.c;
    const mag = isNeg(c) ? neg(c) : c;
    chips.push(
      <span key="c"
        className={`inline-flex items-center justify-center px-3 sm:px-4 min-h-10 sm:min-h-12 py-1.5 rounded-xl font-black text-base sm:text-xl border-b-[4px] shadow-sm
          ${isNeg(c) ? 'bg-rose-100 dark:bg-rose-900/40 border-rose-400 text-rose-700 dark:text-rose-300'
                     : 'bg-[#ffc800] border-[#cca000] text-amber-950'}`}>
        {isNeg(c) && <span className="mr-[0.06em]">−</span>}
        {mag.d === 1 ? frText(mag) : <Frac top={mag.n} bottom={mag.d} />}
      </span>
    );
  }

  return (
    // flex-col + flex-1 so both pans are the same height however many chips each holds.
    <div className="flex-1 min-w-0 flex flex-col">
      <div className="w-0.5 h-5 bg-slate-300 dark:bg-slate-600 mx-auto" />
      <div className="flex-1 min-h-[5.5rem] rounded-2xl border-2 border-b-[6px] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2 sm:p-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {chips}
      </div>
    </div>
  );
}

/**
 * The beam. On an equation it never tilts; on an inequality the heavier side
 * sits lower and stays lower. The tilt is derived from the relation, so it
 * cannot disagree with the sign printed in the working.
 */
function Beam({ eq }) {
  if (!eq) return null;
  const v = eq.v || 'x';
  const rel = relOf(eq);
  const heavy = rel === '<' || rel === '<=' ? 1 : rel === '>' || rel === '>=' ? -1 : 0;
  const DROP = 14;

  return (
    <div>
      <div className="relative">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600 transition-transform duration-500"
          style={{ transform: `rotate(${heavy * 3.2}deg)` }}
        />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-3.5 h-3.5 rounded-full bg-slate-500 dark:bg-slate-400 border-2 border-white dark:border-slate-900" />
      </div>
      <div className="flex items-stretch gap-1.5 sm:gap-8">
        <div className="flex-1 min-w-0 flex transition-transform duration-500" style={{ transform: `translateY(${-heavy * DROP}px)` }}>
          <Pan side={eq.left} v={v} />
        </div>
        <div className="flex flex-col items-center pt-5 shrink-0">
          {heavy === 0 ? (
            <>
              <div className="w-0 h-0 border-l-[13px] border-r-[13px] border-b-[20px] border-transparent border-b-slate-400 dark:border-b-slate-500" />
              <div className="w-10 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 -mt-0.5" />
            </>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-black leading-none text-[#7c3aed] dark:text-violet-400 transition-all duration-300">
                {relGlyph(rel)}
              </span>
              <div className="w-10 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-1" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex transition-transform duration-500" style={{ transform: `translateY(${heavy * DROP}px)` }}>
          <Pan side={eq.right} v={v} />
        </div>
      </div>
    </div>
  );
}

/** The equation as written, before its brackets are multiplied out or its like terms collected. */
function TidyLine({ src, note }) {
  const at = src.search(/<=|>=|=|<|>/);
  const rel = src.match(/<=|>=|=|<|>/)?.[0] || '=';
  return (
    <div className="mb-2">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
        <div className="flex justify-end text-2xl sm:text-3xl font-black text-slate-500 dark:text-slate-400 tabular-nums">{written(src.slice(0, at).trim())}</div>
        <div className="text-2xl sm:text-3xl font-black text-slate-400 dark:text-slate-500">{written(rel)}</div>
        <div className="flex justify-start text-2xl sm:text-3xl font-black text-slate-500 dark:text-slate-400 tabular-nums">{written(src.slice(at + rel.length).trim())}</div>
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-1.5 text-xs sm:text-sm font-black text-[#7c3aed] dark:text-violet-400 font-sans">
        <ArrowDown className="w-4 h-4 shrink-0" strokeWidth={3} /> {note}
      </div>
    </div>
  );
}

/** The accumulating written solution: each applied move under both sides. */
function Working({ history, v = 'x' }) {
  return (
    <div className="font-mono">
      {history.map((row, i) => {
        const flipped = row.move && history[i + 1] && history[i + 1].eq.rel !== row.eq.rel;
        return (
          <div key={i} className="animate-in fade-in slide-in-from-top-1 duration-300">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
              <div className="flex justify-end text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tabular-nums">
                <SideMath side={row.eq.left} v={v} />
              </div>
              <div className={`text-2xl sm:text-3xl font-black ${relOf(row.eq) === '=' ? 'text-slate-400 dark:text-slate-500' : 'text-[#7c3aed] dark:text-violet-400'}`}>
                {relGlyph(relOf(row.eq))}
              </div>
              <div className="flex justify-start text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tabular-nums">
                <SideMath side={row.eq.right} v={v} />
              </div>
            </div>

            {row.move && (
              <>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5 mt-1">
                  <div className="flex justify-end text-lg sm:text-xl font-black text-[#1899d6] dark:text-[#5cc4f7]">
                    <MoveMath move={row.move} v={v} />
                  </div>
                  <div className="w-3" />
                  <div className="flex justify-start text-lg sm:text-xl font-black text-[#1899d6] dark:text-[#5cc4f7]">
                    <MoveMath move={row.move} v={v} />
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-5 my-2">
                  <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="w-3" />
                  <div className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
                {flipped && (
                  <div className="flex justify-center my-2 animate-in fade-in zoom-in-95 duration-300">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-sm font-sans">
                      <FlipHorizontal2 className="w-4 h-4 shrink-0" strokeWidth={3} />
                      {T.flipped}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * One problem. Mounted with `key={problem.id}` so moving to the next equation
 * resets the working, the chosen operation and the typed number by construction.
 */
function Solver({ problem, onSolved, onHint, footer }) {
  const [history, setHistory] = useState(() => [{ eq: problem.start, move: null }]);
  const [opKind, setOpKind] = useState('sub');
  const [amount, setAmount] = useState('');
  const [wantOnX, setWantOnX] = useState(false);
  const [error, setError] = useState('');

  const current = history[history.length - 1].eq;
  const solved = isSolved(current);
  const stepsTaken = history.length - 1;
  const varName = current.v || 'x';
  const opSymbol = OPS.find((o) => o.kind === opKind)?.sym || '+';
  const unequal = isInequality(current);
  const flipPreview = willFlip(current, opKind, amount);

  // × and ÷ scale the WHOLE side, so "×2x" is not a linear move and must never be built.
  const onX = wantOnX && (opKind === 'add' || opKind === 'sub');

  /** One tap for every number in front of them, constants and variable terms alike. */
  const chips = useMemo(() => {
    const consts = new Set(), vars = new Set();
    for (const s of [current.left, current.right]) {
      if (!isZero(s.c) && s.c.d === 1) consts.add(Math.abs(s.c.n));
      if (!isZero(s.x) && s.x.d === 1) {
        vars.add(Math.abs(s.x.n));
        // A coefficient is offered as a plain number too: dividing by it is the last step.
        consts.add(Math.abs(s.x.n));
      }
    }
    const lcd = lcdOf(current);
    if (lcd > 1) consts.add(lcd);
    return [
      ...[...consts].filter((v) => v > 0).sort((a, b) => a - b).slice(0, 5)
        .map((v) => ({ key: `c${v}`, value: v, isVar: false, label: String(v) })),
      ...[...vars].filter((v) => v > 0).sort((a, b) => a - b).slice(0, 3)
        .map((v) => ({ key: `v${v}`, value: v, isVar: true, label: v === 1 ? varName : `${v}${varName}` })),
    ];
  }, [current, varName]);

  const pickChip = (c) => {
    setAmount(String(c.value));
    setWantOnX(c.isVar);
    if (c.isVar && opKind !== 'add' && opKind !== 'sub') setOpKind('sub');
    setError('');
  };

  /** Negative amounts matter for "÷ −1", which no operator can say on its own. */
  const flipSign = () => {
    setAmount((a) => (a.startsWith('-') ? a.slice(1) : `-${a}`));
    setError('');
  };

  const apply = () => {
    if (solved) return;
    const raw = String(amount).trim().replace(/[−–]/g, '-');
    if (!raw) { setError(T.pickFirst); return; }
    const parts = raw.split('/');
    let value;
    try {
      value = parts.length === 2 ? fr(parseInt(parts[0], 10), parseInt(parts[1], 10)) : fr(Number(raw));
      if (!isFinite(toNumber(value))) throw new Error('not finite');
    } catch {
      setError(T.notNumber);
      return;
    }

    const move = { kind: opKind, amount: value, onX };
    let next;
    try { next = applyMove(current, move); }
    catch {
      setError(T.noZero);
      return;
    }
    setError('');
    setAmount('');
    setHistory((h) => [...h.slice(0, -1), { ...h[h.length - 1], move }, { eq: next, move: null }]);
    if (isSolved(next)) onSolved(stepsTaken + 1);
  };

  const undo = () => {
    if (history.length < 2) return;
    setHistory((h) => [...h.slice(0, -2), { ...h[h.length - 2], move: null }]);
    setError('');
  };
  const reset = () => { setHistory([{ eq: problem.start, move: null }]); setError(''); setAmount(''); };

  const showHint = () => {
    if (solved) return;
    const m = suggestMove(current);
    if (!m) return;
    onHint();
    setOpKind(m.kind);
    setWantOnX(!!m.onX);
    setAmount(frText(m.amount));
    setError('');
  };

  return (
    // One column on a phone; from lg the beam and the working on the left and the controls
    // on the right. Once solved the controls go, so the working takes a single middle column.
    <div className={`flex flex-col gap-4 ${solved ? 'max-w-3xl mx-auto' : 'lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-5'}`}>
      <div className="flex flex-col gap-4 min-w-0">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6">
          <Beam eq={current} />
          <p className="mt-6 text-center text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
            <Scale className="w-4 h-4 shrink-0" strokeWidth={2.5} /> {unequal ? T.tilts : T.stays}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-7">
          {problem.tidy && <TidyLine src={problem.equation} note={typeof problem.tidy === 'string' ? problem.tidy : T.tidyFirst} />}
          <Working history={history} v={varName} />
          {solved && footer(stepsTaken)}
        </div>
      </div>

      {!solved && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 lg:sticky lg:top-4">
          <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{T.pick}</div>

          <div className="grid grid-cols-4 gap-2 mb-3">
            {OPS.map((o) => (
              <button
                key={o.kind}
                type="button"
                aria-label={o.label}
                onClick={() => {
                  setOpKind(o.kind);
                  if (o.kind === 'mul' || o.kind === 'div') setWantOnX(false);
                  setError('');
                }}
                className={`py-3 rounded-2xl font-black text-2xl border-2 border-b-[5px] transition-all active:border-b-2 active:translate-y-[3px]
                  ${opKind === o.kind
                    ? 'bg-[#1cb0f6] border-[#1899d6] text-white'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#1cb0f6]'}`}
              >
                {o.sym}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {chips.map((c) => {
              const picked = String(amount).replace('-', '') === String(c.value) && onX === c.isVar;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => pickChip(c)}
                  className={`px-4 py-2 rounded-xl font-black text-lg border-2 border-b-[4px] transition-all active:border-b-2 active:translate-y-[2px]
                    ${picked
                      ? (c.isVar ? 'bg-[#1cb0f6] border-[#1899d6] text-white' : 'bg-[#ffc800] border-[#cca000] text-amber-950')
                      : c.isVar
                        ? 'bg-[#1cb0f6]/10 border-[#1cb0f6]/50 text-[#1899d6] dark:text-[#5cc4f7] hover:border-[#1cb0f6]'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#ffc800]'}`}
                >
                  {c.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={flipSign}
              title="Make it negative"
              className={`px-3 py-2 rounded-xl font-black text-lg border-2 border-b-[4px] transition-all active:border-b-2 active:translate-y-[2px]
                ${String(amount).startsWith('-')
                  ? 'bg-rose-500 border-rose-700 text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-rose-400'}`}
            >
              ±
            </button>

            {/* The typed box carries the variable too, so "2" and "2x" never look alike. */}
            <div className="relative">
              <input
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(''); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); apply(); } }}
                inputMode="text"
                autoComplete="off"
                placeholder="?"
                aria-label="The number"
                className={`w-24 pl-3 pr-7 py-2 rounded-xl border-2 border-b-[4px] bg-white dark:bg-slate-900 font-black text-lg text-center focus:outline-none
                  ${onX ? 'border-[#1cb0f6] text-[#1899d6] dark:text-[#5cc4f7]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:border-[#1cb0f6]'}`}
              />
              {onX && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-black text-lg text-[#1899d6] dark:text-[#5cc4f7] pointer-events-none">
                  {varName}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => { setWantOnX((v) => !v); if (opKind === 'mul' || opKind === 'div') setOpKind('sub'); setError(''); }}
              title={`Use the ${varName} term`}
              className={`px-4 py-2 rounded-xl font-black text-lg border-2 border-b-[4px] transition-all active:border-b-2 active:translate-y-[2px]
                ${onX ? 'bg-[#1cb0f6] border-[#1899d6] text-white'
                      : 'bg-[#1cb0f6]/10 border-[#1cb0f6]/50 text-[#1899d6] dark:text-[#5cc4f7] hover:border-[#1cb0f6]'}`}
            >
              {varName}
            </button>
          </div>

          {/* The preview says what is about to happen to BOTH sides. */}
          <div className="flex items-center justify-center flex-wrap gap-x-2 text-center text-base font-bold text-slate-400 dark:text-slate-500 mb-1 min-h-7 font-mono">
            {amount && (
              <>
                <SideMath side={current.left} v={varName} />
                <span>{opSymbol} {amount}{onX ? varName : ''}</span>
                <span className={`mx-2 ${flipPreview ? 'text-rose-500 font-black' : ''}`}>
                  {relGlyph(flipPreview ? flipRel(relOf(current)) : relOf(current))}
                </span>
                <SideMath side={current.right} v={varName} />
                <span>{opSymbol} {amount}{onX ? varName : ''}</span>
              </>
            )}
          </div>

          <div className="min-h-6 mb-2">
            {flipPreview && (
              <p className="flex items-center justify-center gap-1.5 text-center text-[11px] sm:text-xs font-bold text-rose-500 animate-in fade-in duration-200">
                <FlipHorizontal2 className="w-4 h-4 shrink-0" strokeWidth={3} /> {T.flipWhy}
              </p>
            )}
          </div>

          {error && <div className="text-center text-sm font-bold text-rose-500 mb-3">{error}</div>}

          <button
            type="button"
            onClick={apply}
            disabled={!amount}
            className="w-full py-4 rounded-2xl font-black text-base sm:text-lg uppercase tracking-widest bg-[#58cc02] border-b-[6px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            {T.doBoth}
          </button>

          <div className="flex items-center justify-center gap-2 mt-3">
            <button type="button" onClick={undo} disabled={history.length < 2}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none">
              <Undo2 className="w-4 h-4" strokeWidth={2.5} /> {T.undo}
            </button>
            <button type="button" onClick={reset} disabled={history.length < 2}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none">
              <RotateCcw className="w-4 h-4" strokeWidth={2.5} /> {T.reset}
            </button>
            <button type="button" onClick={showHint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {T.hint}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * The task. `savedData` is { [id]: score } — 1 solved, ½ solved after "Show me" —
 * and it reports out of 10 (nativeMax), saving after each equation.
 */
export default function EquationBalance({ pool = [], savedData = {}, onComplete, onProgress, onQuit }) {
  const problems = useMemo(
    () => pool.map((p) => {
      try { return { ...p, start: parseEquation(p.equation) }; } catch { return null; }
    }).filter(Boolean),
    [pool]
  );

  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = Number(score) || 0;
    return init;
  });
  const [idx, setIdx] = useState(() => {
    const i = problems.findIndex((p) => savedData?.[p.id] == null);
    return i === -1 ? 0 : i;
  });
  const [hinted, setHinted] = useState(false);
  const [solvedHere, setSolvedHere] = useState(false);

  const p = problems[idx];
  const par = useMemo(() => (p ? parSteps(p.start) : 0), [p]);

  const summary = (res) => {
    const total = problems.reduce((s, q) => s + (res[q.id] || 0), 0);
    const raw = problems.length ? Math.round((total / problems.length) * 10) : 0;
    const blob = Object.fromEntries(problems.filter((q) => res[q.id] != null).map((q) => [q.id, res[q.id]]));
    return { raw, blob, items: problems.map((q) => ({ itemId: q.id, correct: res[q.id] === 1 })) };
  };

  const solvedNow = () => {
    const next = { ...results, [p.id]: hinted ? 0.5 : 1 };
    setResults(next);
    setSolvedHere(true);
    const { raw, blob, items } = summary(next);
    onProgress?.(raw, blob, { items });
  };

  const finish = () => {
    const { raw, blob, items } = summary(results);
    onComplete?.(raw, blob, { items });
  };

  // The X keeps what has been solved; with nothing solved it just closes.
  const quit = () => (Object.keys(results).length ? finish() : onQuit?.());

  const next = () => {
    setHinted(false);
    setSolvedHere(false);
    if (idx < problems.length - 1) setIdx((i) => i + 1);
    else finish();
  };

  if (!problems.length) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-sky-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{T.none}</h2>
        <button type="button" onClick={onQuit} className="mt-4 px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px]">
          {T.back}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={T.title} current={idx + 1} total={problems.length} />

      <div className="flex-1 w-full max-w-3xl lg:max-w-6xl mx-auto p-4 sm:p-5 pb-10">
        {p.prompt && (
          <p className="text-center text-slate-500 dark:text-slate-400 font-bold mb-4">{p.prompt}</p>
        )}

        <Solver
          key={p.id}
          problem={p}
          onSolved={solvedNow}
          onHint={() => setHinted(true)}
          footer={(stepsTaken) => (
            <div className="mt-5 pt-5 border-t-2 border-dashed border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-[#ffc800]/10 dark:bg-amber-900/15 border-l-[6px] border-[#ffc800] rounded-r-2xl p-4 sm:p-5 mb-5">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black uppercase tracking-widest text-[11px] sm:text-xs mb-1.5">
                  <Pencil className="w-4 h-4 shrink-0" strokeWidth={3} />
                  {T.copyTitle}
                </div>
                <p className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-200 leading-relaxed">{T.copyBody}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#58cc02] flex items-center justify-center shadow-sm shrink-0">
                    <PartyPopper className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="font-black text-lg text-[#3e7500] dark:text-[#7bd42f]">{T.solved}</div>
                    <div className="text-xs font-bold text-slate-400">
                      {stepsTaken} {T.steps} · {T.par} {par}
                      {solvedHere && hinted ? ` · ${T.hintUsed}` : ''}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={next}
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-widest bg-[#58cc02] border-b-[5px] border-[#58a700] text-white hover:bg-[#46a802] active:border-b-0 active:translate-y-[5px] transition-all"
                >
                  <Check className="w-5 h-5 mr-2 shrink-0" strokeWidth={3} />
                  {T.copied}
                  <ArrowRight className="w-5 h-5 ml-2 shrink-0" strokeWidth={3} />
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
