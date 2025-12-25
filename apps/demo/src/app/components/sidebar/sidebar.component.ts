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

/**
 * Conversation interface
 */
export interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  preview?: string;
}

/**
 * Conversation group interface
 */
export interface ConversationGroup {
  label: string;
  conversations: Conversation[];
}

/**
 * Sidebar Component
 *
 * Collapsible sidebar with chat history, grouped by date.
 * Supports mobile slide-in drawer and state persistence.
 *
 * @example
 * ```html
 * <app-sidebar
 *   [collapsed]="sidebarCollapsed()"
 *   [conversations]="conversations()"
 *   [activeConversationId]="activeId()"
 *   (collapsedChange)="handleCollapsedChange($event)"
 *   (conversationSelect)="handleSelectConversation($event)"
 *   (newConversation)="handleNewConversation()"
 * />
 * ```
 */
@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  host: {
    class: 'app-sidebar-host flex-shrink-0',
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
      ></div>
    }

    <!-- Sidebar -->
    <aside [class]="sidebarClasses()">
      <!-- Header: New Chat Button -->
      <div [class]="headerClasses()">
        <button
          type="button"
          [class]="newChatButtonClasses()"
          (click)="handleNewConversation()"
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
          <!-- Grouped conversations -->
          @for (group of conversationGroups(); track group.label) {
            <div class="mb-4">
              <!-- Group label -->
              <div
                class="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400"
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
                      class="h-4 w-4 flex-shrink-0"
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
                    <span class="truncate text-sm">{{
                      conversation.title
                    }}</span>

                    <!-- Actions (on hover) -->
                    @if (activeConversationId() === conversation.id) {
                      <div class="ml-auto flex items-center gap-1">
                        <!-- Delete button -->
                        <button
                          type="button"
                          class="rounded p-1 hover:bg-red-100 dark:hover:bg-red-900/20"
                          (click)="
                            handleDeleteConversation($event, conversation.id)
                          "
                          aria-label="Delete conversation"
                        >
                          <svg
                            class="h-4 w-4 text-gray-400 hover:text-red-600"
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
                      </div>
                    }
                  </button>
                }
              </div>
            </div>
          }
        }
      </div>

      <!-- Settings Section (Bottom) -->
      @if (!collapsed()) {
        <div [class]="settingsClasses()">
          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Settings</span>
          </button>
        </div>
      }
    </aside>
  `,
})
export class SidebarComponent {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'ai-kit-sidebar-collapsed';
  private readonly MOBILE_BREAKPOINT = 768; // md breakpoint

  // Inputs
  collapsed = input<boolean>(false);
  conversations = input<Conversation[]>([]);
  activeConversationId = input<string | null>(null);

  // Outputs
  collapsedChange = output<boolean>();
  conversationSelect = output<string>();
  conversationDelete = output<string>();
  newConversation = output<void>();

  // State
  private isMobileSignal = signal(false);

  constructor() {
    // Initialize mobile detection AFTER hydration completes
    // This ensures server and client render the same initial state
    afterNextRender(() => {
      this.checkIfMobile();
      window.addEventListener('resize', () => this.checkIfMobile());
    });

    // Persist collapsed state
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(
          this.STORAGE_KEY,
          this.collapsed() ? 'true' : 'false'
        );
      }
    });
  }

  // Computed properties
  isMobile = computed(() => this.isMobileSignal());

  conversationGroups = computed(() => {
    const convos = this.conversations();
    const groups: ConversationGroup[] = [];

    // Helper to get date group label
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

    // Group conversations
    const groupMap = new Map<string, Conversation[]>();

    convos.forEach((conv) => {
      const label = getGroupLabel(conv.timestamp);
      if (!groupMap.has(label)) {
        groupMap.set(label, []);
      }
      groupMap.get(label)!.push(conv);
    });

    // Convert to array
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
      'border-r border-gray-200 dark:border-gray-700',
      'bg-white dark:bg-gray-900',
      'transition-all duration-300 ease-in-out',

      // Width
      {
        'w-64': !this.collapsed(),
        'w-16': this.collapsed(),
      },

      // Mobile vs Desktop positioning
      {
        // Mobile: fixed overlay
        'fixed inset-y-0 left-0 z-40 h-screen': isMobile,
        'translate-x-0': isMobile && !this.collapsed(),
        '-translate-x-full': isMobile && this.collapsed(),

        // Desktop: normal flex item
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
    return cn(
      'flex-shrink-0',
      'border-b border-gray-200 dark:border-gray-700',
      'p-3'
    );
  });

  newChatButtonClasses = computed(() => {
    return cn(
      'flex items-center gap-2',
      'w-full',
      'rounded-lg px-3 py-2',
      'bg-gray-800 hover:bg-gray-700',
      'dark:bg-gray-700 dark:hover:bg-gray-600',
      'text-white font-medium text-sm',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
      'dark:focus:ring-offset-gray-900',
      {
        'justify-center': this.collapsed(),
      }
    );
  });

  historyClasses = computed(() => {
    return cn(
      'flex-1 overflow-y-auto',
      'p-3',
      'scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600'
    );
  });

  /**
   * Get conversation item classes
   */
  getConversationItemClasses(id: string): string {
    const isActive = this.activeConversationId() === id;

    return cn(
      'flex items-center gap-3 w-full',
      'rounded-lg px-3 py-2',
      'text-left transition-colors duration-200',
      'group',

      {
        'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100':
          isActive,
        'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800':
          !isActive,
      }
    );
  }

  settingsClasses = computed(() => {
    return cn(
      'flex-shrink-0',
      'border-t border-gray-200 dark:border-gray-700',
      'p-3'
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

  handleNewConversation(): void {
    this.newConversation.emit();
  }

  handleConversationSelect(id: string): void {
    this.conversationSelect.emit(id);
  }

  handleDeleteConversation(event: Event, id: string): void {
    event.stopPropagation();
    this.conversationDelete.emit(id);
  }
}
