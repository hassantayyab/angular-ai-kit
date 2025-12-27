import {
  HlmCommand,
  HlmCommandEmpty,
  HlmCommandGroup,
  HlmCommandGroupLabel,
  HlmCommandIcon,
  HlmCommandList,
  HlmCommandSearch,
  HlmCommandSearchInput,
  HlmCommandSeparator,
  HlmCommandShortcut,
} from '@angular-ai-kit/spartan-ui/command';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services';

/**
 * Command item interface
 */
interface CommandItem {
  label: string;
  icon: string;
  action: () => void;
  shortcut?: string;
}

/**
 * CommandDialog Component
 *
 * A cmd+k command palette for quick navigation and actions.
 * Uses Spartan UI command components.
 */
@Component({
  selector: 'app-command-dialog',
  templateUrl: './command-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HlmCommand,
    HlmCommandEmpty,
    HlmCommandGroup,
    HlmCommandGroupLabel,
    HlmCommandIcon,
    HlmCommandList,
    HlmCommandSearch,
    HlmCommandSearchInput,
    HlmCommandSeparator,
    HlmCommandShortcut,
  ],
  host: {
    class: 'app-command-dialog-host',
  },
})
export class CommandDialogComponent {
  private router = inject(Router);
  private chatService = inject(ChatService);

  // Dialog state
  isOpen = signal(false);

  // Navigation items
  readonly navigationItems: CommandItem[] = [
    {
      label: 'Go to Chat',
      icon: 'chat',
      action: () => this.navigateTo('/'),
      shortcut: '⌘C',
    },
    {
      label: 'Go to Documentation',
      icon: 'docs',
      action: () => this.navigateTo('/docs'),
      shortcut: '⌘D',
    },
  ];

  // Action items
  readonly actionItems: CommandItem[] = [
    {
      label: 'New Conversation',
      icon: 'plus',
      action: () => this.newConversation(),
      shortcut: '⌘N',
    },
    {
      label: 'Toggle Theme',
      icon: 'theme',
      action: () => this.toggleTheme(),
      shortcut: '⌘T',
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

  // Keyboard listener for cmd+k
  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    // Open with cmd+k or ctrl+k
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.toggle();
    }
    // Close with escape
    if (event.key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.close();
    }
  }

  toggle(): void {
    this.isOpen.update((open) => !open);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  handleOverlayClick(event: MouseEvent): void {
    // Close if clicking on the overlay (not the content)
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  executeItem(item: CommandItem): void {
    item.action();
    this.close();
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
