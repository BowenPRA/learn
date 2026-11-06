import { useMemo, useState } from 'react';
import {
  itemModel, diagnoseTap, diagnosePair, diagnoseSize, diagnoseStone, diagnoseLine, diagnoseReason, readDegrees, REASON_IDS,
} from '../../utils/anglePairs';
import { letterOf, sameAt } from '../../utils/anglePairGeom';

/**
 * One X, F or Z? item, run stage by stage — shared by the ANGLE_PAIR task and
 * the `anglepair` deck activity, so both mark exactly the same way.
 *
 * Each stage takes one wrong answer, named by its slip, and a second try; a
 * second wrong answer (or Show me, in the task) fills it in. Two stages open
 * only after a wrong answer, where the slip happened:
 *   stoneSize  (steps) a wrong final size → "what is the angle you tapped?"
 *   convert    (which) a parallel line tapped → "move its angle to the same place"
 */
const FILLED = { en: 'It is filled in for you.', fr: 'C’est rempli pour toi.' };
const join = (a, b) => ({ en: `${a.en} ${b.en}`, fr: `${a.fr} ${b.fr}` });

export function deriveAnglePair(item) {
  try { return itemModel(item); } catch { return null; }
}

export default function useAnglePairItem(item, { onFinish } = {}) {
  const m = useMemo(() => deriveAnglePair(item), [item]);
  const [queue, setQueue] = useState(() => (m ? m.stages : []));
  const [answers, setAnswers] = useState({});
  const [wrongs, setWrongs] = useState(0);
  const [picks, setPicks] = useState({});
  const [bad, setBad] = useState(null);       // the last wrong tap: [c, w] or a rail index
  const [stone, setStone] = useState(null);
  const [convertLine, setConvertLine] = useState(null);
  const [msg, setMsg] = useState(null);
  const [filled, setFilled] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [resume, setResume] = useState(null); // { stage, wrongs } to go back to after an opened stage

  const stage = queue[0] || 'done';
  const [kind, idx] = stage.split(':');
  const i = Number(idx || 0);

  // The thing the current pair / size stage is about.
  const target = !m ? null
    : m.kind === 'find' ? { ...m.targets[i], rel: m.targets[i]?.right }
      : m.kind === 'steps' && stone ? { at: m.target.at, rel: stone.outRel, right: stone.outRel, from: stone.size, answer: m.target.answer, letter: m.target.letter, options: m.target.options }
        : null;

  const advance = (record, message, shown = false) => {
    setAnswers((a) => ({ ...a, ...record }));
    setWrongs(0); setPicks({}); setBad(null); setMsg(message);
    setQueue((q) => q.slice(1));
    // Back from an opened stage: the stage that went wrong comes round again,
    // with its wrong answer still counted.
    if (resume) { setWrongs(resume.wrongs); setResume(null); return; }
    if (queue.length <= 1) onFinish?.(filled || shown);
  };
  const openStage = (name, message) => {
    setResume({ stage, wrongs: wrongs + 1 });
    setQueue((q) => [name, ...q]);
    setWrongs(0); setPicks({}); setMsg(message);
  };

  /** The right answer for the current stage, and how to record it. */
  const rightOf = () => {
    if (kind === 'tap') return { value: m.answerAt };
    if (kind === 'pair') return { value: target.right };
    if (kind === 'size') return { value: target.answer };
    if (kind === 'stone') return { value: (m.stones.find((s) => s.drawn) || m.stones[0]).at };
    if (kind === 'stoneSize') return { value: stone.size };
    if (kind === 'line') return { value: m.odd };
    if (kind === 'convert') return { value: m.lines[convertLine].same };
    return { value: 'same' };
  };
  const record = (value, how) => {
    if (kind === 'stone') setStone(m.stones.find((s) => sameAt(s.at, value)));
    return { [kind === 'convert' ? `convert:${convertLine}` : stage]: { value, how } };
  };
  const fill = (why) => {
    setFilled(true); setSlipped(true);
    const { value } = rightOf();
    advance(record(value, 'shown'), { tone: 'shown', ...(why ? join(why, FILLED) : FILLED) }, true);
  };

  const judge = (d, value, { left = 9 } = {}) => {
    if (d.ok) { advance(record(value, 'good'), { tone: 'ok', en: d.en, fr: d.fr, guide: !!d.guide }); return; }
    if (d.soft) { setMsg({ tone: 'nudge', en: d.en, fr: d.fr }); return; }
    setSlipped(true);
    if (kind === 'size' && m.kind === 'steps' && !answers.stoneSize && wrongs === 0) {
      openStage('stoneSize', { tone: 'bad', ...join(d, { en: 'First: how big is w, the angle you tapped?', fr: 'D’abord : combien mesure w, l’angle que tu as touché ?' }) });
      return;
    }
    if (kind === 'line' && d.convertLine != null && !answers[`convert:${d.convertLine}`] && wrongs === 0) {
      setConvertLine(d.convertLine);
      openStage('convert', { tone: 'bad', en: d.en, fr: d.fr });
      return;
    }
    if (wrongs + 1 >= 2 || left <= 1) { fill(d); return; }
    setWrongs(wrongs + 1);
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };

  const actions = {
    tapSector(at) {
      if (kind === 'tap') { const d = diagnoseTap(m, at); if (!d.ok) setBad(at); judge(d, at); }
      if (kind === 'stone') { const d = diagnoseStone(m, at); if (!d.ok) setBad(at); judge(d, at); }
    },
    tapRail(r) {
      if (kind !== 'line') return;
      const d = diagnoseLine(m, r);
      if (!d.ok) setBad(r);
      judge(d, r);
    },
    choose(id) {
      if (picks[id]) return;
      const options = kind === 'reason' ? REASON_IDS : target.options;
      const left = options.filter((o) => !picks[o] && o !== id).length;
      const d = kind === 'reason' ? diagnoseReason(m, id) : diagnosePair(target, m.kind === 'steps' ? stone.at : m.given.at, id);
      if (!d.ok) setPicks((p) => ({ ...p, [id]: 'bad' }));
      judge(d, id, { left });
    },
    type(text) {
      const t = kind === 'stoneSize' ? { answer: stone.size, from: m.given.size, rel: stone.inRel, letter: 'w' }
        : kind === 'convert' ? { answer: m.lines[convertLine].same, from: m.lines[convertLine].printed, rel: m.lines[convertLine].conv, letter: m.lines[convertLine].name }
          : target;
      let d = diagnoseSize(t, text);
      // Two steps, and the given angle typed as the answer: the stone was skipped.
      if (!d.ok && !d.soft && kind === 'size' && m.kind === 'steps' && readDegrees(text) === m.given.size) {
        d = { ok: false, code: 'skipstone', en: `${t.letter} and the ${m.given.size}° are not joined by one X, F or Z.`, fr: `${t.letter} et le ${m.given.size}° ne sont pas reliés par un seul X, F ou Z.` };
      }
      if (d.ok && kind === 'convert') {
        // The one "yes" worth showing: it says what to do next.
        d = { ok: true, guide: true, en: `Yes: in the same place, line ${t.letter}’s angle is ${t.answer}°. Compare the three again, then tap the line that is not parallel.`, fr: `Oui : à la même place, l’angle de la droite ${t.letter} fait ${t.answer}°. Compare encore les trois, puis touche la droite qui n’est pas parallèle.` };
      }
      judge(d, readDegrees(text));
    },
    showMe() { fill(null); },
  };

  /* ── what the figure shows ── */
  const marks = [];
  const glows = [];
  if (m && m.kind !== 'which') marks.push({ at: m.given.at, tone: 'given', text: `${m.given.size}°` });
  if (m?.kind === 'spot') {
    const a = answers.tap;
    if (a) { marks.push({ at: m.answerAt, tone: a.how === 'good' ? 'good' : 'shown', text: `${m.answer}°` }); glows.push(letterOf(m.F, m.given.at, m.answerAt)); }
    else if (bad) marks.push({ at: bad, tone: 'bad' });
  }
  if (m?.kind === 'find') {
    m.targets.forEach((t, n) => {
      const size = answers[`size:${n}`];
      const pair = answers[`pair:${n}`];
      // The letter being worked on carries the orange badge (current).
      marks.push({ at: t.at, tone: size ? (size.how === 'good' ? 'good' : 'shown') : 'ask', text: size ? `${t.answer}°` : t.letter, current: !size && n === i && (kind === 'pair' || kind === 'size') });
      if (pair && t.right !== 'none') glows.push(letterOf(m.F, m.given.at, t.at));
    });
  }
  if (m?.kind === 'steps') {
    const done = !!answers['size:0'];
    marks.push({ at: m.target.at, tone: done ? (answers['size:0'].how === 'good' ? 'good' : 'shown') : 'ask', text: done ? `${m.target.answer}°` : m.target.letter, current: !done && (kind === 'pair' || kind === 'size') });
    if (stone) {
      marks.push({ at: stone.at, tone: 'stone', text: answers.stoneSize || done ? `${stone.size}°` : 'w', current: kind === 'stoneSize' });
      if (stone.drawn) glows.push(letterOf(m.F, m.given.at, stone.at));
      if (answers['pair:0'] && stone.drawn) glows.push(letterOf(m.F, stone.at, m.target.at));
    } else if (bad) marks.push({ at: bad, tone: 'bad' });
  }
  const rails = {};
  if (m?.kind === 'which') {
    m.lines.forEach((l, n) => {
      marks.push({ at: l.printedAt, tone: 'given', text: `${l.printed}°` });
      const moved = answers[`convert:${n}`] || (stage === 'done' && l.conv !== 'self');
      if (stage === 'convert' && convertLine === n) marks.push({ at: l.refAt, tone: 'ask', text: '?' });
      else if (moved) marks.push({ at: l.refAt, tone: n === m.odd ? 'bad' : 'good', text: `${l.same}°` });
    });
    if (answers.line) rails[m.odd] = 'bad';
    else if (typeof bad === 'number') rails[bad] = 'bad';
  }
  const glow = glows.filter((g) => g.letter).length
    ? { paths: glows.filter((g) => g.letter).flatMap((g) => g.paths), tone: filled ? 'shown' : 'good' } : null;
  const tap = kind === 'tap' || kind === 'stone' ? 'sector' : kind === 'line' ? 'rail' : null;

  return {
    m, stage, kind, index: i, target, stone, convertLine, answers, msg, picks, filled, slipped,
    done: !!m && stage === 'done', marks, glow, tap, rails, actions,
  };
}
