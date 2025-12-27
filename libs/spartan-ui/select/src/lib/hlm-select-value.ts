import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'hlm-select-value,[hlmSelectValue], brn-select-value[hlm]',
})
export class HlmSelectValue {
  constructor() {
    classes(
      () =>
        'data-[placeholder]:text-muted-foreground line-clamp-1 flex items-center gap-2 truncate'
    );
  }
}
