// Year 7 Maths · 7.1 · Mixed ↔ improper, played by the step engine (unit/src/stepPractice).
//
// The Workbook's Exercise 7.1 Question 4 (an improper fraction as a mixed number, with
// the division written out: 15 ÷ 4 = ☐ remainder ☐), and the way back (a mixed number
// as an improper fraction: multiply, then add), with new numbers. Each problem is built
// from its numbers below, so every answer and every slip is worked out, not typed.
//
// Levels, as the Workbook's sections: focus f1–f4 (every step), practice p1–p4 (the
// key step and the answer; a wrong answer opens the steps), challenge c1–c2 (the
// answer only).
// ENGLISH AND FRENCH ONLY: every string the student reads has an …Fr twin.
// Check: checkStepPractice(set, { fr: true }) from unit/src/stepPractice/check.js.

const frac = (n, d) => `\\dfrac{${n}}{${d}}`;
const mixed = (w, n, d) => `${w}\\dfrac{${n}}{${d}}`;
const opt = (id, tex) => ({ id, text: `$${tex}$`, textFr: `$${tex}$` });
// What the pieces are called: "fifths", "a fifth" (and in French).
const PIECES = {
  2: ['halves', 'a half', 'demis', 'un demi'], 3: ['thirds', 'a third', 'tiers', 'un tiers'],
  4: ['quarters', 'a quarter', 'quarts', 'un quart'], 5: ['fifths', 'a fifth', 'cinquièmes', 'un cinquième'],
  6: ['sixths', 'a sixth', 'sixièmes', 'un sixième'], 7: ['sevenths', 'a seventh', 'septièmes', 'un septième'],
  8: ['eighths', 'an eighth', 'huitièmes', 'un huitième'], 9: ['ninths', 'a ninth', 'neuvièmes', 'un neuvième'],
};

/** An improper fraction n/d as a mixed number: divide, the remainder, then the answer. */
function toMixed(id, level, n, d) {
  const w = Math.floor(n / d);
  const r = n % d;
  return {
    id, level,
    prompt: `Write $${frac(n, d)}$ as a [[mixed number]].`,
    promptFr: `Écris $${frac(n, d)}$ en [[nombre mixte]].`,
    steps: [
      {
        key: true,
        title: 'Divide the top by the bottom', titleFr: 'Divise le haut par le bas',
        sub: 'How many whole times does it go?', subFr: 'Combien de fois entières ?',
        input: { type: 'number', before: `$${n} \\div ${d} =$`, after: 'remainder …', afterFr: 'reste …', answer: String(w) },
        line: `$${n} \\div ${d} = $ @`, lineFr: `$${n} \\div ${d} = $ @`,
        hint: `Count up in ${d}s: how many ${d}s fit in ${n} without going over?`,
        hintFr: `Compte de ${d} en ${d} : combien de ${d} tiennent dans ${n} sans dépasser ?`,
        slips: [
          ...(r > 0 ? [{ value: String(w + 1), key: 'over', msg: `${w + 1} × ${d} = ${(w + 1) * d}, which is more than ${n}. Take one less.`, msgFr: `${w + 1} × ${d} = ${(w + 1) * d}, c’est plus que ${n}. Prends-en un de moins.` }] : []),
          { value: String(n - d), key: 'subtract', msg: `That is ${n} − ${d}. Divide: how many ${d}s are in ${n}?`, msgFr: `Ça, c’est ${n} − ${d}. Divise : combien de ${d} dans ${n} ?` },
        ],
      },
      {
        title: 'What is left over?', titleFr: 'Que reste-t-il ?',
        sub: `${w} × ${d} = ${w * d}. Take it away from ${n}.`, subFr: `${w} × ${d} = ${w * d}. Enlève-le de ${n}.`,
        input: { type: 'number', before: `$${n} \\div ${d} = ${w}$ remainder`, beforeFr: `$${n} \\div ${d} = ${w}$ reste`, answer: String(r) },
        line: `$${n} \\div ${d} = ${w}$ remainder @`, lineFr: `$${n} \\div ${d} = ${w}$ reste @`,
        hint: `${n} − ${w * d} = ?`, hintFr: `${n} − ${w * d} = ?`,
        slips: [
          ...(w !== r ? [{ value: String(w), key: 'whole', msg: `${w} is the whole number. The remainder is what is left: ${n} − ${w * d}.`, msgFr: `${w} est le nombre entier. Le reste, c’est ce qui reste : ${n} − ${w * d}.` }] : []),
          ...(r + d !== w ? [{ value: String(r + d), key: 'one-less', msg: `A remainder is always smaller than ${d}. If ${r + d} is left, one more ${d} fits.`, msgFr: `Un reste est toujours plus petit que ${d}. S’il reste ${r + d}, un ${d} de plus tient dedans.` }] : []),
        ],
      },
      {
        title: 'Write the mixed number', titleFr: 'Écris le nombre mixte',
        sub: 'The remainder goes on top. The bottom stays.', subFr: 'Le reste va en haut. Le bas ne change pas.',
        input: { type: 'choice', options: [opt('right', mixed(w, r, d)), opt('swap', mixed(r, w, d)), opt('top', mixed(w, r, n))], answer: 'right', shuffle: true },
        line: `$${frac(n, d)} = ${mixed(w, r, d)}$`, lineFr: `$${frac(n, d)} = ${mixed(w, r, d)}$`,
        hint: `Whole number ${w}, remainder ${r} on top, the bottom ${d} stays.`, hintFr: `Nombre entier ${w}, reste ${r} en haut, le bas ${d} ne change pas.`,
        why: `Check it: ${w} × ${d} + ${r} = ${n}, back to $${frac(n, d)}$.`, whyFr: `Vérifie : ${w} × ${d} + ${r} = ${n}, on retrouve $${frac(n, d)}$.`,
        slips: [
          { value: 'swap', step: 1, key: 'swapped', msg: `The whole number is the answer to ${n} ÷ ${d}, and the remainder goes on top.`, msgFr: `Le nombre entier est la réponse de ${n} ÷ ${d}, et le reste va en haut.` },
          { value: 'top', key: 'new-bottom', msg: `The bottom stays ${d}: the pieces are still ${PIECES[d][0]}.`, msgFr: `Le bas reste ${d} : les parts sont toujours des ${PIECES[d][2]}.` },
        ],
      },
    ],
  };
}

/** A mixed number w n/d as an improper fraction: multiply, add, then the answer. */
function toImproper(id, level, w, n, d) {
  const m = w * d;
  const top = m + n;
  return {
    id, level,
    prompt: `Write $${mixed(w, n, d)}$ as an [[improper fraction]].`,
    promptFr: `Écris $${mixed(w, n, d)}$ en [[fraction impropre]].`,
    steps: [
      {
        key: true,
        title: 'Multiply the whole number by the bottom', titleFr: 'Multiplie le nombre entier par le bas',
        sub: `How many ${PIECES[d][0]} are in ${w} wholes?`, subFr: `Combien de ${PIECES[d][2]} dans ${w} entiers ?`,
        input: { type: 'number', before: `$${w} \\times ${d} =$`, answer: String(m) },
        line: `$${w} \\times ${d} = $ @`, lineFr: `$${w} \\times ${d} = $ @`,
        hint: `Each whole is ${d} pieces, and there are ${w} wholes.`, hintFr: `Chaque entier fait ${d} parts, et il y a ${w} entiers.`,
        slips: [
          { value: String(w + d), key: 'added', msg: `You added ${w} + ${d}. Multiply: ${w} wholes of ${d} pieces each.`, msgFr: `Tu as fait ${w} + ${d}. Multiplie : ${w} entiers de ${d} parts chacun.` },
          ...(w * n !== m && w * n !== w + d ? [{ value: String(w * n), key: 'times-top', msg: `You multiplied by the top. Multiply the whole number by the bottom, ${d}.`, msgFr: `Tu as multiplié par le haut. Multiplie le nombre entier par le bas, ${d}.` }] : []),
        ],
      },
      {
        title: 'Add the top', titleFr: 'Ajoute le haut',
        sub: `${m} pieces, and ${n} more.`, subFr: `${m} parts, et ${n} de plus.`,
        input: { type: 'number', before: `$${m} + ${n} =$`, answer: String(top) },
        line: `$${m} + ${n} = $ @`, lineFr: `$${m} + ${n} = $ @`,
        hint: `Add the ${n} pieces of the fraction to the ${m}.`, hintFr: `Ajoute les ${n} parts de la fraction aux ${m}.`,
        slips: m * n !== top ? [{ value: String(m * n), key: 'times', msg: n === 1 ? `Add the ${n} piece to the ${m}.` : 'Add this time, do not multiply.', msgFr: n === 1 ? `Ajoute la part à ${m}.` : 'Cette fois, ajoute : ne multiplie pas.' }] : [],
      },
      {
        title: 'Write the improper fraction', titleFr: 'Écris la fraction impropre',
        sub: 'Put it over the same bottom.', subFr: 'Mets-le sur le même bas.',
        input: { type: 'choice', options: [opt('right', frac(top, d)), opt('flip', frac(d, top)), opt('sum', frac(w + n, d))], answer: 'right', shuffle: true },
        line: `$${mixed(w, n, d)} = ${frac(top, d)}$`, lineFr: `$${mixed(w, n, d)} = ${frac(top, d)}$`,
        hint: `${top} pieces, and each piece is ${PIECES[d][1]}.`, hintFr: `${top} parts, et chaque part est ${PIECES[d][3]}.`,
        why: `Check it: ${top} ÷ ${d} = ${w} remainder ${n}, back to $${mixed(w, n, d)}$.`, whyFr: `Vérifie : ${top} ÷ ${d} = ${w} reste ${n}, on retrouve $${mixed(w, n, d)}$.`,
        slips: [
          { value: 'flip', key: 'upside-down', msg: `That is upside down. The ${top} pieces go on top, the ${d} at the bottom.`, msgFr: `C’est à l’envers. Les ${top} parts vont en haut, le ${d} en bas.` },
          { value: 'sum', step: 1, key: 'whole-plus-top', msg: `${w} + ${n} counts each whole as one piece. Each whole is ${d} pieces: multiply first.`, msgFr: `${w} + ${n} compte chaque entier comme une seule part. Chaque entier fait ${d} parts : multiplie d’abord.` },
        ],
      },
    ],
  };
}

const items = [
  toMixed('f1', 'focus', 13, 5),
  toMixed('f2', 'focus', 17, 6),
  toImproper('f3', 'focus', 2, 5, 8),
  toImproper('f4', 'focus', 5, 1, 3),
  toMixed('p1', 'practice', 25, 7),
  toImproper('p2', 'practice', 4, 3, 5),
  toMixed('p3', 'practice', 31, 8),
  toImproper('p4', 'practice', 6, 1, 2),
  toMixed('c1', 'challenge', 47, 9),
  toImproper('c2', 'challenge', 7, 2, 3),
];

export default {
  title: 'Mixed ↔ improper',
  titleFr: 'Mixte ↔ impropre',
  items,
};
