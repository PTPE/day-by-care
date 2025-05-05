import { DayOfWeek, DateString, MonthSchedule, WeekSchedule } from '../types';

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
  const result: MonthSchedule = [];

  const datesByDayOfWeek = getDatesInMonthByDayOfWeek(year, month);

  Object.entries(weekSchedule).forEach(([dayOfWeek, serviceTimes]) => {
    const dates = datesByDayOfWeek[dayOfWeek as DayOfWeek];

    dates.forEach((date) => {
      serviceTimes.forEach((serviceTime) => {
        result.push({
          date,
          service_start_time: serviceTime.start,
          service_end_time: serviceTime.end,
        });
      });
    });
  });

  return result;
}

export function getValidMonthScheduleServiceTime(monthSchedule: MonthSchedule) {
  return monthSchedule.filter((schedule) => {
    const start = new Date(`${schedule.date} ${schedule.service_start_time}`);
    const end = new Date(`${schedule.date} ${schedule.service_end_time}`);

    if (!schedule.service_start_time && !schedule.service_end_time) {
      return true;
    }

    return start < end;
  });
}
