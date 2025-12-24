/**
 * Class Name Utility
 *
 * Combines clsx and tailwind-merge for optimal Tailwind class handling.
 * Merges Tailwind classes intelligently, removing conflicts.
 *
 * @example
 * ```typescript
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500')
 * // => 'px-4 py-2 bg-blue-500'
 *
 * // Conditional classes
 * cn('base-class', { 'active': true, 'disabled': false })
 * // => 'base-class active'
 *
 * // Override with tailwind-merge
 * cn('px-4 py-2', 'px-6')
 * // => 'py-2 px-6' (px-6 overrides px-4)
 *
 * // Complex example
 * cn(
 *   'rounded-lg px-4 py-2',
 *   isActive && 'bg-blue-500',
 *   isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600',
 *   customClasses
 * )
 * ```
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind-aware conflict resolution
 *
 * @param inputs - Class names, objects, or arrays to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
