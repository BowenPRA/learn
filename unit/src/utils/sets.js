// src/utils/sets.js
//
// Set notation and Venn diagrams — the pure parts. The Venn task
// (src/tasks/VennTask.jsx), the `venn` notes activity and the validator all
// read from here, so a shaded region, a count, a probability and a wrong-answer
// message can never disagree with one another.
//
// THE RULE THIS FILE FOLLOWS (the same one as modulus.js and cubic.js): a unit
// authors the QUESTION — the sets, the counts or the facts, the notation — and
// the answers are derived. Nothing here is an answer key.
//
// Vocabulary used throughout:
//   sets     the set letters in order, ['A', 'B'] or ['A', 'B', 'C']
//   region   one of the 2ⁿ pieces a Venn diagram is cut into, keyed by a string
//            of 0/1 flags in set order: with ['A', 'B'], '10' is "in A, not in
//            B" (A only), '11' is A ∩ B, '01' is B only and '00' is outside both
//   expr     set notation as authored, e.g. "(A ∪ B)'" or "A ∩ B'". ℰ is the
//            universal set and ∅ the empty set. LaTeX spellings (\cup, \cap,
//            \mathscr{E}, \varnothing) are accepted too.

// ------------------------------------------------------------------ regions

/** Every region key for `n` sets, in binary counting order. */
export function regionKeys(n) {
  const out = [];
  for (let m = 0; m < 1 << n; m += 1) {
    let key = '';
    for (let i = 0; i < n; i += 1) key += (m >> (n - 1 - i)) & 1 ? '1' : '0';
    out.push(key);
  }
  return out;
}

/**
 * The order regions are READ in — the order a student fills a two-set diagram
 * (left piece, middle, right piece, outside) and the order a count is summed in
 * the working, so "12 + 8 + 7" reads left to right across the picture.
 */
export function readingOrder(n) {
  if (n === 2) return ['10', '11', '01', '00'];
  if (n === 3) return ['100', '110', '010', '101', '111', '011', '001', '000'];
  return regionKeys(n);
}

/** Plain-English name of one region: "A only", "A and B only", "outside all three". */
export function regionWords(key, sets, labels = {}) {
  const name = (s) => labels[s] || s;
  const inside = sets.filter((_, i) => key[i] === '1').map(name);
  if (!inside.length) return sets.length === 2 ? 'outside both' : 'outside all three';
  if (inside.length === sets.length) return sets.length === 2 ? `${inside.join(' and ')}` : 'all three';
  if (inside.length === 1) return `${inside[0]} only`;
  return `${inside.join(' and ')} only`;
}

// ------------------------------------------------------------------ notation parser

/** Authored notation → the canonical Unicode spelling the parser reads. */
export function normaliseNotation(raw) {
  return String(raw ?? '')
    .replace(/\\mathscr\s*\{\s*E\s*\}/g, 'ℰ')
    .replace(/\\(?:varnothing|emptyset)/g, '∅')
    .replace(/\\cup/g, '∪')
    .replace(/\\cap/g, '∩')
    .replace(/\^\s*\{\s*\\prime\s*\}/g, "'")
    .replace(/\\prime/g, "'")
    .replace(/[′’]/g, "'")
    .replace(/ξ/g, 'ℰ')
    .replace(/\\left|\\right/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parse set notation into a small tree:
 *   { t: 'set', name } · { t: 'all' } · { t: 'none' } · { t: 'not', a } ·
 *   { t: 'op', op: '∪' | '∩', a, b }
 * ∪ and ∩ are read left to right. `mixed` is set when the two appear side by
 * side without brackets — "A ∪ B ∩ C" means different things to different
 * readers, so the validator refuses it rather than guess.
 */
export function parseSet(raw) {
  const src = normaliseNotation(raw);
  let pos = 0;
  let mixed = false;
  const skip = () => { while (src[pos] === ' ') pos += 1; };
  const peek = () => { skip(); return src[pos]; };

  const atom = () => {
    const c = peek();
    if (c === '(') {
      pos += 1;
      const inner = expr();
      if (peek() !== ')') throw new Error(`missing ) in "${src}"`);
      pos += 1;
      return inner;
    }
    if (c === 'ℰ') { pos += 1; return { t: 'all' }; }
    if (c === '∅') { pos += 1; return { t: 'none' }; }
    if (c && /[A-Z]/.test(c)) { pos += 1; return { t: 'set', name: c }; }
    throw new Error(`unexpected "${c ?? 'end'}" in "${src}"`);
  };
  const term = () => {
    let node = atom();
    while (peek() === "'") { pos += 1; node = { t: 'not', a: node }; }
    return node;
  };
  const expr = () => {
    let node = term();
    let seen = null;
    while (peek() === '∪' || peek() === '∩') {
      const op = src[pos];
      pos += 1;
      if (seen && seen !== op) mixed = true;
      seen = op;
      node = { t: 'op', op, a: node, b: term() };
    }
    return node;
  };

  const tree = expr();
  if (peek() !== undefined) throw new Error(`unexpected "${src[pos]}" in "${src}"`);
  tree.mixed = mixed;
  return tree;
}

/** The set letters a tree mentions. */
export function lettersOf(tree, acc = new Set()) {
  if (!tree) return acc;
  if (tree.t === 'set') acc.add(tree.name);
  if (tree.a) lettersOf(tree.a, acc);
  if (tree.b) lettersOf(tree.b, acc);
  return acc;
}

/** The regions a tree covers, as a Set of region keys. */
export function regionsOfTree(tree, sets) {
  const keys = regionKeys(sets.length);
  const inside = (node, key) => {
    switch (node.t) {
      case 'all': return true;
      case 'none': return false;
      case 'set': {
        const i = sets.indexOf(node.name);
        if (i === -1) throw new Error(`set ${node.name} is not one of ${sets.join(', ')}`);
        return key[i] === '1';
      }
      case 'not': return !inside(node.a, key);
      case 'op': return node.op === '∪' ? inside(node.a, key) || inside(node.b, key) : inside(node.a, key) && inside(node.b, key);
      default: throw new Error('bad node');
    }
  };
  return new Set(keys.filter((k) => inside(tree, k)));
}

/** The regions an authored expression covers, sorted in reading order. */
export function regionsOf(expr, sets) {
  const set = regionsOfTree(typeof expr === 'string' ? parseSet(expr) : expr, sets);
  return readingOrder(sets.length).filter((k) => set.has(k));
}

export const sameRegions = (a, b) => a.length === b.length && a.every((k) => b.includes(k));

// ------------------------------------------------------------------ printing

const needsBrackets = (node) => node.t === 'op';

/** Unicode print of a tree: "(A ∪ B)'", "A ∩ B'". `labels` renames letters. */
export function textOf(tree, labels = {}) {
  const go = (n) => {
    switch (n.t) {
      case 'all': return 'ℰ';
      case 'none': return '∅';
      case 'set': return labels[n.name] || n.name;
      case 'not': return needsBrackets(n.a) ? `(${go(n.a)})'` : `${go(n.a)}'`;
      case 'op': {
        // A chain of one operator needs no brackets: A ∩ B ∩ C.
        const side = (c) => (c.t === 'op' && c.op !== n.op ? `(${go(c)})` : go(c));
        return `${side(n.a)} ${n.op} ${side(n.b)}`;
      }
      default: return '?';
    }
  };
  return go(typeof tree === 'string' ? parseSet(tree) : tree);
}

/** KaTeX print of a tree. */
export function latexOf(tree, labels = {}) {
  const go = (n) => {
    switch (n.t) {
      case 'all': return '\\mathscr{E}';
      case 'none': return '\\varnothing';
      case 'set': return labels[n.name] || n.name;
      case 'not': return needsBrackets(n.a) ? `(${go(n.a)})'` : `${go(n.a)}'`;
      case 'op': {
        const side = (c) => (c.t === 'op' && c.op !== n.op ? `(${go(c)})` : go(c));
        return `${side(n.a)} ${n.op === '∪' ? '\\cup' : '\\cap'} ${side(n.b)}`;
      }
      default: return '?';
    }
  };
  return go(typeof tree === 'string' ? parseSet(tree) : tree);
}

/**
 * A two-set region set read back in words, when it has a name a student would
 * recognise — the feedback for a wrong shading ("you shaded the students in
 * NEITHER set"). Null when the shading has no short name.
 */
export function describeRegions(keys, sets, labels = {}) {
  const name = (s) => labels[s] || s;
  if (!keys.length) return 'nothing';
  const all = regionKeys(sets.length);
  if (keys.length === all.length) return 'everything — the whole of ℰ';
  if (sets.length !== 2) return keys.map((k) => regionWords(k, sets, labels)).join(', ');
  const [A, B] = sets.map(name);
  const has = (...ks) => ks.length === keys.length && ks.every((k) => keys.includes(k));
  if (has('10', '11')) return `all of ${A}`;
  if (has('01', '11')) return `all of ${B}`;
  if (has('11')) return `both ${A} and ${B} — the intersection`;
  if (has('10', '11', '01')) return `${A} or ${B} or both — the union`;
  if (has('00')) return `neither ${A} nor ${B}`;
  if (has('10')) return `${A} but not ${B}`;
  if (has('01')) return `${B} but not ${A}`;
  if (has('01', '00')) return `everything outside ${A} — ${A}'`;
  if (has('10', '00')) return `everything outside ${B} — ${B}'`;
  if (has('10', '01')) return `exactly one of ${A} and ${B}`;
  if (has('10', '01', '00')) return `everything except the middle — (${A} ∩ ${B})'`;
  return keys.map((k) => regionWords(k, sets, labels)).join(', ');
}

// ------------------------------------------------------------------ distractors

const clone = (n) => JSON.parse(JSON.stringify(n));

/**
 * Every tree one plausible slip away from `tree`, each tagged with how likely a
 * student is to make it (`rank`, lower first): reading (A ∪ B)' as A' ∪ B' is
 * the classic, swapping ∪ for ∩ next, then a complement added or dropped, then
 * the wrong letter.
 */
function mutations(tree, sets) {
  const out = [];
  const paths = [];
  const walk = (n, path) => { paths.push(path); if (n.a) walk(n.a, [...path, 'a']); if (n.b) walk(n.b, [...path, 'b']); };
  walk(tree, []);
  const at = (root, path) => path.reduce((n, k) => n[k], root);
  const replace = (root, path, node) => {
    if (!path.length) return node;
    const copy = clone(root);
    const parent = at(copy, path.slice(0, -1));
    parent[path[path.length - 1]] = node;
    return copy;
  };
  const push = (t, rank) => out.push({ tree: t, rank });
  // A chain of one operator, A ∪ B ∪ C, is one idea to a student: flatten it
  // so a slip swaps or complements the whole chain, not one link of it.
  const flatten = (n, op) => (n.t === 'op' && n.op === op ? [...flatten(n.a, op), ...flatten(n.b, op)] : [n]);
  const build = (op, list) => list.slice(1).reduce((acc, n) => ({ t: 'op', op, a: acc, b: n }), list[0]);
  const other = (op) => (op === '∪' ? '∩' : '∪');
  for (const path of paths) {
    const node = at(tree, path);
    const parent = path.length ? at(tree, path.slice(0, -1)) : null;
    const chainRoot = node.t === 'op' && !(parent?.t === 'op' && parent.op === node.op);
    if (node.t === 'not' && node.a.t === 'op') {
      push(replace(tree, path, build(node.a.op, flatten(node.a, node.a.op).map((n) => ({ t: 'not', a: clone(n) })))), 0);
    }
    if (chainRoot) push(replace(tree, path, build(other(node.op), flatten(node, node.op).map(clone))), 1);
    else if (node.t === 'op') push(replace(tree, path, { ...clone(node), op: other(node.op) }), 3);
    // Dropping a complement, or adding one to the whole thing, is a common slip;
    // a complement slipped onto one inner letter is a rarer one.
    if (node.t === 'not') push(replace(tree, path, clone(node.a)), 2);
    else push(replace(tree, path, { t: 'not', a: clone(node) }), path.length ? 3 : 2);
    if (node.t === 'set') for (const s of sets) if (s !== node.name) push(replace(tree, path, { t: 'set', name: s }), 3);
  }
  return out;
}

/** A tree nobody would write: A ∪ A, A'' — never offered as an option. */
function degenerate(tree) {
  if (!tree) return false;
  if (tree.t === 'not' && tree.a.t === 'not') return true;
  if (tree.t === 'op') {
    const chain = (n) => (n.t === 'op' && n.op === tree.op ? [...chain(n.a), ...chain(n.b)] : [textOf(n)]);
    const parts = chain(tree);
    if (new Set(parts).size < parts.length) return true;
  }
  return degenerate(tree.a) || degenerate(tree.b);
}

/** The shapes a two-set question is usually asked in — the everyday options. */
const CATALOGUE_2 = ['A', 'B', "A'", "B'", 'A ∩ B', 'A ∪ B', "(A ∪ B)'", "(A ∩ B)'", "A ∩ B'", "A' ∩ B"];

/** Tiny deterministic hash → [0, 1). */
function seeded(seed) {
  let h = 2166136261;
  for (const ch of String(seed)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return () => { h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
}

/**
 * Four notation options for "which notation matches the words?": the answer
 * and the three closest slips (swapped ∪/∩, a moved or missing complement, the
 * wrong De Morgan, the wrong letter), each covering a DIFFERENT region set so
 * no two options are secretly the same answer. Seeded, so a question shows the
 * same four in the same order every visit.
 */
export function notationOptions(expr, sets, seed = expr) {
  const tree = parseSet(expr);
  const target = regionsOf(tree, sets);
  const seen = [target.join(',')];
  const pool = [];
  const candidates = [];
  const consider = (t, rank) => {
    let regions;
    try { regions = regionsOf(t, sets); } catch { return; }
    if (!regions.length || degenerate(t)) return;
    const diff = regions.filter((k) => !target.includes(k)).length + target.filter((k) => !regions.includes(k)).length;
    candidates.push({ tree: t, regions, diff, rank });
  };
  mutations(tree, sets).forEach((m) => consider(m.tree, m.rank));
  // The everyday shapes, ranked with the complement slips: for a plain "B" the
  // real mistakes are "B only", "both" and "either", not B'.
  if (sets.length === 2) {
    const [A, B] = sets;
    for (const c of CATALOGUE_2) consider(parseSet(c.replace(/A/g, '#').replace(/B/g, B).replace(/#/g, A)), 2);
  }
  for (const s of sets) { consider({ t: 'set', name: s }, 4); consider({ t: 'not', a: { t: 'set', name: s } }, 4); }
  candidates.sort((p, q) => p.rank - q.rank || p.diff - q.diff || textOf(p.tree).localeCompare(textOf(q.tree)));
  for (const c of candidates) {
    const sig = c.regions.join(',');
    if (seen.includes(sig)) continue;
    seen.push(sig);
    pool.push(c);
  }
  const picks = [{ tree, regions: target, correct: true }, ...pool.slice(0, 3).map((p) => ({ ...p, correct: false }))];
  const rand = seeded(seed);
  for (let i = picks.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [picks[i], picks[j]] = [picks[j], picks[i]];
  }
  return picks.map((p) => ({ text: textOf(p.tree), latex: latexOf(p.tree), regions: p.regions, correct: p.correct }));
}

// ------------------------------------------------------------------ element rules

const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d += 1) if (n % d === 0) return false; return true; };

/** Whether `x` obeys a membership rule. */
export function obeys(rule, x) {
  switch (rule?.kind) {
    case 'multiple': return x % rule.of === 0;
    case 'factor': return rule.of % x === 0;
    case 'prime': return isPrime(x);
    case 'square': return Number.isInteger(Math.sqrt(x));
    case 'cube': return Number.isInteger(Math.round(Math.cbrt(x))) && Math.round(Math.cbrt(x)) ** 3 === x;
    case 'even': return x % 2 === 0;
    case 'odd': return Math.abs(x % 2) === 1;
    case 'range': return x >= rule.min && x <= rule.max;
    case 'list': return (rule.values || []).includes(x);
    default: throw new Error(`unknown rule "${rule?.kind}"`);
  }
}

/** A rule in words, for the question strip and the wrong-placement message. */
export function ruleWords(rule) {
  switch (rule?.kind) {
    case 'multiple': return `multiples of ${rule.of}`;
    case 'factor': return `factors of ${rule.of}`;
    case 'prime': return 'prime numbers';
    case 'square': return 'square numbers';
    case 'cube': return 'cube numbers';
    case 'even': return 'even numbers';
    case 'odd': return 'odd numbers';
    case 'range': return `numbers from ${rule.min} to ${rule.max}`;
    case 'list': return `{${(rule.values || []).join(', ')}}`;
    default: return '?';
  }
}

/** One element described against one rule: "7 is not a multiple of 3". */
export function membershipWords(rule, x) {
  const yes = obeys(rule, x);
  const not = yes ? '' : 'not ';
  switch (rule?.kind) {
    case 'multiple': return `${x} is ${not}a multiple of ${rule.of}`;
    case 'factor': return `${x} is ${not}a factor of ${rule.of}`;
    case 'prime': return `${x} is ${not}prime`;
    case 'square': return `${x} is ${not}a square number`;
    case 'cube': return `${x} is ${not}a cube number`;
    case 'even': return `${x} is ${yes ? 'even' : 'odd'}`;
    case 'odd': return `${x} is ${yes ? 'odd' : 'even'}`;
    case 'range': return `${x} is ${yes ? '' : 'not '}between ${rule.min} and ${rule.max}`;
    case 'list': return `${x} is ${not}in the list`;
    default: return `${x}`;
  }
}

/** The universe as a list: `{ from, to }` or an explicit array. */
export function universeOf(u) {
  if (Array.isArray(u)) return [...u];
  if (u && Number.isInteger(u.from) && Number.isInteger(u.to)) {
    return Array.from({ length: u.to - u.from + 1 }, (_, i) => u.from + i);
  }
  return [];
}

/** Which region an element belongs to, from the rules. */
export function regionOfElement(x, sets, rules) {
  return sets.map((s) => (obeys(rules[s], x) ? '1' : '0')).join('');
}

/** Elements grouped by region: { '10': [3, 9], '11': [6, 12], … }. */
export function elementsByRegion(sets, rules, universe) {
  const out = Object.fromEntries(regionKeys(sets.length).map((k) => [k, []]));
  for (const x of universeOf(universe)) out[regionOfElement(x, sets, rules)].push(x);
  return out;
}

// ------------------------------------------------------------------ fractions (exact)

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const frac = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return [n / g, d / g]; };
const fAdd = (x, y) => frac(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
const fSub = (x, y) => frac(x[0] * y[1] - y[0] * x[1], x[1] * y[1]);
const fMul = (x, y) => frac(x[0] * y[0], x[1] * y[1]);
const fDiv = (x, y) => frac(x[0] * y[1], x[1] * y[0]);

// ------------------------------------------------------------------ facts → counts

/**
 * Solve a "fill in the Venn diagram" question. Each fact `{ expr, n }` says the
 * regions of `expr` hold `n` things between them; with as many independent
 * facts as regions, the counts follow. Exact Gaussian elimination over
 * fractions, so a system that only looks solvable is caught.
 * Returns `{ counts, unique, whole }` — `whole` means every count is a
 * non-negative integer.
 */
export function solveFacts(sets, facts) {
  const keys = regionKeys(sets.length);
  const rows = facts.map((f) => {
    const cover = regionsOf(f.expr, sets);
    return [...keys.map((k) => (cover.includes(k) ? [1, 1] : [0, 1])), [f.n, 1]];
  });
  const m = keys.length;
  let r = 0;
  const pivotCol = [];
  for (let c = 0; c < m && r < rows.length; c += 1) {
    const p = rows.findIndex((row, i) => i >= r && row[c][0] !== 0);
    if (p === -1) continue;
    [rows[r], rows[p]] = [rows[p], rows[r]];
    const pv = rows[r][c];
    rows[r] = rows[r].map((v) => fDiv(v, pv));
    for (let i = 0; i < rows.length; i += 1) {
      if (i === r || rows[i][c][0] === 0) continue;
      const factor = rows[i][c];
      rows[i] = rows[i].map((v, j) => fSub(v, fMul(factor, rows[r][j])));
    }
    pivotCol.push(c);
    r += 1;
  }
  const consistent = rows.every((row) => row.slice(0, m).some((v) => v[0] !== 0) || row[m][0] === 0);
  const unique = consistent && pivotCol.length === m;
  const counts = {};
  if (unique) pivotCol.forEach((c, i) => { counts[keys[c]] = rows[i][m]; });
  const whole = unique && keys.every((k) => counts[k][1] === 1 && counts[k][0] >= 0);
  return {
    unique,
    whole,
    counts: unique ? Object.fromEntries(keys.map((k) => [k, counts[k][0] / counts[k][1]])) : null,
  };
}

/** A linear form c·x + k, printed: "22 − x", "x", "15". */
function formText([c, k]) {
  const cx = c[0] === 0 ? '' : c[0] === c[1] ? 'x' : c[0] === -c[1] ? '−x' : `${fracText(c)}x`;
  const kt = k[0] === 0 ? '' : fracText(k);
  if (!cx) return kt || '0';
  if (!kt) return cx;
  if (cx.startsWith('−')) return `${kt} − ${cx.slice(1)}`;
  return k[0] < 0 ? `${cx} − ${fracText([-k[0], k[1]])}` : `${kt} + ${cx}`;
}
const fracText = ([n, d]) => (d === 1 ? `${n}`.replace('-', '−') : `${n}/${d}`.replace('-', '−'));

/**
 * The order a teacher fills the diagram in, one region at a time, each with its
 * reason — the hint ladder for the fill stage and the "copy this" working.
 *
 * Peel first: any fact with exactly one region still unknown gives that region.
 * When nothing peels (the classic "30 like A, 25 like B, 5 like neither, 50
 * asked" — the middle is hidden), let the region inside the most sets be x,
 * keep peeling in terms of x, and finish with the one fact left over as an
 * equation in x. Returns `{ steps, ok }`; `ok` is false when even that fails.
 */
export function solvingSteps(sets, facts, labels = {}) {
  const keys = readingOrder(sets.length);
  const covers = facts.map((f) => regionsOf(f.expr, sets));
  const known = {};        // key → [coef of x, constant] as fractions
  const used = new Set();
  const steps = [];
  let xKey = null;
  const ZERO = [0, 1];
  const plus = (a, b) => [fAdd(a[0], b[0]), fAdd(a[1], b[1])];
  const minus = (a, b) => [fSub(a[0], b[0]), fSub(a[1], b[1])];
  // The full intersection is "the middle" — what a teacher calls it at the board.
  const name = (k) => (/^1+$/.test(k) ? `the middle (${sets.map((s) => labels[s] || s).join(' ∩ ')})` : regionWords(k, sets, labels));
  // A number stands bare in a subtraction; a form with x in it is bracketed.
  const term = (form) => (form[0][0] !== 0 && form[1][0] !== 0 ? `(${formText(form)})` : formText(form));

  for (let guard = 0; guard < 40 && Object.keys(known).length < keys.length; guard += 1) {
    const i = facts.findIndex((_, j) => !used.has(j) && covers[j].filter((k) => !known[k]).length === 1);
    if (i !== -1) {
      const region = covers[i].find((k) => !known[k]);
      const others = covers[i].filter((k) => k !== region);
      const sumOthers = others.reduce((acc, k) => plus(acc, known[k]), [ZERO, ZERO]);
      known[region] = minus([ZERO, [facts[i].n, 1]], sumOthers);
      used.add(i);
      const factText = `n(${textOf(parseSet(facts[i].expr), labels)}) = ${facts[i].n}`;
      steps.push({
        region,
        fact: i,
        form: known[region],
        say: (() => {
          if (!others.length) return `${factText} → ${name(region)} is ${formText(known[region])}`;
          const working = `${facts[i].n} − ${others.map((k) => term(known[k])).join(' − ')}`;
          const result = formText(known[region]);
          return `${factText} → ${name(region)} = ${working}${working === result ? '' : ` = ${result}`}`;
        })(),
      });
      continue;
    }
    if (xKey) break;
    // Nothing peels: the region inside the most sets becomes x.
    xKey = keys.filter((k) => !known[k]).sort((a, b) => [...b].filter((c) => c === '1').length - [...a].filter((c) => c === '1').length)[0];
    known[xKey] = [[1, 1], ZERO];
    steps.push({ region: xKey, isX: true, form: known[xKey], say: `Nothing gives ${name(xKey)} directly, so call it x.` });
  }

  if (Object.keys(known).length < keys.length) return { steps, ok: false };

  if (xKey) {
    const j = facts.findIndex((_, idx) => !used.has(idx));
    if (j === -1) return { steps, ok: false };
    const total = covers[j].reduce((acc, k) => plus(acc, known[k]), [ZERO, ZERO]);
    if (total[0][0] === 0) return { steps, ok: false };
    const x = fDiv(fSub([facts[j].n, 1], total[1]), total[0]);
    steps.push({
      equation: true,
      fact: j,
      say: `n(${textOf(parseSet(facts[j].expr), labels)}) = ${facts[j].n} → ${covers[j].map((k) => term(known[k])).join(' + ')} = ${facts[j].n}, so x = ${fracText(x)}`,
      x,
    });
    for (const k of keys) known[k] = [ZERO, fAdd(fMul(known[k][0], x), known[k][1])];
  }
  const values = Object.fromEntries(keys.map((k) => [k, known[k][1][0] / known[k][1][1]]));
  return { steps, ok: true, values };
}

// ------------------------------------------------------------------ statements

/**
 * A notation statement to judge true or false, derived from the diagram:
 *   "6 ∈ A ∩ B"   "7 ∉ B'"   "{2, 4} ⊂ B"   "n(A ∪ B) = 9"   "A ∩ C = ∅"
 * `lookup(key)` returns the elements in a region (elements units) and
 * `countOf(key)` the count. Returns `{ truth, latex, reason }`.
 */
export function judgeStatement(raw, sets, { elements = null, counts = null, labels = {} } = {}) {
  const s = normaliseNotation(raw);
  const members = (expr) => regionsOf(expr, sets).flatMap((k) => elements?.[k] || []);
  const count = (expr) => regionsOf(expr, sets).reduce((acc, k) => acc + (counts ? counts[k] || 0 : (elements?.[k] || []).length), 0);
  let m = /^(-?\d+)\s*(∈|∉)\s*(.+)$/.exec(s);
  if (m) {
    const x = Number(m[1]);
    const inIt = members(m[3]).includes(x);
    const truth = m[2] === '∈' ? inIt : !inIt;
    const setTex = latexOf(parseSet(m[3]), labels);
    return { truth, latex: `${x} ${m[2] === '∈' ? '\\in' : '\\notin'} ${setTex}`, reason: `${x} ${inIt ? 'is' : 'is not'} in ${textOf(parseSet(m[3]), labels)}` };
  }
  m = /^\{([\d,\s-]*)\}\s*(⊂|⊆|⊄)\s*(.+)$/.exec(s);
  if (m) {
    const xs = m[1].split(',').map((t) => t.trim()).filter(Boolean).map(Number);
    const inside = members(m[3]);
    const sub = xs.every((x) => inside.includes(x));
    const truth = m[2] === '⊄' ? !sub : sub;
    const miss = xs.filter((x) => !inside.includes(x));
    const op = m[2] === '⊄' ? '\\not\\subset' : m[2] === '⊆' ? '\\subseteq' : '\\subset';
    return {
      truth,
      latex: `\\{${xs.join(', ')}\\} ${op} ${latexOf(parseSet(m[3]), labels)}`,
      reason: sub ? `every element is in ${textOf(parseSet(m[3]), labels)}` : `${miss.join(' and ')} ${miss.length > 1 ? 'are' : 'is'} not in ${textOf(parseSet(m[3]), labels)}`,
    };
  }
  m = /^n\((.+)\)\s*=\s*(\d+)$/.exec(s);
  if (m) {
    const n = count(m[1]);
    return { truth: n === Number(m[2]), latex: `n(${latexOf(parseSet(m[1]), labels)}) = ${m[2]}`, reason: `n(${textOf(parseSet(m[1]), labels)}) is ${n}` };
  }
  m = /^(.+?)\s*=\s*∅$/.exec(s);
  if (m) {
    const n = count(m[1]);
    return { truth: n === 0, latex: `${latexOf(parseSet(m[1]), labels)} = \\varnothing`, reason: n === 0 ? `${textOf(parseSet(m[1]), labels)} has no elements` : `${textOf(parseSet(m[1]), labels)} has ${n} element${n === 1 ? '' : 's'}` };
  }
  throw new Error(`cannot read the statement "${raw}"`);
}

// ------------------------------------------------------------------ layout

/**
 * Venn geometry in one place, shared by the figure and the validator (so an
 * elements question that would overflow a region fails the build, not the
 * student). Coordinates are in the figure's own viewBox.
 */
export const VENN_GEOMETRY = {
  2: {
    w: 460, h: 290,
    rect: { x: 12, y: 12, w: 436, h: 266 },
    circles: [{ cx: 178, cy: 148, r: 100 }, { cx: 282, cy: 148, r: 100 }],
    labelAt: [{ x: 96, y: 58 }, { x: 364, y: 58 }],
    eAt: { x: 34, y: 44 },
  },
  3: {
    w: 460, h: 340,
    rect: { x: 12, y: 12, w: 436, h: 316 },
    circles: [{ cx: 185, cy: 128, r: 92 }, { cx: 275, cy: 128, r: 92 }, { cx: 230, cy: 210, r: 92 }],
    labelAt: [{ x: 94, y: 52 }, { x: 366, y: 52 }, { x: 348, y: 300 }],
    eAt: { x: 34, y: 44 },
  },
};

/** Which region a point is in, or null outside the rectangle. */
export function regionAt(n, x, y) {
  const g = VENN_GEOMETRY[n];
  const { rect } = g;
  if (x < rect.x || y < rect.y || x > rect.x + rect.w || y > rect.y + rect.h) return null;
  return g.circles.map((c) => ((x - c.cx) ** 2 + (y - c.cy) ** 2 <= c.r * c.r ? '1' : '0')).join('');
}

const layoutCache = {};

/**
 * For each region, its label anchor (the point deepest inside it) and a list of
 * slots for elements, nearest the anchor first. Computed once per set count by
 * sampling the figure.
 */
export function vennLayout(n) {
  if (layoutCache[n]) return layoutCache[n];
  const g = VENN_GEOMETRY[n];
  const { rect, circles } = g;
  const depth = (x, y) => Math.min(
    x - rect.x, rect.x + rect.w - x, y - rect.y, rect.y + rect.h - y,
    ...circles.map((c) => Math.abs(Math.hypot(x - c.cx, y - c.cy) - c.r)),
  );
  const best = {};
  const step = 3;
  for (let x = rect.x; x <= rect.x + rect.w; x += step) {
    for (let y = rect.y; y <= rect.y + rect.h; y += step) {
      const key = regionAt(n, x, y);
      if (!key) continue;
      // Keep the outside label off the set names and the ℰ in the corners.
      const nearLabel = [...g.labelAt, g.eAt].some((l) => Math.hypot(x - l.x, y - l.y) < 40);
      const d = depth(x, y) - (nearLabel ? 100 : 0);
      if (!best[key] || d > best[key].d) best[key] = { x, y, d };
    }
  }
  const SPACE_X = 30;
  const SPACE_Y = 26;
  const out = {};
  for (const key of regionKeys(n)) {
    const anchor = best[key];
    const slots = [];
    for (let x = rect.x + 16; x <= rect.x + rect.w - 16; x += SPACE_X) {
      for (let yi = 0, y = rect.y + 16; y <= rect.y + rect.h - 12; yi += 1, y += SPACE_Y) {
        const sx = x + (yi % 2 ? SPACE_X / 2 : 0);
        if (regionAt(n, sx, y) !== key) continue;
        if (depth(sx, y) < 12) continue;
        if ([...g.labelAt, g.eAt].some((l) => Math.hypot(sx - l.x, y - l.y) < 28)) continue;
        slots.push({ x: sx, y });
      }
    }
    slots.sort((p, q) => Math.hypot(p.x - anchor.x, p.y - anchor.y) - Math.hypot(q.x - anchor.x, q.y - anchor.y));
    out[key] = { anchor: { x: anchor.x, y: anchor.y }, slots };
  }
  layoutCache[n] = out;
  return out;
}

// ------------------------------------------------------------------ task items

const ASKS = ['n', 'p', 'shade', 'list', 'more', 'truth'];

/** The region counts an item's diagram holds, however the item gives them. */
export function countsOfItem(item) {
  const sets = item.sets || ['A', 'B'];
  if (item.kind === 'counts') return Object.fromEntries(regionKeys(sets.length).map((k) => [k, item.counts?.[k] ?? 0]));
  if (item.kind === 'facts') return solveFacts(sets, item.facts || []).counts;
  if (item.kind === 'elements') {
    const by = elementsByRegion(sets, item.rules || {}, item.universe);
    return Object.fromEntries(Object.entries(by).map(([k, xs]) => [k, xs.length]));
  }
  return null;
}

/** Problems with the Venn task's items, as strings. Empty when all are sound. */
export function checkVennItems(items) {
  const out = [];
  const ids = new Set();
  for (const [idx, item] of (items || []).entries()) {
    const at = `item ${item?.id || idx + 1}`;
    if (!item?.id) out.push(`${at}: needs an id`);
    if (ids.has(item?.id)) out.push(`${at}: duplicate id`);
    ids.add(item?.id);
    const sets = item.sets || ['A', 'B'];
    if (![2, 3].includes(sets.length) || !sets.every((s) => /^[A-DF-Z]$/.test(s))) {
      out.push(`${at}: sets must be two or three single capital letters (not E, which is the universal set)`);
      continue;
    }
    if (!['counts', 'facts', 'elements'].includes(item.kind)) { out.push(`${at}: kind must be counts, facts or elements`); continue; }
    if (!item.prompt) out.push(`${at}: needs a prompt (the stem the student reads)`);

    const readExpr = (expr, where) => {
      try {
        const tree = parseSet(expr);
        if (tree.mixed) out.push(`${at} ${where}: "${expr}" mixes ∪ and ∩ without brackets`);
        for (const l of lettersOf(tree)) if (!sets.includes(l)) out.push(`${at} ${where}: "${expr}" uses ${l}, which is not one of ${sets.join(', ')}`);
        return regionsOf(tree, sets);
      } catch (e) {
        out.push(`${at} ${where}: ${e.message}`);
        return null;
      }
    };

    let counts = null;
    let elements = null;
    if (item.kind === 'counts') {
      for (const k of regionKeys(sets.length)) {
        const v = item.counts?.[k];
        if (!Number.isInteger(v) || v < 0) out.push(`${at}: counts["${k}"] must be a whole number ≥ 0`);
      }
      counts = countsOfItem(item);
    }
    if (item.kind === 'facts') {
      const facts = item.facts || [];
      facts.forEach((f, i) => { readExpr(f.expr, `fact ${i + 1}`); if (!Number.isInteger(f.n) || f.n < 0) out.push(`${at} fact ${i + 1}: n must be a whole number`); if (!f.say) out.push(`${at} fact ${i + 1}: needs say (the fact in words)`); });
      const solved = solveFacts(sets, facts);
      if (!solved.unique) out.push(`${at}: the facts do not fix every region (need ${regionKeys(sets.length).length} independent facts)`);
      else if (!solved.whole) out.push(`${at}: the facts give a region that is negative or not a whole number`);
      else {
        const steps = solvingSteps(sets, facts, item.labels);
        if (!steps.ok) out.push(`${at}: the facts are solvable but not by peeling with at most one unknown x — reword them`);
        counts = solved.counts;
      }
    }
    if (item.kind === 'elements') {
      const universe = universeOf(item.universe);
      if (!universe.length) out.push(`${at}: needs universe { from, to } or a list`);
      if (universe.length > 20) out.push(`${at}: a universe of ${universe.length} is too many chips — keep it to 20`);
      for (const s of sets) {
        try { universe.forEach((x) => obeys(item.rules?.[s], x)); } catch (e) { out.push(`${at}: rule for ${s}: ${e.message}`); }
      }
      if (!out.some((p) => p.startsWith(`${at}: rule`))) {
        elements = elementsByRegion(sets, item.rules, item.universe);
        const layout = vennLayout(sets.length);
        for (const [k, xs] of Object.entries(elements)) {
          if (xs.length > layout[k].slots.length) out.push(`${at}: region ${k} holds ${xs.length} elements but has room for ${layout[k].slots.length}`);
        }
        counts = countsOfItem(item);
      }
    }

    const qs = item.questions || [];
    if (!qs.length && item.kind === 'counts') out.push(`${at}: a counts item needs at least one question`);
    const qids = new Set();
    for (const q of qs) {
      const qat = `${at} question ${q?.id || '?'}`;
      if (!q?.id) out.push(`${qat}: needs an id`);
      if (qids.has(q?.id)) out.push(`${qat}: duplicate id`);
      qids.add(q?.id);
      if (!ASKS.includes(q.ask)) { out.push(`${qat}: ask must be one of ${ASKS.join('/')}`); continue; }
      if (!q.prompt) out.push(`${qat}: needs a prompt`);
      if (['n', 'p', 'shade', 'list'].includes(q.ask)) {
        const regions = readExpr(q.expr, `question ${q.id}`);
        if (regions && q.ask === 'list' && !elements) out.push(`${qat}: ask "list" needs an elements item`);
        if (regions && q.ask === 'p' && counts) {
          const total = Object.values(counts).reduce((a, b) => a + b, 0);
          if (!total) out.push(`${qat}: n(ℰ) is 0, so there is no probability`);
        }
        if (q.translate && regions) {
          const opts = notationOptions(q.expr, sets, `${item.id}.${q.id}`);
          if (opts.length < 4) out.push(`${qat}: only ${opts.length} distinct notation options could be made`);
        }
      }
      if (q.ask === 'more') {
        if (!Array.isArray(q.exprs) || q.exprs.length !== 2) out.push(`${qat}: ask "more" needs exprs: [bigger, smaller]`);
        else {
          const rs = q.exprs.map((e) => readExpr(e, `question ${q.id}`));
          if (rs.every(Boolean) && counts) {
            const [a, b] = rs.map((r) => r.reduce((acc, k) => acc + counts[k], 0));
            if (a < b) out.push(`${qat}: n(${q.exprs[0]}) is smaller than n(${q.exprs[1]}) — list the bigger first`);
          }
        }
      }
      if (q.ask === 'truth') {
        if (!Array.isArray(q.statements) || q.statements.length < 2) out.push(`${qat}: ask "truth" needs at least two statements`);
        else for (const st of q.statements) {
          try { judgeStatement(st, sets, { elements, counts: elements ? null : counts, labels: item.labels }); } catch (e) { out.push(`${qat}: ${e.message}`); }
        }
      }
    }
  }
  return out;
}
