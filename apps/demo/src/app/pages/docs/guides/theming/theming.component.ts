import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/**
 * CSS Variable definition
 */
interface CssVariable {
  name: string;
  description: string;
  lightValue: string;
  darkValue: string;
}

/**
 * ThemingGuide Component
 *
 * Comprehensive guide for theming Angular AI Kit components.
 */
@Component({
  selector: 'app-theming',
  templateUrl: './theming.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, DocSectionComponent, DocCodeBlockComponent],
  host: {
    class: 'app-theming block',
  },
})
export class ThemingComponent {
  /** Core CSS Variables */
  coreVariables: CssVariable[] = [
    {
      name: '--background',
      description: 'Page/app background color',
      lightValue: 'white',
      darkValue: 'zinc-950',
    },
    {
      name: '--foreground',
      description: 'Primary text color',
      lightValue: 'zinc-950',
      darkValue: 'zinc-50',
    },
    {
      name: '--card',
      description: 'Card backgrounds',
      lightValue: 'zinc-50',
      darkValue: 'zinc-900',
    },
    {
      name: '--card-foreground',
      description: 'Text on cards',
      lightValue: 'zinc-950',
      darkValue: 'zinc-50',
    },
    {
      name: '--muted',
      description: 'Muted/subtle backgrounds',
      lightValue: 'zinc-100',
      darkValue: 'zinc-900',
    },
    {
      name: '--muted-foreground',
      description: 'Muted text color',
      lightValue: 'zinc-500',
      darkValue: 'zinc-400',
    },
    {
      name: '--accent',
      description: 'Accent/hover backgrounds',
      lightValue: 'zinc-100',
      darkValue: 'zinc-800',
    },
    {
      name: '--accent-foreground',
      description: 'Text on accent backgrounds',
      lightValue: 'zinc-900',
      darkValue: 'zinc-50',
    },
  ];

  /** Border & Input Variables */
  borderVariables: CssVariable[] = [
    {
      name: '--border',
      description: 'Default border color',
      lightValue: 'zinc-200',
      darkValue: 'zinc-800',
    },
    {
      name: '--border-hover',
      description: 'Border on hover/focus',
      lightValue: 'zinc-300',
      darkValue: 'zinc-600',
    },
    {
      name: '--input',
      description: 'Input field backgrounds',
      lightValue: 'zinc-50',
      darkValue: 'zinc-900',
    },
    {
      name: '--ring',
      description: 'Focus ring color',
      lightValue: 'zinc-400',
      darkValue: 'zinc-500',
    },
  ];

  /** Action Variables */
  actionVariables: CssVariable[] = [
    {
      name: '--primary',
      description: 'Primary actions/buttons',
      lightValue: 'zinc-900',
      darkValue: 'zinc-50',
    },
    {
      name: '--primary-foreground',
      description: 'Text on primary',
      lightValue: 'zinc-50',
      darkValue: 'zinc-900',
    },
    {
      name: '--secondary',
      description: 'Secondary actions',
      lightValue: 'zinc-100',
      darkValue: 'zinc-800',
    },
    {
      name: '--secondary-foreground',
      description: 'Text on secondary',
      lightValue: 'zinc-900',
      darkValue: 'zinc-50',
    },
    {
      name: '--destructive',
      description: 'Destructive/danger actions',
      lightValue: 'red-500',
      darkValue: 'red-500',
    },
    {
      name: '--destructive-foreground',
      description: 'Text on destructive',
      lightValue: 'zinc-50',
      darkValue: 'zinc-50',
    },
  ];

  /** Message-specific Variables */
  messageVariables: CssVariable[] = [
    {
      name: '--message-user-bg',
      description: 'User message background',
      lightValue: 'zinc-100',
      darkValue: 'zinc-800',
    },
    {
      name: '--message-assistant-bg',
      description: 'Assistant message background',
      lightValue: 'white',
      darkValue: 'zinc-900',
    },
    {
      name: '--avatar-user',
      description: 'User avatar color',
      lightValue: 'zinc-700',
      darkValue: 'zinc-600',
    },
    {
      name: '--avatar-assistant',
      description: 'Assistant avatar color',
      lightValue: 'zinc-800',
      darkValue: 'zinc-700',
    },
  ];

  /** Dark mode state for demo */
  isDarkMode = signal(false);

  /** Basic CSS variables example */
  basicVariablesCode = `:root {
  /* Core Colors */
  --background: theme('colors.white');
  --foreground: theme('colors.zinc.950');

  /* Card */
  --card: theme('colors.zinc.50');
  --card-foreground: theme('colors.zinc.950');

  /* Muted */
  --muted: theme('colors.zinc.100');
  --muted-foreground: theme('colors.zinc.500');

  /* Border */
  --border: theme('colors.zinc.200');
  --ring: theme('colors.zinc.400');

  /* Primary */
  --primary: theme('colors.zinc.900');
  --primary-foreground: theme('colors.zinc.50');
}`;

  /** Dark theme variables example */
  darkVariablesCode = `.dark {
  /* Core Colors */
  --background: theme('colors.zinc.950');
  --foreground: theme('colors.zinc.50');

  /* Card */
  --card: theme('colors.zinc.900');
  --card-foreground: theme('colors.zinc.50');

  /* Muted */
  --muted: theme('colors.zinc.900');
  --muted-foreground: theme('colors.zinc.400');

  /* Border */
  --border: theme('colors.zinc.800');
  --ring: theme('colors.zinc.500');

  /* Primary (inverted for dark) */
  --primary: theme('colors.zinc.50');
  --primary-foreground: theme('colors.zinc.900');
}`;

  /** Theme toggle component example */
  themeToggleCode = `import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  template: \`
    <button
      (click)="toggleTheme()"
      class="rounded-lg border border-border p-2 hover:bg-muted"
      [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      @if (isDark()) {
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      } @else {
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      }
    </button>
  \`,
})
export class ThemeToggleComponent {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  isDark = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Check saved preference
      const savedTheme = localStorage.getItem('theme');
      const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

      this.isDark.set(isDark);
      this.updateTheme(isDark);
    }
  }

  toggleTheme() {
    const newValue = !this.isDark();
    this.isDark.set(newValue);
    this.updateTheme(newValue);
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
  }

  private updateTheme(isDark: boolean) {
    if (isDark) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }
}`;

  /** Custom classes example */
  customClassesCode = `import { Component } from '@angular/core';
import { ChatInputComponent } from '@angular-ai-kit/core';

@Component({
  selector: 'app-custom-chat',
  imports: [ChatInputComponent],
  template: \`
    <ai-chat-input
      placeholder="Send a message..."
      customClasses="rounded-full border-2 border-blue-500"
    />
  \`,
})
export class CustomChatComponent {}`;

  /** Using Tailwind classes example */
  tailwindClassesCode = `<!-- Use semantic classes (recommended) -->
<div class="bg-background text-foreground">
  <div class="border border-border rounded-lg bg-card p-4">
    <h2 class="text-foreground font-semibold">Title</h2>
    <p class="text-muted-foreground">Description</p>
    <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
      Click me
    </button>
  </div>
</div>

<!-- These classes auto-switch between light/dark themes! -->`;

  /** Custom color scheme example */
  customColorSchemeCode = `:root {
  /* Custom Blue Theme */
  --primary: theme('colors.blue.600');
  --primary-foreground: theme('colors.white');

  /* Custom accent */
  --accent: theme('colors.blue.100');
  --accent-foreground: theme('colors.blue.900');

  /* Keep neutral tones for backgrounds */
  --background: theme('colors.slate.50');
  --foreground: theme('colors.slate.900');
  --card: theme('colors.white');
  --muted: theme('colors.slate.100');
}

.dark {
  --primary: theme('colors.blue.400');
  --primary-foreground: theme('colors.blue.950');

  --accent: theme('colors.blue.950');
  --accent-foreground: theme('colors.blue.100');

  --background: theme('colors.slate.950');
  --foreground: theme('colors.slate.50');
  --card: theme('colors.slate.900');
  --muted: theme('colors.slate.800');
}`;

  /**
   * Toggle dark mode demo
   */
  toggleDarkMode(): void {
    this.isDarkMode.update((v) => !v);
  }
}
