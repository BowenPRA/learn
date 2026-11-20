import { useEffect } from 'react';
import { CheckCircle2, XCircle, Grid3x3, RotateCcw } from 'lucide-react';
import { tr } from '../../utils/lang';
import { SafeInlineMath } from '../notes/SafeMath.jsx';
import { timesTable, tableBoxId } from '../../utils/shortDivExtras';

/* ------------------------------------------------------------------ *
 * The Bus Stop's two optional stages (utils/shortDivExtras.js), drawn for
 * ShortDivision.jsx. Year 7 Maths 4.4 — English / French units, so the
 * interface text is `tr(lang, en, null, fr)` (English for any other language).
 *
 *   TimesTableCard   the divisor's times table, 1 × d … 9 × d. Editable in the
 *                    Table stage (row 1 given), read-only beside the bus stop
 *                    after it.
 *   InverseChoices   three calculations as buttons — the Check stage.
 * ------------------------------------------------------------------ */

const L = (lang, en, fr) => tr(lang, en, null, fr);

const CELL = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200',
  live: 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900',
};

/**
 * Props
 *   divisor   d
 *   entries   { [k]: text } for k = 2 … 9
 *   marks     { [k]: 'good' | 'bad' | 'shown' }
 *   editable  the Table stage (inputs), or read-only
 *   onEdit    (k, text) => void
 *   onEnter   () => void — Check, once no row is left blank
 *   compact   the read-only card beside the bus stop
 */
export function TimesTableCard({ divisor, entries = {}, marks = {}, editable = false, onEdit, onEnter, compact = false, uid = 'busstop', lang = 'en', ink = '#7c3aed' }) {
  const rows = timesTable(divisor);
  const firstOpen = rows.find((r) => r.k > 1 && marks[r.k] !== 'good' && marks[r.k] !== 'shown');

  // The cursor starts in the first row still to write.
  useEffect(() => {
    if (!editable || !firstOpen) return;
    document.getElementById(tableBoxId(uid, firstOpen.k))?.focus();
    // only when the stage opens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable]);

  const onKey = (k) => (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    // Enter goes on to the next empty row, and checks once every row is written.
    const blank = rows.find((r) => r.k > k && !String(entries[r.k] ?? '').trim() && marks[r.k] !== 'good');
    if (blank) document.getElementById(tableBoxId(uid, blank.k))?.focus();
    else onEnter?.();
  };

  const row = ({ k, value }) => {
    const st = k === 1 ? 'given' : marks[k] || (editable ? 'live' : 'given');
    const text = k === 1 ? String(value) : (st === 'given' ? String(value) : entries[k] ?? '');
    return (
      <div key={k} className={`flex items-center gap-1.5 font-mono font-black tabular-nums ${compact ? 'text-sm' : `text-lg sm:text-xl ${editable ? 'min-h-[2.75rem]' : ''}`} text-slate-700 dark:text-slate-200`}>
        <span className={`${compact ? 'w-12' : 'w-16'} text-right whitespace-nowrap`}>{k} × {divisor}</span>
        <span className="text-slate-400">=</span>
        {k === 1 || st === 'given' || !editable || st === 'good' || st === 'shown' ? (
          <span className={`${compact ? 'min-w-[2.5rem] px-1' : 'min-w-[3.5rem] px-2 py-0.5'} rounded-lg border-2 text-center ${k === 1 || st === 'given' || (compact && st === 'good') ? 'border-transparent' : CELL[st] || 'border-transparent'}`}
            style={k === 1 && !compact ? { color: ink } : undefined}>
            {text}
          </span>
        ) : (
          <input
            id={tableBoxId(uid, k)}
            value={text}
            onChange={(e) => onEdit?.(k, e.target.value.replace(/\D/g, '').slice(0, 4))}
            onKeyDown={onKey(k)}
            inputMode="numeric" autoComplete="off" spellCheck={false} placeholder="?"
            aria-label={`${k} × ${divisor}`}
            className={`w-[4.75rem] h-11 px-2 rounded-lg border-2 border-b-[3px] text-center font-mono font-black outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-600 ${CELL[st] || CELL.live}`}
          />
        )}
      </div>
    );
  };

  return (
    <div className={`rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm ${compact ? 'p-3' : 'p-3 sm:p-4'}`} style={{ borderColor: compact ? undefined : ink }}>
      <div className="flex items-center gap-2 mb-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
        <Grid3x3 className="w-4 h-4" style={{ color: ink }} strokeWidth={3} />
        {L(lang, `The ${divisor} times table`, `La table de ${divisor}`)}
      </div>
      <div className={`grid grid-cols-2 ${compact ? 'gap-x-3 gap-y-0.5' : 'gap-x-4 gap-y-1.5'}`}>
        <div className={`flex flex-col ${compact ? 'gap-0.5' : 'gap-1.5'}`}>{rows.slice(0, 5).map(row)}</div>
        <div className={`flex flex-col ${compact ? 'gap-0.5' : 'gap-1.5'}`}>{rows.slice(5).map(row)}</div>
      </div>
    </div>
  );
}

/**
 * Props
 *   choices   inverseChoices(model): [{ val, latex }]
 *   marks     { [val]: 'good' | 'bad' | 'shown' }
 *   onPick    (val) => void
 *   disabled  once settled
 */
export function InverseChoices({ choices, marks = {}, onPick, disabled = false }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {choices.map((c) => {
        const st = marks[c.val];
        return (
          <button key={c.val} type="button" disabled={disabled || st === 'bad'} onClick={() => onPick?.(c.val)}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 border-b-[4px] text-xl transition-all active:border-b-2 active:translate-y-[2px] disabled:cursor-default
              ${st ? CELL[st] : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-violet-400'}`}>
            {st === 'good' && <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} />}
            {st === 'bad' && <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
            <SafeInlineMath math={c.latex} />
          </button>
        );
      })}
    </div>
  );
}

/** The finished check, for the "copy this into your book" panel. */
export function InverseDone({ model, product, lang = 'en', ink = '#7c3aed' }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-2 border-dashed p-3" style={{ borderColor: ink }}>
      <RotateCcw className="w-5 h-5 shrink-0" style={{ color: ink }} strokeWidth={3} />
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{L(lang, 'Check', 'Vérification')}</div>
      <div className="text-lg text-slate-900 dark:text-slate-100"><SafeInlineMath math={`${model.answerText} \\times ${model.divisor} = ${product}`} /></div>
      <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{L(lang, 'back to where you started', 'on retrouve le nombre de départ')}</div>
    </div>
  );
}
