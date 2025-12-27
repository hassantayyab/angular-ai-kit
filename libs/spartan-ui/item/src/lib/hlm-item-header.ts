import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmItemHeader],hlm-item-header',
  host: {
    'data-slot': 'item-header',
  },
})
export class HlmItemHeader {
  constructor() {
    classes(() => 'flex basis-full items-center justify-between gap-2');
  }
}
