import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';

/**
 * DocDemoCard Component
 *
 * Card container for demo sections with consistent styling.
 * Used to wrap interactive demos and examples.
 */
@Component({
  selector: 'app-doc-demo-card',
  templateUrl: './doc-demo-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-doc-demo-card block',
  },
})
export class DocDemoCardComponent {
  /** Optional card title */
  title = input<string>('');

  /** Whether to include padding (set false for full-bleed content) */
  padding = input(true);

  /** Whether to center content (for single component demos) */
  centered = input(false);
}
