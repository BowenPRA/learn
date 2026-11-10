import { ArrowRight, Check, CheckCircle2, Eye, Info, Lightbulb, Pencil, Sparkles, Trophy, XCircle, Target, Dumbbell, Mountain } from 'lucide-react';
import StepText from './StepText.jsx';
import { words, LEVEL_INK } from './words';
import { txt } from './model';

/*
 * The pieces of the step-practice screen. The look is the Year 7 step kit's
 * (StepKit.jsx / AngleKit.jsx on the Dashboard), redrawn here so this folder
 * needs nothing from the Dashboard: numbered step pills, a green note about the
 * step just finished ABOVE the new step, feedback on this step UNDER the work,
 * Show me + Check at the foot, and the working written down as steps finish.
 */

const LEVEL_ICON = { focus: Target, practice: Dumbbell, challenge: Mountain };

/** A 1-2-3 strip: how an item of this level goes, in three short phrases. */
export function HowItWorks({ steps, ink, big = false }) {
  return (
    <ol className={`flex flex-wrap gap-x-4 gap-y-1.5 font-bold text-slate-600 dark:text-slate-300 ${big ? 'text-base' : 'text-[13px]'}`}>
      {steps.map((h, n) => (
        <li key={h} className="flex items-center gap-1.5">
          <span className={`inline-grid place-items-center rounded-full text-white font-black shrink-0 ${big ? 'w-6 h-6 text-sm' : 'w-5 h-5 text-[11px]'}`} style={{ backgroundColor: ink }}>{n + 1}</span>{h}
        </li>
      ))}
    </ol>
  );
}

/** steps: [{ key, label, state: 'todo' | 'now' | 'done' | 'shown' | 'look' }] */
export function Stepper({ steps, ink, big = false }) {
  return (
    <ol className="flex flex-wrap items-center gap-1" aria-label="steps">
      {steps.map((s, i) => {
        const done = s.state === 'done' || s.state === 'shown' || s.state === 'look';
        const now = s.state === 'now';
        const pill = s.state === 'look'
          ? 'bg-amber-100 text-amber-900 border-amber-400 ring-2 ring-amber-300 animate-pulse dark:bg-amber-900/40 dark:text-amber-100'
          : s.state === 'shown' ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700'
            : done ? 'bg-[#effbe5] text-[#2f5d00] border-[#9bd36b] dark:bg-lime-900/30 dark:text-lime-200 dark:border-lime-700'
              : now ? 'text-white' : 'bg-white text-slate-400 border-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700';
        return (
          <li key={s.key} className="flex items-center gap-1" aria-current={now ? 'step' : undefined}>
            {i > 0 && <span className={`w-3 h-0.5 rounded ${done || now ? 'bg-slate-300 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-800'}`} />}
            <span className={`inline-flex items-center gap-1.5 pl-1 pr-2.5 py-0.5 rounded-full border-2 font-black ${big ? 'text-sm' : 'text-xs'} ${pill}`}
              style={now ? { backgroundColor: ink, borderColor: ink } : undefined}>
              <span className={`inline-grid place-items-center w-5 h-5 rounded-full text-[11px] ${done ? 'bg-white/70 dark:bg-black/20' : now ? 'bg-white' : 'bg-slate-100 dark:bg-slate-800'}`} style={now ? { color: ink } : undefined}>
                {done && s.state !== 'look' ? <Check className="w-3 h-3" strokeWidth={4} /> : i + 1}
              </span>
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** The note about the step just finished: green when it was answered, amber when it was shown. */
export function PrevNote({ note, big = false }) {
  if (!note?.text) return null;
  const good = note.tone === 'ok';
  return (
    <div className={`flex items-start gap-2 rounded-xl px-3 py-1.5 font-bold leading-snug border animate-in fade-in slide-in-from-top-1 duration-200 ${big ? 'text-base' : 'text-[13px]'}
      ${good ? 'bg-[#effbe5] border-[#c7e9a8] text-[#2f5d00] dark:bg-lime-950/30 dark:border-lime-900 dark:text-lime-200'
        : 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200'}`}>
      {good ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-px" strokeWidth={2.5} /> : <Lightbulb className="w-4 h-4 shrink-0 mt-px" strokeWidth={2.5} />}
      <StepText text={note.text} />
    </div>
  );
}

const TONE = {
  bad: ['bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-200', XCircle],
  info: ['bg-sky-50 border-sky-300 text-sky-900 dark:bg-sky-950/30 dark:border-sky-800 dark:text-sky-200', Info],
  hint: ['bg-sky-50 border-sky-300 text-sky-900 dark:bg-sky-950/30 dark:border-sky-800 dark:text-sky-200', Lightbulb],
};
/** Feedback on the step in hand, under the work. */
export function Feedback({ tone = 'info', text, extra, big = false }) {
  if (!text) return null;
  const [cls, Icon] = TONE[tone] || TONE.info;
  return (
    <div role="status" className={`flex items-start gap-2 rounded-xl border-2 px-3 py-2 font-bold leading-snug animate-in fade-in slide-in-from-top-1 duration-200 ${big ? 'text-base' : 'text-sm'} ${cls}`}>
      <Icon className="w-5 h-5 shrink-0 mt-px" strokeWidth={2.5} />
      <span><StepText text={text} />{extra && <span className="block mt-1 font-semibold opacity-90"><StepText text={extra} /></span>}</span>
    </div>
  );
}

const pillBtn = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest border-2 transition-colors';
export function HelpRow({ lang, onHint, onShowMe }) {
  const t = words(lang);
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {onHint && <button type="button" onClick={onHint} className={`${pillBtn} text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/20`}><Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.hint}</button>}
      {onShowMe && <button type="button" onClick={onShowMe} className={`${pillBtn} text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20`}><Eye className="w-4 h-4" strokeWidth={2.5} /> {t.showMe}</button>}
    </div>
  );
}

export function CheckButton({ onClick, disabled, lang, big = false }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-xl text-white font-black uppercase tracking-widest bg-[#58cc02] border-b-[4px] border-[#46a302] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none ${big ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm'}`}>
      <Check className="w-4 h-4" strokeWidth={3} /> {words(lang).check}
    </button>
  );
}

/** The figure of an item: an inline SVG, a picture, or a small table. */
export function Figure({ item, lang, big = false, roomy = false }) {
  const t = item.table;
  return (
    <>
      {item.inlineSvg && <div className={`w-full flex justify-center text-slate-800 rounded-xl dark:bg-white dark:p-2 [&>svg]:max-w-full [&>svg]:h-auto ${roomy ? '[&>svg]:w-full [&>svg]:max-h-[70vh]' : '[&>svg]:max-h-[38vh]'}`} dangerouslySetInnerHTML={{ __html: txt(item, 'inlineSvg', lang) }} />}
      {item.image && <img src={item.image} alt={item.alt || ''} className="max-h-[38vh] mx-auto rounded-xl" />}
      {t && (
        <div className="overflow-x-auto">
          <table className={`mx-auto border-collapse font-bold text-slate-800 dark:text-slate-100 ${big ? 'text-lg' : 'text-[15px]'}`}>
            {(t.caption || t.captionVn) && <caption className="pb-1 text-xs font-black uppercase tracking-widest text-slate-500"><StepText text={lang === 'vn' ? t.captionVn || t.caption : lang === 'fr' ? t.captionFr || t.caption : t.caption} /></caption>}
            {t.head && (
              <thead><tr>{(lang === 'vn' && t.headVn ? t.headVn : lang === 'fr' && t.headFr ? t.headFr : t.head).map((h, i) => (
                <th key={i} className="px-3 py-1.5 border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-left"><StepText text={h} /></th>
              ))}</tr></thead>
            )}
            <tbody>{t.rows.map((r, i) => (
              <tr key={i}>{r.map((c, j) => <td key={j} className="px-3 py-1.5 border-2 border-slate-200 dark:border-slate-700 tabular-nums"><StepText text={String(c)} /></td>)}</tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

/** The left card: level, question, figure, and the 1-2-3 strip when this level is new. */
export function QuestionCard({ item, lang, prompt, how, done, doneText, big = false, roomy = false }) {
  const t = words(lang);
  const ink = LEVEL_INK[item.level];
  const Icon = LEVEL_ICON[item.level];
  return (
    <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: ink }}>
      <div className="px-4 py-2.5 text-white flex items-center gap-2.5" style={{ backgroundColor: ink }}>
        <Icon className="w-5 h-5 shrink-0" strokeWidth={2.5} />
        <div className={`font-black uppercase tracking-widest ${big ? 'text-sm' : 'text-[11px]'}`}>{t.levels[item.level]}</div>
        {doneText && <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-85 whitespace-nowrap">{doneText}</div>}
      </div>
      <div className="px-4 py-3 flex flex-col gap-3">
        <p className={`font-bold text-slate-800 dark:text-slate-100 leading-snug ${big ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}><StepText text={prompt} done={done} /></p>
        {(item.inlineSvg || item.image || item.table) && <Figure item={item} lang={lang} big={big} roomy={roomy} />}
        {how && <div className="pt-2 border-t border-slate-100 dark:border-slate-700"><HowItWorks steps={how} ink={ink} big={big} /></div>}
      </div>
    </div>
  );
}

/** The working: lines = [{ key, text, tag?: 'head' | 'shown', fresh? }]. */
export function Notebook({ lines, lang, bare = false, big = false }) {
  const t = words(lang);
  if (!lines.length) return null;
  const body = (
    <ol className="flex flex-col gap-1">
      {lines.map((l, i) => (
        <li key={l.key} className={`flex items-start gap-2.5 rounded-xl px-2 py-1 ${l.fresh ? 'bg-[#effbe5] dark:bg-lime-950/30 animate-in fade-in slide-in-from-left-2 duration-300' : ''}`}>
          <span className="shrink-0 w-6 text-right font-black text-slate-300 dark:text-slate-600 tabular-nums">{i + 1}</span>
          <span className={`min-w-0 flex-1 text-slate-800 dark:text-slate-100 font-bold leading-snug ${big ? 'text-xl' : 'text-base sm:text-lg'} ${l.tag === 'head' ? 'opacity-70' : ''}`}><StepText text={l.text} /></span>
          {l.tag === 'head' && <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 dark:bg-slate-800 rounded px-1.5 py-0.5 mt-1">{t.inHead}</span>}
          {l.tag === 'shown' && <Lightbulb className="shrink-0 w-4 h-4 text-amber-500 mt-1" strokeWidth={2.5} />}
          {l.fresh && <Sparkles className="shrink-0 w-4 h-4 text-[#58a700] mt-1" strokeWidth={2.5} />}
        </li>
      ))}
    </ol>
  );
  if (bare) return body;
  return (
    <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-2.5 sm:p-3">
      <div className="px-2 pb-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{t.working}</div>
      {body}
    </div>
  );
}

/** The finished item: how it went, the working to copy, Next. */
export function DoneCard({ lang, item, result, lines, shown, isLast, onNext, big = false }) {
  const t = words(lang);
  const colour = result.helped ? '#f59e0b' : '#58cc02';
  const ink = LEVEL_INK[item.level];
  return (
    <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: colour }}>
      <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: colour }}>
        {result.helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
        <div className={`font-black ${big ? 'text-lg' : ''}`}>{result.helped ? t.helped : result.slipped ? t.slipped : t.clean}</div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-5 flex flex-col gap-3">
        {shown && <PrevNote note={{ tone: 'shown', text: shown }} big={big} />}
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400"><Pencil className="w-4 h-4" strokeWidth={3} /> {t.bookCopy}</div>
        <Notebook lines={lines.map((l) => ({ ...l, fresh: false }))} lang={lang} bare big />
        <div className="flex justify-end">
          <button type="button" onClick={onNext} autoFocus
            className={`rounded-xl text-white font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all brightness-100 ${big ? 'px-7 py-4 text-base' : 'px-6 py-3 text-sm'}`}
            style={{ backgroundColor: ink, borderColor: 'rgba(0,0,0,0.25)' }}>
            {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
