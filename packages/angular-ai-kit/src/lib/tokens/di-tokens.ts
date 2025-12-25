/**
 * Angular AI Kit - Dependency Injection Tokens
 *
 * These injection tokens provide extensibility points for services and configuration.
 * They allow users to provide their own implementations without modifying the library.
 */
import { InjectionToken } from '@angular/core';
import type { MarkdownOptions, ThemeConfig } from '../types';

/**
 * Abstract ChatService interface for type safety
 */
export interface ChatService {
  /**
   * Send a message to the chat service
   */
  sendMessage(content: string): Promise<string>;

  /**
   * Get chat history
   */
  getHistory(): Promise<Array<{ role: string; content: string }>>;

  /**
   * Clear chat history
   */
  clearHistory(): void;
}

/**
 * Abstract StreamingService interface for type safety
 */
export interface StreamingService {
  /**
   * Stream a response from the AI service
   */
  stream(content: string): AsyncIterableIterator<string>;

  /**
   * Stop the current stream
   */
  stop(): void;
}

/**
 * Token counter function type
 */
export type TokenCounterFn = (text: string, model?: string) => number;

/**
 * Injection token for chat service
 *
 * @example
 * ```typescript
 * // Provide a custom chat service
 * {
 *   provide: CHAT_SERVICE,
 *   useClass: MyChatService
 * }
 * ```
 */
export const CHAT_SERVICE = new InjectionToken<ChatService>('CHAT_SERVICE', {
  providedIn: 'root',
  factory: () => {
    throw new Error(
      'CHAT_SERVICE not provided. Please provide a ChatService implementation.'
    );
  },
});

/**
 * Injection token for streaming service
 *
 * @example
 * ```typescript
 * // Provide a custom streaming service
 * {
 *   provide: STREAMING_SERVICE,
 *   useClass: MyStreamingService
 * }
 * ```
 */
export const STREAMING_SERVICE = new InjectionToken<StreamingService>(
  'STREAMING_SERVICE',
  {
    providedIn: 'root',
    factory: () => {
      throw new Error(
        'STREAMING_SERVICE not provided. Please provide a StreamingService implementation.'
      );
    },
  }
);

/**
 * Injection token for token counter utility
 *
 * @example
 * ```typescript
 * // Provide a custom token counter
 * {
 *   provide: TOKEN_COUNTER,
 *   useValue: (text: string) => Math.ceil(text.length / 4)
 * }
 * ```
 */
export const TOKEN_COUNTER = new InjectionToken<TokenCounterFn>(
  'TOKEN_COUNTER',
  {
    providedIn: 'root',
    factory: () => {
      // Default implementation: approximate GPT tokens (1 token ≈ 4 characters)
      return (text: string) => Math.ceil(text.length / 4);
    },
  }
);

/**
 * Injection token for markdown options
 *
 * @example
 * ```typescript
 * // Provide custom markdown options
 * {
 *   provide: MARKDOWN_OPTIONS,
 *   useValue: {
 *     breaks: true,
 *     gfm: true,
 *     sanitize: true
 *   }
 * }
 * ```
 */
export const MARKDOWN_OPTIONS = new InjectionToken<MarkdownOptions>(
  'MARKDOWN_OPTIONS',
  {
    providedIn: 'root',
    factory: () => ({
      breaks: true,
      gfm: true,
      sanitize: true,
      highlight: true,
    }),
  }
);

/**
 * Injection token for theme configuration
 *
 * @example
 * ```typescript
 * // Provide custom theme config
 * {
 *   provide: THEME_CONFIG,
 *   useValue: {
 *     mode: 'dark',
 *     customColors: {
 *       primary: { 500: '#3b82f6' }
 *     }
 *   }
 * }
 * ```
 */
export const THEME_CONFIG = new InjectionToken<ThemeConfig>('THEME_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    mode: 'auto',
  }),
});
