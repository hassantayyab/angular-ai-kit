import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { ThemeService } from '../../services';

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
  imports: [HlmButton],
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

  sunIconClasses = computed(() => {
    return cn(
      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      'h-[1.2rem] w-[1.2rem]',
      'transition-all duration-300',
      {
        'opacity-100 rotate-0 scale-100': this.isDark(),
        'opacity-0 rotate-90 scale-0': !this.isDark(),
      }
    );
  });

  moonIconClasses = computed(() => {
    return cn(
      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      'h-[1.2rem] w-[1.2rem]',
      'transition-all duration-300',
      {
        'opacity-100 rotate-0 scale-100': !this.isDark(),
        'opacity-0 -rotate-90 scale-0': this.isDark(),
      }
    );
  });

  /**
   * Toggle theme between light and dark
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
