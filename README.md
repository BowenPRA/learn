# PRA Learn

The student and teacher portal of Palm River Academy, an English language center
in Hội An: **learn.pra.edu.vn**. Students sign in with their name and a 3-digit
secret code from a login card, go back through a lesson's slides answering check questions,
and work through step-by-step practice. Teachers see who did what and which
questions most of the class missed. Lesson packs made from the Lessons tab in The
Current (current.pra.edu.vn) are published here as data, with no deploy; the classroom
decks and units in this repo reach students with the next `npm run deploy`.

The design, the security audit of The Current's database and the steps to go live
are in [docs/DESIGN.md](docs/DESIGN.md). What exists, one line per feature: [docs/FEATURES.md](docs/FEATURES.md). What is shared with The Current: [docs/THE-CURRENT.md](docs/THE-CURRENT.md). [PROGRESS.md](PROGRESS.md) is the build diary of 5 November 2026.

## Run it

```
npm install
npm run dev          # http://localhost:5201/  (demo mode: sample data, no login needed)
```

Without a `.env` the portal runs in **demo mode**: a made-up Year 5 class ("Learner
A" to "Learner L"), Mr. David as the teacher, and four Year 5 Maths lesson packs on
negative numbers (one of them a draft). "Try as a student" / "Try as Mr. David" on the
sign-in page. The demo student signs in as `Learner A`, secret code `901`. Nothing leaves the browser.
With The Current's Supabase settings in `.env` (see `.env.example`) it talks to the
real database; `?demo` in the address still opens the demo.

## Check it

```
npm run lint
npm test                                  # database (PGlite), login function, pack format
npm run build
node scripts/demo-flow.mjs [outDir]       # walks the demo in headless Chrome (dev server running)
node scripts/shots.mjs [outDir]           # screenshots of every page at 1280x800 and 390x844
npm run check:pack <pack.json>            # before publishing a lesson pack
```

## What is where

| Path | What |
|---|---|
| `supabase/current-hardening.sql` | Run first, once, in The Current's project: student logins can never pass a staff check |
| `supabase/learn-schema.sql` | The portal's tables, rules and functions (`learn_*`), with a self-test that rolls back |
| `supabase/functions/learn-accounts/` | Edge Function: make logins for a class, reset a login's secret code, block a login |
| `src/pack/` | The lesson pack: validator, slide layouts, check questions, SVG cleaning |
| `src/stepPractice/` | The step-practice engine, copied from the Dashboard (see `SOURCE.md` there) |
| `src/pages/` | Sign-in, student home, lesson, review, practice, results, classes, class page, login cards |
| `src/lib/live.js`, `src/lib/demo/` | The real backend and the demo one (same methods) |
| `tests/` | `node --test`: the SQL in PGlite with stand-ins for Supabase and The Current |

Nothing in this repository may name a student or show a photo: it is a public
GitHub Pages site. Student data reaches the portal only from the database,
after sign-in. `public/CNAME` and `base: '/'` in `vite.config.js` belong together.
