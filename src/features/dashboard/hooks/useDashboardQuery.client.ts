import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import {
  getServiceTimeByClientIdAndDate,
  GetServiceTimeByClientIdAndDateParams,
  getThisWeekServiceTimeOfClient,
} from '@/features/dashboard/services/dashboard-apis';
import useSupabaseBrowser from '@/utils/supabase/supabase-browser';

export function useGetServiceTimeByClientIdAndDate(
  params: GetServiceTimeByClientIdAndDateParams
) {
  const supabaseClient = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_SERVICE_TIME, params.clientId, params.date],
    queryFn: () => getServiceTimeByClientIdAndDate(supabaseClient, params),
  });

  return { data, isLoading, error };
}

export function useGetThisWeekServiceTimeOfClient() {
  const supabaseClient = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_SERVICE_TIME],
    queryFn: () => getThisWeekServiceTimeOfClient(supabaseClient),
  });

  return { data, isLoading, error };
}
