import hljs from 'highlight.js';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * DocCodeBlock Component
 *
 * Displays code snippets with syntax highlighting and copy button.
 * Uses highlight.js for proper code syntax highlighting.
 */
@Component({
  selector: 'app-doc-code-block',
  templateUrl: './doc-code-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-doc-code-block block',
  },
})
export class DocCodeBlockComponent {
  private platformId = inject(PLATFORM_ID);

  /** Code content to display */
  code = input.required<string>();

  /** Language for syntax highlighting (e.g., 'typescript', 'html', 'bash') */
  language = input<string>('typescript');

  /** Whether to use pre/code for multi-line (true) or just code for single-line (false) */
  multiline = input(false);

  /** Whether code was just copied */
  copied = signal(false);

  /** Highlighted code HTML with line numbers */
  highlightedCodeWithLines = computed(() => {
    const code = this.code();
    const lang = this.language();

    let highlighted: string;
    try {
      if (lang && hljs.getLanguage(lang)) {
        highlighted = hljs.highlight(code, { language: lang }).value;
      } else {
        highlighted = hljs.highlightAuto(code).value;
      }
    } catch {
      highlighted = this.escapeHtml(code);
    }

    // Split into lines and wrap each with line number
    const lines = highlighted.split('\n');
    return lines
      .map((line, i) => {
        const lineNum = i + 1;
        return `<span class="doc-code-line"><span class="doc-code-line-number">${lineNum}</span><span class="doc-code-line-content">${line || ' '}</span></span>`;
      })
      .join('');
  });

  /** Escape HTML special characters */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /** Copy code to clipboard */
  copyCode(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
