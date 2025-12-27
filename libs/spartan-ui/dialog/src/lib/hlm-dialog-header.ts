import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmDialogHeader],hlm-dialog-header',
  host: {
    'data-slot': 'dialog-header',
  },
})
export class HlmDialogHeader {
  constructor() {
    classes(() => 'flex flex-col gap-2 text-center sm:text-left');
  }
}
