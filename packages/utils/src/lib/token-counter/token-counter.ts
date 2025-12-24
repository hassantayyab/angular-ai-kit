/**
 * Token Counter Utility
 *
 * Approximates the number of tokens in a text string.
 * Based on GPT tokenization (1 token ≈ 4 characters for English).
 *
 * @example
 * ```typescript
 * const text = 'Hello, how are you today?';
 * const tokens = countTokens(text); // ≈ 7 tokens
 *
 * const tokens = countTokens(text, 'gpt-4'); // ≈ 7 tokens
 * const tokens = countTokens(text, 'claude'); // ≈ 6 tokens (different estimation)
 * ```
 */

/**
 * Supported model types for token counting
 */
export type TokenModel = 'gpt-3.5' | 'gpt-4' | 'claude' | 'default';

/**
 * Token estimation ratios for different models
 */
const TOKEN_RATIOS: Record<TokenModel, number> = {
  'gpt-3.5': 4, // 1 token ≈ 4 characters
  'gpt-4': 4, // 1 token ≈ 4 characters
  claude: 5, // Claude uses slightly different tokenization
  default: 4,
};

/**
 * Count approximate tokens in text
 *
 * @param text - The text to count tokens for
 * @param model - The model to use for estimation
 * @returns Approximate token count
 *
 * @example
 * ```typescript
 * countTokens('Hello world') // ≈ 3 tokens
 * countTokens('Hello world', 'gpt-4') // ≈ 3 tokens
 * countTokens('Hello world', 'claude') // ≈ 2 tokens
 * ```
 */
export function countTokens(
  text: string,
  model: TokenModel = 'default',
): number {
  if (!text || text.length === 0) {
    return 0;
  }

  const ratio = TOKEN_RATIOS[model] || TOKEN_RATIOS.default;

  // Basic approximation: characters / ratio
  const baseCount = Math.ceil(text.length / ratio);

  // Adjust for whitespace (whitespace tokens are cheaper)
  const whitespaceCount = (text.match(/\s+/g) || []).length;
  const adjustedCount = baseCount - Math.floor(whitespaceCount / 2);

  return Math.max(1, adjustedCount);
}

/**
 * Count tokens in multiple messages
 *
 * @param messages - Array of message strings
 * @param model - The model to use for estimation
 * @returns Total token count
 *
 * @example
 * ```typescript
 * const messages = ['Hello', 'How are you?', 'I am fine'];
 * countMessagesTokens(messages) // ≈ 8 tokens
 * ```
 */
export function countMessagesTokens(
  messages: string[],
  model: TokenModel = 'default',
): number {
  return messages.reduce((total, message) => {
    return total + countTokens(message, model);
  }, 0);
}

/**
 * Check if text exceeds token limit
 *
 * @param text - The text to check
 * @param limit - Maximum token limit
 * @param model - The model to use for estimation
 * @returns True if text exceeds limit
 *
 * @example
 * ```typescript
 * const longText = 'A'.repeat(10000);
 * exceedsTokenLimit(longText, 1000) // true
 * ```
 */
export function exceedsTokenLimit(
  text: string,
  limit: number,
  model: TokenModel = 'default',
): boolean {
  return countTokens(text, model) > limit;
}

/**
 * Truncate text to fit within token limit
 *
 * @param text - The text to truncate
 * @param limit - Maximum token limit
 * @param model - The model to use for estimation
 * @param suffix - Suffix to add when truncated
 * @returns Truncated text
 *
 * @example
 * ```typescript
 * const longText = 'A'.repeat(1000);
 * truncateToTokenLimit(longText, 100) // Returns truncated text with '...'
 * ```
 */
export function truncateToTokenLimit(
  text: string,
  limit: number,
  model: TokenModel = 'default',
  suffix = '...',
): string {
  if (countTokens(text, model) <= limit) {
    return text;
  }

  const ratio = TOKEN_RATIOS[model] || TOKEN_RATIOS.default;
  const suffixTokens = countTokens(suffix, model);
  const contentLimit = limit - suffixTokens;
  const contentLength = contentLimit * ratio;

  return text.substring(0, contentLength) + suffix;
}
