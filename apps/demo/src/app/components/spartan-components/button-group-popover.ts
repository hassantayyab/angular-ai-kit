import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBot, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmButtonGroupImports } from '@angular-ai-kit/spartan-ui/button-group';
import { HlmIcon } from '@angular-ai-kit/spartan-ui/icon';
import { HlmPopoverImports } from '@angular-ai-kit/spartan-ui/popover';
import { HlmTextarea } from '@angular-ai-kit/spartan-ui/textarea';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';

@Component({
  selector: 'spartan-button-group-popover',
  imports: [
    HlmButtonGroupImports,
    BrnPopoverImports,
    HlmPopoverImports,
    HlmTextarea,
    HlmButton,
    NgIcon,
    HlmIcon,
  ],
  providers: [provideIcons({ lucideBot, lucideChevronDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-popover sideOffset="5" align="end">
      <div hlmButtonGroup>
        <button hlmBtn variant="outline" size="sm">
          <ng-icon hlm name="lucideBot" size="sm" />
          Copilot
        </button>
        <button
          id="edit-profile"
          variant="outline"
          hlmPopoverTrigger
          hlmBtn
          variant="outline"
          size="icon-sm"
        >
          <ng-icon hlm name="lucideChevronDown" size="sm" />
        </button>
        <div
          hlmPopoverContent
          class="rounded-xl p-0 text-sm"
          *brnPopoverContent="let ctx"
        >
          <div class="border-input border-b px-4 py-3">
            <div class="text-sm font-medium">Agent Tasks</div>
          </div>
          <div class="p-4 text-sm">
            <textarea
              hlmTextarea
              placeholder="Describe your task in natural language."
              class="mb-4 min-h-16 resize-none"
            ></textarea>
            <p class="mb-2 font-medium">Start a new task with Copilot</p>
            <p class="text-muted-foreground">
              Describe your task in natural language. Copilot will work in the
              background and open a pull request for your review.
            </p>
          </div>
        </div>
      </div>
    </hlm-popover>
  `,
})
export class ButtonGroupPopover {}
