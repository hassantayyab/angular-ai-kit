import { HlmSelectImports } from '@angular-ai-kit/spartan-ui/select';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { BrnSelectImports } from '@spartan-ng/brain/select';

/** Option interface for select control */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * DocSelectControl Component
 *
 * Reusable select dropdown control for documentation demos.
 * Uses Spartan UI select for consistent styling.
 */
@Component({
  selector: 'app-doc-select-control',
  templateUrl: './doc-select-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [BrnSelectImports, HlmSelectImports],
  host: {
    class: 'app-doc-select-control block',
  },
})
export class DocSelectControlComponent {
  /** Label text */
  label = input.required<string>();

  /** Current selected value */
  value = input.required<string>();

  /** Available options */
  options = input.required<SelectOption[]>();

  /** Emits when value changes */
  valueChange = output<string>();

  /** Handle select change */
  onValueChange(value: string | string[] | undefined): void {
    if (typeof value === 'string') {
      this.valueChange.emit(value);
    }
  }
}
