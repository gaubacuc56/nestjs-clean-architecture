module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: ['plugin:@typescript-eslint/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'test/**/*ts'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'], // First group: built-in and external libraries
          ['internal'], // Second group: internal modules
          ['parent', 'sibling', 'index'], // Third group: relative imports (../, ./)
        ],
        pathGroups: [
          {
            pattern: '@nestjs/**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@Infrastructure/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@Domain/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@Application/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@Presentation/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@Shared/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '../**', // Relative imports from parent directory
            group: 'sibling',
            position: 'after',
          },
          {
            pattern: './**', // Relative imports from the current directory
            group: 'sibling',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc', // Order alphabetically within each group
          caseInsensitive: true, // Case-insensitive ordering
        },
      },
    ],
  },
};
