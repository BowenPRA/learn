// src/lib/remote/bus.js
// The wire between a screen (the Guess Who board, a slide deck) and Mr Bowen's
// phone. Two transports carry the same messages, and either one alone is enough:
//
//  - BroadcastChannel joins windows of one browser: a remote in a second window
//    on the laptop. It needs no network at all.
//  - A Supabase realtime broadcast channel joins a phone, over the internet.
//
// Every message carries an id, so a copy that arrives by both routes is handled
// once. The room code is the only lock on the realtime channel and nothing on
// it is stored, so callers send ids, indexes and short strings — never a photo,
// and a child's name only where Mr Bowen has agreed to it.
//
// Topics are prefixed by the caller ('guess-who-ABCD', 'deck-ABCD'), so the
// two remotes never hear each other.
import { supabase } from './client.js'

const SEEN_MAX = 300
// A message sent while the channel is still joining (a phone just unlocked,
// say) waits for it, but not for long: a Next pressed four seconds ago is no
// longer what anyone wants.
const HOLD_MS = 4000
const HOLD_MAX = 20

// One realtime channel per topic, shared and released late. Supabase hands a
// second `channel()` call for a topic the channel already open on it, so a
// remount that closes and reopens straight away (React's StrictMode does it on
// every load in development) would be handed the closing channel and sit at
// CLOSED for good. Holding it a moment after the last user lets go means the
// remount simply picks it back up.
const topics = new Map()

function statusOf(status) {
  if (status === 'SUBSCRIBED') return 'live'
  if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') return 'offline'
  return 'connecting'
}

function acquire(topic) {
  let r = topics.get(topic)
  if (r) {
    clearTimeout(r.timer)
    r.users += 1
    return r
  }
  r = { users: 1, timer: null, status: 'connecting', listeners: new Set(), watchers: new Set(), held: [] }
  r.channel = supabase.channel(topic, { config: { broadcast: { self: false } } })
  r.channel.on('broadcast', { event: 'msg' }, ({ payload }) => r.listeners.forEach((fn) => fn(payload)))
  r.channel.subscribe((status) => {
    r.status = statusOf(status)
    if (r.status === 'live') {
      const fresh = r.held.filter((h) => Date.now() - h.at < HOLD_MS)
      r.held = []
      fresh.forEach((h) => r.channel.send({ type: 'broadcast', event: 'msg', payload: h.msg }))
    }
    r.watchers.forEach((fn) => fn(r.status))
  })
  topics.set(topic, r)
  return r
}

function release(topic, r) {
  r.users -= 1
  if (r.users > 0) return
  r.timer = setTimeout(() => {
    topics.delete(topic)
    supabase.removeChannel(r.channel)
  }, 2000)
}

/**
 * Open a topic. `from` names this end ('board', 'deck', 'phone-…'); messages
 * this end sent are never delivered back to it. `onStatus` hears 'connecting',
 * 'live' or 'offline' for the internet route — the local route has no state.
 * Returns `{ send(type, body), close() }`.
 */
export function openBus(topic, from, onMessage, onStatus) {
  const seen = new Set()
  const order = []
  const accept = (msg) => {
    if (!msg || typeof msg !== 'object' || msg.from === from || seen.has(msg.mid)) return
    seen.add(msg.mid)
    order.push(msg.mid)
    if (order.length > SEEN_MAX) seen.delete(order.shift())
    onMessage(msg)
  }

  let local = null
  try {
    local = new BroadcastChannel(`classroom:${topic}`)
    local.onmessage = (e) => accept(e.data)
  } catch {
    local = null // very old browser: the internet route still works
  }

  const shared = acquire(topic)
  const watch = (status) => onStatus?.(status)
  shared.listeners.add(accept)
  shared.watchers.add(watch)
  // A channel picked back up may already be live; say so, after this call returns.
  queueMicrotask(() => watch(shared.status))

  let count = 0
  return {
    send(type, body = {}) {
      const msg = { ...body, type, from, mid: `${from}.${Date.now().toString(36)}.${(count++).toString(36)}` }
      try { local?.postMessage(msg) } catch { /* window closing */ }
      // Before the channel is up a send is held, briefly (HOLD_MS), and goes
      // out when it is. A copy that also went by BroadcastChannel is dropped
      // at the other end by its id.
      if (shared.status === 'live') shared.channel.send({ type: 'broadcast', event: 'msg', payload: msg })
      else shared.held = [...shared.held, { msg, at: Date.now() }].slice(-HOLD_MAX)
    },
    close() {
      try { local?.close() } catch { /* already closed */ }
      shared.listeners.delete(accept)
      shared.watchers.delete(watch)
      release(topic, shared)
    },
  }
}
