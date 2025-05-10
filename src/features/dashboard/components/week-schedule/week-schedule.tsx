'use client';

import { addDays, format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

import { getThisWeekDateRange } from '@/features/dashboard/utils';
import { useGetThisWeekServiceTimeOfClient } from '@/features/dashboard/hooks/useDashboardQuery.client';

import DayItem from './day-item';

type WeekScheduleProps = {
  selectedClientId: string;
};

export default function WeekSchedule({ selectedClientId }: WeekScheduleProps) {
  const { startOfThisWeek } = getThisWeekDateRange();
  const { data: serviceTime } = useGetThisWeekServiceTimeOfClient();

  const clientServiceTime = serviceTime?.[selectedClientId];

  const days: {
    day: string;
    date: number;
    time: string[];
    isToday: boolean;
  }[] = [];

  for (let i = 0; i < 7; i += 1) {
    const date = addDays(startOfThisWeek, i);
    const dateInSQL = format(date, 'yyyy-MM-dd');
    const isToday = format(new Date(), 'yyyy-MM-dd') === dateInSQL;

    if (clientServiceTime?.[dateInSQL]) {
      days.push({
        day: format(date, 'EEEEE', { locale: zhTW }),
        date: date.getDate(),
        time: clientServiceTime[dateInSQL].map((item) => item.startTime),
        isToday,
      });
    } else {
      days.push({
        day: format(date, 'EEEEE', { locale: zhTW }),
        date: date.getDate(),
        time: [],
        isToday,
      });
    }
  }

  return (
    <div className="flex flex-col gap-5 bg-card p-4 rounded-lg lg:p-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-accent rounded-full " />
        <div className="text-xl font-extrabold tracking-widest">本週班表</div>
      </div>
      <div className="flex justify-between">
        {days.map((day) => (
          <DayItem
            key={day.day}
            day={day.day}
            date={day.date}
            time={day.time}
            isToday={day.isToday}
          />
        ))}
      </div>
    </div>
  );
}
