---
paths: '**/*.ts'
---

# TypeScript Best Practices

## Core TypeScript Rules

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Use meaningful variable and function names
- Use interfaces for type definitions
- Use optional chaining and nullish coalescing
- Validate inputs when necessary
- No console.logs or debug code
- Handle edge cases gracefully
- Provide meaningful error messages

## Type Safety Requirements

- TypeScript strict mode enabled
- No `any` types (use `unknown` if truly needed)
- Use discriminated unions for complex types
- Define clear interfaces for all public APIs

## Example: Discriminated Unions

```typescript
// Good: Type-safe message handling
export type ChatMessage =
  | { role: 'user'; content: string; timestamp: Date }
  | { role: 'assistant'; content: string; timestamp: Date; model?: string }
  | { role: 'system'; content: string; timestamp: Date };

// Usage
function processMessage(message: ChatMessage) {
  switch (message.role) {
    case 'user':
      // TypeScript knows this is a user message
      return handleUserMessage(message.content);
    case 'assistant':
      // TypeScript knows model is available here
      return handleAssistantMessage(message.content, message.model);
    case 'system':
      return handleSystemMessage(message.content);
  }
}
```

## Example: Interface Definitions

```typescript
// Public API interfaces
export interface ChatComponentInputs {
  messages: ChatMessage[];
  loading?: boolean;
  placeholder?: string;
  customClasses?: string;
}

export interface ChatComponentOutputs {
  messageSubmit: EventEmitter<string>;
  messageCopy: EventEmitter<string>;
}

// Internal types
interface ComponentState {
  isStreaming: boolean;
  currentMessage: string;
  error: Error | null;
}
```

## Example: Type Guards

```typescript
// Type guard functions
export function isUserMessage(message: ChatMessage): message is UserMessage {
  return message.role === 'user';
}

export function isAssistantMessage(
  message: ChatMessage
): message is AssistantMessage {
  return message.role === 'assistant';
}

// Usage
if (isUserMessage(message)) {
  // TypeScript knows message.role is 'user'
  console.log(message.content);
}
```

## Example: Generic Utilities

```typescript
// Reusable generic types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncResult<T> = Promise<T | Error>;

// Readonly wrapper
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P];
};
```

## Naming Conventions

```typescript
// Interfaces: PascalCase
interface ChatMessage {}

// Types: PascalCase
type MessageRole = 'user' | 'assistant' | 'system';

// Classes: PascalCase
class ChatService {}

// Variables: camelCase
const messageList = [];
const isLoading = false;

// Constants: UPPER_SNAKE_CASE or camelCase
const MAX_MESSAGE_LENGTH = 1000;
const defaultConfig = {};

// Functions: camelCase
function processMessage() {}

// Enums: PascalCase for enum, UPPER_CASE for values
enum MessageType {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}
```

## Optional Chaining and Nullish Coalescing

```typescript
// Optional chaining
const messageContent = conversation?.messages?.[0]?.content;

// Nullish coalescing (use ?? instead of ||)
const displayName = user.name ?? 'Anonymous';
const timeout = config.timeout ?? 5000;

// Combined
const firstMessage = conversation?.messages?.[0]?.content ?? 'No messages';
```

## Error Handling

```typescript
// Type-safe error handling
export class ChatError extends Error {
  constructor(
    message: string,
    public code: 'NETWORK_ERROR' | 'VALIDATION_ERROR' | 'UNKNOWN_ERROR',
    public details?: unknown
  ) {
    super(message);
    this.name = 'ChatError';
  }
}

// Usage
try {
  await sendMessage(content);
} catch (error) {
  if (error instanceof ChatError) {
    // Handle specific error
    console.error(`Chat error: ${error.code}`, error.details);
  } else if (error instanceof Error) {
    // Handle generic error
    console.error(error.message);
  } else {
    // Unknown error
    console.error('An unknown error occurred');
  }
}
```

## Function Type Definitions

```typescript
// Function types
type MessageHandler = (message: ChatMessage) => void;
type AsyncMessageHandler = (message: ChatMessage) => Promise<void>;
type MessageTransformer = (message: string) => string;

// Generic function types
type Comparator<T> = (a: T, b: T) => number;
type Predicate<T> = (value: T) => boolean;
type Mapper<T, U> = (value: T) => U;
```

## Utility Type Usage

```typescript
// Pick specific properties
type MessagePreview = Pick<ChatMessage, 'role' | 'content'>;

// Omit specific properties
type MessageWithoutTimestamp = Omit<ChatMessage, 'timestamp'>;

// Partial (all properties optional)
type PartialConfig = Partial<ChatConfig>;

// Required (all properties required)
type RequiredConfig = Required<ChatConfig>;

// Readonly
type ImmutableMessage = Readonly<ChatMessage>;

// Record
type MessageMap = Record<string, ChatMessage>;

// Extract union members
type UserOrAssistant = Extract<MessageRole, 'user' | 'assistant'>;

// Exclude union members
type NonSystemRole = Exclude<MessageRole, 'system'>;
```

## Template Literal Types

```typescript
// Type-safe event names
type EventName = `on${Capitalize<'message' | 'error' | 'complete'>}`;
// Results in: 'onMessage' | 'onError' | 'onComplete'

// Type-safe CSS classes
type Variant = 'primary' | 'secondary' | 'danger';
type Size = 'sm' | 'md' | 'lg';
type ButtonClass = `ai-button-${Variant}-${Size}`;
```

## JSDoc Comments for Public APIs

````typescript
/**
 * Displays a chat message with appropriate styling based on the role.
 *
 * @example
 * ```typescript
 * <ai-message-bubble
 *   [message]="message"
 *   [showAvatar]="true"
 *   (copy)="handleCopy($event)" />
 * ```
 */
@Component({
  selector: 'ai-message-bubble',
})
export class MessageBubbleComponent {
  /**
   * The chat message to display.
   */
  message = input.required<ChatMessage>();

  /**
   * Whether to show the user/assistant avatar.
   * @default false
   */
  showAvatar = input(false);

  /**
   * Emitted when the user clicks the copy button.
   */
  copy = output<string>();
}
````

## Avoid Common Pitfalls

```typescript
// ❌ Don't use any
function processData(data: any) {
  return data.value;
}

// ✅ Use unknown and type guards
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
  throw new Error('Invalid data format');
}

// ❌ Don't use non-null assertion unless absolutely necessary
const element = document.querySelector('.chat')!;

// ✅ Handle null case
const element = document.querySelector('.chat');
if (element) {
  // Use element
}

// ❌ Don't use type assertions without reason
const message = data as ChatMessage;

// ✅ Use type guards
if (isChatMessage(data)) {
  const message = data;
}
```
