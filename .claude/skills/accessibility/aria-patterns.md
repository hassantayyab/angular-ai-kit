# ARIA Patterns Reference

## Common ARIA Patterns

### Button

```typescript
host: {
  '[attr.role]': '"button"',
  '[attr.aria-pressed]': 'pressed()',
  '[attr.tabindex]': '0',
  '(click)': 'handleClick()',
  '(keydown.enter)': 'handleClick()',
  '(keydown.space)': 'handleClick()',
}
```

### Toggle/Switch

```typescript
host: {
  '[attr.role]': '"switch"',
  '[attr.aria-checked]': 'checked()',
  '[attr.tabindex]': '0',
}
```

### Expandable

```typescript
host: {
  '[attr.aria-expanded]': 'expanded()',
  '[attr.aria-controls]': 'contentId()',
}
```

### Tab

```typescript
host: {
  '[attr.role]': '"tab"',
  '[attr.aria-selected]': 'selected()',
  '[attr.aria-controls]': 'panelId()',
  '[attr.tabindex]': 'selected() ? 0 : -1',
}
```

## ARIA Roles

### Chat Container

```typescript
@Component({
  selector: 'ai-chat-container',
  host: {
    '[attr.role]': '"region"',
    '[attr.aria-label]': '"Chat conversation"',
  },
  template: `
    <div role="log" aria-live="polite" aria-atomic="false">
      @for (message of messages(); track message.id) {
        <ai-message-bubble [message]="message" />
      }
    </div>

    <form role="search" (submit)="handleSubmit()">
      <input
        type="text"
        role="searchbox"
        [attr.aria-label]="'Type your message'"
        [attr.aria-describedby]="'message-hint'"
      />
      <button type="submit" [attr.aria-label]="'Send message'">Send</button>
    </form>
  `,
})
```

## ARIA States

```typescript
@Component({
  selector: 'ai-button',
  host: {
    '[attr.role]': '"button"',
    '[attr.aria-pressed]': 'pressed()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-busy]': 'loading()',
    '[attr.aria-expanded]': 'expanded()',
  },
})
export class ButtonComponent {
  pressed = input(false);
  disabled = input(false);
  loading = input(false);
  expanded = input<boolean | undefined>(undefined);
}
```

## ARIA Labels

### Dynamic Labels

```typescript
@Component({
  selector: 'ai-message-bubble',
  host: {
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class MessageBubbleComponent {
  message = input.required<ChatMessage>();

  ariaLabel = computed(() => {
    const msg = this.message();
    return `${msg.role} message: ${msg.content}`;
  });
}
```

### With Descriptions

```typescript
template: `
  <button
    [attr.aria-label]="'Copy message'"
    [attr.aria-describedby]="'copy-hint'">
    Copy
  </button>
  <span id="copy-hint" class="sr-only">
    Copies the message content to your clipboard
  </span>
`;
```

## Live Regions

### Message Log

```typescript
<!-- Announce new messages to screen readers -->
<div role="log" aria-live="polite" aria-atomic="false">
  @for (message of messages(); track message.id) {
    <ai-message-bubble [message]="message" />
  }
</div>
```

### Errors (Assertive)

```typescript
<!-- Announce errors immediately -->
<div role="alert" aria-live="assertive">
  @if (error()) {
    {{ error() }}
  }
</div>
```

### Status Updates (Polite)

```typescript
<!-- Status updates -->
<div role="status" aria-live="polite">
  @if (loading()) {
    Loading messages...
  }
</div>
```

## Form Accessibility

```typescript
@Component({
  selector: 'ai-form-field',
  template: `
    <div class="ai-form-field">
      <label [for]="inputId()" [class.required]="required()">
        {{ label() }}
        @if (required()) {
          <span aria-label="required">*</span>
        }
      </label>

      <input
        [id]="inputId()"
        [type]="type()"
        [required]="required()"
        [attr.aria-describedby]="errorId()"
        [attr.aria-invalid]="hasError()"
        [attr.aria-required]="required()"
      />

      @if (hasError()) {
        <div [id]="errorId()" role="alert" class="text-red-600">
          {{ error() }}
        </div>
      }

      @if (hint()) {
        <div [id]="hintId()" class="text-gray-600">
          {{ hint() }}
        </div>
      }
    </div>
  `,
})
export class FormFieldComponent {
  label = input.required<string>();
  type = input<'text' | 'email' | 'password'>('text');
  required = input(false);
  error = input<string>('');
  hint = input<string>('');

  inputId = computed(
    () => `ai-input-${Math.random().toString(36).substr(2, 9)}`
  );
  errorId = computed(() => `${this.inputId()}-error`);
  hintId = computed(() => `${this.inputId()}-hint`);
  hasError = computed(() => this.error().length > 0);
}
```
