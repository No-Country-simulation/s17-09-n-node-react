import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
    ignores: ['node_modules/', 'dist/', 'build/'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      'prefer-const': 'off',
      'no-new': 'off',
      'no-console': 'warn',
      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          endOfLine: 'auto',
          printWidth: 100,
          singleQuote: true,
          semi: false,
          bracketSpacing: true,
        },
      ],
    },
  },
]
