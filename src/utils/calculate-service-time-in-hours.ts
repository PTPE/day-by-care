type Params = {
  date: string;
  start: string;
  end: string;
};

export function calculateServiceTimeLengthInHours({
  date,
  start,
  end,
}: Params): number {
  if (!date || !start || !end) {
    return 0;
  }

  const serviceStartTimeDate = new Date(`${date} ${start}`);
  const serviceEndTimeDate = new Date(`${date} ${end}`);

  const rawDiffInHours =
    (serviceEndTimeDate.getTime() - serviceStartTimeDate.getTime()) /
    (1000 * 60 * 60);

  const rounded = Math.round(rawDiffInHours * 10) / 10;

  return rounded;
}
