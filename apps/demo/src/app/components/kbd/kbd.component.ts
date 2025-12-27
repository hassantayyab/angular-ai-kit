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
      'bg-muted text-muted-foreground border-input pointer-events-none inline-flex h-5 items-center justify-center rounded border px-1.5 font-mono text-[10px] font-medium select-none',
  },
})
export class KbdComponent {}
