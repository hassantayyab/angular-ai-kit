import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { IconButtonComponent } from '../../ui/icon-button';

/**
 * Feedback value type
 */
export type FeedbackValue = 'up' | 'down' | null;

/**
 * Feedback Buttons Component
 *
 * Thumbs up/down toggle buttons for AI response feedback.
 * Supports mutual exclusivity - selecting one deselects the other.
 *
 * @example
 * ```html
 * <ai-feedback-buttons
 *   [value]="feedbackValue()"
 *   (valueChange)="handleFeedbackChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'ai-feedback-buttons',
  templateUrl: './feedback-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconButtonComponent],
  host: {
    class: 'ai-feedback-buttons inline-flex items-center gap-1',
    '[class]': 'hostClasses()',
    role: 'group',
    '[attr.aria-label]': '"Feedback buttons"',
  },
})
export class FeedbackButtonsComponent {
  // ==========================================
  // Inputs
  // ==========================================

  /**
   * Current feedback value.
   * - 'up': thumbs up selected
   * - 'down': thumbs down selected
   * - null: no selection
   */
  value = input<FeedbackValue>(null);

  /** Whether the buttons are disabled */
  disabled = input<boolean>(false);

  /** Custom CSS classes */
  customClasses = input<string>('');

  // ==========================================
  // Outputs
  // ==========================================

  /** Emitted when feedback value changes */
  valueChange = output<FeedbackValue>();

  /** Emitted specifically when thumbs up is clicked */
  thumbsUp = output<void>();

  /** Emitted specifically when thumbs down is clicked */
  thumbsDown = output<void>();

  // ==========================================
  // State
  // ==========================================

  /** Internal state for immediate UI feedback */
  private _internalValue = signal<FeedbackValue>(null);

  /** Sync internal state when input value changes (for controlled mode) */
  private _syncEffect = effect(() => {
    const inputValue = this.value();
    // Sync internal state to match input when parent controls the value
    this._internalValue.set(inputValue);
  });

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Whether thumbs up is selected */
  isThumbsUpSelected = computed(() => this._internalValue() === 'up');

  /** Whether thumbs down is selected */
  isThumbsDownSelected = computed(() => this._internalValue() === 'down');

  /** Host element classes */
  hostClasses = computed(() => cn(this.customClasses()));

  /** Thumbs up button classes - theme aware */
  thumbsUpClasses = computed(() =>
    cn({
      'text-foreground': this.isThumbsUpSelected(),
    })
  );

  /** Thumbs down button classes - theme aware */
  thumbsDownClasses = computed(() =>
    cn({
      'text-foreground': this.isThumbsDownSelected(),
    })
  );

  /** Aria label for thumbs up */
  thumbsUpLabel = computed(() =>
    this.isThumbsUpSelected() ? 'Remove positive feedback' : 'Good response'
  );

  /** Aria label for thumbs down */
  thumbsDownLabel = computed(() =>
    this.isThumbsDownSelected() ? 'Remove negative feedback' : 'Bad response'
  );

  // ==========================================
  // Methods
  // ==========================================

  /** Handle thumbs up click */
  handleThumbsUp(): void {
    if (this.disabled()) return;

    const wasSelected = this.isThumbsUpSelected();
    const newValue: FeedbackValue = wasSelected ? null : 'up';

    this._internalValue.set(newValue);
    this.valueChange.emit(newValue);

    // Only emit thumbsUp event when selecting (not deselecting)
    if (!wasSelected) {
      this.thumbsUp.emit();
    }
  }

  /** Handle thumbs down click */
  handleThumbsDown(): void {
    if (this.disabled()) return;

    const wasSelected = this.isThumbsDownSelected();
    const newValue: FeedbackValue = wasSelected ? null : 'down';

    this._internalValue.set(newValue);
    this.valueChange.emit(newValue);

    // Only emit thumbsDown event when selecting (not deselecting)
    if (!wasSelected) {
      this.thumbsDown.emit();
    }
  }
}
