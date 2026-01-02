import hljs from 'highlight.js';
import { cn } from '@angular-ai-kit/utils';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  PLATFORM_ID,
  SimpleChanges,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { IconButtonComponent } from '../../ui/icon-button';

/**
 * Language display name mapping
 */
const LANGUAGE_MAP: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  py: 'Python',
  python: 'Python',
  rb: 'Ruby',
  ruby: 'Ruby',
  sh: 'Bash',
  bash: 'Bash',
  shell: 'Shell',
  yml: 'YAML',
  yaml: 'YAML',
  md: 'Markdown',
  markdown: 'Markdown',
  json: 'JSON',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  less: 'Less',
  sql: 'SQL',
  graphql: 'GraphQL',
  go: 'Go',
  rust: 'Rust',
  java: 'Java',
  kotlin: 'Kotlin',
  swift: 'Swift',
  cpp: 'C++',
  c: 'C',
  csharp: 'C#',
  cs: 'C#',
  php: 'PHP',
  plaintext: 'Text',
  text: 'Text',
  diff: 'Diff',
  dockerfile: 'Dockerfile',
  xml: 'XML',
  toml: 'TOML',
  ini: 'INI',
};

/**
 * Code Block Component
 *
 * Displays code with syntax highlighting, language label, and copy button.
 * Uses highlight.js for syntax highlighting.
 *
 * @example
 * ```html
 * <ai-code-block
 *   [code]="codeString"
 *   language="typescript"
 *   [showCopyButton]="true"
 *   (copy)="handleCopy($event)"
 * />
 * ```
 */
@Component({
  selector: 'ai-code-block',
  templateUrl: './code-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconButtonComponent],
  host: {
    class: 'ai-code-block-host block',
  },
})
export class CodeBlockComponent implements AfterViewInit, OnChanges {
  private platformId = inject(PLATFORM_ID);
  private codeRef = viewChild<ElementRef<HTMLElement>>('codeElement');

  // ==========================================
  // Inputs
  // ==========================================

  /** The code to display */
  code = input.required<string>();

  /** Programming language for syntax highlighting */
  language = input<string>('plaintext');

  /** Whether to show the copy button */
  showCopyButton = input<boolean>(true);

  /** Whether to show line numbers */
  showLineNumbers = input<boolean>(false);

  /** Custom CSS classes */
  customClasses = input<string>('');

  // ==========================================
  // Outputs
  // ==========================================

  /** Emitted when code is copied */
  copy = output<string>();

  // ==========================================
  // State
  // ==========================================

  /** Whether copy was just clicked */
  justCopied = signal(false);

  /** Highlighted HTML content */
  highlightedCode = signal<string>('');

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Display name for the language */
  displayLanguage = computed(() => {
    const lang = this.language().toLowerCase();
    return LANGUAGE_MAP[lang] || lang;
  });

  /** Icon for copy button */
  copyIcon = computed(() => (this.justCopied() ? 'lucideCheck' : 'lucideCopy'));

  /** Copy button aria label */
  copyLabel = computed(() => (this.justCopied() ? 'Copied!' : 'Copy code'));

  /** Wrapper classes */
  wrapperClasses = computed(() =>
    cn('ai-code-block-wrapper', this.customClasses())
  );

  /** Copy button classes */
  copyButtonClasses = computed(() =>
    cn({
      'text-foreground': this.justCopied(),
    })
  );

  /** Code lines for line numbers */
  codeLines = computed(() => {
    const code = this.code();
    return code.split('\n');
  });

  // ==========================================
  // Lifecycle
  // ==========================================

  ngAfterViewInit(): void {
    this.highlightCode();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code'] || changes['language']) {
      this.highlightCode();
    }
  }

  // ==========================================
  // Private Methods
  // ==========================================

  /** Apply syntax highlighting to code */
  private highlightCode(): void {
    const code = this.code();
    const lang = this.language();

    if (!code) {
      this.highlightedCode.set('');
      return;
    }

    try {
      let highlighted: string;
      if (lang && hljs.getLanguage(lang)) {
        highlighted = hljs.highlight(code, { language: lang }).value;
      } else {
        highlighted = hljs.highlightAuto(code).value;
      }
      this.highlightedCode.set(highlighted);
    } catch {
      // Fallback to escaped plain text
      this.highlightedCode.set(this.escapeHtml(code));
    }
  }

  /** Escape HTML special characters */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================
  // Event Handlers
  // ==========================================

  /** Handle copy button click */
  handleCopy(): void {
    const code = this.code();
    this.copy.emit(code);

    if (isPlatformBrowser(this.platformId) && navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        this.justCopied.set(true);
        setTimeout(() => this.justCopied.set(false), 2000);
      });
    }
  }
}
