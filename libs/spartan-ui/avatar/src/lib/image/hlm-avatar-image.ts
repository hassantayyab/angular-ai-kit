import { classes } from '@angular-ai-kit/spartan-ui/utils';
import { Directive, inject } from '@angular/core';
import { BrnAvatarImage } from '@spartan-ng/brain/avatar';

@Directive({
  selector: 'img[hlmAvatarImage]',
  exportAs: 'avatarImage',
  hostDirectives: [BrnAvatarImage],
})
export class HlmAvatarImage {
  public readonly canShow = inject(BrnAvatarImage).canShow;

  constructor() {
    classes(() => 'aspect-square size-full');
  }
}
