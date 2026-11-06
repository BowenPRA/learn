// PRA Learn logins (learn.pra.edu.vn). Makes student logins for a class,
// resets the secret code, blocks and unblocks a login. Student logins can only be made with the
// service role, which must never reach a browser, so it is done here.
//
// Who may call: someone signed in to The Current or PRA Learn who is office, a head
// teacher, or a teacher of that class (for reset / disable / enable: of a class in the
// student's year group). The function asks the database AS THE CALLER
// (learn_can_manage_class / learn_can_manage_student in supabase/learn-schema.sql), so
// the rule is the same SQL the row level security uses. Deployed with Verify JWT off:
// it checks every caller itself.
//
// Logins work like the old Dashboard's (Bowen, 6 November 2026): the login name is the
// student's nickname folded to plain letters (lib.js foldName), the secret code is
// their student number padded to 3 digits (S0024 -> 024). The reply still calls the
// code `pin`, so The Current and PRA Learn print it without changes.
//
// POST { action: 'make', class_key: 'math:Year 5', student_ids?: [uuid] }
//   -> { made: [{ student_id, name, username, pin }], failed: [{ student_id, name, reason }] }
// POST { action: 'reset', student_id }    -> { student_id, username, pin, signed_out, sessions_ended }
//   sets the secret code back to the student number (after a mistake) and signs the
//   login out on every device (learn_end_sessions).
// POST { action: 'disable', student_id }  -> { student_id, active: false, signed_out, sessions_ended }
//   blocks the login and signs it out on every device. If the sign-out fails,
//   signed_out is false and a `warning` says what to do.
// POST { action: 'enable', student_id }   -> { student_id, active: true }
//
// Codes are returned for the login cards and never logged.
// Secrets: none of its own. SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and
// SUPABASE_ANON_KEY are set by Supabase for every function. Setup: README.md here.

import { createClient } from 'npm:@supabase/supabase-js@2'
import {
  MAX_MAKE, Problem, USERNAME_RE, codeFor, corsFor, loginEmail, parseRequest, passwordFor, toMake, usernameFor,
} from './lib.js'

type Student = { student_id: string, name: string, username: string | null, active: boolean | null }
type Roster = { id: string, nickname: string | null, first_name: string | null, full_name: string | null, student_code: string | null }

Deno.serve(async (req) => {
  const cors = corsFor(req.headers.get('origin') || '')
  const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    if (req.method !== 'POST') throw new Problem('Use POST.', 405)
    const url = Deno.env.get('SUPABASE_URL')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const anonKey = req.headers.get('apikey') || Deno.env.get('SUPABASE_ANON_KEY') || ''
    const jwt = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '')
    if (!jwt) throw new Problem('Sign in first.', 401)

    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })
    const { data: who, error: whoError } = await admin.auth.getUser(jwt)
    if (whoError || !who?.user) throw new Problem('Sign in first.', 401)
    // The caller's own client: every permission question is asked as them.
    const caller = createClient(url, anonKey, { global: { headers: { Authorization: `Bearer ${jwt}` } }, auth: { persistSession: false } })
    const ask = async (fn: string, args: Record<string, unknown>) => {
      const { data, error } = await caller.rpc(fn, args)
      if (error) throw new Problem(`Could not check your account: ${error.message}`, 500)
      return data
    }

    const body = parseRequest(await req.json().catch(() => ({})))
    const by = String(await ask('learn_who', {}) || 'PRA')

    if (body.action === 'make') {
      if (await ask('learn_can_manage_class', { p_class: body.classKey }) !== true) {
        throw new Problem('Only office, a head teacher or a teacher of this class can make its logins.', 403)
      }
      const { data: students, error } = await admin.rpc('learn_class_students', { p_class: body.classKey })
      if (error) throw new Problem(`Could not read the class: ${error.message}`, 500)
      const todo = toMake((students || []) as Student[], body.studentIds)
      if (todo.length > MAX_MAKE) throw new Problem(`At most ${MAX_MAKE} logins at a time; pick some students.`)
      const { data: names, error: namesError } = await admin.from('learn_accounts').select('username')
      if (namesError) throw new Problem(`Could not read the login names: ${namesError.message}`, 500)
      const taken = new Set<string>((names || []).map((r: { username: string }) => r.username))
      const roster = new Map<string, Roster>()
      if (todo.length) {
        const { data: rows, error: rosterError } = await admin.from('adm_students')
          .select('id, nickname, first_name, full_name, student_code').in('id', todo.map((s) => s.student_id))
        if (rosterError) throw new Problem(`Could not read the students: ${rosterError.message}`, 500)
        for (const r of (rows || []) as Roster[]) roster.set(r.id, r)
      }

      const made: unknown[] = []
      const failed: unknown[] = []
      for (const s of todo) {
        const r = roster.get(s.student_id)
        const username = usernameFor(r)
        const pin = codeFor(r?.student_code)
        const fail = (reason: string) => failed.push({ student_id: s.student_id, name: s.name, reason })
        if (!USERNAME_RE.test(username)) { fail('No nickname that works as a login name. Add a nickname in The Current (Students), then try again.'); continue }
        if (!pin) { fail('No student number to make the secret code from. Check the student ID in The Current.'); continue }
        if (taken.has(username)) { fail(`"${username}" is already another student's login name. Give one of them a different nickname in The Current, then try again.`); continue }
        const { data: created, error: createError } = await admin.auth.admin.createUser({
          email: loginEmail(username),
          password: passwordFor(pin),
          email_confirm: true,                                     // no email is sent
          app_metadata: { role: 'student', student_id: s.student_id },
        })
        if (createError || !created?.user) {
          const reason = createError?.message || 'no user came back'
          if (!/already|exists|registered/i.test(reason)) { fail(reason); continue }
          // The address exists. If it is this student's login (another Make logins
          // call made it a moment ago), that is not a failure.
          const { data: mine } = await admin.from('learn_accounts').select('student_id').eq('username', username).maybeSingle()
          if (mine?.student_id === s.student_id) continue
          fail(`"${username}" is already a login name. Give the student a different nickname in The Current, then try again.`)
          continue
        }
        const { error: rowError } = await admin.from('learn_accounts').insert({
          user_id: created.user.id, student_id: s.student_id, username, created_by: by, pin_set_by: by,
        })
        if (rowError) {
          await admin.auth.admin.deleteUser(created.user.id)        // leave no login without its row
          // 23505 = already there. A call running at the same moment made this student's
          // login first (its cards have the code): not a failure.
          if (rowError.code === '23505' && /student_id/.test(rowError.message)) continue
          fail(rowError.code === '23505' ? `"${username}" is already another student's login name.` : rowError.message)
          continue
        }
        taken.add(username)
        made.push({ student_id: s.student_id, name: s.name, username, pin })
      }
      console.log(`learn-accounts make: ${made.length} made, ${failed.length} failed`)
      return reply({ made, failed })
    }

    // reset, disable, enable: one student who already has a login
    if (await ask('learn_can_manage_student', { p_student: body.studentId }) !== true) {
      throw new Problem('Only office, a head teacher or one of this student\'s teachers can change their login.', 403)
    }
    const { data: acc, error: accError } = await admin.from('learn_accounts')
      .select('user_id, username').eq('student_id', body.studentId).maybeSingle()
    if (accError) throw new Problem(`Could not read the login: ${accError.message}`, 500)
    if (!acc) throw new Problem('This student has no login yet. Make one first.', 404)

    // Sign the login out on every device already signed in (learn_end_sessions in
    // learn-schema.sql, service role only: it deletes the login's sessions and refresh
    // tokens). A failure here does not undo the code or the block; the reply says so.
    const endSessions = async () => {
      const { data, error } = await admin.rpc('learn_end_sessions', { p_user: acc.user_id })
      if (error) {
        console.log(`learn-accounts ${body.action}: sign-out failed`)
        return { signed_out: false, sessions_ended: 0 }
      }
      return { signed_out: true, sessions_ended: Number(data) || 0 }
    }

    if (body.action === 'reset') {
      const { data: row, error: e0 } = await admin.from('adm_students').select('student_code').eq('id', body.studentId).maybeSingle()
      if (e0) throw new Problem(`Could not read the student: ${e0.message}`, 500)
      const pin = codeFor(row?.student_code)
      if (!pin) throw new Problem('No student number to make the secret code from. Check the student ID in The Current.')
      const { error: e1 } = await admin.auth.admin.updateUserById(acc.user_id, { password: passwordFor(pin) })
      if (e1) throw new Problem(`Could not set the secret code: ${e1.message}`, 500)
      const { error: e2 } = await admin.from('learn_accounts')
        .update({ pin_set_at: new Date().toISOString(), pin_set_by: by, updated_at: new Date().toISOString() })
        .eq('student_id', body.studentId)
      if (e2) throw new Problem(`The code was set but not noted: ${e2.message}`, 500)
      const out = await endSessions()
      console.log(`learn-accounts reset: 1, sessions ended: ${out.sessions_ended}`)
      return reply({
        student_id: body.studentId, username: acc.username, pin, ...out,
        ...(out.signed_out ? {} : { warning: 'The secret code is set, but devices already signed in were not signed out. Try Reset code again.' }),
      })
    }

    const active = body.action === 'enable'
    // A blocked login cannot sign in or refresh; row level security also checks
    // learn_accounts.active, so its access to packs and progress stops at once.
    const { error: e3 } = await admin.auth.admin.updateUserById(acc.user_id, { ban_duration: active ? 'none' : '876000h' })
    if (e3) throw new Problem(`Could not ${active ? 'unblock' : 'block'} the login: ${e3.message}`, 500)
    const { error: e4 } = await admin.from('learn_accounts')
      .update({ active, updated_at: new Date().toISOString() }).eq('student_id', body.studentId)
    if (e4) throw new Problem(`The login changed but was not noted: ${e4.message}`, 500)
    if (active) {
      console.log('learn-accounts enable: 1')
      return reply({ student_id: body.studentId, active })
    }
    // Disable: also end the open sessions, so enabling the login later does not let an
    // old device back in.
    const out = await endSessions()
    console.log(`learn-accounts disable: 1, sessions ended: ${out.sessions_ended}`)
    return reply({
      student_id: body.studentId, active, ...out,
      ...(out.signed_out ? {} : { warning: 'Blocked, but devices already signed in were not signed out: they could get back in if this login is enabled again. Try Disable again.' }),
    })
  } catch (e) {
    const status = e instanceof Problem ? e.status : 500
    return reply({ error: e instanceof Error ? e.message : String(e) }, status)
  }
})
