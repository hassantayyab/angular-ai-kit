import { HlmSlider } from '@angular-ai-kit/spartan-ui/slider';
import { HlmSwitch } from '@angular-ai-kit/spartan-ui/switch';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { TypingIndicatorComponent } from '../../../../components/typing-indicator';

/**
 * TypingIndicator Documentation Component
 *
 * Interactive playground for the TypingIndicator component
 * with configurable options for avatar, text, and dot count.
 */
@Component({
  selector: 'app-typing-indicator-doc',
  templateUrl: './typing-indicator-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [TypingIndicatorComponent, HlmSwitch, HlmSlider],
  host: {
    class: 'app-typing-indicator-doc block',
  },
})
export class TypingIndicatorDocComponent {
  // Configuration
  showAvatar = signal(true);
  showText = signal(false);
  text = signal('Thinking...');
  dotCount = signal(3);
}
