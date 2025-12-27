import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';

/**
 * DocSection Component
 *
 * Reusable section wrapper for documentation pages.
 * Provides consistent heading and optional description styling.
 */
@Component({
  selector: 'app-doc-section',
  templateUrl: './doc-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-doc-section block',
  },
})
export class DocSectionComponent {
  /** Section title (h2) */
  title = input.required<string>();

  /** Optional description text below title */
  description = input<string>('');

  /** Title size variant */
  size = input<'lg' | 'xl'>('xl');
}
