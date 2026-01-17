---
name: angular-v21
description: Use when writing Angular v21 code. Triggers on "Angular", "component", "service", "signal", "inject", "standalone", "OnPush", "zoneless", "@if", "@for", "input()", "output()", "computed()", "effect()", or Angular v21 questions.
allowed-tools:
  - Read
  - Edit
  - Write
  - Glob
  - Grep
---

# Angular v21 Best Practices

**IMPORTANT: This project uses Angular v21 (the LATEST version).**

## Core Requirements

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Use signal-based inputs/outputs (`input()`, `output()`, `computed()`, `effect()`)
- Use OnPush change detection strategy
- Use new control flow syntax (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Prefer signals over observables when possible
- Make components zoneless-compatible
- Use `provideExperimentalZonelessChangeDetection()` in providers
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images
  - `NgOptimizedImage` does not work for inline base64 images
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- All components MUST be SSR/hydration compatible (no direct DOM manipulation)
- **ALWAYS use CSS, NEVER use SCSS**

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

```typescript
// Use inject() function instead of constructor injection
export class ComponentName {
  private service = inject(SomeService);
  private config = inject(APP_CONFIG);
}

// Don't use constructor injection
export class ComponentName {
  constructor(private service: SomeService) {}
}
```

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Minimize effect() usage
- **Component Library**: Keep state-management agnostic - components should not depend on NgRx or other state management libraries
- **Demo App (Optional)**: Consider NgRx Signal Store for application-level state management if needed

### Signal Patterns

```typescript
// Signal-based Inputs
message = input.required<ChatMessage>();
speed = input(30); // with default

// Computed Values
containerClasses = computed(() => {
  const base = 'flex gap-3';
  return `${base} ${this.message().role === 'user' ? 'bg-muted' : 'bg-background'}`;
});

// Effects
constructor() {
  effect(() => {
    const value = this.input();
    // React to changes
  });
}

// Signal Updates - Don't use mutate
this.state.mutate((value) => {
  value.property = newValue;
});

// Use update or set instead
this.state.update((value) => ({
  ...value,
  property: newValue,
}));
// or
this.state.set({ ...this.state(), property: newValue });
```

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like `new Date()` are available
- Do not write arrow functions in templates (they are not supported)
- Use `class` bindings instead of `ngClass`
- Use `style` bindings instead of `ngStyle`

## Advanced Patterns

### Input Transforms

```typescript
// Coerce boolean inputs (handle both boolean and empty string)
disabled = input(false, {
  transform: (value: boolean | string) => value === '' || value === true,
});

// Transform string to number
count = input(0, {
  transform: (value: string | number) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
});
```

### Content Projection

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
```

### Host Directives (Composition)

```typescript
// Reusable directive
@Directive({
  selector: '[aiCopyToClipboard]',
  host: {
    '(click)': 'copy()',
  },
})
export class CopyToClipboardDirective {
  text = input.required<string>();

  private clipboard = inject(Clipboard);

  copy() {
    this.clipboard.copy(this.text());
  }
}

// Compose into component
@Component({
  selector: 'ai-code-block',
  hostDirectives: [
    {
      directive: CopyToClipboardDirective,
      inputs: ['text'],
    },
  ],
})
export class CodeBlockComponent {}
```

### RxJS Interop (Signals + Observables)

```typescript
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

export class StreamingComponent {
  // Observable to Signal
  private streamService = inject(StreamingService);
  streamData = toSignal(this.streamService.stream$, { initialValue: '' });

  // Signal to Observable (for integration with RxJS operators)
  message = signal('');
  message$ = toObservable(this.message);
}
```

### Resource API (Async Loading)

```typescript
import { rxResource } from '@angular/core/rxjs-interop';

export class ChatComponent {
  conversationId = input.required<string>();

  // Async resource that reloads when conversationId changes
  conversation = rxResource({
    request: () => ({ id: this.conversationId() }),
    loader: ({ request }) => this.chatService.getConversation(request.id),
  });

  // Template usage
  // @if (conversation.value(); as conv) { ... }
  // @if (conversation.isLoading()) { <spinner /> }
  // @if (conversation.error(); as error) { <error-message /> }
}
```

### SSR/Hydration Safe DOM Access

```typescript
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Renderer2, inject } from '@angular/core';

export class ComponentWithDOM {
  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  scrollToBottom() {
    if (isPlatformBrowser(this.platformId)) {
      const element = this.document.querySelector('.chat-container');
      if (element) {
        this.renderer.setProperty(element, 'scrollTop', element.scrollHeight);
      }
    }
  }
}
```

## Host Bindings Pattern

```typescript
@Component({
  selector: 'ai-component',
  host: {
    '[class.active]': 'isActive()',
    '[attr.aria-label]': 'label()',
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleEnter()',
  },
})
export class ComponentName {
  // Use host object instead of @HostBinding/@HostListener
}
```
