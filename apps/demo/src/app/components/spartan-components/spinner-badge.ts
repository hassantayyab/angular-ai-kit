import { HlmBadge } from '@angular-ai-kit/spartan-ui/badge';
import { HlmSpinner } from '@angular-ai-kit/spartan-ui/spinner';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spartan-spinner-badge',
  imports: [HlmSpinner, HlmBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex items-center gap-2',
  },
  template: `
    <span hlmBadge class="rounded-full">
      <hlm-spinner class="size-3" />
      Loading
    </span>
    <span hlmBadge variant="secondary" class="rounded-full">
      <hlm-spinner class="size-3" />
      Syncing
    </span>
    <span hlmBadge variant="outline" class="rounded-full">
      <hlm-spinner class="size-3" />
      Updating
    </span>
  `,
})
export class SpinnerBadge {}
