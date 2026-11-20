// Year 7 Maths · 7.1 · Which is bigger?, played by the step engine (unit/src/stepPractice).
//
// The Workbook's Exercise 7.1 Questions 5, 8, 9 and 10 (< or > between an improper
// fraction and a mixed number, or two improper fractions) and the order-of-size
// questions, with new numbers. Bowen, 20 November 2026: the student changes every
// improper fraction to a mixed number as a step of its own before comparing. Then:
//   different whole numbers  the bigger whole number wins
//   the same whole number    a common denominator, an equivalent fraction for each
//                            fractional part, then compare the tops
// Every step, answer and slip is worked out from the numbers below.
//
// Levels: focus f1–f3 (every step), practice p1–p5 (the changing steps and the answer;
// a wrong answer opens the rest), challenge c1–c2 (the answer only).
// ENGLISH AND FRENCH ONLY: every string the student reads has an …Fr twin.
// Check: checkStepPractice(set, { fr: true }) from unit/src/stepPractice/check.js.

const frac = (n, d) => `\\dfrac{${n}}{${d}}`;
const mixedTex = (w, n, d) => `${w}\\dfrac{${n}}{${d}}`;
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const lcm = (a, b) => (a * b) / gcd(a, b);

// A side is { n, d } (an improper fraction) or { w, n, d } (a mixed number).
const tex = (s) => (s.w != null ? mixedTex(s.w, s.n, s.d) : frac(s.n, s.d));
const parts = (s) => (s.w != null ? { w: s.w, r: s.n, d: s.d } : { w: Math.floor(s.n / s.d), r: s.n % s.d, d: s.d });
const tops = (s) => (s.w != null ? s.w * s.d + s.n : s.n);   // as an improper fraction's top
const SYM = { lt: '<', gt: '>', eq: '=' };
const symOf = (a, b) => { const x = tops(a) * b.d; const y = tops(b) * a.d; return x < y ? 'lt' : x > y ? 'gt' : 'eq'; };
const choice = (id, t) => ({ id, text: `$${t}$`, textFr: `$${t}$` });

/** The two steps that change an improper fraction to a mixed number (both always asked). */
function changeSteps(s) {
  const { w, r, d } = parts(s);
  const n = s.n;
  return [
    {
      key: true,
      title: 'Change it to a mixed number', titleFr: 'Transforme-la en nombre mixte',
      sub: `First divide: ${n} ÷ ${d}.`, subFr: `D’abord, divise : ${n} ÷ ${d}.`,
      input: { type: 'number', before: `$${n} \\div ${d} =$`, after: 'remainder …', afterFr: 'reste …', answer: String(w) },
      line: `$${n} \\div ${d} = $ @`, lineFr: `$${n} \\div ${d} = $ @`,
      hint: `How many ${d}s fit in ${n} without going over?`, hintFr: `Combien de ${d} tiennent dans ${n} sans dépasser ?`,
      slips: r > 0 ? [{ value: String(w + 1), key: `over-${n}-${d}`, msg: `${w + 1} × ${d} = ${(w + 1) * d}: more than ${n}. Take one less.`, msgFr: `${w + 1} × ${d} = ${(w + 1) * d} : plus que ${n}. Prends-en un de moins.` }] : [],
    },
    {
      title: 'What is left over?', titleFr: 'Que reste-t-il ?',
      sub: `${w} × ${d} = ${w * d}. Take it from ${n}.`, subFr: `${w} × ${d} = ${w * d}. Enlève-le de ${n}.`,
      input: { type: 'number', before: `$${n} \\div ${d} = ${w}$ remainder`, beforeFr: `$${n} \\div ${d} = ${w}$ reste`, answer: String(r) },
      line: `$${frac(n, d)} = ${mixedTex(w, r, d)}$`, lineFr: `$${frac(n, d)} = ${mixedTex(w, r, d)}$`,
      hint: `${n} − ${w * d} = ?`, hintFr: `${n} − ${w * d} = ?`,
      slips: w !== r ? [{ value: String(w), key: `whole-${n}-${d}`, msg: `${w} is the whole number. The remainder is ${n} − ${w * d}.`, msgFr: `${w} est le nombre entier. Le reste, c’est ${n} − ${w * d}.` }] : [],
    },
  ];
}

/** "Which is bigger?" between a and b: change, then compare (and a common denominator when needed). */
function compare(id, level, a, b) {
  const A = parts(a);
  const B = parts(b);
  const steps = [...(a.w == null ? changeSteps(a) : []), ...(b.w == null ? changeSteps(b) : [])];
  const right = symOf(a, b);
  const sentence = (k) => `${tex(a)} ${SYM[k]} ${tex(b)}`;
  let why;
  let whyFr;
  let wrongMsg;
  let wrongMsgFr;
  if (A.w !== B.w) {
    why = `${A.w} wholes ${A.w < B.w ? 'is less than' : 'is more than'} ${B.w} wholes, so the fractions do not matter.`;
    whyFr = `${A.w} entiers, c’est ${A.w < B.w ? 'moins' : 'plus'} que ${B.w} entiers, donc les fractions ne comptent pas.`;
    wrongMsg = `Look at the whole numbers: ${A.w} and ${B.w}. The bigger whole number wins.`;
    wrongMsgFr = `Regarde les nombres entiers : ${A.w} et ${B.w}. Le plus grand nombre entier gagne.`;
  } else if (A.d === B.d) {
    why = `The same whole number and the same bottom: compare the tops, ${A.r} and ${B.r}.`;
    whyFr = `Même nombre entier et même bas : compare les hauts, ${A.r} et ${B.r}.`;
    wrongMsg = `Both are ${A.w} and some pieces out of ${A.d}: compare ${A.r} and ${B.r}.`;
    wrongMsgFr = `Les deux font ${A.w} et des parts sur ${A.d} : compare ${A.r} et ${B.r}.`;
  } else {
    const L = lcm(A.d, B.d);
    const ta = (A.r * L) / A.d;
    const tb = (B.r * L) / B.d;
    const others = [A.d + B.d, A.d * B.d === L ? L * 2 : A.d * B.d, Math.max(A.d, B.d) === L ? L + A.d + B.d : Math.max(A.d, B.d)]
      .filter((x, i, all) => x !== L && all.indexOf(x) === i).slice(0, 2);
    steps.push({
      title: 'Find a common denominator', titleFr: 'Trouve un dénominateur commun',
      sub: `Both whole numbers are ${A.w}. Compare $${frac(A.r, A.d)}$ and $${frac(B.r, B.d)}$.`,
      subFr: `Les deux nombres entiers sont ${A.w}. Compare $${frac(A.r, A.d)}$ et $${frac(B.r, B.d)}$.`,
      input: { type: 'choice', options: [{ id: 'lcm', text: String(L), textFr: String(L) }, ...others.map((x) => ({ id: `n${x}`, text: String(x), textFr: String(x) }))], answer: 'lcm', shuffle: true },
      line: `Common denominator: ${L}`, lineFr: `Dénominateur commun : ${L}`,
      hint: `Say the ${Math.max(A.d, B.d)} times table. Which is the first number that is in the ${Math.min(A.d, B.d)} times table too?`,
      hintFr: `Récite la table de ${Math.max(A.d, B.d)}. Quel est le premier nombre qui est aussi dans la table de ${Math.min(A.d, B.d)} ?`,
      slips: others.includes(A.d + B.d) ? [{ value: `n${A.d + B.d}`, key: 'added-bottoms', msg: `${A.d + B.d} is ${A.d} + ${B.d}. A common denominator is in both times tables.`, msgFr: `${A.d + B.d}, c’est ${A.d} + ${B.d}. Un dénominateur commun est dans les deux tables.` }] : [],
    });
    const equiv = (r, d, t, tag) => ({
      title: `Make $${frac(r, d)}$ out of ${L}`, titleFr: `Écris $${frac(r, d)}$ sur ${L}`,
      sub: `The bottom is × ${L / d}, so the top is × ${L / d} too.`, subFr: `Le bas est × ${L / d}, donc le haut aussi.`,
      input: { type: 'number', before: `$${frac(r, d)} = \\dfrac{\\square}{${L}}$, so $\\square =$`, beforeFr: `$${frac(r, d)} = \\dfrac{\\square}{${L}}$, donc $\\square =$`, answer: String(t) },
      line: `$${frac(r, d)} = ${frac(t, L)}$`, lineFr: `$${frac(r, d)} = ${frac(t, L)}$`,
      hint: `${d} × ${L / d} = ${L}. Do the same to the top: ${r} × ${L / d}.`, hintFr: `${d} × ${L / d} = ${L}. Fais pareil en haut : ${r} × ${L / d}.`,
      slips: r + (L - d) !== t ? [{ value: String(r + (L - d)), key: `added-${tag}`, msg: `You added ${L - d}. Equivalent fractions multiply: the top × ${L / d}.`, msgFr: `Tu as ajouté ${L - d}. Les fractions équivalentes multiplient : le haut × ${L / d}.` }] : [],
    });
    steps.push(equiv(A.r, A.d, ta, 'a'), equiv(B.r, B.d, tb, 'b'));
    why = `${ta} ${SYM[ta < tb ? 'lt' : ta > tb ? 'gt' : 'eq']} ${tb}, so $${frac(A.r, A.d)} ${SYM[ta < tb ? 'lt' : ta > tb ? 'gt' : 'eq']} ${frac(B.r, B.d)}$.`;
    whyFr = why.replace(', so ', ', donc ');
    wrongMsg = `Compare the tops out of ${L}: ${ta} and ${tb}.`;
    wrongMsgFr = `Compare les hauts sur ${L} : ${ta} et ${tb}.`;
  }
  const firstStep = a.w == null || b.w == null ? 1 : null;
  steps.push({
    title: 'Which sign is right?', titleFr: 'Quel signe est juste ?',
    sub: '< is less than. > is greater than.', subFr: '< plus petit que. > plus grand que.',
    input: { type: 'choice', options: ['lt', 'gt', 'eq'].map((k) => choice(k, sentence(k))), answer: right },
    line: `$${sentence(right)}$`, lineFr: `$${sentence(right)}$`,
    hint: A.w !== B.w ? 'Compare the whole numbers first.' : 'Same whole number: compare the fractions.',
    hintFr: A.w !== B.w ? 'Compare d’abord les nombres entiers.' : 'Même nombre entier : compare les fractions.',
    why, whyFr,
    slips: ['lt', 'gt', 'eq'].filter((k) => k !== right).map((k) => ({
      value: k, key: `sign-${k}`, ...(firstStep ? { step: firstStep } : {}), msg: wrongMsg, msgFr: wrongMsgFr,
    })),
  });
  return {
    id, level,
    prompt: `Write [[<, > or =]]: $${tex(a)} \\;\\square\\; ${tex(b)}$`,
    promptFr: `Écris [[<, > ou =]] : $${tex(a)} \\;\\square\\; ${tex(b)}$`,
    steps,
  };
}

/** Order of size: change each improper fraction, then put them in order, smallest first. */
function order(id, level, list, hint, hintFr) {
  const steps = list.map((s) => {
    const { w, r, d } = parts(s);
    const wrongW = w + 1;
    return {
      key: true,
      title: `Change $${frac(s.n, s.d)}$ to a mixed number`, titleFr: `Transforme $${frac(s.n, s.d)}$ en nombre mixte`,
      sub: `${s.n} ÷ ${d} = ? remainder ?`, subFr: `${s.n} ÷ ${d} = ? reste ?`,
      input: { type: 'choice', options: [choice('right', mixedTex(w, r, d)), choice('swap', mixedTex(r, w, d)), choice('over', mixedTex(wrongW, r, d))], answer: 'right', shuffle: true },
      line: `$${frac(s.n, s.d)} = ${mixedTex(w, r, d)}$`, lineFr: `$${frac(s.n, s.d)} = ${mixedTex(w, r, d)}$`,
      hint: `${s.n} ÷ ${d} = ${w} remainder ${r}.`, hintFr: `${s.n} ÷ ${d} = ${w} reste ${r}.`,
      slips: [
        { value: 'swap', key: `swap-${s.n}`, msg: `The answer to ${s.n} ÷ ${d} is the whole number; the remainder goes on top.`, msgFr: `La réponse de ${s.n} ÷ ${d} est le nombre entier ; le reste va en haut.` },
        { value: 'over', key: `over-${s.n}`, msg: `${wrongW} × ${d} = ${wrongW * d}: more than ${s.n}.`, msgFr: `${wrongW} × ${d} = ${wrongW * d} : plus que ${s.n}.` },
      ],
    };
  });
  const sorted = [...list].sort((x, y) => x.n * y.d - y.n * x.d);
  steps.push({
    title: 'Put them in order, smallest first', titleFr: 'Range-les, la plus petite d’abord',
    sub: 'The same whole number? Compare the fractions.', subFr: 'Le même nombre entier ? Compare les fractions.',
    input: { type: 'order', items: sorted.map((s) => ({ id: `f${s.n}_${s.d}`, text: `$${frac(s.n, s.d)}$`, textFr: `$${frac(s.n, s.d)}$` })) },
    line: `$${sorted.map((s) => frac(s.n, s.d)).join(',\\; ')}$`, lineFr: `$${sorted.map((s) => frac(s.n, s.d)).join(',\\; ')}$`,
    hint, hintFr,
    // Largest first is also the order of the top numbers here: the "big numbers, big
    // fraction" slip. It opens the first changing step.
    slips: [{
      value: [...sorted].reverse().map((s) => `f${s.n}_${s.d}`), step: 1, key: 'largest-first',
      msg: `That is largest first. Change each one to a mixed number, then start with the smallest: ${sorted.map((s) => { const p = parts(s); return `${p.w} ${p.r}/${p.d}`; }).join(', ')}.`,
      msgFr: `Ça, c’est la plus grande d’abord. Transforme chacune en nombre mixte, puis commence par la plus petite : ${sorted.map((s) => { const p = parts(s); return `${p.w} ${p.r}/${p.d}`; }).join(', ')}.`,
    }],
  });
  return {
    id, level,
    prompt: `Write $${list.map((s) => frac(s.n, s.d)).join(',\\; ')}$ in [[order of size]], starting with the smallest.`,
    promptFr: `Range $${list.map((s) => frac(s.n, s.d)).join(',\\; ')}$ par [[ordre de grandeur]], en commençant par la plus petite.`,
    steps,
  };
}

const items = [
  compare('f1', 'focus', { n: 11, d: 3 }, { w: 4, n: 1, d: 5 }),
  compare('f2', 'focus', { n: 23, d: 5 }, { w: 4, n: 1, d: 2 }),
  compare('f3', 'focus', { w: 3, n: 3, d: 4 }, { n: 19, d: 6 }),
  order('f4', 'focus', [{ n: 9, d: 4 }, { n: 11, d: 5 }, { n: 7, d: 3 }],
    'All three are 2 and a bit. Out of the same whole, a fifth is smaller than a quarter, and a quarter is smaller than a third.',
    'Les trois font 2 et un peu. Dans un même entier, un cinquième est plus petit qu’un quart, et un quart plus petit qu’un tiers.'),
  compare('p1', 'practice', { n: 25, d: 6 }, { w: 3, n: 5, d: 6 }),
  compare('p2', 'practice', { w: 2, n: 4, d: 5 }, { n: 17, d: 6 }),
  compare('p3', 'practice', { n: 15, d: 2 }, { n: 22, d: 3 }),
  compare('p4', 'practice', { n: 31, d: 7 }, { w: 4, n: 3, d: 7 }),
  compare('c1', 'challenge', { n: 33, d: 8 }, { n: 29, d: 7 }),
  order('c2', 'challenge', [{ n: 13, d: 4 }, { n: 7, d: 2 }, { n: 10, d: 3 }],
    'All three are 3 and a bit: compare a quarter, a half and a third.',
    'Les trois font 3 et un peu : compare un quart, un demi et un tiers.'),
];

export default {
  title: 'Which is bigger?',
  titleFr: 'Laquelle est la plus grande ?',
  items,
};
