import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// GitHub Pages serves this repo at the custom domain https://learn.pra.edu.vn/
// (public/CNAME keeps the domain across deploys). `base` must stay '/' while
// that file is there. Without VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY
// in .env the app runs in demo mode with sample data; `npm run deploy` refuses
// to build without them (scripts/check-env.mjs), so the live site never does.
// The classroom and unit pages draw their icons with their own repo's lucide-react (alias
// packages pinned to the classroom's and the Dashboard's versions), since newer versions
// redraw some icons (the tick in CheckCircle2, Leaf, PenTool, Soup). PRA Learn's pages keep theirs.
const dirOf = (p) => fileURLToPath(new URL(p, import.meta.url)).replace(/\\/g, '/').toLowerCase()
const ICON_PACKAGES = [[dirOf('./classroom/'), 'lucide-react-classroom'], [dirOf('./unit/'), 'lucide-react-dashboard']]
const classroomIcons = {
  name: 'classroom-icons',
  enforce: 'pre',
  resolveId(source, importer, options) {
    if (source !== 'lucide-react' || !importer) return null
    const from = importer.replace(/\\/g, '/').toLowerCase()
    const hit = ICON_PACKAGES.find(([dir]) => from.startsWith(dir))
    return hit ? this.resolve(hit[1], importer, { ...options, skipSelf: true }) : null
  },
}

export default defineConfig({
  plugins: [classroomIcons, react()],
  base: '/',
  server: { port: 5201, strictPort: true },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      // Two pages: PRA Learn itself, and the classroom page that plays Mr. Bowen's
      // classroom decks unchanged (classroom/README.md), at /classroom/.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        classroom: fileURLToPath(new URL('./classroom/index.html', import.meta.url)),
        // Units: the Dashboard idea, streamlined (unit/README.md), at /unit/.
        unit: fileURLToPath(new URL('./unit/index.html', import.meta.url)),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/katex')) return 'katex'
          if (id.includes('node_modules/@supabase')) return 'supabase'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
