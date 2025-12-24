/**
 * Message Validation Utilities
 */

/**
 * Validation result type
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate message content
 */
export function validateMessage(
  content: string,
  maxLength = 10000
): ValidationResult {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (content.length > maxLength) {
    return {
      valid: false,
      error: `Message exceeds maximum length of ${maxLength} characters`,
    };
  }

  return { valid: true };
}

/**
 * Check if message contains only whitespace
 */
export function isEmptyMessage(content: string): boolean {
  return !content || content.trim().length === 0;
}

/**
 * Sanitize message content (remove dangerous characters/scripts)
 */
export function sanitizeMessage(content: string): string {
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .trim();
}
