import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ai-message-bubble-host',
  },
  template: `
    <article
      [class]="containerClasses()"
      [attr.role]="'article'"
      [attr.aria-label]="ariaLabel()"
    >
      <!-- Avatar section -->
      @if (showAvatar()) {
        <div [class]="avatarClasses()">
          @if (message().role === 'user') {
            <span class="text-xl" aria-hidden="true">👤</span>
          } @else if (message().role === 'assistant') {
            <span class="text-xl" aria-hidden="true">🤖</span>
          } @else {
            <span class="text-xl" aria-hidden="true">⚙️</span>
          }
        </div>
      }

      <!-- Content section -->
      <div class="ai-message-bubble-content-wrapper min-w-0 flex-1">
        <div [class]="contentClasses()">
          {{ message().content }}
        </div>

        <!-- Actions section (shown on hover or when showActions is true) -->
        @if (showActions() || isHovered()) {
          <div [class]="actionsClasses()">
            <!-- Copy button -->
            <button
              type="button"
              [attr.aria-label]="'Copy message'"
              (click)="handleCopy()"
              [class]="buttonClasses()"
            >
              <span class="text-xs">📋</span>
              <span class="sr-only">Copy</span>
            </button>

            <!-- Regenerate button (only for assistant messages) -->
            @if (message().role === 'assistant') {
              <button
                type="button"
                [attr.aria-label]="'Regenerate message'"
                (click)="handleRegenerate()"
                [class]="buttonClasses()"
              >
                <span class="text-xs">🔄</span>
                <span class="sr-only">Regenerate</span>
              </button>
            }
          </div>
        }
      </div>
    </article>
  `,
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
        'bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-100':
          role === 'user',
        'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100':
          role === 'assistant',
        'bg-gray-200 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200':
          role === 'system',
      },
      this.customClasses()
    );
  });

  /**
   * Avatar container classes
   */
  avatarClasses = computed(() => {
    return cn(
      'ai-message-bubble-avatar',
      'flex items-center justify-center',
      'w-10 h-10 rounded-full',
      'bg-white/10 backdrop-blur-sm',
      'flex-shrink-0'
    );
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
    const role = this.message().role;

    return cn(
      'inline-flex items-center justify-center',
      'w-8 h-8 rounded',
      'transition-colors duration-150',
      'hover:scale-110 active:scale-95',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        'hover:bg-white/20 focus:ring-white/50': role === 'user',
        'hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-400':
          role === 'assistant',
        'hover:bg-yellow-100 dark:hover:bg-yellow-800 focus:ring-yellow-400':
          role === 'system',
      }
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
  private _isHovered = false;

  /**
   * Whether the message is currently hovered
   */
  isHovered = computed(() => this._isHovered);

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
}
