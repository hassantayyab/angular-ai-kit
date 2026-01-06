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

### Option A: Manual Installation (Recommended)

The manual approach ensures all dependencies and styles are properly configured:

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

### Option B: Using ng-add (Future versions)

> **Note:** The `ng-add` schematic will be fixed in version 0.1.6+. For now, use Manual Installation above.

```bash
ng add @angular-ai-kit/core
```

---

## 3. Configure Tailwind CSS v4

### Create `.postcssrc.json` in project root:

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
/* Angular AI Kit - Auto-generated styles */
@import 'tailwindcss';

/* Scan library classes in node_modules */
@source '../node_modules/@angular-ai-kit';

/* Map CSS variables to Tailwind color utilities */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-border: var(--border);
  --color-border-hover: var(--border-hover);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-code: var(--code);
  --color-code-foreground: var(--code-foreground);
  --color-foreground-muted: var(--foreground-muted);
  --color-message-user-bg: var(--message-user-bg);
  --color-message-assistant-bg: var(--message-assistant-bg);
  --color-message-system-bg: var(--message-system-bg);
  --color-avatar-user: var(--avatar-user);
  --color-avatar-assistant: var(--avatar-assistant);
  --color-avatar-system: var(--avatar-system);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* CSS Variables for Angular AI Kit */
@layer base {
  :root {
    --background: theme('colors.zinc.50');
    --foreground: theme('colors.zinc.950');
    --card: theme('colors.white');
    --card-foreground: theme('colors.zinc.900');
    --popover: theme('colors.white');
    --popover-foreground: theme('colors.zinc.800');
    --muted: theme('colors.zinc.100');
    --muted-foreground: theme('colors.zinc.500');
    --accent: theme('colors.zinc.100');
    --accent-foreground: theme('colors.zinc.900');
    --border: theme('colors.zinc.200');
    --border-hover: theme('colors.zinc.300');
    --input: theme('colors.zinc.50');
    --ring: theme('colors.zinc.400');
    --primary: theme('colors.zinc.800');
    --primary-foreground: theme('colors.zinc.50');
    --secondary: theme('colors.zinc.100');
    --secondary-foreground: theme('colors.zinc.800');
    --destructive: theme('colors.red.500');
    --destructive-foreground: theme('colors.zinc.50');
    --code: theme('colors.zinc.100');
    --code-foreground: theme('colors.zinc.900');
    --foreground-muted: theme('colors.zinc.500');
    --message-user-bg: theme('colors.zinc.100');
    --message-assistant-bg: theme('colors.white');
    --message-system-bg: theme('colors.zinc.50');
    --avatar-user: theme('colors.zinc.700');
    --avatar-assistant: theme('colors.zinc.800');
    --avatar-system: theme('colors.zinc.400');
    --radius: 0.5rem;
  }

  /* Auto dark mode detection */
  @media (prefers-color-scheme: dark) {
    :root {
      --background: theme('colors.zinc.950');
      --foreground: theme('colors.zinc.50');
      --card: theme('colors.zinc.900');
      --card-foreground: theme('colors.zinc.100');
      --popover: theme('colors.zinc.900');
      --popover-foreground: theme('colors.zinc.100');
      --muted: theme('colors.zinc.900');
      --muted-foreground: theme('colors.zinc.400');
      --accent: theme('colors.zinc.800');
      --accent-foreground: theme('colors.zinc.50');
      --border: theme('colors.zinc.800');
      --border-hover: theme('colors.zinc.600');
      --input: theme('colors.zinc.900');
      --ring: theme('colors.zinc.500');
      --primary: theme('colors.zinc.100');
      --primary-foreground: theme('colors.zinc.900');
      --secondary: theme('colors.zinc.800');
      --secondary-foreground: theme('colors.zinc.50');
      --code: theme('colors.zinc.900');
      --code-foreground: theme('colors.zinc.100');
      --foreground-muted: theme('colors.zinc.500');
      --message-user-bg: theme('colors.zinc.800');
      --message-assistant-bg: theme('colors.zinc.900');
      --message-system-bg: theme('colors.zinc.800/50');
      --avatar-user: theme('colors.zinc.600');
      --avatar-assistant: theme('colors.zinc.700');
      --avatar-system: theme('colors.zinc.500');
    }
  }

  /* Manual dark mode override */
  .dark {
    --background: theme('colors.zinc.950');
    --foreground: theme('colors.zinc.50');
    --card: theme('colors.zinc.900');
    --card-foreground: theme('colors.zinc.100');
    --popover: theme('colors.zinc.900');
    --popover-foreground: theme('colors.zinc.100');
    --muted: theme('colors.zinc.900');
    --muted-foreground: theme('colors.zinc.400');
    --accent: theme('colors.zinc.800');
    --accent-foreground: theme('colors.zinc.50');
    --border: theme('colors.zinc.800');
    --border-hover: theme('colors.zinc.600');
    --input: theme('colors.zinc.900');
    --ring: theme('colors.zinc.500');
    --primary: theme('colors.zinc.100');
    --primary-foreground: theme('colors.zinc.900');
    --secondary: theme('colors.zinc.800');
    --secondary-foreground: theme('colors.zinc.50');
    --code: theme('colors.zinc.900');
    --code-foreground: theme('colors.zinc.100');
    --foreground-muted: theme('colors.zinc.500');
    --message-user-bg: theme('colors.zinc.800');
    --message-assistant-bg: theme('colors.zinc.900');
    --message-system-bg: theme('colors.zinc.800/50');
    --avatar-user: theme('colors.zinc.600');
    --avatar-assistant: theme('colors.zinc.700');
    --avatar-system: theme('colors.zinc.500');
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: system-ui, sans-serif;
  }
}

/* Code block styles */
@layer components {
  .ai-code-block-wrapper,
  .code-block-wrapper {
    border-radius: 0.5rem;
    overflow: hidden;
    margin: 1rem 0;
    background: var(--code);
  }

  .ai-code-block-header,
  .code-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: var(--code);
  }

  .ai-code-block-language,
  .code-block-language {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--muted-foreground);
    text-transform: lowercase;
  }

  .ai-code-block-copy,
  .code-block-copy {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    color: var(--muted-foreground);
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 0.375rem;
    transition: all 0.15s ease;
  }

  .ai-code-block-copy:hover,
  .code-block-copy:hover {
    color: var(--foreground);
    background: var(--accent);
  }

  .ai-code-block-wrapper pre,
  .code-block-wrapper pre {
    margin: 0 !important;
    padding: 1rem !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    overflow-x: auto;
  }

  .ai-code-block-wrapper pre code,
  .code-block-wrapper pre code {
    font-size: 0.875rem;
    line-height: 1.7;
    font-family:
      ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, monospace;
    background: transparent !important;
    padding: 0 !important;
  }

  /* AI Response content styling */
  .ai-response-content h1,
  .ai-response-content h2,
  .ai-response-content h3 {
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .ai-response-content h1 {
    font-size: 1.5rem;
  }
  .ai-response-content h2 {
    font-size: 1.25rem;
  }
  .ai-response-content h3 {
    font-size: 1.125rem;
  }

  .ai-response-content p {
    margin-bottom: 0.75rem;
    line-height: 1.7;
  }

  .ai-response-content ul,
  .ai-response-content ol {
    margin: 0.5rem 0 0.75rem 1.5rem;
  }

  .ai-response-content ul {
    list-style-type: disc;
  }
  .ai-response-content ol {
    list-style-type: decimal;
  }

  .ai-response-content li {
    margin-bottom: 0.25rem;
    line-height: 1.6;
  }

  .ai-response-content :not(pre) > code {
    padding: 0.125rem 0.5rem;
    border-radius: 0.375rem;
    background-color: var(--muted);
    font-size: 0.875em;
  }

  .ai-response-content blockquote {
    border-left: 4px solid var(--border);
    padding-left: 1rem;
    margin: 1rem 0;
    color: var(--muted-foreground);
  }

  .ai-response-content a {
    color: var(--primary);
    text-decoration: underline;
  }

  .ai-response-content a:hover {
    opacity: 0.8;
  }

  .ai-response-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  .ai-response-content th,
  .ai-response-content td {
    border: 1px solid var(--border);
    padding: 0.5rem;
    text-align: left;
  }

  .ai-response-content th {
    background: var(--muted);
    font-weight: 600;
  }
}
```

---

## 5. Verify Installation

### Check package.json

Your `package.json` should include these dependencies:

```json
{
  "dependencies": {
    "@angular-ai-kit/core": "^0.1.5",
    "@angular-ai-kit/utils": "^0.1.1",
    "@angular-ai-kit/tokens": "^0.1.1",
    "@angular/cdk": "^21.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "highlight.js": "^11.0.0",
    "marked": "^17.0.0",
    "dompurify": "^3.0.0",
    "@ng-icons/core": "^32.0.0",
    "@ng-icons/lucide": "^32.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^3.0.0",
    "class-variance-authority": "^0.7.0",
    "@spartan-ng/brain": "^0.0.1-alpha.597"
  }
}
```

### Verify configuration files

- `.postcssrc.json` - Contains Tailwind PostCSS plugin config
- `src/styles.css` - Contains `/* Angular AI Kit - Auto-generated styles */` at the top

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

## 7. Test: All Components

### Update `src/app/app.component.ts`:

```typescript
import {
  ChatInputComponent,
  CopyButtonComponent,
  MessageBubbleComponent,
  PromptSuggestion,
  PromptSuggestionsComponent,
  StreamingTextComponent,
  TypingIndicatorComponent,
} from '@angular-ai-kit/core';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [
    ChatInputComponent,
    TypingIndicatorComponent,
    StreamingTextComponent,
    MessageBubbleComponent,
    CopyButtonComponent,
    PromptSuggestionsComponent,
  ],
  template: `
    <div class="min-h-screen bg-background p-8">
      <h1 class="text-2xl font-bold text-foreground mb-8">
        Angular AI Kit - Component Test Suite
      </h1>

      <div class="max-w-4xl mx-auto space-y-12">

        <!-- 1. Typing Indicator -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-foreground border-b border-border pb-2">
            1. Typing Indicator
          </h2>
          <div class="p-6 bg-card rounded-lg border border-border">
            <ai-typing-indicator [text]="'AI is thinking...'" />
          </div>
          <p class="text-sm text-muted-foreground">
            ✓ Should show animated bouncing dots with text
          </p>
        </section>

        <!-- 2. Streaming Text -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-foreground border-b border-border pb-2">
            2. Streaming Text
          </h2>
          <div class="p-6 bg-card rounded-lg border border-border">
            <ai-streaming-text
              [text]="streamingText()"
              [speed]="30"
              [showCursor]="true"
            />
          </div>
          <button
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
            (click)="resetStreaming()"
          >
            Restart Stream
          </button>
          <p class="text-sm text-muted-foreground">
            ✓ Text should appear character by character with blinking cursor
          </p>
        </section>

        <!-- 3. Message Bubbles -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-foreground border-b border-border pb-2">
            3. Message Bubbles
          </h2>
          <div class="space-y-4 p-6 bg-card rounded-lg border border-border">
            <ai-message-bubble
              [message]="userMessage"
              [showAvatar]="true"
            />
            <ai-message-bubble
              [message]="assistantMessage"
              [showAvatar]="true"
            />
            <ai-message-bubble
              [message]="codeMessage"
              [showAvatar]="true"
            />
          </div>
          <p class="text-sm text-muted-foreground">
            ✓ User messages should be styled differently from assistant<br>
            ✓ Avatars should display<br>
            ✓ Markdown and code blocks should render properly
          </p>
        </section>

        <!-- 4. Copy Button -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-foreground border-b border-border pb-2">
            4. Copy Button
          </h2>
          <div class="p-6 bg-card rounded-lg border border-border">
            <div class="flex items-center gap-3">
              <code class="px-3 py-2 bg-muted rounded-md text-sm font-mono">
                npm install @angular-ai-kit/core
              </code>
              <ai-copy-button [text]="'npm install @angular-ai-kit/core'" />
            </div>
          </div>
          <p class="text-sm text-muted-foreground">
            ✓ Click button to copy text to clipboard<br>
            ✓ Should show checkmark icon after copying
          </p>
        </section>

        <!-- 5. Prompt Suggestions -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-foreground border-b border-border pb-2">
            5. Prompt Suggestions
          </h2>
          <div class="p-6 bg-card rounded-lg border border-border">
            <ai-prompt-suggestions
              [suggestions]="suggestions"
              (suggestionSelect)="onSuggestionClick($event)"
            />
          </div>
          <p class="text-sm text-muted-foreground">
            ✓ Should display clickable suggestion chips<br>
            ✓ Check console for click events
          </p>
        </section>

        <!-- 6. Chat Input (Full Featured) -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-foreground border-b border-border pb-2">
            6. Chat Input (Full Featured)
          </h2>
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
          />
          <p class="text-sm text-muted-foreground">
            ✓ All buttons should be visible and functional<br>
            ✓ Enter sends, Shift+Enter for new line<br>
            ✓ Suggestions appear when input is empty
          </p>
        </section>

        <!-- 7. Chat Input (Minimal) -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-foreground border-b border-border pb-2">
            7. Chat Input (Minimal - Buttons Hidden)
          </h2>
          <ai-chat-input
            [placeholder]="'Simple input...'"
            [showContextButton]="false"
            [showAttachmentButton]="false"
            [showResearchButton]="false"
            [showSourcesButton]="false"
            [showModelName]="false"
            [showMicButton]="false"
            [showSuggestions]="false"
            (messageSend)="handleSend($event)"
          />
          <p class="text-sm text-muted-foreground">
            ✓ Should show minimal input with only send button
          </p>
        </section>

      </div>

      <!-- Output Panel -->
      <div class="fixed bottom-4 right-4 w-80 p-4 bg-card rounded-lg border border-border shadow-lg">
        <h3 class="font-medium mb-2">Last Action:</h3>
        <p class="text-sm text-muted-foreground">{{ lastAction() || 'No actions yet' }}</p>
      </div>
    </div>
  `,
})
export class AppComponent {
  isLoading = signal(false);
  lastAction = signal('');
  streamingText = signal(
    'Hello! I am an AI assistant powered by Angular AI Kit. I can help you with coding, writing, analysis, and much more. This text is streaming character by character to demonstrate the StreamingTextComponent.'
  );

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

  userMessage = {
    id: '1',
    role: 'user' as const,
    content: 'How do I create a reactive form in Angular?',
    timestamp: new Date(),
  };

  assistantMessage = {
    id: '2',
    role: 'assistant' as const,
    content: `To create a reactive form in Angular, you need to:

1. Import **ReactiveFormsModule** in your component
2. Create a **FormGroup** with **FormControl** instances
3. Bind the form to your template using **formGroup** directive

Here's a quick example:`,
    timestamp: new Date(),
  };

  codeMessage = {
    id: '3',
    role: 'assistant' as const,
    content: `\`\`\`typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Name">
      <input formControlName="email" placeholder="Email">
      <button type="submit">Submit</button>
    </form>
  \`
})
export class MyFormComponent {
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  onSubmit() {
    console.log(this.form.value);
  }
}
\`\`\``,
    timestamp: new Date(),
  };

  resetStreaming() {
    this.streamingText.set('');
    setTimeout(() => {
      this.streamingText.set(
        'Hello! I am an AI assistant powered by Angular AI Kit. I can help you with coding, writing, analysis, and much more. This text is streaming character by character to demonstrate the StreamingTextComponent.'
      );
    }, 100);
    this.lastAction.set('Streaming text reset');
  }

  handleSend(message: string) {
    console.log('📤 Message sent:', message);
    this.lastAction.set(
      `Sent: "${message.slice(0, 50)}${message.length > 50 ? '...' : ''}"`
    );

    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  handleFiles(files: File[]) {
    console.log(
      '📎 Files:',
      files.map((f) => f.name)
    );
    this.lastAction.set(`Files: ${files.map((f) => f.name).join(', ')}`);
  }

  onSuggestionClick(suggestion: PromptSuggestion) {
    console.log('💡 Suggestion:', suggestion.label);
    this.lastAction.set(`Suggestion: ${suggestion.label}`);
  }
}
```

---

## 8. Run the App

```bash
ng serve
```

Open http://localhost:4200

---

## 9. Test Dark Mode

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

## 10. Component Test Checklist

### ChatInputComponent

| Feature                   | Status | Notes                     |
| ------------------------- | ------ | ------------------------- |
| Basic text input          | ⬜     | Type and see text         |
| Send with Enter           | ⬜     | Press Enter to send       |
| New line with Shift+Enter | ⬜     | Should not send           |
| Clear with Escape         | ⬜     | Should clear input        |
| Disabled state            | ⬜     | Should disable after send |
| Placeholder text          | ⬜     | Shows when empty          |
| Auto-resize textarea      | ⬜     | Grows with content        |
| Attachment button         | ⬜     | Opens file picker         |
| File preview              | ⬜     | Shows attached files      |
| Remove attachment         | ⬜     | X button removes file     |
| Context button (@)        | ⬜     | Opens mention popover     |
| Model selector            | ⬜     | Dropdown with options     |
| Sources dropdown          | ⬜     | Toggle switches           |
| Research mode toggle      | ⬜     | Lightbulb button          |
| Mic button                | ⬜     | Recording toggle          |
| Suggestions display       | ⬜     | Show when input empty     |
| Suggestion click          | ⬜     | Populates input           |

### TypingIndicatorComponent

| Feature       | Status | Notes                  |
| ------------- | ------ | ---------------------- |
| Animated dots | ⬜     | Bouncing animation     |
| Custom text   | ⬜     | Displays provided text |

### StreamingTextComponent

| Feature             | Status | Notes                   |
| ------------------- | ------ | ----------------------- |
| Character streaming | ⬜     | Text appears gradually  |
| Cursor animation    | ⬜     | Blinking cursor         |
| Speed control       | ⬜     | Adjust with speed input |
| Complete callback   | ⬜     | Fires when done         |

### MessageBubbleComponent

| Feature                 | Status | Notes               |
| ----------------------- | ------ | ------------------- |
| User message style      | ⬜     | Distinct styling    |
| Assistant message style | ⬜     | Different from user |
| Avatar display          | ⬜     | Shows when enabled  |
| Markdown rendering      | ⬜     | Bold, italic, lists |
| Code block rendering    | ⬜     | Syntax highlighting |
| Copy code button        | ⬜     | In code blocks      |

### CopyButtonComponent

| Feature           | Status | Notes                |
| ----------------- | ------ | -------------------- |
| Copy to clipboard | ⬜     | Click copies text    |
| Success feedback  | ⬜     | Checkmark icon       |
| Reset after delay | ⬜     | Returns to copy icon |

### PromptSuggestionsComponent

| Feature             | Status | Notes           |
| ------------------- | ------ | --------------- |
| Display suggestions | ⬜     | Shows all items |
| Click to select     | ⬜     | Emits event     |
| Hover state         | ⬜     | Visual feedback |

---

## 11. Troubleshooting

### Styles Not Loading

1. Check `.postcssrc.json` exists
2. Check `styles.css` has Tailwind import: `@import 'tailwindcss';`
3. Restart `ng serve`

### Component Not Found

```
Error: 'ChatInputComponent' is not exported from '@angular-ai-kit/core'
```

1. Check package version: `npm list @angular-ai-kit/core`
2. Should be `0.1.3` or higher
3. Try: `npm install @angular-ai-kit/core@latest`

### Missing Peer Dependencies

```
npm WARN peer dep missing: @spartan-ng/ui-avatar-brain
```

Run `ng add @angular-ai-kit/core` again or manually install:

```bash
npm install @spartan-ng/ui-avatar-brain @spartan-ng/ui-button-brain ...
```

### Icons Not Showing

Ensure ng-icons packages are installed:

```bash
npm install @ng-icons/core @ng-icons/lucide
```

### Dark Mode Not Working

1. Check CSS variables are in `styles.css`
2. Ensure `.dark` class is on `<html>` element
3. Or check system prefers-color-scheme setting

---

## 12. Quick Reference: All Exports

```typescript
// Components
import {
  AttachmentCardComponent,
  ChatInputComponent,
  CopyButtonComponent,
  MessageBubbleComponent,
  PromptSuggestionsComponent,
  StreamingTextComponent,
  TypingIndicatorComponent,
} from '@angular-ai-kit/core';
// Types
import {
  ChatMessage,
  ContextItem,
  MessageRole,
  ModelOption,
  PromptSuggestion,
  SourceOption,
  SuggestionsPosition,
} from '@angular-ai-kit/core';
```

---

## Version History

| Version | Date       | Changes                                               |
| ------- | ---------- | ----------------------------------------------------- |
| 0.1.6   | TBD        | Fixed ng-add schematic (includes compiled schematics) |
| 0.1.5   | 2026-01-06 | Updated dependencies                                  |
| 0.1.3   | 2025-01-06 | Full-featured ChatInput with embedded Spartan UI      |
| 0.1.2   | -          | Initial release                                       |

---

_Last updated: January 2026_
