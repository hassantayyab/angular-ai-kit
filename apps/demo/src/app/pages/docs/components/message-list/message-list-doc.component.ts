import { ChatMessage } from '@angular-ai-kit/core';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { MessageListComponent } from '../../../../components/message-list';

/**
 * MessageList Documentation Component
 */
@Component({
  selector: 'app-message-list-doc',
  templateUrl: './message-list-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmButton, MessageListComponent],
  host: {
    class: 'app-message-list-doc block',
  },
})
export class MessageListDocComponent {
  // Example messages
  messages = signal<ChatMessage[]>([
    {
      id: '1',
      role: 'user',
      content: 'What is Angular?',
      timestamp: new Date(),
    },
    {
      id: '2',
      role: 'assistant',
      content:
        'Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.',
      timestamp: new Date(),
    },
    {
      id: '3',
      role: 'user',
      content: 'What are signals in Angular?',
      timestamp: new Date(),
    },
    {
      id: '4',
      role: 'assistant',
      content:
        'Signals are a new reactive primitive in Angular 16+. They provide fine-grained reactivity and automatically track dependencies to update only what needs to change. Signals are the foundation for zoneless Angular applications.',
      timestamp: new Date(),
    },
  ]);

  emptyMessages = signal<ChatMessage[]>([]);
  isLoading = signal(false);

  toggleLoading(): void {
    this.isLoading.update((v) => !v);
  }

  handleCopy(event: { content: string; message: ChatMessage }): void {
    console.log('Copied:', event.content);
  }

  handleRegenerate(message: ChatMessage): void {
    console.log('Regenerate:', message.id);
  }
}
