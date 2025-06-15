import { Schedule, ServiceTime } from '@/types/client';
import calculateTotalServiceHours from '@/utils/calculate-total-service-time-in-hours';
import { ServiceLog } from '@/features/report/types';

export function getServiceLogByDay(schedule: Schedule): ServiceLog[] {
  const groupedByDate = new Map<string, ServiceTime[]>();

  schedule.serviceTime.forEach((entry) => {
    if (!entry.date) return;
    if (!groupedByDate.has(entry.date)) {
      groupedByDate.set(entry.date, []);
    }
    groupedByDate.get(entry.date)!.push(entry);
  });

  const serviceLogs = Array.from(groupedByDate.entries())
    .map(([date, dailyService]) => ({
      clientId: schedule.clientId,
      clientName: schedule.clientName ?? '',
      date,
      serviceTotalHours: calculateTotalServiceHours(dailyService),
      serviceTime: dailyService.map((timeSlot) => ({
        startTime: timeSlot.start ?? '',
        endTime: timeSlot.end ?? '',
      })),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return serviceLogs;
}
