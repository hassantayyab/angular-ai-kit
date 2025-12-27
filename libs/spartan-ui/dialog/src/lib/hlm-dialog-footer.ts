import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmDialogFooter],hlm-dialog-footer',
  host: {
    'data-slot': 'dialog-footer',
  },
})
export class HlmDialogFooter {
  constructor() {
    classes(() => 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end');
  }
}
