import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/**
 * Tokens Reference
 *
 * Documentation for all DI tokens.
 */
@Component({
  selector: 'app-tokens-reference',
  templateUrl: './tokens-reference.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DocSectionComponent, DocCodeBlockComponent, RouterLink],
})
export class TokensReferenceComponent {
  // Token definitions
  readonly tokenDefinitionsCode = `// DI Token Definitions
import { InjectionToken } from '@angular/core';

/**
 * Configuration for avatar display
 */
export const AI_AVATAR_CONFIG = new InjectionToken<AvatarConfig>(
  'AI_AVATAR_CONFIG'
);

/**
 * Configuration for code highlighting
 */
export const AI_CODE_HIGHLIGHT_CONFIG = new InjectionToken<CodeHighlightConfig>(
  'AI_CODE_HIGHLIGHT_CONFIG'
);

/**
 * Configuration for markdown rendering
 */
export const AI_MARKDOWN_CONFIG = new InjectionToken<MarkdownConfig>(
  'AI_MARKDOWN_CONFIG'
);

/**
 * Configuration for theming
 */
export const AI_THEME_CONFIG = new InjectionToken<ThemeConfig>(
  'AI_THEME_CONFIG'
);

/**
 * Default message templates
 */
export const AI_MESSAGE_TEMPLATES = new InjectionToken<MessageTemplates>(
  'AI_MESSAGE_TEMPLATES'
);`;

  // Avatar config usage
  readonly avatarConfigCode = `// AI_AVATAR_CONFIG
import { AI_AVATAR_CONFIG } from '@angular-ai-kit/core';

// In your component or module providers
providers: [
  {
    provide: AI_AVATAR_CONFIG,
    useValue: {
      userAvatar: '/assets/avatars/user.png',
      assistantAvatar: '/assets/avatars/bot.png',
      showAvatar: true,
      size: 'md', // 'sm' | 'md' | 'lg'
    },
  },
]

// Interface
interface AvatarConfig {
  /** URL or path to user avatar image */
  userAvatar?: string;

  /** URL or path to assistant avatar image */
  assistantAvatar?: string;

  /** Whether to show avatars */
  showAvatar?: boolean;

  /** Avatar size */
  size?: 'sm' | 'md' | 'lg';

  /** Fallback initials for user */
  userFallback?: string;

  /** Fallback initials for assistant */
  assistantFallback?: string;
}`;

  // Code highlight config
  readonly codeHighlightConfigCode = `// AI_CODE_HIGHLIGHT_CONFIG
import { AI_CODE_HIGHLIGHT_CONFIG } from '@angular-ai-kit/core';

providers: [
  {
    provide: AI_CODE_HIGHLIGHT_CONFIG,
    useValue: {
      theme: 'github-dark',
      showLineNumbers: true,
      wrapLongLines: false,
      languages: ['typescript', 'javascript', 'html', 'css', 'python'],
    },
  },
]

// Interface
interface CodeHighlightConfig {
  /** Highlight.js theme name */
  theme?: string;

  /** Show line numbers by default */
  showLineNumbers?: boolean;

  /** Wrap long lines instead of horizontal scroll */
  wrapLongLines?: boolean;

  /** Languages to register for highlighting */
  languages?: string[];

  /** Tab size for indentation */
  tabSize?: number;
}`;

  // Markdown config
  readonly markdownConfigCode = `// AI_MARKDOWN_CONFIG
import { AI_MARKDOWN_CONFIG } from '@angular-ai-kit/core';

providers: [
  {
    provide: AI_MARKDOWN_CONFIG,
    useValue: {
      sanitize: true,
      linkTarget: '_blank',
      enableGfm: true,
      enableCodeHighlight: true,
    },
  },
]

// Interface
interface MarkdownConfig {
  /** Sanitize HTML in markdown */
  sanitize?: boolean;

  /** Target for links (_blank, _self) */
  linkTarget?: '_blank' | '_self';

  /** Enable GitHub Flavored Markdown */
  enableGfm?: boolean;

  /** Enable syntax highlighting in code blocks */
  enableCodeHighlight?: boolean;

  /** Custom link renderer */
  linkRenderer?: (href: string, text: string) => string;

  /** Custom image renderer */
  imageRenderer?: (src: string, alt: string) => string;
}`;

  // Theme config
  readonly themeConfigCode = `// AI_THEME_CONFIG
import { AI_THEME_CONFIG } from '@angular-ai-kit/core';

providers: [
  {
    provide: AI_THEME_CONFIG,
    useValue: {
      defaultTheme: 'system',
      allowToggle: true,
      persistPreference: true,
      storageKey: 'ai-kit-theme',
    },
  },
]

// Interface
interface ThemeConfig {
  /** Default theme to use */
  defaultTheme?: 'light' | 'dark' | 'system';

  /** Allow users to toggle theme */
  allowToggle?: boolean;

  /** Persist preference to localStorage */
  persistPreference?: boolean;

  /** Key for localStorage */
  storageKey?: string;
}`;

  // Message templates
  readonly messageTemplatesCode = `// AI_MESSAGE_TEMPLATES
import { AI_MESSAGE_TEMPLATES } from '@angular-ai-kit/core';

providers: [
  {
    provide: AI_MESSAGE_TEMPLATES,
    useValue: {
      loading: 'Thinking...',
      error: 'Something went wrong. Please try again.',
      empty: 'No messages yet. Start a conversation!',
      copied: 'Copied to clipboard!',
      regenerating: 'Regenerating response...',
    },
  },
]

// Interface
interface MessageTemplates {
  /** Text shown while loading */
  loading?: string;

  /** Error message template */
  error?: string;

  /** Empty state message */
  empty?: string;

  /** Copy confirmation message */
  copied?: string;

  /** Regeneration loading message */
  regenerating?: string;
}`;

  // Using tokens in components
  readonly usingTokensCode = `// Using tokens in components
import { Component, inject } from '@angular/core';
import {
  AI_AVATAR_CONFIG,
  AI_THEME_CONFIG,
  AvatarConfig,
  ThemeConfig,
} from '@angular-ai-kit/core';

@Component({
  selector: 'app-chat',
  template: \`
    <div [class]="themeClass()">
      @if (avatarConfig?.showAvatar) {
        <img [src]="avatarConfig.userAvatar" alt="User" />
      }
    </div>
  \`,
})
export class ChatComponent {
  // Inject with optional flag
  avatarConfig = inject(AI_AVATAR_CONFIG, { optional: true });
  themeConfig = inject(AI_THEME_CONFIG, { optional: true });

  themeClass() {
    return this.themeConfig?.defaultTheme === 'dark' ? 'dark' : '';
  }
}`;

  // Default values
  readonly defaultValuesCode = `// Default Token Values
// These are the defaults if no provider is specified

const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  showAvatar: false,
  size: 'md',
};

const DEFAULT_CODE_HIGHLIGHT_CONFIG: CodeHighlightConfig = {
  theme: 'github-dark',
  showLineNumbers: true,
  wrapLongLines: false,
};

const DEFAULT_MARKDOWN_CONFIG: MarkdownConfig = {
  sanitize: true,
  linkTarget: '_blank',
  enableGfm: true,
  enableCodeHighlight: true,
};

const DEFAULT_THEME_CONFIG: ThemeConfig = {
  defaultTheme: 'system',
  allowToggle: true,
  persistPreference: true,
  storageKey: 'theme',
};`;
}
