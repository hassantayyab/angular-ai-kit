import { type VariantProps, cva } from 'class-variance-authority';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

export const cardVariants = cva(
  'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border/50 py-6 shadow-sm',
  {
    variants: {},
    defaultVariants: {},
  }
);
export type CardVariants = VariantProps<typeof cardVariants>;

@Directive({
  selector: '[hlmCard]',
})
export class HlmCard {
  constructor() {
    classes(() => cardVariants());
  }
}
