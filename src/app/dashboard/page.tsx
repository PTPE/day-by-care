import { cookies } from 'next/headers';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Attendance from '@/features/dashboard/components/attendance';
import ClientInformation from '@/features/dashboard/components/client-information';
import ClientList from '@/features/dashboard/components/client-list';
import WeekSchedule from '@/features/dashboard/components/week-schedule';
import { getThisWeekDateRange } from '@/features/dashboard/utils/getThisWeekDateRange';
import { getClients } from '@/services/apis';
import useSupabaseServer from '@/utils/supabase/supabase-server';
import { usePrefetchSchedules } from '@/hooks/prefetch-queries';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { clientId: string };
}) {
  const cookieStore = cookies();
  const supabaseClient = useSupabaseServer(cookieStore);

  const { startOfThisWeek, endOfThisWeek } = getThisWeekDateRange();

  const clientList = await getClients(supabaseClient, {
    startDate: startOfThisWeek,
    endDate: endOfThisWeek,
  });

  const selectedClientId = searchParams.clientId || clientList[0].clientId;

  const selectedClient = clientList.find(
    (client) => client.clientId === selectedClientId
  );

  const { queryClient, prefetchClients } = usePrefetchSchedules({
    startDate: startOfThisWeek,
    endDate: endOfThisWeek,
  });

  await prefetchClients();

  return (
    <div className="space-y-5 pb-5 lg:mt-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientList
          clientList={clientList}
          selectedClientId={selectedClientId}
        />
        <ClientInformation selectedClient={selectedClient} />
        <WeekSchedule selectedClientId={selectedClientId} />
        <Attendance selectedClientId={selectedClientId} />
      </HydrationBoundary>
    </div>
  );
}
