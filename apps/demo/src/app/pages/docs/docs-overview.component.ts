import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * DocsOverview Component
 *
 * Default landing page for documentation with component grid.
 */
@Component({
  selector: 'app-docs-overview',
  template: `
    <div class="space-y-8">
      <!-- Getting Started Section -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">Getting Started</h2>
        <div class="bg-card border-border rounded-lg border p-6">
          <p class="text-foreground mb-4">
            Angular AI Kit provides a set of beautiful, accessible components
            for building AI chat interfaces in Angular applications.
          </p>
          <div class="bg-muted rounded-md p-4">
            <code class="text-sm">npm install &#64;angular-ai-kit/core</code>
          </div>
        </div>
      </section>

      <!-- Components Section -->
      <section>
        <h2 class="mb-4 text-xl font-semibold">Components</h2>
        <p class="text-muted-foreground mb-6">
          Click on a component to view its documentation with live examples.
        </p>

        <!-- Component Cards Grid -->
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <!-- MessageBubble -->
          <a
            routerLink="components/message-bubble"
            class="bg-card border-border hover:border-primary group rounded-lg border p-4 transition-colors"
          >
            <div class="mb-2 flex items-center gap-2">
              <svg
                class="text-primary h-5 w-5"
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
              <h3 class="font-medium">MessageBubble</h3>
            </div>
            <p class="text-muted-foreground text-sm">
              Chat message component with role-based styling and actions.
            </p>
          </a>

          <!-- MessageList -->
          <a
            routerLink="components/message-list"
            class="bg-card border-border hover:border-primary group rounded-lg border p-4 transition-colors"
          >
            <div class="mb-2 flex items-center gap-2">
              <svg
                class="text-primary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <h3 class="font-medium">MessageList</h3>
            </div>
            <p class="text-muted-foreground text-sm">
              Scrollable message container with auto-scroll and loading states.
            </p>
          </a>

          <!-- ChatContainer -->
          <a
            routerLink="components/chat-container"
            class="bg-card border-border hover:border-primary group rounded-lg border p-4 transition-colors"
          >
            <div class="mb-2 flex items-center gap-2">
              <svg
                class="text-primary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 class="font-medium">ChatContainer</h3>
            </div>
            <p class="text-muted-foreground text-sm">
              Full chat layout with header, messages, and footer sections.
            </p>
          </a>

          <!-- ChatInput (Coming Soon) -->
          <div class="bg-card border-border rounded-lg border p-4 opacity-60">
            <div class="mb-2 flex items-center gap-2">
              <svg
                class="text-muted-foreground h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <h3 class="font-medium">ChatInput</h3>
              <span
                class="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs"
                >Coming Soon</span
              >
            </div>
            <p class="text-muted-foreground text-sm">
              Message input with auto-resize and keyboard shortcuts.
            </p>
          </div>

          <!-- StreamingText (Coming Soon) -->
          <div class="bg-card border-border rounded-lg border p-4 opacity-60">
            <div class="mb-2 flex items-center gap-2">
              <svg
                class="text-muted-foreground h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 class="font-medium">StreamingText</h3>
              <span
                class="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs"
                >Coming Soon</span
              >
            </div>
            <p class="text-muted-foreground text-sm">
              Animated text display for streaming AI responses.
            </p>
          </div>

          <!-- TypingIndicator (Coming Soon) -->
          <div class="bg-card border-border rounded-lg border p-4 opacity-60">
            <div class="mb-2 flex items-center gap-2">
              <svg
                class="text-muted-foreground h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
              <h3 class="font-medium">TypingIndicator</h3>
              <span
                class="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs"
                >Coming Soon</span
              >
            </div>
            <p class="text-muted-foreground text-sm">
              Animated dots indicating the AI is processing.
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink],
  host: {
    class: 'app-docs-overview block',
  },
})
export class DocsOverviewComponent {}
