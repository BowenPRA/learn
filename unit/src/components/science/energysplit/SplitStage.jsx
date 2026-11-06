import { CheckCircle2, XCircle, Lightbulb, Circle } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { stageAsk } from '../../../utils/energySplit';
import { T } from './splitText.js';
import { Chip } from './SplitBoard.jsx';

/**
 * The panel under the board: which stage, its question, its control (choice
 * buttons, a chip bank, a joules box), the message and the buttons. Shared by
 * the task and the deck activity.
 */
const GREEN = '#58cc02';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const NUM_STAGES = ['usefulJ', 'wastedJ', 'inJ', 'inA', 'inB'];

export function Message({ msg, lang }) {
  if (!msg) return null;
  const text = tr(lang, msg.en, null, msg.fr || msg.en);
  if (!text) return null;
  const soft = msg.tone === 'shown' || msg.tone === 'info';
  const tone = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  const Icon = msg.tone === 'ok' ? CheckCircle2 : soft ? Lightbulb : XCircle;
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed ${tone}`}>
      <Icon className="w-5 h-5 shrink-0" strokeWidth={3} /><span>{text}</span>
    </div>
  );
}

export function StageChips({ run, lang }) {
  const t = T[lang] || T.en;
  return (
    <div className="flex flex-wrap gap-1.5">
      {run.queue.map((s, i) => {
        const entry = run.log[i];
        const isDone = !!entry && !entry.opened;
        const opened = entry?.opened;
        const now = i === run.idx && !run.finished;
        return (
          <span key={`${s}-${i}`} className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border-2 text-[10px] font-black uppercase tracking-widest
            ${isDone ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
              : opened ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400 line-through'
                : now ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
            {isDone ? <CheckCircle2 className="w-3 h-3" strokeWidth={3} /> : <Circle className="w-3 h-3" strokeWidth={3} />}
            {t.stages[s]}
          </span>
        );
      })}
    </div>
  );
}

function NumberBox({ run, lang }) {
  const t = T[lang] || T.en;
  return (
    <label className="flex items-center gap-2">
      <input type="text" inputMode="decimal" autoComplete="off" value={run.num}
        onChange={(e) => run.act.setNum(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') run.act.check(); }}
        aria-label={t.joules}
        className="w-24 sm:w-28 px-3 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-lg font-black tabular-nums text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500" />
      <span className="text-lg font-black text-slate-600 dark:text-slate-300">J</span>
    </label>
  );
}

function Options({ options, run, lang }) {
  return (
    <div className="grid gap-2">
      {options.map((o) => {
        const wrong = run.tried.includes(o.id);
        return (
          <button key={o.id} type="button" disabled={wrong} onClick={() => run.act.choose(o.id)}
            className={`text-left px-3 py-2.5 rounded-xl border-2 font-bold text-sm leading-snug transition-colors ${wrong ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 text-rose-400 line-through' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 hover:border-sky-400'}`}>
            {tr(lang, o.en, null, o.fr)}
          </button>
        );
      })}
    </div>
  );
}

export default function SplitStage({ run, lang, compact = false }) {
  const t = T[lang] || T.en;
  const { m, stage } = run;
  if (!stage) return null;
  const device = m.device;
  const ask = stageAsk(m, stage);
  const placed = new Set(Object.keys(run.boxes));
  const canCheck = stage === 'quick' || stage === 'useful' || stage === 'wasted' || NUM_STAGES.includes(stage);
  // On a slide (compact) the panel shares a column with the slide's prompt, so
  // the help line goes and a joules box sits on the button row.
  const numInRow = compact && (NUM_STAGES.includes(stage) || (stage === 'quick' && m.quickNum && !m.sort));
  // A quick round with nothing to place is only its number.
  const help = stage === 'quick' && !m.sort ? t.help.wastedJ : t.help[stage];

  return (
    <div className={compact ? '' : 'rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4 min-w-0'}>
      <div className={compact ? 'mb-1.5' : 'mb-2'}><StageChips run={run} lang={lang} /></div>
      <div className={`font-black text-slate-800 dark:text-slate-100 leading-snug ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>{tr(lang, ask?.en, null, ask?.fr)}</div>
      {!compact && help && <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{help}</p>}

      <div className={numInRow ? 'hidden' : compact ? 'mt-2' : 'mt-2.5'}>
        {stage === 'from' && (
          <div className="flex flex-wrap gap-2">
            {m.fromOptions.map((e) => (
              <Chip key={e} device={device} chip={e} lang={lang} small={compact} state={run.tried.includes(e) ? 'tried' : 'idle'}
                onClick={run.tried.includes(e) ? undefined : () => run.act.choose(e)} />
            ))}
          </div>
        )}
        {(stage === 'useful' || stage === 'wasted') && (
          <div className="flex flex-wrap gap-2">
            {m.bank.filter((c) => !(stage === 'wasted' && (run.filled.useful || []).includes(c))).map((c) => (
              <Chip key={c} device={device} chip={c} lang={lang} small={compact} state={run.picked.includes(c) ? 'on' : 'idle'} onClick={() => run.act.toggle(c)} />
            ))}
          </div>
        )}
        {stage === 'quick' && m.sort && (
          <div data-drop="bank" className={`flex flex-wrap rounded-xl ${compact ? 'gap-1.5 p-1.5' : 'gap-2 p-2'} bg-slate-50 dark:bg-slate-800/60 border-2 border-dashed border-slate-200 dark:border-slate-700 min-h-[3rem]`}>
            {!compact && <span className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400">{t.bank}</span>}
            {m.quickBank.filter((c) => !placed.has(c)).map((c) => (
              <Chip key={c} device={device} chip={c} lang={lang} small={compact} state={run.selected === c ? 'on' : 'idle'}
                onClick={() => { if (!run.drag?.tookDrag()) run.act.select(c); }}
                dragProps={run.drag ? run.drag.handlers(c) : {}} />
            ))}
          </div>
        )}
        {!numInRow && stage === 'quick' && m.quickNum && <div className={m.sort ? 'mt-3' : ''}><NumberBox run={run} lang={lang} /></div>}
        {!numInRow && NUM_STAGES.includes(stage) && <NumberBox run={run} lang={lang} />}
        {stage === 'chase' && <Options options={m.chaseOptions} run={run} lang={lang} />}
        {stage === 'decide' && <Options options={m.decideOptions} run={run} lang={lang} />}
      </div>

      <Message msg={run.msg} lang={lang} />

      <div className={`${compact ? 'mt-2' : 'mt-3'} flex items-center justify-end gap-2`}>
        {numInRow && <div className="mr-auto"><NumberBox run={run} lang={lang} /></div>}
        <button type="button" onClick={run.act.showMe}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
          <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
        </button>
        {canCheck && (
          <button type="button" onClick={run.act.check} className={`px-5 py-2.5 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>
        )}
      </div>
    </div>
  );
}
