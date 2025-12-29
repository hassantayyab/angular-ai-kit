import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { type BooleanInput } from '@angular/cdk/coercion';
import { Directive, booleanAttribute, input } from '@angular/core';

@Directive({
  selector: 'button[hlmSidebarMenuAction]',
  host: {
    'data-slot': 'sidebar-menu-action',
    'data-sidebar': 'menu-action',
  },
})
export class HlmSidebarMenuAction {
  public readonly showOnHover = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  constructor() {
    classes(() => [
      'text-foreground ring-ring hover:bg-accent hover:text-accent-foreground peer-hover/menu-button:text-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform outline-none hover:cursor-pointer focus-visible:ring-2 disabled:hover:cursor-default [&>_ng-icon]:size-4 [&>_ng-icon]:shrink-0',
      // Increases the hit area of the button on mobile.
      'after:absolute after:-inset-2 after:md:hidden',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
      this.showOnHover() &&
        'peer-data-[active=true]/menu-button:text-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
    ]);
  }
}
