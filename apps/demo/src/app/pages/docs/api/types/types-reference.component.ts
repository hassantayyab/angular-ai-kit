import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/**
 * Types Reference
 *
 * Documentation for all exported TypeScript types.
 */
@Component({
  selector: 'app-types-reference',
  templateUrl: './types-reference.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DocSectionComponent, DocCodeBlockComponent, RouterLink],
})
export class TypesReferenceComponent {
  // Core message types
  readonly messageTypesCode = `// Message Types
export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  /** Unique identifier for the message */
  id: string;

  /** Role of the message sender */
  role: MessageRole;

  /** Message content (plain text or markdown) */
  content: string;

  /** When the message was created */
  timestamp: Date;

  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

export interface UserMessage extends ChatMessage {
  role: 'user';
}

export interface AssistantMessage extends ChatMessage {
  role: 'assistant';
  /** Model used to generate response */
  model?: string;
  /** Token usage statistics */
  usage?: TokenUsage;
}

export interface SystemMessage extends ChatMessage {
  role: 'system';
}`;

  // Conversation types
  readonly conversationTypesCode = `// Conversation Types
export interface Conversation {
  /** Unique identifier */
  id: string;

  /** Display title (auto-generated or user-defined) */
  title: string;

  /** All messages in the conversation */
  messages: ChatMessage[];

  /** When conversation was created */
  createdAt: Date;

  /** When conversation was last updated */
  updatedAt: Date;

  /** Optional conversation metadata */
  metadata?: ConversationMetadata;
}

export interface ConversationMetadata {
  /** Model used for this conversation */
  model?: string;

  /** System prompt for the conversation */
  systemPrompt?: string;

  /** Temperature setting */
  temperature?: number;

  /** Max tokens setting */
  maxTokens?: number;

  /** Custom tags for organization */
  tags?: string[];
}`;

  // Token usage types
  readonly tokenTypesCode = `// Token Usage Types
export interface TokenUsage {
  /** Tokens in the prompt */
  promptTokens: number;

  /** Tokens in the completion */
  completionTokens: number;

  /** Total tokens used */
  totalTokens: number;
}

export interface TokenLimits {
  /** Maximum context window size */
  maxContextTokens: number;

  /** Maximum output tokens */
  maxOutputTokens: number;

  /** Tokens reserved for system prompt */
  reservedTokens?: number;
}`;

  // Streaming types
  readonly streamingTypesCode = `// Streaming Types
export interface StreamingOptions {
  /** Enable streaming mode */
  enabled: boolean;

  /** Callback for each chunk */
  onChunk?: (chunk: string) => void;

  /** Callback when complete */
  onComplete?: (fullContent: string) => void;

  /** Callback on error */
  onError?: (error: Error) => void;

  /** Optional abort signal */
  abortSignal?: AbortSignal;
}

export interface StreamChunk {
  /** Chunk content */
  content: string;

  /** Is this the final chunk? */
  done: boolean;

  /** Accumulated content so far */
  accumulated?: string;
}`;

  // Component input types
  readonly componentInputsCode = `// Component Input Types
export interface AiResponseInputs {
  /** Message content to display */
  content: string;

  /** Whether response is currently streaming */
  isStreaming?: boolean;

  /** Show copy button */
  showCopy?: boolean;

  /** Show regenerate button */
  showRegenerate?: boolean;

  /** Custom CSS classes */
  customClasses?: string;
}

export interface ChatInputInputs {
  /** Placeholder text */
  placeholder?: string;

  /** Disable the input */
  disabled?: boolean;

  /** Maximum character length */
  maxLength?: number;

  /** Auto-focus on mount */
  autoFocus?: boolean;

  /** Custom CSS classes */
  customClasses?: string;
}

export interface CodeBlockInputs {
  /** Code content */
  code: string;

  /** Programming language */
  language?: string;

  /** Show line numbers */
  showLineNumbers?: boolean;

  /** Show copy button */
  showCopyButton?: boolean;

  /** Highlight specific lines */
  highlightLines?: number[];

  /** Custom CSS classes */
  customClasses?: string;
}`;

  // Event types
  readonly eventTypesCode = `// Event Types
export interface MessageSubmitEvent {
  /** Message content */
  content: string;

  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

export interface FeedbackEvent {
  /** Message ID receiving feedback */
  messageId: string;

  /** Feedback type */
  type: 'positive' | 'negative';

  /** Optional feedback text */
  comment?: string;
}

export interface CopyEvent {
  /** Copied content */
  content: string;

  /** Source element (message, code block, etc.) */
  source: 'message' | 'code' | 'custom';
}

export interface RegenerateEvent {
  /** Message ID to regenerate */
  messageId: string;

  /** Previous content (for comparison) */
  previousContent?: string;
}`;

  // Config types
  readonly configTypesCode = `// Configuration Types
export interface AiKitConfig {
  /** Avatar configuration */
  avatar?: AvatarConfig;

  /** Code highlighting configuration */
  codeHighlight?: CodeHighlightConfig;

  /** Markdown rendering configuration */
  markdown?: MarkdownConfig;

  /** Theme configuration */
  theme?: ThemeConfig;
}

export interface AvatarConfig {
  /** URL for user avatar */
  userAvatar?: string;

  /** URL for assistant avatar */
  assistantAvatar?: string;

  /** Show avatars */
  showAvatar?: boolean;

  /** Avatar size */
  size?: 'sm' | 'md' | 'lg';
}

export interface CodeHighlightConfig {
  /** Syntax highlighting theme */
  theme?: string;

  /** Show line numbers by default */
  showLineNumbers?: boolean;

  /** Wrap long lines */
  wrapLongLines?: boolean;

  /** Languages to support */
  languages?: string[];
}

export interface MarkdownConfig {
  /** Enable sanitization */
  sanitize?: boolean;

  /** Target for links */
  linkTarget?: '_blank' | '_self';

  /** Enable GitHub Flavored Markdown */
  enableGfm?: boolean;

  /** Enable syntax highlighting in code blocks */
  enableCodeHighlight?: boolean;
}

export interface ThemeConfig {
  /** Default theme */
  defaultTheme?: 'light' | 'dark' | 'system';

  /** Allow theme switching */
  allowToggle?: boolean;

  /** Persist theme preference */
  persistPreference?: boolean;
}`;

  // Utility types
  readonly utilityTypesCode = `// Utility Types

/** Make all properties optional recursively */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Make all properties readonly recursively */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/** Extract message by role */
export type MessageByRole<R extends MessageRole> = Extract<
  ChatMessage,
  { role: R }
>;

/** Nullable type helper */
export type Nullable<T> = T | null;

/** Optional type helper */
export type Optional<T> = T | undefined;

/** Async result with error handling */
export type AsyncResult<T, E = Error> = Promise<
  { success: true; data: T } | { success: false; error: E }
>;`;
}
