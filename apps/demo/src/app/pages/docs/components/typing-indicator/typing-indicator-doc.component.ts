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
  DocSliderControlComponent,
} from '../../../../components/doc-ui';
import { TypingIndicatorComponent } from '../../../../components/typing-indicator';

/** API Input properties */
const INPUTS: ApiProperty[] = [
  {
    name: 'showAvatar',
    type: 'boolean',
    default: 'true',
    description: 'Show AI avatar next to dots',
  },
  {
    name: 'text',
    type: 'string',
    default: "''",
    description: 'Optional text message (e.g., "Thinking...")',
  },
  {
    name: 'dotCount',
    type: 'number',
    default: '3',
    description: 'Number of animated dots (2-5)',
  },
];

/** Accessibility features */
const ACCESSIBILITY = [
  'Uses role="status" for screen reader announcements',
  'Includes aria-label for "AI is typing"',
  'Hidden text "AI is thinking..." for screen readers via sr-only class',
  'Respects prefers-reduced-motion media query',
];

/** Code examples */
const USAGE_CODE = `@if (loading()) {
  <app-typing-indicator
    [showAvatar]="true"
    [text]="'Thinking...'"
  />
}`;

/**
 * TypingIndicator Documentation Component
 */
@Component({
  selector: 'app-typing-indicator-doc',
  templateUrl: './typing-indicator-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    TypingIndicatorComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocControlToggleComponent,
    DocSliderControlComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-typing-indicator-doc block',
  },
})
export class TypingIndicatorDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly accessibility = ACCESSIBILITY;
  readonly usageCode = USAGE_CODE;

  // Configuration
  showAvatar = signal(true);
  showText = signal(false);
  text = signal('Thinking...');
  dotCount = signal(3);
}
