import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmSheetHeader],hlm-sheet-header',
  host: {
    'data-slot': 'sheet-header',
  },
})
export class HlmSheetHeader {
  constructor() {
    classes(() => 'flex flex-col gap-1.5 p-4');
  }
}
