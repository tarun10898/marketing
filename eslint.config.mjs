import { FlatCompat } from '@eslint/eslintrc';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // Global ignores — never lint build artifacts or tests
    ignores: ['.next/**', 'node_modules/**', 'coverage/**', '__tests__/**'],
  },
  // Next.js core rules (React hooks, accessibility, core web vitals)
  // NOT using 'next/typescript' — it enables project-aware TS parsing which
  // causes TypeScript-ESLint to pull .next/types/** into the lint queue.
  ...compat.extends('next/core-web-vitals'),
  {
    // TypeScript-specific rules that don't require type-aware parsing
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];

export default eslintConfig;
