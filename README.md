# Angular AI Kit

[![npm @angular-ai-kit/core](https://img.shields.io/npm/v/@angular-ai-kit/core?label=%40angular-ai-kit%2Fcore&color=dd0031)](https://www.npmjs.com/package/@angular-ai-kit/core)
[![npm @angular-ai-kit/utils](https://img.shields.io/npm/v/@angular-ai-kit/utils?label=%40angular-ai-kit%2Futils&color=dd0031)](https://www.npmjs.com/package/@angular-ai-kit/utils)
[![npm @angular-ai-kit/tokens](https://img.shields.io/npm/v/@angular-ai-kit/tokens?label=%40angular-ai-kit%2Ftokens&color=dd0031)](https://www.npmjs.com/package/@angular-ai-kit/tokens)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-v21-dd0031?logo=angular)](https://angular.dev)

A modern, **signal-based** component library for building AI chat interfaces in **Angular v21**.

Built with **Tailwind CSS v4**, TypeScript strict mode, and full SSR/hydration support.

[Live Demo](https://angular-ai-kit.vercel.app) · [Documentation](https://angular-ai-kit.vercel.app/docs) · [GitHub](https://github.com/hassantayyab/angular-ai-kit)

---

## Features

- **Angular v21** - Latest features with signals, control flow, and zoneless support
- **Tailwind CSS v4** - Modern utility-first styling with CSS-only
- **Spartan UI** - Built on [Spartan UI](https://www.spartan.ng/) primitives
- **Accessible** - WCAG AA compliant with keyboard navigation and screen reader support
- **Dark Mode** - Built-in theme support with CSS custom properties
- **TypeScript** - Fully typed with strict mode enabled
- **SSR Compatible** - Server-side rendering and hydration ready
- **Tree-shakable** - Optimized bundle sizes

---

## Quick Start

### 1. Install Packages

```bash
npm install @angular-ai-kit/core @angular-ai-kit/utils @angular-ai-kit/tokens
```

### 2. Install Peer Dependencies

```bash
npm install tailwindcss@^4.0.0 @tailwindcss/postcss highlight.js marked dompurify
```

**Optional (for icons):**

```bash
npm install @ng-icons/core @ng-icons/lucide
```

### 3. Configure Tailwind CSS v4

Create `.postcssrc.json` in your project root:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

Add Tailwind to your `styles.css`:

```css
@import 'tailwindcss';
```

### 4. Add Theme Tokens

Import the design tokens in your `styles.css`:

```css
@import '@angular-ai-kit/tokens/tokens/theme.css';
```

### 5. Use Your First Component

```typescript
import { Component, signal } from '@angular/core';
import { AIResponseComponent, ChatInputComponent } from '@angular-ai-kit/core';

@Component({
  selector: 'app-chat',
  imports: [AIResponseComponent, ChatInputComponent],
  template: `
    <div class="flex min-h-screen flex-col bg-background">
      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4">
        @for (message of messages(); track $index) {
          <ai-response [content]="message" />
        }
      </div>

      <!-- Input -->
      <div class="border-t border-border p-4">
        <ai-chat-input
          placeholder="Send a message..."
          (messageSubmit)="handleMessage($event)"
        />
      </div>
    </div>
  `,
})
export class ChatComponent {
  messages = signal<string[]>([]);

  handleMessage(content: string) {
    this.messages.update((msgs) => [...msgs, content]);
  }
}
```

---

## Packages

| Package                                                                                  | Description                   |
| ---------------------------------------------------------------------------------------- | ----------------------------- |
| [`@angular-ai-kit/core`](https://www.npmjs.com/package/@angular-ai-kit/core)             | Components, directives, types |
| [`@angular-ai-kit/tokens`](https://www.npmjs.com/package/@angular-ai-kit/tokens)         | Design tokens and theming     |
| [`@angular-ai-kit/utils`](https://www.npmjs.com/package/@angular-ai-kit/utils)           | Utility functions and helpers |

---

## Components

### Chat Components

| Component                  | Selector                  | Description                           |
| -------------------------- | ------------------------- | ------------------------------------- |
| `ChatContainerComponent`   | `<ai-chat-container>`     | Main layout wrapper for chat          |
| `MessageListComponent`     | `<ai-message-list>`       | Scrollable message display            |
| `UserMessageComponent`     | `<ai-user-message>`       | User message bubble with edit/copy    |
| `MessageActionsComponent`  | `<ai-message-actions>`    | Copy and edit action buttons          |
| `PromptSuggestionsComponent` | `<ai-prompt-suggestions>` | Suggested prompts for starting chats |
| `ConversationListComponent` | `<ai-conversation-list>` | Conversation history sidebar          |

### Display Components

| Component                   | Selector                 | Description                             |
| --------------------------- | ------------------------ | --------------------------------------- |
| `AIResponseComponent`       | `<ai-response>`          | AI response with markdown rendering     |
| `CodeBlockComponent`        | `<ai-code-block>`        | Syntax highlighting with copy button    |
| `MarkdownRendererComponent` | `<ai-markdown-renderer>` | Parse and render markdown               |
| `FeedbackButtonsComponent`  | `<ai-feedback-buttons>`  | Thumbs up/down toggle buttons           |
| `ResponseActionsComponent`  | `<ai-response-actions>`  | Copy, regenerate, feedback buttons      |

### UI Components

| Component             | Selector           | Description          |
| --------------------- | ------------------ | -------------------- |
| `IconButtonComponent` | `<ai-icon-button>` | Reusable icon button |

### Directives

| Directive                  | Selector              | Description                   |
| -------------------------- | --------------------- | ----------------------------- |
| `CopyToClipboardDirective` | `[aiCopyToClipboard]` | Copy text to clipboard        |
| `AutoResizeDirective`      | `[aiAutoResize]`      | Auto-resize textarea          |
| `ClickOutsideDirective`    | `[aiClickOutside]`    | Detect clicks outside element |
| `FocusTrapDirective`       | `[aiFocusTrap]`       | Trap focus within element     |

### Utilities

| Utility        | Description                                          |
| -------------- | ---------------------------------------------------- |
| `cn()`         | Class name merging with Tailwind conflict resolution |
| `tokenCounter` | Approximate GPT-style token counting                 |
| `formatters`   | Date, number, and text formatting utilities          |
| `validators`   | Message, file, and input validation                  |

---

## Theming

Components use CSS custom properties for theming. The default theme supports both light and dark modes automatically.

### Using with Tailwind CSS v4

Use semantic color classes like `bg-background`, `text-foreground`, `border-border`:

```html
<div class="bg-card text-card-foreground rounded-lg border border-border p-4">
  Content here
</div>
```

### Dark Mode

Add the `dark` class to your `<html>` element to enable dark mode:

```html
<html class="dark">
  ...
</html>
```

### Customizing Colors

Override CSS variables in your `styles.css`:

```css
:root {
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
}

.dark {
  --primary: #60a5fa;
  --primary-foreground: #000000;
}
```

---

## Development

This project uses [Nx](https://nx.dev) for monorepo management.

```bash
# Clone the repository
git clone https://github.com/hassantayyab/angular-ai-kit.git
cd angular-ai-kit

# Install dependencies
npm install

# Run demo app
npm run dev

# Build all packages
npm run build:libs

# Lint all packages
npm run lint

# Format code
npm run format
```

### Project Structure

```
angular-ai-kit/
├── packages/
│   ├── angular-ai-kit/     # Main component library (@angular-ai-kit/core)
│   ├── tokens/             # Design tokens (@angular-ai-kit/tokens)
│   └── utils/              # Utilities (@angular-ai-kit/utils)
├── apps/
│   └── demo/               # Demo application
└── libs/
    └── spartan-ui/         # Spartan UI components
```

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Links

- [Live Demo](https://angular-ai-kit.vercel.app)
- [Documentation](https://angular-ai-kit.vercel.app/docs)
- [GitHub Repository](https://github.com/hassantayyab/angular-ai-kit)
- [Issue Tracker](https://github.com/hassantayyab/angular-ai-kit/issues)
- [npm Packages](https://www.npmjs.com/org/angular-ai-kit)

### Related

- [Angular](https://angular.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Spartan UI](https://www.spartan.ng/)
- [highlight.js](https://highlightjs.org)
- [marked](https://marked.js.org)

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with Angular for the Angular community
