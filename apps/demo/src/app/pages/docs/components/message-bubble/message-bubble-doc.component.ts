import { ChatMessage } from '@angular-ai-kit/core';
import { HlmBadge } from '@angular-ai-kit/spartan-ui/badge';
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
import { MessageBubbleComponent } from '../../../../components/message-bubble';

/** API Input properties for MessageBubble */
const INPUTS: ApiProperty[] = [
  {
    name: 'message',
    type: 'ChatMessage',
    default: 'required',
    description: 'The chat message to display',
  },
  {
    name: 'showAvatar',
    type: 'boolean',
    default: 'true',
    description: 'Whether to show the avatar',
  },
  {
    name: 'showActions',
    type: 'boolean',
    default: 'false',
    description: 'Always show action buttons (otherwise shown on hover)',
  },
  {
    name: 'customClasses',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes to apply',
  },
];

/** API Output properties for MessageBubble */
const OUTPUTS: ApiProperty[] = [
  {
    name: 'copied',
    type: 'string',
    description: 'Emitted when copy button is clicked with message content',
  },
  {
    name: 'regenerate',
    type: 'void',
    description:
      'Emitted when regenerate button is clicked (assistant messages only)',
  },
];

/** Accessibility features */
const ACCESSIBILITY_FEATURES = [
  'Uses semantic article element',
  'ARIA labels for screen readers',
  'Keyboard accessible action buttons',
  'Focus management for hover states',
  'Screen reader only text for icon buttons',
];

/** Code examples */
const INSTALL_CODE =
  "import { MessageBubbleComponent } from '@angular-ai-kit/core';";

const USAGE_CODE = `<ai-message-bubble
  [message]="message"
  [showAvatar]="true"
  [showActions]="false"
  (copied)="handleCopy($event)"
  (regenerate)="handleRegenerate()"
/>`;

const INTERFACE_CODE = `interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}`;

/**
 * MessageBubble Documentation Component
 */
@Component({
  selector: 'app-message-bubble-doc',
  templateUrl: './message-bubble-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HlmBadge,
    MessageBubbleComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-message-bubble-doc block',
  },
})
export class MessageBubbleDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly accessibilityFeatures = ACCESSIBILITY_FEATURES;
  readonly installCode = INSTALL_CODE;
  readonly usageCode = USAGE_CODE;
  readonly interfaceCode = INTERFACE_CODE;

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
