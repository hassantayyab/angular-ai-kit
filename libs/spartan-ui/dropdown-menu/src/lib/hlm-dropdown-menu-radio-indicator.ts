import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircle } from '@ng-icons/lucide';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hlm-dropdown-menu-radio-indicator',
  imports: [NgIcon],
  providers: [provideIcons({ lucideCircle })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-icon name="lucideCircle" class="text-[0.5rem] *:[svg]:fill-current" />
  `,
})
export class HlmDropdownMenuRadioIndicator {
  constructor() {
    classes(
      () =>
        'pointer-events-none absolute left-2 flex size-3.5 items-center justify-center opacity-0 group-data-[checked]:opacity-100'
    );
  }
}
