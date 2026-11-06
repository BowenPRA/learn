import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import DecColumnBoard from './DecColumnBoard.jsx';
import { StepPanel } from './StepKit.jsx';
import { stepsOf } from './stepKitParts';
import { focusBox } from './shortDivBoardHelpers';
import { tr, pickTable } from '../../utils/lang';
import {
  diagnoseLineUp, diagnoseFill, diagnoseAdd, diagnoseSub, tapExchange, autoExchange, startTops, solvedState,
  chooseOptions, diagnoseChoose, placeWord, calcText,
} from '../../utils/decColumn';

/* ------------------------------------------------------------------ *
 * One calculation of Line Up the Points, worked stage by stage
 * (utils/decColumn.js derives every step), in StepKit's StepPanel:
 *
 *   CHOOSE   (a story) which calculation answers the question
 *   LINE UP  slide the bottom number until the points are in one column
 *   FILL     tap the empty places after the point to write zeros (and a
 *            whole number's point)
 *   COLUMNS  right to left, one step per column: "Add the tenths" — the
 *            digit and its carry (+) or exchange (−); the point drops
 *            straight down on the way past
 *
 * A wrong answer gets the name of its slip and one more try; a second wrong
 * answer at the same step (or "Show me") fills the step in and moves on, and
 * the calculation counts as helped. `onFinish({ helped, slipped, msg })` once
 * (msg: the last message, so a filled-in last step can stay in view).
 * Mounted by the task (src/tasks/DecColumn.jsx) and by the `deccol` deck
 * activity; remount it (a new `key`) for a new calculation. `finished` draws
 * the solved sum alone (the done card, a checked deck activity).
 * ------------------------------------------------------------------ */

const T = {
  en: {
    stages: { choose: 'Choose', line: 'Line up', fill: 'Zeros', cols: 'Columns' },
    chooseTitle: (say) => (say ? `Which calculation finds ${say}?` : 'Which calculation answers the question?'),
    chooseSub: 'Read the story again, then tap one.',
    lineTitle: 'Line up the points.',
    lineSub: 'Slide the bottom number until the two points are in one column.',
    slide: 'Slide the bottom number',
    fillTitle: 'Fill the gaps with zeros.',
    fillSub: (whole) => `Tap each empty box after the point to write 0.${whole ? ` ${whole} needs its point too.` : ''}`,
    addTitle: (pl) => `Add the ${pl}.`,
    subTitle: (pl) => `Subtract the ${pl}.`,
    carrySub: 'Total 10 or more? Carry 1 to the small box on the left.',
    lastSub: 'Last column: add the digits and any carry.',
    exchangeSub: 'Top digit too small? Tap a top digit on the left to exchange.',
    leadSub: 'A 0 at the front of the answer can stay blank.',
    pointTitle: 'Drop the point straight down.',
    pointSub: 'Tap the dotted box in the answer.',
    check: 'Check', left: 'Move left', right: 'Move right',
    labels: { digit: 'answer digit', carry: 'carry', point: 'drop the point', gap: 'write in', top: 'exchange from' },
  },
  fr: {
    stages: { choose: 'Choisir', line: 'Aligner', fill: 'Zéros', cols: 'Colonnes' },
    chooseTitle: (say) => (say ? `Quel calcul donne ${say} ?` : 'Quel calcul répond à la question ?'),
    chooseSub: 'Relis l’histoire, puis choisis un calcul.',
    lineTitle: 'Aligne les points.',
    lineSub: 'Déplace le nombre du bas pour mettre les deux points dans une même colonne.',
    slide: 'Fais glisser le nombre du bas',
    fillTitle: 'Complète les vides avec des zéros.',
    fillSub: (whole) => `Touche chaque case vide après le point pour écrire 0.${whole ? ` ${whole} a aussi besoin de son point.` : ''}`,
    addTitle: (pl) => `Additionne les ${pl}.`,
    subTitle: (pl) => `Soustrais les ${pl}.`,
    carrySub: 'Total de 10 ou plus ? Retiens 1 dans la petite case à gauche.',
    lastSub: 'Dernière colonne : additionne les chiffres et la retenue, s’il y en a une.',
    exchangeSub: 'Chiffre du haut trop petit ? Touche un chiffre du haut à gauche pour échanger.',
    leadSub: 'Un 0 devant la réponse peut rester vide.',
    pointTitle: 'Descends le point tout droit.',
    pointSub: 'Touche la case en pointillés dans la réponse.',
    check: 'Vérifier', left: 'À gauche', right: 'À droite',
    labels: { digit: 'chiffre de la réponse', carry: 'retenue', point: 'descendre le point', gap: 'écrire', top: 'échanger depuis' },
  },
};

// The notes about a step just finished (StepPanel sets 'ok' and 'shown' above the next step).
const M = {
  chooseRight: (c) => ({ en: `Right — ${c}.`, fr: `Juste — ${c}.` }),
  lineRight: { en: 'Right — the points are in one column.', fr: 'Juste — les points sont dans une même colonne.' },
  fillRight: (from, to) => ({ en: `Right — ${from} = ${to}. Zeros at the end change nothing.`, fr: `Juste — ${from} = ${to}. Les zéros à la fin ne changent rien.` }),
  auto: { en: 'Right — and the exchange you did in your head is written in.', fr: 'Juste — et l’échange que tu as fait de tête est écrit.' },
  // Show me: what was filled in.
  shown: {
    choose: (c) => ({ en: `Here is the right calculation: ${c}.`, fr: `Voici le bon calcul : ${c}.` }),
    line: { en: 'Here are the points, lined up in one column.', fr: 'Voici les points, alignés dans une même colonne.' },
    fill: { en: 'Here are the gaps, filled in.', fr: 'Voici les vides, complétés.' },
    col: (pl) => ({ en: `Here is the ${pl.en} column, filled in.`, fr: `Voici la colonne des ${pl.fr}, remplie.` }),
    point: { en: 'Here is the point: it drops straight down.', fr: 'Voici le point : il descend tout droit.' },
  },
  // A second wrong answer: the slip's name, then this.
  filled: {
    choose: (c) => ({ en: `The right one is ${c}.`, fr: `Le bon calcul est ${c}.` }),
    line: { en: 'The points are lined up for you now.', fr: 'Les points sont maintenant alignés pour toi.' },
    fill: { en: 'The gaps are filled in for you now.', fr: 'Les vides sont maintenant complétés pour toi.' },
    col: { en: 'This column is filled in for you.', fr: 'Cette colonne est remplie pour toi.' },
  },
};
const join = (a, b) => ({ en: `${a.en} ${b.en}`, fr: `${a.fr ?? a.en} ${b.fr ?? b.en}` });

/** The two big arrows of the line-up stage, with the words between them. */
function SlideControl({ label, leftLabel, rightLabel, onLeft, onRight, canLeft, canRight, ink, compact }) {
  const b = `${compact ? 'w-14 h-11' : 'w-16 h-12 sm:w-20 sm:h-14'} shrink-0 rounded-xl text-white flex items-center justify-center border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none`;
  const icon = compact ? 'w-6 h-6' : 'w-7 h-7 sm:w-8 sm:h-8';
  const colours = { backgroundColor: ink, borderColor: '#00697f' };
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <button type="button" onClick={onLeft} disabled={!canLeft} aria-label={leftLabel} className={b} style={colours}>
        <ArrowLeft className={icon} strokeWidth={3} />
      </button>
      <span className="max-w-[8.5rem] sm:max-w-none text-center text-[11px] sm:text-xs font-black uppercase tracking-widest leading-tight text-[#00697f] dark:text-cyan-300">{label}</span>
      <button type="button" onClick={onRight} disabled={!canRight} aria-label={rightLabel} className={b} style={colours}>
        <ArrowRight className={icon} strokeWidth={3} />
      </button>
    </div>
  );
}

export default function DecColumnWork({
  m, lang = 'en', uid = 'dc', compact = false, ink = '#0087a8', choose = false, seed = '', onFinish, finished = false,
}) {
  const t = pickTable(T, lang);
  const L = (o) => tr(lang, o.en, null, o.fr);
  const stages = useMemo(() => [choose && 'choose', m.needsLineUp && 'line', m.needsFill && 'fill', 'cols'].filter(Boolean), [m, choose]);
  const solved = useMemo(() => solvedState(m), [m]);
  const options = useMemo(() => (choose ? chooseOptions(m, seed) : []), [m, choose, seed]);

  const [stage, setStage] = useState(finished ? 'done' : stages[0]);
  const [refused, setRefused] = useState([]);           // choose: options already tried
  const [shift, setShift] = useState(m.startShift);
  const [filled, setFilled] = useState(() => (finished ? solved.filled : new Set()));
  const [tops, setTops] = useState(() => (finished ? solved.tops : startTops(m)));
  const [entries, setEntries] = useState(() => (finished ? solved.entries : {}));
  const [marks, setMarks] = useState({});
  const [w, setW] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [shownStages, setShownStages] = useState([]);   // stages filled in for the student (amber pills)
  const [msg, setMsg] = useState(null);

  const step = stage === 'cols' ? m.walk[w] : null;
  const col = step?.kind === 'digit' ? m.colAt(step.p) : null;
  const digitId = col ? `d${col.cell}` : null;
  const carryId = col && m.op === '+' && col.p < m.hi ? `c${m.cellOf(col.p + 1)}` : null;
  const calc = calcText(m);

  /* ---------------------------------------------------------- moving on */
  const finish = (h, sl, last) => { setStage('done'); setW(m.walk.length); onFinish?.({ helped: h, slipped: sl, msg: last || null }); };
  const nextStage = (h = helped, sl = slipped, last = null) => {
    const i = stages.indexOf(stage);
    setWrongs(0);
    if (i + 1 < stages.length) {
      const nx = stages[i + 1];
      setStage(nx);
      if (nx === 'cols') focusBox(uid, `d${m.walk[0].cell}`);
    } else finish(h, sl, last);
  };
  const advance = (h = helped, sl = slipped, last = null) => {
    setWrongs(0);
    if (w + 1 >= m.walk.length) { finish(h, sl, last); return; }
    const nx = m.walk[w + 1];
    setW(w + 1);
    focusBox(uid, nx.kind === 'point' ? 'pt' : `d${nx.cell}`);
  };
  /** A slip: one more try, then the step is filled in (with `note` after the slip's name). */
  const slip = (d, reveal, note) => {
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      setHelped(true);
      const s = { tone: 'shown', ...join(d, note) };
      setMsg(s);
      reveal(true, true, s);
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', ...d });
  };
  /** The student does something in the step: a note about the last step (bar a "right") and this step's feedback go. */
  const touch = () => { if (msg && msg.tone !== 'ok') setMsg(null); };

  /* ---------------------------------------------------------- reveals */
  const markShown = () => setShownStages((s) => (s.includes(stage) ? s : [...s, stage]));
  const revealChoose = (h = true, sl = true, last = null) => { markShown(); nextStage(h, sl, last); };
  const revealLine = (h = true, sl = slipped, last = null) => { markShown(); setShift(0); nextStage(h, sl, last); };
  const revealFill = (h = true, sl = slipped, last = null) => { markShown(); setFilled(new Set(solved.filled)); nextStage(h, sl, last); };
  const revealCol = (h = true, sl = slipped, last = null) => {
    if (step.kind === 'point') { setEntries((e) => ({ ...e, pt: '.' })); setMarks((k) => ({ ...k, pt: 'shown' })); advance(h, sl, last); return; }
    if (m.op === '−') setTops((cur) => autoExchange(m, cur, col.p));
    setEntries((e) => ({ ...e, [digitId]: solved.entries[digitId], ...(carryId ? { [carryId]: solved.entries[carryId] ?? '' } : {}) }));
    setMarks((k) => ({ ...k, [digitId]: 'shown', ...(carryId ? { [carryId]: 'shown' } : {}) }));
    advance(h, sl, last);
  };
  // Show me fills the step in and moves on; the note above the next step says what was filled.
  const showMe = () => {
    setHelped(true);
    const said = (o) => { const s = { tone: 'shown', ...o }; setMsg(s); return s; };
    if (stage === 'choose') revealChoose(true, slipped, said(M.shown.choose(calc)));
    else if (stage === 'line') revealLine(true, slipped, said(M.shown.line));
    else if (stage === 'fill') revealFill(true, slipped, said(M.shown.fill));
    else if (stage === 'cols') revealCol(true, slipped, said(step.kind === 'point' ? M.shown.point : M.shown.col(placeWord(col.p))));
  };

  /* ---------------------------------------------------------- checks */
  const pickOption = (val) => {
    if (refused.includes(val)) return;
    const d = diagnoseChoose(m, val);
    if (d.ok) { setMsg({ tone: 'ok', ...M.chooseRight(calc) }); nextStage(); return; }
    setRefused((r) => [...r, val]);
    slip(d, revealChoose, M.filled.choose(calc));
  };
  const checkLine = () => {
    const d = diagnoseLineUp(m, shift);
    if (d.ok) { setMsg({ tone: 'ok', ...M.lineRight }); nextStage(); return; }
    slip(d, revealLine, M.filled.line);
  };
  const checkFill = () => {
    const d = diagnoseFill(m, filled);
    if (d.ok) {
      if (d.extra) {
        setFilled((f) => new Set([...f].filter((k) => !d.extra.includes(k))));
        setMsg({ tone: 'ok', en: d.en, fr: d.fr });
      } else {
        const short = [m.a, m.b].find((r) => r.dp < m.dp);
        setMsg(short ? { tone: 'ok', ...M.fillRight(short.text, `${short.text}${short.hasPoint ? '' : '.'}${'0'.repeat(m.dp - short.dp)}`) } : null);
      }
      nextStage();
      return;
    }
    slip(d, revealFill, M.filled.fill);
  };
  const checkCol = () => {
    if (!col) return;
    const d = m.op === '+'
      ? diagnoseAdd(m, col.p, entries[digitId], carryId ? (entries[carryId] ?? '') : undefined)
      : diagnoseSub(m, col.p, entries[digitId], tops);
    if (d.ok) {
      let last = null;
      if (d.auto) { setTops((cur) => autoExchange(m, cur, col.p)); last = { tone: 'ok', ...M.auto }; }
      setMsg(last);
      setMarks((k) => ({ ...k, [digitId]: 'good', ...(carryId ? { [carryId]: 'good' } : {}) }));
      advance(helped, slipped, last);
      return;
    }
    if (d.soft) {
      setMsg({ tone: 'info', en: d.en, fr: d.fr });
      if (d.code === 'carryMissing') { setMarks((k) => ({ ...k, [digitId]: 'good' })); focusBox(uid, carryId); }
      return;
    }
    setMarks((k) => (d.code === 'carryWrong' ? { ...k, [digitId]: 'good', [carryId]: 'bad' } : { ...k, [digitId]: 'bad' }));
    slip(d, revealCol, M.filled.col);
    focusBox(uid, d.code === 'carryWrong' ? carryId : digitId);
  };
  const check = () => (stage === 'line' ? checkLine() : stage === 'fill' ? checkFill() : checkCol());

  /* ---------------------------------------------------------- the board's events */
  const slide = (by) => {
    const [minS, maxS] = m.shiftRange;
    setShift((v) => Math.min(maxS, Math.max(minS, v + by)));
    touch();
  };
  const tapGap = (row, cell) => {
    const key = `${row}:${cell}`;
    setFilled((f) => { const n = new Set(f); if (n.has(key)) n.delete(key); else n.add(key); return n; });
    touch();
  };
  const tapTop = (p) => {
    if (!col) return;
    const r = tapExchange(m, tops, col.p, p);
    if (r.ok) { setTops(r.cur); touch(); } else if (r.en) setMsg({ tone: 'info', en: r.en, fr: r.fr });
  };
  const edit = (id, text) => {
    setEntries((e) => ({ ...e, [id]: text }));
    if (marks[id] === 'bad') setMarks((k) => ({ ...k, [id]: undefined }));
    touch();
  };
  const dropPoint = () => {
    setEntries((e) => ({ ...e, pt: '.' }));
    setMarks((k) => ({ ...k, pt: 'good' }));
    setMsg(null);
    advance();
  };
  const stateOf = (id) => {
    if (stage === 'done') return marks[id] === 'shown' ? 'shown' : 'good';
    if (marks[id] === 'good' || marks[id] === 'shown') return marks[id];
    if (stage !== 'cols' || !step) return 'idle';
    if (step.kind === 'point') return id === 'pt' ? 'live' : 'idle';
    if (id === digitId || id === carryId) return marks[id] === 'bad' ? 'bad' : 'live';
    return 'idle';
  };

  const board = (
    <DecColumnBoard m={m} stage={stage} shift={shift} filled={filled} tops={tops} entries={entries} stateOf={stateOf}
      active={step ? step.cell : null} onTapGap={tapGap} onTapTop={tapTop} onEdit={edit} onEnter={check}
      onDropPoint={dropPoint} compact={compact} uid={uid} ink={ink} labels={t.labels} />
  );
  if (stage === 'done') return board;

  /* ---------------------------------------------------------- render */
  let title = '';
  let sub = '';
  if (stage === 'choose') { title = t.chooseTitle(m.say ? tr(lang, m.say, null, m.sayFr) : null); sub = t.chooseSub; }
  else if (stage === 'line') { title = t.lineTitle; sub = t.lineSub; }
  else if (stage === 'fill') { title = t.fillTitle; sub = t.fillSub(!m.a.hasPoint ? m.a.text : !m.b.hasPoint ? m.b.text : null); }
  else if (step?.kind === 'point') { title = t.pointTitle; sub = t.pointSub; }
  else if (col) {
    const pl = L(placeWord(col.p));
    title = m.op === '+' ? t.addTitle(pl) : t.subTitle(pl);
    sub = col.lead ? t.leadSub : m.op === '−' ? t.exchangeSub : carryId ? t.carrySub : t.lastSub;
  }
  const si = stages.indexOf(stage);
  const pills = stepsOf(stages, si, t.stages).map((p) => (p.state === 'done' && shownStages.includes(p.key) ? { ...p, state: 'shown' } : p));
  const checkable = stage === 'line' || stage === 'fill' || step?.kind === 'digit';
  const [minS, maxS] = m.shiftRange;

  return (
    <StepPanel ink={ink} lang={lang} plain compact={compact} steps={pills} n={si + 1} title={title} sub={sub} msg={msg}
      onShowMe={showMe} onCheck={checkable ? check : null} checkLabel={t.check}>
      {stage === 'choose' ? (
        <div className={`grid gap-2 ${options.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {options.map((o) => {
            const no = refused.includes(o.val);
            return (
              <button key={o.val} type="button" onClick={() => pickOption(o.val)} disabled={no}
                className={`min-h-[3.5rem] px-3 py-3 rounded-xl border-2 border-b-[4px] font-mono font-black text-xl sm:text-2xl whitespace-nowrap transition-all
                  ${no ? 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 text-rose-400 line-through'
                    : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-[#0087a8] active:border-b-2 active:translate-y-[2px]'}`}>
                {o.text}
              </button>
            );
          })}
        </div>
      ) : board}

      {stage === 'line' && (
        <SlideControl label={t.slide} leftLabel={t.left} rightLabel={t.right} ink={ink} compact={compact}
          onLeft={() => slide(-1)} onRight={() => slide(1)} canLeft={shift > minS} canRight={shift < maxS} />
      )}
    </StepPanel>
  );
}
