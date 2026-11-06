// Loads a classroom lesson folder (content/<course>/<unit>/index.js) in Node, through
// Vite's SSR loader, without running any of its React: every .jsx/.tsx import (the
// widgets and their kits) becomes a marker { __widget: '<export name>', file }, and
// every picture, sound or `?url` import becomes the string 'asset-file:<absolute path>'.
// So `slides.js` and `diagrams.js` evaluate as plain data: inline SVGs come out as
// strings (with photo links as asset-file: paths) and widgets as markers.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve, basename, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createServer } from 'vite'

const ASSET_RE = /\.(png|jpe?g|webp|gif|svg|avif|mp3|wav|ogg|mp4|webm|pdf|woff2?|ttf)(\?.*)?$/i
const COMPONENT_RE = /\.(jsx|tsx)(\?.*)?$/i
const slash = (p) => p.split(sep).join('/')

function exportNames(code) {
  const names = new Set()
  for (const m of code.matchAll(/export\s+(?:async\s+)?(?:function\*?|const|let|var|class)\s+([A-Za-z_$][\w$]*)/g)) names.add(m[1])
  for (const m of code.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const part of m[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop()?.trim()
      if (name && name !== 'default') names.add(name)
    }
  }
  return [...names]
}

/** The git repo root above a folder (the folder that holds package.json and content/). */
export function repoRootOf(folder) {
  let d = resolve(folder)
  for (let i = 0; i < 12; i += 1) {
    if (existsSync(join(d, 'package.json')) && existsSync(join(d, 'content'))) return d
    const up = dirname(d)
    if (up === d) break
    d = up
  }
  throw new Error(`${folder} is not inside a classroom repo (no package.json + content/ above it)`)
}

export async function loadDeck(folder) {
  const dir = resolve(folder)
  const index = join(dir, 'index.js')
  if (!existsSync(index)) throw new Error(`${index} not found: give the lesson folder (content/<course>/<unit>)`)
  const root = repoRootOf(dir)
  const rel = slash(dir.slice(root.length + 1))
  const [, course, unit] = rel.split('/')

  const stubs = {
    name: 'deck-to-pack-stubs',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!importer) return null
      const clean = source.replace(/\?.*$/, '')
      const isRel = source.startsWith('.') || source.startsWith('/')
      if (isRel && (ASSET_RE.test(source) || /\?url$/.test(source))) {
        return `\0asset-file:${slash(resolve(dirname(importer), clean))}`
      }
      if (isRel && COMPONENT_RE.test(clean)) return `\0component:${slash(resolve(dirname(importer), clean))}`
      return null
    },
    load(id) {
      if (id.startsWith('\0asset-file:')) return `export default ${JSON.stringify(id.slice(1))}`
      if (id.startsWith('\0component:')) {
        const file = id.slice('\0component:'.length)
        const code = existsSync(file) ? readFileSync(file, 'utf8') : ''
        const names = exportNames(code)
        const lines = names.map((n) => `export const ${n} = { __widget: ${JSON.stringify(n)}, file: ${JSON.stringify(file)} }`)
        if (/export\s+default/.test(code)) lines.push(`export default { __widget: 'default', file: ${JSON.stringify(file)} }`)
        return lines.join('\n') || 'export {}'
      }
      return null
    },
  }

  const server = await createServer({
    configFile: false,
    root,
    logLevel: 'error',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [stubs],
  })
  try {
    const mod = await server.ssrLoadModule(pathToFileURL(index).href.replace(/^file:\/\/\//, '/').replace(/^\/([A-Za-z]:)/, '$1'))
    const lesson = mod.default || {}
    const creditsFile = join(dir, 'images', 'CREDITS.json')
    const credits = existsSync(creditsFile) ? JSON.parse(readFileSync(creditsFile, 'utf8')) : []
    return {
      folder: dir, root, rel, course, unit,
      meta: lesson.meta || {},
      slides: JSON.parse(JSON.stringify(lesson.slides || [])),
      credits: Array.isArray(credits) ? credits : [],
      creditFor: (file) => (Array.isArray(credits) ? credits.find((c) => c.file === basename(file)) : null),
    }
  } finally {
    await server.close()
  }
}
