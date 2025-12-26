import { ChatMessage } from '@angular-ai-kit/core';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatInputComponent } from '../chat-input/chat-input.component';
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
 * <app-chat-view
 *   [showMobileMenuButton]="true"
 *   (mobileMenuClick)="openSidebar()"
 * />
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
    HlmButton,
  ],
  host: {
    class: 'app-chat-view-host flex flex-col h-full',
  },
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleMessageCopy(_event: { content: string; message: ChatMessage }): void {
    // Copy handled by the component, could add toast notification here
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleMessageRegenerate(_message: ChatMessage): void {
    this.chatService.regenerateLastMessage();
  }

  handleMenuClick(): void {
    this.mobileMenuClick.emit();
  }
}
