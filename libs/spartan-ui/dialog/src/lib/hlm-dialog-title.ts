import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';
import { BrnDialogTitle } from '@spartan-ng/brain/dialog';

@Directive({
  selector: '[hlmDialogTitle]',
  hostDirectives: [BrnDialogTitle],
  host: {
    'data-slot': 'dialog-title',
  },
})
export class HlmDialogTitle {
  constructor() {
    classes(() => 'text-lg leading-none font-semibold');
  }
}
