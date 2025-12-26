import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'li[hlmSidebarMenuSubItem]',
  host: {
    'data-slot': 'sidebar-menu-sub-item',
    'data-sidebar': 'menu-sub-item',
  },
})
export class HlmSidebarMenuSubItem {
  constructor() {
    classes(() => 'group/menu-sub-item relative');
  }
}
