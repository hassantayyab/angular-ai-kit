import { cn } from '@angular-ai-kit/utils';
import { Directive, computed, input } from '@angular/core';

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
