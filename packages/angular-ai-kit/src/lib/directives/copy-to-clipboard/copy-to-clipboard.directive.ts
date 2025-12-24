/**
 * Copy to Clipboard Directive
 *
 * Copies text to the clipboard when the host element is clicked.
 * Provides keyboard accessibility and visual feedback.
 *
 * @example
 * ```html
 * <button aiCopyToClipboard [text]="codeContent" (copied)="onCopied()">
 *   Copy Code
 * </button>
 * ```
 */
import { Directive, input, output, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Directive for copying text to clipboard
 */
@Directive({
  selector: '[aiCopyToClipboard]',
  host: {
    '(click)': 'copy()',
    '(keydown.enter)': 'copy()',
    '(keydown.space)': 'copy()',
    '[attr.role]': '"button"',
    '[attr.tabindex]': '0',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class CopyToClipboardDirective {
  private platformId = inject(PLATFORM_ID);

  /**
   * Text to copy to clipboard
   */
  text = input.required<string>({
    alias: 'aiCopyToClipboard',
  });

  /**
   * Custom ARIA label
   * @default 'Copy to clipboard'
   */
  ariaLabel = input<string>('Copy to clipboard');

  /**
   * Emitted when text is successfully copied
   */
  copied = output<string>();

  /**
   * Emitted when copy fails
   */
  copyError = output<Error>();

  /**
   * Copy text to clipboard
   */
  async copy(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const textToCopy = this.text();

      if (!textToCopy) {
        throw new Error('No text provided to copy');
      }

      // Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        this.fallbackCopy(textToCopy);
      }

      this.copied.emit(textToCopy);
    } catch (error) {
      const err =
        error instanceof Error ? error : new Error('Failed to copy text');
      this.copyError.emit(err);
    }
  }

  /**
   * Fallback copy method for browsers without Clipboard API
   */
  private fallbackCopy(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const successful = document.execCommand('copy');
      if (!successful) {
        throw new Error('Copy command failed');
      }
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
