// src/utils/angleSum.js
//
// Find It, Say Why (Year 7 Maths 5.1, A sum of 360°): find a missing angle
// and give the fact as the reason. Angles on a straight line add up to 180°,
// angles around a point to 360°, the angles in a quadrilateral to 360°, and in
// a parallelogram opposite angles are equal. The method is the classroom's
// TWO STEPS: add the angles you know, take the total away from 180° or 360°.
//
// An item states the diagram only (whole degrees; 'R' is a small square, 90°;
// a lower-case letter is an angle to find, the same letter twice = the same size):
//   { id, level, kind: 'line',  angles: [44, 'b', 57] }             in order along the line
//   { id, level, kind: 'point', angles: ['R', 115, 'd', 80] }       in order round the point
//   { id, level, kind: 'quad',  angles: [126, 'k', 'k', 'k'] }      the four corners, in order
//   { id, level, kind: 'quad',  angles: [95, 110, 'x', 82], ext: { at: 2, angle: 'y' } }
//        the side arriving at corner `at` is drawn on past it: a straight line
//   { id, level, kind: 'para',  angles: [58, 'p', 'q', 'r'] }       one corner given
//   { id, level, kind: 'straight', angles: [67, 111] }              is XY a straight line?
//   (+ context / contextFr: a story; + walk: true | false to override the level)
// Every step, stage, answer, reason and the slip behind a wrong answer is
// derived here; the validator (utils/angleSumCheck.js) runs the same model.
//
// FADING. Levels 1–2 walk every stage. From level 3 an item opens QUICK: type
// the angle and pick the reason sentence. A wrong angle opens the stages at the
// stage its slip belongs to (`slips[].stage`); a wrong reason re-asks only the
// reason. English and French only: every message is { en, fr }.

export const KINDS = ['line', 'point', 'quad', 'para', 'straight'];
export const TOTAL = { line: 180, point: 360, quad: 360 };
export const WALK_UP_TO = 2;

const isLetter = (t) => typeof t === 'string' && /^[a-z]$/.test(t);
const isNum = (t) => Number.isInteger(t) && t > 0;
const fmt = (v) => (Number.isInteger(v) ? String(v) : String(Number(v.toFixed(2))));
const deg = (v) => `${fmt(v)}°`;
const same = (a, b) => Math.abs(a - b) < 1e-9;
/** A small stable hash of a string, for shuffles and rotations. */
export function hashOf(s) {
  let h = 2166136261;
  for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/* ------------------------------------------------------------------ words */

export const FACTS = {
  line: { en: 'angles on a straight line add up to 180°', fr: 'les angles sur une ligne droite font 180° en tout' },
  point: { en: 'angles around a point add up to 360°', fr: 'les angles autour d’un point font 360° en tout' },
  quad: { en: 'the angles in a quadrilateral add up to 360°', fr: 'les angles d’un quadrilatère font 360° en tout' },
  opp: { en: 'opposite angles in a parallelogram are equal', fr: 'dans un parallélogramme, les angles opposés sont égaux' },
};
const WRONG_NUMBER = {
  line: { en: 'angles on a straight line add up to 360°', fr: 'les angles sur une ligne droite font 360° en tout' },
  point: { en: 'angles around a point add up to 180°', fr: 'les angles autour d’un point font 180° en tout' },
  quad: { en: 'the angles in a quadrilateral add up to 180°', fr: 'les angles d’un quadrilatère font 180° en tout' },
  opp: { en: 'next-door angles in a parallelogram are equal', fr: 'dans un parallélogramme, les angles voisins sont égaux' },
};
/** A TRUE fact that is about a different diagram — the subtle wrong reason. */
const OTHER_FACT = { line: 'point', point: 'quad', quad: 'point', opp: 'quad' };
const WHERE = {
  line: { en: 'on a straight line', fr: 'sur une ligne droite' },
  point: { en: 'around a point', fr: 'autour d’un point' },
  quad: { en: 'inside a quadrilateral', fr: 'à l’intérieur d’un quadrilatère' },
  opp: { en: 'opposite each other in a parallelogram', fr: 'opposés dans un parallélogramme' },
};
const GROUP = {
  line: { en: 'the straight line', fr: 'la ligne droite' },
  point: { en: 'the full turn', fr: 'le tour complet' },
  quad: { en: 'the quadrilateral', fr: 'le quadrilatère' },
};
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* ------------------------------------------------------------------ model */

function elementOf(t, key, pos) {
  if (t === 'R') return { key, pos, right: true, value: 90 };
  if (isNum(t)) return { key, pos, value: t };
  if (isLetter(t)) return { key, pos, letter: t, value: null };
  throw new Error(`angle "${t}" — a whole number of degrees, 'R' (a small square) or one lower-case letter`);
}

/** The value of an element once `found` letters are known (null if still unknown). */
const valueOf = (el, found) => (el.letter ? (found[el.letter] ?? null) : el.value);

function solveGroups(groups, els, letters) {
  const found = {};
  const steps = [];
  for (let guard = 0; guard < 6 && Object.keys(found).length < letters.length; guard += 1) {
    const ready = groups.filter((g) => new Set(g.keys.map((k) => els[k]).filter((e) => e.letter && found[e.letter] == null).map((e) => e.letter)).size === 1);
    if (!ready.length) throw new Error('cannot be solved: every fact has two or more angles you do not know');
    const findable = [...new Set(ready.map((g) => g.keys.map((k) => els[k]).find((e) => e.letter && found[e.letter] == null).letter))];
    const g = ready[0];
    const members = g.keys.map((k) => els[k]);
    const L = members.find((e) => e.letter && found[e.letter] == null).letter;
    const mine = members.filter((e) => e.letter === L);
    const knowns = members.filter((e) => e.letter !== L).map((e) => ({ ...e, value: valueOf(e, found), found: !!e.letter }));
    const sum = knowns.reduce((s, e) => s + e.value, 0);
    const rest = g.total - sum;
    const answer = rest / mine.length;
    const remaining = letters.filter((l) => found[l] == null);
    const unknownIn = (gr) => new Set(gr.keys.map((k) => els[k]).filter((e) => e.letter && found[e.letter] == null).map((e) => e.letter)).size;
    const blockers = Object.fromEntries(remaining.filter((l) => !findable.includes(l)).map((l) => {
      const mine = groups.filter((gr) => gr.keys.some((k) => els[k].letter === l)).sort((a, b) => unknownIn(a) - unknownIn(b))[0];
      return [l, { fact: mine.fact, unknown: unknownIn(mine) }];
    }));
    steps.push({
      blockers,
      fact: g.fact, total: g.total, letters: [L], keys: mine.map((e) => e.key), group: g.keys, knowns, sum, rest,
      share: mine.length, count: members.length, answer, findable, first: remaining.length > 1 ? remaining : null,
    });
    found[L] = answer;
  }
  return { steps, found };
}

/** Everything about one item, derived. Throws on an item that cannot be drawn or solved. */
export function angleModel(item) {
  if (!item || !KINDS.includes(item.kind)) throw new Error(`kind "${item?.kind}" — ${KINDS.join(' / ')}`);
  const { kind } = item;
  const raw = item.angles || [];
  const els = {};
  const order = raw.map((t, i) => { const e = elementOf(t, `k${i}`, i); els[e.key] = e; return e.key; });
  if (item.ext) {
    if (kind !== 'quad') throw new Error('ext belongs on a quad');
    const e = elementOf(item.ext.angle, 'ext', -1);
    if (e.right) throw new Error('ext angle cannot be a small square');
    els.ext = { ...e, ext: true, at: item.ext.at };
  }
  const letters = [...new Set(Object.values(els).filter((e) => e.letter).map((e) => e.letter))];
  const id = item.id;
  const level = item.level || 1;
  const walk = item.walk ?? level <= WALK_UP_TO;
  const base = { id, kind, level, walk, els, order, letters, context: item.context || null };

  if (kind === 'straight') {
    if (letters.length) throw new Error('a straight item has no letters: every angle is given');
    if (raw.length < 2) throw new Error('a straight item needs two angles or more');
    const knowns = order.map((k) => els[k]);
    const sum = knowns.reduce((s, e) => s + e.value, 0);
    const step = { fact: 'straight', knowns, sum, isStraight: sum === 180, letters: [], stages: ['total', 'why'] };
    step.reasons = straightReasons(step, id);
    step.slips = straightSlips(step);
    return { ...base, steps: [step], answers: {} };
  }

  const n = raw.length;
  if (kind === 'line' && n < 2) throw new Error('a line needs two angles or more');
  if (kind === 'point' && n < 2) throw new Error('a point needs two angles or more');
  if ((kind === 'quad' || kind === 'para') && n !== 4) throw new Error(`a ${kind} has exactly four corners`);
  if (!letters.length) throw new Error('nothing to find: give one angle a letter');

  let steps;
  let found;
  if (kind === 'para') {
    const k = order.findIndex((key) => !els[key].letter);
    const nums = order.filter((key) => !els[key].letter);
    if (nums.length !== 1 || els[order[k]].right) throw new Error('a parallelogram gives exactly one corner as a number (not a small square)');
    if (letters.length !== 3) throw new Error('a parallelogram needs three different letters');
    const th = els[order[k]].value;
    if (th >= 180) throw new Error('a parallelogram corner is less than 180°');
    const opp = els[order[(k + 2) % 4]];
    const n1 = els[order[(k + 1) % 4]];
    const n3 = els[order[(k + 3) % 4]];
    const known = { ...els[order[k]] };
    steps = [
      { fact: 'opp', total: null, letters: [opp.letter], keys: [opp.key], group: [known.key, opp.key], knowns: [known], sum: th, rest: th,
        share: 1, count: 2, answer: th, findable: [opp.letter], first: [n1.letter, opp.letter, n3.letter].sort(),
        blockers: { [n1.letter]: { fact: 'opp', unknown: 2 }, [n3.letter]: { fact: 'opp', unknown: 2 } } },
      { fact: 'quad', total: 360, letters: [n1.letter, n3.letter], keys: [n1.key, n3.key], group: order, knowns: [known, { ...opp, value: th, found: true }],
        sum: 2 * th, rest: 360 - 2 * th, share: 2, count: 4, answer: (360 - 2 * th) / 2, findable: null, first: null },
    ];
    found = { [opp.letter]: th, [n1.letter]: steps[1].answer, [n3.letter]: steps[1].answer };
  } else {
    const groups = [{ fact: kind, total: TOTAL[kind], keys: order }];
    if (els.ext) {
      const at = els.ext.at;
      if (!Number.isInteger(at) || at < 0 || at > 3) throw new Error('ext.at is a corner, 0–3');
      groups.push({ fact: 'line', total: 180, keys: [order[at], 'ext'] });
    }
    ({ steps, found } = solveGroups(groups, els, letters));
  }

  steps.forEach((s, i) => {
    // A decoy is an angle on the diagram you could know by now that is NOT in
    // this step's fact — the extended side's angle when you add up a corner set.
    const before = new Set(steps.slice(0, i).flatMap((t) => t.letters));
    s.decoys = Object.values(els).filter((e) => !s.group.includes(e.key) && (!e.letter || before.has(e.letter)))
      .map((e) => ({ ...e, value: valueOf(e, found), found: !!e.letter }));
  });
  for (const s of steps) {
    s.stages = stagesOf(s);
    s.reasons = reasonsOf(s, `${id}:${s.letters.join('')}`);
    s.slips = slipsOf(s);
  }
  return { ...base, steps, answers: found };
}

/* ------------------------------------------------------------------ stages */

/** The stages of one step when it is walked. */
export function stagesOf(s) {
  const st = [];
  if (s.first) st.push('first');
  if (s.fact === 'opp') st.push('calc');
  else {
    st.push('decide');
    if (s.knowns.length >= 2) st.push('add');
    if (s.knowns.length >= 1) st.push('subtract');
    if (s.share > 1) st.push('share');
  }
  st.push('why');
  return st;
}
/** The stages of one step when it opens quick: (find first,) then the angle and its reason together. */
export const quickStages = (s) => (s.fact === 'straight' ? s.stages : [...(s.first ? ['first'] : []), 'quick']);
/** Where a slip's stage lands when the step has no such stage (one known angle: no Add). */
export function openAt(s, stage) {
  if (s.stages.includes(stage)) return stage;
  return ['add', 'subtract', 'share', 'calc', 'decide'].find((x) => s.stages.includes(x)) || 'why';
}

/* ------------------------------------------------------------------ reasons and slips */

const PERMS = [[0, 1, 2], [1, 2, 0], [2, 0, 1], [0, 2, 1], [2, 1, 0], [1, 0, 2]];
const permute = (list, h) => PERMS[h % 6].map((i) => list[i]);
const looksLike = (v) => ({ en: `it looks like ${deg(v)}`, fr: `il a l’air de faire ${deg(v)}` });

function reasonsOf(s, seed) {
  const h = hashOf(seed);
  const third = s.fact === 'opp' ? { code: 'nextDoor', ...WRONG_NUMBER.opp }
    : (h >> 3) % 2 === 0 ? { code: 'wrongNumber', ...WRONG_NUMBER[s.fact] } : { code: 'looks', ...looksLike(s.answer) };
  const list = [{ code: null, ...FACTS[s.fact] }, { code: 'wrongFact', ...FACTS[OTHER_FACT[s.fact]] }, third];
  return permute(list, h).map((r, i) => ({ id: `r${i}`, ...r }));
}

const DECIDE_CODE = { line: 'line360', point: 'point180', quad: 'quad180' };

/** Every named wrong value of one step: { code, stage, value, angle? }. */
function slipsOf(s) {
  const out = [];
  const push = (code, stage, value, extra = {}) => {
    if (Number.isFinite(value) && value > 0) out.push({ code, stage, value: Number(value.toFixed(4)), ...extra });
  };
  if (s.fact === 'opp') { push('notOpp', 'calc', 180 - s.answer); return out; }
  const n = s.share;
  push(DECIDE_CODE[s.fact], 'decide', ((s.total === 180 ? 360 : 180) - s.sum) / n);
  if (s.knowns.length >= 2) {
    for (const k of s.knowns) push(k.right ? 'forgotRight' : 'forgot', 'add', (s.total - (s.sum - k.value)) / n, { angle: k.value });
    for (const d of s.decoys) push('decoy', 'add', (s.total - s.sum - d.value) / n, { angle: d.value });
  }
  if (s.knowns.length >= 1) push('noSub', 'subtract', s.sum);
  if (n > 1) {
    push('noShare', 'share', s.rest);
    if (s.count !== n) push('shareAll', 'share', s.rest / s.count);
    if (s.knowns.length >= 1) push('allEqual', 'share', s.total / s.count);
  }
  return out;
}

function straightReasons(s, id) {
  const S = deg(s.sum);
  const looks = { code: 'looks', en: 'Yes: it looks straight.', fr: 'Oui : elle a l’air droite.' };
  const list = s.isStraight
    ? [{ code: null, en: 'Yes: the angles add up to exactly 180°, so XY is a straight line.', fr: 'Oui : les angles font exactement 180° en tout, donc XY est une ligne droite.' },
      looks, { code: 'twoOnly', en: 'No: a straight line has only two angles on it.', fr: 'Non : une ligne droite n’a que deux angles.' }]
    : [{ code: null, en: `No: ${S} is not 180°, so XY is not a straight line.`, fr: `Non : ${S}, ce n’est pas 180°, donc XY n’est pas une ligne droite.` },
      looks, { code: 'close', en: `Yes: ${S} is close to 180°.`, fr: `Oui : ${S}, c’est proche de 180°.` }];
  return permute(list, hashOf(id)).map((r, i) => ({ id: `r${i}`, ...r }));
}
function straightSlips(s) {
  const out = s.knowns.map((k) => ({ code: k.right ? 'forgotRight' : 'forgot', stage: 'total', value: s.sum - k.value, angle: k.value }));
  if (!s.isStraight) out.push({ code: 'rounded', stage: 'total', value: 180 });
  return out;
}

/* ------------------------------------------------------------------ messages */

const sumList = (s) => s.knowns.map((k) => deg(k.value)).join(' + ');

/** The named message for a slip code, in both languages. */
export function slipText(code, s, p = {}) {
  const T = deg(s.total || 0);
  const S = deg(s.sum || 0);
  const n = s.share;
  const L = s.letters?.[0] || '';
  switch (code) {
    case 'point180': return { en: 'These angles go all the way round a point. A full turn is 360°, not 180°.', fr: 'Ces angles font tout le tour d’un point. Un tour complet fait 360°, pas 180°.' };
    case 'line360': return { en: 'These angles sit on one side of a straight line. That is half a turn: 180°, not 360°.', fr: 'Ces angles sont d’un seul côté d’une ligne droite. C’est un demi-tour : 180°, pas 360°.' };
    case 'quad180': return { en: '180° is the three angles of a triangle. A quadrilateral has four corners: 360°.', fr: '180°, ce sont les trois angles d’un triangle. Un quadrilatère a quatre coins : 360°.' };
    case 'forgotRight': return { en: 'The small square is an angle too: it means 90°. Add it in.', fr: 'Le petit carré est aussi un angle : il veut dire 90°. Ajoute-le.' };
    case 'forgot': return s.fact === 'straight'
      ? { en: `You left out ${deg(p.angle)}. Add every angle at the point.`, fr: `Tu as oublié ${deg(p.angle)}. Additionne tous les angles au point.` }
      : { en: `You left out ${deg(p.angle)}. Add every angle you know in ${GROUP[s.fact].en}.`, fr: `Tu as oublié ${deg(p.angle)}. Additionne tous les angles que tu connais dans ${GROUP[s.fact].fr}.` };
    case 'decoy': return s.fact === 'quad'
      ? { en: `${deg(p.angle)} is outside the quadrilateral, on the straight line. Add only the four corners.`, fr: `${deg(p.angle)} est à l’extérieur du quadrilatère, sur la ligne droite. Additionne seulement les quatre coins.` }
      : { en: `${deg(p.angle)} is not ${WHERE[s.fact].en} with ${L}. Add only the angles that are.`, fr: `${deg(p.angle)} n’est pas ${WHERE[s.fact].fr} avec ${L}. Additionne seulement ceux qui le sont.` };
    case 'letter': return { en: `${p.letter} is the angle you are finding: you do not know it yet. Add only the angles you know.`, fr: `${p.letter}, c’est l’angle que tu cherches : tu ne le connais pas encore. Additionne seulement les angles que tu connais.` };
    case 'addArith': return { en: `Add again: ${sumList(s)}.`, fr: `Additionne encore : ${sumList(s)}.` };
    case 'noSub': return s.knowns.length === 1
      ? { en: `${S} is the angle you know. Now take it away from ${T}.`, fr: `${S}, c’est l’angle que tu connais. Maintenant, enlève-le de ${T}.` }
      : { en: `${S} is the angles you know, added up. Now take it away from ${T}.`, fr: `${S}, c’est le total des angles que tu connais. Maintenant, enlève-le de ${T}.` };
    case 'subArith': return { en: `Check it by adding: ${S} + your answer must make ${T}.`, fr: `Vérifie en additionnant : ${S} + ta réponse doit faire ${T}.` };
    case 'noShare': return { en: `${deg(s.rest)} is shared between ${n} angles of the same size. Divide by ${n}.`, fr: `${deg(s.rest)} se partage entre ${n} angles de même taille. Divise par ${n}.` };
    case 'shareAll': return { en: `Only ${n} angles are the same size, so divide by ${n}, not by ${s.count}.`, fr: `Seulement ${n} angles ont la même taille, donc divise par ${n}, pas par ${s.count}.` };
    case 'allEqual': return { en: 'Not every angle is the same size. Take away the angle you know first, then share what is left.', fr: 'Les angles n’ont pas tous la même taille. Enlève d’abord l’angle que tu connais, puis partage ce qui reste.' };
    case 'shareArith': return { en: `Check it: ${n} × your answer must make ${deg(s.rest)}.`, fr: `Vérifie : ${n} × ta réponse doit faire ${deg(s.rest)}.` };
    case 'notOpp': return { en: `${deg(180 - s.answer)} is a next-door angle. ${L} is OPPOSITE the ${deg(s.answer)} corner, so it is the same size.`, fr: `${deg(180 - s.answer)}, c’est un angle voisin. ${L} est OPPOSÉ au coin de ${deg(s.answer)}, donc il a la même taille.` };
    case 'oppArith': return { en: `${L} is opposite the ${deg(s.answer)} corner. Opposite angles in a parallelogram are equal.`, fr: `${L} est opposé au coin de ${deg(s.answer)}. Dans un parallélogramme, les angles opposés sont égaux.` };
    case 'wrongFact': return { en: `That fact is true, but it is about a different diagram. These angles are ${WHERE[s.fact].en}.`, fr: `Cette propriété est vraie, mais elle parle d’un autre dessin. Ces angles sont ${WHERE[s.fact].fr}.` };
    case 'wrongNumber': return { en: `Check the number: ${FACTS[s.fact].en}.`, fr: `Vérifie le nombre : ${FACTS[s.fact].fr}.` };
    case 'nextDoor': return { en: 'In a parallelogram, next-door angles add up to 180°. It is the OPPOSITE angles that are equal.', fr: 'Dans un parallélogramme, deux angles voisins font 180°. Ce sont les angles OPPOSÉS qui sont égaux.' };
    case 'looks': return s.fact === 'straight'
      ? { en: `Looking is not a reason: ${S} can look straight too. Add the angles and compare with 180°.`, fr: `Regarder n’est pas une raison : ${S} peut aussi avoir l’air droit. Additionne les angles et compare avec 180°.` }
      : { en: 'A diagram is not drawn to measure. Give the fact you used, not what it looks like.', fr: 'Un dessin n’est pas fait pour être mesuré. Donne la propriété que tu as utilisée, pas ce que ça a l’air de faire.' };
    case 'close': return { en: `Close is not enough: a straight line is exactly 180°, and ${S} is not.`, fr: `Proche, ça ne suffit pas : une ligne droite fait exactement 180°, et ${S} non.` };
    case 'twoOnly': return { en: 'A straight line can have many angles on it. If they add up to 180°, it is straight.', fr: 'Une ligne droite peut avoir beaucoup d’angles. S’ils font 180° en tout, elle est droite.' };
    case 'rounded': return { en: `Add them exactly: ${sumList(s)}. Do not round to 180°.`, fr: `Additionne-les exactement : ${sumList(s)}. N’arrondis pas à 180°.` };
    case 'totalArith': return { en: `Add again: ${sumList(s)}.`, fr: `Additionne encore : ${sumList(s)}.` };
    case 'twoUnknown': return p.fact === 'opp'
      ? { en: `You cannot find ${p.letter} yet: it is opposite an angle you do not know either. Find the angle opposite the one you know.`, fr: `Tu ne peux pas encore trouver ${p.letter} : il est opposé à un angle que tu ne connais pas non plus. Trouve l’angle opposé à celui que tu connais.` }
      : { en: `You cannot find ${p.letter} yet: ${GROUP[p.fact].en} it is in has ${p.unknown} angles you do not know. Start with the letter that is the only unknown in its fact.`, fr: `Tu ne peux pas encore trouver ${p.letter} : ${GROUP[p.fact].fr} où il se trouve a ${p.unknown} angles inconnus. Commence par la lettre qui est la seule inconnue de sa propriété.` };
    default: return s.fact === 'opp'
      ? slipText('oppArith', s)
      : { en: `Not ${deg(p.typed ?? 0)}. Do it in two steps: add the angles you know, then take the total away from ${T}.`, fr: `Pas ${deg(p.typed ?? 0)}. Fais-le en deux étapes : additionne les angles que tu connais, puis enlève le total de ${T}.` };
  }
}
/* ------------------------------------------------------------------ marking */

/** A typed angle: "52", "52°", "52 degrees". A comma is a nudge, not a wrong answer. */
export function readAngle(typed) {
  const s = String(typed ?? '').replace(/°|degrees?|deg/gi, '').trim();
  if (!s) return { soft: true, en: 'Type a number of degrees.', fr: 'Écris un nombre de degrés.' };
  if (/^\d+,\d+$/.test(s)) return { soft: true, en: 'Use a point, not a comma, for a decimal.', fr: 'Utilise un point, pas une virgule, pour un décimal.' };
  if (!/^-?\d+(\.\d+)?$/.test(s)) return { soft: true, en: 'Type just the number of degrees, like 52.', fr: 'Écris seulement le nombre de degrés, comme 52.' };
  return { v: Number(s) };
}

const good = (en, fr) => ({ ok: true, en, fr });
const bad = (code, s, p, stage) => ({ ok: false, code, stage, ...slipText(code, s, p) });

/** Find first: is this letter the only unknown in one of its facts? */
export function diagnoseFirst(s, letter) {
  if (s.findable.includes(letter)) return good(`Yes: ${letter} is the only angle you do not know in its fact. Find it first.`, `Oui : ${letter} est le seul angle inconnu de sa propriété. Trouve-le d’abord.`);
  return bad('twoUnknown', s, { letter, ...(s.blockers?.[letter] || { fact: 'quad', unknown: 2 }) }, 'first');
}
/** The facts the "which fact" stage offers, as cards (components/math/AngleKit.jsx). */
export const DECIDE_FACTS = ['line', 'point', 'quad'];
/**
 * Decide: which fact — a card ('line' | 'point' | 'quad'), or a bare total
 * (180 | 360) as the stage first asked. A card with the right total but the
 * wrong picture (around a point for a quadrilateral) is named `sameTotal`.
 */
export function diagnoseDecide(s, choice) {
  const fact = typeof choice === 'string' ? choice : null;
  const total = fact ? TOTAL[fact] : choice;
  if (fact ? fact === s.fact : total === s.total) return good(`Yes: these angles are ${WHERE[s.fact].en}. They add up to ${deg(s.total)}.`, `Oui : ces angles sont ${WHERE[s.fact].fr}. Ils font ${deg(s.total)} en tout.`);
  if (fact && total === s.total) {
    return { ok: false, code: 'sameTotal', stage: 'decide',
      en: `Close — that is 360° too, but these angles are ${WHERE[s.fact].en}, not ${WHERE[fact].en}.`,
      fr: `Presque — ça fait aussi 360°, mais ces angles sont ${WHERE[s.fact].fr}, pas ${WHERE[fact].fr}.` };
  }
  return bad(DECIDE_CODE[s.fact], s, {}, 'decide');
}
/** Add, part one: which angles go in? `keys` are element keys (letters' keys mean a letter was picked). */
export function diagnosePick(s, keys) {
  const want = s.knowns.map((k) => k.key);
  for (const k of keys) {
    if (want.includes(k)) continue;
    const d = s.decoys.find((x) => x.key === k);
    if (d) return bad('decoy', s, { angle: d.value }, 'add');
    return bad('letter', s, { letter: s.letters[0] }, 'add');
  }
  const missing = s.knowns.filter((k) => !keys.includes(k.key));
  if (missing.length) {
    const r = missing.find((m) => m.right);
    return r ? bad('forgotRight', s, {}, 'add') : bad('forgot', s, { angle: missing[0].value }, 'add');
  }
  return good('', '');
}
function typedCheck(typed, target, s, stage, slips, fallback) {
  const r = readAngle(typed);
  if (r.soft) return r;
  if (same(r.v, target)) return { ok: true, v: r.v };
  const hit = slips.find((x) => same(x.value, r.v));
  if (hit) return bad(hit.code, s, { angle: hit.angle, typed: r.v }, stage);
  return bad(fallback, s, { typed: r.v }, stage);
}
/** Add, part two: the total of the angles you know. */
export const diagnoseSum = (s, typed) => typedCheck(typed, s.sum, s, 'add', [], 'addArith');
/** Subtract: total − what you know. */
export const diagnoseRest = (s, typed) => typedCheck(typed, s.rest, s, 'subtract', [{ code: 'noSub', value: s.sum }], 'subArith');
/** Share: what is left ÷ the equal angles. */
export const diagnoseShare = (s, typed) => typedCheck(typed, s.answer, s, 'share', s.slips.filter((x) => x.stage === 'share'), 'shareArith');
/** A parallelogram's opposite angle. */
export const diagnoseOpp = (s, typed) => typedCheck(typed, s.answer, s, 'calc', s.slips, 'oppArith');
/** Straight: the angles at the point, added. */
export const diagnoseTotal = (s, typed) => typedCheck(typed, s.sum, s, 'total', s.slips, 'totalArith');
/** Say why: one of three sentences. */
export function diagnoseWhy(s, id) {
  const o = s.reasons.find((r) => r.id === id);
  if (!o) return { soft: true, en: 'Choose a reason.', fr: 'Choisis une raison.' };
  if (!o.code) return good('Yes — that is the reason.', 'Oui — c’est la raison.');
  return bad(o.code, s, {}, 'why');
}
/**
 * QUICK: the angle typed straight away. A wrong value names its slip and says
 * which stage to open (`stage`); a value no slip explains opens the first
 * working stage.
 */
export function diagnoseValue(s, typed) {
  const r = readAngle(typed);
  if (r.soft) return r;
  if (same(r.v, s.answer)) return { ok: true, v: r.v };
  const hit = s.slips.find((x) => same(x.value, r.v));
  if (hit) return { ...bad(hit.code, s, { angle: hit.angle, typed: r.v }), stage: openAt(s, hit.stage) };
  return { ...bad('arith', s, { typed: r.v }), stage: openAt(s, 'add') };
}

/* ------------------------------------------------------------------ what is shown */

const dl = (v) => `${fmt(v)}^\\circ`;
/** The working, as the book wants it: b = 360° − (100° + 120°) = 360° − 220° = 140°. */
export function bookLatex(s) {
  if (s.fact === 'straight') return `${s.knowns.map((k) => dl(k.value)).join(' + ')} = ${dl(s.sum)}`;
  const lhs = s.letters.join(' = ');
  if (s.fact === 'opp') return `${lhs} = ${dl(s.answer)}`;
  const T = dl(s.total);
  const ks = s.knowns.map((k) => dl(k.value));
  if (s.share > 1) {
    const r = !ks.length ? T : `(${T} - ${ks.length === 1 ? ks[0] : dl(s.sum)})`;
    return `${lhs} = ${r} \\div ${s.share} = ${dl(s.rest)} \\div ${s.share} = ${dl(s.answer)}`;
  }
  if (ks.length === 1) return `${lhs} = ${T} - ${ks[0]} = ${dl(s.answer)}`;
  return `${lhs} = ${T} - (${ks.join(' + ')}) = ${T} - ${dl(s.sum)} = ${dl(s.answer)}`;
}
/** The reason sentence, written out: "b = 140°, because angles around a point add up to 360°." */
export function reasonLine(s) {
  if (s.fact === 'straight') {
    const r = s.reasons.find((x) => !x.code);
    return { en: r.en, fr: r.fr };
  }
  const lhs = `${s.letters.join(' = ')} = ${deg(s.answer)}`;
  return { en: `${lhs}, because ${FACTS[s.fact].en}.`, fr: `${lhs}, car ${FACTS[s.fact].fr}.` };
}
/** The instruction above the diagram, in the Workbook's words. */
export function questionText(m) {
  if (m.kind === 'straight') return { en: 'Is XY a straight line? Give a reason.', fr: 'XY est-elle une ligne droite ? Donne une raison.' };
  const many = m.letters.length > 1;
  const ask = many
    ? { en: 'Work out the size of the angles that have a letter.', fr: 'Calcule la taille des angles qui ont une lettre.' }
    : { en: 'Work out the size of the angle that has a letter.', fr: 'Calcule la taille de l’angle qui a une lettre.' };
  if (m.kind === 'para') return { en: `This is a parallelogram. ${ask.en}`, fr: `C’est un parallélogramme. ${ask.fr}` };
  if (m.els.ext) return { en: `One side of the quadrilateral is drawn on as a straight line. ${ask.en}`, fr: `Un côté du quadrilatère est prolongé en ligne droite. ${ask.fr}` };
  return ask;
}
export const stageWhere = (s) => WHERE[s.fact] || null;
export { cap, deg, fmt };
