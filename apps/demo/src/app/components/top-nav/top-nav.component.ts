import { HlmSidebarTrigger } from '@angular-ai-kit/spartan-ui/sidebar';
import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

/**
 * TopNavComponent
 *
 * Reusable mobile-only top navigation bar with sidebar toggle and title.
 * Only visible on mobile/tablet screens (hidden on desktop: md:hidden).
 *
 * @example
 * ```html
 * <app-top-nav [title]="'Documentation'" />
 * ```
 */
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmSidebarTrigger],
  host: {
    class: 'app-top-nav-host block',
  },
})
export class TopNavComponent {
  // Inputs
  title = input<string>('Angular AI Kit');
  showSidebarToggle = input<boolean>(true);
  customClasses = input<string>('');

  // Computed classes
  containerClasses = computed(() => {
    return cn(
      'flex items-center gap-2',
      'px-4 py-3',
      'border-b border-border',
      'bg-background',
      'md:hidden', // Only show on mobile/tablet
      this.customClasses()
    );
  });
}
