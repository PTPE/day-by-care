export function calculateServiceTimeLengthInHours(
  date: string,
  serviceStartTime: string,
  serviceEndTime: string
): number {
  if (!date || !serviceStartTime || !serviceEndTime) {
    return 0;
  }

  const serviceStartTimeDate = new Date(`${date} ${serviceStartTime}`);
  const serviceEndTimeDate = new Date(`${date} ${serviceEndTime}`);

  const serviceTimeLengthInHours = (
    (serviceEndTimeDate.getTime() - serviceStartTimeDate.getTime()) /
    (1000 * 60 * 60)
  ).toFixed(1);

  return Number(serviceTimeLengthInHours);
}
