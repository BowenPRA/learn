import { Plus, Minus } from 'lucide-react';
import { boxOrder, boxDomId as domId, focusBox } from './shortDivBoardHelpers';

/* ------------------------------------------------------------------ *
 * The bus stop, written the short way (utils/shortDivision.js).
 *
 *         0  8 . 2  8  5  7        quotient digits, one box per column
 *       ┌──────────────────
 *     7 │ 5 ⁵8 . ²0 ⁶0 ⁴0 ⁵0       each remainder in a small box up and to
 *                                  the LEFT of the next digit
 *
 * Drawn for the Bus Stop task (one column live at a time) and for the
 * `busstop` deck activity (every box live at once): the parent owns the
 * entries and says what state each box is in.
 *
 * Box ids: `q<c>` the quotient digit above column c; `k<c>` the carry written
 * on column c (the remainder carried INTO it), c ≥ 1; `r` the remainder after
 * the answer, on a whole-number item (model.remainderMode):
 *
 *         1  6  r 1
 *       ┌──────
 *     6 │ 9 ³7
 *
 * Props
 *   model      shortDivModel(item)
 *   zeros      zeros the student has added after the point
 *   entries    { [id]: text }
 *   stateOf    (id) => 'live' | 'good' | 'bad' | 'shown' | 'idle'
 *   onEdit     (id, text) => void
 *   onEnter    () => void
 *   onAddZero / onRemoveZero   omit (or null) to hide the button
 *   activeCol  the column being worked (tinted), or null
 *   uid        prefix for the inputs' DOM ids (focus is moved by id)
 *   ink        accent colour
 *   compact    narrower columns, and the zero buttons under the number — for
 *              the column beside a slide
 *   labels     { addZero, addZeroTip?, removeZero, top, carry, remainder } —
 *              aria / button text. `addZero` is written on the button beside
 *              the +0 (a word or two: "Add a zero"); `addZeroTip` is its tooltip.
 * ------------------------------------------------------------------ */

const TONE = {
  good: 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200',
  bad: 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300',
  shown: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200',
  idle: 'border-dashed border-slate-200 dark:border-slate-700 bg-transparent text-slate-300',
};

// roomy: the Bus Stop task — from `sm` the digits are big enough to read from
// the back of a classroom laptop (1280×720) and every box is a 44 px target.
const SIZES = {
  roomy: {
    col: 'w-11 sm:w-[3.75rem]', top: 'h-12 sm:h-[4.25rem]', bottom: 'h-14 sm:h-20', point: 'w-3 sm:w-5', dot: 'text-3xl sm:text-5xl',
    q: 'w-9 h-11 sm:w-[3.25rem] sm:h-[3.75rem] text-2xl sm:text-4xl', digit: 'text-3xl sm:text-5xl',
    carry: 'h-6 sm:h-8 text-sm sm:text-xl', carryW: ['w-5 sm:w-7', 'w-7 sm:w-10'], carryAt: '-left-1.5 top-0.5 sm:-left-2 sm:top-1',
    rem: 'h-11 sm:h-[3.75rem] text-2xl sm:text-4xl', remW: ['w-9 sm:w-[3.25rem]', 'w-12 sm:w-[4.5rem]'], r: 'text-2xl sm:text-4xl',
    btn: 'h-11', btnWord: 'text-[11px] sm:text-xs',
  },
  compact: {
    col: 'w-9 sm:w-10', top: 'h-11', bottom: 'h-14', point: 'w-2.5 sm:w-3', dot: 'text-3xl',
    q: 'w-8 h-10 sm:w-9 text-xl', digit: 'text-3xl',
    carry: 'h-6 text-sm', carryW: ['w-5', 'w-7'], carryAt: '-left-1.5 top-0.5',
    rem: 'h-10 text-xl', remW: ['w-8 sm:w-9', 'w-11 sm:w-12'], r: 'text-xl',
    btn: 'h-10', btnWord: 'text-[11px]',
  },
};

export default function ShortDivBoard({
  model, zeros = 0, entries = {}, stateOf, onEdit, onEnter, onAddZero, onRemoveZero,
  activeCol = null, uid = 'sd', ink = '#7c3aed', compact = false, labels = {},
}) {
  const S = compact ? SIZES.compact : SIZES.roomy;
  const avail = model.givenCols + zeros;
  const order = boxOrder(avail, model.remainderMode);
  const twoDigitCarry = model.divisor > 10;
  const hasPoint = avail > model.intLen;
  const digitOf = (c) => (c < model.cols.length ? model.cols[c].digit : 0);

  // After a digit is typed, move on to the next box that is live.
  const advance = (id) => {
    const i = order.indexOf(id);
    for (let j = i + 1; j < order.length; j += 1) {
      if (stateOf(order[j]) === 'live' || stateOf(order[j]) === 'bad') { focusBox(uid, order[j]); return; }
    }
  };
  // Enter checks; + or . adds a zero after the point, as the pencil would.
  const onKey = (e) => {
    if (e.key === 'Enter') onEnter?.();
    else if ((e.key === '+' || e.key === '.') && onAddZero) { e.preventDefault(); onAddZero(); }
  };
  const type = (id, raw, max) => {
    const text = raw.replace(/\D/g, '').slice(-max);      // a new digit replaces the old one
    onEdit(id, text);
    if (text.length === max) advance(id);
  };

  const qBox = (c) => {
    const id = `q${c}`;
    const st = stateOf(id);
    const editable = st === 'live' || st === 'bad';
    return (
      <input
        id={domId(uid, id)}
        value={entries[id] ?? ''}
        onChange={(e) => type(id, e.target.value, 1)}
        onKeyDown={onKey}
        readOnly={!editable}
        disabled={st === 'idle'}
        inputMode="numeric" autoComplete="off" aria-label={`${labels.top || 'answer digit'} ${c + 1}`}
        className={`${S.q} rounded-lg border-2 text-center font-mono font-black tabular-nums outline-none transition-colors
          ${TONE[st] || 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900'}`}
        style={st === 'live' ? { borderColor: ink } : undefined}
      />
    );
  };

  const carryBox = (c) => {
    const id = `k${c}`;
    const st = stateOf(id);
    const editable = st === 'live' || st === 'bad';
    const text = entries[id] ?? '';
    // A settled carry of 0 is simply not written.
    if ((st === 'good' || st === 'shown') && (!text || Number(text) === 0)) return null;
    if (st === 'idle') return null;
    // The remainder is written small, but the label round it is a finger-sized
    // target: a tap just beside the little box still lands in it.
    return (
      <label className={`absolute ${S.carryAt} -m-2.5 p-2.5 cursor-text`}>
        <input
          id={domId(uid, id)}
          value={text}
          onChange={(e) => type(id, e.target.value, twoDigitCarry ? 2 : 1)}
          onKeyDown={onKey}
          readOnly={!editable}
          inputMode="numeric" autoComplete="off" aria-label={`${labels.carry || 'remainder carried onto digit'} ${c + 1}`}
          className={`block ${S.carry} ${S.carryW[twoDigitCarry ? 1 : 0]} rounded-md border-[1.5px] text-center font-mono font-black leading-none tabular-nums outline-none transition-colors
            ${st === 'good' ? 'border-transparent bg-transparent text-orange-600 dark:text-orange-300'
              : st === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                : st === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300'
                  : 'border-orange-400 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-200 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900'}`}
        />
      </label>
    );
  };

  // The remainder, written after an r at the end of the answer (remainder items).
  const remBox = () => {
    const id = 'r';
    const st = stateOf(id);
    const editable = st === 'live' || st === 'bad';
    return (
      <input
        id={domId(uid, id)}
        value={entries[id] ?? ''}
        onChange={(e) => type(id, e.target.value, twoDigitCarry ? 2 : 1)}
        onKeyDown={onKey}
        readOnly={!editable}
        disabled={st === 'idle'}
        inputMode="numeric" autoComplete="off" aria-label={labels.remainder || 'remainder'}
        className={`${S.rem} ${S.remW[twoDigitCarry ? 1 : 0]} rounded-lg border-2 text-center font-mono font-black tabular-nums outline-none transition-colors
          ${TONE[st] || 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900'}`}
        style={st === 'live' ? { borderColor: ink } : undefined}
      />
    );
  };

  const point = (key, height) => (
    <div key={key} className={`${S.point} ${height} shrink-0 flex items-end justify-center pb-2 font-mono font-black ${S.dot} leading-none text-slate-800 dark:text-slate-100`}>.</div>
  );

  const top = [];
  const bottom = [];
  for (let c = 0; c < avail; c += 1) {
    if (hasPoint && c === model.intLen) {
      top.push(point('tp', S.top));
      bottom.push(point('bp', S.bottom));
    }
    const added = c >= model.givenCols;
    const active = c === activeCol;
    top.push(
      <div key={`t${c}`} className={`${S.col} ${S.top} shrink-0 flex items-center justify-center`}>{qBox(c)}</div>,
    );
    bottom.push(
      <div key={`b${c}`}
        className={`relative ${S.col} ${S.bottom} shrink-0 flex items-end justify-center pb-1 rounded-lg transition-colors ${active ? 'bg-violet-100/80 dark:bg-violet-900/30' : ''}`}>
        {c >= 1 && carryBox(c)}
        <span className={`font-mono font-black ${S.digit} tabular-nums leading-none ${added ? 'text-[#0087a8] dark:text-cyan-300' : 'text-slate-800 dark:text-slate-100'}`}>{digitOf(c)}</span>
      </div>,
    );
  }
  if (model.remainderMode) {
    top.push(
      <div key="rem" className={`${S.top} shrink-0 flex items-center gap-1.5 pl-1.5`}>
        <span className={`font-mono font-black ${S.r} leading-none text-slate-500 dark:text-slate-400`}>r</span>
        {remBox()}
      </div>,
    );
  }

  // The zero buttons sit at the end of the number, where the zero is written —
  // or, when there is no room beside it (a phone, a slide's side column), in a
  // row underneath. The +0 always says what it does in words too.
  const addWord = labels.addZero || 'add a zero';
  const addBtn = onAddZero && (
    <button type="button" onClick={onAddZero} aria-label={addWord} title={labels.addZeroTip || addWord}
      className={`${S.btn} pl-2 pr-3 rounded-xl border-2 border-dashed border-[#0087a8] text-[#0087a8] dark:border-cyan-400 dark:text-cyan-300 font-black flex items-center gap-1.5 whitespace-nowrap hover:bg-cyan-50 dark:hover:bg-cyan-900/20 active:translate-y-0.5 transition-all`}>
      <span className="flex items-center font-mono text-lg leading-none"><Plus className="w-4 h-4" strokeWidth={3} />0</span>
      <span className={`font-sans uppercase tracking-widest ${S.btnWord}`}>{addWord}</span>
    </button>
  );
  const removeBtn = onRemoveZero && (
    <button type="button" onClick={onRemoveZero} aria-label={labels.removeZero || 'take the last zero away'} title={labels.removeZero || 'take the last zero away'}
      className={`${S.btn} ${compact ? 'w-10' : 'w-12'} rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-mono font-black text-lg leading-none flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-0.5 transition-all`}>
      <Minus className="w-4 h-4" strokeWidth={3} />0
    </button>
  );
  const hasButtons = !!(onAddZero || onRemoveZero);

  // From `sm` the buttons sit beside the number; when the zeros have made the
  // number too long for that, they wrap onto a line of their own under it.
  // ("safe" keeps a board wider than the card scrollable from its left edge.)
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <div className="flex flex-wrap items-end justify-center gap-x-3 gap-y-2 pt-1 pb-1 pr-1" style={{ justifyContent: 'safe center' }}>
          <div className="shrink-0 flex items-end">
            {/* the divisor, outside the bus stop, level with the number */}
            <div className={`${S.bottom} flex items-end pb-1 pr-2 font-mono font-black ${S.digit} tabular-nums leading-none text-slate-800 dark:text-slate-100`}>
              {model.divisor}
            </div>
            <div>
              <div className="flex pl-2">{top}</div>
              <div className="flex pl-2 border-t-[3px] border-l-[3px] border-slate-800 dark:border-slate-200 rounded-tl-xl">{bottom}</div>
            </div>
          </div>
          {hasButtons && !compact && <div className="shrink-0 mb-1 hidden sm:flex items-center gap-1.5">{addBtn}{removeBtn}</div>}
        </div>
      </div>
      {hasButtons && <div className={`mt-2 items-center justify-center gap-2 ${compact ? 'flex' : 'flex sm:hidden'}`}>{addBtn}{removeBtn}</div>}
    </div>
  );
}
