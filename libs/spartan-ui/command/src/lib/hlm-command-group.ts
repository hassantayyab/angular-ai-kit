import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';
import { BrnCommandGroup } from '@spartan-ng/brain/command';

@Directive({
  selector: '[hlmCommandGroup],hlm-command-group',
  hostDirectives: [
    {
      directive: BrnCommandGroup,
      inputs: ['id'],
    },
  ],
  host: {
    'data-slot': 'command-group',
  },
})
export class HlmCommandGroup {
  constructor() {
    classes(
      () => 'text-foreground block overflow-hidden p-1 data-[hidden]:hidden'
    );
  }
}
