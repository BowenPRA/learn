// Checks that every path named in docs/FEATURES.md exists:  npm run check:features
//
// A path is anything in `backticks` with no space in it that contains a "/" or ends in a
// file extension, and does not start with "/", "#", "?" or "http" (those are addresses).
// Paths are read from the repo root. A part written <like-this> or with a * stands for
// any folder or name: only what comes before it is checked. Not part of `npm test`.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const file = join(root, 'docs', 'FEATURES.md')
const text = readFileSync(file, 'utf8')

const EXT = /\.(js|jsx|mjs|cjs|ts|tsx|md|sql|json|css|html|svg|txt|py|ps1)$/i
const looksLikePath = (t) =>
  !/\s/.test(t) && !/^(\/|#|\?|http|\$)/.test(t) && (t.includes('/') || EXT.test(t))

const missing = []
const seen = new Set()
text.split(/\r?\n/).forEach((line, i) => {
  for (const [, token] of line.matchAll(/`([^`]+)`/g)) {
    if (!looksLikePath(token) || seen.has(token)) continue
    seen.add(token)
    // Up to the first placeholder or wildcard; back to the last "/" when that cuts a name.
    const cut = token.search(/[<*]/)
    let path = cut < 0 ? token : token.slice(0, cut)
    if (cut >= 0 && !path.endsWith('/')) path = path.slice(0, path.lastIndexOf('/') + 1)
    if (!existsSync(join(root, path || '.'))) missing.push({ token, line: i + 1 })
  }
})

if (missing.length) {
  console.error(`docs/FEATURES.md names ${missing.length} path(s) that do not exist:`)
  for (const m of missing) console.error(`  line ${m.line}: ${m.token}`)
  process.exit(1)
}
console.log(`OK: all ${seen.size} paths named in docs/FEATURES.md exist.`)
