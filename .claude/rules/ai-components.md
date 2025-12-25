# AI Component Specific Rules

**This library is focused on AI chat interfaces. All components should be designed with AI use cases in mind.**

## Chat Components

### Message Bubbles

- Always support both user and assistant messages
- Include copy functionality for assistant messages
- Support streaming text display with typing indicators
- Handle empty states gracefully
- Show timestamps (optional, configurable)
- Support markdown content rendering

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
  <span class="typing-cursor">▊</span>
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
