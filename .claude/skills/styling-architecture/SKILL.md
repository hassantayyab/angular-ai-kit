---
name: styling-architecture
description: Use when working with CSS variables, theming, or colors. Triggers on "CSS variable", "theme", "dark mode", "light mode", "color token", "semantic color", "--background", "--foreground", "theme()", or color questions.
allowed-tools:
  - Read
  - Glob
  - Grep
---

# Styling Architecture & CSS Variables

**This document defines our CSS architecture, color system, and styling patterns.**

## Color System

### Principle: Tailwind Built-in Colors Only

We use **only Tailwind's built-in zinc scale** for all colors. No custom hex codes.

```
Tailwind Built-in Colors (zinc-50 to zinc-950)
  -> CSS Variables (semantic tokens via theme() function)
  -> Tailwind Utility Classes (bg-background, text-foreground)
```

### Color Scale Reference

| Zinc Level | Light Mode Usage | Dark Mode Usage          |
| ---------- | ---------------- | ------------------------ |
| `zinc-50`  | Background       | Foreground/Text          |
| `zinc-100` | Muted/Secondary  | -                        |
| `zinc-200` | Borders (light)  | -                        |
| `zinc-300` | Border hover     | -                        |
| `zinc-400` | Ring/Focus       | Muted text               |
| `zinc-500` | Muted text       | Muted text               |
| `zinc-600` | -                | Ring/Focus, Border hover |
| `zinc-700` | -                | Borders                  |
| `zinc-800` | -                | Muted/Accent             |
| `zinc-900` | Primary, Cards   | Cards                    |
| `zinc-950` | Foreground/Text  | Background               |

## CSS Variables

### Location

All CSS variables are defined in **one place**: `apps/demo/src/styles.css`

### Naming Convention

Variables follow Spartan UI conventions for compatibility:

```css
--background          /* Page/app background */
--foreground          /* Primary text color */
--foreground-muted    /* Secondary/muted text */
--card                /* Card backgrounds */
--card-foreground     /* Card text */
--muted               /* Muted backgrounds */
--muted-foreground    /* Muted text */
--accent              /* Accent backgrounds (hover states) */
--accent-foreground   /* Accent text */
--border              /* Default border color */
--border-hover        /* Border on hover/focus */
--input               /* Input border color */
--ring                /* Focus ring color */
--primary             /* Primary button/action */
--primary-foreground  /* Primary button text */
--secondary           /* Secondary button/action */
--secondary-foreground /* Secondary button text */
--destructive         /* Destructive/danger color */
--destructive-foreground /* Destructive text */
```

### Variable Definition Pattern

Always use `theme()` function to reference Tailwind colors:

```css
/* Correct: Use theme() function */
--background: theme('colors.zinc.50');
--border: theme('colors.zinc.200');

/* Wrong: Never use hex codes */
--background: #fafafa;
--border: #e4e4e7;

/* Wrong: Never use rgb/hsl */
--background: rgb(250 250 250);
```

## Using Variables in Components

### In CSS/Templates

Use `var()` for CSS variable references:

```css
/* In CSS */
.my-component {
  background-color: var(--card);
  border: 1px solid var(--border);
  color: var(--foreground);
}
```

### In Tailwind Classes (Templates)

Use Tailwind semantic color classes directly:

```html
<!-- Correct: Tailwind semantic color classes -->
<div class="border-border bg-card text-foreground">
  <div class="bg-muted text-muted-foreground">Muted content</div>
</div>

<!-- Wrong: var() syntax in Tailwind classes -->
<div class="border-[var(--border)] bg-[var(--card)]"></div>

<!-- Wrong: dark: prefix -->
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"></div>

<!-- Wrong: Hardcoded hex colors -->
<div class="border-[#3f3f46] bg-[#18181b]"></div>
```

### In TypeScript (cn utility)

```typescript
cardClasses = computed(() => {
  return cn(
    'rounded-lg',
    'border border-border',
    'bg-card',
    'text-foreground',
    'hover:border-border-hover'
  );
});
```

## Light/Dark Mode

### How It Works

Dark mode is controlled by the `.dark` class on `<html>`. CSS variables automatically switch values:

```css
:root {
  --background: theme('colors.zinc.50'); /* Light */
  --foreground: theme('colors.zinc.950');
}

.dark {
  --background: theme('colors.zinc.950'); /* Dark */
  --foreground: theme('colors.zinc.50');
}
```

### Component Pattern

Components automatically adapt via Tailwind semantic classes. **NEVER use the `dark:` prefix.**

```typescript
// Correct: Tailwind semantic classes auto-switch light/dark
containerClasses = computed(() =>
  cn(
    'bg-background', // Auto-switches light/dark
    'text-foreground', // Auto-switches light/dark
    'border-border'
  )
);

// NEVER use dark: prefix
containerClasses = computed(() =>
  cn(
    'bg-white dark:bg-gray-900', // WRONG!
    'text-gray-900 dark:text-gray-100' // WRONG!
  )
);
```

### Why No dark: Prefix?

1. CSS variables handle theme switching automatically
2. `dark:` prefix creates maintenance burden
3. Components become theme-aware without extra code
4. Single source of truth for colors in `styles.css`

## Semantic Token Usage Guide

### Backgrounds

| Token          | Use For                         |
| -------------- | ------------------------------- |
| `--background` | Page/app background             |
| `--card`       | Card, modal, dialog backgrounds |
| `--popover`    | Tooltip, dropdown backgrounds   |
| `--muted`      | Secondary/subtle backgrounds    |
| `--accent`     | Hover state backgrounds         |
| `--primary`    | Primary buttons                 |
| `--secondary`  | Secondary buttons               |

### Text Colors

| Token                  | Use For                 |
| ---------------------- | ----------------------- |
| `--foreground`         | Primary text            |
| `--foreground-muted`   | Secondary/hint text     |
| `--muted-foreground`   | Subtle text on muted bg |
| `--card-foreground`    | Text on cards           |
| `--accent-foreground`  | Text on accent bg       |
| `--primary-foreground` | Text on primary buttons |

### Borders

| Token            | Use For               |
| ---------------- | --------------------- |
| `--border`       | Default borders       |
| `--border-hover` | Border on hover/focus |
| `--input`        | Input field borders   |
| `--ring`         | Focus rings           |

## What NOT to Do

### NEVER Use dark: Prefix

```typescript
// WRONG: dark: prefix
'bg-white dark:bg-gray-900';
'text-gray-900 dark:text-gray-100';
'border-gray-200 dark:border-gray-800';

// CORRECT: Tailwind semantic classes
'bg-card';
'text-foreground';
'border-border';
```

### NEVER Use var() in Tailwind Classes

```typescript
// WRONG: var() syntax
'bg-[var(--card)]';
'text-[var(--foreground)]';
'border-[var(--border)]';

// CORRECT: Tailwind semantic classes
'bg-card';
'text-foreground';
'border-border';
```

### Never Use Hex Codes

```css
/* Wrong */
--background: #09090b;
--border: #27272a;

/* Correct */
--background: theme('colors.zinc.950');
--border: theme('colors.zinc.800');
```

### Never Create Custom Color Scales

```css
/* Wrong: Custom color tokens */
--ai-blue-500: #3b82f6;
--ai-gray-800: #1f2937;

/* Correct: Use semantic tokens */
--primary: theme('colors.zinc.900');
--muted: theme('colors.zinc.800');
```

## Quick Reference: Common Patterns

### Card Component

```typescript
cardClasses = computed(() =>
  cn(
    'rounded-lg',
    'border border-border',
    'bg-card',
    'shadow-sm',
    'hover:border-border-hover',
    'hover:shadow-md'
  )
);
```

### Input Field

```typescript
inputClasses = computed(() =>
  cn(
    'w-full rounded-md',
    'border border-input',
    'bg-transparent',
    'text-foreground',
    'placeholder:text-muted-foreground',
    'focus:border-ring',
    'focus:ring-1 focus:ring-ring'
  )
);
```

### Muted Text

```html
<span class="text-muted-foreground">Secondary info</span>
```

### Button Variants

```typescript
// Primary
'bg-primary text-primary-foreground';

// Secondary
'bg-secondary text-secondary-foreground';

// Ghost
'bg-transparent hover:bg-accent text-foreground';
```

## Checklist: Before Committing CSS Changes

- [ ] All colors use `theme()` function (no hex codes)
- [ ] New variables added to both `:root` and `.dark`
- [ ] Variables follow existing naming conventions
- [ ] No duplicate variable definitions
- [ ] Components use Tailwind semantic classes (bg-card, text-foreground, etc.)
- [ ] NO `dark:` prefix used anywhere
- [ ] NO `var()` syntax in Tailwind classes
- [ ] Light and dark mode tested
