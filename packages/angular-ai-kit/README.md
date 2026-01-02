# @angular-ai-kit/core

AI-focused UI components for Angular v21. Build beautiful chat interfaces with streaming text, markdown rendering, and more.

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
  ChatInputComponent,
  MessageListComponent,
} from '@angular-ai-kit/core';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [ChatInputComponent, AIResponseComponent, MessageListComponent],
  template: `
    <ai-message-list [messages]="messages()" [loading]="loading()" />
    <ai-chat-input (send)="handleSend($event)" [disabled]="loading()" />
  `,
})
export class ChatComponent {
  messages = signal<ChatMessage[]>([]);
  loading = signal(false);

  handleSend(content: string) {
    // Add user message
    this.messages.update((m) => [
      ...m,
      { id: crypto.randomUUID(), role: 'user', content, timestamp: new Date() },
    ]);

    // Send to your AI backend...
  }
}
```

## Components

### Core Components

| Component               | Description                         |
| ----------------------- | ----------------------------------- |
| `<ai-chat-container>`   | Main layout wrapper for chat        |
| `<ai-message-list>`     | Scrollable message display          |
| `<ai-response>`         | AI response with markdown rendering |
| `<ai-user-message>`     | User message display                |
| `<ai-chat-input>`       | Text input with toolbar             |
| `<ai-streaming-text>`   | Typewriter effect for AI responses  |
| `<ai-typing-indicator>` | Animated "AI is thinking" indicator |

### Display Components

| Component                 | Description                        |
| ------------------------- | ---------------------------------- |
| `<ai-code-block>`         | Syntax highlighting with copy      |
| `<ai-markdown-renderer>`  | Parse and render markdown          |
| `<ai-feedback-buttons>`   | Thumbs up/down toggle buttons      |
| `<ai-response-actions>`   | Copy, regenerate, feedback buttons |
| `<ai-message-actions>`    | Copy and edit action buttons       |
| `<ai-prompt-suggestions>` | Suggested prompt badges            |

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

Full documentation: [https://github.com/hassantayyab/angular-ai-kit](https://github.com/hassantayyab/angular-ai-kit)

## License

MIT
