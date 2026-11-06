/**
 * ZERO ON THE LINE — the protractor engine for Year 7 Maths 5.3, Drawing lines
 * and quadrilaterals (task ZERO_LINE, p83; deck activity `zeroline`).
 *
 * Derive, don't store: an item states the angle or the figure; this file works
 * out where the protractor sits, which 0 is on the line, every reading, the
 * answer, and the name of the slip behind a wrong one. The task screen, the
 * deck activity and the validator all run the same code.
 *
 * Decisions, not dexterity: the protractor is always placed for the student
 * (centre on the vertex, baseline on the line or arm). The student's actions
 * are one-tap decisions — estimate, which 0, a mark on the scale, a point on a
 * line — or a typed reading.
 *
 * Conventions: SVG units, y runs DOWN; directions are degrees anticlockwise
 * from east (as on paper). A protractor turned to `rot` has its outer scale's
 * 0 at direction `rot` (its right-hand end when upright) and its inner scale's
 * 0 at `rot + 180`; a direction d reads `d − rot` on the outer scale and
 * `180 − (d − rot)` on the inner one. Figures are drawn at S units per cm.
 *
 * Item kinds (docs/y7-math/plans/U05_3.md):
 *   read    { angle, zero: 'right'|'left', turn?, offset? }  measure an angle
 *   reflex  { angle (190–340), turn? }                       measure the inside, 360 − it
 *   draw    { angle, zero: 'right'|'left', turn? }           mark an angle on a line
 *   parallel{ angle }                     copy the angle at Q to P (the upright F)
 *   perp    { AB, C: [x, y] }             the perpendicular from C, then measure AD
 *   sketch  { AB, A, AD, B, BC }          a quadrilateral: draw angle B from BA
 *   shape   { AB, A, AD, B, BC|D, at }    the finished quadrilateral: measure an angle
 *   paper   { shape: 'square', side } | { shape: 'quad', AB, A, AD, B, BC }
 */

export const S = 40;            // SVG units per cm in a figure
export const R_ANGLE = 150;     // the protractor on a plain angle
export const R_FIG = 112;       // the protractor on a figure

export const rad = (d) => (d * Math.PI) / 180;
export const norm = (d) => ((d % 360) + 360) % 360;
/** The point r from P in direction d (y down). */
export const at = (P, r, d) => [P[0] + r * Math.cos(rad(d)), P[1] - r * Math.sin(rad(d))];
/** The direction of Q seen from P. */
export const dirOf = (P, Q) => norm((Math.atan2(P[1] - Q[1], Q[0] - P[0]) * 180) / Math.PI);
export const dist = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
/** A point given in cm (y up) in SVG units. */
export const cm = (x, y) => [x * S, -y * S];
const r1 = (n) => Math.round(n * 10) / 10;

/** 'acute' | 'right' | 'obtuse' | 'straight' | 'reflex' for an angle in degrees. */
export function classOf(x) {
  if (x < 90) return 'acute';
  if (x === 90) return 'right';
  if (x < 180) return 'obtuse';
  if (x === 180) return 'straight';
  return 'reflex';
}

/** The outer reading of direction d on a protractor turned to rot, or null when d is under it. */
export function outerOf(rot, d) {
  const o = norm(d - rot);
  return o <= 180 + 1e-9 ? o : (o >= 360 - 1e-9 ? 0 : null);
}

/** The interior angle at V between the rays to P and Q (0–180). */
export function between(V, P, Q) {
  const d = Math.abs(dirOf(V, P) - dirOf(V, Q));
  return d > 180 ? 360 - d : d;
}

/** The arc { from, to } at V, anticlockwise, that spans the angle between the rays to P and Q. */
export function arcBetween(V, P, Q) {
  const a = dirOf(V, P), b = dirOf(V, Q);
  return norm(b - a) <= 180 ? { from: a, to: a + norm(b - a) } : { from: b, to: b + norm(a - b) };
}

/** A read on a protractor at V: the base arm along `base`, the angle x opening anticlockwise
 *  (`acw`, the 0 on the right) or clockwise (the 0 on the left); `offset` turns the
 *  protractor so the base arm sits on that number instead of on 0. */
function readGeom(V, base, x, sense, offset = 0) {
  const zero = sense === 'acw' ? 'right' : 'left';
  const rot = sense === 'acw' ? base - offset : base - 180 + offset;
  const other = sense === 'acw' ? base + x : base - x;
  return { V, base: norm(base), other: norm(other), x, sense, zero, rot: norm(rot), offset };
}

/** A draw on a line from V along `line`: the angle x opens anticlockwise (the 0 on the right)
 *  or clockwise (the 0 on the left). The right mark is an outer reading. */
function drawGeom(V, line, x, sense) {
  const zero = sense === 'acw' ? 'right' : 'left';
  const rot = sense === 'acw' ? line : line - 180;
  const target = sense === 'acw' ? x : 180 - x;
  return { V, line: norm(line), x, sense, zero, rot: norm(rot), target };
}

/** The angle a mark (an outer reading) draws, measured from the line. */
export const drawnAngle = (g, mark) => (g.sense === 'acw' ? mark : 180 - mark);
/** The direction a mark draws. */
export const markDir = (g, mark) => norm(g.rot + mark);

/** The four corners of a quadrilateral from a sketch, in cm (A at the origin, AB along the x axis).
 *  Either BC is given, or the angle D (then C is where the ray from B meets the ray from D). */
export function quadPoints(q) {
  const A = [0, 0];
  const B = [q.AB, 0];
  const D = [q.AD * Math.cos(rad(q.A)), q.AD * Math.sin(rad(q.A))];
  let C;
  if (q.BC != null) C = [B[0] + q.BC * Math.cos(rad(180 - q.B)), q.BC * Math.sin(rad(180 - q.B))];
  else {
    // the ray from D: the interior angle D turned anticlockwise (y up) from DA towards C
    const dDA = Math.atan2(A[1] - D[1], A[0] - D[0]) * 180 / Math.PI;
    const dDC = dDA + q.D;
    const u = [Math.cos(rad(dDC)), Math.sin(rad(dDC))];
    const v = [Math.cos(rad(180 - q.B)), Math.sin(rad(180 - q.B))];
    const det = u[0] * -v[1] - u[1] * -v[0];
    const t = ((B[0] - D[0]) * -v[1] - (B[1] - D[1]) * -v[0]) / det;
    C = [D[0] + t * u[0], D[1] + t * u[1]];
  }
  const ang = (V, P, Q) => {
    const d = Math.abs(Math.atan2(P[1] - V[1], P[0] - V[0]) - Math.atan2(Q[1] - V[1], Q[0] - V[0])) * 180 / Math.PI;
    return d > 180 ? 360 - d : d;
  };
  const angles = { A: q.A, B: q.B, C: ang(C, B, D), D: ang(D, C, A) };
  return { A, B, C, D, angles, CD: Math.hypot(C[0] - D[0], C[1] - D[1]), BC: Math.hypot(C[0] - B[0], C[1] - B[1]) };
}

/** Length labels, given angles and corner names for a quadrilateral in SVG units. */
function quadFig(qp, q, { showBC = true, showDC = true, given = ['A', 'B'] } = {}) {
  const P = { A: cm(...qp.A), B: cm(...qp.B), C: cm(...qp.C), D: cm(...qp.D) };
  const segs = [
    { a: P.A, b: P.B, tone: 'ink' },
    { a: P.A, b: P.D, tone: 'ink' },
  ];
  if (showBC) segs.push({ a: P.B, b: P.C, tone: 'ink' });
  if (showDC) segs.push({ a: P.D, b: P.C, tone: 'ink' });
  const centre = [(P.A[0] + P.B[0] + P.C[0] + P.D[0]) / 4, (P.A[1] + P.B[1] + P.C[1] + P.D[1]) / 4];
  const pts = ['A', 'B', 'C', 'D'].filter((k) => k !== 'C' || showBC).map((k) => ({ p: P[k], name: k, away: dirOf(centre, P[k]) }));
  const arcs = [];
  if (given.includes('A')) arcs.push({ c: P.A, r: 30, from: 0, to: q.A, tone: 'given', label: `${q.A}°` });
  if (given.includes('B')) arcs.push({ c: P.B, r: 30, from: 180 - q.B, to: 180, tone: 'given', label: `${q.B}°` });
  const lens = [{ a: P.A, b: P.B, text: `${q.AB} cm` }, { a: P.A, b: P.D, text: `${q.AD} cm` }];
  if (showBC && q.BC != null) lens.push({ a: P.B, b: P.C, text: `${q.BC} cm` });
  return { P, segs, pts, arcs, lens, centre };
}

/**
 * The model of one item: its geometry, its stages, and the extra stage a slip
 * opens. Throws on an item it cannot build (the validator reports it).
 */
export function zeroLineModel(item) {
  const k = item?.kind;
  const level = item?.level || 1;
  const teach = level <= 2;
  if (k === 'read') {
    const x = item.angle;
    const zero = item.zero === 'left' ? 'left' : 'right';
    const turn = item.turn || 0;
    const base = zero === 'right' ? turn : turn + 180;
    const g = readGeom([0, 0], base, x, zero === 'right' ? 'acw' : 'cw', item.offset || 0);
    const L = R_ANGLE * 1.14;
    const fig = {
      segs: [{ a: g.V, b: at(g.V, L, g.base), tone: 'ink' }, { a: g.V, b: at(g.V, L, g.other), tone: 'ink' }],
      pts: [{ p: g.V, name: '', away: g.base + (g.sense === 'acw' ? -90 : 90) }],
      arcs: [{ c: g.V, r: 36, from: g.sense === 'acw' ? g.base : g.other, to: g.sense === 'acw' ? g.other : g.base, tone: 'mark' }],
      lens: [],
    };
    return {
      id: item.id, kind: k, level, read: g, answer: x, est: classOf(x),
      stages: teach && !g.offset ? ['estimate', 'zero', 'read'] : ['estimate', 'read'],
      extra: g.offset ? {} : { scale: 'zero', mismatch: 'zero' },
      prot: { c: g.V, rot: g.rot, r: R_ANGLE }, fig, focus: at(g.V, R_ANGLE, g.other),
    };
  }
  if (k === 'reflex') {
    const RX = item.angle;
    const I = 360 - RX;
    const turn = item.turn || 0;
    const g = readGeom([0, 0], turn, I, 'acw', 0);
    const L = R_ANGLE * 1.14;
    const fig = {
      segs: [{ a: g.V, b: at(g.V, L, g.base), tone: 'ink' }, { a: g.V, b: at(g.V, L, g.other), tone: 'ink' }],
      pts: [{ p: g.V, name: '', away: g.base - 90 }],
      arcs: [{ c: g.V, r: 30, from: g.other, to: g.base + 360, tone: 'mark' }],
      lens: [],
    };
    return {
      id: item.id, kind: k, level, read: g, answer: RX, inside: I, est: 'reflex',
      stages: ['estimate', 'read'], extra: { scale: 'zero', inside: 'subtract' },
      prot: { c: g.V, rot: g.rot, r: R_ANGLE }, fig, focus: at(g.V, R_ANGLE, g.other),
    };
  }
  if (k === 'draw') {
    const x = item.angle;
    const zero = item.zero === 'left' ? 'left' : 'right';
    const turn = item.turn || 0;
    const line = zero === 'right' ? turn : turn + 180;
    const g = drawGeom([0, 0], line, x, zero === 'right' ? 'acw' : 'cw');
    const L = R_ANGLE * 1.16;
    const far = at(g.V, L, g.line);
    const [here, there] = zero === 'right' ? ['A', 'B'] : ['B', 'A'];
    const fig = {
      segs: [{ a: g.V, b: far, tone: 'ink' }],
      pts: [{ p: g.V, name: here, away: g.line + 180 }, { p: far, name: there, away: g.line }],
      arcs: [], lens: [],
    };
    return {
      id: item.id, kind: k, level, draw: g, answer: x, vertex: here,
      stages: ['zero', 'mark'], extra: {},
      prot: { c: g.V, rot: g.rot, r: R_ANGLE }, fig, focus: at(g.V, R_ANGLE, norm(g.rot + g.target)), arm: L,
    };
  }
  if (k === 'parallel') {
    const th = item.angle;
    const A = cm(0, 0), B = cm(9, 0);
    const Qc = [5.4, 0];
    const up = 180 - th;                         // the line across, going up from Q (leaning back)
    const Pc = [Qc[0] + 3.4 * Math.cos(rad(up)), 3.4 * Math.sin(rad(up))];
    const Q = cm(...Qc), P = cm(...Pc);
    const low = at(Q, 1.5 * S, norm(up + 180));
    const high = at(P, 1.3 * S, up);
    const g = drawGeom(P, dirOf(P, Q), th, 'acw');
    const fig = {
      segs: [{ a: A, b: B, tone: 'ink' }, { a: low, b: high, tone: 'muted' }],
      pts: [{ p: A, name: 'A', away: 225 }, { p: B, name: 'B', away: 315 }, { p: Q, name: 'Q', away: 235 }, { p: P, name: 'P', away: 150 }],
      arcs: [{ c: Q, r: 34, from: norm(-th), to: 360, tone: 'given', label: `${th}°` }],
      lens: [],
    };
    return {
      id: item.id, kind: k, level, draw: g, answer: th, A, B, P, Q,
      stages: ['zero', 'mark'], extra: {},
      prot: { c: P, rot: g.rot, r: R_FIG }, fig, focus: at(P, R_FIG, norm(g.rot + g.target)), arm: 4.2 * S,
    };
  }
  if (k === 'perp') {
    const AB = item.AB;
    const [cx, cy] = item.C;
    const A = cm(0, 0), B = cm(AB, 0), C = cm(cx, cy);
    const fig = {
      segs: [{ a: A, b: B, tone: 'ink' }],
      pts: [{ p: A, name: 'A', away: 180 }, { p: B, name: 'B', away: 0 }, { p: C, name: 'C', away: 90 }],
      arcs: [], lens: [{ a: A, b: B, text: `${AB} cm` }],
    };
    return {
      id: item.id, kind: k, level, AB, foot: cx, mid: AB / 2, height: cy, A, B, C,
      answer: cx, stages: ['place', 'measure'], extra: {},
      prot: { c: cm(cx, 0), rot: 0, r: R_FIG }, fig, focus: cm(cx, 0),
    };
  }
  if (k === 'sketch' || k === 'shape') {
    const qp = quadPoints(item);
    if (k === 'sketch') {
      const f = quadFig(qp, item, { showBC: false, showDC: false, given: ['A'] });
      const g = drawGeom(f.P.B, 180, item.B, 'cw');
      return {
        id: item.id, kind: k, level, draw: g, answer: item.B, quad: qp, P: f.P, vertex: 'B',
        stages: ['zero', 'mark'], extra: {},
        prot: { c: f.P.B, rot: g.rot, r: R_FIG }, fig: f, focus: at(f.P.B, R_FIG, norm(g.rot + g.target)), arm: item.BC * S,
      };
    }
    const atV = item.at || 'D';
    const from = item.from || { A: 'B', B: 'A', C: 'B', D: 'A' }[atV];
    const f = quadFig(qp, item, { given: ['A', 'B', 'C', 'D'].filter((v) => v !== atV && (item.given || ['A', 'B']).includes(v)) });
    if ((item.given || []).includes('C') && atV !== 'C') {
      f.arcs.push({ c: f.P.C, r: 28, ...arcBetween(f.P.C, f.P.B, f.P.D), tone: 'given', label: `${Math.round(qp.angles.C)}°` });
    }
    const V = f.P[atV];
    const others = { A: ['B', 'D'], B: ['A', 'C'], C: ['B', 'D'], D: ['A', 'C'] }[atV];
    const to = others.find((o) => o !== from);
    const base = dirOf(V, f.P[from]);
    const x = qp.angles[atV];
    const sense = Math.abs(norm(dirOf(V, f.P[to]) - base) - x) < 0.5 ? 'acw' : 'cw';
    const g = readGeom(V, base, x, sense, 0);
    f.arcs.push({ c: V, r: 26, ...arcBetween(V, f.P[from], f.P[to]), tone: 'mark' });
    return {
      id: item.id, kind: k, level, read: g, answer: x, est: classOf(x), quad: qp, P: f.P, vertex: atV,
      stages: ['estimate', 'read'], extra: { scale: 'zero', mismatch: 'zero' },
      prot: { c: V, rot: g.rot, r: R_FIG }, fig: f, focus: at(V, R_FIG, g.other),
    };
  }
  if (k === 'paper') {
    if (item.shape === 'square') {
      const e = item.side * Math.SQRT2;
      return {
        id: item.id, kind: k, level, shape: 'square', side: item.side, stages: ['paper'], extra: {},
        boxes: [
          { id: 'AC', unit: 'cm', expect: e, show: r1(e).toFixed(1), tol: 0.2 },
          { id: 'BD', unit: 'cm', expect: e, show: r1(e).toFixed(1), tol: 0.2 },
        ],
      };
    }
    const qp = quadPoints(item);
    return {
      id: item.id, kind: k, level, shape: 'quad', q: item, quad: qp, stages: ['paper'], extra: {},
      boxes: [
        { id: 'C', unit: 'deg', expect: qp.angles.C, show: String(Math.round(qp.angles.C)), tol: 2 },
        { id: 'D', unit: 'deg', expect: qp.angles.D, show: String(Math.round(qp.angles.D)), tol: 2 },
      ],
    };
  }
  throw new Error(`unknown kind "${k}"`);
}

// ── the diagnoses ────────────────────────────────────────────────────────────
// Each returns { ok, code, en, fr } (code 'ok' when right); `soft: true` is a
// nudge that does not count as a try (a typed non-number, mm for cm).

export const ESTIMATES = ['acute', 'obtuse', 'reflex'];
const CLASS = {
  acute: { en: 'acute', fr: 'aigu' }, obtuse: { en: 'obtuse', fr: 'obtus' },
  reflex: { en: 'reflex', fr: 'rentrant' }, right: { en: 'a right angle', fr: 'droit' },
  straight: { en: 'a straight line', fr: 'plat' },
};
const ok = (en, fr) => ({ ok: true, code: 'ok', en, fr });
const slip = (code, en, fr) => ({ ok: false, code, en, fr });
const soft = (en, fr) => ({ ok: false, code: 'soft', soft: true, en, fr });
const near = (a, b, tol = 1) => Math.abs(a - b) <= tol + 1e-9;
const R = (n) => Math.round(n);

/** A typed number: '65', '65°', '4,3' (a comma read as a point). NaN when it is not one. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(/°/g, '').replace(/cm$/i, '').replace(',', '.').trim();
  if (!/^-?\d+(\.\d+)?$/.test(t)) return NaN;
  return Number(t);
}

export function diagnoseEstimate(model, pick) {
  const truth = model.est;
  if (pick === truth) {
    if (truth === 'acute') return ok('Yes: acute, less than 90°.', 'Oui : aigu, moins de 90°.');
    if (truth === 'obtuse') return ok('Yes: obtuse, between 90° and 180°.', 'Oui : obtus, entre 90° et 180°.');
    return ok('Yes: reflex, more than 180°.', 'Oui : rentrant, plus de 180°.');
  }
  if (truth === 'reflex') {
    return slip('estimate', 'Look at the marked arc: it goes the long way round, past a straight line (180°).',
      'Regarde l’arc marqué : il fait le grand tour, plus loin qu’une droite (180°).');
  }
  if (pick === 'reflex') {
    return slip('estimate', 'The marked angle is smaller than a straight line (180°). A reflex angle goes past it.',
      'L’angle marqué est plus petit qu’une droite (180°). Un angle rentrant va plus loin.');
  }
  if (truth === 'acute') {
    return slip('estimate', 'Hold the corner of a page (90°) against it: this angle fits inside the corner.',
      'Pose le coin d’une feuille (90°) dessus : cet angle tient dans le coin.');
  }
  return slip('estimate', 'The corner of a page (90°) fits inside this angle, with room to spare.',
    'Le coin d’une feuille (90°) tient dans cet angle, et il reste de la place.');
}

export function diagnoseZero(model, side) {
  const g = model.read || model.draw;
  const onLine = !!model.draw;
  const thing = onLine ? { en: 'the line', fr: 'la droite' } : { en: 'the arm', fr: 'le côté' };
  if (side === g.zero) return ok(`That 0 sits on ${thing.en}: count up from it.`, `Ce 0 est sur ${thing.fr} : compte à partir de lui.`);
  return slip('zero', `No line goes through that 0: it is at the other end. Find the 0 that ${thing.en} runs through.`,
    `Aucune droite ne passe par ce 0 : il est à l’autre bout. Trouve le 0 par où passe ${thing.fr}.`);
}

/** A typed reading of a read, reflex or shape item. `est` is the student's own (right) estimate. */
export function diagnoseRead(model, typed, est = model.est) {
  const v = parseNum(typed);
  if (!Number.isFinite(v)) return soft('Type the size of the angle in degrees, like 65.', 'Écris la taille de l’angle en degrés, par exemple 65.');
  const X = model.answer;
  if (near(v, X)) return ok(`Yes: ${R(X)}°.`, `Oui : ${R(X)}°.`);
  const cls = classOf(v);
  const said = est && cls !== est && v > 0 && v < 360
    ? { en: `You said ${CLASS[est].en}, but ${v}° is ${CLASS[cls].en}. `, fr: `Tu as dit ${CLASS[est].fr}, mais ${v}° est ${CLASS[cls].fr}. ` }
    : { en: '', fr: '' };
  if (model.kind === 'reflex') {
    const I = model.inside;
    if (near(v, I)) {
      return slip('inside', `${v}° is the inside angle, the one the protractor measures. The marked angle goes the long way round.`,
        `${v}° est l’angle intérieur, celui que mesure le rapporteur. L’angle marqué fait le grand tour.`);
    }
    if (near(v, 180 - I) || near(v, 180 + I)) {
      return slip('scale', 'That comes from the other scale. Read the inside angle from the 0 on the arm, then take it from 360°.',
        'Ça vient de l’autre échelle. Lis l’angle intérieur à partir du 0 sur le côté, puis enlève-le de 360°.');
    }
  } else {
    const off = model.read?.offset || 0;
    if (near(v, 180 - X) || (off && near(v, 180 - off - X))) {
      return slip('scale', `${said.en}${v}° is on the other scale, the one that starts at 180 on this arm. Count up from the 0 on the arm.`,
        `${said.fr}${v}° est sur l’autre échelle, celle qui part de 180 sur ce côté. Compte à partir du 0 sur le côté.`);
    }
    if (off && near(v, off + X)) {
      return slip('notzero', `${v}° is where the second arm crosses, but the first arm is on ${off}, not on 0. Count on from ${off}: the angle is the gap between the arms.`,
        `${v}° est là où passe le deuxième côté, mais le premier est sur ${off}, pas sur 0. Compte à partir de ${off} : l’angle est l’écart entre les côtés.`);
    }
  }
  const d = Math.abs(v - X);
  if (d >= 9 && d <= 11) {
    return slip('ten', `${v}° is 10° out. Find the last big number before the arm, then count the small marks.`,
      `${v}° : 10° d’écart. Trouve le dernier grand nombre avant le côté, puis compte les petits traits.`);
  }
  if (d >= 2 && d <= 8) {
    return slip('tick', `Close, but ${v}° is a few degrees out. Count the small marks: each one is 1°, and the longer one in the middle is 5°.`,
      `Presque, mais ${v}° est à quelques degrés. Compte les petits traits : chacun vaut 1°, le plus long au milieu vaut 5°.`);
  }
  if (said.en && model.kind !== 'reflex') {
    return slip('mismatch', `${said.en}Look again: start at the 0 on the arm and count up the same scale.`,
      `${said.fr}Regarde encore : pars du 0 sur le côté et compte sur la même échelle.`);
  }
  return slip('value', `Not ${v}°. Put your finger on the 0 on the arm, then count up the same scale to the other arm.`,
    `Pas ${v}°. Mets le doigt sur le 0 du côté, puis compte sur la même échelle jusqu’à l’autre côté.`);
}

/** The second step of a reflex angle once its inside is known: 360 − inside. */
export function diagnoseSubtract(model, typed) {
  const v = parseNum(typed);
  if (!Number.isFinite(v)) return soft('Type a number of degrees.', 'Écris un nombre de degrés.');
  const I = model.inside;
  if (near(v, model.answer)) return ok(`Yes: 360° − ${I}° = ${model.answer}°.`, `Oui : 360° − ${I}° = ${model.answer}°.`);
  return slip('value', `360° − ${I}° is not ${v}°. Take ${I} away from 360.`, `360° − ${I}° ne fait pas ${v}°. Enlève ${I} de 360.`);
}

/** A mark (an outer reading, 0–180) on a draw, parallel or sketch item. */
export function diagnoseMark(model, mark) {
  const g = model.draw;
  const x = model.answer;
  const y = R(drawnAngle(g, mark));
  const par = model.kind === 'parallel';
  if (near(y, x)) {
    return par
      ? ok(`Yes: ${x}° at P, the same angle as at Q, so the new line is parallel to AB.`, `Oui : ${x}° en P, le même angle qu’en Q, donc la nouvelle droite est parallèle à AB.`)
      : ok(`Yes: ${x}°.`, `Oui : ${x}°.`);
  }
  if (near(y, 180 - x)) {
    return par
      ? slip('notsame', `Your line meets AB, so it is not parallel. It makes ${y}° with PQ, but the angle at Q is ${x}°. Count up from the 0 on PQ.`,
        `Ta droite coupe AB, donc elle n’est pas parallèle. Elle fait ${y}° avec PQ, mais l’angle en Q fait ${x}°. Compte à partir du 0 sur PQ.`)
      : slip('scale', `You counted on the other scale, so your angle is ${y}°. Count up from the 0 on the line to ${x}.`,
        `Tu as compté sur l’autre échelle, donc ton angle fait ${y}°. Compte à partir du 0 sur la droite jusqu’à ${x}.`);
  }
  const d = Math.abs(y - x);
  const far = par ? { en: ' So your line would still meet AB, far away.', fr: ' Ta droite couperait donc AB, loin d’ici.' } : { en: '', fr: '' };
  if (d >= 9 && d <= 11) {
    return slip(par ? 'notsame' : 'ten', `Your angle is ${y}°: 10° out. Find the last big number before ${x}, then count the small marks.${far.en}`,
      `Ton angle fait ${y}° : 10° d’écart. Trouve le dernier grand nombre avant ${x}, puis compte les petits traits.${far.fr}`);
  }
  if (d >= 2 && d <= 8) {
    return slip(par ? 'notsame' : 'tick', `Your angle is ${y}°: a few degrees out. Move the mark with − and +, one degree at a time.${far.en}`,
      `Ton angle fait ${y}° : quelques degrés d’écart. Déplace la marque avec − et +, un degré à la fois.${far.fr}`);
  }
  return slip(par ? 'notsame' : 'value', `Your angle is ${y}°, not ${x}°. Count up from the 0 on the line to ${x}.${far.en}`,
    `Ton angle fait ${y}°, pas ${x}°. Compte à partir du 0 sur la droite jusqu’à ${x}.${far.fr}`);
}

/** Where the protractor's centre is put on AB (cm from A), for the perpendicular from C. */
export function diagnosePlace(model, x) {
  if (near(x, model.foot, 0.1)) {
    return ok('Yes: the 90° line goes through C. Draw it: it meets AB at D.', 'Oui : la ligne des 90° passe par C. Trace-la : elle coupe AB en D.');
  }
  if (near(x, model.mid, 0.15)) {
    return slip('middle', 'That is the middle of AB, but the 90° line misses C. The perpendicular goes straight down from C, wherever that meets AB.',
      'C’est le milieu de AB, mais la ligne des 90° rate C. La perpendiculaire descend tout droit de C, là où elle coupe AB.');
  }
  return x < model.foot
    ? slip('miss', 'The 90° line passes to the left of C. Move the protractor to the right along AB.', 'La ligne des 90° passe à gauche de C. Déplace le rapporteur vers la droite sur AB.')
    : slip('miss', 'The 90° line passes to the right of C. Move the protractor to the left along AB.', 'La ligne des 90° passe à droite de C. Déplace le rapporteur vers la gauche sur AB.');
}

/** A typed ruler reading for AD (cm), on the perpendicular. */
export function diagnoseMeasure(model, typed) {
  const v = parseNum(typed);
  if (!Number.isFinite(v)) return soft('Type the length in centimetres, like 4.5.', 'Écris la longueur en centimètres, par exemple 4.5.');
  const AD = model.answer;
  if (v >= 10 && near(v / 10, AD, 0.1)) return soft(`Give it in centimetres: ${v} mm is ${r1(v / 10)} cm.`, `Donne-la en centimètres : ${v} mm font ${r1(v / 10)} cm.`);
  if (near(v, AD, 0.1)) return ok(`Yes: AD = ${AD} cm.`, `Oui : AD = ${AD} cm.`);
  if (near(v, model.AB - AD, 0.1)) {
    return slip('fromB', 'That is DB, from B to D. Measure AD: from the 0 at A to D.', 'Ça, c’est DB, de B à D. Mesure AD : du 0 en A jusqu’à D.');
  }
  const d = Math.abs(v - AD);
  if (d >= 0.9 && d <= 1.1) return slip('cm', 'One centimetre out: count the whole centimetres from 0 again.', 'Un centimètre d’écart : recompte les centimètres entiers à partir de 0.');
  if (d <= 0.5) {
    return slip('tick', 'Close: count the small marks after the last whole centimetre. Each one is 1 mm, which is 0.1 cm.',
      'Presque : compte les petits traits après le dernier centimètre entier. Chacun vaut 1 mm, soit 0.1 cm.');
  }
  return slip('value', `Not ${v} cm. Read the ruler where D is: the 0 is at A.`, `Pas ${v} cm. Lis la règle là où est D : le 0 est en A.`);
}

/**
 * The boxes of a paper item, typed from the student's own drawing. Returns
 * { soft? , boxes: { id: verdict }, all, sum? }. Every verdict names the
 * expected value, which the screen shows beside theirs.
 */
export function diagnosePaper(model, typed) {
  const vals = {};
  for (const b of model.boxes) vals[b.id] = parseNum(typed?.[b.id]);
  if (model.boxes.some((b) => !Number.isFinite(vals[b.id]))) {
    return { soft: soft('Type a number in every box.', 'Écris un nombre dans chaque case.') };
  }
  const boxes = {};
  if (model.shape === 'square') {
    if (model.boxes.some((b) => vals[b.id] >= 20)) {
      return { soft: soft('Give the lengths in centimetres, like 8.4 — not in millimetres.', 'Donne les longueurs en centimètres, par exemple 8.4 — pas en millimètres.') };
    }
    for (const b of model.boxes) {
      const v = vals[b.id];
      if (near(v, b.expect, b.tol)) boxes[b.id] = ok(`${v} cm: within 0.2 cm of ${b.show} cm.`, `${v} cm : à moins de 0.2 cm de ${b.show} cm.`);
      else if (near(v, model.side, 0.2)) boxes[b.id] = slip('side', `${v} cm is a side, not a diagonal. A diagonal goes from one corner to the opposite corner.`, `${v} cm, c’est un côté, pas une diagonale. Une diagonale va d’un coin au coin opposé.`);
      else boxes[b.id] = slip('far', `${v} cm is more than 0.2 cm from ${b.show} cm. Check your right angles and your ${model.side} cm sides.`, `${v} cm est à plus de 0.2 cm de ${b.show} cm. Vérifie tes angles droits et tes côtés de ${model.side} cm.`);
    }
    const [a, c] = [vals.AC, vals.BD];
    const unequal = Math.abs(a - c) > 0.2 && !near(a, model.side, 0.2) && !near(c, model.side, 0.2);
    const corner = unequal
      ? slip('corner', `Your diagonals are ${a} cm and ${c} cm. A square’s two diagonals are equal, so at least one corner is not 90°.`, `Tes diagonales font ${a} cm et ${c} cm. Les deux diagonales d’un carré sont égales : au moins un coin ne fait pas 90°.`)
      : null;
    return { boxes, corner, all: !corner && model.boxes.every((b) => boxes[b.id].ok) };
  }
  for (const b of model.boxes) {
    const v = vals[b.id];
    if (near(v, b.expect, b.tol)) boxes[b.id] = ok(`${v}°: within 2° of ${b.show}°.`, `${v}° : à moins de 2° de ${b.show}°.`);
    else if (near(v, 180 - b.expect, 2)) boxes[b.id] = slip('scale', `${v}° is about 180° − ${b.show}°: you read the other scale. Count up from the 0 on the line.`, `${v}° fait environ 180° − ${b.show}° : tu as lu l’autre échelle. Compte à partir du 0 sur la droite.`);
    else if (Math.abs(v - b.expect) >= 8 && Math.abs(v - b.expect) <= 12) boxes[b.id] = slip('ten', `${v}° is about 10° from ${b.show}°: count the tens again.`, `${v}° est à environ 10° de ${b.show}° : recompte les dizaines.`);
    else boxes[b.id] = slip('far', `${v}° is more than 2° from ${b.show}°. Check the angles you drew at A and B, and your lengths.`, `${v}° est à plus de 2° de ${b.show}°. Vérifie les angles tracés en A et en B, et tes longueurs.`);
  }
  const q = model.q;
  const total = q.A + q.B + vals.C + vals.D;
  const sum = { total, ok: near(total, 360, 3), text: `${q.A}° + ${q.B}° + ${vals.C}° + ${vals.D}° = ${r1(total)}°` };
  return { boxes, sum, all: model.boxes.every((b) => boxes[b.id].ok) };
}

// ── the proof ────────────────────────────────────────────────────────────────

/** Every stage's own answer and each slip's canonical wrong value, with the code it must get. */
export function slipCases(m) {
  const out = [];
  const add = (stage, input, expect) => out.push({ stage, input, expect });
  const g = m.read || m.draw;
  if (m.est) for (const e of ESTIMATES) add('estimate', e, e === m.est ? 'ok' : 'estimate');
  if (g && (m.stages.includes('zero') || Object.values(m.extra).includes('zero'))) {
    for (const s of ['right', 'left']) add('zero', s, s === g.zero ? 'ok' : 'zero');
  }
  if (m.read && m.kind !== 'reflex') {
    const x = m.answer;
    add('read', String(R(x)), 'ok');
    add('read', String(R(180 - x)), 'scale');
    if (m.read.offset) add('read', String(R(m.read.offset + x)), 'notzero');
    if (x + 10 < 180) add('read', String(R(x + 10)), 'ten'); else add('read', String(R(x - 10)), 'ten');
    add('read', String(R(x) + (x + 5 < 180 ? 5 : -5)), 'tick');
    const mis = x < 90 ? R(180 - x + 15) : R(180 - x - 15);
    if (mis > 0 && mis < 180 && Math.abs(mis - x) > 12 && !(m.read.offset && Math.abs(mis - m.read.offset - x) <= 1)) add('read', String(mis), 'mismatch');
  }
  if (m.kind === 'reflex') {
    add('read', String(m.answer), 'ok');
    add('read', String(m.inside), 'inside');
    add('read', String(180 - m.inside), 'scale');
    add('read', String(m.answer - 10), 'ten');
    add('read', String(m.answer - 5), 'tick');
    add('subtract', String(m.answer), 'ok');
    add('subtract', String(m.answer + 10), 'value');
  }
  if (m.draw) {
    const x = m.answer;
    const markFor = (y) => (m.draw.sense === 'acw' ? y : 180 - y);
    const par = m.kind === 'parallel';
    add('mark', markFor(x), 'ok');
    add('mark', markFor(180 - x), par ? 'notsame' : 'scale');
    add('mark', markFor(x + 10 < 180 ? x + 10 : x - 10), par ? 'notsame' : 'ten');
    add('mark', markFor(x + 5 < 180 ? x + 5 : x - 5), par ? 'notsame' : 'tick');
  }
  if (m.kind === 'perp') {
    add('place', m.foot, 'ok');
    add('place', m.mid, 'middle');
    add('place', m.foot > m.mid ? m.foot + 0.8 : m.foot - 0.8, 'miss');
    add('measure', String(m.answer), 'ok');
    add('measure', String(r1(m.AB - m.answer)), 'fromB');
    add('measure', String(r1(m.answer + 1)), 'cm');
    add('measure', String(r1(m.answer + 0.4)), 'tick');
    add('measure', String(R(m.answer * 10)), 'soft');
  }
  if (m.kind === 'paper') {
    const one = (code, val, other) => add('paper', Object.fromEntries(m.boxes.map((b, i) => [b.id, i === 0 ? val : (other ?? b.show)])), code);
    const b = m.boxes[0];
    one('ok', b.show);
    if (m.shape === 'square') {
      one('side', String(m.side));
      one('far', String(r1(b.expect + 0.6)), String(r1(b.expect + 0.6)));
      one('corner', b.show, String(r1(b.expect + 0.5)));
    } else {
      one('scale', String(R(180 - b.expect)));
      one('ten', String(R(b.expect + 10)));
      one('far', String(R(b.expect + 5)));
    }
  }
  return out;
}

/** The code a case gets from the diagnoses (paper: the first box's code, or 'corner'). */
export function runCase(m, c) {
  switch (c.stage) {
    case 'estimate': return diagnoseEstimate(m, c.input).code;
    case 'zero': return diagnoseZero(m, c.input).code;
    case 'read': return diagnoseRead(m, c.input).code;
    case 'subtract': return diagnoseSubtract(m, c.input).code;
    case 'mark': return diagnoseMark(m, c.input).code;
    case 'place': return diagnosePlace(m, c.input).code;
    case 'measure': return diagnoseMeasure(m, c.input).code;
    case 'paper': {
      const d = diagnosePaper(m, c.input);
      if (d.soft) return 'soft';
      if (d.corner) return 'corner';
      return d.boxes[m.boxes[0].id].code;
    }
    default: return '?';
  }
}

const KINDS = ['read', 'reflex', 'draw', 'parallel', 'perp', 'sketch', 'shape', 'paper'];
const clean = (x) => Math.abs(180 - 2 * x) >= 14;

/** Problems with one item, as strings (empty when it is sound). */
export function checkZeroLineItem(it) {
  const out = [];
  const at0 = `item ${it?.id || '?'}`;
  if (!it?.id) out.push('an item has no id');
  if (!KINDS.includes(it?.kind)) return [`${at0}: kind "${it?.kind}" — known: ${KINDS.join('/')}`];
  const int = (v) => Number.isInteger(v);
  if (['read', 'draw'].includes(it.kind)) {
    const x = it.angle;
    if (!int(x) || x < 15 || x > 165) out.push(`${at0}: angle ${x} must be a whole number 15–165`);
    else if (!clean(x)) out.push(`${at0}: ${x}° is too close to 90° — 180 − x would be within the ten/tick bands`);
    if (it.zero && !['right', 'left'].includes(it.zero)) out.push(`${at0}: zero must be 'right' or 'left'`);
    if (Math.abs(it.turn || 0) > 60) out.push(`${at0}: turn more than 60°`);
    if (it.offset && ![20, 30, 40].includes(it.offset)) out.push(`${at0}: offset must be 20, 30 or 40`);
    if (it.offset && it.offset + x > 165) out.push(`${at0}: offset + angle passes 165`);
    if (it.offset && it.kind === 'read' && int(x)) {
      // the three wrong readings of a turned protractor must sit outside the ten/tick bands and apart
      const wrong = [180 - x, it.offset + x, 180 - it.offset - x];
      const apart = wrong.every((a, i) => wrong.every((b, j) => i === j || Math.abs(a - b) >= 3));
      if (wrong.some((w) => Math.abs(w - x) < 13) || !apart) out.push(`${at0}: with offset ${it.offset}, a wrong reading is too close to ${x}° or to another`);
    }
    if (it.offset && it.kind === 'draw') out.push(`${at0}: a draw has no offset`);
  }
  if (it.kind === 'reflex') {
    const I = 360 - it.angle;
    if (!int(it.angle) || it.angle < 190 || it.angle > 340) out.push(`${at0}: a reflex angle is a whole number 190–340`);
    else if (!clean(I)) out.push(`${at0}: its inside angle ${I}° is too close to 90°`);
  }
  if (it.kind === 'parallel' && (!int(it.angle) || it.angle < 25 || it.angle > 80 || !clean(it.angle))) out.push(`${at0}: the angle at Q must be a whole number 25–80, clear of 90`);
  if (it.kind === 'perp') {
    const [x, y] = it.C || [];
    if (!(it.AB >= 4 && it.AB <= 10)) out.push(`${at0}: AB must be 4–10 cm`);
    if (!(x > 0.8 && x < it.AB - 0.8)) out.push(`${at0}: C must be above AB, clear of its ends`);
    if (Math.abs(x - it.AB / 2) < 0.5) out.push(`${at0}: the foot must be at least 0.5 cm from the middle (or "the middle" is the answer)`);
    if (!(y >= 1.5 && y <= 5)) out.push(`${at0}: C must be 1.5–5 cm above AB`);
    if (Math.abs(x * 10 - Math.round(x * 10)) > 1e-9) out.push(`${at0}: C must be given to the mm`);
  }
  if (['sketch', 'shape'].includes(it.kind) || (it.kind === 'paper' && it.shape === 'quad')) {
    let qp = null;
    try { qp = quadPoints(it); } catch { out.push(`${at0}: the quadrilateral cannot be built`); }
    if (qp) {
      const ang = Object.values(qp.angles);
      if (ang.some((a) => !(a > 25 && a < 155))) out.push(`${at0}: every angle must be 25°–155° (got ${ang.map((a) => R(a)).join(', ')})`);
      if (Math.abs(ang.reduce((s, a) => s + a, 0) - 360) > 0.01) out.push(`${at0}: the shape is not a simple quadrilateral`);
      if (qp.BC < 1.5 || qp.CD < 1.5) out.push(`${at0}: a side is shorter than 1.5 cm`);
      if (it.kind === 'sketch' && !clean(it.B)) out.push(`${at0}: angle B (drawn) is too close to 90°`);
      if (it.kind === 'shape' && !clean(qp.angles[it.at || 'D'])) out.push(`${at0}: the measured angle is too close to 90°`);
      if (it.kind === 'paper' && ['C', 'D'].some((v) => Math.abs(180 - 2 * qp.angles[v]) < 18)) out.push(`${at0}: C and D must be clear of 90° by 9° (the ±2° tolerance)`);
    }
  }
  if (it.kind === 'paper' && it.shape === 'square' && !(it.side >= 3 && it.side <= 8)) out.push(`${at0}: a square of side 3–8 cm`);
  if (it.kind === 'paper' && !['square', 'quad'].includes(it.shape)) out.push(`${at0}: paper shape must be square or quad`);
  if (out.length) return out;
  let m;
  try { m = zeroLineModel(it); } catch (e) { return [`${at0}: ${e.message}`]; }
  for (const c of slipCases(m)) {
    const got = runCase(m, c);
    if (got !== c.expect) out.push(`${at0}: ${c.stage} ${JSON.stringify(c.input)} is named "${got}", expected "${c.expect}"`);
  }
  return out;
}

/** The whole `zeroLine` block. */
export function checkZeroLineConfig(cfg, { bilingual = true } = {}) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['zeroLine must be an object'];
  if (!cfg.title || (bilingual && !cfg.titleFr)) out.push(`needs a ${bilingual ? 'French ' : ''}title`);
  if (cfg.intro && bilingual && !cfg.introFr) out.push('intro needs introFr');
  const items = cfg.items || [];
  if (items.length < 8) out.push(`has ${items.length} items — at least 8`);
  const ids = new Set();
  let paperFrom = Infinity;
  let lastScreen = 0;
  for (const it of items) {
    if (ids.has(it.id)) out.push(`item id ${it.id} is used twice`);
    ids.add(it.id);
    const lv = cfg.levels?.[it.level];
    if (!lv?.en || (bilingual && !lv.fr)) out.push(`item ${it.id}: level ${it.level} has no ${bilingual ? 'English and French ' : ''}name in levels`);
    if (it.kind === 'paper') paperFrom = Math.min(paperFrom, items.indexOf(it));
    else lastScreen = items.indexOf(it);
    out.push(...checkZeroLineItem(it));
  }
  if (paperFrom < lastScreen) out.push('paper items must come last, so skipping them never stands in front of a screen item');
  return out;
}

/** A deck activity: { id, type: 'zeroline', kind: 'read' | 'draw' | 'shape', …the item's fields }. */
export function checkZeroLineActivity(a) {
  if (!['read', 'draw', 'shape'].includes(a.kind)) return [`zeroline kind "${a.kind}" — read, draw or shape`];
  return checkZeroLineItem({ ...a, level: a.level || 3 });
}

/** The task's score out of 10: skipped paper items leave the count. */
export function zeroLineScore(items, results) {
  const counted = items.filter((it) => results[it.id] !== 'skip');
  const earned = counted.reduce((s, it) => s + (typeof results[it.id] === 'number' ? results[it.id] : 0), 0);
  return counted.length ? Math.round((earned / counted.length) * 10) : 0;
}
