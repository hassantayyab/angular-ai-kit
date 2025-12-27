import { hlmSeparatorClass } from '@angular-ai-kit/spartan-ui/separator';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';
import { BrnSeparator } from '@spartan-ng/brain/separator';

@Directive({
  selector: 'div[hlmItemSeparator]',
  hostDirectives: [{ directive: BrnSeparator, inputs: ['orientation'] }],
  host: { 'data-slot': 'item-separator' },
})
export class HlmItemSeparator {
  constructor() {
    classes(() => [hlmSeparatorClass, 'my-0']);
  }
}
