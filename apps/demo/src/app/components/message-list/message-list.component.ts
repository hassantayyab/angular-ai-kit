import { ChatMessage } from '@angular-ai-kit/core';
import { HlmSkeleton } from '@angular-ai-kit/spartan-ui/skeleton';
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
  input,
  output,
  viewChild,
} from '@angular/core';
import { MessageBubbleComponent } from '../message-bubble';

/**
 * Demo MessageListComponent
 *
 * Scrollable message list with Spartan UI components.
 * Uses native scrolling and HlmSkeleton for loading.
 *
 * @example
 * ```html
 * <app-message-list
 *   [messages]="messages"
 *   [loading]="isLoading"
 *   [autoScroll]="true"
 *   (messageCopy)="handleCopy($event)"
 *   (messageRegenerate)="handleRegenerate($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [MessageBubbleComponent, HlmSkeleton],
  host: {
    class: 'app-message-list-host block h-full',
  },
})
export class MessageListComponent implements AfterViewInit {
  // ==========================================
  // Dependencies
  // ==========================================

  private platformId = inject(PLATFORM_ID);

  // ==========================================
  // Inputs
  // ==========================================

  /** Array of chat messages to display */
  messages = input.required<ChatMessage[]>();

  /** Whether to show loading/typing indicator */
  loading = input<boolean>(false);

  /** Custom CSS classes to apply to the container */
  customClasses = input<string>('');

  /** Whether to automatically scroll to bottom on new messages */
  autoScroll = input<boolean>(true);

  /** Whether to show avatars for each message */
  showAvatars = input<boolean>(true);

  /** Message to show when there are no messages */
  emptyMessage = input<string>('No messages yet');

  // ==========================================
  // Outputs
  // ==========================================

  /** Emitted when a message's copy button is clicked */
  messageCopy = output<{ content: string; message: ChatMessage }>();

  /** Emitted when a message's regenerate button is clicked */
  messageRegenerate = output<ChatMessage>();

  // ==========================================
  // Template References
  // ==========================================

  scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Container classes */
  containerClasses = computed(() => {
    return cn('app-message-list', 'h-full', this.customClasses());
  });

  /** Messages wrapper classes */
  messagesWrapperClasses = computed(() => {
    return cn('flex flex-col gap-4', 'p-4');
  });

  /** Empty state classes */
  emptyStateClasses = computed(() => {
    return cn(
      'app-message-list-empty',
      'flex items-center justify-center',
      'min-h-[200px] h-full',
      'text-center'
    );
  });

  /** Typing indicator classes */
  typingIndicatorClasses = computed(() => {
    return cn(
      'app-typing-indicator',
      'flex items-center gap-3 p-4',
      'rounded-xl',
      'bg-[var(--card)] border border-[var(--border)]'
    );
  });

  // ==========================================
  // Lifecycle
  // ==========================================

  constructor() {
    // Auto-scroll effect when messages change or loading state changes
    effect(() => {
      if (this.autoScroll()) {
        const messagesCount = this.messages().length;
        const isLoading = this.loading();

        if (messagesCount > 0 || isLoading) {
          this.scrollToBottom();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  // ==========================================
  // Methods
  // ==========================================

  /** Scrolls the message list to the bottom */
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

  /** Handle message copy event */
  handleMessageCopy(content: string, message: ChatMessage): void {
    this.messageCopy.emit({ content, message });
  }

  /** Handle message regenerate event */
  handleMessageRegenerate(message: ChatMessage): void {
    this.messageRegenerate.emit(message);
  }
}
