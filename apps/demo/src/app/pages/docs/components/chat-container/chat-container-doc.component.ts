import { ChatContainerComponent, ChatMessage } from '@angular-ai-kit/core';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';

/**
 * ChatContainer Documentation Component
 */
@Component({
  selector: 'app-chat-container-doc',
  templateUrl: './chat-container-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ChatContainerComponent, HlmButton],
  host: {
    class: 'app-chat-container-doc block',
  },
})
export class ChatContainerDocComponent {
  // Example messages
  messages = signal<ChatMessage[]>([
    {
      id: '1',
      role: 'user',
      content: 'Hello! How can I use ChatContainer?',
      timestamp: new Date(),
    },
    {
      id: '2',
      role: 'assistant',
      content:
        'ChatContainer is a full-height layout component that combines a header, message list, and footer. It provides a complete chat interface structure.',
      timestamp: new Date(),
    },
    {
      id: '3',
      role: 'user',
      content: 'Can I customize the header?',
      timestamp: new Date(),
    },
    {
      id: '4',
      role: 'assistant',
      content:
        'Yes! You can set a custom title, show/hide the header, and even add action buttons. The component is designed to be flexible.',
      timestamp: new Date(),
    },
  ]);

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
