---
name: component-patterns
description: Use when creating, modifying, or refactoring Angular components. Triggers on "create component", "add input", "add output", "signal", "computed", "host binding", "content projection", "Spartan UI", or component structure questions.
allowed-tools:
  - Read
  - Edit
  - Write
  - Glob
  - Grep
---

# Component Structure & Patterns

## Quick Reference

- **Spartan UI reference**: See [spartan-ui.md](spartan-ui.md)
- **Code examples**: See [examples.md](examples.md)
- **Advanced patterns**: See [patterns.md](patterns.md)

## Essential Rules

### 1. Use Separate Template Files (CRITICAL)

```typescript
// CORRECT
@Component({
  selector: 'ai-message-bubble',
  templateUrl: './message-bubble.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBubbleComponent {}

// WRONG - No inline templates
@Component({
  selector: 'ai-message-bubble',
  template: `<div>...</div>`,
})
```

### 2. Prefer Spartan UI Components

Always check if a Spartan UI component exists before building custom. Import from `@angular-ai-kit/spartan-ui/*`.

### 3. Standard Component Structure

```typescript
import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'ai-component-name',
  templateUrl: './component-name.component.html',
  imports: [
    /* only what's needed */
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'handleClick()',
  },
})
export class ComponentName {
  // 1. Injected services
  private service = inject(SomeService);

  // 2. Inputs (required first, then optional)
  prop = input.required<Type>();
  customClasses = input<string>('');

  // 3. Outputs
  event = output<Type>();

  // 4. Computed signals
  containerClasses = computed(() =>
    cn('base', { disabled: this.disabled() }, this.customClasses())
  );

  // 5. Regular signals
  state = signal<Type>(initialValue);

  // 6. Methods
  handleClick() {
    this.event.emit(/* data */);
  }
}
```

## Component Organization Order

1. **Imports** - Angular core, third-party, local
2. **Component decorator** - Metadata
3. **Injected services** - Using `inject()`
4. **Inputs** - Required first, then optional
5. **Outputs** - Event emitters
6. **Computed signals** - Derived state
7. **Regular signals** - Local state
8. **Constructor** - Only for effects
9. **Lifecycle methods** - If needed
10. **Public methods** - Component API
11. **Private methods** - Internal helpers

## Input Patterns

### Required vs Optional

```typescript
// Required
message = input.required<ChatMessage>();

// Optional with default
showAvatar = input(false);
placeholder = input('Type a message...');
```

### Input Transforms

```typescript
// Boolean coercion
disabled = input(false, {
  transform: (value: boolean | string) => value === '' || value === true,
});

// Number coercion
maxLength = input(1000, {
  transform: (value: string | number) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
});
```

### Custom Classes Input

```typescript
customClasses = input<string>('');

containerClasses = computed(() => cn('base-classes', this.customClasses()));
```

## Output Patterns

```typescript
// Simple event
click = output<void>();

// Event with data
messageSubmit = output<string>();

// Emit
handleSubmit() {
  this.messageSubmit.emit(this.message());
}
```

## Computed Signals

```typescript
// Dynamic classes
containerClasses = computed(() =>
  cn(
    'flex items-center gap-2 p-4',
    {
      'bg-primary': this.variant() === 'primary',
      'opacity-50': this.disabled(),
    },
    this.customClasses()
  )
);

// Derived state
displayText = computed(() => {
  const text = this.text();
  return text.length > 100 ? text.slice(0, 100) + '...' : text;
});
```

## Host Bindings

```typescript
@Component({
  host: {
    // Class bindings
    '[class]': 'hostClasses()',
    '[class.disabled]': 'disabled()',

    // Attribute bindings
    '[attr.role]': '"button"',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',

    // Event listeners
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleEnter()',
  },
})
```

## Template Control Flow

```html
<!-- Conditionals -->
@if (loading()) {
<ai-spinner />
} @else {
<ai-content />
}

<!-- Loops -->
@for (item of items(); track item.id) {
<ai-item [data]="item" />
} @empty {
<p>No items</p>
}

<!-- Switch -->
@switch (role()) { @case ('user') { <ai-user-avatar /> } @case ('assistant') {
<ai-bot-avatar /> } }
```

## Class Bindings

```html
<!-- Computed class -->
<div [class]="containerClasses()">Content</div>

<!-- Individual bindings -->
<div [class.active]="isActive()" [class.disabled]="disabled()">
  <!-- DON'T use ngClass -->
  <div [ngClass]="{'active': isActive()}">Bad</div>
</div>
```

## Additional Resources

- **[spartan-ui.md](spartan-ui.md)** - Complete Spartan UI component reference
- **[examples.md](examples.md)** - Input transforms, output patterns, signal examples
- **[patterns.md](patterns.md)** - Container/presentational, content projection, advanced patterns
