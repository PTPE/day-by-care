'use client';

import useReportUrlParams from '@/features/report/hooks/useReportUrlParams';
import { useGetServiceSummary } from '@/features/report/hooks/useReportQuery.client';
import LoadingSpinner from '@/ui/loading-spinner';

export default function ServiceSummaryCard() {
  const { year, month } = useReportUrlParams();
  const { data: serviceSummary, isLoading } = useGetServiceSummary({
    year: Number(year),
    month: Number(month),
  });

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div className="bg-card rounded-lg p-5 space-y-2">
        <div className="flex items-center gap-2">
          <div className="icon-[material-symbols--nest-clock-farsight-analog-outline-rounded]  text-primary" />
          <div className="font-bold">
            總服務小時：
            <span className="text-accent">
              {serviceSummary?.totalServiceHours}小時
            </span>
          </div>
        </div>
        <div className="text-sm">
          {year}/{month} {serviceSummary?.clientCount}位案主總服務時數
        </div>
      </div>
    </div>
  );
}
