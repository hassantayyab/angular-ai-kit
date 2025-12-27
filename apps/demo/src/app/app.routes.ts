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
            path: 'components/message-list',
            loadComponent: () =>
              import(
                './pages/docs/components/message-list/message-list-doc.component'
              ).then((m) => m.MessageListDocComponent),
          },
          {
            path: 'components/chat-container',
            loadComponent: () =>
              import(
                './pages/docs/components/chat-container/chat-container-doc.component'
              ).then((m) => m.ChatContainerDocComponent),
          },
        ],
      },
    ],
  },
];
