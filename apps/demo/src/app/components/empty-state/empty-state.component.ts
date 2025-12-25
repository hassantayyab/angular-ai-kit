import { HlmCardDirective } from '@angular-ai-kit/spartan-ui';
import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  output,
  signal,
} from '@angular/core';

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
  templateUrl: './empty-state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmCardDirective],
  host: {
    class:
      'app-empty-state-host flex flex-col items-center justify-center flex-1 p-8',
  },
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
