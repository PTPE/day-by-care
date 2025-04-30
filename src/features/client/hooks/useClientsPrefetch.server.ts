/* eslint-disable @typescript-eslint/return-await */

import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { getClients } from '@/features/client/services/client-apis';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import useSupabaseServer from '@/utils/supabase/supabase-server';

export function usePrefetchClients() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const prefetchClients = async () =>
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.CLIENTS],
      queryFn: () => getClients(supabase),
    });

  return { prefetchClients, queryClient };
}
