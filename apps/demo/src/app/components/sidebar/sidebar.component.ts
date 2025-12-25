import {
  afterNextRender,
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
  input,
  output,
  inject,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { cn } from '@angular-ai-kit/utils';
import { ChatService, Conversation } from '../../services/chat.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { SidenavToggleComponent } from '../sidenav-toggle/sidenav-toggle.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ThemeToggleComponent, SidenavToggleComponent],
  host: {
    class: 'app-sidebar-host shrink-0',
    ngSkipHydration: 'true',
  },
  template: `
    <!-- Backdrop (Mobile only) -->
    @if (!collapsed() && isMobile()) {
      <div
        [class]="backdropClasses()"
        (click)="collapse()"
        role="button"
        tabindex="0"
        aria-label="Close sidebar"
        (keydown.enter)="collapse()"
        (keydown.escape)="collapse()"
      ></div>
    }

    <!-- Sidebar -->
    <aside [class]="sidebarClasses()">
      <!-- Header: Logo, Toggle & New Chat Button -->
      <div [class]="headerClasses()">
        <!-- Top row: Logo + Toggle button -->
        <div [class]="headerTopRowClasses()">
          @if (!collapsed()) {
            <!-- Logo (when expanded) -->
            <div class="flex items-center gap-2">
              <div [class]="logoClasses()">
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                  />
                </svg>
              </div>
              <span class="text-sm font-semibold text-[var(--foreground)]"
                >Angular AI Kit</span
              >
            </div>

            <!-- Toggle button (collapse) - desktop only -->
            <app-sidenav-toggle
              class="hidden md:block"
              [collapsed]="collapsed()"
              [variant]="'sidebar'"
              (toggle)="handleToggle()"
            />
          }
        </div>

        <!-- New Chat Button -->
        <button
          type="button"
          [class]="newChatButtonClasses()"
          (click)="handleNewConversation()"
          aria-label="Start new chat"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          @if (!collapsed()) {
            <span>New Chat</span>
          }
        </button>
      </div>

      <!-- Chat History -->
      <div [class]="historyClasses()">
        @if (!collapsed()) {
          @if (conversationGroups().length === 0) {
            <!-- Empty state -->
            <div
              class="flex flex-col items-center justify-center py-8 text-center"
            >
              <svg
                class="mb-2 h-8 w-8 text-[var(--foreground-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p class="text-xs text-[var(--foreground-muted)]">
                No conversations yet
              </p>
            </div>
          } @else {
            <!-- Grouped conversations -->
            @for (group of conversationGroups(); track group.label) {
              <div class="mb-4">
                <!-- Group label -->
                <div
                  class="mb-2 px-3 text-xs font-semibold tracking-wide text-[var(--foreground-muted)] uppercase"
                >
                  {{ group.label }}
                </div>

                <!-- Conversations in group -->
                <div class="space-y-1">
                  @for (
                    conversation of group.conversations;
                    track conversation.id
                  ) {
                    <button
                      type="button"
                      [class]="getConversationItemClasses(conversation.id)"
                      (click)="handleConversationSelect(conversation.id)"
                      [title]="conversation.title"
                    >
                      <!-- Chat icon -->
                      <svg
                        class="h-4 w-4 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>

                      <!-- Title (truncated) -->
                      <span class="flex-1 truncate text-left text-sm">{{
                        conversation.title
                      }}</span>

                      <!-- Delete button (only for active) -->
                      @if (activeConversationId() === conversation.id) {
                        <button
                          type="button"
                          class="rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/20"
                          (click)="
                            handleDeleteConversation($event, conversation.id)
                          "
                          aria-label="Delete conversation"
                        >
                          <svg
                            class="h-4 w-4 text-[var(--foreground-muted)] hover:text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      }
                    </button>
                  }
                </div>
              </div>
            }
          }
        }
      </div>

      <!-- Footer Section -->
      <div [class]="footerClasses()">
        @if (!collapsed()) {
          <!-- Links -->
          <div class="mb-3 space-y-1">
            <a
              href="https://github.com/apppaddle/angular-ai-kit"
              target="_blank"
              rel="noopener noreferrer"
              [class]="linkButtonClasses()"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              <span>GitHub</span>
            </a>
            <a href="#" [class]="linkButtonClasses()">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span>Documentation</span>
            </a>
          </div>

          <!-- Divider -->
          <div class="my-3 border-t border-[var(--border)]"></div>

          <!-- Theme Toggle Row -->
          <div class="flex items-center justify-between">
            <span class="text-sm text-[var(--foreground-muted)]">Theme</span>
            <app-theme-toggle />
          </div>
        } @else {
          <!-- Collapsed: just theme toggle icon -->
          <app-theme-toggle />
        }
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  private platformId = inject(PLATFORM_ID);
  private chatService = inject(ChatService);
  private readonly STORAGE_KEY = 'ai-kit-sidebar-collapsed';
  private readonly MOBILE_BREAKPOINT = 768;

  // Inputs
  collapsed = input<boolean>(false);

  // Outputs
  collapsedChange = output<boolean>();

  // State
  private isMobileSignal = signal(false);

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
    const groups: ConversationGroup[] = [];

    const getGroupLabel = (date: Date): string => {
      const now = new Date();
      const diffTime = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays <= 7) return 'Last 7 days';
      if (diffDays <= 30) return 'Last 30 days';
      return 'Older';
    };

    const groupMap = new Map<string, ConversationDisplay[]>();

    conversations.forEach((conv: Conversation) => {
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
      'Last 7 days',
      'Last 30 days',
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
    return cn('shrink-0', 'border-b border-[var(--border)]', 'p-3');
  });

  headerTopRowClasses = computed(() => {
    return cn('flex items-center justify-between', 'mb-3', {
      'justify-center': this.collapsed(),
    });
  });

  logoClasses = computed(() => {
    return cn(
      'flex items-center justify-center',
      'h-8 w-8 rounded-lg',
      'bg-[var(--foreground)] text-[var(--background)]'
    );
  });

  newChatButtonClasses = computed(() => {
    return cn(
      'flex items-center gap-2',
      'w-full',
      'rounded-lg px-3 py-2.5',
      'bg-[var(--primary)] hover:opacity-90',
      'text-[var(--primary-foreground)] font-medium text-sm',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
      {
        'justify-center': this.collapsed(),
      }
    );
  });

  historyClasses = computed(() => {
    return cn('flex-1 overflow-y-auto', 'p-3', 'scrollbar-thin');
  });

  getConversationItemClasses(id: string): string {
    const isActive = this.activeConversationId() === id;

    return cn(
      'flex items-center gap-3 w-full',
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
    return cn('shrink-0', 'border-t border-[var(--border)]', 'p-3', {
      'flex items-center justify-center': this.collapsed(),
    });
  });

  linkButtonClasses = computed(() => {
    return cn(
      'flex items-center gap-3 w-full',
      'rounded-lg px-3 py-2',
      'text-sm text-[var(--foreground-muted)]',
      'transition-colors duration-200',
      'hover:bg-[var(--accent)] hover:text-[var(--foreground)]'
    );
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
}
