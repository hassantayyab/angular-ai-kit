import { HlmSeparator } from '@angular-ai-kit/spartan-ui/separator';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmSidebarSeparator],hlm-sidebar-separator',
  hostDirectives: [{ directive: HlmSeparator }],
  host: {
    'data-slot': 'sidebar-separator',
    'data-sidebar': 'separator',
  },
})
export class HlmSidebarSeparator {
  constructor() {
    classes(() => 'bg-border mx-2 w-auto');
  }
}
