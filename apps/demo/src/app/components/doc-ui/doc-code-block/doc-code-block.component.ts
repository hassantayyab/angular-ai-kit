import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { CodeHighlightService } from '@angular-ai-kit/core';
import { HlmIconImports } from '@angular-ai-kit/spartan-ui/icon';
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
 * Uses CodeHighlightService for consistent syntax highlighting with
 * enhanced Angular template support.
 */
@Component({
  selector: 'app-doc-code-block',
  templateUrl: './doc-code-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmIconImports],
  viewProviders: [provideIcons({ lucideCopy, lucideCheck })],
  host: {
    class: 'app-doc-code-block block',
  },
})
export class DocCodeBlockComponent {
  private platformId = inject(PLATFORM_ID);
  private highlightService = inject(CodeHighlightService);

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

    const result = this.highlightService.highlight(code, lang);

    // Split into lines and wrap each with line number
    const lines = result.value.split('\n');
    return lines
      .map((line, i) => {
        const lineNum = i + 1;
        return `<span class="doc-code-line"><span class="doc-code-line-number">${lineNum}</span><span class="doc-code-line-content">${line || ' '}</span></span>`;
      })
      .join('');
  });

  /** Copy code to clipboard */
  copyCode(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
