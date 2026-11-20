import { useEffect, useMemo, useState } from 'react';
import { Divide, Construction, ListChecks } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import ShortDivBoard from '../components/math/ShortDivBoard.jsx';
import { QuestionCard, StepPanel, DoneCard } from '../components/math/StepKit.jsx';
import { stepsOf } from '../components/math/stepKitParts';
import { focusBox } from '../components/math/shortDivBoardHelpers';
import {
  shortDivModel, qDigitOk, carryOk, qHint, carryHint, remHint, remainderVerdict, needZeroHint, extraZeroNote, questionText,
  MAX_ZEROS, MAX_COLS,
} from '../utils/shortDivision';
import { diagnoseRound, placeName } from '../utils/rounding';
// Two optional stages, switched on per item (Year 7 Maths 4.4): `table: true`
// writes the divisor's times table first; `check: true` ends with the inverse
// calculation. An item without them runs exactly as before.
import { tableCellOk, tableHint, tableBoxId, inverseChoices, markInverse, inverseProduct, TABLE_MIN_DIVISOR } from '../utils/shortDivExtras';
import { decText } from '../utils/decimal';
import { TimesTableCard, InverseChoices, InverseDone } from '../components/math/ShortDivExtras.jsx';

/* ------------------------------------------------------------------ *
 * BUS STOP — short division, written the short way (Y7 Maths 3.2).
 *
 * Reads a unit's `shortDiv`:
 *   { title, titleVn, titleFr, intro?, introVn?, introFr?, levels: { n: { en, vn, fr } }, items: [
 *       { id, level, dividend: '936', divisor: 4 },            exact
 *       { id, level, dividend: '47', divisor: 4 },             exact, once zeros are added
 *       { id, level, dividend: '58', divisor: 7, dp: 3 },      correct to 3 d.p.
 *       { id, level, dividend: '85', divisor: 4, remainder: true },  whole: 21 r 1
 *       (+ context / contextVn / contextFr)
 *   ] }
 *
 * PRA LEARN (copied from the Dashboard 20 November 2026; edited here since). Three
 * switches an item may add, for Maths 7.1 "Fractions to decimals":
 *   fraction: true    the dividend over the divisor is a fraction: "Write 13/8 as a
 *                     decimal", with "13/8 = 13 ÷ 8" under it and in the answer.
 *   watch: true       a worked example: the board fills one column a press, each with
 *                     a sentence saying what is done and why. Nothing to type; it is
 *                     not scored (the score is out of the other items).
 *   table: 'always'   the times table first whatever the divisor (`table: true` only
 *                     for 11 and up).
 * A level's first item to work shows the 1-2-3 strip, not only the very first item.
 * Number Gym (NumberDrill.jsx) also mounts this screen for the short-div
 * drills of 1.4 and 1.5, every item a remainder item.
 * utils/shortDivision.js derives every column from the two numbers.
 *
 * The screen wears the step kit (components/math/StepKit.jsx), like Fill the
 * Zeros: the question on the left (on the first item a 1-2-3 strip in place of
 * the pool's `intro`, which is no longer shown), the stage in hand on the right
 * with its steps as pills, one short line under its title, and Show me + Check.
 *
 * The stages:
 *   DIVIDE  one column at a time, left to right. Type the digit on top and
 *           the remainder in the small box up-left of the NEXT digit. When
 *           the digits run out and it is not finished, +0 adds a zero after
 *           the point (pressing Check there instead is the named slip).
 *           A remainder item has no zeros: at the last digit, what is left
 *           over goes in the r box after the answer. The line under the title
 *           says only what is new in this column (the carry to read with it).
 *   ROUND   (dp items) type the answer rounded to the accuracy asked for.
 *   TABLE   (`table: true`, a 2-digit divisor) BEFORE dividing: write 2 × d …
 *           9 × d by adding d each time. The table then stays on the left.
 *   CHECK   (`check: true`, exact items) AFTER dividing: pick the inverse
 *           calculation, answer × d, from three. utils/shortDivExtras.js.
 *
 * A wrong box can be tried again; a second wrong answer at the same step (or
 * "Show me") fills it in, says what was written, and the item pays half.
 * Progress blob: { [itemId]: 1 | 0.5 }, score out of 10.
 *
 * Vietnamese (3.2, 1.4, 1.5): every word of this screen has its `vn` twin; the
 * kit's own "Step" and "Show me" have none yet, so they stay English there.
 * ------------------------------------------------------------------ */

const INK = '#7c3aed';
const INK_DARK = '#5b21b6';
const UID = 'busstop';

const T = {
  en: {
    title: 'Bus Stop',
    check: 'Check', next: 'Next question', finish: 'Finish',
    solved: 'done', level: 'Level',
    clean: 'Every box right first time.',
    slipped: 'Done — one wrong turn, and you found it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer',
    headExact: 'Divide', headRound: 'Divide, then round',
    stages: { divide: 'Divide', round: 'Round', table: 'Table', check: 'Inverse' },
    how: ['How many fit? Write it on top', 'The remainder goes in the small box'],
    howPoint: 'The point goes straight up',
    howR: 'What is left goes after the r',
    howZero: 'Out of digits? Add a zero',
    tableTitle: (d) => `Write the ${d} times table first.`,
    tableSub: (d) => `Add ${d} each time. 1 × ${d} is done for you.`,
    fillTable: 'Fill in every row first.',
    tableShown: (d) => `Filled in: the ${d} times table. Use it to divide.`,
    tableFixed: 'The wrong rows are filled in.',
    checkTitle: 'Check it with the inverse.',
    checkSub: (D) => `Which one takes you back to ${D}?`,
    askCol: (d, cur) => `How many ${d}s in ${cur}?`,
    firstCol: 'Answer on top. Remainder in the small box.',
    readCarry: (k, dg, cur) => `The ${k} rides on the ${dg}: read ${cur}.`,
    remAfter: 'What is left goes after the r.',
    remLast: 'Last digit: what is left goes after the r.',
    typeTop: 'Type the digit on top first.',
    fillCarry: 'There is a remainder: write it in the small box.',
    fillRem: 'Something is left over: write it after the r.',
    shownNone: (s, q) => `Filled in: ${s} = ${q}, nothing left over.`,
    shownCarry: (s, q, r, isNew) => `Filled in: ${s} = ${q} r ${r} — ${q} on top, ${r} carried${isNew ? ' onto a new 0' : ''}.`,
    shownR: (s, q, r) => `Filled in: ${s} = ${q} r ${r} — ${q} on top, ${r} after the r.`,
    shownTop: (s, q, r) => `Filled in: ${s} = ${q} r ${r} — ${q} on top.`,
    filled: 'It is filled in for you.',
    pointNote: 'The point goes in the answer too — straight above the one in the number.',
    maxZeros: 'That is as many zeros as the page holds.',
    addZero: 'Add a zero', addZeroTip: 'Add a zero after the point', removeZero: 'Take the last zero away',
    top: 'digit on top, column', carry: 'remainder carried onto digit', remainder: 'remainder',
    roundTitle: (q, name) => `Now round ${q} to ${name}.`,
    roundSub: 'The last digit you worked out decides.',
    roundRight: 'Right — rounded once, from the digit after.',
    roundShown: (q, a) => `Filled in: ${q} rounds to ${a}.`,
    typeHere: 'rounded answer',
    noItems: 'No questions yet', back: 'Return to Dashboard',
    dp: 'd.p.',
  },
  vn: {
    title: 'Chia ngắn',
    check: 'Kiểm tra', next: 'Câu tiếp theo', finish: 'Hoàn thành',
    solved: 'đã xong', level: 'Cấp độ',
    clean: 'Mọi ô đều đúng ngay lần đầu.',
    slipped: 'Đã xong — sai một lần, và em đã tự sửa được.',
    helped: 'Đã xong — có một vài bước được chỉ cho em.',
    bookCopy: 'Chép phần này vào vở', answer: 'Đáp án',
    headExact: 'Chia', headRound: 'Chia, rồi làm tròn',
    stages: { divide: 'Chia', round: 'Làm tròn', table: 'Bảng nhân', check: 'Phép ngược' },
    how: ['Chia được mấy lần? Viết ở trên', 'Số dư viết vào ô nhỏ'],
    howPoint: 'Dấu thập phân đi thẳng lên',
    howR: 'Phần còn dư viết sau chữ r',
    howZero: 'Hết chữ số? Thêm số 0',
    tableTitle: (d) => `Viết bảng nhân ${d} trước.`,
    tableSub: (d) => `Mỗi lần cộng thêm ${d}. Dòng 1 × ${d} đã có sẵn.`,
    fillTable: 'Hãy điền hết các dòng trước.',
    tableShown: (d) => `Đã điền: bảng nhân ${d}. Dùng nó để chia.`,
    tableFixed: 'Các dòng sai đã được điền sẵn.',
    checkTitle: 'Thử lại bằng phép tính ngược.',
    checkSub: (D) => `Phép tính nào đưa em trở lại ${D}?`,
    askCol: (d, cur) => `${cur} chứa bao nhiêu lần ${d}?`,
    firstCol: 'Thương viết ở trên. Số dư viết vào ô nhỏ.',
    readCarry: (k, dg, cur) => `Số ${k} đi cùng số ${dg}: đọc là ${cur}.`,
    remAfter: 'Phần còn dư viết sau chữ r.',
    remLast: 'Chữ số cuối: phần còn dư viết sau chữ r.',
    typeTop: 'Hãy nhập chữ số ở trên trước.',
    fillCarry: 'Có số dư: hãy viết nó vào ô nhỏ.',
    fillRem: 'Vẫn còn dư: hãy viết nó sau chữ r.',
    shownNone: (s, q) => `Đã điền: ${s} = ${q}, không dư.`,
    shownCarry: (s, q, r, isNew) => `Đã điền: ${s} = ${q} dư ${r} — ${q} ở trên, nhớ ${r}${isNew ? ' sang số 0 mới' : ''}.`,
    shownR: (s, q, r) => `Đã điền: ${s} = ${q} dư ${r} — ${q} ở trên, ${r} viết sau chữ r.`,
    shownTop: (s, q, r) => `Đã điền: ${s} = ${q} dư ${r} — ${q} ở trên.`,
    filled: 'Đã điền sẵn cho em.',
    pointNote: 'Dấu thập phân cũng có ở đáp án — ngay phía trên dấu thập phân của số bị chia.',
    maxZeros: 'Trang giấy chỉ đủ chỗ cho chừng đó số 0.',
    addZero: 'Thêm số 0', addZeroTip: 'Thêm một số 0 sau dấu thập phân', removeZero: 'Bỏ số 0 cuối cùng',
    top: 'chữ số ở trên, cột', carry: 'số dư nhớ sang chữ số', remainder: 'số dư',
    roundTitle: (q, name) => `Bây giờ làm tròn ${q} đến ${name}.`,
    roundSub: 'Chữ số cuối cùng em tính được sẽ quyết định.',
    roundRight: 'Đúng — làm tròn một lần, dựa vào chữ số đứng sau.',
    roundShown: (q, a) => `Đã điền: ${q} làm tròn thành ${a}.`,
    typeHere: 'đáp án đã làm tròn',
    noItems: 'Chưa có câu hỏi', back: 'Quay lại Bảng điều khiển',
    dp: 'c.s.t.p.',
  },
  fr: {
    title: 'Arrêt de bus',
    check: 'Vérifier', next: 'Suivant', finish: 'Terminer',
    solved: 'faites', level: 'Niveau',
    clean: 'Toutes les cases justes du premier coup.',
    slipped: "Fini — une erreur, et tu l'as trouvée toi-même.",
    helped: 'Fini — avec une ou deux étapes montrées.',
    bookCopy: 'Recopie ceci dans ton cahier', answer: 'Réponse',
    headExact: 'Divise', headRound: 'Divise, puis arrondis',
    stages: { divide: 'Diviser', round: 'Arrondir', table: 'Table', check: 'Inverse' },
    how: ['Combien de fois ? Écris-le en haut', 'Le reste va dans la petite case'],
    howPoint: 'Le point monte tout droit',
    howR: 'Ce qui reste va après le r',
    howZero: 'Plus de chiffres ? Ajoute un zéro',
    tableTitle: (d) => `Écris d'abord la table de ${d}.`,
    tableSub: (d) => `Ajoute ${d} à chaque fois. 1 × ${d} est déjà fait.`,
    fillTable: "Remplis d'abord toutes les lignes.",
    tableShown: (d) => `Rempli : la table de ${d}. Sers-t'en pour diviser.`,
    tableFixed: 'Les lignes fausses sont remplies.',
    checkTitle: 'Vérifie avec le calcul inverse.',
    checkSub: (D) => `Lequel te ramène à ${D} ?`,
    askCol: (d, cur) => `En ${cur}, combien de fois ${d} ?`,
    firstCol: 'La réponse en haut. Le reste dans la petite case.',
    readCarry: (k, dg, cur) => `Le ${k} va avec le ${dg} : lis ${cur}.`,
    remAfter: 'Ce qui reste va après le r.',
    remLast: 'Dernier chiffre : ce qui reste va après le r.',
    typeTop: "Écris d'abord le chiffre du haut.",
    fillCarry: 'Il y a un reste : écris-le dans la petite case.',
    fillRem: 'Il reste quelque chose : écris-le après le r.',
    shownNone: (s, q) => `Rempli : ${s} = ${q}, il ne reste rien.`,
    shownCarry: (s, q, r, isNew) => `Rempli : ${s} = ${q} reste ${r} — ${q} en haut, ${r} reporté${isNew ? ' sur un nouveau 0' : ''}.`,
    shownR: (s, q, r) => `Rempli : ${s} = ${q} reste ${r} — ${q} en haut, ${r} après le r.`,
    shownTop: (s, q, r) => `Rempli : ${s} = ${q} reste ${r} — ${q} en haut.`,
    filled: "C'est rempli pour toi.",
    pointNote: 'Le point va aussi dans la réponse — juste au-dessus de celui du nombre.',
    maxZeros: "C'est le maximum de zéros que la page peut contenir.",
    addZero: 'Ajoute un zéro', addZeroTip: 'Ajoute un zéro après le point', removeZero: 'Enlève le dernier zéro',
    top: 'chiffre du haut, colonne', carry: 'reste reporté sur le chiffre', remainder: 'reste',
    roundTitle: (q, name) => `Maintenant, arrondis ${q} ${name}.`,
    roundSub: 'Le dernier chiffre calculé décide.',
    roundRight: 'Correct — arrondi une seule fois, avec le chiffre suivant.',
    roundShown: (q, a) => `Rempli : ${q} s'arrondit à ${a}.`,
    typeHere: 'réponse arrondie',
    noItems: 'Pas encore de questions', back: 'Retour au tableau de bord',
    dp: 'déc.',
  },
};

// The 7.1 additions: fraction questions and the worked examples. English and French
// only (Year 7 from Unit 4); English stands in for Vietnamese.
const FRACTION_T = {
  en: {
    headFraction: 'Fraction to decimal',
    asDecimal: 'as a decimal',
    toPlaces: (want) => `as a decimal, correct to ${want}`,
    write: 'Write',
    topOverBottom: 'A fraction is a division: the top ÷ the bottom.',
    stages: { watch: 'Watch' },
    watchTitle: (s) => `${s} on the bus stop. Press Next step to see each column.`,
    watchSub: 'Read each step. Then do the same on the next one.',
    nextStep: 'Next step',
    watchDone: 'That is the whole method. Now you do one.',
    watchCopy: 'The finished division',
    pointUp: 'The point in the answer goes straight above the point in the number.',
    readK: (k, dg, cur) => `The ${k} rides on the ${dg}: read ${cur}.`,
    howMany: (d, cur) => `How many ${d}s in ${cur}?`,
    none: (cur, d, lead) => `None: ${cur} is smaller than ${d}. ${lead ? 'Leave the top blank (or write 0)' : 'Write 0 on top'}.`,
    fits: (q, d) => `${q}, because ${q} × ${d} = ${q * d}. Write ${q} on top.`,
    leftAll: (r) => `All ${r} is left over.`,
    leftSome: (cur, used, r) => `${cur} − ${used} = ${r} left over.`,
    carryNext: (r) => `Write the ${r} small, in front of the next digit.`,
    carryPoint: (r) => `No digits left, so write a point after the number, add a 0, and write the ${r} small in front of it.`,
    carryZero: (r) => `No digits left, so add another 0 and write the ${r} small in front of it.`,
    stopRound: 'Stop here: one digit more than you need, for rounding.',
    nothingLeft: 'Nothing is left over, so the division is finished.',
    soAnswer: (frac, ans) => `So ${frac} = ${ans}.`,
  },
  fr: {
    headFraction: 'Fraction en décimal',
    asDecimal: 'en nombre décimal',
    toPlaces: (want) => `en nombre décimal, arrondi ${want}`,
    write: 'Écris',
    topOverBottom: 'Une fraction est une division : le haut ÷ le bas.',
    stages: { watch: 'Regarde' },
    watchTitle: (s) => `${s} en bus stop. Appuie sur Étape suivante pour voir chaque colonne.`,
    watchSub: 'Lis chaque étape. Puis fais pareil à la suivante.',
    nextStep: 'Étape suivante',
    watchDone: 'Voilà toute la méthode. À toi maintenant.',
    watchCopy: 'La division terminée',
    pointUp: 'Le point de la réponse va juste au-dessus du point du nombre.',
    readK: (k, dg, cur) => `Le ${k} va avec le ${dg} : lis ${cur}.`,
    howMany: (d, cur) => `En ${cur}, combien de fois ${d} ?`,
    none: (cur, d, lead) => `Aucune : ${cur} est plus petit que ${d}. ${lead ? 'Laisse le haut vide (ou écris 0)' : 'Écris 0 en haut'}.`,
    fits: (q, d) => `${q}, car ${q} × ${d} = ${q * d}. Écris ${q} en haut.`,
    leftAll: (r) => `Il reste tout le ${r}.`,
    leftSome: (cur, used, r) => `${cur} − ${used} = ${r}, il reste ${r}.`,
    carryNext: (r) => `Écris le ${r} en petit, devant le chiffre suivant.`,
    carryPoint: (r) => `Plus de chiffres : écris un point après le nombre, ajoute un 0, et écris le ${r} en petit devant lui.`,
    carryZero: (r) => `Plus de chiffres : ajoute un autre 0 et écris le ${r} en petit devant lui.`,
    stopRound: 'On s’arrête : un chiffre de plus que nécessaire, pour arrondir.',
    nothingLeft: 'Il ne reste rien : la division est finie.',
    soAnswer: (frac, ans) => `Donc ${frac} = ${ans}.`,
  },
};
T.en = { ...T.en, ...FRACTION_T.en, stages: { ...T.en.stages, ...FRACTION_T.en.stages } };
T.vn = { ...FRACTION_T.en, ...T.vn, stages: { ...FRACTION_T.en.stages, ...T.vn.stages } };
T.fr = { ...T.fr, ...FRACTION_T.fr, stages: { ...T.fr.stages, ...FRACTION_T.fr.stages } };

/**
 * What happens in column c of a worked example, in `t`'s words: the point (on the first
 * column after it), the carry read with the digit, how many fit, what is left, and where
 * it is written. When the next digit is a 0 the student adds, this press says so, since
 * that 0 appears on the board with it.
 */
function watchSentence(t, model, c) {
  const col = model.cols[c];
  const next = model.cols[c + 1];
  const d = model.divisor;
  const parts = [];
  if (col.dec && (c === 0 || !model.cols[c - 1].dec)) parts.push(t.pointUp);
  if (col.carryIn > 0) parts.push(t.readK(col.carryIn, col.digit, col.current));
  parts.push(t.howMany(d, col.current));
  parts.push(col.q === 0 ? t.none(col.current, d, col.leading) : t.fits(col.q, d));
  if (col.carryOut > 0) {
    parts.push(col.q === 0 ? t.leftAll(col.carryOut) : t.leftSome(col.current, col.q * d, col.carryOut));
    if (!next) parts.push(t.stopRound);
    else if (!next.added) parts.push(t.carryNext(col.carryOut));
    else parts.push(c + 1 === model.givenCols && model.pointAdded ? t.carryPoint(col.carryOut) : t.carryZero(col.carryOut));
  } else if (!next) parts.push(t.nothingLeft);
  return parts.join(' ');
}

/** A T entry in every language at once: `{ en, vn, fr }`. */
const inAll = (key, ...args) => {
  const one = (l) => (typeof T[l][key] === 'function' ? T[l][key](...args) : T[l][key]);
  return { en: one('en'), vn: one('vn'), fr: one('fr') };
};
/** Join two `{ en, vn, fr }` messages with a space, language by language. */
const joinMsg = (a, b) => ({ en: `${a.en} ${b.en}`, vn: `${a.vn} ${b.vn}`, fr: `${a.fr ?? a.en} ${b.fr ?? b.en}` });

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function deriveItem(item) {
  if (!item?.id) return null;
  try { return shortDivModel(item); } catch { return null; }
}

/** The optional stages an item switches on (utils/shortDivExtras.js). */
function extrasOf(item, model) {
  return {
    table: !item?.watch && !!model && ((item?.table === true && model.divisor >= TABLE_MIN_DIVISOR) || item?.table === 'always'),
    check: !item?.watch && item?.check === true && !!model && model.dp == null && !model.remainderMode,
  };
}

export default function ShortDivision({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => deriveItem(it)), [pool]);

  const { lang, toggleLang } = useLang({ langs, bilingual });
  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, score] of Object.entries(savedData || {})) init[id] = { score: Number(score) || 0 };
    return init;
  });
  const [openedWith] = useState(results);
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  // null = the item's first stage: Table when it has one, else Divide.
  const [stageSet, setStage] = useState(null);
  const [tableEntries, setTableEntries] = useState({});
  const [tableMarks, setTableMarks] = useState({});
  const [invMarks, setInvMarks] = useState({});
  const [zeros, setZeros] = useState(0);
  const [entries, setEntries] = useState({});
  const [marks, setMarks] = useState({});
  const [col, setCol] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [note, setNote] = useState(null);
  const [roundTyped, setRoundTyped] = useState('');
  const [roundMark, setRoundMark] = useState(null);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);
  // A worked example (`watch`): how many columns are written in so far.
  const [watchShown, setWatchShown] = useState(0);

  const item = items[pos];
  const model = useMemo(() => deriveItem(item), [item]);
  const extras = extrasOf(item, model);
  const stage = item?.watch ? 'watch' : stageSet ?? (extras.table ? 'table' : 'divide');
  const t = T[lang] || T.en;

  // Open with the cursor in the first box.
  useEffect(() => { focusBox(UID, 'q0'); }, []);
  const pick = (en, vn, fr) => tr(lang, en, vn || en, fr || en);
  const say = (m) => (m ? pick(m.en, m.vn, m.fr) : '');

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-8 h-8" style={{ color: INK }} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const avail = model.givenCols + zeros;
  const need = model.cols.length;
  const column = model.cols[Math.min(col, need - 1)];
  const dividing = stage === 'divide' && !itemDone;
  const hasRound = model.dp != null;
  const rem = model.remainderMode;
  // The box this column's remainder goes in: the small box on the next digit,
  // or — at the last digit of a remainder item — the r box after the answer.
  const carryIdOf = (c, availNow = avail) => (rem && c === need - 1 ? 'r' : c + 1 < availNow ? `k${c + 1}` : null);
  const lastRem = rem && col === need - 1;
  const stages = item.watch ? ['watch'] : [...(extras.table ? ['table'] : []), 'divide', ...(hasRound ? ['round'] : []), ...(extras.check ? ['check'] : [])];
  // Worked examples are saved (so a return skips them) but never scored.
  const scored = items.filter((it) => !it.watch);

  /* ---------------------------------------------------------- saving */
  const summary = (res) => {
    const cleared = scored.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = scored.length ? Math.round((cleared / scored.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = scored.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
    return { raw, blob, log };
  };
  const completeItem = (wasHelped) => {
    const next = { ...results, [item.id]: { score: wasHelped ? 0.5 : 1 } };
    setResults(next);
    setItemDone(true);
    const { raw, blob, log } = summary(next);
    onProgress?.(raw, blob, { items: log });
  };
  const goNext = () => {
    setPos((p) => p + 1);
    setStage(null); setZeros(0); setEntries({}); setMarks({}); setCol(0); setWrongs(0);
    setTableEntries({}); setTableMarks({}); setInvMarks({});
    setHelped(false); setSlipped(false); setMsg(null); setNote(null);
    setRoundTyped(''); setRoundMark(null); setItemDone(false); setWatchShown(0);
    focusBox(UID, 'q0');
  };

  /* ---------------------------------------------------------- watch (watch: true) */
  // One column a press: its digit on top, its remainder carried, and the zeros the
  // page needs so far. The last press finishes the example.
  const watchZeros = (shown) => (shown === 0 ? 0
    : Math.min(model.zerosNeeded, Math.max(0, Math.min(shown + 1, need) - model.givenCols)));
  const watchNext = () => {
    const c = watchShown;
    if (c >= need) { if (pos === items.length - 1) finish(); else goNext(); return; }
    const k = model.cols[c];
    const kId = c + 1 < need && k.carryOut > 0 ? `k${c + 1}` : null;
    setEntries((e) => ({ ...e, [`q${c}`]: k.leading ? '' : String(k.q), ...(kId ? { [kId]: String(k.carryOut) } : {}) }));
    setMarks((m) => ({ ...m, [`q${c}`]: 'good', ...(kId ? { [kId]: 'good' } : {}) }));
    setZeros(watchZeros(c + 1));
    setWatchShown(c + 1);
    setMsg(null);
    if (c + 1 === need) {
      const next = { ...results, [item.id]: { score: 1 } };
      setResults(next);
      const { raw, blob, log } = summary(next);
      onProgress?.(raw, blob, { items: log });
    }
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = summary(results);
    onComplete?.(raw, blob, { items: log });
  };
  // X only logs an attempt when something was answered THIS sitting.
  const quit = () => (results !== openedWith && Object.keys(results).length ? finish() : onQuit?.());

  /* ---------------------------------------------------------- the board */
  const stateOf = (id) => {
    // a leading 0 that was (rightly) left blank stays an empty dashed box
    if (marks[id] === 'good' && id.startsWith('q') && !String(entries[id] ?? '').trim()) return 'idle';
    if (marks[id] === 'good' || marks[id] === 'shown') return marks[id];
    if (!dividing) return 'idle';
    if (id === `q${col}` || id === carryIdOf(col)) return marks[id] === 'bad' ? 'bad' : 'live';
    return 'idle';
  };
  const edit = (id, text) => {
    setEntries((e) => ({ ...e, [id]: text }));
    if (marks[id] === 'bad') setMarks((m) => ({ ...m, [id]: undefined }));
    if (msg?.tone === 'bad') setMsg(null);
  };
  const addZero = () => {
    if (zeros >= MAX_ZEROS || avail >= MAX_COLS) { setMsg({ tone: 'info', ...inAll('maxZeros') }); return; }
    setNote(zeros === 0 && model.givenCols === model.intLen ? inAll('pointNote') : null);
    setZeros(zeros + 1);
    if (msg?.tone === 'bad') setMsg(null);
    // the new zero is the next digit: its small box is live straight away
    if (col === avail - 1) focusBox(UID, marks[`q${col}`] === 'good' ? `k${avail}` : `q${col}`);
  };
  const lastCol = avail - 1;
  const canRemove = dividing && zeros > 0 && lastCol > col;
  const removeZero = () => {
    if (!canRemove) return;
    setZeros(zeros - 1);
    setEntries((e) => { const n = { ...e }; delete n[`k${lastCol}`]; delete n[`q${lastCol}`]; return n; });
    setMarks((m) => { const n = { ...m }; delete n[`k${lastCol}`]; delete n[`q${lastCol}`]; return n; });
    setNote(null);
  };

  /** The division is finished: take extra zeros away, then round or finish. */
  const finishDivide = (zerosNow, wasHelped) => {
    if (model.givenCols + zerosNow > need) {
      setZeros(model.zerosNeeded);
      setNote(extraZeroNote(model));
    } else setNote(null);
    setMsg(null);
    setWrongs(0);
    if (hasRound) { setStage('round'); requestAnimationFrame(() => document.getElementById(`${UID}-round`)?.focus()); }
    else if (extras.check) setStage('check');
    else completeItem(wasHelped);
  };
  const stepOn = (zerosNow, wasHelped) => {
    if (col === need - 1) { finishDivide(zerosNow, wasHelped); return; }
    setCol(col + 1);
    setWrongs(0);
    focusBox(UID, `q${col + 1}`);
  };

  /** What was written in this column when it was filled in, as one short line. */
  const shownCol = (kId, newZero) => {
    const s = `${column.current} ÷ ${model.divisor}`;
    const { q, carryOut: r } = column;
    if (!r) return inAll('shownNone', s, q);
    if (kId === 'r') return inAll('shownR', s, q, r);
    if (kId) return inAll('shownCarry', s, q, r, newZero);
    return inAll('shownTop', s, q, r);
  };

  /** Fill this column in (after two wrong tries, or Show me) and move on. */
  const revealStep = () => {
    const qId = `q${col}`;
    const last = col === need - 1;
    let zerosNow = zeros;
    if (!last && col + 1 >= avail) { zerosNow = zeros + 1; setZeros(zerosNow); }
    const kId = carryIdOf(col, model.givenCols + zerosNow);
    const showCarry = kId != null;
    setEntries((e) => ({ ...e, [qId]: String(column.q), ...(showCarry ? { [kId]: String(column.carryOut) } : {}) }));
    setMarks((m) => ({
      ...m,
      [qId]: m[qId] === 'good' ? 'good' : 'shown',
      ...(showCarry ? { [kId]: m[kId] === 'good' ? 'good' : 'shown' } : {}),
    }));
    setHelped(true);
    setSlipped(true);
    stepOn(zerosNow, true);
    setMsg({ tone: 'shown', ...shownCol(kId, zerosNow > zeros) });
  };

  const checkDivide = () => {
    const qId = `q${col}`;
    const kId = carryIdOf(col);
    const hasNext = col + 1 < avail;
    const hasBox = kId != null;
    const last = col === need - 1;
    const qText = String(entries[qId] ?? '').trim();
    if (!qText && !column.leading) { setMsg({ tone: 'info', ...inAll('typeTop') }); focusBox(UID, qId); return; }
    const qOk = qDigitOk(column, qText);
    const kText = String(entries[kId] ?? '').trim();
    if (qOk && hasBox && !kText && column.carryOut !== 0) {
      setMarks((m) => ({ ...m, [qId]: 'good' }));
      setMsg({ tone: 'info', ...inAll(lastRem ? 'fillRem' : 'fillCarry') });
      focusBox(UID, kId);
      return;
    }
    const kOk = !hasBox || carryOk(column.carryOut, kText);
    const needZero = !hasNext && !last;

    if (qOk && kOk && !needZero) {
      setMarks((m) => ({ ...m, [qId]: 'good', ...(hasBox ? { [kId]: 'good' } : {}) }));
      // r 0 is written out, so the finished sum shows it divides exactly
      if (lastRem && !kText) setEntries((e) => ({ ...e, r: '0' }));
      setMsg(null);
      stepOn(zeros, helped);
      return;
    }
    if (qOk && needZero) {
      // Right digit, but the page has run out: a zero is needed. Named, not counted.
      setMarks((m) => ({ ...m, [qId]: 'good' }));
      setSlipped(true);
      setMsg({ tone: 'bad', ...needZeroHint(model, column) });
      return;
    }
    const why = !qOk ? qHint(model, column) : lastRem ? remHint(model, column) : carryHint(model, column);
    setSlipped(true);
    if (wrongs + 1 >= 2) { revealStep(); return; }
    setWrongs(wrongs + 1);
    setMarks((m) => ({ ...m, [qId]: qOk ? 'good' : 'bad', ...(hasBox && qOk ? { [kId]: 'bad' } : {}) }));
    setMsg({ tone: 'bad', ...why });
    focusBox(UID, qOk ? kId : qId);
  };

  /* ---------------------------------------------------------- round */
  const checkRound = () => {
    const d = diagnoseRound(model.round, model.dp, roundTyped);
    if (d.ok) { setRoundMark('good'); setMsg({ tone: 'ok', ...inAll('roundRight') }); completeItem(helped); return; }
    if (d.soft) { setMsg({ tone: 'info', en: d.en, vn: d.vn, fr: d.fr }); return; }
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      const f = inAll('filled');
      setRoundTyped(model.answerText);
      setRoundMark('shown');
      setHelped(true);
      setMsg({ tone: 'shown', ...joinMsg(d, f) });
      completeItem(true);
      return;
    }
    setWrongs(wrongs + 1);
    setRoundMark('bad');
    setMsg({ tone: 'bad', en: d.en, vn: d.vn, fr: d.fr });
  };
  const showRound = () => {
    setRoundTyped(model.answerText);
    setRoundMark('shown');
    setHelped(true);
    setMsg({ tone: 'shown', ...inAll('roundShown', model.quotientText, model.answerText) });
    completeItem(true);
  };

  /* ---------------------------------------------------------- table (table: true) */
  // The extras' messages are { en, fr } (Unit 4 units); English stands in for vn.
  const enVn = (m) => ({ ...m, vn: m.vn ?? m.en });
  const tableKs = [2, 3, 4, 5, 6, 7, 8, 9];
  const tableDone = (marksNow) => {
    setTableMarks(marksNow);
    setWrongs(0);
    setStage('divide');
    focusBox(UID, 'q0');
  };
  const editTable = (k, text) => {
    setTableEntries((e) => ({ ...e, [k]: text }));
    if (tableMarks[k] === 'bad') setTableMarks((m) => ({ ...m, [k]: undefined }));
    if (msg?.tone === 'bad' || msg?.tone === 'info') setMsg(null);
  };
  const checkTable = () => {
    const d = model.divisor;
    const open = tableKs.filter((k) => tableMarks[k] !== 'good' && tableMarks[k] !== 'shown');
    if (open.some((k) => !String(tableEntries[k] ?? '').trim())) { setMsg({ tone: 'info', ...inAll('fillTable') }); return; }
    const wrong = open.filter((k) => !tableCellOk(d, k, tableEntries[k]));
    const next = { ...tableMarks };
    open.forEach((k) => { next[k] = wrong.includes(k) ? 'bad' : 'good'; });
    if (!wrong.length) { setMsg(null); tableDone(next); return; }
    setSlipped(true);
    const hint = enVn(tableHint(d, wrong[0]));
    if (wrongs + 1 >= 2) {
      // second try: the wrong rows are written in, and the item pays half
      wrong.forEach((k) => { next[k] = 'shown'; });
      setTableEntries((e) => ({ ...e, ...Object.fromEntries(wrong.map((k) => [k, String(k * d)])) }));
      setHelped(true);
      setMsg({ tone: 'shown', ...joinMsg(hint, inAll('tableFixed')) });
      tableDone(next);
      return;
    }
    setWrongs(wrongs + 1);
    setTableMarks(next);
    setMsg({ tone: 'bad', ...hint });
    document.getElementById(tableBoxId(UID, wrong[0]))?.focus();
  };
  const showTable = () => {
    const d = model.divisor;
    const next = { ...tableMarks };
    tableKs.forEach((k) => { if (next[k] !== 'good') next[k] = 'shown'; });
    setTableEntries((e) => ({ ...e, ...Object.fromEntries(tableKs.map((k) => [k, String(k * d)])) }));
    setHelped(true);
    setSlipped(true);
    setMsg({ tone: 'shown', ...inAll('tableShown', d) });
    tableDone(next);
  };

  /* ---------------------------------------------------------- check (check: true) */
  const pickInverse = (val) => {
    const v = enVn(markInverse(model, val));
    if (v.ok) { setInvMarks((m) => ({ ...m, [val]: 'good' })); setMsg({ tone: 'ok', ...v }); completeItem(helped); return; }
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      setInvMarks((m) => ({ ...m, [val]: 'bad', back: 'shown' }));
      setHelped(true);
      setMsg({ tone: 'shown', ...joinMsg(v, enVn(markInverse(model, 'back'))) });
      completeItem(true);
      return;
    }
    setWrongs(wrongs + 1);
    setInvMarks((m) => ({ ...m, [val]: 'bad' }));
    setMsg({ tone: 'bad', ...v });
  };
  const showInverse = () => {
    setInvMarks((m) => ({ ...m, back: 'shown' }));
    setHelped(true);
    setSlipped(true);
    setMsg({ tone: 'shown', ...enVn(markInverse(model, 'back')) });
    completeItem(true);
  };

  /* ---------------------------------------------------------- render helpers */
  const cleared = scored.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.vn, levelRaw?.fr);
  const title = pick(pool?.title, pool?.titleVn, pool?.titleFr) || t.title;
  const q = questionText(model);
  const context = item.context ? pick(item.context, item.contextVn, item.contextFr) : null;
  // The first item to work at each level: how one goes, in three steps. The third is
  // what this kind of item adds. (The Dashboard showed it on the very first item only.)
  const prevItem = items.slice(0, pos).reverse().find((it) => !it.watch);
  const firstOfLevel = !item.watch && (!prevItem || prevItem.level !== item.level);
  const how = firstOfLevel ? [...t.how, rem ? t.howR : model.givenCols > model.intLen ? t.howPoint : t.howZero] : null;
  const want = hasRound ? placeName(model.dp) : null;
  const fracTex = item.fraction ? `\\dfrac{${model.dividendText}}{${model.divisor}}` : null;
  const sum = `${fracTex ? `${fracTex} = ` : ''}${model.dividendText} \\div ${model.divisor}`;
  const answerLatex = hasRound
    ? `${sum} = ${model.quotientText}${model.exact ? '' : '\\ldots'} \\approx ${model.answerText}\\;\\text{(${model.dp} ${t.dp})}`
    : `${sum} = ${model.answerText}${rem && model.finalRemainder ? `\\text{ r }${model.finalRemainder}` : ''}`;
  // A fraction item asks "Write 13/8 as a decimal" and shows the division under it.
  const fracQuestion = fracTex && (
    <span>{t.write} <SafeInlineMath math={fracTex} /> {hasRound ? t.toPlaces(pick(want.en, want.vn, want.frTo)) : t.asDecimal}.</span>
  );
  const fracBig = fracTex && (
    <div className="flex flex-col items-center gap-1">
      <SafeInlineMath math={`${fracTex} = ${model.dividendText} \\div ${model.divisor}`} />
      <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">{t.topOverBottom}</span>
    </div>
  );
  const watchDone = item.watch && watchShown >= need;
  const watchText = !item.watch ? null
    : watchShown === 0 ? t.watchTitle(`${model.dividendText} ÷ ${model.divisor}`)
      : watchSentence(t, model, watchShown - 1);
  const verdict = rem ? remainderVerdict(model) : null;
  const roundTone = roundMark === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
    : roundMark === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
      : roundMark === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100';
  const labels = { addZero: t.addZero, addZeroTip: t.addZeroTip, removeZero: t.removeZero, top: t.top, carry: t.carry, remainder: t.remainder };

  // The stage in hand: its title, and one short line that says only what is new.
  const colSub = lastRem
    ? (column.carryIn > 0 ? `${t.readCarry(column.carryIn, column.digit, column.current)} ${t.remAfter}` : t.remLast)
    : column.carryIn > 0 ? t.readCarry(column.carryIn, column.digit, column.current)
      : col === 0 ? t.firstCol : null;
  const head = stage === 'watch' ? { title: watchText, sub: watchDone ? t.watchDone : watchShown === 0 ? t.watchSub : null }
    : stage === 'table' ? { title: t.tableTitle(model.divisor), sub: t.tableSub(model.divisor) }
      : stage === 'round' ? { title: t.roundTitle(model.quotientText, pick(want.en, want.vn, want.frTo)), sub: t.roundSub }
        : stage === 'check' ? { title: t.checkTitle, sub: t.checkSub(model.dividendText) }
          : { title: t.askCol(model.divisor, column.current), sub: colSub };
  const si = stages.indexOf(stage);
  const showMe = stage === 'watch' ? null : stage === 'round' ? showRound : stage === 'table' ? showTable : stage === 'check' ? showInverse : revealStep;
  const check = stage === 'watch' ? watchNext : stage === 'round' ? checkRound : stage === 'table' ? checkTable : stage === 'check' ? null : checkDivide;
  const checkLabel = stage !== 'watch' ? t.check : !watchDone ? t.nextStep : isLast ? t.finish : t.next;
  // The kit reads English or French; a Vietnamese message is handed over already chosen.
  const kitMsg = msg && say(msg) ? { tone: msg.tone, en: say(msg), vn: say(msg), fr: say(msg) } : null;
  const noteLine = note && (
    <p className="text-center text-sm font-bold text-[#0087a8] dark:text-cyan-300 leading-snug">{say(note)}</p>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined}
        onLangToggle={toggleLang} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-5 lg:items-start">
        {/* left: the question */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <QuestionCard ink={INK} icon={Divide} head={fracTex ? t.headFraction : hasRound ? t.headRound : t.headExact}
            doneText={`${cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / ${scored.length} ${t.solved}`}
            levelWord={t.level} level={item.level || null} levelName={levelName}
            context={context} question={fracQuestion || pick(q.en, q.vn, q.fr)} big={fracBig} how={how} />
          {/* the times table, once written, stays beside the bus stop */}
          {extras.table && stage !== 'table' && (
            <TimesTableCard key={`tt-${item.id}`} divisor={model.divisor} entries={tableEntries} marks={tableMarks} compact uid={UID} lang={lang} ink={INK} />
          )}
        </div>

        {/* right: the stage in hand */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <StepPanel ink={INK} lang={lang} steps={stepsOf(stages, si, t.stages)} n={si + 1}
              title={head.title} sub={head.sub} msg={kitMsg}
              onShowMe={showMe} onCheck={check} checkLabel={checkLabel}>
              {stage === 'table' ? (
                <TimesTableCard key={`tt-${item.id}`} divisor={model.divisor} entries={tableEntries} marks={tableMarks} editable
                  onEdit={editTable} onEnter={checkTable} uid={UID} lang={lang} ink={INK} />
              ) : (
                <ShortDivBoard model={model} zeros={zeros} entries={entries} stateOf={stateOf} onEdit={edit}
                  onEnter={dividing ? checkDivide : undefined}
                  onAddZero={dividing && !rem ? addZero : null} onRemoveZero={canRemove ? removeZero : null}
                  activeCol={dividing ? col : stage === 'watch' && watchShown > 0 && !watchDone ? watchShown - 1 : null}
                  uid={UID} ink={INK} labels={labels} />
              )}

              {watchDone && (
                <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border-2 p-3 min-w-0" style={{ borderColor: INK, backgroundColor: 'rgba(124,58,237,0.07)' }}>
                  <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                  <div className="text-xl text-slate-900 dark:text-slate-100 overflow-x-auto overflow-y-hidden py-1"><SafeInlineMath math={answerLatex} /></div>
                </div>
              )}

              {noteLine}

              {stage === 'round' && (
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
                  <SafeInlineMath math={`${sum} \\approx`} />
                  <input
                    id={`${UID}-round`}
                    value={roundTyped}
                    onChange={(e) => { setRoundTyped(e.target.value); if (roundMark === 'bad') setRoundMark(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') checkRound(); }}
                    inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
                    className={`w-36 sm:w-40 h-14 px-2 rounded-xl border-2 border-b-[4px] font-mono font-black text-2xl sm:text-3xl text-center placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-violet-500 ${roundTone}`}
                  />
                  <span className="text-sm font-bold text-slate-400">({model.dp} {t.dp})</span>
                </div>
              )}

              {stage === 'check' && (
                <InverseChoices choices={inverseChoices(model)} marks={invMarks} onPick={pickInverse} />
              )}
            </StepPanel>
          )}

          {itemDone && (
            <DoneCard ink={INK} inkDark={INK_DARK} helped={helped} slipped={slipped}
              words={{ clean: t.clean, slipped: t.slipped, helped: t.helped, bookCopy: t.bookCopy, next: t.next, finish: t.finish }}
              shown={msg?.tone === 'shown' ? say(msg) : null}
              isLast={isLast} onNext={isLast ? finish : goNext}>
              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 min-w-0">
                <ShortDivBoard model={model} zeros={model.zerosNeeded} entries={entries} stateOf={stateOf} onEdit={() => {}} uid={`${UID}-done`} ink={INK} labels={labels} />
                {noteLine && <div className="mt-2">{noteLine}</div>}
              </div>
              <div className="flex items-center gap-3 rounded-xl border-2 p-3 min-w-0" style={{ borderColor: INK, backgroundColor: 'rgba(124,58,237,0.07)' }}>
                <ListChecks className="w-5 h-5 shrink-0" style={{ color: INK }} strokeWidth={3} />
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.answer}</div>
                <div className="text-xl text-slate-900 dark:text-slate-100 overflow-x-auto overflow-y-hidden py-1"><SafeInlineMath math={answerLatex} /></div>
              </div>
              {extras.check && <InverseDone model={model} product={decText(inverseProduct(model))} lang={lang} ink={INK} />}
              {verdict && (
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{say(verdict)}</p>
              )}
            </DoneCard>
          )}
        </div>
      </div>
    </div>
  );
}
