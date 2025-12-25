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
  templateUrl: './hlm-scroll-area.component.html',
  styleUrl: './hlm-scroll-area.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmScrollAreaComponent {
  class = input<string>('');

  computedClass = computed(() => cn('relative overflow-hidden', this.class()));
}
