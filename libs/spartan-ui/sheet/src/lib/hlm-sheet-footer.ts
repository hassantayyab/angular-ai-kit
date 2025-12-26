import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmSheetFooter],hlm-sheet-footer',
  host: {
    'data-slot': 'sheet-footer',
  },
})
export class HlmSheetFooter {
  constructor() {
    classes(() => 'mt-auto flex flex-col gap-2 p-4');
  }
}
