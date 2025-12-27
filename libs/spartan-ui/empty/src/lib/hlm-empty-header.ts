import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmEmptyHeader],hlm-empty-header',
  host: {
    'data-slot': 'empty-header',
  },
})
export class HlmEmptyHeader {
  constructor() {
    classes(() => 'flex max-w-sm flex-col items-center gap-2 text-center');
  }
}
