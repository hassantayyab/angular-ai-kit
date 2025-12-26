import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmAlertDesc],[hlmAlertDescription]',
})
export class HlmAlertDescription {
  constructor() {
    classes(
      () =>
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed'
    );
  }
}
