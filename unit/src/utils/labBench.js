/**
 * Lab Bench — the generative measuring-skill task, pure parts.
 *
 * A round is drawn fresh every time (`makeRound(mode, rng)`), rendered as an
 * SVG string (`drawRound`), and marked against the number it was drawn from
 * (`markAnswer`). Nothing is authored per round: a unit declares which modes it
 * uses and how many rounds a session has —
 *
 *   labBench: { modes: ['cylinder', 'thermometer', 'curve'], rounds: 8 }
 *
 * Modes:
 *   cylinder     read a measuring cylinder at the bottom of the meniscus (cm³)
 *   thermometer  read a thermometer at the top of the liquid (°C)
 *   curve        read a heating curve: temperature at minute N, or the minute
 *                boiling began (the plateau)
 *
 * The validator calls `checkConfig`; LabBench.jsx calls the rest.
 */

export const MODES = ['cylinder', 'thermometer', 'curve'];

/** A small seedable RNG so a session can be replayed (and tested). */
export function rngFrom(seed = Date.now()) {
  let s = (Number(seed) >>> 0) || 1;
  return () => {
    s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}
const pickOne = (rng, list) => list[Math.floor(rng() * list.length)];
const between = (rng, lo, hi, step) => lo + step * Math.floor(rng() * (Math.floor((hi - lo) / step) + 1));

// ── cylinder ─────────────────────────────────────────────────────────────────

const CYL_SCALES = [
  { capacity: 100, major: 10, minor: 2 },
  { capacity: 100, major: 10, minor: 5 },
  { capacity: 50, major: 10, minor: 1 },
  { capacity: 250, major: 50, minor: 10 },
];

function makeCylinder(rng) {
  const scale = pickOne(rng, CYL_SCALES);
  const volume = between(rng, scale.minor * 2, scale.capacity - scale.minor, scale.minor);
  return {
    mode: 'cylinder',
    scale,
    answer: volume,
    unit: 'cm³',
    ask: 'What volume of liquid is in the measuring cylinder? Read the bottom of the meniscus.',
    askVn: 'Thể tích chất lỏng trong ống đong là bao nhiêu? Đọc ở đáy mặt khum.',
    askFr: "Quel volume de liquide y a-t-il dans l'éprouvette graduée ? Lis le bas du ménisque.",
    tolerance: 0,
    why: `The bottom of the meniscus sits on the ${volume} line. Each small line is ${scale.minor} cm³.`,
    whyVn: `Đáy mặt khum nằm ở vạch ${volume}. Mỗi vạch nhỏ là ${scale.minor} cm³.`,
    whyFr: `Le bas du ménisque est sur le trait ${volume}. Chaque petit trait vaut ${scale.minor} cm³.`,
  };
}

function drawCylinder(r) {
  const { capacity, major, minor } = r.scale;
  const W = 300; const H = 440;
  const left = 110; const right = 190; const top = 40; const bottom = 400;
  const yOf = (v) => bottom - ((bottom - top - 20) * v) / capacity;
  const level = yOf(r.answer);
  const ticks = [];
  for (let v = 0; v <= capacity; v += minor) {
    const isMajor = v % major === 0;
    const len = isMajor ? 22 : (v % (minor * 2) === 0 && minor < major / 2 ? 14 : 10);
    ticks.push(`<line x1="${right - len}" y1="${yOf(v)}" x2="${right}" y2="${yOf(v)}" stroke="#334155" stroke-width="${isMajor ? 2 : 1.2}"/>`);
    if (isMajor) ticks.push(`<text x="${right + 10}" y="${yOf(v) + 5}" font-size="14" font-weight="700" fill="#334155" font-family="ui-sans-serif, system-ui, sans-serif">${v}</text>`);
  }
  // The meniscus is a quadratic curve whose edges sit `m` above the answer
  // line and whose control point sits `m` below it, so the curve's lowest
  // point — the one the student is told to read — lands exactly on `level`.
  const m = 6;
  const curve = `M ${left + 3} ${level - m} Q ${(left + right) / 2} ${level + m} ${right - 3} ${level - m}`;
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>
  <path d="M ${left} ${top} L ${left} ${bottom} Q ${left} ${bottom + 14} ${left + 14} ${bottom + 14} L ${right - 14} ${bottom + 14} Q ${right} ${bottom + 14} ${right} ${bottom} L ${right} ${top}" fill="#f1f5f9" stroke="#334155" stroke-width="3"/>
  <path d="${curve} L ${right - 3} ${bottom} Q ${right - 3} ${bottom + 11} ${right - 14} ${bottom + 11} L ${left + 14} ${bottom + 11} Q ${left + 3} ${bottom + 11} ${left + 3} ${bottom} Z" fill="#7dd3fc" opacity="0.85"/>
  <path d="${curve}" fill="none" stroke="#0369a1" stroke-width="2.5"/>
  ${ticks.join('\n  ')}
  <text x="${left - 12}" y="${top - 12}" font-size="13" font-weight="800" fill="#64748b" font-family="ui-sans-serif, system-ui, sans-serif">cm³</text>
  <line x1="${left - 40}" y1="${level}" x2="${left + 3}" y2="${level}" stroke="#ea580c" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="${left - 44}" y="${level + 5}" text-anchor="end" font-size="12" font-weight="800" fill="#ea580c" font-family="ui-sans-serif, system-ui, sans-serif">eye level</text>
</svg>`;
}

// ── thermometer ──────────────────────────────────────────────────────────────

const THERM_SCALES = [
  { min: -10, max: 110, major: 10, minor: 2 },
  { min: 0, max: 100, major: 10, minor: 5 },
  { min: -20, max: 50, major: 10, minor: 1 },
];

function makeThermometer(rng) {
  const scale = pickOne(rng, THERM_SCALES);
  const temp = between(rng, scale.min + scale.minor, scale.max - scale.minor, scale.minor);
  return {
    mode: 'thermometer',
    scale,
    answer: temp,
    unit: '°C',
    ask: 'What temperature does the thermometer show? Read the top of the liquid.',
    askVn: 'Nhiệt kế chỉ bao nhiêu độ? Đọc ở đỉnh cột chất lỏng.',
    askFr: 'Quelle température indique le thermomètre ? Lis le haut du liquide.',
    tolerance: 0,
    why: `The top of the liquid is level with the ${temp} line. Each small line is ${scale.minor} °C.`,
    whyVn: `Đỉnh cột chất lỏng ngang với vạch ${temp}. Mỗi vạch nhỏ là ${scale.minor} °C.`,
    whyFr: `Le haut du liquide est au niveau du trait ${temp}. Chaque petit trait vaut ${scale.minor} °C.`,
  };
}

function drawThermometer(r) {
  const { min, max, major, minor } = r.scale;
  const W = 300; const H = 440;
  const cx = 150; const top = 30; const bottom = 360; const tubeW = 18;
  const yOf = (v) => bottom - ((bottom - top) * (v - min)) / (max - min);
  const ticks = [];
  for (let v = min; v <= max; v += minor) {
    const isMajor = v % major === 0;
    const len = isMajor ? 20 : 9;
    ticks.push(`<line x1="${cx + tubeW / 2 + 4}" y1="${yOf(v)}" x2="${cx + tubeW / 2 + 4 + len}" y2="${yOf(v)}" stroke="#334155" stroke-width="${isMajor ? 2 : 1.2}"/>`);
    if (isMajor) ticks.push(`<text x="${cx + tubeW / 2 + 32}" y="${yOf(v) + 5}" font-size="14" font-weight="700" fill="#334155" font-family="ui-sans-serif, system-ui, sans-serif">${v}</text>`);
  }
  const level = yOf(r.answer);
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="${cx - tubeW / 2 - 8}" y="${top - 14}" width="${tubeW + 16}" height="${bottom - top + 40}" rx="14" fill="#f1f5f9" stroke="#334155" stroke-width="3"/>
  <circle cx="${cx}" cy="${bottom + 42}" r="30" fill="#f1f5f9" stroke="#334155" stroke-width="3"/>
  <rect x="${cx - tubeW / 2}" y="${top}" width="${tubeW}" height="${bottom - top + 30}" rx="9" fill="#e2e8f0"/>
  <rect x="${cx - tubeW / 2}" y="${level}" width="${tubeW}" height="${bottom - level + 30}" rx="9" fill="#ef4444"/>
  <circle cx="${cx}" cy="${bottom + 42}" r="24" fill="#ef4444"/>
  ${ticks.join('\n  ')}
  <text x="${cx + tubeW / 2 + 32}" y="${top - 18}" font-size="13" font-weight="800" fill="#64748b" font-family="ui-sans-serif, system-ui, sans-serif">°C</text>
  <line x1="${cx - 70}" y1="${level}" x2="${cx - tubeW / 2 - 10}" y2="${level}" stroke="#ea580c" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="${cx - 74}" y="${level + 5}" text-anchor="end" font-size="12" font-weight="800" fill="#ea580c" font-family="ui-sans-serif, system-ui, sans-serif">eye level</text>
</svg>`;
}

// ── heating curve ────────────────────────────────────────────────────────────

function makeCurve(rng) {
  const start = between(rng, 10, 40, 5);
  const rate = between(rng, 3, 8, 1);          // °C per minute
  const boilAt = Math.ceil((100 - start) / rate); // first whole minute at 100
  const total = boilAt + between(rng, 3, 5, 1);
  const kind = rng() < 0.55 ? 'at' : 'boil';
  let ask; let askVn; let askFr; let answer; let why; let whyVn; let whyFr; let unit;
  if (kind === 'at') {
    const n = between(rng, 1, boilAt - 1, 1);
    answer = Math.min(100, start + rate * n);
    unit = '°C';
    ask = `What was the temperature after ${n} minutes?`;
    askVn = `Nhiệt độ sau ${n} phút là bao nhiêu?`;
    askFr = `Quelle était la température après ${n} minute${n === 1 ? '' : 's'} ?`;
    why = `Go up from ${n} minutes on the horizontal axis to the line, then across to the vertical axis: ${answer} °C. The water started at ${start} °C and rose ${rate} °C every minute.`;
    whyVn = `Từ ${n} phút trên trục ngang đi lên đến đường đồ thị, rồi sang trục dọc: ${answer} °C. Nước bắt đầu ở ${start} °C và tăng ${rate} °C mỗi phút.`;
    whyFr = `Pars de ${n} minute${n === 1 ? '' : 's'} sur l'axe horizontal, monte jusqu'à la courbe, puis va jusqu'à l'axe vertical : ${answer} °C. L'eau était à ${start} °C au départ et a gagné ${rate} °C chaque minute.`;
  } else {
    answer = boilAt;
    unit = 'min';
    ask = 'After how many minutes did the water reach its boiling point and stop getting hotter?';
    askVn = 'Sau bao nhiêu phút nước đạt nhiệt độ sôi và ngừng nóng thêm?';
    askFr = "Au bout de combien de minutes l'eau a-t-elle atteint sa température d'ébullition et cessé de chauffer ?";
    why = `The line goes flat at 100 °C — the boiling point — from ${boilAt} minutes on. The heat is turning water into steam instead of raising the temperature.`;
    whyVn = `Đường đồ thị nằm ngang ở 100 °C — nhiệt độ sôi — từ phút ${boilAt} trở đi. Nhiệt đang biến nước thành hơi thay vì làm tăng nhiệt độ.`;
    whyFr = `La courbe devient plate à 100 °C — la température d'ébullition — à partir de ${boilAt} minutes. L'énergie thermique transforme l'eau en vapeur au lieu de faire monter la température.`;
  }
  return { mode: 'curve', start, rate, boilAt, total, kind, answer, unit, ask, askVn, askFr, tolerance: kind === 'at' ? 2 : 0, why, whyVn, whyFr };
}

function drawCurve(r) {
  const W = 520; const H = 360;
  const left = 70; const right = 490; const top = 30; const bottom = 300;
  const xOf = (m) => left + ((right - left) * m) / r.total;
  const yOf = (t) => bottom - ((bottom - top) * t) / 110;
  const grid = [];
  for (let t = 0; t <= 110; t += 10) {
    grid.push(`<line x1="${left}" y1="${yOf(t)}" x2="${right}" y2="${yOf(t)}" stroke="${t % 20 === 0 ? '#cbd5e1' : '#e2e8f0'}" stroke-width="1"/>`);
    if (t % 20 === 0) grid.push(`<text x="${left - 10}" y="${yOf(t) + 5}" text-anchor="end" font-size="13" font-weight="700" fill="#334155" font-family="ui-sans-serif, system-ui, sans-serif">${t}</text>`);
  }
  for (let m = 0; m <= r.total; m += 1) {
    grid.push(`<line x1="${xOf(m)}" y1="${top}" x2="${xOf(m)}" y2="${bottom}" stroke="#e2e8f0" stroke-width="1"/>`);
    grid.push(`<text x="${xOf(m)}" y="${bottom + 20}" text-anchor="middle" font-size="13" font-weight="700" fill="#334155" font-family="ui-sans-serif, system-ui, sans-serif">${m}</text>`);
  }
  const pts = [];
  for (let m = 0; m <= r.total; m += 1) pts.push(`${xOf(m)},${yOf(Math.min(100, r.start + r.rate * m))}`);
  const dots = [];
  for (let m = 0; m <= r.total; m += 1) dots.push(`<circle cx="${xOf(m)}" cy="${yOf(Math.min(100, r.start + r.rate * m))}" r="4" fill="#0ea5e9"/>`);
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>
  ${grid.join('\n  ')}
  <line x1="${left}" y1="${top}" x2="${left}" y2="${bottom}" stroke="#334155" stroke-width="2.5"/>
  <line x1="${left}" y1="${bottom}" x2="${right}" y2="${bottom}" stroke="#334155" stroke-width="2.5"/>
  <polyline points="${pts.join(' ')}" fill="none" stroke="#0ea5e9" stroke-width="3.5" stroke-linejoin="round"/>
  ${dots.join('\n  ')}
  <text x="${(left + right) / 2}" y="${H - 8}" text-anchor="middle" font-size="14" font-weight="800" fill="#334155" font-family="ui-sans-serif, system-ui, sans-serif">time (minutes)</text>
  <text x="18" y="${(top + bottom) / 2}" text-anchor="middle" font-size="14" font-weight="800" fill="#334155" font-family="ui-sans-serif, system-ui, sans-serif" transform="rotate(-90 18 ${(top + bottom) / 2})">temperature (°C)</text>
</svg>`;
}

// ── public API ───────────────────────────────────────────────────────────────

export function makeRound(mode, rng = rngFrom()) {
  switch (mode) {
    case 'cylinder': return makeCylinder(rng);
    case 'thermometer': return makeThermometer(rng);
    case 'curve': return makeCurve(rng);
    default: throw new Error(`unknown Lab Bench mode "${mode}"`);
  }
}

export function drawRound(round) {
  switch (round.mode) {
    case 'cylinder': return drawCylinder(round);
    case 'thermometer': return drawThermometer(round);
    case 'curve': return drawCurve(round);
    default: return '';
  }
}

/** A session: `rounds` rounds cycling through the modes, each drawn fresh. */
export function makeSession(config, seed) {
  const rng = rngFrom(seed);
  const modes = (config?.modes || []).filter((m) => MODES.includes(m));
  const n = Math.max(1, Math.min(20, Number(config?.rounds) || 8));
  const out = [];
  for (let i = 0; i < n; i += 1) out.push(makeRound(modes[i % modes.length], rng));
  return out;
}

/** Whether a typed answer matches the round (within its tolerance). */
export function markAnswer(round, input) {
  // Read the FIRST number, not every digit on the line: stripping non-digits
  // turned "24cm3" into 243, and a typeset minus (−5, what a phone keyboard
  // offers) into +5. A decimal comma is accepted as a point.
  const m = String(input ?? '').replace(/[−–]/g, '-').replace(',', '.').match(/-?\d*\.?\d+/);
  if (!m) return false;
  const v = Number(m[0]);
  if (!Number.isFinite(v)) return false;
  return Math.abs(v - round.answer) <= (round.tolerance || 0);
}

/** Validator: problems with a unit's labBench config. */
export function checkConfig(cfg) {
  const out = [];
  if (!cfg || typeof cfg !== 'object') return ['labBench must be an object'];
  const modes = cfg.modes || [];
  if (!Array.isArray(modes) || !modes.length) out.push('labBench.modes must list at least one mode');
  for (const m of modes) if (!MODES.includes(m)) out.push(`labBench mode "${m}" — known modes: ${MODES.join('/')}`);
  if (cfg.rounds !== undefined && !(Number(cfg.rounds) >= 1 && Number(cfg.rounds) <= 20)) out.push('labBench.rounds must be 1–20');
  // prove every mode draws and marks against itself
  try {
    const rng = rngFrom(7);
    for (const m of modes.filter((x) => MODES.includes(x))) {
      for (let i = 0; i < 25; i += 1) {
        const r = makeRound(m, rng);
        if (!drawRound(r).includes('<svg')) out.push(`labBench mode "${m}" drew no svg`);
        if (!markAnswer(r, r.answer)) out.push(`labBench mode "${m}" does not accept its own answer`);
      }
    }
  } catch (e) {
    out.push(`labBench threw: ${e.message}`);
  }
  return out;
}
