import { HlmButtonDirective } from '@angular-ai-kit/spartan-ui';
import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';

/**
 * SidenavToggle Component
 *
 * A toggle button for expanding/collapsing the sidebar.
 * Uses double chevron icons like ChatGPT for intuitive interaction.
 *
 * @example
 * ```html
 * <app-sidenav-toggle
 *   [collapsed]="sidebarCollapsed()"
 *   [variant]="'sidebar'"
 *   (toggle)="toggleSidebar()"
 * />
 * ```
 */
@Component({
  selector: 'app-sidenav-toggle',
  templateUrl: './sidenav-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmButtonDirective],
  host: {
    class: 'app-sidenav-toggle-host',
  },
})
export class SidenavToggleComponent {
  // Inputs
  collapsed = input<boolean>(false);

  /**
   * Variant determines the styling context:
   * - 'sidebar': Used inside the sidebar header
   * - 'floating': Used as a floating button when sidebar is collapsed
   */
  variant = input<'sidebar' | 'floating'>('sidebar');

  // Outputs
  toggle = output<void>();

  // Computed
  ariaLabel = computed(() =>
    this.collapsed() ? 'Expand sidebar' : 'Collapse sidebar'
  );

  buttonClasses = computed(() => {
    const isSidebar = this.variant() === 'sidebar';

    return cn(
      // Base styles
      'flex items-center justify-center',
      'transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',

      // Variant-specific styles
      isSidebar
        ? [
            // Sidebar variant - subtle, integrated look
            'h-8 w-8',
            'rounded-lg',
            'text-[var(--foreground-muted)]',
            'hover:text-[var(--foreground)]',
            'hover:bg-[var(--accent)]',
          ]
        : [
            // Floating variant - more prominent, visible button
            'h-10 w-10',
            'rounded-lg',
            'bg-[var(--card)]',
            'border border-[var(--border)]',
            'text-[var(--foreground-muted)]',
            'hover:text-[var(--foreground)]',
            'hover:bg-[var(--accent)]',
            'shadow-sm hover:shadow-md',
          ]
    );
  });

  iconClasses = computed(() => {
    const isSidebar = this.variant() === 'sidebar';

    return cn('transition-transform duration-200', {
      'h-4 w-4': isSidebar,
      'h-5 w-5': !isSidebar,
    });
  });

  // Methods
  handleClick(): void {
    this.toggle.emit();
  }
}
