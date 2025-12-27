import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmButtonGroupText],hlm-button-group-text',
})
export class HlmButtonGroupText {
  constructor() {
    classes(
      () =>
        "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_ng-icon]:pointer-events-none [&_ng-icon:not([class*='text-'])]:text-base"
    );
  }
}
