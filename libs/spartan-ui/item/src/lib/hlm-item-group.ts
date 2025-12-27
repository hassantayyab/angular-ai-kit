import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmItemGroup],hlm-item-group',
  host: { 'data-slot': 'item-group' },
})
export class HlmItemGroup {
  constructor() {
    classes(() => 'group/item-group flex flex-col');
  }
}
