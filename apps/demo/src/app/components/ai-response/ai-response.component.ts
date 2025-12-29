import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideCopy,
  lucideRefreshCw,
  lucideThumbsDown,
  lucideThumbsUp,
} from '@ng-icons/lucide';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmIcon } from '@angular-ai-kit/spartan-ui/icon';
import { cn } from '@angular-ai-kit/utils';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownService } from '../../services/markdown.service';

/**
 * AI Response Component
 *
 * Displays AI response content with markdown rendering, syntax highlighting,
 * streaming text effect, and action buttons.
 *
 * Features:
 * - Full markdown support (GFM)
 * - Code blocks with syntax highlighting
 * - Copy button on each code block
 * - Streaming text animation
 * - Action buttons: copy, regenerate, thumbs up/down
 *
 * @example
 * ```html
 * <app-ai-response
 *   [content]="response"
 *   [isStreaming]="isLoading"
 *   [speed]="20"
 *   (copy)="handleCopy($event)"
 *   (regenerate)="handleRegenerate()"
 *   (thumbsUp)="handleThumbsUp()"
 *   (thumbsDown)="handleThumbsDown()"
 * />
 * ```
 */
@Component({
  selector: 'app-ai-response',
  templateUrl: './ai-response.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmButton, HlmIcon, NgIcon],
  viewProviders: [
    provideIcons({
      lucideCopy,
      lucideCheck,
      lucideRefreshCw,
      lucideThumbsUp,
      lucideThumbsDown,
    }),
  ],
  host: {
    class: 'app-ai-response-host block',
    '[attr.aria-live]': '"polite"',
    '[attr.aria-busy]': 'isStreaming()',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(focusin)': 'handleFocusIn()',
    '(focusout)': 'handleFocusOut()',
  },
})
export class AiResponseComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private markdownService = inject(MarkdownService);
  private sanitizer = inject(DomSanitizer);

  // View children
  private contentRef = viewChild<ElementRef<HTMLDivElement>>('contentArea');

  // ==========================================
  // Inputs
  // ==========================================

  /** The markdown content to display */
  content = input.required<string>();

  /** Whether the content is currently streaming */
  isStreaming = input<boolean>(false);

  /** Streaming speed in milliseconds per character */
  speed = input<number>(20);

  /** Whether to show action buttons */
  showActions = input<boolean>(true);

  /** Whether to show the streaming cursor */
  showCursor = input<boolean>(true);

  /** Custom CSS classes */
  customClasses = input<string>('');

  // ==========================================
  // Outputs
  // ==========================================

  /** Emitted when copy button is clicked with full content */
  copy = output<string>();

  /** Emitted when regenerate button is clicked */
  regenerate = output<void>();

  /** Emitted when thumbs up is clicked */
  thumbsUp = output<void>();

  /** Emitted when thumbs down is clicked */
  thumbsDown = output<void>();

  /** Emitted when streaming completes */
  streamComplete = output<void>();

  // ==========================================
  // State
  // ==========================================

  private _isHovered = signal(false);
  isHovered = this._isHovered.asReadonly();

  private _isFocused = signal(false);
  isFocused = this._isFocused.asReadonly();

  /** Currently displayed text during streaming */
  displayedText = signal('');

  /** Whether copy was just clicked (for feedback) */
  justCopied = signal(false);

  /** Thumbs up selected state */
  thumbsUpSelected = signal(false);

  /** Thumbs down selected state */
  thumbsDownSelected = signal(false);

  // Animation state
  private currentIndex = 0;
  private animationTimeoutId: ReturnType<typeof setTimeout> | null = null;

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Whether actions should be visible */
  actionsVisible = computed(
    () => this.showActions() || this.isHovered() || this.isFocused()
  );

  /** Rendered HTML from markdown (works during streaming too) */
  renderedHtml = computed((): SafeHtml => {
    // Use displayedText during streaming, full content when complete
    const textToRender = this.isStreaming()
      ? this.displayedText()
      : this.content();
    const html = this.markdownService.parse(textToRender);
    // Bypass Angular sanitization to allow copy buttons in code blocks
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  /** Container classes */
  containerClasses = computed(() => {
    return cn(
      'app-ai-response',
      'relative rounded-xl p-4',
      'bg-card',
      'border border-border',
      'transition-all duration-200',
      this.customClasses()
    );
  });

  /** Content area classes */
  contentClasses = computed(() => {
    return cn(
      'app-ai-response-content',
      'text-sm leading-relaxed',
      'text-foreground'
    );
  });

  /** Cursor classes */
  cursorClasses = computed(() => {
    return cn(
      'app-ai-response-cursor',
      'inline-block ml-0.5',
      'text-foreground',
      'animate-cursor-blink'
    );
  });

  /** Actions container classes */
  actionsClasses = computed(() => {
    const shouldShow = this.actionsVisible();

    return cn(
      'app-ai-response-actions',
      'flex items-center gap-1 mt-3 pt-3',
      'border-t border-border',
      'transition-opacity duration-200',
      {
        'opacity-100 visible': shouldShow,
        'opacity-0 invisible': !shouldShow,
      }
    );
  });

  /** Action button base classes */
  actionButtonClasses = computed(() => {
    return cn('h-7 w-7');
  });

  constructor() {
    // Effect to handle content/streaming changes
    effect(() => {
      const fullText = this.content();
      const streaming = this.isStreaming();

      if (!isPlatformBrowser(this.platformId)) {
        // SSR: show full text
        this.displayedText.set(fullText);
        return;
      }

      if (streaming) {
        this.animateText(fullText);
      } else {
        this.cancelAnimation();
        this.displayedText.set(fullText);
        this.currentIndex = fullText.length;
      }
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.cancelAnimation();
    });
  }

  ngAfterViewInit(): void {
    // Add copy buttons to code blocks after view init
    if (!this.isStreaming()) {
      this.addCodeBlockCopyButtons();
    }
  }

  // ==========================================
  // Private Methods
  // ==========================================

  /** Animate text character by character */
  private animateText(fullText: string): void {
    if (this.currentIndex >= fullText.length) {
      this.displayedText.set(fullText);
      return;
    }

    if (fullText.length < this.currentIndex) {
      this.currentIndex = 0;
    }

    const revealNextChar = () => {
      if (this.currentIndex < fullText.length) {
        this.currentIndex++;
        this.displayedText.set(fullText.slice(0, this.currentIndex));
        this.animationTimeoutId = setTimeout(revealNextChar, this.speed());
      } else {
        // Streaming complete
        this.streamComplete.emit();
        // Wait a tick then add copy buttons
        setTimeout(() => this.addCodeBlockCopyButtons(), 0);
      }
    };

    if (this.currentIndex < fullText.length) {
      this.cancelAnimation();
      revealNextChar();
    }
  }

  /** Cancel ongoing animation */
  private cancelAnimation(): void {
    if (this.animationTimeoutId !== null) {
      clearTimeout(this.animationTimeoutId);
      this.animationTimeoutId = null;
    }
  }

  /** Attach click handlers to code block copy buttons */
  private addCodeBlockCopyButtons(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const contentEl = this.contentRef()?.nativeElement;
    if (!contentEl) return;

    // Find all copy buttons generated by the markdown renderer
    const copyButtons =
      contentEl.querySelectorAll<HTMLButtonElement>('.code-block-copy');
    copyButtons.forEach((btn) => {
      // Skip if already has a handler attached
      if (btn.dataset['handlerAttached']) return;
      btn.dataset['handlerAttached'] = 'true';

      btn.addEventListener('click', () => {
        const encodedCode = btn.dataset['code'];
        if (encodedCode) {
          const code = decodeURIComponent(encodedCode);
          navigator.clipboard.writeText(code).then(() => {
            // Update button to show checkmark icon
            const originalHtml = btn.innerHTML;
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
            btn.classList.add('copied');

            setTimeout(() => {
              btn.innerHTML = originalHtml;
              btn.classList.remove('copied');
            }, 2000);
          });
        }
      });
    });
  }

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

  /** Handle thumbs up click */
  handleThumbsUp(): void {
    const wasSelected = this.thumbsUpSelected();
    this.thumbsUpSelected.set(!wasSelected);
    if (this.thumbsDownSelected()) {
      this.thumbsDownSelected.set(false);
    }
    if (!wasSelected) {
      this.thumbsUp.emit();
    }
  }

  /** Handle thumbs down click */
  handleThumbsDown(): void {
    const wasSelected = this.thumbsDownSelected();
    this.thumbsDownSelected.set(!wasSelected);
    if (this.thumbsUpSelected()) {
      this.thumbsUpSelected.set(false);
    }
    if (!wasSelected) {
      this.thumbsDown.emit();
    }
  }

  /** Handle mouse enter */
  handleMouseEnter(): void {
    this._isHovered.set(true);
  }

  /** Handle mouse leave */
  handleMouseLeave(): void {
    this._isHovered.set(false);
  }

  /** Handle focus in */
  handleFocusIn(): void {
    this._isFocused.set(true);
  }

  /** Handle focus out */
  handleFocusOut(): void {
    this._isFocused.set(false);
  }

  /** Reset animation state */
  reset(): void {
    this.cancelAnimation();
    this.currentIndex = 0;
    this.displayedText.set('');
  }
}
