/**
 * Angular AI Kit - Design Tokens TypeScript Interfaces
 */

/**
 * Color palette with shades
 */
export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

/**
 * Spacing scale
 */
export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

/**
 * Typography configuration
 */
export interface Typography {
  fontFamilies: {
    sans: string;
    mono: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

/**
 * Border radius scale
 */
export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

/**
 * Shadow scale
 */
export interface Shadows {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

/**
 * Transition configuration
 */
export interface Transitions {
  fast: string;
  base: string;
  slow: string;
}

/**
 * Z-index scale
 */
export interface ZIndexScale {
  base: number;
  dropdown: number;
  sticky: number;
  overlay: number;
  modal: number;
  popover: number;
  tooltip: number;
}

/**
 * Semantic colors for different contexts
 */
export interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

/**
 * Theme colors configuration
 */
export interface ThemeColors {
  primary: ColorPalette;
  gray: ColorPalette;
  semantic: SemanticColors;
}

/**
 * Complete design tokens interface
 */
export interface DesignTokens {
  colors: ThemeColors;
  spacing: SpacingScale;
  typography: Typography;
  borderRadius: BorderRadius;
  shadows: Shadows;
  transitions: Transitions;
  zIndex: ZIndexScale;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  customColors?: Partial<ThemeColors>;
}

/**
 * Theme context for providing theme throughout the app
 */
export interface ThemeContext {
  currentTheme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  toggleTheme: () => void;
}
