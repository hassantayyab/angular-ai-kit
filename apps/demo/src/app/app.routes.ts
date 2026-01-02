import { Route } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/chat/chat-page.component').then(
            (m) => m.ChatPageComponent
          ),
      },
      {
        path: 'docs',
        loadComponent: () =>
          import('./pages/docs/docs-page.component').then(
            (m) => m.DocsPageComponent
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/docs/home').then((m) => m.DocsHomeComponent),
          },
          {
            path: 'components',
            loadComponent: () =>
              import('./pages/docs/docs-overview.component').then(
                (m) => m.DocsOverviewComponent
              ),
          },
          {
            path: 'components/user-message',
            loadComponent: () =>
              import(
                './pages/docs/components/user-message/user-message-doc.component'
              ).then((m) => m.UserMessageDocComponent),
          },
          {
            path: 'components/chat-input',
            loadComponent: () =>
              import(
                './pages/docs/components/chat-input/chat-input-doc.component'
              ).then((m) => m.ChatInputDocComponent),
          },
          {
            path: 'components/streaming-text',
            loadComponent: () =>
              import(
                './pages/docs/components/streaming-text/streaming-text-doc.component'
              ).then((m) => m.StreamingTextDocComponent),
          },
          {
            path: 'components/typing-indicator',
            loadComponent: () =>
              import(
                './pages/docs/components/typing-indicator/typing-indicator-doc.component'
              ).then((m) => m.TypingIndicatorDocComponent),
          },
          {
            path: 'components/ai-response',
            loadComponent: () =>
              import(
                './pages/docs/components/ai-response/ai-response-doc.component'
              ).then((m) => m.AiResponseDocComponent),
          },
          {
            path: 'components/code-block',
            loadComponent: () =>
              import(
                './pages/docs/components/code-block/code-block-doc.component'
              ).then((m) => m.CodeBlockDocComponent),
          },
          {
            path: 'components/markdown-renderer',
            loadComponent: () =>
              import(
                './pages/docs/components/markdown-renderer/markdown-renderer-doc.component'
              ).then((m) => m.MarkdownRendererDocComponent),
          },
          {
            path: 'components/feedback-buttons',
            loadComponent: () =>
              import(
                './pages/docs/components/feedback-buttons/feedback-buttons-doc.component'
              ).then((m) => m.FeedbackButtonsDocComponent),
          },
          {
            path: 'components/response-actions',
            loadComponent: () =>
              import(
                './pages/docs/components/response-actions/response-actions-doc.component'
              ).then((m) => m.ResponseActionsDocComponent),
          },
          {
            path: 'components/message-actions',
            loadComponent: () =>
              import(
                './pages/docs/components/message-actions/message-actions-doc.component'
              ).then((m) => m.MessageActionsDocComponent),
          },
          {
            path: 'components/prompt-suggestions',
            loadComponent: () =>
              import(
                './pages/docs/components/prompt-suggestions/prompt-suggestions-doc.component'
              ).then((m) => m.PromptSuggestionsDocComponent),
          },
          {
            path: 'components/conversation-list',
            loadComponent: () =>
              import(
                './pages/docs/components/conversation-list/conversation-list-doc.component'
              ).then((m) => m.ConversationListDocComponent),
          },
          {
            path: 'guides/getting-started',
            loadComponent: () =>
              import('./pages/docs/guides/getting-started').then(
                (m) => m.GettingStartedComponent
              ),
          },
          {
            path: 'guides/theming',
            loadComponent: () =>
              import('./pages/docs/guides/theming').then(
                (m) => m.ThemingComponent
              ),
          },
          {
            path: 'guides/building-chat-app',
            loadComponent: () =>
              import('./pages/docs/guides/building-chat-app').then(
                (m) => m.BuildingChatAppComponent
              ),
          },
          {
            path: 'guides/api-integration',
            loadComponent: () =>
              import('./pages/docs/guides/api-integration').then(
                (m) => m.ApiIntegrationComponent
              ),
          },
          {
            path: 'guides/customization',
            loadComponent: () =>
              import('./pages/docs/guides/customization').then(
                (m) => m.CustomizationComponent
              ),
          },
          {
            path: 'api/types',
            loadComponent: () =>
              import('./pages/docs/api/types').then(
                (m) => m.TypesReferenceComponent
              ),
          },
          {
            path: 'api/tokens',
            loadComponent: () =>
              import('./pages/docs/api/tokens').then(
                (m) => m.TokensReferenceComponent
              ),
          },
          {
            path: 'api/utilities',
            loadComponent: () =>
              import('./pages/docs/api/utilities').then(
                (m) => m.UtilitiesReferenceComponent
              ),
          },
          {
            path: 'api/services',
            loadComponent: () =>
              import('./pages/docs/api/services').then(
                (m) => m.ServicesReferenceComponent
              ),
          },
          {
            path: 'guides/faq',
            loadComponent: () =>
              import('./pages/docs/guides/faq').then((m) => m.FaqComponent),
          },
          {
            path: 'guides/troubleshooting',
            loadComponent: () =>
              import('./pages/docs/guides/troubleshooting').then(
                (m) => m.TroubleshootingComponent
              ),
          },
          {
            path: 'examples/full-chat',
            loadComponent: () =>
              import('./pages/docs/examples/full-chat').then(
                (m) => m.FullChatExampleComponent
              ),
          },
        ],
      },
    ],
  },
];
