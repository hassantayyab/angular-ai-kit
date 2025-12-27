import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucidePlus } from '@ng-icons/lucide';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmButtonGroupImports } from '@angular-ai-kit/spartan-ui/button-group';
import { HlmIcon } from '@angular-ai-kit/spartan-ui/icon';
import { HlmInputGroupImports } from '@angular-ai-kit/spartan-ui/input-group';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'spartan-button-group-input-group',
  imports: [
    HlmButtonGroupImports,
    HlmInputGroupImports,
    HlmButton,
    HlmIcon,
    NgIcon,
  ],
  providers: [provideIcons({ lucidePlus, lucideAudioLines })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div hlmButtonGroup class="w-full [--radius:9999rem]">
      <div hlmButtonGroup>
        <button hlmBtn variant="outline" size="icon">
          <ng-icon hlm name="lucidePlus" size="sm" />
        </button>
      </div>
      <div hlmButtonGroup class="flex-1">
        <div hlmInputGroup>
          <input hlmInputGroupInput placeholder="Send a message" />
          <div hlmInputGroupAddon align="inline-end">
            <button
              hlmInputGroupButton
              class="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
              size="icon-xs"
              [attr.data-active]="_enableVoiceMode()"
              (click)="_enableVoiceMode.set(!_enableVoiceMode())"
            >
              <ng-icon hlm name="lucideAudioLines" size="sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ButtonGroupInputGroup {
  protected readonly _enableVoiceMode = signal(false);
}
