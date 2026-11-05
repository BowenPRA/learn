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
| `{ "action": "reset", "student_id": "…" }` | `{ student_id, username, pin }`: a new PIN, same username |
| `{ "action": "disable", "student_id": "…" }` | `{ student_id, active: false }`: blocked, signed out at the next refresh, no access to packs at once |
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

## Changing it

The network-free parts (usernames, PINs, reading a request, CORS) are in `lib.js`,
tested by `C:\Users\sbowe\learn\tests\accounts.test.mjs` (`npm test`). PIN length is
`PIN_LENGTH` there. Allowed sites are `ORIGINS`.
