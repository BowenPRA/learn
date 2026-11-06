// src/data/Y7_MATH/U05_3/zeroLineState.js
// The play state of one Zero on the Line item (useZeroLineItem) and the words
// its controls use (ZT). Split from zeroLineItem.jsx, which keeps only the
// components (fast refresh wants component-only .jsx files).
//
// The rule (docs/y7-math/plans/U05_3.md): two or three actions an item. An
// extra stage opens only after a wrong answer, where the slip happened — a
// read on the other scale opens "tap the 0 on the arm", the inside of a reflex
// angle opens "360 − ?". A wrong answer is named and tried once more; a second
// one (or Show me) fills the stage in, and the item counts as helped.
import { useState } from 'react';
import {
  diagnoseEstimate, diagnoseZero, diagnoseRead, diagnoseSubtract, diagnoseMark, diagnosePlace, diagnoseMeasure,
} from '../../../utils/zeroLine.js';

export const ZT = {
  en: {
    stages: { estimate: 'Estimate', zero: 'Which 0?', read: 'Read', mark: 'Mark', place: 'Place', measure: 'Measure', subtract: '360 − ?', paper: 'On paper' },
    estimate: 'First, estimate: what kind of angle is it?',
    est: { acute: ['Acute', 'less than 90°'], obtuse: ['Obtuse', '90° to 180°'], reflex: ['Reflex', 'more than 180°'] },
    zeroArm: 'Tap the 0 that sits on the arm.', zeroLine: 'Tap the 0 that sits on the line.',
    read: 'How many degrees? Count up from the 0 on the arm.', readOff: 'How many degrees between the arms?',
    reflexRead: 'How big is the marked angle?',
    mark: 'Tap the scale where the line should go. Use − and + to move 1°.',
    place: 'Tap AB to move the protractor. Its dashed 90° line must pass through C.',
    measure: 'Read the ruler: how long is AD, in cm?',
    subtract: (i) => `The inside is ${i}°. So the marked angle is 360° − ${i}° = ?`,
    check: 'Check', show: 'Show me', degrees: 'degrees', cm: 'cm', tryAgain: 'Try again',
    filled: 'It is filled in for you.', shown: 'Here it is.',
  },
  fr: {
    stages: { estimate: 'Estimer', zero: 'Quel 0 ?', read: 'Lire', mark: 'Marquer', place: 'Placer', measure: 'Mesurer', subtract: '360 − ?', paper: 'Sur papier' },
    estimate: 'D’abord, estime : quel genre d’angle est-ce ?',
    est: { acute: ['Aigu', 'moins de 90°'], obtuse: ['Obtus', 'de 90° à 180°'], reflex: ['Rentrant', 'plus de 180°'] },
    zeroArm: 'Touche le 0 qui est sur le côté.', zeroLine: 'Touche le 0 qui est sur la droite.',
    read: 'Combien de degrés ? Compte à partir du 0 sur le côté.', readOff: 'Combien de degrés entre les deux côtés ?',
    reflexRead: 'Quelle est la taille de l’angle marqué ?',
    mark: 'Touche l’échelle là où la droite doit passer. − et + la déplacent de 1°.',
    place: 'Touche AB pour déplacer le rapporteur. Sa ligne des 90° en pointillés doit passer par C.',
    measure: 'Lis la règle : combien mesure AD, en cm ?',
    subtract: (i) => `L’intérieur fait ${i}°. Donc l’angle marqué fait 360° − ${i}° = ?`,
    check: 'Vérifier', show: 'Montre-moi', degrees: 'degrés', cm: 'cm', tryAgain: 'Essaie encore',
    filled: 'C’est rempli pour toi.', shown: 'Le voici.',
  },
};
const both = (k) => ({ en: ZT.en[k], fr: ZT.fr[k] });
const join = (a, b) => ({ en: `${a.en} ${b.en}`, fr: `${a.fr} ${b.fr}` });

/** The play state of one item. `onDone({ helped, slipped })` fires once, when its last stage passes. */
export function useZeroLineItem(model, { onDone } = {}) {
  const [queue, setQueue] = useState(model.stages);
  const [passed, setPassed] = useState([]);
  const [tries, setTries] = useState({});       // wrong answers so far, per stage
  const [helped, setHelped] = useState(false);
  const [slipped, setSlipped] = useState(false);
  const [est, setEst] = useState(null);
  const [bad, setBad] = useState({});           // estimate picks marked wrong, this stage
  const [ring, setRing] = useState(null);
  const [mark, setMarkRaw] = useState(null);
  const [drawn, setDrawn] = useState(null);
  const [place, setPlace] = useState(model.kind === 'perp' ? Math.round(model.AB * 2.5) / 10 : null);
  const [foot, setFoot] = useState(false);
  const [typed, setTyped] = useState('');
  const [msg, setMsg] = useState(null);
  const [done, setDone] = useState(false);
  const stage = done ? null : queue[0];

  const advance = (message, extra = {}) => {
    const rest = queue.slice(1);
    setPassed([...passed, queue[0]]);
    setBad({}); setTyped(''); setMsg(message);
    if (!rest.length) {
      setDone(true); setQueue([]);
      onDone?.({ helped: extra.helped ?? helped, slipped: extra.slipped ?? slipped });
      return;
    }
    setQueue(rest);
  };

  /** A wrong answer: named, one more try; the second fills the stage (fill() sets the right state).
   *  `open` is the stage the slip opens — only on the first wrong answer, and only once. */
  const wrong = (d, fill, open = null) => {
    setSlipped(true);
    const n = (tries[stage] || 0) + 1;
    if (open && n === 1 && !queue.includes(open)) {
      setTries({ ...tries, [stage]: n });
      setQueue(open === 'subtract' ? ['subtract', ...queue.slice(1)] : [open, ...queue]);
      if (open === 'subtract') setPassed([...passed, stage]);
      setMsg({ tone: 'bad', en: d.en, fr: d.fr });
      return;
    }
    if (n >= 2) {
      setHelped(true);
      fill();
      advance({ tone: 'shown', ...join(d, both('filled')) }, { helped: true, slipped: true });
      return;
    }
    setTries({ ...tries, [stage]: n });
    setMsg({ tone: 'bad', en: d.en, fr: d.fr });
  };

  const fills = {
    estimate: () => setEst(model.est),
    zero: () => setRing((model.read || model.draw).zero),
    read: () => setTyped(String(Math.round(model.answer))),
    subtract: () => setTyped(String(model.answer)),
    mark: () => { setMarkRaw(model.draw.target); setDrawn({ mark: model.draw.target, ok: true }); },
    place: () => { setPlace(model.foot); setFoot(true); },
    measure: () => setTyped(String(model.answer)),
  };

  const pickEstimate = (e) => {
    if (stage !== 'estimate' || bad[e]) return;
    const d = diagnoseEstimate(model, e);
    if (d.ok) { setEst(e); advance({ tone: 'ok', en: d.en, fr: d.fr }); return; }
    setBad({ ...bad, [e]: true });
    wrong(d, fills.estimate);
  };
  const tapZero = (side) => {
    if (stage !== 'zero') return;
    const d = diagnoseZero(model, side);
    if (d.ok) { setRing(side); advance({ tone: 'ok', en: d.en, fr: d.fr }); return; }
    wrong(d, fills.zero);
  };
  const checkTyped = () => {
    if (!typed.trim()) return;
    const d = stage === 'read' ? diagnoseRead(model, typed, est || model.est)
      : stage === 'subtract' ? diagnoseSubtract(model, typed) : diagnoseMeasure(model, typed);
    if (d.soft) { setMsg({ tone: 'info', en: d.en, fr: d.fr }); return; }
    if (d.ok) { advance({ tone: 'ok', en: d.en, fr: d.fr }); return; }
    const open = stage === 'read' ? model.extra[d.code] : null;
    if (open === 'zero') setRing(null);
    wrong(d, fills[stage], open);
  };
  const setMark = (m) => { if (stage === 'mark') { setMarkRaw(Math.max(0, Math.min(180, m))); setDrawn(null); if (msg?.tone === 'bad') setMsg(null); } };
  const checkMark = () => {
    if (mark == null) return;
    const d = diagnoseMark(model, mark);
    setDrawn({ mark, ok: d.ok });
    if (d.ok) { advance({ tone: 'ok', en: d.en, fr: d.fr }); return; }
    wrong(d, fills.mark);
  };
  const movePlace = (x) => { if (stage === 'place') { setPlace(Math.max(0, Math.min(model.AB, Math.round(x * 10) / 10))); if (msg?.tone === 'bad') setMsg(null); } };
  const checkPlace = () => {
    const d = diagnosePlace(model, place);
    if (d.ok) { setFoot(true); advance({ tone: 'ok', en: d.en, fr: d.fr }); return; }
    wrong(d, fills.place);
  };
  const showMe = () => {
    if (!stage) return;
    setHelped(true); setSlipped(true);
    fills[stage]();
    if (stage === 'estimate') setEst(model.est);
    advance({ tone: 'shown', ...both('shown') }, { helped: true, slipped: true });
  };

  return {
    stage, queue, passed, done, helped, slipped, msg, est, bad, ring, mark, drawn, place, foot, typed,
    ruler: model.kind === 'perp' && (stage === 'measure' || (done && foot)),
    setTyped: (v) => { setTyped(v); if (msg?.tone === 'bad') setMsg(null); },
    pickEstimate, tapZero, checkTyped, setMark, checkMark, movePlace, checkPlace, showMe,
  };
}
