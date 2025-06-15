/* eslint-disable @typescript-eslint/return-await */

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import {
  createClient,
  updateClient,
} from '@/features/client/services/client-actions';

export function useCreateClient({
  onSuccessCb,
}: { onSuccessCb?: () => void } = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      onSuccessCb?.();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS] });
    },
  });

  return { mutate, isPending, error };
}

export function useUpdateClient({
  onSuccessCb,
}: { onSuccessCb?: () => void } = {}) {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS] });
      onSuccessCb?.();
    },
  });

  return { mutate, isPending, error };
}
