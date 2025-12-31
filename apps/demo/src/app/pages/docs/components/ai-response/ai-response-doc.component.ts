import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
import { AiResponseComponent } from '../../../../components/ai-response';
import {
  ApiProperty,
  DocApiTableComponent,
  DocCodeBlockComponent,
  DocControlToggleComponent,
  DocDemoCardComponent,
  DocFeaturesListComponent,
  DocSectionComponent,
  DocSliderControlComponent,
} from '../../../../components/doc-ui';

/** API Input properties */
const INPUTS: ApiProperty[] = [
  {
    name: 'content',
    type: 'string',
    default: 'required',
    description: 'Markdown content to display',
  },
  {
    name: 'isStreaming',
    type: 'boolean',
    default: 'false',
    description: 'Whether content is currently streaming',
  },
  {
    name: 'speed',
    type: 'number',
    default: '20',
    description: 'Streaming speed (ms per character)',
  },
  {
    name: 'showActions',
    type: 'boolean',
    default: 'true',
    description: 'Show action buttons (copy, regenerate, thumbs)',
  },
  {
    name: 'showCursor',
    type: 'boolean',
    default: 'true',
    description: 'Show blinking cursor during streaming',
  },
  {
    name: 'customClasses',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

/** API Output properties */
const OUTPUTS: ApiProperty[] = [
  {
    name: 'copy',
    type: 'string',
    default: '-',
    description: 'Emits full content when copy is clicked',
  },
  {
    name: 'regenerate',
    type: 'void',
    default: '-',
    description: 'Emits when regenerate button is clicked',
  },
  {
    name: 'thumbsUp',
    type: 'void',
    default: '-',
    description: 'Emits when thumbs up is clicked',
  },
  {
    name: 'thumbsDown',
    type: 'void',
    default: '-',
    description: 'Emits when thumbs down is clicked',
  },
  {
    name: 'streamComplete',
    type: 'void',
    default: '-',
    description: 'Emits when streaming animation completes',
  },
];

/** Install command */
const INSTALL_CODE =
  "import { AiResponseComponent } from '@angular-ai-kit/core';";

/** Accessibility features */
const ACCESSIBILITY = [
  'Uses semantic HTML for content structure',
  'Code blocks have accessible copy buttons',
  'Action buttons have aria-labels',
  'Supports keyboard navigation',
  'Respects prefers-reduced-motion for animations',
];

/** Code example */
const USAGE_CODE = `<app-ai-response
  [content]="response"
  [isStreaming]="isLoading"
  [speed]="20"
  [showActions]="true"
  (copy)="handleCopy($event)"
  (regenerate)="handleRegenerate()"
  (thumbsUp)="handleThumbsUp()"
  (thumbsDown)="handleThumbsDown()"
/>`;

/** Comprehensive demo markdown content showcasing all features */
const DEMO_MARKDOWN = `# Welcome to Angular AI Kit

This is a **comprehensive demonstration** of all markdown features supported by the AI Response component.

## Text Formatting

You can use **bold text**, *italic text*, and ~~strikethrough~~. You can also combine them: ***bold and italic***, or ~~**bold strikethrough**~~.

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item 2.1
  - Nested item 2.2
    - Deeply nested item
- Third item

### Ordered Lists

1. First step
2. Second step
   1. Sub-step 2.1
   2. Sub-step 2.2
3. Third step

### Task Lists

- [x] Completed task
- [x] Another completed task
- [ ] Pending task
- [ ] Future task

## Code Examples

### TypeScript

\`\`\`typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

function formatMessage(message: ChatMessage): string {
  const { role, content, timestamp } = message;
  return \`[\${timestamp.toISOString()}] \${role}: \${content}\`;
}

const message: ChatMessage = {
  id: crypto.randomUUID(),
  role: 'assistant',
  content: 'Hello, how can I help you today?',
  timestamp: new Date()
};

console.log(formatMessage(message));
\`\`\`

### Python

\`\`\`python
from dataclasses import dataclass
from datetime import datetime
from typing import Literal

@dataclass
class ChatMessage:
    id: str
    role: Literal['user', 'assistant', 'system']
    content: str
    timestamp: datetime

def format_message(message: ChatMessage) -> str:
    return f"[{message.timestamp.isoformat()}] {message.role}: {message.content}"

# Example usage
message = ChatMessage(
    id="123",
    role="assistant",
    content="Hello! How can I assist you?",
    timestamp=datetime.now()
)
print(format_message(message))
\`\`\`

### JSON Configuration

\`\`\`json
{
  "name": "angular-ai-kit",
  "version": "1.0.0",
  "features": {
    "markdown": true,
    "streaming": true,
    "codeHighlighting": true
  },
  "themes": ["light", "dark"]
}
\`\`\`

### CSS Styling

\`\`\`css
.ai-response {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem;
}

.ai-response:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
\`\`\`

### Bash Commands

\`\`\`bash
# Install dependencies
npm install @angular-ai-kit/core

# Generate a new component
npx nx generate @angular-ai-kit/core:component my-chat

# Run the development server
npm run dev
\`\`\`

Inline code is also supported: \`const greeting = "Hello, World!";\`

## Blockquotes

> This is a simple blockquote. It's great for highlighting important information.

> **Note:** You can use formatting inside blockquotes too.
>
> Even multiple paragraphs work!
>
> > And nested blockquotes as well.

## Tables

| Feature | Status | Notes |
|:--------|:------:|------:|
| Markdown Rendering | ✅ | Full GFM support |
| Code Highlighting | ✅ | Multiple languages |
| Streaming Text | ✅ | Character-by-character |
| Dark Mode | ✅ | CSS variables |
| Copy to Clipboard | ✅ | Per code block |

## Links

- [Angular Documentation](https://angular.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [GitHub Repository](https://github.com/angular-ai-kit)

## Horizontal Rules

Content above the rule.

---

Content below the rule.

## Mathematical Expressions

While LaTeX isn't natively supported, you can write equations inline: \`E = mc²\` or \`a² + b² = c²\`.

## Summary

This component supports:

1. **Rich text formatting** - Bold, italic, strikethrough
2. **Structured content** - Lists, tables, blockquotes
3. **Code presentation** - Syntax highlighting for 20+ languages
4. **Interactive features** - Copy buttons, action buttons
5. **Accessibility** - Full ARIA support, keyboard navigation`;

/**
 * AI Response Documentation Component
 */
@Component({
  selector: 'app-ai-response-doc',
  templateUrl: './ai-response-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    AiResponseComponent,
    HlmButton,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocControlToggleComponent,
    DocSliderControlComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-ai-response-doc block',
  },
})
export class AiResponseDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly usageCode = USAGE_CODE;
  readonly installCode = INSTALL_CODE;
  readonly accessibility = ACCESSIBILITY;

  // Reference to component
  private aiResponse = viewChild(AiResponseComponent);

  // Demo content
  demoContent = signal(DEMO_MARKDOWN);

  // Configuration
  isStreaming = signal(false);
  showActions = signal(true);
  showCursor = signal(true);
  speed = signal(20);

  // Restart streaming demo
  restartDemo(): void {
    this.aiResponse()?.reset();
    this.isStreaming.set(true);
  }

  // Toggle streaming
  toggleStreaming(): void {
    this.isStreaming.update((v) => !v);
  }

  // Handle copy
  handleCopy(content: string): void {
    console.log('Copied:', content.substring(0, 50) + '...');
  }

  // Handle regenerate
  handleRegenerate(): void {
    console.log('Regenerate clicked');
  }

  // Handle thumbs up
  handleThumbsUp(): void {
    console.log('Thumbs up!');
  }

  // Handle thumbs down
  handleThumbsDown(): void {
    console.log('Thumbs down!');
  }
}
