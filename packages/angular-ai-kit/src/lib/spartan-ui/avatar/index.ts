import { HlmAvatarFallback } from './fallback';
import { HlmAvatar } from './hlm-avatar';
import { HlmAvatarImage } from './image';

export * from './fallback';
export * from './hlm-avatar';
export * from './image';

export const HlmAvatarImports = [
  HlmAvatarFallback,
  HlmAvatarImage,
  HlmAvatar,
] as const;
