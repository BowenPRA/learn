import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ArrowLeft, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { SafeInlineMath } from './SafeMath.jsx';
import PlaceTable from '../math/PlaceTable.jsx';
import ShortDivBoard from '../math/ShortDivBoard.jsx';
import { decText, placesOf } from '../../utils/decimal';
import {
  shiftModel, questionLatex, answerLatex, tableCols, slideLimits, gapsAt, ghostOf, moveWords,
} from '../../utils/placeShift';
import { roundModel, diagnoseRound, placeName, columnName } from '../../utils/rounding';
import {
  shortDivModel, qDigitOk, carryOk, qHint, carryHint, needZeroHint, MAX_ZEROS,
} from '../../utils/shortDivision';
import { keepWhere } from '../../utils/activity';
import { tr } from '../../utils/lang';
import IneqLineFigure from '../math/IneqLineFigure.jsx';
import {
  ineqModel, diagnoseCircle, diagnoseArrow, diagnoseInteger, diagnoseWrite, diagnoseList, edgeWord, listText, numText,
} from '../../utils/ineqLine';

/**
 * The Year 7 number activities (Maths 3.1–3.2), rendered by ActivityBlock and
 * validated by utils/activity.js; schemas in docs/y7-math/number-engines.md §3.
 *
 *   shift    slide the digits along a place-value table (× ÷ 10ⁿ, a missing
 *            power, a mass conversion), then Check
 *   round    tap the last digit you keep, then type the rounded number
 *   busstop  a whole short division: quotient digits, the carries up-left of
 *            the next digit, zeros added after the point, (the rounded answer)
 *   ineq     an inequality on a number line (Maths 2.6): draw it, read it, give
 *            the smallest or largest integer, or tap every integer between two
 *
 * Every answer is derived (utils/placeShift.js, rounding.js, shortDivision.js)
 * and a wrong one is answered by the name of its slip before the authored
 * `explain`. Contract as for every activity: `result` is the stored
 * `{ done, correct, … }`; `onResult` is called once, with done: true; `retry`
 * is the previous wrong result when the activity is reopened to be fixed.
 */

const pickL = tr;
const said = (lang, m) => (m ? pickL(lang, m.en, m.vn, m.fr) : '');
/** One message in all three languages, from a key of T (or INEQ_T) and its arguments. */
const msgOf = (table, key, ...args) => {
  const at = (l) => (typeof table[l][key] === 'function' ? table[l][key](...args) : table[l][key]);
  return { en: at('en'), vn: at('vn'), fr: at('fr') };
};
/** An engine's verdict, every language it carries. */
const verdictOf = (d) => ({ en: d.en, vn: d.vn, fr: d.fr });
/** A rounding place for "rounded to …": French has the "à" built in (`frTo`). */
const toPlace = (p) => ({ en: p.en, vn: p.vn, fr: p.frTo ?? p.fr });

const T = {
  en: {
    check: 'Check', answer: 'Answer', tryAgain: 'One more try', typeHere: 'Type your answer',
    notMoved: 'not moved yet', slideFirst: 'Slide the digits first: press ← or →.',
    slideHow: 'Press ← or → to move every digit. The point never moves.',
    slideGhost: 'Slide until every digit sits on its ghost in the row below.',
    dirLeft: 'This makes the number bigger, so the digits move LEFT — into bigger columns.',
    dirRight: 'This makes the number smaller, so the digits move RIGHT — into smaller columns.',
    count: (p, got) => `Right direction — but every digit moves ${p} place${p === 1 ? '' : 's'}, one for each power. You moved ${got}.`,
    notLined: 'Not lined up yet — every digit must sit on its ghost in the row below.',
    ladder: (got) => `Right direction — but count the steps on the ladder. Each step is 10³, which is 3 places. You moved ${got}.`,
    left: 'one place left', right: 'one place right', reset: 'back to the start',
    everyDigit: (w) => `Every digit moved ${w}. The point did not move.`,
    powerIs: (p) => `The digits moved ${p} place${p === 1 ? '' : 's'}, so the power is ${p}.`,
    tapKeep: (name) => `Tap the last digit you keep for ${name}.`,
    tapWrong: (got, want, col) => `That is the ${got} digit. For ${want}, the last digit you keep is in the ${col} column.`,
    nowType: (d) => `The next digit is ${d} — it decides. Now type the rounded number.`,
    fillAll: 'Fill in every box first — a digit on top of each column, and each remainder in its small box.',
    fillRound: 'Now type the rounded answer in the box underneath.',
    notDone: 'Not finished yet.', addZero: 'add a zero', removeZero: 'take the last zero away',
    rounded: 'rounded', top: 'digit on top, column', carry: 'remainder carried onto digit',
    extra: 'You had more zeros than you need — the extra ones are taken away.',
    dp: 'd.p.',
  },
  vn: {
    check: 'Kiểm tra', answer: 'Đáp án', tryAgain: 'Thử lại một lần nữa', typeHere: 'Nhập đáp án',
    notMoved: 'chưa dịch', slideFirst: 'Hãy dịch các chữ số trước: bấm ← hoặc →.',
    slideHow: 'Bấm ← hoặc → để dịch mọi chữ số. Dấu thập phân không bao giờ di chuyển.',
    slideGhost: 'Dịch cho đến khi mỗi chữ số nằm đúng trên bóng của nó ở hàng dưới.',
    dirLeft: 'Phép này làm số lớn hơn, nên các chữ số dịch sang TRÁI — vào các cột lớn hơn.',
    dirRight: 'Phép này làm số nhỏ hơn, nên các chữ số dịch sang PHẢI — vào các cột nhỏ hơn.',
    count: (p, got) => `Đúng chiều — nhưng mọi chữ số phải dịch ${p} cột, mỗi số mũ một cột. Em đã dịch ${got} cột.`,
    notLined: 'Chưa khớp — mỗi chữ số phải nằm đúng trên bóng của nó ở hàng dưới.',
    ladder: (got) => `Đúng chiều — nhưng hãy đếm số bậc trên thang. Mỗi bậc là 10³, tức là 3 cột. Em đã dịch ${got} cột.`,
    left: 'một cột sang trái', right: 'một cột sang phải', reset: 'về vị trí ban đầu',
    everyDigit: (w) => `Mọi chữ số đã dịch ${w}. Dấu thập phân không di chuyển.`,
    powerIs: (p) => `Các chữ số đã dịch ${p} cột, nên số mũ là ${p}.`,
    tapKeep: (name) => `Chạm vào chữ số cuối cùng em giữ lại khi làm tròn đến ${name}.`,
    tapWrong: (got, want, col) => `Đó là chữ số ${got}. Khi làm tròn đến ${want}, chữ số cuối cùng được giữ lại nằm ở ${col}.`,
    nowType: (d) => `Chữ số tiếp theo là ${d} — nó quyết định. Bây giờ hãy nhập số đã làm tròn.`,
    fillAll: 'Hãy điền mọi ô trước — một chữ số phía trên mỗi cột, và mỗi số dư vào ô nhỏ của nó.',
    fillRound: 'Bây giờ hãy nhập đáp án đã làm tròn vào ô bên dưới.',
    notDone: 'Chưa xong.', addZero: 'thêm số 0', removeZero: 'bỏ số 0 cuối cùng',
    rounded: 'làm tròn', top: 'chữ số ở trên, cột', carry: 'số dư nhớ sang chữ số',
    extra: 'Em có nhiều số 0 hơn mức cần — những số 0 thừa được bỏ đi.',
    dp: 'c.s.t.p.',
  },
  fr: {
    check: 'Vérifier', answer: 'Réponse', tryAgain: 'Encore un essai', typeHere: 'Écris ta réponse',
    notMoved: 'pas encore déplacé', slideFirst: 'Fais d’abord glisser les chiffres : appuie sur ← ou →.',
    slideHow: 'Appuie sur ← ou → pour déplacer tous les chiffres. Le point décimal ne bouge jamais.',
    slideGhost: 'Fais glisser jusqu’à ce que chaque chiffre soit sur son fantôme, dans la ligne du dessous.',
    dirLeft: 'Le nombre devient plus grand, donc les chiffres vont à GAUCHE — dans des colonnes plus grandes.',
    dirRight: 'Le nombre devient plus petit, donc les chiffres vont à DROITE — dans des colonnes plus petites.',
    count: (p, got) => `Bonne direction — mais chaque chiffre avance de ${p} colonne${p === 1 ? '' : 's'}, une par puissance. Tu les as déplacés de ${got}.`,
    notLined: 'Pas encore aligné — chaque chiffre doit être sur son fantôme, dans la ligne du dessous.',
    ladder: (got) => `Bonne direction — mais compte les marches de l’échelle. Chaque marche vaut 10³, soit 3 colonnes. Tu les as déplacés de ${got}.`,
    left: 'une colonne à gauche', right: 'une colonne à droite', reset: 'retour au départ',
    everyDigit: (w) => `Tous les chiffres se sont déplacés de ${w}. Le point décimal n’a pas bougé.`,
    powerIs: (p) => `Les chiffres se sont déplacés de ${p} colonne${p === 1 ? '' : 's'}, donc la puissance est ${p}.`,
    tapKeep: (name) => `Touche le dernier chiffre que tu gardes pour arrondir ${name}.`,
    tapWrong: (got, want, col) => `C’est le chiffre des ${got}. Pour arrondir ${want}, le dernier chiffre gardé est dans la colonne des ${col}.`,
    nowType: (d) => `Le chiffre suivant est ${d} — c’est lui qui décide. Écris maintenant le nombre arrondi.`,
    fillAll: 'Remplis d’abord toutes les cases — un chiffre au-dessus de chaque colonne, et chaque reste dans sa petite case.',
    fillRound: 'Écris maintenant la réponse arrondie dans la case du dessous.',
    notDone: 'Pas encore fini.', addZero: 'ajouter un zéro', removeZero: 'enlever le dernier zéro',
    rounded: 'arrondi', top: 'chiffre du haut, colonne', carry: 'reste reporté sur le chiffre',
    extra: 'Tu avais plus de zéros que nécessaire — les zéros en trop sont enlevés.',
    dp: 'déc.',
  },
};

const btn = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const primary = `${btn} bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]`;
const arrow = 'w-12 h-11 rounded-xl border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all bg-[#0087a8] border-[#00697f] text-white flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none';
const GOOD = 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]';
const BAD = 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]';
const IDLE = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200';

function Verdict({ ok, lang, children }) {
  return (
    <div className={`rounded-xl border-2 mt-3 p-3 ${ok ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
      <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {ok ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
        {ok ? tr(lang, 'Correct', 'Chính xác', 'Correct !') : tr(lang, 'Not quite', 'Chưa đúng', 'Pas tout à fait')}
      </div>
      <div className={`font-bold leading-relaxed text-sm lg:text-base ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>{children}</div>
    </div>
  );
}

function Hint({ tone = 'bad', children }) {
  const style = tone === 'nudge'
    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
    : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  return (
    <div className={`mt-2 flex items-start gap-2 p-2.5 rounded-xl border-2 font-bold text-sm leading-relaxed ${style}`}>
      {tone === 'nudge' ? <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} /> : <XCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} />}
      <span>{children}</span>
    </div>
  );
}

// ── shift: slide the digits along the place-value table ─────────────────────

export function ShiftActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const model = useMemo(() => shiftModel(activity), [activity]);
  const cols = useMemo(() => tableCols(model), [model]);
  const limits = useMemo(() => slideLimits(model, cols), [model, cols]);
  const digits = useMemo(() => placesOf(model.start), [model]);
  const [offset, setOffset] = useState(result?.offset ?? 0);
  const [tries, setTries] = useState(result?.tries || 0);
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;
  const isPower = model.kind === 'power';

  const slide = (by) => { if (!checked) { setOffset((o) => Math.max(limits[0], Math.min(limits[1], o + by))); setMsg(null); } };
  const check = () => {
    if (checked) return;
    if (offset === 0) { setMsg({ tone: 'nudge', ...msgOf(T, 'slideFirst') }); return; }
    if (offset === model.net) { onResult({ done: true, correct: true, offset, tries: tries + 1 }); return; }
    const p = Math.abs(model.net);
    const why = Math.sign(offset) !== Math.sign(model.net)
      ? msgOf(T, model.net > 0 ? 'dirLeft' : 'dirRight')
      : isPower ? msgOf(T, 'notLined')
        : model.kind === 'convert' ? msgOf(T, 'ladder', Math.abs(offset))
          : msgOf(T, 'count', p, Math.abs(offset));
    const n = tries + 1;
    setTries(n);
    if (n >= 2) onResult({ done: true, correct: false, offset, tries: n, why });
    else setMsg({ tone: 'bad', ...why });
  };

  const shownOffset = checked ? model.net : offset;
  const gaps = gapsAt(model.start, shownOffset);
  const words = moveWords(model.net);
  const moved = offset === 0 ? t.notMoved : said(lang, moveWords(offset));

  return (
    <div>
      <div className="text-2xl text-slate-800 dark:text-slate-100 mb-2 overflow-x-auto text-center">
        <SafeInlineMath math={questionLatex(model)} />
      </div>
      <PlaceTable cols={cols} digits={digits} offset={shownOffset} placeholders={gaps.placeholders} dropped={gaps.dropped}
        filled={checked} tone={checked ? (result.correct ? 'good' : null) : null}
        target={isPower && !checked ? ghostOf(model.result) : null} lang={lang} />
      {!checked && (
        <>
          <p className="mt-2 text-center text-xs font-bold text-slate-500 dark:text-slate-400">{isPower ? t.slideGhost : t.slideHow}</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <button type="button" onClick={() => slide(1)} disabled={offset >= limits[1]} aria-label={t.left} title={t.left} className={arrow}><ArrowLeft className="w-5 h-5" strokeWidth={3} /></button>
            <div className="min-w-[8.5rem] px-2 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-black text-xs text-slate-700 dark:text-slate-200" aria-live="polite">{moved}</div>
            <button type="button" onClick={() => slide(-1)} disabled={offset <= limits[0]} aria-label={t.right} title={t.right} className={arrow}><ArrowRight className="w-5 h-5" strokeWidth={3} /></button>
            <button type="button" onClick={() => { setOffset(0); setMsg(null); }} disabled={offset === 0} aria-label={t.reset} title={t.reset}
              className="w-9 h-9 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-400 flex items-center justify-center disabled:opacity-40"><RotateCcw className="w-4 h-4" strokeWidth={3} /></button>
          </div>
          {msg && <Hint tone={msg.tone}>{msg.tone === 'bad' && <span className="mr-1 uppercase text-[10px] tracking-widest">{t.tryAgain} ·</span>}{said(lang, msg)}</Hint>}
          <div className="mt-3 flex justify-end"><button onClick={check} className={primary}>{t.check}</button></div>
        </>
      )}
      {checked && (
        <Verdict ok={result.correct} lang={lang}>
          {!result.correct && result.why && <div className="mb-1">{said(lang, result.why)}</div>}
          <div className="mb-1 text-lg"><span className="text-[10px] uppercase tracking-widest mr-2">{t.answer}</span><SafeInlineMath math={answerLatex(model)} /></div>
          <div className="mb-1">{isPower ? t.powerIs(model.power) : t.everyDigit(said(lang, words))}</div>
          {parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}
        </Verdict>
      )}
    </div>
  );
}

// ── round: tap the last digit kept, then type the rounded number ────────────

export function RoundActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const m = useMemo(() => roundModel(String(activity.n), activity.to), [activity.n, activity.to]);
  const text = decText(m.v);
  const intLen = text.split('.')[0].length;
  const want = placeName(m.places);
  const [tapped, setTapped] = useState(!!result?.done);
  const [wrongTap, setWrongTap] = useState(null);
  const [typed, setTyped] = useState(result?.typed || '');
  const [tries, setTries] = useState(result?.tries || 0);
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;

  // each character of the number, with the place of each digit
  const chars = [];
  let seen = 0;
  for (const ch of text) {
    if (ch === '.') { chars.push({ ch, place: null }); continue; }
    chars.push({ ch, place: seen < intLen ? intLen - 1 - seen : -(seen - intLen + 1) });
    seen += 1;
  }

  const tap = (place) => {
    if (checked || tapped) return;
    if (place === m.keepPlace) { setTapped(true); setWrongTap(null); setMsg({ tone: 'nudge', ...msgOf(T, 'nowType', m.decider) }); return; }
    const got = columnName(place);
    const keep = columnName(m.keepPlace);
    const to = toPlace(want);
    setWrongTap(place);
    setMsg({
      tone: 'nudge',
      en: T.en.tapWrong(got.en, want.en, keep.en),
      vn: T.vn.tapWrong(got.vn, want.vn, keep.vn),
      fr: T.fr.tapWrong(got.fr ?? got.en, to.fr ?? to.en, keep.fr ?? keep.en),
    });
  };
  const check = () => {
    if (checked || !tapped) return;
    const d = diagnoseRound(m, m.places, typed);
    if (d.ok) { onResult({ done: true, correct: true, typed, tries: tries + 1 }); return; }
    if (d.soft) { setMsg({ tone: 'nudge', ...verdictOf(d) }); return; }
    const n = tries + 1;
    setTries(n);
    if (n >= 2) onResult({ done: true, correct: false, typed, tries: n, why: verdictOf(d) });
    else setMsg({ tone: 'bad', ...verdictOf(d) });
  };

  return (
    <div>
      {!tapped && <p className="mb-2 text-sm font-bold text-slate-600 dark:text-slate-300">{t.tapKeep(said(lang, toPlace(want)))}</p>}
      <div className="flex items-end justify-center gap-1 flex-wrap">
        {chars.map((c, i) => {
          if (c.place === null) return <span key={i} className="px-0.5 pb-1 font-mono font-black text-3xl text-slate-800 dark:text-slate-100 leading-none">.</span>;
          const keep = tapped && c.place === m.keepPlace;
          const decider = tapped && c.place === m.deciderPlace;
          const cut = tapped && c.place < m.keepPlace;
          const style = keep ? 'bg-[#1cb0f6] border-[#1899d6] text-white'
            : decider ? 'bg-orange-100 dark:bg-orange-900/40 border-orange-400 text-orange-700 dark:text-orange-200 ring-2 ring-orange-300'
              : wrongTap === c.place ? BAD
                : cut ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                  : `${IDLE} ${tapped ? '' : 'hover:-translate-y-0.5 hover:border-[#1cb0f6]'}`;
          return (
            <span key={i} className="flex items-end">
              <button type="button" disabled={tapped || checked} onClick={() => tap(c.place)}
                aria-label={`${c.ch} — ${said(lang, columnName(c.place))}`}
                className={`w-9 h-12 rounded-lg border-2 border-b-[4px] font-mono font-black text-2xl transition-all disabled:cursor-default ${style}`}>{c.ch}</button>
              {keep && <span className="mx-0.5 w-[3px] h-14 rounded-full bg-[#1cb0f6]" aria-hidden="true" />}
            </span>
          );
        })}
      </div>
      {tapped && (
        <div className="mt-3 flex items-center gap-2">
          <input
            value={checked && !result.correct ? m.text : typed}
            disabled={checked}
            onChange={(e) => { setTyped(e.target.value); if (msg?.tone === 'bad') setMsg(null); }}
            onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
            inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder={t.typeHere}
            className={`w-full px-3 py-2 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center focus:outline-none focus:border-sky-500 disabled:opacity-90 ${checked ? (result.correct ? GOOD : 'bg-amber-50 border-amber-400 text-amber-800') : IDLE}`}
          />
          {!checked && <button onClick={check} disabled={!typed.trim()} className={primary}>{t.check}</button>}
        </div>
      )}
      {!checked && msg && <Hint tone={msg.tone}>{msg.tone === 'bad' && <span className="mr-1 uppercase text-[10px] tracking-widest">{t.tryAgain} ·</span>}{said(lang, msg)}</Hint>}
      {checked && (
        <Verdict ok={result.correct} lang={lang}>
          {!result.correct && result.why && <div className="mb-1">{said(lang, result.why)}</div>}
          <div className="mb-1 text-lg"><span className="text-[10px] uppercase tracking-widest mr-2">{t.answer}</span><SafeInlineMath math={`${text} \\to ${m.text}`} /></div>
          {parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}
        </Verdict>
      )}
    </div>
  );
}

// ── busstop: a short division, every box at once ────────────────────────────

/** The right text for every box of a finished division. */
function solutionOf(model) {
  const out = {};
  model.cols.forEach((col, c) => {
    out[`q${c}`] = String(col.q);
    if (c >= 1) out[`k${c}`] = col.carryIn ? String(col.carryIn) : '';
  });
  return out;
}

export function BusStopActivity({ activity, lang, result, onResult, parseText, retry, side }) {
  const t = T[lang] || T.en;
  const model = useMemo(() => shortDivModel(activity), [activity]);
  const need = model.cols.length;
  const hasRound = model.dp != null;
  const uid = `bs-${activity.id}`;
  const [zeros, setZeros] = useState(() => result?.zeros ?? (retry ? Math.min(retry.zeros ?? 0, model.zerosNeeded) : 0));
  const [entries, setEntries] = useState(() => result?.entries || keepWhere(retry?.entries, (id) => retry?.marks?.[id] === 'good'));
  const [marks, setMarks] = useState(() => result?.marks || keepWhere(retry?.marks, (_, v) => v === 'good'));
  const [answer, setAnswer] = useState(result?.answer || '');
  const [answerMark, setAnswerMark] = useState(null);
  const [tries, setTries] = useState(result?.tries || 0);
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;
  const avail = model.givenCols + zeros;

  const stateOf = (id) => {
    if (checked) return result.marks?.[id] === 'good' ? 'good' : 'shown';
    if (marks[id] === 'good') return 'good';
    return marks[id] === 'bad' ? 'bad' : 'live';
  };
  const edit = (id, text) => {
    setEntries((e) => ({ ...e, [id]: text }));
    if (marks[id] === 'bad') setMarks((mk) => ({ ...mk, [id]: undefined }));
    if (msg?.tone === 'bad') setMsg(null);
  };
  const addZero = () => { if (zeros < MAX_ZEROS && avail < need + 2) { setZeros(zeros + 1); setMsg(null); } };
  const removeZero = () => {
    if (!zeros) return;
    const last = avail - 1;
    setZeros(zeros - 1);
    setEntries((e) => { const n = { ...e }; delete n[`q${last}`]; delete n[`k${last}`]; return n; });
    setMarks((mk) => { const n = { ...mk }; delete n[`q${last}`]; delete n[`k${last}`]; return n; });
  };

  const check = () => {
    if (checked) return;
    const blank = (id) => !String(entries[id] ?? '').trim();
    const missing = model.cols.slice(0, avail).some((col, c) => (blank(`q${c}`) && !col.leading) || (c >= 1 && blank(`k${c}`) && col.carryIn !== 0));
    if (missing) { setMsg({ tone: 'nudge', ...msgOf(T, 'fillAll') }); return; }
    // Out of digits before it is finished: the named slip, not a lost try.
    if (avail < need) {
      setMsg({ tone: 'nudge', ...needZeroHint(model, model.cols[avail - 1]) });
      return;
    }
    if (hasRound && !answer.trim()) { setMsg({ tone: 'nudge', ...msgOf(T, 'fillRound') }); return; }

    const mk = {};
    let first = null;
    model.cols.forEach((col, c) => {
      const qOk = qDigitOk(col, entries[`q${c}`]);
      mk[`q${c}`] = qOk ? 'good' : 'bad';
      if (!qOk && !first) first = qHint(model, col);
      if (c >= 1) {
        const kOk = carryOk(col.carryIn, entries[`k${c}`]);
        mk[`k${c}`] = kOk ? 'good' : 'bad';
        if (!kOk && !first) first = carryHint(model, model.cols[c - 1]);
      }
    });
    let roundOk = true;
    if (hasRound) {
      const d = diagnoseRound(model.round, model.dp, answer);
      if (d.soft) { setMsg({ tone: 'nudge', ...verdictOf(d) }); return; }
      roundOk = d.ok;
      if (!d.ok && !first) first = verdictOf(d);
    }
    const trimmed = avail > need;
    if (trimmed) setZeros(model.zerosNeeded);
    const allOk = roundOk && Object.values(mk).every((v) => v === 'good');
    const kept = { zeros: model.zerosNeeded, entries, marks: mk, answer };
    if (allOk) { onResult({ done: true, correct: true, ...kept, tries: tries + 1 }); return; }
    const n = tries + 1;
    setTries(n);
    setMarks(mk);
    setAnswerMark(roundOk ? 'good' : 'bad');
    if (n >= 2) onResult({ done: true, correct: false, ...kept, tries: n, why: first });
    else setMsg({ tone: 'bad', ...first });
  };

  const shownEntries = checked ? solutionOf(model) : entries;
  const want = hasRound ? placeName(model.dp) : null;
  const sum = `${model.dividendText} \\div ${model.divisor}`;
  const answerTex = hasRound
    ? `${sum} = ${model.quotientText}${model.exact ? '' : '\\ldots'} \\approx ${model.answerText}`
    : `${sum} = ${model.answerText}`;
  const labels = { addZero: t.addZero, removeZero: t.removeZero, top: t.top, carry: t.carry };

  return (
    <div>
      <ShortDivBoard model={model} zeros={checked ? model.zerosNeeded : zeros} entries={shownEntries} stateOf={stateOf} onEdit={edit}
        onEnter={check} onAddZero={checked ? null : addZero} onRemoveZero={!checked && zeros > 0 ? removeZero : null}
        uid={uid} compact={side} labels={labels} />
      {hasRound && !checked && (
        <div className="mt-3 flex items-center justify-center gap-2 text-lg text-slate-800 dark:text-slate-100">
          <SafeInlineMath math={`${sum} \\approx`} />
          <input
            value={answer}
            onChange={(e) => { setAnswer(e.target.value); setAnswerMark(null); if (msg?.tone === 'bad') setMsg(null); }}
            onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
            inputMode="decimal" autoComplete="off" spellCheck={false} aria-label={t.rounded} placeholder="?"
            className={`w-28 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-lg text-center focus:outline-none focus:border-sky-500 ${answerMark === 'good' ? GOOD : answerMark === 'bad' ? BAD : IDLE}`}
          />
          <span className="text-xs font-bold text-slate-400">({model.dp} {t.dp})</span>
        </div>
      )}
      {hasRound && !checked && <p className="mt-1 text-center text-[11px] font-bold text-slate-400">{pickL(lang, `correct to ${want.en}`, `chính xác đến ${want.vn}`, `arrondi ${toPlace(want).fr ?? want.en}`)}</p>}
      {!checked && msg && <Hint tone={msg.tone}>{msg.tone === 'bad' && <span className="mr-1 uppercase text-[10px] tracking-widest">{t.tryAgain} ·</span>}{said(lang, msg)}</Hint>}
      {!checked && <div className="mt-3 flex justify-end"><button onClick={check} className={primary}>{t.check}</button></div>}
      {checked && (
        <Verdict ok={result.correct} lang={lang}>
          {!result.correct && result.why && <div className="mb-1">{said(lang, result.why)}</div>}
          <div className="mb-1 text-lg overflow-x-auto"><span className="text-[10px] uppercase tracking-widest mr-2">{t.answer}</span><SafeInlineMath math={answerTex} /></div>
          {parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}
        </Verdict>
      )}
    </div>
  );
}

// ── ineq: an inequality on a number line ────────────────────────────────────

const INEQ_T = {
  en: {
    draw: 'Tap the number for the open circle, then choose the arrow.',
    read: 'Choose the sign, then type the number.',
    list: 'Tap every integer that works.',
    left: 'Left', right: 'Right', none: 'No integer works',
    needCircle: 'Tap a number on the line first: the circle goes there.',
    needArrow: 'Now choose which way the arrow goes.',
    integer: (w, L) => `The ${w} integer ${L} could be?`,
    couldBe: (L, list) => `${L} could be ${list}`,
    works: (list) => `The integers that work: ${list}.`,
    noneWorks: 'No integer works.',
    circleAt: (n, way) => `Open circle on ${n}, arrow ${way}.`,
  },
  vn: {
    draw: 'Chạm vào con số để đặt vòng tròn rỗng, rồi chọn mũi tên.',
    read: 'Chọn dấu, rồi nhập con số.',
    list: 'Chạm vào mọi số nguyên thỏa mãn.',
    left: 'Trái', right: 'Phải', none: 'Không có số nguyên nào',
    needCircle: 'Hãy chạm vào một số trên trục số trước: vòng tròn đặt ở đó.',
    needArrow: 'Bây giờ hãy chọn hướng của mũi tên.',
    integer: (w, L) => `Số nguyên ${w} mà ${L} có thể là?`,
    couldBe: (L, list) => `${L} có thể là ${list}`,
    works: (list) => `Các số nguyên thỏa mãn: ${list}.`,
    noneWorks: 'Không có số nguyên nào thỏa mãn.',
    circleAt: (n, way) => `Vòng tròn rỗng tại ${n}, mũi tên sang ${way}.`,
  },
  fr: {
    draw: 'Touche le nombre pour le cercle vide, puis choisis la flèche.',
    read: 'Choisis le signe, puis écris le nombre.',
    list: 'Touche chaque entier qui convient.',
    left: 'Gauche', right: 'Droite', none: 'Aucun entier ne convient',
    needCircle: 'Touche d’abord un nombre sur la droite : le cercle se place là.',
    needArrow: 'Choisis maintenant le sens de la flèche.',
    integer: (w, L) => `Le ${w} entier que ${L} peut prendre ?`,
    couldBe: (L, list) => `${L} peut valoir ${list}`,
    works: (list) => `Les entiers qui conviennent : ${list}.`,
    noneWorks: 'Aucun entier ne convient.',
    circleAt: (n, way) => `Cercle vide sur ${n}, flèche vers ${way}.`,
  },
};

export function IneqActivity({ activity, lang, result, onResult, parseText }) {
  const t = T[lang] || T.en;
  const it = INEQ_T[lang] || INEQ_T.en;
  const ask = activity.ask || 'draw';
  const model = useMemo(() => (ask === 'list'
    ? ineqModel({ id: activity.id, kind: 'between', ineqs: activity.ineqs })
    : ineqModel({ id: activity.id, kind: ask === 'read' ? 'read' : 'draw', ineq: activity.ineq })), [activity, ask]);
  const p = model.p;
  const [circle, setCircle] = useState(result?.circle ?? null);
  const [dir, setDir] = useState(result?.dir ?? null);
  const [sign, setSign] = useState(result?.sign ?? null);
  const [typed, setTyped] = useState(result?.typed || '');
  const [picks, setPicks] = useState(result?.picks || []);
  const [tries, setTries] = useState(result?.tries || 0);
  const [msg, setMsg] = useState(null);
  const checked = !!result?.done;
  const kept = { circle, dir, sign, typed, picks };

  const settle = (d) => {
    if (d.soft) { setMsg({ tone: 'nudge', ...verdictOf(d) }); return; }
    if (d.ok) { onResult({ done: true, correct: true, ...kept, tries: tries + 1 }); return; }
    const n = tries + 1;
    setTries(n);
    if (n >= 2) onResult({ done: true, correct: false, ...kept, tries: n, why: verdictOf(d) });
    else setMsg({ tone: 'bad', ...verdictOf(d) });
  };
  const check = (none = false) => {
    if (checked) return;
    if (ask === 'draw') {
      if (circle == null) { setMsg({ tone: 'nudge', ...msgOf(INEQ_T, 'needCircle') }); return; }
      if (!dir) { setMsg({ tone: 'nudge', ...msgOf(INEQ_T, 'needArrow') }); return; }
      const c = diagnoseCircle(p, circle);
      settle(c.ok ? diagnoseArrow(p, dir) : c);
    } else if (ask === 'read') settle(diagnoseWrite(p, sign, typed, { drawn: true }));
    else if (ask === 'integer') settle(diagnoseInteger(p, typed));
    else settle(diagnoseList(model, none ? [] : picks, none));
  };
  const clear = () => { if (msg?.tone === 'bad') setMsg(null); };

  // what the line shows: the student's drawing while they work, the answer once checked
  let rays = [];
  const lit = [];
  if (ask === 'list') {
    rays = model.parts.map((q) => ({ n: q.n, dir: q.greater ? 'right' : 'left', tone: q.greater ? 'key' : 'blue' }));
    if (checked) lit.push(...model.integers);
  } else if (checked || ask === 'read') {
    rays = [{ n: p.n, dir: p.greater ? 'right' : 'left' }];
    if (checked && ask !== 'read') for (let v = model.lo; v <= model.hi; v += 1) if (p.works(v)) lit.push(v);
  } else if (ask === 'draw' && circle != null) rays = [{ n: circle, dir }];
  const halves = ask !== 'list' && !Number.isInteger(p.n);
  const w = p ? edgeWord(p) : null;
  const way = p ? pickL(lang, p.greater ? 'right' : 'left', p.greater ? 'phải' : 'trái', p.greater ? 'la droite' : 'la gauche') : '';
  const answer = ask === 'list'
    ? (model.integers.length ? it.works(model.integers.map(numText).join(', ')) : it.noneWorks)
    : ask === 'draw' ? it.circleAt(numText(p.n), way)
      : ask === 'integer' ? `${it.couldBe(p.letter, listText(p))} → ${numText(p.edge)}`
        : null;

  return (
    <div>
      {ask !== 'read' && (
        <div className="text-2xl text-slate-800 dark:text-slate-100 mb-2 overflow-x-auto text-center"><SafeInlineMath math={model.latex} /></div>
      )}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden bg-white">
        <IneqLineFigure lo={model.lo} hi={model.hi} rays={rays} halves={halves} lit={lit}
          onPick={ask === 'draw' && !checked ? (v) => { setCircle(v); clear(); } : undefined}
          picks={ask === 'list' && !checked ? picks : []}
          onToggle={ask === 'list' && !checked ? (v) => { setPicks((l) => (l.includes(v) ? l.filter((x) => x !== v) : [...l, v])); clear(); } : undefined} />
      </div>

      {!checked && ask === 'draw' && (
        <>
          <p className="mt-2 text-center text-xs font-bold text-slate-500 dark:text-slate-400">{it.draw}</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            {['left', 'right'].map((d) => (
              <button key={d} type="button" onClick={() => { setDir(d); clear(); }} aria-pressed={dir === d}
                className={`px-4 h-11 flex items-center gap-1.5 rounded-xl border-2 border-b-[4px] font-black uppercase tracking-widest text-xs transition-all ${dir === d ? 'bg-[#c25e12] border-[#a04a0e] text-white' : IDLE}`}>
                {d === 'left' && <ArrowLeft className="w-4 h-4" strokeWidth={3} />}{it[d]}{d === 'right' && <ArrowRight className="w-4 h-4" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </>
      )}

      {!checked && ask === 'read' && (
        <>
          <p className="mt-2 text-center text-xs font-bold text-slate-500 dark:text-slate-400">{it.read}</p>
          <div className="mt-2 flex items-center justify-center gap-2 text-2xl text-slate-800 dark:text-slate-100">
            <SafeInlineMath math={p.letter} />
            <div className="flex rounded-xl border-2 border-slate-300 dark:border-slate-600 overflow-hidden">
              {['<', '>'].map((sg) => (
                <button key={sg} type="button" onClick={() => { setSign(sg); clear(); }} aria-pressed={sign === sg}
                  className={`w-11 h-11 font-mono font-black text-xl ${sign === sg ? 'bg-[#c25e12] text-white' : 'bg-white dark:bg-slate-800 text-slate-400'}`}>{sg}</button>
              ))}
            </div>
            <input value={typed} onChange={(e) => { setTyped(e.target.value); clear(); }} onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
              inputMode="text" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
              className={`w-20 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-xl text-center focus:outline-none focus:border-sky-500 ${IDLE}`} />
          </div>
        </>
      )}

      {!checked && ask === 'integer' && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{it.integer(said(lang, w), p.letter)}</span>
          <input value={typed} onChange={(e) => { setTyped(e.target.value); clear(); }} onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
            inputMode="text" autoComplete="off" spellCheck={false} aria-label={t.typeHere} placeholder="?"
            className={`w-20 px-2 py-1.5 rounded-xl border-2 border-b-[4px] font-mono font-black text-xl text-center focus:outline-none focus:border-sky-500 ${IDLE}`} />
        </div>
      )}

      {!checked && ask === 'list' && <p className="mt-2 text-center text-xs font-bold text-slate-500 dark:text-slate-400">{it.list}</p>}

      {!checked && msg && <Hint tone={msg.tone}>{msg.tone === 'bad' && <span className="mr-1 uppercase text-[10px] tracking-widest">{t.tryAgain} ·</span>}{said(lang, msg)}</Hint>}
      {!checked && (
        <div className="mt-3 flex items-center justify-end gap-2">
          {ask === 'list' && (
            <button type="button" onClick={() => check(true)} className="px-3 py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 font-black text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-300 hover:border-sky-400">{it.none}</button>
          )}
          <button onClick={() => check(false)} className={primary}>{t.check}</button>
        </div>
      )}
      {checked && (
        <Verdict ok={result.correct} lang={lang}>
          {!result.correct && result.why && <div className="mb-1">{said(lang, result.why)}</div>}
          {ask === 'read'
            ? <div className="mb-1 text-lg"><span className="text-[10px] uppercase tracking-widest mr-2">{t.answer}</span><SafeInlineMath math={p.latex} /></div>
            : <div className="mb-1"><span className="text-[10px] uppercase tracking-widest mr-2">{t.answer}</span>{answer}</div>}
          {parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}
        </Verdict>
      )}
    </div>
  );
}
