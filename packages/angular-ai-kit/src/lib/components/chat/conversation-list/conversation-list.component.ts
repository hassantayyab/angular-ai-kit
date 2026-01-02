import { cn } from '@angular-ai-kit/utils';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
import { IconButtonComponent } from '../../ui/icon-button';
import {
  Conversation,
  ConversationGroup,
  GroupLabel,
} from './conversation-list.types';

/** Order of group labels for sorting */
const GROUP_ORDER: GroupLabel[] = [
  'Today',
  'Yesterday',
  'Previous 7 days',
  'Previous 30 days',
  'Older',
];

/**
 * Conversation List Component
 *
 * Displays a grouped list of conversations with date-based grouping.
 * Supports active conversation highlighting and delete functionality.
 *
 * @example
 * ```html
 * <ai-conversation-list
 *   [conversations]="conversations"
 *   [activeId]="activeConversationId"
 *   (select)="handleSelect($event)"
 *   (delete)="handleDelete($event)"
 * />
 * ```
 */
@Component({
  selector: 'ai-conversation-list',
  templateUrl: './conversation-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconButtonComponent],
  host: {
    class: 'ai-conversation-list block',
  },
})
export class ConversationListComponent {
  // ==========================================
  // Inputs
  // ==========================================

  /** Array of conversations to display */
  conversations = input.required<Conversation[]>();

  /** ID of the currently active conversation */
  activeId = input<string | null>(null);

  /** Whether to show delete buttons */
  showDelete = input<boolean>(true);

  /** Empty state message */
  emptyMessage = input<string>('No conversations yet');

  /** Custom CSS classes */
  customClasses = input<string>('');

  // ==========================================
  // Outputs
  // ==========================================

  /** Emitted when a conversation is selected */
  select = output<string>();

  /** Emitted when delete is clicked */
  delete = output<string>();

  // ==========================================
  // Computed Properties
  // ==========================================

  /** Whether the list is empty */
  isEmpty = computed(() => this.conversations().length === 0);

  /** Grouped conversations by date */
  groups = computed((): ConversationGroup[] => {
    const conversations = this.conversations();
    const groupMap = new Map<GroupLabel, Conversation[]>();

    // Group conversations by date
    conversations.forEach((conv) => {
      const label = this.getGroupLabel(conv.updatedAt);
      if (!groupMap.has(label)) {
        groupMap.set(label, []);
      }
      groupMap.get(label)?.push(conv);
    });

    // Return groups in order
    const groups: ConversationGroup[] = [];
    GROUP_ORDER.forEach((label) => {
      const convs = groupMap.get(label);
      if (convs && convs.length > 0) {
        groups.push({ label, conversations: convs });
      }
    });

    return groups;
  });

  /** Container classes */
  containerClasses = computed(() =>
    cn('ai-conversation-list-container', this.customClasses())
  );

  // ==========================================
  // Methods
  // ==========================================

  /** Determine group label based on date */
  private getGroupLabel(date: Date): GroupLabel {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return 'Previous 7 days';
    if (diffDays <= 30) return 'Previous 30 days';
    return 'Older';
  }

  /** Check if conversation is active */
  isActive(id: string): boolean {
    return this.activeId() === id;
  }

  /** Handle conversation click */
  handleSelect(id: string): void {
    this.select.emit(id);
  }

  /** Handle delete click */
  handleDelete(event: Event, id: string): void {
    event.stopPropagation();
    this.delete.emit(id);
  }

  /** Track function for groups */
  trackByLabel(_index: number, group: ConversationGroup): string {
    return group.label;
  }

  /** Track function for conversations */
  trackById(_index: number, conversation: Conversation): string {
    return conversation.id;
  }
}
