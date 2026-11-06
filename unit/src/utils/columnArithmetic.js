// src/utils/columnArithmetic.js
//
// The derivation behind the Number Gym drill (src/tasks/NumberDrill.jsx). Given
// only the operands, it produces every intermediate cell of the written column
// algorithm — each partial product, every carry, the final sum — so the task
// never stores an authored answer key and the validator can check an item is
// answerable using the same code the task grades with. Pure and framework-free
// on purpose, exactly like utils/vectors.js and utils/parabola.js.

/** Digits of n, units first: 472 -> [2, 7, 4]. */
export const digitsUnitsFirst = (n) => String(Math.abs(n)).split('').reverse().map(Number);

/** The digit of n in column c (0 = units), or null if n has no digit there. */
export const digitAt = (n, c) => {
  const s = String(Math.abs(n));
  const i = s.length - 1 - c;
  return i >= 0 ? Number(s[i]) : null;
};

/**
 * One partial product: a × (single digit d), written shifted left by `place`
 * columns. Returns the cells the row occupies, each carrying its derived digit
 * and the carry that flows INTO it from the column on its right.
 */
export function buildPartial(a, d, place) {
  const rowKey = `p${place}`;
  if (d === 0) {
    // A zero multiplier digit writes a single 0 in this row's units column.
    return { rowKey, place, cols: [{ col: place, digit: 0, carryIn: 0, carryBox: false }] };
  }
  const aDig = digitsUnitsFirst(a);
  const cols = [];
  let carry = 0;
  aDig.forEach((ad, i) => {
    const entering = carry;
    const t = d * ad + entering;
    const digit = t % 10;
    carry = Math.floor(t / 10);
    // The rightmost column (i === 0) takes no carry from its right, so no box.
    cols.push({ col: place + i, digit, carryIn: entering, carryBox: i > 0 });
  });
  // A leftover carry becomes the leading digit (written straight down).
  if (carry > 0) cols.push({ col: place + aDig.length, digit: carry, carryIn: carry, carryBox: false });
  return { rowKey, place, cols };
}

/**
 * The final addition of the partial products, column by column, carry flowing
 * left. Width W is the digit-length of a × b, which already includes the
 * leading digit, so the carry out of the last column is always 0.
 */
export function buildSum(partials, W) {
  const at = (partial, c) => {
    const cell = partial.cols.find((k) => k.col === c);
    return cell ? cell.digit : 0;
  };
  const cols = [];
  let carry = 0;
  for (let c = 0; c < W; c++) {
    const entering = carry;
    const colSum = partials.reduce((s, p) => s + at(p, c), 0) + entering;
    const digit = colSum % 10;
    carry = Math.floor(colSum / 10);
    cols.push({ col: c, digit, carryIn: entering, carryBox: c > 0 });
  }
  return { rowKey: 'sum', cols };
}

/**
 * A single column addition or subtraction, column by column right to left.
 * Each column carries the digit and the small mark above it — a CARRY for '+'
 * (the ten brought into this column from its right) or a BORROW for '-' (the
 * ten this column had to give to its right). Both are 0/1 and sit in the same
 * `carryIn` slot with the same `carryBox` layout, so one grid renders both.
 * Subtraction assumes a >= b (the drill teaches the algorithm, not signed
 * answers — the sign work lives in the deck).
 */
export function buildAddSub(a, b, op) {
  const cols = [];
  const aLen = String(a).length;
  const bLen = String(b).length;
  if (op === '+') {
    let carry = 0;
    for (let c = 0; c < Math.max(aLen, bLen) || carry > 0; c++) {
      const entering = carry;
      const s = (digitAt(a, c) || 0) + (digitAt(b, c) || 0) + entering;
      cols.push({ col: c, digit: s % 10, carryIn: entering, carryBox: c > 0 });
      carry = Math.floor(s / 10);
    }
  } else {
    let borrow = 0;
    for (let c = 0; c < aLen; c++) {
      const incoming = borrow;              // this column owes a ten to its right
      const top = (digitAt(a, c) || 0) - incoming;
      const bd = digitAt(b, c) || 0;
      let digit;
      if (top < bd) { digit = top + 10 - bd; borrow = 1; } else { digit = top - bd; borrow = 0; }
      cols.push({ col: c, digit, carryIn: incoming, carryBox: c > 0 });
    }
  }
  return { rowKey: 'sum', cols };
}

/** The long-multiplication model: multiplicand, ×multiplier, partial rows, sum. */
function multModel(a, b) {
  const bDig = digitsUnitsFirst(b);
  const partials = bDig.map((d, place) => buildPartial(a, d, place));
  const W = String(a * b).length;
  const answerRow = partials.length > 1 ? buildSum(partials, W) : null;
  const rows = answerRow ? [...partials, answerRow] : partials;
  const stages = rows.map((r) => ({
    kind: r.rowKey === 'sum' ? 'sum' : 'partial',
    place: r.place,
    rowKey: r.rowKey,
    cols: [...r.cols].sort((x, y) => x.col - y.col),
  }));
  return { kind: 'mult', opSymbol: '×', a, b, W, partials, answerRow, stages };
}

/** The column add/subtract model: one operand row, one op-row, one answer row. */
function addSubModel(a, b, op) {
  const answerRow = buildAddSub(a, b, op);
  const stages = [{
    kind: 'sum', op, place: 0, rowKey: 'sum',
    cols: [...answerRow.cols].sort((x, y) => x.col - y.col),
  }];
  return { kind: 'addsub', opSymbol: op, op, a, b, W: answerRow.cols.length, partials: [], answerRow, stages };
}

/**
 * Everything derived for one problem, keyed by mode. Every intermediate cell is
 * computed here, never authored: `long-mult` derives partials/carries/sum,
 * `column-add-sub` derives the carry or borrow per column. Returns a uniform
 * shape — `partials` (possibly empty), `answerRow`, `stages`, `opSymbol`, `W`.
 */
export function modelOf(mode, a, b, op = '+') {
  if (mode === 'long-mult') return multModel(a, b);
  if (mode === 'column-add-sub') return addSubModel(a, b, op);
  throw new Error(`unknown drill mode "${mode}"`);
}
