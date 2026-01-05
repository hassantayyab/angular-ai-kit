import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavComponent } from '../../components';

/**
 * DocsPage Component
 *
 * Documentation page layout with router outlet for child routes.
 * Sidebar navigation is handled by the main layout.
 */
@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterOutlet, TopNavComponent],
  host: {
    class: 'app-docs-page block h-full',
  },
})
export class DocsPageComponent {}
