import { HlmInput, inputVariants } from '@angular-ai-kit/spartan-ui/input';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'input[hlmSidebarInput]',
  host: {
    'data-slot': 'sidebar-input',
    'data-sidebar': 'input',
  },
})
export class HlmSidebarInput extends HlmInput {
  constructor() {
    super();
    classes(() => [
      inputVariants({ error: this._state().error }),
      'bg-background focus-visible:ring-sidebar-ring w-full shadow-none focus-visible:ring-2',
    ]);
  }
}
