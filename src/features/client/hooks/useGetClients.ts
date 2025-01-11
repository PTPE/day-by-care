import { useQuery } from '@tanstack/react-query';

import getClientsAction from '@/features/client/actions/get-clients-action';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';

export default function useGetClients() {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getClientsAction(),
    queryKey: [QUERY_KEYS.CLIENTS],
  });

  return { data, isLoading, error };
}
