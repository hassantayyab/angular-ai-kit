import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmEmptyDescription]',
  host: {
    'data-slot': 'empty-description',
  },
})
export class HlmEmptyDescription {
  constructor() {
    classes(
      () =>
        'text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4'
    );
  }
}
