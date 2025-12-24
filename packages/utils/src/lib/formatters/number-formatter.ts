/**
 * Number Formatting Utilities
 *
 * Provides number formatting functions for compact notation, percentages, and more.
 *
 * @example
 * ```typescript
 * formatCompactNumber(1234) // "1.2K"
 * formatPercentage(0.856) // "85.6%"
 * formatFileSize(1024000) // "1 MB"
 * ```
 */

/**
 * Format a number in compact notation (e.g., 1.2K, 3.4M)
 *
 * @param num - The number to format
 * @param decimals - Number of decimal places
 * @returns Compact number string
 *
 * @example
 * ```typescript
 * formatCompactNumber(1234) // "1.2K"
 * formatCompactNumber(1234567) // "1.2M"
 * formatCompactNumber(1234567890) // "1.2B"
 * ```
 */
export function formatCompactNumber(num: number, decimals = 1): string {
  if (num < 1000) {
    return num.toString();
  }

  const units = ['K', 'M', 'B', 'T'];
  let unitIndex = -1;
  let scaledNum = num;

  while (scaledNum >= 1000 && unitIndex < units.length - 1) {
    scaledNum /= 1000;
    unitIndex++;
  }

  return `${scaledNum.toFixed(decimals)}${units[unitIndex]}`;
}

/**
 * Format a decimal as percentage (e.g., 0.856 => "85.6%")
 *
 * @param value - The decimal value (0-1)
 * @param decimals - Number of decimal places
 * @returns Percentage string
 *
 * @example
 * ```typescript
 * formatPercentage(0.856) // "85.6%"
 * formatPercentage(0.856, 0) // "86%"
 * formatPercentage(1.5) // "150.0%"
 * ```
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format file size in human-readable format (e.g., 1.5 MB, 2.3 GB)
 *
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places
 * @returns Formatted file size
 *
 * @example
 * ```typescript
 * formatFileSize(1024) // "1 KB"
 * formatFileSize(1536000) // "1.5 MB"
 * formatFileSize(1073741824) // "1 GB"
 * ```
 */
export function formatFileSize(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(decimals)} ${sizes[i]}`;
}

/**
 * Format a number with thousands separators (e.g., 1,234,567)
 *
 * @param num - The number to format
 * @param separator - Thousands separator character
 * @returns Formatted number string
 *
 * @example
 * ```typescript
 * formatWithSeparators(1234567) // "1,234,567"
 * formatWithSeparators(1234567, '.') // "1.234.567"
 * ```
 */
export function formatWithSeparators(num: number, separator = ','): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * Format a number as currency (e.g., $1,234.56)
 *
 * @param amount - The amount to format
 * @param currency - Currency symbol
 * @param decimals - Number of decimal places
 * @returns Formatted currency string
 *
 * @example
 * ```typescript
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(1234.56, '€') // "€1,234.56"
 * formatCurrency(1234, '$', 0) // "$1,234"
 * ```
 */
export function formatCurrency(
  amount: number,
  currency = '$',
  decimals = 2,
): string {
  const fixedAmount = amount.toFixed(decimals);
  const parts = fixedAmount.split('.');
  const integerPart = formatWithSeparators(Number(parts[0]));
  const formatted =
    parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
  return `${currency}${formatted}`;
}

/**
 * Round a number to specified decimal places
 *
 * @param num - The number to round
 * @param decimals - Number of decimal places
 * @returns Rounded number
 *
 * @example
 * ```typescript
 * roundTo(1.2345, 2) // 1.23
 * roundTo(1.2355, 2) // 1.24
 * ```
 */
export function roundTo(num: number, decimals = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}
