import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'div[hlmSidebarGroupContent]',
  host: {
    'data-slot': 'sidebar-group-content',
    'data-sidebar': 'group-content',
  },
})
export class HlmSidebarGroupContent {
  constructor() {
    classes(() => 'w-full text-sm');
  }
}
