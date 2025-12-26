import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCardDescription]',
})
export class HlmCardDescription {
  constructor() {
    classes(() => 'text-muted-foreground text-sm');
  }
}
