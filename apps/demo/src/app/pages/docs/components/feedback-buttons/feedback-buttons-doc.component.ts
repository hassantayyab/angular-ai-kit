import { FeedbackButtonsComponent, FeedbackValue } from '@angular-ai-kit/core';
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
    name: 'value',
    type: "'up' | 'down' | null",
    default: 'null',
    description: 'Current feedback value',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the buttons are disabled',
  },
];

/** API Output properties */
const OUTPUTS: ApiProperty[] = [
  {
    name: 'valueChange',
    type: "EventEmitter<'up' | 'down' | null>",
    default: '-',
    description: 'Emitted when feedback value changes',
  },
  {
    name: 'thumbsUp',
    type: 'EventEmitter<void>',
    default: '-',
    description: 'Emitted when thumbs up is selected',
  },
  {
    name: 'thumbsDown',
    type: 'EventEmitter<void>',
    default: '-',
    description: 'Emitted when thumbs down is selected',
  },
];

/** Install command */
const INSTALL_CODE =
  "import { FeedbackButtonsComponent } from '@angular-ai-kit/core';";

/** Features list */
const FEATURES = [
  'Thumbs up/down toggle buttons',
  'Mutual exclusivity - selecting one deselects other',
  'Visual feedback with color changes',
  'Disabled state support',
];

/** Accessibility features */
const ACCESSIBILITY = [
  'Uses role="group" for button grouping',
  'aria-pressed for toggle state',
  'Descriptive aria-labels',
  'Keyboard accessible',
];

/** Code examples */
const USAGE_CODE = `<ai-feedback-buttons
  [value]="feedbackValue()"
  (valueChange)="handleFeedbackChange($event)"
  (thumbsUp)="handleThumbsUp()"
  (thumbsDown)="handleThumbsDown()"
/>`;

/**
 * FeedbackButtons Documentation Component
 */
@Component({
  selector: 'app-feedback-buttons-doc',
  templateUrl: './feedback-buttons-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    FeedbackButtonsComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocControlToggleComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-feedback-buttons-doc block',
  },
})
export class FeedbackButtonsDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly usageCode = USAGE_CODE;
  readonly installCode = INSTALL_CODE;
  readonly features = FEATURES;
  readonly accessibility = ACCESSIBILITY;

  // Demo state
  feedbackValue = signal<FeedbackValue>(null);
  disabled = signal(false);

  // Handle value change
  handleValueChange(value: FeedbackValue): void {
    this.feedbackValue.set(value);
  }

  // Reset demo
  resetDemo(): void {
    this.feedbackValue.set(null);
  }
}
