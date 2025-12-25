import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  computed,
} from '@angular/core';
import { MessageListComponent } from '../message-list';
import { ChatMessage } from '../../../types';
import { cn } from '@angular-ai-kit/utils';

/**
 * ChatContainer Component
 *
 * Main container component for a chat interface. Integrates MessageList and provides
 * a complete chat layout with header and footer sections.
 *
 * @example
 * ```html
 * <ai-chat-container
 *   [messages]="messages"
 *   [title]="'Chat with AI'"
 *   [loading]="isLoading"
 *   [showHeader]="true"
 *   (messageCopy)="handleCopy($event)"
 *   (messageRegenerate)="handleRegenerate($event)"
 * />
 * ```
 *
 * @usageNotes
 * - Provides a full-height chat layout with flex design
 * - Optional header section with customizable title
 * - Integrates MessageListComponent for displaying messages
 * - Placeholder footer for input components (Phase 0.3)
 * - Responsive and mobile-friendly
 * - Dark mode support via CSS custom properties
 */
@Component({
  selector: 'ai-chat-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [MessageListComponent],
  host: {
    class: 'ai-chat-container-host',
  },
  template: `
    <div
      [class]="containerClasses()"
      role="region"
      [attr.aria-label]="'Chat conversation'"
    >
      <!-- Header (optional) -->
      @if (showHeader()) {
        <header [class]="headerClasses()">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ title() || 'Chat' }}
            </h2>
            @if (showHeaderActions()) {
              <div class="flex gap-2">
                <!-- Slot for header actions (future) -->
                <ng-content select="[header-actions]" />
              </div>
            }
          </div>
        </header>
      }

      <!-- Messages section -->
      <div [class]="messagesWrapperClasses()">
        <ai-message-list
          [messages]="messages()"
          [loading]="loading()"
          [autoScroll]="autoScroll()"
          [showAvatars]="showAvatars()"
          [emptyMessage]="emptyMessage()"
          [maxHeight]="messagesMaxHeight()"
          (messageCopy)="handleMessageCopy($event)"
          (messageRegenerate)="handleMessageRegenerate($event)"
        />
      </div>

      <!-- Footer (input section placeholder) -->
      @if (showFooter()) {
        <footer [class]="footerClasses()">
          <div class="flex items-center justify-center">
            <!-- Slot for input components (Phase 0.3) -->
            <ng-content select="[footer-content]" />

            <!-- Default placeholder -->
            @if (!hasFooterContent()) {
              <div class="py-4 text-sm text-gray-500 dark:text-gray-400">
                Input component will be added in Phase 0.3
              </div>
            }
          </div>
        </footer>
      }
    </div>
  `,
})
export class ChatContainerComponent {
  // ==========================================
  // Inputs
  // ==========================================

  /**
   * Array of chat messages to display
   */
  messages = input.required<ChatMessage[]>();

  /**
   * Title to display in the header
   * @default 'Chat'
   */
  title = input<string>('');

  /**
   * Whether to show loading/typing indicator
   * @default false
   */
  loading = input<boolean>(false);

  /**
   * Whether to show the header section
   * @default true
   */
  showHeader = input<boolean>(true);

  /**
   * Whether to show the footer section
   * @default true
   */
  showFooter = input<boolean>(true);

  /**
   * Whether to show header action buttons
   * @default false
   */
  showHeaderActions = input<boolean>(false);

  /**
   * Custom CSS classes to apply to the container
   * @default ''
   */
  customClasses = input<string>('');

  /**
   * Whether to automatically scroll to bottom on new messages
   * @default true
   */
  autoScroll = input<boolean>(true);

  /**
   * Whether to show avatars in messages
   * @default true
   */
  showAvatars = input<boolean>(true);

  /**
   * Message to show when there are no messages
   * @default 'No messages yet. Start a conversation!'
   */
  emptyMessage = input<string>('No messages yet. Start a conversation!');

  /**
   * Maximum height for the messages section
   * @default '100%'
   */
  messagesMaxHeight = input<string>('100%');

  /**
   * Whether the footer has content
   * @internal
   */
  hasFooterContent = input<boolean>(false);

  // ==========================================
  // Outputs
  // ==========================================

  /**
   * Emitted when a message is sent (placeholder for Phase 0.3)
   */
  messageSend = output<string>();

  /**
   * Emitted when a message's copy button is clicked
   */
  messageCopy = output<{ content: string; message: ChatMessage }>();

  /**
   * Emitted when a message's regenerate button is clicked
   */
  messageRegenerate = output<ChatMessage>();

  // ==========================================
  // Computed Properties
  // ==========================================

  /**
   * Container classes
   */
  containerClasses = computed(() => {
    return cn(
      'ai-chat-container',
      'flex flex-col h-full',
      'bg-white dark:bg-gray-900',
      'text-gray-900 dark:text-gray-100',
      'transition-colors duration-200',
      this.customClasses()
    );
  });

  /**
   * Header classes
   */
  headerClasses = computed(() => {
    return cn(
      'ai-chat-header',
      'border-b border-gray-200 dark:border-gray-700',
      'p-4 flex-shrink-0',
      'bg-white dark:bg-gray-900'
    );
  });

  /**
   * Messages wrapper classes
   */
  messagesWrapperClasses = computed(() => {
    return cn('ai-chat-messages', 'flex-1', 'min-h-0');
  });

  /**
   * Footer classes
   */
  footerClasses = computed(() => {
    return cn(
      'ai-chat-footer',
      'border-t border-gray-200 dark:border-gray-700',
      'p-4 flex-shrink-0',
      'bg-white dark:bg-gray-900'
    );
  });

  // ==========================================
  // Methods
  // ==========================================

  /**
   * Handle message copy event
   * @internal
   */
  handleMessageCopy(event: { content: string; message: ChatMessage }): void {
    this.messageCopy.emit(event);
  }

  /**
   * Handle message regenerate event
   * @internal
   */
  handleMessageRegenerate(message: ChatMessage): void {
    this.messageRegenerate.emit(message);
  }
}
