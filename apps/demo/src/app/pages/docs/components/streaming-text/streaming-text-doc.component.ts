import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmSlider } from '@angular-ai-kit/spartan-ui/slider';
import { HlmSwitch } from '@angular-ai-kit/spartan-ui/switch';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
import { StreamingTextComponent } from '../../../../components/streaming-text';

/**
 * StreamingText Documentation Component
 *
 * Interactive playground for the StreamingText component
 * with configurable options for speed, cursor, and streaming state.
 */
@Component({
  selector: 'app-streaming-text-doc',
  templateUrl: './streaming-text-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [StreamingTextComponent, HlmSwitch, HlmSlider, HlmButton],
  host: {
    class: 'app-streaming-text-doc block',
  },
})
export class StreamingTextDocComponent {
  // Reference to streaming text component
  private streamingText = viewChild(StreamingTextComponent);

  // Demo content
  demoContent = signal(
    'Hello! I am an AI assistant. This text is being streamed character by character to simulate how AI responses appear in real-time chat applications.'
  );

  // Configuration
  isStreaming = signal(true);
  showCursor = signal(true);
  speed = signal(30);

  // Restart streaming demo
  restartDemo(): void {
    this.streamingText()?.reset();
    this.isStreaming.set(true);
  }

  // Toggle streaming
  toggleStreaming(): void {
    this.isStreaming.update((v) => !v);
  }
}
