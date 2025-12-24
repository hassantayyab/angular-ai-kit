---
paths: '**/*.{ts,css}'
---

# Tailwind CSS v4 Styling Guidelines

**IMPORTANT: This project uses Tailwind CSS v4, not v3. The setup is DIFFERENT.**

## Tailwind v4 Setup

- Uses **@tailwindcss/postcss** plugin (NOT the old tailwindcss plugin)
- Uses `.postcssrc.json` for PostCSS configuration
- Uses `@import "tailwindcss"` in CSS files (NOT @tailwind directives)
- Uses `@source` directive to watch files in monorepo
- No `tailwind.config.js` needed (uses CSS-based configuration)

## Styling Rules

- Use Tailwind CSS utility classes for ALL styling (utility-first approach)
- Use CSS only (NOT SCSS) for any necessary custom styles
- Use `clsx` and `tailwind-merge` for dynamic classes (via `cn()` utility)
- Use `ViewEncapsulation.None` with scoped Tailwind classes
- Use CSS custom properties (CSS variables) for theming
- Use `@layer` directives in CSS files (base, components, utilities)
- Keep styles in template or inline styles array (avoid separate CSS files unless necessary)
- Ensure responsive design (mobile-first approach)
- Support dark mode via CSS variables and `prefers-color-scheme`
- Maintain consistent spacing and sizing using design tokens
- Use Tailwind class sorting plugin for consistency

## Tailwind v4 CSS Structure

```css
/* styles.css */
@import 'tailwindcss';

/* Watch monorepo packages for Tailwind classes */
@source '../../packages';

/* Theme configuration using CSS */
@layer base {
  :root {
    --color-primary: #3b82f6;
    --color-background: #ffffff;
  }

  .dark {
    --color-primary: #60a5fa;
    --color-background: #1f2937;
  }
}

@layer components {
  .ai-button {
    @apply rounded-lg bg-blue-500 px-4 py-2 text-white;
  }
}
```

**References:**

- [Tailwind CSS v4 Angular Guide](https://tailwindcss.com/docs/installation/framework-guides/angular)
- [Nx + Tailwind CSS Guide](https://nx.dev/docs/technologies/angular/guides/using-tailwind-css-with-angular-projects)

## View Encapsulation Pattern

```typescript
@Component({
  selector: 'ai-component',
  encapsulation: ViewEncapsulation.None, // Required for Tailwind
  template: `
    <div class="ai-component-wrapper">
      <!-- Scoped classes with component prefix -->
    </div>
  `,
})
export class ComponentName {}
```

## Dynamic Classes Pattern (cn utility)

```typescript
import { cn } from '@angular-ai-kit/utils';

classes = computed(() => {
  return cn(
    'base-class another-class',
    {
      'conditional-class': this.condition(),
      'active:ring-2': this.isActive(),
    },
    this.customClasses() // Allow class override from parent
  );
});
```

## CSS Custom Properties (Theming)

```css
/* theme.css */
@layer base {
  :root {
    --ai-primary: theme('colors.blue.600');
    --ai-text: theme('colors.gray.900');
    --ai-background: theme('colors.white');
  }

  .dark {
    --ai-primary: theme('colors.blue.400');
    --ai-text: theme('colors.gray.100');
    --ai-background: theme('colors.gray.900');
  }
}
```

## Tailwind @layer Pattern

```css
/* component.css (if needed) */
@layer components {
  .ai-message-bubble {
    @apply rounded-lg px-4 py-3 shadow-sm;
  }
}

@layer utilities {
  .ai-scrollbar-thin {
    scrollbar-width: thin;
  }
}
```

## Component Styling Best Practices

- Prefix all custom component classes with `ai-` to avoid naming conflicts
- Use Tailwind utilities as much as possible before creating custom CSS
- Group related utilities together for readability
- Use responsive modifiers consistently (mobile-first: sm, md, lg, xl, 2xl)
- Apply dark mode variants using CSS variables, not dark: modifier when possible
- Keep inline styles minimal and prefer template-based class bindings
- Allow parent components to override styles via `customClasses` input

## Example Component with Tailwind

```typescript
import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

@Component({
  selector: 'ai-message-bubble',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div [class]="containerClasses()">
      <ng-content />
    </div>
  `,
})
export class MessageBubbleComponent {
  role = input.required<'user' | 'assistant'>();
  customClasses = input<string>('');

  containerClasses = computed(() => {
    return cn(
      // Base styles
      'ai-message-bubble',
      'rounded-lg px-4 py-3 shadow-sm',
      'transition-colors duration-200',

      // Conditional styles
      {
        'bg-blue-500 text-white': this.role() === 'user',
        'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100':
          this.role() === 'assistant',
      },

      // Allow override
      this.customClasses()
    );
  });
}
```

## Dark Mode Support

- Use CSS custom properties for colors
- Support `prefers-color-scheme` media query
- Provide manual dark mode toggle option
- Test all components in both light and dark modes

```css
@layer base {
  :root {
    --ai-bg: theme('colors.white');
    --ai-text: theme('colors.gray.900');
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --ai-bg: theme('colors.gray.900');
      --ai-text: theme('colors.gray.100');
    }
  }

  .dark {
    --ai-bg: theme('colors.gray.900');
    --ai-text: theme('colors.gray.100');
  }
}
```

## Responsive Design

- Mobile-first approach (base styles for mobile, then add breakpoints)
- Test on common screen sizes: 320px, 768px, 1024px, 1440px
- Use Tailwind's responsive modifiers: sm, md, lg, xl, 2xl
- Ensure touch targets are at least 44x44px
- Support landscape and portrait orientations

```typescript
containerClasses = computed(() => {
  return cn(
    // Mobile first
    'flex flex-col gap-2 p-4',
    // Tablet
    'md:flex-row md:gap-4 md:p-6',
    // Desktop
    'lg:gap-6 lg:p-8'
  );
});
```
