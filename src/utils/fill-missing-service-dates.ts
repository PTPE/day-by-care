import { format, parseISO, eachDayOfInterval } from 'date-fns';

import { ServiceTime } from '@/types/client';

export default function fillMissingServiceDates(
  startDate: string,
  endDate: string,
  serviceTimes: ServiceTime[]
): ServiceTime[] {
  const serviceMap = new Map(serviceTimes.map((s) => [s.date, s]));

  const allDates = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  return allDates.map((date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    const record = serviceMap.get(formatted);

    return {
      date: formatted,
      start: record?.start ?? null,
      end: record?.end ?? null,
    };
  });
}
