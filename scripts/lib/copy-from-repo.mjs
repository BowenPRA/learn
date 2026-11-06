// Copying files from another of Mr. Bowen's repos into PRA Learn, byte for byte, at
// one commit (never the working tree, so nobody's unfinished work comes along).
// Used by scripts/sync-classroom.mjs and scripts/sync-dashboard.mjs.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const IMPORT = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|import\s+['"]([^'"]+)['"]/g
const RESOLVE = ['', '.js', '.jsx', '/index.js', '/index.jsx']

/** A repo at one commit: { commit, has(file), read(file), list(prefix) }. */
export function openRepo(repo, ref) {
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], { maxBuffer: 1 << 30 })
  const commit = git('rev-parse', `${ref}^{commit}`).toString().trim()
  const tree = new Set(git('ls-tree', '-r', '--name-only', commit).toString().split('\n').filter(Boolean))
  return {
    commit,
    has: (file) => tree.has(file),
    read: (file) => git('show', `${commit}:${file}`),
    list: (prefix) => [...tree].filter((f) => f.startsWith(prefix)),
  }
}

/**
 * Every file the entries import, following relative imports only.
 * Returns { files: Map(path -> Buffer), bare: Map(package -> first importer), problems: [] }.
 */
export function collect(src, entries) {
  const files = new Map()
  const bare = new Map()
  const problems = []
  const walk = (file) => {
    if (files.has(file)) return
    if (!src.has(file)) { problems.push(`not in ${src.commit.slice(0, 7)}: ${file}`); return }
    const body = src.read(file)
    files.set(file, body)
    if (!/\.(js|jsx|mjs|css)$/.test(file)) return
    for (const m of body.toString('utf8').matchAll(IMPORT)) {
      const spec = m[1] || m[2] || m[3]
      if (!spec.startsWith('.')) {
        const pkg = spec.split('/').slice(0, spec.startsWith('@') ? 2 : 1).join('/')
        if (!bare.has(pkg)) bare.set(pkg, file)
        continue
      }
      const base = path.posix.normalize(path.posix.join(path.posix.dirname(file), spec.split('?')[0]))
      const hit = RESOLVE.map((ext) => base + ext).find((p) => src.has(p))
      if (hit) walk(hit)
      else problems.push(`${file} imports ${spec}, which is not in the repo`)
    }
  }
  entries.forEach(walk)
  return { files, bare, problems }
}

/** The picture credits travel with the pictures. */
export function addCredits(src, files) {
  for (const file of [...files.keys()]) {
    const credits = path.posix.join(path.posix.dirname(file), 'CREDITS.json')
    if (/\.(jpe?g|png|webp|gif|svg|webm|mp4)$/i.test(file) && src.has(credits) && !files.has(credits)) files.set(credits, src.read(credits))
  }
}

/** Packages imported but not in PRA Learn's package.json, as problems. */
export function missingPackages(bare, pkg) {
  const have = { ...pkg.dependencies, ...pkg.devDependencies }
  return [...bare].filter(([name]) => !have[name]).map(([name, from]) => `package ${name} (imported by ${from}) is not in PRA Learn's package.json`)
}

/** A check that `alias` (an npm alias of lucide-react) is pinned to the repo's own lucide-react version. */
export function lucideProblem(src, pkg, alias) {
  if (!src.has('package-lock.json')) return null
  const lock = JSON.parse(src.read('package-lock.json').toString('utf8'))
  const theirs = lock.packages?.['node_modules/lucide-react']?.version
  const pinned = String(pkg.dependencies?.[alias] || '').replace(/^npm:lucide-react@/, '')
  return theirs && pinned !== theirs
    ? `the repo uses lucide-react ${theirs}; run: npm install ${alias}@npm:lucide-react@${theirs} (and pin it without ^)`
    : null
}

/** Empty the given folders under `out`, then write every file at its own path below `out`. */
export function writeAll(out, owned, files) {
  for (const dir of owned) fs.rmSync(path.join(out, dir), { recursive: true, force: true })
  for (const [file, body] of files) {
    const dest = path.join(out, ...file.split('/'))
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, body)
  }
}
