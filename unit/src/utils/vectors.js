/**
 * Force-vector helpers, in one place.
 *
 * A vector is `{ mag, angle }` — a magnitude in newtons and a direction in
 * DEGREES measured anticlockwise from the +x axis (standard position). That is
 * the convention the whole PHYSICS track uses; nothing here accepts bearings or
 * radians, because mixing two angle conventions in one course is the single
 * fastest way to make every answer key wrong.
 *
 * The Vectors task, the VectorLab widget and the content validator all read the
 * components, the resultant and the tolerances from here rather than from
 * anything an author typed, so an answer key cannot drift away from the forces
 * it is supposed to describe — the same rule the parabola helpers follow.
 */

export const DEG = Math.PI / 180;

export const toRad = (deg) => deg * DEG;
export const toDeg = (rad) => rad / DEG;

/** Any angle folded into [0, 360). */
export const norm360 = (deg) => ((deg % 360) + 360) % 360;

/** (Fx, Fy) for one force. Fx = F·cos θ, Fy = F·sin θ. */
export const componentsOf = ({ mag, angle }) => ({
  x: mag * Math.cos(toRad(angle)),
  y: mag * Math.sin(toRad(angle)),
});

/** Component-wise sum of any number of forces. */
export function sumOf(vectors = []) {
  return vectors.reduce(
    (acc, v) => {
      const c = componentsOf(v);
      return { x: acc.x + c.x, y: acc.y + c.y };
    },
    { x: 0, y: 0 }
  );
}

export const magnitudeOf = ({ x, y }) => Math.hypot(x, y);

/** Direction of (x, y) in standard position, always in [0, 360). */
export const directionOf = ({ x, y }) => norm360(toDeg(Math.atan2(y, x)));

/**
 * The whole answer key for one problem: the running components, the resultant's
 * components, and its magnitude and direction.
 */
export function resultantOf(vectors = []) {
  const { x, y } = sumOf(vectors);
  return { x, y, mag: magnitudeOf({ x, y }), angle: directionOf({ x, y }) };
}

/** One decimal place — the precision every answer in this track is asked to. */
export const round1 = (v) => Math.round(v * 10) / 10;

/** Signed number with a typeset minus, never a hyphen. */
export const signed = (v, dp = 1) => {
  const r = Math.abs(v).toFixed(dp);
  const zero = Number(r) === 0;
  return v < 0 && !zero ? `−${r}` : r;
};

/**
 * How close counts as right.
 *
 * A student works these on a calculator and rounds as they go, so an exact
 * match is not a fair bar: resolving 60 N at 30° and then re-squaring the
 * rounded components can move the resultant by a tenth or two. The allowance is
 * absolute for small numbers and proportional for big ones, and angles get a
 * flat degree because a protractor-grade answer is what is being taught.
 */
export const ANGLE_TOL = 1.0;
const ABS_TOL = 0.25;
const REL_TOL = 0.01;

export const tolFor = (target, kind) =>
  kind === 'angle' ? ANGLE_TOL : Math.max(ABS_TOL, Math.abs(target) * REL_TOL);

/** True when a typed value is within tolerance of the derived answer. */
export function closeEnough(value, target, kind = 'linear') {
  if (!Number.isFinite(value) || !Number.isFinite(target)) return false;
  if (kind === 'angle') {
    const gap = Math.abs(norm360(value) - norm360(target));
    return Math.min(gap, 360 - gap) <= ANGLE_TOL;
  }
  return Math.abs(value - target) <= tolFor(target, kind);
}

/**
 * Names the mistake behind a wrong entry, or null when it is just wrong.
 *
 * `traps` is an ordered list of `[code, value]` the caller judged worth naming
 * — the sin/cos swap, the dropped sign, the calculator left in radians. Order
 * matters: the first trap that matches wins, so put the specific ones first.
 * A trap that lands within tolerance of the real answer is skipped, because
 * naming it would mean calling a correct answer a mistake.
 */
export function diagnose(value, traps = [], kind = 'linear', target = null) {
  if (!Number.isFinite(value)) return null;
  for (const [code, alt] of traps) {
    if (!Number.isFinite(alt)) continue;
    if (target !== null && closeEnough(alt, target, kind)) continue;
    if (closeEnough(value, alt, kind)) return code;
  }
  return null;
}

/**
 * What a calculator left in RADIAN mode would print for F·cos θ / F·sin θ —
 * it reads the number of degrees as if it were radians. Worth naming by itself,
 * because the student's method is right and only the mode is wrong.
 */
export const radianTrap = ({ mag, angle }, axis) =>
  mag * (axis === 'x' ? Math.cos(angle) : Math.sin(angle));

/** Every point a drawing of the problem has to contain. */
export function pointsOf(vectors = []) {
  const pts = [{ x: 0, y: 0 }];
  let run = { x: 0, y: 0 };
  for (const v of vectors) {
    const c = componentsOf(v);
    pts.push(c);                                  // drawn from the origin
    run = { x: run.x + c.x, y: run.y + c.y };
    pts.push(run);                                // and again tip-to-tail
  }
  return pts;
}

const TICKS = [0.5, 1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000];

/**
 * A window that fits every arrow in the problem — each force from the origin,
 * the tip-to-tail chain, and the resultant — on a round-numbered tick step.
 *
 * Derived rather than authored. An item whose forces outgrow a hand-typed grid
 * draws arrows straight off the canvas, and it looks perfectly fine in the data.
 * The window is asymmetric on purpose: forces mostly live in one or two
 * quadrants, and a symmetric grid spends half the canvas drawing empty space
 * that the arrows then have to share.
 */
export function gridFor(vectors = []) {
  const pts = pointsOf(vectors);
  const reach = Math.max(1, ...pts.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y))));
  // Aim for roughly eight squares of content: enough that a student can read a
  // component straight off the grid, few enough that the labels stay apart.
  const step = TICKS.find((s) => reach / s <= 8) ?? TICKS[TICKS.length - 1];

  // One clear tick of air on every side, and never fewer than two ticks of
  // axis on the quiet side, so the axes still read as axes.
  const lo = (vals) => Math.min(-2 * step, Math.floor(Math.min(...vals) / step) * step - step);
  const hi = (vals) => Math.max(2 * step, Math.ceil(Math.max(...vals) / step) * step + step);
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);

  return { step, xMin: lo(xs), xMax: hi(xs), yMin: lo(ys), yMax: hi(ys) };
}
