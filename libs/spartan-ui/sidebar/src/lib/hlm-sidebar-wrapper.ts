import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive, input } from '@angular/core';
import { injectHlmSidebarConfig } from './hlm-sidebar.token';

@Directive({
  selector: '[hlmSidebarWrapper],hlm-sidebar-wrapper',
  host: {
    'data-slot': 'sidebar-wrapper',
    '[style.--sidebar-width]': 'sidebarWidth()',
    '[style.--sidebar-width-icon]': 'sidebarWidthIcon()',
  },
})
export class HlmSidebarWrapper {
  private readonly _config = injectHlmSidebarConfig();

  public readonly sidebarWidth = input<string>(this._config.sidebarWidth);
  public readonly sidebarWidthIcon = input<string>(
    this._config.sidebarWidthIcon
  );

  constructor() {
    classes(
      () =>
        'group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full'
    );
  }
}
