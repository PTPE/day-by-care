import ClientSelect from '@/features/schedule/components/client-select';
import MonthSchedule from '@/features/schedule/components/month-schedule';
import ScheduleTimeSelect from '@/features/schedule/components/schedule-time-select';
import WeekSchedule from '@/features/schedule/components/week-schedule';

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[3fr_1fr] gap-5 sticky top-0 z-10 mx-[-20px] px-5 py-2 bg-secondary">
        <ClientSelect />
        <ScheduleTimeSelect />
      </div>

      <div>
        <WeekSchedule />
      </div>

      <div className="overflow-auto">
        <MonthSchedule />
      </div>
    </div>
  );
}
