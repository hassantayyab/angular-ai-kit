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
import { ChatMessage } from '../../../types';
import { AiResponseComponent } from '../../display/ai-response';
import { UserMessageComponent } from '../user-message';
import { EditEvent } from '../user-message/user-message.types';

/**
 * MessageList Component
 *
 * Displays a scrollable list of chat messages with auto-scroll functionality.
 *
 * @example
 * ```html
 * <ai-message-list
 *   [messages]="messages"
 *   [loading]="isLoading"
 *   [autoScroll]="true"
 *   (messageCopy)="handleCopy($event)"
 *   (messageRegenerate)="handleRegenerate($event)"
 * />
 * ```
 *
 * @usageNotes
 * - Automatically scrolls to bottom when new messages are added
 * - Shows typing indicator when loading is true
 * - Uses virtual scrolling for better performance with many messages
 * - Accessible with role="log" for screen reader announcements
 */
@Component({
  selector: 'ai-message-list',
  templateUrl: './message-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [UserMessageComponent, AiResponseComponent],
  host: {
    class: 'ai-message-list-host',
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

  /**
   * Array of chat messages to display
   */
  messages = input.required<ChatMessage[]>();

  /**
   * Whether to show loading/typing indicator
   * @default false
   */
  loading = input<boolean>(false);

  /**
   * Custom CSS classes to apply to the message list container
   * @default ''
   */
  customClasses = input<string>('');

  /**
   * Whether to automatically scroll to bottom on new messages
   * @default true
   */
  autoScroll = input<boolean>(true);

  /**
   * Whether to show avatars for each message
   * @default true
   */
  showAvatars = input<boolean>(true);

  /**
   * Message to show when there are no messages
   * @default 'No messages yet'
   */
  emptyMessage = input<string>('No messages yet');

  /**
   * Maximum height of the message list
   * @default '100%'
   */
  maxHeight = input<string>('100%');

  // ==========================================
  // Outputs
  // ==========================================

  /**
   * Emitted when a message's copy button is clicked
   */
  messageCopy = output<{ content: string; message: ChatMessage }>();

  /**
   * Emitted when a message's regenerate button is clicked
   */
  messageRegenerate = output<ChatMessage>();

  /**
   * Emitted when a user message is edited
   */
  messageEdit = output<{ event: EditEvent; message: ChatMessage }>();

  // ==========================================
  // Template References
  // ==========================================

  /**
   * Reference to the scroll container element
   * @internal
   */
  scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  // ==========================================
  // Computed Properties
  // ==========================================

  /**
   * Container classes
   */
  containerClasses = computed(() => {
    return cn(
      'ai-message-list',
      'flex flex-col gap-4 p-4',
      'overflow-y-auto overflow-x-hidden',
      'h-full', // Fill parent container height
      this.customClasses()
    );
  });

  /**
   * Empty state classes
   */
  emptyStateClasses = computed(() => {
    return cn(
      'ai-message-list-empty',
      'flex items-center justify-center',
      'min-h-[200px]',
      'text-center'
    );
  });

  /**
   * Typing indicator classes
   */
  typingIndicatorClasses = computed(() => {
    return cn(
      'ai-typing-indicator',
      'p-4 rounded-lg',
      'bg-muted',
      'transition-all duration-200'
    );
  });

  // ==========================================
  // Lifecycle Hooks
  // ==========================================

  constructor() {
    // Auto-scroll effect when messages change or loading state changes
    effect(() => {
      if (this.autoScroll()) {
        // Access messages and loading to track changes
        const messagesCount = this.messages().length;
        const isLoading = this.loading();

        // Trigger scroll when messages or loading changes
        if (messagesCount > 0 || isLoading) {
          this.scrollToBottom();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    // Initial scroll to bottom
    this.scrollToBottom();
  }

  // ==========================================
  // Methods
  // ==========================================

  /**
   * Scrolls the message list to the bottom
   * @internal
   */
  private scrollToBottom(): void {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Use requestAnimationFrame for smooth scroll after render
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

  /**
   * Handle message copy event
   * @internal
   */
  handleMessageCopy(content: string, message: ChatMessage): void {
    this.messageCopy.emit({ content, message });
  }

  /**
   * Handle message regenerate event
   * @internal
   */
  handleMessageRegenerate(message: ChatMessage): void {
    this.messageRegenerate.emit(message);
  }

  /**
   * Handle user message edit event
   * @internal
   */
  handleMessageEdit(event: EditEvent, message: ChatMessage): void {
    this.messageEdit.emit({ event, message });
  }
}
