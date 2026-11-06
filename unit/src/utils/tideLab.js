/**
 * Tide Lab (TIDE_LAB, p88) — Y7 Science 3.4 Tides and the River Tide Lab, at
 * home. The pure part: a river made by the 3.4 model, and every round derived
 * from an item and a seed. utils/tideLabMark.js marks the answers and names the
 * slips; utils/tideLabCheck.js proves both.
 *
 * THE RIVER. Read at the lab's four times (8:30, 10:30, 12:30, 2:30), to the
 * nearest 5 cm (a pole marked every 10 cm shows halfway). Two tides a day, one
 * every 12 h 25 min; high tide about 50 minutes later each day; the range set
 * by the Moon (big at new and full moon, small at the half moons), as the
 * deck's orbit.js has it.
 *
 * ITEMS (a unit's `tideLab.items`):
 *   { id, level, kind: 'pole', mark: 'numbered' | 'unnumbered' | 'half' | 'waves' }
 *   { id, level, kind: 'day', stages: [plot?, inout?, highest?, change?], pair?: 'end' }
 *   { id, level, kind: 'later', stages: [tomorrow?, test, verdict?, why] }
 *   { id, level, kind: 'biggest', stages: [change?, week, moon?, verdict?, why] }
 * Stage lists are authored per item: that is how the scaffold fades.
 */
import { SLOTS, MOON_IDS, REASONS } from './tideLabData.js';

export const KINDS = ['pole', 'day', 'later', 'biggest'];
export const STAGE_IDS = {
  pole: ['read'],
  day: ['plot', 'inout', 'highest', 'change'],
  later: ['tomorrow', 'test', 'verdict', 'why'],
  biggest: ['change', 'week', 'moon', 'verdict', 'why'],
};
export const MARKS = ['numbered', 'unnumbered', 'half', 'waves'];
/** How many rivers per item the proof runs; the screen draws one of these. */
export const SEEDS = 200;

const PERIOD = 12.42; // hours from one high tide to the next
export const LATER_MIN = 50; // minutes later each day
const SYNODIC = 29.53; // days from one new moon to the next

/** A small seeded random generator (the same as the deck's). */
export function mulberry32(a) {
  let s = a >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A seed from an item id and an attempt number. */
export function seedOf(id, attempt = 0) {
  let h = 2166136261;
  for (const ch of String(id)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h + Math.imul(attempt + 1, 7919)) >>> 0;
}

const ri = (rnd, lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));
const round5 = (v) => Math.round(v / 5) * 5;
const levelAt = (M, A, tH, h) => M + A * Math.cos((2 * Math.PI * (h - tH)) / PERIOD);

/** The four readings of a day, in cm. */
export const readingsOf = (M, A, tH) => SLOTS.map((s) => round5(levelAt(M, A, tH, s.h)));
export const argmax = (r) => r.indexOf(Math.max(...r));
export const argmin = (r) => r.indexOf(Math.min(...r));
export const changeOf = (r) => Math.max(...r) - Math.min(...r);
export const endsOf = (r) => Math.abs(r[3] - r[0]);
const once = (r, v) => r.filter((x) => x === v).length === 1;

/** The top of a graph's scale: lines every 10 cm, numbers every 20, never under 100. */
export const scaleTop = (max) => Math.max(100, Math.ceil((max + 10) / 20) * 20);

/** Can every slip of a day's change be told apart? (and, to plot it, every cross) */
export function dayOk(r, { plot = false, pair = null } = {}) {
  if (r.some((v) => v < 10)) return false;
  const hi = Math.max(...r);
  const lo = Math.min(...r);
  if (!once(r, hi) || !once(r, lo)) return false;
  const change = hi - lo;
  const ends = endsOf(r);
  if (ends === 0 || ends === change || [hi, lo].includes(ends) || [hi, lo].includes(change)) return false;
  if (plot) {
    for (let i = 0; i < 4; i++) for (let k = i + 1; k < 4; k++) if (Math.abs(r[i] - r[k]) < 15) return false;
  }
  if (pair != null && Math.abs(r[pair + 1] - r[pair]) < 10) return false;
  return true;
}

function shuffled(rnd, list) {
  const o = [...list];
  for (let i = o.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [o[i], o[j]] = [o[j], o[i]];
  }
  return o;
}

function poleRound(item, rnd) {
  let L;
  let waves = 0;
  if (item.mark === 'numbered') L = 20 * ri(rnd, 2, 7);
  else if (item.mark === 'unnumbered') L = 20 * ri(rnd, 2, 6) + 10;
  else if (item.mark === 'half') L = 10 * ri(rnd, 4, 14) + 5;
  else if (item.mark === 'waves') { L = 10 * ri(rnd, 6, 12); waves = [10, 15, 20][ri(rnd, 0, 2)]; }
  else throw new Error(`pole item ${item.id}: unknown mark "${item.mark}"`);
  const lo = Math.max(0, 20 * Math.floor((L - 70) / 20));
  return { mark: item.mark, slot: ri(rnd, 0, 3), pole: { level: L, waves, lo, hi: lo + 140 } };
}

function dayRound(item, rnd) {
  const plot = item.stages.includes('plot');
  const pair = item.pair === 'end' ? 2 : 1;
  for (let n = 0; n < 2000; n++) {
    const r = readingsOf(10 * ri(rnd, 7, 10), 5 * ri(rnd, 7, 12), 8 + rnd() * 7);
    if (!dayOk(r, { plot, pair })) continue;
    return {
      day: {
        readings: r, top: scaleTop(Math.max(...r)), pair, dir: r[pair + 1] > r[pair] ? 'in' : 'out',
        hi: argmax(r), lo: argmin(r), change: changeOf(r), ends: endsOf(r),
      },
    };
  }
  throw new Error(`day item ${item.id}: no river fits`);
}

function laterRound(item, rnd) {
  const today = 60 * ri(rnd, 7, 10) + 5 * ri(rnd, 0, 11);
  for (let n = 0; n < 2000; n++) {
    const M = 10 * ri(rnd, 8, 10);
    const A = 5 * ri(rnd, 8, 12);
    const tH0 = 8.3 + rnd() * 0.9;
    const days = [0, 1, 2, 3, 4].map((d) => readingsOf(M, A, tH0 + (d * LATER_MIN) / 60));
    if (days.some((r) => r.some((v) => v < 10) || !once(r, Math.max(...r)))) continue;
    const his = days.map(argmax);
    if (his.some((h, i) => i > 0 && h < his[i - 1]) || his[4] <= his[0]) continue;
    const ask = [0, 2, 4];
    const top = scaleTop(Math.max(...days.flat()));
    return {
      tomorrow: { today, options: [today - LATER_MIN, today, today + LATER_MIN, today + 12 * 60] },
      week: { days: days.map((readings, d) => ({ d, readings, hi: his[d] })), ask, top },
      why: { right: REASONS.later.right.id, options: shuffled(rnd, [REASONS.later.right.id, ...REASONS.later.traps.map((t) => t.id)]) },
    };
  }
  throw new Error(`later item ${item.id}: no river fits`);
}

const BIG_TRAPS = { new: ['stronger', 'sunharder', 'closer'], full: ['closer', 'seeit', 'sunharder'] };

function biggestRound(item, rnd) {
  const asksChange = item.stages.includes('change');
  for (let n = 0; n < 2000; n++) {
    const phase = rnd() < 0.5 ? 'new' : 'full';
    const bigWeek = rnd() < 0.5 ? 0 : 1;
    const bigDay = ri(rnd, 1, 3);
    const pBig = bigWeek * 7 + bigDay;
    const K = ri(rnd, 36, 40);
    const M = 10 * ri(rnd, 8, 10);
    const tH0 = 7 + rnd() * 8;
    const amp = (cal) => K * Math.sqrt(1.25 + Math.cos((4 * Math.PI * (cal - pBig)) / SYNODIC));
    const weeks = [0, 1].map((w) => ({
      moon: { weekday: bigDay, phase: w === bigWeek ? phase : 'half' },
      days: [0, 1, 2, 3, 4].map((c) => {
        const cal = w * 7 + c;
        const readings = readingsOf(M, amp(cal), tH0 + (cal * LATER_MIN) / 60);
        return { cal, readings, change: changeOf(readings) };
      }),
    }));
    if (weeks.some((wk) => wk.days.some((d) => d.readings.some((v) => v < 10)))) continue;
    const minBig = Math.min(...weeks[bigWeek].days.map((d) => d.change));
    const maxSmall = Math.max(...weeks[1 - bigWeek].days.map((d) => d.change));
    if (minBig < maxSmall + 15) continue;
    // the day asked in each week: nearest its moon, with every slip of its change apart
    const ask = weeks.map((wk) => [bigDay, bigDay - 1, bigDay + 1, 0, 4].find((c) => c >= 0 && c <= 4 && dayOk(wk.days[c].readings)));
    if (asksChange && ask.some((c) => c == null)) continue;
    const top = scaleTop(Math.max(...weeks.flatMap((wk) => wk.days.flatMap((d) => d.readings))));
    return {
      phase, bigWeek, weeks, ask: ask.map((c) => c ?? bigDay), top,
      why: { right: REASONS.biggest.right.id, options: shuffled(rnd, [REASONS.biggest.right.id, ...BIG_TRAPS[phase]]) },
    };
  }
  throw new Error(`biggest item ${item.id}: no river fits`);
}

const DEFAULT_STAGES = { pole: ['read'], day: ['inout', 'highest', 'change'], later: ['test', 'why'], biggest: ['week', 'why'] };

/** One round of an item: its stages and the river they are about. Throws on a bad item. */
export function roundModel(item, seed = seedOf(item?.id)) {
  if (!item || !KINDS.includes(item.kind)) throw new Error(`unknown kind "${item?.kind}"`);
  const stages = item.kind === 'pole' ? ['read'] : (item.stages?.length ? [...item.stages] : DEFAULT_STAGES[item.kind]);
  const bad = stages.find((s) => !STAGE_IDS[item.kind].includes(s));
  if (bad) throw new Error(`item ${item.id}: "${bad}" is not a ${item.kind} stage`);
  const rnd = mulberry32(seed);
  const base = { id: item.id, level: item.level, kind: item.kind, stages, seed };
  const build = { pole: poleRound, day: dayRound, later: laterRound, biggest: biggestRound }[item.kind];
  return { ...base, ...build({ ...item, stages }, rnd) };
}

/** The right answer to a stage, in the shape the marker takes. */
export function answerOf(m, stage) {
  switch (stage) {
    case 'read': return String(m.pole.level);
    case 'plot': return [...m.day.readings];
    case 'inout': return m.day.dir;
    case 'highest': return m.day.hi;
    case 'find': return { hi: m.day.hi, lo: m.day.lo };
    case 'change': return m.kind === 'day' ? String(m.day.change) : m.ask.map((c, w) => String(m.weeks[w].days[c].change));
    case 'tomorrow': return m.tomorrow.today + LATER_MIN;
    case 'test': return Object.fromEntries(m.week.ask.map((d) => [d, m.week.days[d].hi]));
    case 'verdict': return 'supports';
    case 'why': return m.why.right;
    case 'week': return m.bigWeek;
    case 'moon': return m.phase;
    default: throw new Error(`no stage "${stage}"`);
  }
}

export { MOON_IDS };
