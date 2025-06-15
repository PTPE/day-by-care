'use client';

import useReportUrlParams from '@/features/report/hooks/useReportUrlParams';
import LoadingSpinner from '@/ui/loading-spinner';
import { useGetSchedules } from '@/hooks/query';
import { getMonthRange } from '@/utils/get-month-range';
import calculateTotalServiceHours from '@/utils/calculate-total-service-time-in-hours';

export default function ServiceSummaryCard() {
  const { year, month } = useReportUrlParams();
  const { startDate, endDate } = getMonthRange(year, month);

  const { data: schedules, isLoading } = useGetSchedules({
    startDate,
    endDate,
  });

  const totalHours = calculateTotalServiceHours(
    schedules?.flatMap((schecule) => schecule.serviceTime) || []
  );
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div className="bg-card rounded-lg p-5 space-y-2">
        <div className="flex items-center gap-2">
          <div className="icon-[material-symbols--nest-clock-farsight-analog-outline-rounded]  text-primary" />
          <div className="font-bold">
            總服務小時：
            <span className="text-accent">{totalHours}小時</span>
          </div>
        </div>
        <div className="text-sm">
          {year}/{month} {schedules?.length}位案主總服務時數
        </div>
      </div>
    </div>
  );
}
