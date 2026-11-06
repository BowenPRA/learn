#!/usr/bin/env node
// Copies the Dashboard tasks PRA Learn's units use, exactly as they are.
//
//   npm run sync:dashboard                      from C:\Users\sbowe\Dashboard at origin/main
//   npm run sync:dashboard -- --repo PATH --ref REF
//
// What it copies, byte for byte, from BowenPRA/Dashboard at one commit (never its
// working tree, so nobody's unfinished work comes along):
//   - the tasks every unit uses: the lesson deck (src/tasks/Notes.jsx), the quiz
//     (src/tasks/Assessment.jsx), the step engine (src/stepPractice/), and the helpers
//     the unit page calls (asset paths, languages, dark mode), with everything they import;
//   - for each unit in src/data/units.js: its data (src/data/<track>/<unit>/data.js,
//     the deck, the words, the quiz), its main task (src/tasks/<engine>.jsx), and its
//     audio and pictures (public/audio/<track>/<unit>/, public/images/<track>/<unit>/);
//   - src/index.css and tailwind.config.js, whose theme unit/tailwind.unit.js reuses.
// Code lands in unit/ at the same paths (unit/src/...), so every relative import keeps
// working; audio and pictures land in public/audio and public/images, where the copied
// asset helper looks for them. unit/src, public/audio and public/images belong to this
// script: it empties them first. unit/SOURCE.json records the commit.
//
// PRA Learn's own files in unit/ (index.html, main.jsx, unit.css, tailwind.unit.js,
// app/, content/, README.md) are never touched.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { UNITS } from '../src/data/units.js'
import { addCredits, collect, lucideProblem, missingPackages, openRepo, writeAll } from './lib/copy-from-repo.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'unit')
const PUBLIC = path.join(ROOT, 'public')
const argv = process.argv.slice(2)
const opt = (name, fallback) => {
  const i = argv.indexOf(name)
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback
}
const repo = path.resolve(opt('--repo', process.env.DASHBOARD_REPO || path.join(ROOT, '..', 'Dashboard')))
const ref = opt('--ref', 'origin/main')
const src = openRepo(repo, ref)
const { commit } = src

const SHARED = [
  'src/tasks/Notes.jsx', 'src/tasks/Assessment.jsx', 'src/stepPractice/StepPracticeSet.jsx', 'src/stepPractice/check.js',
  'src/utils/assetPaths.js', 'src/utils/lang.js', 'src/hooks/useLang.js', 'src/hooks/useDarkMode.js',
  'src/components/TopBar.jsx', // the words and workbook parts wear the tasks' own top bar
  'src/index.css', 'tailwind.config.js',
]
const PER_UNIT = UNITS.flatMap((u) => [`src/data/${u.track}/${u.unit}/data.js`, `src/tasks/${u.engine}.jsx`])

const { files, bare, problems } = collect(src, [...SHARED, ...PER_UNIT])
addCredits(src, files)

// Each unit's audio and pictures, whole folders.
const assets = new Map()
for (const u of UNITS) {
  for (const kind of ['audio', 'images']) {
    for (const f of src.list(`public/${kind}/${u.track}/${u.unit}/`)) assets.set(f.replace(/^public\//, ''), src.read(f))
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
problems.push(...missingPackages(bare, pkg))
// The unit page draws icons with lucide-react-dashboard (vite.config.js), which must be
// the Dashboard's own lucide-react version or some icons are drawn differently.
const lucide = lucideProblem(src, pkg, 'lucide-react-dashboard')
if (lucide) problems.push(lucide)

if (problems.length) {
  console.error('Not synced:\n  ' + problems.join('\n  '))
  process.exit(1)
}

writeAll(OUT, ['src', 'tailwind.config.js'], files)
writeAll(PUBLIC, ['audio', 'images'], assets)
const listed = [...files.keys()].sort()
fs.writeFileSync(path.join(OUT, 'SOURCE.json'), JSON.stringify({
  repo: 'BowenPRA/Dashboard',
  ref,
  commit,
  units: UNITS.map((u) => `${u.track}/${u.unit}`),
  files: listed,
  assets: [...assets.keys()].sort(),
}, null, 2) + '\n')

const mb = ([...assets.values()].reduce((s, b) => s + b.length, 0) / 1048576).toFixed(1)
console.log(`Copied ${listed.length} files and ${assets.size} audio/picture files (${mb} MB) from BowenPRA/Dashboard ${commit.slice(0, 7)} (${ref}):`)
for (const u of UNITS) console.log(`  ${u.label} ${u.title}  ->  /unit/#/${u.track}/${u.unit}`)
