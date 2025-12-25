import { cn } from '@angular-ai-kit/utils';
import { HlmButtonDirective } from '@angular-ai-kit/spartan-ui';
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
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmButtonDirective],
  host: {
    class: 'app-theme-toggle-host inline-flex',
  },
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
