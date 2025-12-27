import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { HlmIcon } from '@angular-ai-kit/spartan-ui/icon';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hlm-select-scroll-down',
  imports: [NgIcon, HlmIcon],
  providers: [provideIcons({ lucideChevronDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-icon hlm size="sm" class="ml-2" name="lucideChevronDown" /> `,
})
export class HlmSelectScrollDown {
  constructor() {
    classes(() => 'flex cursor-default items-center justify-center py-1');
  }
}
