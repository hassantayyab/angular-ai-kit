import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

/**
 * Logo size variants
 */
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Logo Component
 *
 * Angular AI Kit brand logo with configurable size.
 * Features a modern "A" lettermark with neural network-inspired design.
 *
 * @example
 * ```html
 * <app-logo size="md" />
 * <app-logo size="lg" [showText]="true" />
 * ```
 */
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class LogoComponent {
  /**
   * Size of the logo
   * @default 'md'
   */
  size = input<LogoSize>('md');

  /**
   * Whether to show the text "Angular AI Kit" next to the logo
   * @default false
   */
  showText = input(false);

  /**
   * Custom CSS classes
   */
  customClasses = input<string>('');

  /**
   * Host element classes
   */
  hostClasses = computed(() => {
    return cn('app-logo inline-flex items-center gap-2', this.customClasses());
  });

  /**
   * SVG size classes based on size input
   */
  svgClasses = computed(() => {
    const sizeMap: Record<LogoSize, string> = {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    };
    return sizeMap[this.size()];
  });

  /**
   * Text size classes based on size input
   */
  textClasses = computed(() => {
    const sizeMap: Record<LogoSize, string> = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
      xl: 'text-2xl',
    };
    return cn(
      'font-semibold text-foreground',
      sizeMap[this.size()],
      !this.showText() && 'sr-only'
    );
  });
}
