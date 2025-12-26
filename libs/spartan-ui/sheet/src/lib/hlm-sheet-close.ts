import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive } from '@angular/core';
import { BrnSheetClose } from '@spartan-ng/brain/sheet';

@Directive({
  selector: 'button[hlmSheetClose]',
  hostDirectives: [{ directive: BrnSheetClose, inputs: ['delay'] }],
  host: {
    'data-slot': 'sheet-close',
  },
})
export class HlmSheetClose {
  constructor() {
    classes(
      () =>
        'ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none'
    );
  }
}
