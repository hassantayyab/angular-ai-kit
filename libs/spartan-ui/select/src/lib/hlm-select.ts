import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'hlm-select, brn-select [hlm]',
})
export class HlmSelect {
  constructor() {
    classes(() => 'space-y-2');
  }
}
