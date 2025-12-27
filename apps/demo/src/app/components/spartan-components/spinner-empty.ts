import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmEmptyImports } from '@angular-ai-kit/spartan-ui/empty';
import { HlmSpinner } from '@angular-ai-kit/spartan-ui/spinner';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spartan-spinner-empty',
  imports: [HlmEmptyImports, HlmButton, HlmSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div hlmEmpty class="w-full border md:p-6">
      <div hlmEmptyHeader>
        <div hlmEmptyMedia variant="icon">
          <hlm-spinner />
        </div>
        <div hlmEmptyTitle>Processing your request</div>
        <div hlmEmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </div>
      </div>
      <div hlmEmptyContent>
        <button hlmBtn variant="outline" size="sm">Cancel</button>
      </div>
    </div>
  `,
})
export class SpinnerEmpty {}
