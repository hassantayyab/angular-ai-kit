import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmItemContent],hlm-item-content',
  host: {
    'data-slot': 'item-content',
  },
})
export class HlmItemContent {
  constructor() {
    classes(
      () => 'flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none'
    );
  }
}
