import { chipFace } from '../../../utils/energySplit';
import { T } from './splitText.js';

/**
 * The energy-change diagram of one round, as 3.6 draws it: the box the energy
 * comes FROM, a green arrow to the USEFUL box and a red arrow to the WASTED box,
 * each with its joules once they are known. It is also the input of the sort
 * stages: the active box is lit, a chip in it can be tapped back out, and in a
 * quick round every box takes chips (tap a chip, then a box, or drag; `drag`
 * comes from useTapDrag).
 */
const GREEN = '#4a8b23';
const RED = '#d83a2e';

export function Chip({ device, chip, lang, onClick, state = 'idle', dragProps = {}, small = false }) {
  const face = chipFace(device, chip, lang);
  const tone = {
    idle: 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 hover:border-sky-400',
    on: 'bg-sky-100 dark:bg-sky-900/40 border-sky-500 text-sky-900 dark:text-sky-100 ring-2 ring-sky-300',
    placed: 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100',
    tried: 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 text-rose-400 line-through',
  }[state];
  return (
    <button type="button" onClick={onClick} disabled={!onClick} {...dragProps}
      className={`touch-pan-y select-none inline-flex flex-col items-start text-left rounded-xl border-2 leading-tight transition-colors disabled:cursor-default ${small ? 'px-2 py-1' : 'px-2.5 py-1.5'} ${tone}`}>
      <span className={`font-black ${small ? 'text-xs' : 'text-sm'}`}>{face.main}</span>
      {face.sub && <span className="text-[10px] sm:text-[11px] font-bold opacity-70">{face.sub}</span>}
    </button>
  );
}

function Box({ id, label, color, joules, chips, device, lang, active, run, interactive, hover, compact = false }) {
  const empty = !chips.length;
  const lit = active || hover === id;
  return (
    <div data-drop={interactive ? id : undefined}
      onClick={interactive && run.selected ? () => run.act.place(run.selected, id) : undefined}
      className={`rounded-xl border-2 flex flex-col transition-colors bg-white dark:bg-slate-900 min-w-0 ${compact ? 'p-1.5 min-h-[3.5rem] gap-1' : 'p-2 min-h-[4.25rem] gap-1.5'} ${lit ? 'ring-2 ring-amber-300' : ''} ${interactive && run.selected ? 'cursor-pointer' : ''}`}
      style={{ borderColor: color || '#94a3b8', borderStyle: empty && !active ? 'dashed' : 'solid' }}>
      <div className={`flex items-baseline justify-between ${compact ? 'gap-1 flex-wrap' : 'gap-2'}`}>
        <span className={`font-black uppercase tracking-widest ${compact ? 'text-[9px]' : 'text-[10px]'}`} style={{ color: color || '#475569' }}>{label}</span>
        {joules && <span className="text-sm font-black tabular-nums" style={{ color: color || '#334155' }}>{joules}</span>}
      </div>
      <div className={`flex flex-wrap ${compact ? 'gap-1' : 'gap-1.5'}`}>
        {chips.map((c) => (
          <Chip key={c} device={device} chip={c} lang={lang} small
            onClick={active ? (e) => { e.stopPropagation(); run.act.toggle(c); }
              : interactive ? (e) => { e.stopPropagation(); if (!run.drag?.tookDrag()) run.act.place(c, 'bank'); } : undefined}
            dragProps={interactive && run.drag ? run.drag.handlers(c) : {}} />
        ))}
        {empty && <span className="text-xl font-black text-slate-300 dark:text-slate-600 px-1">?</span>}
      </div>
    </div>
  );
}

const J = (v) => (v == null ? '? J' : `${v} J`);

/** The same-light round: each lamp's joules in, out as light, and wasted. */
export function PairBoard({ m, run, lang }) {
  const { filled } = run;
  const row = (dev, inKey, w) => (
    <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2">
      <div className="text-xs font-black text-slate-700 dark:text-slate-200 mb-1">{lang === 'fr' ? dev.fr : dev.en}</div>
      <div className="grid grid-cols-3 gap-1.5 text-center">
        {[
          [T[lang]?.boxes.from || 'Goes in', '#475569', J(filled[inKey])],
          [T[lang]?.boxes.useful || 'Useful', GREEN, J(m.useful)],
          [T[lang]?.boxes.wasted || 'Wasted', RED, filled[inKey] == null ? '? J' : J(w)],
        ].map(([label, color, v]) => (
          <div key={label} className="rounded-lg border-2 px-1 py-1" style={{ borderColor: color }}>
            <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest" style={{ color }}>{label}</div>
            <div className="text-sm sm:text-base font-black tabular-nums" style={{ color }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="flex flex-col gap-2">
      {row(m.a, 'inA', m.wA)}
      {row(m.b, 'inB', m.wB)}
    </div>
  );
}

export default function SplitBoard({ m, device = m.device, run, lang, compact = false }) {
  const t = T[lang] || T.en;
  const { stage, filled, boxes, picked } = run;
  const quick = stage === 'quick';
  const inBox = (b) => Object.keys(boxes).filter((c) => boxes[c] === b);
  const chipsFor = (b) => {
    // A quick round with no diagram to build (sort: false) shows its given energies.
    if (quick && m.sort) return inBox(b);
    if (stage === b) return picked;
    const f = filled[b];
    return f == null ? [] : Array.isArray(f) ? f : [f];
  };
  const counted = m.ask != null;
  const totalJ = !counted ? null : m.ask === 'in' ? J(filled.inJ) : J(m.total);
  const usefulJ = !counted ? null : m.ask === 'in' ? J(m.usefulJ) : J(filled.usefulJ);
  const wastedJ = !counted ? null : J(filled.wastedJ);
  const common = { device, lang, run, hover: run.drag?.hover };

  // On a slide (compact) the three boxes stand in one row — in, useful (green),
  // wasted (red) — so the panel beside the slide keeps its Check on screen.
  if (compact) {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        <Box id="from" label={t.boxes.from} joules={totalJ} chips={chipsFor('from')} {...common} compact interactive={quick && m.sort} active={false} />
        <Box id="useful" label={t.boxes.useful} color={GREEN} joules={usefulJ} chips={chipsFor('useful')} {...common} compact interactive={quick && m.sort} active={stage === 'useful'} />
        <Box id="wasted" label={t.boxes.wasted} color={RED} joules={wastedJ} chips={chipsFor('wasted')} {...common} compact interactive={quick && m.sort} active={stage === 'wasted'} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="mx-auto w-full sm:w-2/3">
        <Box id="from" label={t.boxes.from} joules={totalJ} chips={chipsFor('from')} {...common} interactive={quick && m.sort} active={false} />
      </div>
      <svg viewBox="0 0 200 26" preserveAspectRatio="none" className="w-full h-5" aria-hidden="true">
        <path d="M 92 2 L 50 22" stroke={GREEN} strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
        <path d="M 108 2 L 150 22" stroke={RED} strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="grid grid-cols-2 gap-2">
        <Box id="useful" label={t.boxes.useful} color={GREEN} joules={usefulJ} chips={chipsFor('useful')} {...common} interactive={quick && m.sort} active={stage === 'useful'} />
        <Box id="wasted" label={t.boxes.wasted} color={RED} joules={wastedJ} chips={chipsFor('wasted')} {...common} interactive={quick && m.sort} active={stage === 'wasted'} />
      </div>
    </div>
  );
}
