# Not moved yet

On 10 November 2026 the Year 7 Maths and Science decks, the deck player and the kit for
writing lessons (the playbook, the traps, the field reference, the `new-lesson` skill
and its check scripts) moved from BowenPRA/classroom into PRA Learn. New Year 7
lessons are written here from now on.

These parts of the old classroom repo did **not** move. Nothing in this repo depends on
them. The old repo is frozen at commit 50586cc and still has them, if one is wanted
later; bring a piece over only when Bowen asks for it.

| What | In the old repo | Why it is not here |
|---|---|---|
| Printed homework packets | `homework/<packet>/` (LaTeX to PDF, `hw-style.tex`), the `new-homework` skill, the `#/homework` shelf | PRA Learn has no homework shelf. The packets also hold Workbook-style questions that would need a copyright check before going into a public repo. A plan's `print` links have nothing to point at until this moves. |
| The weekly plan | `planning/<doc>/` (LaTeX, one page per teaching day and the Friday parent update), the `weekly-plan` skill | A printed document for Bowen, not part of the portal. |
| Games | the `games` course (`content/games/`: Word Wall, Jeopardy, `G03_which-is`, Around the World, Guess Who with its `src/guess-who/` app), the Year 7 Maths question bank in `content/banks/y7-math/` and `scripts/bank-check.mjs` that checks it | No Year 7 lesson imports a bank or a game from the games course. Games played inside a deck (a `layout: 'game'` slide) did move with their decks. |
| The games' phone screens and the remote as a home-screen app | `useGameRemote` and `src/remote/GamePanel.jsx`; the remote's manifest and icons in `public/remote/` | Go with the games. The phone remote itself works here, opened from the QR code each time. |
| Teacher courses | `docs/TEACHER-COURSES.md`, the "Teacher courses" section of `STANDARD.md`, `src/lib/storyCharacter.js`, the Year 5 Maths pilot (`content/y5-math/`) | Lessons for other teachers are being redesigned (Bowen, 10 November 2026). The Year 5 pilot deck is not in PRA Learn. |
| The Dashboard links | `meta.dashboard` and the "Self-study" link (`src/lib/dashboardLink.js`); the Dashboard twin rules (old playbook §9) | The classroom page passes no Dashboard link. Units in PRA Learn (`unit/README.md`) are a separate pilot, starting with 3.4 Tides. |
| The other courses | Freshman Mathematics, Coordinated Science, Year 5 Mathematics | Not Year 7. |
| Hosting on two accounts | `npm run deploy` publishing to BowenPRA and sbowen209, `git push` to both | PRA Learn deploys to one account: `npm run deploy` publishes to BowenPRA/learn. |
| The classroom site's own pages | home page, course pages, "recently opened" | PRA Learn's home pages list the lessons instead (`classroom/README.md`, "Where people find them"). |

The handouts folder (`handouts/unit-circle/`) and the old `PROGRESS.md` stayed behind too.
