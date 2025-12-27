import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBot,
  lucideCopy,
  lucideRefreshCw,
  lucideSettings,
  lucideUser,
} from '@ng-icons/lucide';
import { ChatMessage } from '@angular-ai-kit/core';
import {
  HlmAvatar,
  HlmAvatarFallback,
} from '@angular-ai-kit/spartan-ui/avatar';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmIcon } from '@angular-ai-kit/spartan-ui/icon';
import { HlmTooltipTrigger } from '@angular-ai-kit/spartan-ui/tooltip';
import { cn } from '@angular-ai-kit/utils';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

/**
 * Demo MessageBubbleComponent
 *
 * Enhanced message bubble with Spartan UI components for the demo app.
 * Uses HlmAvatar for avatars and HlmButton for action buttons.
 *
 * @example
 * ```html
 * <app-message-bubble
 *   [message]="message"
 *   [showAvatar]="true"
 *   [showActions]="true"
 *   (copied)="handleCopy($event)"
 *   (regenerate)="handleRegenerate()"
 * />
 * ```
 */
@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HlmAvatar,
    HlmAvatarFallback,
    HlmButton,
    HlmIcon,
    HlmTooltipTrigger,
    NgIcon,
  ],
  viewProviders: [
    provideIcons({
      lucideCopy,
      lucideRefreshCw,
      lucideUser,
      lucideBot,
      lucideSettings,
    }),
  ],
  host: {
    class: 'app-message-bubble-host block',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(focusin)': 'handleFocusIn()',
    '(focusout)': 'handleFocusOut()',
  },
})
export class MessageBubbleComponent {
  private platformId = inject(PLATFORM_ID);

  // ==========================================
  // Inputs
  // ==========================================

  /** The chat message to display */
  message = input.required<ChatMessage>();

  /** Whether to show the avatar */
  showAvatar = input<boolean>(true);

  /** Custom CSS classes to apply */
  customClasses = input<string>('');

  /** Whether to always show action buttons (otherwise shown on hover) */
  showActions = input<boolean>(false);

  // ==========================================
  // Outputs
  // ==========================================

  /** Emitted when the copy button is clicked */
  copied = output<string>();

  /** Emitted when the regenerate button is clicked */
  regenerate = output<void>();

  // ==========================================
  // State
  // ==========================================

  private _isHovered = signal(false);
  isHovered = this._isHovered.asReadonly();

  private _isFocused = signal(false);
  isFocused = this._isFocused.asReadonly();

  /** Whether actions should be visible and focusable */
  actionsVisible = computed(
    () => this.showActions() || this.isHovered() || this.isFocused()
  );

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Whether this is a user message */
  isUserMessage = computed(() => this.message().role === 'user');

  /** Whether this is an assistant message */
  isAssistantMessage = computed(() => this.message().role === 'assistant');

  /** Container classes based on message role */
  containerClasses = computed(() => {
    const role = this.message().role;

    return cn(
      'app-message-bubble',
      'group flex gap-3 p-4 rounded-xl',
      'transition-all duration-200',
      {
        // User messages - right aligned with accent background
        'flex-row-reverse bg-[var(--primary)] text-[var(--primary-foreground)]':
          role === 'user',
        // Assistant messages - left aligned with subtle background
        'bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)]':
          role === 'assistant',
        // System messages
        'bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]':
          role === 'system',
      },
      this.customClasses()
    );
  });

  /** Avatar initials based on role */
  avatarInitials = computed(() => {
    const role = this.message().role;
    switch (role) {
      case 'user':
        return 'U';
      case 'assistant':
        return 'AI';
      case 'system':
        return 'S';
      default:
        return '?';
    }
  });

  /** Avatar icon name based on role */
  avatarIcon = computed(() => {
    const role = this.message().role;
    switch (role) {
      case 'user':
        return 'lucideUser';
      case 'assistant':
        return 'lucideBot';
      case 'system':
        return 'lucideSettings';
      default:
        return 'lucideUser';
    }
  });

  /** Avatar fallback classes */
  avatarFallbackClasses = computed(() => {
    const role = this.message().role;

    return cn({
      'bg-[var(--primary-foreground)] text-[var(--primary)]': role === 'user',
      'bg-[var(--primary)] text-[var(--primary-foreground)]':
        role === 'assistant',
      'bg-[var(--muted-foreground)] text-[var(--muted)]': role === 'system',
    });
  });

  /** Content classes */
  contentClasses = computed(() => {
    return cn(
      'app-message-bubble-content',
      'flex-1 min-w-0',
      'text-sm leading-relaxed',
      'whitespace-pre-wrap break-words'
    );
  });

  /** Actions container classes */
  actionsClasses = computed(() => {
    const shouldShow = this.actionsVisible();

    return cn(
      'app-message-bubble-actions',
      'flex gap-1 mt-2',
      'transition-opacity duration-200',
      {
        'opacity-100 visible': shouldShow,
        'opacity-0 invisible': !shouldShow,
      }
    );
  });

  /** Button classes for action buttons */
  actionButtonClasses = computed(() => {
    return cn('h-7 w-7');
  });

  /** ARIA label for screen readers */
  ariaLabel = computed(() => {
    const msg = this.message();
    const preview = msg.content.substring(0, 100);
    return `${msg.role} message: ${preview}${msg.content.length > 100 ? '...' : ''}`;
  });

  // ==========================================
  // Methods
  // ==========================================

  /** Handle copy button click */
  handleCopy(): void {
    const content = this.message().content;
    this.copied.emit(content);

    // Copy to clipboard (SSR-safe)
    if (isPlatformBrowser(this.platformId) && navigator.clipboard) {
      navigator.clipboard.writeText(content).catch(() => {
        // Silently fail - the copied event is still emitted
      });
    }
  }

  /** Handle regenerate button click */
  handleRegenerate(): void {
    this.regenerate.emit();
  }

  /** Handle mouse enter event */
  handleMouseEnter(): void {
    this._isHovered.set(true);
  }

  /** Handle mouse leave event */
  handleMouseLeave(): void {
    this._isHovered.set(false);
  }

  /** Handle focus in event (any child element receives focus) */
  handleFocusIn(): void {
    this._isFocused.set(true);
  }

  /** Handle focus out event (focus leaves the component) */
  handleFocusOut(): void {
    this._isFocused.set(false);
  }
}
