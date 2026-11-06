import { useState } from 'react';
import { CheckCircle2, Lightbulb, Ruler, LineChart, ArrowDownUp, ArrowUpToLine, Search, Calculator, Clock, Hand, Scale, HelpCircle, CalendarDays, Moon } from 'lucide-react';
import { answerOf } from '../../../utils/tideLab';
import {
  diagnosePole, diagnosePlot, diagnoseInOut, diagnoseHighest, diagnoseChange, diagnoseFind, diagnoseTomorrow,
  diagnoseTest, diagnoseChanges, diagnoseWeek, diagnoseMoon, diagnoseVerdict, diagnoseWhy,
} from '../../../utils/tideLabMark';
import { T } from './tideLabText.js';
import Stage, { Message } from './Stage.jsx';
import Picture from './Picture.jsx';
import RoundDone from './RoundDone.jsx';

/* ------------------------------------------------------------------ *
 * One Tide Lab item, all its stages. Mounted with key={item id + attempt},
 * so a new item starts clean. A wrong answer is named (utils/tideLabMark.js)
 * and can be tried again; a second wrong one (or "Show me") fills the stage in
 * and the item pays half. A day's change answered wrong first opens "Find
 * them" (tap the highest and the lowest reading), then the change again.
 * ------------------------------------------------------------------ */
const GREEN = '#58cc02';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const STAGE_ICON = {
  read: Ruler, plot: LineChart, inout: ArrowDownUp, highest: ArrowUpToLine, find: Search, change: Calculator,
  tomorrow: Clock, test: Hand, verdict: Scale, why: HelpCircle, week: CalendarDays, moon: Moon,
};
const CHOICES = { inout: diagnoseInOut, highest: diagnoseHighest, tomorrow: diagnoseTomorrow, verdict: diagnoseVerdict, why: diagnoseWhy, week: diagnoseWeek, moon: diagnoseMoon };
const BLANK = [null, null, null, null];

export default function Round({ model: m, lang, onComplete, onNext, isLast }) {
  const t = T[lang] || T.en;
  const [stages, setStages] = useState(m.stages);
  const [idx, setIdx] = useState(0);
  const stage = stages[idx];
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [done, setDone] = useState(false);
  // the answers in progress
  const [text, setText] = useState('');
  const [texts, setTextsAll] = useState(['', '']);
  const [inputState, setInputState] = useState(null);
  const [changeMarks, setChangeMarks] = useState(null);
  const [crosses, setCrosses] = useState(BLANK);
  const [sel, setSel] = useState(0);
  const [plotMarks, setPlotMarks] = useState(null);
  const [plotted, setPlotted] = useState(!m.stages.includes('plot'));
  const [tried, setTried] = useState([]);
  const [found, setFound] = useState(null);
  const [picks, setPicks] = useState({});
  const [pickMarks, setPickMarks] = useState(null);
  const [tested, setTested] = useState(false);
  const [findPick, setFindPick] = useState({});
  const [findDone, setFindDone] = useState(false);
  const [moonsShown, setMoonsShown] = useState(false);
  const both = (key) => ({ en: T.en[key], fr: T.fr[key] });

  const advance = (wasHelped, say, carry = 0) => {
    if (stage === 'plot') setPlotted(true);
    if (stage === 'test') setTested(true);
    if (stage === 'moon') setMoonsShown(true);
    if (idx + 1 < stages.length) {
      setIdx(idx + 1); setWrongs(carry); setTried([]); setFound(null); setText(''); setInputState(null); setMsg(say);
      if (stages[idx + 1] === 'moon') setMoonsShown(true);
      return;
    }
    setMsg(say);
    setDone(true);
    onComplete(wasHelped);
  };
  const FILL = {
    read: () => { setText(answerOf(m, 'read')); setInputState('ok'); },
    plot: () => { setCrosses(answerOf(m, 'plot')); setPlotMarks([0, 1, 2, 3].map((i) => ({ i, ok: true }))); },
    find: () => setFindPick(answerOf(m, 'find')),
    change: () => {
      if (m.kind === 'day') { setText(answerOf(m, 'change')); setInputState('ok'); } else { setTextsAll(answerOf(m, 'change')); setChangeMarks(['ok', 'ok']); }
    },
    test: () => { setPicks(answerOf(m, 'test')); setPickMarks(m.week.ask.map((d) => ({ d, ok: true }))); },
  };
  const fill = () => (FILL[stage] || (() => setFound(answerOf(m, stage))))();
  const wrong = (d) => {
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      fill();
      setHelped(true);
      advance(true, { tone: 'shown', en: `${d.en || ''} ${T.en.filled}`.trim(), fr: `${d.fr || ''} ${T.fr.filled}`.trim() });
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };
  const okSay = (d) => ({ tone: 'ok', en: d.en || T.en.right, fr: d.fr || T.fr.right });

  const check = () => {
    let d;
    if (stage === 'read') d = diagnosePole(m, text);
    else if (stage === 'plot') d = diagnosePlot(m, crosses);
    else if (stage === 'find') d = diagnoseFind(m, findPick);
    else if (stage === 'test') d = diagnoseTest(m, picks);
    else if (stage === 'change') d = m.kind === 'day' ? diagnoseChange(m, text) : diagnoseChanges(m, texts);
    else return;
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    if (stage === 'read' || (stage === 'change' && m.kind === 'day')) setInputState(d.ok ? 'ok' : 'bad');
    if (stage === 'plot') setPlotMarks(d.per);
    if (stage === 'test') setPickMarks(d.per);
    if (stage === 'change' && m.kind !== 'day') setChangeMarks(d.per.map((p) => (p.ok ? 'ok' : 'bad')));
    if (d.ok) {
      if (stage === 'find') setFindDone(true);
      advance(helped, okSay(d), 0);
      return;
    }
    if (stage === 'change' && m.kind === 'day' && !findDone) {
      // the slip is in finding the two readings: find them first, then subtract
      setSlipped(true);
      setStages([...stages.slice(0, idx), 'find', ...stages.slice(idx)]);
      setWrongs(0); setText(''); setInputState(null);
      setMsg({ tone: 'bad', en: d.en, fr: d.fr });
      return;
    }
    wrong(d);
  };
  // after Find them, the change comes back with one wrong already spent
  const checkFind = () => {
    const d = diagnoseFind(m, findPick);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    if (d.ok) { setFindDone(true); advance(helped, okSay(d), 1); return; }
    wrong(d);
  };
  const choose = (v) => {
    if (found != null || tried.includes(v)) return;
    const d = CHOICES[stage](m, v);
    if (d.ok) { setFound(v); advance(helped, okSay(d)); return; }
    setTried((x) => [...x, v]);
    wrong(d);
  };
  const showMe = () => {
    setSlipped(true); setHelped(true);
    fill();
    if (stage === 'find') setFindDone(true);
    advance(true, { tone: 'shown', ...both('shown') }, stage === 'find' ? 1 : 0);
  };
  const clearBad = () => setMsg((x) => (x?.tone === 'bad' || x?.tone === 'info' ? null : x));

  const act = {
    choose,
    check: stage === 'find' ? checkFind : check,
    setText: (v) => { setText(v); setInputState(null); clearBad(); },
    setTexts: (w, v) => { setTextsAll((x) => x.map((y, k) => (k === w ? v : y))); setChangeMarks(null); clearBad(); },
    select: (i) => setSel(i),
    nudge: (dv) => {
      setCrosses((c) => c.map((v, i) => (i === sel ? Math.min(m.day.top, Math.max(0, (v ?? 0) + dv)) : v)));
      setPlotMarks(null); clearBad();
    },
    place: (i, v) => {
      setSel(i);
      setCrosses((c) => c.map((x, k) => (k === i ? v : x)));
      setPlotMarks(null); clearBad();
    },
    findTap: (r) => {
      setFindPick((p) => (p.hi == null || (p.lo != null) ? { hi: r } : r === p.hi ? { hi: r } : { ...p, lo: r }));
      clearBad();
    },
    pickDot: (d, slot) => { if (stage !== 'test') return; setPicks((p) => ({ ...p, [d]: slot })); setPickMarks(null); clearBad(); },
  };
  const s = { text, texts, inputState, changeMarks, crosses, sel, tried, found, findPick };
  const hasCheck = ['read', 'plot', 'find', 'change', 'test'].includes(stage);
  const view = { stage, done, plotted, crosses, sel, plotMarks, picks, pickMarks, tested, moonsShown };

  // Picture and stage side by side from lg, so a laptop at 1280×720 sees the
  // reading and its Check together; stacked below that.
  return (
    <div className="grid gap-3 lg:grid-cols-2 items-start min-w-0">
      <Picture m={m} lang={lang} view={view} act={act} />

      <div className="flex flex-col gap-3 min-w-0">
        {!done && (
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-5 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {stages.map((st, i) => {
                const Icon = STAGE_ICON[st];
                const isDone = i < idx;
                return (
                  <span key={`${st}${i}`} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest
                    ${isDone ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300' : i === idx ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5" strokeWidth={3} />}
                    {t.stages[st]}
                  </span>
                );
              })}
            </div>
            <Stage m={m} stage={stage} lang={lang} s={s} act={act} />
            <Message msg={msg} lang={lang} />
            <div className="mt-4 flex items-center justify-end gap-2">
              <button type="button" onClick={showMe}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
              </button>
              {hasCheck && <button type="button" onClick={act.check} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>}
            </div>
          </div>
        )}

        {done && (
          <RoundDone m={m} lang={lang} helped={helped} slipped={slipped} onNext={onNext} isLast={isLast}
            note={msg?.tone === 'shown' || (msg?.tone === 'ok' && msg.en !== T.en.right) ? <Message msg={msg} lang={lang} /> : null} />
        )}
      </div>
    </div>
  );
}
