// unit/src/utils/working.js
//
// The model behind the notebook working on a lesson slide (layout `work`, drawn by
// components/math/NotebookWorking.jsx; Upper Secondary Maths 1, 22 November 2026).
// Bowen: the move written under the +9 and under the 14, x terms grouped with x terms
// and numbers with numbers.
//
//   work: {
//     eq: '5x + 3 = 2x + 18',        the equation, read by utils/linearEquation.js
//     moves: ['-2x', '-3', '/3'],     each done to both sides: + − × ÷ a number, or ± an x term
//     say: ['x terms to the left'],   optional: the words beside each move (else worked out)
//     written: '3(x + 4) = 27',       optional: the equation as written, shown first,
//     writtenSay: 'multiply out',     with these words before its tidied line
//   }
//
// Every line is worked out from the equation and the moves, so a line cannot be wrong,
// and `checkWorking` refuses a spec whose moves do not end with x on its own.
import { parseEquation, applyMove, isSolved, solutionOf, fr, frText, isZero, isNeg, neg, coefText, toNumber, add, mul } from './linearEquation.js';

const MINUS = '−';
const show = (s) => String(s).replace(/-/g, MINUS);

/** A move as written ('-9', '+ 2x', '/3', '÷3', '*2', '×2') → { kind, amount, onX }. Throws on anything else. */
export function parseMove(src) {
  const m = /^\s*([+\-−*×/÷])\s*\(?\s*([-−]?\d+(?:\/\d+)?)\s*\)?\s*(x?)\s*$/.exec(String(src));
  if (!m) throw new Error(`"${src}" is not a move (+9, -9, -2x, /3, *2, /-1)`);
  const kind = { '+': 'add', '-': 'sub', '−': 'sub', '*': 'mul', '×': 'mul', '/': 'div', '÷': 'div' }[m[1]];
  const [n, d] = m[2].replace('−', '-').split('/').map(Number);
  const onX = !!m[3];
  if (onX && (kind === 'mul' || kind === 'div')) throw new Error(`"${src}": an x term can only be added or taken away`);
  return { kind, amount: fr(n, d || 1), onX };
}

/** The words beside a move when the author gives none. */
export function moveWords({ kind, amount, onX }) {
  const n = show(frText(amount)) + (onX ? 'x' : '');
  if (kind === 'sub') return `take ${n} from both sides`;
  if (kind === 'add') return `add ${n} to both sides`;
  if (kind === 'div') return `divide both sides by ${n}`;
  return `multiply both sides by ${n}`;
}

/** How a move is written under a side: "− 9", "+ 2x", "÷ 3", "× 2". */
export const moveText = ({ kind, amount, onX }) =>
  `${{ add: '+', sub: MINUS, mul: '×', div: '÷' }[kind]} ${isNeg(amount) ? `(${show(frText(amount))})` : frText(amount)}${onX ? 'x' : ''}`;

/**
 * A side as its two cells: the x term and the number, written so the number carries
 * its sign when an x term stands before it ("+ 9", "− 3"). Empty strings for nothing.
 */
export function sideCells(s, v = 'x') {
  const hasX = !isZero(s.x);
  const xCell = hasX ? show(coefText(s.x, v)) : '';
  let cCell = '';
  if (!isZero(s.c)) cCell = hasX ? `${isNeg(s.c) ? MINUS : '+'} ${frText(isNeg(s.c) ? neg(s.c) : s.c)}` : show(frText(s.c));
  else if (!hasX) cCell = '0';
  return { x: xCell, c: cCell, xFrac: hasX && s.x.d !== 1 };
}

/** The value of a side at x. */
const valueAt = (s, x) => add(mul(s.x, x), s.c);

/**
 * Put the answer back into the equation as written: "3(5) + 7 = 22", and both sides
 * when x is on both ("5(5) + 3 = 28 and 2(5) + 18 = 28").
 */
export function checkLine(src, eq, x) {
  const xs = frText(x);
  const put = (side) => show(side.trim()
    .replace(/(\d|\))\s*x/g, `$1(${xs})`)
    .replace(/\bx\b/g, isNeg(x) || x.d !== 1 ? `(${xs})` : xs));
  const [l, r] = String(src).split('=');
  const lv = show(frText(valueAt(eq.left, x)));
  const rv = show(frText(valueAt(eq.right, x)));
  const rHasX = /x/.test(r);
  const lHasX = /x/.test(l);
  if (lHasX && rHasX) return `${put(l)} = ${lv} and ${put(r)} = ${rv}`;
  if (lHasX) return `${put(l)} = ${rv}`;
  return `${lv} = ${put(r)}`;
}

/**
 * The whole working: { rows: [{ eq, cells: { left, right }, move?, moveCells?, say? }],
 * written?, writtenSay?, x, check }. `move` on a row is the move that makes the next row.
 */
export function workingModel(spec) {
  const start = parseEquation(spec.eq);
  const v = start.v || 'x';
  const moves = (spec.moves || []).map(parseMove);
  const rows = [];
  let eq = start;
  moves.forEach((mv, i) => {
    rows.push({ eq, cells: { left: sideCells(eq.left, v), right: sideCells(eq.right, v) }, move: mv, moveText: moveText(mv), say: spec.say?.[i] || moveWords(mv) });
    eq = applyMove(eq, mv);
  });
  rows.push({ eq, cells: { left: sideCells(eq.left, v), right: sideCells(eq.right, v) } });
  const solved = isSolved(eq);
  const x = solved ? solutionOf(eq) : null;
  const src = spec.written || spec.eq;
  return {
    v,
    rows,
    solved,
    x,
    written: spec.written ? (() => { const at = spec.written.indexOf('='); return { left: show(spec.written.slice(0, at).trim()), right: show(spec.written.slice(at + 1).trim()) }; })() : null,
    writtenSay: spec.writtenSay || (spec.written ? 'tidy each side' : ''),
    check: solved ? checkLine(src, start, x) : '',
    answer: solved ? `${v} = ${show(frText(x))}` : '',
  };
}

/**
 * An expression's terms sorted into x terms and numbers, for the coloured grouping:
 * '5x + 7 + 2x - 3' → { terms: [{ text: '5x', kind: 'x' }, { text: '+ 7', kind: 'n' }, …],
 * xSum: '5x + 2x = 7x', nSum: '7 − 3 = 4', tidy: '7x + 4' }.
 */
export function groupModel(expr) {
  const toks = String(expr).replace(/\s+/g, '').match(/[+-]?(\d*x|\d+)/g) || [];
  if (toks.join('') !== String(expr).replace(/\s+/g, '').replace(/^\+/, '')) throw new Error(`"${expr}" is not a sum of x terms and numbers`);
  const terms = toks.map((t, i) => {
    const sign = t.startsWith('-') ? -1 : 1;
    const body = t.replace(/^[+-]/, '');
    const kind = body.endsWith('x') ? 'x' : 'n';
    const value = kind === 'x' ? (body === 'x' ? 1 : Number(body.slice(0, -1))) : Number(body);
    const text = i === 0 ? `${sign < 0 ? MINUS : ''}${body}` : `${sign < 0 ? MINUS : '+'} ${body}`;
    return { text, kind, value: sign * value, body };
  });
  const sum = (kind) => terms.filter((t) => t.kind === kind);
  const line = (list, kind) => {
    if (!list.length) return '';
    const parts = list.map((t, i) => (i === 0 ? `${t.value < 0 ? MINUS : ''}${t.body}` : `${t.value < 0 ? MINUS : '+'} ${t.body}`)).join(' ');
    const total = list.reduce((s, t) => s + t.value, 0);
    const totalText = kind === 'x' ? (total === 1 ? 'x' : total === -1 ? `${MINUS}x` : `${show(String(total))}x`) : show(String(total));
    return `${parts} = ${totalText}`;
  };
  const xs = sum('x');
  const ns = sum('n');
  const xt = xs.reduce((s, t) => s + t.value, 0);
  const nt = ns.reduce((s, t) => s + t.value, 0);
  const tidyX = xt === 0 ? '' : xt === 1 ? 'x' : xt === -1 ? `${MINUS}x` : `${show(String(xt))}x`;
  const tidy = tidyX ? (nt === 0 ? tidyX : `${tidyX} ${nt < 0 ? MINUS : '+'} ${Math.abs(nt)}`) : show(String(nt));
  return { terms, xSum: line(xs, 'x'), nSum: line(ns, 'n'), tidy };
}

/** Problems with one `work` spec, as strings (the notes validator runs it). */
export function checkWorking(spec) {
  const out = [];
  if (!spec?.eq) return ['work needs eq'];
  let m;
  try { m = workingModel(spec); } catch (e) { return [`work: ${e.message}`]; }
  if (!m.solved) out.push(`work "${spec.eq}": the moves do not end with x on its own`);
  if (spec.say && spec.say.length > (spec.moves || []).length) out.push('work: more words in say than moves');
  if (spec.written) {
    try {
      const a = parseEquation(spec.written);
      const b = parseEquation(spec.eq);
      const same = [0, 1, 2].every((t) => {
        const x = fr(t);
        return toNumber(valueAt(a.left, x)) - toNumber(valueAt(a.right, x)) === toNumber(valueAt(b.left, x)) - toNumber(valueAt(b.right, x));
      });
      if (!same) out.push(`work: written "${spec.written}" is not the same equation as "${spec.eq}"`);
    } catch (e) { out.push(`work written: ${e.message}`); }
  }
  return out;
}
