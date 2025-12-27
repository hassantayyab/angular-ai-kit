import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * DocsPage Component
 *
 * Documentation page layout with router outlet for child routes.
 */
@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterOutlet],
  host: {
    class: 'app-docs-page block h-full',
  },
})
export class DocsPageComponent {}
