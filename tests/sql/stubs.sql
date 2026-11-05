-- Stand-ins for Supabase (roles, auth, storage, default grants) and for the part of
-- The Current that PRA Learn touches, so the SQL can be tested in PGlite.
-- The adm_* helpers and policies are copied from C:\Users\sbowe\admin\supabase
-- (reports.sql, updates-2026-09-15.sql) as they stand on 5 November 2026.

create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
grant usage on schema public to anon, authenticated, service_role;
-- Supabase gives anon, authenticated and service_role everything on new tables and
-- functions in public; row level security and explicit revokes are the real gate.
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;

create schema auth;
grant usage on schema auth to anon, authenticated, service_role;
create table auth.users (
  id uuid primary key,
  email text,
  last_sign_in_at timestamptz,
  raw_app_meta_data jsonb default '{}'::jsonb
);
create function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb
$$;
create function auth.uid() returns uuid language sql stable as $$
  select nullif(auth.jwt() ->> 'sub', '')::uuid
$$;
grant execute on function auth.jwt(), auth.uid() to anon, authenticated, service_role;

create schema storage;
grant usage on schema storage to anon, authenticated, service_role;
create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text, name text, owner uuid);
alter table storage.objects enable row level security;
grant select, insert, update, delete on storage.objects to authenticated, service_role;
create function storage.foldername(name text) returns text[] language sql immutable as $$
  select (string_to_array(name, '/'))[1:array_length(string_to_array(name, '/'), 1) - 1]
$$;
grant execute on function storage.foldername(text) to anon, authenticated, service_role;

-- The Current (only the columns PRA Learn reads)
create table adm_students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  nickname text,
  first_name text,
  level text,
  status text default 'pending' check (status in ('active', 'pending', 'inactive')),
  active boolean default true,
  dob date,
  parents_email text,
  allergies text
);
create table adm_teachers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  title text,
  role text default 'teacher',
  subjects text[] default '{}',
  homeroom_groups text[] default '{}',
  active boolean default true
);

create or replace function adm_role() returns text
language sql stable as $$ select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') $$;
create or replace function adm_email() returns text
language sql stable as $$ select lower(coalesce(auth.jwt() ->> 'email', '')) $$;
create or replace function adm_is_staff() returns boolean
language sql stable as $$ select adm_role() in ('super_admin', 'head', 'admin') $$;
create or replace function adm_is_head() returns boolean
language sql stable security definer set search_path = public as $$
  select adm_role() in ('super_admin', 'head')
      or exists (select 1 from adm_teachers t where t.email = adm_email() and t.role = 'head' and coalesce(t.active, true))
$$;
create or replace function adm_is_report_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select adm_is_staff() or adm_is_head()
      or exists (select 1 from adm_teachers t where t.email = adm_email() and coalesce(t.active, true))
$$;
create or replace function adm_can_homeroom(yg text) returns boolean
language sql stable security definer set search_path = public as $$
  select adm_is_head()
      or exists (select 1 from adm_teachers t where t.email = adm_email() and coalesce(t.active, true)
                 and (yg = any(t.homeroom_groups) or '*' = any(t.homeroom_groups)))
$$;
create or replace function adm_can_subject(sk text, yg text) returns boolean
language sql stable security definer set search_path = public as $$
  select adm_is_head()
      or exists (select 1 from adm_teachers t where t.email = adm_email() and coalesce(t.active, true)
                 and (sk || ':' || yg) = any(t.subjects))
$$;
create or replace function adm_can_attendance(yg text) returns boolean
language sql stable security definer set search_path = public as $$
  select adm_is_staff() or adm_can_homeroom(yg)
      or exists (select 1 from adm_teachers t where t.email = adm_email() and coalesce(t.active, true)
                 and exists (select 1 from unnest(t.subjects) k where k like '%:' || yg))
$$;

alter table adm_students enable row level security;
alter table adm_teachers enable row level security;
create policy report_read on adm_students for select to authenticated using (adm_is_report_staff());
create policy office_update on adm_students for update to authenticated using (adm_is_staff() or adm_is_head()) with check (adm_is_staff() or adm_is_head());
create policy staff_read on adm_teachers for select to authenticated using (true);
create policy head_update on adm_teachers for update to authenticated using (adm_is_head()) with check (adm_is_head());
