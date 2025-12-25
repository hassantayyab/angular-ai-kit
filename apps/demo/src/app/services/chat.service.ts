import { ChatMessage } from '@angular-ai-kit/core';
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

/**
 * Canned AI responses for demo purposes
 */
const AI_RESPONSES = [
  "That's a great question! Let me help you with that. The Angular AI Kit provides a comprehensive set of components designed specifically for building AI chat interfaces. Each component follows Angular best practices and is fully customizable.",
  "I understand what you're looking for. Here's what I can tell you: This library is built with **Angular v21** and uses **Tailwind CSS v4** for styling. It supports both light and dark themes out of the box.",
  'Excellent point! The chat components support:\n\n- **Real-time streaming** for AI responses\n- **Markdown rendering** for rich text\n- **Code highlighting** for technical content\n- **Copy to clipboard** functionality\n- **Mobile-responsive** design',
  "I'd be happy to elaborate on that. The component architecture follows a signal-first approach, making it highly performant and compatible with Angular's zoneless change detection.",
  "That's an interesting use case! You can easily customize the appearance using CSS custom properties (variables) or by passing custom classes to each component. The zinc color palette provides a modern, professional look.",
  'Great observation! The library is designed to be framework-agnostic when it comes to AI providers. You can integrate it with OpenAI, Anthropic, Google AI, or any other provider of your choice.',
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
   * Send a user message and get a simulated AI response
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

    // Simulate AI response
    this.isLoadingSignal.set(true);

    // Random delay between 1-3 seconds
    const delay = 1000 + Math.random() * 2000;

    await new Promise((resolve) => setTimeout(resolve, delay));

    const aiMessage: ChatMessage = {
      id: this.generateId(),
      role: 'assistant',
      content: this.getRandomResponse(),
      timestamp: new Date(),
    };

    this.addMessageToConversation(conversationId, aiMessage);
    this.isLoadingSignal.set(false);
  }

  /**
   * Regenerate the last assistant message
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

    // Generate new response
    this.isLoadingSignal.set(true);
    const delay = 1000 + Math.random() * 2000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const aiMessage: ChatMessage = {
      id: this.generateId(),
      role: 'assistant',
      content: this.getRandomResponse(),
      timestamp: new Date(),
    };

    this.addMessageToConversation(conversation.id, aiMessage);
    this.isLoadingSignal.set(false);
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
