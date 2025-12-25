import { computed, Directive, input } from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

@Directive({
  selector: '[hlmSeparator]',
  host: {
    '[class]': 'computedClass()',
    '[attr.role]': '"separator"',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class HlmSeparatorDirective {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  decorative = input<boolean>(true);
  class = input<string>('');

  computedClass = computed(() =>
    cn(
      'shrink-0 bg-border',
      this.orientation() === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      this.class()
    )
  );
}
