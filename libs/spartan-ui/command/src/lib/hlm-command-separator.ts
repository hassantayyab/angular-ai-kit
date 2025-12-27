import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCommandSeparator],hlm-command-separator',
  host: {
    'data-slot': 'command-separator',
    role: 'separator',
  },
})
export class HlmCommandSeparator {
  constructor() {
    classes(() => 'bg-border -mx-1 block h-px');
  }
}
