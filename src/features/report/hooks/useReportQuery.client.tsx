import { useQuery } from '@tanstack/react-query';

import useSupabaseBrowser from '@/utils/supabase/supabase-browser';
import {
  getSchedules,
  GetSchedulesParams,
  getServiceSummary,
  GetServiceSummaryParams,
} from '@/features/report/services/report-apis';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';

export function useGetSchedules(params: GetSchedulesParams) {
  const client = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.SCHEDULES, params],
    queryFn: () => getSchedules(params, client),
    enabled: !!params.year && !!params.month,
  });

  return { data, isLoading, error };
}

export function useGetServiceSummary(params: GetServiceSummaryParams) {
  const client = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.SERVICE_SUMMARY, params],
    queryFn: () => getServiceSummary(params, client),
    enabled: !!params.year && !!params.month,
  });

  return { data, isLoading, error };
}
