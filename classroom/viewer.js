// Who has the classroom page open, as PRA Learn sees it. PRA Learn's own file.
//
//   'out'      not signed in to PRA Learn (and not in demo mode)
//   'student'  a student login (app_metadata.role 'student'), or the demo student
//   'staff'    a staff login that PRA Learn lets in as staff (api.me() says
//              kind 'staff': a teacher of one of its classes, office or a head),
//              or the demo teacher
//   'other'    signed in, but neither (PRA Learn's own pages turn them away)
//
// The teacher's plan holds the answers, so only 'staff' gets it (the plan page,
// the deck's plan button and the phone remote's notes). Asked once per page load.
import { useEffect, useState } from 'react'
import { api } from '../src/lib/api.js'

let asked = null

export function whoIsHere() {
  if (!asked) {
    asked = (async () => {
      const session = await api.session()
      if (!session) return 'out'
      if (session.user?.app_metadata?.role === 'student') return 'student'
      try {
        const me = await api.me(session)
        return me?.kind === 'staff' ? 'staff' : 'other'
      } catch {
        // Offline or a server error: the decks still open, without the plan.
        asked = null
        return 'other'
      }
    })().catch(() => {
      asked = null
      return 'out'
    })
  }
  return asked
}

/** whoIsHere() as React state: 'checking' until it is known. */
export function useViewer() {
  const [viewer, setViewer] = useState('checking')
  useEffect(() => {
    let alive = true
    whoIsHere().then((v) => alive && setViewer(v))
    return () => { alive = false }
  }, [])
  return viewer
}
