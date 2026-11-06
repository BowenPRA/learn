import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// GitHub Pages serves this repo at the custom domain https://learn.pra.edu.vn/
// (public/CNAME keeps the domain across deploys). `base` must stay '/' while
// that file is there. Without VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY
// in .env the app runs in demo mode with sample data; `npm run deploy` refuses
// to build without them (scripts/check-env.mjs), so the live site never does.
// The classroom page draws its icons with the classroom's own lucide-react (an alias
// package pinned to the classroom's version), since newer versions redraw some icons
// (the tick in CheckCircle2, Leaf, PenTool, Soup). PRA Learn's pages keep theirs.
const CLASSROOM_DIR = fileURLToPath(new URL('./classroom/', import.meta.url)).replace(/\\/g, '/').toLowerCase()
const classroomIcons = {
  name: 'classroom-icons',
  enforce: 'pre',
  resolveId(source, importer, options) {
    if (source !== 'lucide-react' || !importer) return null
    if (!importer.replace(/\\/g, '/').toLowerCase().startsWith(CLASSROOM_DIR)) return null
    return this.resolve('lucide-react-classroom', importer, { ...options, skipSelf: true })
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
