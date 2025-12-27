import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';
import { BrnCommandList } from '@spartan-ng/brain/command';

@Directive({
  selector: '[hlmCommandList],hlm-command-list',
  hostDirectives: [
    {
      directive: BrnCommandList,
      inputs: ['id'],
    },
  ],
  host: {
    'data-slot': 'command-list',
  },
})
export class HlmCommandList {
  constructor() {
    classes(() => 'max-h-[300px] overflow-x-hidden overflow-y-auto');
  }
}
