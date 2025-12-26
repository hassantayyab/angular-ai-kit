import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmSidebarGroup],hlm-sidebar-group',
  host: {
    'data-slot': 'sidebar-group',
    'data-sidebar': 'group',
  },
})
export class HlmSidebarGroup {
  constructor() {
    classes(() => 'relative flex w-full min-w-0 flex-col p-2');
  }
}
