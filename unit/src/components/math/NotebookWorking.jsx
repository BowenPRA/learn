// unit/src/components/math/NotebookWorking.jsx
//
// Working written the way it goes in a notebook (Upper Secondary Maths 1, 22 November
// 2026). Bowen: "the -9 under the +9 and 14 respectively … clear and well designed and
// engaging". Each move is written under the term it undoes, on both sides; a rule; the
// next line. x terms are blue and numbers amber, the colours of the chips in the Balance
// task, so the lesson and the task read as one thing. The words for each move sit in
// the margin. It steps: the first line shows, "Next step" brings in each move and its
// result, and the last step shows the check.
//
// Everything is worked out by utils/working.js from the equation and the moves.
// Also here: TermGroups (an expression's terms sorted into x terms and numbers) and
// ExpandArrows (the number outside a bracket multiplying each term inside).
import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, ChevronsDown, RotateCcw } from 'lucide-react';
import { workingModel, groupModel } from '../../utils/working';

const X = 'text-[#1677c4] dark:text-[#5cc4f7]';
const N = 'text-[#b45309] dark:text-amber-300';
const MOVE = 'text-[#db2777] dark:text-pink-300';
const MATH = { fontFamily: 'KaTeX_Main, "Times New Roman", serif' };

/** Maths text with its single letters in italic, as KaTeX writes them; words ("and") stay upright. */
function M({ text, className = '' }) {
  return (
    <span className={`whitespace-nowrap ${className}`} style={MATH}>
      {String(text).split(/([a-z]+)/).map((p, i) => (/^[a-z]$/.test(p) ? <i key={i}>{p}</i> : <span key={i}>{p}</span>))}
    </span>
  );
}

const fade = 'animate-in fade-in slide-in-from-top-1 duration-300';

/** A side as written, each term in its kind's colour when it is a plain sum (else as it is). */
function Written({ text, className }) {
  let terms;
  try { terms = groupModel(text.replace(/−/g, '-')).terms; } catch { terms = null; }
  if (!terms) return <M text={text} className={`${className} text-slate-600 dark:text-slate-300`} />;
  return (
    <span className={`${className} inline-flex gap-[0.3em]`}>
      {terms.map((t, i) => <M key={i} text={t.text} className={t.kind === 'x' ? X : N} />)}
    </span>
  );
}

export default function NotebookWorking({ spec, isDisplayMode = false }) {
  const model = useMemo(() => workingModel(spec), [spec]);
  const steps = model.rows.length - 1;
  const [shown, setShown] = useState(0);
  const done = shown >= steps;

  // The fewer the lines, the bigger the maths: a one-move example fills its box, a
  // three-move one still fits a laptop screen with every step shown.
  const lines = model.rows.length + (model.written ? 1 : 0);
  const SIZES = {
    roomy: ['text-[2.1rem] sm:text-[2.6rem]', 'text-[1.4rem] sm:text-[1.7rem]', 'text-[clamp(2.6rem,4.6vw,4.2rem)]', 'text-[clamp(1.7rem,3vw,2.7rem)]'],
    mid: ['text-[1.9rem] sm:text-[2.2rem]', 'text-xl sm:text-2xl', 'text-[clamp(2.2rem,4vw,3.6rem)]', 'text-[clamp(1.5rem,2.6vw,2.4rem)]'],
    tight: ['text-[1.5rem] sm:text-[1.7rem]', 'text-base sm:text-lg', 'text-[clamp(2rem,3.4vw,3.2rem)]', 'text-[clamp(1.3rem,2.2vw,2.1rem)]'],
  }[lines <= 2 ? 'roomy' : lines === 3 ? 'mid' : 'tight'];
  const big = `${isDisplayMode ? SIZES[2] : SIZES[0]} leading-tight`;
  const mid = `${isDisplayMode ? SIZES[3] : SIZES[1]} leading-tight`;
  const small = isDisplayMode ? 'text-[clamp(0.9rem,1.3vw,1.25rem)]' : 'text-sm';
  const cellPad = 'px-1.5 sm:px-2';

  const eqRow = (row, key, faded) => {
    const { left: l, right: r } = row.cells;
    return [
      <M key={`${key}lx`} text={l.x} className={`${big} ${X} font-semibold justify-self-end ${cellPad} ${faded}`} />,
      <M key={`${key}lc`} text={l.c} className={`${big} ${N} font-semibold justify-self-start ${cellPad} ${faded}`} />,
      <span key={`${key}eq`} className={`${big} text-slate-400 dark:text-slate-500 justify-self-center px-2 sm:px-3 ${faded}`} style={MATH}>=</span>,
      <M key={`${key}rx`} text={r.x} className={`${big} ${X} font-semibold justify-self-end ${cellPad} ${faded}`} />,
      <M key={`${key}rc`} text={r.c} className={`${big} ${N} font-semibold justify-self-start ${cellPad} ${faded}`} />,
      <span key={`${key}sp`} />,
    ];
  };

  // The move under each side: a number under the numbers, an x term under the x
  // terms, × and ÷ under the whole side.
  const moveRow = (row, key) => {
    const whole = row.move.kind === 'mul' || row.move.kind === 'div';
    const at = row.move.onX ? 'x' : 'c';
    const cell = (side) => {
      if (whole) return [<M key={`${key}${side}`} text={row.moveText} className={`${mid} ${MOVE} font-semibold justify-self-center col-span-2 ${fade}`} />];
      return [
        <M key={`${key}${side}x`} text={at === 'x' ? row.moveText : ''} className={`${mid} ${MOVE} font-semibold justify-self-end ${cellPad} ${fade}`} />,
        <M key={`${key}${side}c`} text={at === 'c' ? row.moveText : ''} className={`${mid} ${MOVE} font-semibold justify-self-start ${cellPad} ${fade}`} />,
      ];
    };
    return [
      ...cell('l'),
      <span key={`${key}gap`} />,
      ...cell('r'),
      // On a phone the margin has no room: the words of the latest step show under the working instead.
      <span key={`${key}say`} className={`hidden sm:inline-block justify-self-start ml-5 rounded-lg px-2 py-0.5 font-bold bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-200 whitespace-nowrap ${small} ${fade}`}>{row.say}</span>,
    ];
  };

  const rule = (key) => (
    <div key={key} className="col-span-5 h-[2px] rounded-full bg-slate-300 dark:bg-slate-600 my-0.5" />
  );

  const cells = [];
  if (model.written) {
    cells.push(
      <Written key="wl" text={model.written.left} className={`${big} font-semibold justify-self-end col-span-2 ${cellPad}`} />,
      <span key="weq" className={`${big} text-slate-400 dark:text-slate-500 justify-self-center px-2 sm:px-3`} style={MATH}>=</span>,
      <Written key="wr" text={model.written.right} className={`${big} font-semibold justify-self-start col-span-2 ${cellPad}`} />,
      <span key="wsp" />,
      <span key="wsay" className={`col-span-5 justify-self-center flex items-center gap-1 font-bold text-violet-600 dark:text-violet-300 ${small}`}><ArrowDown className="w-4 h-4" strokeWidth={3} />{model.writtenSay}</span>,
      <span key="wsay2" />,
    );
  }
  model.rows.forEach((row, i) => {
    if (i > shown) return;
    cells.push(...eqRow(row, `r${i}`, i > 0 ? fade : ''));
    if (row.move && i < shown) {
      cells.push(...moveRow(row, `m${i}`));
      cells.push(rule(`rule${i}`), <span key={`rs${i}`} />);
    }
  });

  const btn = 'inline-flex items-center gap-1.5 rounded-xl font-black uppercase tracking-widest transition-all';
  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="inline-grid items-center gap-y-0.5" style={{ gridTemplateColumns: 'auto auto auto auto auto auto' }}>
          {cells}
        </div>
      </div>
      {shown > 0 && (
        <p key={shown} className={`sm:hidden mt-1 rounded-lg px-2 py-0.5 font-bold bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-200 ${small} ${fade}`}>
          {model.rows[shown - 1].say}
        </p>
      )}
      <div className={`mt-2 flex flex-wrap items-center justify-center gap-2 ${small}`}>
        {done ? (
          <>
            <span className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-bold bg-[#d7ffb8] text-[#3e7500] dark:bg-lime-900/30 dark:text-lime-300 ${fade}`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={3} />
              Check: <M text={model.check} /> ✓
            </span>
            {steps > 0 && (
              <button type="button" onClick={() => setShown(0)} className={`${btn} px-3 py-1.5 text-[11px] text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800`}>
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} /> Again
              </button>
            )}
          </>
        ) : (
          <>
            <button type="button" onClick={() => setShown((n) => n + 1)} className={`${btn} px-4 py-2 text-xs bg-[#1cb0f6] border-b-[4px] border-[#1899d6] text-white hover:bg-[#159bd9] active:border-b-0 active:translate-y-[4px]`}>
              Next step <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </button>
            <button type="button" onClick={() => setShown(steps)} className={`${btn} px-3 py-2 text-[11px] text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800`}>
              <ChevronsDown className="w-3.5 h-3.5" strokeWidth={3} /> Show all
            </button>
            <span className="text-slate-400 dark:text-slate-500 font-bold">Step {shown} of {steps}</span>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * An expression's terms in their colours, then the x terms and the numbers collected.
 * `sums: false` shows only the terms, each labelled with its kind.
 */
export function TermGroups({ expr, sums = true, chips = true, isDisplayMode = false }) {
  const g = useMemo(() => groupModel(expr), [expr]);
  const chip = isDisplayMode ? 'text-[clamp(1.5rem,2.6vw,2.4rem)] px-4 py-1.5' : sums ? 'text-2xl px-3 py-1' : 'text-3xl px-3.5 py-1.5';
  const box = isDisplayMode ? 'text-[clamp(1.3rem,2.2vw,2rem)]' : 'text-xl sm:text-2xl';
  const label = isDisplayMode ? 'text-[clamp(0.8rem,1.2vw,1.1rem)]' : 'text-[11px]';
  return (
    <div className="w-full flex flex-col items-center gap-2">
      {chips && <div className="flex flex-wrap justify-center gap-1.5">
        {g.terms.map((t, i) => (
          <span key={i} className="inline-flex flex-col items-center gap-0.5">
            <M text={t.text} className={`${chip} rounded-xl border-2 font-semibold ${t.kind === 'x'
              ? 'bg-sky-50 border-sky-200 dark:bg-sky-900/30 dark:border-sky-800 ' + X
              : 'bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800 ' + N}`} />
            {!sums && <span className={`font-black uppercase tracking-widest ${label} ${t.kind === 'x' ? 'text-sky-700 dark:text-sky-300' : 'text-amber-700 dark:text-amber-300'}`}>{t.kind === 'x' ? 'x term' : 'number'}</span>}
          </span>
        ))}
      </div>}
      {sums && <div className="grid w-full max-w-xl grid-cols-2 gap-2">
        <div className="rounded-2xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 px-3 py-1.5 text-center">
          <div className={`font-black uppercase tracking-widest text-sky-700 dark:text-sky-300 ${label}`}>x terms</div>
          <M text={g.xSum} className={`${box} ${X} font-semibold`} />
        </div>
        <div className="rounded-2xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 text-center">
          <div className={`font-black uppercase tracking-widest text-amber-700 dark:text-amber-300 ${label}`}>Numbers</div>
          <M text={g.nSum} className={`${box} ${N} font-semibold`} />
        </div>
      </div>}
    </div>
  );
}

/** a(x ± b): an arrow from the a to each term inside, then the expanded form. */
export function ExpandArrows({ a, b, isDisplayMode = false }) {
  const ab = a * b;
  const sign = b < 0 ? '−' : '+';
  const size = isDisplayMode ? 'h-[clamp(5.5rem,10vw,8rem)]' : 'h-[5.5rem] sm:h-24';
  // Placed by hand for a one-digit a and b: the a, the bracket, x, the sign, b.
  const pos = { a: 18, open: 44, x: 62, sign: 94, b: 126, close: 150, eq: 190, ax: 230, rest: 294 };
  return (
    <svg viewBox="0 0 420 104" className={`${size} w-auto max-w-full`} role="img" aria-label={`${a} times x and ${a} times ${Math.abs(b)}`} style={MATH}>
      <defs>
        <marker id={`xa-head-${a}-${b}`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#db2777" />
        </marker>
      </defs>
      <path d={`M30 58 C 38 22, ${pos.x + 2} 18, ${pos.x + 10} 52`} fill="none" stroke="#db2777" strokeWidth="3" markerEnd={`url(#xa-head-${a}-${b})`} />
      <path d={`M30 58 C 44 2, ${pos.b - 6} 0, ${pos.b + 11} 52`} fill="none" stroke="#db2777" strokeWidth="3" markerEnd={`url(#xa-head-${a}-${b})`} />
      <text x={pos.a} y="90" fontSize="40" className="fill-slate-700 dark:fill-slate-200" fontWeight="600">{a}</text>
      <text x={pos.open} y="90" fontSize="40" className="fill-slate-400">(</text>
      <text x={pos.x} y="90" fontSize="40" fontStyle="italic" className="fill-[#1677c4] dark:fill-[#5cc4f7]" fontWeight="600">x</text>
      <text x={pos.sign} y="90" fontSize="40" className="fill-[#b45309] dark:fill-amber-300" fontWeight="600">{sign}</text>
      <text x={pos.b} y="90" fontSize="40" className="fill-[#b45309] dark:fill-amber-300" fontWeight="600">{Math.abs(b)}</text>
      <text x={pos.close} y="90" fontSize="40" className="fill-slate-400">)</text>
      <text x={pos.eq} y="90" fontSize="40" className="fill-slate-400">=</text>
      <text x={pos.ax} y="90" fontSize="40" className="fill-[#1677c4] dark:fill-[#5cc4f7]" fontWeight="600">{a}<tspan fontStyle="italic">x</tspan></text>
      <text x={pos.rest} y="90" fontSize="40" className="fill-[#b45309] dark:fill-amber-300" fontWeight="600">{sign} {Math.abs(ab)}</text>
    </svg>
  );
}
