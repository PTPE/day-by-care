import { endOfWeek, startOfWeek } from 'date-fns';

export function getThisWeekDateRange() {
  const startOfThisWeek = startOfWeek(new Date());
  const endOfThisWeek = endOfWeek(new Date());

  return {
    startOfThisWeek,
    endOfThisWeek,
  };
}
