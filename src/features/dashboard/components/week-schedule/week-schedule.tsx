'use client';

import getDaysFromSchedules from '@/features/dashboard/utils/getDaysFromSchedule';
import { getThisWeekDateRange } from '@/features/dashboard/utils/getThisWeekDateRange';
import { useGetSchedules } from '@/hooks/query';

import DayItem from './day-item';

type Props = {
  selectedClientId: string;
};

export default function WeekSchedule({ selectedClientId }: Props) {
  const { startOfThisWeek, endOfThisWeek } = getThisWeekDateRange();
  const { data: schedules } = useGetSchedules({
    startDate: startOfThisWeek,
    endDate: endOfThisWeek,
    clientIds: [selectedClientId],
  });

  const days = getDaysFromSchedules(
    schedules || [],
    selectedClientId,
    startOfThisWeek
  );

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
