# Component Pattern Examples

## Input Transform Examples

### Boolean Coercion

```typescript
// Handles both [disabled]="true" and disabled attribute
disabled = input(false, {
  transform: (value: boolean | string) => value === '' || value === true,
});
```

### Number Coercion

```typescript
maxLength = input(1000, {
  transform: (value: string | number) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
});
```

### Array Normalization

```typescript
items = input<string[]>([], {
  transform: (value: string | string[]) =>
    Array.isArray(value) ? value : [value],
});
```

## Output Pattern Examples

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
export interface MessageEvent {
  message: ChatMessage;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

messageEvent = output<MessageEvent>();

handleMessage() {
  this.messageEvent.emit({
    message: this.message(),
    timestamp: new Date(),
  });
}
```

## Computed Signal Examples

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
    this.customClasses()
  );
});
```

### Derived State

````typescript
// Truncate text
displayText = computed(() => {
  const text = this.text();
  const maxLength = this.maxLength();

  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
});

// Complex metadata
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

## Signal State Examples

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

// Update with update (immutable)
addMessage(message: ChatMessage) {
  this.state.update((current) => ({
    ...current,
    data: [...current.data, message],
  }));
}

// DON'T use mutate
addMessage(message: ChatMessage) {
  this.state.mutate((current) => {
    current.data.push(message); // BAD
  });
}
```

## Host Binding Examples

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
