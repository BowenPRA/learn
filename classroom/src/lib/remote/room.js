// src/lib/remote/room.js
// Room codes for the phone remotes: four characters a phone can type, with no
// I/1 or O/0 to misread. A screen makes its code once and keeps it, so the same
// phone link works every time. No dependencies, so a deck can import it without
// pulling in the realtime client.

const ROOM_LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export const newRoomCode = () =>
  Array.from({ length: 4 }, () => ROOM_LETTERS[Math.floor(Math.random() * ROOM_LETTERS.length)]).join('')

export const cleanRoomCode = (code) => String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4)

/**
 * The code saved under `key` in this browser, made and saved on first use.
 * Every read and write is wrapped: storage throws in private windows, and a
 * code that changes on reload beats a screen that crashes.
 */
export function keptRoom(key) {
  try {
    const saved = cleanRoomCode(localStorage.getItem(key))
    if (saved.length === 4) return saved
  } catch { /* storage blocked */ }
  return replaceRoom(key)
}

/** A fresh code saved under `key`: every phone holding the old one is locked out. */
export function replaceRoom(key) {
  const code = newRoomCode()
  try { localStorage.setItem(key, code) } catch { /* storage blocked */ }
  return code
}
