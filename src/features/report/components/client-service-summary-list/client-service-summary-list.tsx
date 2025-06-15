'use client';

import useReportUrlParams from '@/features/report/hooks/useReportUrlParams';
import { getMonthRange } from '@/utils/get-month-range';
import { useGetClients, useGetSchedules } from '@/hooks/query';

import ClientServiceCard from './_client-service-card';

export default function ClientServiceSummaryList() {
  const { year, month } = useReportUrlParams();
  const { startDate, endDate } = getMonthRange(year, month);

  const { data: schedules } = useGetSchedules({
    startDate,
    endDate,
  });

  const { data: clients } = useGetClients({
    startDate,
    endDate,
  });

  return (
    <div className="space-y-3">
      {schedules?.map((schedule) => {
        const client = clients?.find((c) => c.clientId === schedule.clientId);
        if (!client) return null;

        return (
          <ClientServiceCard
            key={schedule.clientId}
            schedule={schedule}
            client={client}
          />
        );
      })}
    </div>
  );
}
