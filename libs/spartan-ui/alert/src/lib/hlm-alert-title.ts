import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmAlertTitle]',
})
export class HlmAlertTitle {
  constructor() {
    classes(
      () => 'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight'
    );
  }
}
