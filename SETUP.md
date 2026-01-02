# Angular AI Kit - Setup Guide

Complete setup instructions for using Angular AI Kit in your Angular v21 project.

## Prerequisites

- Angular v21+
- Node.js 20+
- Tailwind CSS v4 (recommended)

---

## Installation

### 1. Install Packages

```bash
npm install @angular-ai-kit/core @angular-ai-kit/utils @angular-ai-kit/tokens
```

### 2. Install Peer Dependencies

```bash
npm install highlight.js marked dompurify
```

### 3. (Optional) Install Icons

```bash
npm install @ng-icons/core @ng-icons/lucide
```

---

## Styling Setup

### Option A: With Tailwind CSS v4 (Recommended)

If you're using Tailwind CSS v4:

**1. Update your `styles.css`:**

```css
@import 'tailwindcss';
@import '@angular-ai-kit/tokens/tokens/index.css';

/* Register CSS variables as Tailwind colors */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-code: var(--code);
  --color-code-foreground: var(--code-foreground);
}
```

### Option B: Without Tailwind CSS

If you're NOT using Tailwind CSS:

**1. Update your `styles.css`:**

```css
@import '@angular-ai-kit/tokens/tokens/index.css';
```

**2. Add base font styles:**

```css
body {
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}
```

---

## Basic Usage

### Simple Chat Example

```typescript
import {
  AIResponseComponent,
  ChatInputComponent,
  ChatMessage,
  MessageListComponent,
} from '@angular-ai-kit/core';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [MessageListComponent, ChatInputComponent, AIResponseComponent],
  template: `
    <div class="flex h-screen flex-col">
      <div class="flex-1 overflow-hidden">
        <ai-message-list [messages]="messages()" [loading]="loading()" />
      </div>
      <div class="border-t p-4">
        <ai-chat-input (send)="handleSend($event)" [disabled]="loading()" />
      </div>
    </div>
  `,
})
export class ChatComponent {
  messages = signal<ChatMessage[]>([]);
  loading = signal(false);

  handleSend(content: string) {
    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    this.messages.update((m) => [...m, userMessage]);

    // Simulate AI response
    this.loading.set(true);
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Hello! How can I help you today?',
        timestamp: new Date(),
      };
      this.messages.update((m) => [...m, aiMessage]);
      this.loading.set(false);
    }, 1000);
  }
}
```

---

## Dark Mode

Dark mode is controlled by adding the `.dark` class to the `<html>` element.

### Toggle Dark Mode

```typescript
import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  theme = signal<'light' | 'dark'>('light');
  isDark = computed(() => this.theme() === 'dark');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.theme.set(prefersDark ? 'dark' : 'light');

      // Apply theme
      effect(() => {
        document.documentElement.classList.toggle('dark', this.isDark());
      });
    }
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
}
```

---

## Component Reference

### Core Components

| Component                  | Selector                | Description                |
| -------------------------- | ----------------------- | -------------------------- |
| `ChatContainerComponent`   | `<ai-chat-container>`   | Main layout wrapper        |
| `MessageListComponent`     | `<ai-message-list>`     | Scrollable message display |
| `AIResponseComponent`      | `<ai-response>`         | AI response with markdown  |
| `UserMessageComponent`     | `<ai-user-message>`     | User message display       |
| `ChatInputComponent`       | `<ai-chat-input>`       | Text input with toolbar    |
| `StreamingTextComponent`   | `<ai-streaming-text>`   | Typewriter effect          |
| `TypingIndicatorComponent` | `<ai-typing-indicator>` | Loading indicator          |

### Display Components

| Component                    | Selector                  | Description         |
| ---------------------------- | ------------------------- | ------------------- |
| `CodeBlockComponent`         | `<ai-code-block>`         | Syntax highlighting |
| `MarkdownRendererComponent`  | `<ai-markdown-renderer>`  | Markdown rendering  |
| `FeedbackButtonsComponent`   | `<ai-feedback-buttons>`   | Thumbs up/down      |
| `ResponseActionsComponent`   | `<ai-response-actions>`   | Copy, regenerate    |
| `PromptSuggestionsComponent` | `<ai-prompt-suggestions>` | Suggestion chips    |

---

## TypeScript Types

```typescript
import type {
  ChatMessage,
  ChatRole,
  StreamingOptions,
} from '@angular-ai-kit/core';

// Message type
interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
  status?: 'pending' | 'streaming' | 'complete' | 'error';
}

// Role type
type ChatRole = 'user' | 'assistant' | 'system';
```

---

## Troubleshooting

### Components have no styling

Make sure you've imported the CSS tokens:

```css
@import '@angular-ai-kit/tokens/tokens/index.css';
```

### Dark mode not working

Ensure the `.dark` class is on the `<html>` element, not `<body>`:

```typescript
document.documentElement.classList.add('dark'); // Correct
document.body.classList.add('dark'); // Won't work
```

### Tailwind classes not applying

If using Tailwind v4, make sure you've registered the CSS variables in `@theme inline`:

```css
@theme inline {
  --color-background: var(--background);
  /* ... other variables */
}
```

---

## Next Steps

- [Component Documentation](https://github.com/hassantayyab/angular-ai-kit)
- [API Reference](https://github.com/hassantayyab/angular-ai-kit)
- [Examples](https://github.com/hassantayyab/angular-ai-kit)

---

_Last Updated: January 2, 2026_
