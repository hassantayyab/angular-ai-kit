import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Kbd Component
 *
 * Displays keyboard shortcut keys with consistent styling.
 *
 * @example
 * ```html
 * <app-kbd>⌘</app-kbd>
 * <app-kbd>K</app-kbd>
 * ```
 */
@Component({
  selector: 'app-kbd',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class:
      'bg-muted/50 text-muted-foreground pointer-events-none inline-flex h-5 items-center justify-center rounded border border-foreground/10 px-1.5 font-mono text-[10px] font-medium select-none',
  },
})
export class KbdComponent {}
