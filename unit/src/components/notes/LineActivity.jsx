import { useMemo, useRef, useState } from 'react';
import { CheckCircle2, AlertTriangle, Target, Ban, MousePointerClick } from 'lucide-react';
import LinePlane from '../math/LinePlane.jsx';
import { LINE_COLORS, latticeFromEvent } from '../math/linePlaneGeom.js';
import { modelOf, clickNeeds, frPt, numPt, onLine, samePt, ptText, texToText } from '../../utils/lineLab';
import { stepText } from '../../utils/lineLabText';
import { field } from '../../utils/lang';

/**
 * The `line` activity on a Notes slide — one click step of the Line Lab, done
 * in the deck: plot some points, place three points on a line, walk a slope,
 * click an intercept, a midpoint, a corner or where two lines meet. The
 * answer is derived by utils/lineLab.js from the activity's own `points`,
 * `lines` and `step` (the Line Lab item shape, with one step), and the
 * validator runs the same checks on it (checkLineActivity).
 *
 * Scored like any activity: one item, right or wrong on the first Check.
 * Tapping a placed point takes it off again; a step with one answer keeps one
 * point, so a second tap moves it. A retry keeps the points that were right.
 */

const GREEN = '#58cc02';
const RED = '#ff4b4b';
const SKY = '#1cb0f6';
const UNIT = 30;

const T = {
  en: { check: 'Check', correct: 'Correct', notQuite: 'Not quite', never: 'They never meet', aim: 'Tap the grid to place a point' },
  vn: { check: 'Kiểm tra', correct: 'Chính xác', notQuite: 'Chưa đúng', never: 'Không bao giờ gặp nhau', aim: 'Chạm vào lưới để đặt điểm' },
  fr: { check: 'Vérifier', correct: 'Correct !', notQuite: 'Pas tout à fait', never: 'Elles ne se croisent jamais', aim: 'Touche la grille pour placer un point' },
};

const btn = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const same = (p, q) => p[0] === q[0] && p[1] === q[1];

/** Is this placed point a right one? */
function isRight(ans, p) {
  const q = frPt(p);
  if (ans.on) return onLine(ans.on, q) && !ans.exclude.some((e) => samePt(e, q));
  return ans.targets.some((t) => samePt(t, q));
}

export default function LineActivity({ activity, lang, result, onResult, parseText, retry }) {
  const t = T[lang] || T.en;
  const svgRef = useRef(null);
  const { model, ans } = useMemo(() => {
    try {
      const m = modelOf({ ...activity, steps: [activity.step] });
      return { model: m, ans: m.answers[0] };
    } catch {
      return { model: null, ans: null };
    }
  }, [activity]);
  const [placed, setPlaced] = useState(() => result?.placed
    || (ans ? (retry?.placed || []).filter((p) => isRight(ans, p)) : []));
  const [aim, setAim] = useState(null);
  const checked = !!result?.done;

  if (!model) return <div className="text-rose-500 font-bold text-sm">This graph could not be drawn.</div>;

  const grid = model.grid;
  const step = activity.step;
  const need = clickNeeds(ans);
  const single = !ans.on && need === 1;
  const { title } = stepText(step, model, lang);

  const tap = (e) => {
    if (checked) return;
    const p = latticeFromEvent(e, svgRef.current, grid, UNIT);
    if (!p) return;
    setPlaced((ps) => {
      if (ps.some((q) => same(q, p))) return ps.filter((q) => !same(q, p));
      return single ? [p] : [...ps, p];
    });
  };

  const check = (never = false) => {
    const mine = never ? [] : placed;
    let correct;
    if (ans.verdict) correct = never;
    else if (ans.on) correct = mine.length >= need && mine.every((p) => isRight(ans, p));
    else correct = mine.length === ans.targets.length && ans.targets.every((tg) => mine.some((p) => samePt(tg, frPt(p))));
    onResult({ done: true, correct, placed: mine, never });
  };

  // ---- the picture
  const shown = new Set(activity.show || []);
  const lineNames = Object.keys(model.lines);
  if (checked && ans.on) shown.add(step.line);
  const lines = lineNames
    .map((n, i) => ({ n, i }))
    .filter(({ n }) => shown.has(n))
    .map(({ n, i }) => {
      const ln = model.lines[n];
      const hidden = (activity.hideLabels || []).includes(n);
      return { line: ln, color: LINE_COLORS[i % 4], label: ln.tex && !hidden ? texToText(ln.tex) : null };
    });
  const segments = [];
  if (step.kind === 'midpoint' || step.kind === 'divide') {
    const [p, q] = step.of || [step.from, step.to];
    segments.push({ from: numPt(model.points[p]), to: numPt(model.points[q]), color: '#94a3b8', width: 2.5 });
  }
  if (step.kind === 'extend') {
    const A = numPt(model.points[step.from]);
    const M = numPt(model.points[step.through]);
    segments.push({ from: A, to: M, color: '#94a3b8', width: 2.5 });
    if (checked) segments.push({ from: M, to: [2 * M[0] - A[0], 2 * M[1] - A[1]], color: '#94a3b8', width: 2.5, dashed: true });
  }
  if (step.kind === 'corner' && checked) {
    const A = numPt(model.points[step.from]);
    const B = numPt(model.points[step.to]);
    segments.push({ from: A, to: [B[0], A[1]], color: '#64748b', dashed: true });
    segments.push({ from: [B[0], A[1]], to: B, color: '#64748b', dashed: true });
  }
  const points = [];
  for (const n of Object.keys(model.points)) {
    if (!shown.has(n) || !(activity.points || {})[n]) continue;
    points.push({ at: numPt(model.points[n]), color: '#be185d', name: n, flag: ptText(model.points[n]) });
  }
  const mine = checked ? (result.placed || []) : placed;
  if (checked && !ans.on) {
    for (const tg of ans.targets) points.push({ at: numPt(tg), color: GREEN, flag: ptText(tg) });
  }
  for (const p of mine) {
    const ok = isRight(ans, p);
    if (checked && !ans.on && ok) continue;
    points.push({ at: p, color: checked ? (ok ? GREEN : RED) : SKY, flag: checked && ans.on ? null : `(${p[0] < 0 ? `−${-p[0]}` : p[0]}, ${p[1] < 0 ? `−${-p[1]}` : p[1]})` });
  }

  // An optional circle (the ADD_MATH circle decks): `circle: { centre, r2,
  // always? }`. It is swept on once the answer is checked, so clicking the
  // centre is followed by seeing the circle it belongs to; `always: true`
  // draws it from the start, for a question asked about a circle on show.
  const circles = activity.circle && (checked || activity.circle.always)
    ? [{ centre: activity.circle.centre, r: Math.sqrt(activity.circle.r2), color: '#0e7490', fill: true, draw: !activity.circle.always }]
    : [];

  const cols = grid.xMax - grid.xMin;
  const rows = grid.yMax - grid.yMin;
  const W = cols * UNIT + 52;
  const H = rows * UNIT + 52;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="text-xs font-black uppercase tracking-widest text-[#1899d6] dark:text-[#5cc8ff] flex items-start gap-1.5 min-w-0">
          <Target className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} />
          <span className="normal-case tracking-normal text-sm">{parseText(title)}</span>
        </div>
        {!checked && (
          <div className="font-mono font-black text-sm tabular-nums" style={aim ? { color: SKY } : undefined}>
            {aim ? `(${aim[0] < 0 ? `−${-aim[0]}` : aim[0]}, ${aim[1] < 0 ? `−${-aim[1]}` : aim[1]})` : <span className="text-slate-300 dark:text-slate-600">(–, –)</span>}
          </div>
        )}
      </div>
      <div className="mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700" style={{ width: `min(100%, ${((W / H) * 52).toFixed(1)}vh)` }}>
        <LinePlane grid={grid} unit={UNIT} svgRef={svgRef} lines={lines} circles={circles} segments={segments} points={points}
          interactive={!checked} aim={checked ? null : aim}
          onPointerMove={(e) => { if (!checked && e.pointerType !== 'touch') setAim(latticeFromEvent(e, svgRef.current, grid, UNIT)); }}
          onPointerLeave={() => setAim(null)}
          onClick={tap}
          style={{ width: '100%', height: 'auto' }} />
      </div>
      {!checked && (
        <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
          <span className="mr-auto flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <MousePointerClick className="w-4 h-4" strokeWidth={2.5} />{t.aim}{need > 1 ? ` · ${placed.length}/${need}` : ''}
          </span>
          {step.kind === 'meet' && (
            <button onClick={() => check(true)} className={`${btn} bg-slate-500 border-slate-700 text-white flex items-center gap-1.5`}>
              <Ban className="w-4 h-4" strokeWidth={3} />{t.never}
            </button>
          )}
          <button onClick={() => check(false)} disabled={!placed.length} className={`${btn} bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]`}>{t.check}</button>
        </div>
      )}
      {checked && (
        <div className={`rounded-xl border-2 mt-3 p-3 ${result.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
          <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {result.correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
            {result.correct ? t.correct : t.notQuite}
          </div>
          <div className={`font-bold leading-relaxed text-sm lg:text-base ${result.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
            {parseText(field(activity, 'explain', lang))}
          </div>
        </div>
      )}
    </div>
  );
}
