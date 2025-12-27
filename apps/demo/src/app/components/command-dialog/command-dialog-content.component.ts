import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { KbdComponent } from '../kbd';

/**
 * Command item interface
 */
export interface CommandItem {
  label: string;
  icon: string;
  action: () => void;
}

/**
 * Dialog data passed to CommandDialogContentComponent
 */
export interface CommandDialogData {
  navigationItems: CommandItem[];
  actionItems: CommandItem[];
  componentItems: CommandItem[];
}

/**
 * CommandDialogContent Component
 *
 * The content component for the command palette dialog.
 * Opened via CDK Dialog with proper focus trapping and accessibility.
 * Supports keyboard navigation with arrow keys.
 */
@Component({
  selector: 'app-command-dialog-content',
  templateUrl: './command-dialog-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [KbdComponent],
  host: {
    class: 'app-command-dialog-content',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class CommandDialogContentComponent {
  private dialogRef = inject(DialogRef);
  private data = inject<CommandDialogData>(DIALOG_DATA);

  readonly navigationItems = this.data.navigationItems;
  readonly actionItems = this.data.actionItems;
  readonly componentItems = this.data.componentItems;

  // Search state
  searchQuery = signal('');

  // Keyboard navigation state
  selectedIndex = signal(0);

  // Filtered items based on search query
  filteredNavigationItems = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.navigationItems;
    return this.navigationItems.filter((item) =>
      item.label.toLowerCase().includes(query)
    );
  });

  filteredActionItems = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.actionItems;
    return this.actionItems.filter((item) =>
      item.label.toLowerCase().includes(query)
    );
  });

  filteredComponentItems = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.componentItems;
    return this.componentItems.filter((item) =>
      item.label.toLowerCase().includes(query)
    );
  });

  // All filtered items flattened for keyboard navigation
  allFilteredItems = computed(() => [
    ...this.filteredNavigationItems(),
    ...this.filteredActionItems(),
    ...this.filteredComponentItems(),
  ]);

  constructor() {
    // Reset selection when search query changes
    effect(() => {
      this.searchQuery();
      this.selectedIndex.set(0);
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  close(): void {
    this.dialogRef.close();
  }

  executeItem(item: CommandItem): void {
    item.action();
    this.close();
  }

  /**
   * Check if an item is currently selected via keyboard navigation
   */
  isSelected(item: CommandItem): boolean {
    const allItems = this.allFilteredItems();
    const index = allItems.indexOf(item);
    return index === this.selectedIndex();
  }

  /**
   * Handle keyboard navigation
   */
  handleKeydown(event: KeyboardEvent): void {
    const items = this.allFilteredItems();
    const currentIndex = this.selectedIndex();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex.set((currentIndex + 1) % items.length);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex.set(
          currentIndex <= 0 ? items.length - 1 : currentIndex - 1
        );
        break;

      case 'Enter': {
        event.preventDefault();
        const selectedItem = items[currentIndex];
        if (selectedItem) {
          this.executeItem(selectedItem);
        }
        break;
      }
    }
  }
}
