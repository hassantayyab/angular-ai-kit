import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { type BooleanInput } from '@angular/cdk/coercion';
import { Directive, booleanAttribute, input } from '@angular/core';

@Directive({
  selector: 'a[hlmSidebarMenuSubButton], button[hlmSidebarMenuSubButton]',
  host: {
    'data-slot': 'sidebar-menu-sub-button',
    'data-sidebar': 'menu-sub-button',
    '[attr.data-active]': 'isActive()',
    '[attr.data-size]': 'size()',
  },
})
export class HlmSidebarMenuSubButton {
  public readonly size = input<'sm' | 'md'>('md');
  public readonly isActive = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });
  constructor() {
    classes(() => [
      `text-foreground ring-ring hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground [&>_ng-icon:not([class*='text-'])]:text-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none hover:cursor-pointer focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:cursor-default aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>_ng-icon]:size-4 [&>_ng-icon]:shrink-0 [&>span:last-child]:truncate`,
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
      'data-[size=md]:text-sm data-[size=sm]:text-xs',
      'group-data-[collapsible=icon]:hidden',
    ]);
  }
}
