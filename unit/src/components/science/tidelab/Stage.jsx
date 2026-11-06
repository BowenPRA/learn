import { CheckCircle2, XCircle, Lightbulb, ChevronUp, ChevronDown } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { SLOTS, DAYS, DIRS, VERDICTS, VERDICT_IDS, REASONS, MOON_IDS, MOONS } from '../../../utils/tideLabData';
import { clock } from '../../../utils/tideLabMark';
import { ChoiceButtons } from '../storyboard/Choices.jsx';
import RiverTable from './RiverTable.jsx';
import { MoonIcon } from './RiverGraph.jsx';
import { T } from './tideLabText.js';

/* ------------------------------------------------------------------ *
 * Tide Lab: the answer area of one stage (Round.jsx owns the state). Typed
 * stages have a box; choice stages are tap-once buttons (a wrong one turns red
 * and stays out, as in the Storyboard).
 * ------------------------------------------------------------------ */

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

function CmBox({ value, onChange, onEnter, state, label }) {
  return (
    <label className="inline-flex items-center gap-2">
      <input
        type="text" inputMode="decimal" autoComplete="off" spellCheck={false} maxLength={7}
        value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
        aria-label={label}
        className={`w-28 rounded-xl text-center text-xl font-black tabular-nums py-2 outline-none ring-2 focus:ring-4 text-slate-800
          ${state === 'ok' ? 'ring-[#58a700] bg-[#d7ffb8]' : state === 'bad' ? 'ring-rose-400 bg-rose-50' : 'ring-amber-300 focus:ring-amber-400 bg-amber-50'}`}
      />
      <span className="text-lg font-black text-slate-500 dark:text-slate-400">cm</span>
    </label>
  );
}

/** The title, the help line and the controls of one stage. */
export default function Stage({ m, stage, lang, s, act }) {
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);
  const slot = (i) => pick(SLOTS[i].en, SLOTS[i].fr);
  const choice = (options, cols = 1) => <ChoiceButtons cols={cols} options={options} wrong={s.tried} right={s.found} onPick={act.choose} />;
  let title = '';
  let help = '';
  let body = null;

  if (stage === 'read') {
    title = t.readTitle(slot(m.slot));
    help = t.readHelp[m.mark];
    body = (
      <div className="max-w-xs">
        <RiverTable lang={lang} rows={[m.slot]} columns={[{ head: { en: '', fr: '' }, values: [] }]}
          input={{ col: 0, row: m.slot, value: s.text, onChange: act.setText, onEnter: act.check, state: s.inputState }} />
      </div>
    );
  } else if (stage === 'plot') {
    title = t.plotTitle;
    help = t.plotHelp;
    body = (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">{t.plotPick}</span>
        {SLOTS.map((x, i) => (
          <button key={i} type="button" onClick={() => act.select(i)}
            className={`px-3 py-2 rounded-xl border-2 font-black text-sm ${s.sel === i ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'}`}>
            {slot(i)}{s.crosses[i] != null ? ' ×' : ''}
          </button>
        ))}
        <span className="ml-auto inline-flex gap-1">
          <button type="button" aria-label={t.up} onClick={() => act.nudge(5)} className="p-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"><ChevronUp className="w-5 h-5" strokeWidth={3} /></button>
          <button type="button" aria-label={t.down} onClick={() => act.nudge(-5)} className="p-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"><ChevronDown className="w-5 h-5" strokeWidth={3} /></button>
        </span>
      </div>
    );
  } else if (stage === 'inout') {
    title = t.inoutTitle(slot(m.day.pair), slot(m.day.pair + 1));
    body = choice(['in', 'out'].map((v) => ({ val: v, label: pick(DIRS[v].en, DIRS[v].fr) })), 2);
  } else if (stage === 'highest') {
    title = t.highestTitle;
    body = choice(SLOTS.map((x, i) => ({ val: i, label: slot(i) })), 2);
  } else if (stage === 'find') {
    title = t.findTitle;
    body = (
      <div className="max-w-xs">
        <RiverTable lang={lang} columns={[{ head: { en: '', fr: '' }, values: m.day.readings }]}
          find={{ onTap: act.findTap, marks: Object.fromEntries([[s.findPick.hi, 'hi'], [s.findPick.lo, 'lo']].filter(([k]) => k != null)) }} />
      </div>
    );
  } else if (stage === 'change' && m.kind === 'day') {
    title = t.changeTitle;
    help = t.changeHelp;
    body = <CmBox value={s.text} onChange={act.setText} onEnter={act.check} state={s.inputState} label={t.changeTitle} />;
  } else if (stage === 'change') {
    title = t.changesTitle;
    body = (
      <div className="grid sm:grid-cols-2 gap-3">
        {m.ask.map((c, w) => {
          const head = { en: `${T.en.week(w + 1)} · ${DAYS[c].long}`, fr: `${T.fr.week(w + 1)} · ${DAYS[c].longFr}` };
          return (
            <div key={w} className="flex flex-col gap-2 items-start">
              <RiverTable lang={lang} columns={[{ head, values: m.weeks[w].days[c].readings }]} />
              <div className="flex items-center gap-2 text-sm font-black text-slate-600 dark:text-slate-300">
                {pick(head.en, head.fr)}:
                <CmBox value={s.texts[w]} onChange={(v) => act.setTexts(w, v)} onEnter={act.check}
                  state={s.changeMarks?.[w]} label={pick(head.en, head.fr)} />
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (stage === 'tomorrow') {
    title = t.tomorrowTitle(pick(clock(m.tomorrow.today).en, clock(m.tomorrow.today).fr));
    body = choice(m.tomorrow.options.map((v) => ({ val: v, label: pick(clock(v).en, clock(v).fr) })), 2);
  } else if (stage === 'test') {
    title = t.testTitle;
    help = t.testHelp;
  } else if (stage === 'verdict') {
    title = t.verdictTitle;
    body = choice(VERDICT_IDS.map((v) => ({ val: v, label: pick(VERDICTS[v].en, VERDICTS[v].fr) })));
  } else if (stage === 'why') {
    title = t.whyTitle;
    help = t.whyHelp;
    const bank = REASONS[m.kind];
    body = choice(m.why.options.map((id) => {
      const r = id === bank.right.id ? bank.right : bank.traps.find((x) => x.id === id);
      return { val: id, label: pick(r.en, r.fr) };
    }));
  } else if (stage === 'week') {
    title = t.weekTitle;
    help = t.weekHelp;
    body = choice([0, 1].map((w) => ({ val: w, label: pick(T.en.week(w + 1), T.fr.week(w + 1)) })), 2);
  } else if (stage === 'moon') {
    title = t.moonTitle;
    body = choice(MOON_IDS.map((p) => ({
      val: p,
      label: (
        <span className="inline-flex items-center gap-2">
          <svg viewBox="0 0 30 30" className="w-6 h-6 shrink-0"><MoonIcon x={15} y={15} r={12} phase={p} /></svg>
          {pick(MOONS[p].en, MOONS[p].fr)}
        </span>
      ),
    })));
  }

  return (
    <div>
      <div className="font-black text-slate-800 dark:text-slate-100 text-base sm:text-lg leading-snug">{title}</div>
      {help ? <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5 mb-3">{help}</p> : <div className="mb-3" />}
      {body}
    </div>
  );
}
