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
 * Services Reference
 *
 * Documentation for Angular AI Kit services.
 */
@Component({
  selector: 'app-services-reference',
  templateUrl: './services-reference.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DocSectionComponent, DocCodeBlockComponent, RouterLink],
})
export class ServicesReferenceComponent {
  // MarkdownService
  readonly markdownServiceCode = `// MarkdownService - Markdown Rendering
import { MarkdownService } from '@angular-ai-kit/core';

@Component({
  selector: 'app-example',
})
export class ExampleComponent {
  private markdown = inject(MarkdownService);

  // Render markdown to HTML
  html = this.markdown.render('# Hello **World**');
  // => '<h1>Hello <strong>World</strong></h1>'

  // Render with options
  html = this.markdown.render(content, {
    sanitize: true,
    gfm: true,
    breaks: true,
  });

  // Parse without rendering (get AST)
  tokens = this.markdown.parse('# Title');

  // Check if content has code blocks
  hasCode = this.markdown.hasCodeBlocks(content);

  // Extract code blocks
  codeBlocks = this.markdown.extractCodeBlocks(content);
}

// Service API
interface MarkdownService {
  /** Render markdown to HTML */
  render(content: string, options?: MarkdownOptions): string;

  /** Parse markdown to tokens */
  parse(content: string): Token[];

  /** Check if content has code blocks */
  hasCodeBlocks(content: string): boolean;

  /** Extract code blocks from content */
  extractCodeBlocks(content: string): CodeBlock[];
}`;

  // CodeHighlightService
  readonly codeHighlightServiceCode = `// CodeHighlightService - Syntax Highlighting
import { CodeHighlightService } from '@angular-ai-kit/core';

@Component({
  selector: 'app-example',
})
export class ExampleComponent {
  private highlight = inject(CodeHighlightService);

  // Highlight code
  highlightedHtml = this.highlight.highlight(code, 'typescript');

  // Auto-detect language
  result = this.highlight.highlightAuto(code);
  // => { language: 'typescript', value: '<span class="hljs-...">...</span>' }

  // Get supported languages
  languages = this.highlight.getSupportedLanguages();

  // Register additional languages
  ngOnInit() {
    this.highlight.registerLanguage('custom', customLanguageDefinition);
  }
}

// Service API
interface CodeHighlightService {
  /** Highlight code with specified language */
  highlight(code: string, language: string): string;

  /** Auto-detect language and highlight */
  highlightAuto(code: string): HighlightResult;

  /** Get list of supported languages */
  getSupportedLanguages(): string[];

  /** Register a custom language */
  registerLanguage(name: string, definition: LanguageDefinition): void;

  /** Set the theme */
  setTheme(theme: string): void;
}`;

  // ThemeService
  readonly themeServiceCode = `// ThemeService - Theme Management
import { ThemeService } from '@angular-ai-kit/core';

@Component({
  selector: 'app-example',
})
export class ExampleComponent {
  private theme = inject(ThemeService);

  // Get current theme
  currentTheme = this.theme.theme; // Signal<'light' | 'dark'>

  // Check if dark mode
  isDark = this.theme.isDark; // Signal<boolean>

  // Toggle theme
  toggleTheme() {
    this.theme.toggle();
  }

  // Set specific theme
  setDark() {
    this.theme.setTheme('dark');
  }

  // Follow system preference
  useSystem() {
    this.theme.setTheme('system');
  }
}

// Service API
interface ThemeService {
  /** Current theme (signal) */
  readonly theme: Signal<'light' | 'dark' | 'system'>;

  /** Whether dark mode is active (signal) */
  readonly isDark: Signal<boolean>;

  /** Toggle between light and dark */
  toggle(): void;

  /** Set specific theme */
  setTheme(theme: 'light' | 'dark' | 'system'): void;
}`;

  // ClipboardService
  readonly clipboardServiceCode = `// ClipboardService - Clipboard Operations
import { ClipboardService } from '@angular-ai-kit/core';

@Component({
  selector: 'app-example',
})
export class ExampleComponent {
  private clipboard = inject(ClipboardService);

  // Copy text
  async copyText() {
    const success = await this.clipboard.copy('Text to copy');
    if (success) {
      this.showNotification('Copied!');
    }
  }

  // Copy with notification
  async copyWithFeedback() {
    await this.clipboard.copyWithFeedback('Text', {
      successMessage: 'Copied to clipboard!',
      errorMessage: 'Failed to copy',
    });
  }

  // Read from clipboard (requires permission)
  async pasteText() {
    const text = await this.clipboard.read();
    console.log('Pasted:', text);
  }
}

// Service API
interface ClipboardService {
  /** Copy text to clipboard */
  copy(text: string): Promise<boolean>;

  /** Copy with feedback notification */
  copyWithFeedback(text: string, options?: FeedbackOptions): Promise<boolean>;

  /** Read from clipboard */
  read(): Promise<string | null>;

  /** Check if clipboard is supported */
  isSupported(): boolean;
}`;

  // StorageService
  readonly storageServiceCode = `// StorageService - Local Storage Wrapper
import { StorageService } from '@angular-ai-kit/core';

@Component({
  selector: 'app-example',
})
export class ExampleComponent {
  private storage = inject(StorageService);

  // Store data
  saveSettings() {
    this.storage.set('settings', { theme: 'dark', fontSize: 14 });
  }

  // Retrieve data (with type safety)
  loadSettings() {
    const settings = this.storage.get<Settings>('settings');
    return settings ?? defaultSettings;
  }

  // Remove data
  clearSettings() {
    this.storage.remove('settings');
  }

  // Check if key exists
  hasSettings() {
    return this.storage.has('settings');
  }

  // Clear all data
  clearAll() {
    this.storage.clear();
  }
}

// Service API
interface StorageService {
  /** Store data (serialized as JSON) */
  set<T>(key: string, value: T): void;

  /** Retrieve data */
  get<T>(key: string): T | null;

  /** Remove data */
  remove(key: string): void;

  /** Check if key exists */
  has(key: string): boolean;

  /** Clear all data */
  clear(): void;

  /** Get all keys */
  keys(): string[];
}`;

  // Creating custom services
  readonly customServiceCode = `// Creating Custom Services
import { Injectable, signal, inject } from '@angular/core';
import { ChatMessage } from '@angular-ai-kit/core';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private conversations = signal<Conversation[]>([]);
  private activeId = signal<string | null>(null);

  // Expose as readonly
  readonly conversations$ = this.conversations.asReadonly();
  readonly activeId$ = this.activeId.asReadonly();

  // Computed signals
  readonly activeConversation = computed(() => {
    const id = this.activeId();
    return this.conversations().find(c => c.id === id) ?? null;
  });

  // Methods
  create(): string {
    const id = crypto.randomUUID();
    const conversation: Conversation = {
      id,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.conversations.update(c => [conversation, ...c]);
    this.activeId.set(id);
    return id;
  }

  select(id: string): void {
    this.activeId.set(id);
  }

  addMessage(message: ChatMessage): void {
    const id = this.activeId();
    if (!id) return;

    this.conversations.update(convs =>
      convs.map(c => {
        if (c.id !== id) return c;
        return {
          ...c,
          messages: [...c.messages, message],
          updatedAt: new Date(),
        };
      })
    );
  }

  delete(id: string): void {
    this.conversations.update(c => c.filter(conv => conv.id !== id));
    if (this.activeId() === id) {
      this.activeId.set(this.conversations()[0]?.id ?? null);
    }
  }
}`;
}
