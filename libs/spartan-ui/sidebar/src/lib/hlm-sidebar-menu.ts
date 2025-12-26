import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ul[hlmSidebarMenu]',
  host: {
    'data-slot': 'sidebar-menu',
    'data-sidebar': 'menu',
  },
})
export class HlmSidebarMenu {
  constructor() {
    classes(() => 'flex w-full min-w-0 flex-col gap-1');
  }
}
