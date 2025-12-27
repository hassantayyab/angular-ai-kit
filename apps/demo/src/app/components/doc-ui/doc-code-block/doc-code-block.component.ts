import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';

/**
 * DocCodeBlock Component
 *
 * Displays code snippets with consistent styling.
 * Supports single-line and multi-line code blocks.
 */
@Component({
  selector: 'app-doc-code-block',
  templateUrl: './doc-code-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-doc-code-block block',
  },
})
export class DocCodeBlockComponent {
  /** Code content to display */
  code = input.required<string>();

  /** Whether to use pre/code for multi-line (true) or just code for single-line (false) */
  multiline = input(false);
}
