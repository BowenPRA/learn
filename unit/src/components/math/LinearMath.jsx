// src/components/math/LinearMath.jsx
//
// Drawing a linear side the way it is written by hand — a fraction is a
// numerator ABOVE a horizontal rule above a denominator, never "(x - 3)/2".
//
// This exists because the slashed form quietly teaches the wrong thing. Reading
// "(x - 3)/2" needs the bracket to know what the 2 divides; reading the stacked
// form needs nothing, because the bar is drawn under the whole numerator and
// the grouping IS the picture. That is the one idea the fractions unit turns on,
// so the notation has to carry it rather than fight it.
//
// Everything is derived from the side's own coefficients (see `groupedOf` in
// linearEquation.js), so nothing here can disagree with the model.

import {
  groupedOf, coefText, frText, fr, neg, isZero, isNeg,
} from '../../utils/linearEquation';

/**
 * A stacked fraction. Sized in `em` throughout so it scales with whatever text
 * size the caller sets, and the rule takes the current text colour so a
 * fraction drawn inside a coloured chip stays that colour.
 */
export function Frac({ top, bottom, barClass = 'bg-current' }) {
  return (
    <span className="inline-flex flex-col items-center align-middle mx-[0.12em] leading-none">
      <span className="px-[0.18em]">{top}</span>
      <span className={`w-full h-[0.08em] min-h-[2px] my-[0.14em] rounded-full ${barClass}`} />
      <span className="px-[0.18em]">{bottom}</span>
    </span>
  );
}

/**
 * One term, stacked when its own coefficient is a fraction. `mag` is always
 * non-negative — the sign is drawn by the caller as an operator between terms,
 * which is where it belongs on a written line.
 */
function TermBody({ mag, isX, v }) {
  if (mag.d === 1) return <span>{isX ? coefText(mag, v) : frText(mag)}</span>;
  // 2/5 of x is "2x" over "5", not "2x/5" — the letter rides in the numerator.
  return <Frac top={isX ? coefText(fr(mag.n), v) : mag.n} bottom={mag.d} />;
}

/**
 * A whole side: "3x - 9", "x/4 + 5", or — when every term shares a denominator
 * — one stacked fraction with the whole expression on top and no bracket in
 * sight, because the bar already does that job.
 */
export function SideMath({ side, v = 'x', xClass = '', cClass = '' }) {
  const g = groupedOf(side);
  if (g) {
    // The numerator's own terms are whole numbers by construction, so this
    // recursion is exactly one level deep.
    return <Frac top={<SideMath side={g.num} v={v} xClass={xClass} cClass={cClass} />} bottom={g.d} />;
  }

  const terms = [];
  if (!isZero(side.x)) terms.push({ f: side.x, isX: true });
  if (!isZero(side.c) || terms.length === 0) terms.push({ f: side.c, isX: false });

  return (
    <span className="inline-flex items-center justify-center">
      {terms.map((t, i) => {
        const negative = isNeg(t.f);
        const mag = negative ? neg(t.f) : t.f;
        return (
          <span key={i} className={`inline-flex items-center ${t.isX ? xClass : cClass}`}>
            {i === 0
              ? (negative && <span className="mr-[0.06em]">−</span>)
              : <span className="mx-[0.22em]">{negative ? '−' : '+'}</span>}
            <TermBody mag={mag} isX={t.isX} v={v} />
          </span>
        );
      })}
    </span>
  );
}

/** The operation written under a side: "− 7", "÷ 3", "+ 2x", "× 6". */
export function MoveMath({ move, v = 'x' }) {
  const sym = { add: '+', sub: '−', mul: '×', div: '÷' }[move.kind];
  const negative = isNeg(move.amount);
  const mag = negative ? neg(move.amount) : move.amount;
  return (
    <span className="inline-flex items-center">
      <span className="mr-[0.28em]">{sym}</span>
      {negative && <span className="mr-[0.06em]">−</span>}
      <TermBody mag={mag} isX={!!move.onX} v={v} />
    </span>
  );
}
