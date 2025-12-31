/**
 * Focus Trap Directive
 *
 * Traps keyboard focus within an element for accessibility.
 * Essential for modals, dialogs, and popups to maintain focus management.
 *
 * @example
 * ```html
 * <div aiFocusTrap [enabled]="isModalOpen" (focusEscape)="closeModal()">
 *   <!-- Modal content -->
 *   <button #firstFocusable>Cancel</button>
 *   <button>Confirm</button>
 * </div>
 * ```
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
  input,
  output,
} from '@angular/core';

/**
 * Directive for trapping focus within an element
 */
@Directive({
  selector: '[aiFocusTrap]',
  host: {
    '(keydown.tab)': 'handleTab($event)',
    '(keydown.escape)': 'handleEscape($event)',
  },
})
export class FocusTrapDirective {
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  private previousActiveElement: HTMLElement | null = null;

  /**
   * Whether focus trap is enabled
   * @default true
   */
  enabled = input(true);

  /**
   * Whether to restore focus to previous element on disable
   * @default true
   */
  restoreFocus = input(true);

  /**
   * Whether pressing Escape should emit focusEscape event
   * @default true
   */
  enableEscapeKey = input(true);

  /**
   * Emitted when Escape key is pressed
   */
  focusEscape = output<KeyboardEvent>();

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.initialize();
      }
    });

    // Watch for enabled changes
    effect(() => {
      const enabled = this.enabled();
      if (enabled && isPlatformBrowser(this.platformId)) {
        this.activate();
      } else if (!enabled && this.restoreFocus()) {
        this.deactivate();
      }
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      if (this.restoreFocus()) {
        this.restorePreviousFocus();
      }
    });
  }

  /**
   * Initialize the focus trap
   */
  private initialize(): void {
    if (this.enabled()) {
      this.activate();
    }
  }

  /**
   * Activate the focus trap
   */
  private activate(): void {
    // Save current focus
    this.previousActiveElement = this.document.activeElement as HTMLElement;

    // Focus first focusable element
    const firstFocusable = this.getFirstFocusableElement();
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  /**
   * Deactivate the focus trap and restore previous focus
   */
  private deactivate(): void {
    this.restorePreviousFocus();
  }

  /**
   * Restore focus to the previously focused element
   */
  private restorePreviousFocus(): void {
    if (this.previousActiveElement && this.previousActiveElement.focus) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
  }

  /**
   * Handle Tab key navigation
   */
  handleTab(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (!this.enabled()) {
      return;
    }

    const focusableElements = this.getFocusableElements();

    if (focusableElements.length === 0) {
      keyboardEvent.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = this.document.activeElement;

    // Shift + Tab (backwards)
    if (keyboardEvent.shiftKey) {
      if (activeElement === firstElement) {
        keyboardEvent.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab (forwards)
      if (activeElement === lastElement) {
        keyboardEvent.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Handle Escape key
   */
  handleEscape(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (this.enabled() && this.enableEscapeKey()) {
      this.focusEscape.emit(keyboardEvent);
    }
  }

  /**
   * Get all focusable elements within the container
   */
  private getFocusableElements(): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    const elements = Array.from(
      this.elementRef.nativeElement.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];

    return elements.filter((el) => this.isVisible(el));
  }

  /**
   * Get the first focusable element
   */
  private getFirstFocusableElement(): HTMLElement | null {
    const elements = this.getFocusableElements();
    return elements.length > 0 ? elements[0] : null;
  }

  /**
   * Check if an element is visible
   */
  private isVisible(element: HTMLElement): boolean {
    return !!(
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
  }
}
