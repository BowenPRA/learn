import { ArrowRight, Lightbulb, Trophy, Pencil, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Stepper, StepTitle, Feedback, HelpRow, CheckButton } from './AngleKit.jsx';
import { msgParts } from './stepKitParts';

/**
 * The shared frame of the step-by-step practice tasks (Year 7 Maths Unit 4:
 * Fill the Zeros, Line Up the Points, Point Out Point Back, Bus Stop, Make It
 * Easy — the same look as the angle tasks of Unit 5). Each task keeps its own
 * colour (`ink`) and its own working; these pieces give every one of them the
 * same places for the same things:
 *
 *   QuestionCard  the question, big; the level; on the first item a 1-2-3
 *                 "how it works" strip instead of a paragraph of rules
 *   StepPanel     the steps of the item as numbered pills, then a note about
 *                 the step just finished (a "right" that explains, or a step
 *                 filled in), "Step n" with one short line, the work itself,
 *                 the feedback on THIS step, and Show me + Check
 *   DoneCard      the finished item: how it went, the working to copy, Next
 *
 * Messages keep the tasks' own shape { tone, en, fr }: 'ok' and 'shown' are
 * about the step just finished (so they sit above the new step), 'bad' and
 * 'info' about the step in hand (so they sit under the work). See stepKitParts.js.
 */

/** A 1-2-3 strip: how one item of the task goes, in three short phrases. */
export function HowItWorks({ steps, ink = '#e8590c' }) {
  return (
    <ol className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] font-bold text-slate-600 dark:text-slate-300">
      {steps.map((h, n) => (
        <li key={h} className="flex items-center gap-1.5">
          <span className="inline-grid place-items-center w-5 h-5 rounded-full text-white text-[11px] font-black shrink-0" style={{ backgroundColor: ink }}>{n + 1}</span>{h}
        </li>
      ))}
    </ol>
  );
}

/**
 * The left card. `head` names the kind of question; `big` is the question as
 * it should look (a sum, set large); `question` the instruction in words.
 */
export function QuestionCard({ ink, icon: Icon, head, doneText, levelWord, level, levelName, context, question, big, how, children }) {
  return (
    <div className="rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden" style={{ borderColor: ink }}>
      <div className="px-4 py-2.5 text-white flex items-center gap-3" style={{ backgroundColor: ink }}>
        {Icon && <Icon className="w-5 h-5 shrink-0" strokeWidth={2.5} />}
        <div className="text-[11px] font-black uppercase tracking-widest opacity-90 truncate">{head}</div>
        {doneText && <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{doneText}</div>}
      </div>
      <div className="px-4 py-3 flex flex-col gap-2.5">
        {level != null && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200">
              <TrendingUp className="w-3 h-3" strokeWidth={3} /> {levelWord} {level}
            </span>
            {levelName && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{levelName}</span>}
          </div>
        )}
        {context && <p className="text-base font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{context}</p>}
        {question && <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">{question}</p>}
        {big && <div className="py-2 text-center text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">{big}</div>}
        {children}
        {how && <div className="pt-1 border-t border-slate-100 dark:border-slate-700"><div className="pt-2"><HowItWorks steps={how} ink={ink} /></div></div>}
      </div>
    </div>
  );
}

/** The note about the step just finished: a green "right" that explains, or an amber step filled in. */
export function PrevNote({ note }) {
  if (!note) return null;
  const good = note.tone === 'ok';
  return (
    <div className={`flex items-start gap-2 rounded-xl px-3 py-1.5 text-[13px] font-bold leading-snug border animate-in fade-in slide-in-from-top-1 duration-200
      ${good ? 'bg-[#effbe5] border-[#c7e9a8] text-[#2f5d00] dark:bg-lime-950/30 dark:border-lime-900 dark:text-lime-200'
        : 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200'}`}>
      {good ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-px" strokeWidth={2.5} /> : <Lightbulb className="w-4 h-4 shrink-0 mt-px" strokeWidth={2.5} />}
      <span>{note.text}</span>
    </div>
  );
}

/**
 * The step card. steps: [{ key, label, state: 'todo' | 'now' | 'done' | 'shown' }];
 * n: the number of the step in hand; title + sub: what to do, in one line each;
 * msg: the task's message (split by msgParts); children: the work.
 * Show me (onShowMe) and Check (onCheck, checkLabel, checkDisabled) sit at the
 * foot; leave onCheck out for a step answered by tapping a choice.
 */
export function StepPanel({
  ink, lang, steps = [], n, title, sub, msg, children, onShowMe, onCheck, checkLabel, checkDisabled, compact = false, plain = false,
}) {
  const { prev, now } = msgParts(msg, lang);
  const body = (
    <div className={`flex flex-col ${compact ? 'gap-2' : 'gap-3'} min-w-0`}>
      {steps.length > 1 && <Stepper steps={steps} accent={ink} />}
      <PrevNote note={prev} />
      {title && (
        <div>
          <StepTitle n={steps.length > 1 ? n : null} lang={lang} accent={ink}>{title}</StepTitle>
          {sub && <p className="mt-0.5 text-sm font-semibold text-slate-500 dark:text-slate-400 leading-snug">{sub}</p>}
        </div>
      )}
      {children}
      {now && <Feedback tone={now.tone}>{now.text}</Feedback>}
      {(onShowMe || onCheck) && (
        <div className="flex flex-wrap items-center justify-end gap-2">
          {onShowMe && <HelpRow lang={lang} onShowMe={onShowMe} />}
          {onCheck && <CheckButton onClick={onCheck} disabled={checkDisabled} lang={lang} label={checkLabel} />}
        </div>
      )}
    </div>
  );
  if (plain) return body;
  return <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4 min-w-0">{body}</div>;
}

/**
 * The finished item. words: { clean, slipped, helped, bookCopy, next, finish };
 * shown: a filled-in step's message to keep in view; children: the working.
 */
export function DoneCard({ ink, inkDark, helped, slipped, words, shown, isLast, onNext, children }) {
  const colour = helped ? '#f59e0b' : '#58cc02';
  return (
    <div className="rounded-2xl border-2 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ borderColor: colour }}>
      <div className="px-4 py-3 flex items-center gap-3 text-white" style={{ backgroundColor: colour }}>
        {helped ? <Lightbulb className="w-6 h-6 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-6 h-6 shrink-0" strokeWidth={2.5} />}
        <div className="font-black">{helped ? words.helped : slipped ? words.slipped : words.clean}</div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-5 flex flex-col gap-3">
        {shown && <PrevNote note={{ tone: 'shown', text: shown }} />}
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400"><Pencil className="w-4 h-4" strokeWidth={3} /> {words.bookCopy}</div>
        {children}
        <div className="flex justify-end">
          <button type="button" onClick={onNext}
            className="px-6 py-3 rounded-xl text-white text-sm font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all"
            style={{ backgroundColor: ink, borderColor: inkDark || ink }}>
            {isLast ? words.finish : words.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
