/**
 * Where Did It Go? (ENERGY_SPLIT, p91) — Year 7 Science 3.7 Where Does Energy Go?
 *
 * One device at a time, the deck's three commands as stages:
 *   SORT IT   build its energy-change diagram (3.6's boxes): where the energy
 *             comes FROM, what is USEFUL (what we want), what is WASTED
 *   COUNT IT  useful + wasted = what goes in: the useful joules, the wasted
 *             joules, or (the same light) the joules that must go in
 *   CHASE IT  where the wasted energy goes, and whether it can come back
 *
 * Items (a unit's `energySplit.items`):
 *   { id, level, device, total?, ask?, useful?, sort?, chase?, walk? }
 *     device   a key of DEVICES (utils/energySplitData.js)
 *     total    joules in (a multiple of 100); `ask` 'both' (walked), 'useful'
 *              or 'wasted' (the one number a quick item asks); with `useful`
 *              (joules out) and ask 'in' it is the same-light question
 *     sort     false: the diagram is shown filled, only numbers are asked
 *     chase    'where' | 'recover'
 *   { id, level, kind: 'pair', a, b, useful }  two devices giving the same
 *              useful joules: what goes into each, then which wastes more
 *
 * THE FADING RULE (as Maths 5.1): levels 1–2 walk every stage. From level 3
 * (WALK_UP_TO; an item's `walk` overrides; ask 'in' and pairs always walk) an
 * item opens QUICK: the whole diagram at once and the one number asked, one
 * Check. A wrong part is named and the stage it belongs to opens, the quick
 * answer counting as that stage's first try. Chase is never skipped.
 *
 * Every answer and every named slip is derived here; energySplitCheck.js proves
 * each item in the validator. A slip whose value equals the answer is not a slip
 * on that item (e.g. the % read as joules when 100 J goes in, where they are
 * the same number).
 */
import { ENERGIES, DEVICES, CHASE, CHASE_WHY } from './energySplitData.js';

export { ENERGIES, DEVICES, CHASE };
export const WALK_UP_TO = 2;
export const SORT_STAGES = ['from', 'useful', 'wasted'];

// ── helpers ─────────────────────────────────────────────────────────────────

function hash(s) {
  let h = 2166136261;
  for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(list, seed) {
  const r = rng(seed);
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}
const uniq = (list) => [...new Set(list)];
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const same = (a, b) => Math.abs(a - b) < 1e-9;
const fmt = (n) => (Number.isInteger(n) ? String(n) : String(Number(n.toFixed(4))));

/** The energy a chip is ('thermal:water' → 'thermal'). */
export const energyOf = (chip) => String(chip).split(':')[0];

/** A chip's name in a sentence: the English energy word (as the deck writes it), and where it goes when that matters. */
export function chipName(device, chip, lang = 'en') {
  const where = device?.where?.[chip];
  const word = ENERGIES[energyOf(chip)]?.en || chip;
  return where ? `${word} (${lang === 'fr' ? where.fr : where.en})` : word;
}

/** A chip's face: the English word big; underneath, the French word (in French) and where it goes. */
export function chipFace(device, chip, lang = 'en') {
  const e = ENERGIES[energyOf(chip)];
  const where = device?.where?.[chip];
  const sub = [lang === 'fr' ? e?.fr : null, where ? (lang === 'fr' ? where.fr : where.en) : null].filter(Boolean).join(' · ');
  return { main: e?.en || chip, sub };
}

/** "half (50%)", "a quarter (25%)" or "15%". */
export function pctWord(pct) {
  if (pct === 50) return { en: 'half (50%)', fr: 'la moitié (50%)' };
  if (pct === 25) return { en: 'a quarter (25%)', fr: 'un quart (25%)' };
  return { en: `${pct}%`, fr: `${pct}%` };
}

// ── the model ───────────────────────────────────────────────────────────────

/** Everything a round needs, derived from its item. Throws on an unknown device. */
export function splitModel(item) {
  if (item.kind === 'pair') return pairModel(item);
  const device = DEVICES[item.device];
  if (!device) throw new Error(`unknown device "${item.device}"`);
  const seed = hash(item.id || item.device);
  const pct = item.pct ?? device.pct ?? null;
  const ask = item.ask ?? (item.total != null ? 'both' : null);
  const sort = item.sort !== false;
  const walk = item.walk ?? (ask === 'in' ? true : (item.level || 1) <= WALK_UP_TO);
  const chase = item.chase || null;

  let total = null; let usefulJ = null; let wastedJ = null;
  if (ask === 'in') {
    usefulJ = item.useful;
    total = (usefulJ * 100) / pct;
    wastedJ = total - usefulJ;
  } else if (ask) {
    total = item.total;
    usefulJ = (total * pct) / 100;
    wastedJ = total - usefulJ;
  }

  const outputs = [...device.useful, ...device.wasted];
  const decoyChips = device.decoys.map((d) => d.chip);
  const countStages = ask === 'both' || ask === 'wasted' ? ['usefulJ', 'wastedJ'] : ask === 'useful' ? ['usefulJ'] : ask === 'in' ? ['inJ'] : [];
  const stages = [...(sort ? SORT_STAGES : []), ...countStages, ...(chase ? ['chase'] : [])];
  const quickNum = !walk && (ask === 'useful' || ask === 'wasted') ? (ask === 'useful' ? 'usefulJ' : 'wastedJ') : null;
  const entry = walk ? stages : [...(sort || quickNum ? ['quick'] : []), ...(chase ? ['chase'] : [])];

  const m = {
    id: item.id, level: item.level || 1, kind: 'device', deviceId: item.device, device,
    pct, ask, sort, walk, chase, total, usefulJ, wastedJ, quickNum,
    stages, countStages, entry,
    fromOptions: shuffle(uniq([device.from, device.fromWrong, energyOf(device.useful[0])]), seed),
    bank: shuffle(uniq([...outputs, ...decoyChips]), seed + 1),
    quickBank: shuffle(uniq([device.from, ...outputs, ...decoyChips]), seed + 2),
    answer: { from: device.from, useful: [...device.useful], wasted: [...device.wasted] },
  };
  if (chase) m.chaseOptions = shuffle(CHASE[chase].options.map((o) => chaseOption(device, o)), seed + 3);
  return m;
}

function chaseOption(device, o) {
  const back = device.backIn || device.source;
  const fill = (s, lang) => s.replace('{the}', device.the[lang]).replace('{back}', back[lang]);
  return { id: o.id, en: fill(o.en, 'en'), fr: fill(o.fr, 'fr') };
}

function pairModel(item) {
  const a = DEVICES[item.a]; const b = DEVICES[item.b];
  if (!a || !b) throw new Error(`unknown device "${!a ? item.a : item.b}"`);
  const useful = item.useful;
  const inA = (useful * 100) / a.pct; const inB = (useful * 100) / b.pct;
  const wA = inA - useful; const wB = inB - useful;
  const more = wA >= wB ? 'a' : 'b';
  const diff = Math.abs(wA - wB);
  const seed = hash(item.id || 'pair');
  const nameOf = (k) => (k === 'a' ? a : b).the;
  const opt = (id, k, n) => ({ id, en: `${cap(nameOf(k).en)}, by ${fmt(n)} J`, fr: `${cap(nameOf(k).fr)}, de ${fmt(n)} J` });
  const other = more === 'a' ? 'b' : 'a';
  const options = [
    opt('right', more, diff),
    opt('which', other, diff),
    opt('notDiff', more, more === 'a' ? wA : wB),
    { id: 'same', en: 'Neither: the same light, so the same waste', fr: 'Aucune : la même lumière, donc le même gaspillage' },
  ];
  return {
    id: item.id, level: item.level || 1, kind: 'pair', a, b, aId: item.a, bId: item.b,
    useful, inA, inB, wA, wB, more, diff,
    walk: true, stages: ['inA', 'inB', 'decide'], entry: ['inA', 'inB', 'decide'],
    decideOptions: shuffle(options, seed),
  };
}

// ── the answers ─────────────────────────────────────────────────────────────

/** The right answer for a stage (what "Show me" fills in). */
export function answerOf(m, stage) {
  switch (stage) {
    case 'from': return m.answer.from;
    case 'useful': return [...m.answer.useful];
    case 'wasted': return [...m.answer.wasted];
    case 'usefulJ': return m.usefulJ;
    case 'wastedJ': return m.wastedJ;
    case 'inJ': return m.total;
    case 'inA': return m.inA;
    case 'inB': return m.inB;
    case 'decide': return 'right';
    case 'chase': return CHASE[m.chase].right;
    case 'quick': return {
      boxes: Object.fromEntries([[m.answer.from, 'from'], ...m.answer.useful.map((c) => [c, 'useful']), ...m.answer.wasted.map((c) => [c, 'wasted'])]),
      num: m.quickNum ? answerOf(m, m.quickNum) : null,
    };
    default: return null;
  }
}

// ── sort it ─────────────────────────────────────────────────────────────────

const decoyWhy = (m, chip) => m.device.decoys.find((d) => d.chip === chip) || null;

// A hint, not the answer: it names where the energy comes from (the petrol,
// the socket, the food you ate) and leaves the student to name the energy.
function fromMsg(m) {
  const d = m.device;
  return { en: `The energy comes from ${d.source.en}. Which kind of energy is that?`, fr: `Source de l’énergie : ${d.source.fr}. Quelle forme d’énergie est-ce ?` };
}

/** The From stage: one energy (or chip) said to be where the energy comes from. */
export function diagnoseFrom(m, pick) {
  if (pick == null || pick === '') return { ok: false, soft: true, code: 'empty', en: 'Choose where the energy comes from.', fr: 'Choisis d’où vient l’énergie.' };
  if (pick === m.answer.from) return { ok: true, code: 'ok' };
  const outputs = [...m.answer.useful, ...m.answer.wasted];
  const isOutput = outputs.includes(pick) || outputs.map(energyOf).includes(pick);
  const f = fromMsg(m);
  if (isOutput) {
    const name = chipName(m.device, pick, 'en'); const nameFr = chipName(m.device, pick, 'fr');
    return { ok: false, code: 'fromOutput', en: `${cap(name)} is what comes out, not what goes in. ${f.en}`, fr: `${cap(nameFr)}, c’est ce qui sort, pas ce qui entre. ${f.fr}` };
  }
  return { ok: false, code: 'fromWrong', en: f.en, fr: f.fr };
}

function wantMsg(m, chip, toUseful) {
  const w = m.device.want;
  const en = chipName(m.device, chip, 'en'); const fr = chipName(m.device, chip, 'fr');
  return toUseful
    ? { code: 'want', en: `${w.en} ${cap(en)} is not what we want here, so it is wasted.`, fr: `${w.fr} L’énergie ${fr} n’est pas ce qu’on veut ici : elle est gaspillée.` }
    : { code: 'want', en: `${w.en} So ${en} is useful here, not wasted.`, fr: `${w.fr} Donc l’énergie ${fr} est utile ici, pas gaspillée.` };
}

const MISSED = {
  useful: (m) => ({ code: 'missed', en: `Something we want is missing. ${m.device.want.en}`, fr: `Il manque quelque chose qu’on veut. ${m.device.want.fr}` }),
  wasted: () => ({ code: 'missed', en: 'There is more wasted energy. Does it get hot? Does it make a noise? Does it glow?', fr: 'Il y a encore de l’énergie gaspillée. Est-ce que ça chauffe ? Est-ce que ça fait du bruit ? Est-ce que ça brille ?' }),
};

/**
 * The Useful or Wasted stage: the chips the student put in that box. `other`
 * is the chips in the other box (quick only), so a useful chip put in the
 * wasted box is named as `want` on the Useful stage.
 */
export function diagnoseBox(m, stage, chips, other = []) {
  const picked = uniq(chips || []);
  if (!picked.length) {
    return { ok: false, soft: true, code: 'empty', en: stage === 'useful' ? 'Tap the useful energy.' : 'Tap the wasted energy.', fr: stage === 'useful' ? 'Touche l’énergie utile.' : 'Touche l’énergie gaspillée.' };
  }
  const right = m.answer[stage];
  const wrongSide = stage === 'useful' ? m.answer.wasted : m.answer.useful;
  for (const c of picked) {
    if (wrongSide.includes(c)) return { ok: false, ...wantMsg(m, c, stage === 'useful') };
  }
  for (const c of picked) {
    const d = decoyWhy(m, c);
    if (d) return { ok: false, code: 'notMade', en: d.en, fr: d.fr };
  }
  const missing = right.filter((c) => !picked.includes(c));
  if (missing.length) {
    if (stage === 'useful' && other.includes(missing[0])) return { ok: false, ...wantMsg(m, missing[0], false) };
    return { ok: false, ...MISSED[stage](m) };
  }
  return { ok: true, code: 'ok' };
}

// ── count it ────────────────────────────────────────────────────────────────

/** "30", "30 J", "30 joules", "7,5" → a number; anything else → null. */
export function parseJoules(raw) {
  const s = String(raw ?? '').trim().toLowerCase().replace(/joules?/g, '').replace(/j/g, '').replace(/\s+/g, '').replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(s)) return null;
  return Number(s);
}

/** The device a count stage is about (the pair's A or B, or the round's own). */
const deviceFor = (m, stage) => (stage === 'inA' ? m.a : stage === 'inB' ? m.b : m.device);

/**
 * Every named slip of a count stage: { code, value, en, fr, openAt }. `openAt`
 * is the stage a quick item opens at when its number is this slip. Slips equal
 * to the answer are dropped (they are not slips on this item).
 */
export function countSlips(m, stage) {
  const out = [];
  const add = (code, value, en, fr, openAt = stage) => out.push({ code, value, en, fr, openAt });
  if (stage === 'usefulJ' || stage === 'wastedJ') {
    const { total, pct, usefulJ: u, wastedJ: w } = m;
    const lots = total / 100;
    if (stage === 'usefulJ') {
      if (total !== 100) add('pctAsJ', pct, `${pct} is the percentage, not the joules. Every 100 J gives ${pct} J, and ${total} J is ${lots} lots of 100 J.`, `${pct}, c’est le pourcentage, pas les joules. Chaque 100 J donne ${pct} J, et ${total} J, c’est ${lots} fois 100 J.`);
      add('swap', w, `That is the wasted part. The useful part is ${pct}% of what goes in.`, `Ça, c’est la partie gaspillée. La partie utile, c’est ${pct}% de ce qui entre.`);
      add('total', total, `${total} J is everything that goes in. Only ${pct}% of it is useful.`, `${total} J, c’est tout ce qui entre. Seulement ${pct}% est utile.`);
    } else {
      add('noSub', total, `${total} J is everything that goes in. Take the useful joules away.`, `${total} J, c’est tout ce qui entre. Enlève les joules utiles.`);
      add('added', total + u, 'Wasted is less than what goes in: take the useful part away, do not add it.', 'Le gaspillé est plus petit que ce qui entre : enlève la partie utile, ne l’ajoute pas.');
      add('swap', u, 'That is the useful part. Wasted = what goes in − useful.', 'Ça, c’est la partie utile. Gaspillé = ce qui entre − utile.');
      if (total !== 100) {
        add('pctAsJ', 100 - pct, `${100 - pct} is the wasted percentage, not the joules. Work in joules: ${total} J goes in.`, `${100 - pct}, c’est le pourcentage gaspillé, pas les joules. Travaille en joules : ${total} J entrent.`, 'usefulJ');
        add('subPct', total - pct, `You took away ${pct}, the percentage. Take away the useful joules instead.`, `Tu as enlevé ${pct}, le pourcentage. Enlève plutôt les joules utiles.`, 'usefulJ');
      }
    }
  } else {
    const d = deviceFor(m, stage);
    const pct = stage === 'inJ' ? m.pct : d.pct;
    const useful = stage === 'inJ' ? m.usefulJ : m.useful;
    const e = ENERGIES[energyOf(d.useful[0])].en;
    const pw = pctWord(pct);
    add('halved', (useful * pct) / 100, `You took ${pct}% of ${useful} J. But ${useful} J is what comes OUT, and only ${pw.en} of what goes in becomes ${e}: what goes in is bigger.`, `Tu as calculé ${pct}% de ${useful} J. Mais ${useful} J, c’est ce qui SORT, et seulement ${pw.fr} de ce qui entre devient ${e} : ce qui entre est plus grand.`);
    add('outAsIn', useful, `${useful} J is what comes out as ${e}. More goes in: only ${pw.en} of it becomes ${e}.`, `${useful} J, c’est ce qui sort en ${e}. Il en entre plus : seulement ${pw.fr} devient ${e}.`);
    if (pct !== 50) add('doubled', useful * 2, `Doubling works when half becomes ${e}. Here only ${pct}% does: every 100 J gives ${pct} J.`, `Doubler marche quand la moitié devient ${e}. Ici, seulement ${pct}% : chaque 100 J donne ${pct} J.`);
  }
  const ans = answerOf(m, stage);
  return out.filter((s) => !same(s.value, ans));
}

function otherHint(m, stage) {
  if (stage === 'usefulJ') {
    return m.total === 100
      ? { en: `${m.pct}% of 100 J is ${m.pct}… of what? Read the percentage as joules.`, fr: `${m.pct}% de 100 J… Lis le pourcentage en joules.` }
      : { en: `Find ${m.pct}% of ${m.total} J. Every 100 J gives ${m.pct} J.`, fr: `Calcule ${m.pct}% de ${m.total} J. Chaque 100 J donne ${m.pct} J.` };
  }
  if (stage === 'wastedJ') return { en: 'Wasted = what goes in − useful.', fr: 'Gaspillé = ce qui entre − utile.' };
  const d = deviceFor(m, stage);
  const pct = stage === 'inJ' ? m.pct : d.pct;
  const useful = stage === 'inJ' ? m.usefulJ : m.useful;
  const e = ENERGIES[energyOf(d.useful[0])].en;
  return { en: `Every 100 J that goes in gives ${pct} J of ${e}. How many joules give ${useful} J?`, fr: `Chaque 100 J qui entre donne ${pct} J de ${e}. Combien de joules donnent ${useful} J ?` };
}

/** A count stage: the number typed. */
export function diagnoseNumber(m, stage, raw) {
  const v = parseJoules(raw);
  if (v == null) return { ok: false, soft: true, code: 'empty', en: 'Type a number of joules.', fr: 'Écris un nombre de joules.' };
  if (same(v, answerOf(m, stage))) return { ok: true, code: 'ok' };
  const slip = countSlips(m, stage).find((s) => same(s.value, v));
  if (slip) return { ok: false, code: slip.code, en: slip.en, fr: slip.fr, openAt: slip.openAt };
  const h = otherHint(m, stage);
  // A quick "wasted" number no slip explains: start from the useful joules.
  return { ok: false, code: 'other', en: `Not quite. ${h.en}`, fr: `Pas tout à fait. ${h.fr}`, openAt: stage === 'wastedJ' && !m.walk ? 'usefulJ' : stage };
}

// ── chase it, and the pair's verdict ─────────────────────────────────────────

export function diagnoseChase(m, pick) {
  const right = CHASE[m.chase].right;
  if (pick === right) return { ok: true, code: 'ok', ...CHASE_WHY[right] };
  const why = CHASE_WHY[pick];
  if (!why) return { ok: false, soft: true, code: 'empty', en: 'Choose an answer.', fr: 'Choisis une réponse.' };
  return { ok: false, code: pick, en: why.en, fr: why.fr };
}

export function diagnoseDecide(m, pick) {
  const A = m.a.the; const B = m.b.the;
  const more = m.more === 'a' ? A : B; const less = m.more === 'a' ? B : A;
  const inMore = m.more === 'a' ? m.inA : m.inB; const inLess = m.more === 'a' ? m.inB : m.inA;
  const wMore = m.more === 'a' ? m.wA : m.wB; const wLess = m.more === 'a' ? m.wB : m.wA;
  switch (pick) {
    case 'right': return { ok: true, code: 'ok', en: `Yes: ${more.en} wastes ${fmt(wMore)} J and ${less.en} only ${fmt(wLess)} J.`, fr: `Oui : ${more.fr} gaspille ${fmt(wMore)} J et ${less.fr} seulement ${fmt(wLess)} J.` };
    case 'which': return { ok: false, code: 'which', en: `${cap(more.en)} needs ${fmt(inMore)} J and ${less.en} only ${fmt(inLess)} J for the same light. More goes in, the same comes out: ${more.en} wastes more.`, fr: `${cap(more.fr)} a besoin de ${fmt(inMore)} J et ${less.fr} seulement de ${fmt(inLess)} J pour la même lumière. Il entre plus, il sort pareil : ${more.fr} gaspille plus.` };
    case 'notDiff': return { ok: false, code: 'notDiff', en: `${fmt(wMore)} J is everything ${more.en} wastes. But ${less.en} wastes ${fmt(wLess)} J too: how much MORE is ${fmt(wMore)} − ${fmt(wLess)}.`, fr: `${fmt(wMore)} J, c’est tout ce que gaspille ${more.fr}. Mais ${less.fr} gaspille aussi ${fmt(wLess)} J : combien de PLUS, c’est ${fmt(wMore)} − ${fmt(wLess)}.` };
    case 'same': return { ok: false, code: 'same', en: `The same light, but not the same energy in: ${more.en} needs ${fmt(inMore)} J, ${less.en} only ${fmt(inLess)} J.`, fr: `La même lumière, mais pas la même énergie qui entre : ${more.fr} a besoin de ${fmt(inMore)} J, ${less.fr} seulement de ${fmt(inLess)} J.` };
    default: return { ok: false, soft: true, code: 'empty', en: 'Choose an answer.', fr: 'Choisis une réponse.' };
  }
}

// ── quick ───────────────────────────────────────────────────────────────────

/**
 * A quick item: `boxes` ({ chip: 'from' | 'useful' | 'wasted' }) and `num`.
 * Returns { ok } or { ok: false, soft } or { ok: false, en, fr, code, open,
 * given } — `open` is the stages to walk (the first carries this wrong as its
 * first try), `given` the sort stages before it, now filled in.
 */
export function diagnoseQuick(m, { boxes = {}, num = '' } = {}) {
  const inBox = (b) => Object.keys(boxes).filter((c) => boxes[c] === b);
  let sortD = null;
  if (m.sort) {
    const from = inBox('from'); const useful = inBox('useful'); const wasted = inBox('wasted');
    if (!from.length) return { ok: false, soft: true, code: 'empty', en: 'Put one energy in the first box: where the energy comes from.', fr: 'Mets une énergie dans la première case : d’où vient l’énergie.' };
    if (from.length > 1) return { ok: false, soft: true, code: 'two', en: 'Only one energy goes in the first box.', fr: 'Une seule énergie va dans la première case.' };
    if (!useful.length || !wasted.length) return { ok: false, soft: true, code: 'empty', en: 'Put energy in both boxes on the right: useful and wasted.', fr: 'Mets de l’énergie dans les deux cases de droite : utile et gaspillée.' };
    const f = diagnoseFrom(m, from[0]);
    if (!f.ok) sortD = { ...f, stage: 'from' };
    else {
      const u = diagnoseBox(m, 'useful', useful, wasted);
      if (!u.ok) sortD = { ...u, stage: 'useful' };
      else {
        const w = diagnoseBox(m, 'wasted', wasted, useful);
        if (!w.ok) sortD = { ...w, stage: 'wasted' };
      }
    }
  }
  let numD = null;
  if (m.quickNum) {
    const d = diagnoseNumber(m, m.quickNum, num);
    if (d.soft) return d;
    if (!d.ok) numD = d;
  }
  if (!sortD && !numD) return { ok: true, code: 'ok' };
  const open = [];
  if (sortD) open.push(...SORT_STAGES.slice(SORT_STAGES.indexOf(sortD.stage)));
  if (numD) open.push(...m.countStages.slice(m.countStages.indexOf(numD.openAt)));
  const given = sortD ? SORT_STAGES.slice(0, SORT_STAGES.indexOf(sortD.stage)) : (m.sort ? [...SORT_STAGES] : []);
  const first = sortD || numD;
  return { ok: false, code: first.code, en: first.en, fr: first.fr, stage: sortD ? sortD.stage : numD.openAt, open, given, numOk: !numD };
}

// ── the words on screen that carry numbers ──────────────────────────────────

/** The question a stage asks, in both languages. */
export function stageAsk(m, stage) {
  const d = m.kind === 'pair' ? null : m.device;
  switch (stage) {
    case 'from': return { en: 'Where does the energy come from?', fr: 'D’où vient l’énergie ?' };
    case 'useful': return { en: 'What do we want? Tap the useful energy.', fr: 'Que veut-on ? Touche l’énergie utile.' };
    case 'wasted': return { en: 'What else comes out? Tap all the wasted energy.', fr: 'Que sort-il d’autre ? Touche toute l’énergie gaspillée.' };
    case 'usefulJ': return { en: `${m.total} J goes in. ${m.pct}% is useful. How many joules are useful?`, fr: `${m.total} J entrent. ${m.pct}% est utile. Combien de joules sont utiles ?` };
    case 'wastedJ': return { en: `${m.total} J goes in and ${fmt(m.usefulJ)} J is useful. How many joules are wasted?`, fr: `${m.total} J entrent et ${fmt(m.usefulJ)} J sont utiles. Combien de joules sont gaspillés ?` };
    case 'inJ': case 'inA': case 'inB': {
      const dev = deviceFor(m, stage);
      const pct = stage === 'inJ' ? m.pct : dev.pct;
      const useful = stage === 'inJ' ? m.usefulJ : m.useful;
      const e = ENERGIES[energyOf(dev.useful[0])].en;
      const pw = pctWord(pct);
      return { en: `${cap(dev.the.en)} gives ${useful} J of ${e}. ${cap(pw.en)} of the energy that goes in becomes ${e}. How many joules go in?`, fr: `${cap(dev.the.fr)} donne ${useful} J de ${e}. ${cap(pw.fr)} de l’énergie qui entre devient ${e}. Combien de joules entrent ?` };
    }
    case 'decide': return { en: `Both lamps give ${m.useful} J of light. Which one wastes more energy, and how much more?`, fr: `Les deux lampes donnent ${m.useful} J de lumière. Laquelle gaspille le plus d’énergie, et combien de plus ?` };
    case 'chase': return { en: CHASE[m.chase].en, fr: CHASE[m.chase].fr };
    case 'quick': {
      const num = m.quickNum === 'usefulJ'
        ? { en: `${m.total} J goes in and ${m.pct}% is useful. How many joules are useful?`, fr: `${m.total} J entrent et ${m.pct}% est utile. Combien de joules sont utiles ?` }
        : m.quickNum === 'wastedJ'
          ? { en: `${m.total} J goes in and ${m.pct}% is useful. How many joules are wasted?`, fr: `${m.total} J entrent et ${m.pct}% est utile. Combien de joules sont gaspillés ?` }
          : null;
      if (!m.sort) return num;
      const build = { en: 'Build the energy-change diagram: put each energy in its box (leave out any that do not belong).', fr: 'Construis le schéma : mets chaque énergie dans sa case (laisse de côté celles qui n’y sont pas).' };
      return num ? { en: `${build.en} Then: ${num.en}`, fr: `${build.fr} Puis : ${num.fr}` } : build;
    }
    default: return { en: d?.en || '', fr: d?.fr || '' };
  }
}
