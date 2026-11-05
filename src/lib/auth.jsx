/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from './api.js'

// Who is signed in. What they may see is decided by the database; this only
// decides which pages to show: a student, a member of staff with classes, or a
// login that is neither (kind 'none').
const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [state, setState] = useState({ loading: true, session: null, me: null, error: '' })

  const resolve = useCallback(async (session) => {
    if (!session) { setState({ loading: false, session: null, me: null, error: '' }); return }
    try {
      const me = await api.me(session)
      setState({ loading: false, session, me, error: '' })
    } catch (e) {
      setState({ loading: false, session, me: null, error: e.code || 'server' })
    }
  }, [])

  useEffect(() => {
    let alive = true
    api.session().then((s) => alive && resolve(s))
    const off = api.onChange((s) => alive && resolve(s))
    return () => { alive = false; off() }
  }, [resolve])

  const value = useMemo(() => ({
    ...state,
    refresh: () => resolve(state.session),
    signOut: async () => { await api.signOut(); setState({ loading: false, session: null, me: null, error: '' }) },
  }), [state, resolve])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)
