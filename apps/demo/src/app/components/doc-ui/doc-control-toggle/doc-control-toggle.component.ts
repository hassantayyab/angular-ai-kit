import { HlmSwitch } from '@angular-ai-kit/spartan-ui/switch';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

/**
 * DocControlToggle Component
 *
 * Toggle switch control for configuration panels.
 * Provides consistent styling with hover effects.
 */
@Component({
  selector: 'app-doc-control-toggle',
  templateUrl: './doc-control-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmSwitch],
  host: {
    class: 'app-doc-control-toggle block',
  },
})
export class DocControlToggleComponent {
  /** Label text for the toggle */
  label = input.required<string>();

  /** Current checked state */
  checked = input.required<boolean>();

  /** Emits when toggle state changes */
  checkedChange = output<boolean>();
}
