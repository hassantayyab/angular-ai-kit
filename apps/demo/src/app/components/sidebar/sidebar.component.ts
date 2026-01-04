import { provideIcons } from '@ng-icons/core';
import {
  lucideBook,
  lucideChevronRight,
  lucideClock,
  lucideGithub,
  lucideMenu,
  lucidePlus,
  lucideSparkle,
  lucideTrash2,
} from '@ng-icons/lucide';
import { IconButtonComponent } from '@angular-ai-kit/core';
import {
  HlmCollapsible,
  HlmCollapsibleContent,
  HlmCollapsibleTrigger,
} from '@angular-ai-kit/spartan-ui/collapsible';
import { HlmIconImports } from '@angular-ai-kit/spartan-ui/icon';
import {
  HlmSidebar,
  HlmSidebarContent,
  HlmSidebarFooter,
  HlmSidebarGroup,
  HlmSidebarGroupContent,
  HlmSidebarGroupLabel,
  HlmSidebarHeader,
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
import { SearchTriggerComponent } from '../search-trigger';
import { ThemeToggleComponent } from '../theme-toggle';

/** Icons used in the sidebar */
const SIDEBAR_ICONS = {
  lucideBook,
  lucideChevronRight,
  lucideClock,
  lucideGithub,
  lucideMenu,
  lucidePlus,
  lucideSparkle,
  lucideTrash2,
};

/**
 * Navigation link item for docs sidebar
 */
interface NavItem {
  name: string;
  label: string;
  route: string;
}

/**
 * Navigation category with links
 */
interface NavCategory {
  label: string;
  items: NavItem[];
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
    HlmSidebarTrigger,
    HlmCollapsible,
    HlmCollapsibleTrigger,
    HlmCollapsibleContent,
    HlmIconImports,
    IconButtonComponent,
    ThemeToggleComponent,
    SearchTriggerComponent,
    RouterLink,
    RouterLinkActive,
  ],
  viewProviders: [provideIcons(SIDEBAR_ICONS)],
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

  // Documentation navigation categories
  readonly docsNavigation: NavCategory[] = [
    {
      label: 'Getting Started',
      items: [
        { name: 'introduction', label: 'Introduction', route: '/docs' },
        {
          name: 'installation',
          label: 'Installation',
          route: '/docs/guides/getting-started',
        },
      ],
    },
    {
      label: 'Components',
      items: [
        { name: 'overview', label: 'Overview', route: '/docs/components' },
        {
          name: 'AiResponse',
          label: 'AI Response',
          route: '/docs/components/ai-response',
        },
        {
          name: 'UserMessage',
          label: 'User Message',
          route: '/docs/components/user-message',
        },
        {
          name: 'ChatInput',
          label: 'Chat Input',
          route: '/docs/components/chat-input',
        },
        {
          name: 'StreamingText',
          label: 'Streaming Text',
          route: '/docs/components/streaming-text',
        },
        {
          name: 'TypingIndicator',
          label: 'Typing Indicator',
          route: '/docs/components/typing-indicator',
        },
        {
          name: 'CodeBlock',
          label: 'Code Block',
          route: '/docs/components/code-block',
        },
        {
          name: 'MarkdownRenderer',
          label: 'Markdown Renderer',
          route: '/docs/components/markdown-renderer',
        },
        {
          name: 'FeedbackButtons',
          label: 'Feedback Buttons',
          route: '/docs/components/feedback-buttons',
        },
        {
          name: 'ResponseActions',
          label: 'Response Actions',
          route: '/docs/components/response-actions',
        },
        {
          name: 'MessageActions',
          label: 'Message Actions',
          route: '/docs/components/message-actions',
        },
        {
          name: 'PromptSuggestions',
          label: 'Prompt Suggestions',
          route: '/docs/components/prompt-suggestions',
        },
      ],
    },
    {
      label: 'Guides',
      items: [
        { name: 'theming', label: 'Theming', route: '/docs/guides/theming' },
        {
          name: 'building-chat-app',
          label: 'Building a Chat App',
          route: '/docs/guides/building-chat-app',
        },
        {
          name: 'api-integration',
          label: 'API Integration',
          route: '/docs/guides/api-integration',
        },
        {
          name: 'customization',
          label: 'Customization',
          route: '/docs/guides/customization',
        },
      ],
    },
    {
      label: 'Examples',
      items: [
        {
          name: 'full-chat',
          label: 'Full Chat',
          route: '/docs/examples/full-chat',
        },
      ],
    },
    {
      label: 'API Reference',
      items: [
        { name: 'types', label: 'Types', route: '/docs/api/types' },
        { name: 'tokens', label: 'Tokens', route: '/docs/api/tokens' },
        { name: 'utilities', label: 'Utilities', route: '/docs/api/utilities' },
        { name: 'services', label: 'Services', route: '/docs/api/services' },
      ],
    },
    {
      label: 'Help',
      items: [
        { name: 'faq', label: 'FAQ', route: '/docs/guides/faq' },
        {
          name: 'troubleshooting',
          label: 'Troubleshooting',
          route: '/docs/guides/troubleshooting',
        },
      ],
    },
  ];

  // Computed from ChatService
  activeConversationId = this.chatService.activeConversationId;

  // Computed: Check if sidebar is collapsed
  isCollapsed = computed(() => this.sidebarService.state() === 'collapsed');

  conversationGroups = computed(() => {
    const conversations = this.chatService.conversations();
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

    conversations.forEach((conv: Conversation) => {
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

  handleComponentSelect(_route: string): void {
    // Close sidebar on mobile after selecting
    // Navigation is handled by routerLink directive
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

  isActiveConversation(id: string): boolean {
    return this.activeConversationId() === id;
  }
}
