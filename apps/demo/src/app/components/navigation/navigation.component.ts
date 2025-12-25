import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
} from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { cn } from '@angular-ai-kit/utils';

/**
 * Navigation item interface
 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Navigation Component
 *
 * Clean, minimal header with logo, nav items, and theme toggle.
 * Sticky with frosted glass effect.
 *
 * @example
 * ```html
 * <app-navigation />
 * ```
 */
@Component({
  selector: 'app-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ThemeToggleComponent],
  host: {
    class: 'app-navigation-host block',
  },
  template: `
    <nav [class]="navClasses()">
      <div [class]="containerClasses()">
        <!-- Left: Logo & Brand -->
        <a href="/" class="group flex items-center gap-3">
          <!-- Logo Icon - AI/Neural Network inspired -->
          <div [class]="logoContainerClasses()">
            <svg
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          </div>
          <span
            class="text-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--foreground-secondary)]"
          >
            Angular AI Kit
          </span>
        </a>

        <!-- Center: Nav Items (Desktop) -->
        <div class="hidden items-center gap-1 md:flex">
          @for (item of navItems(); track item.label) {
            <a
              [href]="item.href"
              [target]="item.external ? '_blank' : '_self'"
              [rel]="item.external ? 'noopener noreferrer' : null"
              [class]="navItemClasses()"
            >
              {{ item.label }}
              @if (item.external) {
                <svg
                  class="h-3.5 w-3.5 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              }
            </a>
          }
        </div>

        <!-- Right: Theme Toggle + Mobile Menu -->
        <div class="flex items-center gap-2">
          <!-- GitHub Link (Desktop) -->
          <a
            href="https://github.com/angular-ai-kit"
            target="_blank"
            rel="noopener noreferrer"
            [class]="iconButtonClasses()"
            aria-label="View on GitHub"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
          </a>

          <!-- Theme Toggle -->
          <app-theme-toggle />

          <!-- Mobile Menu Button -->
          <button
            type="button"
            [class]="mobileMenuButtonClasses()"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-label="Toggle navigation menu"
          >
            @if (mobileMenuOpen()) {
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            } @else {
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            }
          </button>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      @if (mobileMenuOpen()) {
        <div [class]="mobileMenuClasses()">
          @for (item of navItems(); track item.label) {
            <a
              [href]="item.href"
              [target]="item.external ? '_blank' : '_self'"
              [rel]="item.external ? 'noopener noreferrer' : null"
              [class]="mobileNavItemClasses()"
              (click)="closeMobileMenu()"
            >
              {{ item.label }}
              @if (item.external) {
                <svg
                  class="h-4 w-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              }
            </a>
          }
        </div>
      }
    </nav>
  `,
})
export class NavigationComponent {
  // State
  mobileMenuOpen = signal(false);

  // Navigation items
  navItems = signal<NavItem[]>([
    { label: 'Components', href: '#components' },
    { label: 'Demo', href: '#demo' },
    { label: 'Documentation', href: '#', external: false },
    {
      label: 'GitHub',
      href: 'https://github.com/angular-ai-kit',
      external: true,
    },
  ]);

  // Computed classes
  navClasses = computed(() => {
    return cn(
      'app-navigation',
      'sticky top-0 z-50',
      'border-b border-[var(--border)]',
      'bg-[var(--background)]/80 backdrop-blur-xl',
      'transition-all duration-200'
    );
  });

  containerClasses = computed(() => {
    return cn('demo-section', 'flex items-center justify-between', 'py-4');
  });

  logoContainerClasses = computed(() => {
    return cn(
      'flex items-center justify-center',
      'h-9 w-9 rounded-lg',
      'bg-[var(--foreground)] text-[var(--background)]',
      'transition-transform duration-200',
      'group-hover:scale-105'
    );
  });

  navItemClasses = computed(() => {
    return cn(
      'flex items-center gap-1.5',
      'rounded-md px-3 py-2',
      'text-sm font-medium',
      'text-[var(--foreground-muted)]',
      'hover:text-[var(--foreground)] hover:bg-[var(--accent)]',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]'
    );
  });

  iconButtonClasses = computed(() => {
    return cn(
      'hidden sm:flex items-center justify-center',
      'h-9 w-9 rounded-md',
      'text-[var(--foreground-muted)]',
      'hover:text-[var(--foreground)] hover:bg-[var(--accent)]',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]'
    );
  });

  mobileMenuButtonClasses = computed(() => {
    return cn(
      'md:hidden flex items-center justify-center',
      'h-9 w-9 rounded-md',
      'text-[var(--foreground-muted)]',
      'hover:text-[var(--foreground)] hover:bg-[var(--accent)]',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]'
    );
  });

  mobileMenuClasses = computed(() => {
    return cn(
      'md:hidden',
      'border-t border-[var(--border)]',
      'bg-[var(--background)]',
      'px-4 py-3',
      'space-y-1'
    );
  });

  mobileNavItemClasses = computed(() => {
    return cn(
      'flex items-center gap-2 w-full',
      'rounded-md px-3 py-2.5',
      'text-sm font-medium text-left',
      'text-[var(--foreground-muted)]',
      'hover:text-[var(--foreground)] hover:bg-[var(--accent)]',
      'transition-colors duration-200'
    );
  });

  // Methods
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
