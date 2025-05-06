'use client';

import { useGetClientsServiceSummary } from '@/features/report/hooks/useReportQuery.client';
import useReportUrlParams from '@/features/report/hooks/useReportUrlParams';

import ClientServiceCard from './_client-service-card';

export default function ClientServiceSummaryList() {
  const { year, month } = useReportUrlParams();
  const { data: clientsServiceSummary } = useGetClientsServiceSummary({
    year: Number(year),
    month: Number(month),
  });

  return (
    <div className="space-y-3">
      {clientsServiceSummary?.map((client) => (
        <ClientServiceCard key={client.clientId} client={client} />
      ))}
    </div>
  );
}
