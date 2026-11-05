// Small SVG figures for step-practice sets, drawn from numbers so an author
// (or Claude) writes `numberLine({ min: -5, max: 6, given: [-3, 5] })` instead
// of hand-placing ticks. Colours: given teal, to find orange, ink slate —
// the same as the screen. Light ground only (figures are not theme-flipped).

const INK = '#1e293b';
const MUTED = '#64748b';
const GIVEN = '#0087a8';
const FIND = '#e8590c';
const minus = (n) => (n < 0 ? `−${-n}` : `${n}`);

/**
 * A horizontal number line. given / find: numbers marked teal / orange
 * (a find point shows "?" unless `findLabel` is false); jumps: [{ from, to }]
 * drawn as arcs above the line (orange).
 */
export function numberLine({ min, max, given = [], find = [], jumps = [], unit = '' }) {
  const n = max - min;
  const W = 560; const pad = 30; const step = (W - 2 * pad) / n;
  const y = jumps.length ? 74 : 24; const H = y + (find.length ? 66 : 44);
  const x = (v) => pad + (v - min) * step;
  const ticks = [];
  for (let v = min; v <= max; v += 1) {
    const zero = v === 0;
    ticks.push(`<line x1="${x(v)}" y1="${y - (zero ? 9 : 6)}" x2="${x(v)}" y2="${y + (zero ? 9 : 6)}" stroke="${INK}" stroke-width="${zero ? 3 : 2}"/>`);
    const g = given.includes(v);
    ticks.push(`<text x="${x(v)}" y="${y + 28}" text-anchor="middle" font-family="ui-monospace, monospace" font-size="${g ? 17 : 15}" font-weight="${zero || g ? 800 : 600}" fill="${g ? GIVEN : zero ? INK : MUTED}">${minus(v)}${g ? unit : ''}</text>`);
  }
  const dots = [
    ...given.map((v) => `<circle cx="${x(v)}" cy="${y}" r="9" fill="${GIVEN}"/>`),
    ...find.map((v) => `<circle cx="${x(v)}" cy="${y}" r="9" fill="#fff" stroke="${FIND}" stroke-width="3"/><text x="${x(v)}" y="${y + 50}" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="14" font-weight="800" fill="${FIND}">?</text>`),
  ];
  const arcs = jumps.map(({ from, to }) => {
    const a = x(from); const b = x(to); const h = Math.min(46, 14 + Math.abs(b - a) / 6);
    const mid = (a + b) / 2;
    return `<path d="M ${a} ${y - 10} Q ${mid} ${y - 10 - 2 * h} ${b} ${y - 10}" fill="none" stroke="${FIND}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#nl-arrow)"/>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="number line from ${min} to ${max}">`
    + `<defs><marker id="nl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${FIND}"/></marker></defs>`
    + `<line x1="${pad - 16}" y1="${y}" x2="${W - pad + 16}" y2="${y}" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`
    + ticks.join('') + arcs.join('') + dots.join('') + '</svg>';
}

/**
 * The floors of a building, as a vertical number line: 0 is the ground,
 * negative floors are under it (shaded brown). given / find as above.
 */
export function floors({ min, max, given = [], find = [], groundWord = 'ground' }) {
  const rows = max - min + 1; const h = 30; const top = 14; const H = top * 2 + rows * h;
  const yOf = (v) => top + (max - v) * h + h / 2;
  const parts = [];
  parts.push(`<rect x="70" y="${yOf(-1) - h / 2}" width="150" height="${(0 - min) * h}" fill="#f1e5d8"/>`);
  parts.push(`<rect x="70" y="${top}" width="150" height="${rows * h}" fill="none" stroke="${INK}" stroke-width="2.5" rx="4"/>`);
  for (let v = min; v <= max; v += 1) {
    const y = yOf(v);
    if (v < max) parts.push(`<line x1="70" y1="${y - h / 2 + h}" x2="220" y2="${y - h / 2 + h}" stroke="#cbd5e1" stroke-width="1.5"/>`);
    parts.push(`<text x="58" y="${y + 5}" text-anchor="end" font-family="ui-monospace, monospace" font-size="15" font-weight="${v === 0 ? 800 : 600}" fill="${v === 0 ? INK : MUTED}">${minus(v)}</text>`);
  }
  parts.push(`<line x1="40" y1="${yOf(0) + h / 2}" x2="250" y2="${yOf(0) + h / 2}" stroke="#7c5a3a" stroke-width="3"/>`);
  parts.push(`<text x="255" y="${yOf(0) + h / 2 + 5}" font-family="ui-sans-serif, sans-serif" font-size="13" font-weight="700" fill="#7c5a3a">${groundWord}</text>`);
  for (const v of given) parts.push(`<circle cx="145" cy="${yOf(v)}" r="9" fill="${GIVEN}"/>`);
  for (const v of find) parts.push(`<circle cx="145" cy="${yOf(v)}" r="9" fill="#fff" stroke="${FIND}" stroke-width="3"/><text x="145" y="${yOf(v) + 5}" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="13" font-weight="800" fill="${FIND}">?</text>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 ${H}" role="img" aria-label="floors ${min} to ${max}">${parts.join('')}</svg>`;
}
