/**
 * AI Kit Icon Definitions
 *
 * Centralized icon registry using @ng-icons/lucide.
 * Import these icons in your component's viewProviders using provideIcons().
 *
 * @example
 * ```typescript
 * import { provideIcons } from '@ng-icons/core';
 * import { AI_ICONS } from '@angular-ai-kit/core';
 *
 * @Component({
 *   viewProviders: [provideIcons(AI_ICONS)],
 * })
 * export class MyComponent {}
 * ```
 */
import {
  lucideBook,
  lucideCheck,
  lucideChevronRight,
  lucideClock,
  lucideCopy,
  lucideGithub,
  lucideMenu,
  lucideMessageSquare,
  lucidePencil,
  lucidePlus,
  lucideRefreshCw,
  lucideSettings,
  lucideSparkle,
  lucideThumbsDown,
  lucideThumbsUp,
  lucideTrash2,
  lucideUser,
} from '@ng-icons/lucide';

/**
 * All icons used in AI Kit components.
 * Use with provideIcons() in viewProviders.
 */
export const AI_ICONS = {
  // Actions
  lucideCopy,
  lucideCheck,
  lucideRefreshCw,
  lucideTrash2,
  lucidePlus,
  lucidePencil,

  // Feedback
  lucideThumbsUp,
  lucideThumbsDown,

  // Avatars/Roles
  lucideUser,
  lucideSparkle,
  lucideSettings,

  // Navigation
  lucideChevronRight,
  lucideMenu,

  // Chat
  lucideMessageSquare,
  lucideClock,

  // Docs
  lucideBook,
  lucideGithub,
};

/**
 * Icon names as string literals for type-safe usage.
 */
export type AiIconName = keyof typeof AI_ICONS;

/**
 * Message role icons mapping.
 */
export const ROLE_ICONS = {
  user: 'lucideUser',
  assistant: 'lucideSparkle',
  system: 'lucideSettings',
} as const;

/**
 * Action icons mapping.
 */
export const ACTION_ICONS = {
  copy: 'lucideCopy',
  copied: 'lucideCheck',
  edit: 'lucidePencil',
  regenerate: 'lucideRefreshCw',
  delete: 'lucideTrash2',
  thumbsUp: 'lucideThumbsUp',
  thumbsDown: 'lucideThumbsDown',
  newChat: 'lucidePlus',
} as const;
