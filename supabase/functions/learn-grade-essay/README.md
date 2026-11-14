# learn-grade-essay: the AI marker for timed writing

Marks one essay a student has handed in and writes the mark into `learn_essays` itself,
with the service role, so the browser never decides a score. Brought over from the
Dashboard's grader (`Y8Science-Backend/api/gradeEssay.js`) on 14 November 2026, with the
GED rubric replaced by a general English one.

| File | What |
|---|---|
| `index.ts` | The function: who may call it, limits, classmates' essays, the Gemini call, saving the mark |
| `rubric.js` | What the marker is told: three parts 0-4 (ideas, organisation, language), the prompt, the answer's shape |
| `marking.js` | The rules around the model, shared with the site's demo marker (`src/lib/essays.js`) and `tests/essays.test.mjs` |

`POST { "essay_id": "…" }` returns the essay row, now `marked`. Only the student who
wrote it can call it. Limits: 8 essays marked a day for each student, 4 tries for each
essay. When Gemini fails, the essay is set to `error` and the student can try again.

The rules in `marking.js`: fewer than 50 words, or half copied from the task, is not
marked; under the task's word count, ideas and organisation are at most 2; too few
paragraphs, organisation at most 2; 3 mistakes in every 100 words (or 10 in all),
language at most 2, and 6 in every 100, at most 1. Each correction is kept only if its
quote is really in the essay. Writing that matches a classmate's essay on the same task
by 30% or more is flagged for the teacher; it is not capped.

## Before deploying

`supabase/learn-essays.sql` must have been run (it makes `learn_essays`).

## Deploy (Bowen)

1. Supabase dashboard > Edge Functions > Secrets: add `GEMINI_API_KEY` (the same key
   as the Y8 Science backend's on Vercel, or a new one). `GEMINI_MODEL` is optional; the
   default is `gemini-3.6-flash`, as the Dashboard used.
2. Edge Functions > Deploy a new function > `learn-grade-essay`, pasting `index.ts`,
   `rubric.js` and `marking.js` (or `supabase functions deploy learn-grade-essay`).
3. **Verify JWT off**, as for `learn-accounts`: the project signs logins with ES256 keys
   and the legacy check refuses every caller. The function checks the caller itself.

Nothing is logged but the essay id and its mark.
