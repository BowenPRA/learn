import { SafeInlineMath } from '../notes/SafeMath.jsx';
import { zerosFor, answerLine, allZeros, BLANK } from '../../utils/decOrder';

/* ------------------------------------------------------------------ *
 * Fill the Zeros — the numbers lined up at the point (utils/decOrder.js).
 *
 *        3 . 3 ┊0┊0┊         the digits as written, in ink
 *        3 . 2  5 ┊0┊        the zeros the student adds, in ORANGE (the
 *        3 . 0  5 ┊0┊        classroom deck's colour for a zero you write in)
 *        3 . 2  5  2         dashed boxes are gaps still to fill
 *
 * Drawn for the Fill the Zeros task and the `decorder` deck activity: the
 * parent owns the zeros and the order, and says what each row looks like.
 *
 * Props
 *   model     orderModel / compareModel (its `rows`, `maxDp`, `maxInt`)
 *   added     { [row]: zeros added }
 *   mode      'fill'  the dashed gaps are buttons (tap to fill up to there;
 *                     tap an orange zero to take it and the ones after it away)
 *             'order' each row is a button (tap to place it next)
 *             'pick'  each row is a button (tap to choose it)
 *             'view'  nothing to tap
 *   onFill    (row, zeros) => void
 *   onTap     (row) => void
 *   placed    row indices in the order tapped — shown as numbered badges
 *   picked    the row chosen in 'pick' mode
 *   toneOf    (row) => 'good' | 'bad' | 'shown' | null
 *   rowOrder  the order to draw the rows in (default: as written)
 *   ink       accent colour
 *   compact   smaller cells, for the column beside a slide
 *   aria      { fill, remove } — button labels
 * ------------------------------------------------------------------ */

export const ZERO = '#c25e12';

const TONE = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
};

const SIZE = {
  roomy: { cell: 'w-8 sm:w-11 h-10 sm:h-14 text-2xl sm:text-4xl', point: 'w-3 sm:w-5 h-10 sm:h-14 text-2xl sm:text-4xl', badge: 'w-7 h-7 text-xs', label: 'w-[4.5rem] sm:w-28 text-xs sm:text-sm' },
  compact: { cell: 'w-6 h-8 text-xl', point: 'w-2.5 h-8 text-xl', badge: 'w-6 h-6 text-[11px]', label: 'w-16 text-xs' },
};

export default function DecOrderBoard({
  model, added = {}, mode = 'view', onFill, onTap, placed = [], picked = null, toneOf = () => null,
  rowOrder = null, ink = '#1a5fa8', compact = false, aria = {},
}) {
  const S = compact ? SIZE.compact : SIZE.roomy;
  const rows = (rowOrder || model.rows.map((r) => r.i)).map((i) => model.rows[i]);
  const tappable = mode === 'order' || mode === 'pick';

  const digitCls = `${S.cell} shrink-0 flex items-center justify-center font-mono font-black tabular-nums text-slate-800 dark:text-slate-100`;
  const cells = (row) => {
    const n = Math.min(added[row.i] || 0, zerosFor(row, model.maxDp));
    const pad = Array.from({ length: model.maxInt - row.intText.length }, (_, k) => <span key={`p${k}`} className={`${S.cell} shrink-0`} />);
    const whole = row.intText.split('').map((d, k) => <span key={`i${k}`} className={digitCls}>{d}</span>);
    const point = (
      <span key="pt" className={`${S.point} shrink-0 flex items-end justify-center pb-1 font-mono font-black leading-none text-slate-800 dark:text-slate-100`}
        style={{ color: row.dp > 0 ? undefined : ZERO }}>
        {row.dp > 0 || n > 0 ? '.' : ''}
      </span>
    );
    const frac = Array.from({ length: model.maxDp }, (_, k) => {
      if (k < row.dp) return <span key={`f${k}`} className={digitCls}>{row.frac[k]}</span>;
      if (k < row.dp + n) {
        const zero = <span className="font-mono font-black tabular-nums" style={{ color: ZERO }}>0</span>;
        if (mode !== 'fill') return <span key={`f${k}`} className={`${S.cell} shrink-0 flex items-center justify-center`}>{zero}</span>;
        return (
          <button key={`f${k}`} type="button" onClick={() => onFill?.(row.i, k - row.dp)}
            aria-label={aria.remove || 'take this zero away'} title={aria.remove || 'take this zero away'}
            className={`${S.cell} shrink-0 flex items-center justify-center rounded-md hover:bg-orange-50 dark:hover:bg-orange-900/20`}>
            {zero}
          </button>
        );
      }
      if (mode !== 'fill') return <span key={`f${k}`} className={`${S.cell} shrink-0`} />;
      return (
        <button key={`f${k}`} type="button" onClick={() => onFill?.(row.i, k - row.dp + 1)}
          aria-label={aria.fill || 'fill with a zero'} title={aria.fill || 'fill with a zero'}
          className={`${S.cell} shrink-0 rounded-md border-2 border-dashed border-orange-300 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-900/10 hover:bg-orange-100 dark:hover:bg-orange-900/30 active:translate-y-0.5 transition-all`} />
      );
    });
    return [...pad, ...whole, point, ...frac];
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="mx-auto w-max flex flex-col gap-1.5 py-1">
        {rows.map((row) => {
          const pos = placed.indexOf(row.i);
          const tone = toneOf(row.i);
          const chosen = mode === 'pick' && picked === row.i;
          const body = (
            <>
              {(mode === 'order' || placed.length > 0) && (
                <span className={`${S.badge} shrink-0 rounded-full flex items-center justify-center font-black ${pos >= 0 ? 'text-white' : 'border-2 border-dashed border-slate-300 dark:border-slate-600 text-transparent'}`}
                  style={pos >= 0 ? { backgroundColor: ink } : undefined}>
                  {pos >= 0 ? pos + 1 : '·'}
                </span>
              )}
              {model.labelled && (
                <span className={`${S.label} shrink-0 truncate text-left font-bold text-slate-600 dark:text-slate-300`}>{row.label}</span>
              )}
              <span className="flex items-end">{cells(row)}</span>
              {model.unit && <span className="shrink-0 pl-1 text-sm sm:text-base font-bold text-slate-500 dark:text-slate-400">{model.unit}</span>}
            </>
          );
          const frame = `flex items-center gap-1.5 sm:gap-2 rounded-xl border-2 px-2 py-0.5 transition-all ${tone ? TONE[tone]
            : chosen ? 'border-transparent bg-sky-50 dark:bg-sky-900/20'
              : pos >= 0 ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                : 'border-transparent'}`;
          if (!tappable) return <div key={row.i} className={frame}>{body}</div>;
          return (
            <button key={row.i} type="button" onClick={() => onTap?.(row.i)}
              className={`${frame} ${tone ? '' : 'hover:border-slate-300 dark:hover:border-slate-600'} active:translate-y-0.5 cursor-pointer`}
              style={chosen && !tone ? { borderColor: ink } : undefined}>
              {body}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * A finished item, as it goes in the book: every zero filled, the rows in the
 * right order, and the answer line under them. A missing-digit item shows its
 * statement and the ten digits, the ones that fit in green.
 */
export function DecOrderFinal({ model, compact = false, ink = '#1a5fa8' }) {
  if (model.kind === 'digit') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
          <SafeInlineMath math={`${model.aText} ${model.sign} ${model.bText}`.replace(BLANK, '\\square')} />
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {Array.from({ length: 10 }, (_, d) => (
            <span key={d} className={`w-9 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-black text-xl
              ${model.works.includes(d) ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200' : 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 line-through'}`}>
              {d}
            </span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <DecOrderBoard model={model} added={allZeros(model)} mode="view" ink={ink} compact={compact}
        rowOrder={model.kind === 'order' ? model.order : null} />
      <div className="text-xl sm:text-2xl text-slate-900 dark:text-slate-100 overflow-x-auto max-w-full">
        <DecAnswerLine model={model} />
      </div>
    </div>
  );
}

/**
 * The finished answer as one line of maths: "3.05 < 3.25 < 3.3", "4.09 < 4.1",
 * or, for a missing digit, the statement and every digit that fits the box.
 */
export function DecAnswerLine({ model, className = '' }) {
  const line = model.kind === 'digit'
    ? `${model.aText} ${model.sign} ${model.bText}`.replace(BLANK, '\\square') + `\\qquad \\square = ${model.works.join(',\\,')}`
    : answerLine(model);
  return <span className={className}><SafeInlineMath math={line} /></span>;
}
