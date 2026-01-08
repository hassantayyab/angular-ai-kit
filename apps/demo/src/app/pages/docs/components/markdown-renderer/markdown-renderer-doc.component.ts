import { MarkdownRendererComponent } from '@angular-ai-kit/core';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ApiProperty,
  DocApiTableComponent,
  DocCodeBlockComponent,
  DocDemoCardComponent,
  DocFeaturesListComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

const INPUTS: ApiProperty[] = [
  {
    name: 'content',
    type: 'string',
    default: 'required',
    description: 'Markdown content to render',
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
    name: 'codeBlockCopy',
    type: 'EventEmitter<string>',
    default: '-',
    description: 'Emitted when code block is copied',
  },
];

const INSTALL_CODE =
  "import { MarkdownRendererComponent } from '@angular-ai-kit/core';";

const FEATURES = [
  'Full GFM (GitHub Flavored Markdown) support',
  'Code blocks with syntax highlighting',
  'Copy buttons on code blocks',
  'Safe HTML sanitization',
  'Tables, lists, blockquotes support',
];

const USAGE_CODE = `<ai-markdown-renderer
  [content]="markdownContent"
  (codeBlockCopy)="handleCopy($event)"
/>`;

const DEMO_MARKDOWN = `# Hello Markdown

This is a **bold** statement and this is *italic*.

## Code Example

\`\`\`typescript
const greeting = 'Hello, World!';
console.log(greeting);
\`\`\`

## Lists

- First item
- Second item
- Third item

> This is a blockquote
`;

@Component({
  selector: 'app-markdown-renderer-doc',
  templateUrl: './markdown-renderer-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MarkdownRendererComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocFeaturesListComponent,
  ],
})
export class MarkdownRendererDocComponent {
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly usageCode = USAGE_CODE;
  readonly installCode = INSTALL_CODE;
  readonly features = FEATURES;
  readonly demoMarkdown = DEMO_MARKDOWN;
}
