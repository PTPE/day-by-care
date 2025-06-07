import { startOfMonth, endOfMonth, format } from 'date-fns';

/**
 * Get the start and end dates of the specified month and year (formatted as yyyy-MM-dd)
 * @param year
 * @param month
 * @returns { startDate: string, endDate: string }
 */
export function getMonthRange(
  year: number,
  month: number
): {
  startDate: string;
  endDate: string;
} {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Must be between 1 and 12.`);
  }

  const baseDate = new Date(year, month - 1);
  const startDate = format(startOfMonth(baseDate), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(baseDate), 'yyyy-MM-dd');

  return { startDate, endDate };
}
