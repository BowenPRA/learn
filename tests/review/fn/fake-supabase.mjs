// A stand-in for @supabase/supabase-js, backed by PGlite, for running the real
// learn-accounts index.ts in Node. The service key gets service_role; any other key
// with an Authorization header runs as that caller (claims from a fake JWT).
export const state = { db: null, SERVICE: 'service-key', passwords: new Map(), bans: new Map(), lock: Promise.resolve() }

export const fakeJwt = (claims) => 'h.' + Buffer.from(JSON.stringify(claims)).toString('base64url') + '.s'
const decode = (jwt) => { try { return JSON.parse(Buffer.from(String(jwt).split('.')[1], 'base64url').toString()) } catch { return null } }

// PGlite has one connection: run each request's statements one at a time.
function serial(fn) {
  const next = state.lock.then(fn, fn)
  state.lock = next.catch(() => {})
  return next
}
async function run(claims, role, sql, params = []) {
  return serial(async () => {
    const db = state.db
    await db.exec('begin')
    try {
      await db.query(`select set_config('request.jwt.claims', $1, true)`, [claims ? JSON.stringify(claims) : ''])
      if (role) await db.exec(`set local role ${role}`)
      const r = await db.query(sql, params)
      await db.exec('commit')
      return { data: r.rows, error: null }
    } catch (e) {
      await db.exec('rollback')
      return { data: null, error: { message: e.message, code: e.code } }
    }
  })
}

function table(claims, role, name) {
  const where = []
  const params = []
  let op = 'select', cols = '*', body = null, single = false
  const q = {
    select(c = '*') { if (op === 'select') cols = c; return q },
    insert(row) { op = 'insert'; body = row; return q },
    update(row) { op = 'update'; body = row; return q },
    eq(col, v) { params.push(v); where.push(`${col} = $${params.length}`); return q },
    maybeSingle() { single = true; return q },
    then(res, rej) { return exec().then(res, rej) },
  }
  async function exec() {
    let sql
    if (op === 'select') sql = `select ${cols} from ${name}${where.length ? ' where ' + where.join(' and ') : ''}`
    if (op === 'insert') {
      const keys = Object.keys(body)
      const p = keys.map((k) => { params.push(body[k]); return `$${params.length}` })
      sql = `insert into ${name} (${keys.join(', ')}) values (${p.join(', ')})`
    }
    if (op === 'update') {
      const sets = Object.keys(body).map((k) => { params.push(body[k]); return `${k} = $${params.length}` })
      // the WHERE params were pushed first: renumber
      const n = where.length
      sql = `update ${name} set ${sets.map((s, i) => s.replace(/\$\d+$/, `$${n + i + 1}`)).join(', ')} where ${where.join(' and ')}`
    }
    const r = await run(claims, role, sql, params)
    if (r.error) return { data: null, error: r.error }
    return { data: single ? (r.data[0] || null) : r.data, error: null }
  }
  return q
}

export function createClient(url, key, opts = {}) {
  const service = key === state.SERVICE
  const auth = opts.global?.headers?.Authorization || ''
  const claims = service ? null : decode(auth.replace(/^Bearer\s+/i, ''))
  const role = service ? 'service_role' : claims ? 'authenticated' : 'anon'
  const rpc = async (fn, args = {}) => {
    const names = Object.keys(args)
    const r = await run(claims ? { role: 'authenticated', ...claims } : { role: service ? 'service_role' : 'anon' }, role,
      `select * from ${fn}(${names.map((k, i) => `${k} => $${i + 1}`).join(', ')})`, names.map((k) => args[k]))
    if (r.error) return r
    const rows = r.data
    // scalar functions come back as one row with one column named after the function
    if (rows.length === 1 && Object.keys(rows[0]).length === 1 && Object.keys(rows[0])[0] === fn) return { data: rows[0][fn], error: null }
    return { data: rows, error: null }
  }
  return {
    rpc,
    from: (name) => table(claims, role, name),
    auth: {
      async getUser(jwt) {
        const c = decode(jwt)
        if (!c?.sub) return { data: { user: null }, error: { message: 'invalid JWT' } }
        return { data: { user: { id: c.sub, email: c.email, app_metadata: c.app_metadata } }, error: null }
      },
      admin: {
        async createUser({ email, password, email_confirm, app_metadata }) {
          if (!service) return { data: null, error: { message: 'not allowed' } }
          const id = crypto.randomUUID()
          const r = await run(null, null, `insert into auth.users (id, email, raw_app_meta_data) values ($1, $2, $3)`, [id, email, JSON.stringify(app_metadata)])
          if (r.error) return { data: null, error: { message: /unique|duplicate/.test(r.error.message) ? 'A user with this email address has already been registered' : r.error.message } }
          state.passwords.set(id, { password, email_confirm })
          return { data: { user: { id, email } }, error: null }
        },
        async deleteUser(id) { await run(null, null, `delete from auth.users where id = $1`, [id]); state.passwords.delete(id); return { error: null } },
        async updateUserById(id, attrs) {
          if (attrs.password) state.passwords.set(id, { ...state.passwords.get(id), password: attrs.password })
          if (attrs.ban_duration) state.bans.set(id, attrs.ban_duration)
          return { data: {}, error: null }
        },
      },
    },
  }
}
