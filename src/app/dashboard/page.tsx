import { cookies } from 'next/headers';
import { format } from 'date-fns';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Attendance from '@/features/dashboard/components/attendance';
import ClientInformation from '@/features/dashboard/components/client-information';
import ClientList from '@/features/dashboard/components/client-list';
import WeekSchedule from '@/features/dashboard/components/week-schedule';
import { getThisWeekClientsInfo } from '@/features/dashboard/services/dashboard-apis';
import useSupabaseServer from '@/utils/supabase/supabase-server';
import {
  usePrefetchServiceTimeByClientIdAndDate,
  queryClient,
  usePrefetchThisWeekClientsInfo,
  usePrefetchThisWeekServiceTimeOfClient,
} from '@/features/dashboard/hooks/useDashboardPrefetch.server';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { clientId: string };
}) {
  const cookieStore = cookies();
  const supabaseClient = useSupabaseServer(cookieStore);

  const { clientList, clientsInfo } =
    await getThisWeekClientsInfo(supabaseClient);

  const selectedClientId = searchParams.clientId || clientList[0]?.clientId;

  const { prefetchClientList } = usePrefetchThisWeekClientsInfo();
  const { prefetchServiceTimeByClientIdAndDate } =
    usePrefetchServiceTimeByClientIdAndDate({
      clientId: selectedClientId,
      date: format(new Date(), 'yyyy-MM-dd'),
    });
  const { prefetchThisWeekServiceTimeOfClient } =
    usePrefetchThisWeekServiceTimeOfClient();

  if (!clientList.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-center">
          尚未建立案主
          <br />
          請至案主頁新增
        </h1>
      </div>
    );
  }

  await prefetchClientList();
  await prefetchServiceTimeByClientIdAndDate();
  await prefetchThisWeekServiceTimeOfClient();

  return (
    <div className="space-y-5 pb-5 lg:mt-5">
      <ClientList clientList={clientList} selectedClientId={selectedClientId} />
      <ClientInformation
        clientsInfo={clientsInfo}
        selectedClientId={selectedClientId}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WeekSchedule selectedClientId={selectedClientId} />
        <Attendance selectedClientId={selectedClientId} />
      </HydrationBoundary>
    </div>
  );
}
