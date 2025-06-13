import { cookies } from 'next/headers';
import { QueryClient } from '@tanstack/react-query';

import {
  getServiceTimeByClientIdAndDate,
  GetServiceTimeByClientIdAndDateParams,
  getThisWeekClientsInfo,
  getThisWeekServiceTimeOfClient,
} from '@/features/dashboard/services/dashboard-apis';
import useSupabaseServer from '@/utils/supabase/supabase-server';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';

const queryClient = new QueryClient();

export function usePrefetchServiceTimeByClientIdAndDate(
  params: GetServiceTimeByClientIdAndDateParams
) {
  const cookieStore = cookies();

  const supabaseClient = useSupabaseServer(cookieStore);

  const prefetchServiceTimeByClientIdAndDate = async () => {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.DASHBOARD_SERVICE_TIME, params],
      queryFn: () => getServiceTimeByClientIdAndDate(supabaseClient, params),
    });
  };

  return { prefetchServiceTimeByClientIdAndDate };
}

export function usePrefetchThisWeekClientsInfo() {
  const cookieStore = cookies();

  const supabaseClient = useSupabaseServer(cookieStore);

  const prefetchClientList = async () => {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.DASHBOARD_CLIENT_LIST],
      queryFn: () => getThisWeekClientsInfo(supabaseClient),
    });
  };

  return { prefetchClientList };
}

export function usePrefetchThisWeekServiceTimeOfClient() {
  const cookieStore = cookies();

  const supabaseClient = useSupabaseServer(cookieStore);

  const prefetchThisWeekServiceTimeOfClient = async () => {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.DASHBOARD_SERVICE_TIME],
      queryFn: () => getThisWeekServiceTimeOfClient(supabaseClient),
    });
  };

  return { prefetchThisWeekServiceTimeOfClient };
}
export { queryClient };
