# Contributing to Angular AI Kit

Thank you for your interest in contributing to Angular AI Kit! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and professional in all interactions.

## Development Setup

### Prerequisites

- Node.js (v20 or later)
- npm or yarn
- Git

### Getting Started

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/hassantayyab/angular-ai-kit.git
   cd angular-ai-kit
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- Follow the existing code style
- Use Prettier for formatting (runs automatically on commit)
- Use ESLint for linting (runs automatically on commit)
- Follow Angular v21 best practices (signals, OnPush, standalone components)
- Use Tailwind CSS v4 for styling (CSS only, no SCSS)

### Commit Messages

We use conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Other changes

Examples:

```
feat(chat): add MessageBubble component
fix(directives): resolve focus trap issue in modals
docs(readme): update installation instructions
```

### File Organization

- Maximum 500 lines per file
- Use kebab-case for file names
- Place components in `packages/angular-ai-kit/src/lib/components/`
- Place directives in `packages/angular-ai-kit/src/lib/directives/`
- Place utilities in `packages/utils/src/lib/`

### Testing

While unit tests are not required for Phase 0, ensure your code:

- Builds without errors
- Passes linting
- Works in the demo app
- Is SSR/hydration compatible

## Pull Request Process

1. Update documentation if needed
2. Ensure all builds pass: `nx run-many --target=build --all`
3. Ensure linting passes: `nx run-many --target=lint --all`
4. Format code: `npm run format`
5. Create a pull request with a clear description
6. Link any related issues

## Development Commands

### Build

```bash
# Build all packages
nx run-many --target=build --all

# Build specific package
nx build angular-ai-kit
nx build tokens
nx build utils
```

### Serve

```bash
# Run demo app
nx serve demo
```

### Lint

```bash
# Lint all packages
nx run-many --target=lint --all

# Lint specific package
nx lint angular-ai-kit
```

### Format

```bash
# Format all files
npm run format

# Check formatting
nx format:check
```

## Project Structure

```
angular-ai-kit/
├── packages/
│   ├── angular-ai-kit/  # Main library
│   ├── tokens/          # Design tokens
│   └── utils/           # Utilities
├── apps/
│   └── demo/            # Demo application
├── .husky/              # Git hooks
└── tools/               # Build tools
```

## Questions?

Feel free to open an issue for any questions or concerns.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
