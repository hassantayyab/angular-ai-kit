import {
  HlmSidebarInset,
  HlmSidebarWrapper,
} from '@angular-ai-kit/spartan-ui/sidebar';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommandDialogComponent } from '../../components/command-dialog';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

/**
 * MainLayout Component
 *
 * Main application layout using Spartan UI sidebar.
 * The sidebar state (collapsed/expanded) is managed by HlmSidebarService.
 *
 * @example
 * ```html
 * <app-main-layout />
 * ```
 */
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HlmSidebarWrapper,
    HlmSidebarInset,
    SidebarComponent,
    RouterOutlet,
    CommandDialogComponent,
  ],
  host: {
    class: 'app-main-layout-host block h-screen',
  },
})
export class MainLayoutComponent {}
