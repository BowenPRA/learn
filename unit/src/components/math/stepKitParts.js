// The non-component helpers of StepKit.jsx (kept apart so that file exports components only).

/** Split a task message into the note about the last step and the feedback on this one. */
export function msgParts(msg, lang) {
  if (!msg) return { prev: null, now: null };
  const text = lang === 'fr' ? (msg.fr || msg.en) : lang === 'vn' ? (msg.vn || msg.en) : msg.en;
  if (!text) return { prev: null, now: null };
  if (msg.tone === 'ok' || msg.tone === 'shown') return { prev: { tone: msg.tone, text }, now: null };
  return { prev: null, now: { tone: msg.tone === 'info' || msg.tone === 'nudge' ? 'info' : 'bad', text } };
}

/** The steps of an item as StepKit's Stepper wants them: done before `at`, now at `at`, to do after. */
export const stepsOf = (keys, at, labels) => keys.map((key, k) => ({ key, label: labels[key] || key, state: k < at ? 'done' : k === at ? 'now' : 'todo' }));
