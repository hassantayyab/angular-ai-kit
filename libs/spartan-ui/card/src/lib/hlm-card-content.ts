import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCardContent]',
})
export class HlmCardContent {
  constructor() {
    classes(() => 'px-6');
  }
}
