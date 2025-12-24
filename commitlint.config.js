/**
 * Commitlint configuration
 * Enforces conventional commits format
 *
 * Format: <type>(<scope>): <subject>
 * Example: feat(chat): add MessageBubble component
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'build', // Build system or dependencies
        'ci', // CI/CD changes
        'chore', // Other changes (maintenance)
        'revert', // Revert a previous commit
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'core', // Core library
        'tokens', // Design tokens
        'utils', // Utilities
        'chat', // Chat components
        'input', // Input components
        'display', // Display components
        'streaming', // Streaming components
        'directives', // Directives
        'types', // Type definitions
        'demo', // Demo app
        'docs', // Documentation
        'config', // Configuration
        'deps', // Dependencies
      ],
    ],
    'subject-case': [2, 'always', 'sentence-case'],
    'header-max-length': [2, 'always', 100],
  },
};
