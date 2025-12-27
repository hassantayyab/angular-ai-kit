import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmItemActions],hlm-item-actions',
  host: {
    'data-slot': 'item-actions',
  },
})
export class HlmItemActions {
  constructor() {
    classes(() => 'flex items-center gap-2');
  }
}
