// src/utils/angleSumCheck.js
//
// The proof of Find It, Say Why (utils/angleSum.js), run by `npm run validate`
// (the @@U05_1_CHECK@@ marker) on the task's items and by utils/activity.js on
// every `anglesum` deck activity. For every step of every item it walks each
// stage with its own answer (accepted) and with each named slip's canonical
// wrong answer (named by its own code, opening the stage it belongs to), and
// it refuses: a slip whose value is the right answer, two slips that share a
// value but open different stages, a diagram whose labels overlap or leave the
// picture, and a quadrilateral with exactly two small squares (there
// 180° − the other given angle is the answer by two mistakes at once — the
// classroom's z = 75°).

import {
  angleModel, KINDS, DECIDE_FACTS, diagnoseFirst, diagnoseDecide, diagnosePick, diagnoseSum, diagnoseRest,
  diagnoseShare, diagnoseOpp, diagnoseTotal, diagnoseWhy, diagnoseValue, openAt,
} from './angleSum.js';
import { figureOf, quadPoints } from './angleSumGeometry.js';

const same = (a, b) => Math.abs(a - b) < 1e-9;

function proveFigure(m, out) {
  let f;
  try { f = figureOf(m); } catch (e) { out.push(`figure: ${e.message}`); return; }
  const labels = f.wedges.filter((w) => !w.right);
  for (const w of labels) {
    const hw = (w.fit || w.text).length * 6.3 + 2;
    if (w.lx - hw < 0 || w.lx + hw > f.w || w.ly - 13 < 0 || w.ly + 13 > f.h) out.push(`figure: label "${w.text}" leaves the picture`);
  }
  for (let i = 0; i < f.wedges.length; i += 1) {
    for (let j = i + 1; j < f.wedges.length; j += 1) {
      const a = f.wedges[i]; const b = f.wedges[j];
      if (Math.hypot(a.lx - b.lx, a.ly - b.ly) < 30) out.push(`figure: labels "${a.text || '□'}" and "${b.text || '□'}" are on top of each other`);
    }
  }
  if (m.kind === 'quad' || m.kind === 'para') {
    const alpha = m.order.map((k) => (m.els[k].letter ? m.answers[m.els[k].letter] : m.els[k].value));
    const q = quadPoints(alpha, 0);
    if (!q || q.quality < 0.3) out.push('figure: the quadrilateral is too thin to read — choose angles nearer 90°');
  }
}

/** Problems with one derived model, as strings. Empty when it is proved. */
export function proveModel(m) {
  const out = [];
  const vals = Object.values(m.els);
  if (m.kind === 'line' || m.kind === 'point' || m.kind === 'straight') {
    for (const e of vals) {
      const v = e.letter ? m.answers[e.letter] : e.value;
      if (v < 20) out.push(`${e.letter || v}: an angle under 20° is too thin to label`);
    }
  }
  if (m.kind === 'quad' || m.kind === 'para') {
    for (const k of m.order) {
      const e = m.els[k];
      const v = e.letter ? m.answers[e.letter] : e.value;
      if (!(v >= 35 && v <= 150)) out.push(`corner ${e.letter || v}°: keep every corner 35°–150° so the drawing is a clear convex shape`);
    }
    if (m.order.filter((k) => m.els[k].right).length === 2) out.push('two small squares in a quadrilateral: 180° − the other given angle gives the answer by two mistakes — use one small square or three');
  }
  if (m.els.ext && m.els.ext.value != null && m.els[m.order[m.els.ext.at]].value != null) out.push('ext: the corner and the angle next to it are both given — nothing to find on that line');
  for (const [l, v] of Object.entries(m.answers)) {
    if (!Number.isInteger(v) || v <= 0) out.push(`${l} = ${v}°: an answer must be a whole number of degrees`);
  }
  proveFigure(m, out);

  for (const s of m.steps) {
    const at = `step ${s.letters.join('=') || 'XY'}`;
    if (s.fact === 'straight') {
      if (s.sum < 165 || s.sum > 195) out.push(`${at}: ${s.sum}° does not look straight — keep it within 15° of 180°`);
      if (s.isStraight && s.knowns.length < 3) out.push(`${at}: a straight "yes" needs three angles (its wrong reason is "only two angles")`);
      if (!diagnoseTotal(s, String(s.sum)).ok) out.push(`${at}: the total does not accept ${s.sum}`);
      for (const x of s.slips) {
        const d = diagnoseTotal(s, String(x.value));
        if (same(x.value, s.sum)) out.push(`${at}: slip ${x.code} is the right total`);
        else if (d.ok || d.code !== x.code) out.push(`${at}: total ${x.value} is named "${d.code}", not "${x.code}"`);
      }
    } else {
      if (s.first) {
        const oks = s.first.filter((l) => diagnoseFirst(s, l).ok);
        if (oks.length !== 1 || oks[0] !== s.letters[0]) out.push(`${at}: find-first must have exactly one right letter (${s.letters[0]}), has ${oks.join(', ') || 'none'}`);
      }
      if (s.stages.includes('decide')) {
        if (!diagnoseDecide(s, s.total).ok) out.push(`${at}: decide does not accept ${s.total}°`);
        if (diagnoseDecide(s, s.total === 180 ? 360 : 180).ok) out.push(`${at}: decide accepts the wrong total`);
        // The fact cards: only this step's fact is right, and every other card is named.
        for (const f of DECIDE_FACTS) {
          const d = diagnoseDecide(s, f);
          if (f === s.fact ? !d.ok : d.ok) out.push(`${at}: the "${f}" card is marked the wrong way`);
          if (!d.ok && !(d.code && d.en && d.fr)) out.push(`${at}: the "${f}" card is refused with no named message`);
        }
      }
      if (s.stages.includes('add')) {
        if (!diagnosePick(s, s.knowns.map((k) => k.key)).ok) out.push(`${at}: add does not accept its own angles`);
        for (const k of s.knowns) {
          const d = diagnosePick(s, s.knowns.filter((x) => x.key !== k.key).map((x) => x.key));
          if (d.code !== (k.right ? 'forgotRight' : 'forgot')) out.push(`${at}: leaving out ${k.value}° is named "${d.code}"`);
        }
        for (const dc of s.decoys) if (diagnosePick(s, [...s.knowns.map((k) => k.key), dc.key]).code !== 'decoy') out.push(`${at}: the decoy ${dc.value}° is not named`);
        if (!diagnoseSum(s, String(s.sum)).ok) out.push(`${at}: add does not accept ${s.sum}`);
      }
      if (s.stages.includes('subtract')) {
        if (!diagnoseRest(s, String(s.rest)).ok) out.push(`${at}: subtract does not accept ${s.rest}`);
        if (!same(s.sum, s.rest) && diagnoseRest(s, String(s.sum)).code !== 'noSub') out.push(`${at}: writing ${s.sum} is not named noSub`);
      }
      if (s.stages.includes('share') && !diagnoseShare(s, String(s.answer)).ok) out.push(`${at}: share does not accept ${s.answer}`);
      if (s.stages.includes('calc') && !diagnoseOpp(s, String(s.answer)).ok) out.push(`${at}: calc does not accept ${s.answer}`);
      if (!diagnoseValue(s, String(s.answer)).ok) out.push(`${at}: quick does not accept ${s.answer}`);
      for (const x of s.slips) {
        if (same(x.value, s.answer)) { out.push(`${at}: slip ${x.code} (${x.value}) is the right answer`); continue; }
        const d = diagnoseValue(s, String(x.value));
        const firstHit = s.slips.find((y) => same(y.value, x.value));
        if (d.ok || d.code !== firstHit.code) out.push(`${at}: ${x.value} is named "${d.code}", not "${x.code}"`);
        else if (openAt(s, firstHit.stage) !== openAt(s, x.stage)) out.push(`${at}: ${x.value} is both ${firstHit.code} and ${x.code} — they open different stages`);
      }
    }
    const rights = s.reasons.filter((r) => !r.code);
    if (s.reasons.length !== 3 || rights.length !== 1) out.push(`${at}: needs three reasons, exactly one right`);
    if (new Set(s.reasons.map((r) => r.en)).size !== s.reasons.length) out.push(`${at}: two reasons say the same thing`);
    for (const r of s.reasons) {
      const d = diagnoseWhy(s, r.id);
      if (!!r.code === !!d.ok) out.push(`${at}: reason "${r.en}" is marked the wrong way`);
    }
  }
  return out;
}

function contextProblems(src, m, bilingual) {
  const out = [];
  if (!src.context) return out;
  if (bilingual && !src.contextVn) out.push('context needs contextVn');
  for (const e of Object.values(m.els)) {
    if (!e.letter && !e.right && !String(src.context).includes(String(e.value))) out.push(`context does not give ${e.value}°`);
    if (e.right && !/right angle/i.test(src.context)) out.push('context has a small square but never says "right angle"');
  }
  return out;
}

/** The task's items (unit.angleSum.items). */
export function checkAngleSumItems(items, { bilingual = true } = {}) {
  const out = [];
  const ids = new Set();
  for (const it of items || []) {
    const at = `item ${it?.id || '?'}`;
    if (!it?.id) out.push(`${at}: needs an id`);
    if (ids.has(it?.id)) out.push(`${at}: duplicate id`);
    ids.add(it?.id);
    if (!Number.isInteger(it?.level) || it.level < 1) out.push(`${at}: needs a level`);
    let m;
    try { m = angleModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    for (const p of proveModel(m)) out.push(`${at}: ${p}`);
    for (const p of contextProblems(it, m, bilingual)) out.push(`${at}: ${p}`);
  }
  return out;
}

/** One `anglesum` deck activity. */
export function checkAngleSumActivity(a, { bilingual = true } = {}) {
  if (!KINDS.includes(a.kind)) return [`kind "${a.kind}" — ${KINDS.join(' / ')}`];
  let m;
  try { m = angleModel({ id: a.id, level: 1, kind: a.kind, angles: a.angles, ext: a.ext, walk: a.walk ?? true }); } catch (e) { return [e.message]; }
  if (a.walk !== undefined && typeof a.walk !== 'boolean') return ['walk is true or false'];
  return [...proveModel(m), ...contextProblems(a, m, bilingual)];
}
