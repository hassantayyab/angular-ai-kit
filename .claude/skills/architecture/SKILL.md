---
name: architecture
description: Use when organizing code or making architectural decisions. Triggers on "barrel export", "index.ts", "file structure", "naming convention", "module boundary", "dependency injection", "InjectionToken", "scalability", or organization questions.
allowed-tools:
  - Read
  - Glob
  - Grep
---

# Architecture: Scalability & Maintainability Principles

**This library must be SCALABLE and MAINTAINABLE for long-term success.**

## Scalability Principles

### 1. Component Composition Over Inheritance

- Use `hostDirectives` for cross-cutting concerns
- Prefer composition patterns over complex inheritance hierarchies
- Keep components small and focused (single responsibility)

**Example:**

```typescript
// Good: Composition with host directives
@Component({
  selector: 'ai-copyable-code-block',
  hostDirectives: [
    {
      directive: CopyToClipboardDirective,
      inputs: ['text'],
    },
  ],
})
export class CopyableCodeBlockComponent {}

// Avoid: Deep inheritance hierarchies
class BaseComponent {}
class InteractiveComponent extends BaseComponent {}
class CopyableComponent extends InteractiveComponent {}
```

### 2. Module Boundaries & Dependency Management

- Enforce strict module boundaries in Nx
- Prevent circular dependencies
- Use DI tokens for extensibility (don't hardcode implementations)
- Keep libraries loosely coupled

**Example:**

```typescript
// Avoid: Hardcoded dependencies
import { SpecificChatService } from '../../../services/specific-chat.service';

// Good: Use injection tokens
export const CHAT_CONFIG = new InjectionToken<ChatConfig>('ChatConfig');

@Component({
  selector: 'ai-chat',
})
export class ChatComponent {
  private config = inject(CHAT_CONFIG);
}
```

### 3. Performance from Day One

- OnPush change detection everywhere
- Minimize signal computations (avoid nested computed signals)
- Lazy load when possible
- Tree-shakable exports (use barrel exports carefully)

**Example:**

```typescript
// Good: Efficient computed signals
containerClasses = computed(() => {
  return cn('base-class', { active: this.isActive() });
});

// Avoid: Nested computed signals
containerClasses = computed(() => {
  const nestedComputed = computed(() => this.isActive());
  return cn('base-class', { active: nestedComputed() });
});
```

### 4. API Design

- Design public APIs with backwards compatibility in mind
- Use semantic versioning
- Deprecate gracefully (don't break existing users)
- Keep internal APIs private (use TypeScript private/protected)

## Maintainability Principles

### 1. Code Organization

- Maximum 500 lines per file (refactor if larger)
- Group related functionality into feature folders
- Clear separation: components / directives / services / types / utils
- Consistent file naming: `feature-name.component.ts`, `feature-name.service.ts`

**File Structure:**

```text
message-bubble/
  message-bubble.component.ts (max 500 lines)
  message-bubble.types.ts
  message-bubble-helpers.ts
  index.ts
```

### 2. Type Safety

- TypeScript strict mode enabled
- No `any` types (use `unknown` if truly needed)
- Use discriminated unions for complex types
- Define clear interfaces for all public APIs

### 3. Documentation

- JSDoc comments for all public APIs
- Include usage examples in comments
- Document complex logic with inline comments
- Keep README and PLAN.md up to date

### 4. Consistency

- Follow established patterns (don't invent new ones unnecessarily)
- Use shared utilities from `@angular-ai-kit/utils`
- Consistent naming conventions throughout
- Automated formatting with Prettier

### 5. Error Handling

- Fail gracefully with user-friendly messages
- Log errors appropriately (but remove before production)
- Provide fallback UI states
- Don't swallow errors silently

**Example:**

```typescript
async function loadMessages() {
  try {
    const messages = await this.chatService.getMessages();
    this.messages.set(messages);
  } catch (error) {
    console.error('Failed to load messages:', error);
    this.error.set('Unable to load messages. Please try again.');
    // Show fallback UI
    this.showErrorState.set(true);
  }
}
```

## Dependency Injection Patterns

### Service Injection

```typescript
// Use inject() function
export class ChatComponent {
  private chatService = inject(ChatService);
  private config = inject(CHAT_CONFIG);
}

// Don't use constructor injection
export class ChatComponent {
  constructor(private chatService: ChatService) {}
}
```

### Optional Dependencies

```typescript
export class ChatComponent {
  // Optional service with fallback
  private analytics = inject(AnalyticsService, { optional: true });

  logEvent(event: string) {
    this.analytics?.trackEvent(event);
  }
}
```

### Self Injection (for host directive access)

```typescript
export class ChatComponent {
  private self = inject(ElementRef);
  private host = inject(HostComponent, { optional: true, host: true });
}
```

## Barrel Exports (CRITICAL)

**ALWAYS create an `index.ts` file in every folder that contains components, directives, services, or types.**

### Why Barrel Exports?

- Clean, organized imports for consumers
- Single entry point for each module
- Easy refactoring without breaking imports
- Tree-shaking support

### Rules

1. **Every component/directive/service folder MUST have an `index.ts`**
2. **Export only public API** - don't export internal helpers
3. **Use named exports** - avoid default exports
4. **Re-export from parent index.ts** - create a hierarchy

### Examples

```typescript
// components/chat/message-bubble/index.ts
export { MessageBubbleComponent } from './message-bubble.component';
export type { MessageBubbleConfig } from './message-bubble.types';

// components/chat/index.ts
export * from './message-bubble';
export * from './message-list';
export * from './chat-container';

// components/index.ts
export * from './chat';
export * from './input';
export * from './display';

// Main library index.ts (public API)
export * from './lib/components';
export * from './lib/directives';
export * from './lib/types';

// Don't re-export internal helpers
export * from './internal-helper'; // Keep internal
```

### Folder Structure

```text
message-bubble/
  message-bubble.component.ts
  message-bubble.component.html
  message-bubble.types.ts (optional)
  index.ts                 <- REQUIRED
```

## Naming Conventions

### Files

- **Components:** `kebab-case.component.ts` (e.g., `message-bubble.component.ts`)
- **Templates:** `kebab-case.component.html` (e.g., `message-bubble.component.html`)
- **Directives:** `kebab-case.directive.ts` (e.g., `copy-to-clipboard.directive.ts`)
- **Services:** `kebab-case.service.ts` (e.g., `chat.service.ts`)
- **Types:** `kebab-case.types.ts` (e.g., `chat-message.types.ts`)
- **Utils:** `kebab-case.ts` (e.g., `token-counter.ts`)
- **Barrel exports:** `index.ts` in each folder

### Classes & Interfaces

- **Components:** `PascalCase` + `Component` suffix (e.g., `MessageBubbleComponent`)
- **Directives:** `PascalCase` + `Directive` suffix (e.g., `CopyToClipboardDirective`)
- **Services:** `PascalCase` + `Service` suffix (e.g., `ChatService`)
- **Interfaces:** `PascalCase` (e.g., `ChatMessage`, `MessageRole`)

### Selectors

- **Components:** `ai-kebab-case` prefix (e.g., `ai-message-bubble`)
- **Directives:** `aiCamelCase` prefix (e.g., `aiCopyToClipboard`)

## File Size Limits

- **Maximum 500 lines per file**
- If a file exceeds 500 lines, refactor by:
  - Extracting helper functions to separate files
  - Splitting complex components into smaller ones
  - Moving types to `.types.ts` files
  - Creating utility functions in `@angular-ai-kit/utils`

## Component Communication Patterns

### Parent to Child: Inputs

```typescript
@Component({
  selector: 'ai-child',
})
export class ChildComponent {
  data = input.required<string>();
}

// Usage: <ai-child [data]="parentData" />
```

### Child to Parent: Outputs

```typescript
@Component({
  selector: 'ai-child',
})
export class ChildComponent {
  action = output<string>();

  emitAction() {
    this.action.emit('data');
  }
}

// Usage: <ai-child (action)="handleAction($event)" />
```

### Sibling Communication: Service

```typescript
@Injectable({ providedIn: 'root' })
export class SharedStateService {
  private state = signal<string>('');
  readonly state$ = this.state.asReadonly();

  updateState(value: string) {
    this.state.set(value);
  }
}
```

### Cross-Component: Injection Tokens

```typescript
export const CHAT_CONTEXT = new InjectionToken<ChatContext>('ChatContext');

// Provider component
@Component({
  selector: 'ai-chat-provider',
  providers: [
    {
      provide: CHAT_CONTEXT,
      useValue: { conversationId: '123' },
    },
  ],
})
export class ChatProviderComponent {}

// Consumer component
@Component({
  selector: 'ai-message',
})
export class MessageComponent {
  private context = inject(CHAT_CONTEXT);
}
```

## Lazy Loading Pattern

```typescript
// routes.ts
export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.component').then((m) => m.ChatComponent),
  },
];
```

## Performance Optimization Checklist

- [ ] OnPush change detection on all components
- [ ] Minimize effect() usage
- [ ] Use computed() for derived values
- [ ] Avoid unnecessary signal reads in templates
- [ ] Lazy load routes and heavy components
- [ ] Use NgOptimizedImage for images
- [ ] Virtual scrolling for long lists
- [ ] Track by function for \*ngFor (if used, prefer @for with track)
- [ ] Defer loading of non-critical components
- [ ] Code splitting at route level
- [ ] Tree-shakable exports
- [ ] Remove unused imports
- [ ] Optimize bundle size
