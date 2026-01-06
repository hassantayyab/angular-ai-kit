import { ChatMessage, MessageStatus } from '@angular-ai-kit/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

/**
 * Conversation interface for chat history
 */
export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Serializable conversation for localStorage
 */
interface SerializedConversation {
  id: string;
  title: string;
  messages: SerializedMessage[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Serializable message for localStorage
 */
interface SerializedMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

/** Comprehensive markdown demo showcasing all features */
const COMPREHENSIVE_MARKDOWN = `# Welcome to Angular AI Kit

This is a **comprehensive demonstration** of all markdown features supported by the AI Response component.

## Text Formatting

You can use **bold text**, *italic text*, and ~~strikethrough~~. You can also combine them: ***bold and italic***, or ~~**bold strikethrough**~~.

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item 2.1
  - Nested item 2.2
    - Deeply nested item
- Third item

### Ordered Lists

1. First step
2. Second step
   1. Sub-step 2.1
   2. Sub-step 2.2
3. Third step

### Task Lists

- [x] Completed task
- [x] Another completed task
- [ ] Pending task
- [ ] Future task

## Code Examples

### TypeScript

\`\`\`typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

function formatMessage(message: ChatMessage): string {
  const { role, content, timestamp } = message;
  return \`[\${timestamp.toISOString()}] \${role}: \${content}\`;
}

const message: ChatMessage = {
  id: crypto.randomUUID(),
  role: 'assistant',
  content: 'Hello, how can I help you today?',
  timestamp: new Date()
};

console.log(formatMessage(message));
\`\`\`

### Python

\`\`\`python
from dataclasses import dataclass
from datetime import datetime
from typing import Literal

@dataclass
class ChatMessage:
    id: str
    role: Literal['user', 'assistant', 'system']
    content: str
    timestamp: datetime

def format_message(message: ChatMessage) -> str:
    return f"[{message.timestamp.isoformat()}] {message.role}: {message.content}"

# Example usage
message = ChatMessage(
    id="123",
    role="assistant",
    content="Hello! How can I assist you?",
    timestamp=datetime.now()
)
print(format_message(message))
\`\`\`

### JSON Configuration

\`\`\`json
{
  "name": "angular-ai-kit",
  "version": "1.0.0",
  "features": {
    "markdown": true,
    "streaming": true,
    "codeHighlighting": true
  },
  "themes": ["light", "dark"]
}
\`\`\`

### CSS Styling

\`\`\`css
.ai-response {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem;
}

.ai-response:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
\`\`\`

### Bash Commands

\`\`\`bash
# Install dependencies
npm install @angular-ai-kit/core

# Generate a new component
npx nx generate @angular-ai-kit/core:component my-chat

# Run the development server
npm run dev
\`\`\`

Inline code is also supported: \`const greeting = "Hello, World!";\`

## Blockquotes

> This is a simple blockquote. It's great for highlighting important information.

> **Note:** You can use formatting inside blockquotes too.
>
> Even multiple paragraphs work!
>
> > And nested blockquotes as well.

## Tables

| Feature | Status | Notes |
|:--------|:------:|------:|
| Markdown Rendering | ✅ | Full GFM support |
| Code Highlighting | ✅ | Multiple languages |
| Streaming Text | ✅ | Character-by-character |
| Dark Mode | ✅ | CSS variables |
| Copy to Clipboard | ✅ | Per code block |

## Links

- [Angular Documentation](https://angular.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [GitHub Repository](https://github.com/hassantayyab/angular-ai-kit)

## Horizontal Rules

Content above the rule.

---

Content below the rule.

## Mathematical Expressions

While LaTeX isn't natively supported, you can write equations inline: \`E = mc²\` or \`a² + b² = c²\`.

## Summary

This component supports:

1. **Rich text formatting** - Bold, italic, strikethrough
2. **Structured content** - Lists, tables, blockquotes
3. **Code presentation** - Syntax highlighting for 20+ languages
4. **Interactive features** - Copy buttons, action buttons
5. **Accessibility** - Full ARIA support, keyboard navigation`;

/**
 * Canned AI responses for demo purposes - all with markdown formatting
 */
const AI_RESPONSES = [
  COMPREHENSIVE_MARKDOWN,

  `## Great question!

Let me help you with that. The **Angular AI Kit** provides a comprehensive set of components designed specifically for building AI chat interfaces.

### Key Features

- Each component follows Angular **best practices**
- Fully customizable with Tailwind CSS
- Signal-based state management
- SSR/hydration compatible

\`\`\`typescript
// Example usage
@Component({
  template: \`<ai-message-list [messages]="messages()" />\`
})
export class ChatComponent {
  messages = signal<ChatMessage[]>([]);
}
\`\`\`

> All components are **standalone** and support tree-shaking for optimal bundle size.`,

  `## Technology Stack

Here's what I can tell you about our tech stack:

| Technology | Version | Purpose |
|:-----------|:-------:|:--------|
| Angular | v21 | Framework |
| Tailwind CSS | v4 | Styling |
| TypeScript | Latest | Type Safety |

### Theme Support

This library supports both **light** and **dark** themes out of the box. You can toggle themes using:

\`\`\`typescript
document.documentElement.classList.toggle('dark');
\`\`\`

The themes are powered by **CSS custom properties**, making customization seamless.`,

  `## Chat Components Overview

Excellent point! The chat components support:

### Real-time Features
- **Streaming responses** - Character-by-character reveal
- **Typing indicators** - Visual feedback while AI thinks
- **Auto-scroll** - Keeps latest messages visible

### Content Rendering
1. **Markdown rendering** for rich text
2. **Code highlighting** for technical content
3. **Copy to clipboard** functionality
4. **Mobile-responsive** design

\`\`\`css
/* Streaming cursor animation */
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
\`\`\`

> Pro tip: Use the \`isStreaming\` input to show the cursor animation!`,

  `## Component Architecture

I'd be happy to elaborate on that!

The component architecture follows a **signal-first approach**, making it:

- ✅ Highly performant
- ✅ Compatible with zoneless change detection
- ✅ Easy to test and debug

### Example Signal Pattern

\`\`\`typescript
// Signal-based inputs
content = input.required<string>();

// Computed derived state
renderedHtml = computed(() => {
  return this.markdownService.parse(this.content());
});

// Reactive effects
effect(() => {
  console.log('Content changed:', this.content());
});
\`\`\`

This approach ensures **optimal performance** with Angular's OnPush change detection.`,

  `## Customization Guide

That's an interesting use case! Here's how to customize the appearance:

### Using CSS Variables

\`\`\`css
:root {
  --background: theme('colors.zinc.50');
  --foreground: theme('colors.zinc.950');
  --card: theme('colors.white');
  --border: theme('colors.zinc.200');
}

.dark {
  --background: theme('colors.zinc.950');
  --foreground: theme('colors.zinc.50');
  --card: theme('colors.zinc.900');
  --border: theme('colors.zinc.800');
}
\`\`\`

### Custom Classes

You can also pass custom classes to each component:

\`\`\`html
<ai-response
  [content]="message"
  customClasses="shadow-lg border-2"
/>
\`\`\`

The **zinc color palette** provides a modern, professional look that works great in both themes.`,

  `## AI Provider Integration

Great observation! The library is designed to be **framework-agnostic** when it comes to AI providers.

### Supported Providers

| Provider | SDK | Status |
|:---------|:----|:------:|
| OpenAI | \`openai\` | ✅ |
| Anthropic | \`@anthropic-ai/sdk\` | ✅ |
| Google AI | \`@google/generative-ai\` | ✅ |
| Azure OpenAI | \`@azure/openai\` | ✅ |

### Integration Example

\`\`\`typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

async function chat(userMessage: string) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    messages: [{ role: 'user', content: userMessage }],
  });
  return response.content[0].text;
}
\`\`\`

> You can integrate with **any provider** of your choice!`,
];

/**
 * ChatService
 *
 * Manages chat conversations and messages with localStorage persistence.
 * Provides simulated AI responses for demo purposes.
 *
 * @example
 * ```typescript
 * export class ChatComponent {
 *   private chatService = inject(ChatService);
 *
 *   sendMessage(content: string) {
 *     this.chatService.sendMessage(content);
 *   }
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ChatService {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'ai-kit-conversations';

  // State
  private conversationsSignal = signal<Conversation[]>([]);
  private activeConversationIdSignal = signal<string | null>(null);
  private isLoadingSignal = signal(false);

  // Public computed signals
  readonly conversations = this.conversationsSignal.asReadonly();
  readonly activeConversationId = this.activeConversationIdSignal.asReadonly();
  readonly isLoading = this.isLoadingSignal.asReadonly();

  /**
   * Get the active conversation
   */
  readonly activeConversation = computed(() => {
    const id = this.activeConversationIdSignal();
    if (!id) return null;
    return this.conversationsSignal().find((c) => c.id === id) ?? null;
  });

  /**
   * Get messages for the active conversation
   */
  readonly messages = computed(() => {
    return this.activeConversation()?.messages ?? [];
  });

  /**
   * Check if current conversation is empty (no messages)
   */
  readonly isEmptyConversation = computed(() => {
    return this.messages().length === 0;
  });

  constructor() {
    // Load from localStorage on init (browser only)
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();

      // Persist changes to localStorage
      effect(() => {
        const conversations = this.conversationsSignal();
        this.saveToStorage(conversations);
      });
    }
  }

  /**
   * Create a new conversation
   */
  createConversation(): string {
    const id = this.generateId();
    const now = new Date();

    const newConversation: Conversation = {
      id,
      title: 'New conversation',
      messages: [],
      createdAt: now,
      updatedAt: now,
    };

    this.conversationsSignal.update((convos) => [newConversation, ...convos]);
    this.activeConversationIdSignal.set(id);

    return id;
  }

  /**
   * Select a conversation by ID
   */
  selectConversation(id: string): void {
    const exists = this.conversationsSignal().some((c) => c.id === id);
    if (exists) {
      this.activeConversationIdSignal.set(id);
    }
  }

  /**
   * Delete a conversation by ID
   */
  deleteConversation(id: string): void {
    this.conversationsSignal.update((convos) =>
      convos.filter((c) => c.id !== id)
    );

    // If deleted conversation was active, select another or clear
    if (this.activeConversationIdSignal() === id) {
      const remaining = this.conversationsSignal();
      this.activeConversationIdSignal.set(
        remaining.length > 0 ? remaining[0].id : null
      );
    }
  }

  /**
   * Send a user message and get a simulated AI response with streaming
   */
  async sendMessage(content: string): Promise<void> {
    if (!content.trim()) return;

    let conversationId = this.activeConversationIdSignal();

    // Create new conversation if none active
    if (!conversationId) {
      conversationId = this.createConversation();
    }

    const now = new Date();

    // Add user message
    const userMessage: ChatMessage = {
      id: this.generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: now,
    };

    this.addMessageToConversation(conversationId, userMessage);

    // Update conversation title if this is the first message
    const conversation = this.conversationsSignal().find(
      (c) => c.id === conversationId
    );
    if (conversation && conversation.messages.length === 1) {
      this.updateConversationTitle(conversationId, this.generateTitle(content));
    }

    // Simulate AI response with streaming
    this.isLoadingSignal.set(true);

    // Short delay before AI starts responding
    await new Promise((resolve) => setTimeout(resolve, 500));

    const fullResponse = this.getRandomResponse();
    const aiMessageId = this.generateId();

    // Add streaming message with empty content
    const aiMessage: ChatMessage = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      status: 'streaming',
    };

    this.addMessageToConversation(conversationId, aiMessage);
    this.isLoadingSignal.set(false);

    // Stream the response character by character
    await this.streamResponse(conversationId, aiMessageId, fullResponse);
  }

  /**
   * Stream response content character by character
   */
  private async streamResponse(
    conversationId: string,
    messageId: string,
    fullContent: string
  ): Promise<void> {
    const chunkSize = 3; // Characters per chunk
    const delayMs = 15; // Delay between chunks

    for (let i = 0; i < fullContent.length; i += chunkSize) {
      const partialContent = fullContent.slice(0, i + chunkSize);

      this.updateMessageContent(
        conversationId,
        messageId,
        partialContent,
        'streaming'
      );

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    // Mark streaming complete
    this.updateMessageContent(
      conversationId,
      messageId,
      fullContent,
      undefined
    );
  }

  /**
   * Update a message's content and status
   */
  private updateMessageContent(
    conversationId: string,
    messageId: string,
    content: string,
    status: MessageStatus | undefined
  ): void {
    this.conversationsSignal.update((convos) =>
      convos.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          messages: c.messages.map((m) => {
            if (m.id !== messageId) return m;
            return { ...m, content, status };
          }),
          updatedAt: new Date(),
        };
      })
    );
  }

  /**
   * Regenerate the last assistant message with streaming
   */
  async regenerateLastMessage(): Promise<void> {
    const conversation = this.activeConversation();
    if (!conversation) return;

    const messages = conversation.messages;
    if (messages.length === 0) return;

    // Find and remove the last assistant message
    const lastAssistantIndex = messages
      .map((m, i) => ({ m, i }))
      .filter(({ m }) => m.role === 'assistant')
      .pop()?.i;

    if (lastAssistantIndex === undefined) return;

    // Remove the last assistant message
    this.conversationsSignal.update((convos) =>
      convos.map((c) => {
        if (c.id !== conversation.id) return c;
        return {
          ...c,
          messages: c.messages.filter((_, i) => i !== lastAssistantIndex),
          updatedAt: new Date(),
        };
      })
    );

    // Generate new response with streaming
    this.isLoadingSignal.set(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const fullResponse = this.getRandomResponse();
    const aiMessageId = this.generateId();

    // Add streaming message
    const aiMessage: ChatMessage = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      status: 'streaming',
    };

    this.addMessageToConversation(conversation.id, aiMessage);
    this.isLoadingSignal.set(false);

    // Stream the response
    await this.streamResponse(conversation.id, aiMessageId, fullResponse);
  }

  /**
   * Clear all conversations
   */
  clearAllConversations(): void {
    this.conversationsSignal.set([]);
    this.activeConversationIdSignal.set(null);
  }

  // Private methods

  private addMessageToConversation(
    conversationId: string,
    message: ChatMessage
  ): void {
    this.conversationsSignal.update((convos) =>
      convos.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          messages: [...c.messages, message],
          updatedAt: new Date(),
        };
      })
    );
  }

  private updateConversationTitle(id: string, title: string): void {
    this.conversationsSignal.update((convos) =>
      convos.map((c) => {
        if (c.id !== id) return c;
        return { ...c, title };
      })
    );
  }

  private generateTitle(content: string): string {
    // Use first 50 chars of message as title
    const truncated = content.slice(0, 50);
    return truncated.length < content.length ? `${truncated}...` : truncated;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  private getRandomResponse(): string {
    const index = Math.floor(Math.random() * AI_RESPONSES.length);
    return AI_RESPONSES[index];
  }

  private loadFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return;

      const parsed: SerializedConversation[] = JSON.parse(stored);
      const conversations: Conversation[] = parsed.map((c) => ({
        id: c.id,
        title: c.title,
        messages: c.messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: new Date(m.timestamp),
        })),
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
      }));

      this.conversationsSignal.set(conversations);

      // Select the most recent conversation
      if (conversations.length > 0) {
        this.activeConversationIdSignal.set(conversations[0].id);
      }
    } catch {
      // Invalid data, start fresh
      this.conversationsSignal.set([]);
    }
  }

  private saveToStorage(conversations: Conversation[]): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const serialized: SerializedConversation[] = conversations.map((c) => ({
        id: c.id,
        title: c.title,
        messages: c.messages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.timestamp.toISOString(),
        })),
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      }));

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(serialized));
    } catch {
      // Storage full or unavailable, ignore
    }
  }
}
