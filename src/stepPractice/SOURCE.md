# Where this folder comes from

`src/stepPractice/` and `src/utils/mathEquivalence.js` are copied unchanged from the
Dashboard's step-practice engine: branch `feat/step-practice`, commit **0c18ffb4**
(worktree C:\Users\sbowe\code\wt-steps; docs/step-practice.md section 1 there lists
the files). Copied with `git archive 0c18ffb4 src/stepPractice src/utils/mathEquivalence.js`.

Since then `check.js`, `model.js`, `progress.js` and `run.js` were copied again from the
same worktree's **uncommitted** changes of 2026-11-05 (slip keys and Show me counts in the
engine's report; docs/step-practice.md section 1, "What the host hears"). When that work is
committed on `feat/step-practice`, put its commit here.

Do not edit these files here. To take a later fix, copy the same paths again from
the newer commit and update the commit above. PRA Learn's own code around the engine
is `src/pages/PracticePlayer.jsx` (the host: language, saving, finishing).
