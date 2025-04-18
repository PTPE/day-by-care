import Button from '@/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/ui/dialog';
import useGetClientsMonthluSchedule from '@/features/download-schedule/hooks/useGetClientsMonthlySchedule';
import ScheduleTemplate from '@/features/download-schedule/components/schedule-template';

type Props = {
  disabled?: boolean;
  selectedSchedules: string[];
};

export default function SchedulePreview({
  disabled,
  selectedSchedules,
}: Props) {
  const { data: schedules } = useGetClientsMonthluSchedule({
    scheduleIds: selectedSchedules,
  });

  return (
    <Dialog>
      <DialogTrigger asChild disabled={disabled}>
        <Button>預覽班表</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-[80%] min-w-[90%]">
        <div>
          {schedules?.map((schedule) => (
            <ScheduleTemplate
              type="preview"
              schedule={schedule}
              key={schedule.schedule_id}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
