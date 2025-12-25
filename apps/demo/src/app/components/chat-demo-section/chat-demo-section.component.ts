import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { cn } from '@angular-ai-kit/utils';
import { ChatContainerComponent, ChatMessage } from '@angular-ai-kit/core';

/**
 * ChatDemoSection Component
 *
 * Showcases the ChatContainer component with sample messages.
 * Features a polished container with shadow and proper sizing.
 *
 * @example
 * ```html
 * <app-chat-demo-section />
 * ```
 */
@Component({
  selector: 'app-chat-demo-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ChatContainerComponent],
  host: {
    class: 'app-chat-demo-section-host block',
  },
  template: `
    <section [class]="sectionClasses()" id="demo">
      <div class="demo-section">
        <!-- Section Header -->
        <div [class]="headerClasses()">
          <span [class]="labelClasses()">Live Demo</span>
          <h2 [class]="titleClasses()">Try it yourself</h2>
          <p [class]="subtitleClasses()">
            Interactive demo of the ChatContainer component. Hover over messages
            to see actions.
          </p>
        </div>

        <!-- Chat Demo Container -->
        <div [class]="demoContainerClasses()">
          <!-- Browser Chrome -->
          <div [class]="browserChromeClasses()">
            <div class="flex items-center gap-2">
              <div class="flex gap-1.5">
                <div class="h-3 w-3 rounded-full bg-[#ff5f57]"></div>
                <div class="h-3 w-3 rounded-full bg-[#febc2e]"></div>
                <div class="h-3 w-3 rounded-full bg-[#28c840]"></div>
              </div>
            </div>
            <div [class]="urlBarClasses()">
              <svg
                class="h-3.5 w-3.5 text-[var(--foreground-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span class="text-xs text-[var(--foreground-muted)]"
                >localhost:4200</span
              >
            </div>
          </div>

          <!-- Chat Interface -->
          <div [class]="chatContainerClasses()">
            <ai-chat-container
              [messages]="messages()"
              [loading]="loading()"
              [showHeader]="false"
              [showFooter]="true"
              [autoScroll]="true"
              [showAvatars]="true"
              [customClasses]="'flex-1 flex flex-col min-h-0'"
              (messageCopy)="handleMessageCopy($event)"
              (messageRegenerate)="handleMessageRegenerate($event)"
            />
          </div>
        </div>

        <!-- Code Preview Hint -->
        <p [class]="hintClasses()">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          This component accepts messages via inputs and emits events for user
          interactions.
        </p>
      </div>
    </section>
  `,
})
export class ChatDemoSectionComponent {
  // Sample chat messages
  messages = signal<ChatMessage[]>([
    {
      id: '1',
      role: 'user',
      content:
        'Hello! Can you help me understand how to use this chat component?',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      role: 'assistant',
      content:
        "Of course! I'd be happy to help. This is the **Angular AI Kit** chat component. It supports:\n\n- User and assistant messages\n- Dark mode theming\n- Copy to clipboard\n- Message regeneration\n- Responsive design\n\nTry hovering over this message to see the action buttons!",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      role: 'user',
      content: "That's awesome! What about code examples?",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: '4',
      role: 'assistant',
      content:
        'Great question! Code highlighting is coming in a future release. For now, you can see how the basic chat interface works with formatted text messages and interactive features.',
      timestamp: new Date(Date.now() - 120000),
    },
  ]);

  // Loading state
  loading = signal(false);

  // Computed classes
  sectionClasses = computed(() => {
    return cn('app-chat-demo-section', 'py-24 sm:py-32');
  });

  headerClasses = computed(() => {
    return cn('text-center', 'max-w-3xl mx-auto', 'mb-12');
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

  demoContainerClasses = computed(() => {
    return cn(
      'max-w-4xl mx-auto',
      'rounded-xl overflow-hidden',
      'border border-[var(--border)]',
      'bg-[var(--card)]',
      'shadow-2xl shadow-black/5 dark:shadow-black/20'
    );
  });

  browserChromeClasses = computed(() => {
    return cn(
      'flex items-center justify-between',
      'px-4 py-3',
      'bg-[var(--muted)]',
      'border-b border-[var(--border)]'
    );
  });

  urlBarClasses = computed(() => {
    return cn(
      'flex items-center gap-2',
      'px-3 py-1.5',
      'rounded-md',
      'bg-[var(--background)]',
      'border border-[var(--border)]'
    );
  });

  chatContainerClasses = computed(() => {
    return cn('h-[500px]', 'flex flex-col');
  });

  hintClasses = computed(() => {
    return cn(
      'flex items-center justify-center gap-2',
      'mt-6',
      'text-sm text-[var(--foreground-muted)]'
    );
  });

  // Event handlers
  handleMessageCopy(event: { content: string; message: ChatMessage }): void {
    // Toast notification could be added here
  }

  handleMessageRegenerate(message: ChatMessage): void {
    this.loading.set(true);

    setTimeout(() => {
      this.loading.set(false);
      this.messages.update((msgs) => [
        ...msgs,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content:
            'This is a regenerated response. In a real application, this would come from your AI service.',
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  }
}
