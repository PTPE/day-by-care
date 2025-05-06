import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import ReportTimeSelect from '@/features/report/components/report-time-select';
import ServiceSummaryCard from '@/features/report/components/service-summary-card';
import {
  useSchedulesPrefetch,
  useServiceSummaryPrefetch,
  queryClient,
  useClientsServiceSummaryPrefetch,
} from '@/features/report/hooks/useReportPrefetch.server';
import ClientServiceSummaryList from '@/features/report/components/client-service-summary-list';

export default async function Reports() {
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth() + 1;

  const { prefetchSchedules } = useSchedulesPrefetch({
    year: thisYear,
    month: thisMonth,
  });

  const { prefetchServiceSummary } = useServiceSummaryPrefetch({
    year: thisYear,
    month: thisMonth,
  });

  const { prefetchClientsServiceSummary } = useClientsServiceSummaryPrefetch({
    year: thisYear,
    month: thisMonth,
  });

  await prefetchSchedules();
  await prefetchServiceSummary();
  await prefetchClientsServiceSummary();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-5">
        <ReportTimeSelect />

        <ServiceSummaryCard />

        <ClientServiceSummaryList />
      </div>
    </HydrationBoundary>
  );
}
