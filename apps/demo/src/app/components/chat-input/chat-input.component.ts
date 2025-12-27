import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { cn } from '@angular-ai-kit/utils';
import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

/**
 * Suggestion item for quick prompts
 */
export interface ChatSuggestion {
  /** Short display text for badge */
  label: string;
  /** Full prompt text to fill input */
  prompt: string;
  /** Optional emoji/icon */
  icon?: string;
}

/**
 * Position of suggestion badges relative to the input
 */
export type SuggestionsPosition = 'top' | 'bottom';

/**
 * ChatInputComponent
 *
 * Auto-resizing textarea with send button for chat input.
 * Supports Enter to send, Shift+Enter for newline.
 *
 * @example
 * ```html
 * <app-chat-input
 *   [disabled]="isLoading()"
 *   [placeholder]="'Type a message...'"
 *   (messageSend)="handleSend($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmButton, NgTemplateOutlet],
  host: {
    class: 'app-chat-input-host block',
  },
})
export class ChatInputComponent {
  private platformId = inject(PLATFORM_ID);
  private textareaRef =
    viewChild<ElementRef<HTMLTextAreaElement>>('textareaRef');

  // Inputs
  placeholder = input<string>('Message Angular AI Kit...');
  disabled = input<boolean>(false);
  maxHeight = input<number>(200);

  // Visibility toggles - all default to true
  showContextButton = input<boolean>(true);
  showAttachmentButton = input<boolean>(true);
  showResearchButton = input<boolean>(true);
  showSourcesButton = input<boolean>(true);
  showModelName = input<boolean>(true);
  showMicButton = input<boolean>(true);

  // Suggestions feature
  suggestions = input<ChatSuggestion[]>([]);
  showSuggestions = input<boolean>(true);
  suggestionsPosition = input<SuggestionsPosition>('bottom');

  // Outputs
  messageSend = output<string>();
  inputCleared = output<void>();
  suggestionSelect = output<ChatSuggestion>();

  // State
  inputValue = signal('');

  // Computed
  canSend = computed(() => {
    return this.inputValue().trim().length > 0 && !this.disabled();
  });

  /** Check if any left toolbar items are visible */
  hasLeftToolbarItems = computed(() => {
    return (
      this.showAttachmentButton() ||
      this.showResearchButton() ||
      this.showSourcesButton() ||
      this.showModelName()
    );
  });

  /** Show suggestions only when input is empty and feature is enabled */
  suggestionsVisible = computed(() => {
    return (
      this.showSuggestions() &&
      this.suggestions().length > 0 &&
      this.inputValue().trim().length === 0
    );
  });

  constructor() {
    // Auto-resize textarea after render
    afterNextRender(() => {
      this.resizeTextarea();
    });
  }

  // Computed classes
  containerClasses = computed(() => {
    return cn('app-chat-input', 'w-full', 'px-4 pb-4 pt-2');
  });

  cardClasses = computed(() => {
    return cn(
      'rounded-3xl',
      'border border-[var(--border)]',
      'bg-[var(--card)]',
      'shadow-sm',
      'transition-all duration-200',
      'focus-within:border-[var(--border-hover)]',
      'focus-within:shadow-md'
    );
  });

  textareaClasses = computed(() => {
    return cn(
      'w-full',
      'resize-none',
      'bg-transparent',
      'text-[var(--foreground)]',
      'placeholder:text-[var(--foreground-muted)]',
      'focus:outline-none',
      'text-base leading-relaxed',
      'max-h-[200px]',
      'scrollbar-thin',
      {
        'opacity-50 cursor-not-allowed': this.disabled(),
      }
    );
  });

  toolbarClasses = computed(() => {
    return cn('flex items-center justify-between', 'px-3 pb-3 pt-1');
  });

  sendButtonClasses = computed(() => {
    return cn('rounded-full');
  });

  // Methods
  handleInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.inputValue.set(textarea.value);
    this.resizeTextarea();
  }

  handleKeydown(event: KeyboardEvent): void {
    // Enter without Shift sends the message
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSend();
    }
    // Escape clears the input
    if (event.key === 'Escape') {
      this.handleClear();
    }
  }

  /** Clear the input and emit inputCleared event */
  handleClear(): void {
    if (this.inputValue().length > 0) {
      this.inputValue.set('');
      this.resetTextarea();
      this.inputCleared.emit();
    }
  }

  handleSend(): void {
    if (!this.canSend()) return;

    const message = this.inputValue().trim();
    this.messageSend.emit(message);
    this.inputValue.set('');
    this.resetTextarea();
  }

  /** Handle suggestion badge click */
  handleSuggestionClick(suggestion: ChatSuggestion): void {
    this.inputValue.set(suggestion.prompt);
    this.suggestionSelect.emit(suggestion);
    this.focus();
    this.resizeTextarea();
  }

  /**
   * Focus the textarea
   */
  focus(): void {
    const textarea = this.textareaRef()?.nativeElement;
    if (textarea) {
      textarea.focus();
    }
  }

  private resizeTextarea(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const textarea = this.textareaRef()?.nativeElement;
    if (!textarea) return;

    // Reset height to auto to get accurate scrollHeight
    textarea.style.height = 'auto';

    // Set new height, capped at maxHeight
    const newHeight = Math.min(textarea.scrollHeight, this.maxHeight());
    textarea.style.height = `${newHeight}px`;
  }

  private resetTextarea(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const textarea = this.textareaRef()?.nativeElement;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.value = '';
  }
}
