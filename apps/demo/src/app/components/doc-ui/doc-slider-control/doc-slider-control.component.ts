import { HlmSlider } from '@angular-ai-kit/spartan-ui/slider';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

/**
 * DocSliderControl Component
 *
 * Slider control for configuration panels.
 * Displays label with current value and slider.
 */
@Component({
  selector: 'app-doc-slider-control',
  templateUrl: './doc-slider-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmSlider],
  host: {
    class: 'app-doc-slider-control block',
  },
})
export class DocSliderControlComponent {
  /** Label text for the slider */
  label = input.required<string>();

  /** Current value */
  value = input.required<number>();

  /** Minimum value */
  min = input(0);

  /** Maximum value */
  max = input(100);

  /** Step increment */
  step = input(1);

  /** Optional suffix for value display (e.g., "ms", "%") */
  suffix = input<string>('');

  /** Emits when value changes */
  valueChange = output<number>();
}
