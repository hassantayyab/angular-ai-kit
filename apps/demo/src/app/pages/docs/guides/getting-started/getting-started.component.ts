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
 * GettingStarted Component
 *
 * Getting started guide for Angular AI Kit.
 */
@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, DocSectionComponent, DocCodeBlockComponent],
  host: {
    class: 'app-getting-started block',
  },
})
export class GettingStartedComponent {
  /** Installation command */
  installCode = `npm install @angular-ai-kit/core @angular-ai-kit/tokens @angular-ai-kit/utils`;

  /** Tailwind setup */
  tailwindInstall = `npm install tailwindcss@^4.0.0 @tailwindcss/postcss`;

  /** PostCSS config */
  postcssConfig = `{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}`;

  /** Tailwind import */
  stylesImport = `@import 'tailwindcss';`;

  /** First component example */
  firstComponentCode = `import { Component } from '@angular/core';
import { ChatInputComponent } from '@angular-ai-kit/core';

@Component({
  selector: 'app-chat',
  imports: [ChatInputComponent],
  template: \`
    <div class="flex min-h-screen items-center justify-center bg-background p-4">
      <div class="w-full max-w-2xl">
        <ai-chat-input
          placeholder="Send a message..."
          (messageSend)="handleMessage($event)"
        />
      </div>
    </div>
  \`,
})
export class ChatComponent {
  handleMessage(content: string) {
    console.log('Message:', content);
  }
}`;

  /** CLI init */
  cliInit = `npx @angular-ai-kit/cli init`;

  /** CLI add components */
  cliAdd = `npx @angular-ai-kit/cli add ai-response chat-input`;

  /** Using multiple components */
  multipleComponentsCode = `import { Component, signal } from '@angular/core';
import {
  ChatInputComponent,
  AiResponseComponent,
  TypingIndicatorComponent,
} from '@angular-ai-kit/core';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  imports: [ChatInputComponent, AiResponseComponent, TypingIndicatorComponent],
  template: \`
    <div class="flex min-h-screen flex-col bg-background">
      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4">
        <div class="mx-auto max-w-3xl space-y-4">
          @for (message of messages(); track message.timestamp) {
            @if (message.role === 'user') {
              <div class="flex justify-end">
                <div class="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                  {{ message.content }}
                </div>
              </div>
            } @else {
              <ai-response [content]="message.content" />
            }
          }

          @if (isLoading()) {
            <ai-typing-indicator />
          }
        </div>
      </div>

      <!-- Input -->
      <div class="border-t border-border bg-card p-4">
        <div class="mx-auto max-w-3xl">
          <ai-chat-input
            placeholder="Send a message..."
            [disabled]="isLoading()"
            (messageSend)="handleMessage($event)"
          />
        </div>
      </div>
    </div>
  \`,
})
export class ChatComponent {
  messages = signal<ChatMessage[]>([]);
  isLoading = signal(false);

  handleMessage(content: string) {
    // Add user message
    this.messages.update((msgs) => [
      ...msgs,
      { role: 'user', content, timestamp: new Date() },
    ]);

    // Simulate AI response
    this.isLoading.set(true);
    setTimeout(() => {
      this.messages.update((msgs) => [
        ...msgs,
        {
          role: 'assistant',
          content: 'This is a simulated AI response!',
          timestamp: new Date(),
        },
      ]);
      this.isLoading.set(false);
    }, 1500);
  }
}`;

  /** Next steps links */
  nextSteps = [
    {
      title: 'Explore Components',
      description: 'Browse all 14 available components',
      link: '/docs/components',
    },
    {
      title: 'Building a Chat App',
      description: 'Complete guide to building a chat interface',
      link: '/docs/guides/building-chat-app',
    },
    {
      title: 'Theming',
      description: 'Customize colors and styles',
      link: '/docs/guides/theming',
    },
  ];
}
