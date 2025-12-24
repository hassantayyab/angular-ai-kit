/**
 * Angular AI Kit - Streaming Types
 */

/**
 * Streaming state
 */
export type StreamingState =
  | 'idle'
  | 'connecting'
  | 'streaming'
  | 'completed'
  | 'error';

/**
 * Streaming status interface
 */
export interface StreamingStatus {
  state: StreamingState;
  progress?: number;
  bytesReceived?: number;
  error?: Error;
}

/**
 * Streaming options
 */
export interface StreamingOptions {
  /**
   * Speed of the typewriter effect in milliseconds per character
   * @default 30
   */
  speed?: number;

  /**
   * Whether to show cursor while streaming
   * @default true
   */
  showCursor?: boolean;

  /**
   * Cursor character
   * @default '▊'
   */
  cursorChar?: string;

  /**
   * Whether to enable streaming
   * @default true
   */
  enabled?: boolean;

  /**
   * Callback when streaming starts
   */
  onStart?: () => void;

  /**
   * Callback for each chunk received
   */
  onChunk?: (chunk: string) => void;

  /**
   * Callback when streaming completes
   */
  onComplete?: (fullContent: string) => void;

  /**
   * Callback when streaming errors
   */
  onError?: (error: Error) => void;
}

/**
 * Streaming chunk
 */
export interface StreamingChunk {
  content: string;
  index: number;
  isComplete: boolean;
}

/**
 * Stream event types
 */
export type StreamEventType = 'start' | 'chunk' | 'complete' | 'error';

/**
 * Stream event
 */
export interface StreamEvent {
  type: StreamEventType;
  data?: unknown;
  timestamp: Date;
}
