# @angular-ai-kit/core

AI-focused UI components for Angular v21. Build beautiful chat interfaces with markdown rendering, code highlighting, and more.

## Installation

```bash
npm install @angular-ai-kit/core @angular-ai-kit/utils @angular-ai-kit/tokens
```

### Peer Dependencies

```bash
npm install tailwindcss@^4 highlight.js marked dompurify
```

### Optional (for icons)

```bash
npm install @ng-icons/core @ng-icons/lucide
```

## Quick Start

```typescript
import {
  AIResponseComponent,
  ChatContainerComponent,
  MessageListComponent,
  UserMessageComponent,
} from '@angular-ai-kit/core';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [
    ChatContainerComponent,
    MessageListComponent,
    UserMessageComponent,
    AIResponseComponent,
  ],
  template: `
    <ai-chat-container>
      <ai-message-list [messages]="messages()" [loading]="loading()" />
    </ai-chat-container>
  `,
})
export class ChatComponent {
  messages = signal<ChatMessage[]>([]);
  loading = signal(false);
}
```

## Components

### Chat Components

| Component                    | Selector                  | Description                        |
| ---------------------------- | ------------------------- | ---------------------------------- |
| `ChatContainerComponent`     | `<ai-chat-container>`     | Main layout wrapper for chat       |
| `MessageListComponent`       | `<ai-message-list>`       | Scrollable message display         |
| `UserMessageComponent`       | `<ai-user-message>`       | User message bubble with edit/copy |
| `MessageActionsComponent`    | `<ai-message-actions>`    | Copy and edit action buttons       |
| `PromptSuggestionsComponent` | `<ai-prompt-suggestions>` | Suggested prompt badges            |
| `ConversationListComponent`  | `<ai-conversation-list>`  | Conversation history sidebar       |

### Display Components

| Component                   | Selector                 | Description                          |
| --------------------------- | ------------------------ | ------------------------------------ |
| `AIResponseComponent`       | `<ai-response>`          | AI response with markdown rendering  |
| `CodeBlockComponent`        | `<ai-code-block>`        | Syntax highlighting with copy button |
| `MarkdownRendererComponent` | `<ai-markdown-renderer>` | Parse and render markdown            |
| `FeedbackButtonsComponent`  | `<ai-feedback-buttons>`  | Thumbs up/down toggle buttons        |
| `ResponseActionsComponent`  | `<ai-response-actions>`  | Copy, regenerate, feedback buttons   |

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

### Services

| Service                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `MarkdownService`      | Parse markdown with syntax highlighting     |
| `CodeHighlightService` | Syntax highlighting with language detection |

## Features

- **Signal-based**: Built with Angular v21 signals for optimal performance
- **Standalone**: No NgModules required
- **Tailwind CSS v4**: Modern styling with CSS variables
- **Dark Mode**: Automatic theme switching support
- **Accessible**: WCAG AA compliant with keyboard navigation
- **SSR Compatible**: Works with Angular SSR/Hydration
- **Zoneless**: Compatible with zoneless change detection

## Theming

Components use CSS custom properties for theming. Import the design tokens:

```css
/* In your styles.css */
@import '@angular-ai-kit/tokens/theme.css';
```

Or use with Tailwind CSS v4 semantic classes like `bg-card`, `text-foreground`, `border-border`.

## Documentation

- **Demo & Docs**: [https://angular-ai-kit.vercel.app](https://angular-ai-kit.vercel.app)
- **GitHub**: [https://github.com/hassantayyab/angular-ai-kit](https://github.com/hassantayyab/angular-ai-kit)

## License

MIT
