import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
import {
  PromptSuggestion,
  SuggestionsPosition,
} from './prompt-suggestions.types';

/**
 * Prompt Suggestions Component
 *
 * Displays a row of suggestion badges/chips for quick prompts.
 * Designed to be placed above or below a chat input.
 *
 * @example
 * ```html
 * <ai-prompt-suggestions
 *   [suggestions]="suggestions"
 *   [position]="'bottom'"
 *   (select)="handleSuggestionSelect($event)"
 * />
 * ```
 */
@Component({
  selector: 'ai-prompt-suggestions',
  templateUrl: './prompt-suggestions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ai-prompt-suggestions block',
    '[class]': 'hostClasses()',
  },
})
export class PromptSuggestionsComponent {
  // ==========================================
  // Inputs
  // ==========================================

  /** Array of suggestion items to display */
  suggestions = input.required<PromptSuggestion[]>();

  /** Position relative to input (affects margin) */
  position = input<SuggestionsPosition>('bottom');

  /** Custom CSS classes */
  customClasses = input<string>('');

  // ==========================================
  // Outputs
  // ==========================================

  /** Emitted when a suggestion is clicked */
  select = output<PromptSuggestion>();

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Host element classes */
  hostClasses = computed(() =>
    cn(
      {
        'mb-3': this.position() === 'top',
        'mt-3': this.position() === 'bottom',
      },
      this.customClasses()
    )
  );

  /** Container classes */
  containerClasses = computed(() =>
    cn('flex flex-wrap items-center justify-center gap-2')
  );

  /** Button classes - exact match of hlmBtn variant="outline" + ChatInput overrides */
  buttonClasses = computed(() =>
    cn(
      // Base hlmBtn styles
      'cursor-pointer',
      'inline-flex shrink-0 items-center justify-center gap-2',
      'font-medium whitespace-nowrap',
      'transition-all outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      // Focus styles
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      // Outline variant styles
      'bg-background hover:bg-accent hover:text-accent-foreground',
      'border border-border shadow-xs',
      // Default size base
      'h-9 py-2',
      // ChatInput overrides (rounded-full, px-3, text-xs)
      'rounded-full px-3 text-xs'
    )
  );

  // ==========================================
  // Methods
  // ==========================================

  /** Handle suggestion click */
  handleClick(suggestion: PromptSuggestion): void {
    this.select.emit(suggestion);
  }
}
