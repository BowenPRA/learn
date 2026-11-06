/**
 * The proof behind X, F or Z? (Year 7 Maths 5.2) — what `npm run validate`
 * runs on every `anglePairs` item and every `anglepair` deck activity:
 *
 *  · the picture: a tilt within ±40°, an angle across of 20–160° and never
 *    85–95° (equal and "180° together" would look the same), every label inside
 *    the frame and clear of the lines and of the other labels;
 *  · the pair: one step for spot / find, two for steps, and every F or Z it asks
 *    about is the upright F or the true Z (the deck's convention, strictly);
 *    a steps item has a stepping stone whose two links draw allowed letters;
 *    a which item has exactly one line 3–8° off and at least one angle printed
 *    away from the place they are compared;
 *  · the marking: every stage accepts its own answer, and every slip's
 *    canonical wrong answer is named by its own code, no two sharing a value.
 */
import {
  itemModel, diagnoseTap, diagnosePair, diagnoseSize, diagnoseStone, diagnoseLine, diagnoseReason, REASON_IDS,
} from './anglePairs.js';
import { labelAt, labelBox, distToLine, letterAllowed, sameAt, sizeOf, EQUAL_RELS } from './anglePairGeom.js';

const KINDS = ['spot', 'find', 'steps', 'which'];
const sectorsOf = (F) => F.points.flatMap((_, c) => [0, 1, 2, 3].map((w) => [c, w]));

function checkFig(fig) {
  const out = [];
  const a = Number(fig?.a ?? 0);
  const th = Number(fig?.th);
  if (!Number.isInteger(a) || a < -40 || a > 40) out.push(`fig.a ${fig?.a} — a whole number from −40 to 40 (tilt the picture, never turn it over)`);
  if (!Number.isInteger(th) || th < 20 || th > 160) out.push(`fig.th ${fig?.th} — a whole number from 20 to 160`);
  else if (th >= 85 && th <= 95) out.push(`fig.th ${th} is too near 90°: equal and 180° together would look the same`);
  if (fig?.type === 'pair' && (th < 35 || th > 145)) out.push(`fig.th ${th} — a pair needs 35–145 so the two crossings have room for their numbers`);
  if (fig?.type === 'three') {
    const bends = (fig.bends || []).map(Number);
    if (bends.length !== 3 || !bends.every(Number.isInteger)) out.push('fig.bends needs three whole numbers');
    else if (bends.filter((b) => b !== 0).length !== 1) out.push('fig.bends: exactly one line turned, the others 0');
  }
  return out;
}

function checkLabels(F, shown) {
  const out = [];
  const placed = shown.map((s) => ({ ...s, p: labelAt(F, s.at), ...labelBox(s.text) }));
  for (const s of placed) {
    const [x, y] = s.p;
    if (x - s.w / 2 < 6 || x + s.w / 2 > F.W - 6 || y - s.h / 2 < 6 || y + s.h / 2 > F.H - 6) out.push(`label "${s.text}" at [${s.at}] runs off the picture`);
    for (const l of F.lines) {
      const d = distToLine(s.p, l.P, l.d);
      const half = Math.abs(Math.sin((l.d * Math.PI) / 180)) * (s.w / 2) + Math.abs(Math.cos((l.d * Math.PI) / 180)) * (s.h / 2);
      if (d - half < 2) out.push(`label "${s.text}" at [${s.at}] sits on a line`);
    }
  }
  for (let i = 0; i < placed.length; i += 1) {
    for (let j = i + 1; j < placed.length; j += 1) {
      const A = placed[i], B = placed[j];
      if (Math.abs(A.p[0] - B.p[0]) < (A.w + B.w) / 2 + 4 && Math.abs(A.p[1] - B.p[1]) < (A.h + B.h) / 2 + 4) out.push(`labels "${A.text}" and "${B.text}" overlap`);
    }
  }
  for (const ar of F.arrows) {
    const [x, y] = ar.tip;
    if (x < 22 || x > F.W - 22 || y < 22 || y > F.H - 22) out.push('an arrow runs off the picture');
    for (const P of F.points) if (Math.hypot(x - P[0], y - P[1]) < 60) out.push('an arrow sits too near a crossing');
  }
  return out;
}

/** Every slip value for a size, named by its own code; none may equal the answer. */
function proveSize(target, at) {
  const out = [];
  const { answer, from, rel } = target;
  if (!diagnoseSize(target, String(answer)).ok) out.push(`${at}: does not accept its own answer ${answer}`);
  if (!diagnoseSize(target, `${answer}°`).ok) out.push(`${at}: does not accept "${answer}°"`);
  const eq = EQUAL_RELS.includes(rel);
  const cases = [[eq ? 180 - from : from, eq ? 'supp' : 'same'], [360 - from, 'full']];
  // 90 − g is only a slip of its own when no other value is the same number.
  if (from < 90 && ![answer, ...cases.map((c) => c[0])].includes(90 - from)) cases.push([90 - from, 'comp']);
  const seen = new Map();
  for (const [v, code] of cases) {
    if (v === answer) { out.push(`${at}: the ${code} slip gives the answer itself (${v})`); continue; }
    if (seen.has(v)) out.push(`${at}: slips ${seen.get(v)} and ${code} share the value ${v}`);
    seen.set(v, code);
    const d = diagnoseSize(target, String(v));
    if (d.ok || d.code !== code) out.push(`${at}: ${v} should be named ${code}, got ${d.ok ? 'right' : d.code}`);
  }
  return out;
}

/** Problems with one item, as strings. Empty when it is sound. */
export function checkAnglePairItem(it, { bilingual = true } = {}) {
  const at = `item ${it?.id || '?'}`;
  if (!KINDS.includes(it?.kind)) return [`${at}: kind "${it?.kind}" — ${KINDS.join(', ')}`];
  const out = checkFig(it.fig).map((p) => `${at}: ${p}`);
  if (out.length) return out;
  let m;
  try { m = itemModel(it); } catch (e) { return [`${at}: ${e.message}`]; }
  const F = m.F;
  if (m.kind === 'spot') {
    out.push(...checkLabels(F, [{ at: m.given.at, text: `${m.given.size}°` }, { at: m.answerAt, text: `${m.answer}°` }]).map((p) => `${at}: ${p}`));
    if (!diagnoseTap(m, m.answerAt).ok) out.push(`${at}: the right tap is not accepted`);
    for (const s of sectorsOf(F)) if (!sameAt(s, m.answerAt) && (diagnoseTap(m, s).ok || !diagnoseTap(m, s).code)) out.push(`${at}: a tap on [${s}] is not named`);
  }
  if (m.kind === 'find') {
    out.push(...checkLabels(F, [{ at: m.given.at, text: `${m.given.size}°` }, ...m.targets.map((t) => ({ at: t.at, text: t.answer == null ? t.letter : `${t.answer}°` }))]).map((p) => `${at}: ${p}`));
    for (const t of m.targets) {
      const where = `${at} ${t.letter}`;
      if (['corr', 'alt'].includes(t.rel) && !letterAllowed(F, m.given.at, t.at)) out.push(`${where}: this ${t.rel === 'corr' ? 'F' : 'Z'} would be drawn mirrored or upside down — use the upright F (sector 3, line across leaning back) or the true Z (sectors 2 and 0, leaning forward)`);
      if (!diagnosePair(t, m.given.at, t.right).ok) out.push(`${where}: the right pair is not accepted`);
      for (const o of t.options) if (o !== t.right && (diagnosePair(t, m.given.at, o).ok || !diagnosePair(t, m.given.at, o).code)) out.push(`${where}: the pair "${o}" is not named`);
      if (t.answer != null) out.push(...proveSize({ ...t, rel: t.right }, where));
    }
    if (m.targets.length === 2 && m.targets.every((t) => t.answer != null)) out.push(`${at}: two letters are four actions — keep two letters for the no-arrows item (one of them "can't tell")`);
  }
  if (m.kind === 'steps') {
    out.push(...checkLabels(F, [{ at: m.given.at, text: `${m.given.size}°` }, { at: m.target.at, text: `${m.target.answer}°` }]).map((p) => `${at}: ${p}`));
    if (!m.stones.some((s) => s.drawn)) out.push(`${at}: no stepping stone draws allowed letters (an upright F or a true Z)`);
    for (const s of m.stones) {
      out.push(...checkLabels(F, [{ at: m.given.at, text: `${m.given.size}°` }, { at: m.target.at, text: `${m.target.answer}°` }, { at: s.at, text: `${s.size}°` }]).map((p) => `${at} stone [${s.at}]: ${p}`));
      if (!diagnoseStone(m, s.at).ok) out.push(`${at}: stone [${s.at}] is not accepted`);
      const t = { at: m.target.at, rel: s.outRel, right: s.outRel, from: s.size, answer: m.target.answer, letter: m.target.letter };
      if (sizeOf(F, m.target.at) !== (EQUAL_RELS.includes(s.outRel) ? s.size : 180 - s.size)) out.push(`${at}: stone [${s.at}] does not lead to the answer`);
      if (!diagnosePair(t, s.at, s.outRel).ok) out.push(`${at}: stone [${s.at}]'s pair is not accepted`);
      out.push(...proveSize(t, `${at} via [${s.at}]`));
    }
    for (const s of sectorsOf(F)) if (!m.stones.some((x) => sameAt(x.at, s)) && (diagnoseStone(m, s).ok || !diagnoseStone(m, s).code)) out.push(`${at}: a stone tap on [${s}] is not named`);
  }
  if (m.kind === 'which') {
    const shown = m.lines.map((l) => ({ at: l.printedAt, text: `${l.printed}°` }));
    out.push(...checkLabels(F, shown).map((p) => `${at}: ${p}`));
    for (const l of m.lines) if (l.conv !== 'self') out.push(...checkLabels(F, [...shown.filter((s) => s.at[0] !== l.refAt[0]), { at: l.refAt, text: `${l.same}°` }]).map((p) => `${at} (line ${l.name} moved): ${p}`));
    const odd = m.lines[m.odd];
    const other = m.lines.find((_, i) => i !== m.odd);
    const gap = Math.abs(odd.same - other.same);
    if (gap < 3 || gap > 8) out.push(`${at}: the odd line is ${gap}° off — keep it 3–8° so the eye cannot decide`);
    if (m.lines.every((l) => l.conv === 'self')) out.push(`${at}: every angle is printed in the same place — print at least one somewhere else`);
    if (!diagnoseLine(m, m.odd).ok) out.push(`${at}: the odd line is not accepted`);
    m.lines.forEach((l, i) => {
      if (i === m.odd) return;
      if (diagnoseLine(m, i).ok) out.push(`${at}: line ${l.name} is accepted but parallel`);
      if (l.conv !== 'self') out.push(...proveSize({ answer: l.same, from: l.printed, rel: l.conv, letter: l.name }, `${at} line ${l.name} moved`));
    });
    if (!diagnoseReason(m, 'same').ok) out.push(`${at}: the right reason is not accepted`);
    for (const r of REASON_IDS) if (r !== 'same' && diagnoseReason(m, r).ok) out.push(`${at}: reason "${r}" is accepted`);
    if (it.context && bilingual && !it.contextVn) out.push(`${at}: context needs contextVn`);
  }
  return out;
}

/** Every item of a unit's `anglePairs`, in order (levels only climb). */
export function checkAnglePairItems(items, opts = {}) {
  const out = [];
  const ids = new Set();
  let last = 0;
  for (const [i, it] of (items || []).entries()) {
    if (!it?.id) out.push(`item ${i + 1} has no id`);
    else if (ids.has(it.id)) out.push(`duplicate item id "${it.id}"`);
    ids.add(it?.id);
    if (!Number.isInteger(it?.level) || it.level < 1) out.push(`item ${it?.id}: level must be a whole number ≥ 1`);
    else if (it.level < last) out.push(`item ${it.id}: level ${it.level} comes after level ${last} — levels only climb`);
    else last = it.level;
    if (it?.kind === 'spot' && it.level > 2) out.push(`item ${it.id}: a spot item is one action — keep it to levels 1–2`);
    out.push(...checkAnglePairItem(it, opts));
  }
  return out;
}

/** An `anglepair` deck activity: one spot or find item on a slide. */
export function checkAnglePairActivity(a, opts = {}) {
  if (!['spot', 'find'].includes(a?.kind)) return [`kind "${a?.kind}" — a slide takes spot or find`];
  return checkAnglePairItem({ id: a.id, kind: a.kind, fig: a.fig, given: a.given, ask: a.ask, find: a.find }, opts);
}
