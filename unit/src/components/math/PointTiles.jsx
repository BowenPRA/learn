import { GHOSTS, placedText } from '../../utils/pointBack';
import { tr } from '../../utils/lang';

/**
 * The digits of a whole-number product with a tappable gap between every two
 * tiles — "put the point back" (Year 7 Maths 4.3, utils/pointBack.js). Used by
 * the Point Out, Point Back task and the `pointback` deck activity.
 *
 * Two faded 0 tiles always stand to the left of the digits, whatever the
 * question, so an answer that needs a placeholder zero (8 → 0.08) can be made
 * without the row giving that away. A faded 0 turns solid when the chosen point
 * needs it: after the point as a placeholder, or as the 0 in front of "0.".
 *
 *   row     the digits, e.g. '864'
 *   k       the decimal places chosen (null: no point yet); 0 = after the last digit
 *   onPick  (k) => void; omit for a read-only row
 *   tone    null | 'good' | 'bad' | 'shown'
 *   compact the smaller row (a deck's side panel, the task's "write it" reminder)
 *   readout false: no number under the tiles (when the answer is written just below)
 *
 * Sizes: at most 7 tiles (utils/pointBack.js MAX_TILES) must fit a 390 px phone,
 * so the tiles only grow from `sm`. Each gap's tap area runs over the edges of
 * the tiles beside it (44 px wide from `sm`), without reaching the next gap's.
 */
const TONE = {
  good: { tile: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200', dot: '#58a700' },
  bad: { tile: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300', dot: '#e11d48' },
  shown: { tile: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200', dot: '#d97706' },
};
const POINT = '#c25e12';

const SIZE = {
  roomy: {
    tile: 'w-8 h-12 text-2xl sm:w-12 sm:h-16 sm:text-4xl',
    gap: 'w-3 sm:w-5 h-12 sm:h-16 pb-1.5 sm:pb-2.5',
    dot: 'w-2.5 h-2.5 sm:w-3.5 sm:h-3.5',
    read: 'text-2xl sm:text-3xl',
  },
  compact: {
    tile: 'w-7 h-10 text-xl sm:w-10 sm:h-12 sm:text-3xl',
    gap: 'w-3 sm:w-4 h-10 sm:h-12 pb-1.5',
    dot: 'w-2 h-2 sm:w-2.5 sm:h-2.5',
    read: 'text-xl sm:text-2xl',
  },
};

export default function PointTiles({ row, k = null, onPick, tone = null, lang = 'en', compact = false, readout = true }) {
  const digits = String(row).split('');
  const len = digits.length;
  const tiles = [...Array(GHOSTS).fill(null), ...digits];   // null = a faded 0
  const gc = k == null ? null : len + GHOSTS - k;          // the chosen gap's index
  const look = tone ? TONE[tone] : null;
  const size = compact ? SIZE.compact : SIZE.roomy;

  const gap = (gi) => {
    const kk = len + GHOSTS - gi;
    const chosen = gi === gc;
    const label = tr(lang, `Put the point here: ${placedText(BigInt(row), kk)}`, null, `Mets le point ici : ${placedText(BigInt(row), kk)}`);
    const dot = <span className={`block rounded-full ${size.dot}`} style={{ backgroundColor: look?.dot || POINT }} />;
    if (!onPick) {
      return <span key={`g${gi}`} className={`${size.gap} flex items-end justify-center`} aria-hidden="true">{chosen && dot}</span>;
    }
    return (
      <button key={`g${gi}`} type="button" onClick={() => onPick(kk)} aria-label={label} title={label} aria-pressed={chosen}
        className={`group relative ${size.gap} flex items-end justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400`}>
        {/* a wider, invisible hit area over the tile edges: a narrow gap is a small target for a finger */}
        <span className="absolute inset-y-0 -inset-x-3.5 z-10" aria-hidden="true" />
        {chosen ? dot : <span className={`block rounded-full opacity-0 group-hover:opacity-40 ${size.dot}`} style={{ backgroundColor: POINT }} />}
      </button>
    );
  };

  const out = [gap(0)];
  tiles.forEach((d, t) => {
    const ghost = d === null;
    // a faded 0 is needed when it sits after the point, or is the 0 of "0." in front of it
    const needed = ghost && gc != null && (t >= gc || (t === gc - 1 && k >= len));
    const style = ghost && !needed
      ? 'border-dashed border-slate-300 dark:border-slate-600 text-slate-300 dark:text-slate-600 bg-transparent'
      : ghost ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-200'
        : look ? look.tile : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100';
    out.push(
      <span key={`t${t}`} className={`${size.tile} rounded-lg sm:rounded-xl border-2 border-b-[4px] flex items-center justify-center font-mono font-black select-none ${style}`}>
        {ghost ? '0' : d}
      </span>,
    );
    out.push(gap(t + 1));
  });

  return (
    <div>
      <div className="flex items-end justify-center">{out}</div>
      {readout && (
        <div className={`mt-2 text-center ${compact ? 'min-h-[2rem]' : 'min-h-[2.25rem]'}`} aria-live="polite">
          {k != null && <span className={`font-mono font-black ${size.read} ${look ? '' : 'text-slate-800 dark:text-slate-100'}`} style={look ? { color: look.dot } : undefined}>{placedText(BigInt(row), k)}</span>}
        </div>
      )}
    </div>
  );
}

const CHIP = {
  estimate: 'bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200',
  product: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200',
  fact: 'bg-[#c25e12]/[0.07] dark:bg-orange-900/20 border-[#c25e12]/50 dark:border-orange-700 text-slate-800 dark:text-slate-100',
};

/**
 * A reminder set beside the tiles — the student's estimate, the whole-number
 * product, or the fact the digits come from — so the step can be done without
 * looking back at the question.
 */
export function PointReminder({ kind = 'product', icon: Icon, label, children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 text-sm sm:text-base font-black ${CHIP[kind] || CHIP.product}`}>
      {Icon && <Icon className="w-4 h-4 shrink-0" strokeWidth={3} />}
      {label && <span className="text-[10px] sm:text-[11px] uppercase tracking-widest opacity-80">{label}</span>}
      <span className="text-base sm:text-lg">{children}</span>
    </span>
  );
}
