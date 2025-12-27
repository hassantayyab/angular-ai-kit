import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'p[hlmItemDescription]',
  host: {
    'data-slot': 'item-description',
  },
})
export class HlmItemDescription {
  constructor() {
    classes(() => [
      'text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance',
      '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
    ]);
  }
}
