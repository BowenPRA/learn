import React, { useMemo, useRef, useState } from 'react';
import {
  CheckCircle2, AlertTriangle, GripVertical, ChevronUp, ChevronDown, Target,
  Sparkles, XCircle, CornerDownRight, MousePointerClick,
} from 'lucide-react';
import { stripLabels } from '../../utils/labelIt';
import { plotTargets, keepWhere } from '../../utils/activity';
import { kindOf } from '../../utils/graphCurve';
import { parseInequality, sameSet, interval, union, NEG_INF, POS_INF } from '../../utils/interval';
import { arcsOf } from '../../utils/cubic';
import NumberLineSVG from '../math/NumberLineSVG.jsx';
import { regionsOf } from '../../utils/numberLine';
import CubicFigure from '../math/CubicFigure.jsx';
import VennFigure from '../math/VennFigure.jsx';
import LineActivity from './LineActivity.jsx';
import { regionsOf as vennRegionsOf, sameRegions } from '../../utils/sets';
import { SafeInlineMath } from './SafeMath.jsx';
import {
  TermsActivity, AlgebraActivity, GridActivity, FlowActivity, PeriodicActivity, ParticlesActivity, FormulaActivity,
} from './Y7Activities.jsx';
import { ShiftActivity, RoundActivity, BusStopActivity, IneqActivity } from './NumberActivities.jsx';
import { ChainActivity } from './ChainActivity.jsx';
import { CycleActivity } from './CycleActivity.jsx';
import { PhActivity } from './PhActivity.jsx';
import { tr, field } from '../../utils/lang';
// Unit 4 (decimals) and Science 3.1 deck activities, one line per unit:
// @@U04_1_ACT_IMPORT@@
import { DecOrderActivity } from './DecOrderActivity.jsx';

// @@U04_2_ACT_IMPORT@@
import { DecColumnActivity } from './DecColumnActivity.jsx';

// @@U04_3_ACT_IMPORT@@
import { PointBackActivity } from './PointBackActivity.jsx';

// @@U04_4_ACT_IMPORT@@

// @@U04_5_ACT_IMPORT@@
import { MakeEasyActivity } from './MakeEasyActivity.jsx';

// @@SCI_U03_1_ACT_IMPORT@@

// @@U05_1_ACT_IMPORT@@
import { AngleSumActivity } from './AngleSumActivity.jsx';

// @@U05_2_ACT_IMPORT@@
import { AnglePairActivity } from './AnglePairActivity.jsx';

// @@U05_3_ACT_IMPORT@@
import { ZeroLineActivity } from './ZeroLineActivity.jsx';

// @@SCI_U03_2_ACT_IMPORT@@

// @@U06_1_ACT_IMPORT@@

// @@U06_2_ACT_IMPORT@@

// @@SCI_U03_3_ACT_IMPORT@@
import { OrbitLabActivity } from './OrbitLabActivity.jsx';

// @@SCI_U03_4_ACT_IMPORT@@

// @@SCI_U03_5_ACT_IMPORT@@

// @@SCI_U03_6_ACT_IMPORT@@
import { EnergyChangeActivity } from './EnergyChangeActivity.jsx';

// @@SCI_U03_7_ACT_IMPORT@@
import { EnergySplitActivity } from './EnergySplitActivity.jsx';


/**
 * An interactive activity on a Notes slide — the self-study replacement for
 * "on your whiteboard" and "hands up". Scored like a check: one item, right or
 * wrong, recorded once. The slide cannot be left until it is done.
 *
 * Types (schema in docs/y7-science/ENGAGEMENT-PLAN.md §2.1):
 *   sort      tap/drag cards into bins        correct = every card right on the first check
 *   order     arrange shuffled steps          correct = every step in place on the first check
 *   estimate  slider guess, then reveal       correct = within tolerance
 *   hotspot   tap the named part on an SVG    correct = hit within two tries
 *   predict   choose, then see the reveal     correct = the `correct` option, or always if none
 *
 * `result` is `{ correct, done, ... }` from the deck's answer map; `onResult`
 * is called exactly once with it. Field names avoid `text`/`content` so the
 * narration generator does not read the cards aloud.
 *
 * `retry` is the previous, wrong result when the student reopens an activity
 * to fix it (the end-of-lesson "Fix my mistakes" in Notes.jsx). An activity
 * with several parts starts from the parts that were RIGHT — the cards already
 * in their true bins, the boxes already correct — so only the wrong ones are
 * redone; a one-answer activity starts fresh. `result` still wins: once the
 * retry is checked, it is the new result that shows.
 */

const GREEN = '#58cc02';
const RED = '#ff4b4b';

// pickL(lang, en, vn, fr): the twin for `lang`, English when it has none.
const pickL = tr;

/** Deterministic shuffle so a slide shows the same order every visit. */
function seededShuffle(list, seed) {
  let h = 2166136261;
  for (const ch of String(seed)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  const rand = () => { h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  // never hand back the original order for an ordering task
  if (out.length > 2 && out.every((x, i) => x === list[i])) out.push(out.shift());
  return out;
}

/** True when `order` is a rearrangement of exactly these steps' ids. */
const isArrangementOf = (order, steps) => Array.isArray(order) && order.length === steps.length
  && steps.every((s) => order.includes(s.id));

const T = {
  en: {
    check: 'Check', done: 'Done', tapCard: 'Tap a card, then tap its bin', dropHere: 'Tap to place',
    allPlaced: 'All placed', lockIn: 'Lock in my guess', yourGuess: 'Your guess', answer: 'Answer',
    tapPart: 'Tap the diagram', tries: 'Try again — one more go', correct: 'Correct', notQuite: 'Not quite', missed: 'Not on a part',
    shouldBe: 'should be', choose: 'Choose one', reveal: 'See what happens', up: 'Move up', down: 'Move down',
    close: 'Close!', wayOff: 'Not close', spotOn: 'Spot on',
  },
  vn: {
    check: 'Kiểm tra', done: 'Xong', tapCard: 'Chạm một thẻ, rồi chạm vào ô của nó', dropHere: 'Chạm để đặt',
    allPlaced: 'Đã đặt hết', lockIn: 'Chốt dự đoán', yourGuess: 'Dự đoán của em', answer: 'Đáp án',
    tapPart: 'Chạm vào hình', tries: 'Thử lại — còn một lần', correct: 'Chính xác', notQuite: 'Chưa đúng', missed: 'Không trúng bộ phận nào',
    shouldBe: 'phải là', choose: 'Chọn một', reveal: 'Xem điều gì xảy ra', up: 'Lên', down: 'Xuống',
    close: 'Gần đúng!', wayOff: 'Chưa gần', spotOn: 'Chính xác',
  },
  fr: {
    check: 'Vérifier', done: 'Terminé', tapCard: 'Touche une carte, puis sa case', dropHere: 'Touche pour placer',
    allPlaced: 'Tout est placé', lockIn: 'Valider', yourGuess: 'Ton estimation', answer: 'Réponse',
    tapPart: 'Touche le schéma', tries: 'Réessaie — encore une chance', correct: 'Correct !', notQuite: 'Pas tout à fait', missed: 'À côté',
    shouldBe: 'devrait être', choose: 'Choisis', reveal: 'Voir ce qui se passe', up: 'Monter', down: 'Descendre',
    close: 'Presque !', wayOff: 'Trop loin', spotOn: 'Pile !',
  },
};

// ── shared chrome ────────────────────────────────────────────────────────────

function Header({ activity, lang, parseText, isDisplayMode, badge }) {
  return (
    <>
      <div className={`flex flex-wrap items-center gap-y-1 text-[#1899d6] dark:text-[#5cc8ff] font-black uppercase tracking-widest mb-2 ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)]' : 'text-[10px] lg:text-xs'}`}>
        <MousePointerClick className="w-4 h-4 mr-2" strokeWidth={3} />
        {tr(lang, 'Try it', 'Hoạt động', 'À toi de jouer')}
        {badge}
      </div>
      <div className={`font-black text-slate-800 dark:text-slate-100 leading-snug mb-3 ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-[15px] sm:text-base lg:text-lg'}`}>
        {parseText(pickL(lang, activity.prompt, activity.promptVn, activity.promptFr))}
      </div>
    </>
  );
}

function Verdict({ ok, lang, children }) {
  const t = T[lang] || T.en;
  return (
    <div className={`rounded-xl border-2 mt-3 p-3 ${ok ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
      <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {ok ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
        {ok ? t.correct : t.notQuite}
      </div>
      <div className={`font-bold leading-relaxed text-sm lg:text-base ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>{children}</div>
    </div>
  );
}

const btn = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const primary = `${btn} bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]`;

// ── sort ─────────────────────────────────────────────────────────────────────

function SortActivity({ activity, lang, result, onResult, parseText, retry, side }) {
  // Beside a slide, a big sort (four bins, or seven cards or more) packs tighter.
  const compact = !!side && (activity.bins.length >= 4 || (activity.cards || []).length >= 7);
  const t = T[lang] || T.en;
  const cards = useMemo(() => seededShuffle(activity.cards || [], activity.id || 'sort'), [activity]);
  const [placed, setPlaced] = useState(() => result?.placed || keepWhere(retry?.placed,
    (cardId, binId) => (activity.cards || []).some((c) => String(c.id) === cardId && c.bin === binId)));   // cardId -> binId
  const [picked, setPicked] = useState(null);
  const [dragged, setDragged] = useState(null);
  const checked = !!result?.done;

  const bank = cards.filter((c) => !placed[c.id]);
  const put = (cardId, binId) => {
    if (checked) return;
    setPlaced((p) => ({ ...p, [cardId]: binId }));
    setPicked(null); setDragged(null);
  };
  const unput = (cardId) => {
    if (checked) return;
    setPlaced((p) => { const n = { ...p }; delete n[cardId]; return n; });
  };
  const check = () => {
    const wrong = cards.filter((c) => placed[c.id] !== c.bin).map((c) => c.id);
    onResult({ done: true, correct: wrong.length === 0, placed, wrong });
  };

  const chip = (c, inBin) => {
    const ok = checked ? placed[c.id] === c.bin : null;
    const style = checked
      ? (ok ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]')
      : picked === c.id
        ? 'bg-[#1cb0f6] border-[#1899d6] text-white scale-105'
        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:-translate-y-0.5';
    return (
      <button
        key={c.id}
        draggable={!checked}
        onDragStart={(e) => { setDragged(c.id); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(c.id)); }}
        onClick={(e) => { e.stopPropagation(); if (checked) return; if (inBin) unput(c.id); else setPicked(picked === c.id ? null : c.id); }}
        className={`flex items-center gap-1.5 rounded-xl border-2 border-b-[4px] font-bold transition-all cursor-pointer ${compact ? 'px-2 py-1.5 text-xs' : 'px-3 py-2 text-sm'} ${style}`}
      >
        {!checked && !inBin && <GripVertical className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} opacity-40`} strokeWidth={3} />}
        {parseText(pickL(lang, c.name, c.nameVn, c.nameFr))}
        {checked && !ok && (
          <span className="ml-1 text-[10px] uppercase tracking-widest opacity-80">
            → {field(activity.bins.find((b) => b.id === c.bin), 'name', lang)}
          </span>
        )}
        {checked && (ok ? <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> : <XCircle className="w-4 h-4" strokeWidth={3} />)}
      </button>
    );
  };

  return (
    <div>
      {!checked && (
        <div className="flex flex-wrap gap-2 items-center justify-center p-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/40 min-h-[56px] mb-3">
          {bank.length === 0
            ? <span className="text-slate-400 font-black uppercase tracking-widest text-xs flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{t.allPlaced}</span>
            : bank.map((c) => chip(c, false))}
        </div>
      )}
      {/* Four bins go 2 × 2: three columns left the fourth alone on a row. */}
      {/* Beside the slide, four or more bins sit tighter, so the Check button
          stays on screen on a 1280×720 laptop. */}
      <div className={`grid gap-2 ${activity.bins.length === 3 || activity.bins.length > 4 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {activity.bins.map((bin) => {
          const here = cards.filter((c) => placed[c.id] === bin.id);
          const active = !!picked && !checked;
          return (
            <div
              key={bin.id}
              onClick={() => picked && put(picked, bin.id)}
              onDragOver={(e) => { e.preventDefault(); }}
              onDrop={(e) => { e.preventDefault(); if (dragged) put(dragged, bin.id); }}
              className={`rounded-2xl border-2 overflow-hidden bg-white dark:bg-slate-800 transition-all ${active ? 'border-[#1cb0f6] ring-4 ring-[#1cb0f6]/20 cursor-pointer' : 'border-slate-200 dark:border-slate-700'}`}
            >
              <div className={`bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-700 px-3 font-black text-slate-600 dark:text-slate-300 text-sm text-center ${compact ? 'py-1' : 'py-2'}`}>
                {parseText(pickL(lang, bin.name, bin.nameVn, bin.nameFr))}
              </div>
              <div className={`p-2.5 flex flex-wrap gap-2 items-center ${compact ? 'min-h-[40px] py-1.5' : 'min-h-[56px]'}`}>
                {here.length === 0 && (
                  <span className={`flex items-center gap-1.5 font-black uppercase tracking-widest text-[10px] ${active ? 'text-[#1cb0f6] animate-pulse' : 'text-slate-300 dark:text-slate-600'}`}>
                    <CornerDownRight className="w-3.5 h-3.5" />{active ? t.dropHere : t.tapCard}
                  </span>
                )}
                {here.map((c) => chip(c, true))}
              </div>
            </div>
          );
        })}
      </div>
      {!checked && (
        <div className="mt-3 flex justify-end">
          <button onClick={check} disabled={bank.length > 0} className={primary}>{t.check}</button>
        </div>
      )}
      {checked && (
        <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>
      )}
    </div>
  );
}

// ── order ────────────────────────────────────────────────────────────────────

function OrderActivity({ activity, lang, result, onResult, parseText, retry }) {
  const t = T[lang] || T.en;
  const steps = activity.steps || [];
  // A retry starts from the student's own last order, so the steps they had
  // in place stay there and only the misplaced ones need moving.
  const [order, setOrder] = useState(() => result?.order
    || (isArrangementOf(retry?.order, steps) ? retry.order : null)
    || seededShuffle(steps.map((s) => s.id), activity.id || 'order'));
  const [dragged, setDragged] = useState(null);
  const checked = !!result?.done;
  const byId = Object.fromEntries(steps.map((s) => [s.id, s]));

  const move = (from, to) => {
    if (checked || to < 0 || to >= order.length) return;
    setOrder((o) => { const n = [...o]; const [x] = n.splice(from, 1); n.splice(to, 0, x); return n; });
  };
  const check = () => {
    const correct = order.every((id, i) => id === steps[i].id);
    onResult({ done: true, correct, order });
  };

  return (
    <div>
      <ol className="flex flex-col gap-2">
        {order.map((id, i) => {
          const s = byId[id];
          if (!s) return null;
          const ok = checked ? steps[i].id === id : null;
          const style = checked
            ? (ok ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]')
            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200';
          return (
            <li
              key={id}
              draggable={!checked}
              onDragStart={(e) => { setDragged(i); e.dataTransfer.setData('text/plain', String(i)); }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); if (dragged != null) move(dragged, i); setDragged(null); }}
              className={`flex items-center gap-3 rounded-xl border-2 border-b-[4px] px-3 py-2 font-bold text-sm transition-all ${style}`}
            >
              <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 flex items-center justify-center font-black text-xs shrink-0">{i + 1}</span>
              <span className="flex-1">{parseText(pickL(lang, s.name, s.nameVn, s.nameFr))}</span>
              {checked
                ? (ok ? <CheckCircle2 className="w-5 h-5" strokeWidth={3} /> : <span className="text-[10px] uppercase tracking-widest">{t.shouldBe} #{steps.findIndex((x) => x.id === id) + 1}</span>)
                : (
                  <span className="flex gap-1">
                    <button onClick={() => move(i, i - 1)} disabled={i === 0} className="p-1 rounded-lg border-2 border-slate-200 dark:border-slate-600 disabled:opacity-30" title={t.up}><ChevronUp className="w-4 h-4" strokeWidth={3} /></button>
                    <button onClick={() => move(i, i + 1)} disabled={i === order.length - 1} className="p-1 rounded-lg border-2 border-slate-200 dark:border-slate-600 disabled:opacity-30" title={t.down}><ChevronDown className="w-4 h-4" strokeWidth={3} /></button>
                  </span>
                )}
            </li>
          );
        })}
      </ol>
      {!checked && <div className="mt-3 flex justify-end"><button onClick={check} className={primary}>{t.check}</button></div>}
      {checked && <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>}
    </div>
  );
}

// ── estimate ─────────────────────────────────────────────────────────────────

function EstimateActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const { min = 0, max = 100, step = 1, answer } = activity;
  // `unitVn` / `unitFr` are the unit's twins ("giây", "secondes" for "seconds"), when it has them.
  const unit = field(activity, 'unit', lang) || activity.unit || '';
  const [value, setValue] = useState(result?.guess ?? Math.round(((min + max) / 2) / step) * step);
  const checked = !!result?.done;
  const tol = activity.tolerance ?? 0.2;
  const fmt = (n) => `${Number(n).toLocaleString()}${unit ? ` ${unit}` : ''}`;
  const pct = (n) => `${((n - min) / (max - min)) * 100}%`;

  const lock = () => {
    const off = Math.abs(value - answer);
    const within = off <= Math.max(Math.abs(answer) * tol, step / 2);
    onResult({ done: true, correct: within, guess: value });
  };
  const closeness = () => {
    const off = Math.abs((result?.guess ?? value) - answer) / Math.max(Math.abs(answer), 1);
    if (off <= tol / 4) return t.spotOn;
    if (off <= tol) return t.close;
    return t.wayOff;
  };

  return (
    <div>
      <div className="relative pt-8 pb-2 px-2">
        {checked && (
          <div className="absolute top-0 -translate-x-1/2 flex flex-col items-center" style={{ left: `calc(${pct(answer)} * 0.96 + 2%)` }}>
            <span className="px-2 py-0.5 rounded-lg bg-[#58cc02] text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{t.answer}: {fmt(answer)}</span>
            <span className="w-0.5 h-3 bg-[#58cc02]" />
          </div>
        )}
        <input
          type="range" min={min} max={max} step={step} value={value} disabled={checked}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-[#1cb0f6] h-3 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
          <span>{fmt(min)}</span><span>{fmt(max)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 mt-2">
        <div className="font-black text-slate-800 dark:text-slate-100 text-lg">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 mr-2">{t.yourGuess}</span>{fmt(value)}
        </div>
        {!checked && <button onClick={lock} className={primary}>{t.lockIn}</button>}
      </div>
      {checked && (
        <Verdict ok={result.correct} lang={lang}>
          <span className="mr-2 px-2 py-0.5 rounded-lg bg-white/60 text-[10px] uppercase tracking-widest">{closeness()}</span>
          {parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}
        </Verdict>
      )}
    </div>
  );
}

// ── hotspot ──────────────────────────────────────────────────────────────────

function HotspotActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const svgRef = useRef(null);
  const [tries, setTries] = useState(result?.tries || 0);
  const [last, setLast] = useState(null);
  const checked = !!result?.done;
  const vbParts = String(activity.viewBox || '0 0 100 100').split(/[\s,]+/).map(Number);
  const vb = { x: vbParts[0], y: vbParts[1], w: vbParts[2], h: vbParts[3] };
  const targets = activity.targets || [];
  const answer = targets.find((x) => x.id === activity.correct);
  const bareSvg = useMemo(() => stripLabels(activity.svg), [activity.svg]);

  const toView = (e) => {
    const svg = svgRef.current;
    if (!svg?.getScreenCTM) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    return { x: pt.x, y: pt.y };
  };
  const hitAt = (p) => targets.find((tg) => Math.hypot(p.x - tg.x, p.y - tg.y) <= (tg.r || 30));

  const tap = (e) => {
    if (checked) return;
    const p = toView(e);
    if (!p) return;
    const hit = hitAt(p);
    const n = tries + 1;
    setTries(n);
    setLast({ ...p, hit });
    if (hit?.id === activity.correct) onResult({ done: true, correct: true, tries: n });
    else if (n >= 2) onResult({ done: true, correct: false, tries: n });
  };

  return (
    <div>
      {/* Sized by height first: the footer has ~40vh, and a diagram that needs
          scrolling to see cannot be tapped. Printed labels are stripped so the
          diagram never answers its own question. */}
      <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white"
        style={{ aspectRatio: `${vb.w} / ${vb.h}`, width: `min(100%, ${((vb.w / vb.h) * 38).toFixed(1)}vh)` }}>
        <div className="absolute inset-0 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: bareSvg }} />
        <svg ref={svgRef} viewBox={activity.viewBox} preserveAspectRatio="xMidYMid meet" onClick={tap}
          className={`absolute inset-0 w-full h-full touch-manipulation ${checked ? '' : 'cursor-crosshair'}`}>
          <rect x={vb.x} y={vb.y} width={vb.w} height={vb.h} fill="transparent" />
          {last && !checked && (
            <circle cx={last.x} cy={last.y} r={vb.w / 40} fill={`${RED}33`} stroke={RED} strokeWidth={vb.w / 200} pointerEvents="none" />
          )}
          {checked && answer && (
            <circle cx={answer.x} cy={answer.y} r={answer.r || 30} fill={result.correct ? `${GREEN}33` : `${RED}22`} stroke={result.correct ? GREEN : RED} strokeWidth={vb.w / 150} pointerEvents="none" />
          )}
          {checked && last && !result.correct && (
            <circle cx={last.x} cy={last.y} r={vb.w / 40} fill={`${RED}33`} stroke={RED} strokeWidth={vb.w / 200} strokeDasharray="6 4" pointerEvents="none" />
          )}
        </svg>
      </div>
      {!checked && (
        <div className="mt-2 text-center text-xs font-black uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2">
          <Target className="w-4 h-4" />
          {tries === 0 ? t.tapPart : `${last?.hit ? pickL(lang, last.hit.name, last.hit.nameVn, last.hit.nameFr) : t.missed} — ${t.tries}`}
        </div>
      )}
      {checked && <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>}
    </div>
  );
}

// ── predict ──────────────────────────────────────────────────────────────────

function PredictActivity({ activity, lang, result, onResult, parseText, side }) {
  const t = T[lang] || T.en;
  const [chosen, setChosen] = useState(result?.chosen || null);
  const checked = !!result?.done;
  const scored = activity.correct != null;

  const reveal = () => {
    onResult({ done: true, correct: scored ? chosen === activity.correct : true, chosen });
  };

  return (
    <div>
      {/* Beside the slide (lg, `side`) the options stack: two columns of
          sentence-length options in a narrow column wrap into slivers. */}
      <div className={`grid gap-2 ${side ? 'sm:grid-cols-2 lg:grid-cols-1' : 'sm:grid-cols-2'}`}>
        {(activity.options || []).map((o) => {
          const isChosen = chosen === o.val;
          const isRight = scored && o.val === activity.correct;
          let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#1cb0f6]';
          if (isChosen && !checked) style = 'bg-[#1cb0f6] border-[#1899d6] text-white';
          if (checked) {
            if (isRight || (!scored && isChosen)) style = 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]';
            else if (isChosen) style = 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]';
            else style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
          }
          return (
            <button key={o.val} disabled={checked} onClick={() => setChosen(o.val)}
              className={`text-left rounded-xl border-2 border-b-[4px] p-3 font-bold text-sm transition-all ${style}`}>
              {parseText(pickL(lang, o.name, o.nameVn, o.nameFr))}
            </button>
          );
        })}
      </div>
      {!checked && (
        <div className="mt-3 flex justify-end">
          <button onClick={reveal} disabled={!chosen} className={primary}><Sparkles className="w-4 h-4 inline mr-1.5 -mt-0.5" />{t.reveal}</button>
        </div>
      )}
      {checked && <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>}
    </div>
  );
}

// ── plot ─────────────────────────────────────────────────────────────────────
// Click the key points of a curve on a small lattice — the in-deck version of
// the Graph It task. The targets are derived from `curve`, never authored.

const SKY = '#1cb0f6';
const PLOT_GRID = { xMin: -7, xMax: 7, yMin: -6, yMax: 8 };
const samePt = (p, q) => p[0] === q[0] && p[1] === q[1];
const pt = (x, y) => `(${x < 0 ? `−${-x}` : x}, ${y < 0 ? `−${-y}` : y})`;

function PlotActivity({ activity, lang, result, onResult, parseText, retry }) {
  const t = T[lang] || T.en;
  const svgRef = useRef(null);
  const [placed, setPlaced] = useState(() => result?.placed
    || (retry?.placed || []).filter((p) => plotTargets(activity).some((tg) => samePt(tg, p))));
  const checked = !!result?.done;
  const grid = { ...PLOT_GRID, ...(activity.grid || {}) };
  const targets = useMemo(() => plotTargets(activity), [activity]);
  const step = activity.step || { kind: 'vertex' };
  const cols = grid.xMax - grid.xMin;
  const rows = grid.yMax - grid.yMin;
  const U = 30;
  const PAD = 22;
  const W = cols * U + PAD * 2;
  const H = rows * U + PAD * 2;
  const X = (x) => PAD + (x - grid.xMin) * U;
  const Y = (y) => PAD + (grid.yMax - y) * U;

  const toGrid = (e) => {
    const svg = svgRef.current;
    if (!svg?.getScreenCTM) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    const gx = Math.round((p.x - PAD) / U) + grid.xMin;
    const gy = grid.yMax - Math.round((p.y - PAD) / U);
    if (gx < grid.xMin || gx > grid.xMax || gy < grid.yMin || gy > grid.yMax) return null;
    return [gx, gy];
  };
  const tap = (e) => {
    if (checked) return;
    const p = toGrid(e);
    if (!p) return;
    setPlaced((ps) => (ps.some((q) => samePt(q, p)) ? ps.filter((q) => !samePt(q, p)) : [...ps, p]));
  };
  const check = (none = false) => {
    const mine = none ? [] : placed;
    const correct = mine.length === targets.length && targets.every((tg) => mine.some((p) => samePt(p, tg)));
    onResult({ done: true, correct, placed: mine, none });
  };

  // the curve, drawn once the answer is in
  const curvePath = () => {
    const { a, h, k } = activity.curve;
    const isAbs = kindOf(activity.curve) === 'modulus';
    const xs = [];
    for (let i = 0; i <= 300; i += 1) xs.push(grid.xMin + (i / 300) * cols);
    if (isAbs) { xs.push(h); xs.sort((p, q) => p - q); }
    let d = '';
    let pen = false;
    for (const x of xs) {
      const y = isAbs ? a * Math.abs(x - h) + k : a * (x - h) * (x - h) + k;
      if (y < grid.yMin || y > grid.yMax) { pen = false; continue; }
      d += `${pen ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)} `;
      pen = true;
    }
    return d.trim();
  };
  const label = step.kind === 'vertex' ? tr(lang, 'Click the vertex', 'Bấm vào đỉnh', 'Clique sur le sommet')
    : step.kind === 'zeros' ? tr(lang, 'Click every crossing on the x-axis', 'Bấm vào mọi giao điểm với trục x', 'Clique sur chaque point d’intersection avec l’axe des x')
      : tr(lang, `Click every point where the graph meets y = ${step.at}`, `Bấm vào mọi điểm đồ thị gặp y = ${step.at}`, `Clique sur chaque point où la courbe rencontre y = ${step.at}`);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <div className="text-lg text-slate-800 dark:text-slate-100"><SafeInlineMath math={activity.equation} /></div>
        <div className="text-xs font-black uppercase tracking-widest text-[#1899d6] dark:text-[#5cc8ff] flex items-center gap-1.5"><Target className="w-4 h-4" strokeWidth={3} />{label}</div>
      </div>
      <div className="mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white" style={{ width: `min(100%, ${((W / H) * 34).toFixed(1)}vh)` }}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} onClick={tap} className={`w-full h-auto select-none ${checked ? '' : 'cursor-crosshair'}`} style={{ touchAction: 'manipulation' }}>
          <rect x="0" y="0" width={W} height={H} fill="#fff" />
          {Array.from({ length: cols + 1 }, (_, i) => grid.xMin + i).map((x) => <line key={`v${x}`} x1={X(x)} y1={PAD} x2={X(x)} y2={H - PAD} stroke="#e2e8f0" strokeWidth="1" />)}
          {Array.from({ length: rows + 1 }, (_, i) => grid.yMin + i).map((y) => <line key={`h${y}`} x1={PAD} y1={Y(y)} x2={W - PAD} y2={Y(y)} stroke="#e2e8f0" strokeWidth="1" />)}
          {step.kind === 'meets' && (
            <g>
              <line x1={PAD} y1={Y(step.at)} x2={W - PAD} y2={Y(step.at)} stroke="#f59e0b" strokeWidth="2.4" strokeDasharray="8 5" />
              <text x={W - PAD - 4} y={Y(step.at) - 7} textAnchor="end" fontSize="12" fontWeight="800" fontFamily="monospace" fill="#d97706">y = {step.at < 0 ? `−${-step.at}` : step.at}</text>
            </g>
          )}
          <line x1={PAD} y1={Y(0)} x2={W - PAD} y2={Y(0)} stroke="#334155" strokeWidth="2" />
          <line x1={X(0)} y1={PAD} x2={X(0)} y2={H - PAD} stroke="#334155" strokeWidth="2" />
          {Array.from({ length: cols + 1 }, (_, i) => grid.xMin + i).filter((x) => x !== 0 && x % 2 === 0).map((x) => (
            <text key={`tx${x}`} x={X(x)} y={Y(0) + 14} textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="monospace" fill="#94a3b8">{x < 0 ? `−${-x}` : x}</text>
          ))}
          {Array.from({ length: rows + 1 }, (_, i) => grid.yMin + i).filter((y) => y !== 0 && y % 2 === 0).map((y) => (
            <text key={`ty${y}`} x={X(0) - 6} y={Y(y) + 4} textAnchor="end" fontSize="10" fontWeight="700" fontFamily="monospace" fill="#94a3b8">{y < 0 ? `−${-y}` : y}</text>
          ))}
          {!checked && Array.from({ length: cols + 1 }, (_, i) => grid.xMin + i).map((x) =>
            Array.from({ length: rows + 1 }, (_, j) => grid.yMin + j).map((y) => <circle key={`d${x}_${y}`} cx={X(x)} cy={Y(y)} r="1.8" fill="#cbd5e1" />))}
          {checked && <path d={curvePath()} fill="none" stroke={SKY} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />}
          {checked && targets.map(([x, y]) => (
            <g key={`t${x}_${y}`}>
              <circle cx={X(x)} cy={Y(y)} r="8" fill={GREEN} stroke="#fff" strokeWidth="2.5" />
              <text x={X(x)} y={Y(y) - 12} textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="monospace" fill="#3e7500">{pt(x, y)}</text>
            </g>
          ))}
          {(result?.placed || placed).map(([x, y]) => {
            const right = targets.some((tg) => samePt(tg, [x, y]));
            if (checked && right) return null;
            return (
              <g key={`p${x}_${y}`}>
                <circle cx={X(x)} cy={Y(y)} r="7" fill={checked ? RED : SKY} stroke="#fff" strokeWidth="2.5" />
                {!checked && <text x={X(x)} y={Y(y) - 11} textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="monospace" fill={SKY}>{pt(x, y)}</text>}
              </g>
            );
          })}
        </svg>
      </div>
      {!checked && (
        <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
          {step.kind !== 'vertex' && (
            <button onClick={() => check(true)} className={`${btn} bg-slate-500 border-slate-700 text-white`}>{tr(lang, 'There are none', 'Không có điểm nào', 'Il n’y en a aucun')}</button>
          )}
          <button onClick={() => check(false)} disabled={!placed.length} className={primary}>{t.check}</button>
        </div>
      )}
      {checked && <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>}
    </div>
  );
}

// ── numberline ───────────────────────────────────────────────────────────────
// Shade the solution set of an inequality. Marked against the set derived from
// `solution` by utils/interval.js, read back the way the drawing is read.

function NumberLineActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const min = activity.min ?? -8;
  const max = activity.max ?? 8;
  const target = useMemo(() => { try { return parseInequality(activity.solution); } catch { return []; } }, [activity.solution]);
  const [points, setPoints] = useState(result?.points || []);
  const [marks, setMarks] = useState(result?.marks || []);
  const checked = !!result?.done;

  const tapTick = (n) => {
    if (checked) return;
    setPoints((ps) => {
      const at = ps.findIndex((p) => p.x === n);
      if (at === -1) return ps.length >= 2 ? ps : [...ps, { x: n, closed: false }];
      if (!ps[at].closed) return ps.map((p, i) => (i === at ? { ...p, closed: true } : p));
      return ps.filter((_, i) => i !== at);
    });
  };
  const tapRegion = (r) => {
    if (checked) return;
    setMarks((ms) => (r.shaded ? ms.filter((m) => !((r.lo === NEG_INF || m > r.lo) && (r.hi === POS_INF || m < r.hi))) : [...ms, r.rep]));
  };
  const drawn = () => {
    const closedAt = (x) => points.find((p) => p.x === x)?.closed;
    return regionsOf(points, marks, min, max).filter((r) => r.shaded)
      .map((r) => interval(r.lo, r.hi, r.lo === NEG_INF ? true : !closedAt(r.lo), r.hi === POS_INF ? true : !closedAt(r.hi)))
      .reduce((acc, iv) => union(acc, [iv]), []);
  };
  const check = () => onResult({ done: true, correct: sameSet(drawn(), target), points, marks });

  return (
    <div>
      <div className="text-lg text-slate-800 dark:text-slate-100 mb-1"><SafeInlineMath math={activity.display} /></div>
      <div className="rounded-2xl bg-white dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 p-2">
        <NumberLineSVG min={min} max={max} points={points} marks={marks} onTick={tapTick} onPoint={(p) => tapTick(p.x)} onRegion={tapRegion} readOnly={checked} accent="#0e7490" />
      </div>
      {!checked && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-400">{tr(lang,
            'Tap a number for an open circle, again to fill it, again to remove it. Tap above the line to shade.',
            'Chạm một số để đặt vòng tròn (chạm lần nữa: đặc, lần nữa: bỏ). Chạm phía trên trục để tô.',
            'Touche un nombre pour un cercle vide, encore pour le remplir, encore pour l’enlever. Touche au-dessus de la droite pour colorier.')}</span>
          <button onClick={check} disabled={!marks.length} className={primary}>{t.check}</button>
        </div>
      )}
      {checked && <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>}
    </div>
  );
}

// ── reflect ──────────────────────────────────────────────────────────────────
// Tap the pieces of a cubic that lie below the axis; they fold up into the
// modulus graph. Derived from the factors by utils/cubic.js.

function ReflectActivity({ activity, lang, result, onResult, parseText, retry }) {
  const item = useMemo(() => ({ id: activity.id, factors: activity.factors, k: activity.k, display: activity.display }), [activity]);
  const below = useMemo(() => arcsOf(item).filter((a) => a.below).map((a) => a.i), [item]);
  const [sel, setSel] = useState(() => result?.sel || (retry?.sel || []).filter((i) => below.includes(i)));
  const checked = !!result?.done;
  const check = () => onResult({ done: true, correct: sel.length === below.length && below.every((i) => sel.includes(i)), sel });
  return (
    <div>
      <div className="mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white" style={{ maxWidth: '38rem' }}>
        <CubicFigure item={item} height={240} selected={checked ? below : sel} reflected={checked} arcsTappable={!checked}
          onArc={(arc) => setSel((s) => (s.includes(arc.i) ? s.filter((i) => i !== arc.i) : [...s, arc.i]))} />
      </div>
      {!checked && (
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-400">{sel.length} {tr(lang, 'piece(s) selected', 'đoạn đã chọn', 'morceau(x) choisi(s)')}</span>
          <button onClick={check} disabled={!sel.length} className={primary}>{tr(lang, 'Reflect', 'Phản chiếu', 'Retourner')}</button>
        </div>
      )}
      {checked && <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>}
    </div>
  );
}

// ── venn ─────────────────────────────────────────────────────────────────────
// Shade the regions a piece of set notation describes. Marked against the
// region set derived by utils/sets.js; after the check the right regions stay
// shaded (green when right, amber when shown).

function VennActivity({ activity, lang, result, onResult, parseText, retry }) {
  const sets = activity.sets || ['A', 'B'];
  const want = useMemo(() => vennRegionsOf(activity.expr, activity.sets || ['A', 'B']), [activity]);
  const [sel, setSel] = useState(() => result?.sel || (retry?.sel || []).filter((k) => want.includes(k)));
  const checked = !!result?.done;
  const check = () => onResult({ done: true, correct: sameRegions(sel, want), sel });
  return (
    <div>
      <div className="mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white p-1.5" style={{ maxWidth: '26rem' }}>
        <VennFigure sets={sets} labels={activity.labels || {}} counts={activity.counts || null}
          shaded={checked ? want : sel} tone={checked ? (result.correct ? 'good' : 'show') : 'pick'}
          onRegion={checked ? undefined : (k) => setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]))} />
      </div>
      {!checked && (
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-400">{sel.length} {tr(lang, `region${sel.length === 1 ? '' : 's'} shaded — tap to shade or clear`, 'vùng đã tô', `zone${sel.length > 1 ? 's' : ''} coloriée${sel.length > 1 ? 's' : ''} — touche pour colorier ou effacer`)}</span>
          <button onClick={check} disabled={!sel.length} className={primary}>{(T[lang] || T.en).check}</button>
        </div>
      )}
      {checked && <Verdict ok={result.correct} lang={lang}>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</Verdict>}
    </div>
  );
}

// ── dispatcher ───────────────────────────────────────────────────────────────

export default function ActivityBlock({ activity, lang = 'en', result, onResult, parseText = (x) => x, isDisplayMode = false, side = false, retry = null, badge = null }) {
  if (!activity) return null;
  // `side`: the block sits in a column beside the slide (Notes.jsx, from lg)
  // rather than in a full-width footer under it. `retry`: see the top of file.
  const common = { activity, lang, result, onResult, parseText, side, retry };
  let body;
  switch (activity.type) {
    case 'sort': body = <SortActivity {...common} />; break;
    case 'order': body = <OrderActivity {...common} />; break;
    case 'estimate': body = <EstimateActivity {...common} />; break;
    case 'hotspot': body = <HotspotActivity {...common} />; break;
    case 'predict': body = <PredictActivity {...common} />; break;
    case 'plot': body = <PlotActivity {...common} />; break;
    case 'numberline': body = <NumberLineActivity {...common} />; break;
    case 'reflect': body = <ReflectActivity {...common} />; break;
    case 'venn': body = <VennActivity {...common} />; break;
    case 'line': body = <LineActivity {...common} />; break;
    // Year 7 maths and science (Y7Activities.jsx)
    case 'terms': body = <TermsActivity {...common} />; break;
    case 'algebra': body = <AlgebraActivity {...common} />; break;
    case 'grid': body = <GridActivity {...common} />; break;
    case 'flow': body = <FlowActivity {...common} />; break;
    case 'periodic': body = <PeriodicActivity {...common} />; break;
    case 'particles': body = <ParticlesActivity {...common} />; break;
    case 'formula': body = <FormulaActivity {...common} />; break;
    // Year 7 number units (NumberActivities.jsx)
    case 'shift': body = <ShiftActivity {...common} />; break;
    case 'round': body = <RoundActivity {...common} />; break;
    case 'busstop': body = <BusStopActivity {...common} />; break;
    case 'ineq': body = <IneqActivity {...common} />; break;
    // Year 7 science 2.3, 2.4, 2.8 (ChainActivity / CycleActivity / PhActivity.jsx)
    case 'chain': body = <ChainActivity {...common} />; break;
    case 'cycle': body = <CycleActivity {...common} />; break;
    case 'ph': body = <PhActivity {...common} />; break;
    // Year 7 maths Unit 4 (decimals) and science 3.1
    // @@U04_1_ACT_CASE@@
    case 'decorder': body = <DecOrderActivity {...common} />; break;

    // @@U04_2_ACT_CASE@@
    case 'deccol': body = <DecColumnActivity {...common} />; break;

    // @@U04_3_ACT_CASE@@
    case 'pointback': body = <PointBackActivity {...common} />; break;

    // @@U04_4_ACT_CASE@@

    // @@U04_5_ACT_CASE@@
    case 'makeeasy': body = <MakeEasyActivity {...common} />; break;

    // @@SCI_U03_1_ACT_CASE@@

    // @@U05_1_ACT_CASE@@
    case 'anglesum': body = <AngleSumActivity {...common} />; break;

    // @@U05_2_ACT_CASE@@
    case 'anglepair': body = <AnglePairActivity {...common} />; break;

    // @@U05_3_ACT_CASE@@
    case 'zeroline': body = <ZeroLineActivity {...common} />; break;

    // @@SCI_U03_2_ACT_CASE@@

    // @@U06_1_ACT_CASE@@

    // @@U06_2_ACT_CASE@@

    // @@SCI_U03_3_ACT_CASE@@
    case 'orbitlab': body = <OrbitLabActivity {...common} />; break;

    // @@SCI_U03_4_ACT_CASE@@

    // @@SCI_U03_5_ACT_CASE@@

    // @@SCI_U03_6_ACT_CASE@@
    case 'energychange': body = <EnergyChangeActivity {...common} />; break;

    // @@SCI_U03_7_ACT_CASE@@
    case 'energysplit': body = <EnergySplitActivity {...common} />; break;


    default: body = <div className="text-rose-500 font-bold text-sm">Unknown activity type “{String(activity.type)}”.</div>;
  }
  return (
    <div>
      <Header activity={activity} lang={lang} parseText={parseText} isDisplayMode={isDisplayMode} badge={badge} />
      {body}
    </div>
  );
}

export { ACTIVITY_TYPES } from '../../utils/activity';
