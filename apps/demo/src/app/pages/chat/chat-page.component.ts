import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ChatViewComponent } from '../../components';

/**
 * ChatPage Component
 *
 * Main chat page that renders the chat interface.
 */
@Component({
  selector: 'app-chat-page',
  template: `<app-chat-view />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ChatViewComponent],
  host: {
    class: 'app-chat-page block h-full',
  },
})
export class ChatPageComponent {}
