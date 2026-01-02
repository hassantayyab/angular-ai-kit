import { CodeBlockComponent } from '@angular-ai-kit/core';
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
    name: 'code',
    type: 'string',
    default: 'required',
    description: 'The code to display',
  },
  {
    name: 'language',
    type: 'string',
    default: "'plaintext'",
    description: 'Programming language for syntax highlighting',
  },
  {
    name: 'showCopyButton',
    type: 'boolean',
    default: 'true',
    description: 'Whether to show the copy button',
  },
  {
    name: 'showLineNumbers',
    type: 'boolean',
    default: 'false',
    description: 'Whether to show line numbers',
  },
];

/** API Output properties */
const OUTPUTS: ApiProperty[] = [
  {
    name: 'copy',
    type: 'EventEmitter<string>',
    default: '-',
    description: 'Emitted when code is copied to clipboard',
  },
];

/** Install command */
const INSTALL_CODE =
  "import { CodeBlockComponent } from '@angular-ai-kit/core';";

/** Features list */
const FEATURES = [
  'Syntax highlighting with highlight.js',
  'Language detection and labeling',
  'Copy button with visual feedback',
  'Optional line numbers',
  'Support for 50+ programming languages',
];

/** Accessibility features */
const ACCESSIBILITY = [
  'Copy button has aria-label',
  'Language label for context',
  'Focus visible on copy button',
  'Keyboard accessible',
];

/** Code examples */
const USAGE_CODE = `<ai-code-block
  [code]="codeString"
  language="typescript"
  [showCopyButton]="true"
  [showLineNumbers]="false"
  (copy)="handleCopy($event)"
/>`;

/**
 * CodeBlock Documentation Component
 */
@Component({
  selector: 'app-code-block-doc',
  templateUrl: './code-block-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CodeBlockComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocControlToggleComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-code-block-doc block',
  },
})
export class CodeBlockDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly usageCode = USAGE_CODE;
  readonly installCode = INSTALL_CODE;
  readonly features = FEATURES;
  readonly accessibility = ACCESSIBILITY;

  // Demo code samples
  readonly typescriptCode = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`<h1>{{ title() }}</h1>\`,
})
export class ExampleComponent {
  title = signal('Hello, World!');
}`;

  readonly htmlCode = `<div class="container">
  <header>
    <h1>Welcome</h1>
  </header>
  <main>
    <p>Content goes here</p>
  </main>
</div>`;

  // Configuration
  showCopyButton = signal(true);
  showLineNumbers = signal(false);
  selectedLanguage = signal<'typescript' | 'html'>('typescript');

  // Get current demo code
  get demoCode(): string {
    return this.selectedLanguage() === 'typescript'
      ? this.typescriptCode
      : this.htmlCode;
  }

  // Handle copy event
  handleCopy(code: string): void {
    console.log('Code copied:', code.substring(0, 50) + '...');
  }
}
