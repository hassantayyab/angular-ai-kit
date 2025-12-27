import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hlm-dropdown-menu-item-sub-indicator',
  imports: [NgIcon],
  providers: [provideIcons({ lucideChevronRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-icon name="lucideChevronRight" class="text-base" /> `,
})
export class HlmDropdownMenuItemSubIndicator {
  constructor() {
    classes(() => 'ml-auto size-4');
  }
}
