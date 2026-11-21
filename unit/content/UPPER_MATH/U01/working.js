// Upper Secondary Maths · Unit 1 · Show your working, played by the step engine
// (unit/src/stepPractice). Ten equations solved one written line at a time, the way
// they go in the notebook: multiply out, collect, move the x term, undo + or −, undo
// × or ÷. Each line is typed; the line it writes builds the working down the page.
//
// Every problem is built from its numbers below, so every answer and every slip is
// worked out, not typed. Levels (the step engine's): focus f1–f4 (every line), practice
// p1–p4 (the tidy line, if any, and the answer; a wrong answer opens the lines), challenge
// c1–c2 (the answer only; a wrong answer opens the line it came from).
// English only. Check: checkStepPractice(set) from unit/src/stepPractice/check.js.

const sg = (n) => (n < 0 ? `- ${-n}` : `+ ${n}`); // "+ 5", "- 7" inside maths
const num = (before, answer) => ({ type: 'number', before, answer: String(answer), signed: true });

/** `left ± b = c` → `left = c − b`: undo the + or −. */
function undoAdd(left, b, c) {
  const r = c - b;
  const wrongWay = c + b;
  return {
    title: b > 0 ? `Undo the + ${b}` : `Undo the − ${-b}`,
    sub: b > 0 ? `Subtract ${b} from both sides.` : `Add ${-b} to both sides.`,
    input: num(`$${left} =$`, r),
    line: `$${left} = ${r}$`,
    hint: b > 0 ? `${c} − ${b} = ?` : `${c} + ${-b} = ?`,
    slips: [
      ...(wrongWay !== r ? [{ value: String(wrongWay), key: 'wrong-way', msg: b > 0 ? `That adds ${b}. To undo + ${b}, subtract ${b}.` : `That subtracts ${-b}. To undo − ${-b}, add ${-b}.` }] : []),
      ...(r < 0 && -r !== wrongWay ? [{ value: String(-r), key: 'sign', msg: `Check the sign: ${c} − ${b} is less than zero.` }] : []),
    ],
  };
}

/**
 * `a·x = r` → `x = r ÷ a`: undo the ×. `check` is the line that proves it; `before` is
 * the step number of the line `a·x = r`, which a wrong answer from not dividing opens.
 * `extra` are slips from an earlier line; only whole-number ones are kept (nobody types
 * 3.6666…).
 */
function undoTimes(a, r, check, before, extra = []) {
  const x = r / a;
  const slips = [];
  const add = (sl) => { if (sl.value !== String(x) && !slips.some((s) => s.value === sl.value)) slips.push(sl); };
  add({ value: String(r - a), key: 'subtracted', msg: `You took ${a} away. ${a}x means ${a} × x, so divide by ${a}.` });
  add({ value: String(r * a), key: 'multiplied', msg: `You multiplied. Divide both sides by ${a}.` });
  if (x !== 0) add({ value: String(-x), key: 'sign', msg: `Check the sign of ${r} ÷ ${a}.` });
  add({ value: String(r), key: 'not-divided', step: before, msg: `${r} is ${a}x, not x. Divide by ${a}.` });
  for (const e of extra) if (Number.isInteger(Number(e.value))) add(e);
  return {
    title: `Undo the × ${a}`,
    sub: `Divide both sides by ${a}.`,
    input: num('$x =$', x),
    line: `$x = ${x}$`,
    hint: `${r} ÷ ${a} = ?`,
    why: `Check: ${check}`,
    slips,
  };
}

const p = (n) => (n < 0 ? `(${n})` : `${n}`); // a negative number in brackets after ×

/** `a(x ± b) = rhs` → `ax ± ab = rhs`: multiply out the bracket. */
function expand(a, b, rhs) {
  const ab = Math.abs(a * b);
  return {
    title: 'Multiply out the bracket',
    sub: `${a} times every term inside.`,
    input: num(`$${a}(x ${sg(b)}) = ${a}x ${b < 0 ? '-' : '+'}$`, ab),
    line: `$${a}x ${sg(a * b)} = ${rhs}$`,
    hint: `${a} × x, and ${a} × ${Math.abs(b)}.`,
    slips: [
      { value: String(Math.abs(b)), key: 'first-term-only', msg: `Multiply the ${Math.abs(b)} by ${a} too: every term in the bracket.` },
      ...(a + Math.abs(b) !== ab ? [{ value: String(a + Math.abs(b)), key: 'added', msg: `Multiply, do not add: ${a} × ${Math.abs(b)}.` }] : []),
    ],
  };
}

/** `px + qx ± c = rhs` → `(p+q)x ± c = rhs`: collect the like terms. */
function collect(p, q, c, rhs) {
  return {
    title: 'Collect the like terms',
    sub: `${p}x and ${q}x are like terms.`,
    input: { type: 'gap', text: `___ $x ${sg(c)} = ${rhs}$`, answers: [String(p + q)] },
    line: `$${p + q}x ${sg(c)} = ${rhs}$`,
    hint: `${p}x + ${q}x: add the numbers in front of x.`,
    slips: p * q !== p + q ? [{ value: [String(p * q)], key: 'multiplied', msg: `Add them: ${p} + ${q}. Like terms are added, not multiplied.` }] : [],
  };
}

/** `ax ± b = cx ± d` (a > c) → `(a−c)x ± b = d`: take the smaller x term from both sides. */
function moveX(a, b, c, d) {
  return {
    title: `Take ${c}x from both sides`,
    sub: 'Take away the smaller x term.',
    input: { type: 'gap', text: `___ $x ${sg(b)} = ${d}$`, answers: [String(a - c)] },
    line: `$${a - c}x ${sg(b)} = ${d}$`,
    hint: `${a}x − ${c}x = ?`,
    slips: [{ value: [String(a + c)], key: 'added-x', msg: `That adds ${c}x. Take it away: ${a}x − ${c}x.` }],
  };
}

const solve = (eq) => `Solve $${eq}$. Write every line.`;

/** a·x ± b = c */
function two(id, level, a, b, c) {
  const x = (c - b) / a;
  return {
    id, level,
    prompt: solve(`${a}x ${sg(b)} = ${c}`),
    steps: [
      undoAdd(`${a}x`, b, c),
      undoTimes(a, c - b, `$${a} \\times ${p(x)} ${sg(b)} = ${c}$ ✓`, 1, [
        { value: String((c + b) / a), key: 'wrong-way', step: 1, msg: `Look at the first line: to undo ${b > 0 ? `+ ${b}` : `− ${-b}`}, do the opposite.` },
      ]),
    ],
  };
}

/** a(x ± b) = rhs */
function bracket(id, level, a, b, rhs, keyTidy = false) {
  const r = rhs - a * b;
  const x = r / a;
  return {
    id, level,
    prompt: solve(`${a}(x ${sg(b)}) = ${rhs}`),
    steps: [
      { ...expand(a, b, rhs), key: keyTidy },
      undoAdd(`${a}x`, a * b, rhs),
      undoTimes(a, r, `$${a}(${x} ${sg(b)}) = ${a} \\times ${p(x + b)} = ${rhs}$ ✓`, 2, [
        { value: String((rhs - b) / a), key: 'first-term-only', step: 1, msg: 'Multiply out the bracket first: the number outside multiplies every term.' },
      ]),
    ],
  };
}

/** ax ± b = cx ± d */
function both(id, level, a, b, c, d, keyTidy = false) {
  const r = d - b;
  const x = r / (a - c);
  return {
    id, level,
    prompt: solve(`${a}x ${sg(b)} = ${c}x ${sg(d)}`),
    steps: [
      { ...moveX(a, b, c, d), key: keyTidy },
      undoAdd(`${a - c}x`, b, d),
      undoTimes(a - c, r, `$${a} \\times ${p(x)} ${sg(b)} = ${a * x + b}$ and $${c} \\times ${p(x)} ${sg(d)} = ${c * x + d}$ ✓`, 2, [
        { value: String(r / (a + c)), key: 'added-x', step: 1, msg: `Take the ${c}x away from both sides: ${a}x − ${c}x.` },
      ]),
    ],
  };
}

/** px + qx ± c = rhs */
function like(id, level, m, n, c, rhs) {
  const r = rhs - c;
  const x = r / (m + n);
  return {
    id, level,
    prompt: solve(`${m}x + ${n}x ${sg(c)} = ${rhs}`),
    steps: [
      collect(m, n, c, rhs),
      undoAdd(`${m + n}x`, c, rhs),
      undoTimes(m + n, r, `$${m} \\times ${p(x)} + ${n} \\times ${p(x)} ${sg(c)} = ${rhs}$ ✓`, 2, [
        { value: String(r / (m * n)), key: 'multiplied-like', step: 1, msg: `Collect the like terms first: ${m}x + ${n}x.` },
      ]),
    ],
  };
}

/** a(x ± b) = cx ± d: a bracket, then x on both sides. */
function bracketBoth(id, level, a, b, c, d) {
  const ab = a * b;
  const r = d - ab;
  const x = r / (a - c);
  const ex = expand(a, b, `${c}x ${sg(d)}`);
  return {
    id, level,
    prompt: solve(`${a}(x ${sg(b)}) = ${c}x ${sg(d)}`),
    steps: [
      ex,
      moveX(a, ab, c, d),
      undoAdd(`${a - c}x`, ab, d),
      undoTimes(a - c, r, `$${a}(${x} ${sg(b)}) = ${a * (x + b)}$ and $${c} \\times ${p(x)} ${sg(d)} = ${c * x + d}$ ✓`, 3, [
        { value: String((d - b) / (a - c)), key: 'first-term-only', step: 1, msg: 'Multiply out the bracket first: the number outside multiplies every term.' },
      ]),
    ],
  };
}

// A slip's key is reported to the teacher ("s2.wrong-way"); keys must differ inside an
// item, so each is prefixed with its step's number.
const keyed = (item) => ({
  ...item,
  steps: item.steps.map((s, i) => ({ ...s, slips: (s.slips || []).map((sl) => ({ ...sl, key: `s${i + 1}.${sl.key}` })) })),
});

const items = [
  two('f1', 'focus', 2, 5, 21),
  two('f2', 'focus', 6, -7, 29),
  bracket('f3', 'focus', 4, 3, 32),
  both('f4', 'focus', 7, 2, 3, 26),
  two('p1', 'practice', 5, 8, 43),
  bracket('p2', 'practice', 3, -4, 15, true),
  two('p3', 'practice', 4, 21, 9),
  both('p4', 'practice', 8, -5, 3, 40, true),
  like('c1', 'challenge', 3, 4, -6, 22),
  bracketBoth('c2', 'challenge', 5, 2, 2, 4),
].map(keyed);

export default {
  title: 'Show your working',
  items,
};
