import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import {
  updateServiceTimeByDay,
  uploadFileToIbonAndSendNotifyEmail,
} from '@/services/actions';
import {
  getClients,
  GetClientsParams,
  getSchedules,
  GetSchedulesParams,
} from '@/services/apis';
import useSupabaseBrowser from '@/utils/supabase/supabase-browser';

export function useUpdateServiceTimeByDay({
  onSuccessCb,
}: {
  onSuccessCb?: () => void;
} = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateServiceTimeByDay,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SCHEDULE],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SERVICE_SUMMARY],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CLIENTS_SERVICE_SUMMARY],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CLIENT_SERVICE_DETAIL],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DASHBOARD_SERVICE_TIME],
      });

      onSuccessCb?.();
    },
  });

  return { mutate, isPending, error };
}

export function useGetSchedules(params: GetSchedulesParams) {
  const supabaseClient = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [params, QUERY_KEYS.SCHEDULES],
    queryFn: () => getSchedules(supabaseClient, params),
  });

  return { data, isLoading, error };
}

export function useGetClients(params: GetClientsParams) {
  const supabaseClient = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [params, QUERY_KEYS.CLIENTS],
    queryFn: () => getClients(supabaseClient, params),
  });

  return { data, isLoading, error };
}

export function useUploadFileToIbonAndSendNotifyEmail({
  onSuccessCb,
}: {
  onSuccessCb?: (data: { pincode: string; deadline: string }) => void;
} = {}) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: uploadFileToIbonAndSendNotifyEmail,
    onSuccess: (data) => {
      onSuccessCb?.(data);
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
}
