import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, Droplet, Hand } from 'lucide-react';
import {
  SCALE, phColour, inkOn, kindOf, KIND_WORDS, LITMUS_PAPERS, LITMUS_CHOICES, LITMUS_DOES,
  stripSvg, afterDrops, NEUTRAL, SUBSTANCES, cap, activityModel, markActivity,
} from '../../utils/phLab';
import { tr } from '../../utils/lang';

/**
 * The `ph` deck activity (Science 2.8), and the pieces pH Lab shares with it:
 * the tappable fourteen-cell scale, colour swatches, the two litmus papers,
 * and the beaker you neutralise drop by drop. Every answer and every "why" is
 * derived by utils/phLab.js (activityModel / markActivity); this file only
 * draws and taps. Schema in docs/y7-science/unit2-close-engines.md §4.
 *
 * Contract (as the other activities): `result` is the stored
 * `{ done, correct, answer }`; `onResult` is called once with done: true; the
 * checked view is drawn from `result` alone, so a resumed deck shows it again.
 * A `ph` activity sits in the footer under its slide (it is not one of Notes'
 * side-panel types), so every ask is laid out wide and short.
 *
 * Every colour is drawn on white, so the scale reads the same in dark mode.
 */

const pickL = tr;
const said = (lang, line) => (line ? pickL(lang, line.en, line.vn, line.fr) : '');

const PH_T = {
  en: {
    check: 'Check', addDrop: 'Add a drop', stop: 'Stop: it is neutral', drops: (n) => `${n} drop${n === 1 ? '' : 's'} added`,
    blue: 'Blue litmus', red: 'Red litmus', tapChip: 'Tap a liquid, then tap its place on the scale', tapCell: 'Tap its place on the scale',
    correct: 'Correct', notQuite: 'Not quite', acidEnd: 'acid', alkaliEnd: 'alkali', neutral: 'neutral',
    adding: (w) => `Dropper: ${w}`, alkali: 'an alkali', acid: 'an acid',
  },
  vn: {
    check: 'Kiểm tra', addDrop: 'Nhỏ một giọt', stop: 'Dừng: đã trung tính', drops: (n) => `Đã nhỏ ${n} giọt`,
    blue: 'Giấy quỳ xanh', red: 'Giấy quỳ đỏ', tapChip: 'Chạm một chất, rồi chạm vào vị trí của nó trên thang', tapCell: 'Chạm vào vị trí của nó trên thang',
    correct: 'Chính xác', notQuite: 'Chưa đúng', acidEnd: 'axit', alkaliEnd: 'kiềm', neutral: 'trung tính',
    adding: (w) => `Ống nhỏ giọt: ${w}`, alkali: 'kiềm', acid: 'axit',
  },
  fr: {
    check: 'Vérifier', addDrop: 'Ajouter une goutte', stop: 'Stop : c’est neutre', drops: (n) => `${n} goutte${n > 1 ? 's' : ''} ajoutée${n > 1 ? 's' : ''}`,
    blue: 'Tournesol bleu', red: 'Tournesol rouge', tapChip: 'Touche un liquide, puis sa place sur l’échelle', tapCell: 'Touche sa place sur l’échelle',
    correct: 'Correct !', notQuite: 'Pas tout à fait', acidEnd: 'acide', alkaliEnd: 'alcalin', neutral: 'neutre',
    adding: (w) => `Compte-gouttes : ${w}`, alkali: 'un alcali', acid: 'un acide',
  },
};

const btn = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const primary = `${btn} bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]`;
const GOOD = 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]';
const BAD = 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]';
const IDLE = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200';
const PICKED = 'bg-[#1cb0f6] border-[#1899d6] text-white';

// ── shared pieces ────────────────────────────────────────────────────────────

/**
 * The scale, fourteen tappable cells on a white strip. `marks[pH]`:
 * 'good' | 'bad' | 'answer' | 'picked' rings a cell; `chips[pH]` stacks short
 * labels above it (the substances placed there).
 */
export function ScaleRow({ onPick, marks = {}, chips = {}, numbers = true, disabled = false, ends = true, lang = 'en', compact = false }) {
  const t = PH_T[lang] || PH_T.en;
  const ring = { good: 'ring-4 ring-[#58cc02] z-10', bad: 'ring-4 ring-[#ea2b2b] z-10', answer: 'ring-4 ring-[#58cc02] z-10', picked: 'ring-4 ring-slate-900 z-10' };
  const hasChips = Object.values(chips).some((c) => c?.length);
  return (
    <div className="w-full">
      {hasChips && (
        <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-0.5 mb-1 items-end">
          {SCALE.map((c) => (
            <div key={c.pH} className="flex flex-col items-center gap-0.5 min-w-0">
              {(chips[c.pH] || []).map((ch) => (
                <span key={ch.id} className={`max-w-full truncate rounded-md border-2 px-0.5 text-[9px] sm:text-[10px] font-black leading-tight ${ch.tone === 'good' ? GOOD : ch.tone === 'bad' ? BAD : ch.tone === 'answer' ? 'bg-white border-[#58a700] text-[#3e7500]' : 'bg-[#1cb0f6] border-[#1899d6] text-white'}`} title={ch.label}>{ch.short}</span>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="rounded-xl bg-white p-0.5 sm:p-1 border-2 border-slate-200 dark:border-slate-600">
        <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-px sm:gap-0.5">
          {SCALE.map((c) => (
            <button key={c.pH} type="button" disabled={disabled || !onPick} onClick={() => onPick?.(c.pH)}
              aria-label={`pH ${c.pH}`}
              className={`relative rounded-md font-black transition-transform ${compact ? 'h-8 text-xs' : 'h-10 sm:h-11 text-sm sm:text-base'} ${ring[marks[c.pH]] || ''} ${!disabled && onPick ? 'hover:-translate-y-0.5 cursor-pointer' : 'cursor-default'}`}
              style={{ backgroundColor: c.colour, color: inkOn(c.pH) }}>
              {numbers ? c.pH : ''}
            </button>
          ))}
        </div>
      </div>
      {ends && (
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mt-1 px-0.5">
          <span className="text-[#c0392b] dark:text-rose-300">← {t.acidEnd}</span>
          <span className="text-[#2f8f3f] dark:text-emerald-300">7 {t.neutral}</span>
          <span className="text-[#2c6fbb] dark:text-sky-300">{t.alkaliEnd} →</span>
        </div>
      )}
    </div>
  );
}

/** Four colour swatches, no numbers until `reveal`. `look(pH)` → idle | picked | good | bad | answer | muted. */
export function SwatchRow({ options, look = () => 'idle', onPick, disabled, reveal = false }) {
  const style = { idle: 'border-slate-200 dark:border-slate-600', picked: 'border-[#1cb0f6] ring-4 ring-[#1cb0f6]/30', good: 'border-[#58a700] ring-4 ring-[#58cc02]/40', bad: 'border-[#ea2b2b] ring-4 ring-[#ea2b2b]/30', answer: 'border-[#58a700] ring-4 ring-[#58cc02]/40', muted: 'border-slate-200 dark:border-slate-700 opacity-50' };
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {options.map((pH) => (
        <button key={pH} type="button" disabled={disabled} onClick={() => onPick?.(pH)} aria-label={reveal ? `pH ${pH}` : 'colour swatch'}
          className={`rounded-xl border-2 border-b-[4px] bg-white p-1.5 transition-all ${style[look(pH)] || style.idle} ${disabled ? '' : 'hover:-translate-y-0.5'}`}>
          <span className="block h-9 sm:h-11 rounded-lg" style={{ backgroundColor: phColour(pH) }} />
          {/* the number only after the check — never as hidden text a student could select */}
          <span className="block text-center text-xs font-black mt-1 text-slate-700" aria-hidden={!reveal}>{reveal ? `pH ${pH}` : ' '}</span>
        </button>
      ))}
    </div>
  );
}

/** One litmus strip from the engine's drawing. */
export function Strip({ paper, does = null, className = '' }) {
  return <div className={`shrink-0 rounded-lg overflow-hidden [&>svg]:block [&>svg]:w-full [&>svg]:h-auto ${className}`} dangerouslySetInnerHTML={{ __html: stripSvg(paper, does) }} />;
}

/**
 * The two litmus questions: for each paper, turns red · turns blue · no change.
 * `wide` (the deck's footer) puts the two papers side by side from sm.
 */
export function LitmusRows({ pick = {}, onPick, want = null, disabled, lang = 'en', wide = false }) {
  const t = PH_T[lang] || PH_T.en;
  return (
    <div className={wide ? 'grid gap-2 sm:grid-cols-2 sm:gap-4' : 'flex flex-col gap-2'}>
      {LITMUS_PAPERS.map((paper) => (
        <div key={paper} className="flex items-center gap-2">
          <Strip paper={paper} does={want ? want[paper] : null} className="w-7 sm:w-8" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">{paper === 'blue' ? t.blue : t.red}</div>
            <div className="grid grid-cols-3 gap-1.5">
              {LITMUS_CHOICES.map((c) => {
                const on = pick[paper] === c;
                const right = want && want[paper] === c;
                const style = want ? (right ? GOOD : on ? BAD : 'opacity-40 border-slate-200 dark:border-slate-700 text-slate-400') : on ? PICKED : IDLE;
                return (
                  <button key={c} type="button" disabled={disabled} onClick={() => onPick?.(paper, c)}
                    className={`px-1 py-2 rounded-lg border-2 border-b-[3px] text-[11px] sm:text-xs font-black leading-tight ${style}`}>
                    {pickL(lang, LITMUS_DOES[c].en, LITMUS_DOES[c].vn, LITMUS_DOES[c].fr)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * A beaker of liquid with universal indicator in it and a dropper above. The
 * colour eases from one pH to the next; each new drop falls from the dropper.
 * Drawn in React (not a string) so the colour can transition.
 */
export function Beaker({ pH, drops = 0, dropColour = '#cbd5e1', className = '' }) {
  const fill = pH == null ? '#e5eaf0' : phColour(pH);
  return (
    <svg viewBox="0 0 160 190" className={className} role="img" aria-label="beaker">
      <rect x="1" y="1" width="158" height="188" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      {/* dropper */}
      <path d="M 70 8 h 20 v 22 q 0 6 -4 10 l -4 22 h -4 l -4 -22 q -4 -4 -4 -10 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 74 20 h 12 v 12 q 0 4 -3 7 l -3 16 l -3 -16 q -3 -3 -3 -7 Z" fill={dropColour} />
      {drops > 0 && <circle key={drops} cx="80" cy="72" r="5" fill={dropColour} className="animate-in slide-in-from-top-4 fade-in duration-500" />}
      {/* beaker */}
      <path d="M 34 78 v 84 q 0 12 12 12 h 68 q 12 0 12 -12 v -84" fill="#f8fafc" stroke="#64748b" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M 36 108 v 54 q 0 10 10 10 h 68 q 10 0 10 -10 v -54 Z" fill={fill} style={{ transition: 'fill 450ms ease' }} />
      <path d="M 34 78 v 84 q 0 12 12 12 h 68 q 12 0 12 -12 v -84" fill="none" stroke="#64748b" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M 26 76 q 8 6 16 2" fill="none" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 46 118 v 40" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      {pH == null && <text x="80" y="150" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="34" fontWeight="800" fill="#94a3b8">?</text>}
    </svg>
  );
}

/** The drop-by-drop controls: Add a drop, Stop. The parent owns the count. */
export function DropControls({ start, drops, onDrop, onStop, disabled, lang = 'en' }) {
  const t = PH_T[lang] || PH_T.en;
  const adding = start < NEUTRAL ? t.alkali : t.acid;
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{t.adding(adding)}</div>
      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={disabled} onClick={onDrop} className={`${btn} bg-[#7c3aed] border-[#6d28d9] text-white hover:bg-[#6d28d9] inline-flex items-center gap-1.5`}>
          <Droplet className="w-4 h-4" strokeWidth={3} />{t.addDrop}
        </button>
        <button type="button" disabled={disabled} onClick={onStop} className={`${btn} bg-[#58cc02] border-[#58a700] text-white hover:bg-[#46a802] inline-flex items-center gap-1.5`}>
          <Hand className="w-4 h-4" strokeWidth={3} />{t.stop}
        </button>
      </div>
      <div className="text-sm font-black text-slate-600 dark:text-slate-300 tabular-nums" aria-live="polite">{t.drops(drops)}</div>
    </div>
  );
}


// ── the activity ─────────────────────────────────────────────────────────────

function Verdict({ ok, lang, children, className = 'mt-3', small = false }) {
  const t = PH_T[lang] || PH_T.en;
  return (
    <div className={`rounded-xl border-2 p-3 ${className} ${ok ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
      <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {ok ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
        {ok ? t.correct : t.notQuite}
      </div>
      <div className={`font-bold flex flex-col gap-1 ${small ? 'leading-snug text-sm' : 'leading-relaxed text-sm lg:text-base'} ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>{children}</div>
    </div>
  );
}

/** The liquid's name, and what the activity lets the slide say about it. */
function Liquid({ sub, pH, show = 'pH', lang }) {
  const s = sub ? SUBSTANCES[sub] : null;
  const kind = pH != null ? KIND_WORDS[kindOf(pH)] : null;
  return (
    <div className="inline-flex flex-wrap items-baseline gap-x-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-3 py-1.5">
      {s && <span className="font-black text-slate-800 dark:text-slate-100">{cap(pickL(lang, s.en, s.vn, s.fr))}</span>}
      {show === 'pH' && pH != null && <span className="font-black text-slate-500 dark:text-slate-400 tabular-nums">pH {pH}</span>}
      {show === 'kind' && kind && <span className="font-black text-slate-500 dark:text-slate-400">{pickL(lang, kind.a.en, kind.a.vn, kind.a.fr)}</span>}
    </div>
  );
}


function ColourAsk({ m, lang, checked, answer, finish }) {
  const t = PH_T[lang] || PH_T.en;
  const [pick, setPick] = useState(null);
  const chosen = checked ? answer : pick;
  const look = (pH) => (!checked ? (pH === pick ? 'picked' : 'idle') : pH === m.pH ? 'good' : pH === chosen ? 'bad' : 'muted');
  return (
    <div>
      {m.sub && <div className="mb-2"><Liquid sub={m.sub} pH={m.pH} lang={lang} /></div>}
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[15rem] max-w-xl"><SwatchRow options={m.round.options} look={look} onPick={setPick} disabled={checked} reveal={checked} /></div>
        {!checked && <button type="button" onClick={() => finish(pick)} disabled={pick == null} className={`${primary} ml-auto`}>{t.check}</button>}
      </div>
      {checked && <div className="mt-2 max-w-3xl"><ScaleRow marks={{ [m.pH]: 'answer', ...(chosen !== m.pH ? { [chosen]: 'bad' } : {}) }} lang={lang} compact ends={false} /></div>}
    </div>
  );
}

function PlaceAsk({ m, lang, checked, answer, finish }) {
  const t = PH_T[lang] || PH_T.en;
  const [placed, setPlaced] = useState({});
  const [sel, setSel] = useState(m.subs[0]);
  const where = checked ? answer || {} : placed;
  const num = (id) => m.subs.indexOf(id) + 1;
  const put = (pH) => {
    if (checked || !sel) return;
    const next = { ...placed, [sel]: pH };
    setPlaced(next);
    setSel(m.subs.find((id) => next[id] == null) || null);
  };
  const chips = {};
  const add = (pH, chip) => { (chips[pH] ||= []).push(chip); };
  for (const id of m.subs) {
    const at = where[id];
    const label = cap(pickL(lang, SUBSTANCES[id].en, SUBSTANCES[id].vn, SUBSTANCES[id].fr));
    if (!checked) { if (at != null) add(at, { id, short: String(num(id)), label }); continue; }
    const ok = Math.abs(at - m.answer[id]) <= m.within;
    add(at, { id: `${id}-at`, short: String(num(id)), label, tone: ok ? 'good' : 'bad' });
    if (!ok) add(m.answer[id], { id: `${id}-want`, short: String(num(id)), label, tone: 'answer' });
  }
  // Laid out short for the footer: chips, hint and Check on one row, the scale under it.
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        {m.subs.map((id) => {
          const ok = checked ? Math.abs(where[id] - m.answer[id]) <= m.within : null;
          const style = checked ? (ok ? GOOD : BAD) : sel === id ? PICKED : IDLE;
          return (
            <button key={id} type="button" disabled={checked} onClick={() => setSel(id)}
              className={`inline-flex items-center gap-1.5 rounded-xl border-2 border-b-[4px] px-2.5 py-1.5 text-sm font-bold ${style}`}>
              <span className="w-5 h-5 rounded-full bg-slate-900/10 dark:bg-white/10 flex items-center justify-center text-[11px] font-black">{num(id)}</span>
              {cap(pickL(lang, SUBSTANCES[id].en, SUBSTANCES[id].vn, SUBSTANCES[id].fr))}
              {!checked && where[id] != null && <span className="text-[11px] opacity-70">· {where[id]}</span>}
              {checked && <span className="text-[11px] opacity-80">· pH {m.answer[id]}</span>}
            </button>
          );
        })}
        {!checked && <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 px-1">{m.subs.length === 1 ? t.tapCell : t.tapChip}</span>}
        {!checked && <button type="button" onClick={() => finish(placed)} disabled={m.subs.some((id) => placed[id] == null)} className={`${primary} ml-auto`}>{t.check}</button>}
      </div>
      <ScaleRow onPick={checked ? undefined : put} chips={chips} disabled={checked} lang={lang} />
    </div>
  );
}

function LitmusAsk({ activity, m, lang, checked, answer, finish }) {
  const t = PH_T[lang] || PH_T.en;
  const [pick, setPick] = useState({});
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Liquid sub={m.sub} pH={m.pH} show={activity.show || 'pH'} lang={lang} />
        {!checked && <button type="button" onClick={() => finish(pick)} disabled={!pick.blue || !pick.red} className={`${primary} ml-auto`}>{t.check}</button>}
      </div>
      <div className="max-w-3xl">
        <LitmusRows wide pick={checked ? answer || {} : pick} want={checked ? m.answer : null} disabled={checked} lang={lang}
          onPick={(paper, c) => setPick((p) => ({ ...p, [paper]: c }))} />
      </div>
    </div>
  );
}

function DropsAsk({ activity, m, lang, checked, answer, finish }) {
  const [drops, setDrops] = useState(0);
  const n = checked ? Number(answer?.drops) || 0 : drops;
  const need = m.answer.drops;
  const drop = () => {
    const next = drops + 1;
    if (next > need) finish({ drops: next });   // one past green: the round is over
    else setDrops(next);
  };
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-5">
      <Beaker pH={afterDrops(m.pH, n)} drops={n} dropColour={phColour(m.pH < NEUTRAL ? 12 : 2)} className="w-24 sm:w-28 shrink-0" />
      <div className="flex-1 min-w-[12rem] flex flex-col gap-2">
        {m.sub && <div><Liquid sub={m.sub} pH={m.pH} show={activity.show || 'kind'} lang={lang} /></div>}
        <DropControls start={m.pH} drops={n} onDrop={drop} onStop={() => finish({ drops })} disabled={checked} lang={lang} />
        {checked && (
          <div className="flex flex-wrap items-center gap-1" aria-label="the colours it walked through">
            {Array.from({ length: n + 1 }, (_, i) => afterDrops(m.pH, i)).map((p, i) => (
              <span key={i} className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-black border border-white" style={{ backgroundColor: phColour(p), color: inkOn(p) }}>{p}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function PhActivity({ activity, lang = 'en', result, onResult, parseText = (x) => x, side = false }) {
  const m = useMemo(() => activityModel(activity), [activity]);
  const checked = !!result?.done;
  const mark = useMemo(() => (checked ? markActivity(activity, result.answer) : null), [checked, activity, result]);
  const finish = (answer) => {
    if (checked) return;
    onResult({ done: true, correct: !!markActivity(activity, answer).ok, answer });
  };
  if (m.answer == null) return <div className="text-rose-500 font-bold text-sm">This pH activity is missing its substance or pH.</div>;
  const common = { activity, m, lang, checked, answer: result?.answer, finish };
  let body = null;
  if (m.ask === 'colour') body = <ColourAsk {...common} />;
  else if (m.ask === 'place') body = <PlaceAsk {...common} />;
  else if (m.ask === 'litmus') body = <LitmusAsk {...common} />;
  else if (m.ask === 'drops') body = <DropsAsk {...common} />;
  // Under the slide (the footer is wide and short), the verdict goes BESIDE the
  // answered activity from lg, so answering does not make the footer scroll.
  const beside = checked && !side;
  return (
    <div className={beside ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-5 lg:items-start' : ''}>
      <div className="min-w-0">{body}</div>
      {checked && mark && (
        <Verdict ok={!!result.correct} lang={lang} small={beside} className={beside ? 'mt-3 lg:mt-0' : 'mt-3'}>
          {!result.correct && mark.lines.slice(0, mark.named).map((l, i) => <span key={i}>{said(lang, l)}</span>)}
          <span>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</span>
        </Verdict>
      )}
    </div>
  );
}
