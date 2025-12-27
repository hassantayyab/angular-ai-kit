import { HlmSwitch } from '@angular-ai-kit/spartan-ui/switch';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ChatInputComponent,
  ChatSuggestion,
  SuggestionsPosition,
} from '../../../../components/chat-input';

/**
 * ChatInput Documentation Component
 *
 * Interactive playground for the ChatInput component
 * with configurable visibility options.
 */
@Component({
  selector: 'app-chat-input-doc',
  templateUrl: './chat-input-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ChatInputComponent, FormsModule, HlmSwitch],
  host: {
    class: 'app-chat-input-doc block',
  },
})
export class ChatInputDocComponent {
  // Configuration toggles
  showContextButton = signal(true);
  showAttachmentButton = signal(true);
  showResearchButton = signal(true);
  showSourcesButton = signal(true);
  showModelName = signal(true);
  showMicButton = signal(true);
  showSuggestions = signal(true);
  suggestionsPosition = signal<SuggestionsPosition>('bottom');

  // Demo suggestions data
  demoSuggestions = signal<ChatSuggestion[]>([
    {
      icon: '💡',
      label: 'Explain components',
      prompt: 'Can you explain how the chat components work?',
    },
    {
      icon: '🎨',
      label: 'Customize styling',
      prompt: 'How can I customize the styling and themes?',
    },
    {
      icon: '⚡',
      label: 'Performance tips',
      prompt: 'What are some performance best practices?',
    },
    {
      icon: '🔧',
      label: 'Integration guide',
      prompt: 'How do I integrate with my Angular project?',
    },
  ]);

  // Demo state
  lastSentMessage = signal<string | null>(null);

  // Preset configurations
  showAll(): void {
    this.showContextButton.set(true);
    this.showAttachmentButton.set(true);
    this.showResearchButton.set(true);
    this.showSourcesButton.set(true);
    this.showModelName.set(true);
    this.showMicButton.set(true);
    this.showSuggestions.set(true);
  }

  hideAll(): void {
    this.showContextButton.set(false);
    this.showAttachmentButton.set(false);
    this.showResearchButton.set(false);
    this.showSourcesButton.set(false);
    this.showModelName.set(false);
    this.showMicButton.set(false);
    this.showSuggestions.set(false);
  }

  handleMessageSend(message: string): void {
    this.lastSentMessage.set(message);
    setTimeout(() => this.lastSentMessage.set(null), 3000);
  }
}
