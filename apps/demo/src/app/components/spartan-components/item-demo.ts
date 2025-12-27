import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck, lucideChevronRight } from '@ng-icons/lucide';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmIcon } from '@angular-ai-kit/spartan-ui/icon';
import { HlmItemImports } from '@angular-ai-kit/spartan-ui/item';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spartan-item-demo',
  imports: [HlmItemImports, HlmButton, HlmIcon, NgIcon],
  providers: [
    provideIcons({
      lucideBadgeCheck,
      lucideChevronRight,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex w-full max-w-md flex-col gap-6' },
  template: `
    <div hlmItem variant="outline">
      <div hlmItemContent>
        <div hlmItemTitle>Two-factor authentication</div>
        <p hlmItemDescription>Verify via email or phone number.</p>
      </div>
      <div hlmItemActions>
        <button hlmBtn size="sm">Enable</button>
      </div>
    </div>
    <a hlmItem variant="outline" size="sm">
      <div hlmItemMedia>
        <ng-icon hlm name="lucideBadgeCheck" size="20px" />
      </div>
      <div hlmItemContent>
        <div hlmItemTitle>Your profile has been verified.</div>
      </div>
      <div hlmItemActions>
        <ng-icon hlm name="lucideChevronRight" size="sm" />
      </div>
    </a>
  `,
})
export class ItemDemo {}
