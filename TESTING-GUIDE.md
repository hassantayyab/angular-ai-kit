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
@import '@angular-ai-kit/tokens/tokens/styles.css';
```

**That's it!** All theme variables, component styles, and dark mode support are included.

---

## 5. Verify Installation

### Check package.json

Your `package.json` should include these dependencies:

```json
{
  "dependencies": {
    "@angular-ai-kit/core": "^0.1.7",
    "@angular-ai-kit/utils": "^0.1.7",
    "@angular-ai-kit/tokens": "^0.1.7",
    "@angular/cdk": "^21.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0"
  }
}
```

### Verify configuration files

- `.postcssrc.json` - Contains Tailwind PostCSS plugin config
- `src/styles.css` - Contains the 2-line import

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

## 7. Run the App

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
2. Check `styles.css` has the 2 imports
3. Restart `ng serve`

### Component Not Found

```
Error: 'ChatInputComponent' is not exported from '@angular-ai-kit/core'
```

1. Check package version: `npm list @angular-ai-kit/core`
2. Should be `0.1.7` or higher
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

| Version | Date       | Changes                                     |
| ------- | ---------- | ------------------------------------------- |
| 0.1.7   | 2026-01-06 | Simplified setup - styles come from library |
| 0.1.6   | 2026-01-06 | Fixed ng-add schematic                      |
| 0.1.5   | 2026-01-06 | Updated dependencies                        |

---

_Last updated: January 2026_
