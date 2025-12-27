import { Dialog, DialogModule } from '@angular/cdk/dialog';
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
} from './command-dialog-content.component';

/**
 * CommandDialog Component
 *
 * A cmd+k command palette for quick navigation and actions.
 * Uses Angular CDK Dialog for proper accessibility and focus management.
 */
@Component({
  selector: 'app-command-dialog',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DialogModule],
  host: {
    class: 'app-command-dialog-host',
    '(window:keydown)': 'handleKeydown($event)',
  },
})
export class CommandDialogComponent {
  private dialog = inject(Dialog);
  private router = inject(Router);
  private chatService = inject(ChatService);

  // Navigation items
  readonly navigationItems: CommandItem[] = [
    {
      label: 'Go to Chat',
      icon: 'chat',
      action: () => this.navigateTo('/'),
    },
    {
      label: 'Go to Documentation',
      icon: 'docs',
      action: () => this.navigateTo('/docs'),
    },
  ];

  // Action items
  readonly actionItems: CommandItem[] = [
    {
      label: 'New Conversation',
      icon: 'plus',
      action: () => this.newConversation(),
    },
    {
      label: 'Toggle Theme',
      icon: 'theme',
      action: () => this.toggleTheme(),
    },
  ];

  // Component items
  readonly componentItems: CommandItem[] = [
    {
      label: 'MessageBubble',
      icon: 'component',
      action: () => this.navigateTo('/docs/components/message-bubble'),
    },
    {
      label: 'MessageList',
      icon: 'component',
      action: () => this.navigateTo('/docs/components/message-list'),
    },
    {
      label: 'ChatContainer',
      icon: 'component',
      action: () => this.navigateTo('/docs/components/chat-container'),
    },
    {
      label: 'ChatInput',
      icon: 'component',
      action: () => this.navigateTo('/docs/components/chat-input'),
    },
    {
      label: 'StreamingText',
      icon: 'component',
      action: () => this.navigateTo('/docs/components/streaming-text'),
    },
    {
      label: 'TypingIndicator',
      icon: 'component',
      action: () => this.navigateTo('/docs/components/typing-indicator'),
    },
  ];

  handleKeydown(event: KeyboardEvent): void {
    // Open with cmd+k or ctrl+k
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogData: CommandDialogData = {
      navigationItems: this.navigationItems,
      actionItems: this.actionItems,
      componentItems: this.componentItems,
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

  private navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  private newConversation(): void {
    this.chatService.createConversation();
    this.router.navigate(['/']);
  }

  private toggleTheme(): void {
    document.documentElement.classList.toggle('dark');
  }
}
