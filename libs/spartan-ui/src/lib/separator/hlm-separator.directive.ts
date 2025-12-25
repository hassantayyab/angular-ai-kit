import { cn } from '@angular-ai-kit/utils';
import { Directive, computed, input } from '@angular/core';

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
