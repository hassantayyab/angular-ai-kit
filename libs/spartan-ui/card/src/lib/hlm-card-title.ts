import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCardTitle]',
})
export class HlmCardTitle {
  constructor() {
    classes(() => 'leading-none font-semibold');
  }
}
