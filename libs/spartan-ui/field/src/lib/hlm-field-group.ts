import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmFieldGroup],hlm-field-group',
  host: {
    'data-slot': 'field-group',
  },
})
export class HlmFieldGroup {
  constructor() {
    classes(
      () =>
        'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4'
    );
  }
}
