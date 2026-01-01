import { NgIcon, provideIcons } from '@ng-icons/core';
import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
import { AI_ICONS } from '../../../icons';

/**
 * Size variants for the icon button
 */
export type IconButtonSize = 'sm' | 'md' | 'lg';

/**
 * Variant styles for the icon button
 */
export type IconButtonVariant = 'ghost' | 'outline' | 'default';

/**
 * Icon Button Component
 *
 * A reusable icon-only button with consistent styling across the library.
 * Used for action buttons like copy, edit, regenerate, thumbs up/down, etc.
 *
 * @example
 * ```html
 * <ai-icon-button
 *   icon="lucideCopy"
 *   ariaLabel="Copy message"
 *   (clicked)="handleCopy()"
 * />
 * ```
 */
@Component({
  selector: 'ai-icon-button',
  template: `
    <button
      type="button"
      [class]="buttonClasses()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-pressed]="ariaPressed()"
      [disabled]="disabled()"
      (click)="handleClick($event)"
    >
      <ng-icon hlm [name]="icon()" [size]="iconSize()" />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgIcon],
  viewProviders: [provideIcons(AI_ICONS)],
  host: {
    class: 'ai-icon-button-host inline-flex',
  },
})
export class IconButtonComponent {
  // ==========================================
  // Inputs
  // ==========================================

  /** The icon name from lucide icons */
  icon = input.required<string>();

  /** Accessible label for screen readers */
  ariaLabel = input.required<string>();

  /** Size of the button */
  size = input<IconButtonSize>('md');

  /** Visual variant */
  variant = input<IconButtonVariant>('ghost');

  /** Whether the button is disabled */
  disabled = input<boolean>(false);

  /** For toggle buttons, whether it's pressed */
  ariaPressed = input<boolean | undefined>(undefined);

  /** Custom CSS classes */
  customClasses = input<string>('');

  // ==========================================
  // Outputs
  // ==========================================

  /** Emitted when button is clicked */
  clicked = output<MouseEvent>();

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Icon size based on button size */
  iconSize = computed(() => {
    const sizeMap: Record<IconButtonSize, string> = {
      sm: 'xs',
      md: 'sm',
      lg: 'base',
    };
    return sizeMap[this.size()];
  });

  /** Button classes */
  buttonClasses = computed(() =>
    cn(
      // Base styles
      'inline-flex items-center justify-center',
      'rounded',
      'cursor-pointer',
      'transition-colors duration-150',
      // Focus styles
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
      // Size variants
      {
        'h-6 w-6': this.size() === 'sm',
        'h-7 w-7': this.size() === 'md',
        'h-8 w-8': this.size() === 'lg',
      },
      // Variant styles
      {
        // Ghost (default for action buttons)
        'text-muted-foreground hover:bg-accent hover:text-foreground':
          this.variant() === 'ghost',
        // Outline
        'border border-border text-muted-foreground hover:bg-accent hover:text-foreground':
          this.variant() === 'outline',
        // Default (filled)
        'bg-primary text-primary-foreground hover:bg-primary/90':
          this.variant() === 'default',
      },
      // Disabled state
      {
        'opacity-50 cursor-not-allowed pointer-events-none': this.disabled(),
      },
      // Custom classes
      this.customClasses()
    )
  );

  // ==========================================
  // Methods
  // ==========================================

  /** Handle button click */
  handleClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
