/**
 * Label It — the pure parts. `LabelIt.jsx` renders; this file strips the
 * printed labels off an authored diagram, lays out the blank label boxes,
 * grades a set of placements, and checks an item's data for the validator.
 *
 * The task looks like an exam paper: the drawing is left whole, and each part
 * to name has a leader line running out to an empty box in the margin. The box
 * sits where the printed label sat, so the pin never covers what it points at.
 *
 * Item shape (docs/y7-science/ENGAGEMENT-PLAN.md §2.2):
 *   { id, title, titleVn, titleFr?, inlineSvg, viewBox: '0 0 760 430',
 *     image?: 'images/…/x.jpg',  // instead of inlineSvg: a picture whose labels
 *                                // are already painted out; viewBox = its size
 *     font?: 16,       // label size in viewBox units (default from the viewBox)
 *     slotW?: 200,     // box width; longer labels wrap (default: the widest label)
 *     pins: [{ id, x, y, answer,
 *              to?: [x, y] | [[x, y], …],   // the part(s) the leader line reaches
 *              side?: 'left'|'right'|'above'|'below'|'center' }],
 *     bank: [{ val, text, textVn, textFr? }] } // at least one distractor
 *
 * (x, y) is where the leader line meets the box, and `side` is the way the box
 * grows from there: 'left' puts the box in the LEFT margin (its right edge on
 * the point), 'below' hangs it under the point, 'center' centres it on the
 * point (a caption with no leader). With no `side`, a pin with `to` grows away
 * from the part and a pin without one is centred.
 */

export const SIDES = ['left', 'right', 'above', 'below', 'center'];

/**
 * Remove the printed labels from an SVG string: every <text>, plus anything
 * tagged `class="lbl"` — leader lines, their end dots, legend swatches — so a
 * stripped diagram has no stray lines pointing at nothing. Text that is part of
 * the drawing rather than a label (the numbers on a scale, the symbol in a
 * Periodic Table square) is tagged `class="keep"` and survives.
 */
const KEEP = /\bclass="[^"]*\bkeep\b[^"]*"/;
export function stripLabels(svg) {
  return String(svg || '')
    .replace(/<g\b[^>]*\bclass="[^"]*\blbl\b[^"]*"[^>]*>[\s\S]*?<\/g>/g, '')
    .replace(/<(\w+)\b[^>]*\bclass="[^"]*\blbl\b[^"]*"[^>]*\/>/g, '')
    .replace(/<text\b([^>]*)>[\s\S]*?<\/text>/g, (whole, attrs) => (KEEP.test(attrs) ? whole : ''))
    .replace(/<text\b([^>]*)\/>/g, (whole, attrs) => (KEEP.test(attrs) ? whole : ''));
}

/** The viewBox a pin's coordinates live in, parsed. */
export function viewBoxOf(item) {
  const src = item?.viewBox || (String(item?.inlineSvg || '').match(/viewBox="([^"]+)"/) || [])[1];
  if (!src) return null;
  const [x, y, w, h] = String(src).split(/[\s,]+/).map(Number);
  if (![x, y, w, h].every(Number.isFinite) || w <= 0 || h <= 0) return null;
  return { x, y, w, h, str: `${x} ${y} ${w} ${h}` };
}

/**
 * Label size in viewBox units: about 16px on a laptop, where the diagram is
 * height-capped at 60vh of an 800px screen inside a ~990px column.
 */
export function fontFor(item, vb = viewBoxOf(item)) {
  if (Number.isFinite(item?.font) && item.font > 0) return item.font;
  if (!vb) return 16;
  const shown = Math.min(990, (vb.w / vb.h) * 480);
  return Math.round((16 * vb.w) / shown * 10) / 10;
}

/** `to` normalised to a list of [x, y] points. */
export function targetsOf(pin) {
  const t = pin?.to;
  if (!Array.isArray(t) || !t.length) return [];
  return Array.isArray(t[0]) ? t : [t];
}

export function sideOf(pin) {
  if (SIDES.includes(pin?.side)) return pin.side;
  const [first] = targetsOf(pin);
  if (!first) return 'center';
  const dx = first[0] - pin.x;
  const dy = first[1] - pin.y;
  if (Math.abs(dx) >= Math.abs(dy)) return dx > 0 ? 'left' : 'right';
  return dy > 0 ? 'above' : 'below';
}

/**
 * The width of `text` at `font`, from a per-character table of a bold system
 * sans (Segoe UI 800, measured, then rounded UP so SF Pro on an iPad fits too).
 * The renderer AND the validator both lay boxes out with this, so a layout the
 * validator passes is the layout a student sees — no canvas, no drift.
 */
const NARROW = new Set([...'ijlI.,:;!|\'’']);
const SLIM = new Set([...'frt₂₃₄³²']);
const MID = new Set([...'scz1']);
export function approxWidth(text, font) {
  let em = 0;
  for (const ch of String(text)) {
    if (ch === ' ') em += 0.3;
    else if (NARROW.has(ch)) em += 0.35;
    else if (SLIM.has(ch)) em += 0.47;
    else if (MID.has(ch)) em += 0.54;
    else if ('()-–/'.includes(ch)) em += 0.45;
    else if ('mw'.includes(ch)) em += 0.98;
    else if ('MW—%'.includes(ch)) em += 1.07;
    else if (ch >= 'A' && ch <= 'Z') em += 0.78;
    else em += 0.66;
  }
  return em * font;
}

/** Greedy word wrap of `text` into lines no wider than `maxW`. */
export function wrap(text, maxW, measure) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (line && measure(next) > maxW) { lines.push(line); line = w; } else line = next;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

/**
 * Every box's rectangle, one size for the whole diagram so a box's width never
 * gives its answer away. Sized to the widest label in ANY language (French
 * only where the item has it), so the language toggle never moves a box.
 * `measure(text, font)` → width.
 */
export function layout(item, measure = approxWidth) {
  const vb = viewBoxOf(item) || { x: 0, y: 0, w: 100, h: 100 };
  const font = fontFor(item, vb);
  const padX = font * 0.6;
  const padY = font * 0.42;
  const lineH = font * 1.22;
  const m = (s) => measure(s, font);
  const texts = (item.bank || []).flatMap((b) => [b.text, b.textVn, b.textFr].filter(Boolean));
  const widest = Math.max(font * 4, ...texts.map(m));
  const inner = Number.isFinite(item.slotW) ? item.slotW - 2 * padX : Math.min(widest, font * 12);
  const w = inner + 2 * padX;
  const linesOf = (s) => wrap(s, inner, m);
  const rows = Math.max(1, ...texts.map((s) => linesOf(s).length));
  const h = rows * lineH + 2 * padY;
  const boxes = (item.pins || []).map((p) => {
    const side = sideOf(p);
    const x0 = side === 'left' ? p.x - w : side === 'right' ? p.x : p.x - w / 2;
    const y0 = side === 'above' ? p.y - h : side === 'below' ? p.y : p.y - h / 2;
    return { id: p.id, side, x: x0, y: y0, w, h, cx: x0 + w / 2, cy: y0 + h / 2, to: targetsOf(p) };
  });
  return { vb, font, padX, padY, lineH, w, h, rows, linesOf, boxes };
}

/** Pairs of boxes that overlap, and boxes that leave the viewBox — as strings. */
export function layoutProblems(item, measure = approxWidth) {
  const { vb, boxes } = layout(item, measure);
  const out = [];
  for (const b of boxes) {
    if (b.x < vb.x || b.y < vb.y || b.x + b.w > vb.x + vb.w || b.y + b.h > vb.y + vb.h) {
      out.push(`${item.id}: box ${b.id} (${Math.round(b.x)},${Math.round(b.y)} ${Math.round(b.w)}×${Math.round(b.h)}) runs off the viewBox`);
    }
  }
  for (let i = 0; i < boxes.length; i += 1) {
    for (let j = i + 1; j < boxes.length; j += 1) {
      const a = boxes[i];
      const b = boxes[j];
      if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h) out.push(`${item.id}: boxes ${a.id} and ${b.id} overlap`);
    }
  }
  return out;
}

/** Grade placements `{ pinId: val }` → `{ perPin: { [pinId]: boolean }, correct, total }`. */
export function grade(item, placements = {}) {
  const perPin = {};
  let correct = 0;
  for (const pin of item.pins || []) {
    const ok = placements[pin.id] != null && placements[pin.id] === pin.answer;
    perPin[pin.id] = ok;
    if (ok) correct += 1;
  }
  return { perPin, correct, total: (item.pins || []).length };
}

/** Problems with one item, as strings. Empty when it is sound. */
export function checkItem(item) {
  const out = [];
  if (!item || typeof item !== 'object') return ['item is not an object'];
  const at = item.id || '?';
  if (!item.id) out.push('has no id');
  if (!item.inlineSvg && !item.image) out.push(`${at}: has no inlineSvg (or image)`);
  if (item.image && !item.viewBox) out.push(`${at}: an image item needs viewBox: '0 0 <width> <height>' — the picture's own size`);
  const vb = viewBoxOf(item);
  if (!vb) out.push(`${at}: no usable viewBox (set item.viewBox to match the svg)`);
  const bank = item.bank || [];
  if (bank.length < 2) out.push(`${at}: bank needs at least 2 labels`);
  const vals = new Set();
  for (const b of bank) {
    if (!b?.val || !b?.text) out.push(`${at}: bank entry needs val and text`);
    if (vals.has(b?.val)) out.push(`${at}: duplicate bank val "${b.val}"`);
    vals.add(b?.val);
  }
  const pins = item.pins || [];
  if (pins.length < 2) out.push(`${at}: needs at least 2 pins`);
  const pinIds = new Set();
  const inside = (x, y) => !vb || (x >= vb.x && x <= vb.x + vb.w && y >= vb.y && y <= vb.y + vb.h);
  for (const p of pins) {
    if (!p?.id) out.push(`${at}: a pin has no id`);
    if (pinIds.has(p?.id)) out.push(`${at}: duplicate pin id "${p.id}"`);
    pinIds.add(p?.id);
    if (!Number.isFinite(p?.x) || !Number.isFinite(p?.y)) out.push(`${at}: pin ${p?.id} needs numeric x and y`);
    else if (!inside(p.x, p.y)) out.push(`${at}: pin ${p.id} (${p.x}, ${p.y}) is outside the viewBox`);
    if (p?.side !== undefined && !SIDES.includes(p.side)) out.push(`${at}: pin ${p.id} side "${p.side}" is not one of ${SIDES.join('/')}`);
    if (p?.to !== undefined) {
      const pts = targetsOf(p);
      if (!pts.length) out.push(`${at}: pin ${p.id} to must be [x, y] or a list of them`);
      for (const pt of pts) {
        if (!Array.isArray(pt) || pt.length !== 2 || !pt.every(Number.isFinite)) out.push(`${at}: pin ${p.id} has a bad to point`);
        else if (!inside(pt[0], pt[1])) out.push(`${at}: pin ${p.id} to (${pt}) is outside the viewBox`);
      }
    }
    if (!vals.has(p?.answer)) out.push(`${at}: pin ${p?.id} answer "${p?.answer}" is not in the bank`);
  }
  const answers = new Set(pins.map((p) => p.answer));
  if (bank.length <= answers.size) out.push(`${at}: no distractor — add a label that belongs to no pin`);
  if (!out.length && vb) out.push(...layoutProblems(item));
  return out;
}

export function checkAll(items) {
  if (!Array.isArray(items)) return ['labelIt must be an array'];
  const out = [];
  const ids = new Set();
  for (const it of items) {
    if (ids.has(it?.id)) out.push(`duplicate item id "${it.id}"`);
    ids.add(it?.id);
    out.push(...checkItem(it));
  }
  return out;
}
