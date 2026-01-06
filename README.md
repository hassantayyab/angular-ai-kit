# Angular AI Kit

[![npm @angular-ai-kit/core](https://img.shields.io/npm/v/@angular-ai-kit/core?label=%40angular-ai-kit%2Fcore&color=dd0031)](https://www.npmjs.com/package/@angular-ai-kit/core)
[![npm @angular-ai-kit/utils](https://img.shields.io/npm/v/@angular-ai-kit/utils?label=%40angular-ai-kit%2Futils&color=dd0031)](https://www.npmjs.com/package/@angular-ai-kit/utils)
[![npm @angular-ai-kit/tokens](https://img.shields.io/npm/v/@angular-ai-kit/tokens?label=%40angular-ai-kit%2Ftokens&color=dd0031)](https://www.npmjs.com/package/@angular-ai-kit/tokens)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-v21-dd0031?logo=angular)](https://angular.dev)

A modern, **signal-based** component library for building AI chat interfaces in **Angular v21**.

Built with **Tailwind CSS v4**, TypeScript strict mode, and full SSR/hydration support.

## Features

- **Angular v21** - Latest features with signals, control flow, and zoneless support
- **Tailwind CSS v4** - Modern utility-first styling with CSS-only
- **Spartan UI** - Built on [Spartan UI](https://www.spartan.ng/) primitives
- **Accessible** - WCAG AA compliant with keyboard navigation and screen reader support
- **Dark Mode** - Built-in theme support with CSS custom properties
- **TypeScript** - Fully typed with strict mode enabled
- **SSR Compatible** - Server-side rendering and hydration ready
- **Tree-shakable** - Optimized bundle sizes

## Installation

```bash
npm install @angular-ai-kit/core @angular-ai-kit/tokens @angular-ai-kit/utils
```

### Tailwind CSS v4 Setup

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

## Components

### Chat Components

| Component               | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `ai-chat-container`     | Main chat container with message list and input  |
| `ai-message-list`       | Scrollable message list with auto-scroll         |
| `ai-user-message`       | User message bubble with edit/copy actions       |
| `ai-message-actions`    | Action buttons for messages (copy, edit, delete) |
| `ai-prompt-suggestions` | Suggested prompts for starting conversations     |
| `ai-conversation-list`  | List of conversation threads                     |

### Display Components

| Component              | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `ai-response`          | AI response with streaming support and actions |
| `ai-markdown-renderer` | Markdown rendering with syntax highlighting    |
| `ai-code-block`        | Code blocks with language detection and copy   |
| `ai-feedback-buttons`  | Thumbs up/down feedback buttons                |
| `ai-response-actions`  | Response action bar (copy, regenerate)         |

### UI Components

| Component        | Description                          |
| ---------------- | ------------------------------------ |
| `ai-icon-button` | Icon button with variants and states |

### Directives

| Directive           | Description                                  |
| ------------------- | -------------------------------------------- |
| `aiCopyToClipboard` | Copy text to clipboard with keyboard support |
| `aiAutoResize`      | Auto-resize textareas based on content       |
| `aiClickOutside`    | Detect clicks outside elements               |
| `aiFocusTrap`       | Trap focus for modals and dialogs            |

### Utilities

| Utility        | Description                                          |
| -------------- | ---------------------------------------------------- |
| `cn()`         | Class name merging with Tailwind conflict resolution |
| `tokenCounter` | Approximate GPT-style token counting                 |
| `formatters`   | Date, number, and text formatting utilities          |
| `validators`   | Message, file, and input validation                  |

## Usage

```typescript
import {
  AiChatContainerComponent,
  AiResponseComponent,
  AiUserMessageComponent,
} from '@angular-ai-kit/core';

@Component({
  imports: [
    AiChatContainerComponent,
    AiResponseComponent,
    AiUserMessageComponent,
  ],
  template: `
    <ai-chat-container>
      @for (message of messages(); track message.id) {
        @if (message.role === 'user') {
          <ai-user-message [content]="message.content" />
        } @else {
          <ai-response [content]="message.content" />
        }
      }
    </ai-chat-container>
  `,
})
export class ChatComponent {
  messages = signal<Message[]>([]);
}
```

## Packages

| Package                  | Description                            |
| ------------------------ | -------------------------------------- |
| `@angular-ai-kit/core`   | Core components, directives, and types |
| `@angular-ai-kit/tokens` | Design tokens and theming              |
| `@angular-ai-kit/utils`  | Utility functions and helpers          |

## Development

This project uses Nx for monorepo management.

```bash
# Run demo app
nx serve demo

# Build all packages
nx run-many --target=build --all

# Build specific package
nx build angular-ai-kit

# Lint all packages
nx run-many --target=lint --all

# Format code
nx format:write
```

## Project Structure

```
angular-ai-kit/
├── packages/
│   ├── angular-ai-kit/     # Main library
│   ├── tokens/             # Design tokens
│   └── utils/              # Utilities
├── apps/
│   └── demo/               # Demo application
└── tools/                  # Build tools
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
# Clone the repository
git clone https://github.com/nicosabena/angular-ai-kit.git

# Install dependencies
npm install

# Run demo app
nx serve demo
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Links

- [Documentation](https://github.com/nicosabena/angular-ai-kit#readme)
- [Issues](https://github.com/nicosabena/angular-ai-kit/issues)
- [Angular](https://angular.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Spartan UI](https://www.spartan.ng/)

---

Made with Angular for the Angular community
