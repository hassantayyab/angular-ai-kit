import { HlmCheckbox } from '@angular-ai-kit/spartan-ui/checkbox';
import { HlmFieldImports } from '@angular-ai-kit/spartan-ui/field';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'spartan-field-checkbox',
  imports: [HlmFieldImports, HlmCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset hlmFieldSet>
      <label hlmFieldLabel for="exp-checkbox">
        <div hlmField orientation="horizontal">
          <hlm-checkbox id="exp-checkbox" [checked]="true" />
          <label hlmFieldLabel for="exp-checkbox"
            >I agree to the terms and conditions</label
          >
        </div>
      </label>
    </fieldset>
  `,
})
export class FieldCheckbox {}
