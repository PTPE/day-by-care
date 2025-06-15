import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import ReportTimeSelect from '@/features/report/components/report-time-select';
import SectionTabs from '@/components/section-tabs';
import ViewSection from '@/features/report/components/view-section';
import ExportSection from '@/features/report/components/export-section';
import { getMonthRange } from '@/utils/get-month-range';
import {
  queryClient,
  usePrefetchClients,
  usePrefetchSchedules,
} from '@/hooks/prefetch-queries';

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
  const year = Number(searchParams.year) || new Date().getFullYear();
  const month = Number(searchParams.month) || new Date().getMonth() + 1;
  const selectedSectionId = searchParams.tab || tabs[0].id;

  const { startDate, endDate } = getMonthRange(year, month);

  const { prefetchSchedules } = usePrefetchSchedules({
    startDate,
    endDate,
  });

  const { prefetchClients } = usePrefetchClients({
    startDate,
    endDate,
  });

  await prefetchSchedules();
  await prefetchClients();

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
