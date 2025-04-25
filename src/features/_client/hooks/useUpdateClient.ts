import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateClientAction } from '@/features/client/actions/update-client-action';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';

export default function useUpdateClient({
  onSuccessCb,
}: { onSuccessCb?: () => void } = {}) {
  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationFn: updateClientAction,
    onSuccess: () => {
      onSuccessCb?.();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENT] });
    },
  });

  return { mutate, error, isPending };
}
