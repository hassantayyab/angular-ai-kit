import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { CdkMenuGroup } from '@angular/cdk/menu';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmDropdownMenuGroup],hlm-dropdown-menu-group',
  hostDirectives: [CdkMenuGroup],
  host: {
    'data-slot': 'dropdown-menu-group',
  },
})
export class HlmDropdownMenuGroup {
  constructor() {
    classes(() => 'block');
  }
}
