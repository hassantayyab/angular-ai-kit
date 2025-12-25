import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@angular-ai-kit/utils';

@Component({
  selector: 'hlm-scroll-area',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'computedClass()',
  },
  template: `
    <div class="scrollbar-thin h-full w-full overflow-auto">
      <ng-content />
    </div>
  `,
  styles: `
    .scrollbar-thin {
      scrollbar-width: thin;
      scrollbar-color: hsl(var(--border)) transparent;
    }
    .scrollbar-thin::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
      background: transparent;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background: hsl(var(--border));
      border-radius: 9999px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
      background: hsl(var(--muted-foreground));
    }
  `,
})
export class HlmScrollAreaComponent {
  class = input<string>('');

  computedClass = computed(() => cn('relative overflow-hidden', this.class()));
}
