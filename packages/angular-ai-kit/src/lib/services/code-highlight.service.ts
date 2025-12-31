import hljs from 'highlight.js';
import { Injectable } from '@angular/core';

/**
 * Code highlighting result
 */
export interface HighlightResult {
  /** The highlighted HTML string */
  value: string;
  /** The detected or specified language */
  language: string;
}

/**
 * Code Highlighting Service
 *
 * Provides consistent syntax highlighting across the library using highlight.js.
 * Includes enhanced support for Angular template syntax.
 *
 * Features:
 * - Syntax highlighting for 190+ languages via highlight.js
 * - Enhanced Angular template syntax highlighting
 * - Support for Angular property bindings `[prop]`
 * - Support for Angular event bindings `(event)`
 * - Support for Angular two-way bindings `[(ngModel)]`
 * - Support for Angular control flow syntax `@if`, `@for`, `@switch`, `@defer`
 *
 * @example
 * ```typescript
 * const result = this.codeHighlightService.highlight(code, 'typescript');
 * // Or with auto-detection
 * const result = this.codeHighlightService.highlight(code);
 * ```
 */
@Injectable({ providedIn: 'root' })
export class CodeHighlightService {
  /**
   * Language aliases for common shorthand names
   */
  private readonly languageAliases: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    rb: 'ruby',
    sh: 'bash',
    yml: 'yaml',
    md: 'markdown',
    angular: 'xml', // Angular templates use XML-like syntax
    ng: 'xml',
  };

  /**
   * Get display name for a language
   */
  getDisplayLanguage(lang: string): string {
    const displayMap: Record<string, string> = {
      js: 'javascript',
      ts: 'typescript',
      py: 'python',
      rb: 'ruby',
      sh: 'bash',
      yml: 'yaml',
      md: 'markdown',
      plaintext: 'text',
      angular: 'angular',
      ng: 'angular',
      xml: 'html',
    };
    return displayMap[lang] || lang;
  }

  /**
   * Resolve language alias to actual highlight.js language
   */
  private resolveLanguage(lang: string): string {
    return this.languageAliases[lang.toLowerCase()] || lang;
  }

  /**
   * Highlight code with syntax highlighting
   *
   * @param code - The source code to highlight
   * @param language - Optional language identifier (auto-detects if not provided)
   * @returns HighlightResult with highlighted HTML and detected language
   */
  highlight(code: string, language?: string): HighlightResult {
    if (!code) {
      return { value: '', language: language || 'plaintext' };
    }

    const resolvedLang = language ? this.resolveLanguage(language) : undefined;
    let result: HighlightResult;

    try {
      if (resolvedLang && hljs.getLanguage(resolvedLang)) {
        const highlighted = hljs.highlight(code, { language: resolvedLang });
        result = {
          value: highlighted.value,
          language: language || resolvedLang,
        };
      } else {
        const highlighted = hljs.highlightAuto(code);
        result = {
          value: highlighted.value,
          language: highlighted.language || 'plaintext',
        };
      }
    } catch {
      result = {
        value: this.escapeHtml(code),
        language: language || 'plaintext',
      };
    }

    // Note: Angular-specific syntax enhancement is available but disabled by default
    // to maintain consistent simple highlighting. Enable if needed:
    // if (this.isAngularTemplate(language)) {
    //   result.value = this.enhanceAngularSyntax(result.value);
    // }

    return result;
  }

  /**
   * Check if the language is an Angular template
   */
  private isAngularTemplate(language?: string): boolean {
    if (!language) return false;
    const angularLangs = ['html', 'xml', 'angular', 'ng', 'htm'];
    return angularLangs.includes(language.toLowerCase());
  }

  /**
   * Enhance highlighted HTML with Angular-specific syntax highlighting
   *
   * This post-processes the highlight.js output to add classes for:
   * - Property bindings: [property]
   * - Event bindings: (event)
   * - Two-way bindings: [(ngModel)]
   * - Control flow: @if, @for, @switch, @defer, @let
   * - Template references: #ref
   *
   * Note: highlight.js outputs HTML like:
   *   [<span class="hljs-attr">property</span>]="value"
   * So we need to match around the existing hljs spans.
   */
  private enhanceAngularSyntax(html: string): string {
    // Two-way bindings: [(ngModel)]="value" - must be processed FIRST
    // Pattern: [(<span class="hljs-attr">name</span>)]
    html = html.replace(
      /\[\(<span class="hljs-attr">([^<]+)<\/span>\)\]/g,
      '<span class="hljs-ng-binding">[(</span><span class="hljs-ng-twoway">$1</span><span class="hljs-ng-binding">)]</span>'
    );

    // Property bindings: [property]="value"
    // Pattern: [<span class="hljs-attr">property</span>]
    html = html.replace(
      /\[<span class="hljs-attr">([^<]+)<\/span>\]/g,
      '<span class="hljs-ng-binding">[</span><span class="hljs-ng-property">$1</span><span class="hljs-ng-binding">]</span>'
    );

    // Event bindings: (event)="handler"
    // Pattern: (<span class="hljs-attr">event</span>)
    html = html.replace(
      /\(<span class="hljs-attr">([^<]+)<\/span>\)/g,
      '<span class="hljs-ng-binding">(</span><span class="hljs-ng-event">$1</span><span class="hljs-ng-binding">)</span>'
    );

    // Control flow: @if, @for, @switch, @defer, @let, @else, @empty, @case, @default, @placeholder, @loading, @error
    html = html.replace(
      /(@)(if|for|switch|defer|let|else|empty|case|default|placeholder|loading|error)\b/g,
      '<span class="hljs-ng-control">$1$2</span>'
    );

    // Template reference variables: #ref (outside of hljs spans)
    html = html.replace(
      /(#)([a-zA-Z][a-zA-Z0-9_]*)\b/g,
      '<span class="hljs-ng-ref">$1$2</span>'
    );

    // Structural directives: *ngIf, *ngFor (legacy)
    // Pattern: *<span class="hljs-attr">ngIf</span> or just *ngIf
    html = html.replace(
      /\*<span class="hljs-attr">([^<]+)<\/span>/g,
      '<span class="hljs-ng-structural">*$1</span>'
    );
    html = html.replace(
      /(\*)(ng[A-Za-z]+)\b/g,
      '<span class="hljs-ng-structural">$1$2</span>'
    );

    return html;
  }

  /**
   * Escape HTML special characters
   */
  escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Check if a language is supported by highlight.js
   */
  isLanguageSupported(language: string): boolean {
    const resolved = this.resolveLanguage(language);
    return !!hljs.getLanguage(resolved);
  }

  /**
   * Get list of all supported languages
   */
  getSupportedLanguages(): string[] {
    return hljs.listLanguages();
  }
}
