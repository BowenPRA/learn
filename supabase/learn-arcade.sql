-- PRA Learn arcade: the gold a student has spent, their best score on each game level,
-- and the leaderboard (unit/app/Arcade.jsx, src/lib/arcade.js). Run in The Current's
-- Supabase project (SQL editor), after supabase/learn-schema.sql. Safe to run again.
--
-- Gold EARNED is not stored: it is the XP a student holds in their units (one coin an
-- XP), which the site works out from learn_unit_progress. Only what was SPENT is kept,
-- one number a student. A game's raw score is kept as the best so far for that level
-- and game; it is never XP.
--
-- Students write only through the functions below, their own rows. The leaderboard
-- function shows the top scores of the caller's own year group, by the name on the
-- login card (nickname, else first name), to a signed-in student or to staff; nobody
-- else gets a row.

create table if not exists learn_arcade_wallet (
  student_id uuid primary key references adm_students(id) on delete cascade,
  spent integer not null default 0 check (spent >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists learn_arcade_scores (
  student_id uuid not null references adm_students(id) on delete cascade,
  level text not null check (level ~ '^[A-Za-z0-9_]{1,40}$'),   -- the arcade level's id
  game text not null check (game in ('td', 'survivor')),         -- Tower Defense, Swarm Survivor
  best integer not null default 0 check (best >= 0),
  plays integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (student_id, level, game)
);
create index if not exists learn_arcade_scores_board on learn_arcade_scores (level, game, best desc);

alter table learn_arcade_wallet enable row level security;
alter table learn_arcade_scores enable row level security;
revoke all on learn_arcade_wallet, learn_arcade_scores from public, anon, authenticated;
grant select on learn_arcade_wallet, learn_arcade_scores to authenticated;

drop policy if exists own_read on learn_arcade_wallet;
create policy own_read on learn_arcade_wallet for select to authenticated using (student_id = learn_me());
drop policy if exists own_read on learn_arcade_scores;
create policy own_read on learn_arcade_scores for select to authenticated using (student_id = learn_me());

-- Pay for one play. Returns the gold spent so far; null for a staff login.
create or replace function learn_arcade_spend(p_cost integer) returns integer
language plpgsql security definer set search_path = public as $$
declare
  me uuid := learn_me();
  total integer;
begin
  if me is null then return null; end if;
  if p_cost is null or p_cost < 1 or p_cost > 100 then raise exception 'Not a price: %', p_cost; end if;
  insert into learn_arcade_wallet as w (student_id, spent) values (me, p_cost)
  on conflict (student_id) do update set spent = w.spent + p_cost, updated_at = now()
  returning spent into total;
  return total;
end $$;

-- Bank the score of a finished run. Returns the best so far; null for a staff login.
create or replace function learn_arcade_score(p_level text, p_game text, p_score integer) returns integer
language plpgsql security definer set search_path = public as $$
declare
  me uuid := learn_me();
  top integer;
begin
  if me is null then return null; end if;
  if p_level is null or p_level !~ '^[A-Za-z0-9_]{1,40}$' then raise exception 'Not a level: %', p_level; end if;
  if p_game is null or p_game not in ('td', 'survivor') then raise exception 'Not a game: %', p_game; end if;
  if p_score is null or p_score < 0 or p_score > 100000000 then raise exception 'Not a score: %', p_score; end if;
  insert into learn_arcade_scores as s (student_id, level, game, best, plays) values (me, p_level, p_game, p_score, 1)
  on conflict (student_id, level, game) do update set best = greatest(s.best, p_score), plays = s.plays + 1, updated_at = now()
  returning best into top;
  return top;
end $$;

-- The leaderboard of one level and game: the ten best of the caller's year group
-- (office and teachers on the Teachers page: of everyone), each student once, by the
-- name on their login card. Any other login gets no rows.
create or replace function learn_arcade_board(p_level text, p_game text)
returns table (id uuid, name text, score integer)
language sql stable security definer set search_path = public as $$
  select s.id, learn_display_name(s.nickname, s.first_name, s.full_name), g.best
    from learn_arcade_scores g
    join adm_students s on s.id = g.student_id
    join learn_accounts a on a.student_id = s.id and a.active
   where g.level = p_level and g.game = p_game and g.best > 0
     and coalesce(s.status, case when s.active is false then 'inactive' else 'active' end) <> 'inactive'
     and (learn_is_operator()
          or (learn_staff_login() and exists (
                select 1 from adm_teachers t where lower(t.email) = adm_email() and coalesce(t.active, true)))
          or (learn_me() is not null and s.level = (select m.level from adm_students m where m.id = learn_me())))
   order by g.best desc, g.updated_at
   limit 10
$$;

revoke all on function learn_arcade_spend(integer) from public, anon;
revoke all on function learn_arcade_score(text, text, integer) from public, anon;
revoke all on function learn_arcade_board(text, text) from public, anon;
grant execute on function learn_arcade_spend(integer) to authenticated, service_role;
grant execute on function learn_arcade_score(text, text, integer) to authenticated, service_role;
grant execute on function learn_arcade_board(text, text) to authenticated, service_role;
