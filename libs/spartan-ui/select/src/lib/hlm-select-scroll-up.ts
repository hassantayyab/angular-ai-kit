import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronUp } from '@ng-icons/lucide';
import { HlmIcon } from '@angular-ai-kit/spartan-ui/icon';
import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hlm-select-scroll-up',
  imports: [NgIcon, HlmIcon],
  providers: [provideIcons({ lucideChevronUp })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-icon hlm size="sm" class="ml-2" name="lucideChevronUp" /> `,
})
export class HlmSelectScrollUp {
  constructor() {
    classes(() => 'flex cursor-default items-center justify-center py-1');
  }
}
