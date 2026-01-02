import { cn } from '@angular-ai-kit/utils';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { IconButtonComponent } from '../../ui/icon-button';
import { FeedbackButtonsComponent, FeedbackValue } from '../feedback-buttons';

/**
 * Response Actions Component
 *
 * Action bar for AI responses with copy, regenerate, and feedback buttons.
 * Designed to be placed below AI response content.
 *
 * @example
 * ```html
 * <ai-response-actions
 *   [content]="responseText"
 *   (copy)="handleCopy($event)"
 *   (regenerate)="handleRegenerate()"
 *   (thumbsUp)="handleThumbsUp()"
 *   (thumbsDown)="handleThumbsDown()"
 * />
 * ```
 */
@Component({
  selector: 'ai-response-actions',
  templateUrl: './response-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconButtonComponent, FeedbackButtonsComponent],
  host: {
    class: 'ai-response-actions-host block',
  },
})
export class ResponseActionsComponent {
  private platformId = inject(PLATFORM_ID);

  // ==========================================
  // Inputs
  // ==========================================

  /** Content to copy (for copy button) */
  content = input<string>('');

  /** Whether to show the copy button */
  showCopy = input<boolean>(true);

  /** Whether to show the regenerate button */
  showRegenerate = input<boolean>(true);

  /** Whether to show feedback buttons */
  showFeedback = input<boolean>(true);

  /** Whether actions are always visible (vs hover/focus) */
  alwaysVisible = input<boolean>(false);

  /** Whether parent is hovered (for visibility control) */
  isHovered = input<boolean>(false);

  /** Whether parent is focused (for visibility control) */
  isFocused = input<boolean>(false);

  /** Custom CSS classes */
  customClasses = input<string>('');

  // ==========================================
  // Outputs
  // ==========================================

  /** Emitted when copy button is clicked */
  copy = output<string>();

  /** Emitted when regenerate button is clicked */
  regenerate = output<void>();

  /** Emitted when thumbs up is clicked */
  thumbsUp = output<void>();

  /** Emitted when thumbs down is clicked */
  thumbsDown = output<void>();

  /** Emitted when feedback value changes */
  feedbackChange = output<FeedbackValue>();

  // ==========================================
  // State
  // ==========================================

  /** Whether copy was just clicked */
  justCopied = signal(false);

  /** Current feedback value */
  feedbackValue = signal<FeedbackValue>(null);

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Whether actions should be visible */
  actionsVisible = computed(
    () => this.alwaysVisible() || this.isHovered() || this.isFocused()
  );

  /** Icon for copy button */
  copyIcon = computed(() => (this.justCopied() ? 'lucideCheck' : 'lucideCopy'));

  /** Copy button aria label */
  copyLabel = computed(() => (this.justCopied() ? 'Copied!' : 'Copy response'));

  /** Copy button classes */
  copyButtonClasses = computed(() =>
    cn({
      'text-foreground': this.justCopied(),
    })
  );

  /** Container classes */
  containerClasses = computed(() =>
    cn(
      'ai-response-actions flex items-center gap-1',
      'transition-opacity duration-200',
      {
        'opacity-100 visible': this.actionsVisible(),
        'opacity-0 invisible': !this.actionsVisible(),
      },
      this.customClasses()
    )
  );

  // ==========================================
  // Event Handlers
  // ==========================================

  /** Handle copy button click */
  handleCopy(): void {
    const content = this.content();
    this.copy.emit(content);

    if (isPlatformBrowser(this.platformId) && navigator.clipboard) {
      navigator.clipboard.writeText(content).then(() => {
        this.justCopied.set(true);
        setTimeout(() => this.justCopied.set(false), 2000);
      });
    }
  }

  /** Handle regenerate button click */
  handleRegenerate(): void {
    this.regenerate.emit();
  }

  /** Handle feedback value change */
  handleFeedbackChange(value: FeedbackValue): void {
    const previousValue = this.feedbackValue();
    this.feedbackValue.set(value);
    this.feedbackChange.emit(value);

    // Emit specific events for thumbs up/down
    if (value === 'up' && previousValue !== 'up') {
      this.thumbsUp.emit();
    } else if (value === 'down' && previousValue !== 'down') {
      this.thumbsDown.emit();
    }
  }
}
