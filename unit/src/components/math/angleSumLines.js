// The working of Find It, Say Why (utils/angleSum.js) as coloured parts for
// AngleKit.jsx's Eq and Notebook: the lines of the step in hand, written as
// each stage is done, and the book's line for a finished step. The picture's
// colours: a printed angle teal ('g'), a letter found earlier green ('f'),
// the letter orange ('L'), totals and sums plain ('n').
import { FACTS, cap } from '../../utils/angleSum';

const op = (v) => ({ t: 'op', v });
const txt = (v) => ({ t: 'txt', v: String(v) });
const num = (v) => ({ t: 'n', v });
export const knownPart = (k) => ({ t: k.found ? 'f' : 'g', v: k.value });
const plus = (xs) => xs.flatMap((x, i) => (i ? [op('+'), x] : [x]));
const bracket = (xs) => xs.map((x, i) => ({ ...x, ...(i === 0 ? { pre: `${x.pre || ''}(` } : {}), ...(i === xs.length - 1 ? { post: `${x.post || ''})` } : {}) }));
/** The step's letters, "p = r" when two corners share one. */
export const lettersParts = (s, t = 'L') => s.letters.flatMap((l, i) => (i ? [op('='), { t, v: l }] : [{ t, v: l }]));

/** The book's line for a finished step: "b = 180° − (44° + 57°) = 180° − 101° = 79°". */
export function bookParts(s) {
  const ks = s.knowns.map(knownPart);
  if (s.fact === 'straight') return [...plus(ks), op('='), num(s.sum)];
  const lhs = lettersParts(s);
  const ans = { t: 'f', v: s.answer };
  if (s.fact === 'opp') return [...lhs, op('='), ans];
  const T = num(s.total);
  if (s.share > 1) {
    const r = !ks.length ? [T] : bracket([T, op('−'), ks.length === 1 ? ks[0] : num(s.sum)]);
    return [...lhs, op('='), ...r, op('÷'), txt(s.share), op('='), num(s.rest), op('÷'), txt(s.share), op('='), ans];
  }
  if (ks.length === 1) return [...lhs, op('='), T, op('−'), ks[0], op('='), ans];
  return [...lhs, op('='), T, op('−'), ...bracket(plus(ks)), op('='), T, op('−'), num(s.sum), op('='), ans];
}

/** The sentence under a finished step: the reason, or (is it straight?) the verdict. */
export function bookWords(s, reasonLine) {
  if (s.fact === 'straight') return { say: reasonLine(s) };
  return { because: FACTS[s.fact] };
}

/** The lines of the step in hand, one per stage done so far. */
export function liveLines(s, done) {
  const out = [];
  const L = lettersParts(s);
  const mark = (k) => (done[k]?.mark === 'shown' ? 'helped' : null);
  if (done.decide) out.push({ key: 'decide', kind: s.fact, say: { en: `${cap(FACTS[s.fact].en)}.`, fr: `${cap(FACTS[s.fact].fr)}.` }, tag: mark('decide') });
  if (done.add) out.push({ key: 'add', parts: [...plus(s.knowns.map(knownPart)), op('='), num(s.sum)], tag: mark('add') });
  if (done.total) out.push({ key: 'total', parts: [...plus(s.knowns.map(knownPart)), op('='), num(s.sum)], tag: mark('total') });
  if (done.subtract) {
    const sub = s.knowns.length === 1 ? knownPart(s.knowns[0]) : num(s.sum);
    out.push({
      key: 'subtract', tag: mark('subtract'),
      parts: s.share > 1 ? [num(s.total), op('−'), sub, op('='), num(s.rest)] : [...L, op('='), num(s.total), op('−'), sub, op('='), { t: 'f', v: s.answer }],
    });
  }
  if (done.share) out.push({ key: 'share', parts: [...L, op('='), num(s.rest), op('÷'), txt(s.share), op('='), { t: 'f', v: s.answer }], tag: mark('share') });
  if (done.calc) out.push({ key: 'calc', parts: [...L, op('='), { t: 'f', v: s.answer }], tag: mark('calc') });
  return out;
}
