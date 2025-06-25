import { format, parseISO, eachDayOfInterval } from 'date-fns';

import { ServiceTime } from '@/types/client';

export type FilledServiceTime = {
  date: string;
  serviceTime: {
    start: string;
    end: string;
  }[];
};

export default function fillMissingServiceDates(
  startDate: string,
  endDate: string,
  serviceTimes: ServiceTime[]
): FilledServiceTime[] {
  const serviceMap = new Map<string, ServiceTime[]>();

  serviceTimes.forEach((time) => {
    if (!serviceMap.has(time.date)) {
      serviceMap.set(time.date, []);
    }
    serviceMap.get(time.date)!.push(time);
  });

  const allDates = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  return allDates.map((date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    const times = serviceMap.get(formatted) ?? [];

    return {
      date: formatted,
      serviceTime: times.map((t) => ({
        start: t.start || '',
        end: t.end || '',
      })),
    };
  });
}
