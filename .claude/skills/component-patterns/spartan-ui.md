# Spartan UI Components Reference

**ALWAYS prefer Spartan UI components over custom implementations.**

This project uses [Spartan UI](https://www.spartan.ng/) - accessible, unstyled Angular components.

## Available Components

Import from `@angular-ai-kit/spartan-ui/`:

| Category        | Components                                                    |
| --------------- | ------------------------------------------------------------- |
| **Buttons**     | `HlmButton`, `HlmButtonDirective`                             |
| **Avatar**      | `HlmAvatar`, `HlmAvatarFallback`, `HlmAvatarImage`            |
| **Icons**       | `HlmIcon` (with `@ng-icons/core` + `@ng-icons/lucide`)        |
| **Tooltip**     | `HlmTooltipTrigger`, `HlmTooltipContent`                      |
| **Dialog**      | `HlmDialog`, `HlmDialogTrigger`, `HlmDialogContent`           |
| **Input**       | `HlmInput`, `HlmInputDirective`                               |
| **Label**       | `HlmLabel`                                                    |
| **Card**        | `HlmCard`, `HlmCardHeader`, `HlmCardContent`, `HlmCardFooter` |
| **Badge**       | `HlmBadge`                                                    |
| **Skeleton**    | `HlmSkeleton`                                                 |
| **Scroll Area** | `HlmScrollArea`                                               |
| **Separator**   | `HlmSeparator`                                                |
| **Command**     | `HlmCommand`, `HlmCommandInput`, `HlmCommandItem`             |
| **Sidebar**     | `HlmSidebar`, `HlmSidebarTrigger`, `HlmSidebarContent`        |
| **Switch**      | `HlmSwitch`                                                   |
| **Slider**      | `HlmSlider`                                                   |

## Usage Example

```typescript
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBot, lucideCopy } from '@ng-icons/lucide';
import {
  HlmAvatar,
  HlmAvatarFallback,
} from '@angular-ai-kit/spartan-ui/avatar';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmIcon } from '@angular-ai-kit/spartan-ui/icon';

@Component({
  selector: 'app-message-bubble',
  imports: [HlmButton, HlmAvatar, HlmAvatarFallback, HlmIcon, NgIcon],
  viewProviders: [provideIcons({ lucideCopy, lucideBot })],
  template: `
    <hlm-avatar size="sm">
      <span hlmAvatarFallback>
        <ng-icon hlm name="lucideBot" size="sm" />
      </span>
    </hlm-avatar>

    <button hlmBtn variant="ghost" size="icon">
      <ng-icon hlm name="lucideCopy" size="sm" />
    </button>
  `,
})
export class MessageBubbleComponent {}
```

## When to Use Spartan vs Custom

| Use Spartan UI            | Use Custom Component                        |
| ------------------------- | ------------------------------------------- |
| Buttons, icons, avatars   | AI-specific: StreamingText, TypingIndicator |
| Tooltips, dialogs, modals | Domain logic components                     |
| Form inputs, labels       | Complex composite components                |
| Cards, badges, skeletons  | Highly specialized UI                       |
| Scroll areas, separators  | Animation-heavy components                  |

## DON'T Reinvent

```typescript
// BAD: Custom button
<button class="custom-btn">Click</button>

// GOOD: Spartan button
<button hlmBtn variant="ghost" size="sm">Click</button>

// BAD: Custom avatar
<div class="avatar-circle">{{ initials }}</div>

// GOOD: Spartan avatar
<hlm-avatar size="sm">
  <span hlmAvatarFallback>{{ initials }}</span>
</hlm-avatar>

// BAD: Custom skeleton
<div class="animate-pulse bg-gray-200 h-4"></div>

// GOOD: Spartan skeleton
<div hlmSkeleton class="h-4 w-full"></div>
```
