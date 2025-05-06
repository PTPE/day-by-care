import { useQuery } from '@tanstack/react-query';

import useSupabaseBrowser from '@/utils/supabase/supabase-browser';
import {
  getClientServiceDetail,
  GetClientServiceDetailParams,
  getClientsServiceSummary,
  GetClientsServiceSummaryParams,
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

export function useGetClientsServiceSummary(
  params: GetClientsServiceSummaryParams
) {
  const client = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.CLIENTS_SERVICE_SUMMARY, params],
    queryFn: () => getClientsServiceSummary(params, client),
    enabled: !!params.year && !!params.month,
  });

  return { data, isLoading, error };
}

export function useGetClientServiceDetail({
  params,
  enabled = true,
}: {
  params: GetClientServiceDetailParams;
  enabled?: boolean;
}) {
  const client = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getClientServiceDetail(client, params),
    queryKey: [QUERY_KEYS.CLIENT_SERVICE_DETAIL, params],
    enabled: !!params.year && !!params.month && !!params.clientId && enabled,
  });

  return { data, isLoading, error };
}
