import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
  output,
  input,
  ElementRef,
  viewChild,
  afterNextRender,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { cn } from '@angular-ai-kit/utils';
import { HlmButtonDirective } from '@angular-ai-kit/spartan-ui';

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
  imports: [HlmButtonDirective],
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

  // Outputs
  messageSend = output<string>();

  // State
  inputValue = signal('');

  // Computed
  canSend = computed(() => {
    return this.inputValue().trim().length > 0 && !this.disabled();
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

  inputWrapperClasses = computed(() => {
    return cn(
      'relative flex items-end gap-2',
      'rounded-2xl',
      'border border-[var(--border)]',
      'bg-[var(--card)]',
      'px-4 py-3',
      'shadow-sm',
      'transition-all duration-200',
      'focus-within:border-[var(--border-hover)]',
      'focus-within:shadow-md'
    );
  });

  textareaClasses = computed(() => {
    return cn(
      'flex-1',
      'resize-none',
      'bg-transparent',
      'text-[var(--foreground)]',
      'placeholder:text-[var(--foreground-muted)]',
      'focus:outline-none',
      'text-sm leading-relaxed',
      'max-h-[200px]',
      'scrollbar-thin',
      {
        'opacity-50 cursor-not-allowed': this.disabled(),
      }
    );
  });

  sendButtonClasses = computed(() => {
    return cn(
      'flex items-center justify-center',
      'h-9 w-9',
      'rounded-xl',
      'transition-all duration-200',
      'shrink-0',
      {
        'bg-[var(--primary)] text-[var(--primary-foreground)]': this.canSend(),
        'hover:opacity-90': this.canSend(),
        'bg-[var(--muted)] text-[var(--foreground-muted)]': !this.canSend(),
        'cursor-not-allowed': !this.canSend(),
      }
    );
  });

  hintClasses = computed(() => {
    return cn(
      'mt-2',
      'text-center',
      'text-xs',
      'text-[var(--foreground-muted)]'
    );
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
  }

  handleSend(): void {
    if (!this.canSend()) return;

    const message = this.inputValue().trim();
    this.messageSend.emit(message);
    this.inputValue.set('');
    this.resetTextarea();
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
