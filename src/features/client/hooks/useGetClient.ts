import { useQuery } from '@tanstack/react-query';

import getClientAction from '@/features/client/actions/get-client-action';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';

export default function useGetClient(clientId: string) {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getClientAction(clientId),
    queryKey: [QUERY_KEYS.CLIENT, clientId],
  });

  return { data, error, isLoading };
}
