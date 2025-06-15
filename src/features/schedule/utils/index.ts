import { DayOfWeek, DateString, WeekSchedule } from '../types';

function getDatesInMonthByDayOfWeek(year: number, month: number) {
  const result: Record<DayOfWeek, DateString[]> = {
    [DayOfWeek.SUNDAY]: [],
    [DayOfWeek.MONDAY]: [],
    [DayOfWeek.TUESDAY]: [],
    [DayOfWeek.WEDNESDAY]: [],
    [DayOfWeek.THURSDAY]: [],
    [DayOfWeek.FRIDAY]: [],
    [DayOfWeek.SATURDAY]: [],
  };

  const date = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  while (date <= end) {
    const jsDay = date.getDay();
    const dayOfWeek = [
      DayOfWeek.SUNDAY,
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
      DayOfWeek.SATURDAY,
    ][jsDay];

    result[dayOfWeek].push(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
    date.setDate(date.getDate() + 1);
  }

  return result;
}

export function weekScheduleToMonthSchedule({
  year,
  month,
  weekSchedule,
}: {
  weekSchedule: WeekSchedule;
  year: number;
  month: number;
}) {
  const result: {
    date: string;
    serviceTime: {
      startTime: string;
      endTime: string;
    };
  }[] = [];

  const datesByDayOfWeek = getDatesInMonthByDayOfWeek(year, month);

  Object.entries(weekSchedule).forEach(([dayOfWeek, serviceTimes]) => {
    const dates = datesByDayOfWeek[dayOfWeek as DayOfWeek];

    dates.forEach((date) => {
      serviceTimes.forEach((serviceTime) => {
        result.push({
          date,
          serviceTime: {
            startTime: serviceTime.start,
            endTime: serviceTime.end,
          },
        });
      });
    });
  });

  return result;
}

export function getValidMonthScheduleServiceTime(
  monthSchedule: {
    date: string;
    serviceTime: {
      startTime: string;
      endTime: string;
    };
  }[]
) {
  return monthSchedule.filter((schedule) => {
    const start = new Date(
      `${schedule.date} ${schedule.serviceTime.startTime}`
    );
    const end = new Date(`${schedule.date} ${schedule.serviceTime.endTime}`);

    if (!schedule.serviceTime.startTime && !schedule.serviceTime.endTime) {
      return true;
    }

    return start < end;
  });
}
