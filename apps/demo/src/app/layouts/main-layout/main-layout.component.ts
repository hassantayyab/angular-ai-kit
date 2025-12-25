import { cn } from '@angular-ai-kit/utils';
import { isPlatformBrowser } from '@angular/common';
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
import { ChatViewComponent } from '../../components/chat-view/chat-view.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

/**
 * MainLayout Component
 *
 * Main application layout with sidebar and chat view.
 * Handles responsive design and sidebar state management.
 * No top navigation - sidebar-only pattern like ChatGPT/Claude.
 *
 * @example
 * ```html
 * <app-main-layout />
 * ```
 */
@Component({
  selector: 'app-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [SidebarComponent, ChatViewComponent],
  host: {
    class: 'app-main-layout-host block h-screen',
    ngSkipHydration: 'true',
  },
  template: `
    <div [class]="layoutClasses()">
      <!-- Sidebar -->
      <app-sidebar
        [collapsed]="sidebarCollapsed()"
        (collapsedChange)="handleSidebarCollapsedChange($event)"
      />

      <!-- Main Content Area -->
      <main [class]="contentClasses()">
        <app-chat-view
          [showMobileMenuButton]="isMobile()"
          (mobileMenuClick)="openSidebar()"
        />
      </main>
    </div>
  `,
})
export class MainLayoutComponent {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'ai-kit-sidebar-collapsed';
  private readonly MOBILE_BREAKPOINT = 768;

  // State
  sidebarCollapsed = signal(false);
  private isMobileSignal = signal(false);

  constructor() {
    afterNextRender(() => {
      // Load sidebar state from localStorage
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved === 'true') {
        this.sidebarCollapsed.set(true);
      }

      // Check if mobile
      this.checkIfMobile();
      window.addEventListener('resize', () => this.checkIfMobile());

      // Auto-collapse on mobile
      if (this.isMobileSignal()) {
        this.sidebarCollapsed.set(true);
      }
    });
  }

  // Computed
  isMobile = computed(() => this.isMobileSignal());

  layoutClasses = computed(() => {
    return cn(
      'app-main-layout',
      'flex',
      'h-screen overflow-hidden',
      'bg-[var(--background)]'
    );
  });

  contentClasses = computed(() => {
    return cn(
      'app-main-content',
      'flex flex-col flex-1 min-w-0 min-h-0',
      'overflow-hidden',
      'bg-[var(--background)]'
    );
  });

  // Methods
  private checkIfMobile(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileSignal.set(window.innerWidth < this.MOBILE_BREAKPOINT);
    }
  }

  handleSidebarCollapsedChange(collapsed: boolean): void {
    this.sidebarCollapsed.set(collapsed);
  }

  openSidebar(): void {
    this.sidebarCollapsed.set(false);
  }
}
