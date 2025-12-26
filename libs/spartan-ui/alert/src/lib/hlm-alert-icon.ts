import { provideHlmIconConfig } from '@angular-ai-kit/spartan-ui/icon';
import { Directive } from '@angular/core';

@Directive({
  selector: '[hlmAlertIcon]',
  providers: [provideHlmIconConfig({ size: 'sm' })],
})
export class HlmAlertIcon {}
