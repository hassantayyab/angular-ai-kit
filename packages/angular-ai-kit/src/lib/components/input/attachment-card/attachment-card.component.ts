import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFile, lucideX } from '@ng-icons/lucide';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  ViewEncapsulation,
  inject,
  input,
  output,
} from '@angular/core';
import { HlmIcon } from '../../../spartan-ui/icon';

/**
 * AttachmentCardComponent
 *
 * Displays a file attachment with preview (for images) or icon (for other files).
 * Shows file name, size, and a remove button on hover.
 *
 * @example
 * ```html
 * <ai-attachment-card
 *   [file]="file"
 *   (remove)="handleRemove(file)"
 * />
 * ```
 */
@Component({
  selector: 'ai-attachment-card',
  templateUrl: './attachment-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [HlmIcon, NgIcon],
  providers: [
    provideIcons({
      lucideFile,
      lucideX,
    }),
  ],
  host: {
    class: 'ai-attachment-card-host block',
  },
})
export class AttachmentCardComponent {
  private platformId = inject(PLATFORM_ID);

  /** The file to display */
  file = input.required<File>();

  /** Emits when the remove button is clicked */
  remove = output<void>();

  /** Handle remove button click */
  handleRemove(): void {
    this.remove.emit();
  }

  /** Check if file is an image */
  isImageFile(): boolean {
    return this.file().type.startsWith('image/');
  }

  /** Format file size in human-readable format */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + ' ' + sizes[i];
  }

  /** Get file preview URL for images */
  getFilePreviewUrl(): string {
    if (isPlatformBrowser(this.platformId) && this.isImageFile()) {
      return URL.createObjectURL(this.file());
    }
    return '';
  }
}
