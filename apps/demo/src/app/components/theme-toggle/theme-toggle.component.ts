import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  computed,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { cn } from '@angular-ai-kit/utils';

/**
 * ThemeToggle Component
 *
 * Button to toggle between light and dark themes.
 * Shows sun icon in dark mode, moon icon in light mode.
 *
 * @example
 * ```html
 * <app-theme-toggle />
 * ```
 */
@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  host: {
    class: 'app-theme-toggle-host',
  },
  template: `
    <button
      type="button"
      [class]="buttonClasses()"
      (click)="toggleTheme()"
      [attr.aria-label]="ariaLabel()"
      [attr.title]="ariaLabel()"
    >
      <!-- Sun Icon (shown in dark mode) -->
      @if (isDark()) {
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          ></path>
        </svg>
      } @else {
        <!-- Moon Icon (shown in light mode) -->
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          ></path>
        </svg>
      }
    </button>
  `,
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  // Computed properties
  isDark = this.themeService.isDark;

  ariaLabel = computed(() =>
    this.isDark() ? 'Switch to light mode' : 'Switch to dark mode'
  );

  buttonClasses = computed(() => {
    return cn(
      // Base styles
      'app-theme-toggle',
      'flex items-center justify-center',
      'rounded-lg p-2',
      'transition-all duration-200',

      // Colors
      'text-gray-600 hover:text-gray-900',
      'dark:text-gray-400 dark:hover:text-gray-100',

      // Hover effect
      'hover:bg-gray-100 dark:hover:bg-gray-800',

      // Focus
      'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
      'dark:focus:ring-offset-gray-900',

      // Active state
      'active:scale-95'
    );
  });

  /**
   * Toggle theme between light and dark
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
