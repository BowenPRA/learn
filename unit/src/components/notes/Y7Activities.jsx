import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, GripVertical, CornerDownRight, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';
import { SafeInlineMath } from './SafeMath.jsx';
import { keepWhere } from '../../utils/activity';
import { tr } from '../../utils/lang';
import {
  collectModel, expandModel, equationModel, diagnoseSimplify, diagnoseExpand, diagnoseSolve, diagnoseCell,
  opLatex, opText, inverseOf, sameOp, valueText,
} from '../../utils/algebra';
import { querySymbols, elementBySymbol } from '../../utils/elements';
import { boxSvg, classifyBox, countsOf, formulaPretty, particleCardSvg, keyOfElements, diagnoseFormula } from '../../utils/particles';
import PeriodicTableSVG from '../science/PeriodicTableSVG.jsx';

/**
 * The Year 7 deck activities (Maths 2.3–2.5, Science 2.5–2.7). Rendered by
 * ActivityBlock; validated by utils/activity.js; schemas in
 * docs/y7-math/algebra-engines.md §3 and docs/y7-science/particle-engines.md §3.
 * Every answer is derived — from the expression, the equation, the table query
 * or the particles — and a wrong answer is answered by NAME (the invisible 1,
 * the sign left behind, did-instead-of-undid, capitals) before the authored
 * `explain`.
 *
 * Contract (the same as the other activities): `result` is the stored
 * `{ done, correct, … }`; `onResult` is called once, with done: true. `retry`
 * is the previous wrong result when the activity is reopened to be fixed: the
 * several-part ones start from the parts that were right (ActivityBlock.jsx).
 */

const pickL = tr;
const said = (lang, msg) => (msg ? pickL(lang, msg.en, msg.vn, msg.fr) : '');
/** An engine's verdict, every language it carries. */
const verdictOf = (d) => ({ en: d.en, vn: d.vn, fr: d.fr });

const T = {
  en: {
    check: 'Check', tapTerm: 'Tap a term, then its basket', dropHere: 'Tap to place', allPlaced: 'All placed',
    answer: 'Answer', tryAgain: 'One more try', typeHere: 'Type your answer', nudge: 'Nearly',
    element: 'Element', compound: 'Compound', mixture: 'Mixture', pure: 'Pure', yes: 'Yes', no: 'No',
    atoms: 'atoms', total: 'Atoms altogether', key: 'Key', undo: 'Undo each step', selected: 'selected',
    forward: 'What was done to the letter', backward: 'Undo it — last step first',
    tapBoxes: 'Tap every box that fits',
  },
  vn: {
    check: 'Kiểm tra', tapTerm: 'Chạm một hạng tử, rồi chạm rổ của nó', dropHere: 'Chạm để đặt', allPlaced: 'Đã đặt hết',
    answer: 'Đáp án', tryAgain: 'Thử lại một lần nữa', typeHere: 'Nhập đáp án', nudge: 'Gần đúng',
    element: 'Nguyên tố', compound: 'Hợp chất', mixture: 'Hỗn hợp', pure: 'Tinh khiết', yes: 'Có', no: 'Không',
    atoms: 'nguyên tử', total: 'Tổng số nguyên tử', key: 'Chú thích', undo: 'Làm ngược từng bước', selected: 'đã chọn',
    forward: 'Những gì đã làm với chữ cái', backward: 'Làm ngược lại — bước cuối trước',
    tapBoxes: 'Chạm vào mọi ô phù hợp',
  },
  fr: {
    check: 'Vérifier', tapTerm: 'Touche un terme, puis son panier', dropHere: 'Touche pour placer', allPlaced: 'Tout est placé',
    answer: 'Réponse', tryAgain: 'Encore un essai', typeHere: 'Écris ta réponse', nudge: 'Presque',
    element: 'Élément', compound: 'Composé', mixture: 'Mélange', pure: 'Corps pur', yes: 'Oui', no: 'Non',
    atoms: 'atomes', total: 'Nombre total d’atomes', key: 'Légende', undo: 'Annule chaque étape', selected: 'choisi(s)',
    forward: 'Ce qu’on a fait à la lettre', backward: 'Annule — la dernière étape d’abord',
    tapBoxes: 'Touche chaque boîte qui convient',
  },
};

const btn = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const primary = `${btn} bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]`;
const GOOD = 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]';
const BAD = 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]';
const IDLE = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200';

/** Deterministic order from a seed string, so a slide looks the same every visit. */
function seeded(list, seed) {
  let h = 2166136261;
  for (const ch of String(seed)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  const rand = () => { h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) { const j = Math.floor(rand() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}
// A value as KaTeX: the util prints a typographic minus for plain text.
const numTex = (c) => valueText(c).replace('−', '-');
const hashOf = (s) => { let h = 7; for (const ch of String(s)) h = (Math.imul(h, 31) + ch.charCodeAt(0)) >>> 0; return h || 1; };

function Verdict({ ok, lang, children }) {
  return (
    <div className={`rounded-xl border-2 mt-3 p-3 ${ok ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
      <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {ok ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
        {ok ? tr(lang, 'Correct', 'Chính xác', 'Correct !') : tr(lang, 'Not quite', 'Chưa đúng', 'Pas tout à fait')}
      </div>
      <div className={`font-bold leading-relaxed text-sm lg:text-base ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>{children}</div>
    </div>
  );
}

function Hint({ tone = 'bad', children }) {
  const style = tone === 'nudge'
    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
    : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-2 flex items-start gap-2 p-2.5 rounded-xl border-2 font-bold text-sm leading-relaxed ${style}`}>
      {tone === 'nudge' ? <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} /> : <XCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} />}
      <span>{children}</span>
    </div>
  );
}

/** A maths answer box: plain text in, Enter checks. */
function MathInput({ value, onChange, onEnter, disabled, state, placeholder, width = 'w-full', label }) {
  const ring = state === 'good' ? GOOD : state === 'bad' ? BAD : state === 'shown' ? 'bg-amber-50 border-amber-400 text-amber-800' : IDLE;
  return (
    <input
      value={value ?? ''}
      disabled={disabled}
      aria-label={label}
      placeholder={placeholder}
      spellCheck={false}
      autoComplete="off"
      autoCapitalize="off"
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter') onEnter?.(); }}
      className={`${width} px-3 py-2 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 disabled:opacity-90 ${ring}`}
    />
  );
}

const signedChip = (t) => `${t.coef[0] < 0 ? '-' : '+'}\\,${t.abs}`;

// ── terms: sort the signed terms into like-term baskets ─────────────────────

export function TermsActivity({ activity, lang, result, onResult, parseText, retry }) {
  const t = T[lang] || T.en;
  const model = useMemo(() => collectModel(activity.expr), [activity.expr]);
  const chips = useMemo(() => seeded(model.written, `${activity.id}-chips`), [model, activity.id]);
  const baskets = useMemo(() => seeded(model.baskets, `${activity.id}-baskets`), [model, activity.id]);
  const [placed, setPlaced] = useState(() => result?.placed
    || keepWhere(retry?.placed, (idx, key) => model.written.some((w) => String(w.index) === idx && w.key === key)));
  const [picked, setPicked] = useState(null);
  const [dragged, setDragged] = useState(null);
  const checked = !!result?.done;
  const bank = chips.filter((c) => placed[c.index] == null);

  const put = (idx, key) => { if (checked) return; setPlaced((p) => ({ ...p, [idx]: key })); setPicked(null); setDragged(null); };
  const unput = (idx) => { if (checked) return; setPlaced((p) => { const n = { ...p }; delete n[idx]; return n; }); };
  const check = () => onResult({ done: true, correct: model.written.every((w) => placed[w.index] === w.key), placed });

  const chip = (c, inBasket) => {
    const ok = checked ? placed[c.index] === c.key : null;
    const style = checked ? (ok ? GOOD : BAD) : picked === c.index ? 'bg-[#1cb0f6] border-[#1899d6] text-white scale-105' : `${IDLE} hover:-translate-y-0.5`;
    return (
      <button key={c.index} draggable={!checked}
        onDragStart={(e) => { setDragged(c.index); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(c.index)); }}
        onClick={(e) => { e.stopPropagation(); if (checked) return; if (inBasket) unput(c.index); else setPicked(picked === c.index ? null : c.index); }}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-b-[4px] font-bold text-lg transition-all ${style}`}>
        {!checked && !inBasket && <GripVertical className="w-3.5 h-3.5 opacity-40" strokeWidth={3} />}
        <SafeInlineMath math={signedChip(c)} />
      </button>
    );
  };

  return (
    <div>
      <div className="text-xl text-slate-800 dark:text-slate-100 mb-2 overflow-x-auto"><SafeInlineMath math={model.questionLatex} /></div>
      {!checked && (
        <div className="flex flex-wrap gap-2 items-center justify-center p-2.5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/40 min-h-[52px] mb-2">
          {bank.length === 0
            ? <span className="text-slate-400 font-black uppercase tracking-widest text-xs flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{t.allPlaced}</span>
            : bank.map((c) => chip(c, false))}
        </div>
      )}
      <div className={`grid gap-2 ${baskets.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {baskets.map((b) => {
          // After the check every chip moves to its true basket (a misplaced one
          // stays red), so each basket's total matches what is in it.
          const here = chips.filter((c) => (checked ? c.key : placed[c.index]) === b.key);
          const active = picked != null && !checked;
          return (
            <div key={b.key}
              onClick={() => picked != null && put(picked, b.key)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); if (dragged != null) put(dragged, b.key); }}
              className={`rounded-2xl border-2 overflow-hidden bg-white dark:bg-slate-800 transition-all ${active ? 'border-[#1cb0f6] ring-4 ring-[#1cb0f6]/20 cursor-pointer' : 'border-slate-200 dark:border-slate-700'}`}>
              <div className="bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-700 px-3 py-1.5 font-black text-slate-600 dark:text-slate-300 text-sm text-center">
                {said(lang, b.name)}
              </div>
              <div className="p-2 min-h-[52px] flex flex-wrap gap-1.5 items-center">
                {here.length === 0 && (
                  <span className={`flex items-center gap-1.5 font-black uppercase tracking-widest text-[10px] ${active ? 'text-[#1cb0f6] animate-pulse' : 'text-slate-300 dark:text-slate-600'}`}>
                    <CornerDownRight className="w-3.5 h-3.5" />{active ? t.dropHere : t.tapTerm}
                  </span>
                )}
                {here.map((c) => chip(c, true))}
              </div>
              {checked && (
                <div className="px-3 pb-2 text-base text-slate-700 dark:text-slate-200">
                  <SafeInlineMath math={`\\to ${b.totalLatex}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!checked && <div className="mt-3 flex justify-end"><button onClick={check} disabled={bank.length > 0} className={primary}>{t.check}</button></div>}
      {checked && (
        <Verdict ok={result.correct} lang={lang}>
          <div className="mb-1 text-lg"><SafeInlineMath math={`${model.questionLatex} = ${model.answerLatex}`} /></div>
          {parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}
        </Verdict>
      )}
    </div>
  );
}

// ── algebra: type a simplified / expanded expression, or a solution ─────────

export function AlgebraActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const mode = activity.mode;
  const model = useMemo(() => {
    if (mode === 'simplify') return collectModel(activity.expr);
    if (mode === 'expand') return expandModel(activity.expr);
    return equationModel({ eq: activity.eq });
  }, [mode, activity.expr, activity.eq]);
  const question = mode === 'solve' ? model.eqLatex : model.questionLatex;
  const answerLatex = mode === 'solve' ? `${model.letter} = ${numTex(model.solution)}` : model.answerLatex;
  const [typed, setTyped] = useState(result?.typed || '');
  const [tries, setTries] = useState(result?.tries || 0);
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;

  const diagnose = (v) => (mode === 'simplify' ? diagnoseSimplify(activity.expr, v) : mode === 'expand' ? diagnoseExpand(activity.expr, v) : diagnoseSolve(model, v));
  const check = () => {
    if (checked || !typed.trim()) return;
    const d = diagnose(typed);
    if (d.ok) { onResult({ done: true, correct: true, typed, tries: tries + 1 }); return; }
    if (d.equivalent || d.code === 'unreadable') { setMsg({ tone: 'nudge', d }); return; }
    const n = tries + 1;
    setTries(n);
    if (n >= 2) onResult({ done: true, correct: false, typed, tries: n, why: verdictOf(d) });
    else setMsg({ tone: 'bad', d });
  };

  return (
    <div>
      <div className="text-2xl text-slate-800 dark:text-slate-100 mb-2 overflow-x-auto">
        <SafeInlineMath math={mode === 'solve' ? question : `${question} =`} />
      </div>
      <div className="flex items-center gap-2">
        {mode === 'solve' && <span className="text-xl text-slate-700 dark:text-slate-200"><SafeInlineMath math={`${model.letter} =`} /></span>}
        <MathInput value={typed} disabled={checked} onChange={(v) => { setTyped(v); setMsg(null); }} onEnter={check}
          placeholder={t.typeHere} label={t.typeHere} state={checked ? (result.correct ? 'good' : 'bad') : null} />
        {!checked && <button onClick={check} disabled={!typed.trim()} className={primary}>{t.check}</button>}
      </div>
      {!checked && msg && (
        <Hint tone={msg.tone}>{msg.tone === 'bad' && <span className="mr-1 uppercase text-[10px] tracking-widest">{t.tryAgain} ·</span>}{said(lang, msg.d)}</Hint>
      )}
      {checked && (
        <Verdict ok={result.correct} lang={lang}>
          {!result.correct && result.why && <div className="mb-1">{said(lang, result.why)}</div>}
          <div className="mb-1 text-lg"><span className="text-[10px] uppercase tracking-widest mr-2">{t.answer}</span><SafeInlineMath math={answerLatex} /></div>
          {parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}
        </Verdict>
      )}
    </div>
  );
}

// ── grid: expand one bracket box by box ─────────────────────────────────────

export function GridActivity({ activity, lang, result, onResult, parseText, retry }) {
  const t = T[lang] || T.en;
  const model = useMemo(() => expandModel(activity.expr), [activity.expr]);
  const b = model.brackets[0];
  const [cells, setCells] = useState(() => result?.cells || keepWhere(retry?.cells, (i) => retry?.marks?.[i] === 'good'));
  const checked = !!result?.done;
  const marks = checked ? result.marks : {};
  const filled = b.inner.every((_, i) => String(cells[i] ?? '').trim());
  const check = () => {
    const out = {};
    let first = null;
    b.inner.forEach((inner, i) => {
      const d = diagnoseCell(b.outer, inner, cells[i]);
      out[i] = d.ok ? 'good' : 'bad';
      if (!d.ok && !first) first = verdictOf(d);
    });
    onResult({ done: true, correct: Object.values(out).every((m) => m === 'good'), cells, marks: out, why: first });
  };
  const col = `minmax(4.5rem, 1fr)`;
  return (
    <div>
      <div className="text-2xl text-slate-800 dark:text-slate-100 mb-2"><SafeInlineMath math={model.questionLatex} /></div>
      <div className="overflow-x-auto">
        <div className="inline-grid gap-1.5" style={{ gridTemplateColumns: `3.5rem repeat(${b.inner.length}, ${col})` }}>
          <div className="rounded-xl bg-slate-700 text-white font-black text-xl flex items-center justify-center">×</div>
          {b.inner.map((inner, i) => (
            <div key={`h${i}`} className="rounded-xl bg-orange-100 dark:bg-orange-900/40 border-2 border-orange-300 dark:border-orange-700 text-lg text-orange-900 dark:text-orange-100 flex items-center justify-center py-1.5">
              <SafeInlineMath math={i === 0 ? inner.latex : `${inner.coef[0] < 0 ? '' : '+'}${inner.latex}`} />
            </div>
          ))}
          <div className="rounded-xl bg-violet-100 dark:bg-violet-900/40 border-2 border-violet-300 dark:border-violet-700 text-lg text-violet-900 dark:text-violet-100 flex items-center justify-center">
            <SafeInlineMath math={b.outer.latex} />
          </div>
          {b.inner.map((inner, i) => (
            <MathInput key={`c${i}`} value={cells[i]} disabled={checked} state={marks[i]} label={`box ${i + 1}`}
              onChange={(v) => setCells((c) => ({ ...c, [i]: v }))} onEnter={() => filled && !checked && check()} />
          ))}
          {checked && !result.correct && (
            <>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-center">{t.answer}</div>
              {b.cells.map((c, i) => <div key={`a${i}`} className="text-center text-lg text-[#3e7500]"><SafeInlineMath math={c.latex} /></div>)}
            </>
          )}
        </div>
      </div>
      {!checked && <div className="mt-3 flex justify-end"><button onClick={check} disabled={!filled} className={primary}>{t.check}</button></div>}
      {checked && (
        <Verdict ok={result.correct} lang={lang}>
          {!result.correct && result.why && <div className="mb-1">{said(lang, result.why)}</div>}
          <div className="mb-1 text-lg"><SafeInlineMath math={`${model.questionLatex} = ${model.answerLatex}`} /></div>
          {parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}
        </Verdict>
      )}
    </div>
  );
}

// ── flow: reverse the flow chart ────────────────────────────────────────────

const opKey = (o) => `${o.op}${o.n}`;

export function FlowActivity({ activity, lang, result, onResult, parseText, retry }) {
  const t = T[lang] || T.en;
  const model = useMemo(() => equationModel({ eq: activity.eq }), [activity.eq]);
  const steps = model.inverse.length;
  // Each reversed arrow offers its inverse, the operation itself (did instead
  // of undid) and, with two steps or more, the other step's inverse (wrong order).
  const choices = useMemo(() => model.inverse.map((inv, k) => {
    const same = model.ops[model.ops.length - 1 - k];
    const pool = [inv, same, ...model.inverse.filter((_, j) => j !== k)];
    const uniq = [];
    for (const o of pool) if (!uniq.some((u) => sameOp(u, o))) uniq.push(o);
    return seeded(uniq, `${activity.id}-${k}`);
  }), [model, activity.id]);
  const [picks, setPicks] = useState(() => result?.picks || keepWhere(retry?.picks, (k) => !!retry?.opOk?.[k]));
  const [vals, setVals] = useState(() => result?.vals || keepWhere(retry?.vals, (k) => !!retry?.valOk?.[k]));
  const checked = !!result?.done;
  const ready = Array.from({ length: steps }, (_, k) => picks[k] && String(vals[k] ?? '').trim()).every(Boolean);

  const check = () => {
    let why = null;
    const opOk = model.inverse.map((inv, k) => picks[k] === opKey(inv));
    const valOk = model.inverse.map((_, k) => {
      const d = diagnoseSolve({ ...model, solution: model.back[k + 1] }, vals[k]);
      return d.ok;
    });
    const picked = (k) => choices[k].find((o) => opKey(o) === picks[k]);
    if (opOk.some((ok) => !ok)) {
      const k = opOk.findIndex((ok) => !ok);
      const p = picked(k);
      const same = model.ops[model.ops.length - 1 - k];
      if (p && sameOp(p, same)) {
        why = {
          en: `That does ${opText(same)} again. Undo it with the inverse: ${opText(inverseOf(same))}.`,
          vn: `Đó là làm lại ${opText(same)}. Hãy làm ngược bằng phép ngược: ${opText(inverseOf(same))}.`,
          fr: `Ça refait ${opText(same)}. Annule-le avec l’opération inverse : ${opText(inverseOf(same))}.`,
        };
      } else {
        why = {
          en: 'Undo the LAST step first — socks and shoes.',
          vn: 'Làm ngược bước CUỐI trước — như tất và giày.',
          fr: 'Annule d’abord la DERNIÈRE étape — comme les chaussettes et les chaussures.',
        };
      }
    } else if (valOk.some((ok) => !ok)) {
      why = {
        en: 'Check each box: apply the operation on the arrow to the number before it.',
        vn: 'Kiểm tra từng ô: áp dụng phép toán trên mũi tên cho số đứng trước.',
        fr: 'Vérifie chaque case : applique l’opération de la flèche au nombre qui la précède.',
      };
    }
    onResult({ done: true, correct: opOk.every(Boolean) && valOk.every(Boolean), picks, vals, opOk, valOk, why });
  };

  const box = (content, tone = 'plain') => (
    <div className={`min-w-[3.25rem] px-2 py-1.5 rounded-xl border-2 text-lg text-center ${tone === 'target' ? 'bg-slate-800 text-white border-slate-900' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100'}`}>{content}</div>
  );
  const arrow = (latex, dir = 'right') => (
    <div className="flex flex-col items-center text-slate-500 dark:text-slate-400 text-sm">
      <SafeInlineMath math={latex} />
      {dir === 'right' ? <ArrowRight className="w-5 h-5" strokeWidth={3} /> : <ArrowLeft className="w-5 h-5" strokeWidth={3} />}
    </div>
  );

  return (
    <div>
      <div className="text-2xl text-slate-800 dark:text-slate-100 mb-2"><SafeInlineMath math={model.eqLatex} /></div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.forward}</div>
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {box(<SafeInlineMath math={model.letter} />)}
        {model.ops.map((o, k) => (
          <span key={k} className="flex items-center gap-1.5">
            {arrow(opLatex(o))}
            {box(<SafeInlineMath math={k === model.ops.length - 1 ? numTex(model.target) : model.stepsLatex[k]} />, k === model.ops.length - 1 ? 'target' : 'plain')}
          </span>
        ))}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.backward}</div>
      <div className="flex flex-wrap items-stretch gap-1.5">
        <div className="flex items-center">{box(<SafeInlineMath math={numTex(model.target)} />, 'target')}</div>
        {model.inverse.map((inv, k) => {
          const opState = checked ? (result.opOk[k] ? GOOD : BAD) : '';
          return (
            <div key={k} className="flex items-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 px-1.5 py-1">
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex gap-1">
                  {choices[k].map((o) => {
                    const on = picks[k] === opKey(o);
                    const right = checked && opKey(o) === opKey(inv);
                    const style = checked ? (on ? opState : right ? 'border-[#58a700] text-[#3e7500] bg-white' : 'opacity-40 border-slate-200') : on ? 'bg-[#1cb0f6] border-[#1899d6] text-white' : IDLE;
                    return (
                      <button key={opKey(o)} disabled={checked} onClick={() => setPicks((p) => ({ ...p, [k]: opKey(o) }))}
                        className={`px-2 py-1 rounded-lg border-2 border-b-[3px] text-sm font-bold ${style}`}>
                        <SafeInlineMath math={opLatex(o)} />
                      </button>
                    );
                  })}
                </div>
                <ArrowRight className="w-6 h-4 text-slate-400" strokeWidth={3} />
              </div>
              <div className="flex items-center gap-1">
                {k === steps - 1 && <span className="text-lg text-slate-700 dark:text-slate-200"><SafeInlineMath math={`${model.letter} =`} /></span>}
                <MathInput width="w-16" value={vals[k]} disabled={checked} label={`box ${k + 1}`}
                  state={checked ? (result.valOk[k] ? 'good' : 'bad') : null}
                  onChange={(v) => setVals((s) => ({ ...s, [k]: v }))} onEnter={() => ready && !checked && check()} />
              </div>
            </div>
          );
        })}
      </div>
      {!checked && <div className="mt-3 flex justify-end"><button onClick={check} disabled={!ready} className={primary}>{t.check}</button></div>}
      {checked && (
        <Verdict ok={result.correct} lang={lang}>
          {!result.correct && result.why && <div className="mb-1">{said(lang, result.why)}</div>}
          <div className="mb-1 text-base">
            <SafeInlineMath math={[numTex(model.target), ...model.inverse.map((o, k) => `\\xrightarrow{${opLatex(o)}} ${numTex(model.back[k + 1])}`)].join(' ')} />
            <span className="ml-2"><SafeInlineMath math={`\\Rightarrow ${model.letter} = ${numTex(model.solution)}`} /></span>
          </div>
          {parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}
        </Verdict>
      )}
    </div>
  );
}

// ── periodic: tap tiles on the first-20 table ──────────────────────────────

export function PeriodicActivity({ activity, lang, result, onResult, parseText, retry }) {
  const t = T[lang] || T.en;
  const targets = useMemo(() => querySymbols(activity.query), [activity.query]);
  const single = targets.length === 1 && (activity.query.sym || activity.query.name || (activity.query.period != null && activity.query.group != null));
  // A retry of a pick-them-all question keeps the right tiles; a one-tile
  // question starts again.
  const [sel, setSel] = useState(() => result?.sel || (single ? [] : (retry?.sel || []).filter((x) => targets.includes(x))));
  const [tries, setTries] = useState(result?.tries || 0);
  const [miss, setMiss] = useState(null);
  const checked = !!result?.done;
  // A metal question is not answered by the tile colours.
  const colourByMetal = activity.query.metal == null && activity.colours !== false;

  const tap = (sym) => {
    if (checked) return;
    if (single) {
      const n = tries + 1;
      setTries(n);
      if (sym === targets[0]) onResult({ done: true, correct: true, sel: [sym], tries: n });
      else if (n >= 2) onResult({ done: true, correct: false, sel: [sym], tries: n });
      else { setMiss(sym); setSel([sym]); }
      return;
    }
    setSel((s) => (s.includes(sym) ? s.filter((x) => x !== sym) : [...s, sym]));
  };
  const check = () => onResult({ done: true, correct: sel.length === targets.length && targets.every((x) => sel.includes(x)), sel });

  const highlight = {};
  if (checked) {
    // right taps green, missed targets orange (focus), wrong taps red
    for (const s of targets) highlight[s] = (result.sel || []).includes(s) ? 'good' : 'focus';
    for (const s of result.sel || []) if (!targets.includes(s)) highlight[s] = 'bad';
  } else {
    for (const s of sel) highlight[s] = single ? 'bad' : 'pick';
  }
  const missed = miss ? elementBySymbol(miss) : null;

  return (
    <div>
      <div className="rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white">
        <PeriodicTableSVG highlight={highlight} onTap={tap} showNames={activity.names !== false} colourByMetal={colourByMetal} lang={lang} disabled={checked} />
      </div>
      {!checked && single && missed && (
        <Hint>{t.tryAgain} · {missed.sym} = {pickL(lang, missed.en, missed.vn, missed.fr)}</Hint>
      )}
      {!checked && !single && (
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-400">{sel.length} {t.selected}</span>
          <button onClick={check} disabled={!sel.length} className={primary}>{t.check}</button>
        </div>
      )}
      {checked && <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>}
    </div>
  );
}

// ── particles: boxes of particles, sorted ───────────────────────────────────

function AtomKey({ symbols, lang }) {
  const t = T[lang] || T.en;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
      <span className="uppercase tracking-widest text-[10px] text-slate-400">{t.key}</span>
      {keyOfElements(symbols).map((k) => (
        <span key={k.el} className="flex items-center gap-1">
          <span className="inline-block w-3.5 h-3.5 rounded-full border-2" style={{ background: k.fill, borderColor: k.stroke }} />
          {k.el}{k.name ? ` ${said(lang, k.name)}` : ''}
        </span>
      ))}
    </div>
  );
}

const verdictWords = (v, lang) => {
  if (v.kind === 'element') return pickL(lang, 'Element — one kind of atom', 'Nguyên tố — một loại nguyên tử', 'Élément — une seule sorte d’atome');
  if (v.kind === 'compound') return pickL(lang, 'Compound — different atoms bonded', 'Hợp chất — các nguyên tử khác nhau liên kết', 'Composé — des atomes différents liés');
  const of = {
    elements: ['of elements', 'các nguyên tố', 'd’éléments'],
    compounds: ['of compounds', 'các hợp chất', 'de composés'],
    both: ['of elements and compounds', 'nguyên tố và hợp chất', 'd’éléments et de composés'],
  }[v.mixtureOf];
  return pickL(lang, `Mixture ${of[0]} — ${v.substances.length} substances`, `Hỗn hợp ${of[1]} — ${v.substances.length} chất`, `Mélange ${of[2]} — ${v.substances.length} substances`);
};

export function ParticlesActivity({ activity, lang, result, onResult, parseText, retry }) {
  const t = T[lang] || T.en;
  const ask = activity.ask || 'kind';
  const boxes = useMemo(() => activity.boxes || [], [activity.boxes]);
  const verdicts = useMemo(() => boxes.map(classifyBox), [boxes]);
  const svgs = useMemo(() => boxes.map((b, i) => boxSvg(b, hashOf(`${activity.id}-${i}`))), [boxes, activity.id]);
  const symbols = useMemo(() => [...new Set(boxes.flatMap((b) => b.flatMap((f) => countsOf(f).map((c) => c.el))))], [boxes]);
  const checked = !!result?.done;

  const options = ask === 'kind' ? (activity.choices || ['element', 'compound', 'mixture']).map((c) => [c, t[c]])
    : ask === 'pure' ? [['pure', t.pure], ['mixture', t.mixture]]
      : ask === 'magnet' ? [['yes', t.yes], ['no', t.no]] : [];
  const truth = (i) => {
    const v = verdicts[i];
    if (ask === 'kind') return v.kind;
    if (ask === 'pure') return v.pure ? 'pure' : 'mixture';
    if (ask === 'magnet') return v.magnet ? 'yes' : 'no';
    return activity.find === 'pure' ? v.pure : v.kind === activity.find;
  };
  // A retry keeps the boxes that were answered right.
  const [answers, setAnswers] = useState(() => result?.answers
    || keepWhere(retry?.answers, (i, v) => Number(i) < boxes.length
      && (ask === 'find' ? !!v === truth(Number(i)) : v === truth(Number(i)))));
  const ready = ask === 'find' ? Object.values(answers).some(Boolean) : boxes.every((_, i) => answers[i] != null);
  const check = () => {
    const correct = boxes.every((_, i) => (ask === 'find' ? !!answers[i] === truth(i) : answers[i] === truth(i)));
    onResult({ done: true, correct, answers });
  };

  return (
    <div>
      {ask === 'find' && !checked && <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.tapBoxes}</div>}
      <div className={`grid gap-2 ${boxes.length > 1 ? 'grid-cols-2' : 'grid-cols-1 max-w-xs mx-auto'}`}>
        {boxes.map((_, i) => {
          const right = checked ? (ask === 'find' ? !!answers[i] === truth(i) : answers[i] === truth(i)) : null;
          const chosen = ask === 'find' && answers[i];
          return (
            <div key={i} className={`rounded-2xl border-2 p-1.5 transition-all ${checked ? (right ? 'border-[#58a700]' : 'border-[#ea2b2b]') : chosen ? 'border-[#1cb0f6] ring-4 ring-[#1cb0f6]/20' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-900`}>
              <button type="button" disabled={checked || ask !== 'find'} onClick={() => setAnswers((a) => ({ ...a, [i]: !a[i] }))}
                className={`block w-full rounded-xl overflow-hidden [&>svg]:w-full [&>svg]:h-auto ${ask === 'find' && !checked ? 'cursor-pointer' : 'cursor-default'}`}
                dangerouslySetInnerHTML={{ __html: svgs[i] }} aria-label={`box ${i + 1}`} />
              {ask !== 'find' && (
                <div className={`grid gap-1 mt-1.5 ${options.length === 3 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {options.map(([val, label]) => {
                    const on = answers[i] === val;
                    const isTruth = checked && truth(i) === val;
                    const style = checked ? (isTruth ? GOOD : on ? BAD : 'opacity-40 border-slate-200 text-slate-400') : on ? 'bg-[#1cb0f6] border-[#1899d6] text-white' : IDLE;
                    return (
                      <button key={val} disabled={checked} onClick={() => setAnswers((a) => ({ ...a, [i]: val }))}
                        className={`px-1 py-1.5 rounded-lg border-2 border-b-[3px] text-[11px] sm:text-xs font-black ${style}`}>{label}</button>
                    );
                  })}
                </div>
              )}
              {checked && <div className={`mt-1 text-[11px] font-bold text-center ${right ? 'text-[#3e7500]' : 'text-[#c9362a]'}`}>{verdictWords(verdicts[i], lang)}</div>}
            </div>
          );
        })}
      </div>
      <AtomKey symbols={symbols} lang={lang} />
      {!checked && <div className="mt-3 flex justify-end"><button onClick={check} disabled={!ready} className={primary}>{t.check}</button></div>}
      {checked && <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>}
    </div>
  );
}

// ── formula: count the atoms, or write the formula of a drawn particle ──────

export function FormulaActivity({ activity, lang, result, onResult, parseText, retry }) {
  const t = T[lang] || T.en;
  const ask = activity.ask || 'count';
  const counts = useMemo(() => countsOf(activity.formula), [activity.formula]);
  const total = counts.reduce((s, c) => s + c.n, 0);
  // A retry of the counting table keeps the counts that were right; the
  // write-the-formula question starts again.
  const [vals, setVals] = useState(() => result?.vals
    || (ask === 'write' ? {} : keepWhere(retry?.vals, (k) => retry?.marks?.[k] === 'good')));
  const [tries, setTries] = useState(result?.tries || 0);
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;

  if (ask === 'write') {
    const svg = particleCardSvg(activity.formula);
    const check = () => {
      if (checked || !String(vals.f || '').trim()) return;
      const d = diagnoseFormula(activity.formula, vals.f);
      if (d.ok) { onResult({ done: true, correct: true, vals, tries: tries + 1 }); return; }
      const n = tries + 1;
      setTries(n);
      if (n >= 2) onResult({ done: true, correct: false, vals, tries: n, why: verdictOf(d) });
      else setMsg(d);
    };
    return (
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-36 sm:w-40 rounded-2xl overflow-hidden [&>svg]:w-full [&>svg]:h-auto" dangerouslySetInnerHTML={{ __html: svg }} />
          <div className="flex-1 min-w-[10rem]">
            <AtomKey symbols={counts.map((c) => c.el)} lang={lang} />
            <div className="flex items-center gap-2 mt-2">
              <MathInput value={vals.f} disabled={checked} onChange={(v) => { setVals({ f: v }); setMsg(null); }} onEnter={check}
                placeholder="H2O" label="formula" state={checked ? (result.correct ? 'good' : 'bad') : null} />
              {!checked && <button onClick={check} disabled={!String(vals.f || '').trim()} className={primary}>{t.check}</button>}
            </div>
          </div>
        </div>
        {!checked && msg && <Hint><span className="mr-1 uppercase text-[10px] tracking-widest">{t.tryAgain} ·</span>{said(lang, msg)}</Hint>}
        {checked && (
          <Verdict ok={result.correct} lang={lang}>
            {!result.correct && result.why && <div className="mb-1">{said(lang, result.why)}</div>}
            <div className="mb-1 text-lg font-black">{formulaPretty(activity.formula)}</div>
            {parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}
          </Verdict>
        )}
      </div>
    );
  }

  const ready = counts.every((_, i) => String(vals[i] ?? '').trim()) && String(vals.total ?? '').trim();
  const num = (v) => Number(String(v ?? '').trim());
  const check = () => {
    const marks = {};
    counts.forEach((c, i) => { marks[i] = num(vals[i]) === c.n ? 'good' : 'bad'; });
    marks.total = num(vals.total) === total ? 'good' : 'bad';
    onResult({ done: true, correct: Object.values(marks).every((m) => m === 'good'), vals, marks });
  };
  const marks = checked ? result.marks : {};
  return (
    <div>
      <div className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2 tracking-wide">{formulaPretty(activity.formula)}</div>
      <div className="flex flex-col gap-1.5">
        {counts.map((c, i) => {
          const el = elementBySymbol(c.el);
          return (
            <div key={c.el} className="flex items-center gap-2">
              <span className="w-10 text-center font-black text-lg text-slate-800 dark:text-slate-100">{c.el}</span>
              <span className="flex-1 text-sm font-bold text-slate-500 dark:text-slate-400">{el ? pickL(lang, el.en, el.vn, el.fr) : ''} · {t.atoms}</span>
              <MathInput width="w-16" value={vals[i]} disabled={checked} state={marks[i]} label={`${c.el} atoms`}
                onChange={(v) => setVals((s) => ({ ...s, [i]: v.replace(/[^\d]/g, '') }))} onEnter={() => ready && !checked && check()} />
              {checked && marks[i] === 'bad' && <span className="font-black text-[#3e7500]">{c.n}</span>}
            </div>
          );
        })}
        <div className="flex items-center gap-2 border-t-2 border-slate-100 dark:border-slate-800 pt-1.5">
          <span className="flex-1 text-sm font-black text-slate-600 dark:text-slate-300">{t.total}</span>
          <MathInput width="w-16" value={vals.total} disabled={checked} state={marks.total} label="total atoms"
            onChange={(v) => setVals((s) => ({ ...s, total: v.replace(/[^\d]/g, '') }))} onEnter={() => ready && !checked && check()} />
          {checked && marks.total === 'bad' && <span className="font-black text-[#3e7500]">{total}</span>}
        </div>
      </div>
      {!checked && <div className="mt-3 flex justify-end"><button onClick={check} disabled={!ready} className={primary}>{t.check}</button></div>}
      {checked && <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>}
    </div>
  );
}

