import { ChatMessage } from '@angular-ai-kit/core';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { MessageBubbleComponent } from '../../../../components/message-bubble';

/**
 * MessageBubble Documentation Component
 */
@Component({
  selector: 'app-message-bubble-doc',
  templateUrl: './message-bubble-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [MessageBubbleComponent],
  host: {
    class: 'app-message-bubble-doc block',
  },
})
export class MessageBubbleDocComponent {
  // Example messages for demos
  userMessage: ChatMessage = {
    id: 'demo-user-1',
    role: 'user',
    content: 'Hello! Can you help me understand how signals work in Angular?',
    timestamp: new Date(),
  };

  assistantMessage: ChatMessage = {
    id: 'demo-assistant-1',
    role: 'assistant',
    content:
      'Of course! Signals are a new reactive primitive in Angular that provide fine-grained reactivity. They automatically track dependencies and update only what needs to change.',
    timestamp: new Date(),
  };

  systemMessage: ChatMessage = {
    id: 'demo-system-1',
    role: 'system',
    content:
      'You are a helpful AI assistant specialized in Angular development.',
    timestamp: new Date(),
  };

  // Demo state
  copiedMessage = signal<string | null>(null);

  handleCopy(content: string): void {
    this.copiedMessage.set(content);
    setTimeout(() => this.copiedMessage.set(null), 2000);
  }

  handleRegenerate(): void {
    console.log('Regenerate clicked');
  }
}
