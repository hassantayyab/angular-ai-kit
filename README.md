# Angular AI Kit

[![npm @angular-ai-kit/core](https://img.shields.io/npm/v/@angular-ai-kit/core?label=%40angular-ai-kit%2Fcore&color=dd0031)](https://www.npmjs.com/package/@angular-ai-kit/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-v21-dd0031?logo=angular)](https://angular.dev)

A modern, **signal-based** component library for building AI chat interfaces in **Angular v21**.

[Live Demo](https://angular-ai-kit.vercel.app) · [Documentation](https://angular-ai-kit.vercel.app/docs) · [GitHub](https://github.com/hassantayyab/angular-ai-kit)

---

## Installation

```bash
ng add @angular-ai-kit/core
```

**That's it!** Everything is configured automatically:

- All dependencies installed (Tailwind, highlight.js, icons, etc.)
- PostCSS configured
- Styles and theming set up
- Dark mode auto-detects your system preference

---

## Quick Start

```typescript
import {
  AiResponseComponent,
  UserMessage,
  UserMessageComponent,
} from '@angular-ai-kit/core';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [UserMessageComponent, AiResponseComponent],
  template: `
    <div class="bg-background min-h-screen p-8">
      <ai-user-message [message]="userMessage()" />
      <ai-response [content]="aiContent()" [isStreaming]="false" />
    </div>
  `,
})
export class ChatComponent {
  userMessage = signal<UserMessage>({
    id: '1',
    role: 'user',
    content: 'Hello!',
    timestamp: new Date(),
  });

  aiContent = signal(`## Hello!

I can help you with:
- Answer questions
- Write code
- Explain concepts
  `);
}
```

---

## Features

- **Angular v21** - Latest features with signals, control flow, and zoneless support
- **Tailwind CSS v4** - Modern utility-first styling
- **Auto Dark Mode** - Detects system preference automatically
- **Accessible** - WCAG AA compliant with keyboard navigation
- **SSR Compatible** - Server-side rendering and hydration ready
- **Tree-shakable** - Optimized bundle sizes

---

## Components

### Chat Components

| Component                    | Selector                  | Description                        |
| ---------------------------- | ------------------------- | ---------------------------------- |
| `ChatContainerComponent`     | `<ai-chat-container>`     | Main layout wrapper for chat       |
| `MessageListComponent`       | `<ai-message-list>`       | Scrollable message display         |
| `UserMessageComponent`       | `<ai-user-message>`       | User message bubble with edit/copy |
| `PromptSuggestionsComponent` | `<ai-prompt-suggestions>` | Suggested prompts                  |

### Display Components

| Component                   | Selector                 | Description                          |
| --------------------------- | ------------------------ | ------------------------------------ |
| `AiResponseComponent`       | `<ai-response>`          | AI response with markdown rendering  |
| `CodeBlockComponent`        | `<ai-code-block>`        | Syntax highlighting with copy button |
| `MarkdownRendererComponent` | `<ai-markdown-renderer>` | Parse and render markdown            |
| `FeedbackButtonsComponent`  | `<ai-feedback-buttons>`  | Thumbs up/down toggle buttons        |

### Directives

| Directive                  | Selector              | Description                   |
| -------------------------- | --------------------- | ----------------------------- |
| `CopyToClipboardDirective` | `[aiCopyToClipboard]` | Copy text to clipboard        |
| `AutoResizeDirective`      | `[aiAutoResize]`      | Auto-resize textarea          |
| `ClickOutsideDirective`    | `[aiClickOutside]`    | Detect clicks outside element |

---

## Manual Setup

If you prefer to configure things manually instead of using `ng add`:

### 1. Install Packages

```bash
npm install @angular-ai-kit/core @angular-ai-kit/utils @angular-ai-kit/tokens
npm install tailwindcss@^4 @tailwindcss/postcss highlight.js marked dompurify
npm install @ng-icons/core @ng-icons/lucide
```

### 2. Configure PostCSS

Create `.postcssrc.json`:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

### 3. Configure Styles

See the [full styles.css template](https://github.com/hassantayyab/angular-ai-kit/blob/main/packages/angular-ai-kit/schematics/ng-add/index.ts) for the complete CSS configuration.

---

## Development

```bash
# Clone the repository
git clone https://github.com/hassantayyab/angular-ai-kit.git
cd angular-ai-kit

# Install dependencies
npm install

# Run demo app
npm run dev

# Build packages
npm run build:libs
```

---

## Links

- [Live Demo](https://angular-ai-kit.vercel.app)
- [Documentation](https://angular-ai-kit.vercel.app/docs)
- [GitHub](https://github.com/hassantayyab/angular-ai-kit)
- [npm](https://www.npmjs.com/package/@angular-ai-kit/core)

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with Angular for the Angular community
