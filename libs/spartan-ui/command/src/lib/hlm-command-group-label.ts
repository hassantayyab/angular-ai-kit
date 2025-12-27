import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCommandGroupLabel],hlm-command-group-label',
  host: {
    'data-slot': 'command-group-label',
    role: 'presentation',
  },
})
export class HlmCommandGroupLabel {
  constructor() {
    classes(() => 'text-muted-foreground px-2 py-1.5 text-xs font-medium');
  }
}
