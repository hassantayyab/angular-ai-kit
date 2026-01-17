# Keyboard Navigation Patterns

## Tab Order

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

## Keyboard Events

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

## Focus Management

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

## Focus Trapping

```typescript
@Component({
  selector: 'ai-dialog',
  template: `
    <div
      role="dialog"
      [attr.aria-modal]="true"
      (keydown.tab)="handleTab($event)"
    >
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

## Motion and Reduced Motion

### CSS

```css
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

### TypeScript

```typescript
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

## Visually Hidden Content

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
    <span aria-hidden="true">icon</span>
    <span class="sr-only">Delete message</span>
  </button>
`;
```
