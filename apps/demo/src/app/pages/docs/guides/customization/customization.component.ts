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
 * Customization Guide
 *
 * How to customize Angular AI Kit components.
 */
@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DocSectionComponent, DocCodeBlockComponent, RouterLink],
})
export class CustomizationComponent {
  // Custom classes example
  readonly customClassesCode = `<!-- Using customClasses input -->
<ai-user-message
  [content]="message.content"
  customClasses="rounded-xl shadow-lg"
/>

<ai-response
  [content]="response.content"
  customClasses="border-l-4 border-primary pl-4"
/>

<ai-chat-input
  placeholder="Ask anything..."
  customClasses="bg-muted/50"
/>`;

  // Wrapping components
  readonly wrappingCode = `// custom-message.component.ts
import { Component, input } from '@angular/core';
import { AiResponseComponent } from '@angular-ai-kit/core';

@Component({
  selector: 'app-custom-message',
  imports: [AiResponseComponent],
  template: \`
    <div class="my-custom-wrapper">
      <!-- Custom header -->
      <div class="flex items-center gap-2 mb-2">
        <img [src]="avatarUrl()" class="w-8 h-8 rounded-full" />
        <span class="font-semibold">{{ name() }}</span>
      </div>

      <!-- Use original component -->
      <ai-response
        [content]="content()"
        [customClasses]="responseClasses"
      />

      <!-- Custom footer -->
      <div class="mt-2 text-xs text-muted-foreground">
        {{ timestamp() | date:'short' }}
      </div>
    </div>
  \`,
  styles: \`
    .my-custom-wrapper {
      padding: 1rem;
      border-radius: 0.75rem;
      background: var(--card);
    }
  \`,
})
export class CustomMessageComponent {
  content = input.required<string>();
  name = input('Assistant');
  avatarUrl = input('/avatar.png');
  timestamp = input(new Date());

  readonly responseClasses = 'prose-sm';
}`;

  // Custom actions
  readonly customActionsCode = `// custom-actions.component.ts
import { Component, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideShare,
  lucideBookmark,
  lucideFlag,
} from '@ng-icons/lucide';
import { HlmIconImports } from '@angular-ai-kit/spartan-ui/icon';

@Component({
  selector: 'app-custom-actions',
  imports: [NgIcon, HlmIconImports],
  viewProviders: [provideIcons({ lucideShare, lucideBookmark, lucideFlag })],
  template: \`
    <div class="flex items-center gap-1">
      <button
        class="p-2 rounded hover:bg-accent"
        title="Share"
        (click)="share.emit()"
      >
        <ng-icon hlm name="lucideShare" size="sm" />
      </button>

      <button
        class="p-2 rounded hover:bg-accent"
        title="Bookmark"
        (click)="bookmark.emit()"
      >
        <ng-icon hlm name="lucideBookmark" size="sm" />
      </button>

      <button
        class="p-2 rounded hover:bg-accent text-destructive"
        title="Report"
        (click)="report.emit()"
      >
        <ng-icon hlm name="lucideFlag" size="sm" />
      </button>
    </div>
  \`,
})
export class CustomActionsComponent {
  share = output<void>();
  bookmark = output<void>();
  report = output<void>();
}

// Usage in parent
@Component({
  template: \`
    <ai-response [content]="content">
      <app-custom-actions
        slot="actions"
        (share)="handleShare()"
        (bookmark)="handleBookmark()"
        (report)="handleReport()"
      />
    </ai-response>
  \`,
})
export class ParentComponent {}`;

  // Custom markdown renderer
  readonly customMarkdownCode = `// custom-markdown.component.ts
import { Component, input } from '@angular/core';
import { MarkdownRendererComponent } from '@angular-ai-kit/core';

@Component({
  selector: 'app-custom-markdown',
  imports: [MarkdownRendererComponent],
  template: \`
    <div class="custom-markdown-wrapper" [class]="wrapperClass()">
      <ai-markdown-renderer
        [content]="content()"
        [enableCodeHighlight]="true"
      />
    </div>
  \`,
  styles: \`
    .custom-markdown-wrapper {
      /* Override heading styles */
      :global(h1, h2, h3) {
        color: var(--primary);
        border-bottom: 2px solid var(--border);
        padding-bottom: 0.5rem;
      }

      /* Custom code block styling */
      :global(pre) {
        border-radius: 0.75rem;
        border: 1px solid var(--border);
      }

      /* Custom link styling */
      :global(a) {
        color: var(--primary);
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      /* Custom list styling */
      :global(ul) {
        list-style-type: square;
      }
    }
  \`,
})
export class CustomMarkdownComponent {
  content = input.required<string>();
  wrapperClass = input('');
}`;

  // Custom code block
  readonly customCodeBlockCode = `// custom-code-block.component.ts
import { Component, input, output, computed } from '@angular/core';
import { CodeBlockComponent } from '@angular-ai-kit/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlay, lucideCopy, lucideCheck } from '@ng-icons/lucide';

@Component({
  selector: 'app-custom-code-block',
  imports: [CodeBlockComponent, NgIcon],
  viewProviders: [provideIcons({ lucidePlay, lucideCopy, lucideCheck })],
  template: \`
    <div class="custom-code-block">
      <!-- Custom header -->
      <div class="flex items-center justify-between px-4 py-2 bg-muted rounded-t-lg">
        <span class="text-sm font-mono text-muted-foreground">
          {{ language() }}
        </span>
        <div class="flex gap-2">
          @if (isRunnable()) {
            <button
              class="flex items-center gap-1 text-sm text-primary hover:underline"
              (click)="run.emit(code())"
            >
              <ng-icon name="lucidePlay" size="sm" />
              Run
            </button>
          }
          <button
            class="flex items-center gap-1 text-sm hover:underline"
            (click)="copyCode()"
          >
            <ng-icon [name]="copied() ? 'lucideCheck' : 'lucideCopy'" size="sm" />
            {{ copied() ? 'Copied!' : 'Copy' }}
          </button>
        </div>
      </div>

      <!-- Code block -->
      <ai-code-block
        [code]="code()"
        [language]="language()"
        [showLineNumbers]="showLineNumbers()"
      />
    </div>
  \`,
})
export class CustomCodeBlockComponent {
  code = input.required<string>();
  language = input('typescript');
  showLineNumbers = input(true);

  run = output<string>();

  // Runnable languages
  isRunnable = computed(() => {
    const runnable = ['javascript', 'typescript', 'python'];
    return runnable.includes(this.language());
  });

  // Copy state
  private _copied = signal(false);
  copied = this._copied.asReadonly();

  copyCode() {
    navigator.clipboard.writeText(this.code());
    this._copied.set(true);
    setTimeout(() => this._copied.set(false), 2000);
  }
}`;

  // Custom input component
  readonly customInputCode = `// custom-input.component.ts
import { Component, input, output, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatInputComponent } from '@angular-ai-kit/core';
import { HlmSelectImports } from '@angular-ai-kit/spartan-ui/select';

interface Model {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-custom-input',
  imports: [FormsModule, ChatInputComponent, HlmSelectImports],
  template: \`
    <div class="custom-input-container">
      <!-- Model selector -->
      <div class="flex items-center gap-2 mb-2">
        <label class="text-sm text-muted-foreground">Model:</label>
        <select
          hlmSelect
          [(ngModel)]="selectedModel"
          class="w-48"
        >
          @for (model of models(); track model.id) {
            <option [value]="model.id">{{ model.name }}</option>
          }
        </select>
      </div>

      <!-- Main input -->
      <ai-chat-input
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [maxLength]="maxLength()"
        (messageSubmit)="handleSubmit($event)"
      />

      <!-- Character count -->
      <div class="flex justify-between mt-1 text-xs text-muted-foreground">
        <span>{{ charCount() }} / {{ maxLength() }}</span>
        <span>Using: {{ selectedModelName() }}</span>
      </div>
    </div>
  \`,
})
export class CustomInputComponent {
  placeholder = input('Type your message...');
  disabled = input(false);
  maxLength = input(4000);

  models = input<Model[]>([
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable' },
    { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast & cheap' },
    { id: 'claude-3', name: 'Claude 3', description: 'Best for writing' },
  ]);

  messageSubmit = output<{ content: string; model: string }>();

  selectedModel = signal('gpt-4');
  charCount = signal(0);

  selectedModelName = computed(() => {
    const model = this.models().find(m => m.id === this.selectedModel());
    return model?.name ?? 'Unknown';
  });

  handleSubmit(content: string) {
    this.messageSubmit.emit({
      content,
      model: this.selectedModel(),
    });
  }
}`;

  // Tokens for DI customization
  readonly tokensCode = `// Customize via DI tokens
import {
  AI_AVATAR_CONFIG,
  AI_CODE_HIGHLIGHT_CONFIG,
  AI_MARKDOWN_CONFIG,
} from '@angular-ai-kit/core';

@Component({
  providers: [
    {
      provide: AI_AVATAR_CONFIG,
      useValue: {
        userAvatar: '/avatars/user.png',
        assistantAvatar: '/avatars/bot.png',
        showAvatar: true,
        size: 'md',
      },
    },
    {
      provide: AI_CODE_HIGHLIGHT_CONFIG,
      useValue: {
        theme: 'github-dark',
        showLineNumbers: true,
        wrapLongLines: false,
      },
    },
    {
      provide: AI_MARKDOWN_CONFIG,
      useValue: {
        sanitize: true,
        linkTarget: '_blank',
        enableGfm: true,
      },
    },
  ],
})
export class ChatModule {}`;
}
