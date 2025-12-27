import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            // Apps can depend on public libs, internal libs, and UI components
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: [
                'scope:public',
                'scope:internal',
                'type:ui',
                'type:util',
              ],
            },
            // E2E tests can only depend on apps
            {
              sourceTag: 'scope:e2e',
              onlyDependOnLibsWithTags: ['scope:app'],
            },
            // Public packages can depend on other public packages and utils
            {
              sourceTag: 'scope:public',
              onlyDependOnLibsWithTags: ['scope:public', 'type:util'],
            },
            // Internal libs can depend on internal and public
            {
              sourceTag: 'scope:internal',
              onlyDependOnLibsWithTags: ['scope:internal', 'scope:public', 'type:util'],
            },
            // UI components can depend on utils and other UI
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:util', 'type:ui', 'scope:internal'],
            },
            // Utils can depend on other utils
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {
      // Allow underscore-prefixed variables for intentionally unused params
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
];
