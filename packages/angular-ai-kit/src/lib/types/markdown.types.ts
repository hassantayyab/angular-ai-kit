/**
 * Angular AI Kit - Markdown Types
 */

/**
 * Markdown rendering options
 */
export interface MarkdownOptions {
  /**
   * Enable GFM (GitHub Flavored Markdown)
   * @default true
   */
  gfm?: boolean;

  /**
   * Enable line breaks
   * @default true
   */
  breaks?: boolean;

  /**
   * Sanitize HTML output for security
   * @default true
   */
  sanitize?: boolean;

  /**
   * Enable syntax highlighting for code blocks
   * @default true
   */
  highlight?: boolean;

  /**
   * Custom highlight function
   */
  highlightFn?: (code: string, lang: string) => string;

  /**
   * Base URL for relative links
   */
  baseUrl?: string;

  /**
   * Custom renderer options
   */
  renderer?: {
    /**
     * Custom heading renderer
     */
    heading?: (text: string, level: number) => string;

    /**
     * Custom link renderer
     */
    link?: (href: string, title: string, text: string) => string;

    /**
     * Custom image renderer
     */
    image?: (href: string, title: string, text: string) => string;

    /**
     * Custom code renderer
     */
    code?: (code: string, language: string) => string;
  };
}

/**
 * Markdown parse result
 */
export interface MarkdownParseResult {
  /**
   * Rendered HTML
   */
  html: string;

  /**
   * Extracted metadata (frontmatter)
   */
  metadata?: Record<string, unknown>;

  /**
   * Table of contents
   */
  toc?: Array<{
    level: number;
    text: string;
    id: string;
  }>;
}
