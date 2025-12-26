import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';

@Directive({
  selector: 'main[hlmSidebarInset]',
  host: {
    'data-slot': 'sidebar-inset',
  },
})
export class HlmSidebarInset {
  constructor() {
    classes(() => [
      'bg-background relative flex w-full flex-1 flex-col',
      'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
    ]);
  }
}
