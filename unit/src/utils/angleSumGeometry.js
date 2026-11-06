// src/utils/angleSumGeometry.js
//
// The diagram of a Find It, Say Why item (utils/angleSum.js), drawn TO SCALE
// from its angles — unlike the book's — so 178° looks straight on purpose:
// the lesson is "always add". Pure: AngleSumFigure.jsx draws what this returns
// and the validator (angleSumCheck.js) proves every label fits and none overlap.
//
//   line / straight  rays from one point, tilted a little by the item id
//   point            rays all the way round, turned by the item id
//   quad / para      a convex quadrilateral built from its four angles: the
//                    edge directions turn by 180° − each angle, two side
//                    lengths are chosen and the other two solved so it closes
//   ext              the side arriving at corner `at`, drawn on past it
//
// Output in viewBox pixels: { w, h, segs, polygon, dot, wedges, tags }.

import { hashOf } from './angleSum.js';

const rad = (d) => (d * Math.PI) / 180;
const dir = (d) => [Math.cos(rad(d)), Math.sin(rad(d))];
const r1 = (v) => Math.round(v * 10) / 10;
export const FONT_PX = 22;
const PAD = 16;
const textW = (t) => (t ? t.length * 12.6 + 4 : 0);

/** Build a convex quadrilateral (unit-ish sides) with these interior angles, in order. */
export function quadPoints(alpha, tilt) {
  const th = [tilt];
  for (let i = 1; i < 4; i += 1) th.push(th[i - 1] + 180 - alpha[i]);
  const u = th.map(dir);
  let best = null;
  for (let a = 6; a <= 16; a += 1) {
    for (let b = 6; b <= 16; b += 1) {
      const s0 = a / 10; const s1 = b / 10;
      const bx = -(s0 * u[0][0] + s1 * u[1][0]);
      const by = -(s0 * u[0][1] + s1 * u[1][1]);
      const det = u[2][0] * u[3][1] - u[2][1] * u[3][0];
      if (Math.abs(det) < 1e-9) continue;
      const s2 = (bx * u[3][1] - by * u[3][0]) / det;
      const s3 = (u[2][0] * by - u[2][1] * bx) / det;
      const s = [s0, s1, s2, s3];
      if (s.some((x) => x <= 0.05)) continue;
      const q = Math.min(...s) / Math.max(...s);
      if (!best || q > best.q + 1e-9) best = { q, s };
    }
  }
  if (!best) return null;
  const V = [[0, 0]];
  for (let i = 0; i < 3; i += 1) V.push([V[i][0] + best.s[i] * u[i][0], V[i][1] + best.s[i] * u[i][1]]);
  return { V, th, sides: best.s, quality: best.q };
}

/** The drawing of one model (from angleModel). `values` maps a letter to its answer. */
export function figureOf(m) {
  const h = hashOf(m.id || 'x');
  const valueOf = (e) => (e.letter ? m.answers[e.letter] : e.value);
  const textOf = (e) => (e.right ? '' : e.letter ? e.letter : `${e.value}°`);
  const lines = [];     // [p, q] unit coords
  const specs = [];     // { el, apex, a1, span }
  const tags = [];      // { p, text }
  let polygon = null;
  let dot = null;
  let sMax = 175;

  if (m.kind === 'line' || m.kind === 'straight' || m.kind === 'point') {
    const els = m.order.map((k) => m.els[k]);
    const rho = m.kind === 'point' ? h % 360 : (h % 25) - 12;
    let c = 0;
    const rays = [rho];
    for (const e of els) { specs.push({ el: e, apex: [0, 0], a1: rho + c, span: valueOf(e) }); c += valueOf(e); rays.push(rho + c); }
    if (m.kind === 'point') rays.pop();
    for (const a of rays) lines.push([[0, 0], dir(a)]);
    dot = [0, 0];
    if (m.kind === 'straight') {
      tags.push({ p: dir(rho).map((v) => v * 1.13), text: 'Y' }, { p: dir(rho + c).map((v) => v * 1.13), text: 'X' });
    }
  } else {
    const alpha = m.order.map((k) => valueOf(m.els[k]));
    const q = quadPoints(alpha, (h % 21) - 10);
    if (!q) throw new Error('the quadrilateral does not close');
    const { V, th } = q;
    polygon = V;
    m.order.forEach((k, i) => specs.push({ el: m.els[k], apex: V[i], a1: th[i], span: alpha[i] }));
    sMax = 210;
    if (m.els.ext) {
      const k = m.els.ext.at;
      const back = k === 0 ? th[3] - 360 : th[k - 1];
      const len = 0.5 * (q.sides.reduce((s, x) => s + x, 0) / 4);
      const end = [V[k][0] + len * dir(back)[0], V[k][1] + len * dir(back)[1]];
      lines.push([V[k], end]);
      specs.push({ el: m.els.ext, apex: V[k], a1: back, span: 180 - alpha[k] });
    }
  }

  // Each wedge: arc radius and label distance in PIXELS (they do not scale).
  // A letter's label is laid out for its value too ("116°"): once found, the
  // value is drawn where the letter was.
  const wedgeOf = (sp) => {
    const t = textOf(sp.el);
    const fit = sp.el.letter ? `${valueOf(sp.el)}°` : t;
    const half = rad(Math.min(sp.span, 180) / 2);
    const r = sp.el.right ? 20 : sp.span < 40 ? 34 : 28;
    const need = sp.el.right ? 34 : (textW(fit) / 2 + 7) / Math.max(Math.sin(half), 0.2);
    const d = Math.min(Math.max(need, r + 16), 118);
    return { ...sp, text: t, fit, r, d, bis: sp.a1 + sp.span / 2 };
  };
  const ws = specs.map(wedgeOf);

  // Largest scale that fits 440 × 320 with the labels.
  const box = (s) => {
    let x0 = Infinity; let x1 = -Infinity; let y0 = Infinity; let y1 = -Infinity;
    const add = (x, y, hw = 0, hh = 0) => { x0 = Math.min(x0, x - hw); x1 = Math.max(x1, x + hw); y0 = Math.min(y0, y - hh); y1 = Math.max(y1, y + hh); };
    for (const [p, q] of lines) { add(p[0] * s, p[1] * s); add(q[0] * s, q[1] * s); }
    if (polygon) for (const p of polygon) add(p[0] * s, p[1] * s);
    for (const w of ws) { const [ux, uy] = dir(w.bis); add(w.apex[0] * s + w.d * ux, w.apex[1] * s + w.d * uy, Math.max(textW(w.fit) / 2, 14), 15); }
    for (const t of tags) add(t.p[0] * s, t.p[1] * s, 12, 14);
    return { x0, x1, y0, y1 };
  };
  let lo = 20; let hi = sMax;
  for (let i = 0; i < 30; i += 1) {
    const mid = (lo + hi) / 2;
    const b = box(mid);
    if (b.x1 - b.x0 <= 440 - 2 * PAD && b.y1 - b.y0 <= 320 - 2 * PAD) lo = mid; else hi = mid;
  }
  const s = lo;
  const b = box(s);
  const X = (x) => r1(x - b.x0 + PAD);
  const Y = (y) => r1(b.y1 - y + PAD);
  const pt = (p) => [X(p[0] * s), Y(p[1] * s)];
  const at = (apex, a, dist) => { const [ux, uy] = dir(a); return [X(apex[0] * s + dist * ux), Y(apex[1] * s + dist * uy)]; };

  const wedges = ws.map((w) => {
    const [ax, ay] = pt(w.apex);
    const [sx, sy] = at(w.apex, w.a1, w.r);
    const [ex, ey] = at(w.apex, w.a1 + w.span, w.r);
    const [lx, ly] = at(w.apex, w.bis, w.d);
    const out = { key: w.el.key, text: w.text, fit: w.fit, right: !!w.el.right, letter: w.el.letter || null, ext: !!w.el.ext, span: w.span, lx, ly, ax, ay, r: w.r };
    out.path = `M ${ax} ${ay} L ${sx} ${sy} A ${w.r} ${w.r} 0 ${w.span > 180 ? 1 : 0} 0 ${ex} ${ey} Z`;
    if (w.el.right) {
      const [px, py] = at(w.apex, w.a1, 18);
      const c = at(w.apex, w.a1 + 45, 18 * Math.SQRT2);
      const [qx, qy] = at(w.apex, w.a1 + 90, 18);
      out.box = `M ${px} ${py} L ${c[0]} ${c[1]} L ${qx} ${qy}`;
    }
    return out;
  });
  return {
    w: r1(b.x1 - b.x0 + 2 * PAD),
    h: r1(b.y1 - b.y0 + 2 * PAD),
    segs: lines.map(([p, q], i) => ({ id: i, p: pt(p), q: pt(q), ext: !!polygon })),
    polygon: polygon ? polygon.map(pt) : null,
    dot: dot ? pt(dot) : null,
    wedges,
    tags: tags.map((t) => ({ text: t.text, p: pt(t.p) })),
    scale: s,
  };
}
