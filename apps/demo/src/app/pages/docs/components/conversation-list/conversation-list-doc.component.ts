import { Conversation, ConversationListComponent } from '@angular-ai-kit/core';
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
    name: 'conversations',
    type: 'Conversation[]',
    default: 'required',
    description: 'Array of conversations to display',
  },
  {
    name: 'activeId',
    type: 'string | null',
    default: 'null',
    description: 'ID of the currently active conversation',
  },
  {
    name: 'showDelete',
    type: 'boolean',
    default: 'true',
    description: 'Whether to show delete buttons on hover',
  },
  {
    name: 'emptyMessage',
    type: 'string',
    default: "'No conversations yet'",
    description: 'Message to show when list is empty',
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
    name: 'select',
    type: 'EventEmitter<string>',
    default: '-',
    description: 'Emitted with conversation ID when selected',
  },
  {
    name: 'delete',
    type: 'EventEmitter<string>',
    default: '-',
    description: 'Emitted with conversation ID when delete is clicked',
  },
];

/** Install command */
const INSTALL_CODE =
  "import { ConversationListComponent } from '@angular-ai-kit/core';";

/** Features list */
const FEATURES = [
  'Date-based grouping (Today, Yesterday, etc.)',
  'Active conversation highlighting',
  'Delete button on hover',
  'Empty state with custom message',
  'Automatic sorting by date',
];

/** Accessibility features */
const ACCESSIBILITY = [
  'Keyboard navigable list items',
  'Delete button with aria-label',
  'Focus visible states',
  'Semantic list structure',
];

/** Code examples */
const USAGE_CODE = `<ai-conversation-list
  [conversations]="conversations"
  [activeId]="activeConversationId"
  [showDelete]="true"
  (select)="handleSelect($event)"
  (delete)="handleDelete($event)"
/>`;

/**
 * ConversationList Documentation Component
 */
@Component({
  selector: 'app-conversation-list-doc',
  templateUrl: './conversation-list-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ConversationListComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-conversation-list-doc block',
  },
})
export class ConversationListDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly usageCode = USAGE_CODE;
  readonly installCode = INSTALL_CODE;
  readonly features = FEATURES;
  readonly accessibility = ACCESSIBILITY;

  // Demo conversations
  readonly demoConversations: Conversation[] = [
    { id: '1', title: 'How to use Angular signals', updatedAt: new Date() },
    {
      id: '2',
      title: 'Building a chat application',
      updatedAt: new Date(Date.now() - 86400000),
    },
    {
      id: '3',
      title: 'Tailwind CSS best practices',
      updatedAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: '4',
      title: 'TypeScript generics explained',
      updatedAt: new Date(Date.now() - 86400000 * 5),
    },
  ];

  // Active conversation
  activeId = signal<string | null>('1');

  // Handle selection
  handleSelect(id: string): void {
    this.activeId.set(id);
  }

  // Handle delete
  handleDelete(id: string): void {
    console.log('Delete conversation:', id);
  }
}
