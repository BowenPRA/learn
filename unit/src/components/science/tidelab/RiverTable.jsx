import { tr } from '../../../utils/lang';
import { SLOTS } from '../../../utils/tideLabData';
import { T } from './tideLabText.js';

/* ------------------------------------------------------------------ *
 * Tide Lab: the results table, the shape the class draws (TABLE_BLANK in the
 * lab deck) — times down the side, the unit in the heading, so a box holds a
 * number only. One column for a day, or one per day.
 *   input  one box to type a reading in (the pole stage)
 *   find   tap a row to mark it the highest or the lowest
 * ------------------------------------------------------------------ */
const TEAL_TINT = '#e2f2f6';

export default function RiverTable({ columns, rows = [0, 1, 2, 3], lang, input = null, find = null }) {
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr);
  const many = columns.length > 1;
  const cell = 'border-2 border-[#a7b6bd] px-2 py-1.5 text-center';
  return (
    <table className="w-full table-fixed border-collapse text-slate-800 bg-white rounded-xl overflow-hidden" style={{ border: '3px solid #2b2b2b' }}>
      <thead>
        <tr style={{ background: TEAL_TINT }}>
          <th rowSpan={many ? 2 : 1} className={`${cell} w-[34%] sm:w-[28%] text-sm font-black`}>{t.time}</th>
          <th colSpan={columns.length} className={`${cell} text-sm font-black`}>{t.level_cm}</th>
        </tr>
        {many && (
          <tr style={{ background: TEAL_TINT }}>
            {columns.map((c, i) => <th key={i} className={`${cell} text-xs sm:text-sm font-black`}>{pick(c.head.en, c.head.fr)}</th>)}
          </tr>
        )}
      </thead>
      <tbody>
        {rows.map((r) => {
          const mark = find?.marks?.[r];
          return (
            <tr key={r}>
              <th className={`${cell} text-sm font-black whitespace-nowrap`} style={{ background: TEAL_TINT }}>{pick(SLOTS[r].en, SLOTS[r].fr)}</th>
              {columns.map((c, ci) => {
                if (input && input.col === ci && input.row === r) {
                  return (
                    <td key={ci} className={`${cell} p-1`}>
                      <input
                        type="text" inputMode="decimal" autoComplete="off" spellCheck={false} maxLength={7}
                        value={input.value} onChange={(e) => input.onChange(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') input.onEnter?.(); }}
                        aria-label={`${pick(SLOTS[r].en, SLOTS[r].fr)}, ${t.level_cm}`}
                        className={`w-full rounded-lg text-center text-lg font-black tabular-nums py-1 outline-none ring-2 focus:ring-4
                          ${input.state === 'ok' ? 'ring-[#58a700] bg-[#d7ffb8]' : input.state === 'bad' ? 'ring-rose-400 bg-rose-50' : 'ring-amber-300 focus:ring-amber-400 bg-amber-50'}`}
                      />
                    </td>
                  );
                }
                const v = c.values[r];
                if (find) {
                  return (
                    <td key={ci} className={`${cell} p-1`}>
                      <button type="button" onClick={() => find.onTap(r)}
                        className={`w-full rounded-lg py-1 text-lg font-black tabular-nums border-2 transition-colors
                          ${mark === 'hi' ? 'bg-sky-100 border-sky-500 text-sky-800' : mark === 'lo' ? 'bg-orange-100 border-orange-500 text-orange-800' : 'bg-white border-transparent hover:border-amber-400'}`}>
                        {v}
                        {mark && <span className="block text-[10px] font-black uppercase tracking-widest">{mark === 'hi' ? t.findHi : t.findLo}</span>}
                      </button>
                    </td>
                  );
                }
                return <td key={ci} className={`${cell} text-lg font-black tabular-nums`}>{v ?? ''}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
