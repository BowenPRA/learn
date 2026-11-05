// The words of a run message (run.js stores what happened; this says it in `lang`).
import { txt, answerText } from './model.js';
import { words } from './words.js';

/** { text, extra } for a message, or null. */
export function msgText(msg, item, lang) {
  if (!msg) return null;
  const t = words(lang);
  const step = item.steps[msg.step];
  const why = step && step.why ? txt(step, 'why', lang) : null;
  switch (msg.kind) {
    case 'why': return { text: why };
    case 'shown': return { text: [t.shown(`<<${answerText(step.input, lang)}>>`), why || txt(step, 'hint', lang)].filter(Boolean).join(' ') };
    case 'nudge': return { text: t.nudge[msg.nudge] || t.nudge.empty };
    case 'notYet': return { text: t.notYet, extra: txt(step, 'hint', lang) };
    case 'slip': return { text: txt(msg.slip, 'msg', lang), extra: msg.resp != null && typeof msg.resp === 'string' ? t.youWrote(msg.resp.replace(/^-/, '−')) : null };
    case 'opened': return { text: t.opened, extra: msg.resp != null && typeof msg.resp === 'string' ? t.youWrote(msg.resp.replace(/^-/, '−')) : null };
    default: return null;
  }
}

/** The line under a step's title: its own `sub`, else what to do with this kind of input. */
export function subOf(step, lang) {
  const own = txt(step, 'sub', lang);
  if (own) return own;
  const t = words(lang);
  if (step.input.type === 'tap') return (step.input.answer || []).length > 1 ? t.subs.tapMany : t.subs.tap;
  return t.subs[step.input.type] || '';
}
