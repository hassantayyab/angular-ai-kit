import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCardAction]',
})
export class HlmCardAction {
  constructor() {
    classes(
      () => 'col-start-2 row-span-2 row-start-1 self-start justify-self-end'
    );
  }
}
