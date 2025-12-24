/**
 * Click Outside Directive
 *
 * Detects clicks outside the host element.
 * Useful for closing dropdowns, modals, and popups.
 *
 * @example
 * ```html
 * <div aiClickOutside (clickOutside)="closeDropdown()">
 *   <!-- Dropdown content -->
 * </div>
 * ```
 */
import {
  Directive,
  ElementRef,
  output,
  inject,
  PLATFORM_ID,
  afterNextRender,
  DestroyRef,
  signal,
  input,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

/**
 * Directive for detecting clicks outside an element
 */
@Directive({
  selector: '[aiClickOutside]',
})
export class ClickOutsideDirective {
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  private isEnabled = signal(true);
  private clickListener?: () => void;

  /**
   * Whether the directive is enabled
   * @default true
   */
  enabled = input(true);

  /**
   * Elements to exclude from outside click detection
   * Clicks on these elements will not trigger the output
   */
  exclude = input<HTMLElement[]>([]);

  /**
   * Emitted when a click outside the element is detected
   */
  clickOutside = output<MouseEvent>();

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.setupListener();
      }
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.removeListener();
    });
  }

  /**
   * Setup the click listener
   */
  private setupListener(): void {
    this.clickListener = this.document.addEventListener(
      'click',
      (event: Event) => {
        const mouseEvent = event as MouseEvent;
        const enabled = this.enabled();

        if (!enabled) {
          return;
        }

        const clickedInside = this.elementRef.nativeElement.contains(
          mouseEvent.target,
        );

        if (clickedInside) {
          return;
        }

        // Check excluded elements
        const excludedElements = this.exclude();
        const clickedOnExcluded = excludedElements.some((element) =>
          element?.contains(mouseEvent.target as Node),
        );

        if (clickedOnExcluded) {
          return;
        }

        this.clickOutside.emit(mouseEvent);
      },
      true, // Use capture phase
    ) as unknown as () => void;
  }

  /**
   * Remove the click listener
   */
  private removeListener(): void {
    if (this.clickListener && isPlatformBrowser(this.platformId)) {
      this.document.removeEventListener(
        'click',
        this.clickListener as never,
        true,
      );
    }
  }
}
