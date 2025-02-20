import { QueryClient, useQuery } from '@tanstack/react-query';

import getClientsAction from '@/features/client/actions/get-clients-action';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';

export function useGetClientsForClient() {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getClientsAction(),
    queryKey: [QUERY_KEYS.CLIENTS],
  });

  return { data, isLoading, error };
}

export function useGetClientsForServer() {
  const queryClient = new QueryClient();
  const prefetchClients = async () =>
    // eslint-disable-next-line @typescript-eslint/return-await
    await queryClient.prefetchQuery({
      queryFn: () => getClientsAction(),
      queryKey: [QUERY_KEYS.CLIENTS],
    });

  return { prefetchClients, queryClient };
}
