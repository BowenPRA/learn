import { useEffect, useMemo, useState } from 'react';
import { Divide, Construction, ListChecks } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { SafeInlineMath } from '../components/notes/SafeMath.jsx';
import ShortDivBoard from '../components/math/ShortDivBoard.jsx';
import { QuestionCard, StepPanel, DoneCard } from '../components/math/StepKit.jsx';
import { boxOrder, focusBox } from '../components/math/shortDivBoardHelpers';
import {
  shortDivModel, qDigitOk, carryOk, qHint, carryHint, remHint, remainderVerdict, needZeroHint, extraZeroNote, questionText,
  MAX_ZEROS, MAX_COLS,
} from '../utils/shortDivision';
import { diagnoseRound, placeName, readProblem } from '../utils/rounding';
import { readDec, sameValue } from '../utils/decimal';

/* ------------------------------------------------------------------ *
 * BUS STOP — short division, written the short way, on an open board.
 *
 * Reads a unit's `shortDiv`:
 *   { title, titleFr, levels: { n: { en, fr } }, items: [
 *       { id, level, fraction: true, dividend: '13', divisor: 8 },        13/8 as a decimal
 *       { id, level, fraction: true, dividend: '2', divisor: 3, dp: 3 },  correct to 3 d.p.
 *       { id, level, dividend: '936', divisor: 4 },                       Work out 936 ÷ 4.
 *       { id, level, dividend: '85', divisor: 4, remainder: true },       whole: 21 r 1
 *       (+ context / contextFr)
 *   ] }
 * utils/shortDivision.js derives every column from the two numbers.
 *
 * Maths 7.1 "Fractions to decimals" (PRA Learn). Copied from the Dashboard's Maths 3.2
 * screen on 20 November 2026, then redesigned the same day at Bowen's word: "I don't
 * like the initial intros as they will just do spam clicks. it looks over scaffolded."
 * Gone: the worked examples pressed through a column at a time, the times table written
 * first, and the column-at-a-time guide with its question for every column.
 *
 * Now the whole bus stop is open from the first problem, as on paper. The student types
 * every digit on top and every remainder in its small box, presses +0 when the digits
 * run out, and types the answer under it (rounded, for a `dp` item; a remainder item's
 * answer is its r box). One Check marks it as a teacher would: green up to the first
 * mistake, that box red with a hint that never states the digit, and nothing after it
 * marked. A box left empty, or a zero still to add, is pointed out without counting.
 *
 * Help only on request: Hint says what to do at the first box that is empty or wrong,
 * and marks nothing. Show me fills in that column. A second wrong Check at the same box
 * fills it in too. A problem that was filled in pays half; fixed alone, it pays in full.
 * Progress blob: { [itemId]: 1 | 0.5 }, score out of 10.
 *
 * English and French (Year 7). English stands in for Vietnamese.
 * ------------------------------------------------------------------ */

const INK = '#7c3aed';
const INK_DARK = '#5b21b6';
const UID = 'busstop';
const ANSWER_ID = `${UID}-answer`;

const T = {
  en: {
    title: 'Bus Stop',
    check: 'Check', next: 'Next question', finish: 'Finish',
    solved: 'done', level: 'Level',
    clean: 'Every box right first time.',
    slipped: 'Done — a wrong turn, and you found it yourself.',
    helped: 'Done — with a step or two shown to you.',
    bookCopy: 'Copy this into your book', answer: 'Answer',
    headExact: 'Divide', headRound: 'Divide, then round', headFraction: 'Fraction to decimal',
    write: 'Write', asDecimal: 'as a decimal',
    toPlaces: (want) => `as a decimal, correct to ${want}`,
    topOverBottom: 'A fraction is a division: the top ÷ the bottom.',
    doTitle: 'Divide on the bus stop. Then write the answer.',
    doTitleRem: 'Divide on the bus stop. What is left goes after the r.',
    doSubRound: (dp) => `Work out ${dp + 1} decimal places, then round to ${dp}.`,
    typeAnswer: 'The bus stop is right. Now write the answer in the box under it.',
    readTop: 'Read the answer from the top of the bus stop, digit by digit.',
    noPoint: 'The digits are right, but the point is not. It goes straight up from the point in the number.',
    answerShown: (a) => `Filled in: the answer is ${a}.`,
    shownNone: (s, q) => `Filled in: ${s} = ${q}, nothing left over.`,
    shownCarry: (s, q, r) => `Filled in: ${s} = ${q} r ${r} — ${q} on top, ${r} carried.`,
    shownR: (s, q, r) => `Filled in: ${s} = ${q} r ${r} — ${q} on top, ${r} after the r.`,
    maxZeros: 'That is as many zeros as the page holds.',
    addZero: 'Add a zero', addZeroTip: 'Add a zero after the point', removeZero: 'Take the last zero away',
    top: 'digit on top, column', carry: 'remainder carried onto digit', remainder: 'remainder',
    typeHere: 'the answer',
    noItems: 'No questions yet', back: 'Return to Dashboard',
    dp: 'd.p.',
  },
  fr: {
    title: 'Arrêt de bus',
    check: 'Vérifier', next: 'Suivant', finish: 'Terminer',
    solved: 'faites', level: 'Niveau',
    clean: 'Toutes les cases justes du premier coup.',
    slipped: "Fini — une erreur, et tu l'as trouvée toi-même.",
    helped: 'Fini — avec une ou deux étapes montrées.',
    bookCopy: 'Recopie ceci dans ton cahier', answer: 'Réponse',
    headExact: 'Divise', headRound: 'Divise, puis arrondis', headFraction: 'Fraction en décimal',
    write: 'Écris', asDecimal: 'en nombre décimal',
    toPlaces: (want) => `en nombre décimal, arrondi ${want}`,
    topOverBottom: 'Une fraction est une division : le haut ÷ le bas.',
    doTitle: 'Divise en bus stop. Puis écris la réponse.',
    doTitleRem: 'Divise en bus stop. Ce qui reste va après le r.',
    doSubRound: (dp) => `Calcule ${dp + 1} décimales, puis arrondis à ${dp}.`,
    typeAnswer: 'Le bus stop est juste. Écris maintenant la réponse dans la case du dessous.',
    readTop: 'Lis la réponse en haut du bus stop, chiffre par chiffre.',
    noPoint: 'Les chiffres sont justes, mais pas le point. Il monte tout droit depuis le point du nombre.',
    answerShown: (a) => `Rempli : la réponse est ${a}.`,
    shownNone: (s, q) => `Rempli : ${s} = ${q}, il ne reste rien.`,
    shownCarry: (s, q, r) => `Rempli : ${s} = ${q} reste ${r} — ${q} en haut, ${r} reporté.`,
    shownR: (s, q, r) => `Rempli : ${s} = ${q} reste ${r} — ${q} en haut, ${r} après le r.`,
    maxZeros: "C'est le maximum de zéros que la page peut contenir.",
    addZero: 'Ajoute un zéro', addZeroTip: 'Ajoute un zéro après le point', removeZero: 'Enlève le dernier zéro',
    top: 'chiffre du haut, colonne', carry: 'reste reporté sur le chiffre', remainder: 'reste',
    typeHere: 'la réponse',
    noItems: 'Pas encore de questions', back: 'Retour au tableau de bord',
    dp: 'déc.',
  },
};

/** A T entry in both languages at once: `{ en, fr }`. */
const inAll = (key, ...args) => {
  const one = (l) => (typeof T[l][key] === 'function' ? T[l][key](...args) : T[l][key]);
  return { en: one('en'), fr: one('fr') };
};

const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

function deriveItem(item) {
  if (!item?.id) return null;
  try { return shortDivModel(item); } catch { return null; }
}

/**
 * The first box on the board that is empty or wrong, in the order it is written
 * (q0, k1, q1, k2 … r), up to the digits the student has so far. Then, if every box is
 * right but the digits ran out too soon, the zero still to add. Null when the board is
 * finished and right. { id, col, blank, needZero, hint }.
 */
function boardProblem(model, avail, entries) {
  const need = model.cols.length;
  for (const id of boxOrder(Math.min(avail, need), model.remainderMode)) {
    const typed = String(entries[id] ?? '').trim();
    let c;
    let ok;
    let hint;
    if (id === 'r') {
      c = need - 1;
      ok = carryOk(model.cols[c].carryOut, typed);
      hint = remHint(model, model.cols[c]);
    } else if (id[0] === 'q') {
      c = Number(id.slice(1));
      ok = qDigitOk(model.cols[c], typed);
      hint = qHint(model, model.cols[c]);
    } else {
      c = Number(id.slice(1)) - 1;
      ok = carryOk(model.cols[c].carryOut, typed);
      hint = carryHint(model, model.cols[c]);
    }
    if (!ok) return { id, col: c, blank: !typed, hint };
  }
  if (avail < need) return { id: null, col: avail - 1, needZero: true, hint: needZeroHint(model, model.cols[avail - 1]) };
  return null;
}

/** The answer typed under the board, checked: { ok, soft?, en, fr }. */
function answerVerdict(model, typed) {
  if (model.dp != null) return diagnoseRound(model.round, model.dp, typed);
  const r = readDec(typed);
  if (!r.ok) return readProblem(r.code);
  if (sameValue(r.v, model.answer)) return { ok: true };
  // the right digits with the point left out or in the wrong place
  const digits = (s) => s.replace(/\D/g, '').replace(/^0+/, '');
  if (digits(String(typed)) === digits(model.answerText)) return { ok: false, ...inAll('noPoint') };
  return { ok: false, ...inAll('readTop') };
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
  const [zeros, setZeros] = useState(0);
  const [entries, setEntries] = useState({});
  const [marks, setMarks] = useState({});
  const [wrongs, setWrongs] = useState({});
  const [answer, setAnswer] = useState('');
  const [answerMark, setAnswerMark] = useState(null);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [note, setNote] = useState(null);
  const [itemDone, setItemDone] = useState(false);
  const [ended, setEnded] = useState(false);

  const item = items[pos];
  const model = useMemo(() => deriveItem(item), [item]);
  const t = T[lang] || T.en;

  // Open with the cursor in the first box.
  useEffect(() => { focusBox(UID, 'q0'); }, []);
  const pick = (en, fr) => tr(lang, en, en, fr || en);
  const say = (m) => (m ? pick(m.en, m.fr) : '');

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
  const hasRound = model.dp != null;
  const rem = model.remainderMode;

  /* ---------------------------------------------------------- saving */
  const summary = (res) => {
    const cleared = items.reduce((s, it) => s + (res[it.id]?.score || 0), 0);
    const raw = items.length ? Math.round((cleared / items.length) * 10) : 0;
    const blob = Object.fromEntries(items.filter((it) => res[it.id]).map((it) => [it.id, res[it.id].score]));
    const log = items.map((it) => ({ itemId: it.id, correct: res[it.id]?.score === 1 }));
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
    setZeros(0); setEntries({}); setMarks({}); setWrongs({});
    setAnswer(''); setAnswerMark(null);
    setHelped(false); setSlipped(false); setMsg(null); setNote(null); setItemDone(false);
    focusBox(UID, 'q0');
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
    if (marks[id]) return marks[id];
    return itemDone ? 'idle' : 'live';
  };
  const edit = (id, text) => {
    setEntries((e) => ({ ...e, [id]: text }));
    if (marks[id] === 'bad') setMarks((m) => ({ ...m, [id]: undefined }));
    if (msg?.tone === 'bad' || msg?.tone === 'info') setMsg(null);
  };
  const addZero = () => {
    if (zeros >= MAX_ZEROS || avail >= MAX_COLS) { setMsg({ tone: 'info', ...inAll('maxZeros') }); return; }
    setZeros(zeros + 1);
    if (msg?.tone === 'info') setMsg(null);
    // the new zero's small box is the next to fill
    focusBox(UID, `k${avail}`);
  };
  const removeZero = () => {
    if (!zeros) return;
    const last = avail - 1;
    setZeros(zeros - 1);
    setEntries((e) => { const n = { ...e }; delete n[`k${last}`]; delete n[`q${last}`]; return n; });
    setMarks((m) => { const n = { ...m }; delete n[`k${last}`]; delete n[`q${last}`]; return n; });
  };

  /** Every box written before `stopId` is right: mark it green. */
  const markGoodBefore = (stopId, availNow = avail) => {
    const order = boxOrder(Math.min(availNow, need), rem);
    const upTo = stopId ? order.indexOf(stopId) : order.length;
    setMarks((m) => {
      const n = { ...m };
      order.slice(0, upTo < 0 ? order.length : upTo).forEach((id) => { if (n[id] !== 'shown') n[id] = 'good'; });
      return n;
    });
  };

  /** Fill in column c: its digit on top and the remainder it carries (adding the zero it needs). */
  const fillColumn = (c) => {
    const col = model.cols[c];
    // the next column has to be on the page for the remainder to be carried onto it
    const zerosNow = !rem && c + 1 < need && c + 1 >= avail ? c + 2 - model.givenCols : zeros;
    if (zerosNow !== zeros) setZeros(zerosNow);
    const availNow = model.givenCols + zerosNow;
    const kId = rem && c === need - 1 ? 'r' : c + 1 < Math.min(availNow, need) ? `k${c + 1}` : null;
    const qId = `q${c}`;
    setEntries((e) => ({ ...e, [qId]: col.leading ? '' : String(col.q), ...(kId ? { [kId]: col.carryOut ? String(col.carryOut) : '' } : {}) }));
    markGoodBefore(qId, availNow);
    setMarks((m) => ({ ...m, [qId]: m[qId] === 'good' ? 'good' : 'shown', ...(kId ? { [kId]: 'shown' } : {}) }));
    setWrongs({});
    setHelped(true);
    setSlipped(true);
    const s = `${col.current} ÷ ${model.divisor}`;
    const r = col.carryOut;
    setMsg({ tone: 'shown', ...(!r ? inAll('shownNone', s, col.q) : kId === 'r' ? inAll('shownR', s, col.q, r) : inAll('shownCarry', s, col.q, r)) });
    focusBox(UID, c + 1 < need ? `q${c + 1}` : 'q0');
  };

  /** The board is right: trim extra zeros, then the answer, or done (a remainder item). */
  const boardDone = () => {
    if (avail > need) {
      setZeros(model.zerosNeeded);
      setNote(extraZeroNote(model));
      setEntries((e) => {
        const n = { ...e };
        for (let c = need; c < avail; c += 1) { delete n[`q${c}`]; delete n[`k${c}`]; }
        return n;
      });
    }
    markGoodBefore(null, need);
  };

  const showAnswer = () => {
    setAnswer(model.answerText);
    setAnswerMark('shown');
    setHelped(true);
    setSlipped(true);
    setMsg({ tone: 'shown', ...inAll('answerShown', model.answerText) });
    completeItem(true);
  };

  const check = () => {
    if (itemDone) return;
    const p = boardProblem(model, avail, entries);
    if (p) {
      markGoodBefore(p.id);
      // An empty box, or a zero still to add, is pointed out — not counted.
      if (p.blank || p.needZero) {
        setMsg({ tone: 'info', ...p.hint });
        if (p.id) focusBox(UID, p.id);
        return;
      }
      setSlipped(true);
      const n = (wrongs[p.id] || 0) + 1;
      if (n >= 2) { fillColumn(p.col); return; }
      setWrongs((w) => ({ ...w, [p.id]: n }));
      setMarks((m) => ({ ...m, [p.id]: 'bad' }));
      setMsg({ tone: 'bad', ...p.hint });
      focusBox(UID, p.id);
      return;
    }
    boardDone();
    if (rem) { setMsg(null); completeItem(helped); return; }
    if (!answer.trim()) {
      setMsg({ tone: 'info', ...inAll('typeAnswer') });
      document.getElementById(ANSWER_ID)?.focus();
      return;
    }
    const v = answerVerdict(model, answer);
    if (v.ok) { setAnswerMark('good'); setMsg(null); completeItem(helped); return; }
    if (v.soft) { setMsg({ tone: 'info', en: v.en, fr: v.fr }); return; }
    setSlipped(true);
    const n = (wrongs.answer || 0) + 1;
    if (n >= 2) { showAnswer(); return; }
    setWrongs((w) => ({ ...w, answer: n }));
    setAnswerMark('bad');
    setMsg({ tone: 'bad', en: v.en, fr: v.fr });
    document.getElementById(ANSWER_ID)?.focus();
  };

  // Help on request: what to do at the first empty or wrong box. Marks nothing.
  const hint = () => {
    if (itemDone) return;
    const p = boardProblem(model, avail, entries);
    if (p) { setMsg({ tone: 'info', ...p.hint }); if (p.id) focusBox(UID, p.id); return; }
    if (rem) return;
    const v = answer.trim() ? answerVerdict(model, answer) : null;
    setMsg({ tone: 'info', ...(v && !v.ok ? { en: v.en, fr: v.fr } : inAll('typeAnswer')) });
    document.getElementById(ANSWER_ID)?.focus();
  };
  const showMe = () => {
    if (itemDone) return;
    const p = boardProblem(model, avail, entries);
    if (p) { fillColumn(p.col); return; }
    boardDone();
    if (rem) { completeItem(true); return; }
    showAnswer();
  };

  /* ---------------------------------------------------------- render */
  const cleared = items.reduce((s, it) => s + (results[it.id]?.score || 0), 0);
  const isLast = pos === items.length - 1;
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = typeof levelRaw === 'string' ? levelRaw : pick(levelRaw?.en, levelRaw?.fr);
  const title = pick(pool?.title, pool?.titleFr) || t.title;
  const q = questionText(model);
  const context = item.context ? pick(item.context, item.contextFr) : null;
  const want = hasRound ? placeName(model.dp) : null;
  const fracTex = item.fraction ? `\\dfrac{${model.dividendText}}{${model.divisor}}` : null;
  const lhs = fracTex || `${model.dividendText} \\div ${model.divisor}`;
  const sum = `${fracTex ? `${fracTex} = ` : ''}${model.dividendText} \\div ${model.divisor}`;
  const answerLatex = hasRound
    ? `${sum} = ${model.quotientText}${model.exact ? '' : '\\ldots'} \\approx ${model.answerText}\\;\\text{(${model.dp} ${t.dp})}`
    : `${sum} = ${model.answerText}${rem && model.finalRemainder ? `\\text{ r }${model.finalRemainder}` : ''}`;
  // A fraction item asks "Write 13/8 as a decimal" and shows the division under it.
  const fracQuestion = fracTex && (
    <span>{t.write} <SafeInlineMath math={fracTex} /> {hasRound ? t.toPlaces(pick(want.en, want.frTo)) : t.asDecimal}.</span>
  );
  const fracBig = fracTex && (
    <div className="flex flex-col items-center gap-1">
      <SafeInlineMath math={`${fracTex} = ${model.dividendText} \\div ${model.divisor}`} />
      <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">{t.topOverBottom}</span>
    </div>
  );
  const verdict = rem ? remainderVerdict(model) : null;
  const answerTone = answerMark === 'good' ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
    : answerMark === 'shown' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
      : answerMark === 'bad' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
        : 'border-violet-300 dark:border-violet-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100';
  const labels = { addZero: t.addZero, addZeroTip: t.addZeroTip, removeZero: t.removeZero, top: t.top, carry: t.carry, remainder: t.remainder };
  // The kit reads English or French; a message is handed over already chosen.
  const kitMsg = msg && say(msg) ? { tone: msg.tone, en: say(msg), vn: say(msg), fr: say(msg) } : null;
  const noteLine = note && (
    <p className="text-center text-sm font-bold text-[#0087a8] dark:text-cyan-300 leading-snug">{say(note)}</p>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined}
        onLangToggle={toggleLang} />

      <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-5 lg:items-start">
        {/* left: the question */}
        <div className="lg:sticky lg:top-4 flex flex-col gap-3 min-w-0">
          <QuestionCard ink={INK} icon={Divide} head={fracTex ? t.headFraction : hasRound ? t.headRound : t.headExact}
            doneText={`${cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / ${items.length} ${t.solved}`}
            levelWord={t.level} level={item.level || null} levelName={levelName}
            context={context} question={fracQuestion || pick(q.en, q.fr)} big={fracBig} />
        </div>

        {/* right: the open bus stop */}
        <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
          {!itemDone && (
            <StepPanel ink={INK} lang={lang}
              title={rem ? t.doTitleRem : t.doTitle} sub={hasRound ? t.doSubRound(model.dp) : null} msg={kitMsg}
              onHint={hint} onShowMe={showMe} onCheck={check} checkLabel={t.check}>
              <ShortDivBoard model={model} zeros={zeros} entries={entries} stateOf={stateOf} onEdit={edit}
                onEnter={check}
                onAddZero={!rem ? addZero : null} onRemoveZero={zeros > 0 ? removeZero : null}
                uid={UID} ink={INK} labels={labels} />

              {noteLine}

              {!rem && (
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
                  <SafeInlineMath math={`${lhs} ${hasRound ? '\\approx' : '='}`} />
                  <input
                    id={ANSWER_ID}
                    value={answer}
                    onChange={(e) => { setAnswer(e.target.value); if (answerMark === 'bad') setAnswerMark(null); if (msg?.tone === 'bad' || msg?.tone === 'info') setMsg(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
                    inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
                    className={`w-36 sm:w-40 h-14 px-2 rounded-xl border-2 border-b-[4px] font-mono font-black text-2xl sm:text-3xl text-center placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-violet-500 ${answerTone}`}
                  />
                  {hasRound && <span className="text-sm font-bold text-slate-400">({model.dp} {t.dp})</span>}
                </div>
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
