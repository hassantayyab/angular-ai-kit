import { HlmButton } from '@angular-ai-kit/spartan-ui/button';
import { HlmInput } from '@angular-ai-kit/spartan-ui/input';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
  signal,
} from '@angular/core';

/**
 * SearchInput Component
 *
 * A search input with icon and clear button.
 *
 * @example
 * ```html
 * <app-search-input
 *   [placeholder]="'Search...'"
 *   [value]="searchQuery()"
 *   (valueChange)="handleSearch($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmButton, HlmInput],
  host: {
    class: 'app-search-input-host block',
  },
})
export class SearchInputComponent {
  // Inputs
  placeholder = input<string>('Search...');
  value = input<string>('');

  // Outputs
  valueChange = output<string>();

  // Internal state for two-way binding support
  internalValue = signal('');

  constructor() {
    // Sync internal value with input
  }

  get currentValue(): string {
    return this.value() || this.internalValue();
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.internalValue.set(input.value);
    this.valueChange.emit(input.value);
  }

  clear(): void {
    this.internalValue.set('');
    this.valueChange.emit('');
  }
}
