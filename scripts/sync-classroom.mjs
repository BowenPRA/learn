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
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CLASSROOM_LESSONS } from '../src/data/classroomLessons.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'classroom')
const argv = process.argv.slice(2)
const opt = (name, fallback) => {
  const i = argv.indexOf(name)
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback
}
const repo = path.resolve(opt('--repo', process.env.CLASSROOM_REPO || path.join(ROOT, '..', 'code', 'classroom')))
const ref = opt('--ref', 'origin/main')

const git = (...args) => execFileSync('git', ['-C', repo, ...args], { maxBuffer: 1 << 28 })
const commit = git('rev-parse', `${ref}^{commit}`).toString().trim()
const tree = new Set(git('ls-tree', '-r', '--name-only', commit).toString().split('\n').filter(Boolean))
const read = (file) => git('show', `${commit}:${file}`)

const PLAYER = ['src/components/Deck.jsx', 'src/remote/DeckRemote.jsx', 'content/registry.js', 'src/index.css', 'tailwind.config.js']
const LESSONS = CLASSROOM_LESSONS.map((l) => `content/${l.course}/${l.slug}/index.js`)

const IMPORT = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|import\s+['"]([^'"]+)['"]/g
const RESOLVE = ['', '.js', '.jsx', '/index.js']

const files = new Map() // path -> Buffer
const bare = new Map() // package -> first importer
const problems = []

function walk(file) {
  if (files.has(file)) return
  if (!tree.has(file)) { problems.push(`not in ${commit.slice(0, 7)}: ${file}`); return }
  const body = read(file)
  files.set(file, body)
  if (!/\.(js|jsx|mjs|css)$/.test(file)) return
  const src = body.toString('utf8')
  for (const m of src.matchAll(IMPORT)) {
    const spec = m[1] || m[2] || m[3]
    if (!spec.startsWith('.')) {
      const pkg = spec.split('/').slice(0, spec.startsWith('@') ? 2 : 1).join('/')
      if (!bare.has(pkg)) bare.set(pkg, file)
      continue
    }
    const base = path.posix.normalize(path.posix.join(path.posix.dirname(file), spec.split('?')[0]))
    const hit = RESOLVE.map((ext) => base + ext).find((p) => tree.has(p))
    if (hit) walk(hit)
    else problems.push(`${file} imports ${spec}, which is not in the classroom repo`)
  }
}

for (const lesson of LESSONS) {
  if (!tree.has(lesson)) problems.push(`no lesson at ${lesson} (check src/data/classroomLessons.js)`)
}
;[...PLAYER, ...LESSONS].forEach(walk)

// The picture credits travel with the pictures.
for (const file of [...files.keys()]) {
  const credits = path.posix.join(path.posix.dirname(file), 'CREDITS.json')
  if (/\.(jpe?g|png|webp|gif|svg|webm|mp4)$/i.test(file) && tree.has(credits) && !files.has(credits)) files.set(credits, read(credits))
}

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
const have = { ...pkg.dependencies, ...pkg.devDependencies }
for (const [name, from] of bare) {
  if (!have[name]) problems.push(`package ${name} (imported by ${from}) is not in PRA Learn's package.json`)
}

// The classroom page draws icons with lucide-react-classroom (vite.config.js), which
// must be the classroom's own lucide-react version or some icons are drawn differently.
const lock = JSON.parse(read('package-lock.json').toString('utf8'))
const lucide = lock.packages?.['node_modules/lucide-react']?.version
const pinned = String(pkg.dependencies?.['lucide-react-classroom'] || '').replace(/^npm:lucide-react@/, '')
if (lucide && pinned !== lucide) {
  problems.push(`the classroom uses lucide-react ${lucide}; run: npm install lucide-react-classroom@npm:lucide-react@${lucide} (and pin it without ^)`)
}

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

for (const dir of ['src', 'content']) fs.rmSync(path.join(OUT, dir), { recursive: true, force: true })
for (const [file, body] of files) {
  const dest = path.join(OUT, ...file.split('/'))
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, body)
}
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
