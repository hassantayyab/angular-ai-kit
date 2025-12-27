import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmFieldContent],hlm-field-content',
  host: {
    'data-slot': 'field-content',
  },
})
export class HlmFieldContent {
  constructor() {
    classes(
      () => 'group/field-content flex flex-1 flex-col gap-1.5 leading-snug'
    );
  }
}
