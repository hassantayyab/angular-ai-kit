import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
  output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { cn } from '@angular-ai-kit/utils';

/**
 * Navigation item interface
 */
export interface NavItem {
  label: string;
  path?: string;
  href?: string;
  icon?: string;
}

/**
 * Navigation Component
 *
 * Top navigation bar with logo, menu items, theme toggle, and mobile hamburger menu.
 * Sticky on scroll with responsive design.
 *
 * @example
 * ```html
 * <app-navigation
 *   [sidebarCollapsed]="sidebarCollapsed()"
 *   (sidebarToggle)="handleSidebarToggle()" />
 * ```
 */
@Component({
  selector: 'app-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterModule, ThemeToggleComponent],
  host: {
    class: 'app-navigation-host',
  },
  template: `
    <nav [class]="navClasses()">
      <div [class]="containerClasses()">
        <!-- Left section: Logo + Brand -->
        <div class="flex items-center gap-4">
          <!-- Sidebar Toggle (Mobile & Desktop) -->
          <button
            type="button"
            [class]="sidebarToggleClasses()"
            (click)="handleSidebarToggle()"
            aria-label="Toggle sidebar"
          >
            <svg
              class="h-6 w-6"
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
          </button>

          <!-- Logo & Brand -->
          <a
            [routerLink]="['/']"
            class="flex items-center gap-2 text-xl font-bold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
          >
            <!-- Logo Icon -->
            <svg
              class="h-8 w-8 text-gray-900 dark:text-gray-100"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              />
            </svg>
            <span class="hidden sm:inline">Angular AI Kit</span>
          </a>
        </div>

        <!-- Center section: Navigation items (Desktop) -->
        <div class="hidden items-center gap-1 md:flex">
          @for (item of navItems(); track item.label) {
            @if (item.path) {
              <a
                [routerLink]="[item.path]"
                routerLinkActive="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                [class]="navItemClasses()"
              >
                {{ item.label }}
              </a>
            } @else if (item.href) {
              <a
                [href]="item.href"
                target="_blank"
                rel="noopener noreferrer"
                [class]="navItemClasses()"
              >
                {{ item.label }}
                <!-- External link icon -->
                <svg
                  class="h-4 w-4"
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
              </a>
            }
          }
        </div>

        <!-- Right section: Theme toggle + Mobile menu -->
        <div class="flex items-center gap-2">
          <!-- Theme Toggle -->
          <app-theme-toggle />

          <!-- Mobile Menu Button -->
          <button
            type="button"
            [class]="mobileMenuButtonClasses()"
            (click)="toggleMobileMenu()"
            aria-label="Toggle mobile menu"
            class="md:hidden"
          >
            @if (mobileMenuOpen()) {
              <!-- Close icon -->
              <svg
                class="h-6 w-6"
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
              <!-- Menu icon -->
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
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
            @if (item.path) {
              <a
                [routerLink]="[item.path]"
                routerLinkActive="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                [class]="mobileNavItemClasses()"
                (click)="closeMobileMenu()"
              >
                {{ item.label }}
              </a>
            } @else if (item.href) {
              <a
                [href]="item.href"
                target="_blank"
                rel="noopener noreferrer"
                [class]="mobileNavItemClasses()"
                (click)="closeMobileMenu()"
              >
                {{ item.label }}
              </a>
            }
          }
        </div>
      }
    </nav>
  `,
})
export class NavigationComponent {
  // Outputs
  sidebarToggle = output<void>();

  // State
  mobileMenuOpen = signal(false);

  // Navigation items
  navItems = signal<NavItem[]>([
    { label: 'Demo', path: '/' },
    { label: 'Components', path: '/components' },
    { label: 'Examples', path: '/examples' },
    { label: 'GitHub', href: 'https://github.com/yourusername/angular-ai-kit' },
  ]);

  // Computed classes
  navClasses = computed(() => {
    return cn(
      'app-navigation',
      'flex-shrink-0 z-50',
      'border-b border-gray-200 dark:border-gray-700',
      'bg-white dark:bg-gray-900',
      'transition-all duration-200'
    );
  });

  containerClasses = computed(() => {
    return cn(
      'mx-auto flex items-center justify-between',
      'px-4 py-3 sm:px-6 lg:px-8',
      'max-w-7xl'
    );
  });

  sidebarToggleClasses = computed(() => {
    return cn(
      'flex items-center justify-center',
      'rounded-lg p-2',
      'text-gray-600 hover:text-gray-900',
      'dark:text-gray-400 dark:hover:text-gray-100',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
      'dark:focus:ring-offset-gray-900'
    );
  });

  navItemClasses = computed(() => {
    return cn(
      'flex items-center gap-1.5',
      'rounded-lg px-3 py-2',
      'text-sm font-medium',
      'text-gray-700 hover:text-gray-900',
      'dark:text-gray-300 dark:hover:text-gray-100',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
      'dark:focus:ring-offset-gray-900'
    );
  });

  mobileMenuButtonClasses = computed(() => {
    return cn(
      'flex items-center justify-center',
      'rounded-lg p-2',
      'text-gray-600 hover:text-gray-900',
      'dark:text-gray-400 dark:hover:text-gray-100',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
      'dark:focus:ring-offset-gray-900'
    );
  });

  mobileMenuClasses = computed(() => {
    return cn(
      'md:hidden',
      'border-t border-gray-200 dark:border-gray-700',
      'bg-white dark:bg-gray-900',
      'px-4 py-3',
      'space-y-1',
      'animate-in slide-in-from-top duration-200'
    );
  });

  mobileNavItemClasses = computed(() => {
    return cn(
      'block w-full',
      'rounded-lg px-3 py-2',
      'text-sm font-medium text-left',
      'text-gray-700 hover:text-gray-900',
      'dark:text-gray-300 dark:hover:text-gray-100',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      'transition-colors duration-200'
    );
  });

  // Methods
  handleSidebarToggle(): void {
    this.sidebarToggle.emit();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
