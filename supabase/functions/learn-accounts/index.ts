// PRA Learn logins (learn.pra.edu.vn). NOT DEPLOYED. Makes student logins for a class,
// resets a PIN, blocks and unblocks a login. Student logins can only be made with the
// service role, which must never reach a browser, so it is done here.
//
// Who may call: someone signed in to The Current or PRA Learn who is office, a head
// teacher, or a teacher of that class (for reset / disable / enable: of a class in the
// student's year group). The function asks the database AS THE CALLER
// (learn_can_manage_class / learn_can_manage_student in supabase/learn-schema.sql), so
// the rule is the same SQL the row level security uses. Deployed with Verify JWT off:
// it checks every caller itself.
//
// POST { action: 'make', class_key: 'math:Year 5', student_ids?: [uuid] }
//   -> { made: [{ student_id, name, username, pin }], failed: [{ student_id, name, reason }] }
// POST { action: 'reset', student_id }    -> { student_id, username, pin, signed_out, sessions_ended }
// POST { action: 'disable', student_id }  -> { student_id, active: false, signed_out, sessions_ended }
//   reset and disable also sign the login out on every device (learn_end_sessions);
//   if that step fails, signed_out is false and a `warning` says what to do.
// POST { action: 'enable', student_id }   -> { student_id, active: true }
//
// PINs are returned once, for the login cards, and never stored readably or logged.
// Secrets: none of its own. SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and
// SUPABASE_ANON_KEY are set by Supabase for every function. Setup: README.md here.

import { createClient } from 'npm:@supabase/supabase-js@2'
import {
  MAX_MAKE, Problem, corsFor, loginEmail, makePin, makeUsername, parseRequest, passwordFor, toMake,
} from './lib.js'

type Student = { student_id: string, name: string, username: string | null, active: boolean | null }

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
      if (namesError) throw new Problem(`Could not read the usernames: ${namesError.message}`, 500)
      const taken = new Set<string>((names || []).map((r: { username: string }) => r.username))

      const made: unknown[] = []
      const failed: unknown[] = []
      for (const s of todo) {
        let done = false
        let already = false
        let reason = ''
        for (let attempt = 0; attempt < 5 && !done && !already; attempt += 1) {
          const username = makeUsername(taken)
          taken.add(username)
          const pin = makePin()
          const { data: created, error: createError } = await admin.auth.admin.createUser({
            email: loginEmail(username),
            password: passwordFor(pin),
            email_confirm: true,                                     // no email is sent
            app_metadata: { role: 'student', student_id: s.student_id },
          })
          if (createError || !created?.user) {
            reason = createError?.message || 'no user came back'
            if (/already|exists|registered/i.test(reason)) continue  // the address is taken: another username
            break
          }
          const { error: rowError } = await admin.from('learn_accounts').insert({
            user_id: created.user.id, student_id: s.student_id, username, created_by: by, pin_set_by: by,
          })
          if (rowError) {
            await admin.auth.admin.deleteUser(created.user.id)        // leave no login without its row
            // 23505 = already there. A call running at the same moment made this student's
            // login first (its cards have the PIN): not a failure. A username taken the
            // same way: try another.
            if (rowError.code === '23505' && /student_id/.test(rowError.message)) { already = true; break }
            if (rowError.code === '23505' && /username/.test(rowError.message)) { reason = 'username taken'; continue }
            reason = rowError.message
            break
          }
          made.push({ student_id: s.student_id, name: s.name, username, pin })
          done = true
        }
        if (!done && !already) failed.push({ student_id: s.student_id, name: s.name, reason })
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
    // tokens). A failure here does not undo the PIN or the block; the reply says so.
    const endSessions = async () => {
      const { data, error } = await admin.rpc('learn_end_sessions', { p_user: acc.user_id })
      if (error) {
        console.log(`learn-accounts ${body.action}: sign-out failed`)
        return { signed_out: false, sessions_ended: 0 }
      }
      return { signed_out: true, sessions_ended: Number(data) || 0 }
    }

    if (body.action === 'reset') {
      const pin = makePin()
      const { error: e1 } = await admin.auth.admin.updateUserById(acc.user_id, { password: passwordFor(pin) })
      if (e1) throw new Problem(`Could not set the new PIN: ${e1.message}`, 500)
      const { error: e2 } = await admin.from('learn_accounts')
        .update({ pin_set_at: new Date().toISOString(), pin_set_by: by, updated_at: new Date().toISOString() })
        .eq('student_id', body.studentId)
      if (e2) throw new Problem(`The PIN changed but was not noted: ${e2.message}`, 500)
      const out = await endSessions()
      console.log(`learn-accounts reset: 1, sessions ended: ${out.sessions_ended}`)
      return reply({
        student_id: body.studentId, username: acc.username, pin, ...out,
        ...(out.signed_out ? {} : { warning: 'The new PIN works, but devices already signed in were not signed out. Try Reset PIN again.' }),
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
