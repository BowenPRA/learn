import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // classroom/src and classroom/content are copies of BowenPRA/classroom, linted there.
  globalIgnores(['dist', 'shots', 'classroom/src', 'classroom/content', 'classroom/tailwind.config.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: { globals: globals.browser, parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  {
    files: ['scripts/**/*.{js,mjs}', 'tests/**/*.{js,mjs}', 'supabase/**/*.js', '*.config.js'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
])
