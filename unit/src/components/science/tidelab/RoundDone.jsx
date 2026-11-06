import { Lightbulb, Trophy, ArrowRight, BookOpen } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { SLOTS, DAYS, MOONS, REASONS } from '../../../utils/tideLabData';
import { T } from './tideLabText.js';

/* ------------------------------------------------------------------ *
 * The end of a Tide Lab item: how it went, then what the readings show —
 * and, for a prediction, the reason it comes true.
 * ------------------------------------------------------------------ */
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const INK = '#0087a8';

export default function RoundDone({ m, lang, helped, slipped, onNext, isLast, note = null }) {
  const t = T[lang] || T.en;
  const pick = (en, fr) => tr(lang, en, null, fr || en);
  const slot = (i) => pick(SLOTS[i].en, SLOTS[i].fr);
  const head = helped ? t.helped : slipped ? t.slipped : t.clean;
  let says = '';
  if (m.kind === 'pole') says = t.poleDone(m.pole.level, m.pole.waves > 0);
  if (m.kind === 'day') says = t.dayDone(slot(m.day.hi), slot(m.day.pair), slot(m.day.pair + 1), t.dirWord[m.day.dir], m.day.change);
  if (m.kind === 'later') says = t.laterDone(m.week.ask.map((d) => `${pick(DAYS[d].en, DAYS[d].fr)} ${slot(m.week.days[d].hi)}`).join(', '));
  if (m.kind === 'biggest') says = t.biggestDone(m.bigWeek + 1, pick(MOONS[m.phase].en, MOONS[m.phase].fr).toLowerCase());
  const reason = m.kind === 'later' || m.kind === 'biggest' ? REASONS[m.kind].right : null;
  return (
    <div className="rounded-2xl border-2 shadow-sm overflow-hidden" style={{ borderColor: helped ? AMBER : GREEN }}>
      <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
        {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
        <div className="font-black">{head}</div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-5">
        {note && <div className="-mt-3 mb-3">{note}</div>}
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
          <BookOpen className="w-4 h-4" strokeWidth={3} /> {t.doneTitle}
        </div>
        <p className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 leading-snug">{says}</p>
        {reason && (
          <p className="mt-1 text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 leading-snug">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: INK }}>{t.because} </span>
            {pick(reason.en, reason.fr)}
          </p>
        )}
        <div className="mt-4 flex justify-end">
          <button type="button" onClick={onNext}
            className="px-6 py-3 text-white text-sm rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all"
            style={{ backgroundColor: INK, borderColor: '#00697f' }}>
            {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
