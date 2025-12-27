import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';
import { BrnDialogDescription } from '@spartan-ng/brain/dialog';

@Directive({
  selector: '[hlmDialogDescription]',
  hostDirectives: [BrnDialogDescription],
  host: {
    'data-slot': 'dialog-description',
  },
})
export class HlmDialogDescription {
  constructor() {
    classes(() => 'text-muted-foreground text-sm');
  }
}
