import { PromptSuggestion, SuggestionsPosition } from '@angular-ai-kit/core';
import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ChatInputComponent } from '../../../../components/chat-input';
import {
  ApiProperty,
  DocApiTableComponent,
  DocCodeBlockComponent,
  DocControlToggleComponent,
  DocDemoCardComponent,
  DocFeaturesListComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/** API Input properties */
const INPUTS: ApiProperty[] = [
  {
    name: 'placeholder',
    type: 'string',
    default: "'Message Angular AI Kit...'",
    description: 'Placeholder text for the textarea',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disable the input',
  },
  {
    name: 'maxHeight',
    type: 'number',
    default: '200',
    description: 'Maximum height of the textarea in pixels',
  },
  {
    name: 'showContextButton',
    type: 'boolean',
    default: 'true',
    description: 'Show the "@Add context" button',
  },
  {
    name: 'showAttachmentButton',
    type: 'boolean',
    default: 'true',
    description: 'Show the attachment (paperclip) button',
  },
  {
    name: 'showResearchButton',
    type: 'boolean',
    default: 'true',
    description: 'Show the "Research" button',
  },
  {
    name: 'showSourcesButton',
    type: 'boolean',
    default: 'true',
    description: 'Show the "All sources" dropdown button',
  },
  {
    name: 'showModelName',
    type: 'boolean',
    default: 'true',
    description: 'Show the model name label',
  },
  {
    name: 'showMicButton',
    type: 'boolean',
    default: 'true',
    description: 'Show the microphone (voice input) button',
  },
  {
    name: 'suggestions',
    type: 'PromptSuggestion[]',
    default: '[]',
    description:
      'Array of suggestion objects with label, prompt, and optional icon',
  },
  {
    name: 'showSuggestions',
    type: 'boolean',
    default: 'true',
    description: 'Show/hide the suggestion badges',
  },
  {
    name: 'suggestionsPosition',
    type: "'top' | 'bottom'",
    default: "'bottom'",
    description: 'Position of suggestion badges relative to the input',
  },
  {
    name: 'customClasses',
    type: 'string',
    default: "''",
    description: 'Additional CSS classes',
  },
];

/** API Output properties */
const OUTPUTS: ApiProperty[] = [
  {
    name: 'messageSend',
    type: 'string',
    description:
      'Emitted when a message is submitted (Enter key or send button)',
  },
  {
    name: 'inputCleared',
    type: 'void',
    description: 'Emitted when the input is cleared (Escape key)',
  },
  {
    name: 'suggestionSelect',
    type: 'PromptSuggestion',
    description: 'Emitted when a suggestion badge is clicked',
  },
  {
    name: 'contextClick',
    type: 'void',
    description: 'Emitted when the context button is clicked',
  },
  {
    name: 'fileSelect',
    type: 'FileList',
    description: 'Emitted when files are selected via attachment button',
  },
  {
    name: 'researchModeChange',
    type: 'boolean',
    description: 'Emitted when research mode is toggled',
  },
  {
    name: 'sourceChange',
    type: 'string',
    description: 'Emitted when the source is changed',
  },
  {
    name: 'recordingChange',
    type: 'boolean',
    description: 'Emitted when voice recording state changes',
  },
];

/** Keyboard shortcuts */
const KEYBOARD_SHORTCUTS = [
  { key: 'Enter', description: 'Send message' },
  { key: 'Shift + Enter', description: 'New line' },
  { key: 'Escape', description: 'Clear input' },
];

/** Accessibility features */
const ACCESSIBILITY = [
  'Keyboard navigation with Enter, Shift+Enter, and Escape',
  'ARIA labels on all interactive elements',
  'Screen reader hints for keyboard shortcuts',
  'Focus management for textarea',
  'Proper disabled states with aria-disabled',
];

/** Code examples */
const INSTALL_CODE = `import { ChatInputComponent } from '@angular-ai-kit/core';`;

const BASIC_CODE = `<ai-chat-input
  [placeholder]="'Type your message...'"
  [disabled]="isLoading()"
  (messageSend)="handleSend($event)"
/>`;

const MINIMAL_CODE = `<ai-chat-input
  [showContextButton]="false"
  [showAttachmentButton]="false"
  [showResearchButton]="false"
  [showSourcesButton]="false"
  [showModelName]="false"
  [showMicButton]="false"
  (messageSend)="handleSend($event)"
/>`;

/**
 * ChatInput Documentation Component
 *
 * Interactive playground for the ChatInput component
 * with configurable visibility options.
 */
@Component({
  selector: 'app-chat-input-doc',
  templateUrl: './chat-input-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ChatInputComponent,
    HlmButton,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocControlToggleComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-chat-input-doc block',
  },
})
export class ChatInputDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly keyboardShortcuts = KEYBOARD_SHORTCUTS;
  readonly accessibility = ACCESSIBILITY;
  readonly installCode = INSTALL_CODE;
  readonly basicCode = BASIC_CODE;
  readonly minimalCode = MINIMAL_CODE;

  // Configuration toggles
  showContextButton = signal(true);
  showAttachmentButton = signal(true);
  showResearchButton = signal(true);
  showSourcesButton = signal(true);
  showModelName = signal(true);
  showMicButton = signal(true);
  showSuggestions = signal(true);
  suggestionsPosition = signal<SuggestionsPosition>('bottom');

  // Demo suggestions data
  demoSuggestions = signal<PromptSuggestion[]>([
    {
      icon: '💡',
      label: 'Explain components',
      prompt: 'Can you explain how the chat components work?',
    },
    {
      icon: '🎨',
      label: 'Customize styling',
      prompt: 'How can I customize the styling and themes?',
    },
    {
      icon: '⚡',
      label: 'Performance tips',
      prompt: 'What are some performance best practices?',
    },
    {
      icon: '🔧',
      label: 'Integration guide',
      prompt: 'How do I integrate with my Angular project?',
    },
  ]);

  // Demo state
  lastSentMessage = signal<string | null>(null);

  // Preset configurations
  showAll(): void {
    this.showContextButton.set(true);
    this.showAttachmentButton.set(true);
    this.showResearchButton.set(true);
    this.showSourcesButton.set(true);
    this.showModelName.set(true);
    this.showMicButton.set(true);
    this.showSuggestions.set(true);
  }

  hideAll(): void {
    this.showContextButton.set(false);
    this.showAttachmentButton.set(false);
    this.showResearchButton.set(false);
    this.showSourcesButton.set(false);
    this.showModelName.set(false);
    this.showMicButton.set(false);
    this.showSuggestions.set(false);
  }

  handleMessageSend(message: string): void {
    this.lastSentMessage.set(message);
    setTimeout(() => this.lastSentMessage.set(null), 3000);
  }
}
