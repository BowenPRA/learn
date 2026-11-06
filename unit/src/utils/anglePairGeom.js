/**
 * The geometry of X, F or Z? (Year 7 Maths 5.2, Intersecting lines) — the
 * pictures, worked out from an item's few numbers. Ported from the classroom
 * deck's lines.js / tracks.jsx (y7-math/U05_2). Angles are degrees measured
 * anticlockwise from east, on a screen whose y runs down.
 *
 *   fig: { type: 'x',     a, th }                two lines cross: along a and a + th
 *        { type: 'pair',  a, th, arrows? }       two parallel lines along a (arrows
 *                                                drawn unless arrows: false) and a
 *                                                line across them along a + th
 *        { type: 'three', a, th, bends: [0, 0, 4] }  three lines (each along
 *                                                a + bend) and one across them
 *
 * A crossing's four angles ("sectors") are numbered 0–3 anticlockwise from that
 * line's own direction. For 'pair', crossing 0 is the upper line, so sectors 2
 * and 3 at crossing 0 and 0 and 1 at crossing 1 lie between the lines.
 *
 * The letters follow the deck's settled convention: the F stands upright (the
 * line across leans back, the angles sit under the right-hand arms: sector 3
 * at both crossings) and the Z is never mirrored (the line across leans
 * forward; top arm left, bottom arm right: sector 2 at the top, 0 at the
 * bottom). Any other corresponding or alternate pair is still a true fact, but
 * the engine draws no letter for it and never asks about it.
 */

export const rad = (d) => (d * Math.PI) / 180;
export const norm = (d) => ((d % 360) + 360) % 360;
export const at = (P, r, d) => [P[0] + r * Math.cos(rad(d)), P[1] - r * Math.sin(rad(d))];
export const f1 = (n) => n.toFixed(1);

/** Where the line through P along d meets the line through Q along e. */
export function meet(P, d, Q, e) {
  const ux = Math.cos(rad(d)), uy = -Math.sin(rad(d));
  const vx = Math.cos(rad(e)), vy = -Math.sin(rad(e));
  const s = ((Q[0] - P[0]) * vy - (Q[1] - P[1]) * vx) / (ux * vy - uy * vx);
  return [P[0] + s * ux, P[1] + s * uy];
}

/** The four angles where a line along `along` meets one along `cross`. */
export function fourAngles(along, cross) {
  const s = norm(cross - along);
  return [
    { start: along, end: along + s, size: s },
    { start: along + s, end: along + 180, size: 180 - s },
    { start: along + 180, end: along + 180 + s, size: s },
    { start: along + 180 + s, end: along + 360, size: 180 - s },
  ].map((q) => ({ ...q, mid: (q.start + q.end) / 2 }));
}

/** The part of the line through P along d inside the box [x0, y0, x1, y1]. */
function clipLine(P, d, [x0, y0, x1, y1]) {
  const dx = Math.cos(rad(d)), dy = -Math.sin(rad(d));
  let lo = -1e9, hi = 1e9;
  for (const [p, dp, a, b] of [[P[0], dx, x0, x1], [P[1], dy, y0, y1]]) {
    if (Math.abs(dp) < 1e-9) continue;
    let t1 = (a - p) / dp, t2 = (b - p) / dp;
    if (t1 > t2) [t1, t2] = [t2, t1];
    lo = Math.max(lo, t1); hi = Math.min(hi, t2);
  }
  return [[P[0] + lo * dx, P[1] + lo * dy], [P[0] + hi * dx, P[1] + hi * dy]];
}

export const FIG = { W: 600, H: 440, H3: 500, ARC: 34, GAP: 92, GAP3: 134 };

/** The box a label takes at 26 px bold: about 15.6 px a character, 28 px tall. */
export const labelBox = (text) => ({ w: String(text).length * 15.6 + 6, h: 28 });
// Every label is placed as if it were four characters ("133°"), so a letter
// and the number that replaces it sit in the same spot.
const SLOT = labelBox('000°');
const halfAcross = (d) => Math.abs(Math.sin(rad(d))) * (SLOT.w / 2) + Math.abs(Math.cos(rad(d))) * (SLOT.h / 2);

/** Everything a figure needs: lines, crossings, sectors, arrows, label places. */
export function figureOf(fig) {
  const type = fig?.type;
  const a = Number(fig?.a ?? 0);
  const th = Number(fig?.th);
  if (!['x', 'pair', 'three'].includes(type)) throw new Error(`fig.type "${type}" — x, pair or three`);
  if (!Number.isFinite(th)) throw new Error('fig.th must be a number');
  const W = FIG.W;
  const H = type === 'three' ? FIG.H3 : FIG.H;
  const C = [W / 2, H / 2];
  const cross = a + th;
  const box = [18, 18, W - 18, H - 18];
  let points, dirs, rails;
  if (type === 'x') {
    points = [C];
    dirs = [a];
    rails = [{ P: C, d: a }];
  } else if (type === 'pair') {
    const L = [at(C, FIG.GAP, a + 90), at(C, FIG.GAP, a - 90)];
    points = L.map((Q) => meet(C, cross, Q, a));
    dirs = [a, a];
    rails = L.map((Q) => ({ P: Q, d: a }));
  } else {
    const bends = fig.bends || [];
    if (bends.length !== 3) throw new Error('fig.bends needs three numbers, one per line');
    const L = [at(C, FIG.GAP3, a + 90), C, at(C, FIG.GAP3, a - 90)];
    dirs = bends.map((k) => a + Number(k));
    points = L.map((Q, i) => meet(C, cross, Q, dirs[i]));
    rails = L.map((Q, i) => ({ P: Q, d: dirs[i] }));
  }
  const railBox = type === 'three' ? [64, 18, W - 18, H - 18] : box;
  const lines = rails.map((r, i) => ({ id: `r${i}`, rail: true, d: r.d, P: r.P, ends: clipLine(r.P, r.d, railBox) }));
  lines.push({ id: 'across', rail: false, d: cross, P: C, ends: clipLine(C, cross, box) });
  if (type === 'x') lines[0].rail = false;
  const sectors = dirs.map((d) => fourAngles(d, cross));
  const marked = type === 'pair' && fig.arrows !== false;
  // Arrows: one open chevron on each parallel line, on the side away from the crossings.
  let arrows = [];
  if (marked) {
    // The same distance along both lines, as far from the crossings as fits.
    const inside = ([x, y]) => x >= 30 && x <= W - 30 && y >= 30 && y <= H - 30;
    let best = null;
    for (const t of [-230, -200, -170, -140, 140, 170, 200, 230]) {
      const tips = rails.map((r) => at(r.P, t, a));
      if (!tips.every(inside)) continue;
      const clear = Math.min(...tips.flatMap((p) => points.map((P) => Math.hypot(p[0] - P[0], p[1] - P[1]))));
      if (!best || clear > best.clear) best = { tips, clear };
    }
    arrows = (best ? best.tips : rails.map((r) => at(r.P, 160, a))).map((tip) => ({ tip, d: a }));
  }
  const names = type === 'three' ? lines.slice(0, 3).map((l, i) => ({ name: 'ABC'[i], at: at(l.ends[0], -26, l.d) })) : [];
  return { type, W, H, a, th, cross, points, dirs, lines, sectors, marked, arrows, names };
}

export const sizeOf = (F, [c, w]) => F.sectors[c][w].size;
/** Where a sector's label goes: on its bisector, just far enough out to clear both arms. */
export function labelAt(F, [c, w]) {
  const q = F.sectors[c][w];
  const r = (Math.max(halfAcross(q.start), halfAcross(q.end)) + 5) / Math.sin(rad(Math.min(q.size, 178) / 2));
  // Never inside the angle's own arc (radius FIG.ARC): at least 56 out.
  return at(F.points[c], Math.max(56, Math.min(r, 150)), q.mid);
}
export const keyOf = ([c, w]) => `${c}-${w}`;
export const sameAt = (A, B) => !!A && !!B && A[0] === B[0] && A[1] === B[1];

/** The rays round sector w: [the line's ray, the ray of the line across]. */
const raysOf = (F, [c, w]) => {
  const d = F.dirs[c], b = F.cross;
  return [[d, b], [d + 180, b], [d + 180, b + 180], [d, b + 180]][w];
};

/**
 * How angle B is joined to angle A: 'self' · 'opp' (an X) · 'adj' (next to it
 * on a straight line) · across two crossings of a 'pair': 'corr' (same place,
 * an F) · 'alt' (between the lines, opposite sides, a Z) · 'side' (between the
 * lines, same side: 180°) · 'altext' (equal, two steps) · 'far180' (180°, two
 * steps) · 'other' (two crossings of a 'three' figure).
 */
export function relationOf(F, A, B) {
  if (sameAt(A, B)) return 'self';
  if (A[0] === B[0]) return (A[1] - B[1] + 4) % 2 === 0 ? 'opp' : 'adj';
  if (F.type !== 'pair') return 'other';
  const [w0, w1] = A[0] < B[0] ? [A[1], B[1]] : [B[1], A[1]];
  if (w0 === w1) return 'corr';
  if ((w0 === 2 && w1 === 0) || (w0 === 3 && w1 === 1)) return 'alt';
  if ((w0 === 2 && w1 === 1) || (w0 === 3 && w1 === 0)) return 'side';
  if ((w0 === 0 && w1 === 2) || (w0 === 1 && w1 === 3)) return 'altext';
  return 'far180';
}
export const ONE_STEP = ['opp', 'adj', 'corr', 'alt'];
export const EQUAL_RELS = ['opp', 'corr', 'alt', 'altext'];

/** Does this corresponding / alternate pair draw the allowed letter? */
export function letterAllowed(F, A, B) {
  const rel = relationOf(F, A, B);
  const th = norm(F.cross - F.dirs[0]);
  const [top, bot] = A[0] < B[0] ? [A, B] : [B, A];
  if (rel === 'corr') return top[1] === 3 && th > 90;
  if (rel === 'alt') return top[1] === 2 && bot[1] === 0 && th < 90;
  return rel === 'opp' || rel === 'adj';
}

/**
 * The shape that joins two angles, as polylines to glow under the figure:
 * { letter: 'X' | 'F' | 'Z' | 'line' | null, paths: [[[x, y], …], …] }.
 * No letter for a pair the convention does not draw.
 */
export function letterOf(F, A, B) {
  const rel = relationOf(F, A, B);
  if (rel === 'opp') {
    const P = F.points[A[0]];
    const d = F.dirs[A[0]];
    return { letter: 'X', paths: [[at(P, 118, d + 180), at(P, 118, d)], [at(P, 118, F.cross + 180), at(P, 118, F.cross)]] };
  }
  if (rel === 'adj') {
    const P = F.points[A[0]];
    const [lo] = (B[1] - A[1] + 4) % 4 === 1 ? [A[1]] : [B[1]];
    const rays = [F.dirs[A[0]], F.cross, F.dirs[A[0]] + 180, F.cross + 180];
    const r = rays[lo];
    return { letter: 'line', paths: [[at(P, 128, r), at(P, 128, r + 180)]] };
  }
  if (!letterAllowed(F, A, B)) return { letter: null, paths: [] };
  const [P0, P1] = F.points;
  if (rel === 'corr') {
    const [v, u] = raysOf(F, [0, 3]);
    return { letter: 'F', paths: [[at(P0, 128, v), P0, P1, at(P1, 64, u)], [P1, at(P1, 128, v)]] };
  }
  const v = raysOf(F, [0, 2])[0];
  return { letter: 'Z', paths: [[at(P0, 128, v), P0, P1, at(P1, 128, v + 180)]] };
}

/** The sector under a tap at (x, y): the nearest crossing within reach. */
export function sectorAt(F, x, y, reach = 120) {
  let best = null;
  F.points.forEach((P, c) => {
    const dist = Math.hypot(x - P[0], y - P[1]);
    if (dist <= reach && (!best || dist < best.dist)) best = { c, dist };
  });
  if (!best || best.dist < 4) return null;
  const P = F.points[best.c];
  const ang = norm((Math.atan2(-(y - P[1]), x - P[0]) * 180) / Math.PI);
  const w = F.sectors[best.c].findIndex((q) => norm(ang - q.start) < q.size);
  return w === -1 ? null : [best.c, w];
}

/** The line (a rail, not the line across) nearest a tap, for 'three' figures. */
export function railAt(F, x, y, reach = 34) {
  let best = null;
  F.lines.forEach((l, i) => {
    if (!l.rail) return;
    const [A, B] = l.ends;
    const vx = B[0] - A[0], vy = B[1] - A[1];
    const t = Math.max(0, Math.min(1, ((x - A[0]) * vx + (y - A[1]) * vy) / (vx * vx + vy * vy)));
    const dist = Math.hypot(x - (A[0] + t * vx), y - (A[1] + t * vy));
    if (dist <= reach && (!best || dist < best.dist)) best = { i, dist };
  });
  F.names.forEach((n, i) => {
    if (Math.hypot(x - n.at[0], y - n.at[1]) <= 30) best = { i, dist: 0 };
  });
  return best ? best.i : null;
}

/** Distance from (x, y) to the infinite line through P along d. */
export const distToLine = ([x, y], P, d) => Math.abs((x - P[0]) * Math.sin(rad(d)) + (y - P[1]) * Math.cos(rad(d)));
