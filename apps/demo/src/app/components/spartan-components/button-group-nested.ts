import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight } from '@ng-icons/lucide';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmButtonGroupImports } from '@angular-ai-kit/spartan-ui/button-group';
import { HlmIcon } from '@angular-ai-kit/spartan-ui/icon';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spartan-button-group-nested',
  imports: [HlmButtonGroupImports, HlmButton, NgIcon, HlmIcon],
  providers: [provideIcons({ lucideArrowLeft, lucideArrowRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div hlmButtonGroup>
      <div hlmButtonGroup>
        <button hlmBtn variant="outline" size="sm">1</button>
        <button hlmBtn variant="outline" size="sm">2</button>
        <button hlmBtn variant="outline" size="sm">3</button>
      </div>
      <div hlmButtonGroup>
        <button hlmBtn variant="outline" size="icon-sm">
          <ng-icon hlm name="lucideArrowLeft" size="sm" />
        </button>
        <button hlmBtn variant="outline" size="icon-sm">
          <ng-icon hlm name="lucideArrowRight" size="sm" />
        </button>
      </div>
    </div>
  `,
})
export class ButtonGroupNested {}
