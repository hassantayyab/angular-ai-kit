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
        shortcut: '⌘C',
      },
      {
        label: 'Go to Documentation',
        icon: 'docs',
        action: () => this.router.navigate(['/docs']),
        shortcut: '⌘D',
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
        shortcut: '⌘N',
      },
      {
        label: 'Toggle Theme',
        icon: 'theme',
        action: () => document.documentElement.classList.toggle('dark'),
        shortcut: '⌘T',
      },
    ];
  }

  private getComponentItems(): CommandItem[] {
    return [
      {
        label: 'MessageBubble',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/message-bubble']),
      },
      {
        label: 'MessageList',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/message-list']),
      },
      {
        label: 'ChatContainer',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/chat-container']),
      },
      {
        label: 'ChatInput',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/chat-input']),
      },
      {
        label: 'StreamingText',
        icon: 'component',
        action: () => this.router.navigate(['/docs/components/streaming-text']),
      },
      {
        label: 'TypingIndicator',
        icon: 'component',
        action: () =>
          this.router.navigate(['/docs/components/typing-indicator']),
      },
    ];
  }
}
