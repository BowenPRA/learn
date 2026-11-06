# learn-accounts: student logins for PRA Learn

Makes student logins for a class, resets a PIN, blocks and unblocks a login. It
runs in The Current's Supabase project because only the service role can make a
login, and that key must never reach a browser. **Not deployed yet.**

Who may call it: someone signed in (The Current or PRA Learn) who is office, a head
teacher, or a teacher of that class. It asks the database as the caller
(`learn_can_manage_class`, `learn_can_manage_student`), so the rule is the same SQL
as the row level security. Anyone else gets 403.

| Body | Returns |
|---|---|
| `{ "action": "make", "class_key": "math:Year 5" }` | `{ made: [{ student_id, name, username, pin }], failed: [...] }`: logins for every enrolled student of the class who has none |
| `{ "action": "make", "class_key": "math:Year 5", "student_ids": ["…"] }` | the same, for the listed students only (at most 60) |
| `{ "action": "reset", "student_id": "…" }` | `{ student_id, username, pin, signed_out, sessions_ended }`: a new PIN, same username; every device already signed in is signed out |
| `{ "action": "disable", "student_id": "…" }` | `{ student_id, active: false, signed_out, sessions_ended }`: blocked, signed out on every device, no access to packs at once |
| `{ "action": "enable", "student_id": "…" }` | `{ student_id, active: true }` |

PINs come back once, for the login cards. They are never stored readably and never
logged (the function logs counts only).

A login is `<username>@learn.pra.edu.vn` with the password `<PIN>-learn`,
`email_confirm: true` (no email is sent) and `app_metadata: { role: 'student',
student_id }`. No name is stored in the auth tables.

## Before deploying

`C:\Users\sbowe\learn\supabase\current-hardening.sql` and then
`C:\Users\sbowe\learn\supabase\learn-schema.sql` must have been run (the function
calls `learn_can_manage_class`, `learn_can_manage_student`, `learn_who` and
`learn_class_students`, and writes `learn_accounts`).

## Deploy (Bowen)

No secrets to add: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and
`SUPABASE_ANON_KEY` are given to every function by Supabase.

Either, in The Current's Supabase project:

1. **Edge Functions → Deploy a new function → Via Editor.** Name it exactly
   `learn-accounts`. Paste `index.ts`, then add a second file named `lib.js` and
   paste `lib.js` into it. Deploy.
2. Open the function's settings and turn **Verify JWT** off (it checks every caller
   itself, like The Current's other functions).

Or, from PowerShell, with the Supabase CLI logged in and linked to the project:

```
npx --prefix C:/Users/sbowe/learn supabase functions deploy learn-accounts --no-verify-jwt --workdir C:/Users/sbowe/learn
```

## Check

- Signed out: `POST` with no Authorization answers 401.
- Signed in as a student or a teacher of another class: 403.
- Signed in as Mr. David on PRA Learn, class Year 5 Maths → Make logins: the cards
  page shows a username and PIN per child. Sign in with one on another browser.

## Known limits (security review, 5 November 2026)

- **Signing out on reset and disable** (added 5 November 2026). Supabase's admin
  API can sign a user out only with that user's own token, which the function does
  not have. So after a reset or a disable the function calls `learn_end_sessions`
  (`learn-schema.sql`, section 9; service role only, student logins only), which
  deletes the login's rows in `auth.refresh_tokens` and `auth.sessions`. The device
  can no longer refresh. The access token it already holds keeps working until it
  expires (one hour by default): after a **reset** the old device can still open
  packs for up to that hour; after a **disable**, `learn_accounts.active` shuts it
  out at once. **enable** no longer lets an old device back in, because disable
  ended its sessions.
- If that step fails (for example Supabase refuses the delete), the PIN or the
  block still stands and the reply has `signed_out: false` and a `warning`; the
  portal should show the warning. Pressing the button again retries.
- Assumption about Supabase's auth schema: `auth.sessions(id uuid, user_id uuid)`,
  `auth.refresh_tokens(user_id varchar, session_id -> auth.sessions)`, and the
  `postgres` role (which owns functions made in the SQL Editor) may delete from
  both. Read-only check before deploying, in the SQL Editor:
  `select has_table_privilege('postgres', 'auth.sessions', 'DELETE'), has_table_privilege('postgres', 'auth.refresh_tokens', 'DELETE');`
  Both should say `true`. The last line `learn-schema.sql` prints also says whether
  both tables were found.
- Two `make` calls at the same moment for the same class give each child one login:
  the second call skips a child the first one finished (the first call's cards
  have that PIN).
- The function trusts the database's answer (`learn_can_manage_class`,
  `learn_can_manage_student`). A Teachers row typed with an outsider's address
  makes that outsider a teacher of those classes here too (DESIGN.md 6.2, #1).

The whole function runs in Node against the real schema in
`C:\Users\sbowe\learn\tests\review\fn\test-function.mjs` (see REVIEW-SECURITY.md).

## Changing it

The network-free parts (usernames, PINs, reading a request, CORS) are in `lib.js`,
tested by `C:\Users\sbowe\learn\tests\accounts.test.mjs` (`npm test`). PIN length is
`PIN_LENGTH` there. Allowed sites are `ORIGINS`.
