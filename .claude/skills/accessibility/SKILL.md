---
name: accessibility
description: Use when implementing accessible components, adding ARIA attributes, keyboard navigation, or screen reader support. Triggers on "a11y", "accessibility", "ARIA", "keyboard navigation", "focus", "screen reader", "WCAG", or "AXE".
allowed-tools:
  - Read
  - Edit
  - Write
  - Glob
  - Grep
---

# Accessibility (A11y) Requirements

**All components MUST be accessible and follow WCAG AA standards.**

## Quick Reference

- **ARIA patterns**: See [aria-patterns.md](aria-patterns.md)
- **Keyboard navigation**: See [keyboard.md](keyboard.md)
- **Testing checklist**: See [checklist.md](checklist.md)

## Core Requirements

- MUST pass all AXE checks
- MUST follow WCAG AA minimums
- Always include ARIA labels where needed
- Ensure keyboard navigation works
- Use semantic HTML elements
- Maintain proper focus management

## Semantic HTML

```typescript
// GOOD: Semantic HTML
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

// BAD: Only divs and spans
template: `
  <div class="ai-message">
    <div class="ai-message-header">
      <span>Assistant</span>
    </div>
  </div>
`;
```

## Essential ARIA Attributes

### Roles and Labels

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
  `,
})
```

### States

```typescript
@Component({
  host: {
    '[attr.role]': '"button"',
    '[attr.aria-pressed]': 'pressed()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-busy]': 'loading()',
    '[attr.aria-expanded]': 'expanded()',
  },
})
```

## Keyboard Navigation

### Tab Order

```typescript
@Component({
  host: {
    '[attr.tabindex]': 'disabled() ? -1 : 0',
  },
})
```

### Key Events

```typescript
@Component({
  host: {
    '(keydown.enter)': 'handleEnter($event)',
    '(keydown.escape)': 'handleEscape()',
    '(keydown.arrowUp)': 'handleArrowUp()',
    '(keydown.arrowDown)': 'handleArrowDown()',
  },
})
```

## Color Contrast

WCAG AA requirements:

- **Normal text**: 4.5:1 minimum
- **Large text (18pt+)**: 3:1 minimum
- **UI components**: 3:1 minimum

```typescript
// GOOD: High contrast
<div class="text-foreground bg-background">

// BAD: Low contrast
<div class="text-gray-400 bg-gray-300">
```

## Screen Reader Support

### Visually Hidden Content

```typescript
template: `
  <button>
    <span aria-hidden="true">icon</span>
    <span class="sr-only">Delete message</span>
  </button>
`;
```

### Live Regions

```typescript
template: `
  <!-- Announce new messages -->
  <div role="log" aria-live="polite">
    @for (message of messages(); track message.id) {
      <ai-message-bubble [message]="message" />
    }
  </div>

  <!-- Announce errors immediately -->
  <div role="alert" aria-live="assertive">
    @if (error()) { {{ error() }} }
  </div>

  <!-- Status updates -->
  <div role="status" aria-live="polite">
    @if (loading()) { Loading... }
  </div>
`;
```

## Touch Targets

Minimum 44x44px:

```typescript
// GOOD
<button class="min-w-[44px] min-h-[44px]">Copy</button>

// BAD
<button class="w-4 h-4">x</button>
```

## Motion and Animation

Support `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .ai-animated {
    transition: none;
  }
}
```

```typescript
animationClasses = computed(() =>
  this.prefersReducedMotion()
    ? 'transition-none'
    : 'transition-all duration-200'
);
```

## Quick Checklist

- [ ] Semantic HTML elements
- [ ] ARIA roles and attributes
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus management
- [ ] Color contrast (WCAG AA)
- [ ] Touch targets 44x44px minimum
- [ ] prefers-reduced-motion support
- [ ] aria-live for dynamic content
- [ ] Form labels and error announcements

## Additional Resources

- **[aria-patterns.md](aria-patterns.md)** - Complete ARIA attribute reference
- **[keyboard.md](keyboard.md)** - Keyboard navigation and focus patterns
- **[checklist.md](checklist.md)** - Full testing checklist and tools
