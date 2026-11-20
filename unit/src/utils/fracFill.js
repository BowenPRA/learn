// unit/src/utils/fracFill.js
//
// `fill` — fraction sentences with boxes to type into, on a notes slide (Maths 7.1,
// 20 November 2026: "some of the slides should be questions for the students to fill
// in the answers"). components/notes/FillActivity.jsx draws it; this file reads the
// lines, marks the boxes, words the hint after a mistake, and proves every line.
//
//   activity: {
//     id, type: 'fill', prompt, promptFr, explain, explainFr,
//     lines: [
//       '3/5 = [12]/20',              a number box: the answer in square brackets
//       '23/6 = [3] [5]/6',           a whole number then a fraction: a mixed number
//       '3 2/5 = [17]/5',
//       '3/4 {=} 9/12',               a sign box: tap = or ≠ (the answer in braces)
//       '5/6 {>} 7/9',                tap <, = or >
//       { q: '12/16 = [3]/4', hint: '…', hintFr: '…' },   an authored hint wins
//     ],
//     split: 4,                       optional: the line the second column starts at
//   }
//
// Tokens are separated by spaces: a number, a fraction a/b (either part may be a box),
// a sign (= ≠ < >) or a sign box. A whole number followed straight by a fraction is
// one mixed number. The validator fills every box with its answer and checks that the
// sentence is true, so a wrong answer key cannot ship.

export const FILL_SIGNS = ['=', '≠', '<', '>'];
const MAX_LINES = 8;

const lineSrc = (line) => (typeof line === 'string' ? line : line?.q);

/** One number, or a number box: { box, value }. */
function partOf(tok) {
  const box = /^\[(\d{1,4})\]$/.exec(tok);
  if (box) return { box: true, value: Number(box[1]) };
  if (/^\d{1,4}$/.test(tok)) return { box: false, value: Number(tok) };
  return null;
}

/**
 * A line read into terms: values ({ kind: 'value', whole, top, bottom }, each part a
 * { box, value, id? } or null) and signs ({ kind: 'sign', sign, box, id? }), in turn.
 * Boxes are numbered left to right: ids `${lineIndex}.${n}`. Throws on a bad line.
 */
export function parseFillLine(src, lineIndex = 0) {
  const toks = String(src ?? '').trim().split(/\s+/).filter(Boolean);
  if (!toks.length) throw new Error('the line is empty');
  const terms = [];
  let n = 0;
  const stamp = (p) => (p.box ? { ...p, id: `${lineIndex}.${n++}` } : p);
  for (let i = 0; i < toks.length; i += 1) {
    const tok = toks[i];
    const signBox = /^\{(.)\}$/.exec(tok);
    if (FILL_SIGNS.includes(tok) || signBox) {
      const sign = signBox ? signBox[1] : tok;
      if (!FILL_SIGNS.includes(sign)) throw new Error(`"${tok}": a sign box holds one of ${FILL_SIGNS.join(' ')}`);
      terms.push(stamp({ kind: 'sign', sign, box: !!signBox, value: sign }));
      continue;
    }
    const slash = tok.split('/');
    if (slash.length === 2) {
      const top = partOf(slash[0]);
      const bottom = partOf(slash[1]);
      if (!top || !bottom) throw new Error(`"${tok}" is not a fraction`);
      const prev = terms[terms.length - 1];
      // a whole number written straight before a fraction: a mixed number
      if (prev?.kind === 'value' && prev.top == null) {
        prev.top = stamp(top);
        prev.bottom = stamp(bottom);
      } else terms.push({ kind: 'value', whole: null, top: stamp(top), bottom: stamp(bottom) });
      continue;
    }
    const whole = partOf(tok);
    if (!whole) throw new Error(`"${tok}" is not a number, a fraction or a sign`);
    terms.push({ kind: 'value', whole: stamp(whole), top: null, bottom: null });
  }
  terms.forEach((t, i) => {
    if ((i % 2 === 0) !== (t.kind === 'value')) throw new Error('numbers and signs must take turns, starting and ending with a number');
  });
  if (terms.length < 3 || terms[terms.length - 1].kind !== 'value') throw new Error('a line needs a number, a sign and a number');
  return terms;
}

/** Every box of the parsed terms, left to right: { id, kind: 'num' | 'sign', answer }. */
export function boxesOf(terms) {
  const out = [];
  for (const t of terms) {
    if (t.kind === 'sign') { if (t.box) out.push({ id: t.id, kind: 'sign', answer: t.sign }); continue; }
    for (const p of [t.whole, t.top, t.bottom]) if (p?.box) out.push({ id: p.id, kind: 'num', answer: String(p.value) });
  }
  return out;
}

/** A value term as a fraction [numerator, denominator], every box at its answer. */
export function ratioOf(t) {
  const w = t.whole ? t.whole.value : 0;
  if (t.top == null) return [w, 1];
  return [w * t.bottom.value + t.top.value, t.bottom.value];
}

const cmp = ([a, b], [c, d]) => Math.sign(a * d - c * b);
const holds = (sign, x, y) => {
  const c = cmp(x, y);
  return sign === '=' ? c === 0 : sign === '≠' ? c !== 0 : sign === '<' ? c < 0 : c > 0;
};

/** The choices a sign box offers: = ≠ for an equal-or-not box, < = > for a which-is-bigger box. */
export const signChoices = (answer) => (answer === '=' || answer === '≠' ? ['=', '≠'] : ['<', '=', '>']);

/** The whole activity read: { lines: [{ terms, boxes, hint }], boxes, split }. Throws on a bad line. */
export function fillModel(activity) {
  const src = activity?.lines || [];
  const lines = src.map((line, i) => {
    const terms = parseFillLine(lineSrc(line), i);
    return { terms, boxes: boxesOf(terms), hint: typeof line === 'object' && line?.hint ? { en: line.hint, fr: line.hintFr || line.hint } : null };
  });
  const split = Number.isInteger(activity?.split) ? activity.split : Math.ceil(lines.length / 2);
  return { lines, boxes: lines.flatMap((l) => l.boxes), split };
}

/** Is a typed (or tapped) answer right? Numbers ignore spaces and leading zeros. */
export function boxOk(box, typed) {
  const s = String(typed ?? '').trim();
  if (box.kind === 'sign') return s === box.answer;
  return /^\d{1,4}$/.test(s) && Number(s) === Number(box.answer);
}

/**
 * The hint for a line after a wrong answer, { en, fr }. It names the method with the
 * line's own numbers and never states a box's answer. An authored `hint` wins.
 */
export function fillHint(line) {
  if (line.hint) return line.hint;
  const vals = line.terms.filter((t) => t.kind === 'value');
  const sign = line.terms.find((t) => t.kind === 'sign');
  const frac = (t) => t.whole == null && t.top != null;
  const given = (p) => p && !p.box;
  if (vals.length === 2 && sign?.box) {
    if (sign.sign === '=' || sign.sign === '≠') {
      return {
        en: 'Did the top and the bottom change by the same × or ÷? If you have to add, they are not equal.',
        fr: 'Le haut et le bas ont-ils changé avec le même × ou ÷ ? S’il faut ajouter, elles ne sont pas égales.',
      };
    }
    const same = vals.every(frac) && vals[0].bottom.value === vals[1].bottom.value;
    return same
      ? { en: 'The bottoms are the same: compare the tops.', fr: 'Les bas sont les mêmes : compare les hauts.' }
      : { en: 'Change them to the same bottom first. Then compare the tops.', fr: 'Mets-les d’abord sur le même bas. Puis compare les hauts.' };
  }
  if (vals.length === 2 && sign && !sign.box && sign.sign === '=') {
    const [a, b] = vals;
    // equivalent fractions: one fraction given, a box in the other
    if (frac(a) && frac(b)) {
      const G = given(a.top) && given(a.bottom) ? a : b;
      const X = G === a ? b : a;
      const [gk, xk, other] = given(X.bottom) ? [G.bottom.value, X.bottom.value, 'top'] : [G.top.value, X.top.value, 'bottom'];
      const part = other === 'top' ? { en: 'The bottom', fr: 'En bas' } : { en: 'The top', fr: 'En haut' };
      const todo = other === 'top' ? { en: 'Do the same to the top.', fr: 'Fais pareil en haut.' } : { en: 'Do the same to the bottom.', fr: 'Fais pareil en bas.' };
      const step = xk % gk === 0 ? `${gk} × ${xk / gk} = ${xk}` : gk % xk === 0 ? `${gk} ÷ ${gk / xk} = ${xk}` : null;
      if (step) return { en: `${part.en}: ${step}. ${todo.en}`, fr: `${part.fr} : ${step}. ${todo.fr}` };
    }
    // improper → mixed: a given fraction, boxes in the mixed number
    if (frac(a) && given(a.top) && given(a.bottom) && b.whole && b.top) {
      const s = `${a.top.value} ÷ ${a.bottom.value}`;
      return {
        en: `Divide: ${s}. The answer is the whole number. The remainder goes on top.`,
        fr: `Divise : ${s}. La réponse est le nombre entier. Le reste va en haut.`,
      };
    }
    // mixed → improper: a given mixed number, a box on top of the fraction
    if (a.whole && given(a.whole) && given(a.top) && given(a.bottom) && frac(b)) {
      const { value: w } = a.whole;
      const { value: t } = a.top;
      const { value: d } = a.bottom;
      return {
        en: `Multiply first: ${w} × ${d}. Then add the top, ${t}. The bottom stays ${d}.`,
        fr: `Multiplie d’abord : ${w} × ${d}. Puis ajoute le haut, ${t}. Le bas reste ${d}.`,
      };
    }
  }
  return { en: 'Look at that box again and work it out step by step.', fr: 'Regarde encore cette case et calcule étape par étape.' };
}

/**
 * Mark every box. Returns { marks: { [id]: 'good' | 'bad' }, blank, firstBad } where
 * blank is true when a box is still empty and firstBad is the first wrong line's index.
 */
export function markFill(model, entries) {
  const marks = {};
  let blank = false;
  let firstBad = null;
  model.lines.forEach((line, i) => {
    for (const b of line.boxes) {
      const typed = String(entries?.[b.id] ?? '').trim();
      if (!typed) { blank = true; continue; }
      marks[b.id] = boxOk(b, typed) ? 'good' : 'bad';
      if (marks[b.id] === 'bad' && firstBad == null) firstBad = i;
    }
  });
  return { marks, blank, firstBad };
}

/** Problems with one `fill` activity, as strings (utils/activity.js runs it). */
export function checkFillActivity(a) {
  const out = [];
  const src = a?.lines;
  if (!Array.isArray(src) || !src.length) return ['fill needs lines'];
  if (src.length > MAX_LINES) out.push(`fill has ${src.length} lines — at most ${MAX_LINES} on a slide`);
  src.forEach((line, i) => {
    const at = `line ${i + 1} "${lineSrc(line)}"`;
    let terms;
    try { terms = parseFillLine(lineSrc(line), i); } catch (e) { out.push(`${at}: ${e.message}`); return; }
    if (!boxesOf(terms).length) out.push(`${at} has no box to fill`);
    if (typeof line === 'object' && line.hint && !line.hintFr) out.push(`${at}: hint needs hintFr`);
    const vals = terms.filter((t) => t.kind === 'value');
    for (const v of vals) {
      if (v.bottom && v.bottom.value === 0) out.push(`${at}: a bottom of 0`);
      if (v.whole && v.top && !(v.top.value > 0 && v.top.value < v.bottom.value)) out.push(`${at}: ${v.whole.value} ${v.top.value}/${v.bottom.value} is not a mixed number — the top must be less than the bottom`);
    }
    for (let k = 1; k < terms.length; k += 2) {
      const s = terms[k];
      if (!holds(s.sign, ratioOf(terms[k - 1]), ratioOf(terms[k + 1]))) out.push(`${at} is not true with its answers filled in`);
    }
  });
  if (a.split !== undefined && !(Number.isInteger(a.split) && a.split >= 1 && a.split <= src.length)) out.push(`fill split ${a.split} must be a line number from 1 to ${src.length}`);
  return out;
}
