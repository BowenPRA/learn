# PRA Learn: progress

Started 2026-11-05 (Claude, while Bowen was away). Brief: design and start the student
and teacher portal at learn.pra.edu.vn as a new project. Local git only: no remote,
no push, no deploy, no SQL run, no Supabase/DNS/GitHub changes.

## Done (5 Nov 2026)
- [x] Read memory notes, The Current (auth, SQL, functions, Lessons SQL), Dashboard
      (login, Notes, checks), step engine branch, classroom schema, wt-portal notes.
- [x] Audit of every policy/function in C:\Users\sbowe\admin\supabase (subagent, key
      findings re-read in the files). DESIGN.md section 6.
- [x] docs/DESIGN.md: identity (The Current's project), student sign-in, security,
      pack format, progress, pages, hosting, phases, open decisions, Bowen's steps.
- [x] supabase/current-hardening.sql (adm_email() blank for students, teachers list
      staff-only, CHECK on adm_teachers.email, anon revokes; self-test).
- [x] supabase/learn-schema.sql (learn_accounts, learn_packs, learn_progress, bucket
      learn-packs, RLS, grants, RPCs incl. learn_request_results; self-test).
- [x] tests/pg.test.mjs (18 checks in PGlite; both self-tests run there too),
      tests/accounts.test.mjs (7), tests/pack.test.mjs (4).
- [x] supabase/functions/learn-accounts (index.ts + lib.js + README). Not deployed.
- [x] App: sign-in (student / staff), student home, pack page, review player, practice
      on the step engine (copied from feat/step-practice @ 0c18ffb4), my results,
      teacher classes, class page (open/hide/due, most missed, who did what, logins),
      login cards. EN/VI. Demo mode with the Year 5 Maths negatives pack.
- [x] lint, build, tests pass; screenshots of every page at 1280x800 and 390x844
      looked at and fixed (figures, phone header, pack cards, class page);
      scripts/demo-flow.mjs walks review + practice and checks what was saved.

## Left
- [ ] Bowen: DESIGN.md section 14 (roles query, hardening SQL, rate limit, schema SQL,
      deploy learn-accounts, repo + DNS + deploy, staff read of the Vietnamese).
- [ ] Operator script (pra-triage, another agent): validate with `npm run check:pack`,
      upsert learn_packs as the triage account, upload assets, write the links on the
      request (DESIGN.md 7.6). Not built here.
- [ ] The Current: "PRA Learn logins" panel on the class, results on the Lessons
      request (`learn_request_results`), Create login moved to an Edge Function, then
      sign-ups off (DESIGN.md 6.4).
- [ ] Step engine: report slip keys so practice misses name the misconception.
- [ ] A real Year 5 pack from the classroom deck on feat/y5-math-pilot (widgets ->
      images or checks) once that deck is finished.
- [ ] Slides draw `$…$` maths through the engine's KaTeX, but not `$$…$$` blocks.
