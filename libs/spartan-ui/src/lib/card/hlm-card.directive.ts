import { cn } from '@angular-ai-kit/utils';
import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[hlmCard]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmCardDirective {
  /** Additional custom classes */
  class = input<string>('');

  computedClass = computed(() =>
    cn('rounded-lg border bg-card text-card-foreground shadow-sm', this.class())
  );
}

@Directive({
  selector: '[hlmCardHeader]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmCardHeaderDirective {
  class = input<string>('');

  computedClass = computed(() =>
    cn('flex flex-col space-y-1.5 p-6', this.class())
  );
}

@Directive({
  selector: '[hlmCardTitle]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmCardTitleDirective {
  class = input<string>('');

  computedClass = computed(() =>
    cn('text-2xl font-semibold leading-none tracking-tight', this.class())
  );
}

@Directive({
  selector: '[hlmCardDescription]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmCardDescriptionDirective {
  class = input<string>('');

  computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

@Directive({
  selector: '[hlmCardContent]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmCardContentDirective {
  class = input<string>('');

  computedClass = computed(() => cn('p-6 pt-0', this.class()));
}

@Directive({
  selector: '[hlmCardFooter]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmCardFooterDirective {
  class = input<string>('');

  computedClass = computed(() =>
    cn('flex items-center p-6 pt-0', this.class())
  );
}
