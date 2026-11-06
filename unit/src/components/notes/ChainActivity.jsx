import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, CornerDownRight, Wrench } from 'lucide-react';
import { chainActivityRound, markRound, itemOf } from '../../utils/stateChain';
import { tr } from '../../utils/lang';

/**
 * Explain It's chain, on a slide (the `chain` deck activity) — and the two
 * boards the Explain It task (src/tasks/ExplainIt.jsx) reuses.
 *
 *   build  a scenario's links, shuffled with two traps: tap them into the
 *          steps in order. Right when every step is right.
 *   fix    the whole chain with one link swapped for a trap: tap the broken
 *          link, then choose what replaces it. Right when both are.
 *
 * The round is derived by utils/stateChain.js (`chainActivityRound`), seeded by
 * the activity id, so the slide looks the same on every visit; the marker
 * answers each trap chosen by its own why before the authored `explain`.
 *
 * Contract (ActivityBlock.jsx): `result` is the stored `{ done, correct, … }`;
 * `onResult` is called once. The prompt is rendered by ActivityBlock's header.
 * Activity items carry no `text` field, so the narration never reads them.
 */

const pickL = tr;
const said = (lang, msg) => (msg ? pickL(lang, msg.en, msg.vn, msg.fr) : '');
/** A link or trap's sentence in `lang` (the engine's `fr` beside its `vn`), English when it has none. */
const linkText = (id, lang) => { const it = itemOf(id); return it ? pickL(lang, it.en, it.vn, it.fr) : ''; };

const CHAIN_T = {
  en: {
    check: 'Check', step: 'Step', empty: 'Tap a link below', next: 'The next link goes here',
    bank: 'Links — tap one to add it', tapBroken: 'Tap the broken link', replaceWith: 'Replace it with',
    pickFirst: 'Tap the broken link first', shouldBe: 'should be', fine: 'this one was fine', broken: 'broken',
    correct: 'Correct', notQuite: 'Not quite', chain: 'The chain',
  },
  vn: {
    check: 'Kiểm tra', step: 'Bước', empty: 'Chạm một mắt xích bên dưới', next: 'Mắt xích tiếp theo đặt ở đây',
    bank: 'Các mắt xích — chạm để thêm', tapBroken: 'Chạm vào mắt xích bị hỏng', replaceWith: 'Thay bằng',
    pickFirst: 'Hãy chạm vào mắt xích bị hỏng trước', shouldBe: 'phải là', fine: 'mắt xích này không sai', broken: 'bị hỏng',
    correct: 'Chính xác', notQuite: 'Chưa đúng', chain: 'Chuỗi giải thích',
  },
  fr: {
    check: 'Vérifier', step: 'Étape', empty: 'Touche un maillon ci-dessous', next: 'Le maillon suivant va ici',
    bank: 'Maillons — touche-en un pour l’ajouter', tapBroken: 'Touche le maillon cassé', replaceWith: 'Remplace-le par',
    pickFirst: 'Touche d’abord le maillon cassé', shouldBe: 'devrait être', fine: 'celui-ci était juste', broken: 'cassé',
    correct: 'Correct !', notQuite: 'Pas tout à fait', chain: 'La chaîne',
  },
};

const LOOK = {
  idle: 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-100 hover:border-[#1cb0f6]',
  picked: 'bg-[#ddf4ff] dark:bg-sky-900/40 border-[#1cb0f6] text-[#1482b8] dark:text-sky-200',
  good: 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]',
  bad: 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]',
  answer: 'bg-white dark:bg-slate-900 border-[#58a700] text-[#3e7500] dark:text-[#8ee04e]',
  muted: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500',
  empty: 'bg-slate-50 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-700 text-slate-400',
  slot: 'bg-slate-50 dark:bg-slate-900/40 border-dashed border-[#1cb0f6] text-[#1899d6] dark:text-sky-300',
};

/** One link of a chain: a numbered step, a card in the bank, or a replacement option. */
export function LinkCard({ n, look = 'idle', onClick, disabled, children, note, noteTone, dense = false }) {
  const Tag = onClick && !disabled ? 'button' : 'div';
  return (
    <Tag type={Tag === 'button' ? 'button' : undefined} onClick={onClick}
      className={`w-full min-w-0 flex items-start gap-2 text-left rounded-xl border-2 border-b-[4px] px-2.5 ${dense && (look === 'empty' || look === 'slot') ? 'py-0.5' : dense || look === 'empty' || look === 'slot' ? 'py-1' : 'py-1.5 sm:py-2'} font-bold text-[13px] sm:text-sm leading-snug transition-all ${Tag === 'button' ? 'active:border-b-2 active:translate-y-[2px] cursor-pointer' : ''} ${LOOK[look] || LOOK.idle}`}>
      {n != null && (
        <span className={`${dense ? 'w-4 h-4 text-[10px]' : 'w-5 h-5 text-[11px]'} mt-px rounded-md bg-black/5 dark:bg-white/10 flex items-center justify-center font-black shrink-0`}>{n}</span>
      )}
      <span className="flex-1 min-w-0">
        {children}
        {note && <span className={`block mt-0.5 text-xs font-black ${noteTone === 'good' ? 'text-[#3e7500] dark:text-[#8ee04e]' : noteTone === 'warn' ? 'text-amber-600 dark:text-amber-400' : 'opacity-80'}`}>{note}</span>}
      </span>
      {look === 'good' && <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={3} />}
      {look === 'bad' && <XCircle className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={3} />}
    </Tag>
  );
}

/** A wrong link, struck through on one line, with the right link under it. */
function Swap({ wrong, right, label }) {
  return (
    <>
      <span className="block truncate line-through decoration-2 opacity-75 text-[11px] sm:text-xs">{label ? `${label}: ` : ''}{wrong}</span>
      <span className="block text-[#3e7500] dark:text-[#3e7500]">→ {right}</span>
    </>
  );
}

const Label = ({ children, className = 'flex' }) => (
  <div className={`text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 items-center gap-1.5 ${className}`}>{children}</div>
);

/**
 * Build: the steps, then the bank. `slots` is the list of link ids placed so
 * far, in step order (null for an emptied step). Tapping a bank card fills the
 * first empty step; tapping a filled step sends its card back.
 */
export function BuildBoard({ round, slots, onChange, checked, lang, wide = false, after = null, dense = false }) {
  const t = CHAIN_T[lang] || CHAIN_T.en;
  const n = round.chain.length;
  const placed = new Set(slots.filter(Boolean));
  const firstEmpty = Array.from({ length: n }, (_, i) => i).find((i) => !slots[i]);
  const add = (id) => {
    if (checked || firstEmpty == null) return;
    const next = [...slots];
    next[firstEmpty] = id;
    onChange(next);
  };
  const remove = (i) => {
    if (checked) return;
    const next = [...slots];
    next[i] = null;
    onChange(next);
  };
  const steps = (
    <div>
      {!dense && <Label>{t.chain}</Label>}
      <ol className={`flex flex-col ${dense ? 'gap-1' : 'gap-1.5'}`}>
        {round.chain.map((right, i) => {
          const id = slots[i];
          if (!id) {
            return (
              <li key={i}><LinkCard n={i + 1} dense={dense} look={i === firstEmpty && !checked ? 'slot' : 'empty'}>
                <span className="font-black uppercase tracking-widest text-[10px]">{i === firstEmpty ? t.next : t.empty}</span>
              </LinkCard></li>
            );
          }
          const ok = id === right;
          return (
            <li key={i}>
              <LinkCard n={i + 1} dense={dense} look={checked ? (ok ? 'good' : 'bad') : 'idle'} onClick={checked ? undefined : () => remove(i)}>
                {checked && !ok ? <Swap wrong={linkText(id, lang)} right={linkText(right, lang)} /> : linkText(id, lang)}
              </LinkCard>
            </li>
          );
        })}
      </ol>
    </div>
  );
  // Once checked, the bank's column holds whatever the caller puts there (the
  // task's verdict), so a wide screen keeps the steps and the why side by side.
  const bank = checked ? after : (
    <div>
      {/* A phone drops this label: the empty step already says "tap a link below". */}
      <Label className={dense ? 'hidden' : 'hidden sm:flex'}><CornerDownRight className="w-3.5 h-3.5" />{t.bank}</Label>
      <div className={`flex flex-col ${dense ? 'gap-1' : 'gap-1.5'}`}>
        {round.bank.filter((id) => !placed.has(id)).map((id) => (
          <LinkCard key={id} dense={dense} onClick={() => add(id)}>{linkText(id, lang)}</LinkCard>
        ))}
      </div>
    </div>
  );
  return <div className={`grid grid-cols-1 ${dense ? 'gap-2' : 'gap-3'} [&>*]:min-w-0 ${wide ? 'lg:grid-cols-2 lg:items-start' : ''}`}>{steps}{bank}</div>;
}

/**
 * Fix: the chain as shown (one link broken), then the replacements. `pick` is
 * the step tapped, `replace` the option chosen.
 */
export function FixBoard({ round, pick, replace, onPick, onReplace, checked, lang, wide = false, after = null, dense = false }) {
  const t = CHAIN_T[lang] || CHAIN_T.en;
  const rightId = round.chain[round.broken];
  const rows = (
    <div>
      {!dense && <Label><Wrench className="w-3.5 h-3.5" />{t.tapBroken}</Label>}
      <ol className={`flex flex-col ${dense ? 'gap-1' : 'gap-1.5'}`}>
        {round.shown.map((id, i) => {
          const isBroken = i === round.broken;
          let look = pick === i ? 'picked' : 'idle';
          let note = null;
          let tone = null;
          if (checked) {
            if (isBroken) look = pick === i ? 'good' : 'bad';
            else if (pick === i) { look = 'muted'; note = t.fine; tone = 'warn'; }
            else look = 'muted';
          }
          return (
            <li key={i}>
              <LinkCard n={i + 1} dense={dense} look={look} onClick={checked ? undefined : () => onPick(i)} note={note} noteTone={tone}>
                {checked && isBroken ? <Swap wrong={linkText(id, lang)} right={linkText(rightId, lang)} label={t.broken} /> : linkText(id, lang)}
              </LinkCard>
            </li>
          );
        })}
      </ol>
    </div>
  );
  // Once checked, the broken row already shows its right link, so a narrow
  // screen (or the deck's side column) drops the replacement list and keeps
  // only the verdict.
  const options = (
    <div>
      <div className={!checked ? '' : wide ? 'hidden lg:block' : 'hidden'}>
      <Label>{pick == null && !checked ? t.pickFirst : t.replaceWith}</Label>
      <div className={`flex flex-col ${dense ? 'gap-1' : 'gap-1.5'}`}>
        {round.options.map((id) => {
          const look = !checked ? (replace === id ? 'picked' : pick == null ? 'muted' : 'idle')
            : id === rightId ? (replace === id ? 'good' : 'answer') : replace === id ? 'bad' : 'muted';
          return (
            <LinkCard key={id} dense={dense} look={look} disabled={checked || pick == null} onClick={() => onReplace(id)}>
              {linkText(id, lang)}
            </LinkCard>
          );
        })}
      </div>
      </div>
      {checked && after && <div className="lg:mt-3">{after}</div>}
    </div>
  );
  return <div className={`grid grid-cols-1 ${dense ? 'gap-2' : 'gap-3'} [&>*]:min-w-0 ${wide ? 'lg:grid-cols-2 lg:items-start' : ''}`}>{rows}{options}</div>;
}

/** The trap-by-name lines of a mark, as paragraphs. */
export function MarkLines({ mark, lang, skipLast = false }) {
  const lines = skipLast ? mark.explain.slice(0, -1) : mark.explain;
  return lines.map((l, i) => <p key={i} className="mb-1 last:mb-0 text-[13px] sm:text-sm leading-snug">{said(lang, l)}</p>);
}

// ── the deck activity ───────────────────────────────────────────────────────

const btn = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const primary = `${btn} bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]`;

export function ChainActivity({ activity, lang, result, onResult, parseText = (x) => x, side = false }) {
  const t = CHAIN_T[lang] || CHAIN_T.en;
  const round = useMemo(() => chainActivityRound(activity), [activity]);
  const checked = !!result?.done;
  const [slots, setSlots] = useState(() => result?.slots || []);
  const [pick, setPick] = useState(() => (result?.pick ?? null));
  const [replace, setReplace] = useState(() => result?.replace ?? null);

  const answer = round.mode === 'build' ? { slots } : { pick, replace };
  const ready = round.mode === 'build' ? round.chain.every((_, i) => slots[i]) : pick != null && replace != null;
  const mark = checked ? markRound(round, round.mode === 'build' ? { slots: result.slots || [] } : { pick: result.pick, replace: result.replace }) : null;
  const check = () => {
    if (!ready || checked) return;
    const m = markRound(round, answer);
    onResult(round.mode === 'build'
      ? { done: true, correct: m.correct, slots }
      : { done: true, correct: m.correct, pick, replace });
  };
  // In the footer under the slide (not `side`) a wide screen gets two columns.
  const wide = !side;

  return (
    <div>
      {round.mode === 'build'
        ? <BuildBoard round={round} slots={checked ? (result.slots || []) : slots} onChange={setSlots} checked={checked} lang={lang} wide={wide} dense />
        : <FixBoard round={round} pick={checked ? result.pick : pick} replace={checked ? result.replace : replace}
          onPick={(i) => setPick(i)} onReplace={(id) => setReplace(id)} checked={checked} lang={lang} wide={wide} dense />}
      {!checked && (
        <div className="mt-2 flex justify-end">
          <button onClick={check} disabled={!ready} className={primary}>{t.check}</button>
        </div>
      )}
      {checked && (
        <div className={`rounded-xl border-2 mt-3 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
          <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
            {result.correct ? t.correct : t.notQuite}
          </div>
          <div className={`font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {/* The authored explain already teaches the swapped-in trap, so a
                fix slide keeps only what the student got wrong besides it. */}
            {!result.correct && mark && (
              <MarkLines lang={lang} mark={round.mode === 'fix'
                ? { ...mark, explain: mark.explain.filter((l) => !l.en.startsWith(`Link ${round.broken + 1}:`)) }
                : mark} />
            )}
            <p className={!result.correct ? 'mt-1' : ''}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</p>
          </div>
        </div>
      )}
    </div>
  );
}
