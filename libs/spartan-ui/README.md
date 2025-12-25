# @angular-ai-kit/spartan-ui

Angular Spartan UI helm components - styled UI primitives built on [Spartan](https://spartan.ng) patterns with Tailwind CSS.

## Features

- **Signal-based**: All components use Angular v21 signals
- **Accessible**: WCAG AA compliant with proper ARIA attributes
- **Tailwind CSS v4**: Built with utility-first styling
- **Dark mode**: Full dark/light theme support via CSS variables
- **Tree-shakable**: Import only what you need

## Available Components

| Component                    | Description                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `HlmButtonDirective`         | Button with variants (default, destructive, outline, secondary, ghost, link) |
| `HlmInputDirective`          | Text input with size and error variants                                      |
| `HlmTextareaDirective`       | Multi-line text input                                                        |
| `HlmLabelDirective`          | Form label with error state                                                  |
| `HlmCardDirective`           | Card container with header, content, footer                                  |
| `HlmAvatarComponent`         | Avatar with image and fallback                                               |
| `HlmBadgeDirective`          | Badge with variants                                                          |
| `HlmSeparatorDirective`      | Horizontal/vertical separator                                                |
| `HlmSkeletonDirective`       | Loading skeleton                                                             |
| `HlmIconComponent`           | Icon wrapper with sizes                                                      |
| `HlmScrollAreaComponent`     | Custom scrollable area                                                       |
| `HlmTooltipContentDirective` | Tooltip content styling                                                      |
| `HlmAlertDirective`          | Alert with variants                                                          |

## Installation

```bash
npm install @angular-ai-kit/spartan-ui
```

## Usage

### Button

```typescript
import { HlmButtonDirective } from '@angular-ai-kit/spartan-ui';

@Component({
  imports: [HlmButtonDirective],
  template: `
    <button hlmBtn>Default</button>
    <button hlmBtn variant="destructive">Delete</button>
    <button hlmBtn variant="outline">Outline</button>
    <button hlmBtn variant="ghost" size="icon">
      <svg>...</svg>
    </button>
  `,
})
export class MyComponent {}
```

### Input with Label

```typescript
import {
  HlmInputDirective,
  HlmLabelDirective,
} from '@angular-ai-kit/spartan-ui';

@Component({
  imports: [HlmInputDirective, HlmLabelDirective],
  template: `
    <div class="space-y-2">
      <label hlmLabel for="email">Email</label>
      <input hlmInput type="email" id="email" placeholder="Enter email" />
    </div>
  `,
})
export class MyComponent {}
```

### Card

```typescript
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardContentDirective,
} from '@angular-ai-kit/spartan-ui';

@Component({
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
  ],
  template: `
    <div hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Card Title</h3>
      </div>
      <div hlmCardContent>Card content goes here.</div>
    </div>
  `,
})
export class MyComponent {}
```

### Avatar

```typescript
import {
  HlmAvatarComponent,
  HlmAvatarImageComponent,
  HlmAvatarFallbackComponent,
} from '@angular-ai-kit/spartan-ui';

@Component({
  imports: [
    HlmAvatarComponent,
    HlmAvatarImageComponent,
    HlmAvatarFallbackComponent,
  ],
  template: `
    <hlm-avatar size="lg">
      <hlm-avatar-image src="https://example.com/avatar.jpg" alt="User" />
      <hlm-avatar-fallback>JD</hlm-avatar-fallback>
    </hlm-avatar>
  `,
})
export class MyComponent {}
```

### Badge

```typescript
import { HlmBadgeDirective } from '@angular-ai-kit/spartan-ui';

@Component({
  imports: [HlmBadgeDirective],
  template: `
    <span hlmBadge>Default</span>
    <span hlmBadge variant="secondary">Secondary</span>
    <span hlmBadge variant="destructive">Destructive</span>
    <span hlmBadge variant="outline">Outline</span>
  `,
})
export class MyComponent {}
```

### Alert

```typescript
import {
  HlmAlertDirective,
  HlmAlertTitleDirective,
  HlmAlertDescriptionDirective,
} from '@angular-ai-kit/spartan-ui';

@Component({
  imports: [
    HlmAlertDirective,
    HlmAlertTitleDirective,
    HlmAlertDescriptionDirective,
  ],
  template: `
    <div hlmAlert variant="destructive">
      <h5 hlmAlertTitle>Error</h5>
      <p hlmAlertDescription>Something went wrong.</p>
    </div>
  `,
})
export class MyComponent {}
```

## Theme Configuration

The components use CSS custom properties for theming. Add these to your `styles.css`:

```css
:root {
  --background: #fafafa;
  --foreground: #09090b;
  --card: #ffffff;
  --card-foreground: #09090b;
  --popover: #ffffff;
  --popover-foreground: #09090b;
  --primary: #18181b;
  --primary-foreground: #fafafa;
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  --accent: #f4f4f5;
  --accent-foreground: #18181b;
  --destructive: #ef4444;
  --destructive-foreground: #fafafa;
  --border: #e4e4e7;
  --input: #e4e4e7;
  --ring: #a1a1aa;
  --radius: 0.5rem;
}

.dark {
  --background: #09090b;
  --foreground: #fafafa;
  /* ... dark theme values */
}
```

## License

MIT
