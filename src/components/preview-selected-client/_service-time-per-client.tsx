import { useSearchParams } from 'next/navigation';

import fillMissingServiceDates from '@/utils/fill-missing-service-dates';
import { getMonthRange } from '@/utils/get-month-range';
import { calculateServiceTimeLengthInHours } from '@/utils/calculate-service-time-in-hours';
import getTotalServiceHours from '@/utils/calculate-total-service-time-in-hours';

type Props = {
  serviceTime: {
    date: string;
    start: string;
    end: string;
  }[];
};

export default function ServiceTimePerClient({ serviceTime }: Props) {
  const searchParams = useSearchParams();
  const year = Number(searchParams.get('year')) || new Date().getFullYear();
  const month = Number(searchParams.get('month')) || new Date().getMonth() + 1;

  const { startDate, endDate } = getMonthRange(year, month);

  const thisMonthServiceTime = fillMissingServiceDates(
    startDate,
    endDate,
    serviceTime
  );

  const totalTenthHours = getTotalServiceHours(serviceTime);

  return (
    <>
      <div className="flex gap-5 flex-1">
        {thisMonthServiceTime.map((day) => {
          const thisDayServiceHours = calculateServiceTimeLengthInHours({
            date: day.date,
            start: day.start || '',
            end: day.end || '',
          });
          return (
            <div
              key={day.date}
              className="flex items-center justify-center min-w-[20px] text-sm"
            >
              {thisDayServiceHours === 0 ? (
                <div className="text-destructive">x</div>
              ) : (
                thisDayServiceHours
              )}
            </div>
          );
        })}
      </div>

      <div className="min-w-[50px]">{totalTenthHours}</div>
    </>
  );
}
