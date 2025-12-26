import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'li[hlmSidebarMenuItem]',
  host: {
    'data-slot': 'sidebar-menu-item',
    'data-sidebar': 'menu-item',
  },
})
export class HlmSidebarMenuItem {
  constructor() {
    classes(() => 'group/menu-item relative');
  }
}
