import { boxDomId as domId, focusBox } from './shortDivBoardHelpers';

/* ------------------------------------------------------------------ *
 * Line Up the Points — the written column sum on squared paper
 * (utils/decColumn.js). One character per square, the point included,
 * so a whole number's point is a square of its own at its end.
 *
 *          ⁰ ⁹ ¹⁰          exchanges: the top digit struck through, its new value above
 *        1 . 0 0           the top number (orange: zeros and a point written in)
 *      − 0 . 7 2           the bottom number — slides left / right while lining up
 *      ─────────
 *        0 . 2 8           the answer, one box per square; the point drops straight down
 *          ¹               carries (+): small, under the answer, in the column they go into
 *
 * Drawn by the Line Up task and the `deccol` deck activity; the parent owns
 * every piece of state and says what each box is doing.
 *
 * Props
 *   m          calcModel(calc)
 *   stage      'line' | 'fill' | 'cols' | 'done'
 *   shift      squares the bottom number sits from its place (line stage)
 *   filled     Set of 'a:<cell>' / 'b:<cell>' written in
 *   tops       { [place]: value } — the top digits after exchanges (−)
 *   entries    { d<cell>: digit, c<cell>: carry, pt: '.' }
 *   stateOf    (id) => 'live' | 'good' | 'bad' | 'shown' | 'idle'
 *   active     the cell being worked, or null
 *   onTapGap(row, cell) · onTapTop(place) · onEdit(id, text) · onEnter() · onDropPoint()
 *   compact    narrower squares (beside a slide)
 *   uid, ink, labels { digit, carry, point, gap, top }
 * ------------------------------------------------------------------ */

const ORANGE = 'text-[#c25e12] dark:text-orange-300';
const TONE = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200',
  idle: 'border-dashed border-slate-200 dark:border-slate-700 bg-transparent text-slate-300 dark:text-slate-600',
};
// roomy: the task — big squares from sm (a 9-square slide still fits the
// right-hand card at 1024 px); compact: the column beside a deck slide (and,
// on a phone, the footer under it, where 8 squares must fit 330 px).
// Every box a student taps is 44 px or more on a laptop (the carry box's
// whole square takes the tap, not only the small box drawn in it).
const SIZES = {
  roomy: {
    cell: 'w-8 sm:w-14', row: 'h-10 sm:h-16', digit: 'text-2xl sm:text-5xl', box: 'w-7 h-9 sm:w-12 sm:h-14 text-xl sm:text-4xl',
    small: 'h-5 sm:h-7 text-xs sm:text-xl', carry: 'w-6 h-6 sm:w-9 sm:h-9 text-sm sm:text-xl', carryRow: 'h-8 sm:h-11', op: 'w-6 sm:w-10',
    point: 'w-7 h-9 sm:w-11 sm:h-14 text-2xl sm:text-4xl', ghost: 'w-6 h-6 sm:w-9 sm:h-9', ghostDot: 'text-xl sm:text-3xl',
  },
  compact: {
    cell: 'w-8 sm:w-10', row: 'h-10 sm:h-11', digit: 'text-2xl sm:text-3xl', box: 'w-7 h-9 sm:w-8 sm:h-10 text-xl sm:text-2xl',
    small: 'h-5 text-xs sm:text-sm', carry: 'w-6 h-6 sm:w-7 sm:h-7 text-sm sm:text-base', carryRow: 'h-7 sm:h-8', op: 'w-6 sm:w-7',
    point: 'w-7 h-9 sm:w-8 sm:h-10 text-2xl', ghost: 'w-6 h-6 sm:w-7 sm:h-7', ghostDot: 'text-xl',
  },
};

export default function DecColumnBoard({
  m, stage, shift = 0, filled = new Set(), tops = {}, entries = {}, stateOf = () => 'idle', active = null,
  onTapGap, onTapTop, onEdit, onEnter, onDropPoint, compact = false, uid = 'dc', ink = '#0087a8', labels = {},
}) {
  const S = compact ? SIZES.compact : SIZES.roomy;
  const lining = stage === 'line';
  const from = lining ? m.windowFrom : 0;
  const to = lining ? m.windowTo : m.width - 1;
  const cells = [];
  for (let c = from; c <= to; c += 1) cells.push(c);
  const inGrid = (c) => c >= 0 && c < m.width;
  const working = stage === 'cols' || stage === 'done';
  const sub = m.op === '−';

  // What sits in a square of the top (a) or bottom (b) row.
  const charAt = (row, c) => {
    const R = m[row];
    const at = c - (row === 'b' && lining ? shift : 0);
    const ch = R.chars.find((k) => k.cell === at);
    if (ch) return { ch: ch.ch, p: ch.p, own: true };
    if (!lining && filled.has(`${row}:${c}`)) {
      const g = m.gaps[row].find((k) => k.cell === c);
      return { ch: g ? g.ch : '0', written: true, p: g?.p };
    }
    if (!R.hasPoint && at === m.pointCell && lining) return { ch: '.', ghost: true };
    return null;
  };
  const placeOfCell = (c) => (c === m.pointCell ? 'pt' : c < m.pointCell ? m.hi - c : m.hi + 1 - c);

  const pointTint = (c) => (lining && c === m.pointCell ? 'bg-orange-50 dark:bg-orange-900/20' : '');
  const activeTint = (c) => (c === active ? 'bg-sky-100/80 dark:bg-sky-900/30' : '');
  const paper = (c) => (inGrid(c) || lining ? 'border border-slate-100 dark:border-slate-800' : '');

  // Enter checks the step. It stops here: a Notes slide listens for Enter to
  // turn the page, and the box it was typed in may be gone by the time the
  // key reaches the window (the finished sum is redrawn).
  const enterKey = (e) => { if (e.key === 'Enter') { e.stopPropagation(); onEnter?.(); } };

  const digitSpan = (text, cls = '') => (
    <span className={`font-mono font-black ${S.digit} leading-none tabular-nums ${cls}`}>{text}</span>
  );

  const rowCell = (row, c) => {
    const k = charAt(row, c);
    const p = placeOfCell(c);
    const isPoint = k?.ch === '.';
    const colour = k?.ghost ? 'text-orange-300 dark:text-orange-500/70' : k?.written ? ORANGE
      : lining && isPoint ? ORANGE : 'text-slate-800 dark:text-slate-100';
    // Exchanges (−): the top digit is a button while the columns are worked.
    if (row === 'a' && sub && working && k && !isPoint && typeof p === 'number') {
      const now = tops[p];
      const start = m.digitAt('a', p) ?? 0;
      const struck = now !== undefined && now !== start;
      return (
        <button type="button" key={c} onClick={() => onTapTop?.(p)} disabled={stage !== 'cols'}
          aria-label={`${labels.top || 'top digit'} ${k.ch}`}
          className={`relative ${S.cell} ${S.row} shrink-0 flex items-center justify-center rounded-md ${paper(c)} ${activeTint(c)} enabled:hover:bg-orange-50 dark:enabled:hover:bg-orange-900/20 enabled:cursor-pointer`}>
          {digitSpan(k.ch, `${colour} ${struck ? 'opacity-60' : ''}`)}
          {struck && <span className="absolute left-1.5 right-1.5 top-1/2 h-[3px] -rotate-[30deg] rounded bg-[#c25e12] dark:bg-orange-300" />}
        </button>
      );
    }
    // A gap the student can write in (fill stage): any empty square of the grid.
    if (stage === 'fill' && inGrid(c) && (!k || k.written)) {
      const ch = c === m.pointCell ? '.' : '0';
      return (
        <button type="button" key={c} onClick={() => onTapGap?.(row, c)} aria-label={`${labels.gap || 'write in'} ${ch}`}
          className={`${S.cell} ${S.row} shrink-0 flex items-center justify-center rounded-md border-2 border-dashed transition-colors
            ${k ? 'border-orange-300 bg-orange-50 dark:bg-orange-900/20' : 'border-slate-300 dark:border-slate-600 hover:border-orange-400 hover:bg-orange-50/60 dark:hover:bg-orange-900/10'}`}>
          {k && digitSpan(k.ch, ORANGE)}
        </button>
      );
    }
    return (
      <div key={c} className={`${S.cell} ${S.row} shrink-0 flex items-center justify-center rounded-md ${paper(c)} ${pointTint(c)} ${activeTint(c)}`}>
        {k && (k.ghost
          ? <span className={`flex items-center justify-center ${S.ghost} rounded-full border-2 border-dashed border-orange-300 ${colour}`}><span className={`font-mono font-black leading-none ${S.ghostDot}`}>.</span></span>
          : digitSpan(k.ch, colour))}
      </div>
    );
  };

  // The answer row: a digit box per column, and the point's square.
  const answerCell = (c) => {
    if (!working || !inGrid(c)) return <div key={c} className={`${S.cell} ${S.row} shrink-0`} />;
    if (c === m.pointCell) {
      const st = stateOf('pt');
      const dropped = entries.pt === '.';
      if (dropped || st !== 'live') {
        return (
          <div key={c} className={`${S.cell} ${S.row} shrink-0 flex items-center justify-center ${activeTint(c)}`}>
            {dropped && digitSpan('.', st === 'shown' ? 'text-amber-600' : 'text-slate-800 dark:text-slate-100')}
          </div>
        );
      }
      return (
        <div key={c} className={`${S.cell} ${S.row} shrink-0 flex items-center justify-center ${activeTint(c)}`}>
          <button type="button" id={domId(uid, 'pt')} onClick={onDropPoint} aria-label={labels.point || 'drop the point'}
            className={`${S.point} rounded-lg border-2 border-dashed font-mono font-black leading-none animate-pulse dark:brightness-150`}
            style={{ borderColor: ink, color: ink }}>.</button>
        </div>
      );
    }
    const id = `d${c}`;
    const st = stateOf(id);
    const editable = st === 'live' || st === 'bad';
    return (
      <div key={c} className={`${S.cell} ${S.row} shrink-0 flex items-center justify-center ${activeTint(c)}`}>
        <input
          id={domId(uid, id)}
          value={entries[id] ?? ''}
          onChange={(e) => {
            const t = e.target.value.replace(/\D/g, '').slice(-1);
            onEdit?.(id, t);
            const next = `c${m.cellOf(placeOfCell(c) + 1)}`;
            if (t && stateOf(next) === 'live') focusBox(uid, next);
          }}
          onKeyDown={enterKey}
          readOnly={!editable}
          disabled={st === 'idle'}
          inputMode="numeric" autoComplete="off" aria-label={`${labels.digit || 'answer digit'} ${c + 1}`}
          className={`${S.box} rounded-lg border-2 text-center font-mono font-black tabular-nums outline-none transition-colors
            ${TONE[st] || 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900'}`}
          style={st === 'live' ? { borderColor: ink } : undefined}
        />
      </div>
    );
  };

  // Carries (+): a small box under the answer, in the column the carry goes into.
  // The row keeps one height, so the sum does not jump when the first box opens;
  // a tap anywhere in the box's square puts the cursor in it.
  const carryCell = (c) => {
    const id = `c${c}`;
    const st = stateOf(id);
    const text = entries[id] ?? '';
    if (st === 'idle' || ((st === 'good' || st === 'shown') && !text)) return <div key={c} className={`${S.cell} ${S.carryRow} shrink-0`} />;
    const editable = st === 'live' || st === 'bad';
    return (
      <div key={c} className={`${S.cell} ${S.carryRow} shrink-0 flex items-start justify-center pt-0.5 ${editable ? 'cursor-text' : ''}`}
        onClick={editable ? (e) => { if (e.target === e.currentTarget) focusBox(uid, id); } : undefined}>
        <input
          id={domId(uid, id)}
          value={text}
          onChange={(e) => onEdit?.(id, e.target.value.replace(/\D/g, '').slice(-1))}
          onKeyDown={enterKey}
          readOnly={!editable}
          inputMode="numeric" autoComplete="off" aria-label={`${labels.carry || 'carry'} ${c + 1}`}
          className={`${S.carry} rounded-md border-[1.5px] text-center font-mono font-black leading-none tabular-nums outline-none
            ${st === 'good' ? 'border-transparent bg-transparent text-[#c25e12] dark:text-orange-300'
              : st === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                : st === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300'
                  : 'border-orange-400 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-200'}`}
        />
      </div>
    );
  };

  // Exchanges (−): the new value, small, above a struck top digit.
  const exchangeCell = (c) => {
    const p = placeOfCell(c);
    const now = typeof p === 'number' ? tops[p] : undefined;
    const start = typeof p === 'number' ? (m.digitAt('a', p) ?? 0) : undefined;
    const show = now !== undefined && now !== start;
    return (
      <div key={c} className={`${S.cell} ${S.small} shrink-0 flex items-end justify-center`}>
        {show && <span className={`font-mono font-black leading-none ${ORANGE}`}>{now}</span>}
      </div>
    );
  };

  const opCell = (key, text, h = S.row) => (
    <div key={key} className={`${S.op} ${h} shrink-0 flex items-center justify-center`}>
      {text && <span className={`font-mono font-black ${S.digit} leading-none text-slate-700 dark:text-slate-200`}>{text}</span>}
    </div>
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="mx-auto w-fit select-none py-1">
        {sub && working && <div className="flex">{opCell('xo', '', S.small)}{cells.map(exchangeCell)}</div>}
        <div className="flex">{opCell('ao', '')}{cells.map((c) => rowCell('a', c))}</div>
        <div className="flex">
          {opCell('bo', m.op)}
          {cells.map((c) => rowCell('b', c))}
        </div>
        <div className="flex">
          <div className={`${S.op} shrink-0`} />
          {cells.map((c) => <div key={c} className={`${S.cell} shrink-0 h-[3px] ${inGrid(c) || lining ? 'bg-slate-800 dark:bg-slate-200' : ''} ${lining ? 'opacity-30' : ''}`} />)}
        </div>
        {/* The answer row and the carries come with the columns (so the arrows of
            the slide sit right under the number they move); a finished sum
            with nothing carried has no carry row. */}
        {working && <div className="flex">{opCell('ro', '')}{cells.map(answerCell)}</div>}
        {!sub && working && (stage !== 'done' || cells.some((c) => entries[`c${c}`])) && (
          <div className="flex">{opCell('co', '', S.carryRow)}{cells.map(carryCell)}</div>
        )}
      </div>
    </div>
  );
}
