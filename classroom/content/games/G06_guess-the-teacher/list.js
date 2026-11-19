// content/games/G06_guess-the-teacher/list.js
// The list of teachers the host edits on the TV (Edit teachers), and where it
// is kept: in the database for every staff login (learn_game_sets, made by
// supabase/learn-games.sql, read and written through PRA Learn's own sign-in),
// with a copy in this browser. Until that SQL has been run, or when the
// internet is down, the list is kept in this browser only, and the editor says
// so. Before anyone has saved a list, the game plays the starting list in
// teachers.js.
//
//   { v: 1, shuffle, teachers: [{ id, emojis: ['🏠', …], name, also: ['…'], on, photo }] }
//
// `photo` is which picture from pra.edu.vn the reveal shows (staff.js): '' to
// match the name, 'none', or a website key such as 'seth'.
import { api } from '../../../../src/lib/api.js'
import { TEACHERS } from './teachers.js'
import { EMOJI_MAX } from './protocol.js'

const GAME = 'guess-the-teacher'
const COPY_KEY = 'learn:teacher-game:list'
const TEACHERS_MAX = 60
const TEXT_MAX = 40

export const newId = () => Math.random().toString(36).slice(2, 10)

export const startingList = () => ({
  v: 1,
  shuffle: false,
  teachers: TEACHERS.map((t) => ({ id: newId(), emojis: [...t.emojis], name: t.name, also: [...(t.also || [])], on: Boolean(t.name), photo: '' })),
})

const text = (s) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, TEXT_MAX)

/** Any saved list, made safe: the right fields, trimmed, within the limits. */
export function tidy(raw) {
  if (!raw || !Array.isArray(raw.teachers)) return startingList()
  return {
    v: 1,
    shuffle: Boolean(raw.shuffle),
    teachers: raw.teachers.slice(0, TEACHERS_MAX).map((t) => ({
      id: String(t?.id || newId()).slice(0, 12),
      emojis: (Array.isArray(t?.emojis) ? t.emojis : []).map(String).filter(Boolean).slice(0, EMOJI_MAX),
      name: text(t?.name),
      also: (Array.isArray(t?.also) ? t.also : []).map(text).filter(Boolean).slice(0, 8),
      on: t?.on !== false,
      photo: /^(none|[a-z0-9-]{1,40})$/.test(t?.photo || '') ? t.photo : '',
    })),
  }
}

/** Whether a teacher can be played: switched on, with a name and at least one emoji. */
export const ready = (t) => t.on && Boolean(t.name) && t.emojis.length > 0

/** The teachers a game starts with, in list order or shuffled. */
export function setsFor(list) {
  const sets = list.teachers.filter(ready).map((t) => ({ emojis: t.emojis, name: t.name, also: t.also, photo: t.photo || '' }))
  if (list.shuffle) {
    for (let i = sets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sets[i], sets[j]] = [sets[j], sets[i]]
    }
  }
  return sets
}

/** The emojis in what was typed or pasted: one per picture, however many code points it takes. */
export function splitEmojis(value) {
  const str = String(value || '')
  let parts
  try {
    parts = Array.from(new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(str), (s) => s.segment)
  } catch {
    parts = Array.from(str)
  }
  return parts.filter((p) => p.trim() && !/^[\s,.;·]+$/.test(p)).slice(0, EMOJI_MAX)
}

function readCopy() {
  try {
    const saved = JSON.parse(localStorage.getItem(COPY_KEY))
    return saved?.list ? saved : null
  } catch {
    return null
  }
}

function writeCopy(list) {
  try { localStorage.setItem(COPY_KEY, JSON.stringify({ list, at: Date.now() })) } catch { /* storage blocked */ }
}

/**
 * The list to play: { list, where, error }. `where` is 'shared' (from the
 * database), 'start' (nothing saved anywhere yet), or 'laptop' (the database
 * could not be read; this browser's copy, or the starting list).
 */
export async function loadList() {
  try {
    const row = await api.gameSet(GAME)
    if (row?.data) {
      const list = tidy(row.data)
      writeCopy(list)
      return { list, where: 'shared', at: row.updated_at, by: row.updated_by }
    }
    // Nothing in the database yet. A list edited on this laptop before the
    // table existed goes up now, so every staff login gets it.
    const copy = readCopy()
    if (!copy) return { list: startingList(), where: 'start' }
    const list = tidy(copy.list)
    return { list, ...(await saveList(list)) }
  } catch (e) {
    const copy = readCopy()
    return { list: copy ? tidy(copy.list) : startingList(), where: 'laptop', error: e?.message || String(e) }
  }
}

/** Save the list: { where: 'shared' } once the database has it, else { where: 'laptop', error }. */
export async function saveList(list) {
  writeCopy(list)
  try {
    const at = await api.saveGameSet(GAME, list)
    return { where: 'shared', at }
  } catch (e) {
    return { where: 'laptop', error: e?.message || String(e) }
  }
}
