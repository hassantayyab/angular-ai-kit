import { ChatMessage } from '@angular-ai-kit/core';
import {
  HlmSidebarService,
  HlmSidebarTrigger,
} from '@angular-ai-kit/spartan-ui/sidebar';
import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import {
  ChatInputComponent,
  ChatSuggestion,
} from '../chat-input/chat-input.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { MessageListComponent } from '../message-list';

/**
 * ChatViewComponent
 *
 * Main chat interface that combines the message display, empty state,
 * and input components into a cohesive chat experience.
 *
 * @example
 * ```html
 * <app-chat-view />
 * ```
 */
@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MessageListComponent,
    ChatInputComponent,
    EmptyStateComponent,
    HlmSidebarTrigger,
  ],
  host: {
    class: 'app-chat-view-host flex flex-col h-full',
  },
})
export class ChatViewComponent {
  private chatService = inject(ChatService);
  protected sidebarService = inject(HlmSidebarService);

  // Computed from service
  messages = this.chatService.messages;
  isLoading = this.chatService.isLoading;
  isEmpty = this.chatService.isEmptyConversation;

  // Quick suggestions (shown only when conversation is empty)
  chatSuggestions = signal<ChatSuggestion[]>([
    {
      icon: '💡',
      label: 'Explain components',
      prompt: 'Can you explain how the chat components work?',
    },
    {
      icon: '🎨',
      label: 'Customize styling',
      prompt: 'How can I customize the styling and themes?',
    },
    {
      icon: '⚡',
      label: 'Performance tips',
      prompt: 'What are some performance best practices?',
    },
  ]);

  /** Get suggestions to show (only when empty) */
  activeSuggestions = computed(() => {
    return this.isEmpty() ? this.chatSuggestions() : [];
  });

  conversationTitle = computed(() => {
    const conversation = this.chatService.activeConversation();
    return conversation?.title ?? 'New conversation';
  });

  // Check if mobile
  isMobile = this.sidebarService.isMobile;

  // Computed classes
  containerClasses = computed(() => {
    return cn(
      'app-chat-view',
      'flex flex-col',
      'h-full',
      'bg-[var(--background)]'
    );
  });

  headerClasses = computed(() => {
    return cn(
      'flex items-center gap-2',
      'px-4 py-3',
      'border-b border-[var(--border)]',
      'bg-[var(--background)]',
      'md:hidden' // Only show on mobile
    );
  });

  chatAreaClasses = computed(() => {
    return cn('flex-1', 'flex flex-col', 'min-h-0', 'overflow-hidden');
  });

  inputAreaClasses = computed(() => {
    return cn(
      'shrink-0',
      'border-t border-[var(--border)]',
      'bg-[var(--background)]'
    );
  });

  // Methods
  handleSendMessage(content: string): void {
    this.chatService.sendMessage(content);
  }

  handlePromptSelect(prompt: string): void {
    this.chatService.sendMessage(prompt);
  }

  handleMessageCopy(_event: { content: string; message: ChatMessage }): void {
    // Copy handled by the component, could add toast notification here
  }

  handleMessageRegenerate(_message: ChatMessage): void {
    this.chatService.regenerateLastMessage();
  }
}
