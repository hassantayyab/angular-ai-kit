import {
  EditEvent,
  UserMessage,
  UserMessageComponent,
} from '@angular-ai-kit/core';
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
    name: 'message',
    type: 'UserMessage',
    default: 'required',
    description: 'The user message to display',
  },
  {
    name: 'maxChars',
    type: 'number',
    default: '200',
    description: 'Maximum characters before truncation',
  },
  {
    name: 'showCopy',
    type: 'boolean',
    default: 'true',
    description: 'Show copy button',
  },
  {
    name: 'showEdit',
    type: 'boolean',
    default: 'true',
    description: 'Show edit button',
  },
  {
    name: 'showAvatar',
    type: 'boolean',
    default: 'true',
    description: 'Show user avatar',
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
    name: 'copy',
    type: 'string',
    default: '-',
    description: 'Emits message content when copy is clicked',
  },
  {
    name: 'edit',
    type: 'EditEvent',
    default: '-',
    description: 'Emits when message is edited and saved',
  },
];

/** Install command */
const INSTALL_CODE =
  "import { UserMessageComponent } from '@angular-ai-kit/core';";

/** Accessibility features */
const ACCESSIBILITY = [
  'Uses semantic article element with ARIA label',
  'Action buttons have aria-labels for screen readers',
  'Supports keyboard navigation (Tab, Enter, Escape)',
  'Edit mode accessible via keyboard (Ctrl+Enter to save, Escape to cancel)',
  'Actions are hidden from screen readers when not visible',
];

/** Features list */
const FEATURES = [
  'Compact card design (max 80% width, right-aligned)',
  'Hover-activated action buttons (copy, edit)',
  'Inline editing with Save/Cancel buttons',
  'Text truncation with "Show more/less" toggle',
  'Copy to clipboard functionality',
  'Smooth transitions and hover effects',
];

/** Code example */
const USAGE_CODE = `<ai-user-message
  [message]="userMessage"
  [maxChars]="200"
  (copy)="handleCopy($event)"
  (edit)="handleEdit($event)"
/>`;

/** Interface code */
const INTERFACE_CODE = `interface UserMessage {
  id: string;
  role: 'user';
  content: string;
  timestamp: Date;
  status?: 'pending' | 'sent' | 'delivered' | 'failed' | 'streaming';
  attachments?: File[];
}

interface EditEvent {
  originalContent: string;
  newContent: string;
}`;

/**
 * User Message Documentation Component
 */
@Component({
  selector: 'app-user-message-doc',
  templateUrl: './user-message-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    UserMessageComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-user-message-doc block',
  },
})
export class UserMessageDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly usageCode = USAGE_CODE;
  readonly installCode = INSTALL_CODE;
  readonly accessibility = ACCESSIBILITY;
  readonly features = FEATURES;
  readonly interfaceCode = INTERFACE_CODE;

  // Demo messages
  shortMessage = signal<UserMessage>({
    id: '1',
    role: 'user',
    content: 'Hello, how are you?',
    timestamp: new Date(),
  });

  mediumMessage = signal<UserMessage>({
    id: '2',
    role: 'user',
    content:
      'Can you help me understand how signals work in Angular? I have been reading the documentation but I still have some questions about computed signals.',
    timestamp: new Date(),
  });

  longMessage = signal<UserMessage>({
    id: '3',
    role: 'user',
    content:
      'This is a much longer message that demonstrates the truncation feature. When messages exceed the maximum character limit (default is 200 characters), they will be truncated with an ellipsis and a "Show more" button will appear below the text. Users can click this button to expand the message and see the full content. When expanded, a "Show less" button appears to collapse it back. This helps keep the chat interface clean while still allowing users to read full messages when needed. The truncation is smart and preserves word boundaries when possible.',
    timestamp: new Date(),
  });

  // Handle copy event
  handleCopy(content: string): void {
    console.log('Copied:', content.substring(0, 50) + '...');
  }

  // Handle edit event
  handleEdit(event: EditEvent): void {
    console.log('Edit event:', event);
    // In a real app, you would update the message content here
    // For demo purposes, we'll just log it
  }
}
