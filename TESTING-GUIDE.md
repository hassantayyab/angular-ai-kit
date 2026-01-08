# Angular AI Kit - Manual Testing Guide

This guide walks you through testing `@angular-ai-kit/core` in a fresh Angular v21 project.

---

## Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Angular CLI (latest)

---

## 1. Create New Angular v21 Project

```bash
npx @angular/cli@latest new test-ai-kit --style=css --routing=false --ssr=false
cd test-ai-kit
```

---

## 2. Install the Library

### Option A: Using ng-add (Recommended)

```bash
ng add @angular-ai-kit/core
```

This automatically:

1. Installs all dependencies
2. Creates `.postcssrc.json` for Tailwind v4
3. Updates `src/styles.css` with required imports

### Option B: Manual Installation

```bash
# Core packages
npm install @angular-ai-kit/core @angular-ai-kit/utils @angular-ai-kit/tokens

# Angular CDK
npm install @angular/cdk

# Tailwind v4
npm install tailwindcss @tailwindcss/postcss

# Markdown & syntax highlighting
npm install highlight.js marked dompurify

# Icons
npm install @ng-icons/core @ng-icons/lucide

# Utilities
npm install clsx tailwind-merge class-variance-authority

# Spartan UI Brain
npm install @spartan-ng/brain
```

Then manually configure (see steps 3-4 below).

---

## 3. Configure Tailwind CSS v4

Create `.postcssrc.json` in project root:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

---

## 4. Add Styles

Replace the contents of `src/styles.css` with:

```css
/* Angular AI Kit */
@import 'tailwindcss';
@source '../node_modules/@angular-ai-kit';
@import '@angular-ai-kit/tokens/tokens/styles.css';
```

**That's it!** The `@source` directive tells Tailwind where to find the component classes. All theme variables, component styles, and dark mode support are included.

---

## 5. Verify Installation

### Check package.json

Your `package.json` should include these dependencies:

```json
{
  "dependencies": {
    "@angular-ai-kit/core": "^0.1.8",
    "@angular-ai-kit/utils": "^0.1.8",
    "@angular-ai-kit/tokens": "^0.1.8",
    "@angular/cdk": "^21.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0"
  }
}
```

### Verify configuration files

- `.postcssrc.json` - Contains Tailwind PostCSS plugin config
- `src/styles.css` - Contains the 3-line import (tailwindcss, @source, tokens)

---

## 6. Test: ChatInputComponent (Full Featured)

This is the main component with all features.

### Update `src/app/app.component.ts`:

```typescript
import { ChatInputComponent, PromptSuggestion } from '@angular-ai-kit/core';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [ChatInputComponent],
  template: `
    <div class="bg-background min-h-screen p-8">
      <h1 class="text-foreground mb-8 text-2xl font-bold">
        Angular AI Kit - ChatInput Test
      </h1>

      <div class="mx-auto max-w-4xl">
        <ai-chat-input
          [placeholder]="'Ask me anything...'"
          [disabled]="isLoading()"
          [suggestions]="suggestions"
          [showContextButton]="true"
          [showAttachmentButton]="true"
          [showResearchButton]="true"
          [showSourcesButton]="true"
          [showModelName]="true"
          [showMicButton]="true"
          (messageSend)="handleSend($event)"
          (fileSelect)="handleFiles($event)"
          (suggestionSelect)="handleSuggestion($event)"
          (researchModeChange)="handleResearchMode($event)"
        />

        <div class="bg-card border-border mt-8 rounded-lg border p-4">
          <h3 class="mb-2 font-medium">Last Message:</h3>
          <p class="text-muted-foreground">
            {{ lastMessage() || 'No messages yet' }}
          </p>
        </div>

        <div class="bg-card border-border mt-4 rounded-lg border p-4">
          <h3 class="mb-2 font-medium">Console Output:</h3>
          <p class="text-muted-foreground text-sm">
            Open browser DevTools to see events
          </p>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  isLoading = signal(false);
  lastMessage = signal('');

  suggestions: PromptSuggestion[] = [
    {
      label: 'Write code',
      prompt: 'Help me write a function that calculates fibonacci numbers',
    },
    {
      label: 'Explain concept',
      prompt: 'Explain how async/await works in JavaScript',
    },
    {
      label: 'Debug issue',
      prompt: 'I have a bug in my code where the state is not updating',
    },
    {
      label: 'Review code',
      prompt: 'Please review this code for best practices',
    },
  ];

  handleSend(message: string) {
    console.log('📤 Message sent:', message);
    this.lastMessage.set(message);

    // Simulate loading state
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  handleFiles(files: File[]) {
    console.log(
      '📎 Files selected:',
      files.map((f) => ({ name: f.name, size: f.size, type: f.type }))
    );
  }

  handleSuggestion(suggestion: PromptSuggestion) {
    console.log('💡 Suggestion selected:', suggestion.label);
  }

  handleResearchMode(enabled: boolean) {
    console.log('🔬 Research mode:', enabled ? 'ON' : 'OFF');
  }
}
```

### Features to Test

| Feature              | How to Test                                    |
| -------------------- | ---------------------------------------------- |
| **Send message**     | Type text, press Enter or click send button    |
| **Multi-line input** | Press Shift+Enter for new line                 |
| **Suggestions**      | Click a suggestion chip to populate input      |
| **Attachments**      | Click paperclip icon, select files             |
| **Context menu**     | Click @ button to open context/mention popover |
| **Model selector**   | Click model name dropdown to change models     |
| **Sources dropdown** | Click globe icon to toggle sources             |
| **Research mode**    | Click lightbulb icon to toggle                 |
| **Voice input**      | Click microphone icon                          |
| **Disabled state**   | Sends message, input disables for 2 seconds    |

---

## 7. Component Testing Phases

Test components in this order to build a complete chat application:

### Phase 2: Display Components

#### 7.1 TypingIndicatorComponent

```typescript
import { TypingIndicatorComponent } from '@angular-ai-kit/core';

@Component({
  imports: [TypingIndicatorComponent],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">Typing Indicator</h2>
      <ai-typing-indicator />
    </div>
  `
})
```

**Expected:** Three animated bouncing dots
**Check:** Animation is smooth, sizing looks correct

#### 7.2 StreamingTextComponent

```typescript
import { StreamingTextComponent } from '@angular-ai-kit/core';
import { signal } from '@angular/core';

@Component({
  imports: [StreamingTextComponent],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">Streaming Text</h2>
      <button
        (click)="startStream()"
        class="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Start Stream
      </button>
      <ai-streaming-text
        [content]="streamText()"
        [isStreaming]="isStreaming()"
      />
    </div>
  `,
})
export class TestComponent {
  streamText = signal('');
  isStreaming = signal(false);

  startStream() {
    const fullText = 'Hello! I am an AI assistant. How can I help you today?';
    this.streamText.set('');
    this.isStreaming.set(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        this.streamText.update((t) => t + fullText[i]);
        i++;
      } else {
        clearInterval(interval);
        this.isStreaming.set(false);
      }
    }, 50);
  }
}
```

**Expected:** Text reveals character-by-character with blinking cursor
**Check:** Smooth animation, cursor visible during stream, disappears after

#### 7.3 MarkdownRendererComponent

```typescript
import { MarkdownRendererComponent } from '@angular-ai-kit/core';

@Component({
  imports: [MarkdownRendererComponent],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">Markdown Renderer</h2>
      <ai-markdown-renderer [content]="markdownContent" />
    </div>
  `,
})
export class TestComponent {
  markdownContent = `
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text* and ~~strikethrough~~.

- Unordered list item 1
- Unordered list item 2
  - Nested item

1. Ordered list item 1
2. Ordered list item 2

> This is a blockquote

Inline \`code\` example.

\`\`\`typescript
const greeting = 'Hello, World!';
console.log(greeting);

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

[Link example](https://angular.dev)
`;
}
```

**Expected:** Proper heading styles, code with syntax highlighting, tables render
**Check:** All markdown elements render correctly, code blocks have copy button

#### 7.4 CodeBlockComponent

```typescript
import { CodeBlockComponent } from '@angular-ai-kit/core';

@Component({
  imports: [CodeBlockComponent],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">Code Block</h2>
      <ai-code-block [code]="codeSnippet" [language]="'typescript'" />
    </div>
  `,
})
export class TestComponent {
  codeSnippet = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`<h1>{{ title() }}</h1>\`
})
export class ExampleComponent {
  title = signal('Hello Angular!');
}`;
}
```

**Expected:** Syntax highlighted code with language label and copy button
**Check:** Copy button works (copies to clipboard), language shows in header

---

### Phase 3: Message Components

#### 7.5 UserMessageComponent

```typescript
import { UserMessage, UserMessageComponent } from '@angular-ai-kit/core';

@Component({
  imports: [UserMessageComponent],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">User Message</h2>
      <ai-user-message [message]="userMessage" (edit)="onEdit($event)" />
    </div>
  `,
})
export class TestComponent {
  userMessage: UserMessage = {
    id: '1',
    role: 'user',
    content:
      'Hello! Can you help me write a function that calculates the factorial of a number?',
    timestamp: new Date(),
  };

  onEdit(event: { originalContent: string; newContent: string }) {
    console.log('Edit:', event);
    this.userMessage = { ...this.userMessage, content: event.newContent };
  }
}
```

**Expected:** Message bubble with user styling (right-aligned or styled differently)
**Check:** Edit button appears on hover, edit mode works, copy works

#### 7.6 AiResponseComponent

```typescript
import { AiResponseComponent, AssistantMessage } from '@angular-ai-kit/core';

@Component({
  imports: [AiResponseComponent],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">AI Response</h2>
      <ai-response [content]="assistantMessage.content" [isStreaming]="false" />
    </div>
  `,
})
export class TestComponent {
  assistantMessage: AssistantMessage = {
    id: '2',
    role: 'assistant',
    content: `Here's a factorial function in TypeScript:

\`\`\`typescript
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
\`\`\`

This uses **recursion** to calculate the factorial. For n=5, it returns 120.`,
    timestamp: new Date(),
    model: 'gpt-4',
  };
}
```

**Expected:** Plain text response (no bubble), markdown rendered, actions on hover
**Check:** Copy, regenerate buttons work, markdown renders properly

#### 7.7 MessageActionsComponent

```typescript
import { MessageActionsComponent } from '@angular-ai-kit/core';

@Component({
  imports: [MessageActionsComponent],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">Message Actions</h2>
      <ai-message-actions
        [content]="'Test content to copy'"
        [showCopy]="true"
        [showEdit]="true"
        [alwaysVisible]="true"
        (copy)="onCopy()"
        (edit)="onEdit()"
      />
    </div>
  `,
})
export class TestComponent {
  onCopy() {
    console.log('Copy clicked');
  }
  onEdit() {
    console.log('Edit clicked');
  }
}
```

**Expected:** Icon buttons for copy and edit actions
**Check:** All buttons clickable, events fire correctly, copy copies content to clipboard

#### 7.8 FeedbackButtonsComponent

```typescript
import { FeedbackButtonsComponent } from '@angular-ai-kit/core';
import { signal } from '@angular/core';

@Component({
  imports: [FeedbackButtonsComponent],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">Feedback Buttons</h2>
      <ai-feedback-buttons
        [value]="feedbackValue()"
        (valueChange)="onFeedback($event)"
        (thumbsUp)="onThumbsUp()"
        (thumbsDown)="onThumbsDown()"
      />
      <p class="mt-4">Current feedback: {{ feedbackValue() || 'none' }}</p>
    </div>
  `,
})
export class TestComponent {
  feedbackValue = signal<'up' | 'down' | null>(null);

  onFeedback(value: 'up' | 'down' | null) {
    this.feedbackValue.set(value);
    console.log('Feedback changed:', value);
  }

  onThumbsUp() {
    console.log('Thumbs up clicked');
  }

  onThumbsDown() {
    console.log('Thumbs down clicked');
  }
}
```

**Expected:** Thumbs up/down buttons
**Check:** Selection state persists, visual feedback on click

---

### Phase 4: Container & List Components

#### 7.9 ChatContainerComponent (Full Integration)

```typescript
import { ChatContainerComponent, ChatMessage } from '@angular-ai-kit/core';
import { signal } from '@angular/core';

@Component({
  imports: [ChatContainerComponent],
  template: `
    <div class="h-screen">
      <ai-chat-container
        [messages]="messages()"
        [loading]="isLoading()"
        [title]="'Test Chat'"
        [showHeader]="true"
        [showFooter]="true"
        [showAvatars]="true"
        [autoScroll]="true"
        (messageSend)="sendMessage($event)"
        (messageCopy)="onMessageCopy($event)"
        (messageRegenerate)="onMessageRegenerate($event)"
      />
    </div>
  `,
})
export class TestComponent {
  messages = signal<ChatMessage[]>([]);
  isLoading = signal(false);

  sendMessage(content: string) {
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    this.messages.update((msgs) => [...msgs, userMsg]);

    // Simulate AI response
    this.isLoading.set(true);
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a simulated AI response to: ' + content,
        timestamp: new Date(),
      };
      this.messages.update((msgs) => [...msgs, aiMsg]);
      this.isLoading.set(false);
    }, 1500);
  }

  onMessageCopy(event: { content: string; message: ChatMessage }) {
    console.log('Message copied:', event.content);
  }

  onMessageRegenerate(message: ChatMessage) {
    console.log('Regenerate requested for:', message.id);
  }
}
```

**Expected:** Full chat interface with input, messages, auto-scroll
**Check:** Messages appear, loading state shows, auto-scrolls to bottom

#### 7.10 ConversationListComponent

```typescript
import { Conversation, ConversationListComponent } from '@angular-ai-kit/core';
import { signal } from '@angular/core';

@Component({
  imports: [ConversationListComponent],
  template: `
    <div class="w-64 border-r p-4">
      <ai-conversation-list
        [conversations]="conversations"
        [activeId]="activeId()"
        (select)="selectConversation($event)"
        (delete)="deleteConversation($event)"
      />
    </div>
  `,
})
export class TestComponent {
  activeId = signal('1');

  conversations: Conversation[] = [
    { id: '1', title: 'Chat about Angular', updatedAt: new Date() },
    {
      id: '2',
      title: 'Help with TypeScript',
      updatedAt: new Date(Date.now() - 86400000),
    },
    {
      id: '3',
      title: 'Code review',
      updatedAt: new Date(Date.now() - 172800000),
    },
  ];

  selectConversation(id: string) {
    this.activeId.set(id);
    console.log('Selected:', id);
  }

  deleteConversation(id: string) {
    console.log('Delete:', id);
  }
}
```

**Expected:** Grouped conversation list (Today, Yesterday, etc.)
**Check:** Selection highlights, delete button works

#### 7.11 PromptSuggestionsComponent

```typescript
import {
  PromptSuggestion,
  PromptSuggestionsComponent,
} from '@angular-ai-kit/core';

@Component({
  imports: [PromptSuggestionsComponent],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">Prompt Suggestions</h2>
      <ai-prompt-suggestions
        [suggestions]="suggestions"
        (select)="onSelect($event)"
      />
    </div>
  `,
})
export class TestComponent {
  suggestions: PromptSuggestion[] = [
    { label: 'Write code', prompt: 'Help me write a function that...' },
    { label: 'Explain concept', prompt: 'Explain how async/await works' },
    { label: 'Debug issue', prompt: 'I have a bug where...' },
    { label: 'Review code', prompt: 'Please review this code' },
  ];

  onSelect(suggestion: PromptSuggestion) {
    console.log('Selected:', suggestion);
  }
}
```

**Expected:** Clickable suggestion chips/buttons
**Check:** Click fires event with correct suggestion data

---

### Phase 5: Advanced Components

#### 7.12 AttachmentCardComponent

```typescript
import { AttachmentCardComponent } from '@angular-ai-kit/core';

@Component({
  imports: [AttachmentCardComponent],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">Attachment Card</h2>
      <div class="flex gap-4">
        <ai-attachment-card [file]="pdfFile" (remove)="onRemove('pdf')" />
        <ai-attachment-card [file]="imageFile" (remove)="onRemove('image')" />
      </div>
    </div>
  `,
})
export class TestComponent {
  pdfFile = new File([''], 'document.pdf', { type: 'application/pdf' });
  imageFile = new File([''], 'photo.png', { type: 'image/png' });

  onRemove(type: string) {
    console.log('Remove:', type);
  }
}
```

**Expected:** File preview cards with appropriate icons and remove button
**Check:** Different file types show different icons, remove button works

#### 7.13 CopyToClipboardDirective

```typescript
import { CopyToClipboardDirective } from '@angular-ai-kit/core';

@Component({
  imports: [CopyToClipboardDirective],
  template: `
    <div class="p-8">
      <h2 class="mb-4 font-bold">Copy to Clipboard Directive</h2>
      <button
        [aiCopyToClipboard]="'Hello, this text will be copied!'"
        (copied)="onCopied($event)"
        (copyError)="onCopyError($event)"
        class="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Click to Copy
      </button>
    </div>
  `,
})
export class TestComponent {
  onCopied(text: string) {
    console.log('Copied:', text);
  }

  onCopyError(error: Error) {
    console.error('Copy failed:', error);
  }
}
```

**Expected:** Clicking copies text to clipboard
**Check:** Text is copied, visual feedback shows

---

## 8. Run the App

```bash
ng serve
```

Open http://localhost:4200

---

## 8. Test Dark Mode

### Option A: System Preference

Toggle your system dark mode (macOS: System Settings > Appearance)

### Option B: Manual Class

Add `dark` class to `<html>` in `src/index.html`:

```html
<!doctype html>
<html lang="en" class="dark">
  ...
</html>
```

### What to Verify

- Background changes from light to dark
- Text colors invert properly
- Card backgrounds adjust
- Borders remain visible
- All components adapt to theme

---

## 9. Troubleshooting

### Styles Not Loading

1. Check `.postcssrc.json` exists
2. Check `styles.css` has all 3 lines (tailwindcss, @source, tokens import)
3. Ensure `@source` path points to `"../node_modules/@angular-ai-kit"`
4. Restart `ng serve`

### Component Not Found

```
Error: 'ChatInputComponent' is not exported from '@angular-ai-kit/core'
```

1. Check package version: `npm list @angular-ai-kit/core`
2. Should be `0.1.8` or higher
3. Try: `npm install @angular-ai-kit/core@latest`

### Icons Not Showing

Ensure ng-icons packages are installed:

```bash
npm install @ng-icons/core @ng-icons/lucide
```

### Dark Mode Not Working

1. Check styles.css imports are correct
2. Ensure `.dark` class is on `<html>` element
3. Or check system prefers-color-scheme setting

---

## 10. Quick Reference: All Exports

```typescript
// Components
import {
  // Display Components
  AiResponseComponent,
  // Input Components
  AttachmentCardComponent,
  // Chat Components
  ChatContainerComponent,
  ChatInputComponent,
  CodeBlockComponent,
  ConversationListComponent,
  CopyButtonComponent,
  FeedbackButtonsComponent,
  // UI Components
  IconButtonComponent,
  MarkdownRendererComponent,
  // Action Components
  MessageActionsComponent,
  MessageListComponent,
  PromptSuggestionsComponent,
  StreamingTextComponent,
  TypingIndicatorComponent,
  UserMessageComponent,
} from '@angular-ai-kit/core';
// Types
import {
  AssistantMessage,
  ChatMessage,
  ChatRole,
  Conversation,
  MessageStatus,
  ModelInfo,
  PromptSuggestion,
  StreamingOptions,
  SystemMessage,
  UserMessage,
} from '@angular-ai-kit/core';
// Directives
import {
  AutoResizeDirective,
  ClickOutsideDirective,
  CopyToClipboardDirective,
  FocusTrapDirective,
} from '@angular-ai-kit/core';
// Spartan UI Components
import {
  HlmAvatarImports,
  HlmBadgeImports,
  HlmButtonImports,
  HlmCommandImports,
  HlmDropdownMenuImports,
  HlmInputGroupImports,
  HlmPopoverImports,
} from '@angular-ai-kit/core';
// Services
import { CodeHighlightService, MarkdownService } from '@angular-ai-kit/core';
// Tokens (for DI)
import {
  CHAT_SERVICE,
  MARKDOWN_OPTIONS,
  STREAMING_SERVICE,
} from '@angular-ai-kit/core';
```

---

## 11. Issue Reporting Format

When reporting issues, use this format:

```
## Component: [ComponentName]
## Issue: [Brief description]
## Expected: [What should happen]
## Actual: [What actually happens]
## Screenshot: [If applicable]
## Console Errors: [If any]
```

---

## Version History

| Version | Date       | Changes                                             |
| ------- | ---------- | --------------------------------------------------- |
| 0.1.13  | 2026-01-08 | Fixed input-group focus styles, form element styles |
| 0.1.12  | 2026-01-07 | Removed border/shadow from input-group controls     |
| 0.1.11  | 2026-01-07 | Removed 3px ring from input-group focus state       |
| 0.1.8   | 2026-01-06 | Fixed @source directive for Tailwind class scanning |
| 0.1.7   | 2026-01-06 | Simplified setup - styles come from library         |
| 0.1.6   | 2026-01-06 | Fixed ng-add schematic                              |
| 0.1.5   | 2026-01-06 | Updated dependencies                                |

---

_Last updated: January 2026_
