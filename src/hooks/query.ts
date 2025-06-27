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
        queryKey: [QUERY_KEYS.SCHEDULES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CLIENTS],
      });

      onSuccessCb?.();
    },
  });

  return { mutate, isPending, error };
}

export function useGetSchedules(params: GetSchedulesParams) {
  const supabaseClient = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [
      QUERY_KEYS.SCHEDULES,
      params.clientIds,
      params.endDate,
      params.startDate,
    ],
    queryFn: () => getSchedules(supabaseClient, params),
  });

  return { data, isLoading, error };
}

export function useGetClients(params: GetClientsParams = {}) {
  const supabaseClient = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [
      QUERY_KEYS.CLIENTS,
      params.clientIds,
      params.endDate,
      params.startDate,
    ],
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
