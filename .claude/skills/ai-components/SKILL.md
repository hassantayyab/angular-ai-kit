---
name: ai-components
description: Use when building AI chat interfaces. Triggers on "chat", "message", "AI", "streaming", "typing indicator", "message bubble", "chat input", "Spartan UI", "hlmBtn", "hlmAvatar", or chat component questions.
allowed-tools:
  - Read
  - Edit
  - Write
  - Glob
  - Grep
---

# AI Component Specific Rules

**This library is focused on AI chat interfaces. All components should be designed with AI use cases in mind.**

## Spartan UI Components (Preferred)

**IMPORTANT: When building UI for this project, prefer using Spartan UI components from `@angular-ai-kit/spartan-ui/*`.**

Spartan UI provides accessible, well-designed primitives that integrate seamlessly with our Tailwind-based styling system.

### Available Spartan UI Libraries

| Package                                    | Purpose                             |
| ------------------------------------------ | ----------------------------------- |
| `@angular-ai-kit/spartan-ui/avatar`        | User/assistant avatars              |
| `@angular-ai-kit/spartan-ui/badge`         | Status badges, labels               |
| `@angular-ai-kit/spartan-ui/button`        | Buttons with variants               |
| `@angular-ai-kit/spartan-ui/button-group`  | Grouped button actions              |
| `@angular-ai-kit/spartan-ui/checkbox`      | Checkbox inputs                     |
| `@angular-ai-kit/spartan-ui/command`       | Command palette / search            |
| `@angular-ai-kit/spartan-ui/dropdown-menu` | Context menus, action menus         |
| `@angular-ai-kit/spartan-ui/empty`         | Empty state displays                |
| `@angular-ai-kit/spartan-ui/field`         | Form field wrapper with label/error |
| `@angular-ai-kit/spartan-ui/icon`          | Icon wrapper for ng-icons           |
| `@angular-ai-kit/spartan-ui/input`         | Text inputs                         |
| `@angular-ai-kit/spartan-ui/input-group`   | Input with addons (buttons, icons)  |
| `@angular-ai-kit/spartan-ui/item`          | List items with actions             |
| `@angular-ai-kit/spartan-ui/popover`       | Popover overlays                    |
| `@angular-ai-kit/spartan-ui/radio-group`   | Radio button groups                 |
| `@angular-ai-kit/spartan-ui/select`        | Select dropdowns                    |
| `@angular-ai-kit/spartan-ui/separator`     | Visual dividers                     |
| `@angular-ai-kit/spartan-ui/spinner`       | Loading spinners                    |
| `@angular-ai-kit/spartan-ui/switch`        | Toggle switches                     |
| `@angular-ai-kit/spartan-ui/textarea`      | Multiline text inputs               |

### Usage Pattern

```typescript
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmButtonGroupImports } from '@angular-ai-kit/spartan-ui/button-group';
import { HlmIcon } from '@angular-ai-kit/spartan-ui/icon';
import { HlmInputGroupImports } from '@angular-ai-kit/spartan-ui/input-group';

@Component({
  selector: 'ai-chat-input',
  imports: [HlmButtonGroupImports, HlmInputGroupImports, HlmButton, HlmIcon],
  template: `
    <div hlmInputGroup>
      <textarea
        hlmInputGroupTextarea
        placeholder="Send a message..."
      ></textarea>
      <div hlmInputGroupAddon align="inline-end">
        <button hlmInputGroupButton size="icon-sm">
          <ng-icon hlm name="lucideArrowUp" size="sm" />
        </button>
      </div>
    </div>
  `,
})
export class ChatInputComponent {}
```

### When to Use Spartan UI

- Form inputs (use `hlmInput`, `hlmInputGroup`, `hlmField`)
- Buttons and actions (use `hlmBtn`, `hlmButtonGroup`)
- Dropdowns and menus (use `hlmDropdownMenu`, `hlmPopover`)
- Avatars (use `hlmAvatar`)
- Badges and labels (use `hlmBadge`)
- Loading states (use `hlmSpinner`)
- Empty states (use `hlmEmpty`)
- List items (use `hlmItem`)

### When to Build Custom

- Spartan doesn't have an equivalent component
- Need highly specialized AI-specific behavior
- Performance-critical streaming components

## Chat Components

### Message Styling

**User Messages:**

- Display in a card/bubble with background styling
- Align to the right side
- Include edit and copy functionality

**AI/Assistant Responses:**

- Display as plain text (no card or wrapper)
- Align to the left side
- Support markdown rendering with syntax highlighting
- Include action buttons: copy, regenerate, thumbs up/down

### Message Bubbles (User)

- Display with card styling (bg-card, border, rounded corners)
- Include copy and edit functionality
- Show timestamps (optional, configurable)

### AI Response

- Plain text display - no card, border, or wrapper styling
- Full markdown support (GFM)
- Code blocks with syntax highlighting and copy buttons
- Support streaming text display with typing cursor
- Action buttons appear on hover

### Message Lists

- Auto-scroll to latest message
- Support virtual scrolling for long conversations
- Group messages by date/time
- Handle loading states between messages

### Chat Containers

- Manage conversation state
- Handle message submission
- Support regeneration of responses
- Provide clear error states

## Input Components

### Message Input

- Support keyboard shortcuts:
  - `Enter` to submit
  - `Shift+Enter` for new line
  - `Escape` to clear/cancel
- Include loading/disabled states during AI response
- Auto-resize textarea as content grows
- Character/token count display (optional)
- Validate inputs when appropriate
- Provide clear visual feedback

### Prompt Suggestions

- Display suggested prompts/starters
- Handle click to populate input
- Support customizable suggestions

## Display Components

### Markdown Rendering

- Support full markdown syntax
- Code blocks with syntax highlighting
- Copy-to-clipboard for code blocks
- Handle long content (scrolling, truncation)
- Support tables, lists, blockquotes

### Code Blocks

- Syntax highlighting for common languages
- Language label display
- Copy button
- Line numbers (optional)
- Word wrap handling

### Streaming Text

- Character-by-character or word-by-word reveal
- Cursor/caret animation
- Smooth transitions
- Pause/resume capability

## Control Components

### Action Buttons

- Copy message content
- Regenerate response
- Edit message
- Delete message
- Thumbs up/down feedback

### State Indicators

- Loading spinners
- Typing indicators
- Connection status
- Error states with retry options

## Common Patterns

### Loading States

```typescript
// Always provide loading feedback
@if (isLoading()) {
  <ai-typing-indicator />
} @else {
  <ai-message-content [content]="message().content" />
}
```

### Error Handling

```typescript
// Graceful error states with retry
@if (error()) {
  <ai-error-message
    [error]="error()"
    (retry)="handleRetry()"
  />
}
```

### Empty States

```typescript
// Welcoming empty state with suggestions
@if (messages().length === 0) {
  <ai-empty-state
    [suggestions]="promptSuggestions"
    (selectPrompt)="handlePromptSelect($event)"
  />
}
```

### Streaming Support

```typescript
// Support for streaming responses
message = input.required<ChatMessage>();
isStreaming = input(false);

// Show cursor while streaming
@if (isStreaming()) {
  <span class="typing-cursor">cursor</span>
}
```

## Accessibility for AI Components

### Screen Reader Announcements

- Announce new messages with `aria-live`
- Announce loading/streaming states
- Announce errors clearly

### Keyboard Navigation

- Navigate between messages with arrow keys
- Focus management when new messages arrive
- Escape to cancel ongoing operations

### Visual Indicators

- Clear distinction between user/assistant messages
- Loading states visible to all users
- Error states with clear instructions

## Performance Considerations

### Message Lists

- Virtual scrolling for 100+ messages
- Lazy load older messages
- Debounce scroll events
- Efficient re-renders with trackBy

### Streaming

- Batch DOM updates during streaming
- Use `requestAnimationFrame` for smooth animations
- Avoid layout thrashing

### Memory Management

- Clean up subscriptions on destroy
- Limit stored message history
- Clear streaming buffers when complete
