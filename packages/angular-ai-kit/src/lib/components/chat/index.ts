/**
 * Chat components barrel export
 *
 * @module components/chat
 */

export { UserMessageComponent } from './user-message';
export type { EditEvent } from './user-message';
export { MessageListComponent } from './message-list';
export { ChatContainerComponent } from './chat-container';
export { MessageActionsComponent } from './message-actions';
export { PromptSuggestionsComponent } from './prompt-suggestions';
export type {
  PromptSuggestion,
  SuggestionsPosition,
} from './prompt-suggestions';
export { ConversationListComponent } from './conversation-list';
export type {
  Conversation,
  ConversationGroup,
  GroupLabel,
} from './conversation-list';
