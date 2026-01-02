import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/**
 * FAQ item interface
 */
interface FaqItem {
  question: string;
  answer: string;
  code?: string;
  category: string;
}

/**
 * FAQ Component
 *
 * Frequently asked questions about Angular AI Kit.
 */
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    DocSectionComponent,
    DocCodeBlockComponent,
    RouterLink,
    FormsModule,
  ],
})
export class FaqComponent {
  /** Search query */
  searchQuery = signal('');

  /** All FAQ items */
  readonly faqItems: FaqItem[] = [
    // Installation
    {
      category: 'Installation',
      question: 'How do I install Angular AI Kit?',
      answer: `Install the core package and its peer dependencies:`,
      code: `npm install @angular-ai-kit/core @angular-ai-kit/utils
# or
pnpm add @angular-ai-kit/core @angular-ai-kit/utils`,
    },
    {
      category: 'Installation',
      question: 'What Angular version is required?',
      answer: `Angular AI Kit requires **Angular 17 or higher**. It's optimized for Angular 19+ with signals and standalone components.`,
    },
    {
      category: 'Installation',
      question: 'Do I need Tailwind CSS?',
      answer: `Yes, Tailwind CSS is required for styling. Angular AI Kit uses Tailwind utility classes and CSS custom properties. Install Tailwind CSS v4 and configure it for your project.`,
    },
    {
      category: 'Installation',
      question: 'How do I set up Tailwind CSS with Angular AI Kit?',
      answer: `Add Tailwind to your project and import the CSS variables:`,
      code: `// styles.css
@import "tailwindcss";

:root {
  --background: theme('colors.white');
  --foreground: theme('colors.zinc.950');
  --card: theme('colors.zinc.50');
  --border: theme('colors.zinc.200');
  /* ... more variables */
}

.dark {
  --background: theme('colors.zinc.950');
  --foreground: theme('colors.zinc.50');
  /* ... dark mode values */
}`,
    },
    // Components
    {
      category: 'Components',
      question: 'How do I display AI responses with markdown?',
      answer: `Use the AiResponseComponent which includes built-in markdown rendering:`,
      code: `<ai-response
  [content]="message.content"
  [isStreaming]="isStreaming()"
/>`,
    },
    {
      category: 'Components',
      question: 'How do I handle streaming responses?',
      answer: `Set the isStreaming input to true while streaming, and update the content as chunks arrive:`,
      code: `// In your component
streamingContent = signal('');
isStreaming = signal(false);

async streamResponse() {
  this.isStreaming.set(true);

  for await (const chunk of api.stream()) {
    this.streamingContent.update(c => c + chunk);
  }

  this.isStreaming.set(false);
}

// In template
<ai-response
  [content]="streamingContent()"
  [isStreaming]="isStreaming()"
/>`,
    },
    {
      category: 'Components',
      question: 'How do I add custom actions to messages?',
      answer: `Use content projection to add custom actions:`,
      code: `<ai-response [content]="content">
  <div slot="actions">
    <button (click)="share()">Share</button>
    <button (click)="bookmark()">Bookmark</button>
  </div>
</ai-response>`,
    },
    {
      category: 'Components',
      question: 'How do I customize component styles?',
      answer: `Use the customClasses input to add Tailwind classes, or override CSS variables for global theming:`,
      code: `<!-- Using customClasses -->
<ai-chat-input
  customClasses="rounded-full border-2 border-primary"
/>

<!-- Using CSS variables (global) -->
:root {
  --primary: theme('colors.blue.600');
}`,
    },
    // Theming
    {
      category: 'Theming',
      question: 'How does dark mode work?',
      answer: `Dark mode is controlled by adding the .dark class to the <html> element. CSS variables automatically switch values based on this class.`,
      code: `// Toggle dark mode
document.documentElement.classList.toggle('dark');

// Or use the ThemeService
this.themeService.toggle();`,
    },
    {
      category: 'Theming',
      question: 'How do I create a custom color theme?',
      answer: `Override the CSS variables in your styles.css with your desired colors:`,
      code: `/* Custom blue theme */
:root {
  --primary: theme('colors.blue.600');
  --primary-foreground: theme('colors.white');
  --accent: theme('colors.blue.100');
}

.dark {
  --primary: theme('colors.blue.400');
  --primary-foreground: theme('colors.blue.950');
  --accent: theme('colors.blue.900');
}`,
    },
    // API Integration
    {
      category: 'API Integration',
      question: 'How do I connect to OpenAI?',
      answer: `Never expose API keys in the frontend. Create a backend proxy that handles API calls:`,
      code: `// Frontend service
async sendMessage(content: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content }] }),
  });
  return response.json();
}

// Backend handles the actual OpenAI call with API key`,
    },
    {
      category: 'API Integration',
      question: 'How do I implement streaming with fetch?',
      answer: `Use the Fetch API with ReadableStream to handle SSE streams:`,
      code: `const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages, stream: true }),
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  // Parse SSE data and update UI
}`,
    },
    // Troubleshooting
    {
      category: 'Troubleshooting',
      question: 'Components are not styled correctly',
      answer: `Make sure you have:\n1. Tailwind CSS installed and configured\n2. CSS variables defined in your styles.css\n3. ViewEncapsulation.None on components using Tailwind`,
    },
    {
      category: 'Troubleshooting',
      question: 'Markdown is not rendering',
      answer: `Check that:\n1. The content is valid markdown\n2. You're using the correct component (AiResponseComponent includes markdown)\n3. The MarkdownService is available (provided in root by default)`,
    },
    {
      category: 'Troubleshooting',
      question: 'Code highlighting is not working',
      answer: `Ensure you have:\n1. Highlight.js styles imported\n2. The language registered with highlight.js\n3. The correct language specified in code blocks`,
      code: `// Register additional languages
import { CodeHighlightService } from '@angular-ai-kit/core';

constructor() {
  const highlight = inject(CodeHighlightService);
  highlight.registerLanguage('rust', rustLanguage);
}`,
    },
    {
      category: 'Troubleshooting',
      question: 'Dark mode is not switching',
      answer: `Verify that:\n1. The .dark class is being added to <html>\n2. CSS variables have .dark values defined\n3. You're not using explicit colors (use semantic classes like bg-background)`,
    },
    // Performance
    {
      category: 'Performance',
      question: 'How do I handle long conversations?',
      answer: `For conversations with many messages:\n1. Use virtual scrolling (Angular CDK)\n2. Lazy load older messages\n3. Truncate message history before sending to API`,
    },
    {
      category: 'Performance',
      question: 'How do I optimize streaming performance?',
      answer: `Tips for smooth streaming:\n1. Batch DOM updates using requestAnimationFrame\n2. Use OnPush change detection\n3. Avoid re-rendering unchanged messages`,
    },
  ];

  /** Filtered FAQ items based on search */
  get filteredFaqItems(): FaqItem[] {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.faqItems;

    return this.faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }

  /** Get unique categories */
  get categories(): string[] {
    return [...new Set(this.faqItems.map((item) => item.category))];
  }

  /** Get items by category */
  getItemsByCategory(category: string): FaqItem[] {
    return this.filteredFaqItems.filter((item) => item.category === category);
  }

  /** Update search query */
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }
}
