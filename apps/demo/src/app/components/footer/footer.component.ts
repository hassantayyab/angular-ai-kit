import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

/**
 * Link item interface
 */
interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Footer Component
 *
 * Simple, elegant footer with links and copyright.
 * Includes Angular badge.
 *
 * @example
 * ```html
 * <app-footer />
 * ```
 */
@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  host: {
    class: 'app-footer-host block',
  },
  template: `
    <footer [class]="footerClasses()">
      <div class="demo-section">
        <div [class]="contentClasses()">
          <!-- Left: Logo & Copyright -->
          <div [class]="leftColumnClasses()">
            <a href="/" class="group flex items-center gap-2">
              <div [class]="logoClasses()">
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                  />
                </svg>
              </div>
              <span class="font-semibold text-[var(--foreground)]"
                >Angular AI Kit</span
              >
            </a>
            <p class="mt-4 text-sm text-[var(--foreground-muted)]">
              Build beautiful AI chat interfaces with Angular.
            </p>
          </div>

          <!-- Right: Links -->
          <div [class]="linksContainerClasses()">
            <!-- Resources -->
            <div>
              <h4 [class]="linkGroupTitleClasses()">Resources</h4>
              <ul class="space-y-2">
                @for (link of resourceLinks(); track link.label) {
                  <li>
                    <a
                      [href]="link.href"
                      [target]="link.external ? '_blank' : '_self'"
                      [rel]="link.external ? 'noopener noreferrer' : null"
                      [class]="linkClasses()"
                    >
                      {{ link.label }}
                      @if (link.external) {
                        <svg
                          class="h-3 w-3 opacity-50"
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
                  </li>
                }
              </ul>
            </div>

            <!-- Community -->
            <div>
              <h4 [class]="linkGroupTitleClasses()">Community</h4>
              <ul class="space-y-2">
                @for (link of communityLinks(); track link.label) {
                  <li>
                    <a
                      [href]="link.href"
                      [target]="link.external ? '_blank' : '_self'"
                      [rel]="link.external ? 'noopener noreferrer' : null"
                      [class]="linkClasses()"
                    >
                      {{ link.label }}
                      @if (link.external) {
                        <svg
                          class="h-3 w-3 opacity-50"
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
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>

        <!-- Bottom: Copyright & Built with -->
        <div [class]="bottomBarClasses()">
          <p class="text-sm text-[var(--foreground-muted)]">
            &copy; {{ currentYear }} Angular AI Kit. MIT License.
          </p>
          <div
            class="flex items-center gap-2 text-sm text-[var(--foreground-muted)]"
          >
            <span>Built with</span>
            <!-- Angular Logo -->
            <svg
              class="h-5 w-5 text-[#dd0031]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 24l9.596-5.242L23.32 3.984 11.999.001zm7.064 18.31h-2.638l-1.422-3.503H8.996l-1.422 3.504h-2.64L12 2.65z"
              />
            </svg>
            <span>&</span>
            <!-- Tailwind Logo -->
            <svg
              class="h-5 w-5 text-[#38bdf8]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  // Current year for copyright
  currentYear = new Date().getFullYear();

  // Links
  resourceLinks = signal<FooterLink[]>([
    { label: 'Documentation', href: '#' },
    { label: 'Components', href: '#components' },
    { label: 'Demo', href: '#demo' },
  ]);

  communityLinks = signal<FooterLink[]>([
    {
      label: 'GitHub',
      href: 'https://github.com/angular-ai-kit',
      external: true,
    },
    {
      label: 'Discussions',
      href: 'https://github.com/angular-ai-kit/discussions',
      external: true,
    },
    { label: 'Twitter', href: 'https://twitter.com/angular', external: true },
  ]);

  // Computed classes
  footerClasses = computed(() => {
    return cn(
      'app-footer',
      'py-12 sm:py-16',
      'border-t border-[var(--border)]',
      'bg-[var(--background)]'
    );
  });

  contentClasses = computed(() => {
    return cn(
      'flex flex-col sm:flex-row justify-between gap-12',
      'pb-8',
      'border-b border-[var(--border)]'
    );
  });

  leftColumnClasses = computed(() => {
    return cn('max-w-xs');
  });

  logoClasses = computed(() => {
    return cn(
      'flex items-center justify-center',
      'h-8 w-8 rounded-lg',
      'bg-[var(--foreground)] text-[var(--background)]'
    );
  });

  linksContainerClasses = computed(() => {
    return cn('grid grid-cols-2 gap-8 sm:gap-16');
  });

  linkGroupTitleClasses = computed(() => {
    return cn('text-sm font-semibold', 'text-[var(--foreground)]', 'mb-4');
  });

  linkClasses = computed(() => {
    return cn(
      'inline-flex items-center gap-1',
      'text-sm',
      'text-[var(--foreground-muted)]',
      'hover:text-[var(--foreground)]',
      'transition-colors duration-200'
    );
  });

  bottomBarClasses = computed(() => {
    return cn(
      'flex flex-col sm:flex-row items-center justify-between gap-4',
      'pt-8'
    );
  });
}
