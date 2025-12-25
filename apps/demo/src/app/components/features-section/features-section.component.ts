import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

/**
 * Feature item interface
 */
interface Feature {
  title: string;
  description: string;
  icon: string;
}

/**
 * FeaturesSection Component
 *
 * Grid of feature cards showcasing library capabilities.
 * Responsive layout with hover effects.
 *
 * @example
 * ```html
 * <app-features-section />
 * ```
 */
@Component({
  selector: 'app-features-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  host: {
    class: 'app-features-section-host block',
  },
  template: `
    <section [class]="sectionClasses()" id="components">
      <div class="demo-section">
        <!-- Section Header -->
        <div [class]="headerClasses()">
          <span [class]="labelClasses()">Components</span>
          <h2 [class]="titleClasses()">Everything you need for AI chat</h2>
          <p [class]="subtitleClasses()">
            Production-ready components built with modern Angular patterns.
            Fully typed, accessible, and customizable.
          </p>
        </div>

        <!-- Features Grid -->
        <div [class]="gridClasses()">
          @for (feature of features(); track feature.title; let i = $index) {
            <div [class]="cardClasses()">
              <!-- Icon -->
              <div [class]="iconContainerClasses()">
                @switch (feature.icon) {
                  @case ('chat') {
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  }
                  @case ('signal') {
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  }
                  @case ('moon') {
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  }
                  @case ('accessibility') {
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  }
                  @case ('code') {
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  }
                  @case ('stream') {
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  }
                }
              </div>

              <!-- Content -->
              <h3 [class]="cardTitleClasses()">
                {{ feature.title }}
              </h3>
              <p [class]="cardDescriptionClasses()">
                {{ feature.description }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class FeaturesSectionComponent {
  // Features data
  features = signal<Feature[]>([
    {
      title: 'Chat Components',
      description:
        'Beautiful message bubbles, chat containers, and input fields designed for AI conversations.',
      icon: 'chat',
    },
    {
      title: 'Signal-First',
      description:
        'Built entirely with Angular signals for reactive, efficient state management.',
      icon: 'signal',
    },
    {
      title: 'Dark Mode',
      description:
        'Seamless light and dark theme support with CSS custom properties.',
      icon: 'moon',
    },
    {
      title: 'Accessible',
      description:
        'WCAG 2.1 AA compliant with full keyboard navigation and screen reader support.',
      icon: 'accessibility',
    },
    {
      title: 'TypeScript',
      description:
        'Fully typed with strict mode. Great IntelliSense and compile-time safety.',
      icon: 'code',
    },
    {
      title: 'Streaming Ready',
      description:
        'Components designed to handle real-time streaming responses from AI APIs.',
      icon: 'stream',
    },
  ]);

  // Computed classes
  sectionClasses = computed(() => {
    return cn(
      'app-features-section',
      'py-24 sm:py-32',
      'bg-[var(--background-secondary)]'
    );
  });

  headerClasses = computed(() => {
    return cn('text-center', 'max-w-3xl mx-auto', 'mb-16');
  });

  labelClasses = computed(() => {
    return cn(
      'inline-block',
      'text-sm font-semibold uppercase tracking-wider',
      'text-[var(--foreground-muted)]',
      'mb-4'
    );
  });

  titleClasses = computed(() => {
    return cn(
      'text-3xl sm:text-4xl lg:text-5xl',
      'font-bold tracking-tight',
      'text-[var(--foreground)]',
      'mb-4'
    );
  });

  subtitleClasses = computed(() => {
    return cn('text-lg', 'text-[var(--foreground-muted)]', 'leading-relaxed');
  });

  gridClasses = computed(() => {
    return cn('grid gap-6', 'sm:grid-cols-2 lg:grid-cols-3');
  });

  cardClasses = computed(() => {
    return cn(
      'demo-card',
      'p-6',
      'group',
      'transition-all duration-300',
      'hover:-translate-y-1'
    );
  });

  iconContainerClasses = computed(() => {
    return cn(
      'inline-flex items-center justify-center',
      'h-12 w-12 rounded-lg',
      'bg-[var(--muted)]',
      'text-[var(--foreground)]',
      'mb-4',
      'transition-colors duration-200',
      'group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)]'
    );
  });

  cardTitleClasses = computed(() => {
    return cn('text-lg font-semibold', 'text-[var(--foreground)]', 'mb-2');
  });

  cardDescriptionClasses = computed(() => {
    return cn('text-sm', 'text-[var(--foreground-muted)]', 'leading-relaxed');
  });
}
