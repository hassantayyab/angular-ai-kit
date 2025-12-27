import { ChatMessage } from '@angular-ai-kit/core';
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
import { MessageListComponent } from '../../../../components/message-list';

/** API Input properties */
const INPUTS: ApiProperty[] = [
  {
    name: 'messages',
    type: 'ChatMessage[]',
    default: 'required',
    description: 'Array of messages to display',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Show loading/typing indicator',
  },
  {
    name: 'autoScroll',
    type: 'boolean',
    default: 'true',
    description: 'Auto-scroll to bottom on new messages',
  },
  {
    name: 'showAvatars',
    type: 'boolean',
    default: 'true',
    description: 'Show avatars for messages',
  },
  {
    name: 'emptyMessage',
    type: 'string',
    default: "'No messages yet'",
    description: 'Message shown when list is empty',
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
    name: 'messageCopy',
    type: '{ content: string; message: ChatMessage }',
    description: 'Emitted when a message is copied',
  },
  {
    name: 'messageRegenerate',
    type: 'ChatMessage',
    description: 'Emitted when regenerate is clicked on a message',
  },
];

/** Features list */
const FEATURES = [
  'Auto-scroll to latest message',
  'Skeleton loading indicator while waiting for AI response',
  'Empty state with customizable message',
  'Smooth scroll behavior',
  'SSR-safe scroll handling',
];

/** Accessibility features */
const ACCESSIBILITY = [
  'role="log" for screen reader announcement',
  'aria-live="polite" for new message announcements',
  'Loading state announced to screen readers',
  'Keyboard accessible message actions',
];

/** Code examples */
const INSTALL_CODE =
  "import { MessageListComponent } from '@angular-ai-kit/core';";

const USAGE_CODE = `<ai-message-list
  [messages]="messages()"
  [loading]="isLoading()"
  [autoScroll]="true"
  [showAvatars]="true"
  (messageCopy)="handleCopy($event)"
  (messageRegenerate)="handleRegenerate($event)"
/>`;

/**
 * MessageList Documentation Component
 */
@Component({
  selector: 'app-message-list-doc',
  templateUrl: './message-list-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HlmButton,
    MessageListComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-message-list-doc block',
  },
})
export class MessageListDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly features = FEATURES;
  readonly accessibility = ACCESSIBILITY;
  readonly installCode = INSTALL_CODE;
  readonly usageCode = USAGE_CODE;

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
