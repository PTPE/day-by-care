import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import { updateServiceTimeByDay } from '@/services/actions';

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

      onSuccessCb?.();
    },
  });

  return { mutate, isPending, error };
}
