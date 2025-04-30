/* eslint-disable @typescript-eslint/return-await */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useSupabaseBrowser from '@/utils/supabase/supabase-browser';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import { getClients } from '@/features/client/services/client-apis';
import {
  createClient,
  updateClient,
} from '@/features/client/services/client-actions';

export function useGetClients({
  searchParams,
}: { searchParams?: string } = {}) {
  const supabase = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.CLIENTS, searchParams],
    queryFn: () => getClients(supabase, { searchParams }),
  });

  return { data, isLoading, error };
}

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
