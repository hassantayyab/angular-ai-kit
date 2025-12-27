import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';

/** API property definition for inputs/outputs */
export interface ApiProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
}

/**
 * DocApiTable Component
 *
 * Displays API reference table for component inputs or outputs.
 * Provides consistent styling for documentation pages.
 */
@Component({
  selector: 'app-doc-api-table',
  templateUrl: './doc-api-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-doc-api-table block',
  },
})
export class DocApiTableComponent {
  /** Table title (e.g., "Inputs" or "Outputs") */
  title = input.required<string>();

  /** Array of API properties to display */
  properties = input.required<ApiProperty[]>();

  /** Whether to show the default column (hide for outputs) */
  showDefault = input(true);
}
