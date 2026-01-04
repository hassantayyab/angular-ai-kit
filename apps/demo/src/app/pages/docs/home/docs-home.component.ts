import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../../components/doc-ui';

/**
 * Documentation navigation card
 */
interface DocCard {
  title: string;
  description: string;
  link: string;
  icon: string;
}

/**
 * DocsHome Component
 *
 * Main documentation landing page with overview, quick start, and navigation.
 */
@Component({
  selector: 'app-docs-home',
  templateUrl: './docs-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, DocSectionComponent, DocCodeBlockComponent],
  host: {
    class: 'app-docs-home block',
  },
})
export class DocsHomeComponent {
  /** Installation command */
  installCode = `npm install @angular-ai-kit/core @angular-ai-kit/tokens @angular-ai-kit/utils`;

  /** Quick start example */
  quickStartCode = `import { ChatInputComponent } from '@angular-ai-kit/core';

@Component({
  selector: 'app-chat',
  imports: [ChatInputComponent],
  template: \`
    <ai-chat-input
      placeholder="Send a message..."
      (messageSubmit)="handleMessage($event)"
    />
  \`,
})
export class ChatComponent {
  handleMessage(content: string) {
    console.log('Message:', content);
  }
}`;

  /** CLI usage example */
  cliCode = `# Initialize Angular AI Kit in your project
npx @angular-ai-kit/cli init

# Add components to your project
npx @angular-ai-kit/cli add ai-response chat-input`;

  /** Main navigation cards */
  mainCards: DocCard[] = [
    {
      title: 'Components',
      description: '14 production-ready AI chat components',
      link: '/docs/components',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    },
    {
      title: 'Guides',
      description: 'Step-by-step tutorials for building AI chat interfaces',
      link: '/docs/guides/theming',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
    {
      title: 'Examples',
      description: 'Real-world examples with complete implementations',
      link: '/docs/examples/full-chat',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    },
    {
      title: 'API Reference',
      description: 'Complete TypeScript API documentation',
      link: '/docs/api/types',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
  ];

  /** Quick links */
  quickLinks: DocCard[] = [
    {
      title: 'Getting Started',
      description: 'Installation and first component',
      link: '/docs/guides/getting-started',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      title: 'Theming',
      description: 'Customize colors and styles',
      link: '/docs/guides/theming',
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    },
    {
      title: 'Full Chat Example',
      description: 'Complete chat implementation',
      link: '/docs/examples/full-chat',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    },
    {
      title: 'FAQ',
      description: 'Common questions and solutions',
      link: '/docs/guides/faq',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  /** Features list */
  features = [
    {
      title: 'Angular v21',
      description:
        'Latest features with signals, control flow, and zoneless support',
    },
    {
      title: 'Tailwind CSS v4',
      description: 'Modern utility-first styling with CSS-only',
    },
    {
      title: 'Spartan UI',
      description:
        'Built on Spartan UI primitives (uses Angular CDK internally for accessibility)',
    },
    {
      title: 'Accessible',
      description:
        'WCAG AA compliant with keyboard navigation and screen reader support',
    },
    {
      title: 'Dark Mode',
      description: 'Built-in theme support with CSS custom properties',
    },
    {
      title: 'TypeScript',
      description: 'Fully typed with strict mode enabled',
    },
    {
      title: 'SSR Compatible',
      description: 'Server-side rendering and hydration ready',
    },
  ];
}
