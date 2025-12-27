import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
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
 */
@Component({
  selector: 'app-command-dialog-content',
  templateUrl: './command-dialog-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [KbdComponent],
  host: {
    class: 'app-command-dialog-content',
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
}
