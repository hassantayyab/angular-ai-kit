import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
import { AiResponseComponent } from '../../../../components/ai-response';
import {
  ApiProperty,
  DocApiTableComponent,
  DocCodeBlockComponent,
  DocControlToggleComponent,
  DocDemoCardComponent,
  DocSectionComponent,
  DocSliderControlComponent,
} from '../../../../components/doc-ui';

/** API Input properties */
const INPUTS: ApiProperty[] = [
  {
    name: 'content',
    type: 'string',
    default: 'required',
    description: 'Markdown content to display',
  },
  {
    name: 'isStreaming',
    type: 'boolean',
    default: 'false',
    description: 'Whether content is currently streaming',
  },
  {
    name: 'speed',
    type: 'number',
    default: '20',
    description: 'Streaming speed (ms per character)',
  },
  {
    name: 'showActions',
    type: 'boolean',
    default: 'true',
    description: 'Show action buttons (copy, regenerate, thumbs)',
  },
  {
    name: 'showCursor',
    type: 'boolean',
    default: 'true',
    description: 'Show blinking cursor during streaming',
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
    description: 'Emits full content when copy is clicked',
  },
  {
    name: 'regenerate',
    type: 'void',
    default: '-',
    description: 'Emits when regenerate button is clicked',
  },
  {
    name: 'thumbsUp',
    type: 'void',
    default: '-',
    description: 'Emits when thumbs up is clicked',
  },
  {
    name: 'thumbsDown',
    type: 'void',
    default: '-',
    description: 'Emits when thumbs down is clicked',
  },
  {
    name: 'streamComplete',
    type: 'void',
    default: '-',
    description: 'Emits when streaming animation completes',
  },
];

/** Code example */
const USAGE_CODE = `<app-ai-response
  [content]="response"
  [isStreaming]="isLoading"
  [speed]="20"
  [showActions]="true"
  (copy)="handleCopy($event)"
  (regenerate)="handleRegenerate()"
  (thumbsUp)="handleThumbsUp()"
  (thumbsDown)="handleThumbsDown()"
/>`;

/** Demo markdown content */
const DEMO_MARKDOWN = `# Hello, World!

This is a **markdown** response with full formatting support.

## Code Example

Here's a TypeScript function:

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet('Angular');
console.log(message);
\`\`\`

## Features

- Full **GFM** (GitHub Flavored Markdown) support
- Syntax highlighting for code blocks
- Copy button on each code block
- Action buttons (copy, regenerate, thumbs up/down)

> This is a blockquote with some important information.

Inline code like \`const x = 1\` is also supported.`;

/**
 * AI Response Documentation Component
 */
@Component({
  selector: 'app-ai-response-doc',
  templateUrl: './ai-response-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    AiResponseComponent,
    HlmButton,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocControlToggleComponent,
    DocSliderControlComponent,
  ],
  host: {
    class: 'app-ai-response-doc block',
  },
})
export class AiResponseDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly usageCode = USAGE_CODE;

  // Reference to component
  private aiResponse = viewChild(AiResponseComponent);

  // Demo content
  demoContent = signal(DEMO_MARKDOWN);

  // Configuration
  isStreaming = signal(false);
  showActions = signal(true);
  showCursor = signal(true);
  speed = signal(20);

  // Restart streaming demo
  restartDemo(): void {
    this.aiResponse()?.reset();
    this.isStreaming.set(true);
  }

  // Toggle streaming
  toggleStreaming(): void {
    this.isStreaming.update((v) => !v);
  }

  // Handle copy
  handleCopy(content: string): void {
    console.log('Copied:', content.substring(0, 50) + '...');
  }

  // Handle regenerate
  handleRegenerate(): void {
    console.log('Regenerate clicked');
  }

  // Handle thumbs up
  handleThumbsUp(): void {
    console.log('Thumbs up!');
  }

  // Handle thumbs down
  handleThumbsDown(): void {
    console.log('Thumbs down!');
  }
}
