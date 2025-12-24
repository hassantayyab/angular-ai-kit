/**
 * Text Formatting Utilities
 *
 * Provides text formatting functions for truncation, capitalization, and more.
 */

/**
 * Truncate text to specified length with ellipsis
 */
export function truncate(
  text: string,
  maxLength: number,
  suffix = '...',
): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize first letter of string
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert text to title case
 */
export function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}

/**
 * Extract initials from a name
 */
export function getInitials(name: string, maxLength = 2): string {
  const words = name.trim().split(/\s+/);
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.slice(0, maxLength).join('');
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Strip HTML tags from text
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Highlight search term in text
 */
export function highlight(
  text: string,
  search: string,
  className = 'highlight',
): string {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, 'gi');
  return text.replace(regex, `<span class="${className}">$1</span>`);
}

/**
 * Word count
 */
export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Character count (excluding whitespace)
 */
export function charCount(text: string, includeSpaces = true): number {
  if (includeSpaces) {
    return text.length;
  }
  return text.replace(/\s/g, '').length;
}
