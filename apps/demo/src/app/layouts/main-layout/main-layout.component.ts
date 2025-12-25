import { cn } from '@angular-ai-kit/utils';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import {
  Conversation,
  SidebarComponent,
} from '../../components/sidebar/sidebar.component';

/**
 * MainLayout Component
 *
 * Main application layout with navigation, sidebar, and content area.
 * Handles responsive design and sidebar state management.
 *
 * @example
 * ```html
 * <app-main-layout>
 *   <!-- Main content here -->
 *   <router-outlet />
 * </app-main-layout>
 * ```
 */
@Component({
  selector: 'app-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NavigationComponent, SidebarComponent],
  host: {
    class: 'app-main-layout-host',
    ngSkipHydration: 'true',
  },
  template: `
    <div [class]="layoutClasses()">
      <!-- Top Navigation -->
      <app-navigation (sidebarToggle)="toggleSidebar()" />

      <!-- Main Container (Sidebar + Content) -->
      <div [class]="mainContainerClasses()">
        <!-- Sidebar -->
        <app-sidebar
          [collapsed]="sidebarCollapsed()"
          [conversations]="conversations()"
          [activeConversationId]="activeConversationId()"
          (collapsedChange)="handleSidebarCollapsedChange($event)"
          (conversationSelect)="handleConversationSelect($event)"
          (conversationDelete)="handleConversationDelete($event)"
          (newConversation)="handleNewConversation()"
        />

        <!-- Main Content Area -->
        <main [class]="contentClasses()">
          <ng-content />
        </main>
      </div>
    </div>
  `,
})
export class MainLayoutComponent {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'ai-kit-sidebar-collapsed';

  // State
  sidebarCollapsed = signal(false);
  activeConversationId = signal<string | null>('1');

  // Mock conversations (will be replaced with real data)
  conversations = signal<Conversation[]>([
    {
      id: '1',
      title: 'Getting started with Angular AI Kit',
      timestamp: new Date(),
      preview: 'How do I use the chat components?',
    },
    {
      id: '2',
      title: 'Custom styling with Tailwind',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      preview: 'Can I customize the component styles?',
    },
    {
      id: '3',
      title: 'Implementing dark mode',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
      preview: 'How does dark mode work?',
    },
    {
      id: '4',
      title: 'Message streaming example',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      preview: 'Can messages be streamed in real-time?',
    },
    {
      id: '5',
      title: 'Building a chatbot',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
      preview: 'Help me integrate with OpenAI',
    },
  ]);

  constructor() {
    // Load sidebar state from localStorage AFTER hydration completes
    // This ensures server and client render the same initial state
    afterNextRender(() => {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved === 'true') {
        this.sidebarCollapsed.set(true);
      }
    });
  }

  // Computed classes
  layoutClasses = computed(() => {
    return cn(
      'app-main-layout',
      'flex flex-col',
      'h-screen overflow-hidden',
      'bg-gray-50 dark:bg-gray-900'
    );
  });

  mainContainerClasses = computed(() => {
    return cn('flex flex-row flex-1 min-h-0 overflow-hidden');
  });

  contentClasses = computed(() => {
    return cn(
      'app-main-content',
      'flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden',
      'transition-all duration-300',
      'bg-white dark:bg-gray-900'
    );
  });

  // Methods
  toggleSidebar(): void {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  handleSidebarCollapsedChange(collapsed: boolean): void {
    this.sidebarCollapsed.set(collapsed);
  }

  handleConversationSelect(id: string): void {
    this.activeConversationId.set(id);
    console.log('Selected conversation:', id);
    // TODO: Load conversation messages
  }

  handleConversationDelete(id: string): void {
    console.log('Delete conversation:', id);
    // TODO: Implement delete logic
    this.conversations.update((convos) => convos.filter((c) => c.id !== id));
  }

  handleNewConversation(): void {
    console.log('New conversation');
    // TODO: Create new conversation
    const newId = Date.now().toString();
    this.conversations.update((convos) => [
      {
        id: newId,
        title: 'New conversation',
        timestamp: new Date(),
      },
      ...convos,
    ]);
    this.activeConversationId.set(newId);
  }
}
