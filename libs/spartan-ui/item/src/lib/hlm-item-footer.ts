import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmItemFooter],hlm-item-footer',
  host: {
    'data-slot': 'item-footer',
  },
})
export class HlmItemFooter {
  constructor() {
    classes(() => 'flex basis-full items-center justify-between gap-2');
  }
}
