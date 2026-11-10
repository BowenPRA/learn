#!/usr/bin/env node
// Checks that the list of classroom lessons (src/data/classroomLessons.js) and the
// lesson folders (classroom/content/y7-*/<slug>/index.js) agree:
//   - every lesson folder has an entry in the list, and every entry has a folder;
//   - each entry's unit, title and subtitle are the deck's own (meta in its index.js),
//     so the home pages say what the deck says;
//   - the deck's meta.course, when it has one, is its course folder;
//   - each entry's course is in classroom/content/courses.js, and no entry is listed twice.
//
//   npm run check:lessons        (also part of npm test: tests/lessons.test.mjs)
//
// The index.js files import JSX and pictures, so node cannot import them. The meta
// object is cut out of the file text instead and read as a plain JavaScript object
// literal (strings, numbers, 'a' + 'b'); anything else in it reads as undefined.
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT = path.join(ROOT, 'classroom', 'content')
const COURSE_FOLDER = /^y7-/

/** The text of the object literal after `meta:` in a lesson's index.js, or null. */
export function metaText(src) {
  const m = /(^|[\s,{])meta\s*:\s*\{/m.exec(src)
  if (!m) return null
  const start = m.index + m[0].length - 1
  let depth = 0
  for (let i = start; i < src.length; i += 1) {
    const c = src[i]
    if (c === "'" || c === '"' || c === '`') {
      // Skip a string (a template's ${} holds no braces in a meta block).
      for (i += 1; i < src.length && src[i] !== c; i += 1) if (src[i] === '\\') i += 1
    } else if (c === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i += 1
    } else if (c === '/' && src[i + 1] === '*') {
      i = src.indexOf('*/', i + 2) + 1
      if (i === 0) return null
    } else if (c === '{') depth += 1
    else if (c === '}') {
      depth -= 1
      if (depth === 0) return src.slice(start, i + 1)
    }
  }
  return null
}

/** The meta object of a lesson's index.js text. Names it cannot know read as undefined. */
export function readMeta(src) {
  const text = metaText(src)
  if (!text) throw new Error('no `meta: { ... }` found')
  const unknown = new Proxy({}, { has: () => true, get: () => undefined })
  return new Function('names', `with (names) { return (${text}) }`)(unknown)
}

export const loadList = async () => (await import(pathToFileURL(path.join(ROOT, 'src', 'data', 'classroomLessons.js')).href)).CLASSROOM_LESSONS
const loadCourses = async () => (await import(pathToFileURL(path.join(CONTENT, 'courses.js')).href)).COURSES

/** Every problem found, as lines of text (none when the list and the folders agree).
 *  `lessons` and `courses` default to the real files (the tests pass changed copies). */
export async function checkLessons({ lessons, courses } = {}) {
  const CLASSROOM_LESSONS = lessons || await loadList()
  const COURSES = courses || await loadCourses()
  const problems = []
  const listFile = 'src/data/classroomLessons.js'

  const folders = []
  for (const course of fs.readdirSync(CONTENT, { withFileTypes: true })) {
    if (!course.isDirectory() || !COURSE_FOLDER.test(course.name)) continue
    for (const lesson of fs.readdirSync(path.join(CONTENT, course.name), { withFileTypes: true })) {
      if (!lesson.isDirectory()) continue
      const index = path.join(CONTENT, course.name, lesson.name, 'index.js')
      // A folder without index.js is a shared kit or a bank, not a lesson.
      if (fs.existsSync(index)) folders.push({ course: course.name, slug: lesson.name, index })
    }
  }

  const key = (l) => `${l.course}/${l.slug}`
  const listed = new Map()
  for (const l of CLASSROOM_LESSONS) {
    if (listed.has(key(l))) problems.push(`${key(l)} is listed twice in ${listFile}`)
    listed.set(key(l), l)
    if (!COURSES.some((c) => c.id === l.course)) problems.push(`${key(l)}: course ${l.course} is not in classroom/content/courses.js`)
  }
  const found = new Set(folders.map(key))

  for (const f of folders) {
    if (!listed.has(key(f))) problems.push(`${key(f)} has a folder (classroom/content/${key(f)}/index.js) but no entry in ${listFile}`)
  }
  for (const l of CLASSROOM_LESSONS) {
    if (!found.has(key(l))) problems.push(`${key(l)} is in ${listFile} but there is no classroom/content/${key(l)}/index.js`)
  }

  for (const f of folders) {
    const entry = listed.get(key(f))
    if (!entry) continue
    let meta
    try {
      meta = readMeta(fs.readFileSync(f.index, 'utf8'))
    } catch (e) {
      problems.push(`${key(f)}: could not read the meta in index.js (${e.message})`)
      continue
    }
    if (meta.course !== undefined && meta.course !== f.course) problems.push(`${key(f)}: meta.course is '${meta.course}', not its folder '${f.course}'`)
    for (const field of ['unit', 'title', 'subtitle']) {
      // As the registry reads them: no unit means the folder name, no subtitle means ''.
      const deck = field === 'unit' ? (meta.unit || f.slug) : (meta[field] || '')
      const list = entry[field] || ''
      if (deck !== list) problems.push(`${key(f)} ${field}: the deck says '${deck}', ${listFile} says '${list}'`)
    }
  }
  return problems
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const problems = await checkLessons()
  if (problems.length) {
    console.error(`The lesson list and the lesson folders disagree (${problems.length}):\n  ${problems.join('\n  ')}`)
    process.exit(1)
  }
  console.log(`OK: ${(await loadList()).length} lessons in src/data/classroomLessons.js, each with its folder and the deck's unit, title and subtitle.`)
}
