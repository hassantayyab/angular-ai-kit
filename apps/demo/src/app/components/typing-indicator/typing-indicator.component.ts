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
 * Features configurable animation and background options.
 *
 * Options:
 * - `showBackground`: Toggle card background on/off
 * - `animation`: 'shimmer' (bounce) or 'wave' (up/down)
 *
 * @example
 * ```html
 * <app-typing-indicator />
 *
 * <app-typing-indicator [showBackground]="false" />
 *
 * <app-typing-indicator animation="wave" />
 *
 * <app-typing-indicator
 *   [showBackground]="false"
 *   animation="wave"
 *   [showAvatar]="true"
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
  showBackground = input<boolean>(true);
  animation = input<'shimmer' | 'wave'>('shimmer');

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
    const hasBackground = this.showBackground();

    return cn(
      'app-typing-indicator-bubble',
      'flex items-center gap-1.5',
      // Add bubble styling when background is enabled
      hasBackground && [
        'rounded-2xl rounded-tl-sm',
        'bg-[var(--card)]',
        'border border-[var(--border)]',
        'px-4 py-3',
        'shadow-sm',
      ],
      // No background gets simple padding only
      !hasBackground && 'px-1 py-1'
    );
  });

  dotClasses = computed(() => {
    const isWave = this.animation() === 'wave';

    return cn(
      'h-2 w-2',
      'rounded-full',
      'bg-[var(--foreground-muted)]',
      // Animation class based on animation type
      isWave ? 'typing-dot-wave' : 'typing-dot'
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
