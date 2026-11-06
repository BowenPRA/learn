// The play state of one Orbit Lab item (ORBIT_LAB), shared by the task
// (tasks/OrbitLab.jsx) and the deck's `orbitlab` activity.
//
// The rule (docs/y7-science/plans/U03_3.md): levels 1–2 walk every stage; from
// level 3 a pull or coast round is ONE screen (both answers, one Check). A
// wrong answer names its slip and opens the stage it belongs to, counting as
// that stage's first try; a second wrong answer (or Show me) fills the stage
// in, and the item counts as helped (it pays half).
import { useState } from 'react';
import {
  diagnoseArrow, diagnoseBoth, diagnoseWhy, diagnoseDraw, diagnosePattern, diagnoseReason, diagnosePredict,
  diagnoseForces, diagnoseSpeed, diagnoseCoastBoth, answerOf,
} from '../../../utils/orbitLab';
import { T } from './orbitLabText';

const both = (k) => ({ en: T.en[k], fr: T.fr[k] });
const join = (d, k) => ({ en: `${d.en || ''} ${T.en[k]}`.trim(), fr: `${d.fr || ''} ${T.fr[k]}`.trim() });

/** Choice stages are answered by a tap; the others by Check. */
export const CHOICE_STAGES = ['why', 'pattern', 'predict', 'speed'];

export function useOrbitItem(m, { onDone } = {}) {
  const [queue, setQueue] = useState(m.stages);
  const [tries, setTries] = useState({});
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [msg, setMsg] = useState(null);
  const [done, setDone] = useState(false);
  // pull
  const [arrows, setArrows] = useState({ pull: null, path: null });
  const [target, setTarget] = useState('pull');
  const [released, setReleased] = useState(false);
  // graph
  const [heights, setHeights] = useState({});
  const [sel, setSel] = useState(() => (m.kind === 'graph' ? m.rows.find((r) => !r.given)?.id ?? null : null));
  const [marks, setMarks] = useState(null);
  // coast
  const [forces, setForces] = useState([]);
  // every choice stage: what was tried, and the answer once found
  const [tried, setTried] = useState({});
  const [found, setFound] = useState({});
  const stage = done ? null : queue[0];

  const advance = (message, extra = {}) => {
    const rest = queue.slice(1);
    if (stage === 'pull' && rest[0] === 'path') setReleased(true);
    setMsg(message);
    if (!rest.length) {
      setDone(true); setQueue([]); setReleased(true);
      onDone?.({ helped: extra.helped ?? helped, slipped: extra.slipped ?? slipped });
      return;
    }
    setQueue(rest);
  };

  const FILL = {
    pull: () => setArrows((a) => ({ ...a, pull: answerOf(m, 'pull') })),
    path: () => setArrows((a) => ({ ...a, path: answerOf(m, 'path') })),
    both: () => (m.kind === 'pull' ? setArrows(answerOf(m, 'both')) : (setForces(m.answer), setFound((f) => ({ ...f, speed: answerOf(m, 'speed') })))),
    draw: () => { setHeights(answerOf(m, 'draw')); setMarks(Object.fromEntries(m.rows.filter((r) => !r.given).map((r) => [r.id, true]))); },
    forces: () => setForces(m.answer),
    why: () => setFound((f) => ({ ...f, why: answerOf(m, 'why') })),
    pattern: () => setFound((f) => ({ ...f, pattern: 'down' })),
    predict: () => setFound((f) => ({ ...f, predict: answerOf(m, 'predict') })),
    speed: () => setFound((f) => ({ ...f, speed: answerOf(m, 'speed') })),
  };

  /** A wrong answer: named, one more try; the second fills the stage in. */
  const wrong = (d) => {
    setSlipped(true);
    const n = (tries[stage] || 0) + 1;
    if (n >= 2) {
      FILL[stage]();
      setHelped(true);
      advance({ tone: 'shown', ...join(d, 'filled') }, { helped: true, slipped: true });
      return;
    }
    setTries({ ...tries, [stage]: n });
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };
  const info = (d) => setMsg({ tone: 'info', en: d.en, fr: d.fr });

  /** The quick round went wrong: open the stages where the slips were. */
  const openStages = (d, keep) => {
    setSlipped(true);
    keep();
    const rest = [...d.open, ...queue.slice(1)];
    const counted = Object.fromEntries(d.open.filter((s) => !CHOICE_STAGES.includes(s)).map((s) => [s, 1]));
    if (m.kind === 'coast' && d.open.includes('speed')) setTried((t) => ({ ...t, speed: [...(t.speed || []), found.speed] }));
    if (m.kind === 'coast' && d.open.includes('speed')) counted.speed = 1;
    setTries({ ...tries, ...counted });
    setQueue(rest);
    if (m.kind === 'pull' && d.open[0] === 'path') setReleased(true);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };

  const check = () => {
    if (stage === 'pull' || stage === 'path') {
      const d = diagnoseArrow(m, stage, arrows[stage]);
      if (d.soft) return info(d);
      if (d.ok) return advance({ tone: 'ok', ...both('rightArrow') });
      setArrows((a) => ({ ...a, [stage]: null }));
      return wrong(d);
    }
    if (stage === 'both' && m.kind === 'pull') {
      const d = diagnoseBoth(m, arrows);
      if (d.soft) return info(d);
      if (d.ok) return advance({ tone: 'ok', ...both('rightArrow') });
      return openStages(d, () => setArrows({ pull: d.pull.ok ? arrows.pull : null, path: d.path.ok ? arrows.path : null }));
    }
    if (stage === 'both') {
      const d = diagnoseCoastBoth(m, { forces, speed: found.speed });
      if (d.soft) return info(d);
      if (d.ok) return advance({ tone: 'ok', ...both('rightCoast') });
      return openStages(d, () => {
        if (!d.forces.ok) setForces([]);
        if (!d.speed.ok) setFound((f) => ({ ...f, speed: null }));
      });
    }
    if (stage === 'draw') {
      const d = diagnoseDraw(m, heights);
      if (d.soft) return info(d);
      setMarks(d.per);
      if (d.ok) return advance({ tone: 'ok', ...both('rightGraph') });
      return wrong(d);
    }
    if (stage === 'forces') {
      const d = diagnoseForces(m, forces);
      if (d.soft) return info(d);
      if (d.ok) return advance({ tone: 'ok', ...both('rightForces') });
      setForces([]);
      return wrong(d);
    }
    return undefined;
  };

  const DIAGNOSE = {
    why: m.kind === 'pull' ? diagnoseWhy : diagnoseReason,
    pattern: diagnosePattern,
    predict: diagnosePredict,
    speed: diagnoseSpeed,
  };
  /** A choice stage is answered the moment a choice is tapped. */
  const pick = (val) => {
    if (stage === 'both' && m.kind === 'coast') { setFound((f) => ({ ...f, speed: val })); setMsg(null); return; }
    if (!CHOICE_STAGES.includes(stage) || found[stage] != null || (tried[stage] || []).includes(val)) return;
    const d = DIAGNOSE[stage](m, val);
    if (d.ok) { setFound((f) => ({ ...f, [stage]: val })); advance({ tone: 'ok', ...both('rightChoice') }); return; }
    setTried((t) => ({ ...t, [stage]: [...(t[stage] || []), val] }));
    wrong(d);
  };

  const tapArrow = (k) => {
    if (stage === 'pull' || stage === 'path') { setArrows((a) => ({ ...a, [stage]: k })); setMsg(null); return; }
    if (stage !== 'both') return;
    setArrows((a) => ({ ...a, [target]: k }));
    if (target === 'pull') setTarget('path');
    setMsg(null);
  };
  const setBar = (id, v) => {
    if (stage !== 'draw') return;
    setHeights((h) => ({ ...h, [id]: Math.max(0, Math.min(m.max, v)) }));
    setMarks((mk) => (mk ? { ...mk, [id]: undefined } : mk));
    setMsg(null);
  };
  const toggleForce = (id) => {
    if (stage !== 'forces' && !(stage === 'both' && m.kind === 'coast')) return;
    setForces((f) => {
      if (id === 'none') return f.includes('none') ? [] : ['none'];
      const rest = f.filter((x) => x !== 'none');
      return rest.includes(id) ? rest.filter((x) => x !== id) : [...rest, id];
    });
    setMsg(null);
  };
  const showMe = () => {
    if (!stage) return;
    setSlipped(true); setHelped(true);
    FILL[stage]();
    advance({ tone: 'shown', ...both('shown') }, { helped: true, slipped: true });
  };

  return {
    m, stage, queue, done, helped, slipped, msg, tries,
    arrows, target, setTarget, released, tapArrow,
    heights, sel, setSel, marks, setBar,
    forces, toggleForce,
    tried, found, pick, check, showMe,
  };
}
