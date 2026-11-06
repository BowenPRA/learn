// src/utils/chemFormula.js
//
// The derivation behind the SYMBOL_EQ task (Symbol Equations). A chemical
// formula is parsed into a map of element → atom count, so the task can DERIVE
// whether a student's equation balances instead of comparing against a stored
// answer key — the same derive-don't-store rule the Number Gym, Graph It and
// Vectors tasks follow (an author cannot ship a wrong key).
//
// Supports element symbols ([A-Z][a-z]?), subscripts, and nested parentheses:
//   parseFormula('CuSO4')    -> { Cu: 1, S: 1, O: 4 }
//   parseFormula('Cu(OH)2')  -> { Cu: 1, O: 2, H: 2 }
//   parseFormula('Al2(SO4)3')-> { Al: 2, S: 3, O: 12 }
//
// Nothing here is chemistry-aware beyond counting atoms: it does not know which
// formulae are "real". Validity of a species is decided by the authored item's
// candidate bank, and correctness by atom-count balance across the arrow.

/** Merge `src` counts into `dst` (mutating `dst`), scaled by `factor`. */
function addInto(dst, src, factor = 1) {
  for (const el in src) dst[el] = (dst[el] || 0) + src[el] * factor;
  return dst;
}

/**
 * Parse a formula string into an element→count map.
 * Throws on a malformed formula (unbalanced brackets, leading number, junk).
 */
export function parseFormula(formula) {
  const s = String(formula || '').replace(/\s+/g, '');
  if (!s) throw new Error('empty formula');

  let i = 0;
  // A stack of partial count-maps, one per open parenthesis depth.
  const stack = [{}];

  const readInt = () => {
    let n = '';
    while (i < s.length && s[i] >= '0' && s[i] <= '9') n += s[i++];
    return n === '' ? 1 : parseInt(n, 10);
  };

  while (i < s.length) {
    const ch = s[i];
    if (ch === '(') {
      stack.push({});
      i++;
    } else if (ch === ')') {
      i++;
      const mult = readInt();
      const group = stack.pop();
      if (!stack.length) throw new Error(`unbalanced ")" in ${formula}`);
      addInto(stack[stack.length - 1], group, mult);
    } else if (ch >= 'A' && ch <= 'Z') {
      let el = ch;
      i++;
      if (i < s.length && s[i] >= 'a' && s[i] <= 'z') el += s[i++];
      const count = readInt();
      addInto(stack[stack.length - 1], { [el]: count });
    } else {
      throw new Error(`unexpected "${ch}" in ${formula}`);
    }
  }
  if (stack.length !== 1) throw new Error(`unclosed "(" in ${formula}`);
  return stack[0];
}

/** True if a formula parses cleanly into at least one atom. */
export function formulaValid(formula) {
  try {
    const m = parseFormula(formula);
    return Object.keys(m).length > 0 && Object.values(m).every((n) => n > 0);
  } catch {
    return false;
  }
}

/**
 * Total element counts for one side of an equation.
 * `species` is [{ formula, coeff }] — coeff defaults to 1.
 */
export function sideCounts(species) {
  const total = {};
  for (const { formula, coeff } of species || []) {
    // No coefficient written means one of it (as the doc above says) — not none.
    addInto(total, parseFormula(formula), coeff === undefined || coeff === null ? 1 : Number(coeff) || 0);
  }
  return total;
}

/** Deep-equal two element→count maps (missing key == 0). */
export function sameCounts(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) if ((a[k] || 0) !== (b[k] || 0)) return false;
  return true;
}

/**
 * Does an equation balance? Returns { balanced, left, right, offenders } where
 * `offenders` lists the elements whose counts differ, so the task can point at
 * the exact atom that is short or in excess.
 */
export function balanceReport(reactants, products) {
  const left = sideCounts(reactants);
  const right = sideCounts(products);
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
  const offenders = [];
  for (const k of keys) if ((left[k] || 0) !== (right[k] || 0)) offenders.push(k);
  return { balanced: offenders.length === 0, left, right, offenders };
}

export function isBalanced(reactants, products) {
  return balanceReport(reactants, products).balanced;
}

/**
 * Validate one authored SYMBOL_EQ item: every target formula must parse, every
 * target formula (reactants + products) must appear in the item's `bank`, and
 * the target equation must balance. Returns a list of problem strings (empty =
 * OK) so `npm run validate` / a Node self-check can gate bad content.
 */
export function checkItem(item) {
  const problems = [];
  const species = [...(item.reactants || []), ...(item.products || [])];
  if (!species.length) problems.push(`${item.id}: no reactants/products`);
  const bank = new Set(item.bank || []);
  for (const sp of species) {
    if (!formulaValid(sp.formula)) problems.push(`${item.id}: invalid formula "${sp.formula}"`);
    if (!bank.has(sp.formula)) problems.push(`${item.id}: target formula "${sp.formula}" not in bank`);
    if (!(Number(sp.coeff) >= 1)) problems.push(`${item.id}: coeff for "${sp.formula}" must be ≥ 1`);
  }
  for (const f of item.bank || []) {
    if (!formulaValid(f)) problems.push(`${item.id}: bank has invalid formula "${f}"`);
  }
  if (!isBalanced(item.reactants, item.products)) {
    const { offenders } = balanceReport(item.reactants, item.products);
    problems.push(`${item.id}: target equation does not balance (${offenders.join(', ')})`);
  }
  return problems;
}
