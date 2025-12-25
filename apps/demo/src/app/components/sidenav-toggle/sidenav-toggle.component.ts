import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-sidenav-toggle-host',
  },
  template: `
    <button
      type="button"
      [class]="buttonClasses()"
      (click)="handleClick()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-expanded]="!collapsed()"
    >
      <!-- Double chevron icon -->
      <svg
        [class]="iconClasses()"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        stroke-width="1.5"
      >
        @if (collapsed()) {
          <!-- Expand icon (chevrons pointing right) -->
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        } @else {
          <!-- Collapse icon (chevrons pointing left) -->
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        }
      </svg>
    </button>
  `,
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
