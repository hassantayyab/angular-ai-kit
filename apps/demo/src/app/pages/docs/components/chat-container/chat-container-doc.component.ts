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
