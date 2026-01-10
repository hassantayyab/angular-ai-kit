import { ResponseActionsComponent } from '@angular-ai-kit/core';
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

/** API Input properties */
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
    name: 'showRegenerate',
    type: 'boolean',
    default: 'true',
    description: 'Show regenerate button',
  },
  {
    name: 'showFeedback',
    type: 'boolean',
    default: 'true',
    description: 'Show feedback buttons',
  },
  {
    name: 'alwaysVisible',
    type: 'boolean',
    default: 'false',
    description: 'Always show (vs hover)',
  },
  {
    name: 'isHovered',
    type: 'boolean',
    default: 'false',
    description: 'Parent hover state',
  },
  {
    name: 'isFocused',
    type: 'boolean',
    default: 'false',
    description: 'Parent focus state',
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
    type: 'EventEmitter<string>',
    default: '-',
    description: 'Copy clicked',
  },
  {
    name: 'regenerate',
    type: 'EventEmitter<void>',
    default: '-',
    description: 'Regenerate clicked',
  },
  {
    name: 'thumbsUp',
    type: 'EventEmitter<void>',
    default: '-',
    description: 'Thumbs up clicked',
  },
  {
    name: 'thumbsDown',
    type: 'EventEmitter<void>',
    default: '-',
    description: 'Thumbs down clicked',
  },
  {
    name: 'feedbackChange',
    type: "EventEmitter<'up' | 'down' | null>",
    default: '-',
    description: 'Emitted when feedback value changes',
  },
];

const INSTALL_CODE =
  "import { ResponseActionsComponent } from '@angular-ai-kit/core';";

const FEATURES = [
  'Copy button with visual feedback',
  'Regenerate button for retry',
  'Integrated feedback buttons',
  'Visibility control (hover/always)',
];

const USAGE_CODE = `<ai-response-actions
  [content]="responseText"
  [alwaysVisible]="true"
  (copy)="handleCopy($event)"
  (regenerate)="handleRegenerate()"
/>`;

@Component({
  selector: 'app-response-actions-doc',
  templateUrl: './response-actions-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ResponseActionsComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocControlToggleComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-response-actions-doc block',
  },
})
export class ResponseActionsDocComponent {
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly usageCode = USAGE_CODE;
  readonly installCode = INSTALL_CODE;
  readonly features = FEATURES;

  demoContent = 'This is the AI response content that can be copied.';
  alwaysVisible = signal(true);
  showCopy = signal(true);
  showRegenerate = signal(true);
  showFeedback = signal(true);
}
