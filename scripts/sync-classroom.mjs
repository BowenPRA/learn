#!/usr/bin/env node
// Copies Mr. Bowen's classroom decks into PRA Learn exactly as they are.
//
//   npm run sync:classroom                      from C:\Users\sbowe\code\classroom at origin/main
//   npm run sync:classroom -- --repo PATH --ref REF
//
// What it copies, byte for byte, from the classroom repo at one commit (never its
// working tree, so nobody's unfinished work comes along):
//   - the deck player: src/components/Deck.jsx, src/remote/DeckRemote.jsx (the phone
//     remote), content/registry.js and courses.js, src/index.css, and every file they
//     import (layouts, chrome, lib);
//   - each lesson in src/data/classroomLessons.js: content/<course>/<slug>/index.js and
//     every file it imports (slides, diagrams, widgets, pictures, film, and shared
//     widget kits in other lesson folders), plus the CREDITS.json beside its pictures;
//   - tailwind.config.js, whose theme classroom/tailwind.deck.js reuses.
// They land in classroom/ at the same paths (classroom/src/..., classroom/content/...),
// so every relative import keeps working unchanged. classroom/src and classroom/content
// belong to this script: it empties them first. classroom/SOURCE.json records the commit.
//
// PRA Learn's own files in classroom/ (index.html, main.jsx, deck.css, tailwind.deck.js,
// README.md) are never touched.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CLASSROOM_LESSONS } from '../src/data/classroomLessons.js'
import { addCredits, collect, lucideProblem, missingPackages, openRepo, writeAll } from './lib/copy-from-repo.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'classroom')
const argv = process.argv.slice(2)
const opt = (name, fallback) => {
  const i = argv.indexOf(name)
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback
}
const repo = path.resolve(opt('--repo', process.env.CLASSROOM_REPO || path.join(ROOT, '..', 'code', 'classroom')))
const ref = opt('--ref', 'origin/main')
const src = openRepo(repo, ref)
const { commit } = src

const PLAYER = ['src/components/Deck.jsx', 'src/remote/DeckRemote.jsx', 'content/registry.js', 'src/index.css', 'tailwind.config.js']
const LESSONS = CLASSROOM_LESSONS.map((l) => `content/${l.course}/${l.slug}/index.js`)

const { files, bare, problems } = collect(src, [...PLAYER, ...LESSONS])
for (const lesson of LESSONS) {
  if (!src.has(lesson)) problems.push(`no lesson at ${lesson} (check src/data/classroomLessons.js)`)
}
addCredits(src, files)

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
problems.push(...missingPackages(bare, pkg))
// The classroom page draws icons with lucide-react-classroom (vite.config.js), which
// must be the classroom's own lucide-react version or some icons are drawn differently.
const lucide = lucideProblem(src, pkg, 'lucide-react-classroom')
if (lucide) problems.push(lucide)

// The home pages show each lesson's title and subtitle from src/data/classroomLessons.js;
// say so when the deck's own meta has changed since (a warning, not a stop).
const drift = []
for (const l of CLASSROOM_LESSONS) {
  const file = `content/${l.course}/${l.slug}/index.js`
  if (!files.has(file)) continue
  const src = files.get(file).toString('utf8')
  for (const key of ['title', 'subtitle']) {
    const m = new RegExp(`\\n\\s*${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`).exec(src)
    if (m && m[1].replace(/\\'/g, "'") !== l[key]) drift.push(`${l.course}/${l.slug} ${key} is now '${m[1]}' in the classroom`)
  }
}

if (problems.length) {
  console.error('Not synced:\n  ' + problems.join('\n  '))
  process.exit(1)
}

writeAll(OUT, ['src', 'content'], files)
const listed = [...files.keys()].sort()
fs.writeFileSync(path.join(OUT, 'SOURCE.json'), JSON.stringify({
  repo: 'BowenPRA/classroom',
  ref,
  commit,
  lessons: CLASSROOM_LESSONS.map((l) => `${l.course}/${l.slug}`),
  files: listed,
}, null, 2) + '\n')

console.log(`Copied ${listed.length} files from BowenPRA/classroom ${commit.slice(0, 7)} (${ref}) into classroom/:`)
for (const l of CLASSROOM_LESSONS) console.log(`  ${l.unit} ${l.title}  ->  /classroom/#/lesson/${l.course}/${l.slug}`)
if (drift.length) console.log(`\nUpdate src/data/classroomLessons.js to match:\n  ${drift.join('\n  ')}`)
