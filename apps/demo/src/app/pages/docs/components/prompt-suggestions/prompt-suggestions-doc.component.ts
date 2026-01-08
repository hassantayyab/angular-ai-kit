import {
  PromptSuggestion,
  PromptSuggestionsComponent,
} from '@angular-ai-kit/core';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ApiProperty,
  DocApiTableComponent,
  DocCodeBlockComponent,
  DocDemoCardComponent,
  DocFeaturesListComponent,
  DocSectionComponent,
} from '../../../../components/doc-ui';

/** API Input properties */
const INPUTS: ApiProperty[] = [
  {
    name: 'suggestions',
    type: 'PromptSuggestion[]',
    default: 'required',
    description: 'Array of suggestion items to display',
  },
  {
    name: 'position',
    type: "'top' | 'bottom'",
    default: "'bottom'",
    description: 'Position relative to input (affects margin)',
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
    name: 'select',
    type: 'EventEmitter<PromptSuggestion>',
    default: '-',
    description: 'Emitted when a suggestion is clicked',
  },
];

/** Install command */
const INSTALL_CODE =
  "import { PromptSuggestionsComponent } from '@angular-ai-kit/core';";

/** Features list */
const FEATURES = [
  'Badge/chip style suggestion buttons',
  'Optional emoji/icon support',
  'Click to select and populate input',
  'Responsive flex wrap layout',
  'Position control (above/below input)',
];

/** Accessibility features */
const ACCESSIBILITY = [
  'Uses role="group" with aria-label',
  'Each suggestion has descriptive aria-label',
  'Keyboard accessible',
  'Focus visible states',
];

/** Code examples */
const USAGE_CODE = `<ai-prompt-suggestions
  [suggestions]="suggestions"
  position="bottom"
  (select)="handleSuggestionSelect($event)"
/>`;

const INTERFACE_CODE = `interface PromptSuggestion {
  label: string;   // Display text
  prompt: string;  // Full prompt to use
  icon?: string;   // Optional emoji/icon
}`;

/**
 * PromptSuggestions Documentation Component
 */
@Component({
  selector: 'app-prompt-suggestions-doc',
  templateUrl: './prompt-suggestions-doc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    PromptSuggestionsComponent,
    DocSectionComponent,
    DocDemoCardComponent,
    DocCodeBlockComponent,
    DocApiTableComponent,
    DocFeaturesListComponent,
  ],
  host: {
    class: 'app-prompt-suggestions-doc block',
  },
})
export class PromptSuggestionsDocComponent {
  // API data
  readonly inputs = INPUTS;
  readonly outputs = OUTPUTS;
  readonly usageCode = USAGE_CODE;
  readonly installCode = INSTALL_CODE;
  readonly interfaceCode = INTERFACE_CODE;
  readonly features = FEATURES;
  readonly accessibility = ACCESSIBILITY;

  // Demo suggestions
  readonly demoSuggestions: PromptSuggestion[] = [
    {
      label: 'Explain code',
      prompt: 'Explain this code in simple terms',
      icon: '💡',
    },
    { label: 'Fix bug', prompt: 'Help me fix this bug', icon: '🐛' },
    {
      label: 'Write tests',
      prompt: 'Write unit tests for this function',
      icon: '✅',
    },
    {
      label: 'Refactor',
      prompt: 'Suggest refactoring improvements',
      icon: '🔧',
    },
  ];

  // Selected suggestion
  selectedSuggestion = signal<PromptSuggestion | null>(null);

  // Handle selection
  handleSelect(suggestion: PromptSuggestion): void {
    this.selectedSuggestion.set(suggestion);
  }
}
