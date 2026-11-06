import { useState } from 'react';
import {
  answerOf, diagnoseFrom, diagnoseBox, diagnoseNumber, diagnoseChase, diagnoseDecide, diagnoseQuick, SORT_STAGES,
} from '../../../utils/energySplit';
import { T } from './splitText.js';

/**
 * The step runner for one Where Did It Go? round, shared by the task
 * (tasks/EnergySplit.jsx) and the deck activity (notes/EnergySplitActivity.jsx).
 *
 * `queue` starts as the model's `entry` (walked stages, or 'quick' + chase). A
 * wrong answer is named and can be tried again; a second wrong (or Show me)
 * fills the stage in and the round counts as helped. A wrong quick answer
 * splices the stages its slip belongs to into the queue, the quick answer
 * counting as the first opened stage's first try (`wrongs` starts at 1).
 * `filled` holds every answer found so far, which the board draws.
 */
const both = (key, stage) => ({ en: stage ? T.en[key][stage] : T.en[key], fr: stage ? T.fr[key][stage] : T.fr[key] });

function initialFilled(m) {
  if (m.kind !== 'device' || m.sort) return {};
  return { from: m.answer.from, useful: m.answer.useful, wasted: m.answer.wasted };
}

export default function useSplitRun(m, { onFinish } = {}) {
  const [queue, setQueue] = useState(m.entry);
  const [idx, setIdx] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [filled, setFilled] = useState(() => initialFilled(m));
  const [log, setLog] = useState([]); // [{ stage, helped, opened }]
  const [boxes, setBoxes] = useState({}); // quick: chip → 'from' | 'useful' | 'wasted'
  const [picked, setPicked] = useState([]); // the Useful / Wasted stage's chips
  const [num, setNum] = useState('');
  const [tried, setTried] = useState([]); // choice stages
  const [selected, setSelected] = useState(null); // quick: a chip waiting for its box
  const [finished, setFinished] = useState(false);
  const stage = finished ? null : queue[idx];

  const resetStage = () => { setWrongs(0); setPicked([]); setNum(''); setTried([]); setSelected(null); };

  const fillOf = (s) => {
    if (s !== 'quick') return { [s]: answerOf(m, s) };
    const f = { from: m.answer.from, useful: m.answer.useful, wasted: m.answer.wasted };
    if (m.quickNum) { f[m.quickNum] = answerOf(m, m.quickNum); if (m.quickNum === 'wastedJ') f.usefulJ = m.usefulJ; }
    return f;
  };

  const advance = (stageHelped, say) => {
    const h = helped || stageHelped;
    setFilled((f) => ({ ...f, ...fillOf(stage) }));
    setLog((l) => [...l, { stage, helped: stageHelped }]);
    resetStage();
    setMsg(say);
    if (idx + 1 < queue.length) setIdx(idx + 1);
    else { setFinished(true); onFinish?.({ helped: h }); }
  };

  const wrong = (d) => {
    setSlipped(true);
    if (wrongs + 1 >= 2) {
      setHelped(true);
      advance(true, { tone: 'shown', en: `${d.en} ${T.en.filled}`, fr: `${d.fr} ${T.fr.filled}` });
      return;
    }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };

  const settle = (d, right) => {
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    if (d.ok) advance(false, { tone: 'ok', ...(right || both('right', stage)) });
    else wrong(d);
  };

  const checkQuick = () => {
    const d = diagnoseQuick(m, { boxes, num });
    if (d.soft || d.ok) { settle(d); return; }
    // Open the stages the slip belongs to; what was right stays filled in.
    setSlipped(true);
    const f = {};
    for (const s of d.given) f[s] = answerOf(m, s);
    if (d.numOk && m.quickNum) Object.assign(f, fillOf('quick'), Object.fromEntries(SORT_STAGES.filter((s) => !d.given.includes(s)).map((s) => [s, undefined])));
    const opensAt = d.open.find((s) => m.countStages.includes(s));
    if (opensAt) for (const s of m.countStages.slice(0, m.countStages.indexOf(opensAt))) f[s] = answerOf(m, s);
    setFilled((prev) => ({ ...prev, ...f }));
    setLog((l) => [...l, { stage: 'quick', helped: false, opened: true }]);
    setQueue([...queue.slice(0, idx + 1), ...d.open, ...queue.slice(idx + 1)]);
    setIdx(idx + 1);
    setPicked([]); setNum(''); setTried([]); setSelected(null);
    setWrongs(1);
    setMsg({ tone: 'bad', en: `${d.en} ${T.en.opened}`, fr: `${d.fr} ${T.fr.opened}` });
  };

  const act = {
    choose: (v) => {
      if (tried.includes(v)) return;
      const diag = stage === 'from' ? diagnoseFrom(m, v) : stage === 'chase' ? diagnoseChase(m, v) : diagnoseDecide(m, v);
      if (diag.ok) { settle(diag, stage === 'from' ? null : { en: diag.en, fr: diag.fr }); return; }
      setTried((x) => [...x, v]);
      wrong(diag);
    },
    toggle: (chip) => {
      setPicked((p) => (p.includes(chip) ? p.filter((c) => c !== chip) : [...p, chip]));
      setMsg((x) => (x?.tone === 'ok' || x?.tone === 'shown' ? x : null));
    },
    place: (chip, box) => {
      setBoxes((b) => {
        const next = { ...b };
        if (!box || box === 'bank') delete next[chip];
        else next[chip] = box;
        return next;
      });
      setSelected(null);
      setMsg((x) => (x?.tone === 'ok' || x?.tone === 'shown' ? x : null));
    },
    select: (chip) => setSelected((s) => (s === chip ? null : chip)),
    setNum: (v) => { setNum(v); setMsg((x) => (x?.tone === 'bad' || x?.tone === 'info' ? null : x)); },
    check: () => {
      if (stage === 'quick') checkQuick();
      else if (stage === 'useful' || stage === 'wasted') settle(diagnoseBox(m, stage, picked));
      else settle(diagnoseNumber(m, stage, num));
    },
    showMe: () => {
      setSlipped(true); setHelped(true);
      advance(true, { tone: 'shown', ...both('shown') });
    },
  };

  return { m, queue, idx, stage, wrongs, helped, slipped, msg, filled, log, boxes, picked, num, tried, selected, finished, act };
}
