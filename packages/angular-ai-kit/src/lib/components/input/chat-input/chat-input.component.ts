import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowUp,
  lucideAtSign,
  lucideBlocks,
  lucideBookOpen,
  lucideGlobe,
  lucideLightbulb,
  lucideMic,
  lucidePaperclip,
  lucidePlus,
  lucideSearch,
  lucideX,
} from '@ng-icons/lucide';
import { cn } from '@angular-ai-kit/utils';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { BrnCommandEmpty } from '@spartan-ng/brain/command';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
// Spartan UI imports from embedded components
import { HlmAvatarImports } from '../../../spartan-ui/avatar';
import { HlmBadge } from '../../../spartan-ui/badge';
import { HlmButton } from '../../../spartan-ui/button';
import { HlmCommandImports } from '../../../spartan-ui/command';
import { HlmDropdownMenuImports } from '../../../spartan-ui/dropdown-menu';
import { HlmIcon } from '../../../spartan-ui/icon';
import { HlmInputGroupImports } from '../../../spartan-ui/input-group';
import { HlmPopoverImports } from '../../../spartan-ui/popover';
import { HlmSwitch } from '../../../spartan-ui/switch';
// Library components
import {
  PromptSuggestion,
  PromptSuggestionsComponent,
  SuggestionsPosition,
} from '../../chat/prompt-suggestions';
import { AttachmentCardComponent } from '../attachment-card';

/**
 * Source option for the sources dropdown
 */
export interface SourceOption {
  value: string;
  label: string;
  icon?: string;
}

/**
 * Model option for the model selector dropdown
 */
export interface ModelOption {
  name: string;
  badge?: string;
}

/**
 * Context item for the context/mention dropdown
 */
export interface ContextItem {
  type: 'page' | 'file' | 'user';
  title: string;
  icon: string;
}

/**
 * ChatInputComponent
 *
 * Full-featured chat input with:
 * - Auto-resizing textarea
 * - File attachments with preview
 * - Context/mention popover (@)
 * - Model selector dropdown
 * - Sources dropdown with toggles
 * - Research mode toggle
 * - Voice input button
 * - Prompt suggestions
 *
 * @example
 * ```html
 * <ai-chat-input
 *   [disabled]="isLoading()"
 *   [placeholder]="'Type a message...'"
 *   [suggestions]="promptSuggestions"
 *   (messageSend)="handleSend($event)"
 * />
 * ```
 */
@Component({
  selector: 'ai-chat-input',
  templateUrl: './chat-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HlmButton,
    HlmInputGroupImports,
    HlmDropdownMenuImports,
    HlmCommandImports,
    HlmPopoverImports,
    HlmAvatarImports,
    HlmIcon,
    HlmBadge,
    HlmSwitch,
    NgIcon,
    BrnPopoverImports,
    BrnCommandEmpty,
    PromptSuggestionsComponent,
    AttachmentCardComponent,
  ],
  providers: [
    provideIcons({
      lucidePaperclip,
      lucideArrowUp,
      lucideGlobe,
      lucideMic,
      lucideLightbulb,
      lucideBlocks,
      lucideBookOpen,
      lucidePlus,
      lucideAtSign,
      lucideSearch,
      lucideX,
    }),
  ],
  host: {
    class: 'ai-chat-input-host block',
  },
})
export class ChatInputComponent {
  private platformId = inject(PLATFORM_ID);
  private textareaRef =
    viewChild<ElementRef<HTMLTextAreaElement>>('textareaRef');

  // Inputs
  placeholder = input<string>('Message...');
  disabled = input<boolean>(false);
  maxHeight = input<number>(120);

  // Visibility toggles - all default to true
  showContextButton = input<boolean>(true);
  showAttachmentButton = input<boolean>(true);
  showResearchButton = input<boolean>(true);
  showSourcesButton = input<boolean>(true);
  showModelName = input<boolean>(true);
  showMicButton = input<boolean>(true);

  // Suggestions feature (uses library types)
  suggestions = input<PromptSuggestion[]>([]);
  showSuggestions = input<boolean>(true);
  suggestionsPosition = input<SuggestionsPosition>('bottom');

  // Custom classes
  customClasses = input<string>('');

  // Outputs
  messageSend = output<string>();
  inputCleared = output<void>();
  suggestionSelect = output<PromptSuggestion>();

  // Button action outputs
  contextClick = output<void>();
  fileSelect = output<File[]>();
  researchModeChange = output<boolean>();
  sourceChange = output<string>();
  recordingChange = output<boolean>();

  // State
  inputValue = signal('');
  attachments = signal<File[]>([]);

  // Button states
  researchMode = signal(false);
  isRecording = signal(false);
  selectedSource = signal('all');

  // Source options (legacy - kept for backward compatibility)
  readonly sourceOptions: SourceOption[] = [
    { value: 'all', label: 'All sources' },
    { value: 'web', label: 'Web only' },
    { value: 'docs', label: 'Documents' },
  ];

  // Model options
  readonly modelOptions: ModelOption[] = [
    { name: 'Auto' },
    { name: 'Agent Mode', badge: 'Beta' },
    { name: 'Plan Mode' },
  ];

  // Model selection state
  selectedModel = signal<ModelOption>(this.modelOptions[0]);

  // Sources toggle states
  webSearchEnabled = signal(true);
  appsIntegrationsEnabled = signal(true);

  // Context items for the context/mention dropdown
  readonly contextItems: ContextItem[] = [
    { type: 'page', title: 'Meeting Notes', icon: '📝' },
    { type: 'page', title: 'Project Dashboard', icon: '📊' },
    { type: 'page', title: 'Documentation', icon: '📚' },
    { type: 'file', title: 'Report.pdf', icon: '📄' },
    { type: 'file', title: 'Data.csv', icon: '📈' },
  ];

  // Selected contexts
  selectedContexts = signal<ContextItem[]>([]);

  // Computed: check if has contexts
  hasContext = computed(() => this.selectedContexts().length > 0);

  // Computed: check if has attachments
  hasAttachments = computed(() => this.attachments().length > 0);

  // Computed: available context items (not already selected)
  availableContextItems = computed(() => {
    const selected = this.selectedContexts().map((c) => c.title);
    return this.contextItems.filter((item) => !selected.includes(item.title));
  });

  // File input ref
  private fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  // Computed
  canSend = computed(() => {
    return this.inputValue().trim().length > 0 && !this.disabled();
  });

  /** Show suggestions only when input is empty and feature is enabled */
  suggestionsVisible = computed(() => {
    return (
      this.showSuggestions() &&
      this.suggestions().length > 0 &&
      this.inputValue().trim().length === 0
    );
  });

  constructor() {
    // Auto-resize textarea after render
    afterNextRender(() => {
      this.resizeTextarea();
    });
  }

  // Computed classes
  containerClasses = computed(() => {
    return cn(
      'ai-chat-input',
      'w-full max-w-4xl mx-auto',
      '-mt-3',
      'px-4 pb-4',
      this.customClasses()
    );
  });

  // Methods
  handleInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.inputValue.set(textarea.value);
    this.resizeTextarea();
  }

  handleKeydown(event: KeyboardEvent): void {
    // Enter without Shift sends the message
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSend();
    }
    // Escape clears the input
    if (event.key === 'Escape') {
      this.handleClear();
    }
  }

  /** Clear the input and emit inputCleared event */
  handleClear(): void {
    if (this.inputValue().length > 0) {
      this.inputValue.set('');
      this.resetTextarea();
      this.inputCleared.emit();
    }
  }

  handleSend(): void {
    if (!this.canSend()) return;

    const message = this.inputValue().trim();
    this.messageSend.emit(message);
    this.inputValue.set('');
    this.attachments.set([]); // Clear attachments after sending
    this.resetTextarea();
  }

  /** Handle suggestion selection from PromptSuggestions component */
  handleSuggestionSelect(suggestion: PromptSuggestion): void {
    this.inputValue.set(suggestion.prompt);
    this.suggestionSelect.emit(suggestion);
    this.focus();
    this.resizeTextarea();
  }

  /**
   * Focus the textarea
   */
  focus(): void {
    const textarea = this.textareaRef()?.nativeElement;
    if (textarea) {
      textarea.focus();
    }
  }

  private resizeTextarea(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const textarea = this.textareaRef()?.nativeElement;
    if (!textarea) return;

    // Reset height to auto to get accurate scrollHeight
    textarea.style.height = 'auto';

    // Set new height, capped at maxHeight
    const newHeight = Math.min(textarea.scrollHeight, this.maxHeight());
    textarea.style.height = `${newHeight}px`;
  }

  private resetTextarea(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const textarea = this.textareaRef()?.nativeElement;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.value = '';
  }

  // Button action methods

  /** Trigger file input click */
  triggerFileInput(): void {
    this.fileInputRef()?.nativeElement.click();
  }

  /** Handle file selection */
  handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      // Add to attachments
      this.attachments.update((current) => [...current, ...files]);
      this.fileSelect.emit(files);
      // Reset input so same file can be selected again
      input.value = '';
    }
  }

  /** Toggle research mode */
  toggleResearch(): void {
    this.researchMode.update((v) => !v);
    this.researchModeChange.emit(this.researchMode());
  }

  /** Select a source option */
  selectSource(value: string): void {
    this.selectedSource.set(value);
    this.sourceChange.emit(value);
  }

  /** Select a model option */
  selectModel(model: ModelOption): void {
    this.selectedModel.set(model);
  }

  /** Toggle web search */
  toggleWebSearch(): void {
    this.webSearchEnabled.update((v) => !v);
  }

  /** Toggle apps & integrations */
  toggleAppsIntegrations(): void {
    this.appsIntegrationsEnabled.update((v) => !v);
  }

  /** Add a context item */
  addContext(item: ContextItem): void {
    this.selectedContexts.update((contexts) => [...contexts, item]);
  }

  /** Remove a context item */
  removeContext(item: ContextItem): void {
    this.selectedContexts.update((contexts) =>
      contexts.filter((c) => c.title !== item.title)
    );
  }

  /** Toggle microphone recording */
  toggleMic(): void {
    this.isRecording.update((v) => !v);
    this.recordingChange.emit(this.isRecording());
  }

  /** Remove an attachment */
  removeAttachment(file: File): void {
    this.attachments.update((attachments) =>
      attachments.filter((f) => f !== file)
    );
  }
}
