import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@angular-ai-kit/utils';

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        default: 'h-10 w-10',
        sm: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;

@Component({
  selector: 'hlm-avatar',
  templateUrl: './hlm-avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmAvatarComponent {
  size = input<AvatarVariants['size']>('default');
  class = input<string>('');

  computedClass = computed(() =>
    cn(avatarVariants({ size: this.size() }), this.class())
  );
}

@Component({
  selector: 'hlm-avatar-image',
  templateUrl: './hlm-avatar-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmAvatarImageComponent {
  src = input.required<string>();
  alt = input<string>('');
  class = input<string>('');

  computedClass = computed(() =>
    cn('aspect-square h-full w-full', this.class())
  );

  onError() {
    // Image failed to load - fallback will show
  }
}

@Component({
  selector: 'hlm-avatar-fallback',
  templateUrl: './hlm-avatar-fallback.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'computedClass()',
  },
})
export class HlmAvatarFallbackComponent {
  class = input<string>('');

  computedClass = computed(() =>
    cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground',
      this.class()
    )
  );
}
