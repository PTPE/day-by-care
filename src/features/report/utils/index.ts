type Schedule = {
  date?: string | null;
  service_start_time?: string | null;
  service_end_time?: string | null;
};

export function calculateServiceTimeLengthInHours({
  date,
  service_start_time,
  service_end_time,
}: Schedule): number {
  if (!date || !service_start_time || !service_end_time) {
    return 0;
  }

  const serviceStartTimeDate = new Date(`${date} ${service_start_time}`);
  const serviceEndTimeDate = new Date(`${date} ${service_end_time}`);

  const rawDiffInHours =
    (serviceEndTimeDate.getTime() - serviceStartTimeDate.getTime()) /
    (1000 * 60 * 60);

  const rounded = Math.round(rawDiffInHours * 10) / 10;

  return rounded;
}

export function sumServiceHours(schedules: Schedule[]): number {
  const totalTenthHours = schedules.reduce((acc, schedule) => {
    const hours = calculateServiceTimeLengthInHours({
      date: schedule.date ?? '',
      service_start_time: schedule.service_start_time ?? '',
      service_end_time: schedule.service_end_time ?? '',
    });
    return acc + Math.round(hours * 10);
  }, 0);

  return totalTenthHours / 10;
}
