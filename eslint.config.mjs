import {defineConfig, globalIgnores} from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  globalIgnores([
    'libraries/**',
    'styles/**',
    '**/p5.js',
    '**/*.min.js',
    'node_modules/*',
    'data/*',
  ]),
  {
    files: ['**/*.js'],
    languageOptions: {
      // sketches are loaded as classic <script> tags, not as modules
      sourceType: 'script',
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'no-eval': 'error',
      '@stylistic/semi': 'error',
      '@stylistic/indent': ['error', 2, {SwitchCase: 0}],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/no-multiple-empty-lines': ['error', {max: 1, maxEOF: 1, maxBOF: 0}],
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/semi-style': ['error', 'last'],
      '@stylistic/spaced-comment': 'error',
      '@stylistic/switch-colon-spacing': ['error', {after: true, before: false}],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-unary-ops': 'error',
      '@stylistic/brace-style': 'error',
      '@stylistic/eol-last': 'error',
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/function-call-spacing': 'error',
      '@stylistic/key-spacing': 'error',
      '@stylistic/keyword-spacing': 'error',
    },
  },
])
