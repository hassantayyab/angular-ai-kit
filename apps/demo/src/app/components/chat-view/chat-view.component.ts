import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { cn } from '@angular-ai-kit/utils';
import { ChatContainerComponent, ChatMessage } from '@angular-ai-kit/core';
import { ChatService } from '../../services/chat.service';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

/**
 * ChatViewComponent
 *
 * Main chat interface that combines the message display, empty state,
 * and input components into a cohesive chat experience.
 *
 * @example
 * ```html
 * <app-chat-view
 *   [showMobileMenuButton]="true"
 *   (mobileMenuClick)="openSidebar()"
 * />
 * ```
 */
@Component({
  selector: 'app-chat-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ChatContainerComponent, ChatInputComponent, EmptyStateComponent],
  host: {
    class: 'app-chat-view-host flex flex-col h-full',
  },
  template: `
    <div [class]="containerClasses()">
      <!-- Header (Mobile only - shows menu button) -->
      @if (showMobileMenuButton()) {
        <header [class]="headerClasses()">
          <button
            type="button"
            [class]="menuButtonClasses()"
            (click)="handleMenuClick()"
            aria-label="Open sidebar menu"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1
            class="flex-1 truncate text-center text-sm font-medium text-[var(--foreground)]"
          >
            {{ conversationTitle() }}
          </h1>

          <!-- Spacer for centering -->
          <div class="w-9"></div>
        </header>
      }

      <!-- Main Chat Area -->
      <div [class]="chatAreaClasses()">
        @if (isEmpty()) {
          <!-- Empty State -->
          <app-empty-state (promptSelect)="handlePromptSelect($event)" />
        } @else {
          <!-- Chat Container with Messages -->
          <ai-chat-container
            [messages]="messages()"
            [loading]="isLoading()"
            [showHeader]="false"
            [showFooter]="false"
            [autoScroll]="true"
            [showAvatars]="true"
            [customClasses]="'flex-1 flex flex-col min-h-0'"
            (messageCopy)="handleMessageCopy($event)"
            (messageRegenerate)="handleMessageRegenerate($event)"
          />
        }
      </div>

      <!-- Input Area -->
      <div [class]="inputAreaClasses()">
        <div class="mx-auto w-full max-w-3xl">
          <app-chat-input
            [disabled]="isLoading()"
            [placeholder]="'Message Angular AI Kit...'"
            (messageSend)="handleSendMessage($event)"
          />
        </div>
      </div>
    </div>
  `,
})
export class ChatViewComponent {
  private chatService = inject(ChatService);

  // Inputs
  showMobileMenuButton = input<boolean>(false);

  // Outputs
  mobileMenuClick = output<void>();

  // Computed from service
  messages = this.chatService.messages;
  isLoading = this.chatService.isLoading;
  isEmpty = this.chatService.isEmptyConversation;

  conversationTitle = computed(() => {
    const conversation = this.chatService.activeConversation();
    return conversation?.title ?? 'New conversation';
  });

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

  menuButtonClasses = computed(() => {
    return cn(
      'flex items-center justify-center',
      'h-9 w-9',
      'rounded-lg',
      'text-[var(--foreground-muted)]',
      'hover:text-[var(--foreground)]',
      'hover:bg-[var(--accent)]',
      'transition-colors duration-200'
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

  handleMessageCopy(event: { content: string; message: ChatMessage }): void {
    // Copy handled by the component, could add toast notification here
  }

  handleMessageRegenerate(message: ChatMessage): void {
    this.chatService.regenerateLastMessage();
  }

  handleMenuClick(): void {
    this.mobileMenuClick.emit();
  }
}
