import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services';
import {
  CommandDialogContentComponent,
  CommandDialogData,
  CommandItem,
} from '../command-dialog';
import { KbdComponent } from '../kbd';

/**
 * SearchTrigger Component
 *
 * A clickable search input that opens the command dialog.
 * Shows "Search documentation..." with ⌘K badge.
 */
@Component({
  selector: 'app-search-trigger',
  templateUrl: './search-trigger.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [KbdComponent],
  host: {
    class: 'app-search-trigger block w-full',
  },
})
export class SearchTriggerComponent {
  private dialog = inject(Dialog);
  private router = inject(Router);
  private chatService = inject(ChatService);

  openCommandDialog(): void {
    const dialogData: CommandDialogData = {
      navigationItems: this.getNavigationItems(),
      actionItems: this.getActionItems(),
      componentItems: this.getComponentItems(),
    };

    this.dialog.open<void, CommandDialogData>(CommandDialogContentComponent, {
      data: dialogData,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      panelClass: 'command-dialog-panel',
      width: '500px',
      maxWidth: '90vw',
    });
  }

  private getNavigationItems(): CommandItem[] {
    return [
      {
        label: 'Go to Chat',
        icon: 'chat',
        action: () => this.router.navigate(['/']),
      },
      {
        label: 'Go to Documentation',
        icon: 'docs',
        action: () => this.router.navigate(['/docs']),
      },
    ];
  }

  private getActionItems(): CommandItem[] {
    return [
      {
        label: 'New Conversation',
        icon: 'plus',
        action: () => {
          this.chatService.createConversation();
          this.router.navigate(['/']);
        },
      },
      {
        label: 'Toggle Theme',
        icon: 'theme',
        action: () => document.documentElement.classList.toggle('dark'),
      },
    ];
  }

  private getComponentItems(): CommandItem[] {
    return [
      {
        label: 'AI Response',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/ai-response']),
      },
      {
        label: 'Chat Container',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/chat-container']),
      },
      {
        label: 'Chat Input',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/chat-input']),
      },
      {
        label: 'Code Block',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/code-block']),
      },
      {
        label: 'Conversation List',
        icon: 'component',
        action: () =>
          this.router.navigate(['/docs/components/conversation-list']),
      },
      {
        label: 'Feedback Buttons',
        icon: 'component',
        action: () =>
          this.router.navigate(['/docs/components/feedback-buttons']),
      },
      {
        label: 'Markdown Renderer',
        icon: 'component',
        action: () =>
          this.router.navigate(['/docs/components/markdown-renderer']),
      },
      {
        label: 'Message Actions',
        icon: 'component',
        action: () =>
          this.router.navigate(['/docs/components/message-actions']),
      },
      {
        label: 'Message Bubble',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/message-bubble']),
      },
      {
        label: 'Message List',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/message-list']),
      },
      {
        label: 'Prompt Suggestions',
        icon: 'component',
        action: () =>
          this.router.navigate(['/docs/components/prompt-suggestions']),
      },
      {
        label: 'Response Actions',
        icon: 'component',
        action: () =>
          this.router.navigate(['/docs/components/response-actions']),
      },
      {
        label: 'Streaming Text',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/streaming-text']),
      },
      {
        label: 'Typing Indicator',
        icon: 'component',
        action: () =>
          this.router.navigate(['/docs/components/typing-indicator']),
      },
      {
        label: 'User Message',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/user-message']),
      },
    ];
  }
}
