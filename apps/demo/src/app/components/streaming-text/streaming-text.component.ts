import { cn } from '@angular-ai-kit/utils';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * StreamingTextComponent
 *
 * Displays text with a typewriter animation effect for streaming AI responses.
 * Features character-by-character reveal with configurable speed and cursor.
 *
 * @example
 * ```html
 * <app-streaming-text
 *   [content]="message.content"
 *   [isStreaming]="true"
 *   [speed]="30"
 * />
 * ```
 */
@Component({
  selector: 'app-streaming-text',
  templateUrl: './streaming-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-streaming-text-host inline',
    '[attr.aria-live]': '"polite"',
    '[attr.aria-busy]': 'isStreaming()',
  },
})
export class StreamingTextComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  // Inputs
  content = input.required<string>();
  isStreaming = input<boolean>(false);
  speed = input<number>(30); // ms per character
  showCursor = input<boolean>(true);
  cursorChar = input<string>('▊');
  customClasses = input<string>('');

  // Internal state
  displayedText = signal('');
  private currentIndex = 0;
  private animationTimeoutId: ReturnType<typeof setTimeout> | null = null;

  // Computed classes
  contentClasses = computed(() => {
    return cn(
      'app-streaming-text-content',
      'whitespace-pre-wrap break-words',
      this.customClasses()
    );
  });

  cursorClasses = computed(() => {
    return cn(
      'app-streaming-text-cursor',
      'inline-block',
      'text-primary',
      'animate-cursor-blink'
    );
  });

  constructor() {
    // Effect to handle content changes during streaming
    effect(() => {
      const fullText = this.content();
      const streaming = this.isStreaming();

      if (!isPlatformBrowser(this.platformId)) {
        // SSR: show full text immediately
        this.displayedText.set(fullText);
        return;
      }

      if (streaming) {
        // Start or continue animation
        this.animateText(fullText);
      } else {
        // Show full text immediately when not streaming
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

  ngOnInit(): void {
    // Initial text display
    if (!this.isStreaming()) {
      this.displayedText.set(this.content());
      this.currentIndex = this.content().length;
    }
  }

  /**
   * Animate text character by character
   */
  private animateText(fullText: string): void {
    // If we already have all the text displayed, just update
    if (this.currentIndex >= fullText.length) {
      this.displayedText.set(fullText);
      return;
    }

    // If new content is shorter (shouldn't happen often), reset
    if (fullText.length < this.currentIndex) {
      this.currentIndex = 0;
    }

    // Reveal next character
    const revealNextChar = () => {
      if (this.currentIndex < fullText.length) {
        this.currentIndex++;
        this.displayedText.set(fullText.slice(0, this.currentIndex));

        // Schedule next character
        this.animationTimeoutId = setTimeout(revealNextChar, this.speed());
      }
    };

    // Start revealing if not already at end
    if (this.currentIndex < fullText.length) {
      // Cancel any existing animation
      this.cancelAnimation();
      // Start new animation
      revealNextChar();
    }
  }

  /**
   * Cancel ongoing animation
   */
  private cancelAnimation(): void {
    if (this.animationTimeoutId !== null) {
      clearTimeout(this.animationTimeoutId);
      this.animationTimeoutId = null;
    }
  }

  /**
   * Reset animation state (useful for testing)
   */
  reset(): void {
    this.cancelAnimation();
    this.currentIndex = 0;
    this.displayedText.set('');
  }
}
