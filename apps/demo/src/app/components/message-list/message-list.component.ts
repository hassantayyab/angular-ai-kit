import {
  AiResponseComponent,
  ChatMessage,
  EditEvent,
  UserMessageComponent,
} from '@angular-ai-kit/core';
import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
import { TypingIndicatorComponent } from '../typing-indicator';

/**
 * Demo MessageListComponent
 *
 * Displays a list of chat messages. Scroll is handled by the parent container.
 * Uses TypingIndicator for loading states.
 *
 * @example
 * ```html
 * <app-message-list
 *   [messages]="messages"
 *   [loading]="isLoading"
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
  imports: [
    AiResponseComponent,
    UserMessageComponent,
    TypingIndicatorComponent,
  ],
  host: {
    class: 'app-message-list-host block',
  },
})
export class MessageListComponent {
  // ==========================================
  // Inputs
  // ==========================================

  /** Array of chat messages to display */
  messages = input.required<ChatMessage[]>();

  /** Whether to show loading/typing indicator */
  loading = input<boolean>(false);

  /** Custom CSS classes to apply to the container */
  customClasses = input<string>('');

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

  /** Emitted when a user message is edited */
  messageEdit = output<{ event: EditEvent; message: ChatMessage }>();

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Container classes - no internal scroll, parent handles scrolling */
  containerClasses = computed(() => {
    return cn('app-message-list', this.customClasses());
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
      'min-h-[200px]',
      'text-center'
    );
  });

  // ==========================================
  // Methods
  // ==========================================

  /** Handle message copy event */
  handleMessageCopy(content: string, message: ChatMessage): void {
    this.messageCopy.emit({ content, message });
  }

  /** Handle message regenerate event */
  handleMessageRegenerate(message: ChatMessage): void {
    this.messageRegenerate.emit(message);
  }

  /** Handle user message edit event */
  handleMessageEdit(event: EditEvent, message: ChatMessage): void {
    this.messageEdit.emit({ event, message });
  }
}
