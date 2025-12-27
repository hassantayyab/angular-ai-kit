import { HlmFieldImports } from '@angular-ai-kit/spartan-ui/field';
import { HlmSlider } from '@angular-ai-kit/spartan-ui/slider';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'spartan-field-slider',
  imports: [HlmSlider, HlmFieldImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset hlmFieldSet>
      <div hlmFieldGroup>
        <div hlmField>
          <label hlmFieldLabel for="field-input-preview-firstname"
            >Price Range</label
          >
          <p hlmFieldDescription>
            Set your budget range ($0 - {{ sliderValue() }}).
          </p>
          <hlm-slider [max]="1000" [step]="10" [(value)]="sliderValue" />
        </div>
      </div>
    </fieldset>
  `,
})
export class FieldSlider {
  public readonly sliderValue = signal(500);
}
