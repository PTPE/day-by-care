import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createClientAction } from '@/features/client/actions/create-client-action';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';

export default function useCreateClient({
  onSuccessCb,
}: { onSuccessCb?: () => void } = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: createClientAction,
    onSuccess: () => {
      onSuccessCb?.();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS] });
    },
  });

  return { mutate, isPending, error };
}
