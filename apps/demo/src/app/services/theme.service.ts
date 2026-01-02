import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

/**
 * Theme modes supported by the application
 */
export type Theme = 'light' | 'dark';

/**
 * ThemeService
 *
 * Manages the application theme (light/dark mode) with localStorage persistence
 * and system preference detection.
 *
 * @example
 * ```typescript
 * export class Component {
 *   private themeService = inject(ThemeService);
 *
 *   toggleTheme() {
 *     this.themeService.toggleTheme();
 *   }
 *
 *   currentTheme = this.themeService.theme;
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'ai-kit-theme';

  /**
   * Current theme signal (reactive)
   */
  theme = signal<Theme>('light');

  /**
   * Computed: Is dark mode active?
   */
  isDark = computed(() => this.theme() === 'dark');

  constructor() {
    // Only run in browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();

      // Sync theme changes with DOM and localStorage
      effect(() => {
        const currentTheme = this.theme();
        this.applyTheme(currentTheme);
        this.saveTheme(currentTheme);
      });
    }
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  private initializeTheme(): void {
    const savedTheme = this.loadTheme();
    const systemTheme = this.getSystemTheme();

    // Priority: saved theme > system theme > default 'light'
    const initialTheme = savedTheme || systemTheme || 'light';
    this.theme.set(initialTheme);
  }

  /**
   * Get theme from localStorage
   */
  private loadTheme(): Theme | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved === 'dark' || saved === 'light' ? saved : null;
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  /**
   * Get system color scheme preference
   */
  private getSystemTheme(): Theme | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return darkModeQuery.matches ? 'dark' : 'light';
    }

    return null;
  }

  /**
   * Apply theme to document
   */
  private applyTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
  }

  /**
   * Set specific theme
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
