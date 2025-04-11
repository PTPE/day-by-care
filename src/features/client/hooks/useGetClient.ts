import { useQuery, useQueryClient } from '@tanstack/react-query';

import getClientAction from '@/features/client/actions/get-client-action';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';

export default function useGetClient(clientId: string) {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getClientAction(clientId),
    queryKey: [QUERY_KEYS.CLIENT, clientId],
    enabled: !!clientId,
    staleTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading };
}

export function usePrefetchClient(clientId: string) {
  const queryClient = useQueryClient();
  const prefetch = async () => {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.CLIENT, clientId],
      queryFn: () => getClientAction(clientId),
    });
  };

  return { prefetch };
}
