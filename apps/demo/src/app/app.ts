import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatContainerComponent, ChatMessage } from '@angular-ai-kit/core';

@Component({
  imports: [RouterModule, ChatContainerComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Angular AI Kit - Demo';

  // Sample chat messages
  protected messages = signal<ChatMessage[]>([
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
        "Of course! I'd be happy to help. This is the Angular AI Kit chat component. It supports:\n\n- User and assistant messages\n- Dark mode\n- Copy to clipboard\n- Regenerate messages\n- Responsive design\n\nTry hovering over this message to see the action buttons!",
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
        'Great question! Code highlighting will be added in Phase 0.5 with the CodeBlock component. For now, you can see how the basic chat interface works with text messages.',
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: '5',
      role: 'user',
      content: 'Can I customize the styling?',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '6',
      role: 'assistant',
      content:
        'Absolutely! All components accept a `customClasses` input that allows you to override or extend the default Tailwind classes. You can also customize colors through CSS custom properties for theming.',
      timestamp: new Date(Date.now() - 30000),
    },
  ]);

  // Loading state for demo
  protected loading = signal(false);

  // Handle message copy
  protected handleMessageCopy(event: {
    content: string;
    message: ChatMessage;
  }): void {
    console.log('Message copied:', event.content);
    // In a real app, you might show a toast notification
  }

  // Handle message regenerate
  protected handleMessageRegenerate(message: ChatMessage): void {
    console.log('Regenerate message:', message.id);
    // In a real app, you would call your AI service here
    this.loading.set(true);

    setTimeout(() => {
      this.loading.set(false);
      // Simulate adding a new message
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
    }, 2000);
  }
}
