// learn-grade-essay: marks one essay a student has handed in (table learn_essays,
// supabase/learn-essays.sql) with Gemini, and writes the mark itself, so the browser
// never decides a score.
//
// POST { essay_id }  -> the essay row, now 'marked' (or 'error' with a reason)
//
// Who may call it: the student who wrote the essay, signed in to PRA Learn. Each student
// can have 8 essays marked in 24 hours; an essay is tried at most 4 times.
// Secrets: GEMINI_API_KEY (Bowen adds it: Edge Functions > Secrets). GEMINI_MODEL is
// optional. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set by Supabase.
// Setup: README.md here.

import { createClient } from 'npm:@supabase/supabase-js@2'
import { buildReport, measure } from './marking.js'
import { INJECTION_GUARD, SCHEMA, SYSTEM, promptFor } from './rubric.js'

const ORIGINS = ['https://learn.pra.edu.vn', 'http://localhost:5201', 'http://localhost:5173']
const DAILY = 8
const TRIES = 4
const MODEL = Deno.env.get('GEMINI_MODEL') || 'gemini-3.6-flash'

class Problem extends Error {
  status: number
  constructor(message: string, status = 400) { super(message); this.status = status }
}

const corsFor = (origin: string) => ({
  'Access-Control-Allow-Origin': ORIGINS.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin) ? origin : ORIGINS[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  Vary: 'Origin',
})

async function askGemini(prompt: string) {
  const key = Deno.env.get('GEMINI_API_KEY')
  if (!key) throw new Problem('Marking is not set up yet.', 503)
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: `${SYSTEM}\n\n${INJECTION_GUARD}` }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0, responseMimeType: 'application/json', responseSchema: SCHEMA },
    }),
  })
  if (!res.ok) throw new Problem(`The marker did not answer (${res.status}).`, 502)
  const out = await res.json()
  const text = out?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') || ''
  try { return JSON.parse(text) } catch {
    const a = text.indexOf('{'); const b = text.lastIndexOf('}')
    if (a < 0 || b < 0) throw new Problem('The marker gave no mark.', 502)
    return JSON.parse(text.slice(a, b + 1))
  }
}

Deno.serve(async (req) => {
  const cors = corsFor(req.headers.get('origin') || '')
  const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false, autoRefreshToken: false } })
  let essayId = ''
  try {
    if (req.method !== 'POST') throw new Problem('Use POST.', 405)
    const jwt = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '')
    if (!jwt) throw new Problem('Sign in first.', 401)
    const { data: who, error: whoError } = await admin.auth.getUser(jwt)
    const studentId = who?.user?.app_metadata?.student_id
    if (whoError || !who?.user || !studentId) throw new Problem('Only a student can hand in writing.', 401)

    const body = await req.json().catch(() => ({}))
    essayId = String(body?.essay_id || '')
    if (!/^[0-9a-f-]{36}$/i.test(essayId)) throw new Problem('No essay given.')

    const { data: essay, error } = await admin.from('learn_essays').select('*').eq('id', essayId).maybeSingle()
    if (error) throw new Problem(`Could not read the essay: ${error.message}`, 500)
    if (!essay || essay.student_id !== studentId) throw new Problem('Not your essay.', 403)
    if (essay.status === 'marked') return reply(essay)
    if (essay.status === 'draft') throw new Problem('Hand the essay in first.')
    if (essay.grade_tries >= TRIES) throw new Problem('This essay has been tried too many times. Ask your teacher.', 429)

    const since = new Date(Date.now() - 86400000).toISOString()
    const { count } = await admin.from('learn_essays').select('id', { count: 'exact', head: true })
      .eq('student_id', studentId).eq('status', 'marked').gte('marked_at', since)
    if ((count || 0) >= DAILY) throw new Problem(`You can have ${DAILY} pieces of writing marked in a day. Try again tomorrow.`, 429)

    await admin.from('learn_essays').update({ grade_tries: essay.grade_tries + 1 }).eq('id', essayId)

    // Classmates' essays on the same task, to flag writing that matches one of them.
    const { data: others } = await admin.from('learn_essays').select('body')
      .eq('class_key', essay.class_key).eq('unit_key', essay.unit_key).eq('prompt_id', essay.prompt_id)
      .neq('student_id', studentId).in('status', ['submitted', 'marked']).limit(80)
    const counts = measure(essay.body, essay.prompt, (others || []).map((o: { body: string }) => o.body))
    const ai = await askGemini(promptFor(essay.prompt, essay.body, counts, essay.minutes_allowed))
    const report = buildReport(ai, essay.body, essay.prompt, counts)

    const { data: done, error: saveError } = await admin.from('learn_essays').update({
      status: 'marked', report, score: report.total, marked_at: new Date().toISOString(), error: null, updated_at: new Date().toISOString(),
    }).eq('id', essayId).select('*').single()
    if (saveError) throw new Problem(`Could not save the mark: ${saveError.message}`, 500)
    console.log(`marked ${essayId}: ${report.total}/12`)
    return reply(done)
  } catch (e) {
    const status = e instanceof Problem ? e.status : 500
    const message = e instanceof Problem ? e.message : 'The marker is not working right now. Try again soon.'
    if (!(e instanceof Problem)) console.error(e)
    if (essayId && status >= 500) {
      await admin.from('learn_essays').update({ status: 'error', error: message, updated_at: new Date().toISOString() }).eq('id', essayId).eq('status', 'submitted')
    }
    return reply({ error: message }, status)
  }
})
