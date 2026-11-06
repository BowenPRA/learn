import { useEffect, useRef, useState } from 'react';
import { columnName } from '../../utils/rounding';
import { tr } from '../../utils/lang';

/* ------------------------------------------------------------------ *
 * A place-value table whose digits slide (utils/placeShift.js).
 *
 *    Th    H    T    O  •  t    h    th
 *   1000  100   10   1     0.1 0.01 0.001
 *    [7]  [2]  (0)  (0)                      7.2 × 10³: the digits moved
 *                                            three columns left, the point
 *                                            stayed, two placeholders appeared
 *
 * The decimal point is part of the table, not of the number: it is drawn once,
 * between the ones and the tenths, and never moves. The digits are chips that
 * glide to `place + offset`.
 *
 * Props
 *   cols          [hi … lo] place exponents, left to right
 *   digits        { place: digit } — the number as it starts
 *   offset        places the digits have moved: + left, − right
 *   placeholders  places (after the move) that need a 0
 *   filled        write the placeholder zeros in (orange) instead of leaving gaps
 *   dropped       places (after the move) whose zeros fall off the end
 *   target        { place: digit } — a ghost row the digits must line up with
 *   tone          'good' | 'bad' | null — tints the chips after a check
 *   roomy         wider columns when there is room (the task; not a slide's side column)
 *   lang
 *
 * The columns are sized to the space the table is given (a slide's side column
 * on a small laptop, a phone), between 24 and 42 px (48 when `roomy`), so a
 * twelve-column table never needs a scroll bar.
 * ------------------------------------------------------------------ */

const ABBR = { 6: 'M', 5: 'HTh', 4: 'TTh', 3: 'Th', 2: 'H', 1: 'T', 0: 'O', '-1': 't', '-2': 'h', '-3': 'th', '-4': 'tth', '-5': 'hth' };
const VALUE = { 6: '10⁶', 5: '10⁵', 4: '10⁴', 3: '1000', 2: '100', 1: '10', 0: '1', '-1': '0.1', '-2': '0.01', '-3': '0.001', '-4': '0.0001', '-5': '0.00001' };

const PW = 16;                                   // the gap the decimal point sits in, px
const MIN_COL = 24;

export default function PlaceTable({
  cols, digits, offset = 0, placeholders = [], filled = false, dropped = [], target = null, tone = null, lang = 'en', roomy = false,
}) {
  const hi = cols[0];
  const indexOf = (k) => hi - k;                                     // column index of a place
  const hasPoint = cols[cols.length - 1] < 0;

  // Measure the room and size the columns to it.
  const box = useRef(null);
  const [room, setRoom] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver((entries) => setRoom(Math.floor(entries[0].contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const widest = roomy ? 48 : 42;
  const fit = room ? Math.floor((room - (hasPoint ? PW : 0) - 6) / cols.length) : widest;
  const cw = Math.max(MIN_COL, Math.min(widest, fit));
  const rowH = Math.min(58, cw + 12);
  const left = (k) => indexOf(k) * cw + (k < 0 ? PW : 0);
  const width = cols.length * cw + (hasPoint ? PW : 0);
  const chip = { width: cw - 6, height: rowH - 10, marginLeft: 3, top: 4, fontSize: Math.round(cw * 0.62) };

  const chipTone = tone === 'good' ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]'
    : tone === 'bad' ? 'bg-rose-50 border-rose-400 text-rose-700'
      : 'bg-white dark:bg-slate-900 border-slate-400 dark:border-slate-500 text-slate-900 dark:text-slate-100';

  const header = (
    <div className="relative" style={{ width, height: cw >= 34 ? 46 : 32 }}>
      {cols.map((k) => {
        const name = columnName(k);
        return (
          <div key={k} title={tr(lang, name.en, name.vn, name.fr)}
            className={`absolute top-0 h-full flex flex-col items-center justify-center border-x border-slate-200 dark:border-slate-700 ${k >= 0 ? 'bg-sky-50 dark:bg-sky-900/20' : 'bg-amber-50 dark:bg-amber-900/10'}`}
            style={{ left: left(k), width: cw }}>
            <span className="font-black text-slate-700 dark:text-slate-200 leading-none" style={{ fontSize: Math.max(9, Math.min(14, Math.round(cw * 0.32))) }}>{ABBR[k]}</span>
            {cw >= 34 && <span className="mt-1 font-mono font-bold text-slate-400 leading-none" style={{ fontSize: Math.max(7, Math.round(cw * 0.21)) }}>{VALUE[k]}</span>}
          </div>
        );
      })}
    </div>
  );

  const pointMark = hasPoint && (
    <div className="absolute top-0 bottom-0 flex items-end justify-center pointer-events-none"
      style={{ left: (indexOf(0) + 1) * cw, width: PW }}>
      <span className="block w-2.5 h-2.5 mb-2 rounded-full bg-slate-900 dark:bg-slate-100" />
    </div>
  );

  const lanes = (
    <div className="absolute inset-0 pointer-events-none">
      {cols.map((k) => (
        <div key={k} className="absolute top-0 bottom-0 border-x border-dashed border-slate-200 dark:border-slate-700/70"
          style={{ left: left(k), width: cw }} />
      ))}
    </div>
  );

  const cell = 'absolute rounded-lg border-2 flex items-center justify-center font-mono font-black tabular-nums leading-none';

  return (
    <div ref={box} className="w-full overflow-x-auto">
      <div className="mx-auto w-max rounded-xl border-2 border-slate-300 dark:border-slate-600 overflow-hidden bg-white dark:bg-slate-900">
        {header}
        <div className="relative border-t-2 border-slate-300 dark:border-slate-600" style={{ width, height: rowH }}>
          {lanes}
          {placeholders.map((k) => (
            <div key={`ph${k}`}
              className={`${cell} ${filled ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 animate-in fade-in zoom-in-75' : 'border-dashed border-orange-300 dark:border-orange-700 text-transparent'}`}
              style={{ ...chip, left: left(k) }}>0</div>
          ))}
          {Object.entries(digits).map(([k, d]) => {
            const at = Number(k) + offset;
            const gone = dropped.includes(at);
            return (
              <div key={k}
                className={`${cell} border-b-[4px] shadow-sm transition-[left,opacity] duration-300 ease-out ${chipTone} ${gone ? 'opacity-25' : ''}`}
                style={{ ...chip, left: left(at) }}>{d}</div>
            );
          })}
          {pointMark}
        </div>
        {target && (
          <div className="relative border-t-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50" style={{ width, height: rowH }}>
            {lanes}
            {Object.entries(target).map(([k, d]) => (
              <div key={k} className={`${cell} border-dashed border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500`} style={{ ...chip, left: left(Number(k)) }}>{d}</div>
            ))}
            {pointMark}
          </div>
        )}
      </div>
    </div>
  );
}
