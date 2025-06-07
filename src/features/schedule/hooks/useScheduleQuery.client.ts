import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { updateSchedule } from '@/features/schedule/services/schedule-actions';
import {
  getExportedClientsByYearAndMonth,
  getSchedule,
  GetScheduleParams,
  ParamsGetExportedClientsByYearAndMonth,
} from '@/features/schedule/services/schedule-apis';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import useSupabaseBrowser from '@/utils/supabase/supabase-browser';

export function useUpdateSchedule({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SCHEDULE],
      });

      onSuccess?.();
    },
  });

  return { mutate, isPending, error };
}

export function useGetSchedule(params: GetScheduleParams) {
  const client = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.SCHEDULE, params],
    queryFn: () => getSchedule(params, client),
    enabled: !!params.clientId && !!params.year && !!params.month,
  });

  return { data, isLoading, error };
}

export function useGetExportedClientsByYearAndMonth(
  params: ParamsGetExportedClientsByYearAndMonth
) {
  const supabaseClient = useSupabaseBrowser();
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.EXPORTED_CLIENT_LIST, params],
    queryFn: () => getExportedClientsByYearAndMonth(supabaseClient, params),
  });

  return { data, isLoading, error };
}
