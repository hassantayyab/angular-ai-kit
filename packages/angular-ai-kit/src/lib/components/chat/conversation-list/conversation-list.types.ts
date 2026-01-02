/**
 * Conversation item for the list
 */
export interface Conversation {
  /** Unique identifier */
  id: string;
  /** Conversation title */
  title: string;
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Conversation group for display
 */
export interface ConversationGroup {
  /** Group label (Today, Yesterday, etc.) */
  label: string;
  /** Conversations in this group */
  conversations: Conversation[];
}

/**
 * Group labels for date-based grouping
 */
export type GroupLabel =
  | 'Today'
  | 'Yesterday'
  | 'Previous 7 days'
  | 'Previous 30 days'
  | 'Older';
