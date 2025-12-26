import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';
import { BrnSheetDescription } from '@spartan-ng/brain/sheet';

@Directive({
  selector: '[hlmSheetDescription]',
  hostDirectives: [BrnSheetDescription],
  host: {
    'data-slot': 'sheet-description',
  },
})
export class HlmSheetDescription {
  constructor() {
    classes(() => 'text-muted-foreground text-sm');
  }
}
