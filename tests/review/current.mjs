// Loads The Current's real SQL files (C:\Users\sbowe\admin\supabase) into PGlite, in the
// order of supabase/README.md, on top of stand-ins for Supabase (roles, default grants,
// auth.jwt(), storage). Used by the hardening, learn and enrollment-guard reviews.
import { readFileSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto'

const DIR = 'C:/Users/sbowe/admin/supabase/'
// Live database on 5 Nov 2026: everything through 27 Oct (incidents and lessons not run).
export const LIVE_FILES = [
  'schema.sql', 'reports.sql', 'updates-2026-09-14.sql', 'updates-2026-09-15.sql', 'updates-2026-09-15-legal-names.sql',
  'updates-2026-09-15-report-tiers.sql', 'updates-2026-09-16-pending.sql', 'updates-2026-09-17.sql',
  'updates-2026-09-21-early-years.sql', 'updates-2026-09-21-receipt-proof.sql', 'updates-2026-09-22-no-excused.sql',
  'updates-2026-09-22-partial-day.sql', 'updates-2026-09-22-private-photos.sql', 'updates-2026-09-28-event-photos.sql',
  'updates-2026-09-28-event-photos-website.sql', 'updates-2026-09-29-facebook.sql', 'updates-2026-09-30-leads.sql',
  'updates-2026-09-30-website-forms.sql', 'updates-2026-09-30-enrollments.sql', 'updates-2026-10-01-enrollment-fix.sql',
  'updates-2026-10-01-enrollment-schools-documents.sql', 'updates-2026-10-01-receipt-numbers.sql', 'updates-2026-10-01-todos.sql',
  'updates-2026-10-01-todo-delete.sql', 'updates-2026-10-01-travel.sql', 'updates-2026-10-02-master-minds-movement.sql',
  'updates-2026-10-02-student-dates-onboarding.sql', 'updates-2026-10-05-enrollment-documents-office.sql',
  'updates-2026-10-15-parent-groups.sql', 'updates-2026-10-16-newsletter.sql', 'updates-2026-10-19-drive-docs.sql',
  'updates-2026-10-21-ecas.sql', 'updates-2026-10-22-ey-questions.sql', 'updates-2026-10-22-mail.sql',
  'updates-2026-10-23-report-send.sql', 'updates-2026-10-23-report-drafts.sql', 'updates-2026-10-23-signatures.sql',
  'updates-2026-10-26-report-sent.sql', 'updates-2026-10-26-trial-students.sql', 'updates-2026-10-27-upper-secondary.sql',
]
// Made after 30 October 2026: Supabase no longer grants new tables by itself.
export const LATER_FILES = ['updates-2026-11-03-incidents.sql', 'updates-2026-11-05-lessons.sql']

export const STUBS = `
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
grant usage on schema public to anon, authenticated, service_role;
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;

create schema auth;
grant usage on schema auth to anon, authenticated, service_role;
create table auth.users (id uuid primary key, email text, last_sign_in_at timestamptz, raw_app_meta_data jsonb default '{}'::jsonb);
create function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
create function auth.uid() returns uuid language sql stable as $$ select nullif(auth.jwt() ->> 'sub', '')::uuid $$;
create function auth.role() returns text language sql stable as $$ select auth.jwt() ->> 'role' $$;
create function auth.email() returns text language sql stable as $$ select auth.jwt() ->> 'email' $$;
grant execute on all functions in schema auth to anon, authenticated, service_role;

create schema storage;
grant usage on schema storage to anon, authenticated, service_role;
create table storage.buckets (id text primary key, name text, owner uuid, public boolean default false,
  file_size_limit bigint, allowed_mime_types text[], created_at timestamptz default now(), updated_at timestamptz default now());
create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text references storage.buckets(id),
  name text, owner uuid default nullif(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub', '')::uuid,
  created_at timestamptz default now(), updated_at timestamptz default now(), metadata jsonb, unique (bucket_id, name));
alter table storage.objects enable row level security;
alter table storage.buckets enable row level security;
grant all on storage.objects, storage.buckets to anon, authenticated, service_role;
create function storage.foldername(name text) returns text[] language sql immutable as $$
  select (string_to_array(name, '/'))[1:array_length(string_to_array(name, '/'), 1) - 1] $$;
create function storage.filename(name text) returns text language sql immutable as $$
  select (string_to_array(name, '/'))[array_length(string_to_array(name, '/'), 1)] $$;
grant execute on all functions in schema storage to anon, authenticated, service_role;
`

export const read = (f) => readFileSync(f.includes(':') ? f : DIR + f, 'utf8')

/** A fresh database with The Current loaded. `later`: also the incidents and lessons files. */
export async function makeDb({ later = false, quiet = true } = {}) {
  const db = new PGlite({ extensions: { pgcrypto } })
  await db.exec(STUBS)
  const files = later ? [...LIVE_FILES, ...LATER_FILES] : LIVE_FILES
  for (const f of files) {
    if (LATER_FILES.includes(f)) {
      await db.exec(`alter default privileges in schema public revoke all on tables from anon, authenticated, service_role;
                     alter default privileges in schema public revoke all on sequences from anon, authenticated, service_role;`)
    }
    try {
      await db.exec(read(f))
    } catch (e) {
      throw new Error(`${f}: ${e.message}`)
    }
    if (!quiet) console.log('loaded', f)
  }
  return db
}

/** Run `sql` as someone: claims = { email, app_metadata, sub } or null for anon. Rolled back. */
export async function as(db, claims, sql, params = []) {
  await db.exec('begin')
  try {
    const c = claims ? { role: 'authenticated', sub: claims.sub || '00000000-0000-4000-8000-0000000000aa', ...claims } : { role: 'anon' }
    await db.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify(c)])
    await db.exec(`set local role ${claims ? 'authenticated' : 'anon'}`)
    const res = await db.query(sql, params)
    return { ok: true, rows: res.rows, n: res.affectedRows ?? res.rows.length }
  } catch (e) {
    return { ok: false, err: e.message }
  } finally {
    await db.exec('rollback')
  }
}
