import {
  AiResponseComponent,
  AssistantMessage,
  ChatInputComponent,
  PromptSuggestionsComponent,
  TypingIndicatorComponent,
  UserMessage,
  UserMessageComponent,
} from '@angular-ai-kit/core';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/**
 * Chat message type for the example
 */
type Message = UserMessage | AssistantMessage;

/**
 * Full Chat Example
 *
 * Complete working chat implementation with all features.
 */
@Component({
  selector: 'app-full-chat-example',
  templateUrl: './full-chat-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    DocSectionComponent,
    DocCodeBlockComponent,
    RouterLink,
    AiResponseComponent,
    UserMessageComponent,
    ChatInputComponent,
    TypingIndicatorComponent,
    PromptSuggestionsComponent,
  ],
})
export class FullChatExampleComponent {
  /** Chat messages */
  messages = signal<Message[]>([]);

  /** Loading state */
  isLoading = signal(false);

  /** Streaming content */
  streamingContent = signal('');

  /** Prompt suggestions */
  readonly suggestions = [
    {
      icon: '💡',
      label: 'Write code',
      prompt: 'Help me write a function that reverses a string',
    },
    {
      icon: '📚',
      label: 'Explain concept',
      prompt: 'Explain how async/await works in JavaScript',
    },
    {
      icon: '🐛',
      label: 'Debug issue',
      prompt: 'Why is my React component re-rendering too often?',
    },
  ];

  /** Simulated AI responses */
  private readonly aiResponses = [
    `Great question! Here's a simple function to reverse a string in JavaScript:

\`\`\`typescript
function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

// Usage
console.log(reverseString('hello')); // 'olleh'
\`\`\`

This works by:
1. Splitting the string into an array of characters
2. Reversing the array
3. Joining it back into a string`,

    `**Async/await** is syntactic sugar over Promises that makes asynchronous code look synchronous.

Here's how it works:

\`\`\`typescript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
}
\`\`\`

Key points:
- \`async\` marks a function as asynchronous
- \`await\` pauses execution until the Promise resolves
- Use \`try/catch\` for error handling`,

    `React components re-render when:

1. **State changes** - Any \`useState\` or \`useReducer\` update
2. **Props change** - Parent passes new prop values
3. **Context changes** - A context value you consume updates
4. **Parent re-renders** - Unless you use \`React.memo\`

**Solutions:**
- Use \`React.memo\` for expensive components
- Use \`useMemo\` for expensive calculations
- Use \`useCallback\` for function props
- Check for unnecessary state updates`,
  ];

  /** Check if chat is empty */
  isEmpty = computed(() => this.messages().length === 0);

  /** Handle message submission */
  handleSubmit(content: string): void {
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    this.messages.update((msgs) => [...msgs, userMessage]);

    // Simulate AI response with streaming
    this.simulateStreamingResponse();
  }

  /** Handle prompt suggestion selection */
  handleSuggestion(prompt: string): void {
    this.handleSubmit(prompt);
  }

  /** Handle copy action */
  handleCopy(content: string): void {
    navigator.clipboard.writeText(content);
  }

  /** Handle regenerate action */
  handleRegenerate(): void {
    // Remove last AI message and regenerate
    const msgs = this.messages();
    // Find last user message index (ES5 compatible)
    let lastUserMsgIndex = -1;
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].role === 'user') {
        lastUserMsgIndex = i;
        break;
      }
    }

    if (lastUserMsgIndex >= 0) {
      this.messages.set(msgs.slice(0, lastUserMsgIndex + 1));
      this.simulateStreamingResponse();
    }
  }

  /** Simulate streaming response */
  private simulateStreamingResponse(): void {
    this.isLoading.set(true);
    this.streamingContent.set('');

    // Pick a random response
    const response =
      this.aiResponses[Math.floor(Math.random() * this.aiResponses.length)];

    // Simulate typing delay
    setTimeout(() => {
      this.isLoading.set(false);
      this.streamWord(response, 0);
    }, 500);
  }

  /** Stream response word by word */
  private streamWord(fullText: string, index: number): void {
    if (index >= fullText.length) {
      // Streaming complete - add to messages
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: fullText,
        timestamp: new Date(),
      };
      this.messages.update((msgs) => [...msgs, aiMessage]);
      this.streamingContent.set('');
      return;
    }

    // Add next character
    this.streamingContent.set(fullText.slice(0, index + 1));

    // Schedule next character
    const delay = fullText[index] === ' ' ? 20 : 10;
    setTimeout(() => this.streamWord(fullText, index + 1), delay);
  }

  /** Clear chat */
  clearChat(): void {
    this.messages.set([]);
    this.streamingContent.set('');
    this.isLoading.set(false);
  }

  /** Code example */
  readonly codeExample = `// Full Chat Component Example
import { Component, signal, computed } from '@angular/core';
import {
  AiResponseComponent,
  UserMessageComponent,
  ChatInputComponent,
  TypingIndicatorComponent,
  PromptSuggestionsComponent,
} from '@angular-ai-kit/core';

@Component({
  selector: 'app-chat',
  imports: [
    AiResponseComponent,
    UserMessageComponent,
    ChatInputComponent,
    TypingIndicatorComponent,
    PromptSuggestionsComponent,
  ],
  template: \`
    <div class="flex h-screen flex-col">
      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        @if (isEmpty()) {
          <ai-prompt-suggestions
            [suggestions]="suggestions"
            (selectPrompt)="handleSubmit($event)"
          />
        }

        @for (message of messages(); track message.id) {
          @if (message.role === 'user') {
            <ai-user-message [content]="message.content" />
          } @else {
            <ai-response
              [content]="message.content"
              (copy)="handleCopy($event)"
            />
          }
        }

        @if (streamingContent()) {
          <ai-response
            [content]="streamingContent()"
            [isStreaming]="true"
          />
        }

        @if (isLoading() && !streamingContent()) {
          <ai-typing-indicator />
        }
      </div>

      <!-- Input -->
      <div class="border-t border-border p-4">
        <ai-chat-input
          [disabled]="isLoading()"
          (messageSubmit)="handleSubmit($event)"
        />
      </div>
    </div>
  \`,
})
export class ChatComponent {
  messages = signal<Message[]>([]);
  isLoading = signal(false);
  streamingContent = signal('');

  isEmpty = computed(() => this.messages().length === 0);

  // ... implementation
}`;
}
