import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmEmptyTitle]',
  host: {
    'data-slot': 'empty-title',
  },
})
export class HlmEmptyTitle {
  constructor() {
    classes(() => 'text-lg font-medium tracking-tight');
  }
}
