import { Check, Minus, Plus, X } from 'lucide-react';
import StepText from './StepText.jsx';
import { txt, wordsOf, gapParts, shownOrder } from './model';
import { words } from './words';

/*
 * The answer widgets of a step. Typed widgets are controlled by the step panel
 * (`value` / `onChange`, Check sits in the panel's foot); a single choice or a
 * single word to tap answers at once through `onPick`.
 * Every typed box is orange: it is what the student is finding.
 */

const boxCls = (big) => `px-2 py-1 rounded-xl border-2 border-b-[4px] border-[#e8590c]/60 bg-[#fff8f2] dark:bg-slate-950 text-center font-black text-[#b4460a] dark:text-orange-300 placeholder:text-orange-300 focus:outline-none focus:border-[#e8590c] focus:bg-white dark:focus:bg-slate-900 ${big ? 'text-2xl' : 'text-lg'}`;
const keyStop = (fn) => (e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); fn?.(); } };

/** Turn a typed value negative or back: "-3" ⇄ "3". */
const flipSign = (v) => { const s = String(v || '').trim(); return /^[-−]/.test(s) ? s.replace(/^[-−]\s*/, '') : `-${s}`; };

function TypedBox({ input, lang, value, onChange, onEnter, big, signed, numeric }) {
  const t = words(lang);
  const width = Math.max(4, Math.min(14, Number(input.width) || (numeric ? 5 : 8)));
  return (
    <div className={`flex flex-wrap items-center gap-2 font-bold text-slate-800 dark:text-slate-100 ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
      {input.before && <StepText text={txt(input, 'before', lang)} />}
      <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} onKeyDown={keyStop(onEnter)} autoFocus
        inputMode={numeric && !signed ? 'decimal' : 'text'} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
        placeholder="?" aria-label={t.answer} style={{ width: `${width + 1.5}ch` }} className={boxCls(big)} />
      {(input.after || typeof input.unit === 'string') && <StepText text={txt(input, 'after', lang) || input.unit} />}
      {numeric && signed && (
        <button type="button" onClick={() => onChange(flipSign(value))} aria-label={t.minus} title={t.minus}
          className="ml-1 inline-flex items-center gap-0.5 px-2 h-9 rounded-xl border-2 border-b-[4px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 text-sm font-black active:translate-y-[2px] active:border-b-2">
          <Plus className="w-3.5 h-3.5" strokeWidth={3.5} />/<Minus className="w-3.5 h-3.5" strokeWidth={3.5} />
        </button>
      )}
    </div>
  );
}

function OptionFace({ o, lang, big }) {
  return (
    <span className="flex flex-col items-center gap-1 w-full">
      {o.svg && <span className="w-full flex justify-center rounded-lg dark:bg-white dark:p-1 [&>svg]:max-h-28 [&>svg]:w-auto [&>svg]:max-w-full" dangerouslySetInnerHTML={{ __html: o.svg }} />}
      {o.image && <img src={o.image} alt={o.alt || ''} className="max-h-28 rounded-lg" />}
      {(o.text || o.textVn) && <span className={big ? 'text-xl' : 'text-base'}><StepText text={txt(o, 'text', lang)} /></span>}
    </span>
  );
}

const cardCls = (state, big) => {
  const base = `relative rounded-2xl border-2 border-b-[4px] font-bold text-left transition-all active:translate-y-[2px] active:border-b-2 disabled:cursor-default ${big ? 'px-4 py-3' : 'px-3 py-2'}`;
  if (state === 'wrong') return `${base} border-rose-200 bg-rose-50 text-rose-400 line-through decoration-2 dark:bg-rose-950/30 dark:border-rose-900`;
  if (state === 'on') return `${base} border-[#e8590c] bg-[#fff1e6] text-[#7a2f05] dark:bg-orange-900/30 dark:text-orange-100`;
  return `${base} border-slate-200 bg-white text-slate-800 hover:border-orange-400 hover:bg-orange-50/60 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700`;
};

function Options({ input, lang, seed, isOn, struck = [], onTap, big }) {
  const ids = shownOrder(input, seed);
  const pictures = input.options.some((o) => o.svg || o.image);
  const cols = pictures ? (ids.length === 4 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3') : ids.length > 3 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1';
  return (
    <div className={`grid gap-2 ${cols}`}>
      {ids.map((id) => {
        const o = input.options.find((x) => x.id === id);
        const wrong = struck.includes(id);
        return (
          <button key={id} type="button" disabled={wrong} onClick={() => onTap(id)} className={cardCls(wrong ? 'wrong' : isOn(id) ? 'on' : 'idle', big)}>
            <OptionFace o={o} lang={lang} big={big} />
            {wrong && <X className="absolute top-1.5 right-1.5 w-4 h-4 text-rose-400" strokeWidth={3} />}
            {isOn(id) && !wrong && <Check className="absolute top-1.5 right-1.5 w-4 h-4 text-[#e8590c]" strokeWidth={3} />}
          </button>
        );
      })}
    </div>
  );
}

function OrderInput({ input, lang, seed, value = [], onChange, big }) {
  const ids = shownOrder(input, seed);
  const tap = (id) => onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  return (
    <div className="grid gap-2 grid-cols-1">
      {ids.map((id) => {
        const o = input.items.find((x) => x.id === id);
        const n = value.indexOf(id);
        return (
          <button key={id} type="button" onClick={() => tap(id)} className={`${cardCls(n >= 0 ? 'on' : 'idle', big)} flex items-center gap-3`}>
            <span className={`shrink-0 inline-grid place-items-center w-7 h-7 rounded-full font-black text-sm ${n >= 0 ? 'bg-[#e8590c] text-white' : 'border-2 border-dashed border-slate-300 dark:border-slate-600'}`}>{n >= 0 ? n + 1 : ''}</span>
            <span className={big ? 'text-xl' : 'text-base'}><StepText text={txt(o, 'text', lang)} /></span>
          </button>
        );
      })}
    </div>
  );
}

function GapInput({ input, value = [], onChange, onEnter, big }) {
  const parts = gapParts(input.text);
  const set = (i, v) => { const next = [...value]; next[i] = v; onChange(next); };
  const firstEmpty = parts.slice(1).findIndex((_, i) => !value[i]);
  const fromBank = (w) => set(firstEmpty === -1 ? parts.length - 2 : firstEmpty, w);
  return (
    <div className="flex flex-col gap-3">
      <p className={`font-bold text-slate-800 dark:text-slate-100 leading-loose ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
        {parts.map((p, i) => (
          <span key={i}>
            <StepText text={p} />
            {i < parts.length - 1 && (
              <input value={value[i] ?? ''} onChange={(e) => set(i, e.target.value)} onKeyDown={keyStop(onEnter)} autoFocus={i === 0}
                autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} placeholder="?" aria-label={`gap ${i + 1}`}
                style={{ width: `${Math.max(5, (value[i] || '').length + 3) * (big ? 1.25 : 1.1)}ch` }} className={`${boxCls(big)} mx-1 align-baseline`} />
            )}
          </span>
        ))}
      </p>
      {input.bank && (
        <div className="flex flex-wrap gap-2">
          {input.bank.map((w) => (
            <button key={w} type="button" onClick={() => fromBank(w)} className={`${cardCls(value.includes(w) ? 'on' : 'idle', big)} !py-1`}>{w}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function TapInput({ input, value = [], onChange, onPick, big }) {
  const single = (input.answer || []).length === 1;
  const tap = (n) => (single ? onPick([n]) : onChange(value.includes(n) ? value.filter((x) => x !== n) : [...value, n]));
  return (
    <p className={`flex flex-wrap gap-x-1 gap-y-2 font-bold text-slate-800 dark:text-slate-100 ${big ? 'text-2xl' : 'text-xl'}`}>
      {wordsOf(input.sentence).map((w) => (
        <span key={w.n} className="inline-flex items-baseline">
          {w.pre}
          <button type="button" onClick={() => tap(w.n)}
            className={`rounded-lg px-1.5 py-0.5 border-2 border-b-[3px] transition-colors ${value.includes(w.n) ? 'border-[#e8590c] bg-[#fff1e6] text-[#7a2f05] dark:bg-orange-900/30 dark:text-orange-100' : 'border-transparent hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-slate-800'}`}>
            {w.word}
          </button>
          {w.post}
        </span>
      ))}
    </p>
  );
}

/** The widget for a step's input. */
export default function StepInput({ input, lang, seed, value: raw, onChange, onEnter, onPick, struck, big = false, signed = false }) {
  const value = raw ?? (['multi', 'order', 'gap', 'tap'].includes(input.type) ? [] : '');
  switch (input.type) {
    case 'number': return <TypedBox input={input} lang={lang} value={value} onChange={onChange} onEnter={onEnter} big={big} signed={signed || input.signed} numeric />;
    case 'text': return <TypedBox input={input} lang={lang} value={value} onChange={onChange} onEnter={onEnter} big={big} />;
    case 'choice': return <Options input={input} lang={lang} seed={seed} isOn={() => false} struck={struck} onTap={(id) => onPick(id)} big={big} />;
    case 'multi': {
      const v = value || [];
      return <Options input={input} lang={lang} seed={seed} isOn={(id) => v.includes(id)} onTap={(id) => onChange(v.includes(id) ? v.filter((x) => x !== id) : [...v, id])} big={big} />;
    }
    case 'order': return <OrderInput input={input} lang={lang} seed={seed} value={value} onChange={onChange} big={big} />;
    case 'gap': return <GapInput input={input} value={value} onChange={onChange} onEnter={onEnter} big={big} />;
    case 'tap': return <TapInput input={input} value={value} onChange={onChange} onPick={onPick} big={big} />;
    default: return null;
  }
}
