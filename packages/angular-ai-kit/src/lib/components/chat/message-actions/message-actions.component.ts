import { cn } from '@angular-ai-kit/utils';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { IconButtonComponent } from '../../ui/icon-button';

/**
 * Message Actions Component
 *
 * Action buttons for user messages with copy and edit functionality.
 * Designed to appear on hover/focus of the message.
 *
 * @example
 * ```html
 * <ai-message-actions
 *   [content]="messageContent"
 *   [isVisible]="isHovered || isFocused"
 *   (copy)="handleCopy()"
 *   (edit)="handleEdit()"
 * />
 * ```
 */
@Component({
  selector: 'ai-message-actions',
  templateUrl: './message-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconButtonComponent],
  host: {
    class: 'ai-message-actions-host inline-flex',
  },
})
export class MessageActionsComponent {
  private platformId = inject(PLATFORM_ID);

  // ==========================================
  // Inputs
  // ==========================================

  /** Content to copy (for copy button) */
  content = input<string>('');

  /** Whether to show the copy button */
  showCopy = input<boolean>(true);

  /** Whether to show the edit button */
  showEdit = input<boolean>(true);

  /** Whether actions are visible (controlled by parent) */
  isVisible = input<boolean>(false);

  /** Whether actions are always visible */
  alwaysVisible = input<boolean>(false);

  /** Custom CSS classes */
  customClasses = input<string>('');

  // ==========================================
  // Outputs
  // ==========================================

  /** Emitted when copy button is clicked */
  copy = output<void>();

  /** Emitted when edit button is clicked */
  edit = output<void>();

  // ==========================================
  // State
  // ==========================================

  /** Whether copy was just clicked */
  justCopied = signal(false);

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Whether actions should be shown */
  actionsVisible = computed(() => this.alwaysVisible() || this.isVisible());

  /** Icon for copy button */
  copyIcon = computed(() => (this.justCopied() ? 'lucideCheck' : 'lucideCopy'));

  /** Copy button classes */
  copyButtonClasses = computed(() =>
    cn({
      'text-foreground': this.justCopied(),
    })
  );

  /** Container classes */
  containerClasses = computed(() =>
    cn(
      'ai-message-actions flex items-center gap-1',
      'transition-opacity duration-150',
      {
        'opacity-100 visible': this.actionsVisible(),
        'opacity-0 invisible': !this.actionsVisible(),
      },
      this.customClasses()
    )
  );

  // ==========================================
  // Event Handlers
  // ==========================================

  /** Handle copy button click */
  handleCopy(): void {
    const content = this.content();
    this.copy.emit();

    if (isPlatformBrowser(this.platformId) && navigator.clipboard && content) {
      navigator.clipboard.writeText(content).then(() => {
        this.justCopied.set(true);
        setTimeout(() => this.justCopied.set(false), 2000);
      });
    }
  }

  /** Handle edit button click */
  handleEdit(): void {
    this.edit.emit();
  }
}
