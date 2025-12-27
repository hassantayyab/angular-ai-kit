import { HlmInput } from '@angular-ai-kit/spartan-ui/input';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'input[hlmInputGroupInput]',
  hostDirectives: [HlmInput],
  host: {
    'data-slot': 'input-group-control',
  },
})
export class HlmInputGroupInput {
  constructor() {
    classes(
      () =>
        `flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent`
    );
  }
}
