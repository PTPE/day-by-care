import { useMutation } from '@tanstack/react-query';

import { updateClientAction } from '@/features/client/actions/update-client-action';

export default function useUpdateClient({
  onSuccessCb,
}: { onSuccessCb?: () => void } = {}) {
  const { mutate, error, isPending } = useMutation({
    mutationFn: updateClientAction,
    onSuccess: onSuccessCb,
  });

  return { mutate, error, isPending };
}
