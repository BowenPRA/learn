import { useState } from 'react';
import { CheckCircle2, Lightbulb } from 'lucide-react';
import {
  HAPPENS, SHAPES, heatOptions,
  diagnoseHappens, diagnoseShape, diagnoseSlot, diagnoseOutputs, diagnoseBuild, diagnosePick, diagnoseHotter, diagnoseWay, diagnoseThen,
} from '../../../utils/energyChange';
import { T } from './energyChangeText.js';
import { Diagram, Palette, ShapeIcon } from './EnergyBoard.jsx';
import { Message, Choices, SceneCard, HeatThings, Done } from './EnergyParts.jsx';
import { pickL } from './energyChangeText.js';

/* ------------------------------------------------------------------ *
 * One From… To… item, all its stages (utils/energyChange.js derives them).
 * Mounted with key={item.id}. A wrong answer is named and can be tried
 * again; a second wrong one — or a wrong two-way choice, or Show me — fills
 * the stage in, and the item pays half. A QUICK item is one Check of the whole
 * diagram; a wrong one opens the walked stages at the stage its slip belongs
 * to, the boxes before it kept, and that wrong answer counts as the stage's
 * first. `compact`: inside a Notes slide (no picture, no Next).
 * ------------------------------------------------------------------ */
const GREEN = '#58cc02';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const slotOf = (st) => (/^slot\d+$/.test(st) ? Number(st.slice(4)) : -1);

export default function EnergyRound({ model: m, pictures, lang, onComplete, onNext, isLast, compact = false }) {
  const t = T[lang] || T.en;
  const both = (k) => ({ en: T.en.right[k], fr: T.fr.right[k] });
  const [stages, setStages] = useState(m.stages);
  const [idx, setIdx] = useState(0);
  const [shape, setShape] = useState(m.kind === 'one' ? 'one' : null);
  const [fill, setFill] = useState(() => Array(m.n || 0).fill(null));
  const [marks, setMarks] = useState({});
  const [active, setActive] = useState(0);
  const [tried, setTried] = useState([]);
  const [found, setFound] = useState(null);
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [done, setDone] = useState(false);
  const [hotKnown, setHotKnown] = useState(m.kind === 'heat' && !m.walk);
  const stage = stages[idx];
  const box = slotOf(stage);
  // A box's chip: From for the first, To for the last of a line, Then between.
  const stageLabel = (s) => {
    const i = slotOf(s);
    if (i < 0) return t.stages[s] || s;
    if (i === 0) return t.stages.slot0;
    return i === m.line.length - 1 && !m.outputs.length ? t.stages.slot1 : t.stages.slot2;
  };
  const twoWay = stage === 'happens' || stage === 'hotter' || (stage === 'shape' && m.shapes.length === 2);

  const lockUpTo = (i, f = fill) => setMarks(Object.fromEntries(f.slice(0, i).map((_, k) => [k, 'locked'])));

  const advance = (wasHelped, say, nextStages = stages, nextIdx = idx + 1) => {
    if (nextIdx < nextStages.length) {
      const ns = nextStages[nextIdx];
      setIdx(nextIdx); setWrongs(0); setTried([]); setFound(null); setMsg(say);
      if (ns === 'outputs') setActive(m.chain);
      else if (slotOf(ns) >= 0) setActive(slotOf(ns));
      return;
    }
    setMsg(say); setDone(true);
    onComplete?.(wasHelped);
  };

  // Fill the current stage in with the right answer.
  const FILL = {
    happens: () => setFound(m.S.happens),
    shape: () => { setShape(m.shape); setFound(m.shape); },
    pick: () => setFound(m.answer),
    hotter: () => { setFound(m.hot); setHotKnown(true); },
    way: () => setFound(m.way),
    then: () => setFound('right'),
    outputs: () => { const f = [...fill]; m.outputs.forEach((e, k) => { f[m.chain + k] = e; }); setFill(f); lockUpTo(m.n, f); },
    build: () => { setShape(m.shape); setFill([...m.slots]); lockUpTo(m.n, m.slots); },
  };
  const fillStage = (st) => {
    const i = slotOf(st);
    if (i >= 0) { const f = [...fill]; f[i] = m.line[i]; setFill(f); lockUpTo(i + 1, f); return; }
    FILL[st]();
  };

  const wrong = (d) => {
    setSlipped(true);
    if (twoWay || wrongs + 1 >= 2) {
      fillStage(stage); setHelped(true);
      advance(true, { tone: 'shown', en: `${d.en || ''} ${T.en.filled}`.trim(), fr: `${d.fr || ''} ${T.fr.filled}`.trim() });
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };

  const choose = (diagnose, rightKey) => (v) => {
    if (found != null || tried.includes(v)) return;
    const d = diagnose(m, v);
    if (d.ok) {
      setFound(v);
      if (stage === 'shape') setShape(v);
      if (stage === 'hotter') setHotKnown(true);
      advance(helped, { tone: 'ok', ...both(rightKey) });
      return;
    }
    setTried((x) => [...x, v]);
    wrong(d);
  };

  // A box of the line, one tap.
  const pickSlot = (e) => {
    const d = diagnoseSlot(m, box, e);
    const f = [...fill]; f[box] = e;
    setFill(f);
    if (d.ok) { lockUpTo(box + 1, f); advance(helped, { tone: 'ok', ...both('slot') }); return; }
    setMarks((mk) => ({ ...mk, [box]: 'bad' }));
    wrong(d);
  };

  // The outputs and the quick build: tap a box, tap an energy.
  const place = (e) => {
    const f = [...fill];
    const at = active >= 0 && !(marks[active] === 'locked') ? active : f.findIndex((x, k) => !x && marks[k] !== 'locked');
    if (at < 0) return;
    f[at] = e;
    setFill(f);
    setMarks((mk) => { const o = { ...mk }; delete o[at]; return o; });
    const lo = stage === 'outputs' ? m.chain : 0;
    let next = -1;
    for (let k = 1; k <= m.n; k++) { const j = (at + k) % m.n; if (j >= lo && !f[j] && marks[j] !== 'locked') { next = j; break; } }
    setActive(next);
    setMsg((x) => (x?.tone === 'bad' || x?.tone === 'info' ? null : x));
  };
  const tapBox = (i) => {
    if (marks[i] === 'locked') return;
    if (stage === 'outputs' && i < m.chain) return;
    if (fill[i]) { const f = [...fill]; f[i] = null; setFill(f); }
    setActive(i);
  };

  const checkOutputs = () => {
    const picks = fill.slice(m.chain);
    const d = diagnoseOutputs(m, picks);
    if (d.soft) { setMsg({ tone: 'info', en: T.en.prompts.outputs(m.outputs.length), fr: T.fr.prompts.outputs(m.outputs.length) }); return; }
    if (d.ok) { lockUpTo(m.n); advance(helped, { tone: 'ok', ...both('outputs') }); return; }
    setMarks((mk) => {
      const o = { ...mk };
      picks.forEach((e, k) => { if (!m.outputs.includes(e) || picks.indexOf(e) !== k) o[m.chain + k] = 'bad'; });
      return o;
    });
    wrong(d);
  };

  const checkBuild = () => {
    const d = diagnoseBuild(m, { shape, fill });
    if (d.soft) { setMsg({ tone: 'info', en: d.code === 'noShape' ? T.en.prompts.buildShape : T.en.tapBox, fr: d.code === 'noShape' ? T.fr.prompts.buildShape : T.fr.tapBox }); return; }
    if (d.ok) { lockUpTo(m.n); advance(helped, { tone: 'ok', ...both('build') }); return; }
    // Open the walked stages at the slip's stage, keeping what came before it.
    setSlipped(true);
    const from = m.walkStages.indexOf(d.stage);
    const open = m.walkStages.slice(from);
    const keep = d.stage === 'shape' ? 0 : d.stage === 'outputs' ? m.chain : slotOf(d.stage);
    const f = fill.map((e, k) => (k < keep ? m.slots[k] : null));
    setFill(f); lockUpTo(keep, f);
    if (d.stage === 'shape') setShape(null);
    setStages(open); setIdx(0); setTried([]); setFound(null);
    setActive(d.stage === 'outputs' ? m.chain : Math.max(0, slotOf(d.stage)));
    if (d.stage === 'shape' && m.shapes.length === 2) {
      // A two-way choice got wrong: it is filled in.
      setShape(m.shape); setHelped(true);
      advance(true, { tone: 'shown', en: `${d.en} ${T.en.filled}`, fr: `${d.fr} ${T.fr.filled}` }, open, 1);
      return;
    }
    setWrongs(1);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };

  const showMe = () => {
    setSlipped(true); setHelped(true);
    fillStage(stage);
    advance(true, { tone: 'shown', en: T.en.shown, fr: T.fr.shown });
  };

  if (done) {
    return <Done m={m} pictures={pictures} lang={lang} helped={helped} slipped={slipped} onNext={compact ? null : onNext} isLast={isLast} compact={compact}
      note={msg?.tone === 'shown' ? <Message msg={msg} lang={lang} /> : null} />;
  }

  const prompt = (() => {
    const P = t.prompts;
    if (stage === 'shape') return P.shape(m.n);
    if (stage === 'outputs') return P.outputs(m.outputs.length);
    if (stage === 'build') return m.kind === 'one' ? P.build : P.buildShape;
    if (box === 0) return P.slot0;
    if (box > 0) return box === 1 && m.line.length === 2 && !m.outputs.length ? P.slotTo : P.slotNext;
    return P[stage];
  })();
  const showBoard = m.n && (box >= 0 || stage === 'outputs' || (stage === 'build' && shape));
  const usesPalette = box >= 0 || stage === 'outputs' || (stage === 'build' && shape);
  const onCheck = stage === 'outputs' ? checkOutputs : stage === 'build' ? checkBuild : null;
  const picture = m.kind === 'read' ? null : pictures?.[m.scene];

  return (
    <div className="flex flex-col gap-3 min-w-0">
      {!compact && m.kind !== 'read' && (
        <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] gap-3 items-center rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5">
          <div className="rounded-xl overflow-hidden bg-white aspect-[17/12]" dangerouslySetInnerHTML={{ __html: picture || '' }} />
          <div className="min-w-0">
            <div className="text-base sm:text-xl font-black text-slate-800 dark:text-slate-100 leading-snug">{pickL(lang, m.S.en, m.S.fr)}</div>
            {m.kind === 'heat' && <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">{pickL(lang, 'Two things at two temperatures, touching.', 'Deux choses à deux températures, qui se touchent.')}</p>}
          </div>
        </div>
      )}

      <div className={`rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm min-w-0 ${compact ? 'p-2.5' : 'p-3 sm:p-5'}`}>
        {stages.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {stages.map((s, i) => (
              <span key={s} className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border-2 text-[10px] font-black uppercase tracking-widest
                ${i < idx ? 'bg-[#d7ffb8] dark:bg-lime-900/30 border-[#58a700] text-[#3e7500] dark:text-lime-300' : i === idx ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                {i < idx && <CheckCircle2 className="w-3 h-3" strokeWidth={3} />}{stageLabel(s)}
              </span>
            ))}
          </div>
        )}
        <div className={`font-black text-slate-800 dark:text-slate-100 leading-snug mb-2 ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>{prompt}</div>

        {m.kind === 'read' && (
          <div className="mb-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t.readThis}</div>
            <Diagram shape="one" n={2} fill={m.diagram} lang={lang} marks={{ 0: 'locked', 1: 'locked' }} compact={compact} />
          </div>
        )}
        {m.kind === 'heat' && <div className="mb-3"><HeatThings m={m} lang={lang} known={hotKnown} tried={stage === 'hotter' ? tried : []} onPick={stage === 'hotter' && found == null ? choose(diagnoseHotter, 'hotter') : undefined} /></div>}

        {stage === 'happens' && (
          <Choices options={Object.entries(HAPPENS).map(([v, h]) => ({ val: v, label: pickL(lang, h.en, h.fr) }))} tried={tried} found={found} onPick={choose(diagnoseHappens, 'happens')} />
        )}
        {(stage === 'shape' || (stage === 'build' && m.kind !== 'one')) && (
          <div className={stage === 'build' ? 'mb-2' : ''}>
            <Choices options={m.shapes.map((s) => ({ val: s, label: pickL(lang, SHAPES[s].en, SHAPES[s].fr), icon: <ShapeIcon shape={s} n={m.n} /> }))}
              tried={stage === 'shape' ? tried : []} found={stage === 'shape' ? found : null} selected={stage === 'build' ? shape : null}
              onPick={stage === 'shape' ? choose(diagnoseShape, 'shape') : (v) => { if (v !== shape) { setShape(v); setFill(Array(m.n).fill(null)); setMarks({}); setActive(0); } }} />
          </div>
        )}
        {showBoard && (
          <div className="mb-2">
            <Diagram shape={stage === 'build' ? shape : m.shape} n={m.n} fill={fill} lang={lang} marks={marks} compact={compact}
              active={box >= 0 ? box : active} onBox={stage === 'outputs' || stage === 'build' ? tapBox : undefined} />
          </div>
        )}
        {usesPalette && <Palette lang={lang} compact={compact} onPick={box >= 0 ? pickSlot : place} />}
        {stage === 'pick' && (
          <div className="grid grid-cols-3 gap-2">
            {m.options.map((o) => (
              <SceneCard key={o.id} id={o.id} svg={pictures?.[o.id]} lang={lang} compact
                tone={found === o.id ? 'right' : tried.includes(o.id) ? 'wrong' : null}
                onClick={found == null && !tried.includes(o.id) ? () => choose(diagnosePick, 'pick')(o.id) : undefined} />
            ))}
          </div>
        )}
        {(stage === 'way' || stage === 'then') && (
          <Choices options={heatOptions(m, stage, lang)} tried={tried} found={found}
            onPick={choose(stage === 'way' ? diagnoseWay : diagnoseThen, stage)} />
        )}

        <Message msg={msg} lang={lang} />

        <div className="mt-3 flex items-center justify-end gap-2">
          <button type="button" onClick={showMe}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
            <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
          </button>
          {onCheck && <button type="button" onClick={onCheck} className={`px-5 py-2.5 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>}
        </div>
      </div>
    </div>
  );
}
