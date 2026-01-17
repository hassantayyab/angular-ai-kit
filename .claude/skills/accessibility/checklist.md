# Accessibility Testing Checklist

## Complete Checklist

Before considering a component complete:

### Structure

- [ ] Uses semantic HTML elements (article, header, main, footer, button, etc.)
- [ ] Has appropriate ARIA roles and attributes
- [ ] Includes ARIA labels for interactive elements

### Keyboard

- [ ] Supports keyboard navigation (Tab, Enter, Escape, Arrows)
- [ ] Manages focus properly
- [ ] Focus visible indicator is present
- [ ] No keyboard traps

### Visual

- [ ] Has sufficient color contrast (WCAG AA: 4.5:1 text, 3:1 UI)
- [ ] Touch targets are at least 44x44px
- [ ] Information not conveyed by color alone
- [ ] Text is resizable without breaking layout

### Motion

- [ ] Supports prefers-reduced-motion
- [ ] No content flashes more than 3 times per second
- [ ] Animations can be paused

### Screen Readers

- [ ] Announces changes via aria-live regions
- [ ] Form inputs have associated labels
- [ ] Error messages are announced
- [ ] Loading states are announced
- [ ] Images have alt text or are decorative (aria-hidden)

### Testing

- [ ] Tested with keyboard only
- [ ] Passes AXE accessibility checks
- [ ] Tested with screen readers (VoiceOver, NVDA)

## Testing Tools

### Automated Testing

| Tool                       | Description                             |
| -------------------------- | --------------------------------------- |
| **AXE DevTools**           | Browser extension for automated testing |
| **WAVE**                   | Web accessibility evaluation tool       |
| **Lighthouse**             | Chrome DevTools accessibility audit     |
| **eslint-plugin-jsx-a11y** | Linting for accessibility issues        |

### Manual Testing

| Method            | Description                           |
| ----------------- | ------------------------------------- |
| **Keyboard Only** | Test by unplugging your mouse         |
| **VoiceOver**     | macOS built-in screen reader (Cmd+F5) |
| **NVDA**          | Free Windows screen reader            |
| **JAWS**          | Windows screen reader                 |

## Color Contrast Requirements

| Content Type             | Minimum Ratio |
| ------------------------ | ------------- |
| Normal text              | 4.5:1         |
| Large text (18pt+)       | 3:1           |
| UI components            | 3:1           |
| Non-essential decorative | None          |

### Contrast Examples

```typescript
// GOOD: High contrast
<div class="text-gray-900 bg-white">       // ~21:1
<div class="text-gray-100 bg-gray-900">    // ~15:1

// BAD: Low contrast
<div class="text-gray-400 bg-gray-300">    // ~1.5:1
<div class="text-gray-500 bg-gray-400">    // ~1.3:1
```

## Touch Target Requirements

Minimum 44x44px for touch targets:

```typescript
// GOOD: Large touch target
<button class="min-w-[44px] min-h-[44px] flex items-center justify-center">
  Copy
</button>

// BAD: Small touch target
<button class="w-4 h-4">
  x
</button>
```

## Screen Reader Testing Steps

### VoiceOver (macOS)

1. Enable: Cmd + F5
2. Navigate: Ctrl + Option + Arrow keys
3. Interact: Ctrl + Option + Space
4. Read all: Ctrl + Option + A

### NVDA (Windows)

1. Download from nvaccess.org
2. Navigate: Tab, Arrow keys
3. Read all: NVDA + Down Arrow
4. Stop reading: Ctrl

## Common Issues and Fixes

| Issue                   | Fix                                            |
| ----------------------- | ---------------------------------------------- |
| Missing button label    | Add `aria-label` or visible text               |
| Form without labels     | Associate `<label for="id">`                   |
| Image without alt       | Add `alt=""` for decorative or descriptive alt |
| Low color contrast      | Use semantic color tokens                      |
| Missing focus indicator | Add `focus:ring-2 focus:ring-ring`             |
| Non-keyboard accessible | Add `tabindex="0"` and key handlers            |
| Content not announced   | Use `aria-live` regions                        |
