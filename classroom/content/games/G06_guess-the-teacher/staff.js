// content/games/G06_guess-the-teacher/staff.js
// The teachers' pictures for the reveal, read from the staff list on the
// website (pra.edu.vn/about, "Vietnamese and international staff"): each
// teacher's cut-out portrait, their role, and the photos of them at work.
// Nothing is copied into this repo: the TV fetches the page when the game
// opens, keeps what it found in this browser for next time, and loads the
// pictures from pra.edu.vn. A photo added to the website shows up in the game
// by itself.
//
// A teacher in the game is matched to the website by name ("Mr. Seth" = "Mr.
// Seth"; titles, capitals and accents never matter), unless Edit teachers
// picked someone else or No photo (`photo` in list.js: '' = by name, 'none',
// or a website key such as 'seth' or 'tham-v').
import { words } from './match.js'

export const SITE = 'https://pra.edu.vn'
const PAGE = `${SITE}/about/`
const COPY_KEY = 'learn:teacher-game:staff'
// The widest version of an at-work photo the TV needs (the website has 480, 960 and 1600).
const PHOTO_W = 960
export const PHOTOS_MAX = 6

// The six backgrounds the website gives its staff cards (tcard--t1 … t6), in order.
export const TONES = [
  ['#116DFF', '#1F8F73'],
  ['#48971D', '#FFC857'],
  ['#7C5CFF', '#116DFF'],
  ['#FF6F59', '#FFC857'],
  ['#1F8F73', '#9CC64A'],
  ['#0B4FBF', '#7C5CFF'],
]

/** A picture address from the page, kept only if it is one of the website's own images. */
function asset(path) {
  try {
    const url = new URL(path, SITE)
    return url.origin === SITE && url.pathname.startsWith('/assets/img/') ? url.href : null
  } catch {
    return null
  }
}

/** The version of `img` nearest PHOTO_W wide, from its srcset. */
function bestSrc(img) {
  const set = (img.getAttribute('srcset') || '').split(',').map((s) => {
    const [url, w] = s.trim().split(/\s+/)
    return { url, w: parseInt(w, 10) || 0 }
  }).filter((c) => c.url && c.w)
  const pick = set.filter((c) => c.w >= PHOTO_W).sort((a, b) => a.w - b.w)[0] || set.sort((a, b) => b.w - a.w)[0]
  return asset(pick?.url || img.getAttribute('src'))
}

/** The staff cards on the About page: [{ key, name, role, tone, portrait, photos: [{ src, alt, w, h, pos }] }]. */
export function parseStaff(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const out = []
  doc.querySelectorAll('li.tcard').forEach((li) => {
    const cut = li.querySelector('img.cutout') || li.querySelector('img[src*="/team/"]')
    const portrait = cut && asset(cut.getAttribute('src'))
    const name = (li.querySelector('.tcard__plate strong')?.textContent || cut?.getAttribute('alt') || '').trim()
    if (!portrait || !name) return
    const key = (portrait.match(/\/team\/([a-z0-9-]+?)-\d+\.\w+$/) || [])[1] || words(name).join('-')
    const tone = Math.max(0, (parseInt((li.className.match(/tcard--t(\d)/) || [])[1], 10) || 1) - 1) % TONES.length
    const photos = [...li.querySelectorAll('.tcard__shot img, .tcard__shots img')]
      .map((img) => ({
        src: bestSrc(img),
        alt: (img.getAttribute('alt') || '').trim(),
        w: parseInt(img.getAttribute('width'), 10) || 4,
        h: parseInt(img.getAttribute('height'), 10) || 3,
        pos: (img.getAttribute('style') || '').match(/object-position:\s*([^;]+)/)?.[1]?.trim() || '',
      }))
      .filter((p) => p.src)
      .slice(0, PHOTOS_MAX)
    const role = (li.querySelector('.tcard__plate em')?.textContent || '').trim()
    out.push({ key, name, role, tone, portrait, photos })
  })
  return out
}

function readCopy() {
  try {
    const saved = JSON.parse(localStorage.getItem(COPY_KEY))
    return Array.isArray(saved?.staff) ? saved : null
  } catch {
    return null
  }
}

/**
 * The website's staff: { staff, where }. `where` is 'site' (read just now),
 * 'copy' (the website could not be read; what this browser kept last time) or
 * 'none' (neither: the game reveals names without pictures).
 */
export async function loadStaff() {
  try {
    const res = await fetch(PAGE, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`pra.edu.vn answered ${res.status}`)
    const staff = parseStaff(await res.text())
    if (!staff.length) throw new Error('no staff cards on pra.edu.vn/about')
    try { localStorage.setItem(COPY_KEY, JSON.stringify({ staff, at: Date.now() })) } catch { /* storage blocked */ }
    return { staff, where: 'site' }
  } catch (e) {
    const copy = readCopy()
    return copy ? { staff: copy.staff, where: 'copy', error: e?.message } : { staff: [], where: 'none', error: e?.message }
  }
}

const nameKey = (name) => words(name).join(' ')

/**
 * The website's card for a teacher in the game, or null. `t.photo` decides:
 * 'none', a website key, or '' to match by name: the name or an `also` name
 * exactly, then a one-word name that only one person on the website starts with.
 */
export function staffFor(t, staff) {
  if (!t || !staff?.length || t.photo === 'none') return null
  if (t.photo) return staff.find((s) => s.key === t.photo) || null
  const keys = [t.name, ...(t.also || [])].map(nameKey).filter(Boolean)
  const exact = staff.find((s) => keys.includes(nameKey(s.name)))
  if (exact) return exact
  for (const k of keys) {
    if (k.includes(' ')) continue
    const firsts = staff.filter((s) => words(s.name)[0] === k)
    if (firsts.length === 1) return firsts[0]
  }
  return null
}

// Pictures asked for already, so each loads once; kept so they are not dropped before they arrive.
const asked = new Map()

/** Start loading a teacher's portrait and photos now, so the reveal never waits for them. */
export function preload(card) {
  if (!card) return
  ;[card.portrait, ...card.photos.map((p) => p.src)].forEach((src) => {
    if (!src || asked.has(src)) return
    const img = new Image()
    img.decoding = 'async'
    img.src = src
    asked.set(src, img)
  })
}
