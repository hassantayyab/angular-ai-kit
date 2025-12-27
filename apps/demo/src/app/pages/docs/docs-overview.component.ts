import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ComponentCardComponent } from '../../components/component-card';

/** Icon paths for component cards */
const ICONS = {
  messageBubble:
    'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  messageList: 'M4 6h16M4 10h16M4 14h16M4 18h16',
  chatContainer:
    'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4',
  chatInput:
    'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  streamingText: 'M13 10V3L4 14h7v7l9-11h-7z',
  typingIndicator:
    'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z',
  codeBlock: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  markdownRenderer:
    'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  tokenCounter:
    'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
  modelSelector:
    'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  fileUpload:
    'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
};

/** Component card data structure */
interface ComponentInfo {
  iconPath: string;
  title: string;
  description: string;
  link?: string;
  badge?: string;
}

/**
 * DocsOverview Component
 *
 * Default landing page for documentation with component grid.
 */
@Component({
  selector: 'app-docs-overview',
  templateUrl: './docs-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ComponentCardComponent],
  host: {
    class: 'app-docs-overview block',
  },
})
export class DocsOverviewComponent {
  /** Core components (active) */
  coreComponents: ComponentInfo[] = [
    {
      iconPath: ICONS.messageBubble,
      title: 'MessageBubble',
      description:
        'Chat message component with role-based styling and actions.',
      link: 'components/message-bubble',
    },
    {
      iconPath: ICONS.messageList,
      title: 'MessageList',
      description:
        'Scrollable message container with auto-scroll and loading states.',
      link: 'components/message-list',
    },
    {
      iconPath: ICONS.chatContainer,
      title: 'ChatContainer',
      description:
        'Full chat layout with header, messages, and footer sections.',
      link: 'components/chat-container',
    },
    {
      iconPath: ICONS.chatInput,
      title: 'ChatInput',
      description:
        'Message input with auto-resize, toolbar, and keyboard shortcuts.',
      link: 'components/chat-input',
    },
    {
      iconPath: ICONS.streamingText,
      title: 'StreamingText',
      description:
        'Typewriter effect for streaming AI responses with cursor animation.',
      link: 'components/streaming-text',
    },
    {
      iconPath: ICONS.typingIndicator,
      title: 'TypingIndicator',
      description: 'Animated bouncing dots indicating AI is processing.',
      link: 'components/typing-indicator',
    },
  ];

  /** Coming soon components (disabled) */
  comingSoonComponents: ComponentInfo[] = [
    {
      iconPath: ICONS.codeBlock,
      title: 'CodeBlock',
      description:
        'Syntax highlighted code display with copy button and line numbers.',
      badge: 'Coming Soon',
    },
    {
      iconPath: ICONS.markdownRenderer,
      title: 'MarkdownRenderer',
      description: 'Rich markdown rendering with code blocks and sanitization.',
      badge: 'Coming Soon',
    },
    {
      iconPath: ICONS.tokenCounter,
      title: 'TokenCounter',
      description:
        'Token usage display with limit indicator and warning states.',
      badge: 'Coming Soon',
    },
    {
      iconPath: ICONS.modelSelector,
      title: 'ModelSelector',
      description: 'Dropdown for selecting AI models (GPT-4, Claude, etc.).',
      badge: 'Coming Soon',
    },
    {
      iconPath: ICONS.fileUpload,
      title: 'FileUpload',
      description: 'Drag and drop file attachment with preview and validation.',
      badge: 'Coming Soon',
    },
    {
      iconPath: ICONS.modelSelector,
      title: 'ConversationList',
      description:
        'Sidebar with chat history, search, and conversation management.',
      badge: 'Coming Soon',
    },
  ];
}
