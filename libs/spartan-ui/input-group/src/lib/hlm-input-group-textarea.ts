import { HlmTextarea } from '@angular-ai-kit/spartan-ui/textarea';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'textarea[hlmInputGroupTextarea]',
  hostDirectives: [HlmTextarea],
  host: {
    'data-slot': 'input-group-control',
  },
})
export class HlmInputGroupTextarea {
  constructor() {
    classes(
      () =>
        'flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent'
    );
  }
}
