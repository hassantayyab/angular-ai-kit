import { cn } from '@angular-ai-kit/utils';
import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[hlmTextarea]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmTextareaDirective {
  /** Error state */
  error = input<boolean>(false);

  /** Additional custom classes */
  class = input<string>('');

  /** Computed class */
  computedClass = computed(() =>
    cn(
      'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      this.error() && 'border-destructive focus-visible:ring-destructive',
      this.class()
    )
  );
}
