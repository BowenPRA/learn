import { Telescope } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { SLOTS, DAYS, PREDICTIONS } from '../../../utils/tideLabData';
import { T } from './tideLabText.js';
import Pole from './Pole.jsx';
import RiverGraph from './RiverGraph.jsx';
import RiverTable from './RiverTable.jsx';

/* ------------------------------------------------------------------ *
 * Tide Lab: what a round is about, above its stage — the pole; a day's table
 * and graph; or the prediction being tested, with a week or a fortnight of
 * readings. The Moon goes on the calendar only once the data has been read.
 * ------------------------------------------------------------------ */
const card = 'rounded-2xl border-2 border-sky-200 dark:border-sky-800 bg-white dark:bg-slate-900 p-3 sm:p-4';

export default function Picture({ m, lang, view, act }) {
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);
  const { stage, done } = view;

  if (m.kind === 'pole') {
    return (
      <div className={`${card} flex flex-col sm:flex-row gap-3 items-center sm:items-start`}>
        <div className="w-56 sm:w-64 shrink-0"><Pole pole={m.pole} title={t.readTitle(pick(SLOTS[m.slot].en, SLOTS[m.slot].fr))} /></div>
        {m.pole.waves > 0 && <p className="text-sm font-bold text-slate-500 dark:text-slate-400 sm:mt-6">{t.wavesKey}</p>}
      </div>
    );
  }

  if (m.kind === 'day') {
    const plotting = stage === 'plot' && !done;
    return (
      <div className={`${card} grid gap-3 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:grid-cols-1 items-start`}>
        {stage !== 'find' || done
          ? <RiverTable lang={lang} columns={[{ head: { en: '', fr: '' }, values: m.day.readings }]} />
          : <div className="hidden md:block" />}
        {(view.plotted || plotting) && (
          <RiverGraph lang={lang} top={m.day.top} mode={plotting ? 'plot' : 'show'}
            days={[{ label: { en: '', fr: '' }, readings: m.day.readings }]}
            crosses={view.crosses} selected={view.sel} onPlace={act.place} plotMarks={view.plotMarks} />
        )}
      </div>
    );
  }

  const prediction = PREDICTIONS[m.kind];
  const head = (
    <div className="flex items-start gap-3">
      <Telescope className="w-6 h-6 shrink-0 text-sky-600" strokeWidth={2.5} />
      <div className="min-w-0">
        <div className="text-[10px] font-black uppercase tracking-widest text-sky-700 dark:text-sky-300">{t.prediction}</div>
        <p className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">{pick(prediction.en, prediction.fr)}</p>
      </div>
    </div>
  );

  if (m.kind === 'later') {
    const showWeek = done || stage !== 'tomorrow';
    const testing = stage === 'test' && !done;
    return (
      <div className={`${card} flex flex-col gap-3`}>
        {head}
        {showWeek && (
          <RiverGraph lang={lang} top={m.week.top} mode={testing ? 'pick' : 'show'}
            days={m.week.days.map((d) => ({ label: { en: DAYS[d.d].en, fr: DAYS[d.d].fr }, readings: d.readings }))}
            picks={testing || view.tested ? view.picks : {}} pickable={testing ? m.week.ask : []}
            onPick={act.pickDot} pickMarks={view.pickMarks} />
        )}
      </div>
    );
  }

  // biggest: a fortnight, the Moon on the calendar once the data has been read
  const showFortnight = done || stage !== 'change';
  const days = m.weeks.flatMap((wk) => wk.days.map((d, c) => ({
    label: { en: DAYS[c].en, fr: DAYS[c].fr },
    readings: d.readings,
    moon: c === wk.moon.weekday ? wk.moon.phase : null,
  })));
  return (
    <div className={`${card} flex flex-col gap-3`}>
      {head}
      {showFortnight && (
        <RiverGraph lang={lang} top={m.top} days={days} gapAfter={4} showMoons={done || view.moonsShown}
          weekLabels={[pick(T.en.week(1), T.fr.week(1)), pick(T.en.week(2), T.fr.week(2))]} />
      )}
    </div>
  );
}
