import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@angular-ai-kit/utils';

export const iconVariants = cva('inline-flex shrink-0', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'h-3 w-3',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export type IconVariants = VariantProps<typeof iconVariants>;

@Component({
  selector: 'hlm-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-hidden]': 'true',
  },
  template: `<ng-content />`,
})
export class HlmIconComponent {
  size = input<IconVariants['size']>('default');
  class = input<string>('');

  computedClass = computed(() =>
    cn(iconVariants({ size: this.size() }), this.class())
  );
}
