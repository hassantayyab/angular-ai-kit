import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';

/**
 * DocFeaturesList Component
 *
 * Displays a bulleted list of features or accessibility info.
 * Provides consistent styling for documentation sections.
 */
@Component({
  selector: 'app-doc-features-list',
  templateUrl: './doc-features-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-doc-features-list block',
  },
})
export class DocFeaturesListComponent {
  /** Section title (e.g., "Features" or "Accessibility") */
  title = input.required<string>();

  /** Array of feature/item strings to display */
  items = input.required<string[]>();
}
