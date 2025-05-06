import { cookies } from 'next/headers';
import { QueryClient } from '@tanstack/react-query';

import {
  getSchedules,
  GetSchedulesParams,
  getServiceSummary,
  GetServiceSummaryParams,
  getClientsServiceSummary,
  GetClientsServiceSummaryParams,
} from '@/features/report/services/report-apis';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import useSupabaseServer from '@/utils/supabase/supabase-server';

export const queryClient = new QueryClient();
const cookieStore = cookies();

export function useSchedulesPrefetch(params: GetSchedulesParams) {
  const client = useSupabaseServer(cookieStore);
  const prefetchSchedules = async () => {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.SCHEDULES, params],
      queryFn: () => getSchedules(params, client),
    });
  };

  return { prefetchSchedules };
}

export function useServiceSummaryPrefetch(params: GetServiceSummaryParams) {
  const client = useSupabaseServer(cookieStore);
  const prefetchServiceSummary = async () => {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.SERVICE_SUMMARY, params],
      queryFn: () => getServiceSummary(params, client),
    });
  };

  return { prefetchServiceSummary };
}

export function useClientsServiceSummaryPrefetch(
  params: GetClientsServiceSummaryParams
) {
  const client = useSupabaseServer(cookieStore);
  const prefetchClientsServiceSummary = async () => {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.CLIENTS_SERVICE_SUMMARY, params],
      queryFn: () => getClientsServiceSummary(params, client),
    });
  };

  return { prefetchClientsServiceSummary };
}
