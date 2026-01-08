import { ChatContainerComponent, ChatMessage } from '@angular-ai-kit/core';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ApiProperty,
  DocApiTableComponent,
  DocCodeBlockComponent,
  DocDemoCardComponent,
  DocFeaturesListComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/** API Input properties */
const INPUTS: ApiProperty[] = [
  {
    name: 'messages',
    type: 'ChatMessage[]',
    default: 'required',
    description: 'Array of messages to display',
  },
  {
    name: 'title',
    type: 'string',
    default: "''",
    description: 'Title displayed in header',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Show loading indicator',
  },
  {
    name: 'showHeader',
    type: 'boolean',
    default: 'true',
    description: 'Show the header section',
  },
  {
    name: 'showFooter',
    type: 'boolean',
    default: 'true',
    description: 'Show the footer section',
  },
  {
    name: 'showAvatars',
    type: 'boolean',
    default: 'true',
    description: 'Show avatars in messages',
  },
  {
    name: 'autoScroll',
    type: 'boolean',
    default: 'true',
    description: 'Auto-scroll on new messages',
  },
  {
    name: 'emptyMessage',
    type: 'string',
    default: "'No messages yet...'",
    description: 'Empty state message',
  },
  {
    name: 'showHeaderActions',
    type: 'boolean',
    default: 'true',
    description: 'Show action buttons in header',
  },
  {
    name: 'messagesMaxHeight',
    type: 'string',
    default: "''",
    description: 'Maximum height for message list area',
  },
  {
    name: 'hasFooterContent',
    type: 'boolean',
    default: 'false',
    description: 'Whether footer has projected content',
  },
  {
    name: 'customClasses',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

/** API Output properties */
const OUTPUTS: ApiProperty[] = [
  {
    name: 'messageSend',
    type: 'string',
    description: 'Emitted when a message is sent',
  },
  {
    name: 'messageCopy',
    type: '{ content: string; message: ChatMessage }',
    description: 'Emitted when a message is copied',
  },
  {
    name: 'messageRegenerate',
    type: 'ChatMessage',
    description: 'Emitted on regenerate click',
  },
];

/** Features list */
const FEATURES = [
  'Full-height flex layout',
  'Optional header with title and actions',
  'Scrollable message area',
  'Optional footer for input components',
  'Dark mode support',
  'Responsive design',
];

/** Code examples */
const INSTALL_CODE =
  "import { ChatContainerComponent } from '@angular-ai-kit/core';";

const USAGE_CODE = `<ai-chat-container
  [messages]="messages()"
  [title]="'AI Assistant'"
  [loading]="isLoading()"
  [showHeader]="true"
  [showFooter]="true"
  [autoScroll]="true"
  [showAvatars]="true"
  (messageCopy)="handleCopy($event)"
  (messageRegenerate)="handleRegenerate($event)"
/>`;

const LAYOUT_CODE = `┌─────────────────────────────────┐
│         Header (optional)       │
│    Title + Action Buttons       │
├─────────────────────────────────┤
│                                 │
│                                 │
│         Message List            │
│    (scrollable, flex-grow)      │
│                                 │
│                                 │
├─────────────────────────────────┤
│         Footer (optional)       │
│      Input Area (Phase 0.3)     │
└─────────────────────────────────┘`;

/**
 * ChatContainer Documentation Component
 */
@Component({
  selector: 'app-chat-container-doc',
  templateUrl: './chat-container-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ChatContainerComponent,
    HlmButton,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-chat-container-doc block',
  },
})
export class ChatContainerDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly features = FEATURES;
  readonly installCode = INSTALL_CODE;
  readonly usageCode = USAGE_CODE;
  readonly layoutCode = LAYOUT_CODE;

  // Example messages with comprehensive markdown
  messages = signal<ChatMessage[]>([
    {
      id: '1',
      role: 'user',
      content: 'Hello! Can you show me the features of ChatContainer?',
      timestamp: new Date(),
    },
    {
      id: '2',
      role: 'assistant',
      content: `## ChatContainer Features

The **ChatContainer** component provides a complete chat interface layout:

### Structure

- **Header** - Optional, displays title and action buttons
- **Message List** - Scrollable area for messages
- **Footer** - Placeholder for input components

### Code Example

\`\`\`typescript
@Component({
  template: \`
    <ai-chat-container
      [messages]="messages()"
      [title]="'AI Assistant'"
      [loading]="isLoading()"
    />
  \`
})
export class ChatComponent {}
\`\`\`

### Benefits

1. **Full-height flex layout** - Fills available space
2. **Auto-scroll** - Scrolls to newest messages
3. **Dark mode support** - Built-in theme switching
4. **Responsive design** - Works on all screen sizes

> **Tip:** Use the \`showHeader\` and \`showFooter\` inputs to customize visibility.`,
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
