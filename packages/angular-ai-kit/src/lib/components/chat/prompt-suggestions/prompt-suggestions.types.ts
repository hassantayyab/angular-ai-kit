/**
 * Prompt suggestion item
 */
export interface PromptSuggestion {
  /** Short display text for the badge */
  label: string;
  /** Full prompt text to use when selected */
  prompt: string;
  /** Optional emoji or icon name */
  icon?: string;
}

/**
 * Position of suggestion badges relative to the input
 */
export type SuggestionsPosition = 'top' | 'bottom';
