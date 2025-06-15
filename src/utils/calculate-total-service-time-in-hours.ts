import { ServiceTime } from '@/types/client';

import { calculateServiceTimeLengthInHours } from './calculate-service-time-in-hours';

export default function calculateTotalServiceHours(
  serviceTime: ServiceTime[]
): number {
  const total = serviceTime.reduce((acc, schedule) => {
    const hours = calculateServiceTimeLengthInHours({
      date: schedule.date ?? '',
      start: schedule.start ?? '',
      end: schedule.end ?? '',
    });
    return acc + Math.round(hours * 10) / 10;
  }, 0);

  return Math.round(total * 10) / 10;
}
