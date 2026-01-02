import type { DOMPurify as DOMPurifyType } from 'dompurify';
import hljs from 'highlight.js';
import { Marked, Renderer } from 'marked';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

// SVG icon for copy button
const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

/**
 * Service for parsing markdown content with syntax highlighting.
 *
 * Uses marked for markdown parsing, highlight.js for code syntax highlighting,
 * and DOMPurify for HTML sanitization (browser only).
 *
 * Features:
 * - Professional code blocks with header bar, language label, and copy button
 * - GitHub Dark syntax highlighting theme
 * - Full GFM (GitHub Flavored Markdown) support
 *
 * @example
 * ```typescript
 * const html = this.markdownService.parse('# Hello **World**');
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MarkdownService {
  private marked: Marked;
  private platformId = inject(PLATFORM_ID);
  private purify: DOMPurifyType | null = null;

  constructor() {
    // Create custom renderer for code blocks
    const renderer = new Renderer();

    // Custom code block renderer with header bar
    renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
      const language = lang || 'plaintext';
      const displayLang = this.getDisplayLanguage(language);

      // Highlight the code
      let highlighted: string;
      try {
        if (lang && hljs.getLanguage(lang)) {
          highlighted = hljs.highlight(text, { language: lang }).value;
        } else {
          highlighted = hljs.highlightAuto(text).value;
        }
      } catch {
        highlighted = this.escapeHtml(text);
      }

      // Encode the raw code for the copy button data attribute
      const encodedCode = encodeURIComponent(text);

      return `<div class="ai-code-block-wrapper">
        <div class="ai-code-block-header">
          <span class="ai-code-block-language">${displayLang}</span>
          <button class="ai-code-block-copy" data-code="${encodedCode}" title="Copy code">
            ${COPY_ICON}
          </button>
        </div>
        <pre><code class="hljs language-${language}">${highlighted}</code></pre>
      </div>`;
    };

    // Configure marked with custom renderer
    this.marked = new Marked({
      renderer,
      gfm: true, // GitHub Flavored Markdown
      breaks: true, // Convert \n to <br>
    });

    // Load DOMPurify only in browser
    if (isPlatformBrowser(this.platformId)) {
      import('dompurify').then((module) => {
        this.purify = module.default;
      });
    }
  }

  /** Get display name for a language. */
  private getDisplayLanguage(lang: string): string {
    const langMap: Record<string, string> = {
      js: 'javascript',
      ts: 'typescript',
      py: 'python',
      rb: 'ruby',
      sh: 'bash',
      yml: 'yaml',
      md: 'markdown',
      plaintext: 'text',
    };
    return langMap[lang] || lang;
  }

  /** Escape HTML special characters. */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Sanitize HTML content using DOMPurify (SSR-safe).
   * Falls back to returning HTML as-is during SSR or before DOMPurify loads.
   */
  private sanitize(html: string): string {
    // Use DOMPurify if available (browser only)
    if (this.purify) {
      return this.purify.sanitize(html, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ['class', 'data-code', 'title'], // Allow code block attributes
        ADD_TAGS: ['hlm-icon', 'ng-icon'], // Allow Angular components
      });
    }
    // SSR or before DOMPurify loads - return as-is
    // Note: Consumer should sanitize if using SSR
    return html;
  }

  /**
   * Parse markdown string to sanitized HTML.
   *
   * @param markdown - The markdown string to parse
   * @returns Sanitized HTML string
   */
  parse(markdown: string): string {
    if (!markdown) return '';

    try {
      const html = this.marked.parse(markdown) as string;
      return this.sanitize(html);
    } catch {
      // Fallback to sanitized raw input on parse error
      return this.sanitize(markdown);
    }
  }

  /**
   * Parse markdown asynchronously for large content.
   *
   * @param markdown - The markdown string to parse
   * @returns Promise resolving to sanitized HTML string
   */
  async parseAsync(markdown: string): Promise<string> {
    if (!markdown) return '';

    try {
      const html = await this.marked.parse(markdown);
      return this.sanitize(html as string);
    } catch {
      // Fallback to sanitized raw input on parse error
      return this.sanitize(markdown);
    }
  }

  /**
   * Extract plain text from markdown (strips all formatting).
   *
   * @param markdown - The markdown string
   * @returns Plain text without formatting
   */
  toPlainText(markdown: string): string {
    if (!markdown) return '';

    // Remove code blocks
    let text = markdown.replace(/```[\s\S]*?```/g, '');
    // Remove inline code
    text = text.replace(/`[^`]+`/g, '');
    // Remove links but keep text
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    // Remove images
    text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');
    // Remove headers
    text = text.replace(/^#{1,6}\s+/gm, '');
    // Remove bold/italic
    text = text.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1');
    // Remove blockquotes
    text = text.replace(/^>\s+/gm, '');
    // Remove horizontal rules
    text = text.replace(/^[-*_]{3,}$/gm, '');
    // Collapse multiple newlines
    text = text.replace(/\n{3,}/g, '\n\n');

    return text.trim();
  }
}
