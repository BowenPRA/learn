// src/utils/ineqLine.js
//
// Inequalities on a number line, the Year 7 way (Maths 2.6): every inequality
// is strict (< or >), so every circle is OPEN, and the picture is drawn in the
// book's order — the circle first, then the arrow. After a week of equations
// with one answer, an inequality has many; "integer" is what makes "the
// smallest one" a question with an answer.
//
// An item states the question only:
//   { id, level, kind: 'draw',  ineq: 'x > 3' }              circle → arrow → smallest integer
//   { id, level, kind: 'read',  ineq: 'x < 4' }              the line is drawn: write the inequality → largest integer
//   { id, level, kind: 'words', ineq: 't < 0', phrase: 'below' }   "t is below 0" → write it → largest integer
//   { id, level, kind: 'words', ineq: 'p < 9', context, contextVn, contextFr } a story instead of the derived sentence
//   { id, level, kind: 'between', ineqs: ['s > 20', 's < 24'] }     tap every integer that works (or "none")
//   { …, kind: 'between', ineqs, context, contextVn, contextFr }    a story: write both inequalities first
//   (`integer: false` on a draw/read/words item leaves the integer stage out)
// The line's range, the integers that work, the smallest or largest one, the
// sentence and the slip behind a wrong answer are derived here; the validator
// runs the same model (checkIneqItems).

export const MINUS = '−';
export const KINDS = ['draw', 'read', 'words', 'between'];
export const LINE_SPAN = 10;                       // intervals on a single inequality's line
export const BETWEEN_MAX = 14;                     // … and the widest "between" line

/** The words a question uses for each sign, with the Vietnamese gloss. */
export const PHRASES = {
  '<': { 'less than': 'nhỏ hơn', 'fewer than': 'ít hơn', below: 'dưới', under: 'dưới', 'smaller than': 'nhỏ hơn' },
  '>': { 'greater than': 'lớn hơn', 'more than': 'nhiều hơn', above: 'trên', over: 'trên', 'bigger than': 'lớn hơn' },
};
/** … and the French gloss, phrase for phrase. */
export const PHRASES_FR = {
  '<': { 'less than': 'inférieur à', 'fewer than': 'moins de', below: 'en dessous de', under: 'sous', 'smaller than': 'plus petit que' },
  '>': { 'greater than': 'supérieur à', 'more than': 'plus de', above: 'au-dessus de', over: 'plus de', 'bigger than': 'plus grand que' },
};

/** A number as the book prints it: a real minus sign, no trailing .0 */
export const numText = (v) => `${v < 0 ? MINUS : ''}${Math.abs(v)}`;
/** … and as KaTeX. */
export const numLatex = (v) => `${v < 0 ? '-' : ''}${Math.abs(v)}`;

const hashOf = (s) => { let h = 7; for (const ch of String(s)) h = (Math.imul(h, 31) + ch.charCodeAt(0)) >>> 0; return h; };

/** 'x > 3' → { letter, op, n }. Strict signs only; whole numbers and halves. */
export function parseIneq(src) {
  const m = /^\s*([a-zA-Z])\s*([<>])\s*([-−]?\d+(?:\.\d+)?)\s*$/.exec(String(src ?? ''));
  if (!m) throw new Error(`"${src}" is not an inequality like x > 3 or t < −2 (a letter, < or >, a number)`);
  const n = Number(m[3].replace('−', '-'));
  if (!Number.isInteger(n * 2)) throw new Error(`"${src}": the number must be whole or end in .5`);
  if (Math.abs(n) > 99) throw new Error(`"${src}": keep the number within ±99`);
  const greater = m[2] === '>';
  return {
    letter: m[1], op: m[2], n, greater,
    text: `${m[1]} ${m[2]} ${numText(n)}`,
    latex: `${m[1]} ${m[2]} ${numLatex(n)}`,
    // the smallest integer that works (for >) or the largest (for <)
    edge: greater ? Math.floor(n) + 1 : Math.ceil(n) - 1,
    works: (v) => (greater ? v > n : v < n),
  };
}

/**
 * The worked item.
 *   kind, stages          which stages the screen runs, in order
 *   p                     the inequality (draw / read / words)
 *   parts                 both inequalities, lower bound first (between)
 *   lo, hi                the ends of the number line
 *   integers              the integers that work (between)
 *   sentence              { en, vn, fr } — the words of a `words` item
 */
export function ineqModel(item) {
  const kind = item.kind || 'draw';
  if (!KINDS.includes(kind)) throw new Error(`kind "${kind}" — ${KINDS.join('/')}`);

  if (kind === 'between') {
    if (!Array.isArray(item.ineqs) || item.ineqs.length !== 2) throw new Error('between needs ineqs: two inequalities');
    const two = item.ineqs.map(parseIneq);
    if (two[0].letter !== two[1].letter) throw new Error('between: both inequalities must use the same letter');
    const low = two.find((q) => q.greater);
    const high = two.find((q) => !q.greater);
    if (!low || !high) throw new Error('between needs one > and one <');
    if (low.n >= high.n) throw new Error(`between: nothing is greater than ${numText(low.n)} and less than ${numText(high.n)}`);
    const integers = [];
    for (let v = low.edge; v <= high.edge; v += 1) integers.push(v);
    const lo = Math.floor(low.n) - 2;
    const hi = Math.ceil(high.n) + 2;
    return {
      item, kind, parts: [low, high], letter: low.letter, lo, hi, integers,
      stages: [...(item.context ? ['write2'] : []), 'list'],
      latex: `${low.latex} \\qquad ${high.latex}`,
    };
  }

  const p = parseIneq(item.ineq);
  // The line is ten intervals wide and does NOT centre on the number — where
  // the circle goes would give itself away. The offset is fixed per item.
  const k = 2 + (hashOf(item.id || item.ineq) % 7);           // 2 … 8 ticks in from the left
  const lo = Math.floor(p.n) - k;
  const hi = lo + LINE_SPAN;
  let sentence = null;
  if (kind === 'words' && !item.context) {
    const gloss = PHRASES[p.op][item.phrase];
    if (!gloss) throw new Error(`words: phrase "${item.phrase}" is not one of ${Object.keys(PHRASES[p.op]).join(' / ')} (for ${p.op})`);
    const en = `${p.letter} is ${item.phrase} ${numText(p.n)}`;
    const glossFr = PHRASES_FR[p.op][item.phrase] || gloss;
    sentence = { en, vn: `${en} (${item.phrase} = ${gloss})`, fr: `${en} (${item.phrase} = ${glossFr})` };
  }
  const wantsInteger = item.integer !== false;
  const stages = kind === 'draw' ? ['circle', 'arrow'] : ['write'];
  if (wantsInteger) stages.push('integer');
  return { item, kind, p, letter: p.letter, lo, hi, sentence, stages, latex: p.latex };
}

/* ------------------------------------------------------------------ marking */

const soft = (en, vn, fr) => ({ ok: false, soft: true, en, vn, fr });

/** Read a typed number: a real or a keyboard minus, a dot for the point. */
export function readNumber(typed) {
  const s = String(typed ?? '').trim().replace(/−/g, '-').replace(/\s+/g, '');
  if (!s) return soft('Type a number first.', 'Hãy nhập một số trước.', "Écris d'abord un nombre.");
  if (s.includes(',')) return soft('Write the decimal point as a dot: 2.5, not 2,5.', 'Hãy viết dấu thập phân bằng dấu chấm: 2.5, không phải 2,5.', 'Écris le point décimal avec un point : 2.5, pas 2,5.');
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return soft('That is not a number I can read.', 'Đó không phải là một số hợp lệ.', 'Je ne peux pas lire ce nombre.');
  return { ok: true, value: Number(s) };
}

/** The circle: tapped on `v`. */
export function diagnoseCircle(p, v) {
  if (v === p.n) return { ok: true };
  const n = numText(p.n);
  if (v === p.edge) {
    return {
      ok: false, code: 'edge',
      en: `${numText(v)} is the first number that works — but the circle marks where the line STARTS. Put it on the number in the inequality.`,
      vn: `${numText(v)} là số đầu tiên thỏa mãn — nhưng vòng tròn đánh dấu chỗ BẮT ĐẦU. Hãy đặt nó vào đúng con số trong bất đẳng thức.`, fr: `${numText(v)} est le premier nombre qui convient — mais le cercle marque où la ligne COMMENCE. Mets-le sur le nombre de l'inégalité.`,
    };
  }
  if (v === -p.n && p.n !== 0) {
    return {
      ok: false, code: 'sign',
      en: `Check the sign: the inequality says ${n}, and that is on the other side of zero.`,
      vn: `Kiểm tra dấu: bất đẳng thức ghi ${n}, và số đó nằm ở phía bên kia số 0.`, fr: `Vérifie le signe : l'inégalité dit ${n}, et ce nombre est de l'autre côté de zéro.`,
    };
  }
  return {
    ok: false, code: 'other',
    en: `The circle goes on the number in the inequality: find ${n} on the line.`,
    vn: `Vòng tròn đặt vào con số trong bất đẳng thức: hãy tìm ${n} trên trục số.`, fr: `Le cercle va sur le nombre de l'inégalité : trouve ${n} sur la droite graduée.`,
  };
}

/** The arrow: 'left' or 'right'. */
export function diagnoseArrow(p, dir) {
  if ((dir === 'right') === p.greater) return { ok: true };
  return p.greater
    ? {
      ok: false, code: 'way',
      en: 'Greater than means further RIGHT on the number line. The arrow points at the bigger numbers.',
      vn: 'Lớn hơn nghĩa là nằm xa hơn về bên PHẢI trên trục số. Mũi tên chỉ về phía các số lớn hơn.', fr: 'Supérieur à veut dire plus à DROITE sur la droite graduée. La flèche pointe vers les plus grands nombres.',
    }
    : {
      ok: false, code: 'way',
      en: 'Less than means further LEFT on the number line — even below zero. The arrow points at the smaller numbers.',
      vn: 'Nhỏ hơn nghĩa là nằm xa hơn về bên TRÁI trên trục số — kể cả dưới 0. Mũi tên chỉ về phía các số nhỏ hơn.', fr: 'Inférieur à veut dire plus à GAUCHE sur la droite graduée — même en dessous de zéro. La flèche pointe vers les plus petits nombres.',
    };
}

/** The smallest (for >) or largest (for <) integer that works. */
export function diagnoseInteger(p, typed) {
  const r = readNumber(typed);
  if (!r.ok) return r;
  const v = r.value;
  if (v === p.edge) return { ok: true };
  const n = numText(p.n);
  const t = numText(v);
  const word = p.greater ? { en: 'greater', vn: 'lớn hơn', fr: 'supérieur à' } : { en: 'less', vn: 'nhỏ hơn', fr: 'inférieur à' };
  if (v === p.n) {
    return {
      ok: false, code: 'circle',
      en: `${t} is the open circle: ${t} is not ${word.en} than ${n}. It does not work.`,
      vn: `${t} là vòng tròn rỗng: ${t} không ${word.vn} ${n}. Nó không thỏa mãn.`, fr: `${t} est le cercle vide : ${t} n'est pas ${word.fr} ${n}. Il ne convient pas.`,
    };
  }
  if (!Number.isInteger(v)) {
    return p.works(v)
      ? { ok: false, code: 'notinteger', en: `${t} does work — but it is not an integer. An integer is a whole number.`, vn: `${t} có thỏa mãn — nhưng nó không phải số nguyên. Số nguyên là số không có phần thập phân.`, fr: `${t} convient — mais ce n'est pas un entier. Un entier n'a pas de partie décimale.` }
      : { ok: false, code: 'notinteger', en: `${t} is not an integer, and it is not ${word.en} than ${n} either.`, vn: `${t} không phải số nguyên, và nó cũng không ${word.vn} ${n}.`, fr: `${t} n'est pas un entier, et il n'est pas ${word.fr} ${n} non plus.` };
  }
  if (!p.works(v)) {
    const side = p.greater ? { en: 'left', vn: 'trái', fr: 'gauche' } : { en: 'right', vn: 'phải', fr: 'droite' };
    const really = p.greater ? { en: 'less', vn: 'nhỏ hơn', fr: 'inférieur à' } : { en: 'greater', vn: 'lớn hơn', fr: 'supérieur à' };
    return {
      ok: false, code: 'wrongside',
      en: `${t} is to the ${side.en} of ${n} on the number line, so ${t} is ${really.en} than ${n}. It does not work.`,
      vn: `${t} nằm bên ${side.vn} của ${n} trên trục số, nên ${t} ${really.vn} ${n}. Nó không thỏa mãn.`, fr: `${t} est à ${side.fr} de ${n} sur la droite graduée, donc ${t} est ${really.fr} ${n}. Il ne convient pas.`,
    };
  }
  return p.greater
    ? { ok: false, code: 'notedge', en: `${t} works — but a smaller integer works too. Which integer is the FIRST one after ${n}?`, vn: `${t} thỏa mãn — nhưng còn một số nguyên nhỏ hơn cũng thỏa mãn. Số nguyên nào đứng NGAY SAU ${n}?`, fr: `${t} convient — mais un entier plus petit convient aussi. Quel entier est le PREMIER après ${n} ?` }
    : { ok: false, code: 'notedge', en: `${t} works — but a larger integer works too. Which integer is the FIRST one before ${n}?`, vn: `${t} thỏa mãn — nhưng còn một số nguyên lớn hơn cũng thỏa mãn. Số nguyên nào đứng NGAY TRƯỚC ${n}?`, fr: `${t} convient — mais un entier plus grand convient aussi. Quel entier est le PREMIER avant ${n} ?` };
}

/** The inequality written as a sign and a number (the letter is given). */
export function diagnoseWrite(p, sign, typed, { drawn = false } = {}) {
  if (sign !== '<' && sign !== '>') return soft('Choose < or > first.', 'Hãy chọn < hoặc > trước.', "Choisis d'abord < ou >.");
  const r = readNumber(typed);
  if (!r.ok) return r;
  const signOk = sign === p.op;
  const numOk = r.value === p.n;
  if (signOk && numOk) return { ok: true, signOk, numOk };
  if (!signOk) {
    const en = drawn
      ? (p.greater ? 'The arrow points right, at the bigger numbers: that is greater than, >.' : 'The arrow points left, at the smaller numbers: that is less than, <.')
      : (p.greater ? 'These words mean greater than: the sign is >.' : 'These words mean less than: the sign is <.');
    const vn = drawn
      ? (p.greater ? 'Mũi tên chỉ sang phải, về phía các số lớn hơn: đó là lớn hơn, >.' : 'Mũi tên chỉ sang trái, về phía các số nhỏ hơn: đó là nhỏ hơn, <.')
      : (p.greater ? 'Những từ này nghĩa là lớn hơn: dấu là >.' : 'Những từ này nghĩa là nhỏ hơn: dấu là <.');
    const fr = drawn
      ? (p.greater ? "La flèche pointe à droite, vers les plus grands nombres : c'est supérieur à, >." : "La flèche pointe à gauche, vers les plus petits nombres : c'est inférieur à, <.")
      : (p.greater ? 'Ces mots veulent dire supérieur à : le signe est >.' : 'Ces mots veulent dire inférieur à : le signe est <.');
    return { ok: false, code: numOk ? 'sign' : 'both', signOk, numOk, en, vn, fr };
  }
  if (r.value === p.edge && drawn) {
    return {
      ok: false, code: 'edge', signOk, numOk,
      en: `${numText(r.value)} is the first integer that works. The inequality uses the number under the open circle.`,
      vn: `${numText(r.value)} là số nguyên đầu tiên thỏa mãn. Bất đẳng thức dùng con số nằm dưới vòng tròn rỗng.`, fr: `${numText(r.value)} est le premier entier qui convient. L'inégalité utilise le nombre sous le cercle vide.`,
    };
  }
  return {
    ok: false, code: 'number', signOk, numOk,
    en: drawn ? 'Right sign — now read the number under the open circle.' : 'Right sign — now check the number, and its sign.',
    vn: drawn ? 'Đúng dấu — giờ hãy đọc con số nằm dưới vòng tròn rỗng.' : 'Đúng dấu — giờ hãy kiểm tra con số, và dấu của nó.', fr: drawn ? 'Bon signe — maintenant lis le nombre sous le cercle vide.' : 'Bon signe — maintenant vérifie le nombre, et son signe.',
  };
}

/** Both inequalities of a story, written in either order. rows = [{ sign, typed }, { sign, typed }] */
export function diagnoseWriteTwo(parts, rows) {
  const read = rows.map((r) => ({ sign: r.sign, num: readNumber(r.typed) }));
  if (read.some((r) => r.sign !== '<' && r.sign !== '>')) return soft('Choose < or > for both.', 'Hãy chọn < hoặc > cho cả hai.', 'Choisis < ou > pour les deux.');
  const bad = read.find((r) => !r.num.ok);
  if (bad) return bad.num;
  const fits = (r, q) => r.sign === q.op && r.num.value === q.n;
  const straight = fits(read[0], parts[0]) && fits(read[1], parts[1]);
  const swapped = fits(read[0], parts[1]) && fits(read[1], parts[0]);
  if (straight || swapped) return { ok: true, marks: [true, true] };
  const marks = read.map((r) => parts.some((q) => fits(r, q)));
  const flipped = read.some((r) => parts.some((q) => r.num.value === q.n && r.sign !== q.op));
  return {
    ok: false, code: flipped ? 'sign' : 'number', marks,
    en: flipped
      ? 'Check the signs. More than, above, over → greater than, >. Fewer than, below, under → less than, <.'
      : 'Read the story again: each sentence gives one number and one sign.',
    vn: flipped
      ? 'Kiểm tra các dấu. More than, above, over → lớn hơn, >. Fewer than, below, under → nhỏ hơn, <.'
      : 'Đọc lại đề: mỗi câu cho một con số và một dấu.',
    fr: flipped
      ? 'Vérifie les signes. More than, above, over → supérieur à, >. Fewer than, below, under → inférieur à, <.'
      : "Relis l'histoire : chaque phrase donne un nombre et un signe.",
  };
}

/** The integers between two inequalities: `picks` is the list tapped, or [] with none = true. */
export function diagnoseList(model, picks, none = false) {
  const want = model.integers;
  const got = [...new Set(picks)].sort((a, b) => a - b);
  const [low, high] = model.parts;
  if (none || !got.length) {
    if (!want.length) return none ? { ok: true } : soft('Tap every integer that works — or say that none does.', 'Chạm vào mọi số nguyên thỏa mãn — hoặc chọn "không có số nào".', "Touche chaque entier qui convient — ou dis qu'aucun ne convient.");
    if (!none) return soft('Tap every integer that works — or say that none does.', 'Chạm vào mọi số nguyên thỏa mãn — hoặc chọn "không có số nào".', "Touche chaque entier qui convient — ou dis qu'aucun ne convient.");
    return {
      ok: false, code: 'some',
      en: `There is at least one: look between ${numText(low.n)} and ${numText(high.n)} on the line.`,
      vn: `Có ít nhất một số: hãy nhìn giữa ${numText(low.n)} và ${numText(high.n)} trên trục số.`, fr: `Il y en a au moins un : regarde entre ${numText(low.n)} et ${numText(high.n)} sur la droite graduée.`,
    };
  }
  if (got.length === want.length && got.every((v, i) => v === want[i])) return { ok: true };
  const end = got.find((v) => v === low.n || v === high.n);
  if (end !== undefined) {
    const q = end === low.n ? low : high;
    return {
      ok: false, code: 'endpoint',
      en: `${numText(end)} is an open circle: ${numText(end)} is not ${q.greater ? 'greater' : 'less'} than ${numText(end)}. Leave it out.`,
      vn: `${numText(end)} là vòng tròn rỗng: ${numText(end)} không ${q.greater ? 'lớn hơn' : 'nhỏ hơn'} ${numText(end)}. Hãy bỏ nó ra.`, fr: `${numText(end)} est un cercle vide : ${numText(end)} n'est pas ${q.greater ? 'supérieur' : 'inférieur'} à ${numText(end)}. Laisse-le de côté.`,
    };
  }
  const outside = got.find((v) => !want.includes(v));
  if (outside !== undefined) {
    const q = outside < low.n ? low : high;
    return {
      ok: false, code: 'outside',
      en: `${numText(outside)} is not ${q.greater ? 'greater' : 'less'} than ${numText(q.n)}. It has to fit BOTH inequalities.`,
      vn: `${numText(outside)} không ${q.greater ? 'lớn hơn' : 'nhỏ hơn'} ${numText(q.n)}. Nó phải thỏa mãn CẢ HAI bất đẳng thức.`, fr: `${numText(outside)} n'est pas ${q.greater ? 'supérieur' : 'inférieur'} à ${numText(q.n)}. Il doit convenir aux DEUX inégalités.`,
    };
  }
  if (!want.length) {
    return { ok: false, code: 'none', en: 'Check each one against both inequalities. Does any integer fit?', vn: 'Kiểm tra từng số với cả hai bất đẳng thức. Có số nguyên nào thỏa mãn không?', fr: 'Vérifie chacun avec les deux inégalités. Y a-t-il un entier qui convient ?' };
  }
  return {
    ok: false, code: 'missing',
    en: 'Those all work — but there are more. Tap every integer between the two circles.',
    vn: 'Các số đó đều thỏa mãn — nhưng vẫn còn nữa. Hãy chạm vào mọi số nguyên nằm giữa hai vòng tròn.', fr: "Ceux-là conviennent tous — mais il y en a d'autres. Touche chaque entier entre les deux cercles.",
  };
}

/** "the smallest integer" / "the largest integer", for the screen's question. */
export const edgeWord = (p) => (p.greater ? { en: 'smallest', vn: 'nhỏ nhất', fr: 'plus petit' } : { en: 'largest', vn: 'lớn nhất', fr: 'plus grand' });

/** The first few integers that work, as the book lists them: 4, 5, 6, … */
export function listText(p) {
  const step = p.greater ? 1 : -1;
  return `${[0, 1, 2].map((i) => numText(p.edge + i * step)).join(', ')}, …`;
}

/** Problems with a unit's `ineqLine.items`, as strings. */
export function checkIneqItems(items, { bilingual = true } = {}) {
  const out = [];
  const ids = new Set();
  let lastLevel = 0;
  for (const [i, it] of (items || []).entries()) {
    const at = `item ${it?.id || i + 1}`;
    if (!it?.id) out.push(`item ${i + 1} has no id`);
    else if (ids.has(it.id)) out.push(`duplicate item id "${it.id}"`);
    ids.add(it?.id);
    if (!Number.isInteger(it?.level) || it.level < 1) out.push(`${at}: level must be a whole number ≥ 1`);
    else if (it.level < lastLevel) out.push(`${at}: level ${it.level} comes after level ${lastLevel} — levels only climb`);
    else lastLevel = it.level;
    if (it?.context && bilingual && !it.contextVn) out.push(`${at}: context needs contextVn`);
    let m;
    try { m = ineqModel(it); } catch (e) { out.push(`${at}: ${e.message}`); continue; }
    if (m.kind === 'between') {
      if (m.hi - m.lo > BETWEEN_MAX) out.push(`${at}: the line would run ${m.hi - m.lo} intervals — at most ${BETWEEN_MAX}`);
      if (!diagnoseList(m, m.integers, !m.integers.length).ok) out.push(`${at}: refuses its own answer`);
    } else {
      if (m.kind === 'words' && !it.context && !it.phrase) out.push(`${at}: a words item needs a phrase or a context`);
      if (!diagnoseCircle(m.p, m.p.n).ok || !diagnoseInteger(m.p, String(m.p.edge)).ok) out.push(`${at}: refuses its own answer`);
    }
  }
  return out;
}
