import {
  HlmButtonDirective,
  HlmInputDirective,
  HlmScrollAreaComponent,
} from '@angular-ai-kit/spartan-ui';
import { cn } from '@angular-ai-kit/utils';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  ViewEncapsulation,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ChatService, Conversation } from '../../services/chat.service';
import { SidenavToggleComponent } from '../sidenav-toggle/sidenav-toggle.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

/**
 * Conversation group interface for display
 */
interface ConversationGroup {
  label: string;
  conversations: ConversationDisplay[];
}

/**
 * Display-friendly conversation type
 */
interface ConversationDisplay {
  id: string;
  title: string;
  updatedAt: Date;
}

/**
 * Sidebar Component
 *
 * Collapsible sidebar with chat history, grouped by date.
 * Integrates with ChatService for state management.
 * Supports mobile slide-in drawer and state persistence.
 *
 * @example
 * ```html
 * <app-sidebar
 *   [collapsed]="sidebarCollapsed()"
 *   (collapsedChange)="handleCollapsedChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ThemeToggleComponent,
    SidenavToggleComponent,
    HlmButtonDirective,
    HlmScrollAreaComponent,
    HlmInputDirective,
  ],
  host: {
    class: 'app-sidebar-host shrink-0',
    ngSkipHydration: 'true',
  },
})
export class SidebarComponent {
  private platformId = inject(PLATFORM_ID);
  private chatService = inject(ChatService);
  private readonly STORAGE_KEY = 'ai-kit-sidebar-collapsed';
  private readonly MOBILE_BREAKPOINT = 768;

  // App version
  readonly appVersion = 'v0.1.0';

  // Inputs
  collapsed = input<boolean>(false);

  // Outputs
  collapsedChange = output<boolean>();

  // State
  private isMobileSignal = signal(false);
  searchQuery = signal('');

  constructor() {
    afterNextRender(() => {
      this.checkIfMobile();
      window.addEventListener('resize', () => this.checkIfMobile());
    });

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(
          this.STORAGE_KEY,
          this.collapsed() ? 'true' : 'false'
        );
      }
    });
  }

  // Computed from ChatService
  activeConversationId = this.chatService.activeConversationId;

  // Computed properties
  isMobile = computed(() => this.isMobileSignal());

  conversationGroups = computed(() => {
    const conversations = this.chatService.conversations();
    const query = this.searchQuery().toLowerCase().trim();
    const groups: ConversationGroup[] = [];

    const getGroupLabel = (date: Date): string => {
      const now = new Date();
      const diffTime = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays <= 7) return 'Previous 7 days';
      if (diffDays <= 30) return 'Previous 30 days';
      return 'Older';
    };

    const groupMap = new Map<string, ConversationDisplay[]>();

    // Filter by search query if present
    const filteredConversations = query
      ? conversations.filter((conv: Conversation) =>
          conv.title.toLowerCase().includes(query)
        )
      : conversations;

    filteredConversations.forEach((conv: Conversation) => {
      const label = getGroupLabel(conv.updatedAt);
      if (!groupMap.has(label)) {
        groupMap.set(label, []);
      }
      groupMap.get(label)!.push({
        id: conv.id,
        title: conv.title,
        updatedAt: conv.updatedAt,
      });
    });

    const groupOrder = [
      'Today',
      'Yesterday',
      'Previous 7 days',
      'Previous 30 days',
      'Older',
    ];
    groupOrder.forEach((label) => {
      if (groupMap.has(label)) {
        groups.push({ label, conversations: groupMap.get(label)! });
      }
    });

    return groups;
  });

  sidebarClasses = computed(() => {
    const isMobile = this.isMobile();

    return cn(
      'app-sidebar',
      'flex flex-col',
      'border-r border-[var(--border)]',
      'bg-[var(--card)]',
      'transition-all duration-300 ease-in-out',
      {
        'w-64': !this.collapsed(),
        'w-16': this.collapsed(),
        'fixed inset-y-0 left-0 z-40 h-screen': isMobile,
        'translate-x-0': isMobile && !this.collapsed(),
        '-translate-x-full': isMobile && this.collapsed(),
        'h-full': !isMobile,
      }
    );
  });

  backdropClasses = computed(() => {
    return cn(
      'fixed inset-0 z-30',
      'bg-black/50',
      'transition-opacity duration-300',
      'md:hidden'
    );
  });

  headerClasses = computed(() => {
    return cn('shrink-0', 'px-3 py-4');
  });

  headerTopRowClasses = computed(() => {
    return cn('flex items-center', {
      'justify-between': !this.collapsed(),
      'justify-center': this.collapsed(),
    });
  });

  logoClasses = computed(() => {
    return cn(
      'flex items-center justify-center',
      'h-8 w-8 rounded-lg',
      'bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80',
      'text-[var(--primary-foreground)]',
      'shadow-sm'
    );
  });

  newChatButtonClasses = computed(() => {
    return cn(
      'flex items-center gap-2',
      'w-full',
      'rounded-lg px-3 py-2',
      'border border-[var(--border)]',
      'bg-transparent hover:bg-[var(--accent)]',
      'text-[var(--foreground)] font-medium text-sm',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
      {
        'justify-center': this.collapsed(),
      }
    );
  });

  searchInputClasses = computed(() => {
    return cn(
      'w-full',
      'rounded-lg',
      'border-[var(--border)]',
      'bg-[var(--background)]',
      'text-sm',
      'placeholder:text-[var(--foreground-muted)]',
      'focus:ring-1 focus:ring-[var(--ring)]'
    );
  });

  historyClasses = computed(() => {
    return cn('flex-1 overflow-y-auto', 'p-3', 'scrollbar-thin');
  });

  getConversationItemClasses(id: string): string {
    const isActive = this.activeConversationId() === id;

    return cn(
      'relative flex items-center w-full',
      'rounded-lg px-3 py-2',
      'text-left transition-colors duration-200',
      'group',
      {
        'bg-[var(--accent)] text-[var(--foreground)]': isActive,
        'text-[var(--foreground-muted)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]':
          !isActive,
      }
    );
  }

  footerClasses = computed(() => {
    return cn('shrink-0', 'border-t border-[var(--border)]', 'p-3');
  });

  navLinkClasses = computed(() => {
    return cn(
      'flex items-center gap-3 w-full',
      'rounded-lg px-3 py-2',
      'text-sm text-[var(--foreground-muted)]',
      'transition-colors duration-200',
      'hover:bg-[var(--accent)] hover:text-[var(--foreground)]',
      {
        'justify-center': this.collapsed(),
      }
    );
  });

  sectionLabelClasses = computed(() => {
    return cn(
      'px-3 py-2',
      'text-[11px] font-medium uppercase tracking-wider',
      'text-[var(--foreground-muted)]/70'
    );
  });

  versionClasses = computed(() => {
    return cn('text-xs text-[var(--foreground-muted)]/60', 'text-center py-2');
  });

  // Methods
  private checkIfMobile(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileSignal.set(window.innerWidth < this.MOBILE_BREAKPOINT);
    }
  }

  collapse(): void {
    this.collapsedChange.emit(true);
  }

  handleToggle(): void {
    this.collapsedChange.emit(!this.collapsed());
  }

  handleNewConversation(): void {
    this.chatService.createConversation();
    // Close sidebar on mobile after creating new conversation
    if (this.isMobile()) {
      this.collapsedChange.emit(true);
    }
  }

  handleConversationSelect(id: string): void {
    this.chatService.selectConversation(id);
    // Close sidebar on mobile after selecting
    if (this.isMobile()) {
      this.collapsedChange.emit(true);
    }
  }

  handleDeleteConversation(event: Event, id: string): void {
    event.stopPropagation();
    this.chatService.deleteConversation(id);
  }

  handleSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }
}
