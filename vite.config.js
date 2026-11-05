import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this repo at the custom domain https://learn.pra.edu.vn/
// (public/CNAME keeps the domain across deploys). `base` must stay '/' while
// that file is there. Without VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY
// in .env the app runs in demo mode with sample data; `npm run deploy` refuses
// to build without them (scripts/check-env.mjs), so the live site never does.
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { port: 5201, strictPort: true },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
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
