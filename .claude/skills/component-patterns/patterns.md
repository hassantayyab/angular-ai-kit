# Advanced Component Patterns

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

## Container/Presentational Pattern

### Container (Smart Component)

```typescript
@Component({
  selector: 'ai-chat-container',
  template: `
    <ai-chat-view
      [messages]="messages()"
      [loading]="loading()"
      (messageSubmit)="handleMessageSubmit($event)"
    />
  `,
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
```

### Presentational (Dumb Component)

```typescript
@Component({
  selector: 'ai-chat-view',
  template: `
    <ai-message-list [messages]="messages()" />
    <ai-message-input
      [disabled]="loading()"
      (messageSubmit)="messageSubmit.emit($event)"
    />
  `,
})
export class ChatViewComponent {
  messages = input.required<ChatMessage[]>();
  loading = input(false);
  messageSubmit = output<string>();
}
```

## Template Control Flow

### Conditionals

```html
@if (loading()) {
<ai-spinner />
} @else if (error()) {
<ai-error-message [error]="error()" />
} @else {
<ai-message-list [messages]="messages()" />
}
```

### Loops

```html
@for (message of messages(); track message.id) {
<ai-message-bubble [message]="message" />
} @empty {
<p>No messages yet</p>
}
```

### Switch

```html
@switch (role()) { @case ('user') {
<ai-user-avatar />
} @case ('assistant') {
<ai-assistant-avatar />
} @default {
<ai-default-avatar />
} }
```

## Class and Style Bindings

```html
<!-- Computed class binding -->
<div [class]="containerClasses()">Content</div>

<!-- Individual class bindings -->
<div [class.active]="isActive()" [class.disabled]="disabled()">Button</div>

<!-- Style binding -->
<div [style.width.px]="width()" [style.color]="textColor()">Styled</div>

<!-- DON'T use ngClass or ngStyle -->
<div [ngClass]="{'active': isActive()}">Bad</div>
<div [ngStyle]="{'width': width()}">Bad</div>
```

## Effect Patterns

### Side Effects Only

```typescript
constructor() {
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

### DON'T Use Effects for Computed Values

```typescript
// BAD: Using effect for derived state
constructor() {
  effect(() => {
    this.displayText.set(this.text().toUpperCase());
  });
}

// GOOD: Use computed instead
displayText = computed(() => this.text().toUpperCase());
```
