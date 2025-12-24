/**
 * Date Formatting Utilities
 *
 * Provides date formatting functions for relative time, timestamps, and more.
 *
 * @example
 * ```typescript
 * formatRelativeTime(new Date('2024-01-01')) // "2 months ago"
 * formatTimestamp(new Date()) // "12:30 PM"
 * formatFullDate(new Date()) // "January 15, 2024 at 12:30 PM"
 * ```
 */

/**
 * Format a date as relative time (e.g., "2 minutes ago", "3 hours ago")
 *
 * @param date - The date to format
 * @param now - Current date (defaults to now)
 * @returns Relative time string
 *
 * @example
 * ```typescript
 * const pastDate = new Date(Date.now() - 60000);
 * formatRelativeTime(pastDate) // "1 minute ago"
 * ```
 */
export function formatRelativeTime(date: Date, now: Date = new Date()): string {
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return seconds <= 1 ? 'just now' : `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }

  const years = Math.floor(months / 12);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

/**
 * Format a date as timestamp (e.g., "12:30 PM" or "03:45 AM")
 *
 * @param date - The date to format
 * @param use24Hour - Use 24-hour format instead of 12-hour
 * @returns Timestamp string
 *
 * @example
 * ```typescript
 * formatTimestamp(new Date('2024-01-01 14:30')) // "2:30 PM"
 * formatTimestamp(new Date('2024-01-01 14:30'), true) // "14:30"
 * ```
 */
export function formatTimestamp(date: Date, use24Hour = false): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (use24Hour) {
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes} ${ampm}`;
}

/**
 * Format a date as full date with time (e.g., "January 15, 2024 at 12:30 PM")
 *
 * @param date - The date to format
 * @param includeTime - Include time in the output
 * @returns Full date string
 *
 * @example
 * ```typescript
 * formatFullDate(new Date('2024-01-15 14:30'))
 * // "January 15, 2024 at 2:30 PM"
 *
 * formatFullDate(new Date('2024-01-15'), false)
 * // "January 15, 2024"
 * ```
 */
export function formatFullDate(date: Date, includeTime = true): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const dateStr = `${month} ${day}, ${year}`;

  if (includeTime) {
    return `${dateStr} at ${formatTimestamp(date)}`;
  }

  return dateStr;
}

/**
 * Format date for chat messages (smart formatting based on recency)
 *
 * @param date - The date to format
 * @returns Smart formatted date
 *
 * @example
 * ```typescript
 * // Recent message (< 24h): "2:30 PM"
 * // This week: "Monday at 2:30 PM"
 * // This year: "Jan 15 at 2:30 PM"
 * // Older: "Jan 15, 2023"
 * ```
 */
export function formatChatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = diff / (1000 * 60 * 60);

  // Less than 24 hours: show time only
  if (hours < 24) {
    return formatTimestamp(date);
  }

  // Less than 7 days: show day and time
  if (hours < 24 * 7) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return `${days[date.getDay()]} at ${formatTimestamp(date)}`;
  }

  // Same year: show month, day, and time
  if (date.getFullYear() === now.getFullYear()) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${months[date.getMonth()]} ${date.getDate()} at ${formatTimestamp(date)}`;
  }

  // Different year: show full date
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
