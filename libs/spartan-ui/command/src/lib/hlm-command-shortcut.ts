import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCommandShortcut],hlm-command-shortcut',
  host: {
    'data-slot': 'command-shortcut',
  },
})
export class HlmCommandShortcut {
  constructor() {
    classes(() => 'text-muted-foreground ml-auto text-xs tracking-widest');
  }
}
