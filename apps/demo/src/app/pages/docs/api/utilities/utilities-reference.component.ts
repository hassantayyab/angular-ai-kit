import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/**
 * Utilities Reference
 *
 * Documentation for utility functions.
 */
@Component({
  selector: 'app-utilities-reference',
  templateUrl: './utilities-reference.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DocSectionComponent, DocCodeBlockComponent, RouterLink],
})
export class UtilitiesReferenceComponent {
  // cn utility
  readonly cnCode = `// cn() - Class Name Utility
// Combines clsx and tailwind-merge for dynamic class names

import { cn } from '@angular-ai-kit/utils';

// Basic usage
cn('text-red-500', 'bg-blue-500')
// => 'text-red-500 bg-blue-500'

// Conditional classes
cn('base-class', {
  'active': isActive,
  'disabled': isDisabled,
})
// => 'base-class active' (if isActive is true)

// Merging conflicting Tailwind classes
cn('px-4 py-2', 'px-6')
// => 'py-2 px-6' (tailwind-merge handles conflicts)

// Multiple arguments
cn(
  'flex items-center',
  condition && 'justify-between',
  anotherCondition ? 'gap-4' : 'gap-2',
  customClasses
)

// In a computed signal
containerClasses = computed(() => {
  return cn(
    'rounded-lg border',
    {
      'border-primary': this.isSelected(),
      'border-border': !this.isSelected(),
    },
    this.customClasses()
  );
});`;

  // formatDate utility
  readonly formatDateCode = `// formatDate() - Date Formatting Utility
import { formatDate } from '@angular-ai-kit/utils';

// Format a date with default options
formatDate(new Date())
// => '12/25/2024, 10:30 AM'

// Custom format options
formatDate(new Date(), {
  dateStyle: 'long',
  timeStyle: 'short',
})
// => 'December 25, 2024 at 10:30 AM'

// Relative time
formatDate(new Date(), { relative: true })
// => 'just now', '5 minutes ago', 'yesterday', etc.

// With locale
formatDate(new Date(), {
  locale: 'de-DE',
  dateStyle: 'full',
})
// => 'Mittwoch, 25. Dezember 2024'`;

  // formatTokenCount utility
  readonly formatTokensCode = `// formatTokenCount() - Token Count Formatting
import { formatTokenCount } from '@angular-ai-kit/utils';

// Format token numbers
formatTokenCount(1234)
// => '1,234'

formatTokenCount(1234567)
// => '1.23M'

formatTokenCount(1234, { abbreviate: false })
// => '1,234'

// With unit
formatTokenCount(5000, { showUnit: true })
// => '5,000 tokens'`;

  // truncateText utility
  readonly truncateTextCode = `// truncateText() - Text Truncation Utility
import { truncateText } from '@angular-ai-kit/utils';

// Basic truncation
truncateText('This is a long message that should be truncated', 20)
// => 'This is a long me...'

// Custom ellipsis
truncateText('Long text here', 10, { ellipsis: '…' })
// => 'Long text…'

// Word-aware truncation
truncateText('This is a long message', 15, { wordBoundary: true })
// => 'This is a...'

// Middle truncation (for file paths, IDs)
truncateText('very-long-file-name.component.ts', 20, { position: 'middle' })
// => 'very-lon...onent.ts'`;

  // generateId utility
  readonly generateIdCode = `// generateId() - ID Generation Utility
import { generateId, generateUUID } from '@angular-ai-kit/utils';

// Generate a short ID (default 8 chars)
generateId()
// => 'a1b2c3d4'

// Custom length
generateId(12)
// => 'a1b2c3d4e5f6'

// With prefix
generateId(8, 'msg_')
// => 'msg_a1b2c3d4'

// Full UUID
generateUUID()
// => '550e8400-e29b-41d4-a716-446655440000'`;

  // debounce utility
  readonly debounceCode = `// debounce() - Debounce Function Utility
import { debounce } from '@angular-ai-kit/utils';

// Create a debounced function
const debouncedSearch = debounce((query: string) => {
  // This will only execute after 300ms of no calls
  console.log('Searching:', query);
}, 300);

// Usage in component
@Component({
  template: \`
    <input (input)="onSearchInput($event)" />
  \`,
})
export class SearchComponent {
  private debouncedSearch = debounce(this.search.bind(this), 300);

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.debouncedSearch(value);
  }

  private search(query: string) {
    // Make API call
  }
}

// With immediate option (execute first call immediately)
const debouncedFn = debounce(fn, 300, { leading: true });`;

  // throttle utility
  readonly throttleCode = `// throttle() - Throttle Function Utility
import { throttle } from '@angular-ai-kit/utils';

// Create a throttled function
const throttledScroll = throttle(() => {
  // This will execute at most once every 100ms
  console.log('Scroll position:', window.scrollY);
}, 100);

// Usage
window.addEventListener('scroll', throttledScroll);

// With trailing option
const throttledFn = throttle(fn, 100, { trailing: true });`;

  // copyToClipboard utility
  readonly copyToClipboardCode = `// copyToClipboard() - Clipboard Utility
import { copyToClipboard } from '@angular-ai-kit/utils';

// Copy text to clipboard
await copyToClipboard('Text to copy');

// Returns success status
const success = await copyToClipboard('Text to copy');
if (success) {
  showNotification('Copied!');
}

// With fallback for older browsers
copyToClipboard('Text', {
  fallbackToExecCommand: true,
})`;

  // parseMarkdownCodeBlocks utility
  readonly parseMarkdownCode = `// parseMarkdownCodeBlocks() - Parse Code Blocks
import { parseMarkdownCodeBlocks } from '@angular-ai-kit/utils';

const markdown = \`
Here is some code:
\\\`\\\`\\\`typescript
const x = 1;
\\\`\\\`\\\`
And more text.
\`;

const blocks = parseMarkdownCodeBlocks(markdown);
// => [
//   { type: 'text', content: 'Here is some code:\\n' },
//   { type: 'code', language: 'typescript', content: 'const x = 1;' },
//   { type: 'text', content: '\\nAnd more text.' },
// ]`;

  // escapeHtml utility
  readonly escapeHtmlCode = `// escapeHtml() - HTML Escape Utility
import { escapeHtml, unescapeHtml } from '@angular-ai-kit/utils';

// Escape HTML entities
escapeHtml('<script>alert("xss")</script>')
// => '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'

// Unescape HTML entities
unescapeHtml('&lt;div&gt;')
// => '<div>'`;

  // isValidUrl utility
  readonly isValidUrlCode = `// isValidUrl() - URL Validation Utility
import { isValidUrl, parseUrl } from '@angular-ai-kit/utils';

// Check if string is a valid URL
isValidUrl('https://example.com')
// => true

isValidUrl('not a url')
// => false

// Parse URL safely
const parsed = parseUrl('https://example.com/path?query=1');
// => { protocol: 'https:', host: 'example.com', path: '/path', ... }`;
}
