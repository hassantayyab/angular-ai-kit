import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@angular-ai-kit/utils';
import { Directive, computed, input } from '@angular/core';

// Input variants
export const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      size: {
        default: 'h-10',
        sm: 'h-9 text-sm',
        lg: 'h-11 text-base',
      },
      error: {
        true: 'border-destructive focus-visible:ring-destructive',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      error: false,
    },
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;

@Directive({
  selector: '[hlmInput]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmInputDirective {
  /** Input size */
  size = input<InputVariants['size']>('default');

  /** Error state */
  error = input<boolean>(false);

  /** Additional custom classes */
  class = input<string>('');

  /** Computed class combining variants and custom classes */
  computedClass = computed(() =>
    cn(
      inputVariants({
        size: this.size(),
        error: this.error(),
      }),
      this.class()
    )
  );
}
