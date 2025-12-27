import { HlmSeparator } from '@angular-ai-kit/spartan-ui/separator';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hlm-field-separator',
  imports: [HlmSeparator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'field-separator',
  },
  template: `
    <hlm-separator class="absolute inset-0 top-1/2" />
    <span
      data-slot="field-separator-content"
      class="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
    >
      <ng-content />
    </span>
  `,
})
export class HlmFieldSeparator {
  constructor() {
    classes(
      () =>
        'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2'
    );
  }
}
