import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';
import { BrnSheetTitle } from '@spartan-ng/brain/sheet';

@Directive({
  selector: '[hlmSheetTitle]',
  hostDirectives: [BrnSheetTitle],
  host: {
    'data-slot': 'sheet-title',
  },
})
export class HlmSheetTitle {
  constructor() {
    classes(() => 'text-foreground font-semibold');
  }
}
