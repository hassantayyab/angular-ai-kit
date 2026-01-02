import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DocCodeBlockComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/**
 * Troubleshooting Component
 *
 * Common issues and solutions.
 */
@Component({
  selector: 'app-troubleshooting',
  templateUrl: './troubleshooting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DocSectionComponent, DocCodeBlockComponent, RouterLink],
})
export class TroubleshootingComponent {
  // Module not found error fix
  readonly moduleNotFoundCode = `// Check your tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@angular-ai-kit/*": ["./node_modules/@angular-ai-kit/*"]
    }
  }
}

// Or try reinstalling
npm install @angular-ai-kit/core @angular-ai-kit/utils`;

  // Tailwind not working fix
  readonly tailwindFixCode = `// postcss.config.js (Tailwind v4)
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

// styles.css
@import "tailwindcss";

// angular.json - ensure styles are included
"styles": [
  "src/styles.css"
]`;

  // CSS variables fix
  readonly cssVariablesCode = `:root {
  /* Required CSS variables */
  --background: theme('colors.white');
  --foreground: theme('colors.zinc.950');
  --card: theme('colors.zinc.50');
  --card-foreground: theme('colors.zinc.950');
  --muted: theme('colors.zinc.100');
  --muted-foreground: theme('colors.zinc.500');
  --accent: theme('colors.zinc.100');
  --accent-foreground: theme('colors.zinc.900');
  --border: theme('colors.zinc.200');
  --input: theme('colors.zinc.200');
  --ring: theme('colors.zinc.400');
  --primary: theme('colors.zinc.900');
  --primary-foreground: theme('colors.zinc.50');
}

.dark {
  --background: theme('colors.zinc.950');
  --foreground: theme('colors.zinc.50');
  /* ... dark mode values */
}`;

  // ViewEncapsulation fix
  readonly viewEncapsulationCode = `import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chat',
  encapsulation: ViewEncapsulation.None, // Required for Tailwind
  template: \`...\`,
})
export class ChatComponent {}`;

  // Signal update fix
  readonly signalUpdateCode = `// ❌ Wrong - mutate() is deprecated
this.messages.mutate(msgs => {
  msgs.push(newMessage);
});

// ✅ Correct - use update()
this.messages.update(msgs => [...msgs, newMessage]);

// ✅ Or use set() for full replacement
this.messages.set([...this.messages(), newMessage]);`;

  // Streaming not working fix
  readonly streamingFixCode = `// Check your backend is sending SSE format
res.setHeader('Content-Type', 'text/event-stream');
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');

// Each chunk should be formatted as:
res.write(\`data: \${JSON.stringify(chunk)}\\n\\n\`);

// End with:
res.write('data: [DONE]\\n\\n');
res.end();`;

  // Memory leak fix
  readonly memoryLeakCode = `// Use DestroyRef for cleanup
private destroyRef = inject(DestroyRef);

ngOnInit() {
  this.subscription = this.service.data$.subscribe(/* ... */);

  this.destroyRef.onDestroy(() => {
    this.subscription.unsubscribe();
  });
}

// Or use takeUntilDestroyed()
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

this.service.data$
  .pipe(takeUntilDestroyed())
  .subscribe(/* ... */);`;

  // CORS fix
  readonly corsFixCode = `// Backend - Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Or use Angular proxy for development
// proxy.conf.json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}`;

  // SSR hydration fix
  readonly ssrFixCode = `// Check for browser before accessing DOM
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export class MyComponent {
  private platformId = inject(PLATFORM_ID);

  scrollToBottom() {
    if (isPlatformBrowser(this.platformId)) {
      // Safe to access DOM
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
}`;

  // Change detection fix
  readonly changeDetectionCode = `// Force change detection for async updates
private cdr = inject(ChangeDetectorRef);

async loadData() {
  const data = await this.api.fetch();
  this.data.set(data);
  this.cdr.markForCheck(); // Trigger change detection
}

// Or use signals which auto-trigger updates
data = signal<Data | null>(null);

async loadData() {
  const data = await this.api.fetch();
  this.data.set(data); // Auto-triggers CD
}`;
}
