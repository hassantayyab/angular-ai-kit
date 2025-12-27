import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCommandEmpty]',
  host: {
    'data-slot': 'command-empty',
  },
})
export class HlmCommandEmpty {
  constructor() {
    classes(() => 'py-6 text-center text-sm');
  }
}
