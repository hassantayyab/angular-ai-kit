import { computed, Directive, input } from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

@Directive({
  selector: '[hlmSkeleton]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmSkeletonDirective {
  class = input<string>('');

  computedClass = computed(() =>
    cn('animate-pulse rounded-md bg-muted', this.class())
  );
}
