import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

/**
 * TypingIndicatorComponent
 *
 * Animated dots indicator showing that the AI is processing a response.
 * Features bouncing dots animation with optional avatar and text.
 *
 * @example
 * ```html
 * <app-typing-indicator />
 *
 * <app-typing-indicator
 *   [showAvatar]="true"
 *   [text]="'Thinking...'"
 * />
 * ```
 */
@Component({
  selector: 'app-typing-indicator',
  templateUrl: './typing-indicator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-typing-indicator-host block',
    '[attr.role]': '"status"',
    '[attr.aria-label]': '"AI is typing"',
  },
})
export class TypingIndicatorComponent {
  // Inputs
  showAvatar = input<boolean>(true);
  text = input<string>('');
  dotCount = input<number>(3);
  customClasses = input<string>('');

  // Generate array for dots iteration
  dots = computed(() => {
    return Array.from({ length: this.dotCount() }, (_, i) => i);
  });

  // Computed classes
  containerClasses = computed(() => {
    return cn(
      'app-typing-indicator',
      'flex items-center gap-3',
      'px-4 py-3',
      this.customClasses()
    );
  });

  avatarClasses = computed(() => {
    return cn(
      'app-typing-indicator-avatar',
      'flex h-8 w-8 shrink-0 items-center justify-center',
      'rounded-full',
      'bg-primary text-primary-foreground',
      'text-sm font-medium'
    );
  });

  bubbleClasses = computed(() => {
    return cn(
      'app-typing-indicator-bubble',
      'flex items-center gap-1.5',
      'rounded-2xl rounded-tl-sm',
      'bg-[var(--card)]',
      'border border-[var(--border)]',
      'px-4 py-3',
      'shadow-sm'
    );
  });

  dotClasses = computed(() => {
    return cn(
      'typing-dot',
      'h-2 w-2',
      'rounded-full',
      'bg-[var(--foreground-muted)]'
    );
  });

  textClasses = computed(() => {
    return cn(
      'app-typing-indicator-text',
      'ml-2',
      'text-sm text-[var(--foreground-muted)]'
    );
  });

  /** Get animation delay for each dot */
  getDotDelay(index: number): string {
    return `${index * 0.2}s`;
  }
}
