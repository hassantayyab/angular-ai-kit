import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmSidebarFooter],hlm-sidebar-footer',
  host: {
    'data-slot': 'sidebar-footer',
    'data-sidebar': 'footer',
  },
})
export class HlmSidebarFooter {
  constructor() {
    classes(() => 'flex flex-col gap-2 p-2');
  }
}
