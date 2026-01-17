import {
  ChatInputComponent,
  ChatMessage,
  MessageListComponent,
  PromptSuggestion,
} from '@angular-ai-kit/core';
import { cn } from '@angular-ai-kit/utils';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { TopNavComponent } from '../top-nav';

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
    TopNavComponent,
  ],
  host: {
    class: 'app-chat-view-host flex flex-col h-full',
  },
})
export class ChatViewComponent implements AfterViewInit {
  private chatService = inject(ChatService);
  private platformId = inject(PLATFORM_ID);

  // Scroll container reference
  private scrollContainer =
    viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  // Computed from service
  messages = this.chatService.messages;
  isLoading = this.chatService.isLoading;
  isEmpty = this.chatService.isEmptyConversation;

  // Quick suggestions (shown only when conversation is empty)
  chatSuggestions = signal<PromptSuggestion[]>([
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

  // Computed classes
  containerClasses = computed(() => {
    return cn('app-chat-view', 'flex flex-col', 'h-full', 'bg-background');
  });

  scrollAreaClasses = computed(() => {
    return cn(
      'flex-1',
      'overflow-y-auto overflow-x-hidden',
      'min-h-0' // Critical for flex scroll behavior
    );
  });

  inputAreaClasses = computed(() => {
    return cn('shrink-0', 'bg-background');
  });

  constructor() {
    // Auto-scroll when messages change or loading state changes
    effect(() => {
      const messagesCount = this.messages().length;
      const isLoading = this.isLoading();

      if (messagesCount > 0 || isLoading) {
        this.scrollToBottom();
      }
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

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

  /** Scrolls chat to the bottom */
  private scrollToBottom(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    requestAnimationFrame(() => {
      const container = this.scrollContainer()?.nativeElement;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
  }
}
