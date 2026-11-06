import { CheckCircle2, XCircle, Lightbulb, Trophy, ArrowRight, BookOpen, Thermometer } from 'lucide-react';
import { SCENES, diagramText, heatSummary } from '../../../utils/energyChange';
import { T, pickL } from './energyChangeText.js';
import { Diagram } from './EnergyBoard.jsx';

/* ------------------------------------------------------------------ *
 * The smaller pieces of a From… To… round: the message line, a list of
 * choices, a scene's picture card, the two things of a heat item, and the
 * finished item (the whole diagram, its sentence and its note).
 * ------------------------------------------------------------------ */
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const INK = '#0087a8';

export function Message({ msg, lang }) {
  if (!msg) return null;
  const text = pickL(lang, msg.en, msg.fr);
  if (!text) return null;
  const soft = msg.tone === 'shown' || msg.tone === 'info';
  const look = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  const Icon = msg.tone === 'ok' ? CheckCircle2 : soft ? Lightbulb : XCircle;
  return (
    <div className={`mt-2 flex items-start gap-2 p-2.5 rounded-xl border-2 font-bold text-sm leading-relaxed ${look}`}>
      <Icon className="w-5 h-5 shrink-0" strokeWidth={3} /><span>{text}</span>
    </div>
  );
}

/** Tap-to-answer buttons; tried ones are struck, the found one is green, a `selected` one amber. */
export function Choices({ options, tried = [], found = null, selected = null, onPick, cols = 1 }) {
  return (
    <div className={`grid gap-2 ${cols === 2 ? 'sm:grid-cols-2' : ''}`}>
      {options.map((o) => {
        const bad = tried.includes(o.val);
        const ok = found === o.val;
        const on = selected === o.val;
        return (
          <button key={String(o.val)} type="button" disabled={bad || found != null} onClick={() => onPick(o.val)}
            className={`flex items-center gap-2 text-left px-3 py-2.5 rounded-xl border-2 font-bold text-sm leading-snug transition-colors
              ${ok ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300'
                : bad ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-300 text-rose-400 line-through'
                  : on ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-400 text-slate-800 dark:text-slate-100'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-amber-400'}`}>
            {o.icon}<span className="min-w-0">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** A scene's picture with its name. */
export function SceneCard({ id, svg, lang, tone, onClick, compact = false }) {
  const S = SCENES[id];
  const ring = tone === 'right' ? 'border-[#58a700] ring-2 ring-[#58cc02]/40' : tone === 'wrong' ? 'border-rose-300 opacity-60' : 'border-slate-200 dark:border-slate-700';
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag type={onClick ? 'button' : undefined} onClick={onClick}
      className={`rounded-2xl border-2 bg-white dark:bg-slate-900 overflow-hidden text-left w-full ${ring} ${onClick ? 'hover:border-amber-400 transition-colors' : ''}`}>
      {svg && <div className={`bg-white ${compact ? 'h-24' : 'h-32 sm:h-40'}`} dangerouslySetInnerHTML={{ __html: svg }} />}
      <div className="px-2.5 py-1.5 text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">{pickL(lang, S.en, S.fr)}</div>
    </Tag>
  );
}

/** The two things of a heat item, each with its temperature. */
export function HeatThings({ m, lang, known = false, tried = [], onPick }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {m.things.map((th, k) => {
        const hot = known && k === m.hot;
        const cold = known && k === m.cold;
        const bad = tried.includes(k);
        const Tag = onPick ? 'button' : 'div';
        return (
          <Tag key={k} type={onPick ? 'button' : undefined} onClick={onPick ? () => onPick(k) : undefined} disabled={onPick ? bad : undefined}
            className={`rounded-xl border-2 px-3 py-2 flex items-center gap-2 text-left
              ${hot ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20' : cold ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/20' : bad ? 'border-rose-300 opacity-50' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}
              ${onPick && !bad ? 'hover:border-amber-400' : ''}`}>
            <Thermometer className={`w-6 h-6 shrink-0 ${hot ? 'text-rose-500' : cold ? 'text-sky-500' : 'text-slate-400'}`} strokeWidth={2.5} />
            <div className="min-w-0 leading-tight">
              <div className="text-sm font-black text-slate-800 dark:text-slate-100">{pickL(lang, th.en, th.fr)}</div>
              <div className="text-lg font-black text-slate-600 dark:text-slate-300">{th.t} °C</div>
            </div>
          </Tag>
        );
      })}
    </div>
  );
}

/** A finished item: how it went, the whole answer, and its note. */
export function Done({ m, pictures, lang, helped, slipped, onNext, isLast, note = null, compact = false }) {
  const t = T[lang] || T.en;
  const head = helped ? t.helped : slipped ? t.slipped : t.clean;
  const S = m.kind === 'read' ? SCENES[m.answer] : m.S;
  const shape = m.kind === 'read' ? 'one' : m.shape;
  const slots = m.kind === 'read' ? m.diagram : m.slots;
  const sentence = m.kind === 'heat' ? pickL(lang, heatSummary(m).en, heatSummary(m).fr)
    : `${pickL(lang, S.en, S.fr)}${lang === 'fr' ? ' : ' : ': '}${diagramText(slots, m.kind === 'read' ? slots.length : m.chain, lang)}`;
  return (
    <div className="rounded-2xl border-2 shadow-sm overflow-hidden" style={{ borderColor: helped ? AMBER : GREEN }}>
      <div className="px-4 py-2.5 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
        {helped ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-5 h-5 shrink-0" strokeWidth={2.5} />}
        <div className="font-black text-sm sm:text-base">{head}</div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-4">
        {note && <div className="-mt-2 mb-2">{note}</div>}
        {m.kind !== 'heat' && (
          <>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">
              <BookOpen className="w-4 h-4" strokeWidth={3} /> {t.theDiagram}
            </div>
            <Diagram shape={shape} n={slots.length} fill={slots} marks={Object.fromEntries(slots.map((_, i) => [i, 'locked']))} lang={lang} compact={compact} />
          </>
        )}
        {m.kind === 'read' && !compact && <div className="mt-3 max-w-xs"><SceneCard id={m.answer} svg={pictures?.[m.answer]} lang={lang} tone="right" compact /></div>}
        {m.kind === 'heat' && <HeatThings m={m} lang={lang} known />}
        <p className="mt-3 text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 leading-snug">{sentence}</p>
        <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300 leading-snug">{pickL(lang, S.note, S.noteFr)}</p>
        {onNext && (
          <div className="mt-3 flex justify-end">
            <button type="button" onClick={onNext}
              className="px-6 py-3 text-white text-sm rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all"
              style={{ backgroundColor: INK, borderColor: '#00697f' }}>
              {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
