import { provideHlmIconConfig } from '@angular-ai-kit/spartan-ui/icon';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmCommandIcon]',
  providers: [provideHlmIconConfig({ size: 'sm' })],
  host: {
    'data-slot': 'command-icon',
  },
})
export class HlmCommandIcon {
  constructor() {
    classes(() => 'text-muted-foreground pointer-events-none shrink-0');
  }
}
