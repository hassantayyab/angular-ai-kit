import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
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
 *   (toggled)="toggleSidebar()"
 * />
 * ```
 */
@Component({
  selector: 'app-sidenav-toggle',
  templateUrl: './sidenav-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmButton],
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
  toggled = output<void>();

  // Computed
  ariaLabel = computed(() =>
    this.collapsed() ? 'Expand sidebar' : 'Collapse sidebar'
  );

  iconClasses = computed(() => {
    const isSidebar = this.variant() === 'sidebar';

    return cn('transition-transform duration-200', {
      'h-4 w-4': isSidebar,
      'h-5 w-5': !isSidebar,
    });
  });

  // Methods
  handleClick(): void {
    this.toggled.emit();
  }
}
