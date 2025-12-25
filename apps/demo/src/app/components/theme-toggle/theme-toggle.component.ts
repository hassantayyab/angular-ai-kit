import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';

/**
 * ThemeToggle Component
 *
 * Animated button to toggle between light and dark themes.
 * Shows sun icon in dark mode, moon icon in light mode with smooth transitions.
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
    class: 'app-theme-toggle-host inline-flex',
  },
  template: `
    <button
      type="button"
      [class]="buttonClasses()"
      (click)="toggleTheme()"
      [attr.aria-label]="ariaLabel()"
      [attr.title]="ariaLabel()"
    >
      <span class="relative h-5 w-5">
        <!-- Sun Icon (shown in dark mode) -->
        <svg
          [class]="sunIconClasses()"
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
          />
        </svg>

        <!-- Moon Icon (shown in light mode) -->
        <svg
          [class]="moonIconClasses()"
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
          />
        </svg>
      </span>
    </button>
  `,
  styles: [
    `
      /* Theme toggle icon animations */
      .theme-icon-enter {
        animation: theme-icon-in 0.3s ease-out forwards;
      }

      .theme-icon-exit {
        animation: theme-icon-out 0.3s ease-out forwards;
      }

      @keyframes theme-icon-in {
        from {
          opacity: 0;
          transform: rotate(-90deg) scale(0.5);
        }
        to {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }
      }

      @keyframes theme-icon-out {
        from {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }
        to {
          opacity: 0;
          transform: rotate(90deg) scale(0.5);
        }
      }
    `,
  ],
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
      'app-theme-toggle',
      'flex items-center justify-center',
      'h-9 w-9 rounded-md',
      'text-[var(--foreground-muted)]',
      'hover:text-[var(--foreground)] hover:bg-[var(--accent)]',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
      'active:scale-95'
    );
  });

  sunIconClasses = computed(() => {
    return cn('absolute inset-0 h-5 w-5', 'transition-all duration-300', {
      'opacity-100 rotate-0 scale-100': this.isDark(),
      'opacity-0 rotate-90 scale-50': !this.isDark(),
    });
  });

  moonIconClasses = computed(() => {
    return cn('absolute inset-0 h-5 w-5', 'transition-all duration-300', {
      'opacity-100 rotate-0 scale-100': !this.isDark(),
      'opacity-0 -rotate-90 scale-50': this.isDark(),
    });
  });

  /**
   * Toggle theme between light and dark
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
