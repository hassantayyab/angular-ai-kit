# 🤖 Angular AI Kit

A modern, **signal-based** component library for building AI chat interfaces in **Angular v21**.

Built with **Tailwind CSS v4**, TypeScript strict mode, and full SSR/hydration support.

## ✨ Features

- 🚀 **Angular v21** - Latest features with signals, control flow, and zoneless support
- 🎨 **Tailwind CSS v4** - Modern utility-first styling with CSS-only (no SCSS)
- 📦 **Nx Monorepo** - Scalable workspace with optimized builds
- ♿ **Accessible** - WCAG AA compliant components
- 🌙 **Dark Mode** - Built-in theme support with CSS custom properties
- 🔧 **TypeScript** - Fully typed with strict mode enabled
- 🌐 **SSR Compatible** - Server-side rendering and hydration ready
- 🎯 **Tree-shakable** - Optimized bundle sizes

## 📦 Packages

- `@angular-ai-kit/core` - Core components, directives, and types
- `@angular-ai-kit/tokens` - Design tokens and theming
- `@angular-ai-kit/utils` - Utility functions and helpers

## 🚀 Quick Start

### Installation

```bash
npm install @angular-ai-kit/core @angular-ai-kit/tokens @angular-ai-kit/utils
```

### Setup Tailwind CSS v4

Ensure you have Tailwind CSS v4 configured:

```bash
npm install tailwindcss@^4.0.0 @tailwindcss/postcss
```

Create `.postcssrc.json`:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

Import Tailwind in your `styles.css`:

```css
@import 'tailwindcss';
```

## 📚 Current Components (Phase 0.1)

### Directives

- **CopyToClipboardDirective** - Copy text to clipboard with keyboard support
- **AutoResizeDirective** - Auto-resize textareas based on content
- **ClickOutsideDirective** - Detect clicks outside elements
- **FocusTrapDirective** - Trap focus for modals and dialogs

### Utilities

- **cn()** - Class name merging with Tailwind conflict resolution
- **Token Counter** - Approximate GPT-style token counting
- **Formatters** - Date, number, and text formatting utilities
- **Validators** - Message, file, and input validation

### Design Tokens

- Complete CSS custom property system
- Light/dark mode support
- Comprehensive color palettes
- Typography, spacing, and shadow scales

## 🎯 Roadmap

### Phase 0.2 (Next)

- MessageBubble Component
- MessageList Component
- ChatContainer Component

### Phase 0.3+

- Input components (PromptInput, SubmitButton, FileUpload)
- Streaming components (StreamingText, TypingIndicator)
- Display components (CodeBlock, MarkdownRenderer, TokenCounter)
- Control components (ModelSelector, RegenerateButton, ConversationList)

## 💻 Development

This project uses Nx for monorepo management.

### Build All Packages

```bash
nx run-many --target=build --all
```

### Build Specific Package

```bash
nx build angular-ai-kit
nx build tokens
nx build utils
```

### Run Demo App

```bash
nx serve demo
```

### Lint All Packages

```bash
nx run-many --target=lint --all
```

### Format Code

```bash
nx format:write
```

### Visualize Dependency Graph

```bash
nx graph
```

## 🏗️ Project Structure

```
angular-ai-kit/
├── packages/
│   ├── angular-ai-kit/     # Main library (components, directives, types)
│   ├── tokens/             # Design tokens (CSS variables, TypeScript types)
│   └── utils/              # Utilities (cn, formatters, validators)
├── apps/
│   ├── demo/               # Demo application
│   └── demo-e2e/           # E2E tests for demo
├── .husky/                 # Git hooks (commitlint, lint-staged)
└── tools/                  # Build tools and generators
```

## 🎨 Styling Philosophy

This library uses **Tailwind CSS v4** with a utility-first approach:

- CSS-only (no SCSS)
- CSS custom properties for theming
- ViewEncapsulation.None with scoped class names
- Mobile-first responsive design
- Full dark mode support

## ♿ Accessibility

All components follow WCAG AA standards:

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast compliance

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/angular-ai-kit.git

# Install dependencies
npm install

# Run demo app
nx serve demo
```

### Commit Convention

We use conventional commits:

```
feat(chat): add MessageBubble component
fix(directives): resolve focus trap issue
docs(readme): update installation instructions
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- [Documentation](https://github.com/yourusername/angular-ai-kit#readme)
- [Issues](https://github.com/yourusername/angular-ai-kit/issues)
- [Nx Documentation](https://nx.dev)
- [Angular Documentation](https://angular.dev)
- [Tailwind CSS v4](https://tailwindcss.com)

## 🙏 Acknowledgments

Built with:

- [Angular v21](https://angular.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Nx](https://nx.dev)
- [TypeScript](https://www.typescriptlang.org)

---

Made with ❤️ for the Angular community
