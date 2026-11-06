// src/utils/interval.js
//
// The model behind the Number Line task: a SOLUTION SET on the real line, and
// the two different ways a student is asked to write one down.
//
// An Acellus item shows the same set three times over — as an inequality
// ("−3 < x ≤ 0"), as a picture (an open circle, a closed circle, a red segment
// between them), and as interval notation ("(−3, 0]") — and asks the student to
// convert between them. So the set is the thing that is modelled here, and each
// of the three notations is a way of reading it out. Nothing is stored twice:
// the graph, the notation and the marking all come from one object.
//
// A set is an ARRAY of disjoint intervals, left to right:
//
//   { lo, loOpen, hi, hiOpen }
//
// `lo` may be −Infinity and `hi` may be +Infinity, and an infinite end is
// ALWAYS open — that is not a convention, it is the fact that ∞ is not a number
// you can reach, and it is the rule that makes "[3, ∞)" the only correct
// bracketing. `normalize` enforces it, so a set cannot exist in memory with a
// square bracket against infinity.
//
// The empty set is `[]`, and the whole line is a single interval with both ends
// infinite.

export const NEG_INF = -Infinity;
export const POS_INF = Infinity;

const isInf = (v) => v === Infinity || v === -Infinity;

/** One interval. An infinite end is forced open, whatever was asked for. */
export const interval = (lo, hi, loOpen = true, hiOpen = true) => ({
  lo,
  hi,
  loOpen: isInf(lo) ? true : !!loOpen,
  hiOpen: isInf(hi) ? true : !!hiOpen,
});

/** Every real number. */
export const ALL_REALS = () => [interval(NEG_INF, POS_INF)];

/**
 * Sorted, with infinite ends opened and empty pieces dropped.
 *
 * A "piece" with lo > hi is empty and simply disappears — which is the honest
 * answer to `x > 5 and x < 2`, and is how the AND of two rays that miss each
 * other reports "no solution" rather than drawing a backwards segment.
 */
export function normalize(set) {
  return (set || [])
    .map((iv) => interval(iv.lo, iv.hi, iv.loOpen, iv.hiOpen))
    .filter((iv) => iv.lo < iv.hi || (iv.lo === iv.hi && !iv.loOpen && !iv.hiOpen))
    .sort((a, b) => a.lo - b.lo || a.hi - b.hi);
}

/** True when the two sets contain exactly the same numbers. */
export function sameSet(a, b) {
  const x = normalize(a);
  const y = normalize(b);
  if (x.length !== y.length) return false;
  return x.every((iv, i) =>
    iv.lo === y[i].lo && iv.hi === y[i].hi &&
    iv.loOpen === y[i].loOpen && iv.hiOpen === y[i].hiOpen);
}

/** Is this number in the set? Used to explain a wrong endpoint by testing it. */
export function contains(set, n) {
  return normalize(set).some((iv) =>
    (iv.lo < n || (iv.lo === n && !iv.loOpen)) &&
    (n < iv.hi || (n === iv.hi && !iv.hiOpen)));
}

/** Intersection of two sets — the AND of two inequalities. */
export function intersect(a, b) {
  const out = [];
  for (const p of normalize(a)) {
    for (const q of normalize(b)) {
      const lo = Math.max(p.lo, q.lo);
      const hi = Math.min(p.hi, q.hi);
      // At a shared endpoint the tighter rule wins: closed AND open is open.
      const loOpen = (p.lo === lo && p.loOpen) || (q.lo === lo && q.loOpen);
      const hiOpen = (p.hi === hi && p.hiOpen) || (q.hi === hi && q.hiOpen);
      out.push(interval(lo, hi, loOpen, hiOpen));
    }
  }
  return normalize(out);
}

/**
 * Union of two sets, merging pieces that touch or overlap.
 *
 * Touching matters and is easy to get wrong: `x < 2 or x > 2` leaves a hole at
 * 2 and stays two pieces, while `x ≤ 2 or x > 2` covers every number and must
 * collapse to one. The difference is whether at least one side is CLOSED at the
 * shared point.
 */
export function union(a, b) {
  const parts = normalize([...(a || []), ...(b || [])]);
  const out = [];
  for (const iv of parts) {
    const last = out[out.length - 1];
    if (!last) { out.push({ ...iv }); continue; }
    const touches = iv.lo < last.hi || (iv.lo === last.hi && (!iv.loOpen || !last.hiOpen));
    if (!touches) { out.push({ ...iv }); continue; }
    if (iv.hi > last.hi) { last.hi = iv.hi; last.hiOpen = iv.hiOpen; }
    else if (iv.hi === last.hi) { last.hiOpen = last.hiOpen && iv.hiOpen; }
  }
  return normalize(out);
}

// ------------------------------------------------------------------ writing

const numText = (v) => {
  if (v === POS_INF) return '∞';
  if (v === NEG_INF) return '−∞';
  // A real minus sign, not a hyphen — the same character KaTeX would set.
  return v < 0 ? `−${Math.abs(v)}` : String(v);
};

/** One interval in interval notation: "(−3, 0]", "[3, ∞)". */
export const intervalText = (iv) =>
  `${iv.loOpen ? '(' : '['}${numText(iv.lo)}, ${numText(iv.hi)}${iv.hiOpen ? ')' : ']'}`;

/** A whole set: "(−∞, −2) ∪ (7, ∞)", or "∅" when there is nothing in it. */
export function notationText(set) {
  const s = normalize(set);
  if (!s.length) return '∅';
  return s.map(intervalText).join(' ∪ ');
}

/** The same set written as an inequality: "−3 < x ≤ 0", "x < −2 or x > 7". */
export function inequalityText(set, v = 'x') {
  const s = normalize(set);
  if (!s.length) return 'no solution';
  const piece = (iv) => {
    const lo = isInf(iv.lo);
    const hi = isInf(iv.hi);
    if (lo && hi) return `every value of ${v}`;
    if (lo) return `${v} ${iv.hiOpen ? '<' : '≤'} ${numText(iv.hi)}`;
    if (hi) return `${v} ${iv.loOpen ? '>' : '≥'} ${numText(iv.lo)}`;
    return `${numText(iv.lo)} ${iv.loOpen ? '<' : '≤'} ${v} ${iv.hiOpen ? '<' : '≤'} ${numText(iv.hi)}`;
  };
  return s.map(piece).join(' or ');
}

// ------------------------------------------------------------------ reading

const cleanNumber = (raw) => {
  const t = String(raw).trim().replace(/[−–—]/g, '-').replace(/\s+/g, '');
  // An explicit plus is fine: "(3, +∞)" is how many textbooks write it.
  if (/^[+-]?(inf|infinity|∞)$/i.test(t)) return t.startsWith('-') ? NEG_INF : POS_INF;
  if (!/^[+-]?\d+(\.\d+)?$/.test(t)) return null;
  return Number(t);
};

const REL = { '<': '<', '<=': '<=', '>': '>', '>=': '>=' };

/**
 * Read an inequality into a set. This is what unit data authors, so it accepts
 * the shapes an Algebra I course actually writes:
 *
 *   x > 3            a ray
 *   3 < x            the same ray, written backwards
 *   x <= -2          a closed ray
 *   -3 < x <= 0      a compound AND, as one squeezed statement
 *   x < -2 or x > 7  a compound OR — the shape every |ax+b| > k produces
 *   x >= 1 and x < 4 a compound AND, spelled out
 *   all reals        every number (an inequality that is always true)
 *   no solution      nothing (an inequality that is never true)
 *
 * Throws on anything else rather than guessing, so a typo in unit data is a
 * validation failure and never a silently wrong answer key.
 */
export function parseInequality(src) {
  const text = String(src).trim().replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/[−–—]/g, '-');
  const low = text.toLowerCase();
  if (/^(all reals?|all real numbers|every number)$/.test(low)) return ALL_REALS();
  if (/^(no solution|none|empty|nothing)$/.test(low)) return [];

  if (/\bor\b/i.test(text)) {
    return text.split(/\bor\b/i).map(parseInequality).reduce(union, []);
  }
  if (/\band\b/i.test(text)) {
    return text.split(/\band\b/i).map(parseInequality).reduce(intersect, ALL_REALS());
  }

  const parts = text.split(/(<=|>=|<|>)/).map((p) => p.trim()).filter((p) => p !== '');

  // "a < x < b" — three operands, two relations.
  if (parts.length === 5) {
    const [a, r1, mid, r2, b] = parts;
    if (!/^[a-zA-Z]$/.test(mid)) throw new Error(`"${src}": the middle of a compound inequality must be the variable`);
    return intersect(parseInequality(`${mid} ${flip(r1)} ${a}`), parseInequality(`${mid} ${r2} ${b}`));
  }

  if (parts.length !== 3) throw new Error(`"${src}" is not an inequality this task can read`);
  const [lhs, rel0, rhs0] = parts;
  if (!REL[rel0]) throw new Error(`"${src}": unknown relation "${rel0}"`);

  // Put the variable on the left, turning the relation round if it moves.
  const backwards = !/^[a-zA-Z]$/.test(lhs);
  if (backwards && !/^[a-zA-Z]$/.test(rhs0)) throw new Error(`"${src}": one side must be a single variable`);
  const rel = backwards ? flip(rel0) : rel0;
  const rhs = backwards ? lhs : rhs0;
  const n = cleanNumber(rhs);
  if (n === null) throw new Error(`"${src}": "${rhs}" is not a number`);

  switch (rel) {
    case '>': return [interval(n, POS_INF, true)];
    case '>=': return [interval(n, POS_INF, false)];
    case '<': return [interval(NEG_INF, n, true, true)];
    case '<=': return [interval(NEG_INF, n, true, false)];
    default: throw new Error(`"${src}": unknown relation`);
  }
}

const flip = (rel) => ({ '<': '>', '<=': '>=', '>': '<', '>=': '<=' }[rel] || rel);

/**
 * Read interval notation into a set: "(-3, 0]", "(-inf, -2) U (7, inf)", "∅".
 * Returns `{ set }` or `{ error }` — this one is fed by a student, so a bad
 * string is an ordinary thing to be told about, not an exception.
 */
export function parseNotation(src) {
  const text = String(src).trim()
    .replace(/∪/g, 'U')
    .replace(/∞/g, 'inf')
    .replace(/[−–—]/g, '-');
  if (!text) return { error: 'empty' };
  if (/^(∅|\{\s*\})$/.test(text)) return { set: [] };

  const pieces = text.split(/\s*U\s*/i).filter(Boolean);
  const out = [];
  for (const piece of pieces) {
    const m = piece.trim().match(/^([([])([^,]+),([^)\]]+)([)\]])$/);
    if (!m) return { error: 'shape' };
    const [, lb, loRaw, hiRaw, rb] = m;
    const lo = cleanNumber(loRaw);
    const hi = cleanNumber(hiRaw);
    if (lo === null || hi === null) return { error: 'number' };
    if (lo === POS_INF || hi === NEG_INF) return { error: 'order' };
    if (lo >= hi) return { error: 'order' };
    if ((lo === NEG_INF && lb === '[') || (hi === POS_INF && rb === ']')) return { error: 'infinity' };
    out.push(interval(lo, hi, lb === '(', rb === ')'));
  }
  return { set: normalize(out) };
}

// ------------------------------------------------------------------ the graph

/**
 * The set a student has drawn, derived from what they put on the line.
 *
 * `points` are the endpoints they placed — `{ x, closed }` — and `shaded` is
 * the set of REGION indices they filled in. Regions are the gaps the points cut
 * the line into: with points at −3 and 0 there are three regions, (−∞, −3),
 * (−3, 0) and (0, ∞). So the picture is not a second answer key to keep in
 * step with the notation; it is the same set, arrived at by pointing.
 */
export function setFromGraph(points, shaded) {
  const pts = [...(points || [])].sort((a, b) => a.x - b.x);
  const bounds = [
    { x: NEG_INF, closed: false },
    ...pts,
    { x: POS_INF, closed: false },
  ];
  const parts = [];
  for (let i = 0; i < bounds.length - 1; i++) {
    if (!shaded?.has?.(i) && !(Array.isArray(shaded) && shaded.includes(i))) continue;
    parts.push(interval(bounds[i].x, bounds[i + 1].x, !bounds[i].closed, !bounds[i + 1].closed));
  }
  // Union rather than concat: two neighbouring regions shaded either side of a
  // CLOSED point are one unbroken piece, and the notation has to say so.
  return parts.reduce((acc, iv) => union(acc, [iv]), []);
}

/** The endpoints and regions a target set implies — the model answer's picture. */
export function graphOfSet(set) {
  const s = normalize(set);
  const points = [];
  for (const iv of s) {
    if (!isInf(iv.lo)) points.push({ x: iv.lo, closed: !iv.loOpen });
    if (!isInf(iv.hi)) points.push({ x: iv.hi, closed: !iv.hiOpen });
  }
  points.sort((a, b) => a.x - b.x);
  // A point that is both ends of two touching pieces would appear twice.
  const unique = points.filter((p, i) => i === 0 || p.x !== points[i - 1].x);
  const bounds = [{ x: NEG_INF }, ...unique, { x: POS_INF }];
  const shaded = [];
  for (let i = 0; i < bounds.length - 1; i++) {
    const lo = bounds[i].x;
    const hi = bounds[i + 1].x;
    // A region is filled when a number strictly inside it is in the set. Using
    // the midpoint keeps this independent of how the endpoints are drawn — and
    // a region with no finite end at all (the whole line, when the answer is
    // "every number") is sampled at zero, since ∞ − 1 is still ∞.
    const mid = isInf(lo) && isInf(hi) ? 0 : isInf(lo) ? hi - 1 : isInf(hi) ? lo + 1 : (lo + hi) / 2;
    if (contains(s, mid)) shaded.push(i);
  }
  return { points: unique, shaded };
}

// ------------------------------------------------------------------ authoring

/**
 * Validation for authored Number Line items — the same job checkDivision does
 * for long division. The risk here is never a wrong answer key (every answer is
 * derived) but an UNANSWERABLE item: a solution whose endpoints sit outside the
 * number line the student is shown, or off the ticks they are allowed to click.
 * Both look perfectly fine in the data and only fall over on screen.
 */
export function checkIntervalItems(items = []) {
  const problems = [];
  const seen = new Set();
  for (const it of items) {
    const at = `${it?.id || '(no id)'}`;
    if (!it?.id) problems.push('an item has no id');
    else if (seen.has(it.id)) problems.push(`${at}: duplicate id`);
    seen.add(it?.id);
    if (!it?.prompt || !it?.promptVn) problems.push(`${at} is missing a bilingual prompt`);

    let set;
    try {
      set = parseInequality(it?.solution);
    } catch (e) {
      problems.push(`${at}: ${e.message}`);
      continue;
    }

    const min = it.min ?? -8;
    const max = it.max ?? 8;
    if (!Number.isInteger(min) || !Number.isInteger(max) || min >= max) {
      problems.push(`${at}: the line runs ${min} to ${max}, which is not a usable window`);
      continue;
    }
    if (max - min > 24) problems.push(`${at}: a line ${max - min} units wide draws ticks too close to tap`);

    for (const iv of normalize(set)) {
      for (const end of [iv.lo, iv.hi]) {
        if (isInf(end)) continue;
        if (!Number.isInteger(end)) {
          problems.push(`${at}: endpoint ${end} is not a whole number, so it lands between two ticks`);
        }
        if (end < min || end > max) {
          problems.push(`${at}: endpoint ${end} is off the line (${min} to ${max}), so it can never be placed`);
        }
      }
    }
    // Two endpoints on the same tick cannot both be placed, and an empty answer
    // has nothing to draw — neither is a question the student can finish.
    if (!normalize(set).length) problems.push(`${at}: "${it.solution}" has no solutions, so there is nothing to graph`);
    if (normalize(set).length > 2) problems.push(`${at}: "${it.solution}" is ${normalize(set).length} separate pieces — the line takes at most two`);

    // The round trip every item depends on: the picture of the answer must read
    // back as the answer. If this fails the student can draw it perfectly and
    // still be marked wrong.
    const g = graphOfSet(set);
    if (!sameSet(setFromGraph(g.points, new Set(g.shaded)), set)) {
      problems.push(`${at}: "${it.solution}" does not survive being drawn and read back — ${notationText(set)}`);
    }
    const round = parseNotation(notationText(set));
    if (round.error || !sameSet(round.set, set)) {
      problems.push(`${at}: "${it.solution}" writes as ${notationText(set)}, which does not read back as the same set`);
    }
  }
  return problems;
}
