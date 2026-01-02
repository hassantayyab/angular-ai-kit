# @angular-ai-kit/tokens

Design tokens and theming for Angular AI Kit. CSS custom properties for consistent styling with light/dark mode support.

## Installation

```bash
npm install @angular-ai-kit/tokens
```

## Usage

Import the CSS file in your application's styles:

```css
/* styles.css */
@import '@angular-ai-kit/tokens/theme.css';
```

Or import in angular.json:

```json
{
  "styles": ["@angular-ai-kit/tokens/theme.css", "src/styles.css"]
}
```

## CSS Variables

The tokens package provides semantic color variables that work with Tailwind CSS v4:

### Background Colors

| Variable       | Light Mode | Dark Mode | Usage             |
| -------------- | ---------- | --------- | ----------------- |
| `--background` | zinc-50    | zinc-950  | Page background   |
| `--card`       | white      | zinc-900  | Card backgrounds  |
| `--muted`      | zinc-100   | zinc-800  | Muted backgrounds |
| `--accent`     | zinc-100   | zinc-800  | Hover states      |

### Text Colors

| Variable             | Light Mode | Dark Mode | Usage          |
| -------------------- | ---------- | --------- | -------------- |
| `--foreground`       | zinc-950   | zinc-50   | Primary text   |
| `--muted-foreground` | zinc-500   | zinc-400  | Secondary text |
| `--card-foreground`  | zinc-950   | zinc-50   | Text on cards  |

### Border Colors

| Variable         | Light Mode | Dark Mode | Usage           |
| ---------------- | ---------- | --------- | --------------- |
| `--border`       | zinc-200   | zinc-700  | Default borders |
| `--border-hover` | zinc-300   | zinc-600  | Hover borders   |
| `--ring`         | zinc-400   | zinc-400  | Focus rings     |

## Usage with Tailwind CSS v4

Use the semantic Tailwind classes in your templates:

```html
<div class="bg-card border-border text-foreground rounded-lg border p-4">
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
