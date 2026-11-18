// content/y7-science/U04_classkey/keystore.js
// The class key's data: a tree, saved on THIS DEVICE only, like the picker's
// class list it is built from. The repo is public and holds no names: the
// names come from the random-student picker (src/lib/useStudentPicker.js) on
// the classroom computer, and a student opening the deck at home sees the
// eleven sample animals instead.
//
// A node is { names: string[] } until it is split, then
// { names, q, yes: node, no: node }. Paths are arrays of 'yes' / 'no' from the
// top. Every name ends up in exactly one leaf, so a node's width in the tree is
// simply its number of names.
//
// The key expires after 12 hours (STANDARD.md, widgets that keep class data):
// it is built, tested and copied in one lesson.
import { loadRoster } from '../../../src/lib/useStudentPicker.js'

const STORE = 'classroom:y7-science:4:class-key'
const KEEP_MS = 12 * 60 * 60 * 1000

// Fired on window whenever the key is saved, so the test and numbered slides
// follow the build slide.
export const KEY_EVENT = 'classroom:class-key-changed'

// From 4.5's game and cats, so they are animals the class has met.
export const SAMPLE = [
  'tiger', 'lynx', 'leopard', 'Pallas’s cat', 'spider', 'snail',
  'butterfly', 'snake', 'bee', 'earthworm', 'ladybird',
]

/** The names to build from: the picker's class list, or the sample animals. */
export function sourceNames() {
  const roster = [...new Set(loadRoster().map((n) => n.trim()).filter(Boolean))]
  return roster.length >= 2 ? { names: roster, sample: false } : { names: SAMPLE, sample: true }
}

function valid(node) {
  if (!node || !Array.isArray(node.names) || !node.names.length) return false
  if (node.q == null) return true
  return typeof node.q === 'string' && valid(node.yes) && valid(node.no)
}

/** The saved key, or null. Never throws. */
export function loadKey() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || 'null')
    if (!saved || Date.now() - saved.savedAt > KEEP_MS || !valid(saved.root)) return null
    return saved.root
  } catch {
    return null
  }
}

/** Save the key (null clears it). Never throws. */
export function saveKey(root) {
  try {
    if (root) localStorage.setItem(STORE, JSON.stringify({ savedAt: Date.now(), root }))
    else localStorage.removeItem(STORE)
  } catch {
    /* private window / storage blocked — the key simply won't persist */
  }
  try {
    window.dispatchEvent(new Event(KEY_EVENT))
  } catch {
    /* no window */
  }
}

export const fresh = (names) => ({ names: [...names] })
export const isSplit = (node) => node.q != null && !!node.yes && !!node.no

export function getAt(root, path) {
  let node = root
  for (const step of path) node = node?.[step]
  return node
}

/** A copy of root with the node at path replaced by fn(node). */
export function updateAt(root, path, fn) {
  if (!path.length) return fn(root)
  const [step, ...rest] = path
  return { ...root, [step]: updateAt(root[step], rest, fn) }
}

export function countQuestions(node) {
  return isSplit(node) ? 1 + countQuestions(node.yes) + countQuestions(node.no) : 0
}

/** Every unsplit group holds one name: everyone has their own name. */
export function isDone(node) {
  return isSplit(node) ? isDone(node.yes) && isDone(node.no) : node.names.length === 1
}

export const sameNames = (a, b) => a.length === b.length && a.every((n) => b.includes(n))

/**
 * The key as a numbered key: the questions in reading order (each Yes branch
 * before its No branch), each answer pointing at a question number, a name,
 * or a group nobody has split yet.
 */
export function numbered(root) {
  const rows = []
  const ids = new Map()
  const visit = (node) => {
    if (!isSplit(node)) return
    ids.set(node, rows.length + 1)
    rows.push(node)
    visit(node.yes)
    visit(node.no)
  }
  visit(root)
  const target = (node) => {
    if (isSplit(node)) return { go: ids.get(node) }
    if (node.names.length === 1) return { name: node.names[0] }
    return { group: node.names }
  }
  return rows.map((node, i) => ({ n: i + 1, q: node.q, yes: target(node.yes), no: target(node.no) }))
}
