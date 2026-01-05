import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ComponentCardComponent } from '../../components/component-card';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../components/doc-ui';

/** Icon paths for component cards */
const ICONS = {
  aiResponse:
    'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z',
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
  feedbackButtons:
    'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',
  responseActions:
    'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
  messageActions:
    'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  promptSuggestions:
    'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  conversationList:
    'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
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
  imports: [ComponentCardComponent, DocSectionComponent, DocCodeBlockComponent],
  host: {
    class: 'app-docs-overview block',
  },
})
export class DocsOverviewComponent {
  /** Install command */
  installCode = 'npm install @angular-ai-kit/core';

  /** Core components (active) */
  coreComponents: ComponentInfo[] = [
    {
      iconPath: ICONS.aiResponse,
      title: 'AI Response',
      description:
        'Rich markdown with syntax highlighting, streaming, and actions.',
      link: '/docs/components/ai-response',
    },
    {
      iconPath: ICONS.messageBubble,
      title: 'User Message',
      description:
        'Compact user message card with inline editing and truncation.',
      link: '/docs/components/user-message',
    },
    {
      iconPath: ICONS.chatInput,
      title: 'Chat Input',
      description:
        'Message input with auto-resize, toolbar, and keyboard shortcuts.',
      link: '/docs/components/chat-input',
    },
    {
      iconPath: ICONS.streamingText,
      title: 'Streaming Text',
      description:
        'Typewriter effect for streaming AI responses with cursor animation.',
      link: '/docs/components/streaming-text',
    },
    {
      iconPath: ICONS.typingIndicator,
      title: 'Typing Indicator',
      description: 'Animated bouncing dots indicating AI is processing.',
      link: '/docs/components/typing-indicator',
    },
    {
      iconPath: ICONS.codeBlock,
      title: 'Code Block',
      description:
        'Syntax highlighted code display with copy button and line numbers.',
      link: '/docs/components/code-block',
    },
    {
      iconPath: ICONS.markdownRenderer,
      title: 'Markdown Renderer',
      description: 'Rich markdown rendering with code blocks and sanitization.',
      link: '/docs/components/markdown-renderer',
    },
    {
      iconPath: ICONS.feedbackButtons,
      title: 'Feedback Buttons',
      description: 'Thumbs up/down toggle buttons for AI response feedback.',
      link: '/docs/components/feedback-buttons',
    },
    {
      iconPath: ICONS.responseActions,
      title: 'Response Actions',
      description: 'Copy, regenerate, and feedback buttons for AI responses.',
      link: '/docs/components/response-actions',
    },
    {
      iconPath: ICONS.messageActions,
      title: 'Message Actions',
      description: 'Copy and edit action buttons for user messages.',
      link: '/docs/components/message-actions',
    },
    {
      iconPath: ICONS.promptSuggestions,
      title: 'Prompt Suggestions',
      description: 'Badge/chip list for suggested prompts and quick actions.',
      link: '/docs/components/prompt-suggestions',
    },
  ];

  /** Coming soon components (disabled) */
  comingSoonComponents: ComponentInfo[] = [
    {
      iconPath: ICONS.conversationList,
      title: 'Conversation List',
      description:
        'Grouped conversation history with date labels and selection.',
      badge: 'Coming Soon',
    },
    {
      iconPath: ICONS.tokenCounter,
      title: 'Token Counter',
      description:
        'Token usage display with limit indicator and warning states.',
      badge: 'Coming Soon',
    },
    {
      iconPath: ICONS.modelSelector,
      title: 'Model Selector',
      description: 'Dropdown for selecting AI models (GPT-4, Claude, etc.).',
      badge: 'Coming Soon',
    },
    {
      iconPath: ICONS.fileUpload,
      title: 'File Upload',
      description: 'Drag and drop file attachment with preview and validation.',
      badge: 'Coming Soon',
    },
  ];
}
