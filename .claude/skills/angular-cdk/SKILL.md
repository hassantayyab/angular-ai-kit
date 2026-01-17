---
name: angular-cdk
description: Use when implementing complex UI patterns. Triggers on "CDK", "dialog", "modal", "overlay", "dropdown", "tooltip", "virtual scroll", "drag drop", "focus trap", "portal", or CDK questions.
allowed-tools:
  - Read
  - Edit
  - Write
  - Glob
  - Grep
---

# Angular CDK Usage Guidelines

**IMPORTANT: Always prefer Angular CDK primitives over custom implementations for common UI patterns.**

Angular CDK (Component Dev Kit) provides behavior primitives that are:

- Fully accessible (WCAG compliant)
- Well-tested across browsers
- Properly handling edge cases

## When to Use Angular CDK

### Dialog/Modal (`@angular/cdk/dialog`)

**Always use CDK Dialog for:**

- Modal dialogs
- Command palettes
- Confirmation dialogs
- Any overlay that blocks interaction with the rest of the page

```typescript
import { Dialog, DialogModule } from '@angular/cdk/dialog';

@Component({
  imports: [DialogModule],
})
export class MyComponent {
  private dialog = inject(Dialog);

  openDialog() {
    this.dialog.open(MyDialogComponent, {
      width: '500px',
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
    });
  }
}
```

**Benefits:**

- Automatic focus trapping
- Escape key handling
- Backdrop click handling
- Scroll blocking
- ARIA attributes
- Focus restoration on close

### Overlay (`@angular/cdk/overlay`)

**Use CDK Overlay for:**

- Dropdowns
- Tooltips
- Popovers
- Context menus
- Any floating UI element

```typescript
import { Overlay, OverlayModule } from '@angular/cdk/overlay';

@Component({
  imports: [OverlayModule],
})
export class DropdownComponent {
  private overlay = inject(Overlay);

  openDropdown(trigger: ElementRef) {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(trigger)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }
}
```

### Accessibility (`@angular/cdk/a11y`)

**Use CDK A11y for:**

- Focus trapping in modals
- Focus monitoring
- Live announcer for screen readers
- Keyboard navigation

```typescript
import { A11yModule, FocusTrap, LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  imports: [A11yModule],
  template: `
    <div cdkTrapFocus>
      <!-- Focus stays within this container -->
    </div>
  `,
})
export class ModalComponent {
  private liveAnnouncer = inject(LiveAnnouncer);

  announce(message: string) {
    this.liveAnnouncer.announce(message, 'polite');
  }
}
```

### Portal (`@angular/cdk/portal`)

**Use CDK Portal for:**

- Rendering content outside the component tree
- Dynamic component insertion
- Template portals

```typescript
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';

@Component({
  imports: [PortalModule],
  template: ` <ng-template cdkPortalOutlet></ng-template> `,
})
export class PortalHostComponent {
  attachComponent(component: Type<any>) {
    const portal = new ComponentPortal(component);
    this.portalOutlet.attach(portal);
  }
}
```

### Scrolling (`@angular/cdk/scrolling`)

**Use CDK Scrolling for:**

- Virtual scrolling (long lists)
- Scroll blocking
- Scroll position restoration

```typescript
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  imports: [ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="h-[400px]">
      <div *cdkVirtualFor="let item of items">{{ item }}</div>
    </cdk-virtual-scroll-viewport>
  `,
})
export class VirtualListComponent {
  items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
}
```

### Drag and Drop (`@angular/cdk/drag-drop`)

**Use CDK Drag and Drop for:**

- Sortable lists
- Drag-and-drop interfaces
- Reorderable items

```typescript
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  imports: [DragDropModule],
  template: `
    <div cdkDropList (cdkDropListDropped)="drop($event)">
      @for (item of items; track item) {
        <div cdkDrag>{{ item }}</div>
      }
    </div>
  `,
})
export class SortableListComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
```

## CDK Modules Reference

| Module                    | Use Case                           |
| ------------------------- | ---------------------------------- |
| `@angular/cdk/dialog`     | Modal dialogs, command palettes    |
| `@angular/cdk/overlay`    | Dropdowns, tooltips, popovers      |
| `@angular/cdk/a11y`       | Focus management, screen readers   |
| `@angular/cdk/portal`     | Dynamic content rendering          |
| `@angular/cdk/scrolling`  | Virtual scrolling, scroll blocking |
| `@angular/cdk/drag-drop`  | Drag and drop, sortable lists      |
| `@angular/cdk/clipboard`  | Copy to clipboard                  |
| `@angular/cdk/text-field` | Auto-resize textareas              |
| `@angular/cdk/platform`   | Platform detection                 |
| `@angular/cdk/layout`     | Breakpoint observer                |

## What NOT to Do

```typescript
// Bad: Custom overlay implementation
@Component({
  template: `
    @if (isOpen) {
      <div class="custom-backdrop" (click)="close()">
        <div class="custom-dialog">...</div>
      </div>
    }
  `,
})
export class CustomDialogComponent {
  @HostListener('window:keydown.escape')
  close() {
    /* manual escape handling */
  }
}

// Good: Use CDK Dialog
@Component({})
export class DialogTriggerComponent {
  private dialog = inject(Dialog);

  openDialog() {
    this.dialog.open(DialogContentComponent);
  }
}
```

## Accessibility Checklist for CDK Components

- [ ] Use `cdkTrapFocus` for modals and dialogs
- [ ] Use `LiveAnnouncer` for dynamic content changes
- [ ] Use `FocusMonitor` for focus state styling
- [ ] Use `cdkAriaDescribedBy` for additional descriptions
- [ ] Test with keyboard navigation
- [ ] Test with screen readers

## Performance Considerations

- Use virtual scrolling for lists > 100 items
- Lazy load overlay content when possible
- Detach overlays when not visible
- Use `OnPush` change detection with CDK components
