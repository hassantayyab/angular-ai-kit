import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
  output,
} from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

/**
 * Suggested prompt interface
 */
interface SuggestedPrompt {
  icon: string;
  title: string;
  prompt: string;
}

/**
 * EmptyStateComponent
 *
 * Welcoming empty state shown when a conversation has no messages.
 * Includes suggested prompts that users can click to start chatting.
 *
 * @example
 * ```html
 * <app-empty-state
 *   (promptSelect)="handlePromptSelect($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  host: {
    class:
      'app-empty-state-host flex flex-col items-center justify-center flex-1 p-8',
  },
  template: `
    <div [class]="containerClasses()">
      <!-- Logo/Icon -->
      <div [class]="logoClasses()">
        <svg
          class="h-10 w-10"
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

      <!-- Welcome Text -->
      <h2 [class]="titleClasses()">How can I help you today?</h2>
      <p [class]="subtitleClasses()">
        Start a conversation or choose a suggestion below
      </p>

      <!-- Suggested Prompts Grid -->
      <div [class]="promptsGridClasses()">
        @for (prompt of suggestedPrompts(); track prompt.title) {
          <button
            type="button"
            [class]="promptCardClasses()"
            (click)="handlePromptClick(prompt.prompt)"
          >
            <span [class]="promptIconClasses()">{{ prompt.icon }}</span>
            <span class="text-sm font-medium text-[var(--foreground)]">
              {{ prompt.title }}
            </span>
            <span class="line-clamp-2 text-xs text-[var(--foreground-muted)]">
              {{ prompt.prompt }}
            </span>
          </button>
        }
      </div>

      <!-- Disclaimer -->
      <p [class]="disclaimerClasses()">
        This is a demo with simulated AI responses. No real AI is connected.
      </p>
    </div>
  `,
})
export class EmptyStateComponent {
  // Outputs
  promptSelect = output<string>();

  // Suggested prompts
  suggestedPrompts = signal<SuggestedPrompt[]>([
    {
      icon: '💡',
      title: 'Explain components',
      prompt: 'Can you explain how the chat components in Angular AI Kit work?',
    },
    {
      icon: '🎨',
      title: 'Customize styling',
      prompt: 'How can I customize the styling and themes of the components?',
    },
    {
      icon: '⚡',
      title: 'Performance tips',
      prompt:
        'What are some performance best practices when using these components?',
    },
    {
      icon: '🔧',
      title: 'Integration guide',
      prompt:
        'How do I integrate Angular AI Kit with my existing Angular project?',
    },
  ]);

  // Computed classes
  containerClasses = computed(() => {
    return cn(
      'app-empty-state',
      'flex flex-col items-center',
      'text-center',
      'max-w-2xl mx-auto',
      'animate-fade-in'
    );
  });

  logoClasses = computed(() => {
    return cn(
      'flex items-center justify-center',
      'h-16 w-16 rounded-2xl',
      'bg-[var(--muted)]',
      'text-[var(--foreground)]',
      'mb-6'
    );
  });

  titleClasses = computed(() => {
    return cn(
      'text-2xl sm:text-3xl',
      'font-semibold',
      'text-[var(--foreground)]',
      'mb-2'
    );
  });

  subtitleClasses = computed(() => {
    return cn('text-base', 'text-[var(--foreground-muted)]', 'mb-8');
  });

  promptsGridClasses = computed(() => {
    return cn('grid grid-cols-1 sm:grid-cols-2 gap-3', 'w-full', 'mb-8');
  });

  promptCardClasses = computed(() => {
    return cn(
      'flex flex-col items-start gap-1',
      'p-4',
      'rounded-xl',
      'border border-[var(--border)]',
      'bg-[var(--card)]',
      'text-left',
      'transition-all duration-200',
      'hover:border-[var(--border-hover)]',
      'hover:bg-[var(--card-hover)]',
      'hover:shadow-md',
      'cursor-pointer',
      'focus:outline-none focus:ring-2 focus:ring-[var(--ring)]'
    );
  });

  promptIconClasses = computed(() => {
    return cn('text-xl mb-1');
  });

  disclaimerClasses = computed(() => {
    return cn('text-xs', 'text-[var(--foreground-muted)]', 'opacity-60');
  });

  // Methods
  handlePromptClick(prompt: string): void {
    this.promptSelect.emit(prompt);
  }
}
