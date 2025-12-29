import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hlm-radio-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'radio-group-indicator',
  },
  template: `
    <div
      class="group-data-[checked=true]:bg-primary size-2 rounded-full bg-transparent"
    ></div>
  `,
})
export class HlmRadioIndicator {
  constructor() {
    classes(
      () =>
        'border-border text-primary group-has-[:focus-visible]:border-ring group-has-[:focus-visible]:ring-ring/50 bg-input group-data=[disabled=true]:cursor-not-allowed group-data=[disabled=true]:opacity-50 relative flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border shadow-xs transition-[color,box-shadow] outline-none group-has-[:focus-visible]:ring-[3px]'
    );
  }
}
