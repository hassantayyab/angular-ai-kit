# @angular-ai-kit/tokens

Design tokens and theming for Angular AI Kit. CSS custom properties for consistent styling with light/dark mode support.

## Installation

```bash
npm install @angular-ai-kit/tokens
```

## Quick Start

Import all styles at once:

```css
/* styles.css */
@import '@angular-ai-kit/tokens/tokens/index.css';
```

Or import individual files as needed:

```css
/* styles.css */
@import '@angular-ai-kit/tokens/tokens/theme.css'; /* Required: CSS variables */
@import '@angular-ai-kit/tokens/tokens/code-theme.css'; /* Syntax highlighting */
@import '@angular-ai-kit/tokens/tokens/prose.css'; /* Markdown typography */
@import '@angular-ai-kit/tokens/tokens/animations.css'; /* Animations */
```

## CSS Files

| File             | Description                         | Size             |
| ---------------- | ----------------------------------- | ---------------- |
| `theme.css`      | CSS variables for light/dark themes | Required         |
| `code-theme.css` | Syntax highlighting (highlight.js)  | For code blocks  |
| `prose.css`      | Typography for markdown content     | For AI responses |
| `animations.css` | Typing indicators, cursors          | For animations   |
| `index.css`      | All of the above combined           | Full bundle      |

## CSS Variables

### Background Colors

| Variable       | Light Mode | Dark Mode | Usage             |
| -------------- | ---------- | --------- | ----------------- |
| `--background` | #ffffff    | #09090b   | Page background   |
| `--card`       | #fafafa    | #18181b   | Card backgrounds  |
| `--muted`      | #f4f4f5    | #18181b   | Muted backgrounds |
| `--accent`     | #f4f4f5    | #27272a   | Hover states      |

### Text Colors

| Variable             | Light Mode | Dark Mode | Usage          |
| -------------------- | ---------- | --------- | -------------- |
| `--foreground`       | #09090b    | #fafafa   | Primary text   |
| `--muted-foreground` | #71717a    | #a1a1aa   | Secondary text |
| `--card-foreground`  | #09090b    | #fafafa   | Text on cards  |

### Border Colors

| Variable         | Light Mode | Dark Mode | Usage           |
| ---------------- | ---------- | --------- | --------------- |
| `--border`       | #e4e4e7    | #27272a   | Default borders |
| `--border-hover` | #d4d4d8    | #52525b   | Hover borders   |
| `--ring`         | #a1a1aa    | #71717a   | Focus rings     |

## Usage with Tailwind CSS v4

For full Tailwind integration, add to your `styles.css`:

```css
@import 'tailwindcss';
@import '@angular-ai-kit/tokens/tokens/index.css';

/* Enable Tailwind semantic color classes */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}
```

Then use semantic Tailwind classes:

```html
<div class="bg-card text-card-foreground border-border rounded-lg border p-4">
  <p class="text-muted-foreground">Secondary content</p>
</div>
```

## Dark Mode

Dark mode is controlled by the `.dark` class on the `<html>` element:

```typescript
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

CSS variables automatically switch values when dark mode is active.

## TypeScript Types

```typescript
import type { ColorToken, ThemeConfig } from '@angular-ai-kit/tokens';
```

## License

MIT
