import { endOfWeek, startOfWeek, format } from 'date-fns';

export function getThisWeekDateRange() {
  const startOfThisWeek = format(startOfWeek(new Date()), 'yyyy-MM-dd');
  const endOfThisWeek = format(endOfWeek(new Date()), 'yyyy-MM-dd');

  return {
    startOfThisWeek,
    endOfThisWeek,
  };
}
