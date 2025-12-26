import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCardFooter]',
})
export class HlmCardFooter {
  constructor() {
    classes(() => 'flex items-center px-6 [.border-t]:pt-6');
  }
}
