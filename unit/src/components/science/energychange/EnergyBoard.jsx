import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { ENERGIES, ENERGY_IDS, lineLength, skeleton } from '../../../utils/energyChange';
import { pose } from '../../../data/Y7_SCI/U03_6/art35.js';
import { T } from './energyChangeText.js';

/* ------------------------------------------------------------------ *
 * The energy-change diagram as boxes and arrows, and the palette of the
 * eight energies. HTML, not one wide SVG, so it fits a phone: a line of
 * boxes runs across when there is room and downwards when there is not;
 * the outputs of a branch sit under (or beside) the box they come from.
 * Box text is English (it is what the class writes), with the French under it
 * in French. 3.5's eight action figures mark the palette.
 * ------------------------------------------------------------------ */
const TRANSFERS = ['electrical', 'sound', 'light'];
const tone = (e) => (TRANSFERS.includes(e) ? 'text-[#5c2483] dark:text-purple-300' : 'text-[#00697f] dark:text-teal-300');

function useWidth() {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fit = () => setW(el.getBoundingClientRect().width);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

/** One box. `mark`: 'ok' | 'bad' | 'locked' | undefined. */
function Box({ e, lang, active, mark, onClick, small = false }) {
  const look = mark === 'locked' || mark === 'ok'
    ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700]'
    : mark === 'bad' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400'
      : active ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-400 ring-2 ring-amber-300 ring-offset-1 dark:ring-offset-slate-900'
        : e ? 'bg-white dark:bg-slate-800 border-slate-700 dark:border-slate-400' : 'bg-slate-50 dark:bg-slate-800/60 border-dashed border-slate-300 dark:border-slate-600';
  return (
    <button type="button" onClick={onClick} disabled={!onClick}
      className={`relative rounded-xl border-2 px-1.5 ${small ? 'py-1 min-h-[2.75rem]' : 'py-1.5 min-h-[3.25rem]'} w-full flex flex-col items-center justify-center text-center leading-tight transition-colors ${look} ${onClick ? 'cursor-pointer' : 'cursor-default'}`}>
      {e ? (
        <>
          <span className={`font-black ${small ? 'text-xs' : 'text-sm'} ${tone(e)}`}>{ENERGIES[e].en}</span>
          {lang === 'fr' && <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{ENERGIES[e].fr}</span>}
        </>
      ) : (
        <span className="text-xl font-black text-slate-300 dark:text-slate-600">?</span>
      )}
    </button>
  );
}

/**
 * The diagram. `shape` decides how the boxes are joined; `fill[i]` is box i's
 * energy; `active` the box being filled; `marks[i]` how box i looks.
 */
export function Diagram({ shape, n, fill = [], active = -1, marks = {}, lang, onBox, compact = false }) {
  const [ref, w] = useWidth();
  const c = lineLength(shape, n);
  const outs = Array.from({ length: n - c }, (_, k) => c + k);
  const across = w >= (outs.length ? 150 * (c + 1) + 40 * c : 150 * c + 40 * (c - 1));
  const small = compact || !across;
  const box = (i) => (
    <Box key={i} e={fill[i]} lang={lang} active={i === active} mark={marks[i]} small={small} onClick={onBox ? () => onBox(i) : undefined} />
  );
  const Arrow = across ? ArrowRight : ArrowDown;
  return (
    <div ref={ref} className="w-full">
      {across ? (
        <div className="flex items-center gap-1.5">
          {Array.from({ length: c }, (_, i) => (
            <div key={i} className="flex items-center gap-1.5 flex-1 min-w-0">
              <div className="flex-1 min-w-0">{box(i)}</div>
              {(i + 1 < c || outs.length > 0) && <Arrow className="w-6 h-6 shrink-0 text-slate-600 dark:text-slate-300" strokeWidth={3} />}
            </div>
          ))}
          {outs.length > 0 && (
            <div className="flex-1 min-w-0 relative pl-3">
              {outs.length > 1 && <div className="absolute left-0 border-l-[3px] border-slate-600 dark:border-slate-300" style={{ top: `${50 / outs.length}%`, bottom: `${50 / outs.length}%` }} />}
              <div className="flex flex-col gap-1.5">
                {outs.map((i) => (
                  <div key={i} className="flex items-center gap-1">
                    <ArrowRight className="w-4 h-4 shrink-0 -ml-3 text-slate-600 dark:text-slate-300" strokeWidth={3} />
                    <div className="flex-1 min-w-0">{box(i)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          {Array.from({ length: c }, (_, i) => (
            <div key={i} className="w-full max-w-[15rem] flex flex-col items-center gap-1">
              {box(i)}
              {i + 1 < c && <ArrowDown className="w-5 h-5 text-slate-600 dark:text-slate-300" strokeWidth={3} />}
            </div>
          ))}
          {outs.length > 0 && (
            <div className="w-full flex flex-col items-center">
              <div className="h-2 border-l-[3px] border-slate-600 dark:border-slate-300" />
              <div className="w-full relative">
                {outs.length > 1 && <div className="absolute top-0 border-t-[3px] border-slate-600 dark:border-slate-300" style={{ left: `${50 / outs.length}%`, right: `${50 / outs.length}%` }} />}
                <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${outs.length}, minmax(0, 1fr))` }}>
                  {outs.map((i) => (
                    <div key={i} className="flex flex-col items-center">
                      <ArrowDown className="w-4 h-4 text-slate-600 dark:text-slate-300" strokeWidth={3} />
                      {box(i)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** A small drawing of a shape, for the Shape stage. */
export function ShapeIcon({ shape, n }) {
  const W = 120, H = 40;
  const arrows = skeleton(shape, n);
  const c = lineLength(shape, n);
  const k = n - c; // outputs
  // The line runs left to right; the outputs stack at the right-hand end.
  const lineEnd = k ? 58 : W - 12;
  const pos = Array.from({ length: c }, (_, i) => [c === 1 ? 14 : 12 + (i * (lineEnd - 12)) / (c - 1), H / 2]);
  for (let j = 0; j < k; j++) pos.push([W - 12, k === 1 ? H / 2 : 6 + (j * (H - 12)) / (k - 1)]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-28 h-9 shrink-0" aria-hidden="true">
      {arrows.map(([a, b], k) => (
        <line key={k} x1={pos[a][0]} y1={pos[a][1]} x2={pos[b][0]} y2={pos[b][1]} stroke="#5b6770" strokeWidth="2.5" />
      ))}
      {pos.map(([x, y], i) => <rect key={i} x={x - 8} y={y - 5} width="16" height="10" rx="2.5" fill="#ffffff" stroke="#2b2b2b" strokeWidth="2" />)}
    </svg>
  );
}

/** The eight energies to tap, each with its action figure. */
export function Palette({ lang, onPick, disabled = false, compact = false }) {
  const t = T[lang] || T.en;
  return (
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.palette}</div>
      <div className="grid grid-cols-4 gap-1.5">
        {ENERGY_IDS.map((e) => (
          <button key={e} type="button" disabled={disabled} onClick={() => onPick(e)}
            className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-400 active:scale-95 transition-all px-1 py-1 flex flex-col items-center leading-tight disabled:opacity-40 disabled:pointer-events-none">
            {!compact && (
              <span className="rounded-md bg-white">
                <svg viewBox="-100 -200 200 262" className="block w-7 h-8 sm:w-8 sm:h-9" aria-hidden="true" dangerouslySetInnerHTML={{ __html: pose(e, 0, 0, 1) }} />
              </span>
            )}
            <span className={`text-[10px] sm:text-[11px] font-black ${tone(e)}`}>{ENERGIES[e].en}</span>
            {lang === 'fr' && <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">{ENERGIES[e].fr}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
