/**
 * X, F or Z? — the engine behind the ANGLE_PAIR task and the `anglepair` deck
 * activity (Year 7 Maths 5.2, Intersecting lines). An item states only the
 * picture and what is asked; everything else is derived here: the angles, how
 * the two are joined, the answer, the reason sentence, and the name of the
 * slip behind a wrong answer. Geometry in anglePairGeom.js; the proof the
 * validator runs is checkAnglePairItems (anglePairCheck.js).
 *
 *   { id, level, kind: 'spot',  fig, given: [c, w], ask: 'opp' | 'corr' | 'alt' }
 *   { id, level, kind: 'find',  fig, given: [c, w], find: [{ at: [c, w], letter }, …1–2] }
 *   { id, level, kind: 'steps', fig, given: [c, w], find: [{ at: [c, w], letter }] }
 *   { id, level, kind: 'which', fig (type three), given: [[0, w], [1, w], [2, w]], context?, contextFr? }
 *
 * Stages — two or three actions per item, and naming the pair always stays:
 *   spot  tap                       (the question names the pair)
 *   find  pair, size (per letter)   no size when the answer is "you can't tell"
 *   steps stone, pair, size         the stone's own size opens only after a wrong size
 *   which line, reason              "move it to the same place" opens only after a wrong line
 */
import { figureOf, relationOf, sizeOf, ONE_STEP, EQUAL_RELS, letterAllowed, sameAt } from './anglePairGeom.js';

export const PAIR_IDS = ['opp', 'corr', 'alt', 'adj', 'none'];
export const PAIR_LABEL = {
  opp: { mark: 'X', en: 'Vertically opposite', fr: 'Opposés par le sommet' },
  corr: { mark: 'F', en: 'Corresponding', fr: 'Correspondants' },
  alt: { mark: 'Z', en: 'Alternate', fr: 'Alternes-internes' },
  adj: { mark: '180°', en: 'On a straight line', fr: 'Sur une ligne droite' },
  none: { mark: '?', en: 'No arrows: you can’t tell', fr: 'Pas de flèches : on ne sait pas' },
};
const NAME = {
  opp: { en: 'vertically opposite', fr: 'opposés par le sommet' },
  corr: { en: 'corresponding', fr: 'correspondants' },
  alt: { en: 'alternate', fr: 'alternes-internes' },
};
/** The reason as the class writes it — in English — with the French beside it. */
export const REASON = {
  opp: { en: 'because they are vertically opposite angles', fr: 'car ce sont des angles opposés par le sommet' },
  corr: { en: 'because they are corresponding angles', fr: 'car ce sont des angles correspondants' },
  alt: { en: 'because they are alternate angles', fr: 'car ce sont des angles alternes-internes' },
  adj: { en: 'because angles on a straight line add up to 180°', fr: 'car les angles sur une ligne droite font 180°' },
};
const NONE_SENTENCE = {
  en: 'You need more information: there are no arrows, so the lines may not be parallel.',
  fr: 'You need more information. (Il faut plus d’informations : il n’y a pas de flèches, donc les droites ne sont peut-être pas parallèles.)',
};
const m2 = (en, fr) => ({ en, fr });

/** "x = 104° because …" in English, and the same with the French gloss. */
export function sentence(letter, value, rel, from) {
  if (rel === 'none' || value == null) return { ...NONE_SENTENCE, letter };
  const r = REASON[rel];
  const sum = rel === 'adj' ? `${letter} = 180° − ${from}° = ${value}°` : `${letter} = ${value}°`;
  return { en: `${sum} ${r.en}.`, fr: `${sum} ${r.en}. (${r.fr})` };
}

const everySector = (F) => F.points.flatMap((_, c) => [0, 1, 2, 3].map((w) => [c, w]));

/** Everything about one item. Throws on an item the engine cannot run. */
export function itemModel(item) {
  const F = figureOf(item.fig);
  const kind = item.kind;
  if (kind === 'which') return whichModel(item, F);
  const g = item.given;
  if (!Array.isArray(g) || !F.sectors[g[0]]?.[g[1]]) throw new Error('given must be [crossing, sector] on the figure');
  const given = { at: g, size: sizeOf(F, g) };
  if (kind === 'spot') {
    if (!['opp', 'corr', 'alt'].includes(item.ask)) throw new Error('spot ask must be opp, corr or alt');
    const hits = everySector(F).filter((s) => relationOf(F, g, s) === item.ask && letterAllowed(F, g, s));
    if (hits.length !== 1) throw new Error(`spot: ${hits.length} angles are ${item.ask} to the given one and drawable — need exactly 1`);
    return { id: item.id, kind, F, given, ask: item.ask, answerAt: hits[0], answer: sizeOf(F, hits[0]), stages: ['tap'] };
  }
  const finds = item.find || [];
  if (kind === 'find') {
    if (finds.length < 1 || finds.length > 2) throw new Error('find needs one or two letters');
    const targets = finds.map((t) => {
      if (!F.sectors[t.at?.[0]]?.[t.at?.[1]]) throw new Error(`find ${t.letter}: at is not on the figure`);
      const rel = relationOf(F, g, t.at);
      if (!ONE_STEP.includes(rel)) throw new Error(`find ${t.letter}: it is "${rel}" to the given angle — one X, F, Z or straight line only`);
      const right = F.type === 'pair' && !F.marked && (rel === 'corr' || rel === 'alt') ? 'none' : rel;
      return {
        at: t.at, letter: t.letter, rel, right, from: given.size,
        answer: right === 'none' ? null : sizeOf(F, t.at),
        options: F.type === 'x' ? ['opp', 'adj'] : PAIR_IDS,
      };
    });
    const stages = targets.flatMap((t, i) => (t.answer == null ? [`pair:${i}`] : [`pair:${i}`, `size:${i}`]));
    return { id: item.id, kind, F, given, targets, stages };
  }
  if (kind === 'steps') {
    if (finds.length !== 1) throw new Error('steps needs exactly one letter');
    if (F.type !== 'pair' || !F.marked) throw new Error('steps needs a pair figure with arrows');
    const target = finds[0];
    const rel = relationOf(F, g, target.at);
    if (ONE_STEP.includes(rel) || rel === 'self') throw new Error(`steps: "${rel}" is one step — use find`);
    const stones = everySector(F)
      .filter((s) => !sameAt(s, g) && !sameAt(s, target.at))
      .filter((s) => ONE_STEP.includes(relationOf(F, g, s)) && ONE_STEP.includes(relationOf(F, s, target.at)))
      .map((s) => ({
        at: s, inRel: relationOf(F, g, s), outRel: relationOf(F, s, target.at), size: sizeOf(F, s),
        drawn: letterAllowed(F, g, s) && letterAllowed(F, s, target.at),
      }));
    if (!stones.length) throw new Error('steps: no angle links the two in one step each');
    return {
      id: item.id, kind, F, given, rel, stones, stages: ['stone', 'pair:0', 'size:0'],
      target: { at: target.at, letter: target.letter, answer: sizeOf(F, target.at), options: PAIR_IDS },
    };
  }
  throw new Error(`kind "${kind}" — spot, find, steps or which`);
}

function whichModel(item, F) {
  if (F.type !== 'three') throw new Error('which needs a three figure');
  const given = item.given || [];
  if (given.length !== 3 || given.some((p, i) => p?.[0] !== i || !F.sectors[i]?.[p?.[1]])) throw new Error('which: given is [[0, w], [1, w], [2, w]]');
  const ref = item.ref ?? given[0][1];
  const lines = given.map((p, i) => ({
    name: 'ABC'[i], printedAt: p, printed: sizeOf(F, p), refAt: [i, ref], same: sizeOf(F, [i, ref]),
    conv: relationOf(F, p, [i, ref]),
  }));
  const count = (v) => lines.filter((l) => l.same === v).length;
  const odd = lines.findIndex((l) => count(l.same) === 1);
  if (odd === -1 || lines.some((l, i) => i !== odd && count(l.same) !== 2)) throw new Error('which: exactly one line must differ in the same place');
  return { id: item.id, kind: 'which', F, ref, lines, odd, stages: ['line', 'reason'] };
}

/* ── the words for the slips ──────────────────────────────────────────── */
const ASKED = {
  opp: m2('Vertically opposite means across the crossing, at the same point.', 'Opposés par le sommet : de l’autre côté du croisement, au même point.'),
  corr: m2('Corresponding means in the same place at the other crossing.', 'Correspondants : à la même place, à l’autre croisement.'),
  alt: m2('Alternate means between the lines, on the other side of the line across.', 'Alternes-internes : entre les droites, de l’autre côté de la sécante.'),
};
const WHAT = {
  self: m2('That is the angle you know.', 'C’est l’angle que tu connais.'),
  opp: m2('That one is across the crossing from it: vertically opposite (an X).', 'Celui-là est de l’autre côté du croisement : opposé par le sommet (un X).'),
  corr: m2('That one is in the same place at the other crossing: corresponding (an F).', 'Celui-là est à la même place à l’autre croisement : correspondant (un F).'),
  alt: m2('That one is between the lines, on the other side: alternate (a Z).', 'Celui-là est entre les droites, de l’autre côté : alterne-interne (un Z).'),
  adj: m2('That one is next to it on a straight line: together they make 180°.', 'Celui-là est à côté, sur une ligne droite : ensemble, ils font 180°.'),
  side: m2('That one is between the lines on the same side: together they make 180°, so they are not equal.', 'Celui-là est entre les droites, du même côté : ensemble, ils font 180°, donc ils ne sont pas égaux.'),
  altext: m2('That one is equal too, but it takes two steps to get there, not one X, F or Z.', 'Celui-là est égal aussi, mais il faut deux étapes, pas un seul X, F ou Z.'),
  far180: m2('That one is not joined to it by one X, F or Z.', 'Celui-là n’est pas relié par un seul X, F ou Z.'),
};
const cat = (m, n) => m2(`${m.en} ${n.en}`, `${m.fr} ${n.fr}`);

/** A tap in a `spot` item: right, or the pair the student tapped instead. */
export function diagnoseTap(m, at) {
  if (sameAt(at, m.answerAt)) {
    return { ok: true, ...m2(`Yes: they are ${NAME[m.ask].en} angles, so this one is ${m.answer}° too.`, `Oui : ce sont des angles ${NAME[m.ask].fr}, donc celui-ci fait aussi ${m.answer}°.`) };
  }
  const rel = relationOf(m.F, m.given.at, at);
  const code = rel === 'altext' || rel === 'far180' ? 'twostep' : rel;
  let msg = cat(WHAT[rel] || WHAT.far180, ASKED[m.ask]);
  if (m.ask === 'opp' && rel === 'adj') msg = cat(msg, m2('“Vertically” means at the vertex — not up and down.', '« Vertically » veut dire au sommet — pas de haut en bas.'));
  return { ok: false, code, ...msg };
}

const sameCrossing = (A, B) => A[0] === B[0];
const WHYNOT = {
  opp: (near) => (near
    ? m2('Vertically opposite angles are across from each other. These two are next to each other.', 'Des angles opposés par le sommet sont l’un en face de l’autre. Ces deux-là sont côte à côte.')
    : m2('Vertically opposite angles are at ONE crossing. These two are at different crossings.', 'Des angles opposés par le sommet sont au MÊME croisement. Ces deux-là sont à des croisements différents.')),
  adj: (near) => (near
    ? m2('Angles on a straight line are next to each other. These two are across from each other.', 'Des angles sur une ligne droite sont côte à côte. Ces deux-là sont l’un en face de l’autre.')
    : m2('Angles on a straight line are at ONE crossing. These two are at different crossings.', 'Des angles sur une ligne droite sont au MÊME croisement. Ces deux-là sont à des croisements différents.')),
  corr: (near) => (near
    ? m2('Corresponding angles are at two different crossings. These two are at the same crossing.', 'Des angles correspondants sont à deux croisements différents. Ces deux-là sont au même croisement.')
    : m2('Corresponding angles are in the same place at each crossing. Look again: are they both above their line, or both below?', 'Des angles correspondants sont à la même place à chaque croisement. Regarde encore : sont-ils tous les deux au-dessus de leur droite, ou en dessous ?')),
  alt: (near) => (near
    ? m2('Alternate angles are at two different crossings. These two are at the same crossing.', 'Des angles alternes-internes sont à deux croisements différents. Ces deux-là sont au même croisement.')
    : m2('Alternate angles are on opposite sides of the line across. These two are on the same side.', 'Des angles alternes-internes sont de part et d’autre de la sécante. Ces deux-là sont du même côté.')),
};

/** Naming the pair. `t` is the target: { at, rel, right } and `from` is where it is measured from. */
export function diagnosePair(t, fromAt, choice) {
  if (choice === t.right) {
    if (t.right === 'none') return { ok: true, ...m2('Yes: no arrows, so you do not know the lines are parallel. F and Z need parallel lines.', 'Oui : pas de flèches, donc on ne sait pas si les droites sont parallèles. F et Z demandent des droites parallèles.') };
    return { ok: true, ...m2(`Yes: ${PAIR_LABEL[t.right].mark === '180°' ? 'they are on a straight line' : `${PAIR_LABEL[t.right].mark} — ${NAME[t.right].en}`}.`, `Oui : ${PAIR_LABEL[t.right].mark === '180°' ? 'ils sont sur une ligne droite' : `${PAIR_LABEL[t.right].mark} — ${NAME[t.right].fr}`}.`) };
  }
  if (t.right === 'none') {
    if (choice === 'corr' || choice === 'alt') return { ok: false, code: 'noarrows', ...m2('Look for the arrows: there are none, so you do not know the lines are parallel. You cannot use F or Z.', 'Cherche les flèches : il n’y en a pas, donc on ne sait pas si les droites sont parallèles. On ne peut pas utiliser F ou Z.') };
    return { ok: false, code: choice, ...WHYNOT[choice](false) };
  }
  if (choice === 'none') {
    if (t.rel === 'opp' || t.rel === 'adj') return { ok: false, code: 'needless', ...m2('An X and a straight line do not need parallel lines: two straight lines always make them.', 'Un X et une ligne droite n’ont pas besoin de droites parallèles : deux droites les font toujours.') };
    return { ok: false, code: 'arrows', ...m2('Look again: the arrows say the lines are parallel, so you can use F and Z.', 'Regarde encore : les flèches disent que les droites sont parallèles, donc tu peux utiliser F et Z.') };
  }
  return { ok: false, code: choice, ...WHYNOT[choice](sameCrossing(t.at, fromAt)) };
}

/** Reads "72", "72°", " 72 deg". NaN when it is not a number of degrees. */
export function readDegrees(typed) {
  const s = String(typed ?? '').trim().replace(/\s*(°|deg(rees)?)\s*$/i, '').trim();
  return /^\d{1,3}(\.\d+)?$/.test(s) ? Number(s) : NaN;
}

/** A typed size: `answer`, measured from `from` by `rel` (the student's own pair). */
export function diagnoseSize({ answer, from, rel, letter }, typed) {
  const v = readDegrees(typed);
  if (!Number.isFinite(v)) return { ok: false, soft: true, ...m2('Type the size in degrees, like 72.', 'Écris la taille en degrés, comme 72.') };
  if (v === answer) return { ok: true, ...m2(`Yes: ${letter} = ${answer}°.`, `Oui : ${letter} = ${answer}°.`) };
  const eq = EQUAL_RELS.includes(rel);
  if (eq && v === 180 - from) return { ok: false, code: 'supp', ...m2('These two angles are equal, so there is no 180° here.', 'Ces deux angles sont égaux, donc pas de 180° ici.') };
  if (!eq && v === from) return { ok: false, code: 'same', ...m2('These two are not equal: together they make 180°.', 'Ces deux-là ne sont pas égaux : ensemble, ils font 180°.') };
  if (v === 360 - from) return { ok: false, code: 'full', ...m2('360° is all the way round a point. A straight line is 180°.', '360°, c’est le tour complet d’un point. Une ligne droite fait 180°.') };
  if (from < 90 && v === 90 - from) return { ok: false, code: 'comp', ...m2('90° is a right angle. A straight line is 180°.', '90°, c’est un angle droit. Une ligne droite fait 180°.') };
  if (!eq && Math.abs(v - answer) <= 10) return { ok: false, code: 'arith', ...m2(`Nearly. Work out 180° − ${from}° again.`, `Presque. Recalcule 180° − ${from}°.`) };
  return { ok: false, code: 'value', ...m2('Not quite. Look at the pair again: equal, or 180° together?', 'Pas tout à fait. Regarde la paire encore : égaux, ou 180° ensemble ?') };
}

/** A tapped stepping stone in a `steps` item. */
export function diagnoseStone(m, at) {
  const stone = m.stones.find((s) => sameAt(s.at, at));
  if (stone) return { ok: true, stone, ...m2('Yes: you can find that one in one step, and it leads to the answer.', 'Oui : tu peux le trouver en une étape, et il mène à la réponse.') };
  if (sameAt(at, m.given.at)) return { ok: false, code: 'given', ...m2('That is the angle you know. Tap an angle you can work out from it.', 'C’est l’angle que tu connais. Touche un angle que tu peux trouver grâce à lui.') };
  if (sameAt(at, m.target.at)) return { ok: false, code: 'target', ...m2(`That is ${m.target.letter} itself: you cannot get there in one step. Tap an angle on the way.`, `C’est ${m.target.letter} lui-même : on n’y arrive pas en une étape. Touche un angle sur le chemin.`) };
  if (!ONE_STEP.includes(relationOf(m.F, m.given.at, at))) return { ok: false, code: 'far', ...m2(`You cannot find that one from the ${m.given.size}° in one step.`, `On ne peut pas trouver celui-là à partir de ${m.given.size}° en une étape.`) };
  return { ok: false, code: 'deadend', ...m2(`You can find that one, but it does not lead to ${m.target.letter} in one step.`, `Tu peux trouver celui-là, mais il ne mène pas à ${m.target.letter} en une étape.`) };
}

/** A tapped line in a `which` item: the odd one, or one that is parallel after all. */
export function diagnoseLine(m, i) {
  const l = m.lines[i];
  if (i === m.odd) return { ok: true, ...m2(`Yes: line ${l.name} is not parallel to the other two.`, `Oui : la droite ${l.name} n’est pas parallèle aux deux autres.`) };
  // The line to move to the same place: the one tapped, or — when its angle is
  // already there — the other parallel line, never the odd one.
  if (l.conv !== 'self') {
    return { ok: false, code: 'printed', convertLine: i, ...m2(`Move each angle to the same place before you compare. Is line ${l.name}’s angle really different?`, `Ramène chaque angle à la même place avant de comparer. L’angle de la droite ${l.name} est-il vraiment différent ?`) };
  }
  const j = m.lines.findIndex((o, k) => k !== i && k !== m.odd && o.conv !== 'self');
  const o = m.lines[j];
  return {
    ok: false, code: 'printed', convertLine: j === -1 ? null : j,
    ...(o
      ? m2(`Line ${l.name}’s angle is already in its place. Move line ${o.name}’s angle to the same place, then compare.`, `L’angle de la droite ${l.name} est déjà à sa place. Ramène l’angle de la droite ${o.name} à la même place, puis compare.`)
      : m2('Compare the angles in the same place at each line.', 'Compare les angles à la même place sur chaque droite.')),
  };
}

export const REASON_IDS = ['same', 'perp', 'eye'];
/** Why the odd line is not parallel. */
export function diagnoseReason(m, choice) {
  if (choice === 'same') return { ok: true, ...m2('Yes: in the same place its angle is different, so these corresponding angles are not equal — the lines are not parallel.', 'Oui : à la même place, son angle est différent, donc ces angles correspondants ne sont pas égaux — les droites ne sont pas parallèles.') };
  if (choice === 'perp') return { ok: false, code: 'perp', ...m2('Parallel does not mean 90°: the other two lines are not at 90° either, and they are parallel.', 'Parallèle ne veut pas dire 90° : les deux autres droites ne font pas 90° non plus, et elles sont parallèles.') };
  return { ok: false, code: 'eye', ...m2('Your eyes cannot see a few degrees. The numbers decide, not the picture.', 'Tes yeux ne voient pas quelques degrés. Ce sont les nombres qui décident, pas le dessin.') };
}

/** The finished item, as the sentences a student would write. */
export function sentencesOf(m, stone) {
  if (m.kind === 'spot') {
    const r = REASON[m.ask];
    return [m2(`It is ${m.answer}° too, ${r.en}.`, `It is ${m.answer}° too, ${r.en}. (${r.fr})`)];
  }
  if (m.kind === 'find') return m.targets.map((t) => sentence(t.letter, t.answer, t.right, t.from));
  if (m.kind === 'steps') {
    const s = stone || m.stones.find((x) => x.drawn) || m.stones[0];
    return [sentence('w', s.size, s.inRel, m.given.size), sentence(m.target.letter, m.target.answer, s.outRel, s.size)];
  }
  const odd = m.lines[m.odd];
  const other = m.lines.find((_, i) => i !== m.odd);
  return [m2(`Line ${odd.name} is not parallel: in the same place its angle is ${odd.same}°, not ${other.same}°. Corresponding angles are equal only when the lines are parallel.`,
    `La droite ${odd.name} n’est pas parallèle : à la même place, son angle fait ${odd.same}°, pas ${other.same}°. Les angles correspondants ne sont égaux que si les droites sont parallèles.`)];
}
