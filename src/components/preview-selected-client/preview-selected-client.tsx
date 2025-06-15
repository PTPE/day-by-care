import { Schedule } from '@/types/client';
import calculateTotalServiceInHours from '@/utils/calculate-total-service-time-in-hours';

import ServiceTimePerClient from './_service-time-per-client';

type Props = {
  selectedSchedules: Schedule[];
};

const thisMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);

export default function PreviewSelectedClient({ selectedSchedules }: Props) {
  const totalHours = calculateTotalServiceInHours(
    selectedSchedules.flatMap((schecule) => schecule.serviceTime)
  );

  return (
    <div>
      <div className="bg-card p-4 rounded-lg flex flex-col gap-2">
        <div className="flex items-center font-bold gap-2">
          <span className="icon-[material-symbols--nest-clock-farsight-analog-outline-rounded] text-primary text-lg" />
          <span>預覽：總時數{totalHours}小時</span>
        </div>

        <div className="overflow-auto flex flex-col gap-2">
          <div className="flex gap-8 items-center">
            <div className="min-w-[50px]">案主</div>
            <div className="flex gap-5 flex-1 py-3">
              {thisMonthDays.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-center min-w-[20px] text-sm"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="min-w-[50px]">時數</div>
          </div>

          <div className="min-w-full h-[1px] bg-border sticky left-0" />

          {selectedSchedules.map((schedule) => (
            <div key={schedule.clientId} className="flex gap-8 py-3">
              <div className="min-w-[50px]">{schedule.clientName}</div>
              <ServiceTimePerClient serviceTime={schedule.serviceTime} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
