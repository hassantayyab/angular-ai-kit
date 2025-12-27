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
              import('./pages/docs/docs-overview.component').then(
                (m) => m.DocsOverviewComponent
              ),
          },
          {
            path: 'components/message-bubble',
            loadComponent: () =>
              import(
                './pages/docs/components/message-bubble/message-bubble-doc.component'
              ).then((m) => m.MessageBubbleDocComponent),
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
        ],
      },
    ],
  },
];
