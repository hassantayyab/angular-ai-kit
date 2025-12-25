import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
} from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

/**
 * HeroSection Component
 *
 * Landing page hero with headline, description, and CTA buttons.
 * Features a subtle gradient background and staggered animations.
 *
 * @example
 * ```html
 * <app-hero-section />
 * ```
 */
@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  host: {
    class: 'app-hero-section-host block',
  },
  template: `
    <section [class]="sectionClasses()">
      <!-- Background Pattern -->
      <div [class]="backgroundClasses()" aria-hidden="true">
        <div [class]="gradientClasses()"></div>
        <div [class]="gridPatternClasses()"></div>
      </div>

      <div class="demo-section relative">
        <div [class]="contentClasses()">
          <!-- Badge -->
          <div class="animate-fade-in opacity-0">
            <span [class]="badgeClasses()">
              <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              Angular v21 + Tailwind CSS v4
            </span>
          </div>

          <!-- Headline -->
          <h1 [class]="headlineClasses()">
            <span class="animate-slide-up stagger-1 block opacity-0">
              Build stunning AI interfaces
            </span>
            <span
              class="animate-slide-up stagger-2 block text-[var(--foreground-muted)] opacity-0"
            >
              with Angular components
            </span>
          </h1>

          <!-- Description -->
          <p [class]="descriptionClasses()">
            A modern, signal-first component library for building AI chat
            interfaces. Fully accessible, beautifully styled, and ready for
            production.
          </p>

          <!-- CTA Buttons -->
          <div [class]="ctaContainerClasses()">
            <a href="#demo" [class]="primaryButtonClasses()">
              View Demo
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            <a
              href="https://github.com/angular-ai-kit"
              target="_blank"
              rel="noopener noreferrer"
              [class]="secondaryButtonClasses()"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              GitHub
            </a>
          </div>

          <!-- Feature Pills -->
          <div [class]="featurePillsClasses()">
            @for (feature of features; track feature) {
              <span [class]="featurePillClasses()">
                <svg
                  class="h-3.5 w-3.5 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ feature }}
              </span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      /* Grid pattern background */
      .hero-grid-pattern {
        background-image:
          linear-gradient(to right, var(--border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--border) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(
          ellipse 80% 50% at 50% 0%,
          black 70%,
          transparent 100%
        );
        -webkit-mask-image: radial-gradient(
          ellipse 80% 50% at 50% 0%,
          black 70%,
          transparent 100%
        );
      }

      /* Gradient orb effect */
      .hero-gradient {
        background: radial-gradient(
          circle at 50% 0%,
          var(--muted) 0%,
          transparent 50%
        );
      }
    `,
  ],
})
export class HeroSectionComponent {
  // Feature list
  features = [
    'Signal-first',
    'Dark mode',
    'Accessible',
    'SSR ready',
    'Zoneless',
  ];

  // Computed classes
  sectionClasses = computed(() => {
    return cn(
      'app-hero-section',
      'relative overflow-hidden',
      'pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-40'
    );
  });

  backgroundClasses = computed(() => {
    return cn('absolute inset-0 -z-10');
  });

  gradientClasses = computed(() => {
    return cn('hero-gradient', 'absolute inset-0 opacity-60');
  });

  gridPatternClasses = computed(() => {
    return cn('hero-grid-pattern', 'absolute inset-0 opacity-40');
  });

  contentClasses = computed(() => {
    return cn('flex flex-col items-center text-center', 'max-w-4xl mx-auto');
  });

  badgeClasses = computed(() => {
    return cn(
      'inline-flex items-center gap-2',
      'px-4 py-1.5 mb-8',
      'text-xs font-medium',
      'rounded-full',
      'bg-[var(--muted)] text-[var(--foreground-secondary)]',
      'border border-[var(--border)]'
    );
  });

  headlineClasses = computed(() => {
    return cn(
      'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl',
      'font-bold tracking-tight',
      'leading-[1.1]',
      'text-[var(--foreground)]',
      'mb-6'
    );
  });

  descriptionClasses = computed(() => {
    return cn(
      'animate-slide-up opacity-0 stagger-3',
      'max-w-2xl mx-auto',
      'text-lg sm:text-xl',
      'text-[var(--foreground-muted)]',
      'leading-relaxed',
      'mb-10'
    );
  });

  ctaContainerClasses = computed(() => {
    return cn(
      'animate-slide-up opacity-0 stagger-4',
      'flex flex-col sm:flex-row items-center gap-4',
      'mb-12'
    );
  });

  primaryButtonClasses = computed(() => {
    return cn(
      'demo-btn demo-btn-primary',
      'h-12 px-8',
      'text-base font-medium',
      'rounded-lg',
      'shadow-lg shadow-black/5',
      'hover:shadow-xl hover:shadow-black/10',
      'transform hover:-translate-y-0.5',
      'transition-all duration-200'
    );
  });

  secondaryButtonClasses = computed(() => {
    return cn(
      'demo-btn demo-btn-secondary',
      'h-12 px-6',
      'text-base font-medium',
      'rounded-lg',
      'transition-all duration-200'
    );
  });

  featurePillsClasses = computed(() => {
    return cn(
      'animate-fade-in opacity-0 stagger-5',
      'flex flex-wrap justify-center gap-3'
    );
  });

  featurePillClasses = computed(() => {
    return cn(
      'inline-flex items-center gap-1.5',
      'px-3 py-1',
      'text-sm',
      'text-[var(--foreground-secondary)]'
    );
  });
}
