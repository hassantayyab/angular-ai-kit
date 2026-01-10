import { StreamingTextComponent } from '@angular-ai-kit/core';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
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

/** API Input properties */
const INPUTS: ApiProperty[] = [
  {
    name: 'content',
    type: 'string',
    default: 'required',
    description: 'Full text content to display',
  },
  {
    name: 'isStreaming',
    type: 'boolean',
    default: 'false',
    description: 'Whether text is currently streaming',
  },
  {
    name: 'speed',
    type: 'number',
    default: '30',
    description: 'Milliseconds per character',
  },
  {
    name: 'showCursor',
    type: 'boolean',
    default: 'true',
    description: 'Show blinking cursor during streaming',
  },
  {
    name: 'cursorChar',
    type: 'string',
    default: "'▊'",
    description: 'Character used for cursor',
  },
  {
    name: 'customClasses',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

/** Install command */
const INSTALL_CODE =
  "import { StreamingTextComponent } from '@angular-ai-kit/core';";

/** Accessibility features */
const ACCESSIBILITY = [
  'Uses aria-live for screen reader announcements',
  'Cursor animation respects prefers-reduced-motion',
  'Content remains accessible during streaming',
  'Supports keyboard focus management',
];

/** Code examples */
const USAGE_CODE = `<ai-streaming-text
  [content]="message.content"
  [isStreaming]="message.status === 'streaming'"
  [speed]="30"
  [showCursor]="true"
/>`;

/**
 * StreamingText Documentation Component
 */
@Component({
  selector: 'app-streaming-text-doc',
  templateUrl: './streaming-text-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    StreamingTextComponent,
    HlmButton,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocControlToggleComponent,
    DocSliderControlComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-streaming-text-doc block',
  },
})
export class StreamingTextDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly usageCode = USAGE_CODE;
  readonly installCode = INSTALL_CODE;
  readonly accessibility = ACCESSIBILITY;

  // Reference to streaming text component
  private streamingText = viewChild(StreamingTextComponent);

  // Demo content
  demoContent = signal(
    'Hello! I am an AI assistant. This text is being streamed character by character to simulate how AI responses appear in real-time chat applications.'
  );

  // Configuration
  isStreaming = signal(true);
  showCursor = signal(true);
  speed = signal(30);

  // Restart streaming demo
  restartDemo(): void {
    this.isStreaming.set(true);
    this.streamingText()?.reset();
  }

  // Toggle streaming
  toggleStreaming(): void {
    this.isStreaming.update((v) => !v);
  }
}
