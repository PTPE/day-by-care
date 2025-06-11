import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import ReportTimeSelect from '@/features/report/components/report-time-select';
import {
  useSchedulesPrefetch,
  useServiceSummaryPrefetch,
  queryClient,
  useClientsServiceSummaryPrefetch,
} from '@/features/report/hooks/useReportPrefetch.server';
import SectionTabs from '@/components/section-tabs';
import ViewSection from '@/features/report/components/view-section';
import ExportSection from '@/features/report/components/export-section';

const tabs = [
  {
    label: '查看總表',
    id: 'view',
  },
  {
    label: '匯出總表',
    id: 'export',
  },
];

export default async function Reports({
  searchParams,
}: {
  searchParams: { tab?: string; month?: string; year?: string };
}) {
  const thisYear = Number(searchParams.year) || new Date().getFullYear();
  const thisMonth = Number(searchParams.month) || new Date().getMonth() + 1;
  const selectedSectionId = searchParams.tab || tabs[0].id;

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
        <SectionTabs tabs={tabs} />

        <ReportTimeSelect />

        {selectedSectionId === 'view' && <ViewSection />}

        {selectedSectionId === 'export' && <ExportSection />}
      </div>
    </HydrationBoundary>
  );
}
