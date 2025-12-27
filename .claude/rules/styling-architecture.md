# Styling Architecture & CSS Variables

**This document defines our CSS architecture, color system, and styling patterns.**

## Color System

### Principle: Tailwind Built-in Colors Only

We use **only Tailwind's built-in zinc scale** for all colors. No custom hex codes.

```
┌─────────────────────────────────────────────────────────────┐
│  Tailwind Built-in Colors (zinc-50 to zinc-950)             │
│  ↓                                                          │
│  CSS Variables (semantic tokens via theme() function)       │
│  ↓                                                          │
│  Tailwind Utility Classes (bg-background, text-foreground)  │
└─────────────────────────────────────────────────────────────┘
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

---

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
/* ✅ Correct: Use theme() function */
--background: theme('colors.zinc.50');
--border: theme('colors.zinc.200');

/* ❌ Wrong: Never use hex codes */
--background: #fafafa;
--border: #e4e4e7;

/* ❌ Wrong: Never use rgb/hsl */
--background: rgb(250 250 250);
```

---

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

Use bracket notation with var():

```html
<!-- ✅ Correct: CSS variable in bracket notation -->
<div class="border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]">
  <!-- ✅ Also correct: Direct Tailwind classes when semantic token not needed -->
  <div class="border-zinc-700 bg-zinc-900 text-zinc-50">
    <!-- ❌ Wrong: Hardcoded colors when semantic token exists -->
    <div class="border-[#3f3f46] bg-[#18181b]"></div>
  </div>
</div>
```

### In TypeScript (cn utility)

```typescript
cardClasses = computed(() => {
  return cn(
    'rounded-lg',
    'border border-[var(--border)]',
    'bg-[var(--card)]',
    'text-[var(--foreground)]',
    'hover:border-[var(--border-hover)]'
  );
});
```

---

## Light/Dark Mode

### How It Works

Dark mode is controlled by the `.dark` class on `<html>`:

```css
:root {
  --background: theme('colors.zinc.50'); /* Light */
}

.dark {
  --background: theme('colors.zinc.950'); /* Dark */
}
```

### Component Pattern

Components automatically adapt via CSS variables:

```typescript
// No dark: prefix needed when using CSS variables
containerClasses = computed(() =>
  cn(
    'bg-[var(--background)]', // Auto-switches light/dark
    'text-[var(--foreground)]' // Auto-switches light/dark
  )
);
```

### When to Use dark: Prefix

Only use `dark:` prefix when:

1. Using direct Tailwind colors (not CSS variables)
2. Need different behavior beyond color swap

```html
<!-- Needed: Direct Tailwind colors -->
<div class="bg-zinc-100 dark:bg-zinc-800">
  <!-- Not needed: CSS variables auto-switch -->
  <div class="bg-[var(--muted)]"></div>
</div>
```

---

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

---

## ❌ What NOT to Do

### Never Use Hex Codes

```css
/* ❌ Wrong */
--background: #09090b;
--border: #27272a;

/* ✅ Correct */
--background: theme('colors.zinc.950');
--border: theme('colors.zinc.800');
```

### Never Create Custom Color Scales

```css
/* ❌ Wrong: Custom color tokens */
--ai-blue-500: #3b82f6;
--ai-gray-800: #1f2937;

/* ✅ Correct: Use semantic tokens */
--primary: theme('colors.zinc.900');
--muted: theme('colors.zinc.800');
```

### Never Duplicate Variables

```css
/* ❌ Wrong: Variables in multiple files */
/* packages/tokens/theme.css */
--ai-background: #fff;

/* apps/demo/styles.css */
--background: #fff;

/* ✅ Correct: One source of truth */
/* apps/demo/styles.css only */
--background: theme('colors.white');
```

---

## File Organization

```
apps/demo/src/
├── styles.css          # ALL CSS variables defined here
│   ├── @theme          # Tailwind v4 color extensions
│   ├── @layer base     # Semantic tokens + base HTML
│   ├── @layer components # Component styles (dialogs, etc.)
│   └── @layer utilities # Animation utilities

packages/tokens/src/lib/
└── theme.css           # EMPTY (intentionally)
```

---

## Quick Reference: Common Patterns

### Card Component

```typescript
cardClasses = computed(() =>
  cn(
    'rounded-lg',
    'border border-[var(--border)]',
    'bg-[var(--card)]',
    'shadow-sm',
    'hover:border-[var(--border-hover)]',
    'hover:shadow-md'
  )
);
```

### Input Field

```typescript
inputClasses = computed(() =>
  cn(
    'w-full rounded-md',
    'border border-[var(--input)]',
    'bg-transparent',
    'text-[var(--foreground)]',
    'placeholder:text-[var(--foreground-muted)]',
    'focus:border-[var(--ring)]',
    'focus:ring-1 focus:ring-[var(--ring)]'
  )
);
```

### Muted Text

```html
<span class="text-[var(--foreground-muted)]">Secondary info</span>
```

### Button Variants

```typescript
// Primary
'bg-[var(--primary)] text-[var(--primary-foreground)]';

// Secondary
'bg-[var(--secondary)] text-[var(--secondary-foreground)]';

// Ghost
'bg-transparent hover:bg-[var(--accent)] text-[var(--foreground)]';
```

---

## Checklist: Before Committing CSS Changes

- [ ] All colors use `theme()` function (no hex codes)
- [ ] New variables added to both `:root` and `.dark`
- [ ] Variables follow existing naming conventions
- [ ] No duplicate variable definitions
- [ ] Components use CSS variables, not direct colors
- [ ] Light and dark mode tested
