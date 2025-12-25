import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@angular-ai-kit/utils';
import { Directive, computed, input } from '@angular/core';

export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      error: {
        true: 'text-destructive',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

export type LabelVariants = VariantProps<typeof labelVariants>;

@Directive({
  selector: '[hlmLabel]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmLabelDirective {
  error = input<boolean>(false);
  class = input<string>('');

  computedClass = computed(() =>
    cn(labelVariants({ error: this.error() }), this.class())
  );
}
