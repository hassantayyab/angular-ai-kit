---
paths: '**/*.component.ts'
---

# Component Structure & Patterns

## Standard Component Template

```typescript
import { Component, ChangeDetectionStrategy, ViewEncapsulation, computed, input, output, signal, inject } from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

@Component({
  selector: 'ai-component-name',
  // standalone is default in Angular v20+, don't set it explicitly
  imports: [
    /* only what's needed */
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None, // Required for Tailwind
  template: `
    <div [class]="containerClasses()">
      <!-- Content -->
    </div>
  `,
  styles: [
    `
      /* Use CSS only, not SCSS */
      /* Minimal styles - prefer Tailwind classes */
    `,
  ],
  // Use host object instead of @HostBinding/@HostListener
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleEnter()',
  },
})
export class ComponentName {
  // Use inject() function instead of constructor injection
  private service = inject(SomeService);
  private document = inject(DOCUMENT); // For DOM access (SSR-safe)

  // Inputs (with transforms if needed)
  prop = input.required<Type>();
  optionalProp = input<Type>(defaultValue);
  customClasses = input<string>(''); // Allow class override

  // Input transforms (for type coercion)
  disabled = input(false, {
    transform: (value: boolean | string) => value === '' || value === true,
  });

  // Outputs
  event = output<Type>();

  // Computed signals (dynamic classes, derived state)
  containerClasses = computed(() => {
    return cn('ai-component-base', { 'ai-component-disabled': this.disabled() }, this.customClasses());
  });

  hostClasses = computed(() => 'ai-component-wrapper');

  // Regular signals (local state)
  state = signal<Type>(initialValue);

  // Effects (minimize usage)
  constructor() {
    effect(() => {
      // Only for side effects, not for computed values
      const value = this.prop();
      // React to changes
    });
  }

  // Methods
  handleClick() {
    this.event.emit(/* data */);
  }

  handleEnter() {
    // Keyboard accessibility
  }
}
```

## Component Organization

Components should be organized in this order:

1. **Imports** - Angular core, third-party, local imports
2. **Component decorator** - Metadata configuration
3. **Injected services** - Using inject() function
4. **Inputs** - Required first, then optional
5. **Outputs** - Event emitters
6. **Computed signals** - Derived state
7. **Regular signals** - Local state
8. **Constructor** - Only for effects
9. **Lifecycle methods** - If needed (rare with signals)
10. **Public methods** - Component API
11. **Private methods** - Internal helpers

## Input Patterns

### Required Inputs

```typescript
// Required input
message = input.required<ChatMessage>();

// Required with description
/**
 * The chat message to display.
 */
message = input.required<ChatMessage>();
```

### Optional Inputs with Defaults

```typescript
// Simple default
showAvatar = input(false);
placeholder = input('Type a message...');

// Complex default
config = input<ChatConfig>({
  maxLength: 1000,
  enableMarkdown: true,
});
```

### Input Transforms

```typescript
// Boolean coercion (handles [disabled] and disabled)
disabled = input(false, {
  transform: (value: boolean | string) => value === '' || value === true,
});

// Number coercion
maxLength = input(1000, {
  transform: (value: string | number) => (typeof value === 'string' ? parseInt(value, 10) : value),
});

// Array normalization
items = input<string[]>([], {
  transform: (value: string | string[]) => (Array.isArray(value) ? value : [value]),
});
```

### Custom Classes Input

```typescript
// Always allow parent to override classes
customClasses = input<string>('');

// Use in computed signal
containerClasses = computed(() => {
  return cn(
    'base-classes',
    { 'conditional-class': this.condition() },
    this.customClasses(), // Parent override
  );
});
```

## Output Patterns

### Simple Events

```typescript
// Basic event
click = output<void>();

// Event with data
messageSubmit = output<string>();
messageCopy = output<ChatMessage>();

// Emit
handleSubmit() {
  this.messageSubmit.emit(this.message());
}
```

### Typed Events

```typescript
// Define event type
export interface MessageEvent {
  message: ChatMessage;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

// Use in output
messageEvent = output<MessageEvent>();

// Emit with type safety
handleMessage() {
  this.messageEvent.emit({
    message: this.message(),
    timestamp: new Date(),
  });
}
```

## Computed Signal Patterns

### Dynamic Classes

```typescript
containerClasses = computed(() => {
  return cn(
    // Base classes
    'flex items-center gap-2 rounded-lg p-4',

    // Conditional classes
    {
      'bg-blue-500 text-white': this.variant() === 'primary',
      'bg-gray-100 text-gray-900': this.variant() === 'secondary',
      'opacity-50 cursor-not-allowed': this.disabled(),
    },

    // Size variants
    {
      'text-sm': this.size() === 'sm',
      'text-base': this.size() === 'md',
      'text-lg': this.size() === 'lg',
    },

    // Parent override
    this.customClasses(),
  );
});
```

### Derived State

````typescript
// Compute from multiple signals
displayText = computed(() => {
  const text = this.text();
  const maxLength = this.maxLength();

  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
});

// Compute complex state
messageMetadata = computed(() => {
  const message = this.message();
  return {
    wordCount: message.content.split(' ').length,
    charCount: message.content.length,
    hasCode: message.content.includes('```'),
    timestamp: message.timestamp.toLocaleString(),
  };
});
````

## Signal State Patterns

### Local State

```typescript
// Simple state
isExpanded = signal(false);
currentTab = signal<'chat' | 'settings'>('chat');

// Complex state
state = signal<{
  loading: boolean;
  error: string | null;
  data: ChatMessage[];
}>({
  loading: false,
  error: null,
  data: [],
});
```

### State Updates

```typescript
// Update with set
toggleExpanded() {
  this.isExpanded.set(!this.isExpanded());
}

// Update with update
addMessage(message: ChatMessage) {
  this.state.update((current) => ({
    ...current,
    data: [...current.data, message],
  }));
}

// ❌ Don't use mutate
addMessage(message: ChatMessage) {
  this.state.mutate((current) => {
    current.data.push(message);
  });
}
```

## Effect Patterns

### Side Effects Only

```typescript
constructor() {
  // Log changes (debugging only, remove before production)
  effect(() => {
    console.log('Message changed:', this.message());
  });

  // Sync with external API
  effect(() => {
    const message = this.message();
    this.analyticsService.trackMessage(message);
  });

  // Cleanup
  effect((onCleanup) => {
    const subscription = this.service.subscribe();

    onCleanup(() => {
      subscription.unsubscribe();
    });
  });
}
```

### ❌ Don't Use Effects for Computed Values

```typescript
// ❌ Bad: Using effect for derived state
constructor() {
  effect(() => {
    this.displayText.set(this.text().toUpperCase());
  });
}

// ✅ Good: Use computed instead
displayText = computed(() => this.text().toUpperCase());
```

## Host Bindings

```typescript
@Component({
  selector: 'ai-button',
  host: {
    // Class bindings
    '[class]': 'hostClasses()',
    '[class.disabled]': 'disabled()',

    // Attribute bindings
    '[attr.role]': '"button"',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',

    // Event listeners
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleEnter()',
    '(keydown.space)': 'handleSpace()',
  },
})
export class ButtonComponent {}
```

## Content Projection

### Basic Projection

```typescript
@Component({
  selector: 'ai-card',
  template: `
    <div class="ai-card">
      <ng-content />
    </div>
  `,
})
export class CardComponent {}

// Usage: <ai-card>Content here</ai-card>
```

### Named Slots

```typescript
@Component({
  selector: 'ai-card',
  template: `
    <div class="ai-card">
      <div class="ai-card-header">
        <ng-content select="[header]" />
      </div>
      <div class="ai-card-body">
        <ng-content />
      </div>
      <div class="ai-card-footer">
        <ng-content select="[footer]" />
      </div>
    </div>
  `,
})
export class CardComponent {}

// Usage:
// <ai-card>
//   <div header>Header content</div>
//   Main content
//   <div footer>Footer content</div>
// </ai-card>
```

## Template Patterns

### Control Flow

```typescript
template: `
  <!-- Conditionals -->
  @if (loading()) {
    <ai-spinner />
  } @else if (error()) {
    <ai-error-message [error]="error()" />
  } @else {
    <ai-message-list [messages]="messages()" />
  }

  <!-- Loops -->
  @for (message of messages(); track message.id) {
    <ai-message-bubble [message]="message" />
  } @empty {
    <p>No messages yet</p>
  }

  <!-- Switch -->
  @switch (role()) {
    @case ('user') {
      <ai-user-avatar />
    }
    @case ('assistant') {
      <ai-assistant-avatar />
    }
    @default {
      <ai-default-avatar />
    }
  }
`;
```

### Class and Style Bindings

```typescript
template: `
  <!-- Class binding -->
  <div [class]="containerClasses()">Content</div>

  <!-- Individual class binding -->
  <div [class.active]="isActive()" [class.disabled]="disabled()">Button</div>

  <!-- Style binding -->
  <div [style.width.px]="width()" [style.color]="textColor()">Styled</div>

  <!-- ❌ Don't use ngClass or ngStyle -->
  <div [ngClass]="{'active': isActive()}">Bad</div>
  <div [ngStyle]="{'width': width()}">Bad</div>
`;
```

## Common Component Patterns

### Container/Presentational Split

```typescript
// Container (smart component)
@Component({
  selector: 'ai-chat-container',
  template: ` <ai-chat-view [messages]="messages()" [loading]="loading()" (messageSubmit)="handleMessageSubmit($event)" /> `,
})
export class ChatContainerComponent {
  private chatService = inject(ChatService);

  messages = signal<ChatMessage[]>([]);
  loading = signal(false);

  async handleMessageSubmit(content: string) {
    this.loading.set(true);
    const response = await this.chatService.sendMessage(content);
    this.messages.update((msgs) => [...msgs, response]);
    this.loading.set(false);
  }
}

// Presentational (dumb component)
@Component({
  selector: 'ai-chat-view',
  template: `
    <ai-message-list [messages]="messages()" />
    <ai-message-input [disabled]="loading()" (messageSubmit)="messageSubmit.emit($event)" />
  `,
})
export class ChatViewComponent {
  messages = input.required<ChatMessage[]>();
  loading = input(false);
  messageSubmit = output<string>();
}
```
