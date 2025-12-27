import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'fieldset[hlmFieldSet]',
  host: {
    'data-slot': 'field-set',
  },
})
export class HlmFieldSet {
  constructor() {
    classes(() => [
      'flex flex-col gap-6',
      'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
    ]);
  }
}
