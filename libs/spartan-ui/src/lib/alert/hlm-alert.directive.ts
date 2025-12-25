import { computed, Directive, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@angular-ai-kit/utils';

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success:
          'border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-500',
        warning:
          'border-yellow-500/50 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type AlertVariants = VariantProps<typeof alertVariants>;

@Directive({
  selector: '[hlmAlert]',
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"alert"',
  },
})
export class HlmAlertDirective {
  variant = input<AlertVariants['variant']>('default');
  class = input<string>('');

  computedClass = computed(() =>
    cn(alertVariants({ variant: this.variant() }), this.class())
  );
}

@Directive({
  selector: '[hlmAlertTitle]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmAlertTitleDirective {
  class = input<string>('');

  computedClass = computed(() =>
    cn('mb-1 font-medium leading-none tracking-tight', this.class())
  );
}

@Directive({
  selector: '[hlmAlertDescription]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmAlertDescriptionDirective {
  class = input<string>('');

  computedClass = computed(() =>
    cn('text-sm [&_p]:leading-relaxed', this.class())
  );
}
