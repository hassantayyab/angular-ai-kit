import { NgIcon, provideIcons } from '@ng-icons/core';
import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { AI_ICONS, ROLE_ICONS } from '../../../icons';
import { ChatMessage } from '../../../types';

/**
 * MessageBubble Component
 *
 * Displays a single chat message with role-based styling, avatar, and action buttons.
 *
 * @example
 * ```html
 * <ai-message-bubble
 *   [message]="message"
 *   [showAvatar]="true"
 *   [showActions]="true"
 *   (copied)="handleCopy($event)"
 *   (regenerate)="handleRegenerate()"
 * />
 * ```
 *
 * @usageNotes
 * - User messages are styled with blue background
 * - Assistant messages are styled with gray background
 * - Copy button is available for all messages
 * - Regenerate button is only shown for assistant messages
 * - Supports dark mode via CSS custom properties
 * - Fully accessible with ARIA labels and keyboard navigation
 */
@Component({
  selector: 'ai-message-bubble',
  templateUrl: './message-bubble.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgIcon],
  viewProviders: [provideIcons(AI_ICONS)],
  host: {
    class: 'ai-message-bubble-host group',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
  },
})
export class MessageBubbleComponent {
  // ==========================================
  // Inputs
  // ==========================================

  /**
   * The chat message to display
   */
  message = input.required<ChatMessage>();

  /**
   * Whether to show the avatar
   * @default false
   */
  showAvatar = input<boolean>(false);

  /**
   * Custom CSS classes to apply to the message bubble
   * @default ''
   */
  customClasses = input<string>('');

  /**
   * Whether to always show action buttons (otherwise shown on hover)
   * @default false
   */
  showActions = input<boolean>(false);

  // ==========================================
  // Outputs
  // ==========================================

  /**
   * Emitted when the copy button is clicked
   */
  copied = output<string>();

  /**
   * Emitted when the regenerate button is clicked
   */
  regenerate = output<void>();

  // ==========================================
  // Computed Properties
  // ==========================================

  /**
   * Container classes based on message role
   */
  containerClasses = computed(() => {
    const role = this.message().role;

    return cn(
      'ai-message-bubble',
      'flex gap-3 p-4 rounded-lg',
      'transition-all duration-200',
      'hover:shadow-md',
      {
        // User messages
        'bg-message-user-bg text-foreground': role === 'user',
        // Assistant messages: lighter with border
        'bg-message-assistant-bg text-foreground border border-border':
          role === 'assistant',
        // System messages: muted styling
        'bg-message-system-bg text-muted-foreground border border-border':
          role === 'system',
      },
      this.customClasses()
    );
  });

  /**
   * Avatar container classes based on message role
   */
  avatarClasses = computed(() => {
    const role = this.message().role;

    return cn(
      'ai-message-bubble-avatar',
      'flex items-center justify-center',
      'w-9 h-9 rounded-full',
      'flex-shrink-0',
      {
        'bg-avatar-user text-white': role === 'user',
        'bg-avatar-assistant text-white': role === 'assistant',
        'bg-avatar-system text-white': role === 'system',
      }
    );
  });

  /**
   * Get the icon name for the current message role
   */
  avatarIcon = computed(() => {
    const role = this.message().role;
    return ROLE_ICONS[role] || ROLE_ICONS.assistant;
  });

  /**
   * Content classes
   */
  contentClasses = computed(() => {
    return cn(
      'ai-message-bubble-content',
      'text-sm leading-relaxed',
      'whitespace-pre-wrap break-words'
    );
  });

  /**
   * Actions container classes
   */
  actionsClasses = computed(() => {
    return cn(
      'ai-message-bubble-actions',
      'flex gap-2 mt-2',
      'opacity-0 group-hover:opacity-100',
      'transition-opacity duration-200'
    );
  });

  /**
   * Button classes for action buttons
   */
  buttonClasses = computed(() => {
    return cn(
      'inline-flex items-center justify-center',
      'w-8 h-8 rounded',
      'transition-colors duration-150',
      'hover:scale-110 active:scale-95',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'hover:bg-accent'
    );
  });

  /**
   * ARIA label for screen readers
   */
  ariaLabel = computed(() => {
    const msg = this.message();
    const preview = msg.content.substring(0, 100);
    return `${msg.role} message: ${preview}${msg.content.length > 100 ? '...' : ''}`;
  });

  /**
   * Track hover state for showing actions
   * @internal
   */
  private _isHovered = signal(false);

  /**
   * Whether the message is currently hovered (readonly signal)
   */
  isHovered = this._isHovered.asReadonly();

  // ==========================================
  // Methods
  // ==========================================

  /**
   * Handle copy button click
   */
  handleCopy(): void {
    const content = this.message().content;
    this.copied.emit(content);

    // Also copy to clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(content).catch((err) => {
        console.error('Failed to copy to clipboard:', err);
      });
    }
  }

  /**
   * Handle regenerate button click
   */
  handleRegenerate(): void {
    this.regenerate.emit();
  }

  /**
   * Handle mouse enter event
   * @internal
   */
  handleMouseEnter(): void {
    this._isHovered.set(true);
  }

  /**
   * Handle mouse leave event
   * @internal
   */
  handleMouseLeave(): void {
    this._isHovered.set(false);
  }
}
