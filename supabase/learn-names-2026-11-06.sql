-- PRA Learn logins like the old Dashboard (Bowen, 6 November 2026).
-- The login name is now the student's nickname, folded to plain lower-case letters
-- and digits ('Goku' -> 'goku'), 2 to 20 of them, instead of a word and two digits.
-- The secret code is the student number padded to 3 digits; that lives in the
-- learn-accounts function, nothing to change here.
-- Run once in The Current's Supabase project > SQL Editor. Safe to run again.
-- learn-schema.sql already carries the same rule for a fresh install.

alter table public.learn_accounts drop constraint if exists learn_accounts_username_check;
alter table public.learn_accounts add constraint learn_accounts_username_check
  check (username ~ '^[a-z0-9]{2,20}$');

select 'Login names can now be nicknames. Logins so far: ' || count(*) as result
  from public.learn_accounts;
