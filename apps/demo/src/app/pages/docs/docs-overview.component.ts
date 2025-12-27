import { HlmBadge } from '@angular-ai-kit/spartan-ui/badge';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * DocsOverview Component
 *
 * Default landing page for documentation with component grid.
 */
@Component({
  selector: 'app-docs-overview',
  templateUrl: './docs-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, HlmBadge],
  host: {
    class: 'app-docs-overview block',
  },
})
export class DocsOverviewComponent {}
