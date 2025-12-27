import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmFieldTitle],hlm-field-title',
  host: {
    'data-slot': 'field-label',
  },
})
export class HlmFieldTitle {
  constructor() {
    classes(
      () =>
        'flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50'
    );
  }
}
