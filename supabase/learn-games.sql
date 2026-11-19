-- PRA Learn classroom games: the lists a game's host edits on screen (Guess the Teacher's
-- teachers and their emojis, classroom/content/games/G06_guess-the-teacher/). Run in The
-- Current's Supabase project (SQL editor), after supabase/learn-schema.sql. Safe to run
-- again.
--
-- One row a game. Staff read and write it, only through the two functions below: an
-- office or head login (the Office login admin@palmriveracademy.edu.vn among them), or
-- anyone on the Teachers page. Students never see it, and the players' phones have no
-- login at all, so a teacher's name reaches a phone only at the reveal, from the TV.

create table if not exists learn_game_sets (
  game text primary key check (game ~ '^[a-z0-9-]{1,40}$'),
  data jsonb not null check (jsonb_typeof(data) = 'object' and octet_length(data::text) < 200000),
  updated_at timestamptz not null default now(),
  updated_by text not null default ''
);

alter table learn_game_sets enable row level security;
revoke all on learn_game_sets from public, anon, authenticated;

-- Who may read and save a game's list.
create or replace function learn_game_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select learn_is_office() or (learn_staff_login() and exists (
    select 1 from adm_teachers t where lower(t.email) = adm_email() and coalesce(t.active, true)))
$$;

-- A game's list: { data, updated_at, updated_by }, or null (nothing saved yet, or not staff).
create or replace function learn_game_set(p_game text) returns jsonb
language sql stable security definer set search_path = public as $$
  select case when learn_game_staff() then (
    select jsonb_build_object('data', g.data, 'updated_at', g.updated_at, 'updated_by', g.updated_by)
      from learn_game_sets g where g.game = p_game)
  end
$$;

-- Save a game's list. Returns when it was saved.
create or replace function learn_save_game_set(p_game text, p_data jsonb) returns timestamptz
language plpgsql security definer set search_path = public as $$
declare
  saved timestamptz;
begin
  if not learn_game_staff() then raise exception 'Staff only'; end if;
  insert into learn_game_sets as g (game, data, updated_at, updated_by)
  values (p_game, p_data, now(), adm_email())
  on conflict (game) do update set data = excluded.data, updated_at = now(), updated_by = adm_email()
  returning g.updated_at into saved;
  return saved;
end $$;

revoke all on function learn_game_staff() from public, anon;
revoke all on function learn_game_set(text) from public, anon;
revoke all on function learn_save_game_set(text, jsonb) from public, anon;
grant execute on function learn_game_staff() to authenticated, service_role;
grant execute on function learn_game_set(text) to authenticated, service_role;
grant execute on function learn_save_game_set(text, jsonb) to authenticated, service_role;
