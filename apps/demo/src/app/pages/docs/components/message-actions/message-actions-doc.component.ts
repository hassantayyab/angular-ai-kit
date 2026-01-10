import { MessageActionsComponent } from '@angular-ai-kit/core';
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
  DocControlToggleComponent,
  DocDemoCardComponent,
  DocFeaturesListComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

const INPUTS: ApiProperty[] = [
  {
    name: 'content',
    type: 'string',
    default: "''",
    description: 'Content to copy',
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
    name: 'isVisible',
    type: 'boolean',
    default: 'false',
    description: 'Whether visible',
  },
  {
    name: 'alwaysVisible',
    type: 'boolean',
    default: 'false',
    description: 'Always show',
  },
  {
    name: 'customClasses',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

const OUTPUTS: ApiProperty[] = [
  {
    name: 'copy',
    type: 'EventEmitter<void>',
    default: '-',
    description: 'Copy clicked',
  },
  {
    name: 'edit',
    type: 'EventEmitter<void>',
    default: '-',
    description: 'Edit clicked',
  },
];

const INSTALL_CODE =
  "import { MessageActionsComponent } from '@angular-ai-kit/core';";

const FEATURES = [
  'Copy button with feedback',
  'Edit button for message editing',
  'Visibility control (hover/always)',
  'Compact sizing for messages',
];

const USAGE_CODE = `<ai-message-actions
  [content]="message.content"
  [isVisible]="isHovered"
  (copy)="handleCopy()"
  (edit)="handleEdit()"
/>`;

@Component({
  selector: 'app-message-actions-doc',
  templateUrl: './message-actions-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MessageActionsComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocControlToggleComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-message-actions-doc block',
  },
})
export class MessageActionsDocComponent {
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly usageCode = USAGE_CODE;
  readonly installCode = INSTALL_CODE;
  readonly features = FEATURES;

  demoContent = 'This is a user message';
  alwaysVisible = signal(true);
  showCopy = signal(true);
  showEdit = signal(true);
}
