import { CheckCircle2, XCircle, Lightbulb, Info, Eye, Check, Footprints, Sparkles } from 'lucide-react';
import { tr } from '../../utils/lang';
import FactIcon from './FactIcon.jsx';
import { FACT_CARD, kt } from './angleKitText';

/**
 * The shared pieces of the Year 7 angle tasks — Find It, Say Why
 * (AngleSumStage.jsx) and Find Every Angle (AngleChaseParts.jsx) — so the two
 * look and read the same: fact cards with a picture of each fact, a "Find b"
 * header with the steps of that angle, working written in the picture's
 * colours (printed angles teal, the letter orange, found angles green), the
 * answer box, feedback, and the notebook of lines written so far.
 */

/* ------------------------------------------------------------------ the fact cards */

export function FactCard({ kind, lang, state = 'idle', onPick, compact = false }) {
  const w = FACT_CARD[kind];
  const name = tr(lang, w.en[0], null, w.fr[0]);
  const rule = tr(lang, w.en[1], null, w.fr[1]);
  const tone = state === 'wrong'
    ? 'border-rose-200 bg-rose-50 text-rose-400 dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-400'
    : state === 'right'
      ? 'border-[#58a700] bg-[#effbe5] text-[#2f5d00] dark:bg-lime-950/30 dark:border-lime-700 dark:text-lime-200'
      : 'border-slate-200 bg-white text-slate-800 hover:border-orange-400 hover:bg-orange-50/60 hover:-translate-y-px dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:hover:border-orange-500 dark:hover:bg-slate-700';
  return (
    <button type="button" disabled={state !== 'idle'} onClick={() => onPick?.(kind)}
      className={`relative w-full flex items-center gap-2.5 text-left rounded-2xl border-2 border-b-[4px] transition-all active:translate-y-[2px] active:border-b-2 disabled:cursor-default ${compact ? 'px-2 py-1.5' : 'px-2.5 py-2'} ${tone}`}>
      <span className={`shrink-0 grid place-items-center rounded-xl bg-slate-50 dark:bg-slate-900/70 ${compact ? 'w-12 h-10' : 'w-14 h-11'} ${state === 'wrong' ? 'opacity-50' : ''}`}>
        <FactIcon kind={kind} className={compact ? 'w-10 h-8' : 'w-12 h-9'} />
      </span>
      <span className={`min-w-0 leading-tight ${state === 'wrong' ? 'line-through decoration-2' : ''}`}>
        <span className={`block font-black ${compact ? 'text-[13px]' : 'text-sm sm:text-[15px]'}`}>{name}</span>
        <span className="block text-xs font-bold opacity-70 mt-0.5">{rule}</span>
      </span>
      {state === 'wrong' && <XCircle className="absolute top-1.5 right-1.5 w-4 h-4 text-rose-400" strokeWidth={2.5} />}
      {state === 'right' && <CheckCircle2 className="absolute top-1.5 right-1.5 w-4 h-4 text-[#58a700]" strokeWidth={2.5} />}
    </button>
  );
}

/** The fact cards for one question. `struck`: the kinds already tried and wrong. */
export function FactGrid({ kinds, lang, struck = [], onPick, compact = false }) {
  return (
    <div className={`grid gap-2 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
      {kinds.map((k) => <FactCard key={k} kind={k} lang={lang} compact={compact} state={struck.includes(k) ? 'wrong' : 'idle'} onPick={onPick} />)}
    </div>
  );
}

/* ------------------------------------------------------------------ the header and its steps */

/** The letter as the picture shows it while it is being found: white on orange. */
export function LetterBadge({ letter, size = 'lg' }) {
  const s = size === 'lg' ? 'w-10 h-10 text-2xl' : 'w-7 h-7 text-base';
  return (
    <span className={`inline-grid place-items-center shrink-0 rounded-full bg-[#e8590c] text-white font-black italic shadow-[0_3px_0_#a8400a] ${s}`}>
      {letter === '?' ? <span className="not-italic">?</span> : letter}
    </span>
  );
}

/**
 * "Find b", and the steps of that angle as numbered pills:
 * steps = [{ key, label, state: 'todo' | 'now' | 'done' | 'shown' }].
 */
export function StepHeader({ letter, stone = false, lang, steps = [], title }) {
  const t = kt(lang);
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-3">
        {stone ? <span className="inline-grid place-items-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"><Footprints className="w-5 h-5" strokeWidth={2.5} /></span> : letter ? <LetterBadge letter={letter} /> : null}
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight">
          {title || (stone ? t.findStone : <>{t.find} <span className="italic text-[#e8590c] dark:text-orange-400">{letter}</span></>)}
        </h3>
      </div>
      {steps.length > 1 && <Stepper steps={steps} />}
    </div>
  );
}

/** `accent` (a colour) replaces the orange of the step in hand — for a task with its own colour. */
export function Stepper({ steps, accent }) {
  return (
    <ol className="flex flex-wrap items-center gap-1" aria-label="steps">
      {steps.map((s, i) => {
        const done = s.state === 'done' || s.state === 'shown';
        const now = s.state === 'now';
        const pill = done
          ? (s.state === 'shown' ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700' : 'bg-[#effbe5] text-[#2f5d00] border-[#9bd36b] dark:bg-lime-900/30 dark:text-lime-200 dark:border-lime-700')
          : now ? (accent ? 'bg-white dark:bg-slate-900' : 'bg-[#fff1e6] text-[#b4460a] border-[#e8590c] dark:bg-orange-900/30 dark:text-orange-200 dark:border-orange-500')
            : 'bg-white text-slate-400 border-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700';
        return (
          <li key={s.key} className="flex items-center gap-1" aria-current={now ? 'step' : undefined}>
            {i > 0 && <span className={`w-3 h-0.5 rounded ${done || now ? 'bg-slate-300 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-800'}`} />}
            <span className={`inline-flex items-center gap-1.5 pl-1 pr-2.5 py-0.5 rounded-full border-2 text-xs font-black ${pill}`}
              style={now && accent ? { backgroundColor: accent, borderColor: accent, color: '#ffffff' } : undefined}>
              <span className={`inline-grid place-items-center w-5 h-5 rounded-full text-[11px] ${done ? 'bg-white/70 dark:bg-black/20' : now ? 'bg-[#e8590c] text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
                style={now && accent ? { backgroundColor: '#ffffff', color: accent } : undefined}>
                {done ? <Check className="w-3 h-3" strokeWidth={4} /> : i + 1}
              </span>
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** The heading of the step in hand: "Step 1 · Which fact finds b?" */
export function StepTitle({ n, lang, accent, children }) {
  return (
    <p className="text-[15px] font-black text-slate-700 dark:text-slate-200 flex items-baseline gap-2">
      {n != null && <span className={`shrink-0 text-[11px] uppercase tracking-widest text-[#e8590c] dark:text-orange-400 ${accent ? 'dark:brightness-[1.9]' : ''}`} style={accent ? { color: accent } : undefined}>{kt(lang).step} {n}</span>}
      <span>{children}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ working, in colour */

const TOKEN = {
  L: 'italic text-[#c25e12] dark:text-orange-300',
  cur: 'italic text-[#e8590c] dark:text-orange-400',
  g: 'text-[#0087a8] dark:text-cyan-300',
  f: 'text-[#3f7a1d] dark:text-lime-300',
  s: 'text-[#5c2483] dark:text-purple-300',
  n: 'text-slate-800 dark:text-slate-100',
  op: 'text-slate-500 dark:text-slate-400 px-0.5',
  txt: 'text-slate-500 dark:text-slate-400',
};
/**
 * A worked line. parts: [{ t, v }] with t = 'L' (a letter), 'cur' (the letter
 * being found), 'g' (a printed angle), 'f' (a found angle), 's' (a stepping
 * stone), 'n' (a plain number of degrees), 'op', 'txt'; or { node } (the box).
 */
export function Eq({ parts, className = '' }) {
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-1 gap-y-1 font-black tabular-nums ${className}`}>
      {parts.map((p, i) => {
        if (p.node) return <span key={i} className="inline-flex items-center">{p.node}</span>;
        const deg = ['g', 'f', 's', 'n'].includes(p.t) && typeof p.v === 'number';
        return (
          <span key={i}>
            {p.pre && <span className={TOKEN.txt}>{p.pre}</span>}
            <span className={TOKEN[p.t] || ''}>{deg ? `${p.v}°` : p.v}</span>
            {p.post && <span className={TOKEN.txt}>{p.post}</span>}
          </span>
        );
      })}
    </span>
  );
}

export function AnswerBox({ value, onChange, onEnter, label, inputRef, autoFocus = false }) {
  return (
    <span className="inline-flex items-center gap-1">
      <input ref={inputRef} autoFocus={autoFocus} value={value} onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); onEnter?.(); } }}
        inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={label} placeholder="?"
        className="w-[5.5rem] px-2 py-1 rounded-xl border-2 border-b-[4px] border-[#e8590c]/60 bg-[#fff8f2] dark:bg-slate-950 text-center font-black text-[#b4460a] dark:text-orange-300 placeholder:text-orange-300 focus:outline-none focus:border-[#e8590c] focus:bg-white dark:focus:bg-slate-900" />
      <span className="text-slate-500">°</span>
    </span>
  );
}

export function CheckButton({ onClick, disabled, lang, label }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-black uppercase tracking-widest bg-[#58cc02] border-b-[4px] border-[#46a302] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none">
      <Check className="w-4 h-4" strokeWidth={3} /> {label || kt(lang).check}
    </button>
  );
}

/* ------------------------------------------------------------------ feedback and help */

const TONE = {
  good: ['bg-[#effbe5] border-[#9bd36b] text-[#2f5d00] dark:bg-lime-950/30 dark:border-lime-800 dark:text-lime-200', CheckCircle2],
  bad: ['bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-200', XCircle],
  shown: ['bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200', Lightbulb],
  info: ['bg-sky-50 border-sky-300 text-sky-900 dark:bg-sky-950/30 dark:border-sky-800 dark:text-sky-200', Info],
  soft: ['bg-slate-50 border-slate-300 text-slate-700 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200', Info],
};
export function Feedback({ tone = 'soft', children }) {
  if (!children) return null;
  const [cls, Icon] = TONE[tone] || TONE.soft;
  return (
    <div role="status" className={`flex items-start gap-2 rounded-xl border-2 px-3 py-2 text-sm font-bold leading-snug animate-in fade-in slide-in-from-top-1 duration-200 ${cls}`}>
      <Icon className="w-5 h-5 shrink-0 mt-px" strokeWidth={2.5} /><span>{children}</span>
    </div>
  );
}

export function HelpRow({ lang, onHint, onShowMe }) {
  const t = kt(lang);
  const b = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-widest border-2 transition-colors';
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {onHint && <button type="button" onClick={onHint} className={`${b} text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/20`}><Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.hint}</button>}
      {onShowMe && <button type="button" onClick={onShowMe} className={`${b} text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20`}><Eye className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}</button>}
    </div>
  );
}

/* ------------------------------------------------------------------ the notebook */

/** "because …": English always (it is what the book wants), the French under it in French. */
export function Because({ words, lang, className = '' }) {
  if (!words) return null;
  return (
    <span className={`block ${className}`}>
      <span className="font-bold">{kt('en').because} {words.en}</span>
      {lang === 'fr' && <span className="block text-[0.85em] font-semibold opacity-75">({kt('fr').because} {words.fr})</span>}
    </span>
  );
}

/** A plain sentence for the book, in English, with the French under it in French. */
export function Said({ words, lang, className = '' }) {
  if (!words) return null;
  return (
    <span className={`block ${className}`}>
      <span className="font-bold">{words.en}</span>
      {lang === 'fr' && words.fr && <span className="block text-[0.85em] font-semibold opacity-75">({words.fr})</span>}
    </span>
  );
}

/**
 * The lines written so far, in the book's form:
 * lines = [{ key, kind?, parts | say, because?, tag?: 'stone' | 'helped', fresh? }].
 */
export function Notebook({ lines, lang, title, bare = false, big = false }) {
  const t = kt(lang);
  if (!lines.length) return null;
  const body = (
    <ol className="flex flex-col gap-1.5">
      {lines.map((l) => (
        <li key={l.key} className={`flex items-start gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-700 ${l.fresh ? 'bg-[#effbe5] dark:bg-lime-950/30 animate-in fade-in slide-in-from-left-2 duration-300' : ''}`}>
          {l.kind ? <span className="shrink-0 mt-0.5 text-slate-500 dark:text-slate-400"><FactIcon kind={l.kind} className="w-8 h-6" /></span> : <span className="shrink-0 w-8" />}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2">
              {l.parts && <Eq parts={l.parts} className={big ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'} />}
              {!l.parts && l.say && <Said words={l.say} lang={lang} className={`text-slate-700 dark:text-slate-200 ${big ? 'text-lg' : 'text-[15px]'}`} />}
              {l.tag === 'stone' && <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 rounded px-1.5 py-0.5">{t.onTheWay}</span>}
              {l.tag === 'helped' && <Lightbulb className="w-4 h-4 text-amber-500" strokeWidth={2.5} />}
              {l.fresh && <Sparkles className="w-4 h-4 text-[#58a700]" strokeWidth={2.5} />}
            </div>
            <Because words={l.because} lang={lang} className="text-sm text-slate-600 dark:text-slate-300 leading-snug" />
            {l.parts && l.say && <Said words={l.say} lang={lang} className="text-sm text-slate-600 dark:text-slate-300 leading-snug" />}
          </div>
        </li>
      ))}
    </ol>
  );
  if (bare) return body;
  return (
    <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-2.5 sm:p-3">
      <div className="px-2 pb-1 text-[11px] font-black uppercase tracking-widest text-slate-400">{title || t.working}</div>
      {body}
    </div>
  );
}
