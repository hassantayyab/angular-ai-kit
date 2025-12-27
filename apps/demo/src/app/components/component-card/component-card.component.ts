import { HlmBadge } from '@angular-ai-kit/spartan-ui/badge';
import { cn } from '@angular-ai-kit/utils';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * ComponentCard Component
 *
 * Reusable card for displaying component info in docs overview.
 * Supports both active (clickable) and disabled (coming soon) states.
 */
@Component({
  selector: 'app-component-card',
  templateUrl: './component-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgTemplateOutlet, RouterLink, HlmBadge],
  host: {
    class: 'app-component-card block',
  },
})
export class ComponentCardComponent {
  /** SVG path data for the icon */
  iconPath = input.required<string>();

  /** Card title (component name) */
  title = input.required<string>();

  /** Card description */
  description = input.required<string>();

  /** Router link for active cards */
  link = input<string>('');

  /** Whether the card is disabled (coming soon) */
  disabled = input(false);

  /** Optional badge text (e.g., "Coming Soon") */
  badge = input<string>('');

  /** Whether this is a clickable link */
  isLink = computed(() => !!this.link() && !this.disabled());

  /** Card container classes */
  cardClasses = computed(() =>
    cn(
      'block rounded-lg border p-4',
      'bg-card',
      'transition-all duration-200',
      {
        // Active link state - clickable with subtle ring glow
        'cursor-pointer border-border hover:ring-2 hover:ring-primary/20 hover:shadow-md':
          this.isLink(),
        // Non-link active state
        'border-border': !this.isLink() && !this.disabled(),
        // Disabled state
        'border-border opacity-60': this.disabled(),
      }
    )
  );

  /** Icon classes based on state */
  iconClasses = computed(() =>
    cn('h-5 w-5', {
      'text-primary': !this.disabled(),
      'text-muted-foreground': this.disabled(),
    })
  );
}
