/**
 * Angular AI Kit - Theme Types
 */
import type { ColorPalette } from '@angular-ai-kit/tokens';

/**
 * Theme mode
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Theme configuration
 */
export interface ThemeConfig {
  /**
   * Theme mode
   * - 'light': Force light mode
   * - 'dark': Force dark mode
   * - 'auto': Follow system preference
   * @default 'auto'
   */
  mode: ThemeMode;

  /**
   * Custom color overrides
   */
  customColors?: {
    primary?: Partial<ColorPalette>;
    gray?: Partial<ColorPalette>;
  };

  /**
   * Custom CSS properties
   */
  customProperties?: Record<string, string>;
}

/**
 * Theme context for managing theme state
 */
export interface ThemeContext {
  /**
   * Current theme configuration
   */
  currentTheme: ThemeConfig;

  /**
   * Update theme configuration
   */
  setTheme: (theme: ThemeConfig) => void;

  /**
   * Toggle between light and dark mode
   */
  toggleTheme: () => void;

  /**
   * Check if dark mode is active
   */
  isDarkMode: () => boolean;
}
