---
paths: '**/*.{ts,component.ts}'
---

# Accessibility (A11y) Requirements

**All components MUST be accessible and follow WCAG AA standards.**

## Core Requirements

- It MUST pass all AXE checks
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes
- Always include ARIA labels where needed
- Ensure keyboard navigation works
- Use semantic HTML elements
- Maintain proper focus management
- Test with screen readers (when possible)

## Semantic HTML

Use semantic HTML elements instead of generic divs and spans when possible:

```typescript
// ✅ Good: Semantic HTML
template: `
  <article class="ai-message">
    <header class="ai-message-header">
      <h3>Assistant</h3>
    </header>
    <main class="ai-message-content">
      {{ content() }}
    </main>
    <footer class="ai-message-footer">
      <button type="button">Copy</button>
    </footer>
  </article>
`;

// ❌ Avoid: Only divs and spans
template: `
  <div class="ai-message">
    <div class="ai-message-header">
      <span>Assistant</span>
    </div>
    <div class="ai-message-content">
      {{ content() }}
    </div>
    <div class="ai-message-footer">
      <div (click)="copy()">Copy</div>
    </div>
  </div>
`;
```

## ARIA Attributes

### ARIA Roles

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
      <input type="text" role="searchbox" [attr.aria-label]="'Type your message'" [attr.aria-describedby]="'message-hint'" />
      <button type="submit" [attr.aria-label]="'Send message'">Send</button>
    </form>
  `,
})
export class ChatContainerComponent {}
```

### ARIA States

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

### ARIA Labels

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

### ARIA Descriptions

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

## Keyboard Navigation

### Tab Order

```typescript
@Component({
  selector: 'ai-interactive-element',
  host: {
    '[attr.tabindex]': 'tabIndex()',
  },
})
export class InteractiveElementComponent {
  disabled = input(false);

  tabIndex = computed(() => (this.disabled() ? -1 : 0));
}
```

### Keyboard Events

```typescript
@Component({
  selector: 'ai-message-input',
  host: {
    '(keydown.enter)': 'handleEnter($event)',
    '(keydown.shift.enter)': 'handleShiftEnter($event)',
    '(keydown.escape)': 'handleEscape()',
    '(keydown.arrowUp)': 'handleArrowUp()',
    '(keydown.arrowDown)': 'handleArrowDown()',
  },
})
export class MessageInputComponent {
  handleEnter(event: KeyboardEvent) {
    event.preventDefault();
    this.submitMessage();
  }

  handleShiftEnter(event: KeyboardEvent) {
    // Allow default behavior (new line)
  }

  handleEscape() {
    this.clearInput();
  }

  handleArrowUp() {
    this.navigateToPreviousMessage();
  }

  handleArrowDown() {
    this.navigateToNextMessage();
  }
}
```

### Focus Management

```typescript
import { AfterViewInit, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'ai-modal',
})
export class ModalComponent implements AfterViewInit {
  private closeButton = viewChild<ElementRef>('closeButton');
  private isOpen = input.required<boolean>();

  ngAfterViewInit() {
    // Focus close button when modal opens
    effect(() => {
      if (this.isOpen() && this.closeButton()) {
        this.closeButton()?.nativeElement.focus();
      }
    });
  }
}
```

### Focus Trapping

```typescript
@Component({
  selector: 'ai-dialog',
  template: `
    <div role="dialog" [attr.aria-modal]="true" (keydown.tab)="handleTab($event)">
      <button #firstFocusable>First</button>
      <!-- Content -->
      <button #lastFocusable>Last</button>
    </div>
  `,
})
export class DialogComponent {
  private firstFocusable = viewChild<ElementRef>('firstFocusable');
  private lastFocusable = viewChild<ElementRef>('lastFocusable');

  handleTab(event: KeyboardEvent) {
    const first = this.firstFocusable()?.nativeElement;
    const last = this.lastFocusable()?.nativeElement;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
}
```

## Color Contrast

Ensure WCAG AA color contrast ratios:

- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

```typescript
// ✅ Good: High contrast colors
template: `
  <div class="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
    Content with good contrast
  </div>
`;

// ❌ Avoid: Low contrast
template: `
  <div class="text-gray-400 bg-gray-300">
    Low contrast text
  </div>
`;
```

## Screen Reader Support

### Visually Hidden Content

```css
/* Add to global styles */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

```typescript
template: `
  <button>
    <span aria-hidden="true">🗑️</span>
    <span class="sr-only">Delete message</span>
  </button>
`;
```

### Live Regions

```typescript
template: `
  <!-- Announce new messages to screen readers -->
  <div role="log" aria-live="polite" aria-atomic="false">
    @for (message of messages(); track message.id) {
      <ai-message-bubble [message]="message" />
    }
  </div>

  <!-- Announce errors immediately -->
  <div role="alert" aria-live="assertive">
    @if (error()) {
      {{ error() }}
    }
  </div>

  <!-- Status updates -->
  <div role="status" aria-live="polite">
    @if (loading()) {
      Loading messages...
    }
  </div>
`;
```

## Touch Targets

Ensure touch targets are at least 44x44px:

```typescript
template: `
  <!-- ✅ Good: Large touch target -->
  <button class="min-w-[44px] min-h-[44px] flex items-center justify-center">
    Copy
  </button>

  <!-- ❌ Avoid: Small touch target -->
  <button class="w-4 h-4">
    ×
  </button>
`;
```

## Motion and Animation

Support `prefers-reduced-motion`:

```css
/* CSS */
@layer components {
  .ai-message-bubble {
    transition: transform 200ms ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .ai-message-bubble {
      transition: none;
    }
  }
}
```

```typescript
// TypeScript
@Component({
  selector: 'ai-animated-component',
})
export class AnimatedComponent {
  private prefersReducedMotion = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.prefersReducedMotion.set(mediaQuery.matches);

      mediaQuery.addEventListener('change', (e) => {
        this.prefersReducedMotion.set(e.matches);
      });
    }
  }

  animationClasses = computed(() => {
    if (this.prefersReducedMotion()) {
      return 'transition-none';
    }
    return 'transition-all duration-200';
  });
}
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

      <input [id]="inputId()" [type]="type()" [required]="required()" [attr.aria-describedby]="errorId()" [attr.aria-invalid]="hasError()" [attr.aria-required]="required()" />

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

  inputId = computed(() => `ai-input-${Math.random().toString(36).substr(2, 9)}`);
  errorId = computed(() => `${this.inputId()}-error`);
  hintId = computed(() => `${this.inputId()}-hint`);
  hasError = computed(() => this.error().length > 0);
}
```

## Accessibility Checklist

Before considering a component complete:

- [ ] Uses semantic HTML elements
- [ ] Has appropriate ARIA roles and attributes
- [ ] Includes ARIA labels for interactive elements
- [ ] Supports keyboard navigation (Tab, Enter, Escape, Arrows)
- [ ] Manages focus properly
- [ ] Has sufficient color contrast (WCAG AA)
- [ ] Touch targets are at least 44x44px
- [ ] Supports prefers-reduced-motion
- [ ] Announces changes to screen readers (aria-live)
- [ ] Form inputs have associated labels
- [ ] Error messages are announced
- [ ] Loading states are announced
- [ ] Tested with keyboard only
- [ ] Passes AXE accessibility checks
- [ ] Works with screen readers (VoiceOver, NVDA, JAWS)

## Testing Tools

- **AXE DevTools**: Browser extension for automated testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Chrome DevTools accessibility audit
- **Screen Readers**: VoiceOver (macOS), NVDA (Windows), JAWS (Windows)
- **Keyboard Only**: Test by unplugging your mouse

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

### Toggle

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
