# @angular-ai-kit/utils

Utility functions for Angular AI Kit. Includes the `cn()` class name utility, formatters, validators, and token counting.

## Installation

```bash
npm install @angular-ai-kit/utils clsx tailwind-merge
```

## Usage

### `cn()` - Class Name Utility

Merge Tailwind CSS classes without conflicts using `clsx` + `tailwind-merge`:

```typescript
import { cn } from '@angular-ai-kit/utils';

// Basic usage
cn('px-4 py-2', 'bg-blue-500'); // => 'px-4 py-2 bg-blue-500'

// Conditional classes
cn('base-class', {
  'active-class': isActive,
  'disabled-class': isDisabled,
});

// Override conflicting classes
cn('px-4', 'px-8'); // => 'px-8' (later value wins)

// With computed signals
containerClasses = computed(() =>
  cn(
    'rounded-lg border',
    'bg-card text-foreground',
    { 'opacity-50': this.disabled() },
    this.customClasses()
  )
);
```

### Token Counter

Estimate token counts for AI model context limits:

```typescript
import { countTokens, estimateTokens } from '@angular-ai-kit/utils';

const text = 'Hello, how can I help you today?';
const tokens = estimateTokens(text); // Approximate token count
```

### Formatters

```typescript
import { formatRelativeTime, formatTimestamp } from '@angular-ai-kit/utils';

formatTimestamp(new Date()); // '2:30 PM'
formatRelativeTime(new Date(Date.now() - 60000)); // '1 minute ago'
```

## API Reference

| Function               | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `cn(...inputs)`        | Merge class names with Tailwind conflict resolution |
| `estimateTokens()`     | Estimate token count for text                       |
| `formatTimestamp()`    | Format date to time string                          |
| `formatRelativeTime()` | Format date to relative time                        |

## License

MIT
