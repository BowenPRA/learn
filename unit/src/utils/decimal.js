// src/utils/decimal.js
//
// Exact decimals for the Year 7 number units (3.1 powers of 10, 3.2 rounding).
// A decimal is held as the BigInt of its digits plus the number of decimal
// places WRITTEN — so 35.0 and 35 have the same value but not the same form,
// which is exactly the difference "correct to 1 d.p." marks. Nothing here goes
// through floating point: 0.1 × 10³ is 100, not 100.00000000000001.
//
//   { n: 350n, dp: 1 }   is 35.0
//   { n: 52n,  dp: 3 }   is 0.052
//   { n: 7200n, dp: 0 }  is 7200
//
// Non-negative only — the units that use this never meet a negative decimal.

const TEN = 10n;
const pow10 = (k) => TEN ** BigInt(k);

/**
 * Read a typed number. Returns `{ ok: true, v }` or `{ ok: false, code }` with
 * code 'empty' | 'comma' | 'unreadable'.
 *
 * Spaces are thousands separators and are dropped ("628 700 000"). A comma is
 * trouble: Vietnamese writes the decimal point as a comma (8,286), English
 * writes thousands with one (8,286). Several commas in the thousands pattern,
 * or commas alongside a point, are read as thousands; a lone comma is refused
 * with 'comma' so the student is told to write the point as a dot rather than
 * marked wrong.
 */
export function readDec(s) {
  let t = String(s ?? '').trim().replace(/\s+/g, '').replace(/^\+/, '');
  if (!t) return { ok: false, code: 'empty' };
  if (t.includes(',')) {
    const thousands = /^\d{1,3}(,\d{3})+(\.\d+)?$/.test(t);
    const commas = (t.match(/,/g) || []).length;
    if (thousands && (commas > 1 || t.includes('.'))) t = t.replace(/,/g, '');
    else return { ok: false, code: 'comma' };
  }
  if (!/^(\d+\.?\d*|\.\d+)$/.test(t)) return { ok: false, code: 'unreadable' };
  const [whole, frac = ''] = t.split('.');
  return { ok: true, v: { n: BigInt((whole || '0') + frac), dp: frac.length } };
}

/** An authored decimal string → value. Throws on anything readDec refuses. */
export function dec(s) {
  const r = readDec(s);
  if (!r.ok) throw new Error(`"${s}" is not a decimal (${r.code})`);
  return r.v;
}

/** The value as written: exactly `dp` decimal places, a leading 0 before the point. */
export function decText(v) {
  const s = v.n.toString().padStart(v.dp + 1, '0');
  return v.dp ? `${s.slice(0, -v.dp)}.${s.slice(-v.dp)}` : s;
}

/** The same value with no trailing zeros after the point (35.0 → 35). */
export function canon(v) {
  let { n, dp } = v;
  while (dp > 0 && n % TEN === 0n) { n /= TEN; dp -= 1; }
  return { n, dp };
}

/** Canonical text of an authored or typed string, or null. */
export const canonText = (s) => { const r = readDec(s); return r.ok ? decText(canon(r.v)) : null; };

/** Same value, whatever the form. */
export function sameValue(a, b) {
  const dp = Math.max(a.dp, b.dp);
  return a.n * pow10(dp - a.dp) === b.n * pow10(dp - b.dp);
}

/** a < b ? -1 : a > b ? 1 : 0 */
export function compare(a, b) {
  const dp = Math.max(a.dp, b.dp);
  const x = a.n * pow10(dp - a.dp);
  const y = b.n * pow10(dp - b.dp);
  return x < y ? -1 : x > y ? 1 : 0;
}

/** v × 10^k (k may be negative), canonical. */
export function shift(v, k) {
  let { n, dp } = v;
  if (k >= 0) {
    if (dp >= k) dp -= k;
    else { n *= pow10(k - dp); dp = 0; }
  } else dp += -k;
  return canon({ n, dp });
}

/**
 * Round half up to `places`: 1, 2, 3 … decimal places; 0 the nearest whole
 * number; −1 the nearest 10, −2 the nearest 100. A positive `places` always
 * comes back WITH that many decimal places — the trailing zero is the answer.
 */
export function roundTo(v, places) {
  if (places >= 0) {
    if (v.dp <= places) return { n: v.n * pow10(places - v.dp), dp: places };
    const scale = pow10(v.dp - places);
    let q = v.n / scale;
    if ((v.n % scale) * 2n >= scale) q += 1n;
    return { n: q, dp: places };
  }
  const scale = pow10(v.dp - places);
  let q = v.n / scale;
  if ((v.n % scale) * 2n >= scale) q += 1n;
  return { n: q * pow10(-places), dp: 0 };
}

/** Chop (no rounding) to `places` — the "stopped without looking" answer. */
export function truncTo(v, places) {
  if (places >= 0) {
    if (v.dp <= places) return { n: v.n * pow10(places - v.dp), dp: places };
    return { n: v.n / pow10(v.dp - places), dp: places };
  }
  return { n: (v.n / pow10(v.dp - places)) * pow10(-places), dp: 0 };
}

/** Is this rounded answer written in the form `places` asks for? */
export function hasForm(v, places) {
  return places >= 0 ? v.dp === places : v.dp === 0;
}

/**
 * The digits of a value by place: { 3: 7, 2: 2 } for 7200 would lose its zeros,
 * so this keeps every digit it is WRITTEN with (canonical form): 7200 →
 * {3:7, 2:2, 1:0, 0:0}; 0.052 → {-2:5, -3:2} (the zeros before the 5 are not
 * digits of the number, they are placeholders the table draws).
 */
export function placesOf(v) {
  const c = canon(v);
  const s = c.n.toString();
  const out = {};
  if (c.n === 0n) return { 0: 0 };
  for (let i = 0; i < s.length; i += 1) out[s.length - 1 - i - c.dp] = Number(s[i]);
  return out;
}

/** Highest and lowest place a value is written with (7.2 → [0, −1]). */
export function spanOf(v) {
  const ks = Object.keys(placesOf(v)).map(Number);
  return [Math.max(...ks), Math.min(...ks)];
}

/** The number of significant figures (for the "counted from the front" slip). */
export function roundSig(v, sig) {
  const [hi] = spanOf(v);
  return roundTo(v, sig - 1 - hi);
}

/** KaTeX for a value: plain digits, a point, nothing else. */
export const decLatex = (v) => decText(v);
