# @angular-ai-kit/core

AI-focused UI components for Angular v21. Build beautiful chat interfaces with markdown rendering, code highlighting, and more.

## Installation

```bash
ng add @angular-ai-kit/core
```

That's it! Everything is configured automatically:

- All dependencies installed
- Tailwind CSS v4 configured
- PostCSS configured
- Styles and theming set up
- Dark mode auto-detects your system preference

## Usage

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
    content: 'Hello! How can you help me?',
    timestamp: new Date(),
  });

  aiContent = signal(`## Welcome!

I can help you with many things:

- Answer questions
- Write code
- Explain concepts

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`
  `);
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
| `AiResponseComponent`       | `<ai-response>`          | AI response with markdown rendering  |
| `CodeBlockComponent`        | `<ai-code-block>`        | Syntax highlighting with copy button |
| `MarkdownRendererComponent` | `<ai-markdown-renderer>` | Parse and render markdown            |
| `FeedbackButtonsComponent`  | `<ai-feedback-buttons>`  | Thumbs up/down toggle buttons        |
| `ResponseActionsComponent`  | `<ai-response-actions>`  | Copy, regenerate, feedback buttons   |

### Directives

| Directive                  | Selector              | Description                   |
| -------------------------- | --------------------- | ----------------------------- |
| `CopyToClipboardDirective` | `[aiCopyToClipboard]` | Copy text to clipboard        |
| `AutoResizeDirective`      | `[aiAutoResize]`      | Auto-resize textarea          |
| `ClickOutsideDirective`    | `[aiClickOutside]`    | Detect clicks outside element |
| `FocusTrapDirective`       | `[aiFocusTrap]`       | Trap focus within element     |

## Features

- **Signal-based**: Built with Angular v21 signals for optimal performance
- **Standalone**: No NgModules required
- **Tailwind CSS v4**: Modern styling with CSS variables
- **Dark Mode**: Auto-detects system preference (or use `class="dark"` on html)
- **Accessible**: WCAG AA compliant with keyboard navigation
- **SSR Compatible**: Works with Angular SSR/Hydration
- **Zoneless**: Compatible with zoneless change detection

## Manual Installation

If you prefer manual setup:

```bash
npm install @angular-ai-kit/core @angular-ai-kit/utils @angular-ai-kit/tokens
npm install tailwindcss@^4 @tailwindcss/postcss highlight.js marked dompurify
npm install @ng-icons/core @ng-icons/lucide
```

Then see the [full setup guide](https://github.com/hassantayyab/angular-ai-kit#manual-setup) for CSS configuration.

## Documentation

- **Demo & Docs**: [https://angular-ai-kit.vercel.app](https://angular-ai-kit.vercel.app)
- **GitHub**: [https://github.com/hassantayyab/angular-ai-kit](https://github.com/hassantayyab/angular-ai-kit)

## License

MIT
