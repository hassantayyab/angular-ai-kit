import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/**
 * Building a Chat App Guide
 *
 * Step-by-step tutorial for building a complete chat application.
 */
@Component({
  selector: 'app-building-chat-app',
  templateUrl: './building-chat-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DocSectionComponent, DocCodeBlockComponent, RouterLink],
})
export class BuildingChatAppComponent {
  // Step 1: Basic chat container
  readonly step1Code = `// chat.component.ts
import { Component, signal } from '@angular/core';
import {
  AiResponseComponent,
  UserMessageComponent,
  ChatInputComponent,
  TypingIndicatorComponent,
} from '@angular-ai-kit/core';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  imports: [
    AiResponseComponent,
    UserMessageComponent,
    ChatInputComponent,
    TypingIndicatorComponent,
  ],
  template: \`
    <div class="flex h-screen flex-col">
      <!-- Messages area -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        @for (message of messages(); track message.id) {
          @if (message.role === 'user') {
            <ai-user-message [content]="message.content" />
          } @else {
            <ai-response [content]="message.content" />
          }
        }

        @if (isLoading()) {
          <ai-typing-indicator />
        }
      </div>

      <!-- Input area -->
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

  handleSubmit(content: string) {
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    this.messages.update(msgs => [...msgs, userMessage]);

    // Simulate AI response (replace with real API)
    this.isLoading.set(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'This is a simulated response.',
        timestamp: new Date(),
      };
      this.messages.update(msgs => [...msgs, aiMessage]);
      this.isLoading.set(false);
    }, 1500);
  }
}`;

  // Step 2: Add streaming support
  readonly step2Code = `// chat.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private streamingContent = signal('');
  readonly streamingContent$ = this.streamingContent.asReadonly();

  async streamResponse(userMessage: string): Promise<string> {
    // Simulate streaming (replace with real API)
    const fullResponse = \`Here's a response to: "\${userMessage}"\`;
    let currentContent = '';

    for (const char of fullResponse) {
      await new Promise(resolve => setTimeout(resolve, 20));
      currentContent += char;
      this.streamingContent.set(currentContent);
    }

    this.streamingContent.set('');
    return fullResponse;
  }
}

// chat.component.ts (updated)
@Component({
  // ... same imports
  template: \`
    <div class="flex h-screen flex-col">
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        @for (message of messages(); track message.id) {
          @if (message.role === 'user') {
            <ai-user-message [content]="message.content" />
          } @else {
            <ai-response [content]="message.content" />
          }
        }

        <!-- Streaming response -->
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
  private chatService = inject(ChatService);

  messages = signal<Message[]>([]);
  isLoading = signal(false);
  streamingContent = this.chatService.streamingContent$;

  async handleSubmit(content: string) {
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    this.messages.update(msgs => [...msgs, userMessage]);

    // Stream AI response
    this.isLoading.set(true);
    const response = await this.chatService.streamResponse(content);

    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };
    this.messages.update(msgs => [...msgs, aiMessage]);
    this.isLoading.set(false);
  }
}`;

  // Step 3: Add actions
  readonly step3Code = `// chat.component.ts (with actions)
@Component({
  template: \`
    <div class="flex h-screen flex-col">
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        @for (message of messages(); track message.id; let i = $index) {
          @if (message.role === 'user') {
            <ai-user-message
              [content]="message.content"
              (edit)="handleEdit(i, $event)"
              (copy)="handleCopy($event)"
            />
          } @else {
            <ai-response
              [content]="message.content"
              (copy)="handleCopy($event)"
              (regenerate)="handleRegenerate(i)"
            >
              <!-- Custom actions slot -->
              <ai-feedback-buttons
                slot="actions"
                (thumbsUp)="handleFeedback(message.id, 'up')"
                (thumbsDown)="handleFeedback(message.id, 'down')"
              />
            </ai-response>
          }
        }
      </div>

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
  // ... previous code

  handleCopy(content: string) {
    navigator.clipboard.writeText(content);
    // Show toast notification
  }

  handleEdit(index: number, newContent: string) {
    this.messages.update(msgs => {
      const updated = [...msgs];
      updated[index] = { ...updated[index], content: newContent };
      // Optionally regenerate responses after this message
      return updated.slice(0, index + 1);
    });
    // Trigger new AI response
    this.handleSubmit(newContent);
  }

  handleRegenerate(index: number) {
    const previousUserMessage = this.messages()
      .slice(0, index)
      .reverse()
      .find(m => m.role === 'user');

    if (previousUserMessage) {
      // Remove current AI response and regenerate
      this.messages.update(msgs => msgs.slice(0, index));
      this.handleSubmit(previousUserMessage.content);
    }
  }

  handleFeedback(messageId: string, type: 'up' | 'down') {
    console.log(\`Feedback for \${messageId}: \${type}\`);
    // Send to analytics/API
  }
}`;

  // Step 4: Conversation management
  readonly step4Code = `// conversation.service.ts
import { Injectable, signal, computed } from '@angular/core';

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private conversations = signal<Conversation[]>([]);
  private activeId = signal<string | null>(null);

  readonly conversations$ = this.conversations.asReadonly();
  readonly activeConversation = computed(() => {
    const id = this.activeId();
    return this.conversations().find(c => c.id === id) ?? null;
  });

  createConversation(): string {
    const conversation: Conversation = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.conversations.update(convs => [conversation, ...convs]);
    this.activeId.set(conversation.id);
    return conversation.id;
  }

  selectConversation(id: string) {
    this.activeId.set(id);
  }

  addMessage(conversationId: string, message: Message) {
    this.conversations.update(convs =>
      convs.map(c => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          messages: [...c.messages, message],
          updatedAt: new Date(),
          // Auto-generate title from first user message
          title: c.messages.length === 0 && message.role === 'user'
            ? message.content.slice(0, 30) + '...'
            : c.title,
        };
      })
    );
  }

  deleteConversation(id: string) {
    this.conversations.update(convs => convs.filter(c => c.id !== id));
    if (this.activeId() === id) {
      const remaining = this.conversations();
      this.activeId.set(remaining[0]?.id ?? null);
    }
  }
}`;

  // Step 5: Final layout
  readonly step5Code = `// app.component.ts (final layout)
@Component({
  selector: 'app-root',
  template: \`
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-64 border-r border-border bg-card p-4">
        <button
          class="mb-4 w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground"
          (click)="createNewChat()"
        >
          New Chat
        </button>

        <div class="space-y-2">
          @for (conv of conversations(); track conv.id) {
            <button
              class="w-full rounded-lg px-3 py-2 text-left hover:bg-accent"
              [class.bg-accent]="conv.id === activeId()"
              (click)="selectConversation(conv.id)"
            >
              {{ conv.title }}
            </button>
          }
        </div>
      </aside>

      <!-- Main chat area -->
      <main class="flex-1">
        @if (activeConversation(); as conversation) {
          <app-chat [conversation]="conversation" />
        } @else {
          <div class="flex h-full items-center justify-center">
            <ai-prompt-suggestions
              [suggestions]="suggestions"
              (selectPrompt)="startChat($event)"
            />
          </div>
        }
      </main>
    </div>
  \`,
})
export class AppComponent {
  private convService = inject(ConversationService);

  conversations = this.convService.conversations$;
  activeConversation = this.convService.activeConversation;
  activeId = computed(() => this.activeConversation()?.id);

  suggestions = [
    { label: 'Write code', prompt: 'Help me write a function that...' },
    { label: 'Explain concept', prompt: 'Explain how ... works' },
    { label: 'Debug issue', prompt: 'I have a bug where...' },
  ];

  createNewChat() {
    this.convService.createConversation();
  }

  selectConversation(id: string) {
    this.convService.selectConversation(id);
  }

  startChat(prompt: string) {
    this.createNewChat();
    // Trigger message submission
  }
}`;

  // Styling code
  readonly stylingCode = `/* styles.css - Key styles for chat UI */

/* Message container with auto-scroll */
.messages-container {
  scroll-behavior: smooth;
}

/* Keep input fixed at bottom */
.chat-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.chat-input {
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  padding: 1rem;
}`;
}
