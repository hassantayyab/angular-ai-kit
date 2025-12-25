/**
 * Auto Resize Directive
 *
 * Automatically adjusts textarea height based on content.
 * Supports min/max height constraints and SSR compatibility.
 *
 * @example
 * ```html
 * <textarea
 *   aiAutoResize
 *   [minHeight]="60"
 *   [maxHeight]="300"
 *   placeholder="Type your message...">
 * </textarea>
 * ```
 */
import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  Renderer2,
  afterNextRender,
  effect,
  inject,
  input,
} from '@angular/core';

/**
 * Directive for auto-resizing textareas
 */
@Directive({
  selector: 'textarea[aiAutoResize]',
  host: {
    '(input)': 'adjust()',
    '(focus)': 'adjust()',
  },
})
export class AutoResizeDirective {
  private elementRef = inject<ElementRef<HTMLTextAreaElement>>(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);

  /**
   * Minimum height in pixels
   * @default 60
   */
  minHeight = input<number>(60);

  /**
   * Maximum height in pixels
   * @default Infinity
   */
  maxHeight = input<number>(Infinity);

  /**
   * Additional offset for height calculation
   * @default 0
   */
  offset = input<number>(0);

  constructor() {
    // Initial adjustment after render
    afterNextRender(() => {
      this.adjust();
    });

    // Adjust when min/max height changes
    effect(() => {
      this.minHeight();
      this.maxHeight();
      this.adjust();
    });
  }

  /**
   * Adjust the textarea height based on content
   */
  adjust(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const textarea = this.elementRef.nativeElement;
    const minH = this.minHeight();
    const maxH = this.maxHeight();
    const offset = this.offset();

    // Reset height to recalculate
    this.renderer.setStyle(textarea, 'height', 'auto');
    this.renderer.setStyle(textarea, 'overflow-y', 'hidden');

    // Calculate new height
    const scrollHeight = textarea.scrollHeight + offset;
    let newHeight = scrollHeight;

    // Apply min/max constraints
    if (newHeight < minH) {
      newHeight = minH;
    } else if (newHeight > maxH) {
      newHeight = maxH;
      this.renderer.setStyle(textarea, 'overflow-y', 'auto');
    }

    // Set the new height
    this.renderer.setStyle(textarea, 'height', `${newHeight}px`);
  }
}
