// src/utils/mathEquivalence.js
//
// Decide whether two typed maths answers are EQUIVALENT, not merely string-equal.
// "2x+10", "10+2x" and "10 + 2*x" are one answer; so are "3(x+5)" and "3x+15",
// "x=6" and a bare "6", "x<4" and "4>x". No computer-algebra library and no API:
// the core is polynomial identity testing by sampling — parse each side into a
// function of its variables, evaluate both at many spread-out points, and call
// them equal when they agree at every point.
//
// Why sampling beats symbolic simplification here: it needs no rewrite rules, it
// never returns a false "equal" (two different polynomials disagree at almost
// every point, and we test many), and it stays tiny.
//
// Four answer shapes are handled, each degrading to a normalised string compare
// if it will not parse (so "Expression", "Open", "≥" still work):
//   expression / number      2x+10, -7, 9x, n+7
//   equation                 x = 6, 50 + 25h = 150
//   inequality               x < 4, p ≤ 8, m ≥ -4
//   compound inequality      -5 < x < 4

// ------------------------------------------------------------------ cleaning

/** Strip presentation so the parser sees plain maths. */
function clean(raw) {
  return String(raw ?? '')
    .replace(/\\dfrac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '(($1)/($2))')
    .replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '(($1)/($2))')
    .replace(/\\geq\b/g, '>=').replace(/\\leq\b/g, '<=')
    .replace(/\\ge\b/g, '>=').replace(/\\le\b/g, '<=')
    .replace(/\\times|\\cdot/g, '*')
    .replace(/\\square/g, '')
    // "≈ 4" is an estimate — the value is what's marked, so students never have
    // to type the approximate symbol (LaTeX \approx or the unicode ≈/~).
    .replace(/\\approx\b/g, '')
    .replace(/[≈~]/g, '')
    .replace(/\$/g, '')
    // Scientific notation, three ways a physics student types it: 6.24e18,
    // 6.24×10^{18} (KaTeX braces) and 6.24x10^18. All become 6.24*10^(18).
    .replace(/(\d)\s*[eE]\s*([+-]?\d+)\b/g, '$1*10^($2)')
    .replace(/\^\{([^{}]*)\}/g, '^($1)')
    .replace(/(\d)\s*[xX×]\s*10\s*\^/g, '$1*10^')
    .replace(/[−–—]/g, '-')     // unicode minus / dashes → hyphen
    .replace(/[·×]/g, '*').replace(/÷/g, '/').replace(/²/g, '^2').replace(/³/g, '^3')
    .replace(/[≥]/g, '>=').replace(/[≤]/g, '<=')
    .trim();
}

const isWordy = (s) => /[a-zA-Z]{4,}/.test(s) || /\b(and|or|to|of|is|no|yes|r|rem)\b/i.test(s) || /^\s*[a-zA-Z]{2,3}\s*$/.test(s); // a real word, not single-letter vars
const normWord = (s) => s.replace(/\s+/g, '').replace(/\.$/, '').toLowerCase();

// ------------------------------------------------------------------ parser

/**
 * Compile a maths expression into `(env) => number`, where env maps each
 * single-letter variable to a value. Throws on anything it cannot parse.
 * Supports + - * / ^, parentheses, unary minus and implicit multiplication
 * (2x, 3(x+5), -4(2x-5)).
 */
function compile(src) {
  const tokens = tokenize(src);
  let pos = 0;
  const peek = () => tokens[pos];
  const eat = () => tokens[pos++];

  const expr = () => {
    let node = term();
    while (peek() && (peek().t === '+' || peek().t === '-')) {
      const op = eat().t, rhs = term(), a = node, b = rhs;
      node = op === '+' ? (e) => a(e) + b(e) : (e) => a(e) - b(e);
    }
    return node;
  };
  const term = () => {
    let node = factor();
    while (peek() && (peek().t === '*' || peek().t === '/')) {
      const op = eat().t, rhs = factor(), a = node, b = rhs;
      node = op === '*' ? (e) => a(e) * b(e) : (e) => a(e) / b(e);
    }
    return node;
  };
  const factor = () => {
    if (peek() && peek().t === '-') { eat(); const f = factor(); return (e) => -f(e); }
    if (peek() && peek().t === '+') { eat(); return factor(); }
    return power();
  };
  const power = () => {
    const base = atom();
    if (peek() && peek().t === '^') { eat(); const exp = factor(); return (e) => Math.pow(base(e), exp(e)); }
    return base;
  };
  const atom = () => {
    const tk = peek();
    if (!tk) throw new Error('unexpected end');
    if (tk.t === 'num') { eat(); const v = tk.v; return () => v; }
    if (tk.t === 'var') { eat(); const n = tk.v; return (e) => e[n]; }
    if (tk.t === '(') { eat(); const inner = expr(); if (!peek() || peek().t !== ')') throw new Error('missing )'); eat(); return inner; }
    throw new Error(`unexpected ${tk.t}`);
  };

  const fn = expr();
  if (pos !== tokens.length) throw new Error('trailing input');
  return fn;
}

function tokenize(src) {
  const out = [];
  // A value-ending token followed by a value-starting one implies a *.
  const push = (tok) => {
    const prev = out[out.length - 1];
    const ends = prev && (prev.t === 'num' || prev.t === 'var' || prev.t === ')');
    const starts = tok.t === 'num' || tok.t === 'var' || tok.t === '(';
    if (ends && starts && !(tok.t === 'num' && prev.t !== ')')) out.push({ t: '*' });
    out.push(tok);
  };
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === ' ') { i++; continue; }
    if (/[0-9.]/.test(c)) { let j = i + 1; while (j < src.length && /[0-9.]/.test(src[j])) j++; const lit = src.slice(i, j); if (!/^(\d+\.?\d*|\.\d+)$/.test(lit)) throw new Error(`bad number ${lit}`); push({ t: 'num', v: parseFloat(lit) }); i = j; continue; }
    if (/[a-zA-Z]/.test(c)) { push({ t: 'var', v: c }); i++; continue; }
    if (c === '(') { push({ t: '(' }); i++; continue; }
    if (')+-*/^'.includes(c)) { out.push({ t: c }); i++; continue; } // no implicit * before these
    throw new Error(`bad char ${c}`);
  }
  return out;
}

const varsOf = (src) => new Set([...src].filter((c) => /[a-zA-Z]/.test(c)));

// ------------------------------------------------------------------ numeric equivalence

// Well-spread sample points; the per-variable offset keeps different variables
// on different values within a trial, so x*y is never mistaken for x^2.
const POINTS = [2, 3, 5, 7, 4, 6, 8, 9, 1.5, 2.5, 3.5, 4.5, -2, -3, -5, -1.5, 11, 13];
const sampleFor = (trial, varIndex) => POINTS[(trial + varIndex * 7) % POINTS.length];

/** True when fA and fB agree at every sampled point over their shared variables. */
function numericEquiv(fA, fB, vars) {
  const names = [...vars];
  if (names.length === 0) {
    const a = fA({}), b = fB({});
    return isFinite(a) && isFinite(b) && Math.abs(a - b) <= 1e-9 * (1 + Math.abs(a) + Math.abs(b));
  }
  let ok = 0;
  for (let t = 0; t < POINTS.length && ok < 14; t++) {
    const env = {};
    names.forEach((n, i) => { env[n] = sampleFor(t, i); });
    const a = fA(env), b = fB(env);
    if (!isFinite(a) || !isFinite(b)) continue; // division by zero etc. — skip this point
    if (Math.abs(a - b) > 1e-9 * (1 + Math.abs(a) + Math.abs(b))) return false;
    ok++;
  }
  return ok >= 6;
}

/** Compare two expression strings for algebraic equivalence. */
function exprEqual(aSrc, bSrc) {
  let fA, fB;
  try { fA = compile(aSrc); fB = compile(bSrc); }
  catch { return normWord(aSrc) === normWord(bSrc); }
  return numericEquiv(fA, fB, new Set([...varsOf(aSrc), ...varsOf(bSrc)]));
}

// ------------------------------------------------------------------ relations

const OP2 = { '>=': 'GE', '<=': 'LE', '=>': 'GE', '=<': 'LE' };
const OP1 = { '>': 'GT', '<': 'LT', '=': 'EQ' };
const flip = (o) => ({ GT: 'LT', LT: 'GT', GE: 'LE', LE: 'GE', EQ: 'EQ' }[o]);

/** "-5<x<4" → ["-5","LT","x","LT","4"]; operands at even indices, ops at odd. */
function splitRelations(s) {
  const parts = [];
  let buf = '';
  for (let i = 0; i < s.length; i++) {
    const two = s.slice(i, i + 2);
    if (OP2[two]) { parts.push(buf, OP2[two]); buf = ''; i++; continue; }
    if (OP1[s[i]]) { parts.push(buf, OP1[s[i]]); buf = ''; continue; }
    buf += s[i];
  }
  parts.push(buf);
  return parts;
}

const opCount = (parts) => (parts.length - 1) / 2;

/** An equation with a lone variable on one side → the other side, else null. */
function reduceEqn(parts) {
  if (opCount(parts) !== 1 || parts[1] !== 'EQ') return null;
  const [l, , r] = parts;
  if (/^\s*[a-zA-Z]\s*$/.test(l)) return r;
  if (/^\s*[a-zA-Z]\s*$/.test(r)) return l;
  return null;
}

/** Two simple relations, equal allowing side-swaps (x<4 ≡ 4>x) and sign flips. */
function relEqual(ra, rb) {
  const dA = `(${ra[0]})-(${ra[2]})`, opA = ra[1];
  const dB = `(${rb[0]})-(${rb[2]})`, opB = rb[1];
  if (opA === opB && exprEqual(dA, dB)) return true;                 // same orientation
  if (opA === flip(opB) && exprEqual(dA, `-(${dB})`)) return true;   // sides / sign swapped
  return false;
}

/** Normalise a compound inequality to two increasing simple relations. */
function compoundToPair(p) {
  const [L, o1, M, o2, R] = p;
  if (o1 === 'GT' || o1 === 'GE') return [[R, flip(o2), M], [M, flip(o1), L]]; // written decreasing
  return [[L, o1, M], [M, o2, R]];
}
function compoundEqual(ra, rb) {
  const [a1, a2] = compoundToPair(ra);
  const [b1, b2] = compoundToPair(rb);
  return relEqual(a1, b1) && relEqual(a2, b2);
}

// ------------------------------------------------------------------ public API

/**
 * Compile a typed expression into `{ fn, vars }` — `fn(env)` evaluates it —
 * or throw when it will not parse. For tasks that need to EVALUATE what a
 * student typed rather than compare it to a key: the Sketch It factorise
 * stage checks each typed factor is linear and that the three multiply back
 * to the polynomial, which no single answer string could express.
 */
export function compileExpr(src) {
  const c = clean(src);
  if (!c || isWordy(c)) throw new Error('not an expression');
  return { fn: compile(c), vars: varsOf(c) };
}

/** Whether `input` equals `answer` (or any `accept` alternate) as maths. */
export function answersEquivalent(input, answer, accept = []) {
  const cands = [answer, ...(accept || [])];
  if (cands.some((cand) => equalOne(input, cand))) return true;
  const raw = String(input ?? ''); const lower = raw.toLowerCase();
  return lower !== raw && cands.some((cand) => !/[A-Z]/.test(clean(cand).replace(/\\[a-zA-Z]+/g, '')) && equalOne(lower, cand));
}

function equalOne(input, answer) {
  const A = clean(input), B = clean(answer);
  if (!A) return false;

  // Word answers ("Expression", "Open", "4 hours") never go through the parser.
  if (isWordy(A) || isWordy(B)) return normWord(A) === normWord(B);

  const ra = splitRelations(A), rb = splitRelations(B);

  // A bare operator answer ("≥") or an empty operand: compare as strings.
  if ([...ra, ...rb].some((p, i) => i % 2 === 0 && !p.trim())) return normWord(A) === normWord(B);

  const na = opCount(ra), nb = opCount(rb);

  if (na !== nb) {
    // Accept "x = 6" against a bare "6", in either direction.
    const redA = reduceEqn(ra), redB = reduceEqn(rb);
    if (redA != null && nb === 0) return exprEqual(redA, B);
    if (redB != null && na === 0) return exprEqual(A, redB);
    return false;
  }
  if (na === 0) return exprEqual(A, B);
  if (na === 1) return relEqual(ra, rb);
  if (na === 2) return compoundEqual(ra, rb);
  return normWord(A) === normWord(B);
}
