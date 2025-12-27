import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import {
  HlmCollapsible,
  HlmCollapsibleContent,
  HlmCollapsibleTrigger,
} from '@angular-ai-kit/spartan-ui/collapsible';
import {
  HlmSidebar,
  HlmSidebarContent,
  HlmSidebarFooter,
  HlmSidebarGroup,
  HlmSidebarGroupContent,
  HlmSidebarGroupLabel,
  HlmSidebarHeader,
  HlmSidebarInput,
  HlmSidebarMenu,
  HlmSidebarMenuButton,
  HlmSidebarMenuItem,
  HlmSidebarMenuSub,
  HlmSidebarMenuSubButton,
  HlmSidebarMenuSubItem,
  HlmSidebarSeparator,
  HlmSidebarService,
  HlmSidebarTrigger,
} from '@angular-ai-kit/spartan-ui/sidebar';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { ChatService, Conversation } from '../../services';
import { ThemeToggleComponent } from '../theme-toggle';

/**
 * Component item for docs sidebar
 */
interface ComponentItem {
  name: string;
  route: string;
}

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
 * Collapsible sidebar using Spartan UI components.
 * Integrates with ChatService for conversation management.
 *
 * @example
 * ```html
 * <app-sidebar />
 * ```
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HlmSidebar,
    HlmSidebarHeader,
    HlmSidebarContent,
    HlmSidebarFooter,
    HlmSidebarGroup,
    HlmSidebarGroupLabel,
    HlmSidebarGroupContent,
    HlmSidebarMenu,
    HlmSidebarMenuItem,
    HlmSidebarMenuButton,
    HlmSidebarMenuSub,
    HlmSidebarMenuSubItem,
    HlmSidebarMenuSubButton,
    HlmSidebarSeparator,
    HlmSidebarInput,
    HlmSidebarTrigger,
    HlmCollapsible,
    HlmCollapsibleTrigger,
    HlmCollapsibleContent,
    HlmButton,
    ThemeToggleComponent,
    RouterLink,
    RouterLinkActive,
  ],
  host: {
    class: 'app-sidebar-host',
  },
})
export class SidebarComponent {
  private chatService = inject(ChatService);
  private router = inject(Router);
  protected sidebarService = inject(HlmSidebarService);

  // App version
  readonly appVersion = 'v0.1.0';

  // State
  searchQuery = signal('');

  // Route-based context detection
  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  // Check if we're on the docs page
  isDocsPage = computed(() => this.currentUrl()?.startsWith('/docs') ?? false);

  // AI Components list for docs sidebar
  readonly components: ComponentItem[] = [
    { name: 'MessageBubble', route: '/docs/components/message-bubble' },
    { name: 'MessageList', route: '/docs/components/message-list' },
    { name: 'ChatContainer', route: '/docs/components/chat-container' },
    { name: 'ChatInput', route: '/docs/components/chat-input' },
    { name: 'StreamingText', route: '/docs/components/streaming-text' },
    { name: 'TypingIndicator', route: '/docs/components/typing-indicator' },
    { name: 'CodeBlock', route: '/docs/components/code-block' },
    { name: 'TokenCounter', route: '/docs/components/token-counter' },
  ];

  // Computed from ChatService
  activeConversationId = this.chatService.activeConversationId;

  // Computed: Check if sidebar is collapsed
  isCollapsed = computed(() => this.sidebarService.state() === 'collapsed');

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
      groupMap.get(label)?.push({
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
      const conversations = groupMap.get(label);
      if (conversations) {
        groups.push({ label, conversations });
      }
    });

    return groups;
  });

  // Methods
  handleNewConversation(): void {
    this.chatService.createConversation();
    // Navigate to chat if on docs page
    if (this.isDocsPage()) {
      this.router.navigate(['/']);
    }
    // Close sidebar on mobile after creating new conversation
    if (this.sidebarService.isMobile()) {
      this.sidebarService.setOpenMobile(false);
    }
  }

  handleComponentSelect(route: string): void {
    this.router.navigate([route]);
    // Close sidebar on mobile after selecting
    if (this.sidebarService.isMobile()) {
      this.sidebarService.setOpenMobile(false);
    }
  }

  handleConversationSelect(id: string): void {
    this.chatService.selectConversation(id);
    // Close sidebar on mobile after selecting
    if (this.sidebarService.isMobile()) {
      this.sidebarService.setOpenMobile(false);
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

  isActiveConversation(id: string): boolean {
    return this.activeConversationId() === id;
  }
}
