import js from '@eslint/js'
import { mergeConfig } from 'eslint-merge'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default mergeConfig(js.configs.recommended, {
  ignores: ['dist'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    globals: globals.browser,
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    '@typescript-eslint': tsPlugin,
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    ...reactHooks.configs.recommended.rules
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
    },
  ],
});
