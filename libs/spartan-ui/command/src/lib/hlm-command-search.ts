import { provideHlmIconConfig } from '@angular-ai-kit/spartan-ui/icon';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCommandSearch],hlm-command-search',
  providers: [provideHlmIconConfig({ size: 'sm' })],
  host: {
    'data-slot': 'command-search',
  },
})
export class HlmCommandSearch {
  constructor() {
    classes(
      () =>
        'flex h-9 items-center gap-2 border-b px-3 [&>_ng-icon]:flex-none [&>_ng-icon]:opacity-50'
    );
  }
}
