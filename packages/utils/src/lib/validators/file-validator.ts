/**
 * File Validation Utilities
 */

import type { ValidationResult } from './message-validator';

/**
 * Validate file size
 */
export function validateFileSize(
  file: File,
  maxSizeInBytes: number
): ValidationResult {
  if (file.size > maxSizeInBytes) {
    const maxSizeMB = (maxSizeInBytes / (1024 * 1024)).toFixed(1);
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit` };
  }
  return { valid: true };
}

/**
 * Validate file type
 */
export function validateFileType(
  file: File,
  allowedTypes: string[]
): ValidationResult {
  const fileType = file.type;
  const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;

  const isAllowed =
    allowedTypes.includes(fileType) ||
    allowedTypes.some((type) => fileExt === type);

  if (!isAllowed) {
    return { valid: false, error: `File type ${fileType} is not allowed` };
  }

  return { valid: true };
}

/**
 * Validate image file
 */
export function validateImage(file: File, maxSizeMB = 5): ValidationResult {
  const sizeResult = validateFileSize(file, maxSizeMB * 1024 * 1024);
  if (!sizeResult.valid) return sizeResult;

  const typeResult = validateFileType(file, [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ]);
  if (!typeResult.valid) return typeResult;

  return { valid: true };
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}
