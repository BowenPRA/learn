// The working of X, F or Z? (utils/anglePairs.js) for AngleKit.jsx's Notebook
// and Eq, in the picture's colours: a printed angle teal ('g'), the letter
// orange ('L' / 'cur'), a found angle green ('f'), the stepping stone w purple
// ('s'). One line per angle, written as soon as its pair is named and finished
// when its size is found.
import { REASON } from '../../utils/anglePairs';

const op = (v) => ({ t: 'op', v });
/** The fact card (AngleKit FactCard / FactIcon kind) for each pair. */
export const CARD_KIND = { opp: 'opp', corr: 'corr', alt: 'alt', adj: 'line', none: 'none' };
const NAME = {
  opp: { en: 'vertically opposite (an X)', fr: 'opposés par le sommet (un X)' },
  corr: { en: 'corresponding (an F)', fr: 'correspondants (un F)' },
  alt: { en: 'alternate (a Z)', fr: 'alternes-internes (un Z)' },
  adj: { en: 'on a straight line', fr: 'sur une ligne droite' },
};
const NONE_LINE = (L) => ({
  en: `${L}: you need more information — there are no arrows, so the lines may not be parallel.`,
  fr: `${L} : il faut plus d’informations — pas de flèches, donc les droites ne sont peut-être pas parallèles.`,
});

/** "x = 104°", or for a straight line "x = 180° − 76° = 104°". */
export function sizeParts(letter, answer, rel, from, { letter: lt = 'L', from: ft = 'g', answer: at = 'f' } = {}) {
  const L = { t: lt, v: letter };
  if (rel === 'adj') return [L, op('='), { t: 'n', v: 180 }, op('−'), { t: ft, v: from }, op('='), { t: at, v: answer }];
  return [L, op('='), { t: at, v: answer }];
}
/** The sum shown before the size is typed: "x = 180° − 76° =" (a straight line) or "x =". */
export function frameParts(letter, rel, from, full, { letter: lt = 'cur', from: ft = 'g' } = {}) {
  const L = { t: lt, v: letter };
  if (full && rel === 'adj') return [L, op('='), { t: 'n', v: 180 }, op('−'), { t: ft, v: from }, op('=')];
  return [L, op('=')];
}

const helped = (...as) => (as.some((a) => a?.how === 'shown') ? 'helped' : null);
const pairSay = (L, from, rel, fr = false) => (fr ? `${L} et ${from} : ${NAME[rel].fr}` : `${L} and ${from}: ${NAME[rel].en}`);

/** The notebook lines of one item so far (`run` is useAnglePairItem()). */
export function pairLines(run) {
  const { m, answers, stone } = run;
  if (!m) return [];
  const out = [];
  if (m.kind === 'spot' && answers.tap) {
    out.push({ key: 'tap', kind: CARD_KIND[m.ask], say: { en: `It is ${m.answer}° too, ${REASON[m.ask].en}.`, fr: REASON[m.ask].fr }, tag: helped(answers.tap) });
  }
  if (m.kind === 'find') {
    m.targets.forEach((t, i) => {
      const pair = answers[`pair:${i}`];
      const size = answers[`size:${i}`];
      if (!pair) return;
      const tag = helped(pair, size);
      if (t.right === 'none') { out.push({ key: `t${i}`, kind: 'none', say: NONE_LINE(t.letter), tag }); return; }
      if (!size) { out.push({ key: `t${i}`, kind: CARD_KIND[t.right], say: { en: pairSay(t.letter, `the ${t.from}°`, t.right), fr: pairSay(t.letter, `le ${t.from}°`, t.right, true) }, tag }); return; }
      out.push({ key: `t${i}`, kind: CARD_KIND[t.right], parts: sizeParts(t.letter, t.answer, t.right, t.from), say: REASON[t.right], tag });
    });
  }
  if (m.kind === 'steps' && stone && answers.stone) {
    const known = answers.stoneSize || answers['size:0'];
    out.push({
      key: 'w', kind: CARD_KIND[stone.inRel], tag: helped(answers.stone, answers.stoneSize),
      ...(known
        ? { parts: sizeParts('w', stone.size, stone.inRel, m.given.size, { letter: 's', answer: 's' }), say: REASON[stone.inRel] }
        : { say: { en: pairSay('w', `the ${m.given.size}°`, stone.inRel), fr: pairSay('w', `le ${m.given.size}°`, stone.inRel, true) } }),
    });
    const pair = answers['pair:0'];
    const size = answers['size:0'];
    if (pair) {
      const z = m.target.letter;
      out.push({
        key: 'z', kind: CARD_KIND[stone.outRel], tag: helped(pair, size),
        ...(size
          ? { parts: sizeParts(z, m.target.answer, stone.outRel, stone.size, { from: 's' }), say: REASON[stone.outRel] }
          : { say: { en: pairSay(z, 'w', stone.outRel), fr: pairSay(z, 'w', stone.outRel, true) } }),
      });
    }
  }
  if (m.kind === 'which') {
    m.lines.forEach((l, n) => {
      const c = answers[`convert:${n}`];
      if (c) out.push({ key: `c${n}`, kind: 'corr', say: { en: `In the same place, line ${l.name}’s angle is ${l.same}°.`, fr: `À la même place, l’angle de la droite ${l.name} fait ${l.same}°.` }, tag: helped(c) });
    });
    const odd = m.lines[m.odd];
    const other = m.lines.find((_, i) => i !== m.odd);
    if (answers.line) out.push({ key: 'line', say: { en: `Line ${odd.name} is not parallel to the other two.`, fr: `La droite ${odd.name} n’est pas parallèle aux deux autres.` }, tag: helped(answers.line) });
    if (answers.reason) {
      out.push({
        key: 'reason', kind: 'corr', tag: helped(answers.reason),
        say: {
          en: `In the same place its angle is ${odd.same}°, not ${other.same}°: corresponding angles are equal only when the lines are parallel.`,
          fr: `À la même place, son angle fait ${odd.same}°, pas ${other.same}° : les angles correspondants ne sont égaux que si les droites sont parallèles.`,
        },
      });
    }
  }
  return out;
}
